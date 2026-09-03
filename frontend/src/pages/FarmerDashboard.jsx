import { useState } from "react";
import SellDecisionCard from "../components/SellDecisionCard.jsx";
import NetRealizationCard from "../components/NetRealizationCard.jsx";
import QualityGradingCard from "../components/QualityGradingCard.jsx";
import { getAIDecision } from "../api/client.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function FarmerDashboard() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    crop_name: "Wheat",
    quantity_kg: 500,
    district: "Ujjain",
    harvest_date: "5",
    storage_capacity_kg: 600,
    current_price_per_kg: 24.50,
    transport_cost_per_kg: 1.0,
    storage_cost_per_kg: 0.5,
  });

  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEvaluate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);
    try {
      const payload = {
        crop_name: form.crop_name,
        quantity_kg: parseFloat(form.quantity_kg) || 0,
        district: form.district,
        harvest_readiness_days: parseInt(form.harvest_date, 10) || 5,
        storage_capacity_kg: parseFloat(form.storage_capacity_kg) || 0,
        current_price_per_kg: parseFloat(form.current_price_per_kg) || 24.50,
        transport_cost_per_kg: parseFloat(form.transport_cost_per_kg) || 1.0,
        storage_cost_per_kg: parseFloat(form.storage_cost_per_kg) || 0.5,
      };
      const data = await getAIDecision(payload);
      setDecision(data);
    } catch (err) {
      setApiError(
        err?.response?.data?.detail ??
          err?.message ??
          "Failed to get AI decision. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <span className="bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase">
            {t("farmer.bannerTag")}
          </span>
          <h1 className="text-2xl font-black mt-2">{t("farmer.welcome")}</h1>
          <p className="text-emerald-200 text-sm mt-1">{t("farmer.subtitle")}</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-xs text-emerald-200 uppercase font-bold">{t("farmer.mandiPriceTitle")}</div>
          <div className="text-3xl font-black text-amber-400">
            ₹2,450 {t("farmer.perQuintal")} <span className="text-sm font-normal text-emerald-200">↑ +3.2%</span>
          </div>
        </div>
      </div>

      {/* Market Signals Quick Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-xs text-gray-500 font-bold">{t("signals.marketPrice")}</div>
          <div className="text-lg font-extrabold text-emerald-700">₹24.50 {t("farmer.perKg")} ↑</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-xs text-gray-500 font-bold">{t("signals.demandLevel")}</div>
          <div className="text-lg font-extrabold text-blue-700">
            {decision ? decision.demand_level : t("signals.high")} 📈
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-xs text-gray-500 font-bold">{t("signals.weatherRisk")}</div>
          <div className="text-lg font-extrabold text-teal-700">
            {decision ? decision.weather_condition : t("signals.clear")} ☀️
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-xs text-gray-500 font-bold">{t("signals.logisticsFreight")}</div>
          <div className="text-lg font-extrabold text-gray-800">₹{form.transport_cost_per_kg} {t("farmer.perKg")}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Input Column */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">🌾 {t("farmer.formTitle")}</h3>
          <form onSubmit={handleEvaluate} className="space-y-3 text-sm">
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("farmer.cropName")}</label>
              <select name="crop_name" value={form.crop_name} onChange={handleChange} className="w-full border rounded-lg p-2 bg-gray-50">
                <option value="Wheat">{t("farmer.crops.Wheat")}</option>
                <option value="Onion">{t("farmer.crops.Onion")}</option>
                <option value="Potato">{t("farmer.crops.Potato")}</option>
                <option value="Cotton">{t("farmer.crops.Cotton")}</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("farmer.quantity")}</label>
              <input type="number" name="quantity_kg" value={form.quantity_kg} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("farmer.district")}</label>
              <input type="text" name="district" value={form.district} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("farmer.daysUntilHarvest")}</label>
              <input type="number" name="harvest_date" value={form.harvest_date} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("farmer.availableStorage")}</label>
              <input type="number" name="storage_capacity_kg" value={form.storage_capacity_kg} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("farmer.currentPrice")}</label>
              <input type="number" step="0.01" name="current_price_per_kg" value={form.current_price_per_kg} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-gray-700 mb-1">{t("farmer.transportCost")}</label>
                <input type="number" step="0.01" name="transport_cost_per_kg" value={form.transport_cost_per_kg} onChange={handleChange} className="w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">{t("farmer.storageCost")}</label>
                <input type="number" step="0.01" name="storage_cost_per_kg" value={form.storage_cost_per_kg} onChange={handleChange} className="w-full border rounded-lg p-2" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-400 text-white font-bold py-2.5 rounded-lg shadow transition">
              {loading ? t("farmer.calculatingBtn") : t("farmer.calculateBtn")}
            </button>
          </form>
        </div>

        {/* AI Recommendation Output */}
        <div className="lg:col-span-2 space-y-5">
          {/* Error banner */}
          {apiError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              ⚠️ {apiError}
            </div>
          )}

          {/* Placeholder prompt when no decision yet */}
          {!decision && !loading && !apiError && (
            <div className="p-6 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center text-gray-500 text-sm">
              {t("farmer.placeholderPrompt")}
            </div>
          )}

          {/* AI engine badge + decision card */}
          {decision && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {t("farmer.aiRecommendation")}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  decision.ai_engine?.includes("Gemini")
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  ✦ {decision.ai_engine ?? "Rule Engine"}
                </span>
              </div>
              <SellDecisionCard decision={decision} />

              {/* Risk factors — shown only when Gemini returns them */}
              {decision.risk_factors?.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                  <div className="font-bold text-amber-800 mb-2">⚠️ {t("farmer.riskFactorsTitle")}</div>
                  <ul className="space-y-1 text-amber-700 list-disc list-inside">
                    {decision.risk_factors.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                  {decision.recommended_action && (
                    <div className="mt-2 text-amber-900 font-semibold">
                      → {decision.recommended_action}
                    </div>
                  )}
                </div>
              )}

              {/* Total payout summary */}
              {decision.total_payout > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm flex justify-between items-center">
                  <span className="text-emerald-800 font-bold">{t("farmer.totalPayoutLabel")}</span>
                  <span className="text-emerald-900 font-black text-lg">
                    ₹{decision.total_payout.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
            </>
          )}

          <NetRealizationCard
            quotedPrice={decision?.current_price_per_kg ?? 25.50}
            transportCost={decision?.transport_cost_per_kg ?? 1.00}
            storageCost={decision?.storage_cost_per_kg ?? 0.00}
            platformFee={0.25}
            netRealization={decision?.net_realization_per_kg ?? 24.25}
            quantityKg={form.quantity_kg}
            buyerName="AgriCorp Processing Ltd"
            isRecommended={true}
          />
          <QualityGradingCard />
        </div>
      </div>
    </div>
  );
}


