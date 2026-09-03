import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function BuyerDashboard() {
  const { t } = useLanguage();
  const [category, setCategory] = useState("Processor");
  const [requirements, setRequirements] = useState([
    {
      id: "req-201",
      buyerName: "AgriCorp Processing Ltd",
      category: "Processor",
      crop: "Wheat",
      quantity: 5000,
      targetPrice: 26.0,
      grade: "Grade A",
      district: "Ujjain",
    },
    {
      id: "req-202",
      buyerName: "FreshMarts Retail",
      category: "Retailer",
      crop: "Onion",
      quantity: 1500,
      targetPrice: 34.0,
      grade: "Grade A",
      district: "Nashik",
    },
  ]);

  const [form, setForm] = useState({
    crop_name: "Wheat",
    quantity_kg: 2000,
    target_price: 26.0,
    district: "Ujjain",
  });

  const handleCreate = (e) => {
    e.preventDefault();
    const newReq = {
      id: `req-${Date.now()}`,
      buyerName: "AgriCorp Processing Ltd",
      category: category,
      crop: form.crop_name,
      quantity: Number(form.quantity_kg),
      targetPrice: Number(form.target_price),
      grade: "Grade A",
      district: form.district,
    };
    setRequirements([newReq, ...requirements]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <span className="bg-amber-400 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase">
            {t("buyer.bannerTag")}
          </span>
          <h1 className="text-2xl font-black mt-2">{t("buyer.companyName")}</h1>
          <p className="text-slate-300 text-sm mt-1">{t("buyer.subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create Purchase Requirement Form */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">📋 {t("buyer.formTitle")}</h3>
          <form onSubmit={handleCreate} className="space-y-3 text-sm">
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("buyer.category")}</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-lg p-2 bg-gray-50">
                <option value="Processor">{t("buyer.categories.Processor")}</option>
                <option value="Wholesaler">{t("buyer.categories.Wholesaler")}</option>
                <option value="Retailer">{t("buyer.categories.Retailer")}</option>
                <option value="Institutional">{t("buyer.categories.Institutional")}</option>
                <option value="Bulk">{t("buyer.categories.Bulk")}</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("buyer.requiredCrop")}</label>
              <input type="text" value={form.crop_name} onChange={(e) => setForm({ ...form, crop_name: e.target.value })} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("buyer.requiredQuantity")}</label>
              <input type="number" value={form.quantity_kg} onChange={(e) => setForm({ ...form, quantity_kg: e.target.value })} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("buyer.maxOfferPrice")}</label>
              <input type="number" step="0.5" value={form.target_price} onChange={(e) => setForm({ ...form, target_price: e.target.value })} className="w-full border rounded-lg p-2" />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">{t("buyer.targetDistrict")}</label>
              <input type="text" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })} className="w-full border rounded-lg p-2" />
            </div>
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg transition">
              {t("buyer.postBtn")}
            </button>
          </form>
        </div>

        {/* Requirements & FPO Pools Feed */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">{t("buyer.activeTitle")}</h3>
          <div className="space-y-3">
            {requirements.map((req) => (
              <div key={req.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
                <div>
                  <div className="flex gap-2 items-center">
                    <span className="bg-slate-100 text-slate-800 text-xs font-extrabold px-2.5 py-0.5 rounded">
                      {t(`buyer.categories.${req.category}`, req.category)}
                    </span>
                    <span className="text-xs text-gray-500 font-bold">{req.district}</span>
                  </div>
                  <h4 className="text-lg font-black text-gray-900 mt-1">{req.crop} ({req.quantity} kg)</h4>
                  <p className="text-xs text-gray-600">
                    {t("buyer.postedBy")} {req.buyerName} • {t("buyer.qualityGrade")}: {req.grade}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-emerald-700">₹{req.targetPrice}/kg</div>
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg mt-2 transition">
                    {t("buyer.matchBtn")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

