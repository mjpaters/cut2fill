import uuid
from datetime import datetime

from pydantic import BaseModel


class WaterPointOut(BaseModel):
    id: uuid.UUID
    name: str
    code: str | None = None
    provider: str
    lat: float | None = None
    lng: float | None = None
    suburb: str | None = None
    address: str | None = None
    access: str | None = None
    water_type: str | None = None
    source: str | None = None
    verified: bool
    created_at: datetime | None = None
    updated_at: datetime | None = None
