import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/glass/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [citizenId, setCitizenId] = useState('C1001');
  const [password, setPassword] = useState('demo123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Authenticated as Citizen Ravi Kumar (C1001)');
    navigate('/');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-[#F8FAFC]">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Hero */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full bg-amber-100 border border-amber-300 px-3.5 py-1 text-xs font-bold text-[#0F172A]">
            <ShieldCheck className="h-4 w-4 text-[#FF9933]" />
            <span>JanSetu • National Government Interoperability Gateway</span>
          </div>
          <h1 className="text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            One Government.<br />
            <span className="text-[#002D62]">
              Connected Services.
            </span>
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Securely access integrated government services through a unified consent-driven interoperability gateway. Eliminates repeated physical document submission across department portals.
          </p>
        </div>

        {/* Right Glass Card Login Form */}
        <GlassCard className="p-8 border-slate-200 bg-white shadow-xl">
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Citizen Login</h2>
            <p className="text-xs text-slate-500">Use fictional demo credentials below to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Citizen ID</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  value={citizenId}
                  onChange={(e) => setCitizenId(e.target.value)}
                  placeholder="e.g. C1001"
                  className="pl-9 bg-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
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

            <Button type="submit" className="w-full bg-[#FF9933] text-[#0F172A] hover:bg-[#E69500] font-bold text-base mt-4 shadow-md">
              Continue to Portal <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-500">
            Fictional Demo ID: <span className="font-mono font-bold text-[#002D62]">C1001</span> (Ravi Kumar)
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
