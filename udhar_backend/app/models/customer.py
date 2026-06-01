from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.database import Base


class Customer(Base):
    __tablename__ = "customers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    phone = Column(
        String,
        unique=True,
        nullable=False
    )

    address = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    udhaars = relationship(
        "Udhaar",
        back_populates="customer"
    )
        
    payments = relationship(
    "Payment"
    )

    email = Column(
    String,
    unique=True,
    nullable=False
    )

    password = Column(
    String,
    nullable=False
    )