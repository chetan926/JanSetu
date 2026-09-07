import httpx
import time
import uuid
from typing import Dict, Any, Tuple
from sqlalchemy.orm import Session
from datetime import datetime

from app.models.models import APILog, AuditLog, RequestTrace, Consent

class InteroperabilityGateway:
    BASE_URL = "http://127.0.0.1:8000"

    @classmethod
    def generate_trace_id(cls) -> str:
        short_uuid = uuid.uuid4().hex[:6].upper()
        return f"TRACE-{short_uuid}"

    @classmethod
    def check_department_consent(cls, citizen_id: str, department_keyword: str, db: Session) -> bool:
        """Verify if active consent exists for specified citizen and department"""
        consent = db.query(Consent).filter(
            Consent.citizen_id == citizen_id,
            Consent.department.ilike(f"%{department_keyword}%"),
            Consent.status == "GRANTED"
        ).first()
        return consent is not None

    @classmethod
    async def fetch_canonical_citizen_data(cls, citizen_id: str, db: Session) -> Tuple[Dict[str, Any], str, Dict[str, Any]]:
        trace_id = cls.generate_trace_id()
        start_time = time.time()
        
        department_states = {}
        provenance = {}
        
        raw_income = None
        raw_education = None
        raw_property = None

        # 1. Income Department Call (with Consent Check)
        income_consent = cls.check_department_consent(citizen_id, "income", db)
        if not income_consent:
            department_states["income"] = {"status": "BLOCKED", "reason": "Consent missing or revoked"}
        else:
            t0 = time.time()
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(f"{cls.BASE_URL}/mock/income/{citizen_id}", timeout=4.0)
                    latency = int((time.time() - t0) * 1000)
                    if resp.status_code == 200:
                        raw_income = resp.json()
                        department_states["income"] = {"status": "SUCCESS", "latency_ms": latency}
                        provenance["annual_income"] = f"Income Tax Department ({latency}ms)"
                    else:
                        department_states["income"] = {"status": "ERROR", "code": resp.status_code}
            except Exception as e:
                department_states["income"] = {"status": "UNAVAILABLE", "error": str(e)}

        # 2. Education Department Call (with Consent Check)
        edu_consent = cls.check_department_consent(citizen_id, "education", db)
        if not edu_consent:
            department_states["education"] = {"status": "BLOCKED", "reason": "Consent missing or revoked"}
        else:
            t0 = time.time()
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(f"{cls.BASE_URL}/mock/education/{citizen_id}", timeout=4.0)
                    latency = int((time.time() - t0) * 1000)
                    if resp.status_code == 200:
                        raw_education = resp.json()
                        department_states["education"] = {"status": "SUCCESS", "latency_ms": latency}
                        provenance["education_status"] = f"Higher Education Department ({latency}ms)"
                    else:
                        department_states["education"] = {"status": "ERROR", "code": resp.status_code}
            except Exception as e:
                department_states["education"] = {"status": "UNAVAILABLE", "error": str(e)}

        # 3. Property / Identity Call (with Consent Check)
        prop_consent = cls.check_department_consent(citizen_id, "property", db)
        if not prop_consent:
            department_states["property"] = {"status": "BLOCKED", "reason": "Consent missing or revoked"}
        else:
            t0 = time.time()
            try:
                async with httpx.AsyncClient() as client:
                    resp = await client.get(f"{cls.BASE_URL}/mock/property/{citizen_id}", timeout=4.0)
                    latency = int((time.time() - t0) * 1000)
                    if resp.status_code == 200:
                        raw_property = resp.json()
                        department_states["property"] = {"status": "SUCCESS", "latency_ms": latency}
                        provenance["property_verified"] = f"Property & Identity Department ({latency}ms)"
                    else:
                        department_states["property"] = {"status": "ERROR", "code": resp.status_code}
            except Exception as e:
                department_states["property"] = {"status": "UNAVAILABLE", "error": str(e)}

        # SCHEMA MAPPING & TRANSFORMATION LAYER
        # Standardize heterogeneous keys into Canonical Model
        name = "Unknown"
        income = 0.0
        edu_status = "UNKNOWN"
        prop_verified = False

        if raw_income:
            name = raw_income.get("full_name", name)
            income = float(raw_income.get("annual_income", 0.0))

        if raw_education:
            if name == "Unknown":
                name = raw_education.get("studentName", name)
            edu_status = raw_education.get("enrollmentStatus", "UNKNOWN")

        if raw_property:
            if name == "Unknown":
                name = raw_property.get("owner", name)
            ver_text = str(raw_property.get("verification", "")).upper()
            prop_verified = (ver_text == "VERIFIED")

        canonical_data = {
            "schema_version": "1.0",
            "citizen_id": citizen_id,
            "name": name,
            "annual_income": income,
            "education_status": edu_status,
            "property_verified": prop_verified,
            "provenance": provenance
        }

        total_latency = int((time.time() - start_time) * 1000)

        # Audit & Trace DB Record
        audit_log = AuditLog(
            trace_id=trace_id,
            actor=citizen_id,
            action="CANONICAL_DATA_ORCHESTRATION",
            resource="GOVERNMENT_INTEROP_GATEWAY",
            details=f"Orchestrated 3 mock APIs in {total_latency}ms",
            status="SUCCESS"
        )
        db.add(audit_log)
        
        request_trace = RequestTrace(
            trace_id=trace_id,
            citizen_id=citizen_id,
            service_id="SCHOLARSHIP-001",
            steps=department_states,
            total_latency_ms=total_latency
        )
        db.add(request_trace)
        db.commit()

        return canonical_data, trace_id, department_states
