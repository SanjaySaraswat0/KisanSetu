"""
Offline training script for the Sell-Decision classifier (XGBoost / RandomForest fallback).
"""
import argparse
import json
from pathlib import Path

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

MODEL_DIR = Path(__file__).resolve().parent / "models"
MODEL_DIR.mkdir(exist_ok=True)

FEATURE_COLUMNS = [
    "current_price",
    "predicted_price_7d",
    "price_volatility_30d",
    "storage_capacity_kg",
    "quantity_kg",
    "days_since_harvest",
    "distance_to_nearest_buyer_km",
]
LABEL_COLUMN = "label"


def train(csv_path: str) -> None:
    df = pd.read_csv(csv_path)
    X = df[FEATURE_COLUMNS]
    y_raw = df[LABEL_COLUMN]

    encoder = LabelEncoder()
    y = encoder.fit_transform(y_raw)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    try:
        import xgboost as xgb
        model = xgb.XGBClassifier(
            n_estimators=200,
            max_depth=4,
            learning_rate=0.05,
            objective="multi:softprob",
            num_class=len(encoder.classes_),
            eval_metric="mlogloss",
        )
        model.fit(X_train, y_train)
        model.save_model(str(MODEL_DIR / "decision_model.json"))
        feature_importances = model.feature_importances_
        engine = "XGBoost"
    except Exception:
        model = RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42)
        model.fit(X_train, y_train)
        feature_importances = model.feature_importances_
        engine = "RandomForest (Scikit-Learn Fallback)"

    preds = model.predict(X_test)
    print(classification_report(y_test, preds, target_names=encoder.classes_))

    shap_summary_path = MODEL_DIR / "decision_model_shap_summary.json"
    mean_shap = [float(val) for val in feature_importances]

    with open(shap_summary_path, "w") as f:
        json.dump(
            {"engine": engine, "feature_names": FEATURE_COLUMNS, "mean_abs_shap": mean_shap},
            f,
            indent=2,
        )

    with open(MODEL_DIR / "decision_model_labels.json", "w") as f:
        json.dump(list(encoder.classes_), f)

    print(f"Model trained successfully using {engine}!")
    print(f"Saved feature-importance summary -> {shap_summary_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train the Sell-Decision classifier.")
    parser.add_argument("--csv", required=True, help="Path to labeled training CSV")
    args = parser.parse_args()
    train(args.csv)
