"""Initial schema

Revision ID: 001
Revises:
Create Date: 2026-03-26
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from geoalchemy2 import Geometry

revision = "001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Enable PostGIS
    op.execute("CREATE EXTENSION IF NOT EXISTS postgis")

    # facilities
    op.create_table(
        "facilities",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), primary_key=True),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("facility_type", sa.Text(), nullable=False),
        sa.Column("location", Geometry("POINT", srid=4326), nullable=True),
        sa.Column("suburb", sa.Text()),
        sa.Column("hours", sa.Text()),
        sa.Column("notes", sa.Text()),
        sa.Column("icon", sa.Text()),
        sa.Column("color", sa.Text()),
        sa.Column("source", sa.Text()),
        sa.Column("source_ref", sa.Text()),
        sa.Column("verified", sa.Boolean(), server_default=sa.text("false")),
        sa.Column("verified_at", postgresql.TIMESTAMP(timezone=True)),
        sa.Column("verified_by", postgresql.UUID(as_uuid=True)),
        sa.Column("created_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
    )
    op.create_index("ix_facilities_location", "facilities", ["location"], postgresql_using="gist")
    op.create_index("ix_facilities_type", "facilities", ["facility_type"])

    # water_fill_points
    op.create_table(
        "water_fill_points",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), primary_key=True),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("code", sa.Text()),
        sa.Column("provider", sa.Text(), nullable=False),
        sa.Column("location", Geometry("POINT", srid=4326), nullable=True),
        sa.Column("suburb", sa.Text()),
        sa.Column("address", sa.Text()),
        sa.Column("access", sa.Text()),
        sa.Column("water_type", sa.Text()),
        sa.Column("source", sa.Text(), server_default=sa.text("'manual'")),
        sa.Column("verified", sa.Boolean(), server_default=sa.text("true")),
        sa.Column("created_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
    )

    # major_projects
    op.create_table(
        "major_projects",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), primary_key=True),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("location", Geometry("POINT", srid=4326), nullable=True),
        sa.Column("suburb", sa.Text()),
        sa.Column("description", sa.Text()),
        sa.Column("status", sa.Text()),
        sa.Column("project_type", sa.Text()),
        sa.Column("cost", sa.Text()),
        sa.Column("authority", sa.Text()),
        sa.Column("start_date", sa.Date()),
        sa.Column("expected_end", sa.Date()),
        sa.Column("estimated_volume", sa.Text()),
        sa.Column("source_url", sa.Text()),
        sa.Column("created_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
    )

    # project_phases
    op.create_table(
        "project_phases",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), primary_key=True),
        sa.Column("project_id", postgresql.UUID(as_uuid=True), sa.ForeignKey("major_projects.id", ondelete="CASCADE"), nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("start_date", sa.Date()),
        sa.Column("end_date", sa.Date()),
        sa.Column("sort_order", sa.Integer()),
    )

    # submissions
    op.create_table(
        "submissions",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), primary_key=True),
        sa.Column("submission_type", sa.Text(), nullable=False),
        sa.Column("status", sa.Text(), server_default=sa.text("'pending'")),
        sa.Column("submitted_by", postgresql.UUID(as_uuid=True)),
        sa.Column("contact_name", sa.Text()),
        sa.Column("contact_email", sa.Text()),
        sa.Column("contact_phone", sa.Text()),
        sa.Column("data", postgresql.JSONB()),
        sa.Column("reviewed_by", postgresql.UUID(as_uuid=True)),
        sa.Column("reviewed_at", postgresql.TIMESTAMP(timezone=True)),
        sa.Column("review_notes", sa.Text()),
        sa.Column("created_facility_id", postgresql.UUID(as_uuid=True)),
        sa.Column("created_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
    )

    # data_sources
    op.create_table(
        "data_sources",
        sa.Column("id", sa.Text(), primary_key=True),
        sa.Column("name", sa.Text()),
        sa.Column("authority", sa.Text()),
        sa.Column("primary_url", sa.Text()),
        sa.Column("backup_urls", postgresql.JSONB()),
        sa.Column("format", sa.Text()),
        sa.Column("update_frequency", sa.Text()),
        sa.Column("snapshot_path", sa.Text()),
        sa.Column("record_count", sa.Integer()),
        sa.Column("used_for", postgresql.JSONB()),
        sa.Column("criticality", sa.Text()),
        sa.Column("fallback_strategy", sa.Text()),
        sa.Column("notes", sa.Text()),
        sa.Column("last_pulled", postgresql.TIMESTAMP(timezone=True)),
        sa.Column("last_verified", postgresql.TIMESTAMP(timezone=True)),
    )

    # source_health_checks
    op.create_table(
        "source_health_checks",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), primary_key=True),
        sa.Column("source_id", sa.Text(), nullable=False),
        sa.Column("checked_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
        sa.Column("primary_ok", sa.Boolean()),
        sa.Column("primary_status", sa.Integer()),
        sa.Column("backup_results", postgresql.JSONB()),
        sa.Column("snapshot_fresh", sa.Boolean()),
        sa.Column("issues", postgresql.JSONB()),
    )

    # profiles
    op.create_table(
        "profiles",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("display_name", sa.Text()),
        sa.Column("company", sa.Text()),
        sa.Column("role", sa.Text(), server_default=sa.text("'user'")),
        sa.Column("created_at", postgresql.TIMESTAMP(timezone=True), server_default=sa.text("now()")),
    )


def downgrade():
    op.drop_table("profiles")
    op.drop_table("source_health_checks")
    op.drop_table("data_sources")
    op.drop_table("submissions")
    op.drop_table("project_phases")
    op.drop_table("major_projects")
    op.drop_table("water_fill_points")
    op.drop_table("facilities")
    op.execute("DROP EXTENSION IF EXISTS postgis")
