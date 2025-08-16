/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import AutonomousAIController from '@/components/autonomous/AutonomousAIController';

const AutonomousAIPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <AutonomousAIController />
    </div>
  );
};

export default AutonomousAIPage;