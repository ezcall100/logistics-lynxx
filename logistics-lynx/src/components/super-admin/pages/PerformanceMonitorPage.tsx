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
  HardDrive as HardDriveIcon, Wifi as WifiIcon, Clock as ClockIcon,
  AlertTriangle, CheckCircle, Minus, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

// Enhanced data models with comprehensive typing
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
  server?: string;
  environment?: 'production' | 'staging' | 'development';
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
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedResolutionTime?: string;
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
  version?: string;
  environment?: string;
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
  databaseType?: 'postgresql' | 'mysql' | 'mongodb' | 'redis';
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
  browser?: string;
  device?: string;
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
  tags?: string[];
  dependencies?: string[];
}

// Form interfaces for CRUD operations
interface MetricFormData {
  name: string;
  category: PerformanceMetric['category'];
  value: number;
  unit: string;
  threshold: number;
  description: string;
  server?: string;
  environment?: PerformanceMetric['environment'];
}

interface AlertFormData {
  title: string;
  description: string;
  severity: PerformanceAlert['severity'];
  metric: string;
  currentValue: number;
  threshold: number;
  category: PerformanceAlert['category'];
  priority: PerformanceAlert['priority'];
  assignedTo?: string;
}

interface OptimizationFormData {
  title: string;
  description: string;
  category: PerformanceOptimization['category'];
  priority: PerformanceOptimization['priority'];
  impact: PerformanceOptimization['impact'];
  effort: PerformanceOptimization['effort'];
  estimatedSavings: number;
  implementationCost: number;
  assignedTo?: string;
  deadline?: string;
  tags?: string[];
}

