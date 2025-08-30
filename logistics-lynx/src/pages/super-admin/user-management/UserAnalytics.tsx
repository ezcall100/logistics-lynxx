import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Clock, 
  Eye, 
  MousePointer,
  Calendar,
  Download,
  RefreshCw,
  Filter,
  Search,
  Target,
  Zap,
  Brain,
  Cpu
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  churnRate: number;
  avgSessionDuration: number;
  pageViews: number;
  featureAdoption: {
    feature: string;
    adoptionRate: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  userBehavior: {
    action: string;
    count: number;
    percentage: number;
  }[];
  mcpAgentMetrics: {
    agentId: string;
    name: string;
    status: 'online' | 'offline' | 'busy';
    confidenceScore: number;
    tasksCompleted: number;
    responseTime: number;
  }[];
}

const UserAnalytics: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric] = useState('overview');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockAnalyticsData: AnalyticsData = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 156,
    churnRate: 2.3,
    avgSessionDuration: 24.5,
    pageViews: 15420,
    featureAdoption: [
      { feature: 'Load Management', adoptionRate: 87, trend: 'up' },
      { feature: 'Route Optimization', adoptionRate: 73, trend: 'up' },
      { feature: 'Real-time Tracking', adoptionRate: 91, trend: 'up' },
      { feature: 'Analytics Dashboard', adoptionRate: 65, trend: 'stable' },
      { feature: 'Mobile App', adoptionRate: 78, trend: 'up' },
      { feature: 'API Integration', adoptionRate: 45, trend: 'down' }
    ],
    userBehavior: [
      { action: 'Login', count: 892, percentage: 100 },
      { action: 'View Dashboard', count: 856, percentage: 96 },
      { action: 'Create Load', count: 623, percentage: 70 },
      { action: 'Track Shipment', count: 789, percentage: 88 },
      { action: 'Generate Report', count: 445, percentage: 50 },
      { action: 'API Call', count: 234, percentage: 26 }
    ],
    mcpAgentMetrics: [
      {
        agentId: 'agent-analytics-001',
        name: 'Analytics Agent',
        status: 'online',
        confidenceScore: 0.94,
        tasksCompleted: 1247,
        responseTime: 0.8
      },
      {
        agentId: 'agent-prediction-002',
        name: 'Prediction Agent',
        status: 'online',
        confidenceScore: 0.89,
        tasksCompleted: 892,
        responseTime: 1.2
      },
      {
        agentId: 'agent-insights-003',
        name: 'Insights Agent',
        status: 'busy',
        confidenceScore: 0.91,
        tasksCompleted: 567,
        responseTime: 0.9
      }
    ]
  };

  useEffect(() => {
    const loadAnalyticsData = async () => {
      setIsLoading(true);
      setMcpStatus('connecting');
      
      // Simulate API call with MCP agent integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAnalyticsData(mockAnalyticsData);
      setMcpStatus('connected');
      setIsLoading(false);
    };

    loadAnalyticsData();
  }, [timeRange]);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: 'online' | 'offline' | 'busy') => {
    switch (status) {
      case 'online':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'busy':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      default:
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              User Analytics
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Usage patterns, feature adoption, behavior tracking
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <ResponsiveCard key={i}>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </ResponsiveCard>
          ))}
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
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              User Analytics
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              mcpStatus === 'connected' 
                ? 'text-green-500 bg-green-100 dark:bg-green-900/20' 
                : mcpStatus === 'connecting'
                ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20'
                : 'text-red-500 bg-red-100 dark:bg-red-900/20'
            }`}>
              <Brain className="h-3 w-3" />
              <span>MCP {mcpStatus}</span>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Usage patterns, feature adoption, behavior tracking with MCP agent insights
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range:</span>
        </div>
        <div className="flex space-x-1">
          {['1d', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResponsiveCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData?.totalUsers.toLocaleString()}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            +12.5%
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData?.activeUsers.toLocaleString()}
              </p>
            </div>
            <Activity className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            +8.2%
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Session</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData?.avgSessionDuration}m
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            +5.1%
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Page Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData?.pageViews.toLocaleString()}
              </p>
            </div>
            <Eye className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            +15.3%
          </div>
        </ResponsiveCard>
      </div>

      {/* Feature Adoption */}
      <ResponsiveCard>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Feature Adoption
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Track how users are adopting different platform features
          </p>
        </div>
        <div className="space-y-4">
          {analyticsData?.featureAdoption.map((feature, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {getTrendIcon(feature.trend)}
                  <span className="font-medium text-gray-900 dark:text-white">
                    {feature.feature}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {feature.adoptionRate}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Adoption Rate
                  </p>
                </div>
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${feature.adoptionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveCard>

      {/* User Behavior */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponsiveCard>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              User Behavior
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Most common user actions and interactions
            </p>
          </div>
          <div className="space-y-3">
            {analyticsData?.userBehavior.map((behavior, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MousePointer className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {behavior.action}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {behavior.count.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {behavior.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ResponsiveCard>

        {/* MCP Agent Metrics */}
        <ResponsiveCard>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              MCP Agent Performance
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time agent metrics and confidence scores
            </p>
          </div>
          <div className="space-y-4">
            {analyticsData?.mcpAgentMetrics.map((agent, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {agent.name}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Confidence</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {(agent.confidenceScore * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Tasks</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {agent.tasksCompleted.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Response</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {agent.responseTime}s
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ResponsiveCard>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button>
          <Target className="h-4 w-4 mr-2" />
          Set Analytics Goals
        </Button>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Custom Reports
        </Button>
        <Button variant="outline">
          <Zap className="h-4 w-4 mr-2" />
          AI Insights
        </Button>
      </div>
    </div>
  );
};

export default UserAnalytics;
