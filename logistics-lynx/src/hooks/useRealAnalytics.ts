/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RealAnalyticsData } from './analytics/types';
import { useAILearningData } from './analytics/useAILearningData';
import { useUserBehaviorData } from './analytics/useUserBehaviorData';
import { useSystemHealthData } from './analytics/useSystemHealthData';
import { useRoleMetricsData } from './analytics/useRoleMetricsData';
import { useAnalyticsHelpers } from './analytics/useAnalyticsHelpers';

export const useRealAnalytics = (timeRange: string = '24h', selectedRole: string = 'all') => {
  const [analyticsData, setAnalyticsData] = useState<RealAnalyticsData>({
    aiLearning: null,
    userBehavior: null,
    roleMetrics: null,
    systemHealth: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const { fetchAILearningData } = useAILearningData();
  const { fetchUserBehaviorData } = useUserBehaviorData();
  const { fetchSystemHealthData } = useSystemHealthData();
  const { fetchRoleMetricsData } = useRoleMetricsData();
  const { getTimeRangeFilter, getOverviewStats, getSystemHealthStatus } = useAnalyticsHelpers(analyticsData);

  const fetchAnalyticsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const timeFilter = getTimeRangeFilter(timeRange);
      
      const [aiLearning, userBehavior, systemHealth, roleMetrics] = await Promise.all([
        fetchAILearningData(timeFilter),
        fetchUserBehaviorData(timeFilter),
        fetchSystemHealthData(timeFilter),
        fetchRoleMetricsData(timeFilter)
      ]);

      setAnalyticsData({
        aiLearning,
        userBehavior,
        systemHealth,
        roleMetrics
      });
    } catch (error) {
      console.error('Error fetching real analytics data:', error);
      toast({
        title: "Analytics Error",
        description: "Failed to fetch real analytics data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchAILearningData, fetchUserBehaviorData, fetchSystemHealthData, fetchRoleMetricsData, getTimeRangeFilter, timeRange, toast]);

  const refreshAnalytics = useCallback(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [fetchAnalyticsData]);

  // Set up real-time subscriptions
  useEffect(() => {
    const aiMetricsChannel = supabase
      .channel('ai-metrics-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ai_performance_metrics' }, 
        () => fetchAnalyticsData())
      .subscribe();

    const userAnalyticsChannel = supabase
      .channel('user-analytics-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_analytics' }, 
        () => fetchAnalyticsData())
      .subscribe();

    const systemHealthChannel = supabase
      .channel('system-health-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'system_health_metrics' }, 
        () => fetchAnalyticsData())
      .subscribe();

    return () => {
      supabase.removeChannel(aiMetricsChannel);
      supabase.removeChannel(userAnalyticsChannel);
      supabase.removeChannel(systemHealthChannel);
    };
  }, [fetchAnalyticsData]);

  return {
    analyticsData,
    isLoading,
    refreshAnalytics,
    getOverviewStats,
    getSystemHealthStatus
  };
};
