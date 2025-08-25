import React, { useState } from 'react';
import { 
  CheckCircle, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Cpu, 
  HardDrive, 
  Network, 
  Database, 
  AlertTriangle, 
  BarChart3, 
  RefreshCw, 
  Settings, 
  Bell, 
  Download,
  Upload,
  FileText,
  Mail,
  Archive,
  RotateCcw,
  Info,
  AlertCircle
} from 'lucide-react';
import { 
  EnhancedCard, 
  EnhancedButton, 
  EnhancedBadge, 
  EnhancedProgress, 
  stableStyles 
} from '../../../components/ui/EnhancedUIComponents';

interface SystemMetric {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: string;
  status?: 'operational' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
}

interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'critical' | 'success';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  resolved: boolean;
}

const SystemOverview: React.FC = () => {
  const [mode] = useState<'light' | 'dark'>('light');
  const [refreshing, setRefreshing] = useState(false);
  const [systemMetrics] = useState<SystemMetric[]>([
    {
      id: 'system-status',
      title: 'System Status',
      value: 'Operational',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'text-green-500',
      status: 'operational',
      trend: 'stable'
    },
    {
      id: 'active-users',
      title: 'Active Users',
      value: '1,247',
      change: 12.5,
      changeType: 'increase',
      icon: <Users className="w-8 h-8" />,
      color: 'text-blue-500',
      trend: 'up'
    },
    {
      id: 'response-time',
      title: 'Avg Response Time',
      value: '245ms',
      change: -8.2,
      changeType: 'decrease',
      icon: <Activity className="w-8 h-8" />,
      color: 'text-emerald-500',
      trend: 'up'
    },
    {
      id: 'uptime',
      title: 'System Uptime',
      value: '99.9%',
      change: 0.1,
      changeType: 'increase',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-purple-500',
      trend: 'stable'
    },
    {
      id: 'cpu-usage',
      title: 'CPU Usage',
      value: '67%',
      change: 5.3,
      changeType: 'increase',
      icon: <Cpu className="w-8 h-8" />,
      color: 'text-orange-500',
      trend: 'up'
    },
    {
      id: 'memory-usage',
      title: 'Memory Usage',
      value: '78%',
      change: -2.1,
      changeType: 'decrease',
      icon: <HardDrive className="w-8 h-8" />,
      color: 'text-indigo-500',
      trend: 'down'
    },
    {
      id: 'network-traffic',
      title: 'Network Traffic',
      value: '2.4 GB/s',
      change: 15.7,
      changeType: 'increase',
      icon: <Network className="w-8 h-8" />,
      color: 'text-cyan-500',
      trend: 'up'
    },
    {
      id: 'database-connections',
      title: 'DB Connections',
      value: '1,892',
      change: -3.4,
      changeType: 'decrease',
      icon: <Database className="w-8 h-8" />,
      color: 'text-pink-500',
      trend: 'down'
    }
  ]);

  const [performanceMetrics] = useState<PerformanceMetric[]>([
    {
      name: 'Response Time',
      value: 245,
      target: 200,
      unit: 'ms',
      status: 'good'
    },
    {
      name: 'Throughput',
      value: 1250,
      target: 1000,
      unit: 'req/s',
      status: 'excellent'
    },
    {
      name: 'Error Rate',
      value: 0.5,
      target: 1.0,
      unit: '%',
      status: 'excellent'
    },
    {
      name: 'CPU Usage',
      value: 67,
      target: 80,
      unit: '%',
      status: 'good'
    },
    {
      name: 'Memory Usage',
      value: 78,
      target: 85,
      unit: '%',
      status: 'warning'
    },
    {
      name: 'Disk I/O',
      value: 45,
      target: 60,
      unit: 'MB/s',
      status: 'excellent'
    }
  ]);

  const [systemAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'info',
      title: 'System Update Available',
      message: 'A new system update is ready for installation',
      timestamp: '2 hours ago',
      priority: 'low',
      resolved: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'High CPU Usage Detected',
      message: 'CPU usage has exceeded 80% for the last 10 minutes',
      timestamp: '1 hour ago',
      priority: 'medium',
      resolved: false
    },
    {
      id: '3',
      type: 'success',
      title: 'Backup Completed Successfully',
      message: 'Daily backup completed without errors',
      timestamp: '30 minutes ago',
      priority: 'low',
      resolved: true
    }
  ]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'excellent':
        return 'text-green-500';
      case 'warning':
      case 'good':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
      case 'excellent':
        return <EnhancedBadge variant="success" mode={mode}>Operational</EnhancedBadge>;
      case 'warning':
      case 'good':
        return <EnhancedBadge variant="warning" mode={mode}>Warning</EnhancedBadge>;
      case 'critical':
        return <EnhancedBadge variant="danger" mode={mode}>Critical</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              System Overview
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Real-time monitoring and analytics dashboard
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />}
              onClick={handleRefresh}
              loading={refreshing}
              mode={mode}
            >
              Refresh
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
              icon={<Settings className="w-4 h-4" />}
              mode={mode}
            >
              Settings
            </EnhancedButton>
          </div>
        </div>

        {/* System Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric) => (
            <EnhancedCard
              key={metric.id}
              className="relative overflow-hidden"
              mode={mode}
              elevated
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={metric.color}>
                      {metric.icon}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                        {metric.title}
                      </p>
                      <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                        {metric.value}
                      </p>
                    </div>
                  </div>
                  
                  {metric.change !== undefined && (
                    <div className="flex items-center space-x-2">
                      {metric.changeType === 'increase' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                      <span className={`text-xs ${stableStyles.textMuted[mode]}`}>
                        from yesterday
                      </span>
                    </div>
                  )}
                </div>
                
                {metric.status && (
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(metric.status)}
                  </div>
                )}
              </div>
            </EnhancedCard>
          ))}
        </div>

        {/* Performance Metrics */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
              Performance Metrics
            </h2>
            <EnhancedButton
              variant="ghost"
              size="sm"
              icon={<BarChart3 className="w-4 h-4" />}
              mode={mode}
            >
              View Details
            </EnhancedButton>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric) => (
              <div key={metric.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                    {metric.name}
                  </span>
                  <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                    {metric.value} {metric.unit}
                  </span>
                </div>
                <EnhancedProgress
                  value={(metric.value / metric.target) * 100}
                  max={100}
                  mode={mode}
                  variant={metric.status === 'excellent' ? 'success' : metric.status === 'good' ? 'default' : metric.status === 'warning' ? 'warning' : 'danger'}
                />
                <div className="flex justify-between text-xs">
                  <span className={stableStyles.textMuted[mode]}>Target: {metric.target} {metric.unit}</span>
                  <span className={stableStyles.textMuted[mode]}>
                    {Math.round((metric.value / metric.target) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </EnhancedCard>

        {/* System Health & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Health */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                System Health
              </h2>
              <EnhancedBadge variant="success" pulse mode={mode}>
                All Systems Normal
              </EnhancedBadge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-700 dark:text-green-300">Web </span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Healthy</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center space-x-3">
                  <Database className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-700 dark:text-green-300">Database</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Healthy</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <div className="flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-yellow-700 dark:text-yellow-300">CPU Usage</span>
                </div>
                <span className="text-sm text-yellow-600 dark:text-yellow-400">High</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center space-x-3">
                  <Network className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-700 dark:text-green-300">Network</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Healthy</span>
              </div>
            </div>
          </EnhancedCard>

          {/* Recent Alerts */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                Recent Alerts
              </h2>
              <EnhancedButton
                variant="ghost"
                size="sm"
                icon={<Bell className="w-4 h-4" />}
                mode={mode}
              >
                View All
              </EnhancedButton>
            </div>
            
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    alert.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20' :
                    alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    alert.type === 'critical' ? 'bg-red-50 dark:bg-red-900/20' :
                    'bg-green-50 dark:bg-green-900/20'
                  }`}
                >
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${
                        alert.type === 'info' ? 'text-blue-700 dark:text-blue-300' :
                        alert.type === 'warning' ? 'text-yellow-700 dark:text-yellow-300' :
                        alert.type === 'critical' ? 'text-red-700 dark:text-red-300' :
                        'text-green-700 dark:text-green-300'
                      }`}>
                        {alert.title}
                      </h4>
                      <span className={`text-xs ${
                        alert.priority === 'high' ? 'text-red-600' :
                        alert.priority === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {alert.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${
                      alert.type === 'info' ? 'text-blue-600 dark:text-blue-400' :
                      alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                      alert.type === 'critical' ? 'text-red-600 dark:text-red-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {alert.message}
                    </p>
                    <p className={`text-xs mt-2 ${stableStyles.textMuted[mode]}`}>
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>
        </div>

        {/* Quick Actions */}
        <EnhancedCard mode={mode} elevated>
          <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]} mb-6`}>
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
              icon={<Upload className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Import Data</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<FileText className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Generate Report</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Mail className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Alert</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Archive className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Backup System</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<RotateCcw className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Restart Services</span>
            </EnhancedButton>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
};

export default SystemOverview;
