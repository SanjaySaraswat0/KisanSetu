"""
Sample Data Generator — generates synthetic historical mandi prices and decision dataset for training ML models.
"""
from __future__ import annotations

import math

import numpy as np
import pandas as pd
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)


def generate_price_data(crop: str = "wheat", days: int = 365) -> Path:
    dates = pd.date_range(end=pd.Timestamp.now(), periods=days, freq="D")
    base_price = 22.0 if crop == "wheat" else (35.0 if crop == "onion" else 18.0)

    # Add trend and seasonality
    prices = []
    for i, date in enumerate(dates):
        seasonality = math.sin(i / 30.0) * 3.0
        trend = i * 0.015
        noise = np.random.normal(0, 0.8)
        price = round(max(base_price + seasonality + trend + noise, 5.0), 2)
        prices.append(price)

    df = pd.DataFrame({"arrival_date": dates.strftime("%Y-%m-%d"), "modal_price": prices})
    out_path = DATA_DIR / f"{crop}_prices.csv"
    df.to_csv(out_path, index=False)
    print(f"Generated {crop} price dataset -> {out_path}")
    return out_path


def generate_decision_dataset(rows: int = 1000) -> Path:
    np.random.seed(42)
    current_prices = np.random.uniform(15.0, 45.0, rows)
    price_deltas = np.random.uniform(-0.15, 0.25, rows)
    predicted_prices = current_prices * (1.0 + price_deltas)
    volatility = np.random.uniform(0.02, 0.18, rows)
    storage_capacity = np.random.choice([0.0, 500.0, 1000.0, 5000.0], rows)
    quantity = np.random.uniform(200.0, 2000.0, rows)
    days_harvest = np.random.randint(0, 14, rows)
    dist_buyer = np.random.uniform(5.0, 80.0, rows)

    labels = []
    for i in range(rows):
        delta = price_deltas[i]
        can_store = storage_capacity[i] >= quantity[i]
        if delta >= 0.08 and can_store:
            labels.append("STORE")
        elif delta >= 0.08 and not can_store:
            labels.append("AGGREGATE")
        elif delta <= -0.04:
            labels.append("SELL_NOW")
        else:
            labels.append("WAIT")

    df = pd.DataFrame({
        "current_price": current_prices,
        "predicted_price_7d": predicted_prices,
        "price_volatility_30d": volatility,
        "storage_capacity_kg": storage_capacity,
        "quantity_kg": quantity,
        "days_since_harvest": days_harvest,
        "distance_to_nearest_buyer_km": dist_buyer,
        "label": labels,
    })

    out_path = DATA_DIR / "decision_training_set.csv"
    df.to_csv(out_path, index=False)
    print(f"Generated decision training dataset -> {out_path}")
    return out_path


if __name__ == "__main__":
    generate_price_data("wheat")
    generate_price_data("onion")
    generate_decision_dataset()
