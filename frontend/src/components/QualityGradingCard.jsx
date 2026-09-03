import React, { useRef, useState } from "react";
import { analyzeQuality } from "../api/client";
import { useLanguage } from "../context/LanguageContext.jsx";

export default function QualityGradingCard() {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
    setResult(null);
    setError(null);
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzeQuality(selectedFile);
      setResult(data);
    } catch (err) {
      setError(
        err?.response?.data?.detail ??
          err?.message ??
          "Failed to analyze image. Please try again."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span>📷</span> {t("quality.title")}
        </h3>
        {result && (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {result.quality_grade}
          </span>
        )}
      </div>

      {/* Hidden real file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Clickable dashed drop-zone */}
      <div
        onClick={handleDropZoneClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer mb-4"
      >
        <div className="text-3xl mb-1">🌾</div>
        {selectedFile ? (
          <>
            <div className="text-sm font-semibold text-emerald-700">
              {selectedFile.name}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {t("quality.changeImage")}
            </div>
          </>
        ) : (
          <>
            <div className="text-sm font-semibold text-gray-700">
              {t("quality.dropTitle")}
            </div>
            <div className="text-xs text-gray-500">{t("quality.dropSubtitle")}</div>
          </>
        )}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!selectedFile || analyzing}
        className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg text-sm shadow transition"
      >
        {analyzing ? t("quality.scanningBtn") : t("quality.scanBtn")}
      </button>

      {/* Error state */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
          ⚠️ {error}
        </div>
      )}

      {/* Real API result */}
      {result && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1.5">
          <div className="flex justify-between font-bold text-emerald-900">
            <span>{t("quality.detectedCrop")}: {result.detected_crop}</span>
            <span>{t("quality.confidence")}: {(result.confidence * 100).toFixed(0)}%</span>
          </div>
          <p className="text-gray-700">{result.summary}</p>
          <div className="text-gray-600 font-medium">
            {t("quality.defectRate")}: {result.defect_percentage}%
          </div>
          {result.detected_defects?.length > 0 && (
            <div className="text-gray-500">
              {t("quality.defects")}: {result.detected_defects.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

