/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';

interface BatchConfig {
  batchSize: number;
  delayBetweenBatches: number;
  concurrencyLimit: number;
  maxRetries: number;
}

interface TaskUpdateFunction<T> {
  (taskId: string, updates: Partial<T>): void;
}

export const useBatchProcessing = () => {
  const processBatchesWithRetry = useCallback(async <T extends { id: string; status: string }>(
    tasks: T[],
    processTask: (task: T) => Promise<void>,
    updateTaskStatus: TaskUpdateFunction<T>,
    config: BatchConfig
  ) => {
    const { batchSize, delayBetweenBatches, concurrencyLimit, maxRetries } = config;
    
    // Split tasks into batches
    const batches: T[][] = [];
    for (let i = 0; i < tasks.length; i += batchSize) {
      batches.push(tasks.slice(i, i + batchSize));
    }

    console.log(`Processing ${tasks.length} tasks in ${batches.length} batches`);

    // Process batches sequentially with delay
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(`Processing batch ${batchIndex + 1}/${batches.length} with ${batch.length} tasks`);

      // Process tasks in current batch with concurrency limit
      const batchPromises = batch.map(async (task) => {
        let retryCount = 0;
        
        while (retryCount <= maxRetries) {
          try {
            // Update task status to in_progress
            updateTaskStatus(task.id, { status: 'in_progress' as any });
            
            // Process the task
            await processTask(task);
            
            // Update task status to completed
            updateTaskStatus(task.id, { status: 'completed' as any });
            
            console.log(`✅ Task ${task.id} completed successfully`);
            break; // Success, exit retry loop
            
          } catch (error) {
            retryCount++;
            console.error(`❌ Task ${task.id} failed (attempt ${retryCount}/${maxRetries + 1}):`, error);
            
            if (retryCount > maxRetries) {
              // Max retries exceeded, mark as failed
              updateTaskStatus(task.id, { 
                status: 'failed' as any,
                result: { error: error instanceof Error ? error.message : 'Unknown error' }
              });
              console.error(`💥 Task ${task.id} failed permanently after ${maxRetries + 1} attempts`);
            } else {
              // Wait before retry with exponential backoff
              const backoffDelay = Math.min(1000 * Math.pow(2, retryCount - 1), 10000);
              console.log(`⏳ Retrying task ${task.id} in ${backoffDelay}ms...`);
              await new Promise(resolve => setTimeout(resolve, backoffDelay));
            }
          }
        }
      });

      // Process batch with concurrency limit
      const concurrencyChunks = [];
      for (let i = 0; i < batchPromises.length; i += concurrencyLimit) {
        concurrencyChunks.push(batchPromises.slice(i, i + concurrencyLimit));
      }

      for (const chunk of concurrencyChunks) {
        await Promise.allSettled(chunk);
      }

      // Delay between batches (except for the last batch)
      if (batchIndex < batches.length - 1) {
        console.log(`⏳ Waiting ${delayBetweenBatches}ms before next batch...`);
        await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
      }
    }

    console.log('🎉 Batch processing completed');
  }, []);

  const processTasksSequentially = useCallback(async <T extends { id: string; status: string }>(
    tasks: T[],
    processTask: (task: T) => Promise<void>,
    updateTaskStatus: TaskUpdateFunction<T>,
    config?: Partial<BatchConfig>
  ) => {
    const defaultConfig: BatchConfig = {
      batchSize: 1,
      delayBetweenBatches: 1000,
      concurrencyLimit: 1,
      maxRetries: 3
    };

    const finalConfig = { ...defaultConfig, ...config };
    
    console.log(`Processing ${tasks.length} tasks sequentially`);
    
    for (const task of tasks) {
      let retryCount = 0;
      
      while (retryCount <= finalConfig.maxRetries) {
        try {
          updateTaskStatus(task.id, { status: 'in_progress' as any });
          await processTask(task);
          updateTaskStatus(task.id, { status: 'completed' as any });
          console.log(`✅ Task ${task.id} completed`);
          break;
        } catch (error) {
          retryCount++;
          console.error(`❌ Task ${task.id} failed (attempt ${retryCount}/${finalConfig.maxRetries + 1}):`, error);
          
          if (retryCount > finalConfig.maxRetries) {
            updateTaskStatus(task.id, { 
              status: 'failed' as any,
              result: { error: error instanceof Error ? error.message : 'Unknown error' }
            });
          } else {
            await new Promise(resolve => setTimeout(resolve, finalConfig.delayBetweenBatches));
          }
        }
      }
    }
  }, []);

  const processTasksWithPriority = useCallback(async <T extends { id: string; status: string; priority?: number }>(
    tasks: T[],
    processTask: (task: T) => Promise<void>,
    updateTaskStatus: TaskUpdateFunction<T>,
    config?: Partial<BatchConfig>
  ) => {
    // Sort tasks by priority (higher priority first)
    const sortedTasks = [...tasks].sort((a, b) => {
      const priorityA = a.priority || 0;
      const priorityB = b.priority || 0;
      return priorityB - priorityA;
    });

    console.log(`Processing ${sortedTasks.length} tasks by priority`);
    
    await processTasksSequentially(sortedTasks, processTask, updateTaskStatus, config);
  }, [processTasksSequentially]);

  return {
    processBatchesWithRetry,
    processTasksSequentially,
    processTasksWithPriority
  };
};
