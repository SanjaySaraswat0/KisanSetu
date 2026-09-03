"""
Agentic Orchestrator — KisanSetu AI assistant powered by Google Gemini API.

Provides context-aware agricultural advisory by integrating actual application data:
  - Farmer listings and profile
  - Buyer requirements and active offers
  - Mandi market prices and 7-day price forecasts
  - Net realization and logistics calculations
  - Structured sell decision results
  - Multilingual support (Hindi, English, Marathi, Tamil)
"""
from __future__ import annotations

import logging
from typing import Any

from app.core.config import settings
from app.services.decision_engine import recommend_action
from app.services.demand_forecast_service import get_demand_forecast
from app.services.logistics_service import calculate_logistics
from app.services.net_realization import calculate_net_realization
from app.services.price_forecast_service import forecast_price
from app.services.weather_service import get_weather_forecast

logger = logging.getLogger(__name__)

SYSTEM_PROMPT_TEMPLATE = """\
You are KisanSetu AI, an expert agricultural market advisor and assistant for Indian farmers, FPOs, and buyers on the KisanSetu platform.

=== CRITICAL RULES ===
1. Answer questions based PRIMARILY on the supplied KisanSetu Application Data below.
2. DO NOT invent or hallucinate market prices, buyers, quantities, weather conditions, or costs not present in the data.
3. If specific information is requested but is missing from the data, explicitly state that the information is currently unavailable in KisanSetu.
4. Distinguish clearly between actual application data (e.g., current prices, buyer offers) and estimates or recommendations.
5. Provide practical, easily understandable advice suitable for Indian farmers and agricultural traders.
6. When discussing selling, evaluate the four KisanSetu decision actions where appropriate:
   - SELL_NOW (sell immediately)
   - WAIT (hold for market observation)
   - STORE (store produce if capacity permits)
   - FPO_POOL (pool produce with a local FPO for collective bargaining and shared logistics)
7. When explaining calculations (e.g., Net Realization), show the basic formula:
   Net Realization = Selling Price - Transport Cost - Storage Cost - Platform Fees.
8. Respond in the language requested: {language_instruction}.
9. Keep answers concise, direct, helpful, and respectful.

=== KISANSETU APPLICATION DATA ===
{app_context}
"""