// Enhanced Mock API functions with comprehensive CRUD operations
const mockAPI = {
  // Performance Metrics CRUD
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
      description: 'Average CPU utilization across all servers',
      server: 'prod-server-01',
      environment: 'production'
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
      description: 'Average memory utilization across all servers',
      server: 'prod-server-01',
      environment: 'production'
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
      description: 'Average API response time across all endpoints',
      environment: 'production'
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
      description: 'Average database query execution time',
      environment: 'production'
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
      description: 'Average page load time across all pages',
      environment: 'production'
    },
    {
      id: 'metric-006',
      name: 'Network Latency',
      category: 'network',
      value: 45,
      unit: 'ms',
      threshold: 100,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'down',
      changePercent: -3.1,
      description: 'Average network latency to external services',
      environment: 'production'
    },
    {
      id: 'metric-007',
      name: 'Disk I/O',
      category: 'disk',
      value: 1250,
      unit: 'MB/s',
      threshold: 2000,
      status: 'normal',
      timestamp: '2024-01-15T10:30:00Z',
      trend: 'up',
      changePercent: 2.8,
      description: 'Disk I/O operations per second',
      server: 'prod-server-01',
      environment: 'production'
    }
  ]),
  
  createPerformanceMetric: (metric: MetricFormData): Promise<PerformanceMetric> => 
    Promise.resolve({
      ...metric,
      id: `metric-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'normal',
      trend: 'stable',
      changePercent: 0
    }),
    
  updatePerformanceMetric: (id: string, updates: Partial<PerformanceMetric>): Promise<PerformanceMetric> => 
    Promise.resolve({ id, ...updates } as PerformanceMetric),
    
  deletePerformanceMetric: (id: string): Promise<void> => Promise.resolve(),
  
  // Performance Alerts CRUD
  getPerformanceAlerts: (): Promise<PerformanceAlert[]> => Promise.resolve([
    {
      id: 'alert-001',
      title: 'High CPU Usage Detected',
      description: 'CPU usage has exceeded 80% threshold on multiple servers',
      severity: 'high',
      metric: 'CPU Usage',
      currentValue: 85.2,
      threshold: 80,
      triggeredAt: '2024-01-15T10:25:00Z',
      status: 'active',
      category: 'performance',
      priority: 'high'
    },
    {
      id: 'alert-002',
      title: 'API Response Time Degradation',
      description: 'API response times have increased by 15% in the last hour',
      severity: 'medium',
      metric: 'API Response Time',
      currentValue: 520,
      threshold: 500,
      triggeredAt: '2024-01-15T09:45:00Z',
      status: 'acknowledged',
      assignedTo: 'John Smith',
      category: 'latency',
      priority: 'medium'
    },
    {
      id: 'alert-003',
      title: 'Database Connection Pool Exhausted',
      description: 'Database connection pool is at 95% capacity',
      severity: 'critical',
      metric: 'Database Connections',
      currentValue: 95,
      threshold: 90,
      triggeredAt: '2024-01-15T10:15:00Z',
      status: 'active',
      category: 'availability',
      priority: 'critical'
    }
  ]),
  
  createPerformanceAlert: (alert: AlertFormData): Promise<PerformanceAlert> => 
    Promise.resolve({
      ...alert,
      id: `alert-${Date.now()}`,
      triggeredAt: new Date().toISOString(),
      status: 'active'
    }),
    
  updatePerformanceAlert: (id: string, updates: Partial<PerformanceAlert>): Promise<PerformanceAlert> => 
    Promise.resolve({ id, ...updates } as PerformanceAlert),
    
  deletePerformanceAlert: (id: string): Promise<void> => Promise.resolve(),
  
  // API Performance CRUD
  getAPIPerformance: (): Promise<APIPerformance[]> => Promise.resolve([
    {
      id: 'api-001',
      endpoint: '/api/users',
      method: 'GET',
      avgResponseTime: 245,
      p95ResponseTime: 450,
      p99ResponseTime: 890,
      requestCount: 12500,
      errorRate: 0.5,
      status: 'healthy',
      lastUpdated: '2024-01-15T10:30:00Z',
      throughput: 1250,
      concurrentUsers: 450,
      version: 'v1.2.0',
      environment: 'production'
    },
    {
      id: 'api-002',
      endpoint: '/api/orders',
      method: 'POST',
      avgResponseTime: 320,
      p95ResponseTime: 680,
      p99ResponseTime: 1200,
      requestCount: 8500,
      errorRate: 1.2,
      status: 'degraded',
      lastUpdated: '2024-01-15T10:30:00Z',
      throughput: 850,
      concurrentUsers: 320,
      version: 'v1.2.0',
      environment: 'production'
    },
    {
      id: 'api-003',
      endpoint: '/api/analytics',
      method: 'GET',
      avgResponseTime: 890,
      p95ResponseTime: 1500,
      p99ResponseTime: 2800,
      requestCount: 3200,
      errorRate: 2.1,
      status: 'unhealthy',
      lastUpdated: '2024-01-15T10:30:00Z',
      throughput: 320,
      concurrentUsers: 180,
      version: 'v1.1.0',
      environment: 'production'
    }
  ]),
  
  // Database Performance CRUD
  getDatabasePerformance: (): Promise<DatabasePerformance[]> => Promise.resolve([
    {
      id: 'db-001',
      database: 'main_db',
      query: 'SELECT * FROM users WHERE status = ?',
      avgExecutionTime: 45,
      maxExecutionTime: 120,
      executionCount: 8500,
      cacheHitRate: 92.5,
      slowQueries: 15,
      connections: 85,
      status: 'optimal',
      lastAnalyzed: '2024-01-15T10:30:00Z',
      tableSize: '2.5GB',
      indexUsage: 95.2,
      databaseType: 'postgresql'
    },
    {
      id: 'db-002',
      database: 'analytics_db',
      query: 'SELECT COUNT(*) FROM events WHERE date >= ?',
      avgExecutionTime: 180,
      maxExecutionTime: 450,
      executionCount: 1200,
      cacheHitRate: 78.3,
      slowQueries: 45,
      connections: 120,
      status: 'warning',
      lastAnalyzed: '2024-01-15T10:30:00Z',
      tableSize: '15.2GB',
      indexUsage: 82.1,
      databaseType: 'postgresql'
    }
  ]),
  
  // Frontend Performance CRUD
  getFrontendPerformance: (): Promise<FrontendPerformance[]> => Promise.resolve([
    {
      id: 'fe-001',
      page: '/dashboard',
      loadTime: 1.8,
      firstContentfulPaint: 0.8,
      largestContentfulPaint: 1.2,
      cumulativeLayoutShift: 0.05,
      firstInputDelay: 0.12,
      lighthouseScore: 92,
      status: 'excellent',
      lastTested: '2024-01-15T10:30:00Z',
      userExperience: 95,
      accessibility: 98,
      bestPractices: 90,
      seo: 88,
      browser: 'Chrome',
      device: 'Desktop'
    },
    {
      id: 'fe-002',
      page: '/analytics',
      loadTime: 3.2,
      firstContentfulPaint: 1.5,
      largestContentfulPaint: 2.8,
      cumulativeLayoutShift: 0.12,
      firstInputDelay: 0.25,
      lighthouseScore: 78,
      status: 'needs_improvement',
      lastTested: '2024-01-15T10:30:00Z',
      userExperience: 82,
      accessibility: 95,
      bestPractices: 85,
      seo: 90,
      browser: 'Chrome',
      device: 'Desktop'
    }
  ]),
  
  // Performance Optimization CRUD
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
      assignedTo: 'Sarah Johnson',
      deadline: '2024-02-15',
      progress: 65,
      tags: ['caching', 'redis', 'database'],
      dependencies: ['redis-infrastructure']
    },
    {
      id: 'opt-002',
      title: 'Optimize Frontend Bundle Size',
      description: 'Implement code splitting and tree shaking to reduce bundle size',
      category: 'frontend',
      priority: 'medium',
      impact: 'medium',
      effort: 'low',
      status: 'proposed',
      estimatedSavings: 25,
      implementationCost: 8,
      roi: 312,
      assignedTo: 'Mike Chen',
      deadline: '2024-01-30',
      progress: 0,
      tags: ['bundle', 'optimization', 'webpack'],
      dependencies: []
    },
    {
      id: 'opt-003',
      title: 'Upgrade API Rate Limiting',
      description: 'Implement more sophisticated rate limiting to prevent API abuse',
      category: 'backend',
      priority: 'critical',
      impact: 'high',
      effort: 'high',
      status: 'completed',
      estimatedSavings: 60,
      implementationCost: 20,
      roi: 300,
      assignedTo: 'Alex Rodriguez',
      deadline: '2024-01-10',
      progress: 100,
      tags: ['security', 'rate-limiting', 'api'],
      dependencies: []
    }
  ]),
  
  createPerformanceOptimization: (optimization: OptimizationFormData): Promise<PerformanceOptimization> => 
    Promise.resolve({
      ...optimization,
      id: `opt-${Date.now()}`,
      status: 'proposed',
      progress: 0,
      roi: optimization.estimatedSavings / optimization.implementationCost * 100
    }),
    
  updatePerformanceOptimization: (id: string, updates: Partial<PerformanceOptimization>): Promise<PerformanceOptimization> => 
    Promise.resolve({ id, ...updates } as PerformanceOptimization),
    
  deletePerformanceOptimization: (id: string): Promise<void> => Promise.resolve(),
  
  // Real-time monitoring functions
  startRealTimeMonitoring: (): Promise<void> => Promise.resolve(),
  stopRealTimeMonitoring: (): Promise<void> => Promise.resolve(),
  getRealTimeMetrics: (): Promise<PerformanceMetric[]> => Promise.resolve([]),
  
  // Analytics and reporting
  generatePerformanceReport: (startDate: string, endDate: string): Promise<any> => Promise.resolve({
    summary: 'Performance report generated successfully',
    metrics: [],
    recommendations: []
  }),
  
  exportPerformanceData: (format: 'csv' | 'json' | 'pdf'): Promise<string> => 
    Promise.resolve(`performance-data-${Date.now()}.${format}`)
};

// Main Performance Monitor Component
const PerformanceMonitorPage: React.FC = () => {
  const { toast } = useToast();
  
  // State management
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [apiPerformance, setApiPerformance] = useState<APIPerformance[]>([]);
  const [databasePerformance, setDatabasePerformance] = useState<DatabasePerformance[]>([]);
  const [frontendPerformance, setFrontendPerformance] = useState<FrontendPerformance[]>([]);
  const [optimizations, setOptimizations] = useState<PerformanceOptimization[]>([]);
  const [loading, setLoading] = useState(true);
  const [realTimeMode, setRealTimeMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Form states
  const [showMetricForm, setShowMetricForm] = useState(false);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [showOptimizationForm, setShowOptimizationForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  // Form data
  const [metricFormData, setMetricFormData] = useState<MetricFormData>({
    name: '',
    category: 'cpu',
    value: 0,
    unit: '%',
    threshold: 80,
    description: '',
    server: '',
    environment: 'production'
  });
  
  const [alertFormData, setAlertFormData] = useState<AlertFormData>({
    title: '',
    description: '',
    severity: 'medium',
    metric: '',
    currentValue: 0,
    threshold: 0,
    category: 'performance',
    priority: 'medium',
    assignedTo: ''
  });
  
  const [optimizationFormData, setOptimizationFormData] = useState<OptimizationFormData>({
    title: '',
    description: '',
    category: 'frontend',
    priority: 'medium',
    impact: 'medium',
    effort: 'medium',
    estimatedSavings: 0,
    implementationCost: 0,
    assignedTo: '',
    deadline: '',
    tags: []
  });

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  // Real-time monitoring effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (realTimeMode) {
      interval = setInterval(() => {
        loadAllData();
      }, 5000); // Update every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [realTimeMode]);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [
        metricsData,
        alertsData,
        apiData,
        dbData,
        feData,
        optData
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
      setDatabasePerformance(dbData);
      setFrontendPerformance(feData);
      setOptimizations(optData);
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

  // CRUD Operations
  const handleCreateMetric = async () => {
    try {
      const newMetric = await mockAPI.createPerformanceMetric(metricFormData);
      setMetrics(prev => [...prev, newMetric]);
      setShowMetricForm(false);
      setMetricFormData({
        name: '',
        category: 'cpu',
        value: 0,
        unit: '%',
        threshold: 80,
        description: '',
        server: '',
        environment: 'production'
      });
      toast({
        title: "Success",
        description: "Performance metric created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create performance metric",
        variant: "destructive"
      });
    }
  };

  const handleCreateAlert = async () => {
    try {
      const newAlert = await mockAPI.createPerformanceAlert(alertFormData);
      setAlerts(prev => [...prev, newAlert]);
      setShowAlertForm(false);
      setAlertFormData({
        title: '',
        description: '',
        severity: 'medium',
        metric: '',
        currentValue: 0,
        threshold: 0,
        category: 'performance',
        priority: 'medium',
        assignedTo: ''
      });
      toast({
        title: "Success",
        description: "Performance alert created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create performance alert",
        variant: "destructive"
      });
    }
  };

  const handleCreateOptimization = async () => {
    try {
      const newOptimization = await mockAPI.createPerformanceOptimization(optimizationFormData);
      setOptimizations(prev => [...prev, newOptimization]);
      setShowOptimizationForm(false);
      setOptimizationFormData({
        title: '',
        description: '',
        category: 'frontend',
        priority: 'medium',
        impact: 'medium',
        effort: 'medium',
        estimatedSavings: 0,
        implementationCost: 0,
        assignedTo: '',
        deadline: '',
        tags: []
      });
      toast({
        title: "Success",
        description: "Performance optimization created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create performance optimization",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMetric = async (id: string) => {
    try {
      await mockAPI.deletePerformanceMetric(id);
      setMetrics(prev => prev.filter(m => m.id !== id));
      toast({
        title: "Success",
        description: "Performance metric deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete performance metric",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAlert = async (id: string) => {
    try {
      await mockAPI.deletePerformanceAlert(id);
      setAlerts(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Success",
        description: "Performance alert deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete performance alert",
        variant: "destructive"
      });
    }
  };

  const handleDeleteOptimization = async (id: string) => {
    try {
      await mockAPI.deletePerformanceOptimization(id);
      setOptimizations(prev => prev.filter(o => o.id !== id));
      toast({
        title: "Success",
        description: "Performance optimization deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete performance optimization",
        variant: "destructive"
      });
    }
  };

  const toggleRealTimeMode = () => {
    setRealTimeMode(!realTimeMode);
    if (!realTimeMode) {
      toast({
        title: "Real-time Mode",
        description: "Real-time monitoring enabled"
      });
    } else {
      toast({
        title: "Real-time Mode",
        description: "Real-time monitoring disabled"
      });
    }
  };

  const exportData = async (format: 'csv' | 'json' | 'pdf') => {
    try {
      const filename = await mockAPI.exportPerformanceData(format);
      toast({
        title: "Export Successful",
        description: `Data exported as ${filename}`
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export performance data",
        variant: "destructive"
      });
    }
  };

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Monitor</h1>
          <p className="text-muted-foreground">
            Real-time performance monitoring and optimization management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={realTimeMode ? "default" : "outline"}
            onClick={toggleRealTimeMode}
            className="flex items-center space-x-2"
          >
            {realTimeMode ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{realTimeMode ? 'Stop' : 'Start'} Real-time</span>
          </Button>
          <Button variant="outline" onClick={loadAllData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => exportData('csv')}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.filter(a => a.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">
              {alerts.filter(a => a.severity === 'critical').length} critical
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(apiPerformance.reduce((acc, api) => acc + api.avgResponseTime, 0) / apiPerformance.length)}ms
            </div>
            <p className="text-xs text-muted-foreground">
              Across {apiPerformance.length} endpoints
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((metrics.filter(m => m.status === 'normal').length / metrics.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {metrics.filter(m => m.status === 'normal').length} of {metrics.length} metrics healthy
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimizations</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{optimizations.length}</div>
            <p className="text-xs text-muted-foreground">
              {optimizations.filter(o => o.status === 'completed').length} completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="api">API Performance</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Recent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)}`} />
                        <div>
                          <p className="font-medium text-sm">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">{alert.metric}</p>
                        </div>
                      </div>
                      <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                        {alert.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.slice(0, 5).map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTrendIcon(metric.trend)}
                        <div>
                          <p className="font-medium text-sm">{metric.name}</p>
                          <p className="text-xs text-muted-foreground">{metric.value}{metric.unit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${metric.changePercent > 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground">{metric.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Performance Metrics</h2>
            <Button onClick={() => setShowMetricForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Metric
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{metric.name}</p>
                          <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{metric.value}{metric.unit}</span>
                          <span className="text-sm text-muted-foreground">/ {metric.threshold}{metric.unit}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={metric.status === 'normal' ? 'default' : 'destructive'}>
                          {metric.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(metric.trend)}
                          <span className="text-sm">{metric.changePercent.toFixed(1)}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(metric.timestamp).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteMetric(metric.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Performance Alerts</h2>
            <Button onClick={() => setShowAlertForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Alert</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Triggered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{alert.assignedTo || 'Unassigned'}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(alert.triggeredAt).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
          <h2 className="text-xl font-semibold">API Performance</h2>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Avg Response</TableHead>
                    <TableHead>Error Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Throughput</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiPerformance.map((api) => (
                    <TableRow key={api.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{api.endpoint}</p>
                          <p className="text-sm text-muted-foreground">v{api.version}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{api.method}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{api.avgResponseTime}ms</p>
                          <p className="text-sm text-muted-foreground">P95: {api.p95ResponseTime}ms</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${api.errorRate > 1 ? 'text-red-500' : 'text-green-500'}`}>
                          {api.errorRate}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={api.status === 'healthy' ? 'default' : 'destructive'}>
                          {api.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{api.throughput}/s</p>
                          <p className="text-sm text-muted-foreground">{api.concurrentUsers} users</p>
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
          <h2 className="text-xl font-semibold">Database Performance</h2>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Database</TableHead>
                    <TableHead>Query</TableHead>
                    <TableHead>Avg Time</TableHead>
                    <TableHead>Cache Hit Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Connections</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {databasePerformance.map((db) => (
                    <TableRow key={db.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{db.database}</p>
                          <p className="text-sm text-muted-foreground">{db.databaseType}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          <p className="text-sm font-mono">{db.query}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{db.avgExecutionTime}ms</p>
                          <p className="text-sm text-muted-foreground">Max: {db.maxExecutionTime}ms</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{db.cacheHitRate}%</p>
                          <Progress value={db.cacheHitRate} className="h-2 mt-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={db.status === 'optimal' ? 'default' : 'destructive'}>
                          {db.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{db.connections}</p>
                          <p className="text-sm text-muted-foreground">{db.slowQueries} slow</p>
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Performance Optimizations</h2>
            <Button onClick={() => setShowOptimizationForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Optimization
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {optimizations.map((optimization) => (
              <Card key={optimization.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{optimization.title}</CardTitle>
                    <Badge variant={optimization.status === 'completed' ? 'default' : 'secondary'}>
                      {optimization.status}
                    </Badge>
                  </div>
                  <CardDescription>{optimization.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{optimization.progress}%</span>
                  </div>
                  <Progress value={optimization.progress} className="h-2" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">ROI</p>
                      <p className="font-medium">{optimization.roi.toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Savings</p>
                      <p className="font-medium">${optimization.estimatedSavings}k</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{optimization.category}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteOptimization(optimization.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Forms */}
      {/* Metric Form */}
      <Dialog open={showMetricForm} onOpenChange={setShowMetricForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Performance Metric</DialogTitle>
            <DialogDescription>
              Create a new performance metric to monitor.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={metricFormData.name}
                onChange={(e) => setMetricFormData(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
                placeholder="CPU Usage"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select
                value={metricFormData.category}
                onValueChange={(value: any) => setMetricFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cpu">CPU</SelectItem>
                  <SelectItem value="memory">Memory</SelectItem>
                  <SelectItem value="disk">Disk</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">Value</Label>
              <Input
                id="value"
                type="number"
                value={metricFormData.value}
                onChange={(e) => setMetricFormData(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                className="col-span-3"
                placeholder="75.2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">Unit</Label>
              <Input
                id="unit"
                value={metricFormData.unit}
                onChange={(e) => setMetricFormData(prev => ({ ...prev, unit: e.target.value }))}
                className="col-span-3"
                placeholder="%"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="threshold" className="text-right">Threshold</Label>
              <Input
                id="threshold"
                type="number"
                value={metricFormData.threshold}
                onChange={(e) => setMetricFormData(prev => ({ ...prev, threshold: parseFloat(e.target.value) || 0 }))}
                className="col-span-3"
                placeholder="80"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                value={metricFormData.description}
                onChange={(e) => setMetricFormData(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Description of the metric"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMetricForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateMetric}>
              Create Metric
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Form */}
      <Dialog open={showAlertForm} onOpenChange={setShowAlertForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Performance Alert</DialogTitle>
            <DialogDescription>
              Create a new performance alert to monitor system health.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alert-title" className="text-right">Title</Label>
              <Input
                id="alert-title"
                value={alertFormData.title}
                onChange={(e) => setAlertFormData(prev => ({ ...prev, title: e.target.value }))}
                className="col-span-3"
                placeholder="High CPU Usage Detected"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alert-description" className="text-right">Description</Label>
              <Textarea
                id="alert-description"
                value={alertFormData.description}
                onChange={(e) => setAlertFormData(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Description of the alert"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alert-severity" className="text-right">Severity</Label>
              <Select
                value={alertFormData.severity}
                onValueChange={(value: any) => setAlertFormData(prev => ({ ...prev, severity: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alert-metric" className="text-right">Metric</Label>
              <Input
                id="alert-metric"
                value={alertFormData.metric}
                onChange={(e) => setAlertFormData(prev => ({ ...prev, metric: e.target.value }))}
                className="col-span-3"
                placeholder="CPU Usage"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alert-current-value" className="text-right">Current Value</Label>
              <Input
                id="alert-current-value"
                type="number"
                value={alertFormData.currentValue}
                onChange={(e) => setAlertFormData(prev => ({ ...prev, currentValue: parseFloat(e.target.value) || 0 }))}
                className="col-span-3"
                placeholder="85.2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alert-threshold" className="text-right">Threshold</Label>
              <Input
                id="alert-threshold"
                type="number"
                value={alertFormData.threshold}
                onChange={(e) => setAlertFormData(prev => ({ ...prev, threshold: parseFloat(e.target.value) || 0 }))}
                className="col-span-3"
                placeholder="80"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlertForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAlert}>
              Create Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Optimization Form */}
      <Dialog open={showOptimizationForm} onOpenChange={setShowOptimizationForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Performance Optimization</DialogTitle>
            <DialogDescription>
              Create a new performance optimization initiative.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opt-title" className="text-right">Title</Label>
              <Input
                id="opt-title"
                value={optimizationFormData.title}
                onChange={(e) => setOptimizationFormData(prev => ({ ...prev, title: e.target.value }))}
                className="col-span-3"
                placeholder="Implement Database Caching"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opt-description" className="text-right">Description</Label>
              <Textarea
                id="opt-description"
                value={optimizationFormData.description}
                onChange={(e) => setOptimizationFormData(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Description of the optimization"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opt-category" className="text-right">Category</Label>
              <Select
                value={optimizationFormData.category}
                onValueChange={(value: any) => setOptimizationFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opt-priority" className="text-right">Priority</Label>
              <Select
                value={optimizationFormData.priority}
                onValueChange={(value: any) => setOptimizationFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opt-savings" className="text-right">Est. Savings (k$)</Label>
              <Input
                id="opt-savings"
                type="number"
                value={optimizationFormData.estimatedSavings}
                onChange={(e) => setOptimizationFormData(prev => ({ ...prev, estimatedSavings: parseFloat(e.target.value) || 0 }))}
                className="col-span-3"
                placeholder="45"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="opt-cost" className="text-right">Implementation Cost (k$)</Label>
              <Input
                id="opt-cost"
                type="number"
                value={optimizationFormData.implementationCost}
                onChange={(e) => setOptimizationFormData(prev => ({ ...prev, implementationCost: parseFloat(e.target.value) || 0 }))}
                className="col-span-3"
                placeholder="15"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOptimizationForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateOptimization}>
              Create Optimization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PerformanceMonitorPage;
