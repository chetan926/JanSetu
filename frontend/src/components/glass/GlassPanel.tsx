import React from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  header,
  footer
}) => {
  return (
    <div className={cn(
      "rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm text-slate-900 overflow-hidden",
      className
    )}>
      {header && (
        <div className="border-b border-slate-200 bg-slate-50/80 p-5 font-bold text-[#0F172A]">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="border-t border-slate-200 bg-slate-50/50 p-4">
          {footer}
        </div>
      )}
    </div>
  );
};
