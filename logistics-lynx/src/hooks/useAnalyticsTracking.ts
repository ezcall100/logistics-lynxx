
import { useEffect, useCallback } from 'react';
import { analyticsService } from '@/services/analyticsService';
import { useAuth } from '@/context/AuthContext';

export const useAnalyticsTracking = () => {
  const { user, selectedRole } = useAuth();
  const userRole = selectedRole || user?.role;

  const trackFeatureUsage = useCallback((featureName: string, additionalData: unknown = {}) => {
    analyticsService.trackFeatureUsage(featureName, additionalData);
  }, []);

  const trackClick = useCallback((element: string, additionalData: unknown = {}) => {
    analyticsService.trackClick(element, additionalData);
  }, []);

  const trackAIDecision = useCallback((
    decisionType: 'prediction_accuracy' | 'learning_progress' | 'adaptation_speed',
    value: number,
    confidence?: number,
    context: unknown = {},
    featureArea?: string
  ) => {
    analyticsService.logAIMetric({
      metric_type: decisionType,
      metric_value: value,
      confidence_score: confidence,
      decision_context: context,
      user_role: userRole,
      feature_area: featureArea
    });
  }, [userRole]);

  const trackSystemMetric = useCallback((
    metricName: 'cpu_usage' | 'memory_usage' | 'response_time' | 'error_rate',
    value: number,
    unit: 'percentage' | 'milliseconds' | 'count'
  ) => {
    analyticsService.logSystemHealth({
      metric_name: metricName,
      metric_value: value,
      unit
    });
  }, []);

  // Auto-track performance metrics
  useEffect(() => {
    if (!user) return;

    const trackPerformanceMetrics = () => {
      // Track page load time
      if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        if (loadTime > 0) {
          trackSystemMetric('response_time', loadTime, 'milliseconds');
        }
      }

      // Track memory usage if available
      if ('memory' in performance) {
        const memoryInfo = (performance as unknown).memory;
        const memoryUsage = (memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100;
        trackSystemMetric('memory_usage', memoryUsage, 'percentage');
      }
    };

    // Track performance on page load
    if (document.readyState === 'complete') {
      trackPerformanceMetrics();
    } else {
      window.addEventListener('load', trackPerformanceMetrics);
    }

    return () => {
      window.removeEventListener('load', trackPerformanceMetrics);
    };
  }, [user, trackSystemMetric]);

  return {
    trackFeatureUsage,
    trackClick,
    trackAIDecision,
    trackSystemMetric
  };
};
