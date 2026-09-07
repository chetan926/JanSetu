from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import time

from app.core.database import get_db
from app.core.init_db import init_db
from app.models.models import Citizen, Department, GovernmentService, User
from app.schemas.schemas import CitizenSchema

# Import API Routers
from app.api import mock_departments, auth, consent, gateway_api, applications
from app.ai import assistant

app = FastAPI(
    title="SIH 2026 PS-129 National Interoperability Platform API",
    description="Unified Interoperability Gateway connecting Income, Education & Identity mock government systems.",
    version="1.0.0"
)

# Initialize DB and Seed Data automatically on API startup
@app.on_event("startup")
def startup_event():
    init_db()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(mock_departments.router)
app.include_router(auth.router)
app.include_router(consent.router)
app.include_router(gateway_api.router)
app.include_router(applications.router)
app.include_router(assistant.router)

@app.get("/")
def read_root():
    return {
        "title": "SIH 2026 PS-129 Interoperability Platform",
        "status": "ONLINE",
        "documentation": "/docs",
        "health_check": "/api/health",
        "timestamp": time.time()
    }

@app.get("/api/health")
def health_check(db: Session = Depends(get_db)):
    citizen_count = db.query(Citizen).count()
    return {
        "status": "healthy",
        "service": "SIH 2026 PS-129 Interoperability Gateway API",
        "version": "1.0.0",
        "database": {
            "status": "CONNECTED",
            "citizens_seeded": citizen_count
        },
        "components": {
            "gateway": "UP",
            "mock_income": "UP",
            "mock_education": "UP",
            "mock_property": "UP"
        }
    }

@app.get("/api/citizens/{citizen_id}", response_model=CitizenSchema)
def get_citizen(citizen_id: str, db: Session = Depends(get_db)):
    citizen = db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()
    if not citizen:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Citizen ID '{citizen_id}' not found in database."
        )
    return citizen

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
