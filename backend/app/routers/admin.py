import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from geoalchemy2 import functions as geo_func
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.middleware.auth import require_admin
from app.models.facility import Facility
from app.models.submission import Submission
from app.schemas.facility import FacilityCreate, FacilityUpdate
from app.schemas.submission import SubmissionOut, SubmissionReview
from app.services.data_refresh import refresh_source
from app.services.source_health import run_all_checks

router = APIRouter(prefix="/admin", tags=["admin"])


# --- Submissions ---

@router.get("/submissions", response_model=list[SubmissionOut])
async def list_submissions(
    status: str = "pending",
    user: dict = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Submission)
        .where(Submission.status == status)
        .order_by(Submission.created_at.desc())
    )
    subs = result.scalars().all()
    return [
        SubmissionOut(
            id=s.id,
            submission_type=s.submission_type,
            status=s.status,
            contact_name=s.contact_name,
            contact_email=s.contact_email,
            data=s.data,
            review_notes=s.review_notes,
            created_at=s.created_at,
        )
        for s in subs
    ]


@router.patch("/submissions/{submission_id}", response_model=SubmissionOut)
async def review_submission(
    submission_id: uuid.UUID,
    body: SubmissionReview,
    user: dict = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Submission).where(Submission.id == submission_id))
    sub = result.scalar_one_or_none()
    if not sub:
        raise HTTPException(status_code=404, detail="Submission not found")

    sub.status = body.status
    sub.review_notes = body.review_notes
    sub.reviewed_by = uuid.UUID(user["sub"])
    sub.reviewed_at = datetime.now(timezone.utc)

    # If approving a site registration and create_facility is requested
    if body.status == "approved" and body.create_facility and sub.data:
        d = sub.data
        facility = Facility(
            name=d.get("name", "Unnamed"),
            facility_type=d.get("facility_type", "quarry"),
            suburb=d.get("suburb"),
            notes=d.get("notes"),
            source="user-submitted",
            verified=True,
            verified_at=datetime.now(timezone.utc),
            verified_by=uuid.UUID(user["sub"]),
        )
        if d.get("lat") and d.get("lng"):
            facility.location = func.ST_SetSRID(
                func.ST_MakePoint(float(d["lng"]), float(d["lat"])), 4326
            )
        db.add(facility)
        await db.flush()
        sub.created_facility_id = facility.id

    await db.commit()
    await db.refresh(sub)
    return SubmissionOut(
        id=sub.id,
        submission_type=sub.submission_type,
        status=sub.status,
        contact_name=sub.contact_name,
        contact_email=sub.contact_email,
        data=sub.data,
        review_notes=sub.review_notes,
        created_at=sub.created_at,
    )


# --- Facilities CRUD ---

@router.post("/facilities")
async def create_facility(
    body: FacilityCreate,
    user: dict = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    facility = Facility(
        name=body.name,
        facility_type=body.facility_type,
        suburb=body.suburb,
        hours=body.hours,
        notes=body.notes,
        icon=body.icon,
        color=body.color,
        source=body.source,
        source_ref=body.source_ref,
    )
    if body.lat is not None and body.lng is not None:
        facility.location = func.ST_SetSRID(
            func.ST_MakePoint(float(body.lng), float(body.lat)), 4326
        )
    db.add(facility)
    await db.commit()
    await db.refresh(facility)
    return {"id": str(facility.id), "name": facility.name}


@router.put("/facilities/{facility_id}")
async def update_facility(
    facility_id: uuid.UUID,
    body: FacilityUpdate,
    user: dict = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Facility).where(Facility.id == facility_id))
    facility = result.scalar_one_or_none()
    if not facility:
        raise HTTPException(status_code=404, detail="Facility not found")

    update_data = body.model_dump(exclude_unset=True)
    lat = update_data.pop("lat", None)
    lng = update_data.pop("lng", None)
    for field, value in update_data.items():
        setattr(facility, field, value)
    if lat is not None and lng is not None:
        facility.location = func.ST_SetSRID(
            func.ST_MakePoint(float(lng), float(lat)), 4326
        )

    await db.commit()
    return {"id": str(facility.id), "updated": True}


@router.delete("/facilities/{facility_id}")
async def delete_facility(
    facility_id: uuid.UUID,
    user: dict = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Facility).where(Facility.id == facility_id))
    facility = result.scalar_one_or_none()
    if not facility:
        raise HTTPException(status_code=404, detail="Facility not found")
    # Soft delete via verified=False
    facility.verified = False
    await db.commit()
    return {"id": str(facility.id), "deleted": True}


# --- Data refresh & health ---

@router.post("/refresh/{source_id}")
async def trigger_refresh(
    source_id: str,
    user: dict = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    return await refresh_source(source_id, db)


@router.get("/sources/health")
async def run_health_checks(
    user: dict = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    return await run_all_checks(db)
