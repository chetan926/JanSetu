export interface CitizenProfile {
  citizen_id: string;
  name: string;
  email: string;
  role: 'citizen' | 'officer' | 'admin';
  annual_income?: number;
  education_status?: string;
  property_verified?: boolean;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  endpoint: string;
  status: 'operational' | 'degraded' | 'offline';
  latency: number;
}

export interface ServiceItem {
  id: string;
  service_id: string;
  name: string;
  category: string;
  description: string;
  required_departments: string[];
  required_fields: string[];
  status: 'active' | 'maintenance';
}

export interface CanonicalData {
  schema_version: string;
  citizen_id: string;
  name: string;
  annual_income: number;
  education_status: string;
  property_verified: boolean;
  provenance: Record<string, string>;
}

export interface VerificationCheck {
  rule: string;
  actual: string | number | boolean;
  passed: boolean;
}

export interface EligibilityResponse {
  eligible: boolean;
  policy_version: string;
  citizen_id: string;
  checks: VerificationCheck[];
  reason?: string;
  evaluated_at: string;
}

export interface ApplicationRecord {
  id: string;
  application_id: string;
  citizen_id: string;
  service_name: string;
  status: 'SUBMITTED' | 'PROCESSING' | 'VERIFIED' | 'APPROVED' | 'REJECTED';
  trace_id: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  trace_id: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

export interface ConsentRecord {
  id: string;
  consent_id?: string;
  citizen_id: string;
  department: string;
  requested_fields: string[] | string;
  purpose: string;
  status: 'GRANTED' | 'REVOKED' | 'EXPIRED';
  granted_at: string;
  expires_at?: string;
}

export interface PortalMeta {
  id: string;
  code: string;
  name: string;
  department: string;
  category: string;
  icon_emoji: string;
  status: 'CONNECTED' | 'DEGRADED' | 'MAINTENANCE' | 'UNAVAILABLE' | 'REGISTRY READY' | 'FUTURE CONNECTOR';
  integration_level: 'LIVE MOCK' | 'REGISTRY READY' | 'FUTURE CONNECTOR';
  service_count: number;
  endpoint: string;
  supported_fields: string[];
  description?: string;
}

export interface DataProvenanceItem {
  canonical_field: string;
  value: string;
  source_department: string;
  original_field: string;
  retrieved_at: string;
  trace_id: string;
}

export interface TraceStepItem {
  step: string;
  status: 'COMPLETED' | 'FAILED' | 'TIMEOUT' | 'STOPPED' | 'CANCELLED' | 'PENDING';
  duration_ms: number;
  detail?: string;
}

export interface PortalVerificationResponse {
  status: string;
  message?: string;
  trace_id: string;
  portal_id: string;
  portal_name: string;
  department: string;
  consent_status: 'GRANTED' | 'DENIED';
  latency_ms: number;
  data_minimization: {
    requested_fields: string[];
    unrequested_fields_protected: string[];
  };
  raw_department_response: Record<string, any> | null;
  canonical_schema_mapping: Record<string, any>;
  data_provenance?: DataProvenanceItem[];
  trace_steps?: TraceStepItem[];
  timestamp: string;
}

