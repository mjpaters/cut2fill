"""Import source-registry.json into the data_sources table and run health checks."""
import asyncio
import json
import sys

sys.path.insert(0, "C:/dev/cut2fill/backend")

from app.database import async_session, engine
from app.services.source_health import run_all_checks
from sqlalchemy import text


async def main():
    # Load registry
    with open("C:/dev/cut2fill/data/source-registry.json") as f:
        registry = json.load(f)

    sources = registry["sources"]
    print(f"Found {len(sources)} sources in registry\n")

    async with async_session() as session:
        for source_id, s in sources.items():
            # Map camelCase JSON fields to snake_case DB columns
            params = {
                "id": source_id,
                "name": s.get("name"),
                "authority": s.get("authority"),
                "primary_url": s.get("primaryUrl"),
                "backup_urls": json.dumps(s.get("backupUrls", [])),
                "format": s.get("format"),
                "update_frequency": s.get("updateFrequency"),
                "snapshot_path": s.get("snapshot") or s.get("snapshotPath"),
                "record_count": s.get("recordCount"),
                "used_for": json.dumps(s.get("usedFor", [])),
                "criticality": s.get("criticality"),
                "fallback_strategy": s.get("fallbackStrategy"),
                "notes": s.get("notes"),
                "last_pulled": s.get("lastPulled"),
                "last_verified": s.get("lastVerified"),
            }

            await session.execute(
                text("""
                    INSERT INTO data_sources (
                        id, name, authority, primary_url, backup_urls, format,
                        update_frequency, snapshot_path, record_count, used_for,
                        criticality, fallback_strategy, notes, last_pulled, last_verified
                    ) VALUES (
                        :id, :name, :authority, :primary_url,
                        CAST(:backup_urls AS jsonb), :format,
                        :update_frequency, :snapshot_path, :record_count,
                        CAST(:used_for AS jsonb),
                        :criticality, :fallback_strategy, :notes,
                        CAST(NULLIF(:last_pulled, '') AS timestamptz),
                        CAST(NULLIF(:last_verified, '') AS timestamptz)
                    )
                    ON CONFLICT (id) DO UPDATE SET
                        name = EXCLUDED.name,
                        authority = EXCLUDED.authority,
                        primary_url = EXCLUDED.primary_url,
                        backup_urls = EXCLUDED.backup_urls,
                        format = EXCLUDED.format,
                        update_frequency = EXCLUDED.update_frequency,
                        snapshot_path = EXCLUDED.snapshot_path,
                        record_count = EXCLUDED.record_count,
                        used_for = EXCLUDED.used_for,
                        criticality = EXCLUDED.criticality,
                        fallback_strategy = EXCLUDED.fallback_strategy,
                        notes = EXCLUDED.notes,
                        last_pulled = EXCLUDED.last_pulled,
                        last_verified = EXCLUDED.last_verified
                """),
                params,
            )
            print(f"  Upserted: {source_id}")

        await session.commit()
        print(f"\nImported {len(sources)} sources successfully.\n")

        # Verify import
        result = await session.execute(text("SELECT id, name, criticality FROM data_sources ORDER BY id"))
        rows = result.fetchall()
        print(f"Verification — {len(rows)} rows in data_sources:")
        for row in rows:
            print(f"  {row[0]:40s} | {row[2]:6s} | {row[1]}")

        # Run health checks
        print("\n--- Running health checks ---\n")
        results = await run_all_checks(session)
        for r in results:
            status = "OK" if r["primary_ok"] else "FAIL"
            issues = ", ".join(r["issues"]) if r["issues"] else "none"
            print(f"  [{status:4s}] {r['source_id']:40s} HTTP {r['primary_status']} | issues: {issues}")

        print(f"\nHealth checks complete: {sum(1 for r in results if r['primary_ok'])}/{len(results)} primary URLs healthy")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(main())
