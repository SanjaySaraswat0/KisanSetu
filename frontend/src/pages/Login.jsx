import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="max-w-4xl mx-auto my-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
          SIH26132 — Market Linkages & Price Discovery
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
          KisanSetu <span className="text-emerald-600">AI</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
          Helping farmers answer: <span className="font-bold text-emerald-800">When to sell? Where to sell? Whom to sell to? Should I sell now, store, or aggregate through an FPO?</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/farmer"
          className="bg-white p-6 rounded-2xl border-2 border-emerald-500 hover:border-emerald-600 shadow-md hover:shadow-xl transition text-center space-y-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition">👨‍🌾</div>
          <h3 className="text-xl font-extrabold text-gray-900">Farmer Portal</h3>
          <p className="text-xs text-gray-600 font-medium">AI sell recommendations, expected net realization, weather signals, and FPO pooling.</p>
          <div className="bg-emerald-600 text-white font-bold text-xs py-2 rounded-lg">Enter Portal →</div>
        </Link>

        <Link
          to="/buyer"
          className="bg-white p-6 rounded-2xl border-2 border-slate-700 hover:border-slate-900 shadow-md hover:shadow-xl transition text-center space-y-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition">🏬</div>
          <h3 className="text-xl font-extrabold text-gray-900">Buyer Portal</h3>
          <p className="text-xs text-gray-600 font-medium">For Processors, Wholesalers, Retailers & Bulk Buyers to post requirements and match lots.</p>
          <div className="bg-slate-900 text-white font-bold text-xs py-2 rounded-lg">Enter Portal →</div>
        </Link>

        <Link
          to="/fpo"
          className="bg-white p-6 rounded-2xl border-2 border-teal-500 hover:border-teal-600 shadow-md hover:shadow-xl transition text-center space-y-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition">🤝</div>
          <h3 className="text-xl font-extrabold text-gray-900">FPO Pooling</h3>
          <p className="text-xs text-gray-600 font-medium">Aggregate smallholder lots (100kg + 150kg + 250kg = 500kg) for high-value contract negotiation.</p>
          <div className="bg-teal-700 text-white font-bold text-xs py-2 rounded-lg">Enter Portal →</div>
        </Link>

        <Link
          to="/admin"
          className="bg-white p-6 rounded-2xl border-2 border-amber-500 hover:border-amber-600 shadow-md hover:shadow-xl transition text-center space-y-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition">⚙️</div>
          <h3 className="text-xl font-extrabold text-gray-900">Admin Console</h3>
          <p className="text-xs text-gray-600 font-medium">Platform metrics, dispute handling, quality inspection logs, and market price data oversight.</p>
          <div className="bg-amber-600 text-white font-bold text-xs py-2 rounded-lg">Enter Portal →</div>
        </Link>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
        <h3 className="font-black text-emerald-950 text-lg">💡 Powered by KisanSetu Intelligence Engine</h3>
        <p className="text-xs text-emerald-800 max-w-3xl mx-auto">
          Combining Mandi Price Forecasts (Prophet) + Sell-Decision Classifier (XGBoost + SHAP) + Produce Quality Grading (YOLOv8) + Voice AI Agent (BHASHINI + LangGraph + Gemini API) + Smart Net Realization Calculator.
        </p>
      </div>
    </div>
  );
}
