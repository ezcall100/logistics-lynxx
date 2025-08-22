import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Icons
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Activity, Clock, Zap,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Shield, Key, Wifi, HardDrive, Cpu,
  WifiOff, AlertCircle, Info,
  Server, Cloud, GitPullRequest, GitCommit, GitMerge,
  Package, Docker, Kubernetes, Loader, Terminal, Workflow,
  Rocket, ShieldCheck, Monitor, ActivitySquare,
  Search, Table as TableIcon, Key as KeyIcon, Link,
  BarChart, Database, Network,
  ShieldX, ShieldAlert, ShieldCheck as ShieldCheckIcon,
  Target, Database as DatabaseIcon, Cpu as CpuIcon,
  HardDrive as HardDriveIcon, Wifi as WifiIcon, Clock as ClockIcon,
  AlertTriangle, CheckCircle, Minus, ArrowUpRight, ArrowDownRight,
  LayoutDashboard, Users, DollarSign, Package as PackageIcon,
  Truck, Calendar, FileText, Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
  Gauge, Zap as ZapIcon, Timer, Speed, Target as TargetIcon
} from 'lucide-react';

// Enhanced data models
interface PerformanceReport {
  id: string;
  name: string;
  type: 'response_time' | 'throughput' | 'error_rate' | 'availability' | 'resource_usage' | 'bottlenecks';
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  lastGenerated: string;
  nextRun: string;
  format: 'pdf' | 'csv' | 'excel' | 'json' | 'html';
  recipients: string[];
  size: string;
  description: string;
  schedule?: string;
  parameters?: Record<string, any>;
}

interface PerformanceMetric {
  id: string;
  name: string;
  category: 'response_time' | 'throughput' | 'error_rate' | 'availability' | 'resource_usage';
  value: number;
  unit: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  timestamp: string;
  description: string;
  target?: number;
  threshold?: {
    warning: number;
    critical: number;
  };
}

interface PerformanceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'response_time' | 'throughput' | 'error_rate' | 'availability' | 'resource_usage';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  resolution?: string;
  system?: string;
  metric?: string;
  currentValue: number;
  threshold: number;
}

interface PerformanceEndpoint {
  id: string;
  endpoint: string;
  method: string;
  avgResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  requestCount: number;
  errorRate: number;
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastUpdated: string;
  throughput: number;
  concurrentUsers: number;
}

