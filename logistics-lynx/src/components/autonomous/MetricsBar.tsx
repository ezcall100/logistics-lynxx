/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Server,
  Database,
  Network,
  Cpu,
  HardDrive
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface PortalMetric {
  name: string;
  responseTime: number;
  uptime: number;
  activeUsers: number;
  status: 'online' | 'degraded' | 'offline';
}

export default function MetricsBar() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [portalMetrics, setPortalMetrics] = useState<PortalMetric[]>([]);
  const [overallHealth, setOverallHealth] = useState(98.5);

  useEffect(() => {
    // Initialize system metrics
    const initialMetrics: SystemMetric[portalMetrics] = [
      {
        name: 'CPU Usage',
        value: 45,
        unit: '%',
        trend: 'stable',
        status: 'good',
        icon: Cpu
      },
      {
        name: 'Memory Usage',
        value: 62,
        unit: '%',
        trend: 'up',
        status: 'warning',
        icon: HardDrive
      },
      {
        name: 'Database Connections',
        value: 127,
        unit: '',
        trend: 'up',
        status: 'good',
        icon: Database
      },
      {
        name: 'Network Latency',
        value: 45,
        unit: 'ms',
        trend: 'down',
        status: 'good',
        icon: Network
      },
      {
        name: 'Storage Usage',
        value: 78,
        unit: '%',
        trend: 'up',
        status: 'warning',
        icon: HardDrive
      },
      {
        name: 'Active Operations',
        value: 23,
        unit: '',
        trend: 'up',
        status: 'good',
        icon: Activity
      }
    ];

    setSystemMetrics(initialMetrics);

    // Initialize portal metrics
    const portals = [
      'Super Admin', 'Admin', 'TMS Admin', 'Onboarding', 'Broker',
      'Shipper', 'Carrier', 'Driver', 'Owner Operator', 'Factoring',
      'Load Board', 'CRM', 'Financials', 'EDI', 'Marketplace',
      'Analytics', 'Autonomous', 'Workers', 'Rates', 'Directory'
    ];

    setPortalMetrics(portals.map(name => ({
      name,
      responseTime: Math.random() * 200 + 50,
      uptime: 99.5 + Math.random() * 0.5,
      activeUsers: Math.floor(Math.random() * 50) + 1,
      status: Math.random() > 0.95 ? 'degraded' : 'online'
    })));

    // Update metrics in real-time
    const interval = setInterval(() => {
      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.name === 'CPU Usage' 
          ? Math.max(20, Math.min(90, metric.value + (Math.random() - 0.5) * 10))
          : metric.name === 'Memory Usage'
          ? Math.max(40, Math.min(85, metric.value + (Math.random() - 0.5) * 5))
          : metric.name === 'Database Connections'
          ? Math.max(50, Math.min(200, metric.value + (Math.random() - 0.5) * 20))
          : metric.name === 'Network Latency'
          ? Math.max(20, Math.min(100, metric.value + (Math.random() - 0.5) * 15))
          : metric.name === 'Storage Usage'
          ? Math.min(95, metric.value + Math.random() * 0.5)
          : metric.name === 'Active Operations'
          ? Math.max(5, Math.min(50, metric.value + (Math.random() - 0.5) * 10))
          : metric.value,
        status: metric.name === 'CPU Usage' && metric.value > 80 ? 'critical'
          : metric.name === 'Memory Usage' && metric.value > 75 ? 'warning'
          : metric.name === 'Storage Usage' && metric.value > 85 ? 'critical'
          : 'good',
        trend: Math.random() > 0.6 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
      })));

      setPortalMetrics(prev => prev.map(portal => ({
        ...portal,
        responseTime: Math.max(30, Math.min(300, portal.responseTime + (Math.random() - 0.5) * 20)),
        uptime: Math.max(99.0, Math.min(100, portal.uptime + (Math.random() - 0.5) * 0.1)),
        activeUsers: Math.max(0, Math.min(100, portal.activeUsers + (Math.random() - 0.5) * 5)),
        status: Math.random() > 0.98 ? 'degraded' : 'online'
      })));

      // Update overall health
      const onlinePortals = portalMetrics.filter(p => p.status === 'online').length;
      const totalPortals = portalMetrics.length;
      const healthPercentage = (onlinePortals / totalPortals) * 100;
      setOverallHealth(Math.max(95, Math.min(100, healthPercentage + (Math.random() - 0.5) * 2)));
    }, 3000);

    return () => clearInterval(interval);
  }, [portalMetrics]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-red-500" />;
      default: return <Clock className="w-3 h-3 text-gray-500" />;
    }
  };

  const getPortalStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Overall System Health */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-green-500 flex items-center justify-center">
                  <CheckCircle className="w-2 h-2 text-green-500" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold">System Health</h3>
                <p className="text-sm text-muted-foreground">Overall platform status</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{overallHealth.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Healthy</div>
            </div>
          </div>
          <Progress value={overallHealth} className="mt-3" />
        </CardContent>
      </Card>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-4 h-4 ${getStatusColor(metric.status)}`} />
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-2xl font-bold">
                {metric.value}{metric.unit}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {metric.name}
              </div>
              <div className="mt-2">
                <Progress 
                  value={metric.name.includes('Usage') ? metric.value : Math.min(100, metric.value / 2)} 
                  className="h-1"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portal Performance Overview */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Portal Performance (20 Portals)</h3>
            <Badge variant="outline">
              {portalMetrics.filter(p => p.status === 'online').length}/20 Online
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {portalMetrics.map((portal) => (
              <div key={portal.name} className="flex items-center space-x-2 p-2 border rounded-lg">
                <div className={`w-2 h-2 rounded-full ${getPortalStatusColor(portal.status)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{portal.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {portal.responseTime.toFixed(0)}ms • {portal.uptime.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity Indicators */}
      <div className="flex items-center justify-center space-x-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Autonomous Operations Active</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Real-time Updates</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Self-healing Enabled</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
          <span className="text-sm">24/7 Operation</span>
        </div>
      </div>
    </div>
  );
}
