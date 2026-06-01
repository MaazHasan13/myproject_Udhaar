from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.user import LoginRequest
from app.core.security import (
    verify_password,
    create_access_token
)

router = APIRouter()


@router.post("/login")
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):

    admin = db.query(User).filter(
        User.username == login_data.username
    ).first()

    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not verify_password(
        login_data.password,
        admin.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        {"sub": admin.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }