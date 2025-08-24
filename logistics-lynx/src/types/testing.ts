export interface TestingSession {
  id: string;
  user_id: string;
  userId?: string; // Added for compatibility
  sessionStart?: string; // Added
  completedTasks?: string[]; // Added
  feedback?: UserFeedback[]; // Added
  performanceMetrics?: PerformanceMetric[]; // Added
  userRole?: string; // Added
  created_at: string;
  updated_at: string;
  status: 'active' | 'completed' | 'paused';
  duration_minutes?: number;
  completed_tasks?: number;
  total_feedback?: number;
}

export interface UserFeedback {
  id: string;
  session_id: string;
  feature?: string; // Added
  rating: number;
  comment?: string;
  comments?: string; // Added for compatibility
  timestamp?: string; // Added
  category?: string; // Added
  created_at: string;
}

export interface PerformanceMetric {
  id: string;
  session_id: string;
  metric?: string; // Added
  metric_type: string;
  value: number;
  context?: any; // Added
  timestamp: string;
  user_role?: string;
  decision_context?: any;
}

export interface TestingTask {
  id: string;
  name?: string; // Added
  title: string;
  description: string;
  type: 'feature_test' | 'usability_test' | 'performance_test';
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assigned_to?: string;
  created_at: string;
  completed_at?: string;
  expectedOutcome?: string; // Added
  category?: string; // Added
  estimatedDuration?: number; // Added
}
