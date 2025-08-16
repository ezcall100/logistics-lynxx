/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HealthMetric {
  id: string;
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
  overall: 'healthy' | 'warning' | 'critical';
  uptime: string;
  lastUpdated: string;
  metrics: HealthMetric[];
}

export const getSystemHealth = (): SystemHealth => {
  const now = new Date();
  const uptimeStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
  
  const metrics: HealthMetric[] = [
    {
      id: 'api-latency',
      name: 'API Latency',
      value: 145,
      unit: 'ms',
      status: 'healthy',
      threshold: {
        warning: 500,
        critical: 1000
      },
      description: 'Average API response time'
    },
    {
      id: 'cpu-usage',
      name: 'CPU Usage',
      value: 23,
      unit: '%',
      status: 'healthy',
      threshold: {
        warning: 70,
        critical: 90
      },
      description: 'Server CPU utilization'
    },
    {
      id: 'memory-usage',
      name: 'Memory Usage',
      value: 67,
      unit: '%',
      status: 'warning',
      threshold: {
        warning: 65,
        critical: 85
      },
      description: 'Server memory utilization'
    },
    {
      id: 'disk-usage',
      name: 'Disk Usage',
      value: 45,
      unit: '%',
      status: 'healthy',
      threshold: {
        warning: 80,
        critical: 95
      },
      description: 'Storage disk utilization'
    },
    {
      id: 'error-rate',
      name: 'Error Rate',
      value: 0.2,
      unit: '%',
      status: 'healthy',
      threshold: {
        warning: 1,
        critical: 5
      },
      description: 'HTTP error rate'
    },
    {
      id: 'active-connections',
      name: 'Active Connections',
      value: 1247,
      unit: '',
      status: 'healthy',
      threshold: {
        warning: 2000,
        critical: 3000
      },
      description: 'Current active connections'
    },
    {
      id: 'job-queue',
      name: 'Job Queue',
      value: 23,
      unit: '',
      status: 'healthy',
      threshold: {
        warning: 100,
        critical: 500
      },
      description: 'Pending background jobs'
    },
    {
      id: 'database-connections',
      name: 'Database Connections',
      value: 89,
      unit: '',
      status: 'healthy',
      threshold: {
        warning: 150,
        critical: 200
      },
      description: 'Active database connections'
    }
  ];

  // Calculate overall status
  const criticalCount = metrics.filter(m => m.status === 'critical').length;
  const warningCount = metrics.filter(m => m.status === 'warning').length;
  
  let overall: 'healthy' | 'warning' | 'critical' = 'healthy';
  if (criticalCount > 0) {
    overall = 'critical';
  } else if (warningCount > 0) {
    overall = 'warning';
  }

  return {
    overall,
    uptime: `${Math.floor((now.getTime() - uptimeStart.getTime()) / (1000 * 60 * 60 * 24))} days`,
    lastUpdated: now.toISOString(),
    metrics
  };
};

export const getHealthMetricById = (id: string): HealthMetric | undefined => {
  return getSystemHealth().metrics.find(metric => metric.id === id);
};

export const getMetricsByStatus = (status: 'healthy' | 'warning' | 'critical'): HealthMetric[] => {
  return getSystemHealth().metrics.filter(metric => metric.status === status);
};
