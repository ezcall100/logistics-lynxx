
export interface AutonomousAgent {
  id: string;
  name: string;
  type: 'research' | 'frontend' | 'backend' | 'database' | 'testing' | 'deployment' | 'refactoring' | 'optimization' | 'ui_improvement' | 'monitoring' | 'learning';
  status: 'active' | 'idle' | 'working' | 'error';
  lastAction: string;
  successRate: number;
  tasksCompleted: number;
  nextScheduledRun: string;
  category?: string;
  assignedTasks?: string[];
}

export interface SystemStats {
  active_agents: number;
  total_agents: number;
  average_success_rate: number;
  total_tasks_completed: number;
  system_status: 'autonomous' | 'manual' | 'maintenance';
  uptime_hours: number;
}
