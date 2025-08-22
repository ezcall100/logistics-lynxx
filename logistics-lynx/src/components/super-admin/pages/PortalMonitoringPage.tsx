import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, AlertTriangle, CheckCircle, Clock, 
  Server, Network, Database, Zap, Target,
  RefreshCw, Bell, BellOff, Eye, EyeOff,
  TrendingUp, TrendingDown, Minus, AlertCircle,
  Shield, Globe, Users, Settings
} from 'lucide-react';

interface PortalAlert {
  id: string;
  portalId: string;
  portalName: string;
  type: 'error' | 'warning' | 'info' | 'critical';
  message: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'acknowledged';
  severity: number;
  category: 'performance' | 'security' | 'availability' | 'capacity';
}

interface PortalMetric {
  id: string;
  portalId: string;
  portalName: string;
  uptime: number;
  responseTime: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  activeUsers: number;
  lastUpdated: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
}

const PortalMonitoringPage = () => {
  const [alerts, setAlerts] = useState<PortalAlert[]>([]);
  const [metrics, setMetrics] = useState<PortalMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMonitoringData();
    if (autoRefresh) {
      const interval = setInterval(loadMonitoringData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadMonitoringData = async () => {
    setLoading(true);
    try {
      // Mock monitoring data
      const mockAlerts: PortalAlert[] = [
        {
          id: 'alert-001',
          portalId: 'portal-006',
          portalName: 'Owner Operator Portal',
          type: 'warning',
          message: 'High response time detected: 450ms (threshold: 300ms)',
          timestamp: '2024-01-15T10:45:00Z',
          status: 'active',
          severity: 2,
          category: 'performance'
        },
        {
          id: 'alert-002',
          portalId: 'portal-003',
          portalName: 'Shipper Portal',
          type: 'error',
          message: 'Error rate increased to 0.3% (threshold: 0.2%)',
          timestamp: '2024-01-15T10:42:00Z',
          status: 'acknowledged',
          severity: 3,
          category: 'availability'
        },
        {
          id: 'alert-003',
          portalId: 'portal-005',
          portalName: 'Driver Portal',
          type: 'info',
          message: 'Scheduled maintenance completed successfully',
          timestamp: '2024-01-15T10:30:00Z',
          status: 'resolved',
          severity: 1,
          category: 'availability'
        }
      ];

      const mockMetrics: PortalMetric[] = [
        {
          id: 'metric-001',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          uptime: 99.8,
          responseTime: 245,
          errorRate: 0.2,
          cpuUsage: 45,
          memoryUsage: 62,
          diskUsage: 78,
          activeUsers: 1250,
          lastUpdated: '2024-01-15T10:50:00Z',
          status: 'healthy'
        },
        {
          id: 'metric-002',
          portalId: 'portal-002',
          portalName: 'Broker Portal',
          uptime: 99.9,
          responseTime: 180,
          errorRate: 0.1,
          cpuUsage: 38,
          memoryUsage: 55,
          diskUsage: 65,
          activeUsers: 890,
          lastUpdated: '2024-01-15T10:50:00Z',
          status: 'healthy'
        },
        {
          id: 'metric-003',
          portalId: 'portal-003',
          portalName: 'Shipper Portal',
          uptime: 99.7,
          responseTime: 320,
          errorRate: 0.3,
          cpuUsage: 72,
          memoryUsage: 85,
          diskUsage: 92,
          activeUsers: 2100,
          lastUpdated: '2024-01-15T10:50:00Z',
          status: 'warning'
        },
        {
          id: 'metric-004',
          portalId: 'portal-004',
          portalName: 'Admin Portal',
          uptime: 99.9,
          responseTime: 150,
          errorRate: 0.05,
          cpuUsage: 25,
          memoryUsage: 40,
          diskUsage: 35,
          activeUsers: 45,
          lastUpdated: '2024-01-15T10:50:00Z',
          status: 'healthy'
        },
        {
          id: 'metric-005',
          portalId: 'portal-005',
          portalName: 'Driver Portal',
          uptime: 99.6,
          responseTime: 280,
          errorRate: 0.4,
          cpuUsage: 68,
          memoryUsage: 78,
          diskUsage: 82,
          activeUsers: 3500,
          lastUpdated: '2024-01-15T10:50:00Z',
          status: 'warning'
        },
        {
          id: 'metric-006',
          portalId: 'portal-006',
          portalName: 'Owner Operator Portal',
          uptime: 98.5,
          responseTime: 450,
          errorRate: 1.5,
          cpuUsage: 85,
          memoryUsage: 92,
          diskUsage: 95,
          activeUsers: 120,
          lastUpdated: '2024-01-15T10:50:00Z',
          status: 'critical'
        }
      ];

      setAlerts(mockAlerts);
      setMetrics(mockMetrics);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load monitoring data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      case 'offline': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500';
      case 'error': return 'bg-orange-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const criticalMetrics = metrics.filter(metric => metric.status === 'critical');
  const warningMetrics = metrics.filter(metric => metric.status === 'warning');

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Monitoring...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Monitoring</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and alerting for all portals
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={autoRefresh ? "default" : "outline"}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
            {autoRefresh ? 'Auto Refresh On' : 'Auto Refresh Off'}
          </Button>
          <Button onClick={loadMonitoringData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Now
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeAlerts.length > 0 ? 'Requires attention' : 'All systems normal'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Portals</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalMetrics.length}</div>
            <p className="text-xs text-muted-foreground">
              Portals in critical state
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warning Portals</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{warningMetrics.length}</div>
            <p className="text-xs text-muted-foreground">
              Portals with warnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Portals</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {metrics.filter(m => m.status === 'healthy').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Operating normally
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portal Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.id} className={`border-2 ${
            metric.status === 'critical' ? 'border-red-200' :
            metric.status === 'warning' ? 'border-yellow-200' :
            'border-green-200'
          }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{metric.portalName}</CardTitle>
                  <CardDescription>
                    Last updated: {new Date(metric.lastUpdated).toLocaleTimeString()}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(metric.status)} bg-opacity-10`}>
                  {metric.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Uptime */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Uptime</span>
                  <span className="font-medium">{metric.uptime}%</span>
                </div>
                <Progress value={metric.uptime} className="h-2" />
              </div>

              {/* Response Time */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Response Time</span>
                  <span className="font-medium">{metric.responseTime}ms</span>
                </div>
                <Progress 
                  value={Math.min((metric.responseTime / 500) * 100, 100)} 
                  className="h-2" 
                />
              </div>

              {/* Error Rate */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Error Rate</span>
                  <span className="font-medium">{metric.errorRate}%</span>
                </div>
                <Progress 
                  value={Math.min((metric.errorRate / 2) * 100, 100)} 
                  className="h-2" 
                />
              </div>

              {/* System Resources */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                <div className="text-center">
                  <div className="text-sm font-medium">{metric.cpuUsage}%</div>
                  <div className="text-xs text-muted-foreground">CPU</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{metric.memoryUsage}%</div>
                  <div className="text-xs text-muted-foreground">Memory</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">{metric.diskUsage}%</div>
                  <div className="text-xs text-muted-foreground">Disk</div>
                </div>
              </div>

              {/* Active Users */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Active Users</span>
                <span className="text-sm font-medium">{metric.activeUsers.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Active Alerts
            </CardTitle>
            <CardDescription>
              {activeAlerts.length} alerts requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getAlertTypeColor(alert.type)} text-white`}>
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{alert.portalName}</div>
                      <div className="text-sm text-muted-foreground">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getAlertStatusColor(alert.status)}>
                      {alert.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Acknowledge
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PortalMonitoringPage;
