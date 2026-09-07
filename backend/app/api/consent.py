from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
import uuid

from app.core.database import get_db
from app.models.models import Consent, AuditLog
from app.schemas.schemas import ConsentRequest, ConsentResponse

router = APIRouter(prefix="/api/consent", tags=["Consent Manager"])

@router.get("/{citizen_id}")
def get_citizen_consents(citizen_id: str, db: Session = Depends(get_db)):
    consents = db.query(Consent).filter(Consent.citizen_id == citizen_id).all()
    return consents

@router.post("/grant")
def grant_consent(payload: ConsentRequest, db: Session = Depends(get_db)):
    consent_id = f"CONSENT-{uuid.uuid4().hex[:6].upper()}"
    now = datetime.utcnow()
    expires = now + timedelta(days=30)

    consent = Consent(
        consent_id=consent_id,
        citizen_id=payload.citizen_id,
        department=payload.department,
        requested_fields=payload.requested_fields,
        purpose=payload.purpose,
        status="GRANTED",
        granted_at=now,
        expires_at=expires
    )
    db.add(consent)

    audit = AuditLog(
        trace_id=f"TRACE-{uuid.uuid4().hex[:6].upper()}",
        actor=payload.citizen_id,
        action="CONSENT_GRANTED",
        resource=payload.department,
        details=f"Granted consent for {payload.purpose}",
        status="SUCCESS"
    )
    db.add(audit)
    db.commit()

    return {"status": "SUCCESS", "consent_id": consent_id, "message": "Consent granted successfully."}

@router.post("/revoke/{consent_id}")
def revoke_consent(consent_id: str, db: Session = Depends(get_db)):
    consent = db.query(Consent).filter(Consent.consent_id == consent_id).first()
    if not consent:
        raise HTTPException(status_code=404, detail="Consent ID not found.")

    consent.status = "REVOKED"
    
    audit = AuditLog(
        trace_id=f"TRACE-{uuid.uuid4().hex[:6].upper()}",
        actor=consent.citizen_id,
        action="CONSENT_REVOKED",
        resource=consent.department,
        details=f"Revoked consent ID {consent_id}",
        status="SUCCESS"
    )
    db.add(audit)
    db.commit()

    return {"status": "SUCCESS", "message": f"Consent {consent_id} has been revoked."}
