import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  DollarSign, 
  Shield, 
  Network,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react';
import { 
  getSystemMetrics, 
  getUserAnalytics, 
  getSystemHealth,
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatUptime
} from '../../../api';

interface SystemOverviewProps {}

const SystemOverview: React.FC<SystemOverviewProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState<any>(null);
  const [userAnalytics, setUserAnalytics] = useState<any>(null);
  const [systemHealth, setSystemHealth] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch all dashboard data in parallel
        const [metricsRes, analyticsRes, healthRes] = await Promise.all([
          getSystemMetrics(),
          getUserAnalytics(),
          getSystemHealth()
        ]);

        if (metricsRes.error) throw new Error(metricsRes.error);
        if (analyticsRes.error) throw new Error(analyticsRes.error);
        if (healthRes.error) throw new Error(healthRes.error);

        setSystemMetrics(metricsRes.data);
        setUserAnalytics(analyticsRes.data);
        setSystemHealth(healthRes.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load system data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 dark:text-green-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'critical': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              System Overview
            </h1>
          </div>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Error Loading System Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {error}
              </p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            System Overview
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time system health, uptime, performance metrics
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${getStatusColor(systemHealth?.status)}`}>
                  {getStatusIcon(systemHealth?.status)}
                  <span className="font-semibold capitalize">{systemHealth?.status || 'Unknown'}</span>
                </div>
                <Badge variant="outline">
                  Uptime: {formatUptime(systemHealth?.uptime || 0)}
                </Badge>
                <Badge variant="outline">
                  Response: {systemHealth?.responseTime || 0}ms
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Revenue */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(systemMetrics?.revenue || 0)}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Users */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Active Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(systemMetrics?.activeUsers || 0)}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      {formatNumber(systemMetrics?.totalUsers || 0)} total users
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Uptime */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      System Uptime
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatUptime(systemHealth?.uptime || 0)}
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center mt-1">
                      <Activity className="h-3 w-3 mr-1" />
                      Last 30 days
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Calls */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      API Calls
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatNumber(systemMetrics?.apiCalls || 0)}
                    </p>
                    <p className="text-xs text-teal-600 dark:text-teal-400 flex items-center mt-1">
                      <Network className="h-3 w-3 mr-1" />
                      Daily requests
                    </p>
                  </div>
                  <div className="p-3 bg-teal-100 dark:bg-teal-900/20 rounded-lg">
                    <Network className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Score */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Security Score
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {systemMetrics?.securityScore || 0}
                    </p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center mt-1">
                      <Shield className="h-3 w-3 mr-1" />
                      Overall rating
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                    <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CPU Usage */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      CPU Usage
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatPercentage(systemHealth?.cpuUsage || 0)}
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 flex items-center mt-1">
                      <Cpu className="h-3 w-3 mr-1" />
                      Current load
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <Cpu className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>System Resources</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Memory Usage</span>
                    <span className="font-medium">{formatPercentage(systemHealth?.memoryUsage || 0)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${systemHealth?.memoryUsage || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Disk Usage</span>
                    <span className="font-medium">{formatPercentage(systemHealth?.diskUsage || 0)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${systemHealth?.diskUsage || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Active Connections</span>
                    <span className="font-medium">{formatNumber(systemHealth?.activeConnections || 0)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((systemHealth?.activeConnections || 0) / 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SystemOverview;
