import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Database, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Play,
  Pause,
  Square,
  Brain,
  TrendingUp,
  Network,
  Code
} from 'lucide-react';

const MCPOverview: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mcpStatus, setMcpStatus] = useState({
    overall: 'operational',
    agents: 'active',
    models: 'online',
    pipeline: 'running',
    learning: 'training'
  });

  const [metrics, setMetrics] = useState({
    activeAgents: 12,
    totalModels: 8,
    requestsPerMinute: 156,
    averageResponseTime: 245,
    successRate: 98.7,
    activeConnections: 89
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'agent_started', message: 'Autonomous Agent #7 started', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'model_updated', message: 'GPT-4 model updated to v2.1', time: '5 minutes ago', status: 'info' },
    { id: 3, type: 'pipeline_completed', message: 'Data pipeline processing completed', time: '8 minutes ago', status: 'success' },
    { id: 4, type: 'error_detected', message: 'Connection timeout in Agent #3', time: '12 minutes ago', status: 'warning' },
    { id: 5, type: 'learning_completed', message: 'ML model training completed', time: '15 minutes ago', status: 'success' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'active':
      case 'online':
      case 'running':
      case 'training':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
      case 'offline':
      case 'stopped':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'active':
      case 'online':
      case 'running':
      case 'training':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
      case 'offline':
      case 'stopped':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MCP Control Center</h1>
          <p className="text-gray-600">AI and autonomous system management dashboard</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Status</p>
              <p className="text-lg font-semibold text-gray-900">Operational</p>
            </div>
            <div className={`p-2 rounded-full ${getStatusColor(mcpStatus.overall)}`}>
              {getStatusIcon(mcpStatus.overall)}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Agents</p>
              <p className="text-lg font-semibold text-gray-900">{metrics.activeAgents}</p>
            </div>
            <div className={`p-2 rounded-full ${getStatusColor(mcpStatus.agents)}`}>
              <Users className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Models</p>
              <p className="text-lg font-semibold text-gray-900">{metrics.totalModels}</p>
            </div>
            <div className={`p-2 rounded-full ${getStatusColor(mcpStatus.models)}`}>
              <Brain className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Requests/min</p>
              <p className="text-lg font-semibold text-gray-900">{metrics.requestsPerMinute}</p>
            </div>
            <div className={`p-2 rounded-full ${getStatusColor(mcpStatus.pipeline)}`}>
              <Activity className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-lg font-semibold text-gray-900">{metrics.successRate}%</p>
            </div>
            <div className={`p-2 rounded-full ${getStatusColor(mcpStatus.learning)}`}>
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Response Time</p>
                  <p className="text-xs text-gray-600">Average API response time</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{metrics.averageResponseTime}ms</p>
                <p className="text-xs text-green-600">↓ 12% from last hour</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Network className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Active Connections</p>
                  <p className="text-xs text-gray-600">Current active connections</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">{metrics.activeConnections}</p>
                <p className="text-xs text-blue-600">↑ 8% from last hour</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Cpu className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">CPU Usage</p>
                  <p className="text-xs text-gray-600">Average CPU utilization</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">67%</p>
                <p className="text-xs text-yellow-600">→ Stable</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Database className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Memory Usage</p>
                  <p className="text-xs text-gray-600">RAM utilization</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">78%</p>
                <p className="text-xs text-red-600">↑ 5% from last hour</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded-full ${getStatusColor(activity.status)}`}>
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Play className="h-6 w-6 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Start All</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Pause className="h-6 w-6 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Pause All</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Square className="h-6 w-6 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Stop All</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Configure</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Analytics</span>
          </button>
          <button className="flex flex-col items-center space-y-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Code className="h-6 w-6 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">API Docs</span>
          </button>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            Security Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Firewall</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Encryption</span>
              <span className="text-sm font-medium text-green-600">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Access Control</span>
              <span className="text-sm font-medium text-green-600">Secure</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            Network Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Latency</span>
              <span className="text-sm font-medium text-green-600">12ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Bandwidth</span>
              <span className="text-sm font-medium text-green-600">1.2 Gbps</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Uptime</span>
              <span className="text-sm font-medium text-green-600">99.9%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Database className="h-5 w-5 mr-2 text-purple-600" />
            Data Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage</span>
              <span className="text-sm font-medium text-yellow-600">78%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Backup</span>
              <span className="text-sm font-medium text-green-600">Current</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sync Status</span>
              <span className="text-sm font-medium text-green-600">Synced</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPOverview;
