import uuid

from fastapi import APIRouter, Depends, HTTPException, Request
from geoalchemy2 import functions as geo_func
from slowapi import Limiter
from slowapi.util import get_remote_address
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.middleware.auth import get_current_user, require_auth
from app.models.listing import Listing
from app.schemas.common import GeoJSONFeature, GeoJSONFeatureCollection, GeoJSONPoint
from app.schemas.listing import ListingCreate, ListingOut
from app.services.spatial import bbox_filter

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(tags=["listings"])


def _listing_to_feature(row) -> GeoJSONFeature:
    listing, lng, lat = row
    geometry = GeoJSONPoint(coordinates=[lng, lat]) if lng is not None else None
    return GeoJSONFeature(
        geometry=geometry,
        properties={
            "id": str(listing.id),
            "listing_type": listing.listing_type,
            "material_type": listing.material_type,
            "volume_m3": listing.volume_m3,
            "suburb": listing.suburb,
            "address": listing.address,
            "description": listing.description,
            "pricing": listing.pricing,
            "date_from": listing.date_from.isoformat() if listing.date_from else None,
            "date_to": listing.date_to.isoformat() if listing.date_to else None,
            "contact_name": listing.contact_name,
            "contact_email": listing.contact_email,
            "contact_phone": listing.contact_phone,
            "company": listing.company,
            "tested": listing.tested,
            "pickup": listing.pickup,
            "delivery": listing.delivery,
            "status": listing.status,
            "created_at": listing.created_at.isoformat() if listing.created_at else None,
        },
    )


def _listing_to_out(listing: Listing, lng: float | None, lat: float | None) -> ListingOut:
    return ListingOut(
        id=listing.id,
        listing_type=listing.listing_type,
        material_type=listing.material_type,
        volume_m3=listing.volume_m3,
        lat=lat,
        lng=lng,
        suburb=listing.suburb,
        address=listing.address,
        description=listing.description,
        pricing=listing.pricing,
        date_from=listing.date_from,
        date_to=listing.date_to,
        contact_name=listing.contact_name,
        contact_email=listing.contact_email,
        contact_phone=listing.contact_phone,
        company=listing.company,
        tested=listing.tested,
        pickup=listing.pickup,
        delivery=listing.delivery,
        status=listing.status,
        review_notes=listing.review_notes,
        created_at=listing.created_at,
    )


@router.post("/listings", response_model=ListingOut)
@limiter.limit("5/minute")
async def create_listing(
    request: Request,
    body: ListingCreate,
    db: AsyncSession = Depends(get_db),
    user: dict = Depends(require_auth),
):
    listing = Listing(
        listing_type=body.listing_type,
        material_type=body.material_type,
        volume_m3=body.volume_m3,
        suburb=body.suburb,
        address=body.address,
        description=body.description,
        pricing=body.pricing,
        date_from=body.date_from,
        date_to=body.date_to,
        contact_name=body.contact_name,
        contact_email=body.contact_email,
        contact_phone=body.contact_phone,
        company=body.company,
        tested=body.tested,
        pickup=body.pickup,
        delivery=body.delivery,
        submitted_by=uuid.UUID(user["sub"]),
    )
    if body.lat is not None and body.lng is not None:
        listing.location = func.ST_SetSRID(
            func.ST_MakePoint(float(body.lng), float(body.lat)), 4326
        )
    db.add(listing)
    await db.commit()
    await db.refresh(listing)

    # Get coordinates back
    lat, lng = None, None
    if listing.location is not None:
        result = await db.execute(
            select(
                geo_func.ST_X(Listing.location).label("lng"),
                geo_func.ST_Y(Listing.location).label("lat"),
            ).where(Listing.id == listing.id)
        )
        row = result.one_or_none()
        if row:
            lng, lat = row.lng, row.lat

    return _listing_to_out(listing, lng, lat)


@router.get("/listings", response_model=GeoJSONFeatureCollection)
async def list_listings(
    type: str | None = None,
    material: str | None = None,
    bbox: str | None = None,
    limit: int = 10000,
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    if limit > 10000:
        limit = 10000
    if limit < 1:
        limit = 1

    query = select(
        Listing,
        geo_func.ST_X(Listing.location).label("lng"),
        geo_func.ST_Y(Listing.location).label("lat"),
    ).where(Listing.status == "approved")

    if type:
        query = query.where(Listing.listing_type == type)
    if material:
        query = query.where(Listing.material_type == material)
    if bbox:
        query = query.where(bbox_filter(Listing.location, bbox))

    query = query.offset(offset).limit(limit)
    result = await db.execute(query)
    rows = result.all()
    features = [_listing_to_feature(row) for row in rows]
    return GeoJSONFeatureCollection(features=features)


@router.get("/listings/mine", response_model=list[ListingOut])
async def my_listings(
    user: dict = Depends(require_auth),
    db: AsyncSession = Depends(get_db),
):
    user_id = uuid.UUID(user["sub"])
    result = await db.execute(
        select(
            Listing,
            geo_func.ST_X(Listing.location).label("lng"),
            geo_func.ST_Y(Listing.location).label("lat"),
        )
        .where(Listing.submitted_by == user_id)
        .order_by(Listing.created_at.desc())
    )
    rows = result.all()
    return [_listing_to_out(listing, lng, lat) for listing, lng, lat in rows]


@router.get("/listings/{listing_id}")
async def get_listing(listing_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    query = select(
        Listing,
        geo_func.ST_X(Listing.location).label("lng"),
        geo_func.ST_Y(Listing.location).label("lat"),
    ).where(Listing.id == listing_id)
    result = await db.execute(query)
    row = result.one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Listing not found")
    return _listing_to_feature(row)
