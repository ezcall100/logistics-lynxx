/* eslint-disable @typescript-eslint/no-explicit-any */

interface UserEvent {
  event_type: 'page_view' | 'click' | 'navigation' | 'feature_usage';
  event_data: Record<string, any>;
  page_path?: string;
  feature_name?: string;
  duration_ms: number;
  user_role?: string;
}

interface PerformanceMetric {
  metric_type: 'learning_progress' | 'prediction_accuracy' | 'adaptation_speed';
  metric_value: number;
  confidence_score: number;
  decision_context: Record<string, any>;
  user_role?: string;
  feature_area?: string;
}

export class AnalyticsService {
  private userRole: string = 'unknown';
  private sessionId: string;
  private events: UserEvent[] = [];
  private metrics: PerformanceMetric[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  async initialize(user: any): Promise<void> {
    try {
      if (user?.user_metadata) {
        this.userRole = user.user_metadata['role'] || 'unknown';
      }
    } catch (error) {
      console.error('Error initializing analytics:', error);
    }
  }

  async trackUserEvent(event: UserEvent): Promise<void> {
    try {
      // Store event in memory instead of Supabase
      this.events.push({
        ...event,
        user_role: event.user_role || this.userRole
      });
      console.log('Event tracked:', event);
    } catch (error) {
      console.error('Error tracking user event:', error);
    }
  }

  async trackPageView(path: string, duration?: number): Promise<void> {
    await this.trackUserEvent({
      event_type: 'page_view',
      event_data: { path },
      page_path: path,
      duration_ms: duration || 0
    });
  }

  async trackFeatureUsage(featureName: string, data?: Record<string, any>): Promise<void> {
    await this.trackUserEvent({
      event_type: 'feature_usage',
      event_data: data || {},
      feature_name: featureName,
      duration_ms: 0
    });
  }

  async trackClick(elementId: string, pagePath?: string): Promise<void> {
    await this.trackUserEvent({
      event_type: 'click',
      event_data: { elementId },
      page_path: pagePath || '',
      duration_ms: 0
    });
  }

  async trackNavigation(fromPath: string, toPath: string): Promise<void> {
    await this.trackUserEvent({
      event_type: 'navigation',
      event_data: { fromPath, toPath },
      page_path: toPath,
      duration_ms: 0
    });
  }

  async trackPerformanceMetric(metric: PerformanceMetric): Promise<void> {
    try {
      // Store metric in memory instead of Supabase
      this.metrics.push({
        ...metric,
        user_role: metric.user_role || this.userRole
      });
      console.log('Performance metric tracked:', metric);
    } catch (error) {
      console.error('Error tracking performance metric:', error);
    }
  }

  async getAnalyticsSummary(): Promise<any> {
    try {
      return {
        totalEvents: this.events.length,
        totalMetrics: this.metrics.length,
        sessionId: this.sessionId,
        userRole: this.userRole
      };
    } catch (error) {
      console.error('Error getting analytics summary:', error);
      return { totalEvents: 0, totalMetrics: 0, sessionId: this.sessionId, userRole: this.userRole };
    }
  }
}
