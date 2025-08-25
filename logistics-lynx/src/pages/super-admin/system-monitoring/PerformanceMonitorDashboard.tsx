// ========================
// 📊 Performance Monitor Dashboard
// ========================
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Progress } from '../../../components/ui/progress';
import { 
  Zap, 
  Activity, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BarChart3,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Gauge,
  Cpu,
  Memory,
  HardDrive,
  Network
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area, HeatMap, HeatMapGrid } from 'recharts';

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
  errorMessage?: string;
}

interface LatencyData {
  time: string;
  avgLatency: number;
  p95Latency: number;
  p99Latency: number;
  requests: number;
  errors: number;
}

interface ConfidenceData {
  agentId: string;
  agentName: string;
  avgConfidence: number;
  successRate: number;
  totalRequests: number;
  retryRate: number;
  lastActivity: string;
}

interface RetryHeatmapData {
  hour: number;
  day: string;
  retries: number;
  failures: number;
}

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkThroughput: number;
  activeConnections: number;
  errorRate: number;
  uptime: number;
  lastUpdate: string;
}

const PerformanceMonitorDashboard: React.FC = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [latencyData, setLatencyData] = useState<LatencyData[]>([]);
  const [confidenceData, setConfidenceData] = useState<ConfidenceData[]>([]);
  const [retryHeatmapData, setRetryHeatmapData] = useState<RetryHeatmapData[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkThroughput: 0,
    activeConnections: 0,
    errorRate: 0,
    uptime: 0,
    lastUpdate: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [monitoringActive, setMonitoringActive] = useState(true);

  useEffect(() => {
    if (monitoringActive) {
      loadPerformanceData();
      const interval = setInterval(() => {
        if (autoRefresh) {
          loadPerformanceData();
        }
      }, 15000); // Refresh every 15 seconds for performance data
      return () => clearInterval(interval);
    }
  }, [selectedTimeframe, autoRefresh, monitoringActive]);

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
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 30000).toISOString(),
        endpoint: '/api/mcp/agent/analyze',
        responseTime: 892,
        statusCode: 200,
        confidence: 0.72,
        retryCount: 1,
        agentId: 'agent-002',
        success: true
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 60000).toISOString(),
        endpoint: '/api/mcp/agent/execute',
        responseTime: 1500,
        statusCode: 500,
        confidence: 0.34,
        retryCount: 3,
        agentId: 'agent-003',
        success: false,
        errorMessage: 'Timeout exceeded'
      }
    ];
    setPerformanceMetrics(mockMetrics);
  };

  const loadLatencyData = async () => {
    const mockLatencyData: LatencyData[] = [
      { time: '00:00', avgLatency: 245, p95Latency: 450, p99Latency: 890, requests: 1250, errors: 12 },
      { time: '04:00', avgLatency: 189, p95Latency: 380, p99Latency: 720, requests: 980, errors: 8 },
      { time: '08:00', avgLatency: 312, p95Latency: 580, p99Latency: 1100, requests: 2100, errors: 25 },
      { time: '12:00', avgLatency: 456, p95Latency: 820, p99Latency: 1500, requests: 3200, errors: 45 },
      { time: '16:00', avgLatency: 378, p95Latency: 650, p99Latency: 1200, requests: 2800, errors: 32 },
      { time: '20:00', avgLatency: 234, p95Latency: 420, p99Latency: 780, requests: 1600, errors: 18 }
    ];
    setLatencyData(mockLatencyData);
  };

  const loadConfidenceData = async () => {
    // Simulate MCP API call: GET /agent/confidence
    const mockConfidenceData: ConfidenceData[] = [
      {
        agentId: 'agent-001',
        agentName: 'Process Agent',
        avgConfidence: 0.87,
        successRate: 94.2,
        totalRequests: 1250,
        retryRate: 2.1,
        lastActivity: new Date().toISOString()
      },
      {
        agentId: 'agent-002',
        agentName: 'Analysis Agent',
        avgConfidence: 0.72,
        successRate: 88.5,
        totalRequests: 890,
        retryRate: 8.7,
        lastActivity: new Date(Date.now() - 300000).toISOString()
      },
      {
        agentId: 'agent-003',
        agentName: 'Execution Agent',
        avgConfidence: 0.34,
        successRate: 67.3,
        totalRequests: 456,
        retryRate: 25.4,
        lastActivity: new Date(Date.now() - 600000).toISOString()
      }
    ];
    setConfidenceData(mockConfidenceData);
  };

  const loadRetryHeatmapData = async () => {
    const mockHeatmapData: RetryHeatmapData[] = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        mockHeatmapData.push({
          hour,
          day: days[day],
          retries: Math.floor(Math.random() * 50),
          failures: Math.floor(Math.random() * 20)
        });
      }
    }
    setRetryHeatmapData(mockHeatmapData);
  };

  const loadSystemMetrics = async () => {
    const mockSystemMetrics: SystemMetrics = {
      cpuUsage: 45.2,
      memoryUsage: 67.8,
      diskUsage: 23.4,
      networkThroughput: 125.6,
      activeConnections: 234,
      errorRate: 2.3,
      uptime: 86400, // 24 hours in seconds
      lastUpdate: new Date().toISOString()
    };
    setSystemMetrics(mockSystemMetrics);
  };

  const toggleMonitoring = () => {
    setMonitoringActive(!monitoringActive);
  };

  const exportPerformanceReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      timeframe: selectedTimeframe,
      systemMetrics,
      performanceMetrics,
      confidenceData,
      latencyData
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'bg-green-100 text-green-800';
    if (statusCode >= 400 && statusCode < 500) return 'bg-yellow-100 text-yellow-800';
    if (statusCode >= 500) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Chart data processing
  const retryHeatmapProcessed = retryHeatmapData.reduce((acc, item) => {
    const key = `${item.day}-${item.hour}`;
    acc[key] = item.retries;
    return acc;
  }, {} as Record<string, number>);

  const confidenceTrendData = confidenceData.map(agent => ({
    name: agent.agentName,
    confidence: agent.avgConfidence * 100,
    successRate: agent.successRate,
    retryRate: agent.retryRate
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Performance Monitor Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time latency charts, confidence scores, and retry heatmaps
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={monitoringActive ? "default" : "outline"}
            size="sm"
            onClick={toggleMonitoring}
          >
            {monitoringActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            {monitoringActive ? 'Monitoring' : 'Paused'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto' : 'Manual'}
          </Button>
          <Button variant="outline" size="sm" onClick={exportPerformanceReport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* System Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.cpuUsage.toFixed(1)}%</div>
            <Progress value={systemMetrics.cpuUsage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {systemMetrics.cpuUsage > 80 ? 'High Load' : 
               systemMetrics.cpuUsage > 60 ? 'Moderate' : 'Normal'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <Memory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.memoryUsage.toFixed(1)}%</div>
            <Progress value={systemMetrics.memoryUsage} className="mt-2" />
            <p className="text-xs text-muted-foreground">
              {systemMetrics.activeConnections} active connections
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{systemMetrics.errorRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {systemMetrics.errorRate > 5 ? 'High Error Rate' : 
               systemMetrics.errorRate > 2 ? 'Moderate' : 'Low'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatUptime(systemMetrics.uptime)}</div>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date(systemMetrics.lastUpdate).toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="latency" className="space-y-4">
        <TabsList>
          <TabsTrigger value="latency">Latency Charts</TabsTrigger>
          <TabsTrigger value="confidence">Confidence Scores</TabsTrigger>
          <TabsTrigger value="retries">Retry Heatmap</TabsTrigger>
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="latency" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <CardDescription>Average, P95, and P99 latency over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgLatency" stroke="#8884d8" name="Avg" />
                    <Line type="monotone" dataKey="p95Latency" stroke="#82ca9d" name="P95" />
                    <Line type="monotone" dataKey="p99Latency" stroke="#ffc658" name="P99" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Volume & Errors</CardTitle>
                <CardDescription>Request count and error rate trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Area yAxisId="left" type="monotone" dataKey="requests" stroke="#8884d8" fill="#8884d8" name="Requests" />
                    <Area yAxisId="right" type="monotone" dataKey="errors" stroke="#ff7300" fill="#ff7300" name="Errors" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="confidence" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Agent Confidence Scores</CardTitle>
                <CardDescription>Average confidence and success rates by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={confidenceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confidence" fill="#8884d8" name="Confidence %" />
                    <Bar dataKey="successRate" fill="#82ca9d" name="Success Rate %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Performance Table</CardTitle>
                <CardDescription>Detailed agent performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Agent</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Success Rate</TableHead>
                      <TableHead>Retry Rate</TableHead>
                      <TableHead>Requests</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {confidenceData.map((agent) => (
                      <TableRow key={agent.agentId}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{agent.agentName}</div>
                            <div className="text-xs text-muted-foreground font-mono">{agent.agentId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={getConfidenceColor(agent.avgConfidence)}>
                            {(agent.avgConfidence * 100).toFixed(1)}%
                          </span>
                        </TableCell>
                        <TableCell>{agent.successRate.toFixed(1)}%</TableCell>
                        <TableCell>{agent.retryRate.toFixed(1)}%</TableCell>
                        <TableCell>{agent.totalRequests.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="retries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Retry & Failure Heatmap</CardTitle>
              <CardDescription>Retry and failure patterns by hour and day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-25 gap-1">
                {Array.from({ length: 24 }, (_, hour) => (
                  <div key={hour} className="text-xs text-center font-mono">
                    {hour.toString().padStart(2, '0')}
                  </div>
                ))}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <React.Fragment key={day}>
                    <div className="text-xs font-medium flex items-center">{day}</div>
                    {Array.from({ length: 24 }, (_, hour) => {
                      const data = retryHeatmapData.find(d => d.day === day && d.hour === hour);
                      const intensity = data ? Math.min(data.retries / 50, 1) : 0;
                      return (
                        <div
                          key={`${day}-${hour}`}
                          className="w-8 h-8 rounded border"
                          style={{
                            backgroundColor: `rgba(239, 68, 68, ${intensity})`,
                            borderColor: intensity > 0.5 ? '#dc2626' : '#e5e7eb'
                          }}
                          title={`${day} ${hour}:00 - ${data?.retries || 0} retries, ${data?.failures || 0} failures`}
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-4 flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-100 border rounded"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-300 border rounded"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-red-500 border rounded"></div>
                  <span>High</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Performance Metrics</CardTitle>
              <CardDescription>Live performance data from MCP agents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Retries</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceMetrics.map((metric) => (
                    <TableRow key={metric.id}>
                      <TableCell className="font-mono text-sm">{metric.endpoint}</TableCell>
                      <TableCell>
                        <span className={metric.responseTime > 1000 ? 'text-red-600' : 
                                         metric.responseTime > 500 ? 'text-yellow-600' : 'text-green-600'}>
                          {metric.responseTime}ms
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(metric.statusCode)}>
                          {metric.statusCode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={getConfidenceColor(metric.confidence)}>
                          {(metric.confidence * 100).toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {metric.retryCount > 0 ? (
                          <Badge variant="outline" className="text-orange-600">
                            {metric.retryCount}
                          </Badge>
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </TableCell>
                      <TableCell className="font-mono text-xs">{metric.agentId}</TableCell>
                      <TableCell>
                        {new Date(metric.timestamp).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMonitorDashboard;
