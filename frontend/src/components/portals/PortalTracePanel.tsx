import React, { useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock, ShieldCheck, Terminal, ChevronDown, ChevronUp } from 'lucide-react';
import { TraceStepItem } from '@/types';

interface PortalTracePanelProps {
  traceId: string;
  latencyMs: number;
  portalName: string;
  department: string;
  steps?: TraceStepItem[];
}

export const PortalTracePanel: React.FC<PortalTracePanelProps> = ({
  traceId,
  latencyMs,
  portalName,
  department,
  steps = []
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlassPanel header={
      <div className="flex justify-between items-center w-full">
        <h3 className="font-extrabold text-[#0F172A] text-base flex items-center">
          <Activity className="h-5 w-5 text-[#FF9933] mr-2" /> Request Correlation Trace Audit Panel
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-bold border-slate-300"
        >
          {isOpen ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" /> Hide Trace Logs
            </>
          ) : (
            <>
              <Terminal className="h-4 w-4 mr-1 text-[#002D62]" /> Inspect Trace Logs ({traceId})
            </>
          )}
        </Button>
      </div>
    }>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs shadow-md">
          <div className="space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Trace Identifier</span>
            <span className="text-[#FF9933] font-extrabold text-sm">{traceId}</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Registry Target</span>
            <span className="text-slate-200 font-bold">{portalName}</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Measured Gateway Latency</span>
            <span className="text-emerald-400 font-extrabold text-sm">{latencyMs} ms</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Gateway Node</span>
            <span className="text-slate-300 font-bold">Node-01 (Mumbai-Region)</span>
          </div>
        </div>

        {isOpen && (
          <div className="space-y-2 animate-in fade-in pt-2">
            <span className="text-xs font-bold text-[#002D62] uppercase tracking-wider block font-mono">Trace Execution Event Timeline</span>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs text-slate-300 max-h-80 overflow-y-auto">
              <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-800">
                [TIMESTAMP UTC] | COMPONENT | OPERATION | LATENCY
              </div>
              {steps.map((st, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-slate-900/60">
                  <div className="flex items-center space-x-2">
                    <span className="text-amber-400 font-bold">{st.step}</span>
                    <span className="text-slate-500 text-[10px]">{st.detail}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-[10px] font-bold ${st.status === 'COMPLETED' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {st.status}
                    </span>
                    <span className="text-slate-400 font-bold">{st.duration_ms}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};
