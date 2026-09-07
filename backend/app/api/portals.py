from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import time
from datetime import datetime
import uuid
from typing import Dict, Any, List

from app.core.database import get_db
from app.models.models import Citizen, Department, Consent, AuditLog, RequestTrace
from app.integration.gateway import InteroperabilityGateway

router = APIRouter(prefix="/api/portals", tags=["Government Verification Portal Ecosystem"])

PORTAL_DIRECTORY_DATA = [
    {
        "id": "education",
        "code": "education",
        "name": "Higher & Technical Education Portal",
        "department": "Department of Higher & Technical Education",
        "category": "Education & Academics",
        "icon_emoji": "🎓",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 4,
        "endpoint": "/mock/education",
        "supported_fields": ["studentId", "studentName", "enrollmentStatus", "institution", "course"]
    },
    {
        "id": "income",
        "code": "income",
        "name": "Income Tax & Financial Verification Portal",
        "department": "Income Tax Department",
        "category": "Finance & Taxation",
        "icon_emoji": "💰",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 5,
        "endpoint": "/mock/income",
        "supported_fields": ["citizen_id", "full_name", "annual_income", "tax_return_status"]
    },
    {
        "id": "identity",
        "code": "property",
        "name": "National Identity & Citizen Verification Portal",
        "department": "Revenue & Identity Verification Department",
        "category": "Identity & Security",
        "icon_emoji": "🪪",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 6,
        "endpoint": "/mock/property",
        "supported_fields": ["id", "owner", "verification", "biometric_status"]
    },
    {
        "id": "property",
        "code": "revenue_forest",
        "name": "Property Records & Land Registry Portal",
        "department": "Revenue & Forest Department",
        "category": "Land & Property",
        "icon_emoji": "🏠",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 3,
        "endpoint": "/mock/revenue_forest",
        "supported_fields": ["khata_number", "land_area_sqft", "encumbrance_status", "caste_cert_status"]
    },
    {
        "id": "documents",
        "code": "documents",
        "name": "National Digital Document Vault",
        "department": "Digital India Document Repository",
        "category": "Document Verification",
        "icon_emoji": "📜",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 8,
        "endpoint": "/mock/documents",
        "supported_fields": ["doc_type", "doc_number", "issuing_authority", "seal_status"]
    },
    {
        "id": "agriculture",
        "code": "agriculture",
        "name": "Agriculture & Farmer Subsidy Portal",
        "department": "Agriculture Department",
        "category": "Farmers & Welfare",
        "icon_emoji": "🌾",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 3,
        "endpoint": "/mock/agriculture",
        "supported_fields": ["farmer_id", "farmer_name", "land_holding_acres", "pm_kisan_eligible"]
    },
    {
        "id": "school_edu",
        "code": "school_edu",
        "name": "School Education & Sports Portal",
        "department": "School Education & Sports Department",
        "category": "K-12 Education",
        "icon_emoji": "🏫",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 3,
        "endpoint": "/mock/school_edu",
        "supported_fields": ["student_udise_id", "school_grade", "school_enrollment"]
    },
    {
        "id": "health",
        "code": "health",
        "name": "Public Health & Ayushman Insurance Portal",
        "department": "Public Health Department",
        "category": "Healthcare",
        "icon_emoji": "🏥",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 4,
        "endpoint": "/mock/health",
        "supported_fields": ["health_card_no", "ayushman_coverage"]
    },
    {
        "id": "women_child",
        "code": "women_child",
        "name": "Women & Child Development Portal",
        "department": "Women & Child Development Department",
        "category": "Welfare & Empowerment",
        "icon_emoji": "👩‍👧",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 3,
        "endpoint": "/mock/women_child",
        "supported_fields": ["scheme_ref", "poshan_status"]
    },
    {
        "id": "housing",
        "code": "housing",
        "name": "Affordable Housing & PMAY Portal",
        "department": "Housing Department",
        "category": "Urban & Rural Housing",
        "icon_emoji": "🏚️",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 2,
        "endpoint": "/mock/housing",
        "supported_fields": ["pmay_application_id", "subsidy_tier"]
    },
    {
        "id": "rural_dev",
        "code": "rural_dev",
        "name": "Rural Development & MNREGA Portal",
        "department": "Rural Development Department",
        "category": "Village Development",
        "icon_emoji": "🏕️",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 3,
        "endpoint": "/mock/rural_dev",
        "supported_fields": ["job_card_no", "wage_status"]
    },
    {
        "id": "urban_dev",
        "code": "urban_dev",
        "name": "Urban Municipal & SVANidhi Portal",
        "department": "Urban Development Department",
        "category": "Municipal Services",
        "icon_emoji": "🏙️",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 3,
        "endpoint": "/mock/urban_dev",
        "supported_fields": ["vendor_id", "tax_status"]
    },
    {
        "id": "labour",
        "code": "labour",
        "name": "Labour & e-Shram Worker Welfare Portal",
        "department": "Labour Department",
        "category": "Labour Welfare",
        "icon_emoji": "💼",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 4,
        "endpoint": "/mock/labour",
        "supported_fields": ["eshram_uan", "social_security_status"]
    },
    {
        "id": "transport",
        "code": "transport",
        "name": "Transport & Motor Vehicle License Portal",
        "department": "Transport / Motor Vehicles Department",
        "category": "Transportation",
        "icon_emoji": "🚗",
        "status": "CONNECTED",
        "integration_level": "LIVE MOCK",
        "service_count": 5,
        "endpoint": "/mock/transport",
        "supported_fields": ["dl_number", "license_class", "dl_status"]
    }
]

