import uuid

from geoalchemy2 import Geometry
from sqlalchemy import Boolean, Date, ForeignKey, Index, Integer, Text, text
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Listing(Base):
    __tablename__ = "listings"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    listing_type: Mapped[str] = mapped_column(Text, nullable=False)  # 'available' or 'wanted'
    material_type: Mapped[str] = mapped_column(Text, nullable=False)
    volume_m3: Mapped[int] = mapped_column(Integer, nullable=False)
    location = mapped_column(Geometry("POINT", srid=4326), nullable=True)
    suburb: Mapped[str | None] = mapped_column(Text)
    address: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)
    pricing: Mapped[str | None] = mapped_column(Text)  # 'free' or 'quote-required'
    date_from = mapped_column(Date, nullable=True)
    date_to = mapped_column(Date, nullable=True)
    contact_name: Mapped[str | None] = mapped_column(Text)
    contact_email: Mapped[str | None] = mapped_column(Text)
    contact_phone: Mapped[str | None] = mapped_column(Text)
    company: Mapped[str | None] = mapped_column(Text)
    tested: Mapped[bool] = mapped_column(Boolean, server_default=text("false"))
    pickup: Mapped[bool] = mapped_column(Boolean, server_default=text("false"))
    delivery: Mapped[bool] = mapped_column(Boolean, server_default=text("false"))
    status: Mapped[str] = mapped_column(Text, server_default=text("'pending'"))
    submitted_by: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="SET NULL")
    )
    reviewed_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    reviewed_at = mapped_column(TIMESTAMP(timezone=True), nullable=True)
    review_notes: Mapped[str | None] = mapped_column(Text)
    created_at = mapped_column(TIMESTAMP(timezone=True), server_default=text("now()"))
    updated_at = mapped_column(TIMESTAMP(timezone=True), server_default=text("now()"))

    __table_args__ = (
        Index("ix_listings_location", "location", postgresql_using="gist"),
        Index("ix_listings_status", "status"),
        Index("ix_listings_material_type", "material_type"),
    )
