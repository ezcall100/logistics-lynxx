import React, { useState, useEffect } from 'react';
import { EnhancedButton } from '@/components/ui/EnhancedUIComponents';
import { DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, Target, RefreshCw, Download, Eye, Settings, HelpCircle, Pi, Users, User, ShoppingCart, Receipt } from 'lucide-react';
import {
  EnhancedCard,
  EnhancedButton,
  EnhancedBadge,
  EnhancedTable,
  EnhancedSearch,
  EnhancedProgress,
  stableStyles
} from '../../../components/ui/EnhancedUIComponents';

interface RevenueMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  currency: string;
  period: string;
  category: string;
}

interface RevenueTransaction {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  paymentMethod: string;
  transactionType: string;
  reference: string;
  description: string;
}

interface RevenueSource {
  source: string;
  amount: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface RevenueForecast {
  period: string;
  projected: number;
  actual: number;
  variance: number;
  confidence: number;
}

const RevenueMetrics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const [revenueMetrics, setRevenueMetrics] = useState<RevenueMetric[]>([]);
  const [transactions, setTransactions] = useState<RevenueTransaction[]>([]);
  const [revenueSources, setRevenueSources] = useState<RevenueSource[]>([]);
  const [revenueForecast, setRevenueForecast] = useState<RevenueForecast[]>([]);

  console.log('💰 RevenueMetrics component is rendering!');

  // Mock data
  const mockRevenueMetrics: RevenueMetric[] = [
    {
      id: '1',
      name: 'Total Revenue',
      value: 1250000,
      previousValue: 1180000,
      change: 70000,
      changePercent: 5.93,
      trend: 'up',
      currency: 'USD',
      period: '30d',
      category: 'overall'
    },
    {
      id: '2',
      name: 'Monthly Recurring Revenue',
      value: 850000,
      previousValue: 820000,
      change: 30000,
      changePercent: 3.66,
      trend: 'up',
      currency: 'USD',
      period: '30d',
      category: 'recurring'
    },
    {
      id: '3',
      name: 'Average Order Value',
      value: 1250,
      previousValue: 1180,
      change: 70,
      changePercent: 5.93,
      trend: 'up',
      currency: 'USD',
      period: '30d',
      category: 'aov'
    },
    {
      id: '4',
      name: 'Customer Lifetime Value',
      value: 8500,
      previousValue: 8200,
      change: 300,
      changePercent: 3.66,
      trend: 'up',
      currency: 'USD',
      period: '30d',
      category: 'clv'
    },
    {
      id: '5',
      name: 'Conversion Rate',
      value: 3.2,
      previousValue: 2.9,
      change: 0.3,
      changePercent: 10.34,
      trend: 'up',
      currency: '%',
      period: '30d',
      category: 'conversion'
    },
    {
      id: '6',
      name: 'Churn Rate',
      value: 2.1,
      previousValue: 2.5,
      change: -0.4,
      changePercent: -16.0,
      trend: 'down',
      currency: '%',
      period: '30d',
      category: 'churn'
    }
  ];

  const mockTransactions: RevenueTransaction[] = [
    {
      id: 'TXN001',
      customer: 'Acme Corporation',
      amount: 25000,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-15 14:30:00',
      paymentMethod: 'Credit Card',
      transactionType: 'subscription',
      reference: 'REF-2024-001',
      description: 'Enterprise Plan - Annual'
    },
    {
      id: 'TXN002',
      customer: 'TechStart Inc',
      amount: 15000,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-15 13:45:00',
      paymentMethod: 'Bank Transfer',
      transactionType: 'one-time',
      reference: 'REF-2024-002',
      description: 'Custom Development Services'
    },
    {
      id: 'TXN003',
      customer: 'Global Solutions',
      amount: 35000,
      currency: 'USD',
      status: 'pending',
      date: '2024-01-15 12:20:00',
      paymentMethod: 'Wire Transfer',
      transactionType: 'subscription',
      reference: 'REF-2024-003',
      description: 'Premium Plan - Quarterly'
    },
    {
      id: 'TXN004',
      customer: 'Innovation Labs',
      amount: 8000,
      currency: 'USD',
      status: 'completed',
      date: '2024-01-15 11:15:00',
      paymentMethod: 'PayPal',
      transactionType: 'one-time',
      reference: 'REF-2024-004',
      description: 'Consulting Services'
    },
    {
      id: 'TXN005',
      customer: 'Digital Dynamics',
      amount: 18000,
      currency: 'USD',
      status: 'failed',
      date: '2024-01-15 10:30:00',
      paymentMethod: 'Credit Card',
      transactionType: 'subscription',
      reference: 'REF-2024-005',
      description: 'Professional Plan - Monthly'
    }
  ];

