import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Activity, Wifi, Database, Server } from 'lucide-react';
import { SystemHealth as SystemHealthData, HealthMetric } from '../../data/dashboard/health';
import { cn } from '../../lib/utils';

export interface SystemHealthProps {
  data: SystemHealthData;
  onHealthCheck?: () => Promise<{ success: boolean; latency: number; message: string }>;
  className?: string;
}

const getStatusIcon = (status: 'healthy' | 'warning' | 'critical') => {
  switch (status) {
    case 'healthy':
      return '🟢';
    case 'warning':
      return '🟡';
    case 'critical':
      return '🔴';
    default:
      return '⚪';
  }
};

const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
  switch (status) {
    case 'healthy':
      return 'text-green-600 bg-green-100';
    case 'warning':
      return 'text-yellow-600 bg-yellow-100';
    case 'critical':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getOverallStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
  switch (status) {
    case 'healthy':
      return 'border-green-200 bg-green-50';
    case 'warning':
      return 'border-yellow-200 bg-yellow-50';
    case 'critical':
      return 'border-red-200 bg-red-50';
    default:
      return 'border-gray-200 bg-gray-50';
  }
};

const getMetricIcon = (metricId: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'api-latency': <Activity className="h-4 w-4" />,
    'cpu-usage': <Server className="h-4 w-4" />,
    'memory-usage': <Database className="h-4 w-4" />,
    'disk-usage': <Database className="h-4 w-4" />,
    'error-rate': <Activity className="h-4 w-4" />,
    'active-connections': <Wifi className="h-4 w-4" />,
    'job-queue': <Activity className="h-4 w-4" />,
    'database-connections': <Database className="h-4 w-4" />
  };
  return iconMap[metricId] || <Activity className="h-4 w-4" />;
};

const formatValue = (value: number, unit: string) => {
  if (unit === 'ms') {
    return `${value}ms`;
  } else if (unit === '%') {
    return `${value}%`;
  } else if (unit === '') {
    return value.toLocaleString();
  }
  return `${value}${unit}`;
};

const HealthMetricCard: React.FC<{ metric: HealthMetric }> = ({ metric }) => {
  const statusIcon = getStatusIcon(metric.status);
  const statusColor = getStatusColor(metric.status);
  
  const getProgressValue = () => {
    if (metric.unit === '%') {
      return metric.value;
    } else if (metric.unit === 'ms') {
      // Normalize latency: 0-1000ms = 0-100%
      return Math.min((metric.value / 1000) * 100, 100);
    } else {
      // For other metrics, use a percentage of the critical threshold
      return Math.min((metric.value / metric.threshold.critical) * 100, 100);
    }
  };

  const getProgressColor = () => {
    if (metric.status === 'critical') return 'bg-red-500';
    if (metric.status === 'warning') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
      <div className="flex items-center space-x-3">
        <div className="text-gray-500">
          {getMetricIcon(metric.id)}
        </div>
        <div>
          <div className="font-medium text-sm text-gray-900">
            {metric.name}
          </div>
          <div className="text-xs text-gray-500">
            {metric.description}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className="font-semibold text-sm text-gray-900">
            {formatValue(metric.value, metric.unit)}
          </div>
          <div className="text-xs text-gray-500">
            Threshold: {formatValue(metric.threshold.warning, metric.unit)}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg" role="img" aria-label={`${metric.status} status`}>
            {statusIcon}
          </span>
          <Badge className={cn('text-xs', statusColor)}>
            {metric.status}
          </Badge>
        </div>
      </div>
      {(metric.unit === '%' || metric.unit === 'ms') && (
        <div className="w-16">
          <Progress 
            value={getProgressValue()} 
            className="h-2"
          />
        </div>
      )}
    </div>
  );
};

export const SystemHealth: React.FC<SystemHealthProps> = ({
  data,
  onHealthCheck,
  className
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<{
    success: boolean;
    latency: number;
    message: string;
  } | null>(null);

  const handleHealthCheck = async () => {
    if (!onHealthCheck) return;
    
    setIsChecking(true);
    try {
      const result = await onHealthCheck();
      setLastCheck(result);
    } finally {
      setIsChecking(false);
    }
  };

  const criticalMetrics = data.metrics.filter(m => m.status === 'critical');
  const warningMetrics = data.metrics.filter(m => m.status === 'warning');
  const healthyMetrics = data.metrics.filter(m => m.status === 'healthy');

  return (
    <Card className={cn('border-2', getOverallStatusColor(data.overall), className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CardTitle>System Health</CardTitle>
            <div className="flex items-center space-x-1">
              <span className="text-lg" role="img" aria-label={`${data.overall} system status`}>
                {getStatusIcon(data.overall)}
              </span>
              <Badge className={cn('text-xs', getStatusColor(data.overall))}>
                {data.overall}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-right text-sm">
              <div className="text-gray-600">Uptime</div>
              <div className="font-medium">{data.uptime}</div>
            </div>
            {onHealthCheck && (
              <Button
                onClick={handleHealthCheck}
                disabled={isChecking}
                size="sm"
                variant="outline"
              >
                {isChecking ? 'Checking...' : 'Run Check'}
              </Button>
            )}
          </div>
        </div>
        
        {lastCheck && (
          <div className={cn(
            'p-3 rounded-lg text-sm',
            lastCheck.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          )}>
            <div className="font-medium">
              {lastCheck.success ? '✅ Health Check Passed' : '❌ Health Check Failed'}
            </div>
            <div className="text-xs mt-1">
              Latency: {lastCheck.latency}ms • {lastCheck.message}
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Status Summary */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {criticalMetrics.length}
              </div>
              <div className="text-xs text-red-600">Critical</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {warningMetrics.length}
              </div>
              <div className="text-xs text-yellow-600">Warning</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {healthyMetrics.length}
              </div>
              <div className="text-xs text-green-600">Healthy</div>
            </div>
          </div>

          {/* Metrics List */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">System Metrics</h4>
            {data.metrics.map((metric) => (
              <HealthMetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Last Updated */}
          <div className="text-xs text-gray-500 text-center">
            Last updated: {new Date(data.lastUpdated).toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
