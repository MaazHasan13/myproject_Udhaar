from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.product import Product

from app.schemas.product import (
    ProductCreate,
    ProductUpdate
)

router = APIRouter()

# Create Product
@router.post("/")
def create_product(
    product_data: ProductCreate,
    db: Session = Depends(get_db)
):
    product = Product(
        name=product_data.name,
        price=product_data.price,
        image_url=product_data.image_url,
        category=product_data.category,
        stock=product_data.stock
    )

    db.add(product)
    db.commit()
    db.refresh(product)

    return {
        "message": "Product created successfully"
    }


# Get Products
@router.get("/")
def get_products(
    db: Session = Depends(get_db)
):
    return db.query(Product).all()


# Delete Product
@router.delete("/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        return {
            "message": "Product not found"
        }

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted"
    }