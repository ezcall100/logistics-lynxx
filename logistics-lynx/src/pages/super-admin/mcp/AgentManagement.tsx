import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Activity, 
  Play, 
  Pause, 
  Plus, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  Network,
  Database,
  Code,
  Brain,
  BarChart3,
  Users,
  Lock,
  Eye,
  Upload,
  GitBranch,
  Workflow,
  Target,
  TrendingUp,
  AlertTriangle,
  Info,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { EnhancedCard } from '@/components/ui/EnhancedUIComponents';

interface Agent {
  id: string;
  name: string;
  type: 'frontend-dev' | 'backend-api' | 'mcp-kernel' | 'uiux' | 'ml' | 'data-pipeline' | 'automation' | 'integration' | 'qa' | 'security' | 'compliance' | 'support' | 'onboarding' | 'feedback';
  status: 'active' | 'idle' | 'busy' | 'error' | 'offline' | 'deploying' | 'training';
  health: number;
  cpu: number;
  memory: number;
  tasksCompleted: number;
  tasksFailed: number;
  uptime: number;
  lastActivity: Date;
  version: string;
  environment: 'development' | 'staging' | 'production';
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  capabilities: string[];
  assignedTasks: string[];
  performance: {
    responseTime: number;
    throughput: number;
    errorRate: number;
    availability: number;
  };
  location: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  assignedAgent: string;
  estimatedDuration: number;
  actualDuration?: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  tags: string[];
  dependencies: string[];
}

