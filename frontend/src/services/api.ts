import axios from 'axios';
import { CanonicalData, EligibilityResponse, ConsentRecord, ApplicationRecord, AuditLog } from '@/types';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export const loginApi = async (citizen_id: string, password: string) => {
  const response = await api.post('/auth/login', { citizen_id, password });
  return response.data;
};

export const getConsentsApi = async (citizenId: string): Promise<ConsentRecord[]> => {
  const response = await api.get(`/consent/${citizenId}`);
  return response.data;
};

export const grantConsentApi = async (citizen_id: string, department: string, requested_fields: string[], purpose: string) => {
  const response = await api.post('/consent/grant', { citizen_id, department, requested_fields, purpose });
  return response.data;
};

export const revokeConsentApi = async (consentId: string) => {
  const response = await api.post(`/consent/revoke/${consentId}`);
  return response.data;
};

export const fetchCanonicalApi = async (citizenId: string) => {
  const response = await api.get(`/gateway/fetch-canonical/${citizenId}`);
  return response.data;
};

export const evaluateEligibilityApi = async (citizenId: string): Promise<{
  trace_id: string;
  canonical_model: CanonicalData;
  department_states: Record<string, any>;
  eligibility: EligibilityResponse;
}> => {
  const response = await api.get(`/eligibility/evaluate/${citizenId}`);
  return response.data;
};

export const submitApplicationApi = async (citizen_id: string, service_id: string, idempotency_key?: string) => {
  const response = await api.post('/applications/submit', { citizen_id, service_id, idempotency_key });
  return response.data;
};

export const getApplicationsApi = async (citizenId: string): Promise<ApplicationRecord[]> => {
  const response = await api.get(`/applications/citizen/${citizenId}`);
  return response.data;
};

export const aiAssistantApi = async (query: string, language: string = 'en') => {
  const response = await api.post('/ai/assistant', { query, language });
  return response.data;
};

export const setScenarioApi = async (scenarioName: string) => {
  const response = await api.post(`/mock/scenario/${scenarioName}`);
  return response.data;
};

export const getPortalsDirectoryApi = async () => {
  const response = await api.get('/portals/directory');
  return response.data;
};

export const runPortalVerificationApi = async (portalId: string, citizenId: string) => {
  const response = await api.get(`/portals/${portalId}/verify/${citizenId}`);
  return response.data;
};

export default api;
