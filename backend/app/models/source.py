import uuid

from sqlalchemy import Boolean, Integer, Text, text
from sqlalchemy.dialects.postgresql import JSONB, UUID, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class DataSource(Base):
    __tablename__ = "data_sources"

    id: Mapped[str] = mapped_column(Text, primary_key=True)
    name: Mapped[str | None] = mapped_column(Text)
    authority: Mapped[str | None] = mapped_column(Text)
    primary_url: Mapped[str | None] = mapped_column(Text)
    backup_urls = mapped_column(JSONB, nullable=True)
    format: Mapped[str | None] = mapped_column(Text)
    update_frequency: Mapped[str | None] = mapped_column(Text)
    snapshot_path: Mapped[str | None] = mapped_column(Text)
    record_count: Mapped[int | None] = mapped_column(Integer)
    used_for = mapped_column(JSONB, nullable=True)
    criticality: Mapped[str | None] = mapped_column(Text)
    fallback_strategy: Mapped[str | None] = mapped_column(Text)
    notes: Mapped[str | None] = mapped_column(Text)
    last_pulled = mapped_column(TIMESTAMP(timezone=True), nullable=True)
    last_verified = mapped_column(TIMESTAMP(timezone=True), nullable=True)


class SourceHealthCheck(Base):
    __tablename__ = "source_health_checks"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    source_id: Mapped[str] = mapped_column(Text, nullable=False)
    checked_at = mapped_column(TIMESTAMP(timezone=True), server_default=text("now()"))
    primary_ok: Mapped[bool | None] = mapped_column(Boolean)
    primary_status: Mapped[int | None] = mapped_column(Integer)
    backup_results = mapped_column(JSONB, nullable=True)
    snapshot_fresh: Mapped[bool | None] = mapped_column(Boolean)
    issues = mapped_column(JSONB, nullable=True)
