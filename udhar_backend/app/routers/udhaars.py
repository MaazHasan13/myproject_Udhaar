from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.udhaar import Udhaar
from app.schemas.udhaar import (
    CreateUdhaarSchema,
    UpdateUdhaarSchema
)

router = APIRouter()


@router.post("/")
def create_udhaar(
    udhaar_data: CreateUdhaarSchema,
    db: Session = Depends(get_db)
):

    udhaar = Udhaar(
        customer_id=udhaar_data.customer_id,
        amount=udhaar_data.amount,
        description=udhaar_data.description,
        date=udhaar_data.date
    )

    db.add(udhaar)
    db.commit()
    db.refresh(udhaar)

    return {
        "message": "Udhaar created successfully",
        "udhaar_id": udhaar.id
    }


@router.get("/")
def get_udhaars(
    db: Session = Depends(get_db)
):
    udhaars = db.query(Udhaar).all()

    result = []

    for u in udhaars:
        result.append(
            {
                "id": u.id,
                "customer_id": u.customer.id,
                "customer_name": u.customer.name,
                "amount": u.amount,
                "description": u.description,
                "date": u.date
            }
        )

    return result

@router.put("/{udhaar_id}")
def update_udhaar(
    udhaar_id: int,
    udhaar_data: UpdateUdhaarSchema,
    db: Session = Depends(get_db)
):

    udhaar = db.query(Udhaar).filter(
        Udhaar.id == udhaar_id
    ).first()

    if not udhaar:
        return {
            "message": "Udhaar not found"
        }

    udhaar.customer_id = udhaar_data.customer_id
    udhaar.amount = udhaar_data.amount
    udhaar.description = udhaar_data.description
    udhaar.date = udhaar_data.date

    db.commit()
    db.refresh(udhaar)

    return {
        "message": "Udhaar updated successfully"
    }

@router.delete("/{udhaar_id}")
def delete_udhaar(
    udhaar_id: int,
    db: Session = Depends(get_db)
):

    udhaar = db.query(Udhaar).filter(
        Udhaar.id == udhaar_id
    ).first()

    if not udhaar:
        return {
            "message": "Udhaar not found"
        }

    db.delete(udhaar)
    db.commit()

    return {
        "message": "Udhaar deleted successfully"
    }