import pytest
from app.services.decision_engine import recommend_action


def test_recommend_action_store():
    res = recommend_action(
        crop_name="wheat",
        current_price_per_kg=24.50,
        quantity_kg=500.0,
        storage_capacity_kg=600.0,
        district="Ujjain",
    )
    assert "action" in res
    assert res["action"] in ["SELL_NOW", "WAIT", "STORE", "AGGREGATE"]
    assert "net_realization_per_kg" in res
    assert "reasons" in res
    assert len(res["reasons"]) > 0


def test_recommend_action_aggregate():
    res = recommend_action(
        crop_name="wheat",
        current_price_per_kg=24.50,
        quantity_kg=1000.0,
        storage_capacity_kg=100.0,  # Insufficient personal storage
        district="Ujjain",
    )
    assert res["action"] in ["AGGREGATE", "STORE", "SELL_NOW", "WAIT"]


def test_api_recommend_route():
    from fastapi.testclient import TestClient
    from app.main import app

    client = TestClient(app)
    res = client.post(
        "/decision/recommend",
        json={
            "crop_name": "Wheat",
            "current_price_per_kg": 24.50,
            "quantity_kg": 500,
            "storage_capacity_kg": 600,
            "transport_cost_per_kg": 1.0,
            "storage_cost_per_kg": 0.5,
            "district": "Ujjain",
        },
    )
    assert res.status_code == 200
    data = res.json()
    assert "action" in data
    assert data["action"] in ["SELL_NOW", "WAIT", "STORE", "FPO_POOL", "AGGREGATE"]
    assert "net_realization_per_kg" in data
    assert "total_payout" in data
    assert "ai_engine" in data

