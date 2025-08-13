import { useState, useEffect, useCallback } from 'react';
import { getProvider } from '../services/dashboardProvider';
import * as mockService from '../services/dashboardService';
import * as supabaseService from '../services/dashboardService.supabase';
import type { 
  KpiData, 
  PerformanceData, 
  ActivityItem, 
  SystemHealth, 
  PortalData 
} from '../types/dashboard';

// Unified service interface
const getService = () => {
  return getProvider() === 'supabase' ? supabaseService : mockService;
};

// KPI Hook
export const useKpis = (role?: string) => {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchKpis = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getService().getKpis(role);
      setKpis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch KPIs');
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    fetchKpis();
  }, [fetchKpis]);

  return { kpis, loading, error, refetch: fetchKpis };
};

// Performance Hook
export const usePerformance = (range: '7d' | '30d' | '90d' = '30d', metric?: string) => {
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getService().getPerformanceData(range, metric);
      setPerformance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch performance data');
    } finally {
      setLoading(false);
    }
  }, [range, metric]);

  useEffect(() => {
    fetchPerformance();
  }, [fetchPerformance]);

  return { performance, loading, error, refetch: fetchPerformance };
};

// Activity Hook
export const useActivity = (limit: number = 10) => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getService().getActivityData(limit);
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, loading, error, refetch: fetchActivities };
};

// System Health Hook
export const useSystemHealth = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getService().getSystemHealth();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch system health');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  return { health, loading, error, refetch: fetchHealth };
};

// Portals Hook
export const usePortals = () => {
  const [portals, setPortals] = useState<PortalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getService().getPortals();
      setPortals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portals');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortals();
  }, [fetchPortals]);

  return { portals, loading, error, refetch: fetchPortals };
};

// Realtime subscriptions hook
export const useRealtimeData = () => {
  useEffect(() => {
    if (getProvider() === 'supabase') {
      // Set up realtime subscriptions
      const kpisSubscription = supabaseService.subscribeToKpis((data) => {
        // Handle realtime KPI updates
        console.log('Realtime KPI update:', data);
      });

      const activitiesSubscription = supabaseService.subscribeToActivities((data) => {
        // Handle realtime activity updates
        console.log('Realtime activity:', data);
      });

      return () => {
        kpisSubscription.unsubscribe();
        activitiesSubscription.unsubscribe();
      };
    }
  }, []);
};
