import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  GitMerge, 
  GitCompare,
  Play,
  Pause,
  Stop,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Info,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Save,
  Plus,
  Search,
  Filter,
  Calendar,
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
  BarChart3,
  Activity,
  Layers,
  Grid,
  List,
  Maximize2,
  Minimize2,
  SkipForward,
  SkipBack,
  Terminal,
  Code,
  Package,
  Archive,
  Lock,
  Unlock,
  Shield,
  Key,
  Wifi,
  WifiOff,
  MapPin,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Deployment {
  id: string;
  name: string;
  version: string;
  environment: 'development' | 'staging' | 'production' | 'testing';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'rolled_back';
  progress: number;
  startTime: string;
  endTime?: string;
  duration?: number;
  commitHash: string;
  branch: string;
  author: string;
  description: string;
  mcpAgentId?: string;
  confidenceScore: number;
  deploymentType: 'manual' | 'automated' | 'scheduled';
  rollbackAvailable: boolean;
}

interface DeploymentStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  duration: number;
  startTime: string;
  endTime?: string;
  logs: string[];
  mcpAgentId?: string;
}

interface DeploymentMetrics {
  totalDeployments: number;
  successfulDeployments: number;
  failedDeployments: number;
  averageDeploymentTime: number;
  deploymentSuccessRate: number;
  lastDeployment: string;
  nextScheduledDeployment: string;
  activeDeployments: number;
  mcpAgentStatus: 'connected' | 'disconnected' | 'error';
}

interface DeploymentAlert {
  id: string;
  type: 'deployment' | 'rollback' | 'performance' | 'security';
  severity: 'info' | 'warning' | 'error' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  deploymentId?: string;
  status: 'active' | 'resolved' | 'acknowledged';
  mcpAgentId?: string;
}

interface Environment {
  id: string;
  name: string;
  type: 'development' | 'staging' | 'production' | 'testing';
  status: 'healthy' | 'warning' | 'error' | 'maintenance';
  url: string;
  lastDeployment: string;
  version: string;
  uptime: number;
  responseTime: number;
  mcpAgentId?: string;
}

const DeploymentManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [steps, setSteps] = useState<DeploymentStep[]>([]);
  const [metrics, setMetrics] = useState<DeploymentMetrics | null>(null);
  const [alerts, setAlerts] = useState<DeploymentAlert[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(null);
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockDeployments: Deployment[] = [
    {
      id: 'deploy-001',
      name: 'Frontend v2.1.0',
      version: '2.1.0',
      environment: 'production',
      status: 'completed',
      progress: 100,
      startTime: '2024-01-15 14:00:00',
      endTime: '2024-01-15 14:15:00',
      duration: 900,
      commitHash: 'a1b2c3d4e5f6',
      branch: 'main',
      author: 'John Doe',
      description: 'New UI components and performance improvements',
      mcpAgentId: 'agent-001',
      confidenceScore: 0.95,
      deploymentType: 'automated',
      rollbackAvailable: true
    },
    {
      id: 'deploy-002',
      name: 'Backend API v1.5.2',
      version: '1.5.2',
      environment: 'staging',
      status: 'running',
      progress: 65,
      startTime: '2024-01-15 14:30:00',
      commitHash: 'b2c3d4e5f6g7',
      branch: 'feature/api-enhancements',
      author: 'Jane Smith',
      description: 'API performance optimizations and new endpoints',
      mcpAgentId: 'agent-002',
      confidenceScore: 0.88,
      deploymentType: 'manual',
      rollbackAvailable: false
    },
    {
      id: 'deploy-003',
      name: 'Database Migration v3.0.1',
      version: '3.0.1',
      environment: 'development',
      status: 'failed',
      progress: 45,
      startTime: '2024-01-15 13:45:00',
      endTime: '2024-01-15 14:00:00',
      duration: 900,
      commitHash: 'c3d4e5f6g7h8',
      branch: 'hotfix/db-migration',
      author: 'Mike Johnson',
      description: 'Database schema updates and data migration',
      mcpAgentId: 'agent-003',
      confidenceScore: 0.72,
      deploymentType: 'scheduled',
      rollbackAvailable: true
    }
  ];

  const mockSteps: DeploymentStep[] = [
    {
      id: 'step-001',
      name: 'Code Build',
      status: 'completed',
      duration: 120,
      startTime: '2024-01-15 14:00:00',
      endTime: '2024-01-15 14:02:00',
      logs: ['Building project...', 'Dependencies installed', 'Build successful'],
      mcpAgentId: 'agent-001'
    },
    {
      id: 'step-002',
      name: 'Tests',
      status: 'completed',
      duration: 180,
      startTime: '2024-01-15 14:02:00',
      endTime: '2024-01-15 14:05:00',
      logs: ['Running unit tests...', 'Running integration tests...', 'All tests passed'],
      mcpAgentId: 'agent-001'
    },
    {
      id: 'step-003',
      name: 'Deploy to Staging',
      status: 'running',
      duration: 300,
      startTime: '2024-01-15 14:05:00',
      logs: ['Deploying to staging environment...', 'Health checks in progress...'],
      mcpAgentId: 'agent-002'
    }
  ];

  const mockMetrics: DeploymentMetrics = {
    totalDeployments: 156,
    successfulDeployments: 142,
    failedDeployments: 14,
    averageDeploymentTime: 1200,
    deploymentSuccessRate: 91,
    lastDeployment: '2024-01-15 14:15:00',
    nextScheduledDeployment: '2024-01-15 16:00:00',
    activeDeployments: 2,
    mcpAgentStatus: 'connected'
  };

  const mockAlerts: DeploymentAlert[] = [
    {
      id: 'alert-001',
      type: 'deployment',
      severity: 'warning',
      title: 'Deployment Taking Longer Than Expected',
      description: 'Backend API deployment has exceeded normal duration',
      timestamp: '2024-01-15 14:25:00',
      deploymentId: 'deploy-002',
      status: 'active',
      mcpAgentId: 'agent-002'
    },
    {
      id: 'alert-002',
      type: 'rollback',
      severity: 'info',
      title: 'Rollback Available',
      description: 'Previous version is available for rollback if needed',
      timestamp: '2024-01-15 14:20:00',
      deploymentId: 'deploy-001',
      status: 'acknowledged',
      mcpAgentId: 'agent-001'
    }
  ];

  const mockEnvironments: Environment[] = [
    {
      id: 'env-001',
      name: 'Production',
      type: 'production',
      status: 'healthy',
      url: 'https://app.transbot.ai',
      lastDeployment: '2024-01-15 14:15:00',
      version: '2.1.0',
      uptime: 99.9,
      responseTime: 45,
      mcpAgentId: 'agent-001'
    },
    {
      id: 'env-002',
      name: 'Staging',
      type: 'staging',
      status: 'warning',
      url: 'https://staging.transbot.ai',
      lastDeployment: '2024-01-15 14:30:00',
      version: '1.5.2',
      uptime: 98.5,
      responseTime: 120,
      mcpAgentId: 'agent-002'
    },
    {
      id: 'env-003',
      name: 'Development',
      type: 'development',
      status: 'error',
      url: 'https://dev.transbot.ai',
      lastDeployment: '2024-01-15 14:00:00',
      version: '3.0.1',
      uptime: 95.2,
      responseTime: 200,
      mcpAgentId: 'agent-003'
    }
  ];

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDeployments(mockDeployments);
      setSteps(mockSteps);
      setMetrics(mockMetrics);
      setAlerts(mockAlerts);
      setEnvironments(mockEnvironments);
      setMcpStatus('connected');
      setLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      case 'rolled_back': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getEnvironmentStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      case 'maintenance': return 'text-blue-600';
      default: return 'text-gray-600';
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

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
                <GitBranch className="h-8 w-8 mr-3 text-green-600" />
                Deployment Management
              </h1>
              <p className="text-xl text-gray-600">
                TransBot AI - Enterprise DevOps Control Center
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

        {/* Deployment Metrics */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Success Rate</p>
                  <p className="text-3xl font-bold text-green-600">{metrics.deploymentSuccessRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.deploymentSuccessRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Total Deployments</p>
                  <p className="text-3xl font-bold text-blue-600">{metrics.totalDeployments}</p>
                </div>
                <GitCommit className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12 this week
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Avg. Deployment Time</p>
                  <p className="text-3xl font-bold text-orange-600">{formatDuration(metrics.averageDeploymentTime)}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <TrendingDown className="h-4 w-4 mr-1" />
                -15% from last month
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Active Deployments</p>
                  <p className="text-3xl font-bold text-purple-600">{metrics.activeDeployments}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-1" />
                All running smoothly
              </div>
            </div>
          </div>
        )}

        {/* Environment Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {environments.map((env) => (
            <div key={env.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{env.name}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(env.status === 'healthy' ? 'info' : env.status === 'warning' ? 'warning' : 'error')}`}>
                  {env.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Version:</span>
                  <span className="text-sm font-medium text-gray-900">{env.version}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime:</span>
                  <span className="text-sm font-medium text-gray-900">{env.uptime}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time:</span>
                  <span className="text-sm font-medium text-gray-900">{env.responseTime}ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Deploy:</span>
                  <span className="text-sm font-medium text-gray-900">{env.lastDeployment}</span>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
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
                { id: 'deployments', name: 'Deployments', icon: GitCommit },
                { id: 'environments', name: 'Environments', icon: Server },
                { id: 'alerts', name: 'Alerts', icon: AlertTriangle },
                { id: 'logs', name: 'Logs', icon: Terminal }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
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
                {/* Recent Deployments */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <GitCommit className="h-5 w-5 mr-2 text-green-600" />
                    Recent Deployments
                  </h3>
                  <div className="space-y-4">
                    {deployments.slice(0, 3).map((deployment) => (
                      <div key={deployment.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(deployment.status)}`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{deployment.name}</p>
                            <p className="text-sm text-gray-500">{deployment.environment}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{deployment.version}</p>
                          <p className="text-xs text-gray-500">{deployment.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MCP Agent Performance */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    MCP DevOps Agents
                  </h3>
                  <div className="space-y-4">
                    {deployments.filter(deployment => deployment.mcpAgentId).map((deployment) => (
                      <div key={deployment.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(deployment.status)}`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{deployment.name}</p>
                            <p className="text-sm text-gray-500">{deployment.deploymentType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{(deployment.confidenceScore * 100).toFixed(0)}%</p>
                          <p className="text-xs text-gray-500">{deployment.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'deployments' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">All Deployments</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Deployment
                  </Button>
                </div>
                <div className="space-y-4">
                  {deployments.map((deployment) => (
                    <div key={deployment.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{deployment.name}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            deployment.status === 'completed' ? 'bg-green-100 text-green-800' :
                            deployment.status === 'running' ? 'bg-blue-100 text-blue-800' :
                            deployment.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {deployment.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {deployment.startTime}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-600">Environment:</span>
                          <span className="ml-2 font-medium">{deployment.environment}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Version:</span>
                          <span className="ml-2 font-medium">{deployment.version}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Author:</span>
                          <span className="ml-2 font-medium">{deployment.author}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-2 font-medium capitalize">{deployment.deploymentType}</span>
                        </div>
                      </div>
                      
                      {deployment.status === 'running' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{deployment.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${deployment.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-sm text-gray-600 mb-3">{deployment.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Commit: {deployment.commitHash}</span>
                          <span>Branch: {deployment.branch}</span>
                          {deployment.duration && <span>Duration: {formatDuration(deployment.duration)}</span>}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {deployment.rollbackAvailable && (
                            <Button variant="outline" size="sm">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'environments' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Environment Management</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Environment
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {environments.map((env) => (
                    <div key={env.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{env.name}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(env.status === 'healthy' ? 'info' : env.status === 'warning' ? 'warning' : 'error')}`}>
                          {env.status}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">URL:</span>
                          <span className="font-medium">{env.url}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Version:</span>
                          <span className="font-medium">{env.version}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Uptime:</span>
                          <span className="font-medium">{env.uptime}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Response:</span>
                          <span className="font-medium">{env.responseTime}ms</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Monitor
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Deployment Alerts</h3>
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
                          <span>Type: {alert.type}</span>
                          <span>Time: {alert.timestamp}</span>
                          {alert.deploymentId && <span>Deployment: {alert.deploymentId}</span>}
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

            {activeTab === 'logs' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Deployment Logs</h3>
                  <div className="flex items-center space-x-2">
                    <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                      <option value="all">All Deployments</option>
                      {deployments.map(deployment => (
                        <option key={deployment.id} value={deployment.id}>{deployment.name}</option>
                      ))}
                    </select>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-1">
                    {steps.map((step) => (
                      <div key={step.id}>
                        <div className="text-yellow-400">[{step.startTime}] {step.name} - {step.status}</div>
                        {step.logs.map((log, index) => (
                          <div key={index} className="ml-4 text-gray-300">→ {log}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Button className="h-20 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Play className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Deploy</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <GitBranch className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Branch Management</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <Brain className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">AI Deployment</span>
            </div>
          </Button>
          
          <Button className="h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg">
            <div className="text-center">
              <RotateCcw className="h-8 w-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Rollback</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeploymentManagement;
