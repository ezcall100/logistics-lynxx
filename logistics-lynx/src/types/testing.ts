export interface TestingSession {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'completed' | 'paused';
  created_at: string;
  updated_at: string;
  user_id: string;
  test_count: number;
  completed_count: number;
}

export interface UserFeedback {
  id: string;
  session_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  category: string;
  created_at: string;
}

export interface PerformanceMetric {
  id: string;
  session_id: string;
  metric_name: string;
  value: number;
  unit: string;
  timestamp: string;
}

export interface TestingTask {
  id: string;
  session_id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high';
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}
