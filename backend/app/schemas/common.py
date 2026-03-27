from pydantic import BaseModel


class PaginationParams(BaseModel):
    offset: int = 0
    limit: int = 1000


class GeoJSONPoint(BaseModel):
    type: str = "Point"
    coordinates: list[float]  # [lng, lat]


class GeoJSONFeature(BaseModel):
    type: str = "Feature"
    geometry: GeoJSONPoint | None = None
    properties: dict


class GeoJSONFeatureCollection(BaseModel):
    type: str = "FeatureCollection"
    features: list[GeoJSONFeature]
