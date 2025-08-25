import React, { useState, useEffect } from 'react';
import { MCP, MCPMetrics } from '@/services/mcp';
import { executeFabAction } from '@/components/FabActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Users, 
  Server, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Pause,
  RotateCcw,
  Database,
  Zap,
  Cpu,
  HardDrive,
  Network,
  Shield,
  BarChart3,
  Gauge,
  Thermometer,
  Wifi,
  Monitor
} from 'lucide-react';

const SystemOverview: React.FC = () => {
  const [metrics, setMetrics] = useState<MCPMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'degraded' | 'unhealthy'>('healthy');
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  // Fetch metrics from MCP
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await MCP.metrics.overview();
      setMetrics(response.data);
      setIsUsingMockData(response.isMock);
      setLastUpdated(new Date());
      
      // Determine system health based on metrics
      const errorRate = response.data.system.error_rate;
      const successRate = response.data.jobs.success_rate;
      
      if (errorRate > 0.1 || successRate < 0.9) {
        setSystemHealth('degraded');
      } else if (errorRate > 0.2 || successRate < 0.8) {
        setSystemHealth('unhealthy');
      } else {
        setSystemHealth('healthy');
      }
      
    } catch (err: any) {
      console.error('Failed to fetch metrics:', err);
      setError(err?.response?.data?.message || 'Failed to fetch system metrics');
      setIsUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  // System operations
  const performSystemOperation = async (operation: string) => {
    try {
      await executeFabAction('systemOperation', operation);
      // Refresh metrics after operation
      setTimeout(fetchMetrics, 2000);
    } catch (error) {
      console.error(`System operation ${operation} failed:`, error);
    }
  };

  // Auto-refresh metrics every 30 seconds
  useEffect(() => {
    fetchMetrics();
    
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
                </div>
              </div>
            </div>

            {/* System Health Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-80"></div>
                </div>
              </div>
            </div>

            {/* Metrics Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                    <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Operations Skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* Resource Usage Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full w-fit mx-auto mb-4">
                    <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
                    Failed to Load System Metrics
                  </h3>
                  <p className="text-red-600 dark:text-red-400 mb-6 max-w-md mx-auto">
                    {error}
                  </p>
                  <Button
                    onClick={fetchMetrics}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry Connection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  System Overview
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                  Real-time system metrics and operational status
                </p>
                {isUsingMockData && (
                  <div className="mt-3 flex items-center">
                    <Badge variant="outline" className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200">
                      📊 Demo Mode
                    </Badge>
                    <p className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                      MCP API unavailable - showing sample metrics
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {lastUpdated && (
                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 inline mr-2" />
                  {lastUpdated.toLocaleTimeString()}
                </div>
              )}
              <Button
                onClick={fetchMetrics}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced System Health Status */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className={`
              relative p-6 border-l-4
              ${systemHealth === 'healthy' 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-500' 
                : systemHealth === 'degraded'
                ? 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-500'
                : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-500'
              }
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`
                    p-3 rounded-full
                    ${systemHealth === 'healthy' 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : systemHealth === 'degraded'
                      ? 'bg-yellow-100 dark:bg-yellow-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                    }
                  `}>
                    {systemHealth === 'healthy' ? (
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    ) : systemHealth === 'degraded' ? (
                      <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                    ) : (
                      <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      System Status: {systemHealth.charAt(0).toUpperCase() + systemHealth.slice(1)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {systemHealth === 'healthy' 
                        ? 'All systems operating normally with optimal performance'
                        : systemHealth === 'degraded'
                        ? 'Some systems experiencing minor issues - monitoring closely'
                        : 'Critical system issues detected - immediate attention required'
                      }
                    </p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Badge 
                    variant="outline" 
                    className={`
                      text-lg px-4 py-2
                      ${systemHealth === 'healthy' 
                        ? 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200' 
                        : systemHealth === 'degraded'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200'
                        : 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200'
                      }
                    `}
                  >
                    {systemHealth === 'healthy' ? '✓ OPERATIONAL' : systemHealth === 'degraded' ? '⚠ DEGRADED' : '✗ CRITICAL'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Agents Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                  {metrics?.agents.online && metrics?.agents.total ? 
                    Math.round((metrics.agents.online / metrics.agents.total) * 100) : 0}%
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Agents</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {metrics?.agents.online || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  of {metrics?.agents.total || 0} total agents
                </p>
                <div className="flex items-center text-sm mt-3">
                  {metrics?.agents.online && metrics?.agents.total && (
                    <span className={`flex items-center ${
                      (metrics.agents.online / metrics.agents.total) > 0.8 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-yellow-600 dark:text-yellow-400'
                    }`}>
                      {metrics.agents.online / metrics.agents.total > 0.8 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.round((metrics.agents.online / metrics.agents.total) * 100)}% online
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300">
                  {Math.round((metrics?.jobs.success_rate || 0) * 100)}%
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {metrics?.jobs.running || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {metrics?.jobs.queued || 0} queued • {metrics?.jobs.completed || 0} completed
                </p>
                <div className="flex items-center text-sm mt-3">
                  <span className={`flex items-center ${
                    (metrics?.jobs.success_rate || 0) > 0.9 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {metrics?.jobs.success_rate && (
                      <>
                        {metrics.jobs.success_rate > 0.9 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.round(metrics.jobs.success_rate * 100)}% success rate
                      </>
                    )}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Uptime Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                  <Server className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                  v{metrics?.system.version || 'Unknown'}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Uptime</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {metrics?.system.uptime ? Math.floor(metrics.system.uptime / 3600) : 0}h
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {metrics?.system.uptime ? Math.floor((metrics.system.uptime % 3600) / 60) : 0}m
                </p>
                <div className="flex items-center text-sm mt-3">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Last deployment: {metrics?.system.last_deployment ? 
                      new Date(metrics.system.last_deployment).toLocaleDateString() : 'Unknown'
                    }
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Rate Card */}
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className={`${
                  (metrics?.system.error_rate || 0) < 0.01 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
                }`}>
                  {(metrics?.system.error_rate || 0) < 0.01 ? 'Low' : 'High'}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Error Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {metrics?.system.error_rate ? (metrics.system.error_rate * 100).toFixed(2) : 0}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {metrics?.system.response_time ? metrics.system.response_time.toFixed(0) : 0}ms avg response
                </p>
                <div className="flex items-center text-sm mt-3">
                  <span className={`flex items-center ${
                    (metrics?.system.error_rate || 0) < 0.01 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {(metrics?.system.error_rate || 0) < 0.01 ? (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    )}
                    {(metrics?.system.error_rate || 0) < 0.01 ? 'Low' : 'High'} error rate
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced System Operations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              System Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                onClick={() => performSystemOperation('restart')}
                className="h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <RotateCcw className="w-5 h-5 mb-1" />
                  <span className="text-sm">Restart</span>
                </div>
              </Button>
              <Button
                onClick={() => performSystemOperation('drain')}
                className="h-16 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <Pause className="w-5 h-5 mb-1" />
                  <span className="text-sm">Drain Queue</span>
                </div>
              </Button>
              <Button
                onClick={() => performSystemOperation('reindex')}
                className="h-16 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <Database className="w-5 h-5 mb-1" />
                  <span className="text-sm">Reindex</span>
                </div>
              </Button>
              <Button
                onClick={() => performSystemOperation('refresh_caches')}
                className="h-16 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col items-center">
                  <Zap className="w-5 h-5 mb-1" />
                  <span className="text-sm">Refresh Caches</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Resource Usage */}
        {metrics?.resources && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gauge className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                  Resource Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* CPU Usage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CPU Usage</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.round(metrics.resources.cpu_usage * 100)}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            metrics.resources.cpu_usage > 0.8 ? 'bg-red-500' :
                            metrics.resources.cpu_usage > 0.6 ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${Math.round(metrics.resources.cpu_usage * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Memory Usage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Memory Usage</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.round(metrics.resources.memory_usage * 100)}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            metrics.resources.memory_usage > 0.8 ? 'bg-red-500' :
                            metrics.resources.memory_usage > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.round(metrics.resources.memory_usage * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>

                  {/* Disk Usage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <HardDrive className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Disk Usage</span>
                      </div>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {Math.round(metrics.resources.disk_usage * 100)}%
                      </span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-500 ${
                            metrics.resources.disk_usage > 0.8 ? 'bg-red-500' :
                            metrics.resources.disk_usage > 0.6 ? 'bg-yellow-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.round(metrics.resources.disk_usage * 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                  Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Network Throughput */}
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <div className="flex items-center justify-center mb-2">
                      <Wifi className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {metrics.resources.network_throughput ? 
                        (metrics.resources.network_throughput / 1024 / 1024).toFixed(2) : 0
                      }
                    </div>
                    <div className="text-lg text-gray-600 dark:text-gray-400 mb-2">MB/s</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Current network throughput
                    </p>
                  </div>

                  {/* Performance Indicators */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metrics?.system.response_time ? metrics.system.response_time.toFixed(0) : 0}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">ms Response</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {metrics?.system.error_rate ? (metrics.system.error_rate * 100).toFixed(2) : 0}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Error Rate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Insights & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                Agent Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Healthy</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {metrics?.agents.healthy || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Degraded</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {metrics?.agents.degraded || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Offline</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {metrics?.agents.offline || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                Job Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Running</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {metrics?.jobs.running || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Queued</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {metrics?.jobs.queued || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {metrics?.jobs.completed || 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {Math.round((metrics?.jobs.success_rate || 0) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {metrics?.system.uptime ? Math.floor(metrics.system.uptime / 3600) : 0}h
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Uptime</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {metrics?.system.response_time ? metrics.system.response_time.toFixed(0) : 0}ms
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Response</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;
