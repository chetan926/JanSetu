import React, { useEffect, useState } from 'react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { FileText, CheckCircle2, RefreshCw, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getApplicationsApi } from '@/services/api';
import { ApplicationRecord } from '@/types';
import { ApplicationWizardModal } from '@/components/applications/ApplicationWizardModal';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export const Applications: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await getApplicationsApi('C1001');
      setApplications(data);
    } catch (err) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] flex items-center">
            <FileText className="mr-3 h-7 w-7 text-[#002D62]" /> Digital Application Tracking
          </h1>
          <p className="text-slate-600 text-sm mt-1">Real-time application status, audit logs, and digital provenance trail.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" onClick={fetchApplications}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button onClick={() => setIsWizardOpen(true)} className="bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-bold">
            New Application
          </Button>
        </div>
      </div>

      <GlassPanel header={<h3 className="font-bold text-[#0F172A]">Submitted Applications</h3>}>
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-sm">Loading application history...</div>
        ) : applications.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No applications submitted yet. Click "New Application" to get started.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Service Name</TableHead>
                <TableHead>Trace Correlation ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id || app.application_id}>
                  <TableCell className="font-mono font-bold text-[#002D62]">{app.application_id}</TableCell>
                  <TableCell className="font-semibold text-slate-900">{app.service_name}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-600 font-bold">{app.trace_id}</TableCell>
                  <TableCell>
                    <Badge variant="success" className="flex items-center w-fit space-x-1">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 font-medium">{formatDate(app.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => navigate('/interop')}>
                      <Eye className="h-4 w-4 mr-1 text-slate-600" /> Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </GlassPanel>

      <ApplicationWizardModal
        isOpen={isWizardOpen}
        onClose={() => {
          setIsWizardOpen(false);
          fetchApplications();
        }}
        citizenId="C1001"
      />
    </div>
  );
};
