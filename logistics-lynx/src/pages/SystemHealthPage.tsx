import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  Server,
  Database,
  Network,
  Cpu,
  HardDrive,
  Memory,
  Wifi,
  Shield,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  Thermometer,
  Gauge,
  BarChart3,
  Settings,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  threshold: number;
  maxValue: number;
}

interface ServiceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: string;
  responseTime: number;
  lastCheck: string;
  endpoint: string;
}

interface Alert {
  id: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  timestamp: string;
  service: string;
  acknowledged: boolean;
}

const SystemHealthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      id: 'cpu',
      name: 'CPU Usage',
      value: 68,
      unit: '%',
      status: 'healthy',
      trend: 'up',
      threshold: 80,
      maxValue: 100
    },
    {
      id: 'memory',
      name: 'Memory Usage',
      value: 72,
      unit: '%',
      status: 'warning',
      trend: 'up',
      threshold: 70,
      maxValue: 100
    },
    {
      id: 'disk',
      name: 'Disk Usage',
      value: 45,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      threshold: 85,
      maxValue: 100
    },
    {
      id: 'network',
      name: 'Network I/O',
      value: 89,
      unit: 'MB/s',
      status: 'healthy',
      trend: 'down',
      threshold: 100,
      maxValue: 150
    },
    {
      id: 'temperature',
      name: 'System Temperature',
      value: 42,
      unit: '°C',
      status: 'healthy',
      trend: 'stable',
      threshold: 60,
      maxValue: 80
    },
    {
      id: 'power',
      name: 'Power Consumption',
      value: 85,
      unit: 'W',
      status: 'healthy',
      trend: 'up',
      threshold: 120,
      maxValue: 150
    }
  ]);

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      id: 'api-gateway',
      name: 'API Gateway',
      status: 'online',
      uptime: '99.98%',
      responseTime: 12,
      lastCheck: '2 seconds ago',
      endpoint: 'https://api.transbot.ai/health'
    },
    {
      id: 'database',
      name: 'Database Server',
      status: 'online',
      uptime: '99.95%',
      responseTime: 8,
      lastCheck: '1 second ago',
      endpoint: 'https://db.transbot.ai/health'
    },
    {
      id: 'websocket',
      name: 'WebSocket Server',
      status: 'online',
      uptime: '99.92%',
      responseTime: 15,
      lastCheck: '3 seconds ago',
      endpoint: 'wss://ws.transbot.ai/health'
    },
    {
      id: 'file-storage',
      name: 'File Storage',
      status: 'degraded',
      uptime: '98.45%',
      responseTime: 45,
      lastCheck: '5 seconds ago',
      endpoint: 'https://storage.transbot.ai/health'
    },
    {
      id: 'analytics',
      name: 'Analytics Service',
      status: 'online',
      uptime: '99.89%',
      responseTime: 22,
      lastCheck: '2 seconds ago',
      endpoint: 'https://analytics.transbot.ai/health'
    },
    {
      id: 'payment-gateway',
      name: 'Payment Gateway',
      status: 'online',
      uptime: '99.97%',
      responseTime: 18,
      lastCheck: '1 second ago',
      endpoint: 'https://payments.transbot.ai/health'
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      severity: 'warning',
      message: 'High memory usage detected on File Storage service',
      timestamp: '2024-01-15 14:30:00',
      service: 'file-storage',
      acknowledged: false
    },
    {
      id: '2',
      severity: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '2024-01-15 13:00:00',
      service: 'system',
      acknowledged: true
    },
    {
      id: '3',
      severity: 'error',
      message: 'Database connection timeout - investigating',
      timestamp: '2024-01-15 12:45:00',
      service: 'database',
      acknowledged: false
    }
  ]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to refresh system metrics
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update metrics with realistic variations
      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(metric.maxValue, 
          metric.value + (Math.random() - 0.5) * 10
        )),
        status: metric.value > metric.threshold ? 'warning' : 'healthy'
      })));
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to refresh system health:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleServiceAction = (serviceId: string, action: 'restart' | 'stop' | 'start') => {
    console.log(`${action} service: ${serviceId}`);
    // In a real implementation, this would call the backend API
  };

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000); // Refresh every 30 seconds
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online':
        return 'bg-green-500';
      case 'warning':
      case 'degraded':
        return 'bg-yellow-500';
      case 'critical':
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Health Monitor</h1>
          <p className="text-muted-foreground">
            Real-time system monitoring and service status
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
            <Label htmlFor="auto-refresh">Auto Refresh</Label>
          </div>
          <Button onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Last Updated */}
      <div className="text-sm text-muted-foreground">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className="flex items-center gap-2">
                {getTrendIcon(metric.trend)}
                <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value.toFixed(1)}{metric.unit}
              </div>
              <Progress 
                value={(metric.value / metric.maxValue) * 100} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Threshold: {metric.threshold}{metric.unit}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Service Status</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>
                Real-time status of all system services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uptime</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.name}</TableCell>
                      <TableCell>
                        <Badge variant={
                          service.status === 'online' ? 'default' :
                          service.status === 'degraded' ? 'secondary' : 'destructive'
                        }>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)} mr-2`} />
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{service.uptime}</TableCell>
                      <TableCell>{service.responseTime}ms</TableCell>
                      <TableCell>{service.lastCheck}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleServiceAction(service.id, 'restart')}
                          >
                            Restart
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(service.endpoint, '_blank')}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Active alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <Alert key={alert.id} variant={
                    alert.severity === 'critical' ? 'destructive' :
                    alert.severity === 'error' ? 'destructive' :
                    alert.severity === 'warning' ? 'default' : 'default'
                  }>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="flex justify-between items-center">
                      <span>{alert.service.toUpperCase()} Alert</span>
                      {!alert.acknowledged && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </Button>
                      )}
                    </AlertTitle>
                    <AlertDescription>
                      {alert.message}
                      <div className="text-xs text-muted-foreground mt-1">
                        {alert.timestamp}
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Response Time</span>
                    <span className="font-bold">18.5ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Requests per Second</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Error Rate</span>
                    <span className="font-bold text-green-600">0.02%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Connections</span>
                    <span className="font-bold">892</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>Current resource usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Cores</span>
                      <span>8/8 Active</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory</span>
                      <span>14.4/16 GB</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network</span>
                      <span>89/100 MB/s</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disk I/O</span>
                      <span>45/80 MB/s</span>
                    </div>
                    <Progress value={56} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemHealthPage;