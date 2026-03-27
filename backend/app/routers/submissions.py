import uuid

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.middleware.auth import get_current_user, require_auth
from app.models.submission import Submission
from app.schemas.submission import SubmissionCreate, SubmissionOut

router = APIRouter(tags=["submissions"])


async def _create_submission(
    submission_type: str,
    body: SubmissionCreate,
    db: AsyncSession,
    user: dict | None,
) -> SubmissionOut:
    sub = Submission(
        submission_type=submission_type,
        submitted_by=uuid.UUID(user["sub"]) if user else None,
        contact_name=body.contact_name,
        contact_email=body.contact_email,
        contact_phone=body.contact_phone,
        data=body.data,
    )
    db.add(sub)
    await db.commit()
    await db.refresh(sub)
    return SubmissionOut(
        id=sub.id,
        submission_type=sub.submission_type,
        status=sub.status,
        contact_name=sub.contact_name,
        contact_email=sub.contact_email,
        data=sub.data,
        created_at=sub.created_at,
    )


@router.post("/submissions/site", response_model=SubmissionOut)
async def submit_site(
    body: SubmissionCreate,
    db: AsyncSession = Depends(get_db),
    user: dict | None = Depends(get_current_user),
):
    return await _create_submission("site-registration", body, db, user)


@router.post("/submissions/source", response_model=SubmissionOut)
async def submit_source(
    body: SubmissionCreate,
    db: AsyncSession = Depends(get_db),
    user: dict | None = Depends(get_current_user),
):
    return await _create_submission("source-tip", body, db, user)


@router.post("/submissions/feedback", response_model=SubmissionOut)
async def submit_feedback(
    body: SubmissionCreate,
    db: AsyncSession = Depends(get_db),
    user: dict | None = Depends(get_current_user),
):
    return await _create_submission("feedback", body, db, user)


@router.get("/submissions/mine", response_model=list[SubmissionOut])
async def my_submissions(
    user: dict = Depends(require_auth),
    db: AsyncSession = Depends(get_db),
):
    user_id = uuid.UUID(user["sub"])
    result = await db.execute(
        select(Submission)
        .where(Submission.submitted_by == user_id)
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
