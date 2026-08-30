from app.services.decision_engine import _rule_based_decision, recommend_action


def test_rule_based_decision_falling_price_means_sell_now():
    action, confidence, reasoning = _rule_based_decision(
        current_price=20, predicted_price_7d=18, storage_capacity_kg=1000, quantity_kg=500
    )
    assert action == "SELL_NOW"
    assert 0 < confidence <= 1
    assert "fall" in reasoning.lower()


def test_rule_based_decision_rising_price_with_storage_means_store():
    action, _, _ = _rule_based_decision(
        current_price=20, predicted_price_7d=23, storage_capacity_kg=1000, quantity_kg=500
    )
    assert action == "STORE"


def test_rule_based_decision_rising_price_without_storage_means_aggregate():
    action, _, _ = _rule_based_decision(
        current_price=20, predicted_price_7d=23, storage_capacity_kg=100, quantity_kg=500
    )
    assert action == "AGGREGATE"


def test_recommend_action_returns_full_shape():
    result = recommend_action(
        crop_name="onion",
        current_price_per_kg=20,
        quantity_kg=500,
        storage_capacity_kg=1000,
    )
    assert set(result.keys()) == {
        "action",
        "confidence",
        "current_price_per_kg",
        "predicted_price_per_kg_7d",
        "net_realization_per_kg",
        "reasoning",
    }
    assert result["action"] in {"SELL_NOW", "WAIT", "STORE", "AGGREGATE"}
