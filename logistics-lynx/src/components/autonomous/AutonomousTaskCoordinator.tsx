/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { TaskCoordinatorHeader } from './task-coordinator/TaskCoordinatorHeader';
import { AgentTypeBreakdown } from './task-coordinator/AgentTypeBreakdown';
import { RecentTaskActivity } from './task-coordinator/RecentTaskActivity';
import { useTaskGeneration } from './task-coordinator/useTaskGeneration';
import { useTaskExecution } from './task-coordinator/useTaskExecution';

interface AgentTask {
  id: string;
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
}

interface AgentProgress {
  total_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  failed_tasks: number;
  completion_percentage: number;
}

export const AutonomousTaskCoordinator: React.FC = () => {
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [progress, setProgress] = useState<AgentProgress>({
    total_tasks: 0,
    completed_tasks: 0,
    in_progress_tasks: 0,
    failed_tasks: 0,
    completion_percentage: 0
  });

  const { isGenerating, initializeComprehensiveTasks } = useTaskGeneration();
  const { startAutonomousGeneration, startAutonomousGenerationAdvanced } = useTaskExecution();

  const updateTaskStatus = (taskId: string, updates: Partial<AgentTask>) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, ...updates } : t
    ));
  };

  const handleInitializeTasks = async () => {
    try {
      const newTasks = await initializeComprehensiveTasks();
      setTasks(newTasks);
    } catch (error) {
      console.error('Failed to initialize tasks:', error);
    }
  };

  const handleStartGeneration = async () => {
    await startAutonomousGeneration(tasks, updateTaskStatus);
  };

  const handleStartAdvancedGeneration = async () => {
    await startAutonomousGenerationAdvanced(tasks, updateTaskStatus, {
      batchSize: 20,        // Even smaller batches
      delayBetweenBatches: 8000,  // Longer delays
      concurrencyLimit: 2,   // Very conservative concurrency
      maxRetries: 5         // More retry attempts
    });
  };

  const updateProgress = (taskList: AgentTask[]) => {
    const total = taskList.length;
    const completed = taskList.filter(t => t.status === 'completed').length;
    const inProgress = taskList.filter(t => t.status === 'in_progress').length;
    const failed = taskList.filter(t => t.status === 'failed').length;
    
    setProgress({
      total_tasks: total,
      completed_tasks: completed,
      in_progress_tasks: inProgress,
      failed_tasks: failed,
      completion_percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    });
  };

  useEffect(() => {
    updateProgress(tasks);
  }, [tasks]);

  return (
    <div className="space-y-6 p-6">
      <TaskCoordinatorHeader
        progress={progress}
        isGenerating={isGenerating}
        tasksLength={tasks.length}
        onInitializeTasks={handleInitializeTasks}
        onStartGeneration={handleStartGeneration}
        onStartAdvancedGeneration={handleStartAdvancedGeneration}
      />

      <AgentTypeBreakdown tasks={tasks} />

      <RecentTaskActivity tasks={tasks} />
    </div>
  );
};
