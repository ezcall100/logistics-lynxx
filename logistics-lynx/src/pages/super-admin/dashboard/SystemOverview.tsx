import React, { useState, useEffect } from 'react';
import { MCP, MCPMetrics, MCPUtils } from '@/services/mcp';
import { executeFabAction } from '@/components/FabActions';
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
  Play,
  Pause,
  RotateCcw,
  Database,
  Zap
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                  Failed to Load System Metrics
                </h3>
                <p className="text-red-600 dark:text-red-400 mt-1">{error}</p>
                <button
                  onClick={fetchMetrics}
                  className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              System Overview
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Real-time system metrics and operational status
            </p>
            {isUsingMockData && (
              <div className="mt-2 flex items-center">
                <div className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-full">
                  <span className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                    📊 Using Demo Data
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 ml-3">
                  MCP API unavailable - showing sample metrics
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {lastUpdated && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
            <button
              onClick={fetchMetrics}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* System Health Status */}
        <div className={`
          rounded-lg p-4 border-l-4
          ${systemHealth === 'healthy' 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
            : systemHealth === 'degraded'
            ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
            : 'bg-red-50 dark:bg-red-900/20 border-red-500'
          }
        `}>
          <div className="flex items-center">
            {systemHealth === 'healthy' ? (
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 mr-3" />
            ) : systemHealth === 'degraded' ? (
              <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-3" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
            )}
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                System Status: {systemHealth.charAt(0).toUpperCase() + systemHealth.slice(1)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {systemHealth === 'healthy' 
                  ? 'All systems operating normally'
                  : systemHealth === 'degraded'
                  ? 'Some systems experiencing issues'
                  : 'Critical system issues detected'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Agents Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Agents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics?.agents.online || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  of {metrics?.agents.total || 0} total
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
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

          {/* Jobs Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics?.jobs.running || 0}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {metrics?.jobs.queued || 0} queued
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
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

          {/* System Uptime Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">System Uptime</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics?.system.uptime ? Math.floor(metrics.system.uptime / 3600) : 0}h
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Version {metrics?.system.version || 'Unknown'}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Server className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-600 dark:text-gray-400 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Last deployment: {metrics?.system.last_deployment ? 
                  new Date(metrics.system.last_deployment).toLocaleDateString() : 'Unknown'
                }
              </span>
            </div>
          </div>

          {/* Error Rate Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Error Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metrics?.system.error_rate ? (metrics.system.error_rate * 100).toFixed(2) : 0}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Response time: {metrics?.system.response_time ? metrics.system.response_time.toFixed(0) : 0}ms
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
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
        </div>

        {/* System Operations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            System Operations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => performSystemOperation('restart')}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart
            </button>
            <button
              onClick={() => performSystemOperation('drain')}
              className="flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Pause className="w-4 h-4 mr-2" />
              Drain Queue
            </button>
            <button
              onClick={() => performSystemOperation('reindex')}
              className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Database className="w-4 h-4 mr-2" />
              Reindex
            </button>
            <button
              onClick={() => performSystemOperation('refresh_caches')}
              className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Zap className="w-4 h-4 mr-2" />
              Refresh Caches
            </button>
          </div>
        </div>

        {/* Resource Usage */}
        {metrics?.resources && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Resource Usage
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">CPU</span>
                    <span className="text-gray-900 dark:text-white">
                      {Math.round(metrics.resources.cpu_usage * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(metrics.resources.cpu_usage * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Memory</span>
                    <span className="text-gray-900 dark:text-white">
                      {Math.round(metrics.resources.memory_usage * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(metrics.resources.memory_usage * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Disk</span>
                    <span className="text-gray-900 dark:text-white">
                      {Math.round(metrics.resources.disk_usage * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.round(metrics.resources.disk_usage * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Network Throughput
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {metrics.resources.network_throughput ? 
                    (metrics.resources.network_throughput / 1024 / 1024).toFixed(2) : 0
                  } MB/s
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current network throughput
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemOverview;
