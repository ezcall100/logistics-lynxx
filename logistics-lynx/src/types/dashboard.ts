export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  monthlyGrowth: number;
  systemLoad: number;
  memoryUsage: number;
  diskUsage: number;
  networkTraffic: number;
}

export interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  userGrowth: number;
  topUsers: Array<{
    id: string;
    name: string;
    email: string;
    activity: number;
  }>;
}

export interface KPIMetrics {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  timestamp: string;
}
