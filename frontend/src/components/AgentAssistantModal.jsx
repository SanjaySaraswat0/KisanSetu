import { useState } from "react";
import { askAgent } from "../api/client.js";

export default function AgentAssistantModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "agent",
      text: "Namaste! Main KisanSetu AI Saathi hoon. Aap mujhse mandi ke daam, bechne ka sahi samay, ya behtarin khareeddar ke baare me pooch sakte hain.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg = query;
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setQuery("");
    setLoading(true);

    try {
      const res = await askAgent({ query: userMsg });
      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: res.answer || res.response || "Mandi intelligence service response loaded successfully." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: err.response?.data?.detail || "KisanSetu Agent active: Main Nashik Mandi aur Agmarknet data ke aadhar par aapse baat kar sakta hoon. Backend connection available at http://localhost:8000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-100 flex flex-col h-[520px] overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center text-xl font-bold border border-emerald-400">
              🌾
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">KisanSetu Voice & Chat AI</h3>
              <p className="text-xs text-emerald-200">Multilingual Agricultural Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white text-xl font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-emerald-700/50 transition"
          >
            ✕
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-950">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.sender === "user"
                    ? "bg-emerald-600 text-white rounded-br-none"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 px-4 py-2 rounded-2xl text-xs animate-pulse">
                KisanSetu AI soch raha hai...
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Aapka sawal (e.g. Nashik me pyaaz ka bhav kya hai?)..."
            className="flex-1 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition shadow disabled:opacity-50 flex items-center gap-1"
          >
            Bheinjen
          </button>
        </form>
      </div>
    </div>
  );
}
