from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import hash_password
from dotenv import load_dotenv
import os

load_dotenv()


def create_default_admin(db: Session):

    admin = db.query(User).first()

    if admin:
        print("Admin already exists")
        return

    admin = User(
        username=os.getenv("ADMIN_USERNAME"),
        email=os.getenv("ADMIN_EMAIL"),
        password=hash_password(
            os.getenv("ADMIN_PASSWORD")
        )
    )

    db.add(admin)
    db.commit()

    print("Admin created successfully")