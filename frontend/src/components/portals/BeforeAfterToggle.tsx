import React, { useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, XCircle, Clock, ShieldCheck, Zap } from 'lucide-react';

export const BeforeAfterToggle: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'WITH' | 'BEFORE'>('WITH');

  return (
    <GlassPanel className="p-6 border-amber-200 bg-white/95">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <Badge variant="saffron" className="mb-1">SIH Innovation Showcase</Badge>
          <h3 className="text-xl font-extrabold text-[#0F172A]">Before vs. With JanSetu Experience</h3>
          <p className="text-xs text-slate-600 font-medium">Compare traditional multi-portal manual verification against JanSetu's interoperability gateway.</p>
        </div>

        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button
            onClick={() => setActiveMode('WITH')}
            className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center space-x-1.5 ${
              activeMode === 'WITH'
                ? 'bg-[#FF9933] text-[#0F172A] shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>WITH JANSETU (Interoperable)</span>
          </button>
          <button
            onClick={() => setActiveMode('BEFORE')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeMode === 'BEFORE'
                ? 'bg-[#002D62] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>BEFORE JANSETU (Traditional)</span>
          </button>
        </div>
      </div>

      {activeMode === 'WITH' ? (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs font-medium text-slate-800 space-y-1">
            <span className="font-extrabold text-[#002D62] text-sm">Automated Zero-Document Flow</span>
            <p>Citizen grants single consent. JanSetu orchestrates 3+ department APIs simultaneously, transforms schemas into a canonical model, and evaluates eligibility in <strong>1.2 seconds</strong>.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-center text-xs font-bold">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
              <span className="text-[#0F172A]">1. Citizen</span>
              <p className="text-[10px] text-slate-500 font-mono">Single Entry</p>
            </div>
            <div className="hidden md:flex justify-center text-[#FF9933]">
              <ArrowRight className="h-5 w-5 animate-pulse" />
            </div>
            <div className="p-3 rounded-xl bg-amber-100 border border-amber-300">
              <span className="text-[#0F172A]">2. JanSetu Gateway</span>
              <p className="text-[10px] text-[#002D62] font-mono">Consent & APIs</p>
            </div>
            <div className="hidden md:flex justify-center text-[#FF9933]">
              <ArrowRight className="h-5 w-5 animate-pulse" />
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300">
              <span className="text-emerald-900">3. Instant Eligible</span>
              <p className="text-[10px] text-emerald-700 font-mono">Approved in 1.2s</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium pt-2">
            <div className="flex items-center space-x-2 text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Zero Physical Documents Needed</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>100% Consent-Driven Privacy</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Complete Audit Correlation Trail</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-xs font-medium text-slate-800 space-y-1">
            <span className="font-extrabold text-red-700 text-sm">Fragmented Manual Portal Hopping</span>
            <p>Citizen must manually visit 4 separate portal sites, request physical certificates, scan PDFs, and wait <strong>14 to 30 days</strong> for manual officer verification.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center text-center text-[11px] font-bold">
            <div className="p-2 rounded-lg bg-slate-200 text-slate-800">1. Income Portal</div>
            <span className="hidden md:inline text-slate-400">➔</span>
            <div className="p-2 rounded-lg bg-slate-200 text-slate-800">2. Download Cert</div>
            <span className="hidden md:inline text-slate-400">➔</span>
            <div className="p-2 rounded-lg bg-slate-200 text-slate-800">3. College Portal</div>
            <span className="hidden md:inline text-slate-400">➔</span>
            <div className="p-2 rounded-lg bg-red-100 text-red-800 border border-red-300">4. 30 Days Delay</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium pt-2">
            <div className="flex items-center space-x-2 text-red-800 bg-red-50 p-2.5 rounded-xl border border-red-200">
              <XCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>Repeated Data Entry & Uploads</span>
            </div>
            <div className="flex items-center space-x-2 text-red-800 bg-red-50 p-2.5 rounded-xl border border-red-200">
              <XCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>High Risk of Document Forgery</span>
            </div>
            <div className="flex items-center space-x-2 text-red-800 bg-red-50 p-2.5 rounded-xl border border-red-200">
              <XCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>No Unified Audit Correlation</span>
            </div>
          </div>
        </div>
      )}
    </GlassPanel>
  );
};
