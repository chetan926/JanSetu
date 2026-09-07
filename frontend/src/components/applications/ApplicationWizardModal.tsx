import React, { useState } from 'react';
import { GlassModal } from '@/components/glass/GlassModal';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  ShieldCheck, Lock, Network, CheckCircle2, ArrowRight, ArrowLeft,
  Sparkles, Eye, AlertTriangle
} from 'lucide-react';
import { evaluateEligibilityApi, submitApplicationApi, grantConsentApi } from '@/services/api';
import { toast } from 'sonner';

interface ApplicationWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  citizenId?: string;
}

export const ApplicationWizardModal: React.FC<ApplicationWizardModalProps> = ({
  isOpen,
  onClose,
  citizenId = 'C1001'
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [consentsGranted, setConsentsGranted] = useState(true);
  const [gatewayData, setGatewayData] = useState<any>(null);
  const [applicationResult, setApplicationResult] = useState<any>(null);
  const [idempotencyKey] = useState(`IDEM-${Date.now()}`);

  const totalSteps = 6;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleGrantAllConsents = async () => {
    setLoading(true);
    try {
      await grantConsentApi(citizenId, 'Income Tax Department', ['annual_income'], 'Scholarship Eligibility');
      await grantConsentApi(citizenId, 'Higher & Technical Education Department', ['education_status'], 'Student Verification');
      await grantConsentApi(citizenId, 'Property & Identity Department', ['property_verified'], 'Identity Validation');
      setConsentsGranted(true);
      toast.success('Data access consent granted for all 3 departments');
      setCurrentStep(3);
    } catch (err) {
      toast.error('Failed to register consent');
    } finally {
      setLoading(false);
    }
  };

  const handleRunGatewayAndEligibility = async () => {
    setLoading(true);
    try {
      const data = await evaluateEligibilityApi(citizenId);
      setGatewayData(data);
      toast.success('Interoperability Gateway fetch & deterministic eligibility evaluation complete');
      setCurrentStep(4);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Gateway orchestration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFinalApplication = async () => {
    setLoading(true);
    try {
      const res = await submitApplicationApi(citizenId, 'SCHOLARSHIP-001', idempotencyKey);
      setApplicationResult(res);
      toast.success('Application submitted successfully!');
      setCurrentStep(6);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Education Scholarship Scheme 2026"
      description="Zero-document, consent-driven interoperable application workflow."
      className="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-500 font-mono font-bold">
            <span>STEP {currentStep} OF {totalSteps}</span>
            <span>
              {currentStep === 1 && '1. Scheme Overview'}
              {currentStep === 2 && '2. Consent Prompt'}
              {currentStep === 3 && '3. Gateway Orchestration'}
              {currentStep === 4 && '4. Deterministic Eligibility'}
              {currentStep === 5 && '5. Final Review & Submit'}
              {currentStep === 6 && '6. Application Tracking'}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF9933] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Overview */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="navy">Scheme SCHOLARSHIP-001</Badge>
                <Badge variant="gold">3 Departments</Badge>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Higher Education Scholarship Assistance</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                This scheme provides direct financial aid of up to ₹50,000 per academic year. Thanks to the JanSetu Interoperability Gateway, physical document uploads are zeroed out.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Required Department Data Minimization</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-[#002D62] font-bold">Income Tax Dept</span>
                  <p className="text-slate-600 mt-1">Annual Income</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-[#002D62] font-bold">Higher Education</span>
                  <p className="text-slate-600 mt-1">Enrollment Status</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="text-[#002D62] font-bold">Property & Identity</span>
                  <p className="text-slate-600 mt-1">Verification Status</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setCurrentStep(2)} className="bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-bold">
                Proceed to Data Consent <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Consent Prompt */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-emerald-700" />
                <h3 className="text-base font-bold text-emerald-900">Your Data. Your Choice.</h3>
              </div>
              <p className="text-xs text-emerald-800 font-medium">
                Grant explicit permission for the Interoperability Gateway to query these 3 department APIs on your behalf for this application.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#0F172A]">Income Tax Department</span>
                  <p className="text-slate-600">Request: Annual Income • Purpose: Income eligibility check</p>
                </div>
                <Badge variant="success">Granted</Badge>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#0F172A]">Higher Education Department</span>
                  <p className="text-slate-600">Request: Enrollment Status • Purpose: Active student status</p>
                </div>
                <Badge variant="success">Granted</Badge>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-[#0F172A]">Property & Identity Department</span>
                  <p className="text-slate-600">Request: Identity Verification • Purpose: Citizen validation</p>
                </div>
                <Badge variant="success">Granted</Badge>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleGrantAllConsents} disabled={loading} className="bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-bold">
                {loading ? 'Registering Consent...' : 'Confirm & Authorize Gateway'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Gateway Orchestration & Schema Transformation */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <div className="flex items-center space-x-2">
                <Network className="h-5 w-5 text-[#FF9933]" />
                <h3 className="text-base font-bold text-[#0F172A]">API Gateway & Schema Transformation</h3>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                Trigger real-time execution of department APIs, schema mapping, and canonical normalization.
              </p>
            </div>

            <GlassCard className="p-4 space-y-3 border-slate-200">
              <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-2 font-mono font-bold">
                <span className="text-slate-600">Target Citizen: {citizenId}</span>
                <Badge variant="saffron">Canonical v1.0</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[#002D62] font-bold">Income API</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">full_name, annual_income</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[#002D62] font-bold">Education API</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">studentId, enrollmentStatus</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[#002D62] font-bold">Property API</span>
                  <p className="text-[10px] text-slate-500 mt-0.5">id, verification</p>
                </div>
              </div>

              <Button onClick={handleRunGatewayAndEligibility} disabled={loading} className="w-full bg-[#002D62] text-white hover:bg-[#0F172A] font-bold py-2.5">
                {loading ? 'Orchestrating APIs & Normalizing...' : 'Execute Gateway Orchestration'} <Sparkles className="ml-2 h-4 w-4 text-[#FF9933]" />
              </Button>
            </GlassCard>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Deterministic Eligibility Result */}
        {currentStep === 4 && gatewayData && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-600 font-bold">Trace ID: {gatewayData.trace_id}</span>
                <Badge variant={gatewayData.eligibility.eligible ? 'success' : 'destructive'}>
                  {gatewayData.eligibility.eligible ? 'ELIGIBLE' : 'INELIGIBLE'}
                </Badge>
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">Deterministic Rule Verification</h3>
            </div>

            {/* Checks list */}
            <div className="space-y-2">
              {gatewayData.eligibility.checks.map((chk: any, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-[#0F172A] font-bold">{chk.rule}</span>
                  <Badge variant={chk.passed ? 'success' : 'destructive'}>
                    {chk.actual.toString()} {chk.passed ? '✓' : '✕'}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Explanation box */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1">
              <span className="font-bold text-[#002D62]">Rule Decision Explanation:</span>
              <p className="text-slate-800 font-medium">{gatewayData.eligibility.reason}</p>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              {gatewayData.eligibility.eligible ? (
                <Button onClick={() => setCurrentStep(5)} className="bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-bold">
                  Proceed to Final Review <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button disabled className="bg-slate-200 text-slate-400">
                  Submission Disabled (Ineligible)
                </Button>
              )}
            </div>
          </div>
        )}

        {/* STEP 5: Final Review & Submission */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="text-base font-bold text-[#0F172A]">Confirm Application Submission</h3>
              <div className="text-xs space-y-1 text-slate-700">
                <p><span className="text-slate-500 font-bold">Applicant:</span> {gatewayData?.canonical_model?.name || 'Ravi Kumar'} ({citizenId})</p>
                <p><span className="text-slate-500 font-bold">Scheme:</span> Higher Education Scholarship Scheme 2026</p>
                <p><span className="text-slate-500 font-bold">Idempotency Key:</span> <span className="font-mono text-slate-600">{idempotencyKey}</span></p>
              </div>
            </div>

            <Button onClick={handleSubmitFinalApplication} disabled={loading} className="w-full bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-extrabold text-base py-3 shadow-md">
              {loading ? 'Submitting & Registering Audit Trail...' : 'Submit Application Now'} <CheckCircle2 className="ml-2 h-4 w-4" />
            </Button>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setCurrentStep(4)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: Success & Tracking */}
        {currentStep === 6 && applicationResult && (
          <div className="space-y-4 text-center animate-in fade-in">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-[#0F172A]">Application Submitted & Approved</h3>
              <p className="text-xs text-slate-600 mt-1">Your request has been processed and stored in the database.</p>
            </div>

            <GlassCard className="p-4 text-left font-mono text-xs space-y-1.5 border-emerald-300 bg-emerald-50/50">
              <p className="text-slate-800">Application ID: <span className="text-[#002D62] font-bold">{applicationResult.application_id}</span></p>
              <p className="text-slate-800">Trace Correlation: <span className="text-emerald-800 font-bold">{applicationResult.trace_id}</span></p>
              <p className="text-slate-800">Policy Version: <span className="text-amber-800 font-bold">{applicationResult.policy_version}</span></p>
              <p className="text-slate-800">Status: <span className="text-emerald-700 font-bold">APPROVED & RECORDED</span></p>
            </GlassCard>

            <div className="pt-2 flex justify-center space-x-3">
              <Button onClick={onClose} className="bg-[#002D62] text-white hover:bg-[#0F172A] font-bold">
                Close Wizard
              </Button>
            </div>
          </div>
        )}
      </div>
    </GlassModal>
  );
};
