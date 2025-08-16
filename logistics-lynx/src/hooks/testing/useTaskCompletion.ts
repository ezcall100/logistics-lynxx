/* eslint-disable @typescript-eslint/no-explicit-any */

import { TestingSession } from '@/types/testing';
import { supabase } from '@/integrations/supabase/client';

export const useTaskCompletion = (
  currentSession: TestingSession | null,
  setCurrentSession: (session: TestingSession) => void
) => {
  const completeTask = async (taskId: string, notes?: string) => {
    if (!currentSession) return;

    const updatedSession = {
      ...currentSession,
      completedTasks: [...currentSession.completedTasks, taskId]
    };

    setCurrentSession(updatedSession);

    // Log task completion
    await supabase.from('user_analytics').insert({
      user_id: currentSession.userId,
      session_id: currentSession.id,
      event_type: 'task_completed',
      event_data: { task_id: taskId, notes },
      user_role: currentSession.userRole
    });
  };

  return { completeTask };
};
