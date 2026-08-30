from fastapi import APIRouter, HTTPException

from app.services.data_ingestion.agmarknet_client import fetch_mandi_prices
from app.services.price_forecast_service import forecast_price

router = APIRouter(prefix="/prices", tags=["prices"])


@router.get("/{crop}")
async def get_current_and_forecast_price(
    crop: str, state: str | None = None, district: str | None = None
):
    records = await fetch_mandi_prices(crop, state=state, district=district, limit=1)
    if not records:
        raise HTTPException(status_code=404, detail=f"No price data found for {crop}")

    latest = records[0]
    current_price = float(latest.get("modal_price", 0))
    predicted = forecast_price(crop, current_price, horizon_days=7)

    return {
        "crop": crop,
        "market": latest.get("market"),
        "current_price_per_quintal": current_price,
        "predicted_price_per_quintal_7d": predicted,
        "arrival_date": latest.get("arrival_date"),
    }


@router.get("/{crop}/history")
async def get_price_history(crop: str, state: str | None = None, district: str | None = None):
    records = await fetch_mandi_prices(crop, state=state, district=district, limit=90)
    return {"crop": crop, "records": records}