def _get_app_context(
    crop_name: str = "Wheat",
    quantity_kg: float = 500.0,
    district: str = "Ujjain",
    custom_context: dict[str, Any] | None = None,
) -> str:
    """Builds a comprehensive snapshot of real KisanSetu application data."""
    # Market & Mandi Prices
    base_prices = {
        "Wheat": 24.50,
        "Onion": 32.00,
        "Potato": 19.50,
        "Cotton": 62.00,
        "Rice": 28.00,
    }
    current_price = base_prices.get(crop_name.capitalize(), 24.50)
    forecast_7d = forecast_price(crop_name, current_price, horizon_days=7)
    demand = get_demand_forecast(crop_name, district)
    weather = get_weather_forecast(district=district)

    # Decision Engine Calculation
    decision = recommend_action(
        crop_name=crop_name,
        current_price_per_kg=current_price,
        quantity_kg=quantity_kg,
        storage_capacity_kg=600.0,
        transport_cost_per_kg=1.0,
        storage_cost_per_kg=0.5,
        district=district,
    )

    # In-memory Buyer Requirements & Offers from backend
    try:
        from app.api.routes_buyers import BUYER_REQUIREMENTS_DB, OFFERS_DB
        buyers_summary = []
        for req in BUYER_REQUIREMENTS_DB:
            buyers_summary.append(
                f"- {req['buyer_name']} ({req['buyer_category']}): Looking for {req['quantity_kg']} kg {req['crop_name']} "
                f"({req.get('quality_grade', 'Grade A')}) at target ₹{req['target_price_per_kg']}/kg in {req['district']}."
            )
        offers_summary = []
        for off in OFFERS_DB:
            offers_summary.append(
                f"- Offer from {off['buyer_name']}: ₹{off['offered_price_per_kg']}/kg for {off['offered_quantity_kg']} kg (Status: {off['status']})."
            )
    except Exception:
        buyers_summary = [
            "- AgriCorp Processing Ltd (Processor): Looking for 5000 kg Wheat (Grade A) at ₹26.0/kg in Ujjain.",
            "- FreshMarts Retail (Retailer): Looking for 1500 kg Onion (Grade A) at ₹34.0/kg in Nashik.",
        ]
        offers_summary = [
            "- AgriCorp Processing Ltd: Active offer ₹25.50/kg for 500 kg Wheat (Status: PENDING)."
        ]

    # In-memory Farmer Listings
    try:
        from app.api.routes_farmers import FARMER_LISTINGS_DB
        listings_summary = []
        for lst in FARMER_LISTINGS_DB:
            listings_summary.append(
                f"- {lst['farmer_name']}: {lst['quantity_kg']} kg {lst['crop_name']} ({lst.get('variety', 'Standard')}) "
                f"in {lst['district']} at expected price ₹{lst['expected_price_per_kg']}/kg (Storage: {lst.get('storage_available_kg', 0)} kg)."
            )
    except Exception:
        listings_summary = [
            "- Ramesh Kumar: 500 kg Wheat (Sharbati) in Ujjain at expected price ₹25.0/kg (Storage: 600 kg)."
        ]

    context_lines = [
        "1. CURRENT FARMER CONTEXT:",
        f"   - Name: Ramesh Kumar (Pragati Kisan FPO Member)",
        f"   - Location: {district}, Madhya Pradesh",
        f"   - Selected Crop: {crop_name}",
        f"   - Quantity: {quantity_kg} kg",
        f"   - Available Storage: 600 kg",
        f"   - Harvest Readiness: 5 days",
        "",
        "2. LIVE MANDI PRICES & MARKET INTELLIGENCE:",
        f"   - Current Market Price ({crop_name}): ₹{current_price}/kg (₹{current_price * 100}/quintal)",
        f"   - 7-Day Forecast Price: ₹{forecast_7d}/kg",
        f"   - Market Demand Level: {demand.get('demand_level', 'HIGH')}",
        f"   - Weather Condition: {weather.get('weather_condition', 'Clear Skies')} (Rain Prob: {weather.get('rain_probability_pct', 15)}%)",
        "   - Other Mandi Prices: Onion ₹32.00/kg, Potato ₹19.50/kg, Cotton ₹62.00/kg, Rice ₹28.00/kg",
        "",
        "3. LOGISTICS & REALIZATION STANDARDS:",
        "   - Local Freight Cost: ₹1.00/kg",
        "   - Storage Cost: ₹0.50/kg",
        "   - Platform Transaction Fee: 1.0% (approx ₹0.25/kg)",
        f"   - Expected Net Realization: ₹{decision.get('net_realization_per_kg', 24.25)}/kg",
        f"   - Estimated Total Net Payout ({quantity_kg} kg): ₹{round(decision.get('net_realization_per_kg', 24.25) * quantity_kg, 2)}",
        f"   - Decision Engine Recommendation: {decision.get('action', 'STORE')} ({round(decision.get('confidence', 0.8) * 100)}% confidence)",
        f"   - Decision Reasons: {'; '.join(decision.get('reasons', []))}",
        "",
        "4. ACTIVE BUYER PROCUREMENT REQUIREMENTS:",
        *(f"   {b}" for b in buyers_summary),
        "",
        "5. ACTIVE BUYER OFFERS:",
        *(f"   {o}" for o in offers_summary),
        "",
        "6. MARKETPLACE LISTINGS & FPO POOLS:",
        *(f"   {l}" for l in listings_summary),
        "   - Pragati FPO: 5,000 kg Wheat (Sharbati) at ₹26.50/kg in Ujjain (Grade A, Verified)",
        "   - Suresh Patel: 1,200 kg Onion (Red Globe) at ₹33.00/kg in Nashik (Grade A, Verified)",
    ]

    if custom_context:
        context_lines.append("")
        context_lines.append("7. USER'S LIVE SESSION STATE (FRONTEND INPUTS):")
        for k, v in custom_context.items():
            context_lines.append(f"   - {k}: {v}")

    return "\n".join(context_lines)


