/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { TestingSession } from '@/types/testing';
import { supabase } from '@/integrations/supabase/client';

export const useTestingSession = () => {
  const [currentSession, setCurrentSession] = useState<TestingSession | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startTestingSession = async (userId: string, userRole: string) => {
    const session: TestingSession = {
      id: `session-${Date.now()}`,
      userId,
      userRole,
      sessionStart: new Date().toISOString(),
      completedTasks: [],
      feedback: [],
      performanceMetrics: []
    };

    setCurrentSession(session);
    setIsRecording(true);

    // Log session start
    await supabase.from('user_analytics').insert({
      user_id: userId,
      session_id: session.id,
      event_type: 'testing_session_start',
      event_data: { testing_framework: true },
      user_role: userRole
    });
  };

  const endTestingSession = async () => {
    if (!currentSession) return;

    const updatedSession = {
      ...currentSession,
      sessionEnd: new Date().toISOString()
    };

    setCurrentSession(updatedSession);
    setIsRecording(false);

    // Save session data
    await supabase.from('user_analytics').insert({
      user_id: currentSession.userId,
      session_id: currentSession.id,
      event_type: 'testing_session_end',
      event_data: {
        duration_minutes: Math.round((Date.now() - new Date(currentSession.sessionStart).getTime()) / 60000),
        completed_tasks: currentSession.completedTasks.length,
        total_feedback: currentSession.feedback.length
      },
      user_role: currentSession.userRole
    });
  };

  return {
    currentSession,
    isRecording,
    startTestingSession,
    endTestingSession,
    setCurrentSession
  };
};
