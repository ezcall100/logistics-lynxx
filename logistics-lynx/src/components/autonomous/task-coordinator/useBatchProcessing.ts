/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';

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

interface BatchConfig {
  batchSize: number;
  delayBetweenBatches: number;
  concurrencyLimit: number;
  maxRetries: number;
}

export const useBatchProcessing = () => {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const processBatch = useCallback(async (
    batch: AgentTask[], 
    executeTask: (task: AgentTask) => Promise<void>,
    concurrencyLimit: number = 5
  ) => {
    const semaphore = {
      count: concurrencyLimit,
      waiting: [] as (() => void)[]
    };

    const acquire = () => new Promise<void>(resolve => {
      if (semaphore.count > 0) {
        semaphore.count--;
        resolve();
      } else {
        semaphore.waiting.push(resolve);
      }
    });

    const release = () => {
      semaphore.count++;
      if (semaphore.waiting.length > 0) {
        const next = semaphore.waiting.shift();
        if (next) {
          semaphore.count--;
          next();
        }
      }
    };

    const processWithSemaphore = async (task: AgentTask) => {
      await acquire();
      try {
        await executeTask(task);
      } finally {
        release();
      }
    };

    // Process all tasks in the batch with concurrency control
    await Promise.allSettled(batch.map(processWithSemaphore));
  }, []);

  const processBatchesWithRetry = useCallback(async (
    tasks: AgentTask[],
    executeTask: (task: AgentTask) => Promise<void>,
    updateTaskStatus: (taskId: string, updates: Partial<AgentTask>) => void,
    config: BatchConfig = {
      batchSize: 50,
      delayBetweenBatches: 3000,
      concurrencyLimit: 5,
      maxRetries: 3
    }
  ) => {
    const { batchSize, delayBetweenBatches, concurrencyLimit, maxRetries } = config;
    
    // Group tasks into batches
    const batches: AgentTask[][] = [];
    for (let i = 0; i < tasks.length; i += batchSize) {
      batches.push(tasks.slice(i, i + batchSize));
    }

    console.log(`Processing ${tasks.length} agents in ${batches.length} batches of ${batchSize}`);

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(`Starting batch ${batchIndex + 1}/${batches.length} with ${batch.length} agents`);

      // Create enhanced execute function with retry logic
      const executeWithRetry = async (task: AgentTask) => {
        let attempts = 0;
        let lastError: unknown;

        while (attempts < maxRetries) {
          try {
            await executeTask(task);
            return; // Success, exit retry loop
          } catch (error) {
            attempts++;
            lastError = error;
            
            if (attempts < maxRetries) {
              const retryDelay = Math.pow(2, attempts) * 1000; // Exponential backoff
              console.log(`Agent ${task.id} failed, retrying in ${retryDelay}ms (attempt ${attempts}/${maxRetries})`);
              await delay(retryDelay);
            }
          }
        }

        // All retries failed, mark as failed
        console.error(`Agent ${task.id} failed after ${maxRetries} attempts:`, lastError);
        updateTaskStatus(task.id, {
          status: 'failed',
          completed_at: new Date().toISOString(),
          result: { error: lastError?.message || 'Max retries exceeded' }
        });
      };

      // Process the current batch
      await processBatch(batch, executeWithRetry, concurrencyLimit);

      // Add delay between batches (except for the last batch)
      if (batchIndex < batches.length - 1) {
        console.log(`Batch ${batchIndex + 1} completed. Waiting ${delayBetweenBatches}ms before next batch...`);
        await delay(delayBetweenBatches);
      }
    }

    console.log('All batches completed');
  }, [processBatch]);

  return {
    processBatch,
    processBatchesWithRetry
  };
};
