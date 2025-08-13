
import { TestingSession, UserFeedback } from '@/types/testing';
import { supabase } from '@/integrations/supabase/client';

export const useFeedbackSubmission = (
  currentSession: TestingSession | null,
  setCurrentSession: (session: TestingSession) => void
) => {
  const submitFeedback = async (feedback: Omit<UserFeedback, 'id' | 'timestamp'>) => {
    if (!currentSession) return;

    const newFeedback: UserFeedback = {
      ...feedback,
      id: `feedback-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    const updatedSession = {
      ...currentSession,
      feedback: [...currentSession.feedback, newFeedback]
    };

    setCurrentSession(updatedSession);

    // Save feedback to database - Convert UserFeedback to Json format
    await supabase.from('user_analytics').insert({
      user_id: currentSession.userId,
      session_id: currentSession.id,
      event_type: 'user_feedback',
      event_data: {
        id: newFeedback.id,
        feature: newFeedback.feature,
        rating: newFeedback.rating,
        comments: newFeedback.comments,
        timestamp: newFeedback.timestamp,
        category: newFeedback.category
      },
      user_role: currentSession.userRole
    });
  };

  return { submitFeedback };
};
