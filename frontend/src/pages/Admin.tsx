import React, { useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassCard } from '@/components/glass/GlassCard';
import { StatusIndicator } from '@/components/glass/StatusIndicator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import { setScenarioApi } from '@/services/api';
import { toast } from 'sonner';

export const Admin: React.FC = () => {
  const [activeScenario, setActiveScenario] = useState('NORMAL');
  const [loading, setLoading] = useState(false);

  const scenarios = [
    { id: 'NORMAL', label: '● Normal Success', desc: 'All 3 mock APIs respond successfully within ~150ms' },
    { id: 'INCOME_SLOW', label: '⚠ Income API Slow', desc: 'Income API delayed response (simulating latency)' },
    { id: 'EDU_DOWN', label: '✕ Education API Failure', desc: 'Education department returns HTTP 503 error' },
    { id: 'PROPERTY_DOWN', label: '✕ Identity API Failure', desc: 'Identity department returns HTTP 503 error' },
  ];

  const handleSelectScenario = async (scenarioId: string, label: string) => {
    setLoading(true);
    try {
      await setScenarioApi(scenarioId);
      setActiveScenario(scenarioId);
      toast.success(`Active Demo Scenario set to: ${label}`);
    } catch (err) {
      toast.error('Failed to update demo scenario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] flex items-center">
            <ShieldCheck className="mr-3 h-7 w-7 text-emerald-700" /> Admin & Integration Health
          </h1>
          <p className="text-slate-600 text-sm mt-1">System metrics, gateway resilience & live demo scenario controller.</p>
        </div>
        <Button size="sm" variant="outline" onClick={() => toast.success('Gateway health check refreshed')}>
          <RefreshCw className="h-4 w-4 mr-2" /> Refresh Status
        </Button>
      </div>

      {/* Mock Department API Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#0F172A]">Income Department API</h3>
            <StatusIndicator status={activeScenario === 'INCOME_SLOW' ? 'warning' : 'success'} label="Operational" />
          </div>
          <p className="text-xs text-slate-500 font-mono mt-2">GET /mock/income/{'{citizen_id}'}</p>
          <div className="mt-4 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600">Latency: {activeScenario === 'INCOME_SLOW' ? '1500 ms' : '142 ms'}</span>
            <span className="text-emerald-700 font-bold">HTTP 200 OK</span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#0F172A]">Education Department API</h3>
            <StatusIndicator status={activeScenario === 'EDU_DOWN' ? 'error' : 'success'} label={activeScenario === 'EDU_DOWN' ? 'Offline' : 'Operational'} />
          </div>
          <p className="text-xs text-slate-500 font-mono mt-2">GET /mock/education/{'{citizen_id}'}</p>
          <div className="mt-4 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600">Latency: {activeScenario === 'EDU_DOWN' ? '0 ms' : '118 ms'}</span>
            <span className={activeScenario === 'EDU_DOWN' ? 'text-red-700 font-bold' : 'text-emerald-700 font-bold'}>
              {activeScenario === 'EDU_DOWN' ? 'HTTP 503 Unavailable' : 'HTTP 200 OK'}
            </span>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#0F172A]">Property / Identity API</h3>
            <StatusIndicator status={activeScenario === 'PROPERTY_DOWN' ? 'error' : 'success'} label={activeScenario === 'PROPERTY_DOWN' ? 'Offline' : 'Operational'} />
          </div>
          <p className="text-xs text-slate-500 font-mono mt-2">GET /mock/property/{'{citizen_id}'}</p>
          <div className="mt-4 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-600">Latency: {activeScenario === 'PROPERTY_DOWN' ? '0 ms' : '163 ms'}</span>
            <span className={activeScenario === 'PROPERTY_DOWN' ? 'text-red-700 font-bold' : 'text-emerald-700 font-bold'}>
              {activeScenario === 'PROPERTY_DOWN' ? 'HTTP 503 Unavailable' : 'HTTP 200 OK'}
            </span>
          </div>
        </GlassCard>
      </div>

      {/* Demo Scenario Controller */}
      <GlassPanel header={<h3 className="font-bold text-[#0F172A]">Live Presentation Demo Scenario Controller</h3>}>
        <p className="text-xs text-slate-600 mb-4 font-medium">
          Select a test scenario to dynamically inject backend API conditions during a live presentation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {scenarios.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectScenario(item.id, item.label)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activeScenario === item.id
                  ? 'border-[#FF9933] bg-amber-50/80 shadow-md'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#0F172A]">{item.label}</span>
                {activeScenario === item.id && <Badge variant="saffron">ACTIVE</Badge>}
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  );
};
