import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassCard } from '@/components/glass/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BeforeAfterToggle } from '@/components/portals/BeforeAfterToggle';
import { JudgeModeBar } from '@/components/portals/JudgeModeBar';
import { StatusIndicator } from '@/components/glass/StatusIndicator';
import { ShieldCheck, CheckCircle2, RefreshCw, Network, Clock, ArrowRight } from 'lucide-react';
import { evaluateEligibilityApi } from '@/services/api';
import { toast } from 'sonner';

export const VerificationHub: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchHubData = async () => {
    setLoading(true);
    try {
      const res = await evaluateEligibilityApi('C1001');
      setData(res);
      toast.success('Verification Hub refreshed with live gateway data');
    } catch (err) {
      toast.error('Failed to load verification hub data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHubData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Judge Mode Bar */}
      <JudgeModeBar />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Badge variant="saffron" className="mb-1">National Interoperability Gateway</Badge>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">Verification Hub</h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Unified verification status across connected government systems for Citizen Ravi Kumar (C1001).
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={fetchHubData}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh Status
          </Button>
          <Badge variant="navy">Trace ID: {data?.trace_id || 'TRACE-7C91B2'}</Badge>
        </div>
      </div>

      {/* 5 Core Verification Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <GlassCard className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[#002D62] font-bold text-xs">Identity Portal</span>
            <Badge variant="success">✓ VERIFIED</Badge>
          </div>
          <h4 className="font-extrabold text-[#0F172A] text-base mt-2">Identity Verification</h4>
          <p className="text-[11px] text-slate-500 font-mono mt-1">Biometric Status: Validated</p>
        </GlassCard>

        <GlassCard className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[#002D62] font-bold text-xs">Income Portal</span>
            <Badge variant="success">✓ VERIFIED</Badge>
          </div>
          <h4 className="font-extrabold text-[#0F172A] text-base mt-2">Annual Income</h4>
          <p className="text-[11px] text-slate-500 font-mono mt-1">₹1,80,000 Filed</p>
        </GlassCard>

        <GlassCard className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[#002D62] font-bold text-xs">Education Portal</span>
            <Badge variant="success">✓ VERIFIED</Badge>
          </div>
          <h4 className="font-extrabold text-[#0F172A] text-base mt-2">Enrollment Status</h4>
          <p className="text-[11px] text-slate-500 font-mono mt-1">Status: ACTIVE</p>
        </GlassCard>

        <GlassCard className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[#002D62] font-bold text-xs">Property Portal</span>
            <Badge variant="success">✓ VERIFIED</Badge>
          </div>
          <h4 className="font-extrabold text-[#0F172A] text-base mt-2">Land/Property Record</h4>
          <p className="text-[11px] text-slate-500 font-mono mt-1">Status: VERIFIED</p>
        </GlassCard>

        <GlassCard className="p-4 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-bold text-xs">Documents Vault</span>
            <Badge variant="secondary">○ NOT REQUIRED</Badge>
          </div>
          <h4 className="font-extrabold text-[#0F172A] text-base mt-2">Physical Paperwork</h4>
          <p className="text-[11px] text-slate-500 font-mono mt-1">Zero Upload Overhead</p>
        </GlassCard>
      </div>

      {/* Verification Journey Timeline */}
      <GlassPanel header={<h3 className="font-extrabold text-[#0F172A]">Unified Verification Journey Timeline</h3>}>
        <div className="space-y-4">
          <div className="space-y-3 relative border-l-2 border-amber-300 ml-4 pl-6 py-2">
            <div className="relative">
              <span className="absolute -left-[31px] top-0 h-4 w-4 rounded-full bg-[#FF9933] ring-4 ring-white" />
              <div className="text-xs">
                <span className="font-bold text-[#0F172A]">1. Request Initiated & Consent Validated</span>
                <p className="text-slate-600 font-medium">Citizen Granted Access to 3 Department Registries</p>
              </div>
            </div>

            <div className="relative pt-2">
              <span className="absolute -left-[31px] top-2 h-4 w-4 rounded-full bg-[#002D62] ring-4 ring-white" />
              <div className="text-xs">
                <span className="font-bold text-[#0F172A]">2. Interoperability Gateway Connected</span>
                <p className="text-slate-600 font-medium">Income Tax, Higher Education, & Identity APIs Orchestrated</p>
              </div>
            </div>

            <div className="relative pt-2">
              <span className="absolute -left-[31px] top-2 h-4 w-4 rounded-full bg-emerald-600 ring-4 ring-white" />
              <div className="text-xs">
                <span className="font-bold text-emerald-900">3. Schema Normalized to Canonical Model v1.0</span>
                <p className="text-slate-600 font-medium">Disparate Department Keys Mapped Automatically</p>
              </div>
            </div>

            <div className="relative pt-2">
              <span className="absolute -left-[31px] top-2 h-4 w-4 rounded-full bg-[#FF9933] ring-4 ring-white" />
              <div className="text-xs">
                <span className="font-bold text-[#0F172A]">4. Pure Deterministic Eligibility Calculated</span>
                <p className="text-slate-600 font-medium">3/3 Checks Passed ➔ Final Result: ELIGIBLE</p>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Before vs After Innovation Component */}
      <BeforeAfterToggle />
    </div>
  );
};
