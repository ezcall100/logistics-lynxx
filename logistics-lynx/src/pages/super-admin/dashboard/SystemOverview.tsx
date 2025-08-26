// ========================
// 🛰️ System Overview Dashboard - Enhanced
// ========================
// TransBot AI - Advanced System Monitoring & MCP Agent Control
// Domain: transbotai.com

import React, { useState, useEffect } from 'react';
import { MCP, MCPMetrics } from '@/services/mcp';
import { executeFabAction } from '@/components/FabActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Activity, 
  Users, 
  Server, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Pause,
  RotateCcw,
  Database,
  Zap,
  Cpu,
  HardDrive,
  Network,
  Shield,
  BarChart3,
  Gauge,
  Thermometer,
  Wifi,
  Monitor,
  Globe,
  Target,
  Eye,
  Settings,
  Play,
  StopCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Download,
  Upload,
  Lock,
  Unlock,
  Power,
  PowerOff,
  Wrench,
  Brain,
  CircuitBoard,
  Satellite,
  Radar,
  Signal,
  Waves,
  Heart,
  ActivitySquare,
  Layers,
  Grid3X3,
  Command,
  Terminal,
  Code,
  Bug,
  Lightbulb,
  Sparkles,
  Trash2,
  FileText
} from 'lucide-react';

interface SystemOverviewProps {}

interface AgentStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded' | 'error';
  confidence: number;
  lastActivity: string;
  tasksCompleted: number;
  errorCount: number;
  responseTime: number;
  autonomy: boolean;
  portal: string;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: number;
  activeConnections: number;
  errorRate: number;
  throughput: number;
}

interface PerformanceData {
  time: string;
  cpu: number;
  memory: number;
  network: number;
  errors: number;
}

