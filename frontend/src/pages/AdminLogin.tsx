import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShieldCheck,
  Lock,
  User,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { toast } from 'sonner';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState('ADMIN001');
  const [password, setPassword] = useState('admin123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success('Authenticated as CIVOGATE Administrator');

    navigate('/admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-[#F8FAFC]">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-xs font-bold text-[#0F172A]">
            <ShieldCheck className="h-4 w-4 text-[#1D4ED8]" />
            CIVOGATE • ADMINISTRATOR PORTAL
          </div>

          <h1 className="text-4xl font-extrabold text-[#0F172A] leading-tight">
            Government Systems.
            <br />

            <span className="text-[#1D4ED8]">
              Connected & Controlled.
            </span>
          </h1>

          <p className="text-slate-600 text-sm leading-relaxed">
            Secure administrative access to monitor government service
            interoperability, API health, applications, consent,
            audit trails and system performance.
          </p>

          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Shield className="h-5 w-5 text-[#1D4ED8]" />

            <span>
              Secure administrative access
            </span>
          </div>

        </div>

        {/* LOGIN CARD */}
        <GlassCard className="p-8 border-slate-200 bg-white shadow-xl">

          <div className="mb-6 space-y-1">

            <h2 className="text-2xl font-extrabold text-[#0F172A]">
              Admin Login
            </h2>

            <p className="text-xs text-slate-500">
              Use the fictional administrator credentials below.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* ADMIN ID */}
            <div className="space-y-1">

              <label className="text-xs font-bold text-slate-700">
                Admin ID
              </label>

              <div className="relative">

                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                <Input
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="ADMIN001"
                  className="pl-9 bg-white"
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="space-y-1">

              <label className="text-xs font-bold text-slate-700">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 bg-white"
                />

              </div>

            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="w-full bg-[#1D4ED8] text-white hover:bg-[#1E40AF] font-bold text-base mt-4 shadow-md"
            >

              Enter Admin Dashboard

              <ArrowRight className="ml-2 h-4 w-4" />

            </Button>

          </form>

          {/* DEMO CREDENTIALS */}
          <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">

            Demo Admin ID:{' '}

            <span className="font-mono font-bold text-[#1D4ED8]">
              ADMIN001
            </span>

            <br />

            Demo Password:{' '}

            <span className="font-mono font-bold text-[#1D4ED8]">
              admin123
            </span>

          </div>

        </GlassCard>

      </div>
    </div>
  );
};

export default AdminLogin;