const AgentManagement: React.FC = () => {
  const [mode] = useState<'light' | 'dark'>('light');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockAgents: Agent[] = [
      {
        id: 'agent-001',
        name: 'Frontend Dev Agent',
        type: 'frontend-dev',
        status: 'active',
        health: 95,
        cpu: 45,
        memory: 67,
        tasksCompleted: 1247,
        tasksFailed: 3,
        uptime: 86400,
        lastActivity: new Date(),
        version: '2.1.0',
        environment: 'production',
        securityLevel: 'high',
        capabilities: ['React', 'TypeScript', 'UI/UX', 'Component Development'],
        assignedTasks: ['task-001', 'task-002'],
        performance: {
          responseTime: 120,
          throughput: 150,
          errorRate: 0.2,
          availability: 99.8
        },
        location: 'US-East-1',
        owner: 'Super Admin',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date()
      },
      {
        id: 'agent-002',
        name: 'Backend API Agent',
        type: 'backend-api',
        status: 'busy',
        health: 88,
        cpu: 78,
        memory: 82,
        tasksCompleted: 2156,
        tasksFailed: 12,
        uptime: 172800,
        lastActivity: new Date(),
        version: '1.9.5',
        environment: 'production',
        securityLevel: 'critical',
        capabilities: ['Node.js', 'Express', 'Database', 'API Design'],
        assignedTasks: ['task-003', 'task-004', 'task-005'],
        performance: {
          responseTime: 85,
          throughput: 320,
          errorRate: 0.5,
          availability: 99.9
        },
        location: 'US-West-2',
        owner: 'Super Admin',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date()
      },
      {
        id: 'agent-003',
        name: 'MCP Kernel Agent',
        type: 'mcp-kernel',
        status: 'active',
        health: 100,
        cpu: 23,
        memory: 34,
        tasksCompleted: 892,
        tasksFailed: 0,
        uptime: 259200,
        lastActivity: new Date(),
        version: '3.0.1',
        environment: 'production',
        securityLevel: 'critical',
        capabilities: ['Orchestration', 'Task Distribution', 'Load Balancing'],
        assignedTasks: ['task-006'],
        performance: {
          responseTime: 45,
          throughput: 500,
          errorRate: 0.0,
          availability: 100.0
        },
        location: 'Global',
        owner: 'Super Admin',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date()
      }
    ];

    const mockTasks: Task[] = [
      {
        id: 'task-001',
        name: 'UI Component Refactoring',
        description: 'Refactor dashboard components for better performance',
        priority: 'high',
        status: 'running',
        assignedAgent: 'agent-001',
        estimatedDuration: 3600,
        actualDuration: 1800,
        createdAt: new Date('2024-01-20'),
        startedAt: new Date('2024-01-20T10:00:00'),
        tags: ['frontend', 'refactoring', 'performance'],
        dependencies: []
      },
      {
        id: 'task-002',
        name: 'API Endpoint Optimization',
        description: 'Optimize user management API endpoints',
        priority: 'medium',
        status: 'pending',
        assignedAgent: 'agent-002',
        estimatedDuration: 7200,
        createdAt: new Date('2024-01-20'),
        tags: ['backend', 'optimization', 'api'],
        dependencies: ['task-001']
      }
    ];

    setAgents(mockAgents);
    setTasks(mockTasks);
    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'idle': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      case 'deploying': return 'bg-purple-500';
      case 'training': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'busy': return <Activity className="w-4 h-4" />;
      case 'idle': return <Clock className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'offline': return <Square className="w-4 h-4" />;
      case 'deploying': return <Upload className="w-4 h-4" />;
      case 'training': return <Brain className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'frontend-dev': return <Code className="w-5 h-5" />;
      case 'backend-api': return <Database className="w-5 h-5" />;
      case 'mcp-kernel': return <Zap className="w-5 h-5" />;
      case 'uiux': return <Users className="w-5 h-5" />;
      case 'ml': return <Brain className="w-5 h-5" />;
      case 'data-pipeline': return <Workflow className="w-5 h-5" />;
      case 'automation': return <Target className="w-5 h-5" />;
      case 'integration': return <Network className="w-5 h-5" />;
      case 'qa': return <BarChart3 className="w-5 h-5" />;
      case 'security': return <Shield className="w-5 h-5" />;
      case 'compliance': return <Lock className="w-5 h-5" />;
      case 'support': return <Users className="w-5 h-5" />;
      case 'onboarding': return <GitBranch className="w-5 h-5" />;
      case 'feedback': return <AlertTriangle className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesType = typeFilter === 'all' || agent.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAgentAction = (agentId: string, action: string) => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        switch (action) {
          case 'start':
            return { ...agent, status: 'active' as const };
          case 'pause':
            return { ...agent, status: 'idle' as const };
          case 'stop':
            return { ...agent, status: 'offline' as const };
          case 'restart':
            return { ...agent, status: 'deploying' as const };
          default:
            return agent;
        }
      }
      return agent;
    }));
  };

  const systemMetrics = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    busyAgents: agents.filter(a => a.status === 'busy').length,
    errorAgents: agents.filter(a => a.status === 'error').length,
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    failedTasks: tasks.filter(t => t.status === 'failed').length,
    avgResponseTime: agents.reduce((sum, agent) => sum + agent.performance.responseTime, 0) / agents.length,
    avgAvailability: agents.reduce((sum, agent) => sum + agent.performance.availability, 0) / agents.length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">MCP Agent Management</h1>
          <p className="text-muted-foreground">
            Orchestrate and monitor autonomous MCP agents across the system
          </p>
        </div>
        <div className="flex space-x-3">
                     <Button variant="outline">
             <Plus className="w-4 h-4 mr-2" />
             Deploy Agent
           </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Agents</p>
              <p className="text-2xl font-bold">{systemMetrics.totalAgents}</p>
            </div>
          </div>
        </EnhancedCard>

        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
              <p className="text-2xl font-bold">{systemMetrics.activeAgents}</p>
            </div>
          </div>
        </EnhancedCard>

        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
              <p className="text-2xl font-bold">{systemMetrics.avgResponseTime.toFixed(0)}ms</p>
            </div>
          </div>
        </EnhancedCard>

        <EnhancedCard mode={mode} elevated>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Availability</p>
              <p className="text-2xl font-bold">{systemMetrics.avgAvailability.toFixed(1)}%</p>
            </div>
          </div>
        </EnhancedCard>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="agents">Agent Overview</TabsTrigger>
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
          <TabsTrigger value="performance">Performance Analytics</TabsTrigger>
          <TabsTrigger value="security">Security & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex gap-2">
                             <Select value={statusFilter} onValueChange={setStatusFilter}>
                 <SelectTrigger>
                   <SelectValue placeholder="Status" />
                 </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
                             <Select value={typeFilter} onValueChange={setTypeFilter}>
                 <SelectTrigger>
                   <SelectValue placeholder="Type" />
                 </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="frontend-dev">Frontend Dev</SelectItem>
                  <SelectItem value="backend-api">Backend API</SelectItem>
                  <SelectItem value="mcp-kernel">MCP Kernel</SelectItem>
                  <SelectItem value="uiux">UI/UX</SelectItem>
                  <SelectItem value="ml">ML</SelectItem>
                  <SelectItem value="data-pipeline">Data Pipeline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <EnhancedCard key={agent.id} mode={mode} elevated>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getAgentIcon(agent.type)}
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-2">
                          <Badge variant="outline">{agent.type}</Badge>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                          <span className="text-sm capitalize">{agent.status}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(agent.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Health and Performance */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Health</span>
                      <span className="font-medium">{agent.health}%</span>
                    </div>
                    <Progress value={agent.health} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">CPU</span>
                      <div className="font-medium">{agent.cpu}%</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Memory</span>
                      <div className="font-medium">{agent.memory}%</div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tasks Completed</span>
                      <span className="font-medium text-green-600">{agent.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tasks Failed</span>
                      <span className="font-medium text-red-600">{agent.tasksFailed}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span className="font-medium">{Math.floor(agent.uptime / 3600)}h</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                                         <Button
                       size="sm"
                       variant="outline"
                     >
                       <Eye className="w-4 h-4 mr-1" />
                       Details
                     </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAgentAction(agent.id, 'restart')}
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Restart
                    </Button>
                    {agent.status === 'active' ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAgentAction(agent.id, 'pause')}
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAgentAction(agent.id, 'start')}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    )}
                  </div>
                </CardContent>
              </EnhancedCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <EnhancedCard mode={mode} elevated>
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <CardDescription>
                Monitor and manage tasks assigned to MCP agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <h4 className="font-medium">{task.name}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={task.priority === 'critical' ? 'destructive' : 'outline'}>
                            {task.priority}
                          </Badge>
                          <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {task.estimatedDuration / 3600}h
                      </span>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </EnhancedCard>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <EnhancedCard mode={mode} elevated>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Real-time performance metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Response Time Trends</h4>
                  <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Chart Placeholder</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Throughput Analysis</h4>
                  <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Chart Placeholder</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </EnhancedCard>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <EnhancedCard mode={mode} elevated>
            <CardHeader>
              <CardTitle>Security & Compliance</CardTitle>
              <CardDescription>
                Agent security status and compliance monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getAgentIcon(agent.type)}
                      <div>
                        <h4 className="font-medium">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={agent.securityLevel === 'critical' ? 'destructive' : 'outline'}>
                        {agent.securityLevel}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Shield className="w-4 h-4 mr-1" />
                        Security
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </EnhancedCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentManagement;
