import React from 'react';
import { NavLink } from 'react-router-dom';
import { Network, Cpu, FileText, Lock, LayoutDashboard, Bell, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const GlassNavbar: React.FC = () => {
  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Services', path: '/services', icon: Cpu },
    { label: 'Consent Center', path: '/consent', icon: Lock },
    { label: 'Interoperability', path: '/interop', icon: Network },
    { label: 'Applications', path: '/applications', icon: FileText },
    { label: 'Admin / Health', path: '/admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-4 z-40 mx-auto max-w-7xl px-4">
      <nav className="glass-navbar flex items-center justify-between rounded-2xl px-6 py-3 shadow-md border border-slate-200 bg-white/85 backdrop-blur-xl">
        {/* Brand / Emblem */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002D62] text-white shadow-md border border-slate-700">
            <Network className="h-5 w-5 text-[#FF9933]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-[#002D62] text-base tracking-tight">JanSetu</span>
              <span className="text-slate-300">|</span>
              <span className="font-bold text-[#0F172A] text-xs">National Gateway</span>
              <Badge variant="saffron" className="text-[10px] uppercase font-bold py-0.5 px-1.5 ml-1">
                DEMO MODE
              </Badge>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">SIH 2026 PS-129 • Interoperability Layer</p>
          </div>
        </div>

        {/* Navigation Links with Saffron Active Indicator */}
        <div className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200",
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
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#FF9933]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User Profile & Notifications */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors border border-slate-200">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#FF9933] ring-2 ring-white"></span>
            </button>
          </div>

          <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5">
            <div className="h-7 w-7 rounded-lg bg-[#002D62] text-white flex items-center justify-center font-bold text-xs">
              RK
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-[#0F172A] leading-tight">Ravi Kumar</p>
              <p className="text-[10px] text-slate-500 font-mono">Citizen C1001</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
