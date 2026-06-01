from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Udhaar(Base):
    __tablename__ = "udhaars"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(
        Integer,
        ForeignKey("customers.id"),
        nullable=False
    )

    amount = Column(
        Integer,
        nullable=False
    )

    description = Column(
        String,
        nullable=True
    )

    date = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    customer = relationship(
        "Customer",
        back_populates="udhaars"
    )