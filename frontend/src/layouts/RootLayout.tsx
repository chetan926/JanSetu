import React from 'react';
import { Outlet } from 'react-router-dom';
import { GlassNavbar } from '@/components/glass/GlassNavbar';
import { Toaster } from '@/components/ui/sonner';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#FF9933] selection:text-[#0F172A]">
      {/* Soft Saffron & Warm Cream Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-[#FF9933]/10 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      <GlassNavbar />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-slate-200 bg-white/80 backdrop-blur-md py-6 text-center text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#002D62]">JanSetu Platform</span>
            <span>© 2026 National Interoperability Gateway • SIH 2026 PS-129 Prototype</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span className="text-emerald-700 font-bold">● MOCK GATEWAY ACTIVE</span>
            <span className="text-slate-500">REST API v1.0</span>
            <span className="text-[#002D62] font-semibold">POSTGRESQL READY</span>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};
