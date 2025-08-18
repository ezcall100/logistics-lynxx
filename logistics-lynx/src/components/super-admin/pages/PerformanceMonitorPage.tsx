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
  Gauge, TrendingUp, TrendingDown, Activity, Clock, Zap,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Key, Wifi, HardDrive, Cpu,
  WifiOff, AlertCircle, Info,
  Server, Cloud, GitPullRequest, GitCommit, GitMerge,
  Package, Docker, Kubernetes, Loader, Terminal, Workflow,
  Rocket, ShieldCheck, Monitor, BarChart3, ActivitySquare,
  Search, Table as TableIcon, Key as KeyIcon, Link,
  BarChart, PieChart, Database, Network,
  ShieldX, ShieldAlert, ShieldCheck as ShieldCheckIcon,
  Target, Database as DatabaseIcon, Cpu as CpuIcon,
  HardDrive as HardDriveIcon, Wifi as WifiIcon, Clock as ClockIcon
} from 'lucide-react';

// Real data models
interface PerformanceMetric {
  id: string;
  name: string;
  category: 'cpu' | 'memory' | 'disk' | 'network' | 'database' | 'api' | 'frontend';
  value: number;
  unit: string;
  threshold: number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  description: string;
}

interface PerformanceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metric: string;
  currentValue: number;
  threshold: number;
  triggeredAt: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  resolution?: string;
  category: 'performance' | 'availability' | 'error_rate' | 'latency';
}

