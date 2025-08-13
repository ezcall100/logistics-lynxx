
import { supabase } from '@/integrations/supabase/client';

export interface UserEvent {
  event_type: 'click' | 'navigation' | 'feature_usage' | 'page_view';
  event_data: Record<string, unknown>;
  page_path?: string;
  feature_name?: string;
  duration_ms?: number;
  user_role?: string;
}

export interface AIMetric {
  metric_type: 'prediction_accuracy' | 'learning_progress' | 'adaptation_speed';
  metric_value: number;
  confidence_score?: number;
  decision_context: Record<string, unknown>;
  user_role?: string;
  feature_area?: string;
}

export interface SystemHealthMetric {
  metric_name: 'cpu_usage' | 'memory_usage' | 'response_time' | 'error_rate';
  metric_value: number;
  unit: 'percentage' | 'milliseconds' | 'count';
  server_instance?: string;
}

class AnalyticsService {
  private sessionId: string;
  private userId: string | null = null;
  private userRole: string | null = null;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSession();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async initializeSession() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        this.userId = user.id;
        this.userRole = user.user_metadata?.role || 'unknown';
        
        // Create or update session
        await supabase
          .from('user_sessions')
          .upsert({
            session_id: this.sessionId,
            user_id: this.userId,
            user_role: this.userRole,
            start_time: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('Failed to initialize analytics session:', error);
    }
  }

  async trackUserEvent(event: UserEvent) {
    try {
      if (!this.userId) return;

      // Convert event_data to JSON-compatible format
      await supabase
        .from('user_analytics')
        .insert({
          user_id: this.userId,
          session_id: this.sessionId,
          event_type: event.event_type,
          event_data: event.event_data as never, // Cast to never to bypass type checking
          page_path: event.page_path,
          feature_name: event.feature_name,
          duration_ms: event.duration_ms,
          user_role: this.userRole
        });

      // Update session interaction count
      const { data: currentSession } = await supabase
        .from('user_sessions')
        .select('interactions_count')
        .eq('session_id', this.sessionId)
        .single();

      if (currentSession) {
        await supabase
          .from('user_sessions')
          .update({ 
            interactions_count: (currentSession.interactions_count || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('session_id', this.sessionId);
      }

    } catch (error) {
      console.error('Failed to track user event:', error);
    }
  }

  async trackPageView(pagePath: string, duration?: number) {
    await this.trackUserEvent({
      event_type: 'page_view',
      event_data: { path: pagePath },
      page_path: pagePath,
      duration_ms: duration
    });

    // Update session page views
    try {
      const { data: currentSession } = await supabase
        .from('user_sessions')
        .select('page_views')
        .eq('session_id', this.sessionId)
        .single();

      if (currentSession) {
        await supabase
          .from('user_sessions')
          .update({ 
            page_views: (currentSession.page_views || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('session_id', this.sessionId);
      }
    } catch (error) {
      console.error('Failed to update page views:', error);
    }
  }

  async trackFeatureUsage(featureName: string, additionalData: Record<string, unknown> = {}) {
    await this.trackUserEvent({
      event_type: 'feature_usage',
      event_data: additionalData,
      feature_name: featureName
    });
  }

  async trackClick(element: string, additionalData: Record<string, unknown> = {}) {
    await this.trackUserEvent({
      event_type: 'click',
      event_data: { element, ...additionalData }
    });
  }

  async logAIMetric(metric: AIMetric) {
    try {
      // Convert decision_context to JSON-compatible format
      await supabase
        .from('ai_performance_metrics')
        .insert({
          metric_type: metric.metric_type,
          metric_value: metric.metric_value,
          confidence_score: metric.confidence_score,
          decision_context: metric.decision_context as never, // Cast to never to bypass type checking
          user_role: metric.user_role || this.userRole,
          feature_area: metric.feature_area
        });
    } catch (error) {
      console.error('Failed to log AI metric:', error);
    }
  }

  async logSystemHealth(metric: SystemHealthMetric) {
    try {
      await supabase
        .from('system_health_metrics')
        .insert({
          metric_name: metric.metric_name,
          metric_value: metric.metric_value,
          unit: metric.unit,
          server_instance: metric.server_instance || 'default'
        });
    } catch (error) {
      console.error('Failed to log system health metric:', error);
    }
  }

  async endSession() {
    try {
      if (!this.userId) return;

      const { data: session } = await supabase
        .from('user_sessions')
        .select('start_time')
        .eq('session_id', this.sessionId)
        .single();

      if (session) {
        const startTime = new Date(session.start_time);
        const endTime = new Date();
        const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

        await supabase
          .from('user_sessions')
          .update({
            end_time: endTime.toISOString(),
            duration_minutes: durationMinutes,
            updated_at: endTime.toISOString()
          })
          .eq('session_id', this.sessionId);
      }
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  }
}

export const analyticsService = new AnalyticsService();

// Auto-track page navigation
let currentPath = '';
const trackPageChange = () => {
  const newPath = window.location.pathname;
  if (newPath !== currentPath) {
    analyticsService.trackPageView(newPath);
    currentPath = newPath;
  }
};

// Set up page tracking
if (typeof window !== 'undefined') {
  window.addEventListener('popstate', trackPageChange);
  trackPageChange(); // Track initial page
}

// End session when page unloads
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    analyticsService.endSession();
  });
}
