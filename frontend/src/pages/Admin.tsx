import React from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  Network,
  RefreshCw,
  Server,
  ShieldCheck,
  Users,
  XCircle,
  ArrowRight,
} from 'lucide-react';

const statusData = [
  { label: 'Approved', value: 936 },
  { label: 'Pending', value: 184 },
  { label: 'Processing', value: 86 },
  { label: 'Rejected', value: 42 },
];

const trendData = [
  { day: 'Mon', value: 120 },
  { day: 'Tue', value: 180 },
  { day: 'Wed', value: 150 },
  { day: 'Thu', value: 230 },
  { day: 'Fri', value: 210 },
  { day: 'Sat', value: 270 },
  { day: 'Sun', value: 310 },
];

const apiData = [
  { name: 'Income', value: 99.2 },
  { name: 'Education', value: 98.6 },
  { name: 'Property', value: 96.8 },
  { name: 'Identity', value: 99.1 },
];

const healthData = [
  { name: 'Income API', status: 'Operational', latency: '142 ms' },
  { name: 'Education API', status: 'Operational', latency: '118 ms' },
  { name: 'Property API', status: 'Operational', latency: '163 ms' },
  { name: 'Identity API', status: 'Operational', latency: '126 ms' },
  { name: 'CIVOGATE Gateway', status: 'Operational', latency: '42 ms' },
  { name: 'PostgreSQL', status: 'Operational', latency: '18 ms' },
];

const traceSteps = [
  'Citizen authenticated',
  'Consent verified',
  'Identity API verified',
  'Income API retrieved',
  'Education API retrieved',
  'Schema transformation',
  'Canonical model created',
  'Eligibility calculated',
  'Application submitted',
];

