from pydantic import BaseModel


class CreateCustomerSchema(BaseModel):
    name: str
    phone: str
    address: str

class UpdateCustomerSchema(BaseModel):
    name: str
    phone: str
    address: str