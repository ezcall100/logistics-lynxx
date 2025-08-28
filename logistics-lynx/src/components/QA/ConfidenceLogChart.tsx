// ========================
// 📊 QA Intelligence - Confidence Log Chart
// ========================
// TransBot AI - Real-time Agent Confidence Monitoring
// Domain: transbotai.com

import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Progress } from '../../components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Activity, CheckCircle, Download, RefreshCw, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfidenceLog {
  id: string;
  agentId: string;
  agentName: string;
  task: string;
  confidence: number;
  status: 'success' | 'failure' | 'retry' | 'timeout';
  timestamp: string;
  duration: number;
  retryCount: number;
  errorMessage?: string;
  portal: string;
}

interface AgentConfidenceChartProps {
  interval?: string;
  threshold?: number;
  exportEnabled?: boolean;
  filterable?: boolean;
  autoRefresh?: boolean;
}

const COLORS = {
  success: '#10b981',
  failure: '#ef4444',
  retry: '#f59e0b',
  timeout: '#8b5cf6'
};

const ConfidenceLogChart: React.FC<AgentConfidenceChartProps> = ({
  interval = '30s',
  threshold = 0.85,
  exportEnabled = true,
  filterable = true,
  autoRefresh = true
}) => {
  const [confidenceLogs, setConfidenceLogs] = useState<ConfidenceLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ConfidenceLog[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [selectedPortal, setSelectedPortal] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('24h');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Mock data for demonstration
  const mockConfidenceLogs: ConfidenceLog[] = [
    {
      id: '1',
      agentId: 'SecurityScannerAgent',
      agentName: 'Security Scanner',
      task: 'HeaderCheck',
      confidence: 0.92,
      status: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      duration: 1200,
      retryCount: 0,
      portal: 'carrier'
    },
    {
      id: '2',
      agentId: 'PerformanceMonitorAgent',
      agentName: 'Performance Monitor',
      task: 'LatencyCheck',
      confidence: 0.78,
      status: 'retry',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      duration: 3500,
      retryCount: 2,
      portal: 'carrier'
    },
    {
      id: '3',
      agentId: 'UserSessionAgent',
      agentName: 'User Session Manager',
      task: 'SessionValidation',
      confidence: 0.95,
      status: 'success',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      duration: 800,
      retryCount: 0,
      portal: 'shipper'
    },
    {
      id: '4',
      agentId: 'AnalyticsAgent',
      agentName: 'Analytics Processor',
      task: 'DataProcessing',
      confidence: 0.65,
      status: 'failure',
      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      duration: 5000,
      retryCount: 3,
      errorMessage: 'Data validation failed',
      portal: 'shipper'
    },
    {
      id: '5',
      agentId: 'AgentConfidenceMonitor',
      agentName: 'Confidence Monitor',
      task: 'ThresholdCheck',
      confidence: 0.88,
      status: 'success',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      duration: 1500,
      retryCount: 0,
      portal: 'broker'
    }
  ];

  useEffect(() => {
    loadConfidenceLogs();
    
    if (autoRefresh) {
      const intervalMs = parseInt(interval) * 1000;
      const timer = setInterval(loadConfidenceLogs, intervalMs);
      return () => clearInterval(timer);
    }
  }, [interval, autoRefresh]);

  useEffect(() => {
    applyFilters();
  }, [confidenceLogs, selectedAgent, selectedPortal, selectedStatus, timeRange]);

  const loadConfidenceLogs = async () => {
    setIsLoading(true);
    try {
      // In production, this would fetch from your MCP API
      // const response = await fetch('/api/mcp/confidence-logs');
      // const data = await response.json();
      
      // For now, using mock data
      setConfidenceLogs(mockConfidenceLogs);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to load confidence logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...confidenceLogs];

    if (selectedAgent !== 'all') {
      filtered = filtered.filter(log => log.agentId === selectedAgent);
    }

    if (selectedPortal !== 'all') {
      filtered = filtered.filter(log => log.portal === selectedPortal);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(log => log.status === selectedStatus);
    }

    // Apply time range filter
    const now = new Date();
    const timeRangeMs = getTimeRangeMs(timeRange);
    filtered = filtered.filter(log => {
      const logTime = new Date(log.timestamp);
      return now.getTime() - logTime.getTime() <= timeRangeMs;
    });

    setFilteredLogs(filtered);
  };

  const getTimeRangeMs = (range: string): number => {
    switch (range) {
      case '1h': return 60 * 60 * 1000;
      case '6h': return 6 * 60 * 60 * 1000;
      case '24h': return 24 * 60 * 60 * 1000;
      case '7d': return 7 * 24 * 60 * 60 * 1000;
      default: return 24 * 60 * 60 * 1000;
    }
  };

  const exportToCSV = () => {
    const headers = ['Agent', 'Task', 'Confidence', 'Status', 'Duration', 'Retries', 'Portal', 'Timestamp'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        log.agentName,
        log.task,
        log.confidence,
        log.status,
        log.duration,
        log.retryCount,
        log.portal,
        log.timestamp
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `confidence-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    return COLORS[status as keyof typeof COLORS] || '#6b7280';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= threshold) return '#10b981';
    if (confidence >= 0.7) return '#f59e0b';
    return '#ef4444';
  };

  const averageConfidence = filteredLogs.length > 0 
    ? filteredLogs.reduce((sum, log) => sum + log.confidence, 0) / filteredLogs.length 
    : 0;

  const successRate = filteredLogs.length > 0 
    ? (filteredLogs.filter(log => log.status === 'success').length / filteredLogs.length) * 100 
    : 0;

  const uniqueAgents = [...new Set(confidenceLogs.map(log => log.agentId))];
  const uniquePortals = [...new Set(confidenceLogs.map(log => log.portal))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Agent Confidence Monitoring</h2>
          <p className="text-muted-foreground">
            Real-time confidence scores and performance metrics for MCP agents
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            {isLoading ? 'Loading...' : 'Live'}
          </span>
          <Button>
                 
              </Button><RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          {exportEnabled && (
              <Download className="h-4 w-4 mr-2" />
              Export CSV
          )}
        </div>
      </div>

      {/* Filters */}
      {filterable && (
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="text-lg">Filters</h3>
          </div>
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Agent</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="all">All Agents</option>
                  {uniqueAgents.map(agent => (
                    <option key={agent} value={agent}>{agent}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Portal</label>
                <select
                  value={selectedPortal}
                  onChange={(e) => setSelectedPortal(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="all">All Portals</option>
                  {uniquePortals.map(portal => (
                    <option key={portal} value={portal}>{portal}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failure">Failure</option>
                  <option value="retry">Retry</option>
                  <option value="timeout">Timeout</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Time Range</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="1h">Last Hour</option>
                  <option value="6h">Last 6 Hours</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                </select>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      )}

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ResponsiveCard>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Confidence</p>
                <p className="text-2xl font-bold" style={{ color: getConfidenceColor(averageConfidence) }}>
                  {(averageConfidence * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </ResponsiveCard>
        <ResponsiveCard>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-green-600">{successRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </ResponsiveCard>
        <ResponsiveCard>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Logs</p>
                <p className="text-2xl font-bold">{filteredLogs.length}</p>
              </div>
            </div>
          </div>
        </ResponsiveCard>
        <ResponsiveCard>
          <div className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Last Update</p>
                <p className="text-sm font-bold">{lastUpdate.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>

      {/* Charts */}
      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="agents">By Agent</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Confidence Over Time</h3>
              <p className="text-slate-600 dark:text-slate-400">Agent confidence scores over the selected time range</p>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={filteredLogs}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                  />
                  <YAxis domain={[0, 1]} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleString()}
                    formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Confidence']}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="confidence" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ResponsiveCard>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Status Distribution</h3>
              <p className="text-slate-600 dark:text-slate-400">Distribution of agent task statuses</p>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={Object.entries(
                      filteredLogs.reduce((acc, log) => {
                        acc[log.status] = (acc[log.status] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([status, count]) => ({ name: status, value: count }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {Object.entries(
                      filteredLogs.reduce((acc, log) => {
                        acc[log.status] = (acc[log.status] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([status]) => (
                      <Cell key={`cell-${index}`} fill={getStatusColor(status)} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ResponsiveCard>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Agent Performance</h3>
              <p className="text-slate-600 dark:text-slate-400">Average confidence scores by agent</p>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={uniqueAgents.map(agentId => {
                  const agentLogs = filteredLogs.filter(log => log.agentId === agentId);
                  const avgConfidence = agentLogs.length > 0 
                    ? agentLogs.reduce((sum, log) => sum + log.confidence, 0) / agentLogs.length 
                    : 0;
                  return { agent: agentId, confidence: avgConfidence };
                })}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="agent" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Confidence']} />
                  <Bar dataKey="confidence" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ResponsiveCard>
        </TabsContent>
      </Tabs>

      {/* Recent Logs Table */}
      <ResponsiveCard>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Confidence Logs</h3>
          <p className="text-slate-600 dark:text-slate-400">Latest agent confidence scores and task results</p>
        </div>
        <div>
          <div className="space-y-4">
            {filteredLogs.slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{log.agentName}</span>
                    <span className="text-sm text-muted-foreground">{log.task}</span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{log.portal}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div 
                      className="text-lg font-bold"
                      style={{ color: getConfidenceColor(log.confidence) }}
                    >
                      {(log.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {log.duration}ms
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default ConfidenceLogChart;
