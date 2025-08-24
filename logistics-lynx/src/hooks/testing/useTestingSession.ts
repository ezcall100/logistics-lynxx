/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { TestingSession } from '@/types/testing';
import { supabase } from '@/integrations/supabase/client';

export const useTestingSession = () => {
  const [currentSession, setCurrentSession] = useState<TestingSession | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const createSession = async (userId: string, userRole: string) => {
    const session: TestingSession = {
      id: Date.now().toString(),
      user_id: userId,
      userId,
      userRole,
      sessionStart: new Date().toISOString(),
      completedTasks: [],
      feedback: [],
      performanceMetrics: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    };

    setCurrentSession(session);
    return session;
  };

  const startTestingSession = async (userId: string, userRole: string) => {
    const session: TestingSession = {
      id: Date.now().toString(),
      user_id: userId,
      userId,
      userRole,
      sessionStart: new Date().toISOString(),
      completedTasks: [],
      feedback: [],
      performanceMetrics: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    };

    setCurrentSession(session);
    return session;
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
