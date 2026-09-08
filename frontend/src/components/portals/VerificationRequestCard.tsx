import React, { useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, UserCheck, ShieldAlert, Play, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface VerificationRequestCardProps {
  portalName: string;
  verifying: boolean;
  onRunVerification: (citizenId: string, scenario: string) => void;
}

export const VerificationRequestCard: React.FC<VerificationRequestCardProps> = ({
  portalName,
  verifying,
  onRunVerification
}) => {
  const [selectedCitizen, setSelectedCitizen] = useState<string>('C1001');
  const [selectedScenario, setSelectedScenario] = useState<string>('NORMAL');

  const citizens = [
    { id: 'C1001', name: 'Ravi Kumar', desc: 'Flagship Demo — Low Income (₹1.8L), Active Student' },
    { id: 'C1002', name: 'Anita Sharma', desc: 'High Income (₹4.5L) — Ineligible Threshold' },
    { id: 'C1003', name: 'Suresh Patel', desc: 'Inactive Education Status' },
    { id: 'C1004', name: 'Vikram Singh', desc: 'Unverified Identity / Property' }
  ];

  const scenarios = [
    { id: 'NORMAL', label: 'Normal (Success 200 OK)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { id: 'SLOW', label: 'Delayed / Latency (1.2s SLEEP)', color: 'text-amber-700 bg-amber-50 border-amber-200' },
    { id: 'TIMEOUT', label: 'Timeout (5000ms SLA Breached)', color: 'text-orange-700 bg-orange-50 border-orange-200' },
    { id: 'DOWN', label: 'System Down (503 Unavailable)', color: 'text-red-700 bg-red-50 border-red-200' },
    { id: 'INVALID_DATA', label: 'Invalid Data (Checksum Error)', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    { id: 'CONSENT_DENIED', label: 'Consent Denied (Access Blocked)', color: 'text-rose-700 bg-rose-50 border-rose-200' }
  ];

  const handleExecute = () => {
    onRunVerification(selectedCitizen, selectedScenario);
  };

  return (
    <GlassPanel className="p-6 border-amber-200 bg-white/95">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Badge variant="saffron" className="text-[10px]">Real-Time Gateway Execution</Badge>
            <Badge variant="navy" className="text-[10px]">Live Backend Scenario Controller</Badge>
          </div>
          <h3 className="text-xl font-extrabold text-[#0F172A]">Execute Verification Gateway Request</h3>
          <p className="text-xs text-slate-600 font-medium">
            Simulate querying <strong className="text-[#002D62]">{portalName}</strong> via JanSetu Interoperability Gateway.
          </p>
        </div>

        <Button
          onClick={handleExecute}
          disabled={verifying}
          className="bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-extrabold shadow-md text-sm py-5 px-6 shrink-0"
        >
          {verifying ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Executing Gateway Request...
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4 fill-current" /> Run Portal Verification <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
        {/* Citizen Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#002D62] uppercase tracking-wider flex items-center">
            <UserCheck className="h-3.5 w-3.5 mr-1.5 text-[#FF9933]" /> Target Demo Citizen
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {citizens.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCitizen(c.id)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  selectedCitizen === c.id
                    ? 'border-[#FF9933] bg-amber-50/80 ring-2 ring-[#FF9933]/30 font-bold text-[#0F172A]'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-extrabold">{c.id} — {c.name}</span>
                  {selectedCitizen === c.id && <CheckCircle2 className="h-3.5 w-3.5 text-[#FF9933]" />}
                </div>
                <p className="text-[10px] text-slate-500 font-medium mt-1 leading-tight">{c.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#002D62] uppercase tracking-wider flex items-center">
            <ShieldAlert className="h-3.5 w-3.5 mr-1.5 text-[#FF9933]" /> Gateway Failure Simulation Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                type="button"
                onClick={() => setSelectedScenario(sc.id)}
                className={`p-2.5 rounded-xl border text-left text-[11px] transition-all ${
                  selectedScenario === sc.id
                    ? 'border-[#002D62] bg-[#002D62] text-white font-extrabold shadow-sm'
                    : `border-slate-200 ${sc.color} hover:opacity-90 font-bold`
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{sc.label}</span>
                  {selectedScenario === sc.id && <Badge variant="saffron" className="text-[9px] px-1 py-0">ACTIVE</Badge>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};
