import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { AdminNavbar } from '@/components/admin/AdminNavbar';

export const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      {/* ADMIN NAVBAR */}
      <AdminNavbar />

      {/* ADMIN CONTENT */}
      <main className="relative z-10 flex-1 w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* ADMIN FOOTER */}
      <footer className="relative z-10 border-t border-slate-200 bg-white/90 backdrop-blur-md py-5">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#002D62]">
              CIVOGATE ADMIN
            </span>

            <span className="text-slate-500">
              © 2026 • SIH 2026 PS-129 Prototype
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span className="text-emerald-700 font-bold">
              ● SYSTEM ONLINE
            </span>

            <span className="text-slate-500">
              REST API v1.0
            </span>

            <span className="text-[#002D62] font-semibold">
              POSTGRESQL READY
            </span>
          </div>

        </div>
      </footer>

      <Toaster />
    </div>
  );
};