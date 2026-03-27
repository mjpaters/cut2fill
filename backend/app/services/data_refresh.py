import json
import os
from pathlib import Path

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.source import DataSource

SNAPSHOT_BASE = Path(os.environ.get("SNAPSHOT_BASE_DIR", "/app/snapshots"))


async def refresh_source(source_id: str, db: AsyncSession) -> dict:
    """Pull fresh data from a gov API source and report changes."""
    result = await db.execute(select(DataSource).where(DataSource.id == source_id))
    source = result.scalar_one_or_none()
    if not source:
        return {"error": f"Source '{source_id}' not found"}

    if not source.primary_url:
        return {"error": "No primary URL configured", "source_id": source_id}

    report = {"source_id": source_id, "status": "ok", "records_fetched": 0, "changes": []}

    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.get(source.primary_url, follow_redirects=True)
            resp.raise_for_status()
        except httpx.HTTPError as e:
            # Try backup URLs
            fetched = False
            if source.backup_urls:
                for url in source.backup_urls:
                    try:
                        resp = await client.get(url, follow_redirects=True)
                        resp.raise_for_status()
                        fetched = True
                        break
                    except httpx.HTTPError:
                        continue
            if not fetched:
                report["status"] = "error"
                report["error"] = str(e)
                return report

    # Save snapshot locally
    if source.snapshot_path:
        # Sanitise path — prevent traversal attacks
        safe_path = Path(source.snapshot_path).name
        snapshot_dir = SNAPSHOT_BASE
        snapshot_dir.mkdir(parents=True, exist_ok=True)
        snapshot_file = snapshot_dir / safe_path
        snapshot_file.write_text(resp.text, encoding="utf-8")

    try:
        data = resp.json()
        if isinstance(data, dict) and "features" in data:
            report["records_fetched"] = len(data["features"])
        elif isinstance(data, list):
            report["records_fetched"] = len(data)
    except (json.JSONDecodeError, ValueError):
        report["records_fetched"] = 0

    # Update source metadata
    from sqlalchemy import func as sa_func

    source.last_pulled = sa_func.now()
    source.record_count = report["records_fetched"]
    await db.commit()

    return report
