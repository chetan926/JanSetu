import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, RefreshCw } from 'lucide-react';
import { getConsentsApi, revokeConsentApi } from '@/services/api';
import { ConsentRecord } from '@/types';
import { toast } from 'sonner';

export const Consent: React.FC = () => {
  const [consents, setConsents] = useState<ConsentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConsents = async () => {
    setLoading(true);
    try {
      const data = await getConsentsApi('C1001');
      setConsents(data);
    } catch (err) {
      toast.error('Failed to fetch consent records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsents();
  }, []);

  const handleRevoke = async (consentId: string, deptName: string) => {
    try {
      await revokeConsentApi(consentId);
      toast.success(`Consent revoked for ${deptName}`);
      fetchConsents();
    } catch (err) {
      toast.error('Failed to revoke consent');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] flex items-center">
            <Lock className="mr-3 h-7 w-7 text-emerald-700" /> Consent Control Center
          </h1>
          <p className="text-slate-600 text-sm mt-1">Your data. Your choice. View and manage active data sharing consents.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={fetchConsents}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Badge variant="success">Strict Privacy Enforced</Badge>
        </div>
      </div>

      <GlassPanel header={<h3 className="font-bold text-[#0F172A]">Active Data Consents (Citizen C1001)</h3>}>
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading consent records...</div>
        ) : consents.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No active consent records found.</div>
        ) : (
          <div className="space-y-4">
            {consents.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-2xl bg-white border border-slate-200 shadow-sm gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#0F172A] text-base">{item.department}</span>
                    <Badge variant={item.status === 'GRANTED' ? 'success' : 'destructive'}>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Fields: {Array.isArray(item.requested_fields) ? item.requested_fields.join(', ') : item.requested_fields} • Purpose: {item.purpose}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    ID: {item.consent_id || item.id}
                  </p>
                </div>

                {item.status === 'GRANTED' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRevoke(item.consent_id || item.id, item.department)}
                  >
                    Revoke Consent
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </GlassPanel>
    </div>
  );
};
