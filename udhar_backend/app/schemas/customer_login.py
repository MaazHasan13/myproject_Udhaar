from pydantic import BaseModel


class CustomerLoginSchema(BaseModel):
    email: str
    password: str