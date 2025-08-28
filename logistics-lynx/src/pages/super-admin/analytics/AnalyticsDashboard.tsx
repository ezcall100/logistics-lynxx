import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Activity, Target, Users, RefreshCw, Download, Settings, Eye, Plus, Bell, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  EnhancedCard, 
  EnhancedBadge, 
  EnhancedTable, 
  EnhancedSearch, 
  EnhancedProgress, 
  stableStyles 
} from '../../../components/ui/EnhancedUIComponents';

interface KPIMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  target: number;
  unit: string;
  category: 'revenue' | 'operations' | 'customer' | 'performance';
  trend: number[];
  lastUpdated: string;
}

interface ChartData {
  id: string;
  name: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  data: any[];
  config: any;
  lastUpdated: string;
}

interface Report {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  status: 'generated' | 'processing' | 'failed';
  generatedAt: string;
  size: string;
  format: 'pdf' | 'csv' | 'excel';
  description: string;
}

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  acknowledged: boolean;
}

const AnalyticsDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [kpiMetrics, setKPIMetrics] = useState<KPIMetric[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Mock KPI data
  const mockKPIMetrics: KPIMetric[] = [
    {
      id: '1',
      name: 'Total Revenue',
      value: 2847500,
      change: 12.5,
      changeType: 'increase',
      target: 3000000,
      unit: 'USD',
      category: 'revenue',
      trend: [2500000, 2600000, 2700000, 2750000, 2800000, 2847500],
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: '2',
      name: 'Active Users',
      value: 1247,
      change: 8.3,
      changeType: 'increase',
      target: 1500,
      unit: 'users',
      category: 'customer',
      trend: [1150, 1180, 1200, 1220, 1235, 1247],
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: '3',
      name: 'Load Completion Rate',
      value: 94.2,
      change: -2.1,
      changeType: 'decrease',
      target: 95,
      unit: '%',
      category: 'operations',
      trend: [96.3, 95.8, 95.2, 94.8, 94.5, 94.2],
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: '4',
      name: 'Average Response Time',
      value: 245,
      change: -15.2,
      changeType: 'increase',
      target: 200,
      unit: 'ms',
      category: 'performance',
      trend: [260, 255, 250, 248, 247, 245],
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: '5',
      name: 'Customer Satisfaction',
      value: 4.7,
      change: 0.3,
      changeType: 'increase',
      target: 4.8,
      unit: '/5',
      category: 'customer',
      trend: [4.4, 4.5, 4.6, 4.6, 4.7, 4.7],
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: '6',
      name: 'System Uptime',
      value: 99.8,
      change: 0.1,
      changeType: 'increase',
      target: 99.9,
      unit: '%',
      category: 'performance',
      trend: [99.7, 99.7, 99.8, 99.8, 99.8, 99.8],
      lastUpdated: '2024-01-15 14:30:00'
    }
  ];

  const mockChartData: ChartData[] = [
    {
      id: '1',
      name: 'Revenue Trend',
      type: 'line',
      data: [
        { month: 'Jan', revenue: 2500000 },
        { month: 'Feb', revenue: 2600000 },
        { month: 'Mar', revenue: 2700000 },
        { month: 'Apr', revenue: 2750000 },
        { month: 'May', revenue: 2800000 },
        { month: 'Jun', revenue: 2847500 }
      ],
      config: { color: 'blue' },
      lastUpdated: '2024-01-15 14:30:00'
    },
    {
      id: '2',
      name: 'User Growth',
      type: 'bar',
      data: [
        { month: 'Jan', users: 1150 },
        { month: 'Feb', users: 1180 },
        { month: 'Mar', users: 1200 },
        { month: 'Apr', users: 1220 },
        { month: 'May', users: 1235 },
        { month: 'Jun', users: 1247 }
      ],
      config: { color: 'green' },
      lastUpdated: '2024-01-15 14:30:00'
    }
  ];

  const mockReports: Report[] = [
    {
      id: '1',
      name: 'Monthly Revenue Report',
      type: 'monthly',
      status: 'generated',
      generatedAt: '2024-01-15 06:00:00',
      size: '2.4 MB',
      format: 'pdf',
      description: 'Comprehensive monthly revenue analysis and trends'
    },
    {
      id: '2',
      name: 'Weekly Performance Report',
      type: 'weekly',
      status: 'generated',
      generatedAt: '2024-01-14 18:00:00',
      size: '1.8 MB',
      format: 'excel',
      description: 'Weekly system performance and user activity metrics'
    },
    {
      id: '3',
      name: 'Daily Operations Report',
      type: 'daily',
      status: 'processing',
      generatedAt: '2024-01-15 14:00:00',
      size: '0.9 MB',
      format: 'csv',
      description: 'Daily operations and load completion statistics'
    }
  ];

  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'warning',
      title: 'Load Completion Rate Decline',
      message: 'Load completion rate has decreased by 2.1% this week',
      timestamp: '2024-01-15 14:30:00',
      severity: 'medium',
      acknowledged: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Monthly Report Generated',
      message: 'Monthly revenue report has been successfully generated',
      timestamp: '2024-01-15 06:00:00',
      severity: 'low',
      acknowledged: true
    },
    {
      id: '3',
      type: 'success',
      title: 'System Performance Improved',
      message: 'Average response time improved by 15.2ms',
      timestamp: '2024-01-15 12:00:00',
      severity: 'low',
      acknowledged: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setKPIMetrics(mockKPIMetrics);
      setChartData(mockChartData);
      setReports(mockReports);
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  }, []);

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <EnhancedBadge variant="danger" mode={mode}>Critical</EnhancedBadge>;
      case 'high':
        return <EnhancedBadge variant="danger" mode={mode}>High</EnhancedBadge>;
      case 'medium':
        return <EnhancedBadge variant="warning" mode={mode}>Medium</EnhancedBadge>;
      case 'low':
        return <EnhancedBadge variant="default" mode={mode}>Low</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'generated':
        return <EnhancedBadge variant="success" mode={mode}>Generated</EnhancedBadge>;
      case 'processing':
        return <EnhancedBadge variant="warning" mode={mode}>Processing</EnhancedBadge>;
      case 'failed':
        return <EnhancedBadge variant="danger" mode={mode}>Failed</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(value);
    }
    return `${value.toLocaleString()} ${unit}`;
  };

  const kpiColumns = [
    {
      key: 'name',
      title: 'KPI Name',
      sortable: true,
      render: (value: string, row: KPIMetric) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.name}
          </div>
          <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
            {row.category.replace('_', ' ').toUpperCase()}
          </div>
        </div>
      )
    },
    {
      key: 'value',
      title: 'Current Value',
      sortable: true,
      render: (value: number, row: KPIMetric) => (
        <div>
          <div className={`text-lg font-bold ${stableStyles.textPrimary[mode]}`}>
            {formatValue(row.value, row.unit)}
          </div>
          <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
            Target: {formatValue(row.target, row.unit)}
          </div>
        </div>
      )
    },
    {
      key: 'change',
      title: 'Change',
      sortable: true,
      render: (value: number, row: KPIMetric) => (
        <div className="flex items-center space-x-2">
          {getChangeIcon(row.changeType)}
          <span className={`font-medium ${getChangeColor(row.changeType)}`}>
            {row.change > 0 ? '+' : ''}{row.change}%
          </span>
        </div>
      )
    },
    {
      key: 'progress',
      title: 'Progress',
      render: (value: any, row: KPIMetric) => (
        <div>
          <EnhancedProgress
            value={(row.value / row.target) * 100}
            max={100}
            mode={mode}
            variant={row.value >= row.target ? 'success' : 'default'}
          />
          <div className={`text-xs ${stableStyles.textMuted[mode]} mt-1`}>
            {Math.round((row.value / row.target) * 100)}% of target
          </div>
        </div>
      )
    },
    {
      key: 'lastUpdated',
      title: 'Last Updated',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    }
  ];

  const reportColumns = [
    {
      key: 'name',
      title: 'Report Name',
      sortable: true,
      render: (value: string, row: Report) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.name}
          </div>
          <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
            {row.type.replace('_', ' ').toUpperCase()}
          </div>
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
      key: 'format',
      title: 'Format',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
          {value.toUpperCase()}
        </div>
      )
    },
    {
      key: 'size',
      title: 'Size',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {value}
        </div>
      )
    },
    {
      key: 'generatedAt',
      title: 'Generated',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    }
  ];

  const alertColumns = [
    {
      key: 'title',
      title: 'Alert',
      sortable: true,
      render: (value: string, row: Alert) => (
        <div className="flex items-center space-x-3">
          {getAlertIcon(row.type)}
          <div>
            <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
              {row.title}
            </div>
            <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
              {row.message}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'severity',
      title: 'Severity',
      sortable: true,
      render: (value: string) => getSeverityBadge(value)
    },
    {
      key: 'timestamp',
      title: 'Time',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    },
    {
      key: 'acknowledged',
      title: 'Status',
      sortable: true,
      render: (value: boolean) => (
        <div>
          {value ? (
            <EnhancedBadge variant="success" mode={mode}>Acknowledged</EnhancedBadge>
          ) : (
            <EnhancedBadge variant="warning" mode={mode}>Pending</EnhancedBadge>
          )}
        </div>
      )
    }
  ];

  const filteredKPIs = selectedCategory === 'all' 
    ? kpiMetrics 
    : kpiMetrics.filter(kpi => kpi.category === selectedCategory);

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              Analytics Dashboard
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Comprehensive business intelligence and performance analytics
            </p>
          </div>
          <div className="flex space-x-3">
            <Button>
                 
              <Download className="w-4 h-4 mr-2" /></Button>
              Export Data
            <Button>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters */}
        <EnhancedCard mode={mode}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <EnhancedSearch
                placeholder="Search analytics..."
                mode={mode}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="all">All Categories</option>
                <option value="revenue">Revenue</option>
                <option value="operations">Operations</option>
                <option value="customer">Customer</option>
                <option value="performance">Performance</option>
              </select>
            </div>
          </div>
        </EnhancedCard>

        {/* KPI Metrics */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
              Key Performance Indicators
            </h2>
              <Button>
                <Target className="w-4 h-4 mr-2" />
                Set Targets
              </Button>
          </div>
          
          <EnhancedTable
            columns={kpiColumns}
            data={filteredKPIs}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No KPI metrics found"
          />
        </EnhancedCard>

        {/* Charts and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Charts */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                Data Visualizations
              </h2>
                <Button>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Add Chart
                </Button>
            </div>
            
            <div className="space-y-4">
              {chartData.map((chart) => (
                <div key={chart.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-medium ${stableStyles.textPrimary[mode]}`}>
                      {chart.name}
                    </h3>
                    <div className="flex space-x-2">
                      <Button>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                    <div className={`text-center ${stableStyles.textSecondary[mode]}`}>
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Chart visualization would be rendered here</p>
                      <p className="text-sm">Type: {chart.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>

          {/* Reports */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                Generated Reports
              </h2>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
            </div>
            
            <EnhancedTable
              columns={reportColumns}
              data={reports}
              mode={mode}
              sortable
              loading={loading}
              emptyMessage="No reports found"
            />
          </EnhancedCard>
        </div>

        {/* Alerts */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
              System Alerts
            </h2>
              <Button>
                <Bell className="w-4 h-4 mr-2" />
                View All
              </Button>
          </div>
          
          <EnhancedTable
            columns={alertColumns}
            data={alerts}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No alerts found"
          />
        </EnhancedCard>

        {/* Quick Actions */}
        <EnhancedCard mode={mode} elevated>
          <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]} mb-6`}>
            Analytics Actions
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button>
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs">Create Chart</span>
            </Button>
            <Button>
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </Button>
            <Button>
              <Target className="w-4 h-4" />
              <span>Set KPIs</span>
            </Button>
            <Button>
              <TrendingUp className="w-4 h-4" />
              <span>Trend Analysis</span>
            </Button>
            <Button>
              <Users className="w-4 h-4" />
              <span>User Analytics</span>
            </Button>
            <Button>
              <Settings className="w-4 h-4" />
              <span>Configure</span>
            </Button>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