// Mock API functions
const mockAPI = {
  getPerformanceReports: (): Promise<PerformanceReport[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Daily Performance Summary',
        type: 'response_time',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 82800000).toISOString(),
        format: 'pdf',
        recipients: ['admin@transbot.ai', 'devops@transbot.ai'],
        size: '2.1 MB',
        description: 'Daily performance metrics and response time analysis',
        schedule: '0 6 * * *',
        parameters: { includeEndpoints: true, includeAlerts: true }
      },
      {
        id: '2',
        name: 'Weekly Throughput Analysis',
        type: 'throughput',
        status: 'scheduled',
        lastGenerated: new Date(Date.now() - 604800000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'excel',
        recipients: ['performance@transbot.ai'],
        size: '3.2 MB',
        description: 'Weekly throughput and capacity analysis',
        schedule: '0 9 * * 1',
        parameters: { includeCapacity: true, includeScaling: true }
      },
      {
        id: '3',
        name: 'Error Rate Monitoring',
        type: 'error_rate',
        status: 'running',
        lastGenerated: new Date(Date.now() - 1800000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString(),
        format: 'html',
        recipients: ['admin@transbot.ai'],
        size: '1.8 MB',
        description: 'Real-time error rate monitoring and alerting',
        schedule: '*/5 * * * *',
        parameters: { includeStackTraces: true, includeTrends: true }
      },
      {
        id: '4',
        name: 'System Availability Report',
        type: 'availability',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 7200000).toISOString(),
        nextRun: new Date(Date.now() + 3600000).toISOString(),
        format: 'csv',
        recipients: ['ops@transbot.ai'],
        size: '2.5 MB',
        description: 'System availability and uptime metrics',
        schedule: '0 */4 * * *',
        parameters: { includeDowntime: true, includeSLAs: true }
      },
      {
        id: '5',
        name: 'Resource Usage Analysis',
        type: 'resource_usage',
        status: 'failed',
        lastGenerated: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString(),
        format: 'pdf',
        recipients: ['infrastructure@transbot.ai'],
        size: '0 MB',
        description: 'CPU, memory, and disk usage analysis',
        schedule: '0 */2 * * *',
        parameters: { includeTrends: true, includePredictions: true }
      }
    ]),

  getPerformanceMetrics: (): Promise<PerformanceMetric[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Average Response Time',
        category: 'response_time',
        value: 145,
        unit: 'ms',
        change: -12,
        changePercent: -7.6,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Average API response time across all endpoints',
        target: 100,
        threshold: { warning: 200, critical: 500 }
      },
      {
        id: '2',
        name: 'P95 Response Time',
        category: 'response_time',
        value: 234,
        unit: 'ms',
        change: -18,
        changePercent: -7.1,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: '95th percentile response time',
        target: 300,
        threshold: { warning: 500, critical: 1000 }
      },
      {
        id: '3',
        name: 'Requests Per Second',
        category: 'throughput',
        value: 1247,
        unit: 'req/s',
        change: 89,
        changePercent: 7.7,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Total requests processed per second',
        target: 1000,
        threshold: { warning: 800, critical: 600 }
      },
      {
        id: '4',
        name: 'Error Rate',
        category: 'error_rate',
        value: 0.2,
        unit: '%',
        change: -0.1,
        changePercent: -33.3,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Percentage of requests resulting in errors',
        target: 0.5,
        threshold: { warning: 1, critical: 5 }
      },
      {
        id: '5',
        name: 'System Uptime',
        category: 'availability',
        value: 99.8,
        unit: '%',
        change: 0.1,
        changePercent: 0.1,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'System availability over the last 30 days',
        target: 99.9,
        threshold: { warning: 99.5, critical: 99.0 }
      },
      {
        id: '6',
        name: 'CPU Usage',
        category: 'resource_usage',
        value: 23.5,
        unit: '%',
        change: -5.2,
        changePercent: -18.1,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Average CPU utilization across all servers',
        target: 70,
        threshold: { warning: 80, critical: 90 }
      }
    ]),

  getPerformanceAlerts: (): Promise<PerformanceAlert[]> => 
    Promise.resolve([
      {
        id: '1',
        title: 'High Response Time Detected',
        description: 'API response time has exceeded 500ms threshold',
        severity: 'medium',
        category: 'response_time',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'acknowledged',
        assignedTo: 'devops@transbot.ai',
        system: 'api-gateway',
        metric: 'response_time',
        currentValue: 523,
        threshold: 500
      },
      {
        id: '2',
        title: 'Error Rate Spike',
        description: 'Error rate has increased to 2.1%',
        severity: 'high',
        category: 'error_rate',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        status: 'active',
        system: 'user-service',
        metric: 'error_rate',
        currentValue: 2.1,
        threshold: 1.0
      },
      {
        id: '3',
        title: 'Throughput Degradation',
        description: 'Request throughput has dropped below 800 req/s',
        severity: 'medium',
        category: 'throughput',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'active',
        system: 'load-balancer',
        metric: 'throughput',
        currentValue: 756,
        threshold: 800
      }
    ]),

  getPerformanceEndpoints: (): Promise<PerformanceEndpoint[]> => 
    Promise.resolve([
      {
        id: '1',
        endpoint: '/api/users',
        method: 'GET',
        avgResponseTime: 145,
        p95ResponseTime: 234,
        p99ResponseTime: 456,
        requestCount: 1247,
        errorRate: 0.2,
        status: 'healthy',
        lastUpdated: new Date().toISOString(),
        throughput: 45.2,
        concurrentUsers: 89
      },
      {
        id: '2',
        endpoint: '/api/loads',
        method: 'POST',
        avgResponseTime: 234,
        p95ResponseTime: 456,
        p99ResponseTime: 789,
        requestCount: 567,
        errorRate: 1.2,
        status: 'degraded',
        lastUpdated: new Date().toISOString(),
        throughput: 23.1,
        concurrentUsers: 45
      },
      {
        id: '3',
        endpoint: '/api/quotes',
        method: 'GET',
        avgResponseTime: 89,
        p95ResponseTime: 156,
        p99ResponseTime: 234,
        requestCount: 2341,
        errorRate: 0.1,
        status: 'healthy',
        lastUpdated: new Date().toISOString(),
        throughput: 67.8,
        concurrentUsers: 123
      }
    ])
};

