import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Network,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';

export const PortalEntry: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Header */}
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#002D62] flex items-center justify-center shadow-md">
                <Network className="w-6 h-6 text-white" />
              </div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-[#002D62]">
                  CIVOGATE
                </h1>

                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
                  Government Interoperability Gateway
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Secure • Consent Driven • Interoperable
            </div>

          </div>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center px-5 py-12">

          <div className="w-full max-w-6xl">

            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto mb-12">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-[#0F172A] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
                SIH 2026 • PS-129
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                One Government.
                <br />

                <span className="text-[#002D62]">
                  Connected Services.
                </span>
              </h2>

              <p className="mt-5 text-slate-600 text-sm sm:text-base leading-7 max-w-2xl mx-auto">
                CIVOGATE connects fragmented government departments, APIs,
                databases and digital platforms through a secure,
                consent-driven interoperability layer.
              </p>

            </div>

            {/* Entry Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

              {/* USER CARD */}
              <div className="group bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-start justify-between">

                  <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <UserRound className="w-7 h-7 text-[#002D62]" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                    CITIZEN PORTAL
                  </span>

                </div>

                <div className="mt-7">

                  <h3 className="text-2xl font-extrabold">
                    User / Citizen
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-6">
                    Access government services, give consent for data sharing,
                    check eligibility, submit applications and track your
                    applications from one place.
                  </p>

                </div>

                {/* Features */}
                <div className="mt-6 space-y-3">

                  <Feature
                    text="Discover government services"
                  />

                  <Feature
                    text="Consent-based data sharing"
                  />

                  <Feature
                    text="Automatic eligibility verification"
                  />

                  <Feature
                    text="Unified application tracking"
                  />

                </div>

                <button
                  onClick={() => navigate('/login')}
                  className="mt-8 w-full rounded-xl bg-[#002D62] hover:bg-[#001F45] text-white font-bold py-3.5 px-5 flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Continue as User
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

              {/* ADMIN CARD */}
              <div className="group bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                <div className="flex items-start justify-between">

                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-[#FF9933]" />
                  </div>

                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-700">
                    ADMIN PORTAL
                  </span>

                </div>

                <div className="mt-7">

                  <h3 className="text-2xl font-extrabold">
                    Government Admin
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-6">
                    Monitor applications, department integrations, API health,
                    interoperability flows, consent activity and audit trails.
                  </p>

                </div>

                {/* Features */}
                <div className="mt-6 space-y-3">

                  <Feature
                    text="Application and service analytics"
                  />

                  <Feature
                    text="Department and API monitoring"
                  />

                  <Feature
                    text="Interoperability request tracing"
                  />

                  <Feature
                    text="Audit logs and system health"
                  />

                </div>

                <button
                  onClick={() => navigate('/admin/login')}
                  className="mt-8 w-full rounded-xl bg-[#FF9933] hover:bg-[#E88920] text-[#0F172A] font-bold py-3.5 px-5 flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  Continue as Admin
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

            </div>

            {/* Architecture strip */}
            <div className="mt-10 max-w-5xl mx-auto">

              <div className="bg-white/80 border border-slate-200 rounded-2xl p-5">

                <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-600">

                  <ArchitectureItem text="Citizen" />

                  <ArrowRight className="w-4 h-4 text-slate-400" />

                  <ArchitectureItem text="CIVOGATE" active />

                  <ArrowRight className="w-4 h-4 text-slate-400" />

                  <ArchitectureItem text="Government APIs" />

                  <ArrowRight className="w-4 h-4 text-slate-400" />

                  <ArchitectureItem text="Unified Service" />

                </div>

              </div>

            </div>

            {/* Footer message */}
            <div className="text-center mt-8">

              <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Secure interoperability • Consent • RBAC • Auditability
              </div>

            </div>

          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white/80 py-5">

          <div className="max-w-7xl mx-auto px-6 text-center text-xs text-slate-500">
            CIVOGATE • Bridging Government Systems • SIH 2026 PS-129 Prototype
          </div>

        </footer>

      </div>

    </div>
  );
};


/* ---------------------------------------------------------
   Feature Component
--------------------------------------------------------- */

const Feature: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-700">

      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
      </div>

      <span>{text}</span>

    </div>
  );
};


/* ---------------------------------------------------------
   Architecture Component
--------------------------------------------------------- */

const ArchitectureItem: React.FC<{
  text: string;
  active?: boolean;
}> = ({ text, active }) => {
  return (
    <div
      className={
        active
          ? 'px-4 py-2 rounded-lg bg-[#002D62] text-white'
          : 'px-4 py-2 rounded-lg bg-slate-100 text-slate-700'
      }
    >
      {text}
    </div>
  );
};

export default PortalEntry;