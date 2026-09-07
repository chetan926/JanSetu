import React from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { TraceStepItem } from '@/types';

interface VerificationWorkflowTimelineProps {
  steps?: TraceStepItem[];
  status: string;
  latencyMs?: number;
  portalName: string;
}

export const VerificationWorkflowTimeline: React.FC<VerificationWorkflowTimelineProps> = ({
  steps = [],
  status,
  latencyMs = 0,
  portalName
}) => {
  const defaultSteps: TraceStepItem[] = [
    { step: '01 Request Initiated', status: 'COMPLETED', duration_ms: 6, detail: 'Client initiated request' },
    { step: '02 Consent Validated', status: 'COMPLETED', duration_ms: 12, detail: 'Citizen consent active' },
    { step: '03 Gateway Request Created', status: 'COMPLETED', duration_ms: 18, detail: 'Gateway payload generated' },
    { step: '04 Department Portal Contacted', status: 'COMPLETED', duration_ms: 85, detail: `${portalName} Endpoint queried` },
    { step: '05 Response Received', status: 'COMPLETED', duration_ms: 15, detail: 'Payload received successfully' },
    { step: '06 Schema Transformation', status: 'COMPLETED', duration_ms: 10, detail: 'Mapped to Canonical Model v1.0' },
    { step: '07 Canonical Model Generated', status: 'COMPLETED', duration_ms: 8, detail: 'Provenance enriched' },
    { step: '08 Verification Completed', status: 'COMPLETED', duration_ms: 5, detail: `Status: ${status}` }
  ];

  const activeSteps = steps.length > 0 ? steps : defaultSteps;

  const getStatusBadge = (st: string) => {
    switch (st) {
      case 'COMPLETED':
        return <Badge variant="success" className="text-[10px]">✓ COMPLETED</Badge>;
      case 'FAILED':
        return <Badge variant="destructive" className="text-[10px]">✕ FAILED</Badge>;
      case 'TIMEOUT':
        return <Badge variant="warning" className="text-[10px]">⏱ TIMEOUT</Badge>;
      case 'BLOCKED':
      case 'STOPPED':
      case 'CANCELLED':
        return <Badge variant="navy" className="text-[10px]">🛑 BLOCKED</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px]">○ PENDING</Badge>;
    }
  };

  const getStepColor = (st: string) => {
    switch (st) {
      case 'COMPLETED':
        return 'bg-emerald-600 ring-emerald-200';
      case 'FAILED':
        return 'bg-red-600 ring-red-200';
      case 'TIMEOUT':
        return 'bg-amber-500 ring-amber-200';
      case 'BLOCKED':
      case 'STOPPED':
      case 'CANCELLED':
        return 'bg-[#002D62] ring-slate-200';
      default:
        return 'bg-slate-300 ring-slate-100';
    }
  };

  return (
    <GlassPanel header={
      <div className="flex justify-between items-center w-full">
        <h3 className="font-extrabold text-[#0F172A] text-base flex items-center">
          <ShieldCheck className="h-5 w-5 text-[#FF9933] mr-2" /> Gateway Orchestration Workflow Sequence
        </h3>
        <span className="text-xs font-mono font-bold text-slate-500">Total Latency: <strong className="text-[#002D62]">{latencyMs} ms</strong></span>
      </div>
    }>
      <div className="space-y-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {activeSteps.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.status === 'COMPLETED'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : item.status === 'FAILED'
                  ? 'bg-red-50/50 border-red-200'
                  : item.status === 'TIMEOUT'
                  ? 'bg-amber-50/50 border-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`h-3 w-3 rounded-full ${getStepColor(item.status)} ring-4`} />
                  <span className="text-xs font-extrabold text-[#0F172A]">{item.step}</span>
                </div>
                {getStatusBadge(item.status)}
              </div>

              <div className="text-[11px] text-slate-600 font-mono flex justify-between items-center mt-2 pt-2 border-t border-slate-200/60">
                <span className="truncate pr-1">{item.detail || 'Executed OK'}</span>
                <span className="font-bold text-[#002D62] shrink-0">{item.duration_ms}ms</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
};
