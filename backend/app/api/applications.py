from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime
import uuid

from app.core.database import get_db
from app.models.models import Application, AuditLog, VerificationRecord
from app.schemas.schemas import ApplicationCreate
from app.integration.gateway import InteroperabilityGateway
from app.services.eligibility_engine import DeterministicEligibilityEngine

router = APIRouter(prefix="/api/applications", tags=["Applications & Tracking"])

@router.post("/submit")
async def submit_application(payload: ApplicationCreate, db: Session = Depends(get_db)):
    # 1. Check Idempotency Key
    if payload.idempotency_key:
        existing = db.query(Application).filter(
            Application.idempotency_key == payload.idempotency_key
        ).first()
        if existing:
            return {
                "status": "EXISTING_APPLICATION_DETECTED",
                "message": f"Application already submitted under ID {existing.application_id}.",
                "application_id": existing.application_id,
                "trace_id": existing.trace_id,
                "created_at": existing.created_at.isoformat()
            }

    # 2. Fetch canonical data & evaluate eligibility
    canonical_data, trace_id, dept_states = await InteroperabilityGateway.fetch_canonical_citizen_data(payload.citizen_id, db)
    eligibility = DeterministicEligibilityEngine.evaluate_scholarship_eligibility(canonical_data)

    if not eligibility.eligible:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Application Rejected: Citizen ineligible. Reason: {eligibility.reason}"
        )

    # 3. Create Application
    app_id = f"SCH-2026-{uuid.uuid4().hex[:4].upper()}"
    new_app = Application(
        application_id=app_id,
        citizen_id=payload.citizen_id,
        service_id=payload.service_id,
        service_name="Education Scholarship Scheme 2026",
        status="APPROVED",
        trace_id=trace_id,
        policy_version=eligibility.policy_version,
        idempotency_key=payload.idempotency_key,
        created_at=datetime.utcnow()
    )
    db.add(new_app)

    # 4. Record Audit Log
    audit = AuditLog(
        trace_id=trace_id,
        actor=payload.citizen_id,
        action="APPLICATION_SUBMITTED",
        resource=app_id,
        details="Submitted application via Interoperability Gateway with verified deterministic eligibility",
        status="SUCCESS"
    )
    db.add(audit)
    db.commit()

    return {
        "status": "SUCCESS",
        "message": "Application submitted & approved successfully.",
        "application_id": app_id,
        "trace_id": trace_id,
        "policy_version": eligibility.policy_version,
        "created_at": new_app.created_at.isoformat()
    }

@router.get("/citizen/{citizen_id}")
def get_citizen_applications(citizen_id: str, db: Session = Depends(get_db)):
    apps = db.query(Application).filter(Application.citizen_id == citizen_id).all()
    return apps

@router.get("/audit/{trace_id}")
def get_audit_trail(trace_id: str, db: Session = Depends(get_db)):
    logs = db.query(AuditLog).filter(AuditLog.trace_id == trace_id).all()
    return logs
