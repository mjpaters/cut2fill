import uuid

from fastapi import APIRouter, Depends, HTTPException
from geoalchemy2 import functions as geo_func
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.facility import Facility
from app.schemas.common import GeoJSONFeature, GeoJSONFeatureCollection, GeoJSONPoint
from app.services.spatial import bbox_filter, nearest_filter

router = APIRouter(tags=["facilities"])


def _facility_to_feature(row) -> GeoJSONFeature:
    f, lng, lat = row
    geometry = GeoJSONPoint(coordinates=[lng, lat]) if lng is not None else None
    return GeoJSONFeature(
        geometry=geometry,
        properties={
            "id": str(f.id),
            "name": f.name,
            "facility_type": f.facility_type,
            "suburb": f.suburb,
            "hours": f.hours,
            "notes": f.notes,
            "icon": f.icon,
            "color": f.color,
            "source": f.source,
            "source_ref": f.source_ref,
            "verified": f.verified,
        },
    )


@router.get("/facilities", response_model=GeoJSONFeatureCollection)
async def list_facilities(
    type: str | None = None,
    bbox: str | None = None,
    near: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    query = select(
        Facility,
        geo_func.ST_X(Facility.location).label("lng"),
        geo_func.ST_Y(Facility.location).label("lat"),
    ).where(Facility.verified == True)

    if type:
        query = query.where(Facility.facility_type == type)
    if bbox:
        query = query.where(bbox_filter(Facility.location, bbox))
    if near:
        parts = near.split(",")
        if len(parts) != 3:
            raise HTTPException(400, "near must have 3 values: lat,lng,radius_km")
        try:
            lat, lng, radius = float(parts[0]), float(parts[1]), float(parts[2])
        except ValueError:
            raise HTTPException(400, "near values must be numeric")
        query = query.where(nearest_filter(Facility.location, lat, lng, radius))

    result = await db.execute(query)
    rows = result.all()
    features = [_facility_to_feature(row) for row in rows]
    return GeoJSONFeatureCollection(features=features)


@router.get("/facilities/{facility_id}")
async def get_facility(facility_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    query = select(
        Facility,
        geo_func.ST_X(Facility.location).label("lng"),
        geo_func.ST_Y(Facility.location).label("lat"),
    ).where(Facility.id == facility_id)
    result = await db.execute(query)
    row = result.one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Facility not found")
    return _facility_to_feature(row)
