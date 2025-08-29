import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Brain, 
  Zap, 
  Server,
  Database,
  Shield,
  Cpu,
  HardDrive,
  Network,
  BarChart3,
  RefreshCw,
  Settings,
  Eye,
  Download,
  Bell,
  Grid,
  List,
  DollarSign,
  Receipt,
  GitBranch,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { DataTable } from '@/components/ui/DataTable';

interface SystemMetrics {
  systemHealth: number;
  activeUsers: number;
  mcpAgents: number;
  responseTime: number;
  uptime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkTraffic: number;
  errorRate: number;
  securityScore: number;
  performanceScore: number;
  revenue: number;
  transactions: number;
  supportTickets: number;
  deployments: number;
}

interface MCPAgentStatus {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'busy' | 'error';
  confidenceScore: number;
  tasksCompleted: number;
  responseTime: number;
  lastActivity: string;
  uptime: number;
  performance: number;
  health: number;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'acknowledged';
  mcpAgentId?: string;
  category: 'system' | 'security' | 'performance' | 'user' | 'business' | 'deployment';
}

interface PerformanceData {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  responseTime: number;
  activeUsers: number;
  transactions: number;
  revenue: number;
}

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  category: 'system' | 'security' | 'users' | 'analytics' | 'deployment' | 'support';
  action: string;
  status: 'available' | 'busy' | 'disabled';
}

const SuperAdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [agents, setAgents] = useState<MCPAgentStatus[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
  const [timeRange, setTimeRange] = useState('1h');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with comprehensive MCP agent integration
  const mockMetrics: SystemMetrics = {
    systemHealth: 98.5,
    activeUsers: 1247,
    mcpAgents: 24,
    responseTime: 45,
    uptime: 99.9,
    cpuUsage: 67,
    memoryUsage: 78,
    diskUsage: 45,
    networkTraffic: 234,
    errorRate: 0.02,
    securityScore: 94,
    performanceScore: 89,
    revenue: 125000,
    transactions: 1567,
    supportTickets: 23,
    deployments: 8
  };

  const mockAgents: MCPAgentStatus[] = [
    {
      id: 'agent-001',
      name: 'System Monitor Alpha',
      type: 'monitoring',
      status: 'online',
      confidenceScore: 0.95,
      tasksCompleted: 1247,
      responseTime: 12,
      lastActivity: '2024-01-15 14:30:00',
      uptime: 99.9,
      performance: 98,
      health: 95
    },
    {
      id: 'agent-002',
      name: 'Security Agent Beta',
      type: 'security',
      status: 'online',
      confidenceScore: 0.92,
      tasksCompleted: 892,
      responseTime: 8,
      lastActivity: '2024-01-15 14:29:45',
      uptime: 99.8,
      performance: 96,
      health: 92
    },
    {
      id: 'agent-003',
      name: 'Performance Agent Gamma',
      type: 'performance',
      status: 'busy',
      confidenceScore: 0.88,
      tasksCompleted: 567,
      responseTime: 15,
      lastActivity: '2024-01-15 14:28:30',
      uptime: 99.7,
      performance: 89,
      health: 88
    },
    {
      id: 'agent-004',
      name: 'Analytics Agent Delta',
      type: 'analytics',
      status: 'online',
      confidenceScore: 0.94,
      tasksCompleted: 1034,
      responseTime: 10,
      lastActivity: '2024-01-15 14:30:15',
      uptime: 99.9,
      performance: 97,
      health: 94
    },
    {
      id: 'agent-005',
      name: 'User Management Epsilon',
      type: 'user-management',
      status: 'online',
      confidenceScore: 0.91,
      tasksCompleted: 756,
      responseTime: 9,
      lastActivity: '2024-01-15 14:29:30',
      uptime: 99.6,
      performance: 93,
      health: 91
    },
    {
      id: 'agent-006',
      name: 'Deployment Agent Zeta',
      type: 'deployment',
      status: 'online',
      confidenceScore: 0.89,
      tasksCompleted: 423,
      responseTime: 18,
      lastActivity: '2024-01-15 14:27:45',
      uptime: 99.5,
      performance: 87,
      health: 89
    }
  ];

  const mockAlerts: SystemAlert[] = [
    {
      id: 'alert-001',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'CPU usage has exceeded 80% threshold',
      timestamp: '2024-01-15 14:25:00',
      severity: 'medium',
      status: 'active',
      mcpAgentId: 'agent-003',
      category: 'performance'
    },
    {
      id: 'alert-002',
      type: 'success',
      title: 'Deployment Successful',
      message: 'Frontend v2.1.0 deployed successfully to production',
      timestamp: '2024-01-15 14:20:00',
      severity: 'low',
      status: 'acknowledged',
      mcpAgentId: 'agent-006',
      category: 'deployment'
    },
    {
      id: 'alert-003',
      type: 'error',
      title: 'Database Connection Issue',
      message: 'Connection timeout detected in primary database',
      timestamp: '2024-01-15 14:15:00',
      severity: 'high',
      status: 'active',
      mcpAgentId: 'agent-001',
      category: 'system'
    },
    {
      id: 'alert-004',
      type: 'info',
      title: 'New User Registration',
      message: '25 new users registered in the last hour',
      timestamp: '2024-01-15 14:10:00',
      severity: 'low',
      status: 'acknowledged',
      mcpAgentId: 'agent-005',
      category: 'user'
    }
  ];

  const mockPerformanceData: PerformanceData[] = [
    { timestamp: '14:25', cpu: 67, memory: 78, disk: 45, network: 234, responseTime: 45, activeUsers: 1247, transactions: 1567, revenue: 125000 },
    { timestamp: '14:20', cpu: 65, memory: 76, disk: 44, network: 228, responseTime: 42, activeUsers: 1234, transactions: 1542, revenue: 123000 },
    { timestamp: '14:15', cpu: 68, memory: 79, disk: 46, network: 240, responseTime: 48, activeUsers: 1256, transactions: 1589, revenue: 127000 },
    { timestamp: '14:10', cpu: 64, memory: 75, disk: 43, network: 220, responseTime: 40, activeUsers: 1220, transactions: 1534, revenue: 121000 },
    { timestamp: '14:05', cpu: 66, memory: 77, disk: 45, network: 232, responseTime: 44, activeUsers: 1240, transactions: 1556, revenue: 124000 }
  ];

  const mockQuickActions: QuickAction[] = [
    {
      id: 'action-001',
      name: 'System Health Check',
      description: 'Run comprehensive system diagnostics',
      icon: Activity,
      color: 'bg-blue-600',
      category: 'system',
      action: 'health-check',
      status: 'available'
    },
    {
      id: 'action-002',
      name: 'Security Scan',
      description: 'Perform security vulnerability scan',
      icon: Shield,
      color: 'bg-red-600',
      category: 'security',
      action: 'security-scan',
      status: 'available'
    },
    {
      id: 'action-003',
      name: 'User Analytics',
      description: 'View detailed user activity reports',
      icon: Users,
      color: 'bg-green-600',
      category: 'users',
      action: 'user-analytics',
      status: 'available'
    },
    {
      id: 'action-004',
      name: 'Performance Monitor',
      description: 'Monitor system performance metrics',
      icon: BarChart3,
      color: 'bg-purple-600',
      category: 'analytics',
      action: 'performance-monitor',
      status: 'available'
    },
    {
      id: 'action-005',
      name: 'Deploy Update',
      description: 'Deploy latest system updates',
      icon: GitBranch,
      color: 'bg-orange-600',
      category: 'deployment',
      action: 'deploy-update',
      status: 'available'
    },
    {
      id: 'action-006',
      name: 'Support Center',
      description: 'Access support ticket management',
      icon: Headphones,
      color: 'bg-teal-600',
      category: 'support',
      action: 'support-center',
      status: 'available'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMetrics(mockMetrics);
      setAgents(mockAgents);
      setAlerts(mockAlerts);
      setPerformanceData(mockPerformanceData);
      setQuickActions(mockQuickActions);
      setMcpStatus('connected');
      setLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'busy': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-900 dark:text-white dark:bg-slate-800/80/20 dark:text-gray-400 dark:text-white';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // DataTable columns for MCP Agents
  const agentColumns = [
    { key: 'name', label: 'Agent Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'confidenceScore', label: 'Confidence', sortable: true },
    { key: 'responseTime', label: 'Response Time', sortable: true },
    { key: 'lastActivity', label: 'Last Activity', sortable: true }
  ];

  // DataTable columns for System Alerts
  const alertColumns = [
    { key: 'title', label: 'Alert Title', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'severity', label: 'Severity', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'timestamp', label: 'Timestamp', sortable: true },
    { key: 'category', label: 'Category', sortable: true }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8 text-center animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Enhanced Header with SectionHeader */}
        <SectionHeader
          title="Super Admin Dashboard"
          subtitle="TransBot AI - Enterprise Control Center"
          icon={<Server className="h-6 w-6" />}
          action={
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${mcpStatus === 'connected' ? 'bg-green-500' : mcpStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  MCP {mcpStatus === 'connected' ? 'Connected' : mcpStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          }
        />

        {/* Key Metrics with MetricCard */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="System Health"
              value={`${metrics.systemHealth}%`}
              icon={<Activity className="h-8 w-8" />}
              color="blue"
            />
            <MetricCard
              title="Active Users"
              value={metrics.activeUsers.toLocaleString()}
              icon={<Users className="h-8 w-8" />}
              color="green"
            />
            <MetricCard
              title="MCP Agents"
              value={metrics.mcpAgents.toString()}
              icon={<Brain className="h-8 w-8" />}
              color="purple"
            />
            <MetricCard
              title="Revenue"
              value={formatCurrency(metrics.revenue)}
              icon={<DollarSign className="h-8 w-8" />}
              color="orange"
            />
          </div>
        )}

        {/* Secondary Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Response Time"
              value={`${metrics.responseTime}ms`}
              icon={<Zap className="h-8 w-8" />}
              color="blue"
            />
            <MetricCard
              title="Transactions"
              value={metrics.transactions.toLocaleString()}
              icon={<Receipt className="h-8 w-8" />}
              color="green"
            />
            <MetricCard
              title="Support Tickets"
              value={metrics.supportTickets.toString()}
              icon={<Headphones className="h-8 w-8" />}
              color="red"
            />
            <MetricCard
              title="Deployments"
              value={metrics.deployments.toString()}
              icon={<GitBranch className="h-8 w-8" />}
              color="purple"
            />
          </div>
        )}

        {/* System Performance Cards */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Cpu className="h-4 w-4 mr-2" />
                  CPU Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.cpuUsage}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.cpuUsage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Database className="h-4 w-4 mr-2" />
                  Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.memoryUsage}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.memoryUsage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <HardDrive className="h-4 w-4 mr-2" />
                  Disk Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.diskUsage}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.diskUsage}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Network className="h-4 w-4 mr-2" />
                  Network Traffic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.networkTraffic} MB/s</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: '75%' }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* MCP Agents Status with DataTable */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                MCP Agent Status
              </CardTitle>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={agents.map(agent => ({
                ...agent,
                confidenceScore: `${(agent.confidenceScore * 100).toFixed(0)}%`,
                responseTime: `${agent.responseTime}ms`,
                status: (
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`}></div>
                    <span className="capitalize">{agent.status}</span>
                  </div>
                )
              }))}
              columns={agentColumns}
              title=""
              searchable={true}
              filterable={true}
              sortable={true}
              pagination={true}
              bulkActions={false}
            />
          </CardContent>
        </Card>

        {/* System Alerts with DataTable */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-red-600" />
                System Alerts
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={alerts.map(alert => ({
                ...alert,
                type: (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAlertColor(alert.type)}`}>
                    {alert.type}
                  </span>
                ),
                severity: (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    alert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {alert.severity}
                  </span>
                )
              }))}
              columns={alertColumns}
              title=""
              searchable={true}
              filterable={true}
              sortable={true}
              pagination={true}
              bulkActions={false}
            />
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                Quick Actions
              </CardTitle>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action) => (
                <Button
                  key={action.id}
                  className={`h-20 ${action.color} hover:opacity-90 text-white rounded-xl shadow-lg transition-all duration-200`}
                  disabled={action.status === 'disabled'}
                >
                  <div className="text-center">
                    <action.icon className="h-6 w-6 mx-auto mb-1" />
                    <span className="text-xs font-medium">{action.name}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                System Performance
              </CardTitle>
              <div className="flex items-center space-x-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-1 border border-gray-200/50 dark:border-slate-700/50 rounded-lg text-sm bg-white dark:bg-slate-800"
                >
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {performanceData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t" style={{ height: `${(data.cpu / 100) * 200}px` }}>
                    <div className="w-full bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-t mt-1" style={{ height: `${(data.memory / 100) * 200}px` }}>
                    <div className="w-full bg-green-500 rounded-t" style={{ height: '100%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">{data.timestamp}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>CPU</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Memory</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
