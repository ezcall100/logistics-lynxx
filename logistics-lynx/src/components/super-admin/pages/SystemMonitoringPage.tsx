import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, Server, Database, Network, Cpu, 
  HardDrive, Wifi, AlertTriangle, CheckCircle,
  Clock, TrendingUp, TrendingDown, Minus, RefreshCw,
  Eye, Settings, Bell, Zap, Shield, Globe,
  BarChart3, PieChart, Gauge, Thermometer, Battery,
  WifiOff, AlertCircle, Info, XCircle, Clock3
} from 'lucide-react';

// Real data models
interface SystemMetric {
  id: string;
  name: string;
  category: 'cpu' | 'memory' | 'disk' | 'network' | 'database' | 'application';
  value: number;
  unit: string;
  threshold: number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  description: string;
}

interface SystemAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'performance' | 'security' | 'availability' | 'error';
  source: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  resolution?: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
}

interface SystemService {
  id: string;
  name: string;
  type: 'api' | 'database' | 'cache' | 'queue' | 'storage' | 'authentication';
  status: 'healthy' | 'degraded' | 'unhealthy' | 'offline';
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastCheck: string;
  endpoint: string;
  version: string;
  dependencies: string[];
}

interface SystemEvent {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  source: string;
  timestamp: string;
  details: Record<string, any>;
  user?: string;
  sessionId?: string;
}

