import React, { useState } from 'react';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Cpu, Lock, FileText, Sparkles, Network } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AiAssistantWidget } from '@/components/ai-assistant/AiAssistantWidget';
import { ApplicationWizardModal } from '@/components/applications/ApplicationWizardModal';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/50 p-8 shadow-sm backdrop-blur-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <Badge variant="saffron" className="py-1 px-3">
            JanSetu • Unified Citizen Portal
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
            Good morning, <span className="text-[#002D62]">Ravi Kumar</span>.
          </h1>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            Your government services are securely connected. Apply for schemes, manage your data privacy consent, and track applications in real-time.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button onClick={() => setIsWizardOpen(true)} className="bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-bold shadow-md">
              Apply for Scholarship <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => navigate('/interop')} variant="outline" className="border-slate-300 text-[#0F172A] hover:bg-slate-100 font-semibold">
              <Network className="mr-2 h-4 w-4 text-[#FF9933]" /> View Gateway Live Flow
            </Button>
          </div>
        </div>
      </div>

      {/* AI Assistant Widget */}
      <AiAssistantWidget onStartApplication={() => setIsWizardOpen(true)} />

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard onClick={() => setIsWizardOpen(true)} className="cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-amber-100 text-[#0F172A] border border-amber-300">
              <Cpu className="h-6 w-6 text-[#FF9933]" />
            </div>
            <Badge variant="outline">Available</Badge>
          </div>
          <h3 className="mt-4 text-lg font-bold text-[#0F172A]">Apply for Service</h3>
          <p className="mt-1 text-xs text-slate-600">Discover scholarships & welfare schemes using AI assistant.</p>
        </GlassCard>

        <GlassCard onClick={() => navigate('/consent')} className="cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300">
              <Lock className="h-6 w-6 text-emerald-700" />
            </div>
            <Badge variant="success">3 Active</Badge>
          </div>
          <h3 className="mt-4 text-lg font-bold text-[#0F172A]">Manage Consent</h3>
          <p className="mt-1 text-xs text-slate-600">Control data sharing permissions for government departments.</p>
        </GlassCard>

        <GlassCard onClick={() => navigate('/applications')} className="cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-800 border border-blue-300">
              <FileText className="h-6 w-6 text-[#002D62]" />
            </div>
            <Badge variant="navy">1 Approved</Badge>
          </div>
          <h3 className="mt-4 text-lg font-bold text-[#0F172A]">View Applications</h3>
          <p className="mt-1 text-xs text-slate-600">Track digital application timeline & audit trace history.</p>
        </GlassCard>

        <GlassCard onClick={() => navigate('/interop')} className="cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-xl bg-amber-100 text-amber-900 border border-amber-300">
              <Sparkles className="h-6 w-6 text-[#FF9933]" />
            </div>
            <Badge variant="gold">Visualizer</Badge>
          </div>
          <h3 className="mt-4 text-lg font-bold text-[#0F172A]">Interoperability Center</h3>
          <p className="mt-1 text-xs text-slate-600">Inspect schema mapping, canonical models & live API logs.</p>
        </GlassCard>
      </div>

      {/* Application Wizard Modal */}
      <ApplicationWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        citizenId="C1001"
      />
    </div>
  );
};
