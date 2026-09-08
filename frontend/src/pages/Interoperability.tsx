import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Network, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { evaluateEligibilityApi } from '@/services/api';
import { toast } from 'sonner';

export const Interoperability: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLiveGatewayData = async () => {
    setLoading(true);
    try {
      const res = await evaluateEligibilityApi('C1001');
      setData(res);
      toast.success('Live Gateway state updated');
    } catch (err) {
      toast.error('Failed to fetch gateway data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveGatewayData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] flex items-center">
            <Network className="mr-3 h-7 w-7 text-[#FF9933]" /> Interoperability Control Center
          </h1>
          <p className="text-slate-600 text-sm mt-1">Real-time visualization of API gateway routing, schema mapping & canonical data engine.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={fetchLiveGatewayData}>
            <RefreshCw className="h-4 w-4 mr-2" /> Trigger Gateway Fetch
          </Button>
          <Badge variant="saffron">Trace ID: {data?.trace_id || 'TRACE-LOADING'}</Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="flow" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-slate-100">
          <TabsTrigger value="flow">1. Live Gateway Flow</TabsTrigger>
          <TabsTrigger value="mapping">2. Schema Transformation</TabsTrigger>
          <TabsTrigger value="canonical">3. Canonical Model</TabsTrigger>
          <TabsTrigger value="eligibility">4. Deterministic Engine</TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="mt-4 space-y-4">
          <GlassPanel header={<h3 className="font-bold text-[#0F172A]">Interoperability Architecture Flow</h3>}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-center py-6">
              <GlassCard className="p-4 border-slate-300">
                <Badge variant="navy" className="mb-2">Citizen</Badge>
                <h4 className="font-bold text-[#0F172A] text-sm">Ravi Kumar</h4>
                <p className="text-[11px] text-slate-500 font-mono">C1001</p>
              </GlassCard>

              <div className="hidden md:flex justify-center text-[#FF9933]">
                <ArrowRight className="h-6 w-6 animate-pulse" />
              </div>

              <GlassCard className="p-4 border-amber-300 bg-amber-50/50">
                <Badge variant="saffron" className="mb-2">JanSetu Gateway</Badge>
                <h4 className="font-bold text-[#0F172A] text-sm">Consent & Gateway</h4>
                <p className="text-[11px] text-emerald-800 font-bold font-mono">
                  {loading ? 'Orchestrating...' : '3/3 APIs SUCCESS'}
                </p>
              </GlassCard>

              <div className="hidden md:flex justify-center text-[#FF9933]">
                <ArrowRight className="h-6 w-6 animate-pulse" />
              </div>

              <GlassCard className="p-4 border-emerald-300 bg-emerald-50/50">
                <Badge variant="success" className="mb-2">Canonical Output</Badge>
                <h4 className="font-bold text-[#0F172A] text-sm">Normalized Model</h4>
                <p className="text-[11px] text-emerald-800 font-bold font-mono">100% Schema Mapped</p>
              </GlassCard>
            </div>
          </GlassPanel>
        </TabsContent>

        <TabsContent value="mapping" className="mt-4">
          <GlassPanel header={<h3 className="font-bold text-[#0F172A]">Schema Mapping Visualizer</h3>}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-[#002D62] font-bold">Income Tax Department API</h4>
                <p className="text-slate-700">full_name ➔ name</p>
                <p className="text-slate-700">annual_income ➔ annual_income</p>
                <Badge variant="success" className="mt-2">Mapped</Badge>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-[#002D62] font-bold">Higher Education Department</h4>
                <p className="text-slate-700">studentId ➔ citizen_id</p>
                <p className="text-slate-700">enrollmentStatus ➔ education_status</p>
                <Badge variant="success" className="mt-2">Mapped</Badge>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-[#002D62] font-bold">Property & Identity Department</h4>
                <p className="text-slate-700">id ➔ citizen_id</p>
                <p className="text-slate-700">verification ➔ property_verified</p>
                <Badge variant="success" className="mt-2">Mapped</Badge>
              </div>
            </div>
          </GlassPanel>
        </TabsContent>

        <TabsContent value="canonical" className="mt-4">
          <GlassPanel header={<h3 className="font-bold text-[#0F172A]">Canonical Government Data Model (v1.0)</h3>}>
            {loading ? (
              <div className="p-8 text-center text-slate-500 text-sm">Fetching canonical model from gateway...</div>
            ) : (
              <pre className="p-4 rounded-2xl bg-slate-900 text-[#FF9933] font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                {JSON.stringify(data?.canonical_model, null, 2)}
              </pre>
            )}
          </GlassPanel>
        </TabsContent>

        <TabsContent value="eligibility" className="mt-4">
          <GlassPanel header={<h3 className="font-bold text-[#0F172A]">Deterministic Rule Evaluation Result</h3>}>
            {loading ? (
              <div className="p-8 text-center text-slate-500 text-sm">Evaluating deterministic rules...</div>
            ) : (
              <div className="space-y-3">
                {data?.eligibility?.checks?.map((chk: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-sm font-bold text-[#0F172A]">{chk.rule}</span>
                    <Badge variant={chk.passed ? 'success' : 'destructive'}>
                      {chk.actual.toString()} {chk.passed ? '✓' : '✕'}
                    </Badge>
                  </div>
                ))}

                <div className="mt-4 p-5 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-1">
                  <h4 className="text-xl font-extrabold text-[#0F172A]">
                    FINAL RESULT: {data?.eligibility?.eligible ? 'ELIGIBLE' : 'INELIGIBLE'}
                  </h4>
                  <p className="text-xs text-slate-700 font-medium">{data?.eligibility?.reason}</p>
                </div>
              </div>
            )}
          </GlassPanel>
        </TabsContent>
      </Tabs>
    </div>
  );
};
