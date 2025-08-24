/* eslint-disable @typescript-eslint/no-explicit-any */

import { analyticsService } from '../services/analyticsService';

export const useAnalyticsTracking = () => {
  const trackFeatureUsage = (featureName: string, additionalData?: any) => {
    analyticsService.trackFeatureUsage(featureName, additionalData as Record<string, unknown>);
  };

  const trackClick = (element: string, additionalData?: any) => {
    analyticsService.trackClick(element, additionalData as Record<string, unknown>);
  };

  const trackAIDecision = (decisionType: string, context: any, confidence: number) => {
    analyticsService.trackAIDecision({
      decision_type: decisionType,
      decision_context: context as Record<string, unknown>,
      confidence_score: confidence,
      timestamp: new Date().toISOString()
    });
  };

  const trackPerformance = () => {
    const performanceData = {
      load_time: performance.now(),
      memory_usage: 0,
      cpu_usage: 0
    };

    // Try to get memory info if available
    try {
      const memoryInfo = (performance as any).memory;
      if (memoryInfo) {
        performanceData.memory_usage = memoryInfo.usedJSHeapSize;
      }
    } catch (error) {
      console.log('Memory info not available');
    }

    analyticsService.trackPerformance(performanceData);
  };

  return {
    trackFeatureUsage,
    trackClick,
    trackAIDecision,
    trackPerformance
  };
};
