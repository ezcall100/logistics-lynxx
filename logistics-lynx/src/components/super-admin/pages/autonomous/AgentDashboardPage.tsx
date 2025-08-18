import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Icons
import { 
  Bot, Brain, Cpu, Activity, Zap, Shield, Database, Network,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Key, Wifi, HardDrive, Clock,
  AlertTriangle, CheckCircle, Info, TrendingUp, TrendingDown,
  Server, Cloud, GitPullRequest, GitCommit, GitMerge,
  Package, Docker, Kubernetes, Loader, Terminal, Workflow,
  Rocket, ShieldCheck, Monitor, BarChart3, ActivitySquare,
  Search, Table as TableIcon, Key as KeyIcon, Link,
  BarChart, PieChart, Target, Database as DatabaseIcon,
  Cpu as CpuIcon, HardDrive as HardDriveIcon, Wifi as WifiIcon,
  Clock as ClockIcon, Minus, ArrowUpRight, ArrowDownRight,
  Users, Settings as SettingsIcon, Workflow as WorkflowIcon
} from 'lucide-react';

// Enhanced data models with comprehensive typing
interface AutonomousAgent {
  id: string;
  name: string;
  type: 'ai' | 'ml' | 'nlp' | 'vision' | 'decision' | 'automation' | 'monitoring' | 'security';
  status: 'active' | 'idle' | 'busy' | 'error' | 'offline' | 'training' | 'learning';
  performance: number;
  accuracy: number;
  responseTime: number;
  uptime: number;
  lastActive: string;
  tasksCompleted: number;
  tasksFailed: number;
  memoryUsage: number;
  cpuUsage: number;
  version: string;
  environment: 'production' | 'staging' | 'development';
  capabilities: string[];
  assignedTasks: string[];
  learningProgress: number;
  modelSize: string;
  trainingData: string;
  lastTraining: string;
  nextTraining: string;
  errorRate: number;
  successRate: number;
}

interface AgentTask {
  id: string;
  agentId: string;
  taskType: 'analysis' | 'prediction' | 'classification' | 'optimization' | 'monitoring' | 'automation';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  inputData: string;
  outputData: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  progress: number;
  assignedTo: string;
  tags: string[];
  performance: number;
  accuracy: number;
}

interface AgentMetrics {
  id: string;
  agentId: string;
  timestamp: string;
  cpuUsage: number;
  memoryUsage: number;
  networkUsage: number;
  diskUsage: number;
  responseTime: number;
  throughput: number;
  errorCount: number;
  successCount: number;
  activeConnections: number;
  queueLength: number;
}

interface AgentConfiguration {
  id: string;
  agentId: string;
  name: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json' | 'array';
  category: 'performance' | 'security' | 'learning' | 'network' | 'storage';
  description: string;
  isRequired: boolean;
  isSecret: boolean;
  lastModified: string;
  modifiedBy: string;
}

// Form interfaces for CRUD operations
interface AgentFormData {
  name: string;
  type: AutonomousAgent['type'];
  version: string;
  environment: AutonomousAgent['environment'];
  capabilities: string[];
  modelSize: string;
  trainingData: string;
}

interface TaskFormData {
  agentId: string;
  taskType: AgentTask['taskType'];
  priority: AgentTask['priority'];
  description: string;
  inputData: string;
  assignedTo: string;
  tags: string[];
}

interface ConfigFormData {
  agentId: string;
  name: string;
  value: string;
  type: AgentConfiguration['type'];
  category: AgentConfiguration['category'];
  description: string;
  isRequired: boolean;
  isSecret: boolean;
}

