import uuid
from datetime import date, datetime

from pydantic import BaseModel


class ProjectPhaseOut(BaseModel):
    id: uuid.UUID
    name: str
    start_date: date | None = None
    end_date: date | None = None
    sort_order: int | None = None


class ProjectOut(BaseModel):
    id: uuid.UUID
    name: str
    lat: float | None = None
    lng: float | None = None
    suburb: str | None = None
    description: str | None = None
    status: str | None = None
    project_type: str | None = None
    cost: str | None = None
    authority: str | None = None
    start_date: date | None = None
    expected_end: date | None = None
    estimated_volume: str | None = None
    source_url: str | None = None
    phases: list[ProjectPhaseOut] = []
    created_at: datetime | None = None
    updated_at: datetime | None = None
