/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AutonomousTabs from '@/components/autonomous/AutonomousTabs';
import AgentDashboard from './autonomous/AgentDashboard';
import PerformanceMonitor from './autonomous/PerformanceMonitor';
import LearningModels from './autonomous/LearningModels';
import DecisionLogs from './autonomous/DecisionLogs';
import AutoScaling from './autonomous/AutoScaling';

const AutonomousDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          {/* Default route - show the full AutonomousTabs */}
          <Route index element={<AutonomousTabs />} />
          
          {/* Individual page routes */}
          <Route path="agent-dashboard" element={<AgentDashboard />} />
          <Route path="performance-monitor" element={<PerformanceMonitor />} />
          <Route path="learning-models" element={<LearningModels />} />
          <Route path="decision-logs" element={<DecisionLogs />} />
          <Route path="auto-scaling" element={<AutoScaling />} />
          
          {/* Catch-all route - redirect to main dashboard */}
          <Route path="*" element={<Navigate to="/autonomous" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default AutonomousDashboardPage;