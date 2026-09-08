from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime

class CitizenSchema(BaseModel):
    citizen_id: str
    name: str
    annual_income: float
    education_status: str
    property_verified: bool

    class Config:
        from_attributes = True

class DepartmentSchema(BaseModel):
    code: str
    name: str
    endpoint: str
    status: str
    latency_ms: int

    class Config:
        from_attributes = True

class CanonicalDataModel(BaseModel):
    schema_version: str = "1.0"
    citizen_id: str
    name: str
    annual_income: float
    education_status: str
    property_verified: bool
    provenance: Dict[str, str]

class RuleCheck(BaseModel):
    rule: str
    actual: Any
    passed: bool

class EligibilityResponse(BaseModel):
    eligible: bool
    policy_version: str = "1.0"
    citizen_id: str
    checks: List[RuleCheck]
    reason: Optional[str] = None
    evaluated_at: str

class ApplicationCreate(BaseModel):
    citizen_id: str
    service_id: str
    idempotency_key: Optional[str] = None

class ApplicationResponse(BaseModel):
    application_id: str
    citizen_id: str
    service_name: str
    status: str
    trace_id: str
    created_at: str

class ConsentRequest(BaseModel):
    citizen_id: str
    department: str
    requested_fields: List[str]
    purpose: str

class ConsentResponse(BaseModel):
    consent_id: str
    citizen_id: str
    department: str
    requested_fields: List[str]
    purpose: str
    status: str
    granted_at: str

class AuditLogSchema(BaseModel):
    trace_id: str
    actor: str
    action: str
    resource: str
    status: str
    timestamp: str

    class Config:
        from_attributes = True