// Enhanced Mock API functions with comprehensive CRUD operations
const mockAPI = {
  // Agent CRUD
  getAgents: (): Promise<AutonomousAgent[]> => Promise.resolve([
    {
      id: 'agent-001',
      name: 'AI Decision Engine',
      type: 'decision',
      status: 'active',
      performance: 95.2,
      accuracy: 98.5,
      responseTime: 45,
      uptime: 99.8,
      lastActive: '2024-01-15T10:30:00Z',
      tasksCompleted: 1250,
      tasksFailed: 12,
      memoryUsage: 68.5,
      cpuUsage: 45.2,
      version: 'v2.1.0',
      environment: 'production',
      capabilities: ['decision-making', 'risk-assessment', 'optimization'],
      assignedTasks: ['task-001', 'task-002'],
      learningProgress: 85,
      modelSize: '2.5GB',
      trainingData: '2024-01-10',
      lastTraining: '2024-01-10T08:00:00Z',
      nextTraining: '2024-01-17T08:00:00Z',
      errorRate: 0.8,
      successRate: 99.2
    },
    {
      id: 'agent-002',
      name: 'ML Prediction Model',
      type: 'ml',
      status: 'training',
      performance: 87.3,
      accuracy: 94.2,
      responseTime: 120,
      uptime: 98.5,
      lastActive: '2024-01-15T10:25:00Z',
      tasksCompleted: 890,
      tasksFailed: 25,
      memoryUsage: 85.2,
      cpuUsage: 78.5,
      version: 'v1.8.2',
      environment: 'production',
      capabilities: ['prediction', 'forecasting', 'pattern-recognition'],
      assignedTasks: ['task-003'],
      learningProgress: 65,
      modelSize: '4.2GB',
      trainingData: '2024-01-12',
      lastTraining: '2024-01-15T06:00:00Z',
      nextTraining: '2024-01-18T06:00:00Z',
      errorRate: 2.1,
      successRate: 97.9
    },
    {
      id: 'agent-003',
      name: 'NLP Processing Engine',
      type: 'nlp',
      status: 'busy',
      performance: 92.1,
      accuracy: 96.8,
      responseTime: 78,
      uptime: 99.9,
      lastActive: '2024-01-15T10:28:00Z',
      tasksCompleted: 2100,
      tasksFailed: 8,
      memoryUsage: 72.1,
      cpuUsage: 62.3,
      version: 'v2.0.1',
      environment: 'production',
      capabilities: ['text-processing', 'sentiment-analysis', 'language-detection'],
      assignedTasks: ['task-004', 'task-005'],
      learningProgress: 92,
      modelSize: '3.1GB',
      trainingData: '2024-01-08',
      lastTraining: '2024-01-08T10:00:00Z',
      nextTraining: '2024-01-15T10:00:00Z',
      errorRate: 0.4,
      successRate: 99.6
    },
    {
      id: 'agent-004',
      name: 'Computer Vision Agent',
      type: 'vision',
      status: 'idle',
      performance: 89.7,
      accuracy: 95.3,
      responseTime: 95,
      uptime: 99.5,
      lastActive: '2024-01-15T10:20:00Z',
      tasksCompleted: 1560,
      tasksFailed: 18,
      memoryUsage: 78.9,
      cpuUsage: 55.7,
      version: 'v1.9.5',
      environment: 'production',
      capabilities: ['image-recognition', 'object-detection', 'facial-analysis'],
      assignedTasks: [],
      learningProgress: 78,
      modelSize: '5.8GB',
      trainingData: '2024-01-05',
      lastTraining: '2024-01-05T14:00:00Z',
      nextTraining: '2024-01-12T14:00:00Z',
      errorRate: 1.2,
      successRate: 98.8
    },
    {
      id: 'agent-005',
      name: 'Security Monitoring Agent',
      type: 'security',
      status: 'active',
      performance: 96.8,
      accuracy: 99.1,
      responseTime: 32,
      uptime: 99.9,
      lastActive: '2024-01-15T10:30:00Z',
      tasksCompleted: 3200,
      tasksFailed: 5,
      memoryUsage: 45.2,
      cpuUsage: 38.7,
      version: 'v2.2.0',
      environment: 'production',
      capabilities: ['threat-detection', 'anomaly-detection', 'security-analysis'],
      assignedTasks: ['task-006', 'task-007', 'task-008'],
      learningProgress: 88,
      modelSize: '1.8GB',
      trainingData: '2024-01-14',
      lastTraining: '2024-01-14T20:00:00Z',
      nextTraining: '2024-01-21T20:00:00Z',
      errorRate: 0.2,
      successRate: 99.8
    }
  ]),
  
  createAgent: (agent: AgentFormData): Promise<AutonomousAgent> => 
    Promise.resolve({
      ...agent,
      id: `agent-${Date.now()}`,
      status: 'idle',
      performance: 0,
      accuracy: 0,
      responseTime: 0,
      uptime: 0,
      lastActive: new Date().toISOString(),
      tasksCompleted: 0,
      tasksFailed: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      assignedTasks: [],
      learningProgress: 0,
      lastTraining: new Date().toISOString(),
      nextTraining: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      errorRate: 0,
      successRate: 0
    }),
    
  updateAgent: (id: string, updates: Partial<AutonomousAgent>): Promise<AutonomousAgent> => 
    Promise.resolve({ id, ...updates } as AutonomousAgent),
    
  deleteAgent: (id: string): Promise<void> => Promise.resolve(),
  
  // Task CRUD
  getTasks: (): Promise<AgentTask[]> => Promise.resolve([
    {
      id: 'task-001',
      agentId: 'agent-001',
      taskType: 'analysis',
      status: 'completed',
      priority: 'high',
      description: 'Analyze system performance metrics for optimization',
      inputData: 'performance_logs_2024_01_15.json',
      outputData: 'analysis_report_v2.1.pdf',
      startedAt: '2024-01-15T09:00:00Z',
      completedAt: '2024-01-15T09:45:00Z',
      duration: 2700,
      progress: 100,
      assignedTo: 'AI Decision Engine',
      tags: ['performance', 'optimization', 'analysis'],
      performance: 95.2,
      accuracy: 98.5
    },
    {
      id: 'task-002',
      agentId: 'agent-001',
      taskType: 'optimization',
      status: 'running',
      priority: 'critical',
      description: 'Optimize database query performance',
      inputData: 'slow_queries_report.json',
      outputData: '',
      startedAt: '2024-01-15T10:00:00Z',
      progress: 65,
      assignedTo: 'AI Decision Engine',
      tags: ['database', 'optimization', 'performance'],
      performance: 87.3,
      accuracy: 94.2
    },
    {
      id: 'task-003',
      agentId: 'agent-002',
      taskType: 'prediction',
      status: 'pending',
      priority: 'medium',
      description: 'Predict system load for next 24 hours',
      inputData: 'historical_load_data.csv',
      outputData: '',
      startedAt: '2024-01-15T10:30:00Z',
      progress: 0,
      assignedTo: 'ML Prediction Model',
      tags: ['prediction', 'forecasting', 'load'],
      performance: 92.1,
      accuracy: 96.8
    }
  ]),
  
  createTask: (task: TaskFormData): Promise<AgentTask> => 
    Promise.resolve({
      ...task,
      id: `task-${Date.now()}`,
      status: 'pending',
      inputData: '',
      outputData: '',
      startedAt: new Date().toISOString(),
      progress: 0,
      performance: 0,
      accuracy: 0
    }),
    
  updateTask: (id: string, updates: Partial<AgentTask>): Promise<AgentTask> => 
    Promise.resolve({ id, ...updates } as AgentTask),
    
  deleteTask: (id: string): Promise<void> => Promise.resolve(),
  
  // Configuration CRUD
  getConfigurations: (): Promise<AgentConfiguration[]> => Promise.resolve([
    {
      id: 'config-001',
      agentId: 'agent-001',
      name: 'max_concurrent_tasks',
      value: '10',
      type: 'number',
      category: 'performance',
      description: 'Maximum number of concurrent tasks allowed',
      isRequired: true,
      isSecret: false,
      lastModified: '2024-01-15T08:00:00Z',
      modifiedBy: 'admin'
    },
    {
      id: 'config-002',
      agentId: 'agent-001',
      name: 'api_key',
      value: 'sk-************************',
      type: 'string',
      category: 'security',
      description: 'API key for external service integration',
      isRequired: true,
      isSecret: true,
      lastModified: '2024-01-14T16:00:00Z',
      modifiedBy: 'admin'
    }
  ]),
  
  createConfiguration: (config: ConfigFormData): Promise<AgentConfiguration> => 
    Promise.resolve({
      ...config,
      id: `config-${Date.now()}`,
      lastModified: new Date().toISOString(),
      modifiedBy: 'admin'
    }),
    
  updateConfiguration: (id: string, updates: Partial<AgentConfiguration>): Promise<AgentConfiguration> => 
    Promise.resolve({ id, ...updates } as AgentConfiguration),
    
  deleteConfiguration: (id: string): Promise<void> => Promise.resolve(),
  
  // Metrics
  getAgentMetrics: (agentId: string): Promise<AgentMetrics[]> => Promise.resolve([
    {
      id: 'metric-001',
      agentId,
      timestamp: '2024-01-15T10:30:00Z',
      cpuUsage: 45.2,
      memoryUsage: 68.5,
      networkUsage: 12.3,
      diskUsage: 34.7,
      responseTime: 45,
      throughput: 1250,
      errorCount: 2,
      successCount: 248,
      activeConnections: 15,
      queueLength: 3
    }
  ]),
  
  // Control functions
  startAgent: (id: string): Promise<void> => Promise.resolve(),
  stopAgent: (id: string): Promise<void> => Promise.resolve(),
  restartAgent: (id: string): Promise<void> => Promise.resolve(),
  trainAgent: (id: string): Promise<void> => Promise.resolve(),
  
  // Analytics
  getAgentAnalytics: (agentId: string): Promise<any> => Promise.resolve({
    performance: { daily: [], weekly: [], monthly: [] },
    accuracy: { daily: [], weekly: [], monthly: [] },
    tasks: { completed: 1250, failed: 12, pending: 5 },
    uptime: 99.8
  })
};

