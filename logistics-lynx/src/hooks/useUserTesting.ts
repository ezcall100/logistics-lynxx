/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { TestingTask } from '@/types/testing';
import { useTestingTasks } from './testing/useTestingTasks';

export const useUserTesting = () => {
  const { tasks } = useTestingTasks();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isTesting, setIsTesting] = useState(false);

  const startTesting = () => {
    setIsTesting(true);
    setCurrentTaskIndex(0);
  };

  const completeCurrentTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(prev => prev + 1);
    } else {
      setIsTesting(false);
    }
  };

  const getCurrentTask = (): TestingTask | null => {
    return tasks[currentTaskIndex] || null;
  };

  const getProgress = () => {
    return {
      current: currentTaskIndex + 1,
      total: tasks.length,
      percentage: ((currentTaskIndex + 1) / tasks.length) * 100
    };
  };

  return {
    tasks,
    currentTask: getCurrentTask(),
    isTesting,
    progress: getProgress(),
    startTesting,
    completeCurrentTask
  };
};

// Re-export types for convenience
export type { TestingSession, UserFeedback, PerformanceMetric, TestingTask } from '@/types/testing';

export default useUserTesting;