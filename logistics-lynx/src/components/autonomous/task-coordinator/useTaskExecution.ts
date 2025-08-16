/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';
import { useAutonomousAI } from '@/hooks/useAutonomousAI';
import { useBatchProcessing } from '../useBatchProcessing';

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

export const useTaskExecution = () => {
  const { callAutonomousAI } = useAutonomousAI();
  const { processBatchesWithRetry } = useBatchProcessing();

  const executeAgentTask = useCallback(async (
    task: AgentTask,
    updateTaskStatus: (taskId: string, updates: Partial<AgentTask>) => void
  ) => {
    // Update task status to in_progress
    updateTaskStatus(task.id, {
      status: 'in_progress',
      started_at: new Date().toISOString()
    });

    // Call appropriate autonomous AI function based on agent type
    const result = await callAutonomousAI('agent_task_execution', {
      task_id: task.id,
      agent_type: task.agent_type,
      portal: task.portal,
      task_description: task.description,
      dependencies: task.dependencies
    });

    // Update task as completed
    updateTaskStatus(task.id, {
      status: 'completed',
      completed_at: new Date().toISOString(),
      result: result
    });
  }, [callAutonomousAI]);

  const startAutonomousGeneration = useCallback(async (
    tasks: AgentTask[],
    updateTaskStatus: (taskId: string, updates: Partial<AgentTask>) => void
  ) => {
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    
    if (pendingTasks.length === 0) {
      console.log('No pending tasks to process');
      return;
    }

    // Sort tasks by priority and check dependencies
    const readyTasks = pendingTasks
      .filter(task => {
        // Check if dependencies are met
        const dependenciesMet = task.dependencies.every(depId => 
          tasks.find(t => t.id === depId)?.status === 'completed'
        );
        return dependenciesMet;
      })
      .sort((a, b) => a.priority - b.priority);

    console.log(`Starting autonomous generation for ${readyTasks.length} ready tasks`);

    // Enhanced batch processing with retry mechanisms
    await processBatchesWithRetry(
      readyTasks,
      (task) => executeAgentTask(task, updateTaskStatus),
      updateTaskStatus,
      {
        batchSize: 25, // Smaller batches for better reliability
        delayBetweenBatches: 5000, // 5 second delay between batches
        concurrencyLimit: 3, // Lower concurrency to avoid overwhelming APIs
        maxRetries: 3 // 3 retry attempts per task
      }
    );
  }, [executeAgentTask, processBatchesWithRetry]);

  const startAutonomousGenerationAdvanced = useCallback(async (
    tasks: AgentTask[],
    updateTaskStatus: (taskId: string, updates: Partial<AgentTask>) => void,
    config?: {
      batchSize?: number;
      delayBetweenBatches?: number;
      concurrencyLimit?: number;
      maxRetries?: number;
    }
  ) => {
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    
    if (pendingTasks.length === 0) {
      console.log('No pending tasks to process');
      return;
    }

    // Sort tasks by priority and check dependencies
    const readyTasks = pendingTasks
      .filter(task => {
        const dependenciesMet = task.dependencies.every(depId => 
          tasks.find(t => t.id === depId)?.status === 'completed'
        );
        return dependenciesMet;
      })
      .sort((a, b) => a.priority - b.priority);

    console.log(`Starting advanced autonomous generation for ${readyTasks.length} ready tasks`);

    // Use custom configuration or defaults
    const batchConfig = {
      batchSize: config?.batchSize || 25,
      delayBetweenBatches: config?.delayBetweenBatches || 5000,
      concurrencyLimit: config?.concurrencyLimit || 3,
      maxRetries: config?.maxRetries || 3
    };

    await processBatchesWithRetry(
      readyTasks,
      (task) => executeAgentTask(task, updateTaskStatus),
      updateTaskStatus,
      batchConfig
    );
  }, [executeAgentTask, processBatchesWithRetry]);

  return {
    executeAgentTask,
    startAutonomousGeneration,
    startAutonomousGenerationAdvanced
  };
};