// Main Agent Dashboard Component
const AgentDashboardPage: React.FC = () => {
  const { toast } = useToast();
  
  // State management
  const [agents, setAgents] = useState<AutonomousAgent[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [configurations, setConfigurations] = useState<AgentConfiguration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState<AutonomousAgent | null>(null);
  
  // Form states
  const [showAgentForm, setShowAgentForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showConfigForm, setShowConfigForm] = useState(false);
  
  // Form data
  const [agentFormData, setAgentFormData] = useState<AgentFormData>({
    name: '',
    type: 'ai',
    version: 'v1.0.0',
    environment: 'production',
    capabilities: [],
    modelSize: '1GB',
    trainingData: new Date().toISOString().split('T')[0]
  });
  
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    agentId: '',
    taskType: 'analysis',
    priority: 'medium',
    description: '',
    inputData: '',
    assignedTo: '',
    tags: []
  });
  
  const [configFormData, setConfigFormData] = useState<ConfigFormData>({
    agentId: '',
    name: '',
    value: '',
    type: 'string',
    category: 'performance',
    description: '',
    isRequired: false,
    isSecret: false
  });

  // Load data on component mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [agentsData, tasksData, configsData] = await Promise.all([
        mockAPI.getAgents(),
        mockAPI.getTasks(),
        mockAPI.getConfigurations()
      ]);
      
      setAgents(agentsData);
      setTasks(tasksData);
      setConfigurations(configsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load agent data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations
  const handleCreateAgent = async () => {
    try {
      const newAgent = await mockAPI.createAgent(agentFormData);
      setAgents(prev => [...prev, newAgent]);
      setShowAgentForm(false);
      setAgentFormData({
        name: '',
        type: 'ai',
        version: 'v1.0.0',
        environment: 'production',
        capabilities: [],
        modelSize: '1GB',
        trainingData: new Date().toISOString().split('T')[0]
      });
      toast({
        title: "Success",
        description: "Autonomous agent created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create agent",
        variant: "destructive"
      });
    }
  };

  const handleCreateTask = async () => {
    try {
      const newTask = await mockAPI.createTask(taskFormData);
      setTasks(prev => [...prev, newTask]);
      setShowTaskForm(false);
      setTaskFormData({
        agentId: '',
        taskType: 'analysis',
        priority: 'medium',
        description: '',
        inputData: '',
        assignedTo: '',
        tags: []
      });
      toast({
        title: "Success",
        description: "Task created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive"
      });
    }
  };

  const handleCreateConfiguration = async () => {
    try {
      const newConfig = await mockAPI.createConfiguration(configFormData);
      setConfigurations(prev => [...prev, newConfig]);
      setShowConfigForm(false);
      setConfigFormData({
        agentId: '',
        name: '',
        value: '',
        type: 'string',
        category: 'performance',
        description: '',
        isRequired: false,
        isSecret: false
      });
      toast({
        title: "Success",
        description: "Configuration created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create configuration",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAgent = async (id: string) => {
    try {
      await mockAPI.deleteAgent(id);
      setAgents(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Success",
        description: "Agent deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete agent",
        variant: "destructive"
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await mockAPI.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast({
        title: "Success",
        description: "Task deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive"
      });
    }
  };

  const handleDeleteConfiguration = async (id: string) => {
    try {
      await mockAPI.deleteConfiguration(id);
      setConfigurations(prev => prev.filter(c => c.id !== id));
      toast({
        title: "Success",
        description: "Configuration deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete configuration",
        variant: "destructive"
      });
    }
  };

  // Control functions
  const handleStartAgent = async (id: string) => {
    try {
      await mockAPI.startAgent(id);
      setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'active' } : a));
      toast({
        title: "Success",
        description: "Agent started successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start agent",
        variant: "destructive"
      });
    }
  };

  const handleStopAgent = async (id: string) => {
    try {
      await mockAPI.stopAgent(id);
      setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'offline' } : a));
      toast({
        title: "Success",
        description: "Agent stopped successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stop agent",
        variant: "destructive"
      });
    }
  };

  const handleTrainAgent = async (id: string) => {
    try {
      await mockAPI.trainAgent(id);
      setAgents(prev => prev.map(a => a.id === id ? { ...a, status: 'training' } : a));
      toast({
        title: "Success",
        description: "Agent training started"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start training",
        variant: "destructive"
      });
    }
  };

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-blue-500';
      case 'busy': return 'bg-yellow-500';
      case 'training': return 'bg-purple-500';
      case 'error': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai': return <Brain className="h-4 w-4" />;
      case 'ml': return <Cpu className="h-4 w-4" />;
      case 'nlp': return <Code className="h-4 w-4" />;
      case 'vision': return <Eye className="h-4 w-4" />;
      case 'decision': return <Target className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'monitoring': return <Monitor className="h-4 w-4" />;
      case 'automation': return <Workflow className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <Loader className="h-6 w-6 animate-spin" />
          <span>Loading agent data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Autonomous Agent Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor AI agents, tasks, and configurations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={loadAllData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setShowAgentForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* Agent Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">
              {agents.filter(a => a.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <Workflow className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.filter(t => t.status === 'running').length}</div>
            <p className="text-xs text-muted-foreground">
              {tasks.filter(t => t.status === 'pending').length} pending
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(agents.reduce((acc, agent) => acc + agent.performance, 0) / agents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Across all agents
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(agents.reduce((acc, agent) => acc + agent.successRate, 0) / agents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Average across agents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="configurations">Configurations</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Agent Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>Agent Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {agents.slice(0, 5).map((agent) => (
                    <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                        <div>
                          <p className="font-medium text-sm">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{agent.performance}%</p>
                        <p className="text-xs text-muted-foreground">{agent.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Workflow className="h-5 w-5" />
                  <span>Recent Tasks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                        <div>
                          <p className="font-medium text-sm">{task.description}</p>
                          <p className="text-xs text-muted-foreground">{task.assignedTo}</p>
                        </div>
                      </div>
                      <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                        {task.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Autonomous Agents</h2>
            <Button onClick={() => setShowAgentForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(agent.type)}
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                    </div>
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {agent.status}
                    </Badge>
                  </div>
                  <CardDescription>Version {agent.version} • {agent.environment}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Performance</p>
                      <p className="font-medium">{agent.performance}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Accuracy</p>
                      <p className="font-medium">{agent.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-medium">{agent.responseTime}ms</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Uptime</p>
                      <p className="font-medium">{agent.uptime}%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Learning Progress</span>
                      <span>{agent.learningProgress}%</span>
                    </div>
                    <Progress value={agent.learningProgress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {agent.capabilities.slice(0, 2).map((cap, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cap}
                        </Badge>
                      ))}
                      {agent.capabilities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{agent.capabilities.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartAgent(agent.id)}
                        disabled={agent.status === 'active'}
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStopAgent(agent.id)}
                        disabled={agent.status === 'offline'}
                      >
                        <Pause className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTrainAgent(agent.id)}
                        disabled={agent.status === 'training'}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAgent(agent.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Agent Tasks</h2>
            <Button onClick={() => setShowTaskForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Agent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.description}</p>
                          <p className="text-sm text-muted-foreground">{task.taskType}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{task.assignedTo}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={task.progress} className="h-2 w-16" />
                          <span className="text-sm">{task.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(task.startedAt).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurations Tab */}
        <TabsContent value="configurations" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Agent Configurations</h2>
            <Button onClick={() => setShowConfigForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Configuration
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {configurations.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{config.name}</p>
                          <p className="text-sm text-muted-foreground">{config.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-mono">
                          {config.isSecret ? '••••••••' : config.value}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{config.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{config.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={config.isRequired ? 'default' : 'secondary'}>
                          {config.isRequired ? 'Yes' : 'No'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(config.lastModified).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteConfiguration(config.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Forms */}
      {/* Agent Form */}
      <Dialog open={showAgentForm} onOpenChange={setShowAgentForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Autonomous Agent</DialogTitle>
            <DialogDescription>
              Create a new autonomous AI agent.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-name" className="text-right">Name</Label>
              <Input
                id="agent-name"
                value={agentFormData.name}
                onChange={(e) => setAgentFormData(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
                placeholder="AI Decision Engine"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-type" className="text-right">Type</Label>
              <Select
                value={agentFormData.type}
                onValueChange={(value: any) => setAgentFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="ml">ML</SelectItem>
                  <SelectItem value="nlp">NLP</SelectItem>
                  <SelectItem value="vision">Vision</SelectItem>
                  <SelectItem value="decision">Decision</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-version" className="text-right">Version</Label>
              <Input
                id="agent-version"
                value={agentFormData.version}
                onChange={(e) => setAgentFormData(prev => ({ ...prev, version: e.target.value }))}
                className="col-span-3"
                placeholder="v1.0.0"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-environment" className="text-right">Environment</Label>
              <Select
                value={agentFormData.environment}
                onValueChange={(value: any) => setAgentFormData(prev => ({ ...prev, environment: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="agent-model-size" className="text-right">Model Size</Label>
              <Input
                id="agent-model-size"
                value={agentFormData.modelSize}
                onChange={(e) => setAgentFormData(prev => ({ ...prev, modelSize: e.target.value }))}
                className="col-span-3"
                placeholder="2.5GB"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAgentForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateAgent}>
              Create Agent
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task Form */}
      <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Agent Task</DialogTitle>
            <DialogDescription>
              Create a new task for an autonomous agent.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-agent" className="text-right">Agent</Label>
              <Select
                value={taskFormData.agentId}
                onValueChange={(value: any) => setTaskFormData(prev => ({ ...prev, agentId: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-type" className="text-right">Type</Label>
              <Select
                value={taskFormData.taskType}
                onValueChange={(value: any) => setTaskFormData(prev => ({ ...prev, taskType: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analysis">Analysis</SelectItem>
                  <SelectItem value="prediction">Prediction</SelectItem>
                  <SelectItem value="classification">Classification</SelectItem>
                  <SelectItem value="optimization">Optimization</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-priority" className="text-right">Priority</Label>
              <Select
                value={taskFormData.priority}
                onValueChange={(value: any) => setTaskFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="task-description" className="text-right">Description</Label>
              <Textarea
                id="task-description"
                value={taskFormData.description}
                onChange={(e) => setTaskFormData(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Task description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTaskForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask}>
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Configuration Form */}
      <Dialog open={showConfigForm} onOpenChange={setShowConfigForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Agent Configuration</DialogTitle>
            <DialogDescription>
              Add a new configuration for an autonomous agent.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="config-agent" className="text-right">Agent</Label>
              <Select
                value={configFormData.agentId}
                onValueChange={(value: any) => setConfigFormData(prev => ({ ...prev, agentId: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="config-name" className="text-right">Name</Label>
              <Input
                id="config-name"
                value={configFormData.name}
                onChange={(e) => setConfigFormData(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
                placeholder="max_concurrent_tasks"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="config-value" className="text-right">Value</Label>
              <Input
                id="config-value"
                value={configFormData.value}
                onChange={(e) => setConfigFormData(prev => ({ ...prev, value: e.target.value }))}
                className="col-span-3"
                placeholder="10"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="config-type" className="text-right">Type</Label>
              <Select
                value={configFormData.type}
                onValueChange={(value: any) => setConfigFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="config-category" className="text-right">Category</Label>
              <Select
                value={configFormData.category}
                onValueChange={(value: any) => setConfigFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="config-description" className="text-right">Description</Label>
              <Textarea
                id="config-description"
                value={configFormData.description}
                onChange={(e) => setConfigFormData(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Configuration description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Options</Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="config-required"
                    checked={configFormData.isRequired}
                    onCheckedChange={(checked) => setConfigFormData(prev => ({ ...prev, isRequired: checked }))}
                  />
                  <Label htmlFor="config-required">Required</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="config-secret"
                    checked={configFormData.isSecret}
                    onCheckedChange={(checked) => setConfigFormData(prev => ({ ...prev, isSecret: checked }))}
                  />
                  <Label htmlFor="config-secret">Secret</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfigForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateConfiguration}>
              Add Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentDashboardPage;
