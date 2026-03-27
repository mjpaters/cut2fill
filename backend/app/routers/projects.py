import uuid

from fastapi import APIRouter, Depends, HTTPException
from geoalchemy2 import functions as geo_func
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.project import MajorProject, ProjectPhase
from app.schemas.project import ProjectOut, ProjectPhaseOut

router = APIRouter(tags=["projects"])


def _project_to_dict(project: MajorProject, lng: float | None, lat: float | None) -> dict:
    return ProjectOut(
        id=project.id,
        name=project.name,
        lat=lat,
        lng=lng,
        suburb=project.suburb,
        description=project.description,
        status=project.status,
        project_type=project.project_type,
        cost=project.cost,
        authority=project.authority,
        start_date=project.start_date,
        expected_end=project.expected_end,
        estimated_volume=project.estimated_volume,
        source_url=project.source_url,
        phases=[
            ProjectPhaseOut(
                id=p.id,
                name=p.name,
                start_date=p.start_date,
                end_date=p.end_date,
                sort_order=p.sort_order,
            )
            for p in project.phases
        ],
        created_at=project.created_at,
        updated_at=project.updated_at,
    )


@router.get("/projects", response_model=list[ProjectOut])
async def list_projects(
    status: str | None = None,
    type: str | None = None,
    limit: int = 1000,
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    if limit > 1000:
        limit = 1000
    if limit < 1:
        limit = 1

    query = (
        select(
            MajorProject,
            geo_func.ST_X(MajorProject.location).label("lng"),
            geo_func.ST_Y(MajorProject.location).label("lat"),
        )
        .options(selectinload(MajorProject.phases))
    )
    if status:
        query = query.where(MajorProject.status == status)
    if type:
        query = query.where(MajorProject.project_type == type)

    query = query.offset(offset).limit(limit)
    result = await db.execute(query)
    rows = result.unique().all()
    return [_project_to_dict(proj, lng, lat) for proj, lng, lat in rows]


@router.get("/projects/{project_id}", response_model=ProjectOut)
async def get_project(project_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    query = (
        select(
            MajorProject,
            geo_func.ST_X(MajorProject.location).label("lng"),
            geo_func.ST_Y(MajorProject.location).label("lat"),
        )
        .options(selectinload(MajorProject.phases))
        .where(MajorProject.id == project_id)
    )
    result = await db.execute(query)
    row = result.unique().one_or_none()
    if not row:
        raise HTTPException(status_code=404, detail="Project not found")
    proj, lng, lat = row
    return _project_to_dict(proj, lng, lat)
