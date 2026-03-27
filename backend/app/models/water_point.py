import uuid

from geoalchemy2 import Geometry
from sqlalchemy import Boolean, Text, text
from sqlalchemy.dialects.postgresql import UUID, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class WaterFillPoint(Base):
    __tablename__ = "water_fill_points"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=text("gen_random_uuid()")
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    code: Mapped[str | None] = mapped_column(Text)
    provider: Mapped[str] = mapped_column(Text, nullable=False)
    location = mapped_column(Geometry("POINT", srid=4326), nullable=True)
    suburb: Mapped[str | None] = mapped_column(Text)
    address: Mapped[str | None] = mapped_column(Text)
    access: Mapped[str | None] = mapped_column(Text)
    water_type: Mapped[str | None] = mapped_column(Text)
    source: Mapped[str | None] = mapped_column(Text, server_default=text("'manual'"))
    verified: Mapped[bool] = mapped_column(Boolean, server_default=text("true"))
    created_at = mapped_column(TIMESTAMP(timezone=True), server_default=text("now()"))
    updated_at = mapped_column(TIMESTAMP(timezone=True), server_default=text("now()"))
