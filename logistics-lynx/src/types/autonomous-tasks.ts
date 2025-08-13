
export interface AutonomousTask {
  id: string;
  task_id: string;
  agent_type: string;
  portal: string;
  task_name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  priority: number;
  dependencies: string[];
  estimated_duration_minutes: number;
  assigned_agent_id?: string;
  started_at?: string;
  completed_at?: string;
  result?: unknown;
  created_at: string;
  updated_at: string;
}

export interface TaskExecutionResult {
  success: boolean;
  output?: unknown;
  error?: string;
  files_generated?: string[];
  tests_passed?: boolean;
  deployment_status?: string;
}
