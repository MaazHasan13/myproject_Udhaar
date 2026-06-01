from pydantic import BaseModel


class CreateCustomerSchema(BaseModel):
    name: str
    phone: str
    email: str
    address: str


class UpdateCustomerSchema(BaseModel):
    name: str
    phone: str
    email: str
    address: str