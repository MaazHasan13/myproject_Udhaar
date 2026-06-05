from sqlalchemy import Column, Integer, String, Float

from app.database import Base
from sqlalchemy.orm import relationship


class Product(Base):
    __tablename__ = "products"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    price = Column(
        Float,
        nullable=False
    )

    image_url = Column(
        String,
        nullable=True
    )

    category = Column(
        String,
        nullable=True
    )

    stock = Column(
        Integer,
        default=0
    )
    udhaar_items = relationship(
    "UdhaarItem"
    )