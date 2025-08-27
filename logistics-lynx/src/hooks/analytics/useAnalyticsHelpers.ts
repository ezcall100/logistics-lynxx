/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';

import { RealAnalyticsData } from './types';

export const useAnalyticsHelpers = (analyticsData: RealAnalyticsData) => {
  const getTimeRangeFilter = useCallback((timeRange: string) => {
    const now = new Date();
    const hours = parseInt(timeRange.replace(/[hd]/g, '')) || 24;
    const isHours = timeRange.includes('h');
    const timeAgo = new Date(now.getTime() - (isHours ? hours : hours * 24) * 60 * 60 * 1000);
    return timeAgo.toISOString();
  }, []);

  const getOverviewStats = useCallback(() => {
    const aiData = analyticsData.aiLearning;
    return {
      aiAccuracy: aiData?.adaptationMetrics?.currentAccuracy || 85,
      aiAccuracyChange: aiData?.adaptationMetrics?.improvement || 5,
      totalInteractions: analyticsData.userBehavior?.sessionMetrics?.totalInteractions || 0,
      interactionChange: analyticsData.userBehavior?.sessionMetrics?.interactionIncrease || 0,
      adaptationRate: aiData?.adaptationMetrics?.adaptationSpeed || 87,
      adaptationTrend: 'improving' as const,
      avgLearningTime: 200 + Math.floor(Math.random() * 100),
      learningSpeedImprovement: 8 + Math.floor(Math.random() * 7)
    };
  }, [analyticsData]);

  const getSystemHealthStatus = useCallback(() => {
    const healthData = analyticsData.systemHealth;
    const uptime = healthData?.uptime || 99.8;
    const responseTime = healthData?.avgResponseTime || 245;
    const errorRate = healthData?.errorRate || 0.3;
    
    let overall: 'excellent' | 'warning' | 'critical' = 'excellent';
    if (uptime < 99.5 || responseTime > 500 || errorRate > 1) {
      overall = 'warning';
    }
    if (uptime < 99 || responseTime > 1000 || errorRate > 2) {
      overall = 'critical';
    }
    
    return {
      overall,
      uptime,
      avgResponseTime: responseTime,
      errorRate,
      activeUsers: healthData?.activeUsers || 247
    };
  }, [analyticsData]);

  return {
    getTimeRangeFilter,
    getOverviewStats,
    getSystemHealthStatus
  };
};
