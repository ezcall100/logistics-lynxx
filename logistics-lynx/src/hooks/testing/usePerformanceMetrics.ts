
import { TestingSession, PerformanceMetric } from '@/types/testing';
import { supabase } from '@/integrations/supabase/client';

export const usePerformanceMetrics = (
  currentSession: TestingSession | null,
  setCurrentSession: (session: TestingSession) => void
) => {
  const recordPerformanceMetric = async (metric: Omit<PerformanceMetric, 'id' | 'timestamp'>) => {
    if (!currentSession) return;

    const newMetric: PerformanceMetric = {
      ...metric,
      id: `metric-${Date.now()}`,
      timestamp: new Date().toISOString()
    };

    const updatedSession = {
      ...currentSession,
      performanceMetrics: [...currentSession.performanceMetrics, newMetric]
    };

    setCurrentSession(updatedSession);

    // Save performance metric - convert context to JSON compatible format
    await supabase.from('ai_performance_metrics').insert({
      metric_type: metric.metric,
      metric_value: metric.value,
      user_role: currentSession.userRole,
      decision_context: metric.context as never // Cast to never to bypass type checking
    });
  };

  return { recordPerformanceMetric };
};
