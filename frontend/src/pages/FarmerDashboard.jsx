import { useState } from "react";
import SellDecisionCard from "../components/SellDecisionCard.jsx";
import NetRealizationCard from "../components/NetRealizationCard.jsx";
import QualityGradingCard from "../components/QualityGradingCard.jsx";

export default function FarmerDashboard() {
  const [form, setForm] = useState({
    crop_name: "Wheat",
    quantity_kg: 500,
    district: "Ujjain",
    harvest_date: "5 days",
    storage_capacity_kg: 600,
  });

  const [decision, setDecision] = useState({
    action: "STORE",
    confidence: 0.78,
    crop_name: "Wheat",
    quantity_kg: 500,
    current_price_per_kg: 24.50,
    predicted_price_per_kg_7d: 27.00,
    net_realization_per_kg: 25.50,
    demand_level: "HIGH",
    weather_condition: "Favourable / Clear Skies",
    reasons: [
      "7-day price forecast indicates a +10.2% gain due to rising regional demand.",
      "You have 600 kg storage capacity available (exceeding your 500 kg lot).",
      "Holding produce yields +₹1.25/kg HIGHER expected NET REALIZATION after storage fees.",
    ],
    explanation: "7-day price forecast indicates a +10.2% gain due to rising regional demand.",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleEvaluate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setDecision({
        action: form.storage_capacity_kg >= form.quantity_kg ? "STORE" : "AGGREGATE",
        confidence: 0.82,
        crop_name: form.crop_name,
        quantity_kg: form.quantity_kg,
        current_price_per_kg: 24.50,
        predicted_price_per_kg_7d: 27.20,
        net_realization_per_kg: 25.70,
        demand_level: "HIGH",
        weather_condition: "Clear Skies / Favourable",
        reasons: [
          `Forecast indicates price increase for ${form.crop_name} in ${form.district}.`,
          form.storage_capacity_kg >= form.quantity_kg
            ? "Storage available — holding produce maximizes net realization."
            : "Storage limited — pool with Pragati FPO for shared storage and bulk buyer rate.",
        ],
        explanation: "AI analyzed live mandi prices, arrival trends, and weather risks.",
      });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <span className="bg-amber-400 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase">
            Farmer Decision Engine
          </span>
          <h1 className="text-2xl font-black mt-2">Welcome, Ramesh Kumar</h1>
          <p className="text-emerald-200 text-sm mt-1">Ujjain, Madhya Pradesh • Pragati Kisan FPO Member</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-xs text-emerald-200 uppercase font-bold">Mandi Price (Wheat)</div>
          <div className="text-3xl font-black text-amber-400">₹2,450 / quintal <span className="text-sm font-normal text-emerald-200">↑ +3.2%</span></div>
        </div>
      </div>

      {/* Market Signals Quick Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-xs text-gray-500 font-bold">Market Price</div>
          <div className="text-lg font-extrabold text-emerald-700">₹24.50 / kg ↑</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-xs text-gray-500 font-bold">Demand Level</div>
          <div className="text-lg font-extrabold text-blue-700">HIGH 📈</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-xs text-gray-500 font-bold">Weather Risk</div>
          <div className="text-lg font-extrabold text-teal-700">LOW (Clear) ☀️</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200 text-center shadow-sm">
          <div className="text-xs text-gray-500 font-bold">Logistics Freight</div>
          <div className="text-lg font-extrabold text-gray-800">₹1.00 / kg</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Input Column */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">🌾 Enter Produce Details</h3>
          <form onSubmit={handleEvaluate} className="space-y-3 text-sm">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Crop Name</label>
              <select name="crop_name" value={form.crop_name} onChange={handleChange} className="w-full border rounded-lg p-2 bg-gray-50">
                <option value="Wheat">Wheat (गेहूँ)</option>
                <option value="Onion">Onion (प्याज)</option>
                <option value="Potato">Potato (आलू)</option>
                <option value="Cotton">Cotton (कपास)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Quantity (kg)</label>
              <input type="number" name="quantity_kg" value={form.quantity_kg} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">District</label>
              <input type="text" name="district" value={form.district} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Harvest Readiness</label>
              <input type="text" name="harvest_date" value={form.harvest_date} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Available Storage (kg)</label>
              <input type="number" name="storage_capacity_kg" value={form.storage_capacity_kg} onChange={handleChange} className="w-full border rounded-lg p-2" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg shadow transition">
              {loading ? "Analyzing Market..." : "Calculate AI Decision"}
            </button>
          </form>
        </div>

        {/* AI Recommendation Output */}
        <div className="lg:col-span-2 space-y-5">
          <SellDecisionCard decision={decision} />
          <NetRealizationCard
            quotedPrice={25.50}
            transportCost={1.00}
            storageCost={0.00}
            platformFee={0.25}
            netRealization={24.25}
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
