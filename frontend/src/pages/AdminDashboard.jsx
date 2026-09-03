import React from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function AdminDashboard() {
  const { t } = useLanguage();

  const stats = [
    { label: t("admin.stats.farmers"), value: "1,420", color: "border-emerald-500 text-emerald-800" },
    { label: t("admin.stats.buyers"), value: "85", color: "border-blue-500 text-blue-800" },
    { label: t("admin.stats.fpos"), value: "18", color: "border-purple-500 text-purple-800" },
    { label: t("admin.stats.listings"), value: "340", color: "border-amber-500 text-amber-800" },
    { label: t("admin.stats.txVolume"), value: "₹48.5L", color: "border-teal-500 text-teal-800" },
    { label: t("admin.stats.totalVolume"), value: "2,450 Tonnes", color: "border-indigo-500 text-indigo-800" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <span className="bg-slate-700 text-amber-400 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
            {t("admin.bannerTag")}
          </span>
          <h1 className="text-2xl font-black mt-2">{t("admin.title")}</h1>
          <p className="text-slate-300 text-sm mt-1">{t("admin.subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s, idx) => (
          <div key={idx} className={`bg-white p-5 rounded-xl border-l-4 ${s.color} border-y border-r border-gray-200 shadow-sm`}>
            <div className="text-xs font-bold text-gray-500 uppercase">{s.label}</div>
            <div className="text-2xl font-black mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{t("admin.disputeTitle")}</h2>
        <div className="border border-rose-200 bg-rose-50/50 rounded-lg p-4 flex justify-between items-center">
          <div>
            <span className="bg-rose-600 text-white text-xs font-extrabold px-2.5 py-0.5 rounded">
              {t("admin.orderTag")}
            </span>
            <div className="font-bold text-gray-900 mt-1">{t("admin.disputeDesc")}</div>
            <p className="text-xs text-gray-600">{t("admin.disputeReason")}</p>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition">
            {t("admin.reviewBtn")}
          </button>
        </div>
      </div>
    </div>
  );
}

