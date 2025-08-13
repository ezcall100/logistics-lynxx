
import React from 'react';

interface ActivationStatus {
  startTime: string | null;
  totalCycles: number;
  gptConsultations: number;
  lastTestingCycle: string | null;
}

interface SystemStatsGridProps {
  activationStatus: ActivationStatus;
}

export const SystemStatsGrid: React.FC<SystemStatsGridProps> = ({ activationStatus }) => {
  const getUptimeHours = () => {
    if (!activationStatus.startTime) return 0;
    return Math.floor((Date.now() - new Date(activationStatus.startTime).getTime()) / (1000 * 60 * 60));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{getUptimeHours()}h</div>
        <div className="text-sm text-muted-foreground">Uptime</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">{activationStatus.totalCycles}</div>
        <div className="text-sm text-muted-foreground">Cycles</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-600">{activationStatus.gptConsultations}</div>
        <div className="text-sm text-muted-foreground">GPT Assists</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">
          {activationStatus.lastTestingCycle ? 'Recent' : 'None'}
        </div>
        <div className="text-sm text-muted-foreground">Last Test</div>
      </div>
    </div>
  );
};