const SystemOverview: React.FC<SystemOverviewProps> = () => {
  const [metrics, setMetrics] = useState<MCPMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'degraded' | 'unhealthy'>('healthy');
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [agentStatuses, setAgentStatuses] = useState<AgentStatus[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  // Mock data for demonstration
  const mockAgentStatuses: AgentStatus[] = [
    {
      id: 'SecurityScannerAgent',
      name: 'Security Scanner',
      status: 'online',
      confidence: 0.94,
      lastActivity: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      tasksCompleted: 1247,
      errorCount: 3,
      responseTime: 1200,
      autonomy: true,
      portal: 'carrier'
    },
    {
      id: 'PerformanceMonitorAgent',
      name: 'Performance Monitor',
      status: 'online',
      confidence: 0.87,
      lastActivity: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
      tasksCompleted: 892,
      errorCount: 12,
      responseTime: 800,
      autonomy: true,
      portal: 'carrier'
    },
    {
      id: 'UserSessionAgent',
      name: 'User Session Manager',
      status: 'online',
      confidence: 0.96,
      lastActivity: new Date(Date.now() - 30 * 1000).toISOString(),
      tasksCompleted: 2156,
      errorCount: 1,
      responseTime: 450,
      autonomy: false,
      portal: 'shipper'
    },
    {
      id: 'AnalyticsAgent',
      name: 'Analytics Processor',
      status: 'degraded',
      confidence: 0.72,
      lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      tasksCompleted: 567,
      errorCount: 28,
      responseTime: 3200,
      autonomy: true,
      portal: 'shipper'
    },
    {
      id: 'AgentConfidenceMonitor',
      name: 'Confidence Monitor',
      status: 'online',
      confidence: 0.91,
      lastActivity: new Date(Date.now() - 45 * 1000).toISOString(),
      tasksCompleted: 743,
      errorCount: 5,
      responseTime: 650,
      autonomy: true,
      portal: 'broker'
    }
  ];

  const mockPerformanceData: PerformanceData[] = Array.from({ length: 24 }, (_, i) => ({
    time: new Date(Date.now() - (23 - i) * 60 * 60 * 1000).toISOString(),
    cpu: Math.random() * 30 + 20,
    memory: Math.random() * 20 + 60,
    network: Math.random() * 50 + 100,
    errors: Math.floor(Math.random() * 5)
  }));

  // Fetch metrics from MCP
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In production, this would fetch from your MCP API
      // const response = await MCP.metrics.overview();
      
      // For now, using mock data
      setMetrics({
        system: {
          uptime: 86400,
          version: '2.1.0',
          last_deployment: new Date().toISOString(),
          error_rate: 0.023,
          response_time: 245
        },
        jobs: {
          queued: 15,
          running: 8,
          completed: 12489,
          failed: 58,
          success_rate: 0.995
        },
        agents: {
          online: 11,
          total: 12,
          healthy: 9,
          degraded: 2,
          offline: 1
        },
        resources: {
          cpu_usage: 45.2,
          memory_usage: 78.5,
          disk_usage: 62.3,
          network_throughput: 125.7
        }
      } as MCPMetrics);
      
      setAgentStatuses(mockAgentStatuses);
      setPerformanceData(mockPerformanceData);
      setIsUsingMockData(true);
      setLastUpdated(new Date());
      
      // Determine system health based on metrics
      const errorRate = 0.023;
      const successRate = 0.995;
      
      if (errorRate > 0.1 || successRate < 0.9) {
        setSystemHealth('degraded');
      } else if (errorRate > 0.2 || successRate < 0.8) {
        setSystemHealth('unhealthy');
      } else {
        setSystemHealth('healthy');
      }
      
    } catch (err: any) {
      console.error('Failed to fetch metrics:', err);
      setError(err?.response?.data?.message || 'Failed to fetch system metrics');
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  // System operations
  const performSystemOperation = async (operation: string) => {
    try {
      await executeFabAction('systemOperation', operation);
      // Refresh metrics after operation
      setTimeout(fetchMetrics, 2000);
    } catch (error) {
      console.error(`System operation ${operation} failed:`, error);
    }
  };

  // Auto-refresh metrics every 30 seconds
  useEffect(() => {
    fetchMetrics();
    
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'degraded': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'unhealthy': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'degraded': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'offline': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading && !metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
              </div>
            </div>
            
            {/* Metrics Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Enhanced Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Satellite className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  System Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time monitoring and control for TransBot AI infrastructure
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className={`${getHealthColor(systemHealth)} border-0`}>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    systemHealth === 'healthy' ? 'bg-green-500' :
                    systemHealth === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="capitalize">{systemHealth}</span>
                </div>
              </Badge>
              
              <Button
                variant="outline"
                size="sm"
                onClick={fetchMetrics}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              {isUsingMockData && (
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Demo Mode
                </Badge>
              )}
            </div>
          </div>
          
          {lastUpdated && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>MCP Agents</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Performance</span>
            </TabsTrigger>
            <TabsTrigger value="operations" className="flex items-center space-x-2">
              <Command className="h-4 w-4" />
              <span>Operations</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">System Uptime</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {metrics?.system.uptime ? Math.floor(metrics.system.uptime / 3600) : 0}h
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500 rounded-xl">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">Success Rate</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                        {metrics?.jobs.success_rate ? (metrics.jobs.success_rate * 100).toFixed(1) : 0}%
                      </p>
                    </div>
                    <div className="p-3 bg-green-500 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress 
                      value={metrics?.jobs.success_rate ? metrics.jobs.success_rate * 100 : 0} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Active Agents</p>
                                             <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                         {metrics?.agents.online || 0}/{metrics?.agents.total || 0}
                       </p>
                     </div>
                     <div className="p-3 bg-purple-500 rounded-xl">
                       <Brain className="h-6 w-6 text-white" />
                     </div>
                   </div>
                   <div className="mt-4">
                     <Progress 
                       value={metrics?.agents.total ? (metrics.agents.online / metrics.agents.total) * 100 : 0} 
                       className="h-2" 
                     />
                   </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Error Rate</p>
                      <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                        {metrics?.system.error_rate ? (metrics.system.error_rate * 100).toFixed(2) : 0}%
                      </p>
                    </div>
                    <div className="p-3 bg-orange-500 rounded-xl">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress 
                      value={metrics?.system.error_rate ? metrics.system.error_rate * 100 : 0} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Resources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5" />
                    <span>System Resources</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                                     <div>
                     <div className="flex justify-between text-sm mb-2">
                       <span>CPU Usage</span>
                       <span>{metrics?.resources.cpu_usage?.toFixed(1) || 0}%</span>
                     </div>
                     <Progress value={metrics?.resources.cpu_usage || 0} className="h-2" />
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-2">
                       <span>Memory Usage</span>
                       <span>{metrics?.resources.memory_usage?.toFixed(1) || 0}%</span>
                     </div>
                     <Progress value={metrics?.resources.memory_usage || 0} className="h-2" />
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-2">
                       <span>Disk Usage</span>
                       <span>{metrics?.resources.disk_usage?.toFixed(1) || 0}%</span>
                     </div>
                     <Progress value={metrics?.resources.disk_usage || 0} className="h-2" />
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-2">
                       <span>Network Throughput</span>
                       <span>{metrics?.resources.network_throughput?.toFixed(1) || 0} MB/s</span>
                     </div>
                     <Progress value={Math.min((metrics?.resources.network_throughput || 0) / 2, 100)} className="h-2" />
                   </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Job Statistics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { name: 'Completed', value: metrics?.jobs.completed || 0, fill: '#10b981' },
                      { name: 'Failed', value: metrics?.jobs.failed || 0, fill: '#ef4444' }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MCP Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>MCP Agent Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentStatuses.map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          agent.status === 'online' ? 'bg-green-100 dark:bg-green-900/20' :
                          agent.status === 'degraded' ? 'bg-yellow-100 dark:bg-yellow-900/20' :
                          'bg-red-100 dark:bg-red-900/20'
                        }`}>
                          <Brain className={`h-5 w-5 ${
                            agent.status === 'online' ? 'text-green-600' :
                            agent.status === 'degraded' ? 'text-yellow-600' :
                            'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{agent.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Portal: {agent.portal} • Tasks: {agent.tasksCompleted}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`text-sm font-medium ${getConfidenceColor(agent.confidence)}`}>
                            {(agent.confidence * 100).toFixed(1)}% Confidence
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {agent.responseTime}ms response
                          </p>
                        </div>
                        
                        <Badge className={`${getStatusColor(agent.status)} border-0`}>
                          <span className="capitalize">{agent.status}</span>
                        </Badge>
                        
                        {agent.autonomy && (
                          <Badge variant="outline" className="text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            Autonomous
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>System Performance (24h)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="time" 
                        tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleString()}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="cpu" 
                        stackId="1" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="memory" 
                        stackId="1" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Error Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="time" 
                        tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleString()}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="errors" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Operations Tab */}
          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Power className="h-5 w-5" />
                    <span>System Control</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => performSystemOperation('restart')}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restart System
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => performSystemOperation('maintenance')}
                  >
                    <Wrench className="h-4 w-4 mr-2" />
                    Maintenance Mode
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => performSystemOperation('backup')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Create Backup
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Agent Control</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => performSystemOperation('restart_agents')}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Restart All Agents
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => performSystemOperation('update_agents')}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Update Agents
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => performSystemOperation('clear_cache')}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => performSystemOperation('security_scan')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Security Scan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => performSystemOperation('update_certificates')}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Update Certificates
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => performSystemOperation('audit_logs')}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Audit Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemOverview;
