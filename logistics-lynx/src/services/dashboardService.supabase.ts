/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@supabase/supabase-js';
import type { 
  KpiData, 
  PerformanceData, 
  ActivityItem, 
  SystemHealth, 
  PortalData 
} from '../types/dashboard';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// KPI Data
export async function getKpis(role?: string): Promise<KpiData[]> {
  const { data, error } = await supabase
    .from('kpis_view')
    .select('*')
    .eq('role', role || 'super_admin');
  
  if (error) throw error;
  return data || [];
}

// Performance Data
export async function getPerformanceData(
  range: '7d' | '30d' | '90d' = '30d',
  metric?: string
): Promise<PerformanceData> {
  const { data, error } = await supabase
    .from('performance_series')
    .select('*')
    .gte('timestamp', new Date(Date.now() - getDaysInMs(range)).toISOString())
    .order('timestamp', { ascending: true });
  
  if (error) throw error;
  
  return {
    metrics: data || [],
    availableMetrics: ['revenue', 'shipments', 'efficiency', 'customer_satisfaction'],
    timeRange: range
  };
}

// Activity Data
export async function getActivityData(limit: number = 10): Promise<ActivityItem[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

// System Health
export async function getSystemHealth(): Promise<SystemHealth> {
  const { data, error } = await supabase
    .from('health_metrics')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(1)
    .single();
  
  if (error) throw error;
  
  return {
    status: data?.status || 'healthy',
    uptime: data?.uptime || 99.9,
    lastChecked: new Date().toISOString(),
    metrics: data?.metrics || []
  };
}

// Portal Data
export async function getPortals(): Promise<PortalData[]> {
  const { data, error } = await supabase
    .from('portals_view')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data || [];
}

// Helper function
function getDaysInMs(range: '7d' | '30d' | '90d'): number {
  const days = { '7d': 7, '30d': 30, '90d': 90 };
  return days[range] * 24 * 60 * 60 * 1000;
}

// Realtime subscriptions
export function subscribeToKpis(callback: (data: KpiData[]) => void) {
  return supabase
    .channel('kpis_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'kpis_view' }, callback)
    .subscribe();
}

export function subscribeToActivities(callback: (data: ActivityItem) => void) {
  return supabase
    .channel('activities_changes')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activities' }, callback)
    .subscribe();
}
