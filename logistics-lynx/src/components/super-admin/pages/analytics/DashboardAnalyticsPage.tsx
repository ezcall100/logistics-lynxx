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
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon
} from 'lucide-react';

// Enhanced data models
interface DashboardMetric {
  id: string;
  name: string;
  category: 'users' | 'revenue' | 'performance' | 'security' | 'operations';
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

interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'metric' | 'table' | 'list';
  data: any;
  position: { x: number; y: number; w: number; h: number };
  refreshInterval: number;
  lastUpdated: string;
  isVisible: boolean;
  isEditable: boolean;
}

interface DashboardConfig {
  id: string;
  name: string;
  description: string;
  layout: DashboardWidget[];
  refreshInterval: number;
  isDefault: boolean;
  createdBy: string;
  lastModified: string;
  permissions: string[];
}

// Mock API functions
const mockAPI = {
  getDashboardMetrics: (): Promise<DashboardMetric[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Active Users',
        category: 'users',
        value: 1247,
        unit: '',
        change: 89,
        changePercent: 7.7,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Number of active users in the last 24 hours',
        target: 1500,
        threshold: { warning: 1000, critical: 800 }
      },
      {
        id: '2',
        name: 'Revenue',
        category: 'revenue',
        value: 2847500,
        unit: '$',
        change: 156000,
        changePercent: 5.8,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Total revenue for the current month',
        target: 3000000,
        threshold: { warning: 2500000, critical: 2000000 }
      },
      {
        id: '3',
        name: 'System Uptime',
        category: 'performance',
        value: 99.8,
        unit: '%',
        change: 0.1,
        changePercent: 0.1,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'System uptime for the last 30 days',
        target: 99.9,
        threshold: { warning: 99.5, critical: 99.0 }
      },
      {
        id: '4',
        name: 'Security Score',
        category: 'security',
        value: 94.5,
        unit: '',
        change: -2.1,
        changePercent: -2.2,
        trend: 'down',
        status: 'warning',
        timestamp: new Date().toISOString(),
        description: 'Overall security health score',
        target: 95,
        threshold: { warning: 90, critical: 85 }
      },
      {
        id: '5',
        name: 'API Response Time',
        category: 'performance',
        value: 145,
        unit: 'ms',
        change: -12,
        changePercent: -7.6,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Average API response time',
        target: 100,
        threshold: { warning: 200, critical: 500 }
      },
      {
        id: '6',
        name: 'Load Volume',
        category: 'operations',
        value: 2847,
        unit: '',
        change: 234,
        changePercent: 9.0,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Total load volume processed',
        target: 3000,
        threshold: { warning: 2500, critical: 2000 }
      }
    ]),

  getDashboardConfigs: (): Promise<DashboardConfig[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Executive Dashboard',
        description: 'High-level overview for executives',
        layout: [],
        refreshInterval: 300000,
        isDefault: true,
        createdBy: 'admin@transbot.ai',
        lastModified: new Date().toISOString(),
        permissions: ['super_admin', 'admin']
      },
      {
        id: '2',
        name: 'Operations Dashboard',
        description: 'Detailed operational metrics',
        layout: [],
        refreshInterval: 60000,
        isDefault: false,
        createdBy: 'admin@transbot.ai',
        lastModified: new Date().toISOString(),
        permissions: ['super_admin', 'admin', 'operator']
      }
    ])
};

