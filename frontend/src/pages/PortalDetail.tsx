import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GovernmentPortalHeader } from '@/components/portals/GovernmentPortalHeader';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  ShieldCheck, Lock, Network, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2,
  Code, Eye, Layers, Activity, FileText
} from 'lucide-react';
import { getPortalsDirectoryApi, runPortalVerificationApi } from '@/services/api';
import { toast } from 'sonner';

export const PortalDetail: React.FC = () => {
  const { portalId } = useParams<{ portalId: string }>();
  const navigate = useNavigate();

  const [portalMeta, setPortalMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [showRawJson, setShowRawJson] = useState(false);

  const fetchPortalMeta = async () => {
    setLoading(true);
    try {
      const res = await getPortalsDirectoryApi();
      const match = res.portals.find((p: any) => p.id === portalId || p.code === portalId);
      if (match) {
        setPortalMeta(match);
      } else {
        // Fallback default
        setPortalMeta({
          id: portalId,
          name: `${portalId?.toUpperCase()} Department Portal`,
          department: `${portalId?.toUpperCase()} Verification Department`,
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

  const handleRunVerification = async () => {
    setVerifying(true);
    try {
      const res = await runPortalVerificationApi(portalId || 'income', 'C1001');
      setVerificationResult(res);
      toast.success(`Verification completed via ${portalMeta?.name || 'Department Portal'}`);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Portal verification failed');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-medium">Loading Portal Interface...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/portals')}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Directory
        </Button>
        <span className="text-slate-400 text-xs">/</span>
        <span className="text-[#0F172A] font-bold text-xs">{portalMeta?.name}</span>
      </div>

      {/* Header */}
      <GovernmentPortalHeader
        department={portalMeta?.department}
        portalName={portalMeta?.name}
        status={portalMeta?.status}
        integrationLevel={portalMeta?.integration_level}
        emoji={portalMeta?.icon_emoji}
      />

      {/* Interactive Verification Execution Card */}
      <GlassPanel header={<h3 className="font-extrabold text-[#0F172A]">Portal Verification Runner (Citizen C1001)</h3>}>
        <div className="space-y-4">
          <p className="text-xs text-slate-600 font-medium">
            Simulate a real-time verification request through the JanSetu Interoperability Gateway to query this department's registry.
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <div>
              <span className="text-xs font-bold text-[#002D62]">Target Citizen: Ravi Kumar (C1001)</span>
              <p className="text-[11px] text-slate-600 font-mono mt-0.5">Consent Status: Active Granted</p>
            </div>

            <Button
              onClick={handleRunVerification}
              disabled={verifying}
              className="bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-extrabold shadow-md"
            >
              {verifying ? 'Executing Gateway Query...' : 'Execute Portal Verification'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </GlassPanel>

      {/* Verification Output Details */}
      {verificationResult && (
        <div className="space-y-6 animate-in fade-in">
          {/* Data Minimization Panel */}
          <GlassPanel header={<h3 className="font-extrabold text-[#0F172A]">1. Data Minimization & Field Protection</h3>}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <span className="font-extrabold text-emerald-900 flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 mr-1.5" /> Requested Fields (Necessary Scope)
                </span>
                <ul className="space-y-1 text-emerald-800 font-mono">
                  {verificationResult.data_minimization?.requested_fields?.map((f: string, i: number) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-700 flex items-center">
                  <Lock className="h-4 w-4 text-slate-500 mr-1.5" /> Protected / Unrequested Fields
                </span>
                <ul className="space-y-1 text-slate-600 font-mono">
                  {verificationResult.data_minimization?.unrequested_fields_protected?.map((f: string, i: number) => (
                    <li key={i}>○ {f} (Protected)</li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassPanel>

          {/* Schema Mapping & Data Provenance */}
          <GlassPanel header={<h3 className="font-extrabold text-[#0F172A]">2. Schema Transformation & Data Provenance</h3>}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-[#002D62]">Department Response Payload</h4>
                  <pre className="p-3 rounded-lg bg-white border border-slate-200 text-slate-800 overflow-x-auto">
                    {JSON.stringify(verificationResult.raw_department_response, null, 2)}
                  </pre>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <h4 className="font-bold text-[#0F172A]">Canonical Model Transformation</h4>
                  <pre className="p-3 rounded-lg bg-white border border-slate-200 text-[#002D62] font-bold overflow-x-auto">
                    {JSON.stringify(verificationResult.canonical_schema_mapping, null, 2)}
                  </pre>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex justify-between items-center font-mono">
                <span>Trace Correlation: <strong className="text-[#002D62]">{verificationResult.trace_id}</strong></span>
                <span>Latency: <strong className="text-emerald-700">{verificationResult.latency_ms} ms</strong></span>
              </div>
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  );
};
