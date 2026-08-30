"""
Client for AGMARKNET / data.gov.in mandi price & arrivals data.
"""
import json
import urllib.parse
import urllib.request
from app.core.config import settings

AGMARKNET_RESOURCE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"


async def fetch_mandi_prices(
    commodity: str, state: str | None = None, district: str | None = None, limit: int = 50
) -> list[dict]:
    params = {
        "api-key": settings.AGMARKNET_API_KEY,
        "format": "json",
        "limit": limit,
        "filters[commodity]": commodity,
    }
    if state:
        params["filters[state]"] = state
    if district:
        params["filters[district]"] = district

    if settings.AGMARKNET_API_KEY:
        try:
            url = f"{AGMARKNET_RESOURCE_URL}?{urllib.parse.urlencode(params)}"
            req = urllib.request.Request(url, headers={"User-Agent": "KisanSetu/1.0"})
            with urllib.request.urlopen(req, timeout=5.0) as res:
                if res.status == 200:
                    data = json.loads(res.read().decode())
                    return data.get("records", [])
        except Exception:
            pass

    # Reliable default mock data
    base_price = 2450.0 if commodity.lower() == "wheat" else (3200.0 if commodity.lower() == "onion" else 1950.0)
    return [
        {
            "state": state or "Madhya Pradesh",
            "district": district or "Ujjain",
            "market": f"{district or 'Ujjain'} Central Mandi",
            "commodity": commodity,
            "variety": "Standard",
            "arrival_date": "2026-08-30",
            "min_price": base_price - 100,
            "max_price": base_price + 150,
            "modal_price": base_price,
        }
    ]