export const Admin: React.FC = () => {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-[#002D62]">
            <ShieldCheck className="h-4 w-4" />
            CIVOGATE ADMIN CONTROL CENTER
          </div>

          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-[#0F172A]">
            Admin & Integration Health
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Monitor government services, interoperability, applications,
            API health and request processing.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg
          border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold
          text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Status
        </button>
      </section>

      {/* KPI CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-6 gap-4">

        <KpiCard
          title="Total Applications"
          value="1,248"
          icon={FileCheck2}
          subtitle="+12.4% this month"
        />

        <KpiCard
          title="Pending"
          value="184"
          icon={Clock3}
          subtitle="Needs processing"
        />

        <KpiCard
          title="Approved"
          value="936"
          icon={CheckCircle2}
          subtitle="75% approval rate"
        />

        <KpiCard
          title="API Success"
          value="98.4%"
          icon={Activity}
          subtitle="Gateway performance"
        />

        <KpiCard
          title="Departments"
          value="12"
          icon={BuildingIcon}
          subtitle="Connected systems"
        />

        <KpiCard
          title="Failed Requests"
          value="21"
          icon={AlertTriangle}
          subtitle="Requires attention"
        />

      </section>

      {/* CHARTS */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* APPLICATION STATUS */}
        <Panel
          title="Applications by Status"
          subtitle="Current application distribution"
          icon={FileCheck2}
        >
          <div className="space-y-5">

            {statusData.map((item) => {
              const percentage = Math.round(
                (item.value / 1248) * 100
              );

              return (
                <div key={item.label}>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-700">
                      {item.label}
                    </span>

                    <span className="text-sm font-bold text-[#0F172A]">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#002D62]"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>

                  <div className="mt-1 text-[11px] text-slate-500">
                    {percentage}% of total applications
                  </div>

                </div>
              );
            })}

          </div>
        </Panel>

        {/* APPLICATION TREND */}
        <Panel
          title="Applications Over Time"
          subtitle="Weekly application activity"
          icon={Activity}
        >
          <div className="h-64 flex items-end gap-3 px-2 pt-8">

            {trendData.map((item) => {

              const height =
                (item.value / 310) * 100;

              return (
                <div
                  key={item.day}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                >

                  <div className="text-[10px] font-semibold text-slate-500">
                    {item.value}
                  </div>

                  <div
                    className="w-full max-w-[38px] rounded-t-lg bg-[#002D62] hover:bg-[#1D4ED8] transition"
                    style={{
                      height: `${height}%`,
                    }}
                  />

                  <span className="text-[11px] font-semibold text-slate-500">
                    {item.day}
                  </span>

                </div>
              );
            })}

          </div>
        </Panel>

      </section>

      {/* API PERFORMANCE + SYSTEM HEALTH */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* API PERFORMANCE */}
        <Panel
          title="Department API Performance"
          subtitle="Successful gateway transactions"
          icon={Server}
        >
          <div className="space-y-5">

            {apiData.map((api) => (
              <div key={api.name}>

                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-slate-700">
                    {api.name} Department
                  </span>

                  <span className="font-bold text-sm text-emerald-700">
                    {api.value}%
                  </span>
                </div>

                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${api.value}%`,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>
        </Panel>

        {/* SYSTEM HEALTH */}
        <Panel
          title="System Health"
          subtitle="Live interoperability infrastructure"
          icon={Activity}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {healthData.map((system) => (
              <div
                key={system.name}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                    <span className="text-sm font-bold text-slate-800">
                      {system.name}
                    </span>
                  </div>

                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold">
                    {system.status}
                  </span>

                  <span className="text-slate-500">
                    {system.latency}
                  </span>
                </div>

              </div>
            ))}

          </div>
        </Panel>

      </section>

      {/* INTEROPERABILITY FLOW */}
      <Panel
        title="Government Interoperability Flow"
        subtitle="How CIVOGATE connects fragmented government systems"
        icon={Network}
      >

        <div className="overflow-x-auto pb-3">

          <div className="min-w-[950px] flex items-center justify-between gap-4">

            <SystemNode
              title="Income API"
              subtitle="Income Department"
            />

            <Arrow />

            <SystemNode
              title="Education API"
              subtitle="Education Department"
            />

            <Arrow />

            <div className="min-w-[190px] rounded-2xl bg-[#002D62] text-white p-5 text-center shadow-lg">

              <Network className="h-8 w-8 mx-auto mb-2" />

              <div className="font-extrabold text-lg">
                CIVOGATE
              </div>

              <div className="text-xs text-blue-100 mt-1">
                Interoperability Gateway
              </div>

            </div>

            <Arrow />

            <SystemNode
              title="Canonical Model"
              subtitle="Unified Government Data"
            />

            <Arrow />

            <SystemNode
              title="Eligibility Engine"
              subtitle="Rule-based Decision"
            />

          </div>

        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-2">

          {[
            'CONNECT',
            'TRANSLATE',
            'VALIDATE',
            'DECIDE',
            'TRACK',
          ].map((step, index) => (
            <div
              key={step}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-center"
            >
              <div className="text-[10px] text-slate-400 font-bold">
                0{index + 1}
              </div>

              <div className="mt-1 text-xs font-extrabold text-[#002D62]">
                {step}
              </div>
            </div>
          ))}

        </div>

      </Panel>

      {/* REQUEST TRACE */}
      <Panel
        title="Live Request Trace"
        subtitle="APP-2026-00124 • Cross-department service request"
        icon={Activity}
      >

        <div className="overflow-x-auto">

          <div className="min-w-[900px] flex items-center">

            {traceSteps.map((step, index) => (
              <React.Fragment key={step}>

                <div className="flex flex-col items-center text-center min-w-[95px]">

                  <div className="h-9 w-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>

                  <div className="mt-2 text-[10px] font-bold text-slate-700">
                    {step}
                  </div>

                  <div className="mt-1 text-[9px] text-slate-400">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                </div>

                {index < traceSteps.length - 1 && (
                  <div className="h-px flex-1 bg-emerald-200 mx-2" />
                )}

              </React.Fragment>
            ))}

          </div>

        </div>

      </Panel>

      {/* DEMO SCENARIO */}
      <Panel
        title="Live Presentation Demo Scenario Controller"
        subtitle="Demonstrate resilience when government APIs fail or become slow."
        icon={AlertTriangle}
      >

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          <ScenarioCard
            title="Normal Success"
            description="All 3 mock APIs respond successfully."
            type="success"
            active
          />

          <ScenarioCard
            title="Income API Slow"
            description="Income API delayed response."
            type="warning"
          />

          <ScenarioCard
            title="Education API Failure"
            description="Education API returns HTTP 503."
            type="danger"
          />

          <ScenarioCard
            title="Identity API Failure"
            description="Identity API returns HTTP 503."
            type="danger"
          />

        </div>

      </Panel>

      {/* RECENT ACTIVITY */}
      <Panel
        title="Recent Audit Activity"
        subtitle="Latest CIVOGATE platform events"
        icon={ShieldCheck}
      >

        <div className="divide-y divide-slate-100">

          <AuditRow
            event="Application submitted"
            detail="APP-2026-00124"
            time="2 min ago"
            success
          />

          <AuditRow
            event="Education API verified"
            detail="C1001 → Education Department"
            time="4 min ago"
            success
          />

          <AuditRow
            event="Consent validated"
            detail="Purpose: Scholarship eligibility"
            time="5 min ago"
            success
          />

          <AuditRow
            event="Income API request completed"
            detail="HTTP 200 • 142 ms"
            time="6 min ago"
            success
          />

          <AuditRow
            event="Failed API request recorded"
            detail="Demo failure scenario"
            time="12 min ago"
            success={false}
          />

        </div>

      </Panel>

    </div>
  );
};

/* =========================
   COMPONENTS
========================= */

interface KpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">

      <div className="flex items-center justify-between">

        <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#002D62]" />
        </div>

        <Activity className="h-4 w-4 text-emerald-500" />

      </div>

      <div className="mt-4 text-2xl font-extrabold text-[#0F172A]">
        {value}
      </div>

      <div className="mt-1 text-xs font-bold text-slate-600">
        {title}
      </div>

      <div className="mt-2 text-[10px] text-slate-400">
        {subtitle}
      </div>

    </div>
  );
};

interface PanelProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({
  title,
  subtitle,
  icon: Icon,
  children,
}) => {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      <div className="px-5 py-4 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
            <Icon className="h-4 w-4 text-[#002D62]" />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-[#0F172A]">
              {title}
            </h2>

            <p className="text-[11px] text-slate-500 mt-0.5">
              {subtitle}
            </p>
          </div>

        </div>

      </div>

      <div className="p-5">
        {children}
      </div>

    </section>
  );
};

const SystemNode: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  return (
    <div className="min-w-[155px] rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">

      <Server className="h-6 w-6 mx-auto text-[#002D62]" />

      <div className="mt-2 text-xs font-extrabold text-slate-800">
        {title}
      </div>

      <div className="mt-1 text-[9px] text-slate-500">
        {subtitle}
      </div>

      <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-100 px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-[9px] font-bold text-emerald-700">
          CONNECTED
        </span>
      </div>

    </div>
  );
};

const Arrow: React.FC = () => {
  return (
    <ArrowRight className="h-5 w-5 shrink-0 text-slate-300" />
  );
};

interface ScenarioCardProps {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'danger';
  active?: boolean;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  title,
  description,
  type,
  active,
}) => {

  const styles = {
    success: 'border-emerald-200 bg-emerald-50',
    warning: 'border-amber-200 bg-amber-50',
    danger: 'border-red-200 bg-red-50',
  };

  const icons = {
    success: CheckCircle2,
    warning: Clock3,
    danger: XCircle,
  };

  const Icon = icons[type];

  return (
    <button
      className={`text-left rounded-xl border p-4 transition hover:shadow-md ${styles[type]}`}
    >

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-2">

          <Icon className="h-5 w-5" />

          <span className="text-sm font-extrabold text-slate-800">
            {title}
          </span>

        </div>

        {active && (
          <span className="rounded-full bg-emerald-600 px-2 py-1 text-[9px] font-bold text-white">
            ACTIVE
          </span>
        )}

      </div>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-600">
        {description}
      </p>

    </button>
  );
};

interface AuditRowProps {
  event: string;
  detail: string;
  time: string;
  success: boolean;
}

const AuditRow: React.FC<AuditRowProps> = ({
  event,
  detail,
  time,
  success,
}) => {
  return (
    <div className="py-4 flex items-center justify-between gap-4">

      <div className="flex items-center gap-3">

        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${
            success
              ? 'bg-emerald-50'
              : 'bg-red-50'
          }`}
        >
          {success ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
        </div>

        <div>
          <div className="text-xs font-bold text-slate-800">
            {event}
          </div>

          <div className="text-[10px] text-slate-500">
            {detail}
          </div>
        </div>

      </div>

      <span className="text-[10px] text-slate-400 whitespace-nowrap">
        {time}
      </span>

    </div>
  );
};

const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21h18" />
    <path d="M6 21V4h12v17" />
    <path d="M9 8h1" />
    <path d="M14 8h1" />
    <path d="M9 12h1" />
    <path d="M14 12h1" />
    <path d="M9 16h1" />
    <path d="M14 16h1" />
  </svg>
);