interface APIPerformance {
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

interface DatabasePerformance {
  id: string;
  database: string;
  query: string;
  avgExecutionTime: number;
  maxExecutionTime: number;
  executionCount: number;
  cacheHitRate: number;
  slowQueries: number;
  connections: number;
  status: 'optimal' | 'warning' | 'critical';
  lastAnalyzed: string;
  tableSize: string;
  indexUsage: number;
}

interface FrontendPerformance {
  id: string;
  page: string;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  lighthouseScore: number;
  status: 'excellent' | 'good' | 'needs_improvement' | 'poor';
  lastTested: string;
  userExperience: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

interface PerformanceOptimization {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'infrastructure';
  priority: 'low' | 'medium' | 'high' | 'critical';
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  status: 'proposed' | 'in_progress' | 'completed' | 'cancelled';
  estimatedSavings: number;
  implementationCost: number;
  roi: number;
  assignedTo?: string;
  deadline?: string;
  progress: number;
}

// Mock API functions
const mockAPI = {
  getPerformanceMetrics: (): Promise<PerformanceMetric[]> => Promise.resolve([
    {
      id: 'metric-001',
      name: 'CPU Usage',
      category: 'cpu',
      value: 75.2,
      unit: '%',
      threshold: 80,
      status: 'warning',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'up',
      changePercent: 5.2,
      description: 'Average CPU utilization across all servers'
    },
    {
      id: 'metric-002',
      name: 'Memory Usage',
      category: 'memory',
      value: 68.5,
      unit: '%',
      threshold: 85,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'stable',
      changePercent: 0.1,
      description: 'Average memory utilization across all servers'
    },
    {
      id: 'metric-003',
      name: 'API Response Time',
      category: 'api',
      value: 245,
      unit: 'ms',
      threshold: 500,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'down',
      changePercent: -12.3,
      description: 'Average API response time across all endpoints'
    },
    {
      id: 'metric-004',
      name: 'Database Query Time',
      category: 'database',
      value: 89,
      unit: 'ms',
      threshold: 200,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'stable',
      changePercent: 1.2,
      description: 'Average database query execution time'
    },
    {
      id: 'metric-005',
      name: 'Page Load Time',
      category: 'frontend',
      value: 1.8,
      unit: 's',
      threshold: 3.0,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'down',
      changePercent: -8.5,
      description: 'Average page load time across all pages'
    }
  ]),

  getPerformanceAlerts: (): Promise<PerformanceAlert[]> => Promise.resolve([
    {
      id: 'alert-001',
      title: 'High CPU Usage Detected',
      description: 'CPU usage has exceeded 80% threshold on production servers',
      severity: 'high',
      metric: 'CPU Usage',
      currentValue: 85.2,
      threshold: 80,
      triggeredAt: '2024-01-15T10:25:00Z',
      status: 'active',
      assignedTo: 'devops-team',
      category: 'performance'
    },
    {
      id: 'alert-002',
      title: 'Slow API Response Time',
      description: 'API response time has increased significantly',
      severity: 'medium',
      metric: 'API Response Time',
      currentValue: 650,
      threshold: 500,
      triggeredAt: '2024-01-15T09:45:00Z',
      status: 'acknowledged',
      assignedTo: 'backend-team',
      resolution: 'Investigating database connection pool issues',
      category: 'latency'
    },
    {
      id: 'alert-003',
      title: 'Database Connection Pool Exhausted',
      description: 'Database connection pool has reached maximum capacity',
      severity: 'critical',
      metric: 'Database Connections',
      currentValue: 100,
      threshold: 95,
      triggeredAt: '2024-01-15T08:30:00Z',
      status: 'resolved',
      assignedTo: 'database-admin',
      resolution: 'Increased connection pool size and optimized queries',
      category: 'availability'
    }
  ]),

  getAPIPerformance: (): Promise<APIPerformance[]> => Promise.resolve([
    {
      id: 'api-001',
      endpoint: '/api/users',
      method: 'GET',
      avgResponseTime: 120,
      p95ResponseTime: 350,
      p99ResponseTime: 580,
      requestCount: 15420,
      errorRate: 0.2,
      status: 'healthy',
      lastUpdated: '2024-01-15T10:30:00Z',
      throughput: 1250,
      concurrentUsers: 45
    },
    {
      id: 'api-002',
      endpoint: '/api/orders',
      method: 'POST',
      avgResponseTime: 280,
      p95ResponseTime: 650,
      p99ResponseTime: 1200,
      requestCount: 8230,
      errorRate: 1.5,
      status: 'degraded',
      lastUpdated: '2024-01-15T10:30:00Z',
      throughput: 680,
      concurrentUsers: 32
    },
    {
      id: 'api-003',
      endpoint: '/api/reports',
      method: 'GET',
      avgResponseTime: 850,
      p95ResponseTime: 2100,
      p99ResponseTime: 3500,
      requestCount: 2340,
      errorRate: 0.8,
      status: 'healthy',
      lastUpdated: '2024-01-15T10:30:00Z',
      throughput: 180,
      concurrentUsers: 12
    }
  ]),

  getDatabasePerformance: (): Promise<DatabasePerformance[]> => Promise.resolve([
    {
      id: 'db-001',
      database: 'users_db',
      query: 'SELECT * FROM users WHERE status = ?',
      avgExecutionTime: 45,
      maxExecutionTime: 120,
      executionCount: 12500,
      cacheHitRate: 92.5,
      slowQueries: 15,
      connections: 25,
      status: 'optimal',
      lastAnalyzed: '2024-01-15T10:30:00Z',
      tableSize: '2.5 GB',
      indexUsage: 95.2
    },
    {
      id: 'db-002',
      database: 'orders_db',
      query: 'SELECT o.*, u.name FROM orders o JOIN users u ON o.user_id = u.id',
      avgExecutionTime: 180,
      maxExecutionTime: 450,
      executionCount: 8200,
      cacheHitRate: 78.3,
      slowQueries: 45,
      connections: 18,
      status: 'warning',
      lastAnalyzed: '2024-01-15T10:30:00Z',
      tableSize: '8.2 GB',
      indexUsage: 82.1
    },
    {
      id: 'db-003',
      database: 'analytics_db',
      query: 'SELECT date, SUM(amount) FROM transactions GROUP BY date',
      avgExecutionTime: 320,
      maxExecutionTime: 1200,
      executionCount: 1200,
      cacheHitRate: 65.8,
      slowQueries: 28,
      connections: 12,
      status: 'optimal',
      lastAnalyzed: '2024-01-15T10:30:00Z',
      tableSize: '15.8 GB',
      indexUsage: 88.7
    }
  ]),

  getFrontendPerformance: (): Promise<FrontendPerformance[]> => Promise.resolve([
    {
      id: 'fe-001',
      page: '/dashboard',
      loadTime: 1.2,
      firstContentfulPaint: 0.8,
      largestContentfulPaint: 1.5,
      cumulativeLayoutShift: 0.05,
      firstInputDelay: 0.1,
      lighthouseScore: 95,
      status: 'excellent',
      lastTested: '2024-01-15T10:30:00Z',
      userExperience: 98,
      accessibility: 92,
      bestPractices: 96,
      seo: 94
    },
    {
      id: 'fe-002',
      page: '/orders',
      loadTime: 2.1,
      firstContentfulPaint: 1.3,
      largestContentfulPaint: 2.8,
      cumulativeLayoutShift: 0.12,
      firstInputDelay: 0.3,
      lighthouseScore: 78,
      status: 'good',
      lastTested: '2024-01-15T10:30:00Z',
      userExperience: 82,
      accessibility: 85,
      bestPractices: 88,
      seo: 90
    },
    {
      id: 'fe-003',
      page: '/reports',
      loadTime: 3.5,
      firstContentfulPaint: 2.1,
      largestContentfulPaint: 4.2,
      cumulativeLayoutShift: 0.18,
      firstInputDelay: 0.6,
      lighthouseScore: 65,
      status: 'needs_improvement',
      lastTested: '2024-01-15T10:30:00Z',
      userExperience: 68,
      accessibility: 75,
      bestPractices: 72,
      seo: 78
    }
  ]),

  getPerformanceOptimizations: (): Promise<PerformanceOptimization[]> => Promise.resolve([
    {
      id: 'opt-001',
      title: 'Implement Database Query Caching',
      description: 'Add Redis caching layer for frequently accessed database queries',
      category: 'database',
      priority: 'high',
      impact: 'high',
      effort: 'medium',
      status: 'in_progress',
      estimatedSavings: 45,
      implementationCost: 15,
      roi: 300,
      assignedTo: 'backend-team',
      deadline: '2024-01-25T00:00:00Z',
      progress: 60
    },
    {
      id: 'opt-002',
      title: 'Optimize Frontend Bundle Size',
      description: 'Implement code splitting and tree shaking to reduce bundle size',
      category: 'frontend',
      priority: 'medium',
      impact: 'medium',
      effort: 'low',
      status: 'completed',
      estimatedSavings: 25,
      implementationCost: 8,
      roi: 312,
      assignedTo: 'frontend-team',
      progress: 100
    },
    {
      id: 'opt-003',
      title: 'Upgrade Database Indexes',
      description: 'Add composite indexes for frequently used query patterns',
      category: 'database',
      priority: 'high',
      impact: 'high',
      effort: 'low',
      status: 'proposed',
      estimatedSavings: 35,
      implementationCost: 5,
      roi: 700,
      assignedTo: 'database-admin',
      progress: 0
    }
  ])
};

const PerformanceMonitorPage = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [apiPerformance, setApiPerformance] = useState<APIPerformance[]>([]);
  const [dbPerformance, setDbPerformance] = useState<DatabasePerformance[]>([]);
  const [frontendPerformance, setFrontendPerformance] = useState<FrontendPerformance[]>([]);
  const [optimizations, setOptimizations] = useState<PerformanceOptimization[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAlertDialog, setNewAlertDialog] = useState(false);
  const [newOptimizationDialog, setNewOptimizationDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        metricsData,
        alertsData,
        apiData,
        dbData,
        frontendData,
        optimizationsData
      ] = await Promise.all([
        mockAPI.getPerformanceMetrics(),
        mockAPI.getPerformanceAlerts(),
        mockAPI.getAPIPerformance(),
        mockAPI.getDatabasePerformance(),
        mockAPI.getFrontendPerformance(),
        mockAPI.getPerformanceOptimizations()
      ]);

