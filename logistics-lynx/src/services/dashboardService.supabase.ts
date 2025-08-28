/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock dashboard service functions
export const getSystemMetrics = async () => {
  return {
    data: {
      cpuUsage: 45,
      memoryUsage: 62,
      activeConnections: 1234,
      responseTime: 125
    },
    error: null
  };
};

export const getUserAnalytics = async () => {
  return {
    data: {
      activeUsers: 156,
      totalSessions: 89,
      avgSessionDuration: 25
    },
    error: null
  };
};

export const getKPIMetrics = async () => {
  return {
    data: {
      revenue: 125000,
      orders: 456,
      conversionRate: 3.2
    },
    error: null
  };
};

export const subscribeToKPIMetrics = (_callback: (data: any) => void) => {
  console.log('Subscribing to KPI metrics');
  return () => console.log('Unsubscribed from KPI metrics');
};

export const getKpis = async (_role: string) => {
  return {
    data: [
      { name: 'Revenue', value: 125000, change: '+12%' },
      { name: 'Orders', value: 456, change: '+8%' },
      { name: 'Conversion', value: 3.2, change: '+0.5%' }
    ],
    error: null
  };
};

export const getPerformanceData = async (_range: string, _metric: string) => {
  return {
    data: [
      { date: '2024-01-01', value: 100 },
      { date: '2024-01-02', value: 120 },
      { date: '2024-01-03', value: 110 }
    ],
    error: null
  };
};

export const getActivityData = async (_limit: number) => {
  return {
    data: [
      { id: 1, type: 'login', user: 'john@example.com', timestamp: '2024-01-01T10:00:00Z' },
      { id: 2, type: 'order', user: 'jane@example.com', timestamp: '2024-01-01T11:00:00Z' }
    ],
    error: null
  };
};

export const getSystemHealth = async () => {
  return {
    data: {
      status: 'healthy',
      uptime: 99.8,
      lastCheck: new Date().toISOString()
    },
    error: null
  };
};

export const getPortals = async () => {
  return {
    data: [
      { id: 'portal1', name: 'Main Portal', status: 'active' },
      { id: 'portal2', name: 'Admin Portal', status: 'active' }
    ],
    error: null
  };
};

export const subscribeToKpis = () => {
  console.log('Subscribing to KPIs');
  return () => console.log('Unsubscribed from KPIs');
};

export const subscribeToActivities = () => {
  console.log('Subscribing to activities');
  return () => console.log('Unsubscribed from activities');
};

export default subscribeToKpis;