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
async def run_portal_verification(portal_id: str, citizen_id: str, scenario: str = "NORMAL", db: Session = Depends(get_db)):
    trace_id = f"TRACE-{uuid.uuid4().hex[:6].upper()}"
    start_time = time.time()
    active_scenario = scenario.upper()

    # Find portal meta
    portal_meta = next((p for p in PORTAL_DIRECTORY_DATA if p["id"] == portal_id or p["code"] == portal_id), None)
    if not portal_meta:
        # Fallback metadata generator for any dynamic portal code
        portal_meta = {
            "id": portal_id,
            "code": portal_id,
            "name": f"{portal_id.replace('_', ' ').title()} Verification Portal",
            "department": f"{portal_id.replace('_', ' ').title()} Department",
            "category": "Government Registry",
            "icon_emoji": "🏛️",
            "status": "CONNECTED",
            "integration_level": "LIVE MOCK",
            "service_count": 3,
            "endpoint": f"/mock/{portal_id}",
            "supported_fields": ["verification_status", "record_id"]
        }

    # Handle scenario CONSENT_DENIED
    if active_scenario == "CONSENT_DENIED":
        return {
            "status": "BLOCKED",
            "message": f"ACCESS DENIED: Department data was not accessed because citizen consent was not granted for {portal_meta['name']}.",
            "trace_id": trace_id,
            "portal_id": portal_id,
            "portal_name": portal_meta['name'],
            "department": portal_meta['department'],
            "consent_status": "DENIED",
            "latency_ms": 42,
            "data_minimization": {
                "requested_fields": [],
                "unrequested_fields_protected": ["annual_income", "education_status", "identity_details", "address", "phone_number"]
            },
            "raw_department_response": None,
            "canonical_schema_mapping": {},
            "data_provenance": [],
            "trace_steps": [
                {"step": "01 Request Initiated", "status": "COMPLETED", "duration_ms": 5},
                {"step": "02 Consent Validated", "status": "FAILED", "duration_ms": 12, "detail": "Citizen Consent Missing / Denied"},
                {"step": "03 Gateway Blocked", "status": "STOPPED", "duration_ms": 0}
            ],
            "timestamp": datetime.utcnow().isoformat()
        }

    # Check database consent
    consent = db.query(Consent).filter(
        Consent.citizen_id == citizen_id,
        Consent.status == "GRANTED"
    ).first()

    consent_granted = consent is not None

    if not consent_granted and active_scenario != "FORCE_ALLOW":
        return {
            "status": "BLOCKED",
            "message": f"ACCESS DENIED: Department data was not accessed because citizen consent was not granted for {portal_meta['name']}.",
            "trace_id": trace_id,
            "portal_id": portal_id,
            "portal_name": portal_meta['name'],
            "department": portal_meta['department'],
            "consent_status": "DENIED",
            "latency_ms": 38,
            "data_minimization": {
                "requested_fields": portal_meta.get("supported_fields", []),
                "unrequested_fields_protected": ["address", "phone_number", "bank_account", "biometric_hash"]
            },
            "raw_department_response": None,
            "canonical_schema_mapping": {},
            "data_provenance": [],
            "trace_steps": [
                {"step": "01 Request Initiated", "status": "COMPLETED", "duration_ms": 5},
                {"step": "02 Consent Validated", "status": "FAILED", "duration_ms": 15, "detail": "Consent Record Not Found in Registry"},
                {"step": "03 Gateway Request Created", "status": "CANCELLED", "duration_ms": 0}
            ],
            "timestamp": datetime.utcnow().isoformat()
        }

    # Scenario handling: TIMEOUT, DOWN, INVALID_DATA, SLOW
    if active_scenario == "TIMEOUT":
        return {
            "status": "TIMEOUT",
            "message": f"Gateway Timeout: {portal_meta['name']} failed to respond within 5000ms SLA threshold.",
            "trace_id": trace_id,
            "portal_id": portal_id,
            "portal_name": portal_meta['name'],
            "department": portal_meta['department'],
            "consent_status": "GRANTED",
            "latency_ms": 5012,
            "data_minimization": {
                "requested_fields": portal_meta.get("supported_fields", []),
                "unrequested_fields_protected": ["address", "phone_number", "bank_account"]
            },
            "raw_department_response": {"error": "HTTP_504_GATEWAY_TIMEOUT", "retry_attempted": True},
            "canonical_schema_mapping": {},
            "data_provenance": [],
            "trace_steps": [
                {"step": "01 Request Initiated", "status": "COMPLETED", "duration_ms": 8},
                {"step": "02 Consent Validated", "status": "COMPLETED", "duration_ms": 14},
                {"step": "03 Gateway Request Created", "status": "COMPLETED", "duration_ms": 22},
                {"step": "04 Department Portal Contacted", "status": "TIMEOUT", "duration_ms": 5000, "detail": "Connection Timed Out"},
                {"step": "05 Fallback Executed", "status": "COMPLETED", "duration_ms": 10, "detail": "Circuit Breaker Activated"}
            ],
            "timestamp": datetime.utcnow().isoformat()
        }

    if active_scenario in ["DOWN", "UNAVAILABLE"]:
        return {
            "status": "UNAVAILABLE",
            "message": f"System Unavailable: {portal_meta['name']} API node is currently offline for scheduled maintenance.",
            "trace_id": trace_id,
            "portal_id": portal_id,
            "portal_name": portal_meta['name'],
            "department": portal_meta['department'],
            "consent_status": "GRANTED",
            "latency_ms": 145,
            "data_minimization": {
                "requested_fields": portal_meta.get("supported_fields", []),
                "unrequested_fields_protected": ["address", "phone_number", "bank_account"]
            },
            "raw_department_response": {"error": "HTTP_503_SERVICE_UNAVAILABLE", "health": "MAINTENANCE"},
            "canonical_schema_mapping": {},
            "data_provenance": [],
            "trace_steps": [
                {"step": "01 Request Initiated", "status": "COMPLETED", "duration_ms": 6},
                {"step": "02 Consent Validated", "status": "COMPLETED", "duration_ms": 12},
                {"step": "03 Gateway Request Created", "status": "COMPLETED", "duration_ms": 25},
                {"step": "04 Department Portal Contacted", "status": "FAILED", "duration_ms": 102, "detail": "Endpoint Returned 503"}
            ],
            "timestamp": datetime.utcnow().isoformat()
        }

    if active_scenario == "INVALID_DATA":
        return {
            "status": "FAILED",
            "message": f"Data Verification Failed: Corrupted or unverified record received from {portal_meta['name']}.",
            "trace_id": trace_id,
            "portal_id": portal_id,
            "portal_name": portal_meta['name'],
            "department": portal_meta['department'],
            "consent_status": "GRANTED",
            "latency_ms": 280,
            "data_minimization": {
                "requested_fields": portal_meta.get("supported_fields", []),
                "unrequested_fields_protected": ["address", "phone_number", "bank_account"]
            },
            "raw_department_response": {"citizen_id": citizen_id, "verification": "CORRUPTED_DIGITAL_SEAL", "checksum": "MISMATCH"},
            "canonical_schema_mapping": {"verification_status": "FAILED_SIGNATURE"},
            "data_provenance": [],
            "trace_steps": [
                {"step": "01 Request Initiated", "status": "COMPLETED", "duration_ms": 5},
                {"step": "02 Consent Validated", "status": "COMPLETED", "duration_ms": 10},
                {"step": "03 Gateway Request Created", "status": "COMPLETED", "duration_ms": 20},
                {"step": "04 Department Response Received", "status": "COMPLETED", "duration_ms": 140},
                {"step": "05 Schema Transformation", "status": "FAILED", "duration_ms": 105, "detail": "Cryptographic Seal Mismatch"}
            ],
            "timestamp": datetime.utcnow().isoformat()
        }

    if active_scenario in ["SLOW", "DELAYED"]:
        time.sleep(1.2)

    # Fetch citizen
    citizen = db.query(Citizen).filter(Citizen.citizen_id == citizen_id).first()
    if not citizen:
        raise HTTPException(status_code=404, detail=f"Citizen '{citizen_id}' not found in database.")

    raw_response = {}
    canonical_mapping = {}
    requested_fields = []
    unrequested_fields = ["address", "phone_number", "bank_account", "biometric_raw_hash", "tax_filing_history"]
    data_provenance = []
    verification_status = "VERIFIED"

    now_iso = datetime.utcnow().isoformat()

    if portal_id in ["income"]:
        requested_fields = ["citizen_id", "full_name", "annual_income", "tax_status"]
        income_verified = citizen.annual_income <= 250000.0
        verification_status = "VERIFIED" if income_verified else "HIGH_INCOME"
        raw_response = {
            "citizen_id": citizen.citizen_id,
            "full_name": citizen.name,
            "annual_income": citizen.annual_income,
            "tax_status": "FILED_ACTIVE",
            "certificate_seal": "DIGITAL_SEAL_INCOME_TAX_INDIA",
            "retrieved_at": now_iso
        }
        canonical_mapping = {
            "annual_income": citizen.annual_income,
            "name": citizen.name,
            "income_eligible": income_verified
        }
        data_provenance = [
            {
                "canonical_field": "annual_income",
                "value": f"₹{citizen.annual_income:,.2f}",
                "source_department": "Income Tax & Financial Verification Department",
                "original_field": "annual_income",
                "retrieved_at": now_iso,
                "trace_id": trace_id
            },
            {
                "canonical_field": "name",
                "value": citizen.name,
                "source_department": "Income Tax & Financial Verification Department",
                "original_field": "full_name",
                "retrieved_at": now_iso,
                "trace_id": trace_id
            }
        ]
    elif portal_id in ["education"]:
        requested_fields = ["studentId", "studentName", "enrollmentStatus", "institution", "course"]
        edu_verified = citizen.education_status == "ACTIVE"
        verification_status = "VERIFIED" if edu_verified else "INACTIVE"
        raw_response = {
            "studentId": citizen.citizen_id,
            "studentName": citizen.name,
            "institution": "ABC College of Engineering & Technology",
            "enrollmentStatus": citizen.education_status,
            "course": "B.Tech Computer Science",
            "academicYear": "2025-2026",
            "retrieved_at": now_iso
        }
        canonical_mapping = {
            "education_status": citizen.education_status,
            "name": citizen.name,
            "institution": "ABC College of Engineering & Technology"
        }
        data_provenance = [
            {
                "canonical_field": "education_status",
                "value": citizen.education_status,
                "source_department": "Higher & Technical Education Department",
                "original_field": "enrollmentStatus",
                "retrieved_at": now_iso,
                "trace_id": trace_id
            },
            {
                "canonical_field": "name",
                "value": citizen.name,
                "source_department": "Higher & Technical Education Department",
                "original_field": "studentName",
                "retrieved_at": now_iso,
                "trace_id": trace_id
            }
        ]
    elif portal_id in ["identity"]:
        requested_fields = ["id", "owner", "verification", "biometric_status"]
        id_verified = citizen.property_verified
        verification_status = "VERIFIED" if id_verified else "UNVERIFIED"
        raw_response = {
            "id": citizen.citizen_id,
            "owner": citizen.name,
            "verification": "VERIFIED" if id_verified else "UNVERIFIED",
            "biometric_status": "VALIDATED_UIDAI_SEAL",
            "retrieved_at": now_iso
        }
        canonical_mapping = {
            "identity_verified": id_verified,
            "name": citizen.name
        }
        data_provenance = [
            {
                "canonical_field": "identity_verified",
                "value": "VERIFIED" if id_verified else "UNVERIFIED",
                "source_department": "Revenue / Identity Verification Department",
                "original_field": "verification",
                "retrieved_at": now_iso,
                "trace_id": trace_id
            }
        ]
    elif portal_id in ["property"]:
        requested_fields = ["id", "owner", "verification", "property_ref"]
        prop_verified = citizen.property_verified
        verification_status = "VERIFIED" if prop_verified else "UNVERIFIED"
        raw_response = {
            "id": citizen.citizen_id,
            "owner": citizen.name,
            "property_ref": f"PROP-7712-{citizen.citizen_id}",
            "ownership_status": "OWNER_RECORDED",
            "verification": "VERIFIED" if prop_verified else "UNVERIFIED",
            "retrieved_at": now_iso
        }
        canonical_mapping = {
            "property_verified": prop_verified,
            "name": citizen.name
        }
        data_provenance = [
            {
                "canonical_field": "property_verified",
                "value": "VERIFIED" if prop_verified else "UNVERIFIED",
                "source_department": "Revenue / Property Records Department",
                "original_field": "verification",
                "retrieved_at": now_iso,
                "trace_id": trace_id
            }
        ]
    elif portal_id in ["documents"]:
        requested_fields = ["doc_type", "doc_number", "issuing_department", "doc_status"]
        verification_status = "VERIFIED"
        raw_response = {
            "doc_type": "Digital Income & Caste Certificate",
            "doc_number": f"DOC-2026-{citizen.citizen_id}",
            "issuing_department": "Revenue Tehsildar Office",
            "doc_status": "VERIFIED_DIGITAL_SEAL",
            "retrieved_at": now_iso
        }
        canonical_mapping = {
            "document_verified": True,
            "document_type": "Income & Caste Certificate"
        }
        data_provenance = [
            {
                "canonical_field": "document_verified",
                "value": "TRUE",
                "source_department": "Digital India Document Repository",
                "original_field": "doc_status",
                "retrieved_at": now_iso,
                "trace_id": trace_id
            }
        ]
    else:
        requested_fields = ["citizen_id", "verification_status", "record_ref"]
        verification_status = "VERIFIED"
        raw_response = {
            "portal_code": portal_id,
            "citizen_id": citizen.citizen_id,
            "applicant_name": citizen.name,
            "verification_status": "VERIFIED",
            "retrieved_at": now_iso
        }
        canonical_mapping = {
            "record_status": "VERIFIED",
            "name": citizen.name
        }
        data_provenance = [
            {
                "canonical_field": "record_status",
                "value": "VERIFIED",
                "source_department": portal_meta['department'],
                "original_field": "verification_status",
                "retrieved_at": now_iso,
                "trace_id": trace_id
            }
        ]

    latency = int((time.time() - start_time) * 1000)

    trace_steps = [
        {"step": "01 Request Initiated", "status": "COMPLETED", "duration_ms": 6, "detail": "Client initiated gateway request"},
        {"step": "02 Consent Validated", "status": "COMPLETED", "duration_ms": 12, "detail": "Consent active and granted"},
        {"step": "03 Gateway Request Created", "status": "COMPLETED", "duration_ms": 18, "detail": f"Trace ID assigned {trace_id}"},
        {"step": "04 Department Portal Contacted", "status": "COMPLETED", "duration_ms": max(25, latency - 60), "detail": f"Endpoint {portal_meta['endpoint']} hit"},
        {"step": "05 Department Response Received", "status": "COMPLETED", "duration_ms": 15, "detail": "200 OK HTTP JSON received"},
        {"step": "06 Schema Transformation", "status": "COMPLETED", "duration_ms": 10, "detail": "Mapped keys to Canonical Schema v1.0"},
        {"step": "07 Canonical Data Generated", "status": "COMPLETED", "duration_ms": 8, "detail": "Provenance payload enriched"},
        {"step": "08 Verification Completed", "status": "COMPLETED", "duration_ms": 5, "detail": f"Final Status: {verification_status}"}
    ]

    # Audit log entry
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
        "status": verification_status,
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
        "data_provenance": data_provenance,
        "trace_steps": trace_steps,
        "timestamp": now_iso
    }

