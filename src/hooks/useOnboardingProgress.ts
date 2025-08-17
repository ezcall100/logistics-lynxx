// Onboarding Progress Hook
// Phase 7.3: Carrier & Broker Risk Management Onboarding

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface OnboardingProgress {
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
  progressPercentage: number;
  lastUpdated: Date;
  isCompleted: boolean;
}

interface StepCompletion {
  stepId: number;
  completedAt: Date;
  data: any;
}

export const useOnboardingProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<OnboardingProgress>({
    currentStep: 1,
    completedSteps: [],
    totalSteps: 11,
    progressPercentage: 0,
    lastUpdated: new Date(),
    isCompleted: false
  });
  const [stepCompletions, setStepCompletions] = useState<StepCompletion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing progress on mount
  useEffect(() => {
    if (user) {
      loadProgress();
    }
  }, [user]);

  const loadProgress = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // This would load from your database
      // For now, we'll simulate loading from localStorage
      const savedProgress = localStorage.getItem(`onboarding_progress_${user?.id}`);
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        setProgress(parsedProgress);
      }

      const savedCompletions = localStorage.getItem(`step_completions_${user?.id}`);
      if (savedCompletions) {
        const parsedCompletions = JSON.parse(savedCompletions);
        setStepCompletions(parsedCompletions);
      }

    } catch (error) {
      console.error('Error loading onboarding progress:', error);
      setError('Failed to load progress');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (stepId: number, stepData?: any) => {
    try {
      setError(null);

      const newCompletedSteps = progress.completedSteps.includes(stepId)
        ? progress.completedSteps
        : [...progress.completedSteps, stepId];

      const newProgress: OnboardingProgress = {
        currentStep: Math.min(stepId + 1, progress.totalSteps),
        completedSteps: newCompletedSteps,
        totalSteps: progress.totalSteps,
        progressPercentage: Math.round((newCompletedSteps.length / progress.totalSteps) * 100),
        lastUpdated: new Date(),
        isCompleted: newCompletedSteps.length === progress.totalSteps
      };

      setProgress(newProgress);

      // Save step completion
      if (stepData) {
        const newCompletion: StepCompletion = {
          stepId,
          completedAt: new Date(),
          data: stepData
        };

        const newCompletions = stepCompletions.filter(c => c.stepId !== stepId);
        newCompletions.push(newCompletion);
        setStepCompletions(newCompletions);

        // Save to localStorage (in production, this would be saved to database)
        localStorage.setItem(`onboarding_progress_${user?.id}`, JSON.stringify(newProgress));
        localStorage.setItem(`step_completions_${user?.id}`, JSON.stringify(newCompletions));
      }

      // Log progress to audit trail
      await logProgressUpdate(stepId, stepData);

    } catch (error) {
      console.error('Error updating onboarding progress:', error);
      setError('Failed to update progress');
    }
  };

  const setCurrentStep = (stepId: number) => {
    setProgress(prev => ({
      ...prev,
      currentStep: stepId
    }));
  };

  const markStepComplete = async (stepId: number, stepData?: any) => {
    await updateProgress(stepId, stepData);
  };

  const resetProgress = async () => {
    try {
      setProgress({
        currentStep: 1,
        completedSteps: [],
        totalSteps: 11,
        progressPercentage: 0,
        lastUpdated: new Date(),
        isCompleted: false
      });
      setStepCompletions([]);

      // Clear from localStorage
      localStorage.removeItem(`onboarding_progress_${user?.id}`);
      localStorage.removeItem(`step_completions_${user?.id}`);

      // Log reset to audit trail
      await logProgressUpdate(0, { action: 'reset' });

    } catch (error) {
      console.error('Error resetting onboarding progress:', error);
      setError('Failed to reset progress');
    }
  };

  const getStepStatus = (stepId: number) => {
    if (progress.completedSteps.includes(stepId)) {
      return 'completed';
    } else if (stepId === progress.currentStep) {
      return 'current';
    } else if (stepId < progress.currentStep) {
      return 'available';
    } else {
      return 'locked';
    }
  };

  const getStepData = (stepId: number) => {
    return stepCompletions.find(completion => completion.stepId === stepId)?.data || null;
  };

  const isStepAccessible = (stepId: number) => {
    // Allow access to current step and completed steps
    return stepId <= progress.currentStep || progress.completedSteps.includes(stepId);
  };

  const getProgressSummary = () => {
    return {
      totalSteps: progress.totalSteps,
      completedSteps: progress.completedSteps.length,
      remainingSteps: progress.totalSteps - progress.completedSteps.length,
      progressPercentage: progress.progressPercentage,
      estimatedTimeRemaining: calculateEstimatedTimeRemaining(),
      isOnTrack: progress.progressPercentage >= (progress.currentStep / progress.totalSteps) * 100
    };
  };

  const calculateEstimatedTimeRemaining = () => {
    // Simple estimation based on average time per step
    const averageTimePerStep = 15; // minutes
    const remainingSteps = progress.totalSteps - progress.completedSteps.length;
    return remainingSteps * averageTimePerStep;
  };

  const logProgressUpdate = async (stepId: number, stepData?: any) => {
    try {
      // This would log to your audit trail
      const auditEntry = {
        userId: user?.id,
        action: 'onboarding_progress_update',
        stepId,
        stepData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ipAddress: '' // Would be captured server-side
      };

      console.log('Audit log entry:', auditEntry);
      
      // In production, this would be saved to your audit log table
      // await supabase.from('audit_log').insert(auditEntry);

    } catch (error) {
      console.error('Error logging progress update:', error);
    }
  };

  const exportProgress = () => {
    return {
      progress,
      stepCompletions,
      summary: getProgressSummary(),
      exportedAt: new Date().toISOString()
    };
  };

  return {
    progress,
    stepCompletions,
    isLoading,
    error,
    updateProgress,
    setCurrentStep,
    markStepComplete,
    resetProgress,
    getStepStatus,
    getStepData,
    isStepAccessible,
    getProgressSummary,
    exportProgress
  };
};
