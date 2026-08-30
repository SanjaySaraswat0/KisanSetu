"""
Offline training script for the per-crop price-forecasting model (Prophet).

Usage:
    python -m app.ml.train_price_model --crop onion --csv data/onion_prices.csv

Expected CSV columns: `arrival_date` (YYYY-MM-DD), `modal_price` (numeric).
For a real run, fetch history via app.services.data_ingestion.agmarknet_client
and dump it to CSV first, or feed the records straight in with
price_forecast_service.price_history_dataframe().

Saves the trained model to app/ml/models/prophet_<crop>.json so that
app/services/price_forecast_service.py can load it at request time.
"""
import argparse
import json
from pathlib import Path

import pandas as pd
from prophet import Prophet
from prophet.serialize import model_to_json

MODEL_DIR = Path(__file__).resolve().parent / "models"
MODEL_DIR.mkdir(exist_ok=True)


def train(crop: str, csv_path: str) -> None:
    df = pd.read_csv(csv_path)
    df = df.rename(columns={"arrival_date": "ds", "modal_price": "y"})
    df["ds"] = pd.to_datetime(df["ds"])
    df["y"] = pd.to_numeric(df["y"], errors="coerce")
    df = df.dropna(subset=["ds", "y"]).sort_values("ds")

    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False,
        changepoint_prior_scale=0.1,
    )
    model.fit(df)

    out_path = MODEL_DIR / f"prophet_{crop.lower()}.json"
    with open(out_path, "w") as f:
        json.dump(model_to_json(model), f)

    print(f"Saved trained Prophet model for '{crop}' -> {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train a Prophet price model for one crop.")
    parser.add_argument("--crop", required=True, help="Crop name, e.g. onion, wheat, cotton")
    parser.add_argument("--csv", required=True, help="Path to historical price CSV")
    args = parser.parse_args()
    train(args.crop, args.csv)
