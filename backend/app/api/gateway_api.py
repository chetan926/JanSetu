from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.integration.gateway import InteroperabilityGateway
from app.services.eligibility_engine import DeterministicEligibilityEngine

router = APIRouter(prefix="/api", tags=["Interoperability Gateway & Eligibility"])

@router.get("/gateway/fetch-canonical/{citizen_id}")
async def fetch_canonical_data(citizen_id: str, db: Session = Depends(get_db)):
    canonical_data, trace_id, department_states = await InteroperabilityGateway.fetch_canonical_citizen_data(citizen_id, db)
    return {
        "trace_id": trace_id,
        "canonical_model": canonical_data,
        "department_states": department_states
    }

@router.get("/eligibility/evaluate/{citizen_id}")
async def evaluate_eligibility(citizen_id: str, db: Session = Depends(get_db)):
    canonical_data, trace_id, department_states = await InteroperabilityGateway.fetch_canonical_citizen_data(citizen_id, db)
    eligibility_result = DeterministicEligibilityEngine.evaluate_scholarship_eligibility(canonical_data)
    
    return {
        "trace_id": trace_id,
        "canonical_model": canonical_data,
        "department_states": department_states,
        "eligibility": eligibility_result
    }
