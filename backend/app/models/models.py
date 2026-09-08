from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    citizen_id = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, default="citizen")  # citizen, officer, admin
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Citizen(Base):
    __tablename__ = "citizens"

    id = Column(Integer, primary_key=True, index=True)
    citizen_id = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    annual_income = Column(Float, nullable=False)
    education_status = Column(String, nullable=False)  # ACTIVE, INACTIVE
    property_verified = Column(Boolean, default=True)  # True = VERIFIED, False = UNVERIFIED
    created_at = Column(DateTime, default=datetime.utcnow)

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True, nullable=False)  # income, education, property
    name = Column(String, nullable=False)
    endpoint = Column(String, nullable=False)
    status = Column(String, default="operational")  # operational, degraded, offline
    latency_ms = Column(Integer, default=140)

class GovernmentService(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    required_departments = Column(JSON, nullable=False)
    required_fields = Column(JSON, nullable=False)
    status = Column(String, default="active")

class Consent(Base):
    __tablename__ = "consents"

    id = Column(Integer, primary_key=True, index=True)
    consent_id = Column(String, unique=True, index=True, nullable=False)
    citizen_id = Column(String, index=True, nullable=False)
    department = Column(String, nullable=False)
    requested_fields = Column(JSON, nullable=False)
    purpose = Column(String, nullable=False)
    status = Column(String, default="GRANTED")  # GRANTED, REVOKED, EXPIRED
    granted_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(String, unique=True, index=True, nullable=False)
    citizen_id = Column(String, index=True, nullable=False)
    service_id = Column(String, nullable=False)
    service_name = Column(String, nullable=False)
    status = Column(String, default="SUBMITTED")  # SUBMITTED, PROCESSING, APPROVED, REJECTED
    trace_id = Column(String, index=True, nullable=False)
    policy_version = Column(String, default="1.0")
    idempotency_key = Column(String, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class VerificationRecord(Base):
    __tablename__ = "verification_records"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(String, index=True, nullable=False)
    department = Column(String, nullable=False)
    check_name = Column(String, nullable=False)
    status = Column(String, nullable=False)  # PASSED, FAILED
    details = Column(Text, nullable=True)
    trace_id = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

class APILog(Base):
    __tablename__ = "api_logs"

    id = Column(Integer, primary_key=True, index=True)
    trace_id = Column(String, index=True, nullable=False)
    endpoint = Column(String, nullable=False)
    method = Column(String, nullable=False)
    status_code = Column(Integer, nullable=False)
    latency_ms = Column(Integer, nullable=False)
    request_payload = Column(Text, nullable=True)
    response_payload = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    trace_id = Column(String, index=True, nullable=False)
    actor = Column(String, nullable=False)
    action = Column(String, nullable=False)
    resource = Column(String, nullable=False)
    details = Column(Text, nullable=True)
    status = Column(String, default="SUCCESS")
    timestamp = Column(DateTime, default=datetime.utcnow)

class RequestTrace(Base):
    __tablename__ = "request_traces"

    id = Column(Integer, primary_key=True, index=True)
    trace_id = Column(String, unique=True, index=True, nullable=False)
    citizen_id = Column(String, nullable=False)
    service_id = Column(String, nullable=False)
    steps = Column(JSON, nullable=False)
    total_latency_ms = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
