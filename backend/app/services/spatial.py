from fastapi import HTTPException
from geoalchemy2 import functions as func


def _validate_lat(lat: float) -> float:
    if not (-90 <= lat <= 90):
        raise HTTPException(400, f"Invalid latitude: {lat}")
    return lat


def _validate_lng(lng: float) -> float:
    if not (-180 <= lng <= 180):
        raise HTTPException(400, f"Invalid longitude: {lng}")
    return lng


def nearest_filter(location_col, lat: float, lng: float, radius_km: float):
    """Filter by distance from a point (in metres, converted from km)."""
    _validate_lat(lat)
    _validate_lng(lng)
    if radius_km <= 0 or radius_km > 500:
        raise HTTPException(400, f"Radius must be between 0 and 500 km, got {radius_km}")
    point = func.ST_SetSRID(func.ST_MakePoint(lng, lat), 4326)
    geography_col = location_col.cast_to("geography")
    geography_point = point.cast_to("geography")
    return func.ST_DWithin(geography_col, geography_point, radius_km * 1000)


def bbox_filter(location_col, bbox: str):
    """Filter by bounding box. bbox format: 'west,south,east,north'."""
    parts = bbox.split(",")
    if len(parts) != 4:
        raise HTTPException(400, "bbox must have 4 values: west,south,east,north")
    try:
        west, south, east, north = [float(x) for x in parts]
    except ValueError:
        raise HTTPException(400, "bbox values must be numeric")
    _validate_lng(west)
    _validate_lat(south)
    _validate_lng(east)
    _validate_lat(north)
    envelope = func.ST_MakeEnvelope(west, south, east, north, 4326)
    return func.ST_Within(location_col, envelope)
