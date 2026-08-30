import React, { useState } from "react";

export default function FPODashboard() {
  const [pools, setPools] = useState([
    {
      id: "pool-101",
      fpoName: "Pragati Kisan Producer Co-op",
      cropName: "Wheat",
      variety: "Sharbati",
      district: "Ujjain",
      targetPrice: 26.50,
      totalQuantityKg: 500,
      members: [
        { name: "Ramesh Kumar", quantity: 100 },
        { name: "Suresh Patel", quantity: 150 },
        { name: "Anita Devi", quantity: 250 },
      ],
      status: "OPEN",
    },
  ]);

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberQty, setNewMemberQty] = useState(100);

  const handleAddMember = (poolId) => {
    if (!newMemberName) return;
    setPools((prev) =>
      prev.map((pool) => {
        if (pool.id === poolId) {
          const updatedMembers = [...pool.members, { name: newMemberName, quantity: Number(newMemberQty) }];
          const updatedTotal = updatedMembers.reduce((acc, m) => acc + m.quantity, 0);
          return { ...pool, members: updatedMembers, totalQuantityKg: updatedTotal };
        }
        return pool;
      })
    );
    setNewMemberName("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <span className="bg-emerald-700 text-emerald-100 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
            FPO Portal
          </span>
          <h1 className="text-2xl font-black mt-2">Pragati Kisan Producer Co-op</h1>
          <p className="text-emerald-200 text-sm mt-1">Manage member produce pooling, aggregate lots & negotiate bulk buyer contracts.</p>
        </div>
        <div className="text-right bg-emerald-800/60 p-4 rounded-xl border border-emerald-700">
          <div className="text-xs text-emerald-200 uppercase font-bold">Total Aggregated Produce</div>
          <div className="text-3xl font-black text-amber-400">45,000 kg</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📦</span> Active Produce Aggregation Pools
        </h2>

        {pools.map((pool) => (
          <div key={pool.id} className="border border-emerald-300 rounded-xl p-5 bg-emerald-50/40 mb-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-extrabold text-emerald-700 uppercase">{pool.district} • {pool.variety}</span>
                <h3 className="text-xl font-black text-gray-900">{pool.cropName} Aggregated Lot</h3>
              </div>
              <div className="text-right">
                <span className="bg-amber-100 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full">
                  Target Price: ₹{pool.targetPrice}/kg
                </span>
                <div className="text-2xl font-black text-emerald-800 mt-1">{pool.totalQuantityKg} kg</div>
              </div>
            </div>

            <div className="my-4 bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Member Lot Contributions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm font-semibold">
                {pool.members.map((m, idx) => (
                  <div key={idx} className="flex justify-between bg-gray-50 p-2 rounded border border-gray-100">
                    <span className="text-gray-700">{m.name}</span>
                    <span className="text-emerald-700 font-extrabold">{m.quantity} kg</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-emerald-200">
              <input
                type="text"
                placeholder="Farmer Name (e.g. Vikram Singh)"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="text-xs border rounded px-3 py-1.5 w-48 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Qty (kg)"
                value={newMemberQty}
                onChange={(e) => setNewMemberQty(e.target.value)}
                className="text-xs border rounded px-3 py-1.5 w-24 focus:outline-none"
              />
              <button
                onClick={() => handleAddMember(pool.id)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded transition"
              >
                + Pool Member Lot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
