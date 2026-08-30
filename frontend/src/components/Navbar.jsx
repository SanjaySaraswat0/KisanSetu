import { useState } from "react";
import { Link } from "react-router-dom";
import AgentAssistantModal from "./AgentAssistantModal.jsx";

export default function Navbar() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [lang, setLang] = useState("hi");

  return (
    <>
      <nav className="bg-emerald-950 border-b border-emerald-800 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="text-emerald-400 font-extrabold">KisanSetu <span className="text-amber-400">AI</span></span>
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium">
            <Link to="/farmer" className="hover:text-emerald-300 transition">Farmer</Link>
            <Link to="/buyer" className="hover:text-emerald-300 transition">Buyer</Link>
            <Link to="/fpo" className="hover:text-emerald-300 transition">FPO Pooling</Link>
            <Link to="/marketplace" className="hover:text-emerald-300 transition">Marketplace</Link>
            <Link to="/admin" className="hover:text-emerald-300 transition">Admin</Link>

            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-emerald-900 text-emerald-100 border border-emerald-700 text-xs rounded-md px-2 py-1 focus:outline-none"
            >
              <option value="hi">🇮🇳 हिन्दी (Hindi)</option>
              <option value="en">🇬🇧 English</option>
              <option value="mr">🇮🇳 मराठी (Marathi)</option>
              <option value="ta">🇮🇳 தமிழ் (Tamil)</option>
            </select>

            <button
              onClick={() => setIsAiOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-md transition flex items-center gap-1.5 border border-emerald-400"
            >
              <span>🤖 AI Assistant</span>
            </button>
          </div>
        </div>
      </nav>
      <AgentAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
}
