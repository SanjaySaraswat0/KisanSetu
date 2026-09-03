import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getPriceHistory } from "../api/client.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function PriceTrends() {
  const { t } = useLanguage();
  const { crop } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getPriceHistory(crop).then((data) => setRecords(data.records || []));
  }, [crop]);

  const chartData = records.map((r) => ({
    date: r.arrival_date,
    price: Number(r.modal_price),
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-navy mb-4 capitalize">
        {crop} — {t("trends.priceTrend")}
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#1E7A46" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

