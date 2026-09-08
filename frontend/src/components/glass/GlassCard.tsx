import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glowOnHover = true,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white/90 p-6 backdrop-blur-xl transition-all duration-300 shadow-sm text-slate-900",
        glowOnHover && "hover:border-[#FF9933]/50 hover:bg-white hover:shadow-md hover:shadow-amber-500/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
