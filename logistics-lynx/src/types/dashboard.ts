/* eslint-disable @typescript-eslint/no-explicit-any */
// KPI Types
export interface KpiData {
  id: string;
  key: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
  icon: string;
  role: string;
  timestamp: string;
}

export type RoleKpis = {
  [key: string]: KpiData[];
};

// Performance Types
export interface PerformanceMetric {
  timestamp: string;
  metric: string;
  value: number;
  role?: string;
}

export interface PerformanceData {
  metrics: PerformanceMetric[];
  availableMetrics: string[];
  timeRange: '7d' | '30d' | '90d';
}

export interface PerformanceFilters {
  metric: string;
  range: '7d' | '30d' | '90d';
}

// Activity Types
export interface ActivityItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error' | 'system';
  title: string;
  description: string;
  timestamp: string;
  user?: string;
  portal?: string;
  payload?: Record<string, unknown>;
}

// Portal Types
export interface QuickAction {
  label: string;
  action: string;
  icon: string;
  description?: string;
}

export interface PortalData {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  status: 'active' | 'maintenance' | 'beta' | 'deprecated';
  color: string;
  gradient: string;
  quickActions: QuickAction[];
  accessibleRoles: string[];
  order: number;
}

// System Health Types
export interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  threshold: {
    warning: number;
    critical: number;
  };
  description: string;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  lastChecked: string;
  metrics: HealthMetric[];
}

// User Role Types
export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'freight_broker_admin'
  | 'carrier_admin'
  | 'shipper_admin'
  | 'driver'
  | 'owner_operator'
  | 'factoring_admin'
  | 'analyst';

// Dashboard State Types
export interface DashboardState {
  currentRole: UserRole;
  selectedTimeRange: '7d' | '30d' | '90d';
  selectedMetric: string;
  searchQuery: string;
  filters: {
    portals: string[];
    activityTypes: string[];
    healthStatus: string[];
  };
}

// Error Types
export interface DashboardError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}

// Loading States
export interface LoadingState {
  kpis: boolean;
  performance: boolean;
  activities: boolean;
  health: boolean;
  portals: boolean;
}

// Realtime Types
export interface RealtimeUpdate {
  type: 'kpi' | 'activity' | 'health' | 'portal';
  data: unknown;
  timestamp: string;
}
