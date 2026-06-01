from pydantic import BaseModel


class CreateUdhaarSchema(BaseModel):
    customer_id: int
    amount: int
    description: str
    date: str


class UpdateUdhaarSchema(BaseModel):
    customer_id: int
    amount: int
    description: str
    date: str