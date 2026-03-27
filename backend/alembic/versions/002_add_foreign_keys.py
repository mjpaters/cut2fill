"""Add foreign keys and indexes

Revision ID: 002
Revises: 001
Create Date: 2026-03-27
"""
from alembic import op

revision = "002"
down_revision = "001"
branch_labels = None
depends_on = None


def upgrade():
    # submissions → profiles (submitted_by)
    op.create_foreign_key(
        "fk_submissions_submitted_by",
        "submissions", "profiles",
        ["submitted_by"], ["id"],
        ondelete="SET NULL",
    )
    # submissions → profiles (reviewed_by)
    op.create_foreign_key(
        "fk_submissions_reviewed_by",
        "submissions", "profiles",
        ["reviewed_by"], ["id"],
        ondelete="SET NULL",
    )
    # submissions → facilities (created_facility_id)
    op.create_foreign_key(
        "fk_submissions_created_facility",
        "submissions", "facilities",
        ["created_facility_id"], ["id"],
        ondelete="SET NULL",
    )
    # facilities → profiles (verified_by)
    op.create_foreign_key(
        "fk_facilities_verified_by",
        "facilities", "profiles",
        ["verified_by"], ["id"],
        ondelete="SET NULL",
    )
    # source_health_checks → data_sources (source_id)
    op.create_foreign_key(
        "fk_health_checks_source",
        "source_health_checks", "data_sources",
        ["source_id"], ["id"],
        ondelete="CASCADE",
    )

    # Useful indexes for common queries
    op.create_index("ix_submissions_status", "submissions", ["status"])
    op.create_index("ix_submissions_submitted_by", "submissions", ["submitted_by"])
    op.create_index("ix_source_health_checks_source_id", "source_health_checks", ["source_id"])


def downgrade():
    op.drop_index("ix_source_health_checks_source_id")
    op.drop_index("ix_submissions_submitted_by")
    op.drop_index("ix_submissions_status")
    op.drop_constraint("fk_health_checks_source", "source_health_checks", type_="foreignkey")
    op.drop_constraint("fk_facilities_verified_by", "facilities", type_="foreignkey")
    op.drop_constraint("fk_submissions_created_facility", "submissions", type_="foreignkey")
    op.drop_constraint("fk_submissions_reviewed_by", "submissions", type_="foreignkey")
    op.drop_constraint("fk_submissions_submitted_by", "submissions", type_="foreignkey")
