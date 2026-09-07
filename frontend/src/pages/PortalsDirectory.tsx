import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { StatusIndicator } from '@/components/glass/StatusIndicator';
import { Search, Network, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getPortalsDirectoryApi } from '@/services/api';
import { toast } from 'sonner';

export const PortalsDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [portals, setPortals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchDirectory = async () => {
    setLoading(true);
    try {
      const res = await getPortalsDirectoryApi();
      setPortals(res.portals || []);
    } catch (err) {
      toast.error('Failed to load portals directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  const filteredPortals = portals.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <Badge variant="saffron">Simulation / Mock Ecosystem</Badge>
            <Badge variant="navy">14 Departments Connected</Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Government Verification Portals Directory
          </h1>
          <p className="text-slate-600 text-sm mt-1 font-medium">
            Explore simulated department portals connected through the JanSetu Interoperability Gateway.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search portals, identity, revenue..."
            className="pl-9 bg-white border-slate-300 focus:border-[#FF9933]"
          />
        </div>
      </div>

      {/* Directory Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 font-medium">Loading Government Portals Directory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortals.map((portal) => (
            <GlassCard key={portal.id} className="p-6 border-slate-200 bg-white flex flex-col justify-between space-y-4 hover:border-[#FF9933]/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl p-2.5 rounded-2xl bg-amber-50 border border-amber-200">
                      {portal.icon_emoji}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#002D62] uppercase tracking-wider">{portal.category}</span>
                      <h3 className="font-extrabold text-[#0F172A] text-base leading-tight">{portal.name}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 font-medium">{portal.department}</p>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Connection Status:</span>
                    <StatusIndicator status="success" label={portal.status} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Integration Level:</span>
                    <span className="text-[#002D62] font-bold">{portal.integration_level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">API Endpoint:</span>
                    <span className="text-slate-700">{portal.endpoint}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-bold text-[11px]">Supported Verification Fields:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {portal.supported_fields.map((f: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-[10px] bg-slate-100 border-slate-200">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => navigate(`/portals/${portal.id}`)}
                  className="w-full bg-[#002D62] text-white hover:bg-[#0F172A] font-bold shadow-md"
                >
                  View Portal & Verify <ArrowRight className="ml-2 h-4 w-4 text-[#FF9933]" />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
