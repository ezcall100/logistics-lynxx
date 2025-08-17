import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface OnboardingProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: number[];
  progressPercentage: number;
  lastUpdated: Date;
}

export const useOnboardingProgress = () => {
  const [progress, setProgress] = useState<OnboardingProgress>({
    currentStep: 1,
    totalSteps: 11,
    completedSteps: [],
    progressPercentage: 0,
    lastUpdated: new Date()
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const updateProgress = (step: number, totalSteps: number) => {
    const completedSteps = Array.from({ length: step - 1 }, (_, i) => i + 1);
    const progressPercentage = Math.round((step / totalSteps) * 100);

    const newProgress: OnboardingProgress = {
      currentStep: step,
      totalSteps,
      completedSteps,
      progressPercentage,
      lastUpdated: new Date()
    };

    setProgress(newProgress);

    // Save to database
    saveProgressToDatabase(newProgress);
  };

  const saveProgressToDatabase = async (progressData: OnboardingProgress) => {
    try {
      const { error } = await supabase
        .from('onboarding_progress')
        .upsert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          current_step: progressData.currentStep,
          total_steps: progressData.totalSteps,
          completed_steps: progressData.completedSteps,
          progress_percentage: progressData.progressPercentage,
          last_updated: progressData.lastUpdated.toISOString()
        });

      if (error) {
        console.error('Error saving progress:', error);
      }
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const loadProgressFromDatabase = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('onboarding_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading progress:', error);
        return;
      }

      if (data) {
        setProgress({
          currentStep: data.current_step,
          totalSteps: data.total_steps,
          completedSteps: data.completed_steps || [],
          progressPercentage: data.progress_percentage,
          lastUpdated: new Date(data.last_updated)
        });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const resetProgress = () => {
    const resetProgress: OnboardingProgress = {
      currentStep: 1,
      totalSteps: 11,
      completedSteps: [],
      progressPercentage: 0,
      lastUpdated: new Date()
    };

    setProgress(resetProgress);
    saveProgressToDatabase(resetProgress);
  };

  useEffect(() => {
    loadProgressFromDatabase();
  }, []);

  return {
    progress,
    updateProgress,
    resetProgress,
    loadProgressFromDatabase
  };
};
