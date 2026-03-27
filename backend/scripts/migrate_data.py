"""
migrate_data.py — Read seed JSON files and insert into Supabase/Postgres.

Usage: python scripts/migrate_data.py
Requires: DATABASE_URL in .env (or environment)
"""

import asyncio
import json
import sys
from datetime import date
from pathlib import Path

# Add parent dir so we can import app
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


def parse_date(s: str | None) -> date | None:
    if not s:
        return None
    return date.fromisoformat(s)

from app.database import async_session, engine

SEED_DIR = Path(__file__).resolve().parent.parent / "seed"
SOURCE_REGISTRY = Path("C:/cut2fill/scripts/source-registry.json")


async def migrate_facilities(session: AsyncSession):
    data = json.loads((SEED_DIR / "facilities.json").read_text(encoding="utf-8"))
    print(f"Migrating {len(data)} facilities...")

    for f in data:
        lng, lat = f.get("lng"), f.get("lat")
        location_expr = f"ST_SetSRID(ST_MakePoint({lng}, {lat}), 4326)" if lng and lat else "NULL"
        await session.execute(
            text(f"""
                INSERT INTO facilities (name, facility_type, location, suburb, hours, notes, icon, color, source, source_ref, verified)
                VALUES (:name, :facility_type, {location_expr}, :suburb, :hours, :notes, :icon, :color, :source, :source_ref, true)
                ON CONFLICT DO NOTHING
            """),
            {
                "name": f["name"],
                "facility_type": f["facility_type"],
                "suburb": f.get("suburb"),
                "hours": f.get("hours"),
                "notes": f.get("notes"),
                "icon": f.get("icon"),
                "color": f.get("color"),
                "source": f.get("source", "manual"),
                "source_ref": f.get("source_ref"),
            },
        )
    await session.commit()
    print(f"  Done — {len(data)} facilities inserted.")


async def migrate_water_points(session: AsyncSession):
    data = json.loads((SEED_DIR / "water_points.json").read_text(encoding="utf-8"))
    print(f"Migrating {len(data)} water fill points...")

    for w in data:
        lng, lat = w.get("lng"), w.get("lat")
        location_expr = f"ST_SetSRID(ST_MakePoint({lng}, {lat}), 4326)" if lng and lat else "NULL"
        await session.execute(
            text(f"""
                INSERT INTO water_fill_points (name, code, provider, location, suburb, address, access, water_type, source, verified)
                VALUES (:name, :code, :provider, {location_expr}, :suburb, :address, :access, :water_type, :source, true)
                ON CONFLICT DO NOTHING
            """),
            {
                "name": w["name"],
                "code": w.get("code"),
                "provider": w["provider"],
                "suburb": w.get("suburb"),
                "address": w.get("address"),
                "access": w.get("access"),
                "water_type": w.get("water_type"),
                "source": w.get("source", "manual"),
            },
        )
    await session.commit()
    print(f"  Done — {len(data)} water points inserted.")


async def migrate_major_projects(session: AsyncSession):
    data = json.loads((SEED_DIR / "major_projects.json").read_text(encoding="utf-8"))
    print(f"Migrating {len(data)} major projects...")

    for p in data:
        lng, lat = p.get("lng"), p.get("lat")
        location_expr = f"ST_SetSRID(ST_MakePoint({lng}, {lat}), 4326)" if lng and lat else "NULL"
        result = await session.execute(
            text(f"""
                INSERT INTO major_projects (name, location, suburb, description, status, project_type, cost, authority, start_date, expected_end, estimated_volume, source_url)
                VALUES (:name, {location_expr}, :suburb, :description, :status, :project_type, :cost, :authority,
                        :start_date, :expected_end, :estimated_volume, :source_url)
                RETURNING id
            """),
            {
                "name": p["name"],
                "suburb": p.get("suburb"),
                "description": p.get("description"),
                "status": p.get("status"),
                "project_type": p.get("project_type"),
                "cost": p.get("cost"),
                "authority": p.get("authority"),
                "start_date": parse_date(p.get("start_date")),
                "expected_end": parse_date(p.get("expected_end")),
                "estimated_volume": p.get("estimated_volume"),
                "source_url": p.get("source_url"),
            },
        )
        project_id = result.scalar_one()

        for phase in p.get("phases", []):
            await session.execute(
                text("""
                    INSERT INTO project_phases (project_id, name, start_date, end_date, sort_order)
                    VALUES (:project_id, :name, :start_date, :end_date, :sort_order)
                """),
                {
                    "project_id": project_id,
                    "name": phase["name"],
                    "start_date": parse_date(phase.get("start_date")),
                    "end_date": parse_date(phase.get("end_date")),
                    "sort_order": phase.get("sort_order"),
                },
            )
    await session.commit()
    print(f"  Done — {len(data)} projects inserted with phases.")


async def migrate_data_sources(session: AsyncSession):
    if not SOURCE_REGISTRY.exists():
        print("  No source-registry.json found, skipping data sources.")
        return

    data = json.loads(SOURCE_REGISTRY.read_text(encoding="utf-8"))
    sources = data if isinstance(data, list) else data.get("sources", [])
    print(f"Migrating {len(sources)} data sources...")

    for s in sources:
        await session.execute(
            text("""
                INSERT INTO data_sources (id, name, authority, primary_url, backup_urls, format, update_frequency, snapshot_path, record_count, used_for, criticality, fallback_strategy, notes)
                VALUES (:id, :name, :authority, :primary_url, CAST(:backup_urls AS jsonb), :format, :update_frequency, :snapshot_path, :record_count, CAST(:used_for AS jsonb), :criticality, :fallback_strategy, :notes)
                ON CONFLICT (id) DO UPDATE SET
                    name = EXCLUDED.name,
                    primary_url = EXCLUDED.primary_url,
                    backup_urls = EXCLUDED.backup_urls,
                    record_count = EXCLUDED.record_count
            """),
            {
                "id": s.get("id"),
                "name": s.get("name"),
                "authority": s.get("authority"),
                "primary_url": s.get("primaryUrl") or s.get("primary_url"),
                "backup_urls": json.dumps(s.get("backupUrls") or s.get("backup_urls") or []),
                "format": s.get("format"),
                "update_frequency": s.get("updateFrequency") or s.get("update_frequency"),
                "snapshot_path": s.get("snapshotPath") or s.get("snapshot_path"),
                "record_count": s.get("recordCount") or s.get("record_count"),
                "used_for": json.dumps(s.get("usedFor") or s.get("used_for") or []),
                "criticality": s.get("criticality"),
                "fallback_strategy": s.get("fallbackStrategy") or s.get("fallback_strategy"),
                "notes": s.get("notes"),
            },
        )
    await session.commit()
    print(f"  Done — {len(sources)} data sources inserted.")


async def main():
    print("=" * 60)
    print("Cut2Fill Data Migration")
    print("=" * 60)

    async with async_session() as session:
        await migrate_facilities(session)
        await migrate_water_points(session)
        await migrate_major_projects(session)
        await migrate_data_sources(session)

    await engine.dispose()
    print("\nMigration complete.")


if __name__ == "__main__":
    asyncio.run(main())
