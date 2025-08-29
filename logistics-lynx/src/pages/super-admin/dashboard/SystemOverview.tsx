import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Brain, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
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
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'acknowledged';
  mcpAgentId?: string;
}

interface PerformanceData {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  responseTime: number;
  activeUsers: number;
}

const SystemOverview: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [agents, setAgents] = useState<MCPAgentStatus[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [timeRange, setTimeRange] = useState('1h');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
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
    performanceScore: 89
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
      uptime: 99.9
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
      uptime: 99.8
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
      uptime: 99.7
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
      uptime: 99.9
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
      mcpAgentId: 'agent-003'
    },
    {
      id: 'alert-002',
      type: 'info',
      title: 'System Update Available',
      message: 'New system update is ready for deployment',
      timestamp: '2024-01-15 14:20:00',
      severity: 'low',
      status: 'acknowledged'
    },
    {
      id: 'alert-003',
      type: 'error',
      title: 'Database Connection Issue',
      message: 'Connection timeout detected in primary database',
      timestamp: '2024-01-15 14:15:00',
      severity: 'high',
      status: 'active',
      mcpAgentId: 'agent-001'
    }
  ];

  const mockPerformanceData: PerformanceData[] = [
    { timestamp: '14:25', cpu: 67, memory: 78, disk: 45, network: 234, responseTime: 45, activeUsers: 1247 },
    { timestamp: '14:20', cpu: 65, memory: 76, disk: 44, network: 228, responseTime: 42, activeUsers: 1234 },
    { timestamp: '14:15', cpu: 68, memory: 79, disk: 46, network: 240, responseTime: 48, activeUsers: 1256 },
    { timestamp: '14:10', cpu: 64, memory: 75, disk: 43, network: 220, responseTime: 40, activeUsers: 1220 },
    { timestamp: '14:05', cpu: 66, memory: 77, disk: 45, network: 232, responseTime: 44, activeUsers: 1240 }
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
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600';
    if (health >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <Server className="h-8 w-8 mr-3 text-blue-600" />
                Super Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            TransBot AI - Enterprise System Control Center
          </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${mcpStatus === 'connected' ? 'bg-green-500' : mcpStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  MCP {mcpStatus === 'connected' ? 'Connected' : mcpStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                </span>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">System Health</p>
                  <p className={`text-3xl font-bold ${getHealthColor(metrics.systemHealth)}`}>
                    {metrics.systemHealth}%
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.systemHealth}%` }}
                  ></div>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Active Users</p>
                  <p className="text-3xl font-bold text-blue-600">{metrics.activeUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% from last hour
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">MCP Agents</p>
                  <p className="text-3xl font-bold text-purple-600">{metrics.mcpAgents}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                All operational
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Response Time</p>
                  <p className="text-3xl font-bold text-orange-600">{metrics.responseTime}ms</p>
                </div>
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                -5ms from last hour
              </div>
            </div>
          </div>
        )}

        {/* System Performance */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">CPU Usage</h3>
                <Cpu className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{metrics.cpuUsage}%</span>
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray={`${metrics.cpuUsage}, 100`}
                    />
                  </svg>
          </div>
        </div>
            </div>

                         <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-sm font-medium text-gray-600">Memory Usage</h3>
                 <Database className="h-5 w-5 text-gray-400" />
               </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{metrics.memoryUsage}%</span>
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray={`${metrics.memoryUsage}, 100`}
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Disk Usage</h3>
                <HardDrive className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{metrics.diskUsage}%</span>
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      strokeDasharray={`${metrics.diskUsage}, 100`}
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Network</h3>
                <Network className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{metrics.networkTraffic} MB/s</span>
                <div className="w-16 h-16 relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeDasharray="75, 100"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MCP Agents Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-blue-600" />
                MCP Agent Status
              </h3>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{(agent.confidenceScore * 100).toFixed(0)}%</p>
                    <p className="text-xs text-gray-500">{agent.responseTime}ms</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
                      
          {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-red-600" />
                System Alerts
              </h3>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                    alert.type === 'critical' ? 'text-red-600' :
                    alert.type === 'error' ? 'text-red-500' :
                    alert.type === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{alert.title}</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAlertColor(alert.type)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              System Performance
            </h3>
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
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
          <div className="h-64 flex items-end justify-between space-x-2">
            {performanceData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t" style={{ height: `${(data.cpu / 100) * 200}px` }}>
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
                </div>
                <div className="w-full bg-gray-200 rounded-t mt-1" style={{ height: `${(data.memory / 100) * 200}px` }}>
                  <div className="w-full bg-green-500 rounded-t" style={{ height: '100%' }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">{data.timestamp}</p>
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Activity className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">System Monitor</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Security Center</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Brain className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">MCP Agents</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Analytics</span>
          </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;
