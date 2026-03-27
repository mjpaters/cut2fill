import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.source import DataSource, SourceHealthCheck


async def check_source(source: DataSource) -> dict:
    """Check a single data source's health."""
    result = {
        "source_id": source.id,
        "primary_ok": False,
        "primary_status": None,
        "backup_results": [],
        "snapshot_fresh": False,
        "issues": [],
    }

    async with httpx.AsyncClient(timeout=15.0) as client:
        # Check primary URL
        if source.primary_url:
            try:
                resp = await client.head(source.primary_url, follow_redirects=True)
                result["primary_status"] = resp.status_code
                result["primary_ok"] = resp.status_code < 400
            except httpx.RequestError as e:
                result["issues"].append(f"Primary URL unreachable: {e}")

        # Check backup URLs
        if source.backup_urls:
            for url in source.backup_urls:
                try:
                    resp = await client.head(url, follow_redirects=True)
                    result["backup_results"].append(
                        {"url": url, "ok": resp.status_code < 400, "status": resp.status_code}
                    )
                except httpx.RequestError:
                    result["backup_results"].append({"url": url, "ok": False, "status": None})

    if not result["primary_ok"] and not any(b["ok"] for b in result["backup_results"]):
        result["issues"].append("All URLs unreachable")

    return result


async def run_all_checks(db: AsyncSession) -> list[dict]:
    """Run health checks on all data sources and log results."""
    sources_result = await db.execute(select(DataSource))
    sources = sources_result.scalars().all()

    results = []
    for source in sources:
        check = await check_source(source)
        health_log = SourceHealthCheck(
            source_id=check["source_id"],
            primary_ok=check["primary_ok"],
            primary_status=check["primary_status"],
            backup_results=check["backup_results"],
            snapshot_fresh=check["snapshot_fresh"],
            issues=check["issues"] if check["issues"] else None,
        )
        db.add(health_log)
        results.append(check)

    await db.commit()
    return results
