import uuid
from datetime import datetime

from pydantic import BaseModel


class FacilityOut(BaseModel):
    id: uuid.UUID
    name: str
    facility_type: str
    lat: float | None = None
    lng: float | None = None
    suburb: str | None = None
    hours: str | None = None
    notes: str | None = None
    icon: str | None = None
    color: str | None = None
    source: str | None = None
    source_ref: str | None = None
    verified: bool
    created_at: datetime | None = None
    updated_at: datetime | None = None


class FacilityCreate(BaseModel):
    name: str
    facility_type: str
    lat: float | None = None
    lng: float | None = None
    suburb: str | None = None
    hours: str | None = None
    notes: str | None = None
    icon: str | None = None
    color: str | None = None
    source: str | None = None
    source_ref: str | None = None


class FacilityUpdate(BaseModel):
    name: str | None = None
    facility_type: str | None = None
    lat: float | None = None
    lng: float | None = None
    suburb: str | None = None
    hours: str | None = None
    notes: str | None = None
    icon: str | None = None
    color: str | None = None
    source: str | None = None
    source_ref: str | None = None
    verified: bool | None = None
