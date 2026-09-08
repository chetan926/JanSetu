import React from 'react';
import { NavLink } from 'react-router-dom';
import { Network, Cpu, FileText, Lock, LayoutDashboard, Bell, ShieldCheck, Building2, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const GlassNavbar: React.FC = () => {
  const navItems = [
  {
    label: 'Dashboard',
    path: '/user',
    icon: LayoutDashboard,
  },
  {
    label: 'Portals Directory',
    path: '/user/portals',
    icon: Building2,
  },
  {
    label: 'Verification Hub',
    path: '/user/verification',
    icon: CheckCircle2,
  },
  {
    label: 'Services',
    path: '/user/services',
    icon: Cpu,
  },
  {
    label: 'Consent Center',
    path: '/user/consent',
    icon: Lock,
  },
  {
    label: 'Interoperability',
    path: '/user/interop',
    icon: Network,
  },
  {
    label: 'Applications',
    path: '/user/applications',
    icon: FileText,
  },
  {
    label: 'Admin / Health',
    path: '/admin',
    icon: ShieldCheck,
  },
];

  return (
    <header className="sticky top-4 z-40 mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">
      <nav className="glass-navbar flex items-center gap-4 rounded-2xl px-5 sm:px-6 py-3 shadow-md border border-slate-200 bg-white/85 backdrop-blur-xl">
        {/* Brand / Emblem */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
  <img
    src="/civogate-logo.png"
    alt="CIVO GATE"
    className="h-12 w-12 object-cover"
  />
</div>
          <div>
            <div className="flex items-center flex-wrap gap-x-2 gap-y-0.5">
              <span className="font-extrabold text-[#002D62] text-base tracking-tight">JanSetu</span>
              <Badge variant="saffron" className="text-[10px] uppercase font-bold py-0.5 px-1.5">
                DEMO MODE
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 font-mono leading-tight">
              National Gateway
            </p>
            <p className="text-[11px] text-slate-500 font-mono leading-tight">
              SIH 2026 PS-129 • Interoperability Ecosystem
            </p>
          </div>
        </div>

        {/* Navigation Links with Saffron Active Indicator */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80 min-w-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-center leading-tight transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "text-[#002D62] bg-white shadow-sm border border-slate-200"
                      : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-200/60"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={cn("h-4 w-4", isActive ? "text-[#FF9933]" : "text-slate-500")} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-2.5 right-2.5 h-0.5 rounded-full bg-[#FF9933]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User Profile & Notifications */}
        <div className="flex items-center gap-3 shrink-0 pl-4 border-l border-slate-200">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#FF9933] ring-2 ring-white"></span>
          </button>

          <div className="flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5">
            <div className="h-7 w-7 rounded-lg bg-[#002D62] text-white flex items-center justify-center font-bold text-xs shrink-0">
              RK
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[#0F172A] leading-tight whitespace-nowrap">Ravi Kumar</p>
              <p className="text-[10px] text-slate-500 font-mono whitespace-nowrap">Citizen • C1001</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
