import { useState, useEffect, useRef } from "react";
import { askAgent } from "../api/client.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

export default function AgentAssistantModal({ isOpen, onClose }) {
  const { language, t } = useLanguage();
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const messagesEndRef = useRef(null);

  // Initialize or update greeting when modal opens or language changes
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greetingText =
        t("assistant.greeting") ||
        "Namaste! I am KisanSetu AI Assistant (powered by Gemini 2.5 Flash). Ask me about live mandi prices, best selling times, buyer offers, or produce storage options.";
      setMessages([
        {
          sender: "agent",
          text: greetingText,
          engine: "Gemini 2.5 Flash",
        },
      ]);
    }
  }, [isOpen, language, t, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend) => {
    const trimmed = textToSend?.trim();
    if (!trimmed || loading) return;

    const userMsg = trimmed;
    const nextHistory = [...messages, { sender: "user", text: userMsg }];
    setMessages(nextHistory);
    setQuery("");
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await askAgent({
        text: userMsg,
        language: language || "hi",
        crop_name: "Wheat",
        quantity_kg: 500,
        district: "Ujjain",
        history: nextHistory.map((m) => ({
          sender: m.sender,
          text: m.text,
        })),
      });

      if (res?.status === "error") {
        const errorText =
          res.error || res.answer || "AI Assistant is currently unavailable. Please try again later.";
        setErrorMsg(errorText);
        setMessages((prev) => [
          ...prev,
          {
            sender: "agent",
            text: res.answer || "AI Assistant is currently unavailable. Please check backend/.env GEMINI_API_KEY.",
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "agent",
            text: res?.answer || res?.response || "No response received.",
            engine: res?.engine || "Gemini 2.5 Flash",
          },
        ]);
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.error ||
        err?.message ||
        "AI Assistant is currently unavailable. Please try again later.";
      setErrorMsg(errMsg);
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: `⚠️ ${errMsg}`,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(query);
  };

  const rawChips = t("assistant.sampleChips");
  const sampleChips = Array.isArray(rawChips)
    ? rawChips
    : [
        "What should I do with my wheat?",
        "Which buyer gives me the best deal?",
        "Should I store my crop or sell now?",
      ];

  return (
    <ErrorBoundary
      fallback={
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-center space-y-4">
            <div className="text-4xl">🌾</div>
            <h3 className="text-lg font-bold text-gray-900">KisanSetu AI Assistant</h3>
            <p className="text-sm text-gray-600">
              AI Assistant is currently unavailable. Please try again later.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        </div>
      }
    >
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-emerald-100 dark:border-slate-800 flex flex-col h-[580px] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700/80 flex items-center justify-center text-xl font-bold border border-emerald-400/50 shadow-inner">
                🌾
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base leading-tight">
                    {t("assistant.title", "KisanSetu AI Assistant")}
                  </h3>
                  <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {t("assistant.poweredBy", "✦ Gemini 2.5 Flash")}
                  </span>
                </div>
                <p className="text-xs text-emerald-200/80">
                  {t("assistant.subtitle", "Context-Aware Agricultural Market Advisory")}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-emerald-200 hover:text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-emerald-800/60 transition cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Message Log */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 dark:bg-slate-950">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : m.isError
                      ? "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 rounded-bl-none"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-none"
                  }`}
                >
                  {m.text}
                  {m.engine && !m.isError && (
                    <div className="mt-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold opacity-80 flex items-center gap-1">
                      <span>✦ {m.engine}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-slate-700 px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shadow-sm animate-pulse">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  {t("assistant.loadingText", "Analyzing live data...")}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sample Prompt Chips */}
          <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-xs no-scrollbar">
            {sampleChips.map((q, idx) => (
              <button
                key={idx}
                type="button"
                disabled={loading}
                onClick={() => sendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition font-medium text-[11px] disabled:opacity-50 cursor-pointer"
              >
                💬 {q}
              </button>
            ))}
          </div>

          {/* Input area */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("assistant.placeholder", "Type your question...")}
              className="flex-1 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition shadow disabled:opacity-50 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>{t("assistant.send", "Send")}</span>
              <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
}