const DashboardAnalyticsPage = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [configs, setConfigs] = useState<DashboardConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConfig, setSelectedConfig] = useState<string>('1');
  const [refreshInterval, setRefreshInterval] = useState<number>(30000);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [newConfigDialog, setNewConfigDialog] = useState(false);
  const [newConfig, setNewConfig] = useState({
    name: '',
    description: '',
    refreshInterval: 300000
  });
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();
    
    if (autoRefresh) {
      const interval = setInterval(loadDashboardData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [metricsData, configsData] = await Promise.all([
        mockAPI.getDashboardMetrics(),
        mockAPI.getDashboardConfigs()
      ]);
      setMetrics(metricsData);
      setConfigs(configsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'critical': return 'text-red-600 bg-red-50';
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

  const createNewConfig = async () => {
    try {
      const config: DashboardConfig = {
        id: Date.now().toString(),
        name: newConfig.name,
        description: newConfig.description,
        layout: [],
        refreshInterval: newConfig.refreshInterval,
        isDefault: false,
        createdBy: 'admin@transbot.ai',
        lastModified: new Date().toISOString(),
        permissions: ['super_admin']
      };
      
      setConfigs(prev => [...prev, config]);
      setNewConfigDialog(false);
      setNewConfig({ name: '', description: '', refreshInterval: 300000 });
      
      toast({
        title: "Success",
        description: "Dashboard configuration created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create dashboard configuration",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading dashboard analytics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Analytics</h1>
          <p className="text-muted-foreground">
            Real-time dashboard metrics and performance analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadDashboardData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewConfigDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Dashboard
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="config">Dashboard:</Label>
                <Select value={selectedConfig} onValueChange={setSelectedConfig}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {configs.map(config => (
                      <SelectItem key={config.id} value={config.id}>
                        {config.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="refresh">Refresh:</Label>
                <Select value={refreshInterval.toString()} onValueChange={(value) => setRefreshInterval(Number(value))}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10000">10s</SelectItem>
                    <SelectItem value="30000">30s</SelectItem>
                    <SelectItem value="60000">1m</SelectItem>
                    <SelectItem value="300000">5m</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
              <Label htmlFor="auto-refresh">Auto Refresh</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <Card key={metric.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{metric.name}</CardTitle>
                <Badge className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <CardDescription className="text-sm">
                {metric.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {metric.unit}{metric.value.toLocaleString()}
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
                      <span>Progress</span>
                      <span>{((metric.value / metric.target) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                  </div>
                )}
                
                <div className="text-xs text-muted-foreground">
                  Last updated: {new Date(metric.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Metric Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['users', 'revenue', 'performance', 'security', 'operations'].map(category => {
                    const categoryMetrics = metrics.filter(m => m.category === category);
                    const avgStatus = categoryMetrics.reduce((acc, m) => {
                      const statusValues = { excellent: 4, good: 3, warning: 2, critical: 1 };
                      return acc + (statusValues[m.status as keyof typeof statusValues] || 0);
                    }, 0) / categoryMetrics.length;
                    
                    return (
                      <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="font-medium capitalize">{category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {categoryMetrics.length} metrics
                          </span>
                          <Badge variant={avgStatus >= 3 ? 'default' : avgStatus >= 2 ? 'secondary' : 'destructive'}>
                            {avgStatus >= 3 ? 'Good' : avgStatus >= 2 ? 'Warning' : 'Critical'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.slice(0, 5).map(metric => (
                    <div key={metric.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{metric.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {metric.unit}{metric.value.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(metric.trend)}
                        <span className="text-sm">
                          {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Trend charts will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Performance charts will be implemented here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {metrics.filter(m => m.status === 'warning' || m.status === 'critical').map(metric => (
                  <div key={metric.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-medium">{metric.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Current: {metric.unit}{metric.value.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant="destructive">{metric.status}</Badge>
                  </div>
                ))}
                {metrics.filter(m => m.status === 'warning' || m.status === 'critical').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                    <p>No active alerts</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Dashboard Configuration Dialog */}
      <Dialog open={newConfigDialog} onOpenChange={setNewConfigDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Dashboard</DialogTitle>
            <DialogDescription>
              Create a new dashboard configuration with custom metrics and layout.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Dashboard Name</Label>
              <Input
                id="name"
                value={newConfig.name}
                onChange={(e) => setNewConfig(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter dashboard name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newConfig.description}
                onChange={(e) => setNewConfig(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter dashboard description"
              />
            </div>
            <div>
              <Label htmlFor="refresh">Refresh Interval</Label>
              <Select value={newConfig.refreshInterval.toString()} onValueChange={(value) => setNewConfig(prev => ({ ...prev, refreshInterval: Number(value) }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10000">10 seconds</SelectItem>
                  <SelectItem value="30000">30 seconds</SelectItem>
                  <SelectItem value="60000">1 minute</SelectItem>
                  <SelectItem value="300000">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewConfigDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createNewConfig}>
              Create Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardAnalyticsPage;
