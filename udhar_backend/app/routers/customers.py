from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.customer import Customer

from app.schemas.customer import CreateCustomerSchema
from app.schemas.customer import (
    CreateCustomerSchema,
    UpdateCustomerSchema
)
router = APIRouter()


@router.post("/")
def create_customer(
    customer_data: CreateCustomerSchema,
    db: Session = Depends(get_db)
):

    customer = Customer(
        name=customer_data.name,
        phone=customer_data.phone,
        address=customer_data.address
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    return {
        "message": "Customer created successfully",
        "customer_id": customer.id
    }

@router.get("/")
def get_customers(
    db: Session = Depends(get_db)
):
    customers = db.query(Customer).all()

    return customers


@router.put("/{customer_id}")
def update_customer(
    customer_id: int,
    customer_data: UpdateCustomerSchema,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        return {
            "message": "Customer not found"
        }

    customer.name = customer_data.name
    customer.phone = customer_data.phone
    customer.address = customer_data.address

    db.commit()
    db.refresh(customer)

    return {
        "message": "Customer updated successfully"
    }

@router.delete("/{customer_id}")
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if not customer:
        return {
            "message": "Customer not found"
        }

    db.delete(customer)
    db.commit()

    return {
        "message": "Customer deleted successfully"
    }