import React from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Network, Layers, GitMerge } from 'lucide-react';

interface SchemaMappingPanelProps {
  portalId: string;
  department: string;
  schemaMapping?: Record<string, any>;
  rawResponse?: Record<string, any> | null;
}

export const SchemaMappingPanel: React.FC<SchemaMappingPanelProps> = ({
  portalId,
  department,
  schemaMapping = {},
  rawResponse = {}
}) => {
  // Key mapping dictionary for visualization
  const mappingRules: Record<string, { deptKey: string; canonicalKey: string; desc: string }> = {
    income: { deptKey: 'annual_income', canonicalKey: 'annual_income', desc: 'Normalized currency float' },
    education: { deptKey: 'enrollmentStatus', canonicalKey: 'education_status', desc: 'Standardized enrollment state' },
    identity: { deptKey: 'verification', canonicalKey: 'identity_verified', desc: 'Biometric boolean flag' },
    property: { deptKey: 'verification', canonicalKey: 'property_verified', desc: 'Land registry boolean' },
    documents: { deptKey: 'doc_status', canonicalKey: 'document_verified', desc: 'Digital seal validation' }
  };

  const currentRule = mappingRules[portalId] || {
    deptKey: 'verification_status',
    canonicalKey: 'record_status',
    desc: 'Canonical record mapping'
  };

  return (
    <GlassPanel header={
      <div className="flex justify-between items-center w-full">
        <h3 className="font-extrabold text-[#0F172A] text-base flex items-center">
          <GitMerge className="h-5 w-5 text-[#FF9933] mr-2" /> Schema Normalization & Transformation Layer
        </h3>
        <Badge variant="saffron" className="text-[10px]">Canonical Model v1.0</Badge>
      </div>
    }>
      <div className="space-y-4">
        <p className="text-xs text-slate-600 font-medium">
          Heterogeneous department schemas are dynamically mapped to JanSetu's standardized Canonical Model.
        </p>

        {/* Visual Mapping Diagram */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-50 via-amber-50/40 to-emerald-50/40 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
            {/* Left: Department Raw Schema */}
            <div className="p-4 rounded-2xl bg-white border border-slate-300 shadow-sm space-y-2 text-left">
              <span className="text-[10px] font-extrabold text-[#002D62] uppercase tracking-wider block">Department Key (Heterogeneous)</span>
              <div className="p-2.5 rounded-xl bg-slate-100 text-[#0F172A] font-mono font-extrabold text-sm border border-slate-200">
                {currentRule.deptKey}
              </div>
              <p className="text-[10px] text-slate-500 font-mono">Source: {department}</p>
            </div>

            {/* Middle: Gateway Animated Saffron Transformation */}
            <div className="flex flex-col items-center justify-center space-y-2 py-2">
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#FF9933] text-[#0F172A] shadow-md animate-pulse">
                <ArrowRight className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-extrabold text-[#002D62] font-mono">JanSetu Adapter Matrix</span>
              <Badge variant="navy" className="text-[9px]">Schema Translation OK</Badge>
            </div>

            {/* Right: Canonical Standardized Key */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-300 shadow-sm space-y-2 text-left">
              <span className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wider block">Canonical Model Key</span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-mono font-extrabold text-sm border border-emerald-200">
                {currentRule.canonicalKey}
              </div>
              <p className="text-[10px] text-emerald-700 font-mono">{currentRule.desc}</p>
            </div>
          </div>
        </div>

        {/* Mapped Values Payload */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-[#002D62] font-mono block">Evaluated Canonical Object</span>
          <pre className="p-3 rounded-xl bg-white border border-slate-200 text-[#002D62] font-mono text-xs font-bold overflow-x-auto">
            {JSON.stringify(schemaMapping, null, 2)}
          </pre>
        </div>
      </div>
    </GlassPanel>
  );
};
