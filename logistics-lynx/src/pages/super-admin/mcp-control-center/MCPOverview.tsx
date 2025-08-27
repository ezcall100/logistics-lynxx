import React, { useState, useEffect } from 'react';
import { EnhancedButton } from '@/components/ui/EnhancedUIComponents';
import { Cpu, Brain, Zap, Settings, Play, Pause, RefreshCw, Download, Plus, Database,  } from 'lucide-react';
import { 
  EnhancedCard, 
  EnhancedButton, 
  EnhancedBadge, 
  EnhancedTable, 
  EnhancedSearch, 
  EnhancedProgress, 
  stableStyles 
} from '../../../components/ui/EnhancedUIComponents';

interface AIAgent {
  id: string;
  name: string;
  type: 'autonomous' | 'assistant' | 'analytics' | 'automation' | 'monitoring';
  status: 'active' | 'inactive' | 'training' | 'error' | 'maintenance';
  performance: number;
  accuracy: number;
  uptime: number;
  lastActivity: string;
  tasksCompleted: number;
  tasksFailed: number;
  memoryUsage: number;
  cpuUsage: number;
  description: string;
  capabilities: string[];
  version: string;
  lastUpdated: string;
}

interface MLModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering' | 'nlp' | 'computer_vision';
  status: 'training' | 'deployed' | 'testing' | 'archived' | 'error';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingProgress: number;
  lastTrained: string;
  nextTraining: string;
  version: string;
  description: string;
  dataset: string;
  algorithm: string;
}

interface DataPipeline {
  id: string;
  name: string;
  type: 'etl' | 'streaming' | 'batch' | 'real_time';
  status: 'running' | 'stopped' | 'error' | 'maintenance';
  throughput: number;
  latency: number;
  errorRate: number;
  lastRun: string;
  nextRun: string;
  recordsProcessed: number;
  recordsFailed: number;
  description: string;
  source: string;
  destination: string;
  schedule: string;
}

interface AutomationRule {
  id: string;
  name: string;
  type: 'workflow' | 'decision' | 'notification' | 'integration';
  status: 'active' | 'inactive' | 'testing' | 'error';
  triggers: string[];
  actions: string[];
  conditions: string[];
  lastExecuted: string;
  executionCount: number;
  successRate: number;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const MCPOverview: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [aiAgents, setAIAgents] = useState<AIAgent[]>([]);
  const [mlModels, setMLModels] = useState<MLModel[]>([]);
  const [dataPipelines, setDataPipelines] = useState<DataPipeline[]>([]);
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AIAgent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockAIAgents: AIAgent[] = [
    {
      id: '1',
      name: 'Autonomous Load Matcher',
      type: 'autonomous',
      status: 'active',
      performance: 94.5,
      accuracy: 92.3,
      uptime: 99.8,
      lastActivity: '2024-01-15 14:30:00',
      tasksCompleted: 1247,
      tasksFailed: 23,
      memoryUsage: 67,
      cpuUsage: 45,
      description: 'AI agent for matching loads with carriers automatically',
      capabilities: ['load_matching', 'route_optimization', 'pricing_analysis'],
      version: '2.1.0',
      lastUpdated: '2024-01-15 10:00:00'
    },
    {
      id: '2',
      name: 'Predictive Analytics Engine',
      type: 'analytics',
      status: 'active',
      performance: 89.2,
      accuracy: 87.6,
      uptime: 99.9,
      lastActivity: '2024-01-15 14:25:00',
      tasksCompleted: 892,
      tasksFailed: 15,
      memoryUsage: 78,
      cpuUsage: 62,
      description: 'Predictive analytics for demand forecasting and pricing',
      capabilities: ['demand_forecasting', 'price_prediction', 'trend_analysis'],
      version: '1.8.2',
      lastUpdated: '2024-01-14 16:30:00'
    },
    {
      id: '3',
      name: 'Customer Service Assistant',
      type: 'assistant',
      status: 'training',
      performance: 76.8,
      accuracy: 82.1,
      uptime: 98.5,
      lastActivity: '2024-01-15 14:20:00',
      tasksCompleted: 567,
      tasksFailed: 45,
      memoryUsage: 45,
      cpuUsage: 38,
      description: 'AI-powered customer service and support assistant',
      capabilities: ['customer_support', 'query_resolution', 'ticket_routing'],
      version: '1.5.1',
      lastUpdated: '2024-01-15 08:00:00'
    }
  ];

