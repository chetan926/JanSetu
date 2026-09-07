import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GovernmentPortalHeader } from '@/components/portals/GovernmentPortalHeader';
import { VerificationRequestCard } from '@/components/portals/VerificationRequestCard';
import { VerificationWorkflowTimeline } from '@/components/portals/VerificationWorkflowTimeline';
import { DataMinimizationPanel } from '@/components/portals/DataMinimizationPanel';
import { PortalResponseView } from '@/components/portals/PortalResponseView';
import { SchemaMappingPanel } from '@/components/portals/SchemaMappingPanel';
import { DataProvenancePanel } from '@/components/portals/DataProvenancePanel';
import { PortalTracePanel } from '@/components/portals/PortalTracePanel';
import { JudgeModeBar } from '@/components/portals/JudgeModeBar';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShieldAlert, XCircle, AlertTriangle, Lock } from 'lucide-react';
import { getPortalsDirectoryApi, runPortalVerificationApi } from '@/services/api';
import { PortalVerificationResponse } from '@/types';
import { toast } from 'sonner';

export const PortalDetail: React.FC = () => {
  const { portalId = 'income' } = useParams<{ portalId: string }>();
  const navigate = useNavigate();

  const [portalMeta, setPortalMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<PortalVerificationResponse | null>(null);

  const fetchPortalMeta = async () => {
    setLoading(true);
    try {
      const res = await getPortalsDirectoryApi();
      const match = res.portals.find((p: any) => p.id === portalId || p.code === portalId);
      if (match) {
        setPortalMeta(match);
      } else {
        setPortalMeta({
          id: portalId,
          code: portalId,
          name: `${portalId.replace('_', ' ').toUpperCase()} Portal`,
          department: `${portalId.replace('_', ' ').toUpperCase()} Verification Department`,
          icon_emoji: "🏛️",
          status: "CONNECTED",
          integration_level: "LIVE MOCK"
        });
      }
    } catch (err) {
      toast.error('Failed to load portal configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortalMeta();
  }, [portalId]);

  const handleRunVerification = async (citizenId: string, scenario: string) => {
    setVerifying(true);
    try {
      const res = await runPortalVerificationApi(portalId, citizenId, scenario);
      setVerificationResult(res);
      if (res.status === 'BLOCKED') {
        toast.error(`Access Denied: Citizen consent not granted for ${portalMeta?.name || 'Department'}`);
      } else if (res.status === 'TIMEOUT') {
        toast.warning(`Gateway Timeout: ${portalMeta?.name} failed to respond in SLA`);
      } else if (res.status === 'UNAVAILABLE') {
        toast.error(`System Offline: ${portalMeta?.name} is under maintenance`);
      } else {
        toast.success(`Verification executed via ${portalMeta?.name || 'Department Portal'}`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Portal verification failed');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-medium">Loading Government Portal Interface...</div>;
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Judge Mode Navigation */}
      <JudgeModeBar />

      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/portals')}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Directory
        </Button>
        <span className="text-slate-400 text-xs">/</span>
        <span className="text-[#0F172A] font-bold text-xs">{portalMeta?.name}</span>
      </div>

      {/* Government Portal Header */}
      <GovernmentPortalHeader
        department={portalMeta?.department}
        portalName={portalMeta?.name}
        status={portalMeta?.status}
        integrationLevel={portalMeta?.integration_level}
        emoji={portalMeta?.icon_emoji}
      />

      {/* Interactive Verification Launcher */}
      <VerificationRequestCard
        portalName={portalMeta?.name || 'Department Portal'}
        verifying={verifying}
        onRunVerification={handleRunVerification}
      />

      {/* Verification Output Section */}
      {verificationResult && (
        <div className="space-y-8 animate-in fade-in">

          {/* Access Denied Handling */}
          {verificationResult.status === 'BLOCKED' ? (
            <GlassPanel className="p-8 border-red-300 bg-red-50/90 text-red-900 space-y-3">
              <div className="flex items-center space-x-3">
                <Lock className="h-7 w-7 text-red-700 shrink-0" />
                <div>
                  <h3 className="text-xl font-extrabold text-red-950 uppercase tracking-tight">ACCESS DENIED</h3>
                  <p className="text-sm font-semibold text-red-800">
                    The department data was not accessed because citizen consent was not granted.
                  </p>
                </div>
              </div>
              <p className="text-xs text-red-700 font-mono pt-2 border-t border-red-200">
                Reason: {verificationResult.message || 'Citizen Consent Missing in Central Registry'} | Trace ID: {verificationResult.trace_id}
              </p>
            </GlassPanel>
          ) : (
            <>
              {/* Orchestration Workflow Timeline */}
              <VerificationWorkflowTimeline
                steps={verificationResult.trace_steps}
                status={verificationResult.status}
                latencyMs={verificationResult.latency_ms}
                portalName={portalMeta?.name || 'Department'}
              />

              {/* Data Minimization Panel */}
              <DataMinimizationPanel
                requestedFields={verificationResult.data_minimization?.requested_fields}
                protectedFields={verificationResult.data_minimization?.unrequested_fields_protected}
              />

              {/* Parsed Department Response View */}
              <PortalResponseView
                department={verificationResult.department}
                portalName={verificationResult.portal_name}
                rawResponse={verificationResult.raw_department_response}
                status={verificationResult.status}
                traceId={verificationResult.trace_id}
              />

              {/* Schema Transformation Diagram */}
              <SchemaMappingPanel
                portalId={portalId}
                department={verificationResult.department}
                schemaMapping={verificationResult.canonical_schema_mapping}
                rawResponse={verificationResult.raw_department_response}
              />

              {/* Data Provenance Panel */}
              <DataProvenancePanel
                provenanceItems={verificationResult.data_provenance}
                defaultDepartment={verificationResult.department}
                traceId={verificationResult.trace_id}
              />

              {/* Trace Audit Drawer */}
              <PortalTracePanel
                traceId={verificationResult.trace_id}
                latencyMs={verificationResult.latency_ms}
                portalName={verificationResult.portal_name}
                department={verificationResult.department}
                steps={verificationResult.trace_steps}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

