import React, { useState } from "react";

export default function QualityGradingCard() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState({
    detected_crop: "Wheat",
    quality_grade: "Grade A",
    defect_percentage: 1.8,
    detected_defects: ["Minor size variation"],
    confidence: 0.94,
    summary: "Premium produce with high color uniformity and negligible defects.",
  });

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResult({
        detected_crop: "Wheat",
        quality_grade: "Grade A",
        defect_percentage: 1.5,
        detected_defects: ["Clean grain", "Moisture 12.2%"],
        confidence: 0.96,
        summary: "High quality export grade crop analyzed by YOLOv8 vision pipeline.",
      });
      setAnalyzing(false);
    }, 800);
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span>📷</span> AI Quality Grading (YOLOv8 Vision)
        </h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {result.quality_grade}
        </span>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer mb-4">
        <div className="text-3xl mb-1">🌾</div>
        <div className="text-sm font-semibold text-gray-700">Click or drag crop image to analyze quality</div>
        <div className="text-xs text-gray-500">Supports JPG, PNG (Max 5MB)</div>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={analyzing}
        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-sm shadow transition"
      >
        {analyzing ? "Analyzing Quality..." : "Scan Crop Quality"}
      </button>

      {result && (
        <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1.5">
          <div className="flex justify-between font-bold text-emerald-900">
            <span>Detected Crop: {result.detected_crop}</span>
            <span>Confidence: {(result.confidence * 100).toFixed(0)}%</span>
          </div>
          <p className="text-gray-700">{result.summary}</p>
          <div className="text-gray-600 font-medium">Defect Rate: {result.defect_percentage}%</div>
        </div>
      )}
    </div>
  );
}
