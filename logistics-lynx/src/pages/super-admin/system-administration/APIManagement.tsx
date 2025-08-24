import React, { useState, useEffect } from 'react';
import {
  Code,
  Key,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Plus,
  Settings,
  Shield,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Server,
  Network,
  FileText,
  Archive,
  RotateCcw,
  Save,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  ExternalLink,
  Globe,
  Lock,
  Unlock,
  Users,
  Database,
  Cpu,
  HardDrive
} from 'lucide-react';

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'expired';
  permissions: string[];
  rateLimit: string;
  usage: number;
  lastUsed: string;
  createdAt: string;
  expiresAt: string;
  owner: string;
}

interface APIEndpoint {
  id: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: 'active' | 'deprecated' | 'maintenance';
  responseTime: number;
  successRate: number;
  requestsPerMinute: number;
  errors: number;
  lastUpdated: string;
  version: string;
}

interface APIMetrics {
  totalRequests: number;
  averageResponseTime: number;
  errorRate: number;
  activeKeys: number;
  totalEndpoints: number;
  uptime: number;
}

const APIManagement: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [metrics, setMetrics] = useState<APIMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showEndpointModal, setShowEndpointModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setApiKeys([
        {
          id: '1',
          name: 'TMS Production API',
          key: 'sk_live_1234567890abcdef',
          status: 'active',
          permissions: ['read', 'write', 'admin'],
          rateLimit: '1000 requests/hour',
          usage: 67,
          lastUsed: '2 minutes ago',
          createdAt: '2024-01-15',
          expiresAt: '2025-01-15',
          owner: 'admin@tms.com'
        },
        {
          id: '2',
          name: 'Analytics API Key',
          key: 'sk_live_abcdef1234567890',
          status: 'active',
          permissions: ['read'],
          rateLimit: '500 requests/hour',
          usage: 23,
          lastUsed: '1 hour ago',
          createdAt: '2024-02-01',
          expiresAt: '2025-02-01',
          owner: 'analytics@tms.com'
        },
        {
          id: '3',
          name: 'Test Environment Key',
          key: 'sk_test_7890abcdef123456',
          status: 'inactive',
          permissions: ['read', 'write'],
          rateLimit: '100 requests/hour',
          usage: 0,
          lastUsed: '1 week ago',
          createdAt: '2024-03-01',
          expiresAt: '2024-12-31',
          owner: 'dev@tms.com'
        }
      ]);

      setEndpoints([
        {
          id: '1',
          path: '/api/v1/users',
          method: 'GET',
          status: 'active',
          responseTime: 45,
          successRate: 99.8,
          requestsPerMinute: 156,
          errors: 2,
          lastUpdated: '2024-01-15',
          version: 'v1.2.0'
        },
        {
          id: '2',
          path: '/api/v1/orders',
          method: 'POST',
          status: 'active',
          responseTime: 120,
          successRate: 98.5,
          requestsPerMinute: 89,
          errors: 12,
          lastUpdated: '2024-01-14',
          version: 'v1.1.5'
        },
        {
          id: '3',
          path: '/api/v1/analytics',
          method: 'GET',
          status: 'maintenance',
          responseTime: 200,
          successRate: 95.2,
          requestsPerMinute: 34,
          errors: 8,
          lastUpdated: '2024-01-13',
          version: 'v1.0.8'
        }
      ]);

      setMetrics({
        totalRequests: 15420,
        averageResponseTime: 89,
        errorRate: 1.2,
        activeKeys: 2,
        totalEndpoints: 45,
        uptime: 99.9
      });

      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'deprecated': return 'text-yellow-600 bg-yellow-100';
      case 'maintenance': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-600 bg-green-100';
      case 'POST': return 'text-blue-600 bg-blue-100';
      case 'PUT': return 'text-yellow-600 bg-yellow-100';
      case 'DELETE': return 'text-red-600 bg-red-100';
      case 'PATCH': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 99) return 'text-green-600';
    if (rate >= 95) return 'text-blue-600';
    if (rate >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 100) return 'text-green-600';
    if (time < 200) return 'text-blue-600';
    if (time < 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              API Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage API keys, monitor endpoints, and track performance
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowKeyModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New API Key</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Globe className="h-4 w-4" />
            <span>API Documentation</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics?.totalRequests.toLocaleString()}
              </p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">+15% today</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Response Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics?.averageResponseTime}ms</p>
            </div>
            <Zap className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">-8% this week</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Error Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics?.errorRate}%</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">-2% this month</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Uptime</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics?.uptime}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {['overview', 'keys', 'endpoints', 'monitoring', 'security'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Overview</h3>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">API Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active Endpoints</span>
                      <span className="font-semibold text-blue-600">{metrics?.totalEndpoints}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Active API Keys</span>
                      <span className="font-semibold text-green-600">{metrics?.activeKeys}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Requests per Second</span>
                      <span className="font-semibold text-purple-600">4.2</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">System Health</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                      <span className="font-semibold text-blue-600">23%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
                      <span className="font-semibold text-green-600">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Network I/O</span>
                      <span className="font-semibold text-purple-600">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'keys' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Keys</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search API keys..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowKeyModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Key</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Key className="h-6 w-6 text-blue-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{key.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Owner: {key.owner}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(key.status)}`}>
                          {key.status}
                        </span>
                        <button className="text-gray-600 hover:text-gray-700">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">API Key</p>
                        <div className="flex items-center space-x-2">
                          <code className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                            {key.key.substring(0, 12)}...
                          </code>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Rate Limit</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{key.rateLimit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Usage</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{key.usage}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last Used</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{key.lastUsed}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {key.permissions.map((permission) => (
                          <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm">Edit</button>
                        <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'endpoints' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Endpoints</h3>
                <button
                  onClick={() => setShowEndpointModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Endpoint</span>
                </button>
              </div>

              <div className="space-y-4">
                {endpoints.map((endpoint) => (
                  <div key={endpoint.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Server className="h-6 w-6 text-green-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{endpoint.path}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Version: {endpoint.version}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(endpoint.status)}`}>
                          {endpoint.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                        <p className={`font-semibold ${getResponseTimeColor(endpoint.responseTime)}`}>
                          {endpoint.responseTime}ms
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
                        <p className={`font-semibold ${getSuccessRateColor(endpoint.successRate)}`}>
                          {endpoint.successRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Requests/min</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{endpoint.requestsPerMinute}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Errors</p>
                        <p className="font-semibold text-red-600">{endpoint.errors}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last updated: {endpoint.lastUpdated}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">View Logs</button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm">Test</button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm">Documentation</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-time Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Request Volume</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last Hour</span>
                      <span className="font-semibold text-blue-600">2,847 requests</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Last 24 Hours</span>
                      <span className="font-semibold text-green-600">68,392 requests</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Peak Requests/min</span>
                      <span className="font-semibold text-purple-600">156</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Error Tracking</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">4xx Errors</span>
                      <span className="font-semibold text-yellow-600">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">5xx Errors</span>
                      <span className="font-semibold text-red-600">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Timeout Errors</span>
                      <span className="font-semibold text-orange-600">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Security Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Rate Limiting</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Default Rate Limit</span>
                      <span className="font-semibold text-blue-600">1000 req/hour</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Burst Limit</span>
                      <span className="font-semibold text-green-600">100 req/min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">IP Blocking</span>
                      <span className="font-semibold text-green-600">Enabled</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Authentication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">JWT Expiration</span>
                      <span className="font-semibold text-blue-600">24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Refresh Tokens</span>
                      <span className="font-semibold text-green-600">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">2FA Required</span>
                      <span className="font-semibold text-green-600">Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APIManagement;
