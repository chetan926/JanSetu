import React, { useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Eye, EyeOff, FileText, CheckCircle2, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface PortalResponseViewProps {
  department: string;
  portalName: string;
  rawResponse: Record<string, any> | null;
  status: string;
  traceId: string;
}

export const PortalResponseView: React.FC<PortalResponseViewProps> = ({
  department,
  portalName,
  rawResponse,
  status,
  traceId
}) => {
  const [showRawJson, setShowRawJson] = useState(false);

  const copyJson = () => {
    if (rawResponse) {
      navigator.clipboard.writeText(JSON.stringify(rawResponse, null, 2));
      toast.success('Raw JSON response copied to clipboard');
    }
  };

  return (
    <GlassPanel header={
      <div className="flex justify-between items-center w-full">
        <h3 className="font-extrabold text-[#0F172A] text-base flex items-center">
          <FileText className="h-5 w-5 text-[#002D62] mr-2" /> Department Response Payload
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowRawJson(!showRawJson)}
          className="text-xs border-slate-300 font-bold"
        >
          {showRawJson ? (
            <>
              <EyeOff className="h-3.5 w-3.5 mr-1" /> Hide Raw JSON
            </>
          ) : (
            <>
              <Code className="h-3.5 w-3.5 mr-1 text-[#FF9933]" /> View Raw Response
            </>
          )}
        </Button>
      </div>
    }>
      <div className="space-y-4">
        {/* Key parsed response fields */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-3 pb-3 border-b border-amber-200">
            <div>
              <span className="text-[10px] font-extrabold text-[#002D62] uppercase tracking-wider">Source Registry</span>
              <h4 className="font-extrabold text-[#0F172A] text-base">{department}</h4>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="navy" className="text-xs font-mono">{traceId}</Badge>
              <Badge variant={status === 'VERIFIED' ? 'success' : 'saffron'}>{status}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-mono">
            {rawResponse &&
              Object.entries(rawResponse).map(([key, val], idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">{key}</span>
                  <span className="font-extrabold text-[#0F172A] text-sm mt-0.5 block truncate">
                    {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Collapsible Raw JSON Viewer */}
        {showRawJson && (
          <div className="space-y-2 animate-in fade-in">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-bold font-mono text-slate-600">Raw JSON API Output</span>
              <Button variant="ghost" size="sm" onClick={copyJson} className="h-7 text-xs font-mono">
                <Copy className="h-3 w-3 mr-1" /> Copy JSON
              </Button>
            </div>
            <pre className="p-4 rounded-2xl bg-[#0F172A] text-amber-300 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner max-h-72">
              {JSON.stringify(rawResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};
