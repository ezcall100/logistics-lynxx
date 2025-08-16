/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TestingSession {
  id: string;
  userId: string;
  userRole: string;
  sessionStart: string;
  sessionEnd?: string;
  completedTasks: string[];
  feedback: UserFeedback[];
  performanceMetrics: PerformanceMetric[];
}

export interface UserFeedback {
  id: string;
  feature: string;
  rating: number; // 1-5 scale
  comments: string;
  timestamp: string;
  category: 'usability' | 'functionality' | 'ai_accuracy' | 'performance';
}

export interface PerformanceMetric {
  id: string;
  metric: string;
  value: number;
  timestamp: string;
  context: unknown;
}

export interface TestingTask {
  id: string;
  name: string;
  description: string;
  expectedOutcome: string;
  category: 'quote_comparison' | 'margin_analysis' | 'ai_recommendations';
  estimatedDuration: number; // in minutes
}