  const mockMLModels: MLModel[] = [
    {
      id: '1',
      name: 'Load Classification Model',
      type: 'classification',
      status: 'deployed',
      accuracy: 94.2,
      precision: 92.8,
      recall: 95.1,
      f1Score: 93.9,
      trainingProgress: 100,
      lastTrained: '2024-01-14 12:00:00',
      nextTraining: '2024-01-21 12:00:00',
      version: '3.2.1',
      description: 'Classifies loads by type, urgency, and requirements',
      dataset: 'load_data_v3.2',
      algorithm: 'Random Forest'
    },
    {
      id: '2',
      name: 'Price Prediction Model',
      type: 'regression',
      status: 'training',
      accuracy: 87.5,
      precision: 85.2,
      recall: 88.9,
      f1Score: 87.0,
      trainingProgress: 65,
      lastTrained: '2024-01-15 10:00:00',
      nextTraining: '2024-01-15 16:00:00',
      version: '2.8.0',
      description: 'Predicts optimal pricing for loads and routes',
      dataset: 'pricing_data_v2.8',
      algorithm: 'XGBoost'
    }
  ];

  const mockDataPipelines: DataPipeline[] = [
    {
      id: '1',
      name: 'Real-time Load Data Pipeline',
      type: 'streaming',
      status: 'running',
      throughput: 1250,
      latency: 45,
      errorRate: 0.02,
      lastRun: '2024-01-15 14:30:00',
      nextRun: 'Continuous',
      recordsProcessed: 1250000,
      recordsFailed: 250,
      description: 'Processes real-time load data from multiple sources',
      source: 'API Endpoints',
      destination: 'Data Warehouse',
      schedule: 'Real-time'
    },
    {
      id: '2',
      name: 'Daily Analytics Pipeline',
      type: 'batch',
      status: 'running',
      throughput: 5000,
      latency: 120,
      errorRate: 0.01,
      lastRun: '2024-01-15 06:00:00',
      nextRun: '2024-01-16 06:00:00',
      recordsProcessed: 500000,
      recordsFailed: 50,
      description: 'Daily batch processing for analytics and reporting',
      source: 'Data Lake',
      destination: 'Analytics Database',
      schedule: 'Daily 6 AM'
    }
  ];

