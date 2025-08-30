import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  RefreshCw,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Receipt,
  Shield,
  Brain,
  Cpu,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

interface BillingData {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  outstandingInvoices: number;
  overdueAmount: number;
  subscriptionMetrics: {
    plan: string;
    subscribers: number;
    revenue: number;
    growth: number;
  }[];
  recentTransactions: {
    id: string;
    customer: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed' | 'overdue';
    date: string;
    plan: string;
    paymentMethod: string;
  }[];
  mcpAgentMetrics: {
    agentId: string;
    name: string;
    status: 'online' | 'offline' | 'busy';
    confidenceScore: number;
    billingTasksCompleted: number;
    fraudDetectionScore: number;
  }[];
  billingAlerts: {
    type: 'overdue' | 'payment_failed' | 'subscription_expiring' | 'fraud_detected';
    message: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    count: number;
  }[];
}

const BillingManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedFilter] = useState('all');
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockBillingData: BillingData = {
    totalRevenue: 1247500,
    monthlyRecurringRevenue: 89200,
    annualRecurringRevenue: 1070400,
    outstandingInvoices: 15600,
    overdueAmount: 8900,
    subscriptionMetrics: [
      { plan: 'Free', subscribers: 456, revenue: 0, growth: 12.5 },
      { plan: 'Basic', subscribers: 234, revenue: 23400, growth: 8.2 },
      { plan: 'Premium', subscribers: 345, revenue: 51750, growth: 15.3 },
      { plan: 'Enterprise', subscribers: 212, revenue: 141600, growth: 22.1 }
    ],
    recentTransactions: [
      {
        id: 'TXN-001',
        customer: 'Tech Corp',
        amount: 2500,
        status: 'paid',
        date: '2024-01-15',
        plan: 'Enterprise',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'TXN-002',
        customer: 'Logistics Inc',
        amount: 1200,
        status: 'pending',
        date: '2024-01-14',
        plan: 'Premium',
        paymentMethod: 'Bank Transfer'
      },
      {
        id: 'TXN-003',
        customer: 'Transport Co',
        amount: 800,
        status: 'overdue',
        date: '2024-01-10',
        plan: 'Basic',
        paymentMethod: 'Credit Card'
      },
      {
        id: 'TXN-004',
        customer: 'Shipping Ltd',
        amount: 3500,
        status: 'paid',
        date: '2024-01-13',
        plan: 'Enterprise',
        paymentMethod: 'Wire Transfer'
      },
      {
        id: 'TXN-005',
        customer: 'Freight Solutions',
        amount: 600,
        status: 'failed',
        date: '2024-01-12',
        plan: 'Basic',
        paymentMethod: 'Credit Card'
      }
    ],
    mcpAgentMetrics: [
      {
        agentId: 'agent-billing-001',
        name: 'Billing Agent',
        status: 'online',
        confidenceScore: 0.96,
        billingTasksCompleted: 1247,
        fraudDetectionScore: 0.98
      },
      {
        agentId: 'agent-fraud-002',
        name: 'Fraud Detection Agent',
        status: 'online',
        confidenceScore: 0.94,
        billingTasksCompleted: 892,
        fraudDetectionScore: 0.99
      },
      {
        agentId: 'agent-collections-003',
        name: 'Collections Agent',
        status: 'busy',
        confidenceScore: 0.89,
        billingTasksCompleted: 567,
        fraudDetectionScore: 0.92
      }
    ],
    billingAlerts: [
      {
        type: 'overdue',
        message: 'Overdue payments detected',
        severity: 'high',
        count: 23
      },
      {
        type: 'payment_failed',
        message: 'Failed payment attempts',
        severity: 'medium',
        count: 8
      },
      {
        type: 'subscription_expiring',
        message: 'Subscriptions expiring soon',
        severity: 'low',
        count: 45
      },
      {
        type: 'fraud_detected',
        message: 'Potential fraud detected',
        severity: 'critical',
        count: 2
      }
    ]
  };

  useEffect(() => {
    const loadBillingData = async () => {
      setIsLoading(true);
      setMcpStatus('connecting');
      
      // Simulate API call with MCP agent integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBillingData(mockBillingData);
      setMcpStatus('connected');
      setIsLoading(false);
    };

    loadBillingData();
  }, [timeRange]);

  const getStatusColor = (status: 'paid' | 'pending' | 'failed' | 'overdue') => {
    switch (status) {
      case 'paid':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'failed':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      case 'overdue':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
    }
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'low':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'medium':
        return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20';
      case 'high':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      case 'critical':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
    }
  };

  const getAgentStatusColor = (status: 'online' | 'offline' | 'busy') => {
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
            <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Billing Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Subscription status, payment history, billing analytics
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
            <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Billing Management
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
          Subscription status, payment history, billing analytics with MCP agent monitoring
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Range:</span>
        </div>
        <div className="flex space-x-1">
          {['7d', '30d', '90d', '1y'].map((range) => (
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${billingData?.totalRevenue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            +18.5%
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">MRR</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${billingData?.monthlyRecurringRevenue.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            +12.3%
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Outstanding</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${billingData?.outstandingInvoices.toLocaleString()}
              </p>
            </div>
            <Receipt className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {billingData?.overdueAmount} overdue
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">ARR</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${billingData?.annualRecurringRevenue.toLocaleString()}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            +15.7%
          </div>
        </ResponsiveCard>
      </div>

      {/* Billing Alerts */}
      <ResponsiveCard>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Billing Alerts
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Active alerts requiring attention
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {billingData?.billingAlerts.map((alert, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                  {alert.severity.toUpperCase()}
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {alert.count}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      </ResponsiveCard>

      {/* Subscription Metrics */}
      <ResponsiveCard>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Subscription Metrics
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Revenue breakdown by subscription plan
          </p>
        </div>
        <div className="space-y-4">
          {billingData?.subscriptionMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {metric.plan}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {metric.subscribers} subscribers
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${metric.revenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Revenue
                  </p>
                </div>
                <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +{metric.growth}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResponsiveCard>

      {/* Recent Transactions and MCP Agents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponsiveCard>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Recent Transactions
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Latest payment activities
            </p>
          </div>
          <div className="space-y-3">
            {billingData?.recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {transaction.customer}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    ${transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transaction.plan}
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
              MCP Billing Agents
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Real-time agent performance and fraud detection
            </p>
          </div>
          <div className="space-y-4">
            {billingData?.mcpAgentMetrics.map((agent, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {agent.name}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAgentStatusColor(agent.status)}`}>
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
                      {agent.billingTasksCompleted.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Fraud Score</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {(agent.fraudDetectionScore * 100).toFixed(1)}%
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
          Set Billing Goals
        </Button>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
        <Button variant="outline">
          <Shield className="h-4 w-4 mr-2" />
          Fraud Detection
        </Button>
        <Button variant="outline">
          <Zap className="h-4 w-4 mr-2" />
          AI Insights
        </Button>
      </div>
    </div>
  );
};

export default BillingManagement;