// Mock API functions
const mockAPI = {
  getSystemMetrics: (): Promise<SystemMetric[]> => Promise.resolve([
    {
      id: 'cpu-usage',
      name: 'CPU Usage',
      category: 'cpu',
      value: 68.5,
      unit: '%',
      threshold: 80,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'up',
      changePercent: 5.2,
      description: 'Average CPU utilization across all servers'
    },
    {
      id: 'memory-usage',
      name: 'Memory Usage',
      category: 'memory',
      value: 72.3,
      unit: '%',
      threshold: 85,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'stable',
      changePercent: 0.1,
      description: 'Average memory utilization across all servers'
    },
    {
      id: 'disk-usage',
      name: 'Disk Usage',
      category: 'disk',
      value: 78.9,
      unit: '%',
      threshold: 90,
      status: 'warning',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'up',
      changePercent: 2.1,
      description: 'Average disk space utilization'
    },
    {
      id: 'network-throughput',
      name: 'Network Throughput',
      category: 'network',
      value: 1250,
      unit: 'Mbps',
      threshold: 2000,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'down',
      changePercent: -8.5,
      description: 'Current network throughput'
    },
    {
      id: 'database-connections',
      name: 'Database Connections',
      category: 'database',
      value: 85,
      unit: 'connections',
      threshold: 100,
      status: 'warning',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'up',
      changePercent: 12.3,
      description: 'Active database connections'
    },
    {
      id: 'api-response-time',
      name: 'API Response Time',
      category: 'application',
      value: 245,
      unit: 'ms',
      threshold: 500,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'down',
      changePercent: -15.2,
      description: 'Average API response time'
    }
  ]),

  getSystemAlerts: (): Promise<SystemAlert[]> => Promise.resolve([
    {
      id: 'alert-001',
      title: 'High Disk Usage Detected',
      description: 'Disk usage has exceeded 75% threshold on production servers',
      severity: 'medium',
      category: 'performance',
      source: 'disk-monitor',
      timestamp: '2024-01-15T10:25:00Z',
      status: 'active',
      assignedTo: 'devops-team'
    },
    {
      id: 'alert-002',
      title: 'Database Connection Pool Exhausted',
      description: 'Database connection pool has reached 85% capacity',
      severity: 'high',
      category: 'availability',
      source: 'database-monitor',
      timestamp: '2024-01-15T09:45:00Z',
      status: 'acknowledged',
      assignedTo: 'database-admin',
      acknowledgedAt: '2024-01-15T09:50:00Z'
    },
    {
      id: 'alert-003',
      title: 'API Rate Limit Exceeded',
      description: 'API rate limit exceeded for user account',
      severity: 'low',
      category: 'security',
      source: 'api-gateway',
      timestamp: '2024-01-15T08:30:00Z',
      status: 'resolved',
      assignedTo: 'security-team',
      resolvedAt: '2024-01-15T08:35:00Z',
      resolution: 'Rate limit reset and user notified'
    }
  ]),

  getSystemServices: (): Promise<SystemService[]> => Promise.resolve([
    {
      id: 'api-gateway',
      name: 'API Gateway',
      type: 'api',
      status: 'healthy',
      uptime: 99.9,
      responseTime: 45,
      errorRate: 0.1,
      lastCheck: '2024-01-15T10:30:00Z',
      endpoint: 'https://api.transbot.ai/health',
      version: '2.1.0',
      dependencies: ['authentication-service', 'rate-limiter']
    },
    {
      id: 'main-database',
      name: 'Main Database',
      type: 'database',
      status: 'healthy',
      uptime: 99.8,
      responseTime: 12,
      errorRate: 0.05,
      lastCheck: '2024-01-15T10:30:00Z',
      endpoint: 'postgresql://db.transbot.ai:5432',
      version: 'PostgreSQL 15.2',
      dependencies: ['backup-service']
    },
    {
      id: 'redis-cache',
      name: 'Redis Cache',
      type: 'cache',
      status: 'healthy',
      uptime: 99.9,
      responseTime: 2,
      errorRate: 0.01,
      lastCheck: '2024-01-15T10:30:00Z',
      endpoint: 'redis://cache.transbot.ai:6379',
      version: 'Redis 7.0',
      dependencies: []
    },
    {
      id: 'message-queue',
      name: 'Message Queue',
      type: 'queue',
      status: 'degraded',
      uptime: 98.5,
      responseTime: 150,
      errorRate: 2.5,
      lastCheck: '2024-01-15T10:30:00Z',
      endpoint: 'amqp://queue.transbot.ai:5672',
      version: 'RabbitMQ 3.11',
      dependencies: ['worker-service']
    }
  ]),

  getSystemEvents: (): Promise<SystemEvent[]> => Promise.resolve([
    {
      id: 'event-001',
      type: 'info',
      message: 'System backup completed successfully',
      source: 'backup-service',
      timestamp: '2024-01-15T10:30:00Z',
      details: { size: '2.4GB', duration: '15m', location: 's3://backups' }
    },
    {
      id: 'event-002',
      type: 'warning',
      message: 'High memory usage detected on server-02',
      source: 'monitoring-agent',
      timestamp: '2024-01-15T10:25:00Z',
      details: { server: 'server-02', memory: '82%', threshold: '80%' }
    },
    {
      id: 'event-003',
      type: 'error',
      message: 'Failed to connect to external API',
      source: 'integration-service',
      timestamp: '2024-01-15T10:20:00Z',
      details: { endpoint: 'https://external-api.com', error: 'Connection timeout' }
    },
    {
      id: 'event-004',
      type: 'success',
      message: 'User authentication successful',
      source: 'auth-service',
      timestamp: '2024-01-15T10:15:00Z',
      details: { userId: 'user-123', method: 'oauth2' },
      user: 'john.doe@example.com'
    }
  ])
};

