import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Network, ShieldCheck, Cpu } from 'lucide-react';
import { StatusIndicator } from '@/components/glass/StatusIndicator';

interface GovernmentPortalHeaderProps {
  department: string;
  portalName: string;
  status?: string;
  integrationLevel?: string;
  emoji?: string;
}

export const GovernmentPortalHeader: React.FC<GovernmentPortalHeaderProps> = ({
  department,
  portalName,
  status = "CONNECTED",
  integrationLevel = "LIVE MOCK",
  emoji = "🏛️"
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-amber-200/90 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/60 p-6 sm:p-8 shadow-sm backdrop-blur-xl space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-3xl p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {emoji}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#002D62]">{department}</span>
              <Badge variant="saffron" className="text-[10px] uppercase font-bold">
                Simulation / Mock Portal
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">{portalName}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusIndicator status="success" label={status} />
          <Badge variant="navy" className="text-xs py-1 px-3">
            {integrationLevel}
          </Badge>
        </div>
      </div>

      <div className="pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between text-xs text-slate-600 font-medium gap-2">
        <div className="flex items-center space-x-2">
          <Network className="h-4 w-4 text-[#FF9933]" />
          <span>Connected through <strong className="text-[#002D62]">JanSetu Interoperability Gateway</strong></span>
        </div>
        <div className="flex items-center space-x-2 font-mono text-[11px]">
          <span className="text-emerald-700 font-bold">● API Active</span>
          <span>Zero Document Overhead</span>
        </div>
      </div>
    </div>
  );
};
