from fastapi import APIRouter, Depends
from geoalchemy2 import functions as geo_func
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.water_point import WaterFillPoint
from app.schemas.common import GeoJSONFeature, GeoJSONFeatureCollection, GeoJSONPoint

router = APIRouter(tags=["water-points"])


@router.get("/water-points", response_model=GeoJSONFeatureCollection)
async def list_water_points(
    limit: int = 10000,
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    if limit > 10000:
        limit = 10000
    if limit < 1:
        limit = 1

    query = select(
        WaterFillPoint,
        geo_func.ST_X(WaterFillPoint.location).label("lng"),
        geo_func.ST_Y(WaterFillPoint.location).label("lat"),
    ).offset(offset).limit(limit)
    result = await db.execute(query)
    rows = result.all()

    features = []
    for wp, lng, lat in rows:
        geometry = GeoJSONPoint(coordinates=[lng, lat]) if lng is not None else None
        features.append(
            GeoJSONFeature(
                geometry=geometry,
                properties={
                    "id": str(wp.id),
                    "name": wp.name,
                    "code": wp.code,
                    "provider": wp.provider,
                    "suburb": wp.suburb,
                    "address": wp.address,
                    "access": wp.access,
                    "water_type": wp.water_type,
                    "verified": wp.verified,
                },
            )
        )
    return GeoJSONFeatureCollection(features=features)