const PerformanceReportsPage = () => {
  const [reports, setReports] = useState<PerformanceReport[]>([]);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [endpoints, setEndpoints] = useState<PerformanceEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newReportDialog, setNewReportDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPerformanceData();
  }, []);

  const loadPerformanceData = async () => {
    try {
      setLoading(true);
      const [reportsData, metricsData, alertsData, endpointsData] = await Promise.all([
        mockAPI.getPerformanceReports(),
        mockAPI.getPerformanceMetrics(),
        mockAPI.getPerformanceAlerts(),
        mockAPI.getPerformanceEndpoints()
      ]);
      setReports(reportsData);
      setMetrics(metricsData);
      setAlerts(alertsData);
      setEndpoints(endpointsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load performance data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'scheduled': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDownIcon className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEndpointStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50';
      case 'degraded': return 'text-yellow-600 bg-yellow-50';
      case 'unhealthy': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading performance reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Reports</h1>
          <p className="text-muted-foreground">
            System performance metrics, response times, and throughput analysis
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadPerformanceData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewReportDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Performance Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <Card key={metric.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{metric.name}</CardTitle>
                <Badge variant={metric.status === 'critical' ? 'destructive' : metric.status === 'warning' ? 'secondary' : 'default'}>
                  {metric.status}
                </Badge>
              </div>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {metric.value}{metric.unit}
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
                {metric.target && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target</span>
                      <span>{metric.target}{metric.unit}</span>
                    </div>
                    <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports and Analytics */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Performance Reports</TabsTrigger>
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="alerts">Performance Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="type">Type:</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="response_time">Response Time</SelectItem>
                      <SelectItem value="throughput">Throughput</SelectItem>
                      <SelectItem value="error_rate">Error Rate</SelectItem>
                      <SelectItem value="availability">Availability</SelectItem>
                      <SelectItem value="resource_usage">Resource Usage</SelectItem>
                      <SelectItem value="bottlenecks">Bottlenecks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="status">Status:</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Reports</CardTitle>
              <CardDescription>
                Manage and generate performance analysis reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">{report.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {report.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(report.lastGenerated).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(report.nextRun).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="uppercase">
                          {report.format}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
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

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoint Performance</CardTitle>
              <CardDescription>
                Real-time performance metrics for API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Avg Response</TableHead>
                    <TableHead>P95 Response</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead>Error Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpoints.map(endpoint => (
                    <TableRow key={endpoint.id}>
                      <TableCell>
                        <div className="font-mono text-sm">{endpoint.endpoint}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{endpoint.method}</Badge>
                      </TableCell>
                      <TableCell>{endpoint.avgResponseTime}ms</TableCell>
                      <TableCell>{endpoint.p95ResponseTime}ms</TableCell>
                      <TableCell>{endpoint.requestCount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={endpoint.errorRate > 1 ? 'text-red-600' : 'text-green-600'}>
                          {endpoint.errorRate}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getEndpointStatusColor(endpoint.status)}>
                          {endpoint.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
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
              <CardTitle>Performance Alerts</CardTitle>
              <CardDescription>
                Active performance alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-medium">{alert.title}</div>
                          <div className="text-sm text-muted-foreground">{alert.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString()} • {alert.system}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                        {alert.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {alert.currentValue} / {alert.threshold}
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                    <p>No active performance alerts</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Response time trends chart will be implemented here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Throughput Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Throughput analysis chart will be implemented here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Report Dialog */}
      <Dialog open={newReportDialog} onOpenChange={setNewReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Performance Report</DialogTitle>
            <DialogDescription>
              Configure a new performance analysis report
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Report Name</Label>
              <Input
                id="name"
                placeholder="Enter report name"
              />
            </div>
            <div>
              <Label htmlFor="type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="response_time">Response Time</SelectItem>
                  <SelectItem value="throughput">Throughput</SelectItem>
                  <SelectItem value="error_rate">Error Rate</SelectItem>
                  <SelectItem value="availability">Availability</SelectItem>
                  <SelectItem value="resource_usage">Resource Usage</SelectItem>
                  <SelectItem value="bottlenecks">Bottlenecks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewReportDialog(false)}>
              Cancel
            </Button>
            <Button>
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceReportsPage;