const SystemMonitoringPage = () => {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [services, setServices] = useState<SystemService[]>([]);
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadSystemData();
    // Set up real-time updates every 30 seconds
    const interval = setInterval(loadSystemData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadSystemData = async () => {
    setLoading(true);
    try {
      const [metricsData, alertsData, servicesData, eventsData] = await Promise.all([
        mockAPI.getSystemMetrics(),
        mockAPI.getSystemAlerts(),
        mockAPI.getSystemServices(),
        mockAPI.getSystemEvents()
      ]);

      setMetrics(metricsData);
      setAlerts(alertsData);
      setServices(servicesData);
      setEvents(eventsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load system data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { 
          ...alert, 
          status: 'acknowledged' as const,
          acknowledgedAt: new Date().toISOString()
        } : alert
      )
    );
    toast({
      title: "Alert Acknowledged",
      description: "System alert has been acknowledged",
    });
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { 
          ...alert, 
          status: 'resolved' as const,
          resolvedAt: new Date().toISOString()
        } : alert
      )
    );
    toast({
      title: "Alert Resolved",
      description: "System alert has been resolved",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
      case 'healthy':
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'degraded':
      case 'acknowledged':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'unhealthy':
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesCategory = filterCategory === 'all' || alert.category === filterCategory;
    return matchesSeverity && matchesCategory;
  });

  const systemHealth = {
    overall: services.filter(s => s.status === 'healthy').length / services.length * 100,
    criticalAlerts: alerts.filter(a => a.severity === 'critical' && a.status === 'active').length,
    warnings: alerts.filter(a => a.severity === 'medium' && a.status === 'active').length,
    servicesDown: services.filter(s => s.status === 'offline').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading system data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Monitoring</h1>
          <p className="text-muted-foreground">
            Real-time system health monitoring and alerting
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadSystemData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.overall.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {services.filter(s => s.status === 'healthy').length} of {services.length} services healthy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{systemHealth.criticalAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {alerts.filter(a => a.status === 'active').length} total active alerts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{systemHealth.warnings}</div>
            <p className="text-xs text-muted-foreground">
              Medium priority alerts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Down</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{systemHealth.servicesDown}</div>
            <p className="text-xs text-muted-foreground">
              {services.length - systemHealth.servicesDown} services operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">System Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* System Metrics Tab */}
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time System Metrics</CardTitle>
              <CardDescription>
                Monitor key performance indicators across all systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric) => (
                  <Card key={metric.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {metric.category === 'cpu' && <Cpu className="h-5 w-5 text-blue-500" />}
                                                 {metric.category === 'memory' && <Activity className="h-5 w-5 text-green-500" />}
                        {metric.category === 'disk' && <HardDrive className="h-5 w-5 text-purple-500" />}
                        {metric.category === 'network' && <Network className="h-5 w-5 text-orange-500" />}
                        {metric.category === 'database' && <Database className="h-5 w-5 text-indigo-500" />}
                        {metric.category === 'application' && <Globe className="h-5 w-5 text-red-500" />}
                        <h3 className="font-medium">{metric.name}</h3>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">
                          {metric.value}{metric.unit}
                        </span>
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Threshold</span>
                          <span>{metric.threshold}{metric.unit}</span>
                        </div>
                        <Progress 
                          value={(metric.value / metric.threshold) * 100} 
                          className="h-2" 
                        />
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}% from last check
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>
                    Monitor and manage system alerts and notifications
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="availability">Availability</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {alert.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{alert.category}</Badge>
                      </TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {alert.status === 'active' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                            >
                              Acknowledge
                            </Button>
                          )}
                          {alert.status === 'acknowledged' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResolveAlert(alert.id)}
                            >
                              Resolve
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
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

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Services</CardTitle>
              <CardDescription>
                Monitor the health and performance of all system services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Card key={service.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Server className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">{service.type}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <div className="font-medium">{service.uptime}%</div>
                          <div className="text-muted-foreground">Uptime</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{service.responseTime}ms</div>
                          <div className="text-muted-foreground">Response</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{service.errorRate}%</div>
                          <div className="text-muted-foreground">Errors</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <div>Version: {service.version}</div>
                        <div>Last Check: {new Date(service.lastCheck).toLocaleTimeString()}</div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Events</CardTitle>
              <CardDescription>
                Recent system events and activity logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{event.message}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">Source: {event.source}</span>
                        {event.user && (
                          <span className="text-xs text-muted-foreground">User: {event.user}</span>
                        )}
                      </div>
                      {Object.keys(event.details).length > 0 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          <details>
                            <summary className="cursor-pointer">View Details</summary>
                            <pre className="mt-1 p-2 bg-gray-50 rounded text-xs">
                              {JSON.stringify(event.details, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMonitoringPage;
