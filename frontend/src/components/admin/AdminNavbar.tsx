import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Building2,
  Server,
  Network,
  Lock,
  ShieldCheck,
  BarChart3,
  Activity,
  LogOut,
  Settings,
  ChevronRight,
} from 'lucide-react';

import { cn } from '@/lib/utils';

export const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Applications',
      path: '/admin/applications',
      icon: FileText,
    },
    {
      label: 'Departments',
      path: '/admin/departments',
      icon: Building2,
    },
    {
      label: 'Services',
      path: '/admin/services',
      icon: Server,
    },
    {
      label: 'API Gateway',
      path: '/admin/gateway',
      icon: Network,
    },
    {
      label: 'Interoperability',
      path: '/admin/interoperability',
      icon: Network,
    },
    {
      label: 'Consent',
      path: '/admin/consent',
      icon: Lock,
    },
    {
      label: 'Audit Logs',
      path: '/admin/audit',
      icon: ShieldCheck,
    },
    {
      label: 'Analytics',
      path: '/admin/analytics',
      icon: BarChart3,
    },
    {
      label: 'System Health',
      path: '/admin/health',
      icon: Activity,
    },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="relative z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">

      <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP BAR */}
        <div className="h-16 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="h-10 w-10 rounded-xl bg-[#002D62] flex items-center justify-center shadow-sm">
              <Network className="h-5 w-5 text-white" />
            </div>

            <div>
              <div className="text-lg font-extrabold tracking-tight text-[#0F172A]">
                CIVOGATE
              </div>

              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Admin Control Center
              </div>
            </div>

          </div>

          {/* ADMIN BADGE */}
          <div className="hidden md:flex items-center gap-3">

            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-700">
                SYSTEM ONLINE
              </span>
            </div>

            <div className="h-9 w-9 rounded-full bg-[#002D62] flex items-center justify-center text-white text-xs font-bold">
              AD
            </div>

            <div className="hidden lg:block">
              <div className="text-xs font-bold text-[#0F172A]">
                Administrator
              </div>
              <div className="text-[10px] text-slate-500">
                System Admin
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="ml-2 rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-red-600 transition"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>

          </div>

        </div>

        {/* NAVIGATION */}
        <div className="overflow-x-auto">
          <nav className="flex items-center gap-1 pb-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition',
                      isActive
                        ? 'bg-[#002D62] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-[#002D62]'
                    )
                  }
                >
                  <Icon className="h-4 w-4" />

                  <span>{item.label}</span>

                  {item.path === '/admin' && (
                    <ChevronRight className="h-3 w-3 opacity-60" />
                  )}
                </NavLink>
              );
            })}

          </nav>
        </div>

      </div>

    </header>
  );
};