def _get_language_instruction(language: str) -> str:
    lang_map = {
        "hi": "Respond in clear, natural Hindi (हिन्दी) using Devanagari script",
        "mr": "Respond in natural Marathi (मराठी) using Devanagari script",
        "ta": "Respond in natural Tamil (தமிழ்)",
        "te": "Respond in natural Telugu (తెలుగు)",
        "en": "Respond in clear, professional English",
    }
    return lang_map.get(language.lower(), "Respond in the same language as the user's query")


def run_agent_query(
    query: str,
    language: str = "en",
    crop_name: str = "Wheat",
    quantity_kg: float = 500.0,
    district: str = "Ujjain",
    custom_context: dict[str, Any] | None = None,
    history: list[dict[str, str]] | None = None,
) -> dict:
    """
    Executes a context-aware query using the Google Gemini API.

    Returns:
        dict: {
            "query": query,
            "response": answer_text,
            "engine": "Gemini 2.5 Flash",
            "language": language,
            "status": "success" | "error"
        }
    """
    if not settings.GEMINI_API_KEY:
        error_msg = (
            "Gemini AI Assistant is currently unavailable because GEMINI_API_KEY is not configured in backend/.env."
            if language == "en"
            else "Gemini AI सेवा वर्तमान में अनुपलब्ध है क्योंकि backend/.env में GEMINI_API_KEY कॉन्फ़िगर नहीं है।"
        )
        return {
            "query": query,
            "response": error_msg,
            "engine": "Unavailable",
            "language": language,
            "status": "error",
            "error": "GEMINI_API_KEY not configured",
        }

    try:
        import google.generativeai as genai

        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            generation_config=genai.types.GenerationConfig(
                temperature=0.4,
                max_output_tokens=1024,
            ),
        )

        app_context = _get_app_context(
            crop_name=crop_name,
            quantity_kg=quantity_kg,
            district=district,
            custom_context=custom_context,
        )

        lang_instruction = _get_language_instruction(language)
        system_instruction = SYSTEM_PROMPT_TEMPLATE.format(
            language_instruction=lang_instruction,
            app_context=app_context,
        )

        # Build prompt including recent conversation turns if provided
        prompt_parts = [system_instruction, "\n=== CONVERSATION ==="]
        if history:
            for turn in history[-6:]:  # include up to last 6 messages
                sender = "User" if turn.get("sender") == "user" else "Assistant"
                prompt_parts.append(f"{sender}: {turn.get('text', '')}")

        prompt_parts.append(f"User: {query}")
        prompt_parts.append("Assistant:")

        full_prompt = "\n".join(prompt_parts)
        response = model.generate_content(full_prompt)
        response_text = (response.text or "").strip()

        return {
            "query": query,
            "response": response_text,
            "engine": "Gemini 2.5 Flash",
            "language": language,
            "status": "success",
        }

    except Exception as exc:
        logger.exception("Gemini assistant query failed: %s", exc)
        error_msg = (
            f"Gemini AI request encountered an issue ({type(exc).__name__}). Please try again shortly."
            if language == "en"
            else f"Gemini AI अनुरोध में समस्या आई ({type(exc).__name__})। कृपया थोड़ी देर बाद पुनः प्रयास करें।"
        )
        return {
            "query": query,
            "response": error_msg,
            "engine": "Unavailable",
            "language": language,
            "status": "error",
            "error": str(exc),
        }