@router.get("/directory")
def get_portal_directory(db: Session = Depends(get_db)):
    return {
        "total_portals": len(PORTAL_DIRECTORY_DATA),
        "active_gateway_connectors": len(PORTAL_DIRECTORY_DATA),
        "portals": PORTAL_DIRECTORY_DATA
    }

@router.get("/{portal_id}/verify/{citizen_id}")
async def run_portal_verification(portal_id: str, citizen_id: str, db: Session = Depends(get_db)):
    trace_id = f"TRACE-{uuid.uuid4().hex[:6].upper()}"
    start_time = time.time()

    # Find portal meta
    portal_meta = next((p for p in PORTAL_DIRECTORY_DATA if p["id"] == portal_id), None)
    if not portal_meta:
        raise HTTPException(status_code=404, detail=f"Portal ID '{portal_id}' not registered in ecosystem directory.")

    # Check consent
    consent = db.query(Consent).filter(
        Consent.citizen_id == citizen_id,
        Consent.status == "GRANTED"
    ).first()

    consent_granted = consent is not None

    if not consent_granted:
        return {
            "status": "BLOCKED",
            "message": f"Access Denied: Citizen consent not granted for {portal_meta['name']}.",
            "trace_id": trace_id,
            "consent_status": "DENIED",
            "retrieved_data": None
        }

    # Fetch citizen
    citizen = db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()
    if not citizen:
        raise HTTPException(status_code=404, detail=f"Citizen '{citizen_id}' not found.")

    # Mock Data per Portal type
    raw_response = {}
    canonical_mapping = {}
    requested_fields = []
    unrequested_fields = ["address", "phone_number", "bank_account", "biometric_raw_hash"]

    if portal_id in ["income"]:
        requested_fields = ["annual_income", "full_name"]
        raw_response = {
            "citizen_id": citizen.citizen_id,
            "full_name": citizen.name,
            "annual_income": citizen.annual_income,
            "tax_status": "FILED",
            "retrieved_at": datetime.utcnow().isoformat()
        }
        canonical_mapping = {
            "annual_income": citizen.annual_income,
            "name": citizen.name
        }
    elif portal_id in ["education"]:
        requested_fields = ["enrollmentStatus", "institution", "course"]
        raw_response = {
            "studentId": citizen.citizen_id,
            "studentName": citizen.name,
            "enrollmentStatus": citizen.education_status,
            "institution": "National Institute of Technology",
            "retrieved_at": datetime.utcnow().isoformat()
        }
        canonical_mapping = {
            "education_status": citizen.education_status,
            "name": citizen.name
        }
    elif portal_id in ["identity"]:
        requested_fields = ["verification", "biometric_status"]
        raw_response = {
            "id": citizen.citizen_id,
            "owner": citizen.name,
            "verification": "VERIFIED" if citizen.property_verified else "UNVERIFIED",
            "biometric_status": "VALIDATED",
            "retrieved_at": datetime.utcnow().isoformat()
        }
        canonical_mapping = {
            "property_verified": citizen.property_verified,
            "name": citizen.name
        }
    elif portal_id in ["documents"]:
        requested_fields = ["income_cert_hash", "caste_cert_hash"]
        raw_response = {
            "doc_type": "Digital Income & Caste Certificate",
            "doc_number": f"DOC-2026-{citizen.citizen_id}",
            "issuing_authority": "Revenue Tehsildar Office",
            "verification_status": "VERIFIED_DIGITAL_SEAL",
            "retrieved_at": datetime.utcnow().isoformat()
        }
        canonical_mapping = {
            "document_verified": True
        }
    else:
        requested_fields = ["verification_status", "record_id"]
        raw_response = {
            "portal_code": portal_id,
            "citizen_id": citizen.citizen_id,
            "verification_status": "VERIFIED",
            "retrieved_at": datetime.utcnow().isoformat()
        }
        canonical_mapping = {
            "record_status": "VERIFIED"
        }

    latency = int((time.time() - start_time) * 1000)

    # Log Audit
    audit = AuditLog(
        trace_id=trace_id,
        actor=citizen_id,
        action="PORTAL_VERIFICATION_CHECK",
        resource=portal_meta['name'],
        details=f"Verified fields {requested_fields} via JanSetu Gateway ({latency}ms)",
        status="SUCCESS"
    )
    db.add(audit)
    db.commit()

    return {
        "status": "VERIFIED" if citizen.education_status == "ACTIVE" or citizen.property_verified else "COMPLETED",
        "trace_id": trace_id,
        "portal_id": portal_id,
        "portal_name": portal_meta['name'],
        "department": portal_meta['department'],
        "consent_status": "GRANTED",
        "latency_ms": latency,
        "data_minimization": {
            "requested_fields": requested_fields,
            "unrequested_fields_protected": unrequested_fields
        },
        "raw_department_response": raw_response,
        "canonical_schema_mapping": canonical_mapping,
        "timestamp": datetime.utcnow().isoformat()
    }
