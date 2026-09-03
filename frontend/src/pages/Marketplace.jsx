import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function Marketplace() {
  const { t } = useLanguage();
  const [filterCrop, setFilterCrop] = useState("All");

  const listings = [
    {
      id: "m-101",
      seller: "Ramesh Kumar (Farmer)",
      crop: "Wheat",
      variety: "Sharbati",
      quantity: "500 kg",
      price: "₹25.00/kg",
      location: "Ujjain, MP",
      grade: "Grade A",
      verified: true,
    },
    {
      id: "m-102",
      seller: "Pragati FPO (Aggregated Lot)",
      crop: "Wheat",
      variety: "Sharbati",
      quantity: "5,000 kg",
      price: "₹26.50/kg",
      location: "Ujjain, MP",
      grade: "Grade A",
      verified: true,
    },
    {
      id: "m-103",
      seller: "Suresh Patel (Farmer)",
      crop: "Onion",
      variety: "Red Globe",
      quantity: "1,200 kg",
      price: "₹33.00/kg",
      location: "Nashik, MH",
      grade: "Grade A",
      verified: true,
    },
  ];

  const filterOptions = [
    { key: "All", label: t("marketplace.all") },
    { key: "Wheat", label: t("marketplace.wheat") },
    { key: "Onion", label: t("marketplace.onion") },
  ];

  const filtered = filterCrop === "All" ? listings : listings.filter((l) => l.crop === filterCrop);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900">🌾 {t("marketplace.title")}</h1>
          <p className="text-gray-600 text-sm">{t("marketplace.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setFilterCrop(opt.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                filterCrop === opt.key ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                {item.grade}
              </span>
              {item.verified && (
                <span className="text-xs font-extrabold text-blue-600 flex items-center gap-1">
                  {t("marketplace.verifiedSeller")}
                </span>
              )}
            </div>

            <h3 className="text-xl font-black text-gray-900">{item.crop} ({item.variety})</h3>
            <div className="text-xs font-semibold text-gray-500 mb-3">{item.seller}</div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 space-y-1 text-sm my-3">
              <div className="flex justify-between">
                <span className="text-gray-500">{t("marketplace.availableQty")}</span>
                <span className="font-extrabold text-gray-800">{item.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{t("marketplace.askingPrice")}</span>
                <span className="font-black text-emerald-700">{item.price}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 pt-1">
                <span>{t("marketplace.location")}</span>
                <span>{item.location}</span>
              </div>
            </div>

            <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-xs transition">
              {t("marketplace.makeOfferBtn")}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

