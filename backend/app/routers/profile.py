import uuid

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.middleware.auth import require_auth
from app.models.profile import Profile

router = APIRouter(tags=["profile"])


class ProfileCreate(BaseModel):
    display_name: str | None = None
    company: str | None = None


class ProfileOut(BaseModel):
    id: str
    display_name: str | None = None
    company: str | None = None
    role: str


@router.post("/profile", response_model=ProfileOut)
async def create_or_update_profile(
    body: ProfileCreate,
    user: dict = Depends(require_auth),
    db: AsyncSession = Depends(get_db),
):
    user_id = uuid.UUID(user["sub"])
    result = await db.execute(select(Profile).where(Profile.id == user_id))
    profile = result.scalar_one_or_none()

    if profile:
        if body.display_name is not None:
            profile.display_name = body.display_name
        if body.company is not None:
            profile.company = body.company
    else:
        profile = Profile(
            id=user_id,
            display_name=body.display_name,
            company=body.company,
        )
        db.add(profile)

    await db.commit()
    await db.refresh(profile)
    return ProfileOut(
        id=str(profile.id),
        display_name=profile.display_name,
        company=profile.company,
        role=profile.role,
    )


@router.get("/profile", response_model=ProfileOut)
async def get_my_profile(
    user: dict = Depends(require_auth),
    db: AsyncSession = Depends(get_db),
):
    user_id = uuid.UUID(user["sub"])
    result = await db.execute(select(Profile).where(Profile.id == user_id))
    profile = result.scalar_one_or_none()
    if not profile:
        return ProfileOut(id=str(user_id), role="user")
    return ProfileOut(
        id=str(profile.id),
        display_name=profile.display_name,
        company=profile.company,
        role=profile.role,
    )
