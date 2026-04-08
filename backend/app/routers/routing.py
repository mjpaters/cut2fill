import httpx
from fastapi import APIRouter, HTTPException, Query

from app.config import settings

router = APIRouter(tags=["routing"])

HERE_ROUTE_URL = "https://router.hereapi.com/v8/routes"


@router.get("/route")
async def get_truck_route(
    origin: str = Query(..., description="lat,lng"),
    destination: str = Query(..., description="lat,lng"),
):
    """Proxy HERE Routing API v8 — returns real truck route distance, duration, and polyline."""
    if not settings.here_api_key:
        raise HTTPException(status_code=503, detail="Routing unavailable")

    params = {
        "apiKey": settings.here_api_key,
        "origin": origin,
        "destination": destination,
        "transportMode": "truck",
        "truck[grossWeight]": 42500,
        "truck[height]": 430,
        "truck[length]": 1900,
        "truck[width]": 250,
        "return": "summary,polyline",
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(HERE_ROUTE_URL, params=params)

    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail="Upstream routing error")

    data = resp.json()
    try:
        section = data["routes"][0]["sections"][0]
        return {
            "distanceKm": section["summary"]["length"] / 1000,
            "durationSec": section["summary"]["duration"],
            "polyline": section["polyline"],
        }
    except (KeyError, IndexError):
        raise HTTPException(status_code=502, detail="Unexpected routing response")