  const mockRevenueSources: RevenueSource[] = [
    {
      source: 'Subscription Revenue',
      amount: 850000,
      percentage: 68,
      trend: 'up',
      color: '#3B82F6'
    },
    {
      source: 'One-time Sales',
      amount: 250000,
      percentage: 20,
      trend: 'stable',
      color: '#10B981'
    },
    {
      source: 'Professional Services',
      amount: 100000,
      percentage: 8,
      trend: 'up',
      color: '#F59E0B'
    },
    {
      source: 'Consulting',
      amount: 50000,
      percentage: 4,
      trend: 'down',
      color: '#EF4444'
    }
  ];

  const mockRevenueForecast: RevenueForecast[] = [
    {
      period: 'Q1 2024',
      projected: 1400000,
      actual: 1250000,
      variance: -150000,
      confidence: 85
    },
    {
      period: 'Q2 2024',
      projected: 1600000,
      actual: 0,
      variance: 0,
      confidence: 75
    },
    {
      period: 'Q3 2024',
      projected: 1800000,
      actual: 0,
      variance: 0,
      confidence: 70
    },
    {
      period: 'Q4 2024',
      projected: 2000000,
      actual: 0,
      variance: 0,
      confidence: 65
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRevenueMetrics(mockRevenueMetrics);
      setTransactions(mockTransactions);
      setRevenueSources(mockRevenueSources);
      setRevenueForecast(mockRevenueForecast);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <EnhancedBadge variant="success" mode={mode}>Completed</EnhancedBadge>;
      case 'pending':
        return <EnhancedBadge variant="warning" mode={mode}>Pending</EnhancedBadge>;
      case 'failed':
        return <EnhancedBadge variant="danger" mode={mode}>Failed</EnhancedBadge>;
      case 'refunded':
        return <EnhancedBadge variant="default" mode={mode}>Refunded</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up' || change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (trend === 'down' || change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    } else {
      return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeColor = (change: number) => {
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  };

  const transactionColumns = [
    {
      key: 'customer',
      title: 'Customer',
      sortable: true,
      render: (value: string, row: RevenueTransaction) => (
        <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
          {row.customer}
        </div>
      )
    },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      render: (value: number, row: RevenueTransaction) => (
        <div className={`font-semibold ${stableStyles.textPrimary[mode]}`}>
          {formatCurrency(row.amount, row.currency)}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'paymentMethod',
      title: 'Payment Method',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {value}
        </div>
      )
    },
    {
      key: 'transactionType',
      title: '',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {value}
        </div>
      )
    },
    {
      key: 'date',
      title: 'Date',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleDateString()}
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (value: any, row: RevenueTransaction) => (
        <div className="flex items-center space-x-2">
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Eye className="w-4 h-4" />}
            mode={mode}
          >
            View
          </EnhancedButton>
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Receipt className="w-4 h-4" />}
            mode={mode}
          >
            Receipt
          </EnhancedButton>
        </div>
      )
    }
  ];

  const totalRevenue = revenueMetrics.find(m => m.name === 'Total Revenue')?.value || 0;
  const mrr = revenueMetrics.find(m => m.name === 'Monthly Recurring Revenue')?.value || 0;
  const aov = revenueMetrics.find(m => m.name === 'Average Order Value')?.value || 0;
  const clv = revenueMetrics.find(m => m.name === 'Customer Lifetime Value')?.value || 0;

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              Revenue Metrics
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Comprehensive financial analytics and revenue performance tracking
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
            >
              Export Report
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
              mode={mode}
            >
              Refresh Data
            </EnhancedButton>
          </div>
        </div>

        {/* Revenue Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Total Revenue
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {formatCurrency(totalRevenue)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {getTrendIcon('up', 70000)}
                  <span className={`text-sm font-medium ${getChangeColor(70000)}`}>
                    +$70,000 (5.93%)
                  </span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(totalRevenue / 2000000) * 100}
                max={100}
                mode={mode}
                variant="success"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Monthly Recurring Revenue
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {formatCurrency(mrr)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {getTrendIcon('up', 30000)}
                  <span className={`text-sm font-medium ${getChangeColor(30000)}`}>
                    +$30,000 (3.66%)
                  </span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(mrr / totalRevenue) * 100}
                max={100}
                mode={mode}
                variant="default"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Average Order Value
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {formatCurrency(aov)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {getTrendIcon('up', 70)}
                  <span className={`text-sm font-medium ${getChangeColor(70)}`}>
                    +$70 (5.93%)
                  </span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(aov / 2000) * 100}
                max={100}
                mode={mode}
                variant="warning"
              />
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  Customer Lifetime Value
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {formatCurrency(clv)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  {getTrendIcon('up', 300)}
                  <span className={`text-sm font-medium ${getChangeColor(300)}`}>
                    +$300 (3.66%)
                  </span>
                </div>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(clv / 10000) * 100}
                max={100}
                mode={mode}
                variant="danger"
              />
            </div>
          </EnhancedCard>
        </div>

        {/* Revenue Sources and Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Sources */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
                Revenue Sources
              </h3>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<PieChart className="w-4 h-4" />}
                mode={mode}
              >
                View Chart
              </EnhancedButton>
            </div>
            <div className="space-y-4">
              {revenueSources.map((source) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                    <div>
                      <p className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                        {source.source}
                      </p>
                      <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                        {formatCurrency(source.amount)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
                      {source.percentage}%
                    </span>
                    {getTrendIcon(source.trend, 0)}
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>

          {/* Revenue Forecast */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
                Revenue Forecast
              </h3>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<LineChart className="w-4 h-4" />}
                mode={mode}
              >
                View Details
              </EnhancedButton>
            </div>
            <div className="space-y-4">
              {revenueForecast.map((forecast) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                      {forecast.period}
                    </p>
                    <p className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      Projected: {formatCurrency(forecast.projected)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
                      {forecast.actual > 0 ? formatCurrency(forecast.actual) : 'TBD'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${getChangeColor(forecast.variance)}`}>
                        {forecast.variance !== 0 ? formatCurrency(forecast.variance) : ''}
                      </span>
                      <span className={`text-xs ${stableStyles.textSecondary[mode]}`}>
                        {forecast.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>
        </div>

        {/* Recent Transactions */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]}`}>
              Recent Transactions
            </h3>
            <div className="flex space-x-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
              <EnhancedSearch
                placeholder="transactions..."
                value={searchQuery}
                onChange={setSearchQuery}
                mode={mode}
              />
            </div>
          </div>

          <EnhancedTable
            columns={transactionColumns}
            data={transactions}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No transactions found"
          />
        </EnhancedCard>

        {/* Performance Indicators */}
        <EnhancedCard mode={mode} elevated>
          <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-6`}>
            Performance Indicators
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {revenueMetrics.slice(4).map((metric) => (
              <div key={metric.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                    {metric.name}
                  </p>
                  {getTrendIcon(metric.trend, metric.change)}
                </div>
                <p className={`text-xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metric.currency === '%' ? `${metric.value}%` : formatCurrency(metric.value, metric.currency)}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`text-sm ${getChangeColor(metric.change)}`}>
                    {formatPercentage(metric.changePercent)}
                  </span>
                  <span className={`text-xs ${stableStyles.textMuted[mode]}`}>
                    vs previous period
                  </span>
                </div>
              </div>
            ))}
          </div>
        </EnhancedCard>

        {/* Quick Actions */}
        <EnhancedCard mode={mode} elevated>
          <h3 className={`text-lg font-semibold ${stableStyles.textPrimary[mode]} mb-6`}>
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<BarChart3 className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Generate Report</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Export Data</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Target className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Set Targets</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<TrendingUp className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Forecast</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Settings className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Settings</span>
            </EnhancedButton>

            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<HelpCircle className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Help</span>
            </EnhancedButton>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
};

export default RevenueMetrics;
