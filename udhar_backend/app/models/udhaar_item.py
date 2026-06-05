from sqlalchemy import (
    Column,
    Integer,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database import Base


class UdhaarItem(Base):
    __tablename__ = "udhaar_items"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    udhaar_id = Column(
        Integer,
        ForeignKey("udhaars.id")
    )

    product_id = Column(
        Integer,
        ForeignKey("products.id")
    )

    quantity = Column(
        Integer,
        default=1
    )

    udhaar = relationship(
        "Udhaar",
        back_populates="items"
    )

    product = relationship(
        "Product"
    )