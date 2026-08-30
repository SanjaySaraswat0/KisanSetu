import React from "react";

export default function NetRealizationCard({
  quotedPrice = 25.50,
  transportCost = 1.00,
  storageCost = 0.00,
  platformFee = 0.25,
  netRealization = 24.25,
  quantityKg = 500,
  buyerName = "AgriCorp Processing Ltd",
  isRecommended = true,
}) {
  const totalNet = (netRealization * quantityKg).toLocaleString("en-IN");

  return (
    <div className={`p-5 rounded-xl border ${isRecommended ? 'border-emerald-500 bg-emerald-50/60 shadow-md' : 'border-gray-200 bg-white'}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Buyer Offer</span>
          <h3 className="text-lg font-extrabold text-gray-800">{buyerName}</h3>
        </div>
        {isRecommended && (
          <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase">
            Best Net Realization
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 bg-white p-3 rounded-lg border border-gray-100 shadow-sm text-center">
        <div>
          <div className="text-xs text-gray-500">Quoted Price</div>
          <div className="text-base font-bold text-gray-800">₹{quotedPrice}/kg</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Transport Cost</div>
          <div className="text-base font-semibold text-rose-600">-₹{transportCost}/kg</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Storage / Fees</div>
          <div className="text-base font-semibold text-rose-600">-₹{(storageCost + platformFee).toFixed(2)}/kg</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded p-1">
          <div className="text-xs text-emerald-700 font-bold">NET REALIZATION</div>
          <div className="text-lg font-extrabold text-emerald-800">₹{netRealization}/kg</div>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm font-semibold border-t pt-3 border-gray-200">
        <span className="text-gray-600">Total Net Payout ({quantityKg} kg):</span>
        <span className="text-xl font-black text-emerald-700">₹{totalNet}</span>
      </div>
    </div>
  );
}
