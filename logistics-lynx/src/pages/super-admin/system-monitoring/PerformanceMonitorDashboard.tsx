import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Progress } from '../../../components/ui/progress';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Clock, CheckCircle, RefreshCw, Download, Zap, Database } from 'lucide-react';

// Types
interface PerformanceMetric {
  id: string;
  timestamp: string;
  endpoint: string;
  responseTime: number;
  statusCode: number;
  confidence: number;
  retryCount: number;
  agentId: string;
  success: boolean;
}

interface LatencyData {
  timestamp: string;
  latency: number;
  endpoint: string;
}

interface ConfidenceData {
  timestamp: string;
  confidence: number;
  agentId: string;
}

interface RetryHeatmapData {
  hour: number;
  day: string;
  retries: number;
}

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

const PerformanceMonitorDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [latencyData, setLatencyData] = useState<LatencyData[]>([]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0
  });

  const loadPerformanceData = async () => {
    setIsLoading(true);
    try {
      // Simulate MCP API calls
      await Promise.all([
        loadPerformanceMetrics(),
        loadLatencyData(),
        loadConfidenceData(),
        loadRetryHeatmapData(),
        loadSystemMetrics()
      ]);
    } catch (error) {
      console.error('Error loading performance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPerformanceMetrics = async () => {
    // Simulate MCP API call: GET /agent/metrics
    const mockMetrics: PerformanceMetric[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        endpoint: '/api/mcp/agent/process',
        responseTime: 245,
        statusCode: 200,
        confidence: 0.87,
        retryCount: 0,
        agentId: 'agent-001',
        success: true
      }
    ];
    setPerformanceMetrics(mockMetrics);
  };

  const loadLatencyData = async () => {
    // Simulate MCP API call: GET /agent/latency
    const mockLatency: LatencyData[] = [
      { timestamp: '2024-01-01T00:00:00Z', latency: 120, endpoint: '/api/mcp/agent/process' }
    ];
    setLatencyData(mockLatency);
  };

  const loadConfidenceData = async () => {
    // Simulate MCP API call: GET /agent/confidence
    const mockConfidence: ConfidenceData[] = [
      { timestamp: '2024-01-01T00:00:00Z', confidence: 0.85, agentId: 'agent-001' }
    ];
    setConfidenceData(mockConfidence);
  };

  const loadRetryHeatmapData = async () => {
    // Simulate MCP API call: GET /agent/retry-heatmap
    const mockRetryHeatmap: RetryHeatmapData[] = [
      { hour: 0, day: 'Monday', retries: 5 }
    ];
    setRetryHeatmapData(mockRetryHeatmap);
  };

  const loadSystemMetrics = async () => {
    // Simulate MCP API call: GET /system/metrics
    const mockSystemMetrics: SystemMetrics = {
      cpu: 45,
      memory: 67,
      disk: 23,
      network: 12
    };
    setSystemMetrics(mockSystemMetrics);
  };

  useEffect(() => {
    loadPerformanceData();
    return () => {
      // Cleanup function
    };
  }, [selectedTimeframe, autoRefresh, monitoringActive]);

  const refreshData = () => {
    loadPerformanceData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 Performance Monitor Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Real-time MCP Agent Performance & System Metrics
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setMonitoringActive(!monitoringActive)}
              className={`px-4 py-2 rounded-lg font-medium ${monitoringActive ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
            >
              {monitoringActive ? 'Pause' : 'Resume'} Monitoring
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-medium ${autoRefresh ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}
            >
              {autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={refreshData}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="latency">Latency</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{performanceMetrics.length}</p>
                  </div>
                  <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">245ms</p>
                  </div>
                  <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">98.5%</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Agents</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                  <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceMetrics.map((metric) => (
                      <TableRow key={metric.id}>
                        <TableCell>{new Date(metric.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{metric.endpoint}</TableCell>
                        <TableCell>{metric.responseTime}ms</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${metric.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {metric.statusCode}
                          </span>
                        </TableCell>
                        <TableCell>{(metric.confidence * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="latency" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Latency Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="latency" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">System Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">CPU Usage</span>
                    <span className="text-sm text-gray-600">{systemMetrics.cpu}%</span>
                  </div>
                  <Progress value={systemMetrics.cpu} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Memory Usage</span>
                    <span className="text-sm text-gray-600">{systemMetrics.memory}%</span>
                  </div>
                  <Progress value={systemMetrics.memory} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Disk Usage</span>
                    <span className="text-sm text-gray-600">{systemMetrics.disk}%</span>
                  </div>
                  <Progress value={systemMetrics.disk} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Network Usage</span>
                    <span className="text-sm text-gray-600">{systemMetrics.network}%</span>
                  </div>
                  <Progress value={systemMetrics.network} className="h-2" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceMonitorDashboard;
