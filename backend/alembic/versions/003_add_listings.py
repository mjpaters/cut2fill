"""Add listings table

Revision ID: 003
Revises: 002
Create Date: 2026-04-07
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from geoalchemy2 import Geometry

revision = "003"
down_revision = "002"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "listings",
        sa.Column("id", UUID(as_uuid=True), primary_key=True, server_default=sa.text("gen_random_uuid()")),
        sa.Column("listing_type", sa.Text(), nullable=False),
        sa.Column("material_type", sa.Text(), nullable=False),
        sa.Column("volume_m3", sa.Integer(), nullable=False),
        sa.Column("location", Geometry("POINT", srid=4326), nullable=True),
        sa.Column("suburb", sa.Text(), nullable=True),
        sa.Column("address", sa.Text(), nullable=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("pricing", sa.Text(), nullable=True),
        sa.Column("date_from", sa.Date(), nullable=True),
        sa.Column("date_to", sa.Date(), nullable=True),
        sa.Column("contact_name", sa.Text(), nullable=True),
        sa.Column("contact_email", sa.Text(), nullable=True),
        sa.Column("contact_phone", sa.Text(), nullable=True),
        sa.Column("company", sa.Text(), nullable=True),
        sa.Column("tested", sa.Boolean(), server_default=sa.text("false")),
        sa.Column("pickup", sa.Boolean(), server_default=sa.text("false")),
        sa.Column("delivery", sa.Boolean(), server_default=sa.text("false")),
        sa.Column("status", sa.Text(), server_default=sa.text("'pending'")),
        sa.Column("submitted_by", UUID(as_uuid=True), nullable=True),
        sa.Column("reviewed_by", UUID(as_uuid=True), nullable=True),
        sa.Column("reviewed_at", TIMESTAMP(timezone=True), nullable=True),
        sa.Column("review_notes", sa.Text(), nullable=True),
        sa.Column("created_at", TIMESTAMP(timezone=True), server_default=sa.text("now()")),
        sa.Column("updated_at", TIMESTAMP(timezone=True), server_default=sa.text("now()")),
    )

    # Foreign key to profiles
    op.create_foreign_key(
        "fk_listings_submitted_by",
        "listings", "profiles",
        ["submitted_by"], ["id"],
        ondelete="SET NULL",
    )

    # Indexes
    op.create_index("ix_listings_location", "listings", ["location"], postgresql_using="gist")
    op.create_index("ix_listings_status", "listings", ["status"])
    op.create_index("ix_listings_material_type", "listings", ["material_type"])


def downgrade():
    op.drop_index("ix_listings_material_type", table_name="listings")
    op.drop_index("ix_listings_status", table_name="listings")
    op.drop_index("ix_listings_location", table_name="listings")
    op.drop_constraint("fk_listings_submitted_by", "listings", type_="foreignkey")
    op.drop_table("listings")
