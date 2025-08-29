import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Calendar,
  Download,
  RefreshCw,
  Settings,
  Eye,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  User,
  Users,
  Globe,
  Server,
  Database,
  Network,
  HardDrive,
  Cpu,
  Brain,
  Zap,
  Target,
  Award,
  Star,
  ArrowUp,
  ArrowDown,
  Circle,
  Square,
  Triangle,
  PieChart,
  LineChart,
  AreaChart,
  Scatter,
  Layers,
  Grid,
  List,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  SkipForward,
  SkipBack
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  mcpAgentId?: string;
  lastUpdated: string;
}

interface PerformanceData {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
  activeUsers: number;
  transactions: number;
}

interface PerformanceAlert {
  id: string;
  type: 'performance' | 'capacity' | 'error' | 'optimization';
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  metric: string;
  currentValue: number;
  threshold: number;
  status: 'active' | 'resolved' | 'acknowledged';
  mcpAgentId?: string;
}

interface PerformanceReport {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  status: 'generating' | 'completed' | 'failed' | 'scheduled';
  progress: number;
  startTime: string;
  endTime?: string;
  metrics: number;
  insights: number;
  recommendations: number;
  mcpAgentId: string;
}

interface AnalyticsInsight {
  id: string;
  type: 'trend' | 'anomaly' | 'optimization' | 'prediction';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  timestamp: string;
  metrics: string[];
  mcpAgentId?: string;
}

const PerformanceAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [data, setData] = useState<PerformanceData[]>([]);
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([]);
  const [reports, setReports] = useState<PerformanceReport[]>([]);
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);
  const [timeRange, setTimeRange] = useState('24h');
  const [chartType, setChartType] = useState('line');
  const [activeTab, setActiveTab] = useState('overview');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockMetrics: PerformanceMetric[] = [
    {
      id: 'metric-001',
      name: 'System Response Time',
      value: 45,
      unit: 'ms',
      change: -12,
      trend: 'down',
      target: 50,
      status: 'excellent',
      mcpAgentId: 'agent-001',
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: 'metric-002',
      name: 'CPU Utilization',
      value: 67,
      unit: '%',
      change: 5,
      trend: 'up',
      target: 80,
      status: 'good',
      mcpAgentId: 'agent-002',
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: 'metric-003',
      name: 'Memory Usage',
      value: 78,
      unit: '%',
      change: 2,
      trend: 'up',
      target: 85,
      status: 'good',
      mcpAgentId: 'agent-003',
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: 'metric-004',
      name: 'Throughput',
      value: 1247,
      unit: 'req/s',
      change: 15,
      trend: 'up',
      target: 1000,
      status: 'excellent',
      mcpAgentId: 'agent-004',
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: 'metric-005',
      name: 'Error Rate',
      value: 0.02,
      unit: '%',
      change: -0.01,
      trend: 'down',
      target: 0.1,
      status: 'excellent',
      mcpAgentId: 'agent-001',
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: 'metric-006',
      name: 'Active Users',
      value: 892,
      unit: 'users',
      change: 23,
      trend: 'up',
      target: 1000,
      status: 'good',
      mcpAgentId: 'agent-002',
      lastUpdated: '2024-01-15 14:30:00'
    }
  ];

  const mockData: PerformanceData[] = [
    { timestamp: '14:30', cpu: 67, memory: 78, disk: 45, network: 234, responseTime: 45, throughput: 1247, errorRate: 0.02, activeUsers: 892, transactions: 1567 },
    { timestamp: '14:25', cpu: 65, memory: 76, disk: 44, network: 228, responseTime: 42, throughput: 1234, errorRate: 0.03, activeUsers: 885, transactions: 1542 },
    { timestamp: '14:20', cpu: 68, memory: 79, disk: 46, network: 240, responseTime: 48, throughput: 1256, errorRate: 0.01, activeUsers: 901, transactions: 1589 },
    { timestamp: '14:15', cpu: 64, memory: 75, disk: 43, network: 220, responseTime: 40, throughput: 1220, errorRate: 0.02, activeUsers: 878, transactions: 1534 },
    { timestamp: '14:10', cpu: 66, memory: 77, disk: 45, network: 232, responseTime: 44, throughput: 1240, errorRate: 0.02, activeUsers: 889, transactions: 1556 }
  ];

  const mockAlerts: PerformanceAlert[] = [
    {
      id: 'alert-001',
      type: 'performance',
      severity: 'warning',
      title: 'High CPU Usage Detected',
      description: 'CPU utilization has increased by 15% in the last hour',
      timestamp: '2024-01-15 14:25:00',
      metric: 'CPU Utilization',
      currentValue: 67,
      threshold: 60,
      status: 'active',
      mcpAgentId: 'agent-002'
    },
    {
      id: 'alert-002',
      type: 'optimization',
      severity: 'info',
      title: 'Performance Optimization Available',
      description: 'Database query optimization can improve response time by 20%',
      timestamp: '2024-01-15 14:20:00',
      metric: 'Response Time',
      currentValue: 45,
      threshold: 40,
      status: 'acknowledged',
      mcpAgentId: 'agent-001'
    }
  ];

  const mockReports: PerformanceReport[] = [
    {
      id: 'report-001',
      name: 'Daily Performance Report',
      type: 'daily',
      status: 'completed',
      progress: 100,
      startTime: '2024-01-15 14:00:00',
      endTime: '2024-01-15 14:30:00',
      metrics: 24,
      insights: 8,
      recommendations: 5,
      mcpAgentId: 'agent-001'
    },
    {
      id: 'report-002',
      name: 'Weekly Trend Analysis',
      type: 'weekly',
      status: 'generating',
      progress: 65,
      startTime: '2024-01-15 14:30:00',
      metrics: 0,
      insights: 0,
      recommendations: 0,
      mcpAgentId: 'agent-002'
    }
  ];

  const mockInsights: AnalyticsInsight[] = [
    {
      id: 'insight-001',
      type: 'trend',
      title: 'Response Time Improvement',
      description: 'System response time has improved by 12% over the last 24 hours',
      impact: 'high',
      confidence: 0.95,
      timestamp: '2024-01-15 14:30:00',
      metrics: ['Response Time', 'Throughput'],
      mcpAgentId: 'agent-001'
    },
    {
      id: 'insight-002',
      type: 'optimization',
      title: 'Memory Usage Optimization',
      description: 'Memory usage can be optimized by implementing caching strategies',
      impact: 'medium',
      confidence: 0.87,
      timestamp: '2024-01-15 14:25:00',
      metrics: ['Memory Usage', 'CPU Utilization'],
      mcpAgentId: 'agent-003'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMetrics(mockMetrics);
      setData(mockData);
      setAlerts(mockAlerts);
      setReports(mockReports);
      setInsights(mockInsights);
      setMcpStatus('connected');
      setLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'info': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <BarChart3 className="h-8 w-8 mr-3 text-blue-600" />
                Performance Analytics
              </h1>
              <p className="text-xl text-gray-600">
                TransBot AI - Enterprise Performance Monitoring Center
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

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-xs font-medium ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change >= 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-3xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}{metric.unit}
                  </p>
                  <p className="text-sm text-gray-500">Target: {metric.target}{metric.unit}</p>
                </div>
                <div className="text-right">
                  <div className={`w-16 h-16 relative`}>
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
                        stroke={metric.status === 'excellent' ? '#10b981' : metric.status === 'good' ? '#3b82f6' : metric.status === 'warning' ? '#f59e0b' : '#ef4444'}
                        strokeWidth="2"
                        strokeDasharray={`${(metric.value / metric.target) * 100}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'charts', name: 'Charts', icon: LineChart },
                { id: 'alerts', name: 'Alerts', icon: AlertTriangle },
                { id: 'reports', name: 'Reports', icon: Download },
                { id: 'insights', name: 'Insights', icon: Brain }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Chart */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                      Performance Trends
                    </h3>
                    <div className="flex items-center space-x-2">
                      <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="1h">Last Hour</option>
                        <option value="24h">Last 24 Hours</option>
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                      </select>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {data.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gray-200 rounded-t" style={{ height: `${(item.cpu / 100) * 200}px` }}>
                          <div className="w-full bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-t mt-1" style={{ height: `${(item.memory / 100) * 200}px` }}>
                          <div className="w-full bg-green-500 rounded-t" style={{ height: '100%' }}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">{item.timestamp}</p>
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

                {/* MCP Agent Performance */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    MCP Analytics Agents
                  </h3>
                  <div className="space-y-4">
                    {metrics.filter(metric => metric.mcpAgentId).map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(metric.status).replace('text-', 'bg-')}`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{metric.name}</p>
                            <p className="text-sm text-gray-500">{metric.value}{metric.unit}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{(metric.value / metric.target * 100).toFixed(0)}%</p>
                          <p className="text-xs text-gray-500 capitalize">{metric.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'charts' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Charts</h3>
                  <div className="flex items-center space-x-2">
                    <select
                      value={chartType}
                      onChange={(e) => setChartType(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="line">Line Chart</option>
                      <option value="bar">Bar Chart</option>
                      <option value="area">Area Chart</option>
                      <option value="pie">Pie Chart</option>
                    </select>
                    <Button variant="outline" size="sm">
                      <Maximize2 className="h-4 w-4 mr-2" />
                      Fullscreen
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">System Resources</h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {data.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-gray-200 rounded-t" style={{ height: `${(item.cpu / 100) * 200}px` }}>
                            <div className="w-full bg-blue-500 rounded-t" style={{ height: '100%' }}></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">{item.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">User Activity</h4>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {data.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-gray-200 rounded-t" style={{ height: `${(item.activeUsers / 1000) * 200}px` }}>
                            <div className="w-full bg-green-500 rounded-t" style={{ height: '100%' }}></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">{item.timestamp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Alerts</h3>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border">
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${getSeverityColor(alert.severity).split(' ')[1]}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{alert.title}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Metric: {alert.metric}</span>
                          <span>Current: {alert.currentValue}</span>
                          <span>Threshold: {alert.threshold}</span>
                          <span>Time: {alert.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Reports</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{report.name}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            report.status === 'completed' ? 'bg-green-100 text-green-800' :
                            report.status === 'generating' ? 'bg-blue-100 text-blue-800' :
                            report.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Started: {report.startTime}
                        </div>
                      </div>
                      
                      {report.status === 'generating' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{report.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${report.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{report.metrics}</p>
                          <p className="text-gray-600">Metrics</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{report.insights}</p>
                          <p className="text-gray-600">Insights</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-gray-900">{report.recommendations}</p>
                          <p className="text-gray-600">Recommendations</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Analytics Insights</h3>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(insight.impact)}`}>
                            {insight.impact} impact
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {(insight.confidence * 100).toFixed(0)}% confidence
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Metrics: {insight.metrics.join(', ')}</span>
                        <span>{insight.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Performance Monitor</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Target className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Set Targets</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Brain className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">AI Insights</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Download className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Export Data</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
