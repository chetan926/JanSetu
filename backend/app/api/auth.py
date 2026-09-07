from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import verify_password, create_access_token
from app.models.models import User

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    citizen_id: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    citizen_id: str
    name: str
    role: str

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.citizen_id == payload.citizen_id).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Citizen ID or Password."
        )

    access_token = create_access_token(data={"sub": user.citizen_id, "role": user.role})
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        citizen_id=user.citizen_id,
        name=user.name,
        role=user.role
    )
