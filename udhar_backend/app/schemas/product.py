from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    price: float
    image_url: str | None = None
    category: str | None = None
    stock: int


class ProductUpdate(BaseModel):
    name: str
    price: float
    image_url: str | None = None
    category: str | None = None
    stock: int