  const mockAutomationRules: AutomationRule[] = [
    {
      id: '1',
      name: 'Load Auto-Assignment',
      type: 'workflow',
      status: 'active',
      triggers: ['new_load_created', 'carrier_available'],
      actions: ['match_load_carrier', 'send_notification', 'update_status'],
      conditions: ['load_priority_high', 'carrier_rating_good'],
      lastExecuted: '2024-01-15 14:30:00',
      executionCount: 1247,
      successRate: 94.5,
      description: 'Automatically assigns loads to available carriers',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Price Alert System',
      type: 'notification',
      status: 'active',
      triggers: ['price_change', 'market_volatility'],
      actions: ['send_email_alert', 'update_dashboard', 'log_event'],
      conditions: ['price_change_threshold', 'market_conditions'],
      lastExecuted: '2024-01-15 14:25:00',
      executionCount: 89,
      successRate: 98.9,
      description: 'Sends alerts for significant price changes',
      priority: 'medium'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAIAgents(mockAIAgents);
      setMLModels(mockMLModels);
      setDataPipelines(mockDataPipelines);
      setAutomationRules(mockAutomationRules);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
      case 'deployed':
      case 'running':
        return <EnhancedBadge variant="success" mode={mode}>Active</EnhancedBadge>;
      case 'inactive':
      case 'stopped':
        return <EnhancedBadge variant="default" mode={mode}>Inactive</EnhancedBadge>;
      case 'training':
        return <EnhancedBadge variant="warning" mode={mode}>Training</EnhancedBadge>;
      case 'error':
        return <EnhancedBadge variant="danger" mode={mode}>Error</EnhancedBadge>;
      case 'maintenance':
        return <EnhancedBadge variant="warning" mode={mode}>Maintenance</EnhancedBadge>;
      case 'testing':
        return <EnhancedBadge variant="default" mode={mode}>Testing</EnhancedBadge>;
      case 'archived':
        return <EnhancedBadge variant="default" mode={mode}>Archived</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'autonomous':
        return <EnhancedBadge variant="premium" mode={mode}>Autonomous</EnhancedBadge>;
      case 'assistant':
        return <EnhancedBadge variant="success" mode={mode}>Assistant</EnhancedBadge>;
      case 'analytics':
        return <EnhancedBadge variant="default" mode={mode}>Analytics</EnhancedBadge>;
      case 'automation':
        return <EnhancedBadge variant="warning" mode={mode}>Automation</EnhancedBadge>;
      case 'monitoring':
        return <EnhancedBadge variant="default" mode={mode}>Monitoring</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>{type}</EnhancedBadge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'critical':
        return <EnhancedBadge variant="danger" mode={mode}>Critical</EnhancedBadge>;
      case 'high':
        return <EnhancedBadge variant="warning" mode={mode}>High</EnhancedBadge>;
      case 'medium':
        return <EnhancedBadge variant="default" mode={mode}>Medium</EnhancedBadge>;
      case 'low':
        return <EnhancedBadge variant="default" mode={mode}>Low</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const aiAgentColumns = [
    {
      key: 'name',
      title: 'Agent Name',
      sortable: true,
      render: (value: string, row: AIAgent) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.name}
          </div>
          <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
            v{row.version}
          </div>
        </div>
      )
    },
    {
      key: 'type',
      title: '',
      sortable: true,
      render: (value: string) => getTypeBadge(value)
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'performance',
      title: 'Performance',
      sortable: true,
      render: (value: number, row: AIAgent) => (
        <div>
          <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.performance}%
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.accuracy}% accuracy
          </div>
        </div>
      )
    },
    {
      key: 'tasksCompleted',
      title: 'Tasks',
      sortable: true,
      render: (value: number, row: AIAgent) => (
        <div>
          <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.tasksCompleted}
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.tasksFailed} failed
          </div>
        </div>
      )
    },
    {
      key: 'lastActivity',
      title: 'Last Activity',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    }
  ];

  const mlModelColumns = [
    {
      key: 'name',
      title: 'Model Name',
      sortable: true,
      render: (value: string, row: MLModel) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.name}
          </div>
          <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
            {row.algorithm}
          </div>
        </div>
      )
    },
    {
      key: 'type',
      title: '',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
          {value.replace('_', ' ').toUpperCase()}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string, row: MLModel) => (
        <div>
          {getStatusBadge(value)}
          {row.status === 'training' && (
            <div className="mt-1">
              <EnhancedProgress
                value={row.trainingProgress}
                max={100}
                mode={mode}
                variant="warning"
                size="sm"
              />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'accuracy',
      title: 'Metrics',
      sortable: true,
      render: (value: number, row: MLModel) => (
        <div>
          <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.accuracy}% accuracy
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            F1: {row.f1Score}
          </div>
        </div>
      )
    },
    {
      key: 'lastTrained',
      title: 'Last Trained',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleDateString()}
        </div>
      )
    }
  ];

  const pipelineColumns = [
    {
      key: 'name',
      title: 'Pipeline Name',
      sortable: true,
      render: (value: string, row: DataPipeline) => (
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
      key: 'throughput',
      title: 'Performance',
      sortable: true,
      render: (value: number, row: DataPipeline) => (
        <div>
          <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.throughput}/sec
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.latency}ms latency
          </div>
        </div>
      )
    },
    {
      key: 'recordsProcessed',
      title: 'Records',
      sortable: true,
      render: (value: number, row: DataPipeline) => (
        <div>
          <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.recordsProcessed.toLocaleString()}
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.recordsFailed} failed
          </div>
        </div>
      )
    },
    {
      key: 'lastRun',
      title: 'Last Run',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    }
  ];

  const automationColumns = [
    {
      key: 'name',
      title: 'Rule Name',
      sortable: true,
      render: (value: string, row: AutomationRule) => (
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
      key: 'priority',
      title: 'Priority',
      sortable: true,
      render: (value: string) => getPriorityBadge(value)
    },
    {
      key: 'executionCount',
      title: 'Executions',
      sortable: true,
      render: (value: number, row: AutomationRule) => (
        <div>
          <div className={`text-sm font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.executionCount}
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.successRate}% success
          </div>
        </div>
      )
    },
    {
      key: 'lastExecuted',
      title: 'Last Executed',
      sortable: true,
      render: (value: string) => (
        <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
          {new Date(value).toLocaleString()}
        </div>
      )
    }
  ];

  const systemMetrics = {
    totalAgents: aiAgents.length,
    activeAgents: aiAgents.filter(a => a.status === 'active').length,
    totalModels: mlModels.length,
    deployedModels: mlModels.filter(m => m.status === 'deployed').length,
    totalPipelines: dataPipelines.length,
    runningPipelines: dataPipelines.filter(p => p.status === 'running').length,
    totalRules: automationRules.length,
    activeRules: automationRules.filter(r => r.status === 'active').length
  };

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              MCP Control Center
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              AI Agent Management & Autonomous System Control
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
            >
              Export Data
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
              icon={<Play className="w-4 h-4" />}
              mode={mode}
            >
              Start All Systems
            </EnhancedButton>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${stableStyles.textSecondary[mode]}`}>
                  AI Agents
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {systemMetrics.totalAgents}
                </p>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>
                  {systemMetrics.activeAgents} active
                </p>
              </div>
              <Brain className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(systemMetrics.activeAgents / systemMetrics.totalAgents) * 100}
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
                  ML Models
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {systemMetrics.totalModels}
                </p>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>
                  {systemMetrics.deployedModels} deployed
                </p>
              </div>
              <Cpu className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(systemMetrics.deployedModels / systemMetrics.totalModels) * 100}
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
                  Data Pipelines
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {systemMetrics.totalPipelines}
                </p>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>
                  {systemMetrics.runningPipelines} running
                </p>
              </div>
              <Database className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(systemMetrics.runningPipelines / systemMetrics.totalPipelines) * 100}
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
                  Automation Rules
                </p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {systemMetrics.totalRules}
                </p>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>
                  {systemMetrics.activeRules} active
                </p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress
                value={(systemMetrics.activeRules / systemMetrics.totalRules) * 100}
                max={100}
                mode={mode}
                variant="success"
              />
            </div>
          </EnhancedCard>
        </div>

        {/* AI Agents */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
              AI Agents
            </h2>
            <div className="flex space-x-2">
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                mode={mode}
              >
                Add Agent
              </EnhancedButton>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Settings className="w-4 h-4" />}
                mode={mode}
              >
                Configure
              </EnhancedButton>
            </div>
          </div>
          
          <EnhancedTable
            columns={aiAgentColumns}
            data={aiAgents}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No AI agents found"
          />
        </EnhancedCard>

        {/* ML Models and Data Pipelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ML Models */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                Machine Learning Models
              </h2>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Cpu className="w-4 h-4" />}
                mode={mode}
              >
                Train New
              </EnhancedButton>
            </div>
            
            <EnhancedTable
              columns={mlModelColumns}
              data={mlModels}
              mode={mode}
              sortable
              loading={loading}
              emptyMessage="No ML models found"
            />
          </EnhancedCard>

          {/* Data Pipelines */}
          <EnhancedCard mode={mode} elevated>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
                Data Pipelines
              </h2>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Database className="w-4 h-4" />}
                mode={mode}
              >
                Create Pipeline
              </EnhancedButton>
            </div>
            
            <EnhancedTable
              columns={pipelineColumns}
              data={dataPipelines}
              mode={mode}
              sortable
              loading={loading}
              emptyMessage="No data pipelines found"
            />
          </EnhancedCard>
        </div>

        {/* Automation Rules */}
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]}`}>
              Automation Rules
            </h2>
            <div className="flex space-x-2">
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Plus className="w-4 h-4" />}
                mode={mode}
              >
                Add Rule
              </EnhancedButton>
              <EnhancedButton
                variant="secondary"
                size="sm"
                icon={<Zap className="w-4 h-4" />}
                mode={mode}
              >
                Test Rules
              </EnhancedButton>
            </div>
          </div>
          
          <EnhancedTable
            columns={automationColumns}
            data={automationRules}
            mode={mode}
            sortable
            loading={loading}
            emptyMessage="No automation rules found"
          />
        </EnhancedCard>

        {/* Quick Actions */}
        <EnhancedCard mode={mode} elevated>
          <h2 className={`text-xl font-semibold ${stableStyles.textPrimary[mode]} mb-6`}>
            System Controls
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Play className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Start All</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Pause className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Pause All</span>
            </EnhancedButton>
            
                         <EnhancedButton
               variant="secondary"
               size="sm"
               icon={<Pause className="w-4 h-4" />}
               mode={mode}
               className="flex-col h-20"
             >
               <span className="text-xs">Stop All</span>
             </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<RefreshCw className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Restart</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Settings className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Configure</span>
            </EnhancedButton>
            
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
              className="flex-col h-20"
            >
              <span className="text-xs">Export Logs</span>
            </EnhancedButton>
          </div>
        </EnhancedCard>
      </div>
    </div>
  );
};

export default MCPOverview;
