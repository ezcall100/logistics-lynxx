import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Pause, 
  SkipForward,
  BarChart3,
  Target,
  Award,
  Calendar,
  UserPlus,
  Brain,
  Zap,
  Activity,
  Download,
  RefreshCw,
  Settings,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'paused' | 'failed';
  progress: number;
  currentStep: string;
  totalSteps: number;
  startedAt: string;
  completedAt?: string;
  estimatedCompletion: string;
  timeSpent: number;
  satisfaction?: number;
  mcpAgentId?: string;
  agentStatus?: 'online' | 'offline' | 'busy';
  confidenceScore?: number;
  aiAssisted: boolean;
}

interface OnboardingMetrics {
  totalUsers: number;
  activeUsers: number;
  completedUsers: number;
  avgCompletionTime: number;
  avgSatisfaction: number;
  completionRate: number;
  usersByStatus: {
    status: string;
    count: number;
    percentage: number;
  }[];
  progressByStep: {
    step: string;
    usersCompleted: number;
    avgTimeSpent: number;
    successRate: number;
  }[];
  mcpAgentMetrics: {
    agentId: string;
    name: string;
    status: 'online' | 'offline' | 'busy';
    confidenceScore: number;
    usersAssisted: number;
    avgCompletionTime: number;
    automationRate: number;
  }[];
}

