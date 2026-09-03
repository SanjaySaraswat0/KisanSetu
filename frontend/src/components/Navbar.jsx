import { useState } from "react";
import { Link } from "react-router-dom";
import AgentAssistantModal from "./AgentAssistantModal.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Navbar() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const { language, setLanguage, t, supportedLanguages } = useLanguage();

  return (
    <>
      <nav className="bg-emerald-950 border-b border-emerald-800 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="text-emerald-400 font-extrabold">
              {t("nav.brand")} <span className="text-amber-400">AI</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/farmer" className="hover:text-emerald-300 transition">
              {t("nav.farmer")}
            </Link>
            <Link to="/buyer" className="hover:text-emerald-300 transition">
              {t("nav.buyer")}
            </Link>
            <Link to="/fpo" className="hover:text-emerald-300 transition">
              {t("nav.fpo")}
            </Link>
            <Link to="/marketplace" className="hover:text-emerald-300 transition">
              {t("nav.marketplace")}
            </Link>
            <Link to="/admin" className="hover:text-emerald-300 transition">
              {t("nav.admin")}
            </Link>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-emerald-900 text-emerald-100 border border-emerald-700 text-xs rounded-md px-2 py-1 focus:outline-none cursor-pointer"
            >
              {supportedLanguages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsAiOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition flex items-center gap-1.5 border border-emerald-400"
            >
              <span>🤖 {t("nav.aiAssistant")}</span>
            </button>
          </div>
        </div>
      </nav>
      <AgentAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
}

