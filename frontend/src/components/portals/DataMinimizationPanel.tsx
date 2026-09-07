import React from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Lock, CheckCircle2, EyeOff } from 'lucide-react';

interface DataMinimizationPanelProps {
  requestedFields?: string[];
  protectedFields?: string[];
}

export const DataMinimizationPanel: React.FC<DataMinimizationPanelProps> = ({
  requestedFields = ['citizen_id', 'annual_income', 'verification_status'],
  protectedFields = ['address', 'phone_number', 'bank_account', 'biometric_raw_hash', 'tax_filing_history']
}) => {
  return (
    <GlassPanel header={
      <div className="flex items-center justify-between w-full">
        <h3 className="font-extrabold text-[#0F172A] text-base flex items-center">
          <ShieldCheck className="h-5 w-5 text-emerald-600 mr-2" /> Data Minimization & Privacy Protection
        </h3>
        <Badge variant="saffron" className="text-[10px]">Zero Unnecessary PII Exposure</Badge>
      </div>
    }>
      <p className="text-xs text-slate-600 font-medium mb-4">
        JanSetu enforces field-level data minimization. Only authorized fields required for service eligibility are queried from department registries.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Authorized Requested Fields */}
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-emerald-900 text-xs uppercase tracking-wider flex items-center">
              <CheckCircle2 className="h-4 w-4 text-emerald-700 mr-1.5" /> Requested Scope (Necessary Fields)
            </span>
            <Badge variant="success" className="text-[10px]">{requestedFields.length} Fields Granted</Badge>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {requestedFields.map((field, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-xs font-mono font-bold text-emerald-800 shadow-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>{field}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protected Unrequested Fields */}
        <div className="p-4 rounded-2xl bg-slate-100/90 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center">
              <Lock className="h-4 w-4 text-slate-500 mr-1.5" /> Protected PII (Not Requested)
            </span>
            <Badge variant="navy" className="text-[10px]">{protectedFields.length} Fields Masked</Badge>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {protectedFields.map((field, idx) => (
              <div key={idx} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-medium text-slate-500 line-through opacity-80">
                <EyeOff className="h-3.5 w-3.5 text-slate-400" />
                <span>{field}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};
