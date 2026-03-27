import uuid
from datetime import datetime
from typing import Any

from pydantic import BaseModel, EmailStr


class SubmissionCreate(BaseModel):
    contact_name: str | None = None
    contact_email: str | None = None
    contact_phone: str | None = None
    data: dict[str, Any] = {}


class SubmissionOut(BaseModel):
    id: uuid.UUID
    submission_type: str
    status: str
    contact_name: str | None = None
    contact_email: str | None = None
    data: dict[str, Any] | None = None
    review_notes: str | None = None
    created_at: datetime | None = None


class SubmissionReview(BaseModel):
    status: str  # 'approved' or 'rejected'
    review_notes: str | None = None
    create_facility: bool = False
