from pydantic import BaseModel

class UdhaarItemCreate(BaseModel):
    product_id: int
    quantity: int