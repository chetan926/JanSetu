import React from 'react';
import { JudgeModeBar } from './JudgeModeBar';
import { Badge } from '@/components/ui/badge';

interface GovernmentPortalLayoutProps {
  children: React.ReactNode;
  showJudgeBar?: boolean;
}

export const GovernmentPortalLayout: React.FC<GovernmentPortalLayoutProps> = ({
  children,
  showJudgeBar = true
}) => {
  return (
    <div className="space-y-6 min-h-screen pb-16">
      {showJudgeBar && <JudgeModeBar />}
      <main className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6">
        {children}
      </main>
    </div>
  );
};
