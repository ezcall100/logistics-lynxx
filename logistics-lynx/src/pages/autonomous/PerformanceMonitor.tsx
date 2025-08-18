/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, 
  AlertTriangle,
  BarChart3,
  Cpu,
  Database,
  HardDrive,

  Monitor,
  Network,
  RefreshCw,
  Settings,
  TrendingDown,
  TrendingUp,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Bell,
  BellOff,
  Filter,
  Download,
  Upload,
  Play,
  Pause,
  Square,
  RotateCcw,
  Home
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  trend: 'up' | 'down' | 'stable';
  threshold: {
    warning: number;
    critical: number;
  };
  lastUpdated: string;
  description: string;
}

interface SystemAlert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  acknowledged: boolean;
  source: string;
}

interface PerformanceData {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<SystemAlert | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize with realistic data
  useEffect(() => {
    const initialMetrics: PerformanceMetric[] = [
      {
        id: 'cpu-usage',
        name: 'CPU Usage',
        value: 67,
        unit: '%',
        status: 'normal',
        trend: 'up',
        threshold: { warning: 80, critical: 95 },
        lastUpdated: new Date().toISOString(),
        description: 'Current CPU utilization across all cores'
      },
      {
        id: 'memory-usage',
        name: 'Memory Usage',
        value: 78,
        unit: '%',
        status: 'warning',
        trend: 'up',
        threshold: { warning: 75, critical: 90 },
        lastUpdated: new Date().toISOString(),
        description: 'RAM utilization percentage'
      },
      {
        id: 'disk-usage',
        name: 'Disk Usage',
        value: 45,
        unit: '%',
        status: 'normal',
        trend: 'stable',
        threshold: { warning: 85, critical: 95 },
        lastUpdated: new Date().toISOString(),
        description: 'Storage space utilization'
      },
      {
        id: 'network-throughput',
        name: 'Network Throughput',
        value: 1250,
        unit: 'Mbps',
        status: 'normal',
        trend: 'up',
        threshold: { warning: 2000, critical: 2500 },
        lastUpdated: new Date().toISOString(),
        description: 'Current network bandwidth usage'
      },
      {
        id: 'response-time',
        name: 'API Response Time',
        value: 245,
        unit: 'ms',
        status: 'normal',
        trend: 'down',
        threshold: { warning: 500, critical: 1000 },
        lastUpdated: new Date().toISOString(),
        description: 'Average API response time'
      },
      {
        id: 'error-rate',
        name: 'Error Rate',
        value: 0.8,
        unit: '%',
        status: 'normal',
        trend: 'down',
        threshold: { warning: 2, critical: 5 },
        lastUpdated: new Date().toISOString(),
        description: 'Percentage of failed requests'
      },
      {
        id: 'active-connections',
        name: 'Active Connections',
        value: 1247,
        unit: '',
        status: 'normal',
        trend: 'up',
        threshold: { warning: 2000, critical: 2500 },
        lastUpdated: new Date().toISOString(),
        description: 'Number of active database connections'
      },
      {
        id: 'queue-depth',
        name: 'Task Queue Depth',
        value: 23,
        unit: '',
        status: 'normal',
        trend: 'stable',
        threshold: { warning: 100, critical: 200 },
        lastUpdated: new Date().toISOString(),
        description: 'Number of pending tasks in queue'
      }
    ];

    const initialAlerts: SystemAlert[] = [
      {
        id: 'alert-001',
        type: 'warning',
        title: 'High Memory Usage',
        message: 'Memory usage has exceeded 75% threshold. Consider optimizing memory allocation.',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        severity: 'medium',
        acknowledged: false,
        source: 'system-monitor'
      },
      {
        id: 'alert-002',
        type: 'info',
        title: 'Performance Optimization Complete',
        message: 'Autonomous system has completed performance optimization cycle.',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        severity: 'low',
        acknowledged: true,
        source: 'autonomous-agent'
      },
      {
        id: 'alert-003',
        type: 'success',
        title: 'Database Optimization',
        message: 'Database query optimization completed successfully. Response times improved by 15%.',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        severity: 'low',
        acknowledged: false,
        source: 'database-agent'
      }
    ];

    // Generate performance data for charts
    const generatePerformanceData = (): PerformanceData[] => {
      const data: PerformanceData[] = [];
      const now = Date.now();
      const interval = selectedTimeRange === '1h' ? 60000 : selectedTimeRange === '6h' ? 300000 : 900000;
      
      for (let i = 24; i >= 0; i--) {
        const timestamp = new Date(now - i * interval);
        data.push({
          timestamp: timestamp.toISOString(),
          cpu: Math.floor(Math.random() * 30) + 50,
          memory: Math.floor(Math.random() * 20) + 70,
          disk: Math.floor(Math.random() * 10) + 40,
          network: Math.floor(Math.random() * 500) + 1000,
          responseTime: Math.floor(Math.random() * 200) + 200,
          throughput: Math.floor(Math.random() * 1000) + 500,
          errorRate: Math.random() * 2
        });
      }
      return data;
    };

    setMetrics(initialMetrics);
    setAlerts(initialAlerts);
    setPerformanceData(generatePerformanceData());
  }, [selectedTimeRange]);

