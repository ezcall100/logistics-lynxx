// ========================
// 🧪 QA Intelligence Dashboard
// ========================

import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { EnhancedButton } from '@/components/ui/EnhancedUIComponents';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, AlertTriangle, RefreshCw, Filter, Download, Eye, EyeOff, Zap, Target } from 'lucide-react';
import { confidenceLogger } from '@/services/confidence-logger';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ConfidenceData {
  agent_id: string;
  task_type: string;
  total_decisions: number;
  avg_confidence: number;
  min_confidence: number;
  max_confidence: number;
  low_confidence_count: number;
  high_confidence_count: number;
}

interface FailureData {
  agent_id: string;
  task_type: string;
  failure_type: string;
  failure_count: number;
  resolved_count: number;
  avg_resolution_hours: number;
}

interface PerformanceMetrics {
  agent_id: string;
  task_type: string;
  success_rate: number;
  avg_response_time_ms: number;
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  retry_count: number;
}

const QAIntelligence: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [selectedTaskType, setSelectedTaskType] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<number>(24);

  const [confidenceData, setConfidenceData] = useState<ConfidenceData[]>([]);
  const [failureData, setFailureData] = useState<FailureData[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceMetrics[]>([]);

  // ========================
  // Data Fetching
  // ========================
  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch confidence summary
      const confidenceSummary = await confidenceLogger.getConfidenceSummary(
        selectedAgent === 'all' ? undefined : selectedAgent,
        selectedTaskType === 'all' ? undefined : selectedTaskType,
        timeRange
      );

      // Fetch failure summary
      const failureSummary = await confidenceLogger.getFailureSummary(
        selectedAgent === 'all' ? undefined : selectedAgent,
        timeRange
      );

      // Fetch performance metrics
      const { data: performanceMetrics } = await fetch('/api/qa/performance-metrics').then(r => r.json());

      setConfidenceData(confidenceSummary || []);
      setFailureData(failureSummary || []);
      setPerformanceData(performanceMetrics || []);
    } catch (error) {
      console.error('❌ Failed to fetch QA data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========================
  // Auto-refresh
  // ========================
  useEffect(() => {
    fetchData();

    if (autoRefresh) {
      const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [selectedAgent, selectedTaskType, timeRange, autoRefresh]);

  // ========================
  // Chart Data Processing
  // ========================
  const confidenceChartData = confidenceData.map(item => ({
    name: item.task_type,
    'Average Confidence': parseFloat(item.avg_confidence.toFixed(2)),
    'Min Confidence': parseFloat(item.min_confidence.toFixed(2)),
    'Max Confidence': parseFloat(item.max_confidence.toFixed(2)),
  }));

  const failureChartData = failureData.map(item => ({
    name: `${item.task_type} - ${item.failure_type}`,
    'Failure Count': item.failure_count,
    'Resolved Count': item.resolved_count,
  }));

  const performanceChartData = performanceData.map(item => ({
    name: item.task_type,
    'Success Rate (%)': parseFloat(item.success_rate.toFixed(1)),
    'Avg Response Time (ms)': item.avg_response_time_ms,
  }));

  // ========================
  // Summary Statistics
  // ========================
  const totalDecisions = confidenceData.reduce((sum, item) => sum + item.total_decisions, 0);
  const avgConfidence = confidenceData.length > 0 
    ? confidenceData.reduce((sum, item) => sum + item.avg_confidence, 0) / confidenceData.length 
    : 0;
  const totalFailures = failureData.reduce((sum, item) => sum + item.failure_count, 0);
  const totalResolved = failureData.reduce((sum, item) => sum + item.resolved_count, 0);
  const resolutionRate = totalFailures > 0 ? (totalResolved / totalFailures) * 100 : 100;

  // ========================
  // Color Schemes
  // ========================
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.8) return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">High</span>;
    if (confidence >= 0.6) return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Medium</span>;
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Low</span>;
  };

  // ========================
  // Export Functions
  // ========================
  const exportData = (type: 'confidence' | 'failures' | 'performance') => {
    let data: any[] = [];
    let filename = '';

    switch (type) {
      case 'confidence':
        data = confidenceData;
        filename = 'agent-confidence-data.json';
        break;
      case 'failures':
        data = failureData;
        filename = 'agent-failure-data.json';
        break;
      case 'performance':
        data = performanceData;
        filename = 'agent-performance-data.json';
        break;
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading QA Intelligence data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🧪 QA Intelligence Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor MCP agent confidence, performance, and failure rates
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <EnhancedButton
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
          </EnhancedButton>
          <EnhancedButton
            variant="outline"
            size="sm"
            onClick={fetchData}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </EnhancedButton>
        </div>
      </div>

      {/* Filters */}
      <ResponsiveCard>
        <div className="mb-4">
          <h3 className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </h3>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Agent</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="mcp-agent-1">MCP Agent 1</SelectItem>
                  <SelectItem value="mcp-agent-2">MCP Agent 2</SelectItem>
                  <SelectItem value="cursor-agent-1">Cursor Agent 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Task Type</label>
              <Select value={selectedTaskType} onValueChange={setSelectedTaskType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="CreateInvoice">Create Invoice</SelectItem>
                  <SelectItem value="AssignLoad">Assign Load</SelectItem>
                  <SelectItem value="RouteOptimization">Route Optimization</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Time Range (hours)</label>
              <Select value={timeRange.toString()} onValueChange={(value) => setTimeRange(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="168">7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <EnhancedButton variant="outline" size="sm" onClick={() => exportData('confidence')}>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </EnhancedButton>
            </div>
          </div>
        </div>
      </ResponsiveCard>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ResponsiveCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Decisions</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">{totalDecisions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all agents and tasks
            </p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Average Confidence</h3>
            <Target className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className={`text-2xl font-bold ${getConfidenceColor(avgConfidence)}`}>
              {(avgConfidence * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {getConfidenceBadge(avgConfidence)}
            </p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Failures</h3>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">{totalFailures}</div>
            <p className="text-xs text-muted-foreground">
              {resolutionRate.toFixed(1)}% resolved
            </p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Active Agents</h3>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">
              {new Set(confidenceData.map(d => d.agent_id)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently monitored
            </p>
          </div>
        </ResponsiveCard>
      </div>

      {/* Charts and Tables */}
      <Tabs defaultValue="confidence" className="space-y-4">
        <TabsList>
          <TabsTrigger value="confidence">Confidence Analysis</TabsTrigger>
          <TabsTrigger value="failures">Failure Tracking</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="confidence" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Agent Confidence Trends</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Confidence scores by task type over the selected time period
              </p>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={confidenceChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 1]} />
                  <Tooltip formatter={(value) => [(value as number * 100).toFixed(1) + '%', 'Confidence']} />
                  <Legend />
                  <Line type="monotone" dataKey="Average Confidence" stroke="#0088FE" strokeWidth={2} />
                  <Line type="monotone" dataKey="Min Confidence" stroke="#FF8042" strokeWidth={2} />
                  <Line type="monotone" dataKey="Max Confidence" stroke="#00C49F" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ResponsiveCard>

          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Confidence Details</h3>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Type</TableHead>
                    <TableHead>Agent ID</TableHead>
                    <TableHead>Total Decisions</TableHead>
                    <TableHead>Avg Confidence</TableHead>
                    <TableHead>Low Confidence</TableHead>
                    <TableHead>High Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {confidenceData.map((item) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.task_type}</TableCell>
                      <TableCell className="font-mono text-sm">{item.agent_id}</TableCell>
                      <TableCell>{item.total_decisions}</TableCell>
                      <TableCell>
                        <span className={getConfidenceColor(item.avg_confidence)}>
                          {(item.avg_confidence * 100).toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-red-600">{item.low_confidence_count}</TableCell>
                      <TableCell className="text-green-600">{item.high_confidence_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResponsiveCard>
        </TabsContent>

        <TabsContent value="failures" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Failure Analysis</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Failure counts and resolution rates by task type
              </p>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={failureChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Failure Count" fill="#FF6B6B" />
                  <Bar dataKey="Resolved Count" fill="#4ECDC4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ResponsiveCard>

          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Failure Details</h3>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Type</TableHead>
                    <TableHead>Failure Type</TableHead>
                    <TableHead>Agent ID</TableHead>
                    <TableHead>Failure Count</TableHead>
                    <TableHead>Resolved Count</TableHead>
                    <TableHead>Avg Resolution (hrs)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {failureData.map((item) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.task_type}</TableCell>
                      <TableCell>{item.failure_type}</TableCell>
                      <TableCell className="font-mono text-sm">{item.agent_id}</TableCell>
                      <TableCell className="text-red-600">{item.failure_count}</TableCell>
                      <TableCell className="text-green-600">{item.resolved_count}</TableCell>
                      <TableCell>{item.avg_resolution_hours?.toFixed(1) || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResponsiveCard>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Performance Metrics</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Success rates and response times by task type
              </p>
            </div>
            <div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={performanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Success Rate (%)" fill="#4ECDC4" />
                  <Bar dataKey="Avg Response Time (ms)" fill="#45B7D1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ResponsiveCard>

          <ResponsiveCard>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Performance Details</h3>
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task Type</TableHead>
                    <TableHead>Agent ID</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Avg Response Time</TableHead>
                    <TableHead>Total Requests</TableHead>
                    <TableHead>Retry Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((item) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.task_type}</TableCell>
                      <TableCell className="font-mono text-sm">{item.agent_id}</TableCell>
                      <TableCell>
                        <span className={item.success_rate >= 90 ? 'text-green-600' : 'text-yellow-600'}>
                          {item.success_rate.toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell>{item.avg_response_time_ms}ms</TableCell>
                      <TableCell>{item.total_requests}</TableCell>
                      <TableCell>{item.retry_count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ResponsiveCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QAIntelligence;
