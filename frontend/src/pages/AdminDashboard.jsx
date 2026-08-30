import React from "react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Farmers", value: "1,420", color: "border-emerald-500 text-emerald-800" },
    { label: "Active Buyers", value: "85", color: "border-blue-500 text-blue-800" },
    { label: "Registered FPOs", value: "18", color: "border-purple-500 text-purple-800" },
    { label: "Active Listings", value: "340", color: "border-amber-500 text-amber-800" },
    { label: "Transaction Volume", value: "₹48.5L", color: "border-teal-500 text-teal-800" },
    { label: "Total Volume", value: "2,450 Tonnes", color: "border-indigo-500 text-indigo-800" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <span className="bg-slate-700 text-amber-400 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
            Admin Console
          </span>
          <h1 className="text-2xl font-black mt-2">KisanSetu Platform Management</h1>
          <p className="text-slate-300 text-sm mt-1">Platform analytics, dispute resolution & market dataset verification.</p>
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
        <h2 className="text-lg font-bold text-gray-800 mb-4">Pending Dispute Resolution</h2>
        <div className="border border-rose-200 bg-rose-50/50 rounded-lg p-4 flex justify-between items-center">
          <div>
            <span className="bg-rose-600 text-white text-xs font-extrabold px-2.5 py-0.5 rounded">ORDER #881</span>
            <div className="font-bold text-gray-900 mt-1">Ramesh Kumar (Farmer) vs AgriCorp Processing Ltd (Buyer)</div>
            <p className="text-xs text-gray-600">Discrepancy in produce quality grading score (Grade A quoted vs Grade B received).</p>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition">
            Review Dispute
          </button>
        </div>
      </div>
    </div>
  );
}
