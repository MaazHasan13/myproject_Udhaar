from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.customer import Customer
import random
import string
from app.schemas.customer_login import (
    CustomerLoginSchema
)
from app.utils.email_service import (
    send_customer_email
)

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

    password = ''.join(
        random.choices(
            string.ascii_letters +
            string.digits,
            k=8
        )
    )

    customer = Customer(
        name=customer_data.name,
        phone=customer_data.phone,
        email=customer_data.email,
        address=customer_data.address,
        password=password
    )

    db.add(customer)
    db.commit()
    db.refresh(customer)

    send_customer_email(
    customer.email,
    customer.name,
    password
    )

    return {
        "message": "Customer created successfully",
        "customer_id": customer.id,
        "password": password
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
    customer.email = customer_data.email

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
@router.get("/")
def get_udhaars(
    db: Session = Depends(get_db)
):
    udhaars = db.query(Udhaar).all()

    result = []

    for u in udhaars:
        result.append({
            "id": u.id,
            "customer_id": u.customer.id,
            "customer_name": u.customer.name,
            "amount": u.amount,
            "description": u.description,
            "date": u.date
        })

    return result


@router.get("/{customer_id}/details")
def customer_details(
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

    total_udhaar = sum(
        u.amount for u in customer.udhaars
    )

    total_payment = sum(
        p.amount for p in customer.payments
    )

    return {
        "id": customer.id,
        "name": customer.name,
        "phone": customer.phone,
        "address": customer.address,
        "total_udhaar": total_udhaar,
        "total_payment": total_payment,
        "remaining_balance":
            total_udhaar - total_payment,
        "udhaars": [
            {
                "id": u.id,
                "amount": u.amount,
                "description": u.description,
                "date": u.date,
            }
            for u in customer.udhaars
        ],
        "payments": [
            {
                "id": p.id,
                "amount": p.amount,
            }
            for p in customer.payments
        ],
    }

@router.get("/summary")
def customer_summary(
    db: Session = Depends(get_db)
):
    customers = db.query(Customer).all()

    result = []

    for customer in customers:

        total_udhaar = sum(
            u.amount for u in customer.udhaars
        )

        total_payment = sum(
            p.amount for p in customer.payments
        )

        remaining_balance = (
            total_udhaar - total_payment
        )

        result.append(
            {
                "customer_id": customer.id,
                "customer_name": customer.name,
                "total_udhaar": total_udhaar,
                "total_payment": total_payment,
                "remaining_balance": remaining_balance,
            }
        )

    return result


@router.post("/login")
def customer_login(
    login_data: CustomerLoginSchema,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer).filter(
        Customer.email == login_data.email
    ).first()

    if not customer:
        return {
            "message": "Invalid email"
        }

    if customer.password != login_data.password:
        return {
            "message": "Invalid password"
        }

    return {
        "message": "Login successful",
        "customer_id": customer.id,
        "customer_name": customer.name
    }