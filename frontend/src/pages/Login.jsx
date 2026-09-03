import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Login() {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto my-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
          {t("login.tag")}
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
          {t("login.title")} <span className="text-emerald-600">AI</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
          {t("login.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link
          to="/farmer"
          className="bg-white p-6 rounded-2xl border-2 border-emerald-500 hover:border-emerald-600 shadow-md hover:shadow-xl transition text-center space-y-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition">👨‍🌾</div>
          <h3 className="text-xl font-extrabold text-gray-900">{t("login.farmerCard.title")}</h3>
          <p className="text-xs text-gray-600 font-medium">{t("login.farmerCard.desc")}</p>
          <div className="bg-emerald-600 text-white font-bold text-xs py-2 rounded-lg">{t("login.enterPortal")}</div>
        </Link>

        <Link
          to="/buyer"
          className="bg-white p-6 rounded-2xl border-2 border-slate-700 hover:border-slate-900 shadow-md hover:shadow-xl transition text-center space-y-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition">🏬</div>
          <h3 className="text-xl font-extrabold text-gray-900">{t("login.buyerCard.title")}</h3>
          <p className="text-xs text-gray-600 font-medium">{t("login.buyerCard.desc")}</p>
          <div className="bg-slate-900 text-white font-bold text-xs py-2 rounded-lg">{t("login.enterPortal")}</div>
        </Link>

        <Link
          to="/fpo"
          className="bg-white p-6 rounded-2xl border-2 border-teal-500 hover:border-teal-600 shadow-md hover:shadow-xl transition text-center space-y-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition">🤝</div>
          <h3 className="text-xl font-extrabold text-gray-900">{t("login.fpoCard.title")}</h3>
          <p className="text-xs text-gray-600 font-medium">{t("login.fpoCard.desc")}</p>
          <div className="bg-teal-700 text-white font-bold text-xs py-2 rounded-lg">{t("login.enterPortal")}</div>
        </Link>

        <Link
          to="/admin"
          className="bg-white p-6 rounded-2xl border-2 border-amber-500 hover:border-amber-600 shadow-md hover:shadow-xl transition text-center space-y-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition">⚙️</div>
          <h3 className="text-xl font-extrabold text-gray-900">{t("login.adminCard.title")}</h3>
          <p className="text-xs text-gray-600 font-medium">{t("login.adminCard.desc")}</p>
          <div className="bg-amber-600 text-white font-bold text-xs py-2 rounded-lg">{t("login.enterPortal")}</div>
        </Link>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
        <h3 className="font-black text-emerald-950 text-lg">💡 {t("login.engineTitle")}</h3>
        <p className="text-xs text-emerald-800 max-w-3xl mx-auto">
          {t("login.engineDesc")}
        </p>
      </div>
    </div>
  );
}

