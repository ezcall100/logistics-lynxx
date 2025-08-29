import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Server, 
  Shield, 
  Clock,
  Network,
  Rocket,
  Settings,
  Bell,
  Eye,
  RefreshCw,
  TrendingUp,
  Activity,
  Gauge,
  Bot
} from 'lucide-react';

interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  description: string;
  trend?: 'up' | 'down' | 'stable';
}

interface SystemStatus {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastUpdate: string;
}

interface AgentStatus {
  total: number;
  online: number;
  offline: number;
  degraded: number;
}

interface JobMetrics {
  queued: number;
  running: number;
  completed: number;
  failed: number;
  successRate: number;
}

interface AIAgent {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  type: 'autonomous' | 'assistant' | 'monitor' | 'orchestrator';
  performance: number;
  lastActivity: string;
  avatar: string;
}

const SuperAdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    status: 'healthy',
    uptime: 99.8,
    responseTime: 245,
    errorRate: 0.015,
    lastUpdate: new Date().toISOString()
  });
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    total: 15,
    online: 12,
    offline: 3,
    degraded: 2
  });
  const [jobMetrics, setJobMetrics] = useState<JobMetrics>({
    queued: 45,
    running: 23,
    completed: 1250,
    failed: 12,
    successRate: 0.985
  });
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [activeAgents, setActiveAgents] = useState<AIAgent[]>([]);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/mcp/metrics/overview');
      if (response.ok) {
        const data = await response.json();
        updateMetrics(data.data);
        updateSystemStatus(data.data);
        updateAgentStatus(data.data);
        updateJobMetrics(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // Use mock data if API is unavailable
      updateMetricsWithMockData();
    } finally {
      setIsLoading(false);
      setLastRefresh(new Date());
    }
  };

  const updateMetrics = (data: any) => {
    const newMetrics: MetricCard[] = [
      {
        id: 'active-users',
        title: 'Active Users',
        value: data.users?.active || 1247,
        change: 12.5,
        changeType: 'positive',
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        description: 'Users currently online',
        trend: 'up'
      },
      {
        id: 'system-health',
        title: 'System Health',
        value: `${data.system?.uptime || 99.8}%`,
        change: 0.2,
        changeType: 'positive',
        icon: Server,
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        description: 'Overall system uptime',
        trend: 'stable'
      },
      {
        id: 'ai-agents',
        title: 'AI Agents',
        value: data.agents?.online || 12,
        change: 2,
        changeType: 'positive',
        icon: Bot,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        description: 'Active AI agents',
        trend: 'up'
      },
      {
        id: 'security-status',
        title: 'Security Status',
        value: 'Secure',
        change: 0,
        changeType: 'neutral',
        icon: Shield,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
        description: 'All systems secure',
        trend: 'stable'
      },
      {
        id: 'performance',
        title: 'Performance',
        value: `${data.resources?.cpu_usage || 45}%`,
        change: -5.2,
        changeType: 'positive',
        icon: Gauge,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        description: 'CPU utilization',
        trend: 'down'
      },
      {
        id: 'data-throughput',
        title: 'Data Throughput',
        value: `${data.resources?.network_throughput || 2.4} GB/s`,
        change: 8.7,
        changeType: 'positive',
        icon: Network,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
        description: 'Network throughput',
        trend: 'up'
      }
    ];
    setMetrics(newMetrics);
  };

  const updateMetricsWithMockData = () => {
    const mockMetrics: MetricCard[] = [
      {
        id: 'active-users',
        title: 'Active Users',
        value: 1247,
        change: 12.5,
        changeType: 'positive',
        icon: Users,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        description: 'Users currently online',
        trend: 'up'
      },
      {
        id: 'system-health',
        title: 'System Health',
        value: '99.8%',
        change: 0.2,
        changeType: 'positive',
        icon: Server,
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        description: 'Overall system uptime',
        trend: 'stable'
      },
      {
        id: 'ai-agents',
        title: 'AI Agents',
        value: 12,
        change: 2,
        changeType: 'positive',
        icon: Bot,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        description: 'Active AI agents',
        trend: 'up'
      },
      {
        id: 'security-status',
        title: 'Security Status',
        value: 'Secure',
        change: 0,
        changeType: 'neutral',
        icon: Shield,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
        description: 'All systems secure',
        trend: 'stable'
      },
      {
        id: 'performance',
        title: 'Performance',
        value: '45%',
        change: -5.2,
        changeType: 'positive',
        icon: Gauge,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        description: 'CPU utilization',
        trend: 'down'
      },
      {
        id: 'data-throughput',
        title: 'Data Throughput',
        value: '2.4 GB/s',
        change: 8.7,
        changeType: 'positive',
        icon: Network,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
        description: 'Network throughput',
        trend: 'up'
      }
    ];
    setMetrics(mockMetrics);
  };

  const updateSystemStatus = (data: any) => {
    setSystemStatus({
      status: data.system?.error_rate > 0.05 ? 'warning' : 'healthy',
      uptime: data.system?.uptime || 99.8,
      responseTime: data.system?.response_time || 245,
      errorRate: data.system?.error_rate || 0.015,
      lastUpdate: new Date().toISOString()
    });
  };

  const updateAgentStatus = (data: any) => {
    setAgentStatus({
      total: data.agents?.total || 15,
      online: data.agents?.online || 12,
      offline: data.agents?.offline || 3,
      degraded: data.agents?.degraded || 2
    });
  };

  const updateJobMetrics = (data: any) => {
    setJobMetrics({
      queued: data.jobs?.queued || 45,
      running: data.jobs?.running || 23,
      completed: data.jobs?.completed || 1250,
      failed: data.jobs?.failed || 12,
      successRate: data.jobs?.success_rate || 0.985
    });
  };

  // Mock AI agents data
  useEffect(() => {
    const mockAgents: AIAgent[] = [
      {
        id: 'agent-1',
        name: 'Autonomous Orchestrator',
        status: 'active',
        type: 'orchestrator',
        performance: 98.5,
        lastActivity: '2 minutes ago',
        avatar: '🤖'
      },
      {
        id: 'agent-2',
        name: 'Security Monitor',
        status: 'active',
        type: 'monitor',
        performance: 99.2,
        lastActivity: '1 minute ago',
        avatar: '🛡️'
      },
      {
        id: 'agent-3',
        name: 'Data Processor',
        status: 'processing',
        type: 'autonomous',
        performance: 87.3,
        lastActivity: 'Now',
        avatar: '⚡'
      },
      {
        id: 'agent-4',
        name: 'User Assistant',
        status: 'idle',
        type: 'assistant',
        performance: 94.1,
        lastActivity: '5 minutes ago',
        avatar: '💬'
      }
    ];
    setActiveAgents(mockAgents);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'warning':
      case 'processing':
        return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'critical':
      case 'error':
        return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'idle':
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
      default:
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[color:var(--bg-app)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--brand-1)] mx-auto mb-4"></div>
          <p className="text-[color:var(--fg-muted)]">Loading MCP Super Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg-app)] text-[color:var(--fg)]">
      {/* Header Section */}
      <div className="border-b border-[color:var(--bg-surface-rgba)] bg-[color:var(--bg-app)]/50 backdrop-blur-xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[color:var(--fg)]">
                MCP Super Admin Dashboard
              </h1>
              <p className="text-[color:var(--fg-muted)] mt-1">
                Master Control Program - Real-time System Overview
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-[color:var(--fg-muted)]">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  Last updated: {lastRefresh.toLocaleTimeString()}
                </span>
              </div>
              <button
                onClick={fetchDashboardData}
                className="flex items-center space-x-2 px-4 py-2 bg-[color:var(--brand-1)] hover:bg-[color:var(--brand-1)]/90 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-[color:var(--bg-surface-rgba)] backdrop-blur-xl rounded-[color:var(--radius-mcp)] p-6 border border-[color:var(--bg-surface-rgba)] hover:border-[color:var(--brand-1)]/30 transition-all duration-300 hover:shadow-[color:var(--shadow-soft)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend)}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-[color:var(--fg-muted)]">
                  {metric.title}
                </h3>
                <p className="text-2xl font-bold text-[color:var(--fg)]">
                  {metric.value}
                </p>
                <p className="text-xs text-[color:var(--fg-muted)]">
                  {metric.description}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' :
                    metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                  <span className="text-xs text-[color:var(--fg-muted)]">vs last hour</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Status and AI Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <div className="bg-[color:var(--bg-surface-rgba)] backdrop-blur-xl rounded-[color:var(--radius-mcp)] p-6 border border-[color:var(--bg-surface-rgba)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[color:var(--fg)]">System Status</h2>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(systemStatus.status)}`}>
                {systemStatus.status === 'healthy' ? 'Healthy' : 
                 systemStatus.status === 'warning' ? 'Warning' : 'Critical'}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--fg-muted)]">Uptime</span>
                <span className="font-semibold text-[color:var(--fg)]">{systemStatus.uptime}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--fg-muted)]">Response Time</span>
                <span className="font-semibold text-[color:var(--fg)]">{systemStatus.responseTime}ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--fg-muted)]">Error Rate</span>
                <span className="font-semibold text-[color:var(--fg)]">{(systemStatus.errorRate * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>

          {/* AI Agents Status */}
          <div className="bg-[color:var(--bg-surface-rgba)] backdrop-blur-xl rounded-[color:var(--radius-mcp)] p-6 border border-[color:var(--bg-surface-rgba)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[color:var(--fg)]">AI Agents</h2>
              <div className="text-sm text-[color:var(--fg-muted)]">
                {agentStatus.online}/{agentStatus.total} Online
              </div>
            </div>
            <div className="space-y-3">
              {activeAgents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-[color:var(--bg-app)]/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{agent.avatar}</div>
                    <div>
                      <p className="font-medium text-[color:var(--fg)]">{agent.name}</p>
                      <p className="text-xs text-[color:var(--fg-muted)] capitalize">{agent.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </div>
                    <p className="text-xs text-[color:var(--fg-muted)] mt-1">
                      {agent.performance}% perf
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Metrics and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Job Metrics */}
          <div className="bg-[color:var(--bg-surface-rgba)] backdrop-blur-xl rounded-[color:var(--radius-mcp)] p-6 border border-[color:var(--bg-surface-rgba)]">
            <h2 className="text-lg font-semibold text-[color:var(--fg)] mb-6">Job Metrics</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--fg-muted)]">Queued</span>
                <span className="font-semibold text-[color:var(--fg)]">{jobMetrics.queued}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--fg-muted)]">Running</span>
                <span className="font-semibold text-[color:var(--fg)]">{jobMetrics.running}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--fg-muted)]">Completed</span>
                <span className="font-semibold text-[color:var(--fg)]">{jobMetrics.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[color:var(--fg-muted)]">Failed</span>
                <span className="font-semibold text-[color:var(--fg)]">{jobMetrics.failed}</span>
              </div>
              <div className="pt-4 border-t border-[color:var(--bg-surface-rgba)]">
                <div className="flex items-center justify-between">
                  <span className="text-[color:var(--fg-muted)]">Success Rate</span>
                  <span className="font-semibold text-[color:var(--fg)]">
                    {(jobMetrics.successRate * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[color:var(--bg-surface-rgba)] backdrop-blur-xl rounded-[color:var(--radius-mcp)] p-6 border border-[color:var(--bg-surface-rgba)]">
            <h2 className="text-lg font-semibold text-[color:var(--fg)] mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center space-x-2 p-3 bg-[color:var(--brand-1)] hover:bg-[color:var(--brand-1)]/90 text-white rounded-lg transition-colors">
                <Rocket className="h-4 w-4" />
                <span className="text-sm">Deploy</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-[color:var(--bg-app)] hover:bg-[color:var(--bg-surface-rgba)] border border-[color:var(--bg-surface-rgba)] text-[color:var(--fg)] rounded-lg transition-colors">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Configure</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-[color:var(--bg-app)] hover:bg-[color:var(--bg-surface-rgba)] border border-[color:var(--bg-surface-rgba)] text-[color:var(--fg)] rounded-lg transition-colors">
                <Eye className="h-4 w-4" />
                <span className="text-sm">Monitor</span>
              </button>
              <button className="flex items-center space-x-2 p-3 bg-[color:var(--bg-app)] hover:bg-[color:var(--bg-surface-rgba)] border border-[color:var(--bg-surface-rgba)] text-[color:var(--fg)] rounded-lg transition-colors">
                <Bell className="h-4 w-4" />
                <span className="text-sm">Alerts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
