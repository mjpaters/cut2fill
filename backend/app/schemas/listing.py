import uuid
from datetime import date, datetime

from pydantic import BaseModel


class ListingCreate(BaseModel):
    listing_type: str  # 'available' or 'wanted'
    material_type: str
    volume_m3: int
    lat: float | None = None
    lng: float | None = None
    suburb: str | None = None
    address: str | None = None
    description: str | None = None
    pricing: str | None = None
    date_from: date | None = None
    date_to: date | None = None
    contact_name: str | None = None
    contact_email: str | None = None
    contact_phone: str | None = None
    company: str | None = None
    tested: bool = False
    pickup: bool = False
    delivery: bool = False


class ListingOut(BaseModel):
    id: uuid.UUID
    listing_type: str
    material_type: str
    volume_m3: int
    lat: float | None = None
    lng: float | None = None
    suburb: str | None = None
    address: str | None = None
    description: str | None = None
    pricing: str | None = None
    date_from: date | None = None
    date_to: date | None = None
    contact_name: str | None = None
    contact_email: str | None = None
    contact_phone: str | None = None
    company: str | None = None
    tested: bool = False
    pickup: bool = False
    delivery: bool = False
    status: str
    review_notes: str | None = None
    created_at: datetime | None = None


class ListingReview(BaseModel):
    status: str  # 'approved' or 'rejected'
    review_notes: str | None = None
