
import React from 'react';
import { useAutonomousActivation } from '@/hooks/autonomous/useAutonomousActivation';
import { AutoActivationBanner } from './activation/AutoActivationBanner';
import { MainControlCard } from './activation/MainControlCard';
import { StatusInfoCards } from './activation/StatusInfoCards';
import { SystemStatsGrid } from './activation/SystemStatsGrid';
import { CurrentOperationsCard } from './activation/CurrentOperationsCard';
import { InstructionsCard } from './activation/InstructionsCard';

/**
 * Main component for controlling the autonomous activation system
 * Handles 24/7 persistent operations and auto-activation features
 */
export const AutonomousActivationControl = () => {
  const {
    activationStatus,
    activateAutonomousSystem,
    deactivateAutonomousSystem,
    executeComprehensiveTesting
  } = useAutonomousActivation();

  return (
    <div className="space-y-6">
      <AutoActivationBanner isAutoActivated={activationStatus.isAutoActivated} />
      
      <MainControlCard
        activationStatus={activationStatus}
        onActivate={activateAutonomousSystem}
        onDeactivate={deactivateAutonomousSystem}
        onTest={executeComprehensiveTesting}
      />

      <StatusInfoCards 
        isActive={activationStatus.isActive}
        isAutoActivated={activationStatus.isAutoActivated}
      />

      <SystemStatsGrid activationStatus={activationStatus} />

      <CurrentOperationsCard 
        isActive={activationStatus.isActive}
        isAutoActivated={activationStatus.isAutoActivated}
      />

      <InstructionsCard />
    </div>
  );
};
