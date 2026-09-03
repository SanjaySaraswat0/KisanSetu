import { useLanguage } from "../context/LanguageContext.jsx";

const ACTION_STYLES = {
  SELL_NOW: "bg-green-100 text-green-800 border-green-300",
  WAIT: "bg-yellow-100 text-yellow-800 border-yellow-300",
  STORE: "bg-blue-100 text-blue-800 border-blue-300",
  AGGREGATE: "bg-purple-100 text-purple-800 border-purple-300",
  FPO_POOL: "bg-purple-100 text-purple-800 border-purple-300",
};

export default function SellDecisionCard({ decision }) {
  const { t } = useLanguage();
  if (!decision) return null;

  const style = ACTION_STYLES[decision.action] || "bg-gray-100 text-gray-800 border-gray-300";
  const actionLabel = t(`actions.${decision.action}`, decision.action?.replace("_", " ") || "Decision");

  return (
    <div className={`rounded-lg border p-4 ${style}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">{actionLabel}</h3>
        <span className="text-sm opacity-75">
          {t("decisionCard.confidence")}: {Math.round((decision.confidence || 0.8) * 100)}%
        </span>
      </div>
      <p className="mt-2 text-sm">{decision.reasoning || decision.explanation}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
        <div>
          <div className="opacity-60">{t("decisionCard.currentPrice")}</div>
          <div className="font-semibold">₹{decision.current_price_per_kg}/kg</div>
        </div>
        <div>
          <div className="opacity-60">{t("decisionCard.forecast7d")}</div>
          <div className="font-semibold">₹{decision.predicted_price_per_kg_7d}/kg</div>
        </div>
        <div>
          <div className="opacity-60">{t("decisionCard.netRealization")}</div>
          <div className="font-semibold">₹{decision.net_realization_per_kg}/kg</div>
        </div>
      </div>
    </div>
  );
}

