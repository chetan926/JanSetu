import React from 'react';
import { cn } from '@/lib/utils';

export type StatusType = 'active' | 'success' | 'warning' | 'error' | 'pending' | 'offline';

interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  className?: string;
  pulse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  className,
  pulse = true
}) => {
  const config = {
    active: { bg: 'bg-emerald-600', text: 'text-emerald-800', border: 'border-emerald-300 bg-emerald-50' },
    success: { bg: 'bg-emerald-600', text: 'text-emerald-800', border: 'border-emerald-300 bg-emerald-50' },
    warning: { bg: 'bg-amber-500', text: 'text-amber-800', border: 'border-amber-300 bg-amber-50' },
    error: { bg: 'bg-red-600', text: 'text-red-800', border: 'border-red-300 bg-red-50' },
    pending: { bg: 'bg-blue-600', text: 'text-blue-800', border: 'border-blue-300 bg-blue-50' },
    offline: { bg: 'bg-slate-400', text: 'text-slate-700', border: 'border-slate-300 bg-slate-100' },
  }[status];

  return (
    <div className={cn("inline-flex items-center space-x-2 rounded-full px-2.5 py-1 border text-xs font-mono font-bold", config.border, className)}>
      <span className="relative flex h-2 w-2">
        {pulse && status !== 'offline' && (
          <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", config.bg)} />
        )}
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", config.bg)} />
      </span>
      {label && <span className={cn("font-bold", config.text)}>{label}</span>}
    </div>
  );
};
