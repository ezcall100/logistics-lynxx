import React from 'react';
import { render, screen } from '@testing-library/react';
import AgentDashboard from '../pages/autonomous/AgentDashboard';
import PerformanceMonitor from '../pages/autonomous/PerformanceMonitor';
import LearningModels from '../pages/autonomous/LearningModels';
import DecisionLogs from '../pages/autonomous/DecisionLogs';
import AutoScaling from '../pages/autonomous/AutoScaling';

// Mock the toast hook
jest.mock('../hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}));

describe('Autonomous Pages', () => {
  test('AgentDashboard renders correctly', () => {
    render(<AgentDashboard />);
    expect(screen.getByText('Agent Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Monitor and manage autonomous AI agents across the TMS system')).toBeInTheDocument();
    expect(screen.getByText('Create Agent')).toBeInTheDocument();
  });

  test('PerformanceMonitor renders correctly', () => {
    render(<PerformanceMonitor />);
    expect(screen.getByText('Performance Monitor')).toBeInTheDocument();
    expect(screen.getByText('Real-time system performance monitoring and alerting')).toBeInTheDocument();
    expect(screen.getByText('Live Monitoring')).toBeInTheDocument();
  });

  test('LearningModels renders correctly', () => {
    render(<LearningModels />);
    expect(screen.getByText('Learning Models')).toBeInTheDocument();
    expect(screen.getByText('Manage and monitor machine learning models for autonomous decision making')).toBeInTheDocument();
    expect(screen.getByText('Create Model')).toBeInTheDocument();
  });

  test('DecisionLogs renders correctly', () => {
    render(<DecisionLogs />);
    expect(screen.getByText('Decision Logs')).toBeInTheDocument();
    expect(screen.getByText('Track and analyze autonomous AI decision making across the TMS system')).toBeInTheDocument();
    expect(screen.getByText('Export')).toBeInTheDocument();
  });

  test('AutoScaling renders correctly', () => {
    render(<AutoScaling />);
    expect(screen.getByText('Auto Scaling')).toBeInTheDocument();
    expect(screen.getByText('Intelligent infrastructure scaling and resource management')).toBeInTheDocument();
    expect(screen.getByText('Create Rule')).toBeInTheDocument();
  });
});
