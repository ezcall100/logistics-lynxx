/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { 
  Activity, 
  Brain, 
  Code, 
  Database, 
  Eye, 
  GitBranch, 
  Globe, 
  Monitor, 
  Play, 
  Pause, 
  RefreshCw, 
  Settings, 
  Shield, 
  Terminal, 
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Power,
  PowerOff,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  ArrowLeft,
  Home
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: 'research' | 'frontend' | 'backend' | 'database' | 'testing' | 'ai' | 'monitoring';
  status: 'active' | 'idle' | 'working' | 'optimizing' | 'failed' | 'stopped';
  performance: number;
  tasksCompleted: number;
  tasksInProgress: number;
  successRate: number;
  averageTaskTime: number;
  specialization: string;
  lastActive: string;
  memoryUsage: number;
  cpuUsage: number;
  uptime: number;
  version: string;
  location: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface AgentLog {
  id: string;
  agentId: string;
  agentName: string;
  task: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  priority: 'critical' | 'high' | 'medium' | 'low';
  progress: number;
  startTime: string;
  endTime?: string;
  duration?: number;
  logs: string[];
  metrics: {
    successRate: number;
    errorRate: number;
    performance: number;
    memoryUsage: number;
  };
}

const AgentDashboard: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form states
  const [newAgent, setNewAgent] = useState({
    name: '',
    type: 'research' as Agent['type'],
    specialization: '',
    priority: 'medium' as Agent['priority'],
    location: 'us-east-1'
  });

  const [editAgent, setEditAgent] = useState({
    name: '',
    type: 'research' as Agent['type'],
    specialization: '',
    priority: 'medium' as Agent['priority'],
    location: 'us-east-1'
  });

  // Initialize with realistic data
  useEffect(() => {
    const initialAgents: Agent[] = [
      {
        id: 'research-001',
        name: 'TMS Research Master',
        type: 'research',
        status: 'working',
        performance: 95,
        tasksCompleted: 45,
        tasksInProgress: 8,
        successRate: 98,
        averageTaskTime: 12,
        specialization: 'TMS Feature Analysis',
        lastActive: new Date().toISOString(),
        memoryUsage: 67,
        cpuUsage: 45,
        uptime: 168,
        version: '2.1.4',
        location: 'us-east-1',
        priority: 'high'
      },
      {
        id: 'frontend-001',
        name: 'Portal Builder Alpha',
        type: 'frontend',
        status: 'working',
        performance: 88,
        tasksCompleted: 32,
        tasksInProgress: 12,
        successRate: 94,
        averageTaskTime: 25,
        specialization: 'React Portal Development',
        lastActive: new Date().toISOString(),
        memoryUsage: 78,
        cpuUsage: 62,
        uptime: 144,
        version: '1.9.2',
        location: 'us-west-2',
        priority: 'high'
      },
      {
        id: 'backend-001',
        name: 'API Architect Prime',
        type: 'backend',
        status: 'active',
        performance: 92,
        tasksCompleted: 28,
        tasksInProgress: 15,
        successRate: 96,
        averageTaskTime: 35,
        specialization: 'REST API Development',
        lastActive: new Date().toISOString(),
        memoryUsage: 82,
        cpuUsage: 58,
        uptime: 192,
        version: '3.0.1',
        location: 'eu-west-1',
        priority: 'critical'
      },
      {
        id: 'database-001',
        name: 'Schema Designer Pro',
        type: 'database',
        status: 'optimizing',
        performance: 90,
        tasksCompleted: 18,
        tasksInProgress: 6,
        successRate: 97,
        averageTaskTime: 45,
        specialization: 'Database Architecture',
        lastActive: new Date().toISOString(),
        memoryUsage: 45,
        cpuUsage: 23,
        uptime: 216,
        version: '2.5.3',
        location: 'us-east-1',
        priority: 'medium'
      },
      {
        id: 'testing-001',
        name: 'Quality Assurance Bot',
        type: 'testing',
        status: 'active',
        performance: 93,
        tasksCompleted: 55,
        tasksInProgress: 3,
        successRate: 99,
        averageTaskTime: 8,
        specialization: 'Automated Testing',
        lastActive: new Date().toISOString(),
        memoryUsage: 34,
        cpuUsage: 28,
        uptime: 120,
        version: '1.7.8',
        location: 'us-west-2',
        priority: 'high'
      },
      {
        id: 'ai-001',
        name: 'Neural Network Navigator',
        type: 'ai',
        status: 'working',
        performance: 87,
        tasksCompleted: 23,
        tasksInProgress: 9,
        successRate: 91,
        averageTaskTime: 52,
        specialization: 'Machine Learning Models',
        lastActive: new Date().toISOString(),
        memoryUsage: 91,
        cpuUsage: 89,
        uptime: 96,
        version: '4.2.1',
        location: 'us-east-1',
        priority: 'critical'
      },
      {
        id: 'monitoring-001',
        name: 'System Sentinel',
        type: 'monitoring',
        status: 'active',
        performance: 96,
        tasksCompleted: 67,
        tasksInProgress: 2,
        successRate: 99,
        averageTaskTime: 5,
        specialization: 'System Health Monitoring',
        lastActive: new Date().toISOString(),
        memoryUsage: 28,
        cpuUsage: 15,
        uptime: 240,
        version: '2.3.5',
        location: 'eu-west-1',
        priority: 'critical'
      }
    ];

    const initialLogs: AgentLog[] = [
      {
        id: 'log-001',
        agentId: 'research-001',
        agentName: 'TMS Research Master',
        task: 'Analyzing route optimization algorithms',
        status: 'running',
        priority: 'high',
        progress: 75,
        startTime: new Date(Date.now() - 3600000).toISOString(),
        logs: ['Initializing analysis...', 'Loading historical data...', 'Processing optimization patterns...'],
        metrics: { successRate: 98, errorRate: 2, performance: 95, memoryUsage: 67 }
      },
      {
        id: 'log-002',
        agentId: 'frontend-001',
        agentName: 'Portal Builder Alpha',
        task: 'Building carrier dashboard components',
        status: 'completed',
        priority: 'medium',
        progress: 100,
        startTime: new Date(Date.now() - 7200000).toISOString(),
        endTime: new Date(Date.now() - 1800000).toISOString(),
        duration: 5400,
        logs: ['Component creation started', 'API integration complete', 'Testing passed', 'Deployment successful'],
        metrics: { successRate: 94, errorRate: 6, performance: 88, memoryUsage: 78 }
      }
    ];

    setAgents(initialAgents);
    setAgentLogs(initialLogs);
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesType = typeFilter === 'all' || agent.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'working': return 'bg-blue-100 text-blue-800';
      case 'optimizing': return 'bg-purple-100 text-purple-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'stopped': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: Agent['type']) => {
    switch (type) {
      case 'research': return <Brain className="w-4 h-4" />;
      case 'frontend': return <Code className="w-4 h-4" />;
      case 'backend': return <Database className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'testing': return <Shield className="w-4 h-4" />;
      case 'ai': return <Zap className="w-4 h-4" />;
      case 'monitoring': return <Monitor className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const handleCreateAgent = async () => {
    setLoading(true);
    try {
      const newAgentData: Agent = {
        id: `agent-${Date.now()}`,
        name: newAgent.name,
        type: newAgent.type,
        status: 'idle',
        performance: 0,
        tasksCompleted: 0,
        tasksInProgress: 0,
        successRate: 0,
        averageTaskTime: 0,
        specialization: newAgent.specialization,
        lastActive: new Date().toISOString(),
        memoryUsage: 0,
        cpuUsage: 0,
        uptime: 0,
        version: '1.0.0',
        location: newAgent.location,
        priority: newAgent.priority
      };

      setAgents(prev => [...prev, newAgentData]);
      setIsCreateDialogOpen(false);
      setNewAgent({ name: '', type: 'research', specialization: '', priority: 'medium', location: 'us-east-1' });
      
      toast({
        title: "Agent Created",
        description: `Successfully created agent: ${newAgent.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create agent",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditAgent = async () => {
    if (!selectedAgent) return;
    
    setLoading(true);
    try {
      setAgents(prev => prev.map(agent => 
        agent.id === selectedAgent.id 
          ? { ...agent, name: editAgent.name, type: editAgent.type, specialization: editAgent.specialization, priority: editAgent.priority, location: editAgent.location }
          : agent
      ));
      setIsEditDialogOpen(false);
      setSelectedAgent(null);
      
      toast({
        title: "Agent Updated",
        description: `Successfully updated agent: ${editAgent.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update agent",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    setLoading(true);
    try {
      setAgents(prev => prev.filter(agent => agent.id !== agentId));
      
      toast({
        title: "Agent Deleted",
        description: "Agent has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete agent",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAgentStatus = async (agentId: string, currentStatus: Agent['status']) => {
    setLoading(true);
    try {
      const newStatus = currentStatus === 'active' || currentStatus === 'working' ? 'stopped' : 'active';
      setAgents(prev => prev.map(agent => 
        agent.id === agentId ? { ...agent, status: newStatus } : agent
      ));
      
      toast({
        title: "Agent Status Updated",
        description: `Agent status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update agent status",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (agent: Agent) => {
    setSelectedAgent(agent);
    setEditAgent({
      name: agent.name,
      type: agent.type,
      specialization: agent.specialization,
      priority: agent.priority,
      location: agent.location
    });
    setIsEditDialogOpen(true);
  };

  const systemMetrics = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active' || a.status === 'working').length,
    averagePerformance: Math.round(agents.reduce((sum, agent) => sum + agent.performance, 0) / agents.length),
    totalTasksCompleted: agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0),
    averageSuccessRate: Math.round(agents.reduce((sum, agent) => sum + agent.successRate, 0) / agents.length)
  };

  return (
    <div className="space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link to="/autonomous" className="flex items-center space-x-1 hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
          <span>Autonomous System</span>
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Agent Dashboard</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage autonomous AI agents across the TMS system
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Agent</DialogTitle>
              <DialogDescription>
                Configure a new autonomous AI agent for the TMS system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter agent name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Agent Type</Label>
                <Select value={newAgent.type} onValueChange={(value: Agent['type']) => setNewAgent(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="ai">AI</SelectItem>
                    <SelectItem value="monitoring">Monitoring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input
                  id="specialization"
                  value={newAgent.specialization}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, specialization: e.target.value }))}
                  placeholder="Enter specialization"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={newAgent.priority} onValueChange={(value: Agent['priority']) => setNewAgent(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Select value={newAgent.location} onValueChange={(value) => setNewAgent(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAgent} disabled={loading || !newAgent.name || !newAgent.specialization}>
                {loading ? 'Creating...' : 'Create Agent'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalAgents}</div>
            <p className="text-xs text-muted-foreground">
              Across all types
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.activeAgents}</div>
            <p className="text-xs text-muted-foreground">
              Currently working
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.averagePerformance}%</div>
            <p className="text-xs text-muted-foreground">
              System-wide average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalTasksCompleted}</div>
            <p className="text-xs text-muted-foreground">
              Total completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.averageSuccessRate}%</div>
            <p className="text-xs text-muted-foreground">
              System-wide average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Management</CardTitle>
          <CardDescription>
            Search, filter, and manage autonomous agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="working">Working</SelectItem>
                <SelectItem value="idle">Idle</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="stopped">Stopped</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="monitoring">Monitoring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agents Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getTypeIcon(agent.type)}
                        </div>
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-sm text-muted-foreground">{agent.specialization}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {agent.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={agent.performance} className="w-16" />
                        <span className="text-sm font-medium">{agent.performance}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Completed: {agent.tasksCompleted}</div>
                        <div className="text-muted-foreground">In Progress: {agent.tasksInProgress}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{agent.successRate}%</span>
                        {agent.successRate >= 95 && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {agent.successRate < 90 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {new Date(agent.lastActive).toLocaleTimeString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleAgentStatus(agent.id, agent.status)}
                          disabled={loading}
                        >
                          {agent.status === 'active' || agent.status === 'working' ? (
                            <PowerOff className="w-4 h-4" />
                          ) : (
                            <Power className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(agent)}
                          disabled={loading}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteAgent(agent.id)}
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Agent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Agent Activity</CardTitle>
          <CardDescription>
            Live logs and activity from autonomous agents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agentLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{log.agentName}</span>
                    <Badge variant={log.status === 'completed' ? 'default' : log.status === 'failed' ? 'destructive' : 'secondary'}>
                      {log.status}
                    </Badge>
                    <Badge variant="outline">{log.priority}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(log.startTime).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm mb-2">{log.task}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Progress: {log.progress}%</span>
                  {log.duration && <span>Duration: {Math.round(log.duration / 60)}m</span>}
                  <span>Success Rate: {log.metrics.successRate}%</span>
                </div>
                {log.logs.length > 0 && (
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono">
                    {log.logs.map((logEntry, index) => (
                      <div key={index} className="text-gray-600">• {logEntry}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Agent Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Agent</DialogTitle>
            <DialogDescription>
              Update agent configuration and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Agent Name</Label>
              <Input
                id="edit-name"
                value={editAgent.name}
                onChange={(e) => setEditAgent(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter agent name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Agent Type</Label>
              <Select value={editAgent.type} onValueChange={(value: Agent['type']) => setEditAgent(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="ai">AI</SelectItem>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-specialization">Specialization</Label>
              <Input
                id="edit-specialization"
                value={editAgent.specialization}
                onChange={(e) => setEditAgent(prev => ({ ...prev, specialization: e.target.value }))}
                placeholder="Enter specialization"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-priority">Priority</Label>
              <Select value={editAgent.priority} onValueChange={(value: Agent['priority']) => setEditAgent(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location</Label>
              <Select value={editAgent.location} onValueChange={(value) => setEditAgent(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">Europe (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAgent} disabled={loading || !editAgent.name || !editAgent.specialization}>
              {loading ? 'Updating...' : 'Update Agent'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentDashboard;
