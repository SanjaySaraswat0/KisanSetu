"""
Orders, Razorpay Payments, & Transaction History API Routes.
"""
import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.net_realization import calculate_net_realization

router = APIRouter(prefix="/transactions", tags=["transactions"])

TRANSACTIONS_DB = [
    {
        "id": "txn-881",
        "farmer_name": "Ramesh Kumar",
        "buyer_name": "AgriCorp Processing Ltd",
        "crop_name": "Wheat",
        "quantity_kg": 500.0,
        "agreed_price_per_kg": 25.50,
        "transport_cost_per_kg": 1.0,
        "storage_cost_per_kg": 0.0,
        "net_realization_per_kg": 24.25,
        "total_amount_inr": 12750.0,
        "payment_status": "PAID_RAZORPAY",
        "delivery_status": "DELIVERED",
        "created_at": datetime.utcnow().isoformat(),
    }
]


class OrderCreateRequest(BaseModel):
    farmer_name: str = "Ramesh Kumar"
    buyer_name: str = "AgriCorp Processing Ltd"
    crop_name: str = "Wheat"
    quantity_kg: float = 500.0
    agreed_price_per_kg: float = 25.50
    transport_cost_per_kg: float = 1.0
    storage_cost_per_kg: float = 0.0


class PaymentInitiateRequest(BaseModel):
    transaction_id: str
    amount_inr: float


@router.get("")
def list_transactions():
    """List transaction history."""
    return TRANSACTIONS_DB


@router.post("")
def create_transaction_order(req: OrderCreateRequest):
    """Create a new transaction order."""
    net_per_kg = calculate_net_realization(
        req.agreed_price_per_kg, req.transport_cost_per_kg, req.storage_cost_per_kg
    )
    total_amt = round(req.agreed_price_per_kg * req.quantity_kg, 2)

    new_txn = {
        "id": f"txn-{uuid.uuid4().hex[:6]}",
        "farmer_name": req.farmer_name,
        "buyer_name": req.buyer_name,
        "crop_name": req.crop_name,
        "quantity_kg": req.quantity_kg,
        "agreed_price_per_kg": req.agreed_price_per_kg,
        "transport_cost_per_kg": req.transport_cost_per_kg,
        "storage_cost_per_kg": req.storage_cost_per_kg,
        "net_realization_per_kg": net_per_kg,
        "total_amount_inr": total_amt,
        "payment_status": "INITIATED",
        "delivery_status": "PENDING_DISPATCH",
        "created_at": datetime.utcnow().isoformat(),
    }
    TRANSACTIONS_DB.append(new_txn)
    return new_txn


@router.post("/pay")
def initiate_razorpay_payment(req: PaymentInitiateRequest):
    """Initiates Razorpay payment integration flow."""
    txn = next((t for t in TRANSACTIONS_DB if t["id"] == req.transaction_id), None)
    if txn:
        txn["payment_status"] = "PAID_RAZORPAY"

    return {
        "transaction_id": req.transaction_id,
        "razorpay_order_id": f"order_rzp_{uuid.uuid4().hex[:8]}",
        "amount_inr": req.amount_inr,
        "currency": "INR",
        "status": "PAID_SUCCESS",
    }
