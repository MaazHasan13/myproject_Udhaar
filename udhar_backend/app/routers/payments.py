from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.payment import Payment
from app.schemas.payment import (
    CreatePaymentSchema,
    UpdatePaymentSchema
)

router = APIRouter()


@router.post("/")
def create_payment(
    payment_data: CreatePaymentSchema,
    db: Session = Depends(get_db)
):

    payment = Payment(
        customer_id=payment_data.customer_id,
        amount=payment_data.amount
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return {
        "message": "Payment created successfully",
        "payment_id": payment.id
    }


@router.get("/")
def get_payments(
    db: Session = Depends(get_db)
):

    payments = db.query(Payment).all()

    result = []

    for p in payments:
        result.append(
            {
                "id": p.id,
                "customer_id": p.customer.id,
                "customer_name": p.customer.name,
                "amount": p.amount
            }
        )

    return result


@router.put("/{payment_id}")
def update_payment(
    payment_id: int,
    payment_data: UpdatePaymentSchema,
    db: Session = Depends(get_db)
):

    payment = db.query(Payment).filter(
        Payment.id == payment_id
    ).first()

    if not payment:
        return {
            "message": "Payment not found"
        }

    payment.customer_id = payment_data.customer_id
    payment.amount = payment_data.amount

    db.commit()
    db.refresh(payment)

    return {
        "message": "Payment updated successfully"
    }


@router.delete("/{payment_id}")
def delete_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):

    payment = db.query(Payment).filter(
        Payment.id == payment_id
    ).first()

    if not payment:
        return {
            "message": "Payment not found"
        }

    db.delete(payment)
    db.commit()

    return {
        "message": "Payment deleted successfully"
    }