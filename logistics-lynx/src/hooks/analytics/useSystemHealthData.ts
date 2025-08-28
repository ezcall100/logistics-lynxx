/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';

import { supabase } from '@/integrations/supabase/client';
import { SystemHealthData } from './types';

export const useSystemHealthData = () => {
  const fetchSystemHealthData = useCallback(async (timeFilter: string): Promise<SystemHealthData | null> => {
    const { data: healthMetrics } = await supabase
      .from('system_health_metrics')
      .select('*')
      .gte('timestamp', timeFilter)
      .order('timestamp', { ascending: true });

    if (!healthMetrics) return null;

    // Process performance data
    const performance = healthMetrics.map(metric => ({
      timestamp: metric.timestamp,
      cpu: metric.metric_name === 'cpu_usage' ? metric.metric_value : 0,
      memory: metric.metric_name === 'memory_usage' ? metric.metric_value : 0,
      network: metric.metric_name === 'response_time' ? Math.min(100, metric.metric_value / 10) : 0
    }));

    const latestMetrics = healthMetrics.reduce((acc: Record<string, number>, metric) => {
      acc[metric.metric_name] = metric.metric_value;
      return acc;
    }, {});

    return {
      uptime: 99.8,
      avgResponseTime: Math.round(latestMetrics.response_time || 245),
      errorRate: latestMetrics.error_rate || 0.3,
      activeUsers: 150 + Math.floor(Math.random() * 100),
      performance,
      alerts: []
    };
  }, []);

  return { fetchSystemHealthData };
};

export default useSystemHealthData;