const UserOnboarding: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<OnboardingUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<OnboardingUser[]>([]);
  const [metrics, setMetrics] = useState<OnboardingMetrics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [timeRange, setTimeRange] = useState('7d');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockUsers: OnboardingUser[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      company: 'Tech Corp',
      role: 'Admin',
      status: 'completed',
      progress: 100,
      currentStep: 'Completed',
      totalSteps: 8,
      startedAt: '2024-01-10 09:00:00',
      completedAt: '2024-01-12 14:30:00',
      estimatedCompletion: '2024-01-12 14:30:00',
      timeSpent: 1250,
      satisfaction: 5,
      mcpAgentId: 'agent-onboarding-001',
      agentStatus: 'online',
      confidenceScore: 0.95,
      aiAssisted: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      company: 'Tech Corp',
      role: 'User',
      status: 'in_progress',
      progress: 75,
      currentStep: 'Feature Training',
      totalSteps: 8,
      startedAt: '2024-01-13 10:15:00',
      estimatedCompletion: '2024-01-16 16:00:00',
      timeSpent: 420,
      mcpAgentId: 'agent-onboarding-002',
      agentStatus: 'online',
      confidenceScore: 0.88,
      aiAssisted: true
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      company: 'Tech Corp',
      role: 'Manager',
      status: 'paused',
      progress: 50,
      currentStep: 'Security Setup',
      totalSteps: 8,
      startedAt: '2024-01-11 14:20:00',
      estimatedCompletion: '2024-01-18 12:00:00',
      timeSpent: 180,
      mcpAgentId: 'agent-onboarding-003',
      agentStatus: 'busy',
      confidenceScore: 0.76,
      aiAssisted: false
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      company: 'Tech Corp',
      role: 'User',
      status: 'not_started',
      progress: 0,
      currentStep: 'Account Setup',
      totalSteps: 8,
      startedAt: '2024-01-15 08:30:00',
      estimatedCompletion: '2024-01-17 17:00:00',
      timeSpent: 0,
      mcpAgentId: 'agent-onboarding-004',
      agentStatus: 'online',
      confidenceScore: 0.92,
      aiAssisted: true
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@company.com',
      company: 'Tech Corp',
      role: 'Admin',
      status: 'failed',
      progress: 25,
      currentStep: 'Account Setup',
      totalSteps: 8,
      startedAt: '2024-01-09 11:45:00',
      estimatedCompletion: '2024-01-11 15:30:00',
      timeSpent: 90,
      mcpAgentId: 'agent-onboarding-005',
      agentStatus: 'online',
      confidenceScore: 0.68,
      aiAssisted: false
    }
  ];

  const mockMetrics: OnboardingMetrics = {
    totalUsers: 156,
    activeUsers: 23,
    completedUsers: 128,
    avgCompletionTime: 480,
    avgSatisfaction: 4.3,
    completionRate: 82.1,
    usersByStatus: [
      { status: 'Completed', count: 128, percentage: 82.1 },
      { status: 'In Progress', count: 23, percentage: 14.7 },
      { status: 'Not Started', count: 3, percentage: 1.9 },
      { status: 'Paused', count: 1, percentage: 0.6 },
      { status: 'Failed', count: 1, percentage: 0.6 }
    ],
    progressByStep: [
      { step: 'Account Setup', usersCompleted: 152, avgTimeSpent: 15, successRate: 97.4 },
      { step: 'Profile Configuration', usersCompleted: 148, avgTimeSpent: 25, successRate: 94.9 },
      { step: 'Security Setup', usersCompleted: 145, avgTimeSpent: 35, successRate: 92.9 },
      { step: 'Feature Training', usersCompleted: 140, avgTimeSpent: 120, successRate: 89.7 },
      { step: 'Integration Setup', usersCompleted: 135, avgTimeSpent: 180, successRate: 86.5 },
      { step: 'Team Collaboration', usersCompleted: 132, avgTimeSpent: 90, successRate: 84.6 },
      { step: 'Advanced Features', usersCompleted: 130, avgTimeSpent: 240, successRate: 83.3 },
      { step: 'Final Review', usersCompleted: 128, avgTimeSpent: 30, successRate: 82.1 }
    ],
    mcpAgentMetrics: [
      {
        agentId: 'agent-onboarding-001',
        name: 'Onboarding Agent Alpha',
        status: 'online',
        confidenceScore: 0.95,
        usersAssisted: 45,
        avgCompletionTime: 420,
        automationRate: 85
      },
      {
        agentId: 'agent-onboarding-002',
        name: 'Onboarding Agent Beta',
        status: 'online',
        confidenceScore: 0.88,
        usersAssisted: 38,
        avgCompletionTime: 480,
        automationRate: 72
      },
      {
        agentId: 'agent-onboarding-003',
        name: 'Onboarding Agent Gamma',
        status: 'busy',
        confidenceScore: 0.92,
        usersAssisted: 52,
        avgCompletionTime: 390,
        automationRate: 78
      }
    ]
  };

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setMetrics(mockMetrics);
      setMcpStatus('connected');
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter users based on search and filters
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in_progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'not_started': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Play className="h-4 w-4" />;
      case 'not_started': return <Clock className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      case 'busy': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            User Onboarding
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          New user setup, training progress, onboarding analytics
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              User Onboarding
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${mcpStatus === 'connected' ? 'bg-green-500' : mcpStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              MCP {mcpStatus === 'connected' ? 'Connected' : mcpStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
            </span>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          New user setup, training progress, onboarding analytics with AI assistance
        </p>
      </div>

      {/* Key Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{metrics.activeUsers}</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{metrics.completionRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
        <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Satisfaction</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{metrics.avgSatisfaction}/5</p>
              </div>
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      )}

      {/* MCP Agent Performance */}
      {metrics && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            MCP Agent Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metrics.mcpAgentMetrics.map((agent) => (
              <div key={agent.agentId} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{agent.name}</h4>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(agent.status)}`}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{agent.status}</span>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Confidence:</span>
                    <span className="font-medium">{(agent.confidenceScore * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Users Assisted:</span>
                    <span className="font-medium">{agent.usersAssisted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Avg Time:</span>
                    <span className="font-medium">{formatTime(agent.avgCompletionTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Automation:</span>
                    <span className="font-medium">{agent.automationRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress by Step */}
      {metrics && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Progress by Step
              </h3>
          <div className="space-y-4">
            {metrics.progressByStep.map((step, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{step.step}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{step.successRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${step.successRate}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {step.usersCompleted} users completed
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Avg: {formatTime(step.avgTimeSpent)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
              <option value="failed">Failed</option>
            </select>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="1d">Last 24h</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Onboarding Users ({filteredUsers.length})
            </h3>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Current Step
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Time Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  MCP Agent
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-shrink-0">
                          {user.aiAssisted && (
                            <Zap className="h-4 w-4 text-yellow-500" title="AI Assisted" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {user.company} • {user.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="ml-1">{user.status.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-1 mr-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${user.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {user.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {user.currentStep}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {formatTime(user.timeSpent)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.mcpAgentId && (
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getAgentStatusColor(user.agentStatus || 'offline')}`}></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {(user.confidenceScore || 0) * 100}%
                        </span>
              </div>
            )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Pause className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <SkipForward className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;
