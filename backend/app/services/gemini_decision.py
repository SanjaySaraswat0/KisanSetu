"""
Gemini AI analysis layer for sell-decision recommendations.

Receives the structured decision dict already computed by the rule engine,
calls Gemini 1.5 Flash to add narrative reasoning and risk analysis, and
returns an enriched response.

Falls back to the rule-engine result (without crashing) if:
  - GEMINI_API_KEY is not set
  - google-generativeai is not installed
  - Gemini returns non-JSON / unexpected output
  - Any network / quota / timeout error occurs

The API key is NEVER included in any returned dict or log message.
"""
from __future__ import annotations

import json
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)

_VALID_RECOMMENDATIONS = frozenset({"SELL_NOW", "WAIT", "STORE", "FPO_POOL"})

_PROMPT_TEMPLATE = """\
You are KisanSetu AI, a senior agricultural market advisor for Indian farmers.
You have been given structured market analysis computed by the KisanSetu rule engine.
Use ONLY the data provided — do not invent prices, weather, or external information.

=== FARMER & MARKET DATA (from application) ===
Crop: {crop_name}
Quantity: {quantity_kg} kg
District: {district}
Current Mandi Price: ₹{current_price_per_kg}/kg
7-Day Price Forecast: ₹{predicted_price_per_kg_7d}/kg
Demand Level: {demand_level}
Weather Condition: {weather_condition}
Storage Capacity Available: {storage_capacity_kg} kg
Transport Cost: ₹{transport_cost_per_kg}/kg
Storage Cost: ₹{storage_cost_per_kg}/kg
Net Realization (rule engine): ₹{net_realization_per_kg}/kg
Rule Engine Recommendation: {action}
Rule Engine Confidence: {confidence_pct}%
Rule Engine Reasons: {reasons}

=== YOUR TASK ===
Based STRICTLY on the data above, return a JSON object with EXACTLY this structure:
{{
  "recommendation": "<one of: SELL_NOW, WAIT, STORE, FPO_POOL>",
  "reasoning": "<2-3 clear sentences explaining the recommendation to the farmer in simple terms>",
  "risk_factors": ["<risk 1>", "<risk 2>"],
  "recommended_action": "<one concrete next step for the farmer>",
  "net_realization_per_kg": <float — use the rule engine value unless there is a clear data-backed reason to adjust>,
  "total_payout": <float — net_realization_per_kg multiplied by quantity_kg>
}}

IMPORTANT:
- Return ONLY valid JSON. No markdown, no code fences, no extra text before or after.
- Do not invent any market data not present in the section above.
- Use "FPO_POOL" (not "AGGREGATE") if recommending FPO pooling.
- Keep reasoning under 80 words and simple enough for a village farmer to understand.
"""


def get_gemini_analysis(rule_decision: dict) -> dict:
    """
    Enriches a rule-engine decision dict with Gemini AI reasoning.

    Args:
        rule_decision: The dict returned by ``recommend_action()`` plus any
                       extra context fields (storage_capacity_kg, etc.).

    Returns:
        An enriched dict that always contains all original rule_decision keys
        plus: reasoning, risk_factors, recommended_action, total_payout, ai_engine.
    """
    if not settings.GEMINI_API_KEY:
        return _fallback(rule_decision, "GEMINI_API_KEY not configured")

    try:
        import google.generativeai as genai  # deferred so startup isn't blocked
    except ImportError:
        return _fallback(rule_decision, "google-generativeai not installed")

    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            generation_config=genai.types.GenerationConfig(
                temperature=0.3,
                max_output_tokens=2048,
                response_mime_type="application/json",
            ),
        )

        prompt = _PROMPT_TEMPLATE.format(
            crop_name=rule_decision.get("crop_name", ""),
            quantity_kg=rule_decision.get("quantity_kg", 0),
            district=rule_decision.get("district", ""),
            current_price_per_kg=rule_decision.get("current_price_per_kg", 0),
            predicted_price_per_kg_7d=rule_decision.get("predicted_price_per_kg_7d", 0),
            demand_level=rule_decision.get("demand_level", ""),
            weather_condition=rule_decision.get("weather_condition", ""),
            storage_capacity_kg=rule_decision.get("storage_capacity_kg", 0),
            transport_cost_per_kg=rule_decision.get("transport_cost_per_kg", 0),
            storage_cost_per_kg=rule_decision.get("storage_cost_per_kg", 0),
            net_realization_per_kg=rule_decision.get("net_realization_per_kg", 0),
            action=rule_decision.get("action", ""),
            confidence_pct=round(rule_decision.get("confidence", 0) * 100, 1),
            reasons="; ".join(rule_decision.get("reasons", [])),
        )

        response = model.generate_content(prompt)
        raw_text = (response.text or "").strip()

        # Strip markdown code fences that some models include despite instructions
        if raw_text.startswith("```"):
            lines = raw_text.splitlines()
            raw_text = "\n".join(
                ln for ln in lines if not ln.strip().startswith("```")
            ).strip()

        ai_data = json.loads(raw_text)

        # Validate recommendation — fall back to rule engine value if invalid
        recommendation = ai_data.get("recommendation", rule_decision.get("action"))
        if recommendation not in _VALID_RECOMMENDATIONS:
            recommendation = rule_decision.get("action", "WAIT")

        net_per_kg = float(
            ai_data.get("net_realization_per_kg", rule_decision.get("net_realization_per_kg", 0))
        )
        qty = float(rule_decision.get("quantity_kg", 1))
        total_payout = float(ai_data.get("total_payout", round(net_per_kg * qty, 2)))

        return {
            **rule_decision,
            # Gemini may agree or disagree with the rule engine — use Gemini's call
            "action": recommendation,
            "reasoning": ai_data.get("reasoning", ""),
            "risk_factors": ai_data.get("risk_factors", []),
            "recommended_action": ai_data.get("recommended_action", ""),
            "net_realization_per_kg": round(net_per_kg, 2),
            "total_payout": round(total_payout, 2),
            # SellDecisionCard reads `explanation` as fallback text
            "explanation": ai_data.get("reasoning", rule_decision.get("explanation", "")),
            "ai_engine": "Gemini 1.5 Flash",
        }

    except json.JSONDecodeError as err:
        logger.warning("Gemini returned non-JSON (%s): '%s'; using rule-engine fallback.", err, raw_text)
        return _fallback(rule_decision, "Gemini response parse error")
    except Exception as exc:  # noqa: BLE001
        # Log class name only — never log the key or full traceback to response
        logger.warning("Gemini analysis failed (%s: %s); using rule-engine fallback.", type(exc).__name__, exc)
        return _fallback(rule_decision, "Gemini unavailable")


def _fallback(rule_decision: dict, reason: str = "") -> dict:
    """Returns the rule-engine decision with fallback engine label."""
    if reason:
        logger.info("Gemini fallback reason: %s", reason)
    qty = float(rule_decision.get("quantity_kg", 1))
    net = float(rule_decision.get("net_realization_per_kg", 0))
    return {
        **rule_decision,
        "reasoning": rule_decision.get("explanation", ""),
        "risk_factors": [],
        "recommended_action": "",
        "total_payout": round(net * qty, 2),
        "ai_engine": "KisanSetu Rule Engine",
    }
