"""
FPO (Farmer Producer Organisation) Management & Lot Pooling API Routes.
Enables FPOs to pool produce from multiple farmer members (e.g. 100kg + 150kg + 250kg = 500kg lot).
"""
import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/fpos", tags=["fpos"])

# In-memory mock storage for rapid prototype execution
FPO_POOLS_DB = [
    {
        "id": "pool-101",
        "fpo_name": "Pragati Kisan Producer Co-op",
        "crop_name": "Wheat",
        "variety": "Sharbati",
        "district": "Ujjain",
        "total_quantity_kg": 500.0,
        "target_price_per_kg": 26.50,
        "status": "OPEN",
        "contributions": [
            {"farmer_name": "Ramesh Kumar", "quantity_kg": 100.0},
            {"farmer_name": "Suresh Patel", "quantity_kg": 150.0},
            {"farmer_name": "Anita Devi", "quantity_kg": 250.0},
        ],
        "created_at": datetime.utcnow().isoformat(),
    }
]


class PoolCreateRequest(BaseModel):
    fpo_name: str
    crop_name: str
    variety: str = "Standard"
    district: str = "Ujjain"
    target_price_per_kg: float = 25.0


class PoolMemberAddRequest(BaseModel):
    farmer_name: str
    quantity_kg: float


@router.get("/")
def list_fpos():
    """Get registered FPOs and pooling statistics."""
    return [
        {
            "id": "fpo-1",
            "name": "Pragati Kisan Producer Co-op",
            "district": "Ujjain",
            "state": "Madhya Pradesh",
            "total_members": 240,
            "active_pools": len(FPO_POOLS_DB),
        },
        {
            "id": "fpo-2",
            "name": "Samriddhi Farmer Producer Company",
            "district": "Nashik",
            "state": "Maharashtra",
            "total_members": 180,
            "active_pools": 2,
        },
    ]


@router.get("/pools")
def list_fpo_pools():
    """List all aggregated produce pools created by FPOs."""
    return FPO_POOLS_DB


@router.post("/pools")
def create_fpo_pool(req: PoolCreateRequest):
    """Create a new produce aggregation pool."""
    new_pool = {
        "id": f"pool-{uuid.uuid4().hex[:6]}",
        "fpo_name": req.fpo_name,
        "crop_name": req.crop_name,
        "variety": req.variety,
        "district": req.district,
        "total_quantity_kg": 0.0,
        "target_price_per_kg": req.target_price_per_kg,
        "status": "OPEN",
        "contributions": [],
        "created_at": datetime.utcnow().isoformat(),
    }
    FPO_POOLS_DB.append(new_pool)
    return new_pool


@router.post("/pools/{pool_id}/add-member")
def add_farmer_to_pool(pool_id: str, req: PoolMemberAddRequest):
    """Add a farmer's produce lot to an existing FPO pool (e.g. adding 150 kg)."""
    pool = next((p for p in FPO_POOLS_DB if p["id"] == pool_id), None)
    if not pool:
        raise HTTPException(status_code=404, detail="FPO pool not found")

    pool["contributions"].append({"farmer_name": req.farmer_name, "quantity_kg": req.quantity_kg})
    pool["total_quantity_kg"] = sum(c["quantity_kg"] for c in pool["contributions"])
    return {
        "message": f"Added {req.quantity_kg} kg from {req.farmer_name} to pool {pool_id}",
        "updated_total_quantity_kg": pool["total_quantity_kg"],
        "pool": pool,
    }
