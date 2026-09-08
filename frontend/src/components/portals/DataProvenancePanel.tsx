import React from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Badge } from '@/components/ui/badge';
import { DataProvenanceItem } from '@/types';
import { Database, Clock, Tag, Network } from 'lucide-react';

interface DataProvenancePanelProps {
  provenanceItems?: DataProvenanceItem[];
  defaultDepartment?: string;
  traceId?: string;
}

export const DataProvenancePanel: React.FC<DataProvenancePanelProps> = ({
  provenanceItems = [],
  defaultDepartment = 'Government Registry',
  traceId = 'TRACE-7C91B2'
}) => {
  return (
    <GlassPanel header={
      <div className="flex justify-between items-center w-full">
        <h3 className="font-extrabold text-[#0F172A] text-base flex items-center">
          <Database className="h-5 w-5 text-[#002D62] mr-2" /> Data Provenance & Source Audit Trail
        </h3>
        <Badge variant="navy" className="text-[10px]">Verifiable Origin</Badge>
      </div>
    }>
      <div className="space-y-4">
        <p className="text-xs text-slate-600 font-medium">
          Every field in JanSetu's canonical model retains cryptographically traceable provenance detailing its origin department, original attribute key, and retrieval timestamp.
        </p>

        {provenanceItems.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600">
            Source: <strong className="text-[#002D62]">{defaultDepartment}</strong> | Correlation Trace: <strong>{traceId}</strong>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {provenanceItems.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-[#002D62] font-mono">{item.canonical_field}</span>
                  <Badge variant="saffron" className="text-[10px]">{item.value}</Badge>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono space-y-1 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Source:</span>
                    <span className="font-bold text-[#0F172A]">{item.source_department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Original Key:</span>
                    <span className="text-amber-800 font-bold">{item.original_field}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trace ID:</span>
                    <span className="text-[#002D62]">{item.trace_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Retrieved:</span>
                    <span className="text-slate-600">{item.retrieved_at}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassPanel>
  );
};
