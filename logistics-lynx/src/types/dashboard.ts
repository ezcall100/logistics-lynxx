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

export interface KpiData {
  id: string;
  name: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  timestamp: string;
}

export interface PerformanceData {
  id: string;
  metric: string;
  value: number;
  unit: string;
  timestamp: string;
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}

export interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  user: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
}

export interface PortalData {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  users: number;
  lastActivity: string;
}
