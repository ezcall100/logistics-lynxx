/* eslint-disable @typescript-eslint/no-explicit-any */

import { useTestingTasks } from './testing/useTestingTasks';
import { useTestingSession } from './testing/useTestingSession';
import { useTaskCompletion } from './testing/useTaskCompletion';
import { useFeedbackSubmission } from './testing/useFeedbackSubmission';
import { usePerformanceMetrics } from './testing/usePerformanceMetrics';

export const useUserTesting = () => {
  const { testingTasks } = useTestingTasks();
  const { currentSession, isRecording, startTestingSession, endTestingSession, setCurrentSession } = useTestingSession();
  const { completeTask } = useTaskCompletion(currentSession, setCurrentSession);
  const { submitFeedback } = useFeedbackSubmission(currentSession, setCurrentSession);
  const { recordPerformanceMetric } = usePerformanceMetrics(currentSession, setCurrentSession);

  return {
    currentSession,
    isRecording,
    testingTasks,
    startTestingSession,
    endTestingSession,
    completeTask,
    submitFeedback,
    recordPerformanceMetric
  };
};

// Re-export types for convenience
export type { TestingSession, UserFeedback, PerformanceMetric, TestingTask } from '@/types/testing';
