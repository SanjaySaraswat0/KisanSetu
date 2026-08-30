"""
Smart Logistics & Storage API Routes.
Calculates route distance, transport costs per kg, and evaluates storage options.
"""
from fastapi import APIRouter
from pydantic import BaseModel

from app.services.logistics_service import calculate_logistics
from app.services.storage_service import evaluate_storage_option

router = APIRouter(prefix="/logistics", tags=["logistics"])


class LogisticsRequest(BaseModel):
    origin_district: str = "Ujjain"
    destination_district: str = "Indore"
    quantity_kg: float = 1000.0
    is_fpo_pooled: bool = False


class StorageRequest(BaseModel):
    crop_name: str = "Wheat"
    current_price_per_kg: float = 24.50
    predicted_future_price_per_kg: float = 27.00
    quantity_kg: float = 1000.0
    storage_days: int = 14


@router.post("/calculate-transport")
def get_transport_estimation(req: LogisticsRequest):
    """Calculate transport distance, freight charges per kg, and delivery timeframe."""
    return calculate_logistics(
        origin=req.origin_district,
        destination=req.destination_district,
        quantity_kg=req.quantity_kg,
        is_fpo_pooled=req.is_fpo_pooled,
    )


@router.post("/evaluate-storage")
def compare_storage_option(req: StorageRequest):
    """Compare SELL NOW vs STORE & SELL LATER net returns."""
    return evaluate_storage_option(
        crop_name=req.crop_name,
        current_price_per_kg=req.current_price_per_kg,
        predicted_future_price_per_kg=req.predicted_future_price_per_kg,
        quantity_kg=req.quantity_kg,
        storage_days=req.storage_days,
    )