  // Simulate real-time updates
  useEffect(() => {
    if (!isMonitoringActive) return;

    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 5,
        lastUpdated: new Date().toISOString()
      })));

      setPerformanceData(prev => {
        const newData = [...prev.slice(1)];
        const lastPoint = prev[prev.length - 1];
        newData.push({
          timestamp: new Date().toISOString(),
          cpu: Math.max(0, Math.min(100, lastPoint.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(0, Math.min(100, lastPoint.memory + (Math.random() - 0.5) * 5)),
          disk: Math.max(0, Math.min(100, lastPoint.disk + (Math.random() - 0.5) * 2)),
          network: Math.max(0, lastPoint.network + (Math.random() - 0.5) * 100),
          responseTime: Math.max(0, lastPoint.responseTime + (Math.random() - 0.5) * 50),
          throughput: Math.max(0, lastPoint.throughput + (Math.random() - 0.5) * 200),
          errorRate: Math.max(0, Math.min(5, lastPoint.errorRate + (Math.random() - 0.5) * 0.5))
        });
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isMonitoringActive]);

  const getStatusColor = (status: PerformanceMetric['status']) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: SystemAlert['type']) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: PerformanceMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleAcknowledgeAlert = async (alertId: string) => {
    setLoading(true);
    try {
      setAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      ));
      
      toast({
        title: "Alert Acknowledged",
        description: "Alert has been marked as acknowledged",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to acknowledge alert",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDismissAlert = async (alertId: string) => {
    setLoading(true);
    try {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      
      toast({
        title: "Alert Dismissed",
        description: "Alert has been removed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to dismiss alert",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshMetrics = async () => {
    setLoading(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Metrics Refreshed",
        description: "Performance metrics have been updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh metrics",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const systemHealth = {
    overall: 87,
    cpu: 67,
    memory: 78,
    disk: 45,
    network: 85,
    responseTime: 92,
    errorRate: 98
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const criticalAlerts = alerts.filter(alert => alert.severity === 'critical');

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/autonomous" className="flex items-center space-x-1 hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
          <span>Autonomous System</span>
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Performance Monitor</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Monitor</h1>
          <p className="text-muted-foreground">
            Real-time system performance monitoring and alerting
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isMonitoringActive}
              onCheckedChange={setIsMonitoringActive}
            />
            <Label>Live Monitoring</Label>
          </div>
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="6h">6 Hours</SelectItem>
              <SelectItem value="24h">24 Hours</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRefreshMetrics} disabled={loading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.overall}%</div>
            <Progress value={systemHealth.overall} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              System performance score
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unacknowledgedAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {criticalAlerts.length} critical
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">
              Average API response
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="charts">Real-time Charts</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Metrics</CardTitle>
              <CardDescription>
                Real-time performance indicators and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                  <div key={metric.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm">{metric.name}</h3>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      {metric.value.toFixed(metric.unit === '%' ? 1 : 0)}{metric.unit}
                    </div>
                    <Progress 
                      value={metric.value} 
                      className="mb-2"
                      color={metric.status === 'critical' ? 'red' : metric.status === 'warning' ? 'yellow' : 'green'}
                    />
                    <p className="text-xs text-muted-foreground">
                      {metric.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated: {new Date(metric.lastUpdated).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>CPU & Memory Usage</CardTitle>
                <CardDescription>
                  Real-time system resource utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                      formatter={(value, name) => [`${value}${name === 'cpu' || name === 'memory' ? '%' : ''}`, name]}
                    />
                    <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="memory" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network & Response Time</CardTitle>
                <CardDescription>
                  Network throughput and API response times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                      formatter={(value, name) => [
                        `${value}${name === 'network' ? ' Mbps' : name === 'responseTime' ? ' ms' : ''}`, 
                        name
                      ]}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="network" stroke="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Rate Trend</CardTitle>
                <CardDescription>
                  System error rate over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                      formatter={(value) => [`${value}%`, 'Error Rate']}
                    />
                    <Bar dataKey="errorRate" fill="#ff6b6b" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health Distribution</CardTitle>
                <CardDescription>
                  Current system health breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'CPU', value: systemHealth.cpu, color: '#8884d8' },
                        { name: 'Memory', value: systemHealth.memory, color: '#82ca9d' },
                        { name: 'Disk', value: systemHealth.disk, color: '#ffc658' },
                        { name: 'Network', value: systemHealth.network, color: '#ff7300' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cpu > 80 ? '#ff6b6b' : '#82ca9d'} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Active alerts and notifications from the monitoring system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getAlertColor(alert.type)}>
                          {alert.type}
                        </Badge>
                        <Badge variant="outline">
                          {alert.severity}
                        </Badge>
                        {!alert.acknowledged && (
                          <Badge variant="destructive">
                            New
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="font-medium mb-1">{alert.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Source: {alert.source}
                      </span>
                      <div className="flex items-center space-x-2">
                        {!alert.acknowledged && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAcknowledgeAlert(alert.id)}
                            disabled={loading}
                          >
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDismissAlert(alert.id)}
                          disabled={loading}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>
                  Automated performance insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Memory Optimization</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Memory usage is approaching warning threshold. Consider implementing memory optimization.
                    </p>
                    <div className="flex items-center space-x-2">
                                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>
                      <span className="text-xs text-muted-foreground">Detected 2 minutes ago</span>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Response Time Improvement</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      API response times have improved by 15% after recent optimizations.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">Positive Trend</Badge>
                      <span className="text-xs text-muted-foreground">Updated 5 minutes ago</span>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Error Rate Analysis</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Error rate is within acceptable limits. System stability is good.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">Stable</Badge>
                      <span className="text-xs text-muted-foreground">Last checked 1 minute ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
                <CardDescription>
                  Current resource usage and capacity planning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">CPU Cores</span>
                      <span className="text-sm text-muted-foreground">8 cores</span>
                    </div>
                    <Progress value={67} className="mb-2" />
                    <p className="text-xs text-muted-foreground">67% utilization</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Memory</span>
                      <span className="text-sm text-muted-foreground">16 GB</span>
                    </div>
                    <Progress value={78} className="mb-2" />
                    <p className="text-xs text-muted-foreground">12.5 GB used</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Storage</span>
                      <span className="text-sm text-muted-foreground">500 GB</span>
                    </div>
                    <Progress value={45} className="mb-2" />
                    <p className="text-xs text-muted-foreground">225 GB used</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Network</span>
                      <span className="text-sm text-muted-foreground">1 Gbps</span>
                    </div>
                    <Progress value={85} className="mb-2" />
                    <p className="text-xs text-muted-foreground">850 Mbps used</p>
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

export default PerformanceMonitor;