      setMetrics(metricsData);
      setAlerts(alertsData);
      setApiPerformance(apiData);
      setDbPerformance(dbData);
      setFrontendPerformance(frontendData);
      setOptimizations(optimizationsData);
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
      case 'normal':
      case 'healthy':
      case 'optimal':
      case 'excellent':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'degraded':
      case 'good':
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'unhealthy':
      case 'needs_improvement':
      case 'poor':
      case 'active':
        return 'bg-red-100 text-red-800';
      case 'acknowledged':
      case 'proposed':
        return 'bg-blue-100 text-blue-800';
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleAcknowledgeAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(a => a.id === id ? { ...a, status: 'acknowledged' as const } : a)
    );
    toast({
      title: "Alert Acknowledged",
      description: "Performance alert has been acknowledged",
    });
  };

  const handleResolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(a => a.id === id ? { ...a, status: 'resolved' as const } : a)
    );
    toast({
      title: "Alert Resolved",
      description: "Performance alert has been resolved",
    });
  };

  const handleAddOptimization = () => {
    toast({
      title: "Optimization Added",
      description: "New performance optimization has been added",
    });
    setNewOptimizationDialog(false);
  };

  const handleUpdateOptimizationProgress = (id: string, progress: number) => {
    setOptimizations(prev => 
      prev.map(o => o.id === id ? { ...o, progress } : o)
    );
    toast({
      title: "Progress Updated",
      description: `Optimization progress updated to ${progress}%`,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading performance data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Monitor Agent</h1>
          <p className="text-muted-foreground">
            Real-time performance monitoring, optimization, and alerting
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setNewAlertDialog(true)}>
            <Bell className="h-4 w-4 mr-2" />
            Create Alert
          </Button>
          <Button onClick={() => setNewOptimizationDialog(true)} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Optimization
          </Button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              {metrics.filter(m => m.status === 'normal').length} of {metrics.length} metrics healthy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {alerts.filter(a => a.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {alerts.filter(a => a.severity === 'critical').length} critical alerts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 inline mr-1" />
              12% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimizations</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {optimizations.filter(o => o.status === 'in_progress').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {optimizations.filter(o => o.status === 'completed').length} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="api">API Performance</TabsTrigger>
          <TabsTrigger value="database">Database Performance</TabsTrigger>
          <TabsTrigger value="frontend">Frontend Performance</TabsTrigger>
          <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
        </TabsList>

        {/* Performance Metrics Tab */}
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Performance Metrics</CardTitle>
              <CardDescription>
                Monitor key performance indicators across all systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{metric.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {metric.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {metric.value}{metric.unit}
                          </span>
                          <Progress 
                            value={(metric.value / metric.threshold) * 100} 
                            className="w-16" 
                          />
                        </div>
                      </TableCell>
                      <TableCell>{metric.threshold}{metric.unit}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-red-500" />}
                          {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-green-500" />}
                          {metric.trend === 'stable' && <Activity className="h-4 w-4 text-gray-500" />}
                          <span className="text-sm">{metric.trend}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={metric.changePercent > 0 ? 'text-red-500' : 'text-green-500'}>
                          {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(metric.timestamp).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Alerts</CardTitle>
              <CardDescription>
                Monitor and manage performance alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current Value</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
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
                      <TableCell>{alert.metric}</TableCell>
                      <TableCell>{alert.currentValue}</TableCell>
                      <TableCell>{alert.threshold}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {alert.assignedTo || 'Unassigned'}
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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Performance Tab */}
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Performance Monitoring</CardTitle>
              <CardDescription>
                Track API response times, error rates, and throughput
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Avg Response Time</TableHead>
                    <TableHead>P95 Response Time</TableHead>
                    <TableHead>Error Rate</TableHead>
                    <TableHead>Throughput</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiPerformance.map((api) => (
                    <TableRow key={api.id}>
                      <TableCell className="font-medium">{api.endpoint}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{api.method}</Badge>
                      </TableCell>
                      <TableCell>{api.avgResponseTime}ms</TableCell>
                      <TableCell>{api.p95ResponseTime}ms</TableCell>
                      <TableCell>
                        <span className={api.errorRate > 1 ? 'text-red-500' : 'text-green-500'}>
                          {api.errorRate}%
                        </span>
                      </TableCell>
                      <TableCell>{api.throughput} req/s</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(api.status)}>
                          {api.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4" />
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

        {/* Database Performance Tab */}
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Performance</CardTitle>
              <CardDescription>
                Monitor database query performance and optimization opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Database</TableHead>
                    <TableHead>Query</TableHead>
                    <TableHead>Avg Execution Time</TableHead>
                    <TableHead>Cache Hit Rate</TableHead>
                    <TableHead>Slow Queries</TableHead>
                    <TableHead>Connections</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dbPerformance.map((db) => (
                    <TableRow key={db.id}>
                      <TableCell className="font-medium">{db.database}</TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {db.query}
                        </div>
                      </TableCell>
                      <TableCell>{db.avgExecutionTime}ms</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{db.cacheHitRate}%</span>
                          <Progress value={db.cacheHitRate} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={db.slowQueries > 20 ? 'text-red-500' : 'text-green-500'}>
                          {db.slowQueries}
                        </span>
                      </TableCell>
                      <TableCell>{db.connections}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(db.status)}>
                          {db.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <DatabaseIcon className="h-4 w-4" />
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

        {/* Frontend Performance Tab */}
        <TabsContent value="frontend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Performance</CardTitle>
              <CardDescription>
                Monitor page load times and Core Web Vitals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Load Time</TableHead>
                    <TableHead>LCP</TableHead>
                    <TableHead>CLS</TableHead>
                    <TableHead>FID</TableHead>
                    <TableHead>Lighthouse Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {frontendPerformance.map((fe) => (
                    <TableRow key={fe.id}>
                      <TableCell className="font-medium">{fe.page}</TableCell>
                      <TableCell>{fe.loadTime}s</TableCell>
                      <TableCell>{fe.largestContentfulPaint}s</TableCell>
                      <TableCell>{fe.cumulativeLayoutShift}</TableCell>
                      <TableCell>{fe.firstInputDelay}s</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{fe.lighthouseScore}</span>
                          <Progress value={fe.lighthouseScore} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(fe.status)}>
                          {fe.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Zap className="h-4 w-4" />
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

        {/* Optimizations Tab */}
        <TabsContent value="optimizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Optimizations</CardTitle>
              <CardDescription>
                Track and manage performance optimization initiatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Optimization</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>ROI</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {optimizations.map((opt) => (
                    <TableRow key={opt.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{opt.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {opt.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{opt.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(opt.priority)}>
                          {opt.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{opt.impact}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-500 font-medium">
                          {opt.roi}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={opt.progress} className="w-16" />
                          <span className="text-sm">{opt.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(opt.status)}>
                          {opt.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateOptimizationProgress(opt.id, Math.min(opt.progress + 10, 100))}
                          >
                            <TrendingUp className="h-4 w-4" />
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
      </Tabs>

      {/* New Alert Dialog */}
      <Dialog open={newAlertDialog} onOpenChange={setNewAlertDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Performance Alert</DialogTitle>
            <DialogDescription>
              Set up a new performance monitoring alert
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="alert-title">Alert Title</Label>
              <Input id="alert-title" placeholder="Enter alert title" />
            </div>
            <div>
              <Label htmlFor="alert-description">Description</Label>
              <Textarea id="alert-description" placeholder="Enter alert description" />
            </div>
            <div>
              <Label htmlFor="alert-severity">Severity</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alert-metric">Metric</Label>
              <Input id="alert-metric" placeholder="Enter metric name" />
            </div>
            <div>
              <Label htmlFor="alert-threshold">Threshold</Label>
              <Input id="alert-threshold" placeholder="Enter threshold value" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAlertDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setNewAlertDialog(false)}>
              Create Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Optimization Dialog */}
      <Dialog open={newOptimizationDialog} onOpenChange={setNewOptimizationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Performance Optimization</DialogTitle>
            <DialogDescription>
              Propose a new performance optimization initiative
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="opt-title">Optimization Title</Label>
              <Input id="opt-title" placeholder="Enter optimization title" />
            </div>
            <div>
              <Label htmlFor="opt-description">Description</Label>
              <Textarea id="opt-description" placeholder="Enter optimization description" />
            </div>
            <div>
              <Label htmlFor="opt-category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="opt-priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="opt-impact">Impact</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewOptimizationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddOptimization}>
              Add Optimization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceMonitorPage;
