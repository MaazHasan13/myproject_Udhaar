from pydantic import BaseModel


class CreatePaymentSchema(BaseModel):
    customer_id: int
    amount: int


class UpdatePaymentSchema(BaseModel):
    customer_id: int
    amount: int