import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const JudgeModeBar: React.FC = () => {
  const navigate = useNavigate();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    { label: '01 Citizen', path: '/login', desc: 'Demo Citizen Ravi Kumar (C1001)' },
    { label: '02 Service', path: '/services', desc: 'Higher Education Scholarship' },
    { label: '03 Consent', path: '/consent', desc: 'Consent Control Center' },
    { label: '04 Identity Portal', path: '/portals/identity', desc: 'Revenue Identity Verification' },
    { label: '05 Income Portal', path: '/portals/income', desc: 'Income Tax Verification' },
    { label: '06 Education Portal', path: '/portals/education', desc: 'Higher Education Registry' },
    { label: '07 Canonical Data', path: '/interop', desc: 'Schema Mapping & Provenance' },
    { label: '08 Eligibility Engine', path: '/interop', desc: 'Deterministic Rule Evaluation' },
    { label: '09 Application', path: '/applications', desc: 'Trace Correlation & Approved Tracking' }
  ];

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index);
    const step = steps[index];
    toast.info(`Judge Presentation Step ${index + 1}: ${step.label}`);
    navigate(step.path);
  };

  const handleNext = () => {
    const nextIdx = (activeStepIndex + 1) % steps.length;
    handleStepClick(nextIdx);
  };

  return (
    <div className="sticky top-20 z-30 mx-auto max-w-7xl px-4 my-4">
      <div className="rounded-2xl border border-amber-300 bg-white/95 p-3.5 shadow-lg backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#002D62] text-[#FF9933]">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-[#002D62] text-xs uppercase tracking-wider">SIH Judge Mode Presenter</span>
              <Badge variant="saffron" className="text-[10px]">9-Step Sequence</Badge>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              Current: <strong className="text-[#0F172A]">{steps[activeStepIndex].label}</strong> — {steps[activeStepIndex].desc}
            </p>
          </div>
        </div>

        {/* Horizontal Step Buttons */}
        <div className="flex items-center space-x-1 overflow-x-auto w-full md:w-auto py-1">
          {steps.map((st, idx) => (
            <button
              key={idx}
              onClick={() => handleStepClick(idx)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                activeStepIndex === idx
                  ? 'bg-[#FF9933] text-[#0F172A] shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <Button onClick={handleNext} size="sm" className="bg-[#002D62] text-white hover:bg-[#0F172A] font-bold shrink-0">
          Next Step <ChevronRight className="ml-1 h-4 w-4 text-[#FF9933]" />
        </Button>
      </div>
    </div>
  );
};
