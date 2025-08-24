/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from '../lib/supabase';
import { 
  DashboardMetrics, 
  UserAnalytics, 
  KPIMetrics 
} from '../types/dashboard';

export const getSystemMetrics = async (): Promise<{ data: DashboardMetrics | null; error: any }> => {
  try {
    // Mock data for now
    const data: DashboardMetrics = {
      totalUsers: 1247,
      activeUsers: 892,
      totalRevenue: 125000,
      monthlyGrowth: 12.5,
      systemLoad: 45,
      memoryUsage: 68,
      diskUsage: 34,
      networkTraffic: 2.4
    };
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getUserAnalytics = async (): Promise<{ data: UserAnalytics | null; error: any }> => {
  try {
    // Mock data for now
    const data: UserAnalytics = {
      totalUsers: 1247,
      activeUsers: 892,
      newUsers: 45,
      userGrowth: 12.5,
      topUsers: [
        { id: '1', name: 'John Doe', email: 'john@example.com', activity: 95 },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', activity: 87 },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', activity: 76 }
      ]
    };
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getKPIMetrics = async (): Promise<{ data: KPIMetrics[] | null; error: any }> => {
  try {
    // Mock data for now
    const data: KPIMetrics[] = [
      { id: '1', name: 'User Growth', value: 12.5, change: 2.3, trend: 'up', timestamp: new Date().toISOString() },
      { id: '2', name: 'Revenue', value: 125000, change: 5.7, trend: 'up', timestamp: new Date().toISOString() },
      { id: '3', name: 'System Load', value: 45, change: -3.2, trend: 'down', timestamp: new Date().toISOString() }
    ];
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const subscribeToKPIMetrics = (callback: (data: any) => void) => {
  try {
    // Temporarily commented out due to database schema issues
    /*
    return supabase
      .channel('kpis')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'kpis_view' }, callback)
      .subscribe();
    */
    
    console.log('KPI metrics subscription set up (mock)');
    return { data: null, error: null };
  } catch (error) {
    console.error('Error setting up KPI subscription:', error);
    return { data: null, error };
  }
};
