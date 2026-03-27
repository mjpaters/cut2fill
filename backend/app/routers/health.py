from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.facility import Facility
from app.models.project import MajorProject
from app.models.source import SourceHealthCheck
from app.models.water_point import WaterFillPoint

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_ping():
    """Lightweight health check — no DB query. Used by Render to confirm the app is alive."""
    return {"status": "ok"}


@router.get("/health/detail")
async def health_detail(db: AsyncSession = Depends(get_db)):
    """Detailed health check with data counts and last source check time."""
    facilities_count = (await db.execute(select(func.count(Facility.id)))).scalar()
    water_count = (await db.execute(select(func.count(WaterFillPoint.id)))).scalar()
    projects_count = (await db.execute(select(func.count(MajorProject.id)))).scalar()

    last_check_result = await db.execute(
        select(SourceHealthCheck)
        .order_by(SourceHealthCheck.checked_at.desc())
        .limit(1)
    )
    last_check = last_check_result.scalar_one_or_none()

    return {
        "status": "ok",
        "counts": {
            "facilities": facilities_count,
            "water_points": water_count,
            "major_projects": projects_count,
        },
        "last_source_check": last_check.checked_at.isoformat() if last_check else None,
    }
