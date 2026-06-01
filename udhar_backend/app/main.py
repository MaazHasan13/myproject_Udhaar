from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.udhaar import Udhaar
from app.routers import auth, customers, udhaars
from app.models.payment import Payment
from app.routers import auth, customers, udhaars, payments

from app.database import (
    Base,
    engine,
    SessionLocal
)

from app.seed import create_default_admin

from app.models.user import User
from app.models.customer import Customer

from app.routers import auth, customers

app = FastAPI(
    title="Udhar Management System"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    payments.router,
    prefix="/payments",
    tags=["Payments"]
)

Base.metadata.create_all(bind=engine)


@app.on_event("startup")
def startup():
    db = SessionLocal()

    try:
        create_default_admin(db)

    finally:
        db.close()


app.include_router(
    auth.router,
    prefix="/auth",
    tags=["Auth"]
)

app.include_router(
    customers.router,
    prefix="/customers",
    tags=["Customers"]
)


@app.get("/")
def home():
    return {
        "message": "Udhar Backend Running"
    }

app.include_router(
    udhaars.router,
    prefix="/udhaars",
    tags=["Udhaars"]
)