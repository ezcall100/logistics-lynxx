/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PerformanceOptimizationDashboard } from '@/components/autonomous/performance/PerformanceOptimizationDashboard';

const PerformanceOptimizationPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <PerformanceOptimizationDashboard />
    </div>
  );
};

export default PerformanceOptimizationPage;