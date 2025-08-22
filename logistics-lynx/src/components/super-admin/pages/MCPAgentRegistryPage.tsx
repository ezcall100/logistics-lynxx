import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Users, Activity, Shield, Settings, Play, Pause, RotateCcw, 
  AlertTriangle, CheckCircle, XCircle, Search, Filter, Plus,
  MoreHorizontal, Eye, Edit, Trash2, Download, Upload,
  RefreshCw, Zap, Brain, Server, Database, Globe, Code,
  Palette, Bug, TrendingUp, HardDrive, Wifi, Cpu
} from 'lucide-react';

// Mock agent data
const mockAgents = [
  {
    id: 'agent-001',
    name: 'Frontend Developer Agent',
    type: 'Development',
    status: 'active',
    health: 98,
    performance: 95,
    uptime: '99.9%',
    lastActivity: '2 minutes ago',
    cpu: 23,
    memory: 45,
    tasks: 12,
    priority: 'high',
    version: '2.1.4',
    location: 'Primary Server',
    capabilities: ['React', 'TypeScript', 'UI/UX', 'Testing']
  },
  {
    id: 'agent-002',
    name: 'Backend API Agent',
    type: 'API',
    status: 'active',
    health: 96,
    performance: 92,
    uptime: '99.8%',
    lastActivity: '1 minute ago',
    cpu: 67,
    memory: 78,
    tasks: 8,
    priority: 'high',
    version: '1.9.2',
    location: 'API Server',
    capabilities: ['Node.js', 'Express', 'Database', 'Authentication']
  },
  {
    id: 'agent-003',
    name: 'Security Scanner Agent',
    type: 'Security',
    status: 'idle',
    health: 100,
    performance: 88,
    uptime: '99.7%',
    lastActivity: '5 minutes ago',
    cpu: 12,
    memory: 34,
    tasks: 3,
    priority: 'medium',
    version: '3.0.1',
    location: 'Security Server',
    capabilities: ['Vulnerability Scan', 'Threat Detection', 'Compliance']
  },
  {
    id: 'agent-004',
    name: 'Database Optimizer Agent',
    type: 'Database',
    status: 'active',
    health: 94,
    performance: 97,
    uptime: '99.9%',
    lastActivity: '30 seconds ago',
    cpu: 89,
    memory: 56,
    tasks: 15,
    priority: 'high',
    version: '2.3.0',
    location: 'Database Server',
    capabilities: ['Query Optimization', 'Index Management', 'Backup']
  },
  {
    id: 'agent-005',
    name: 'Performance Monitor Agent',
    type: 'Monitoring',
    status: 'active',
    health: 99,
    performance: 91,
    uptime: '99.9%',
    lastActivity: '1 minute ago',
    cpu: 34,
    memory: 23,
    tasks: 6,
    priority: 'medium',
    version: '1.8.5',
    location: 'Monitoring Server',
    capabilities: ['Metrics Collection', 'Alerting', 'Reporting']
  }
];

const MCPAgentRegistryPage = () => {
  const [agents, setAgents] = useState(mockAgents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  // Filter agents based on search and filters
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    const matchesType = typeFilter === 'all' || agent.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAgentAction = (agentId: string, action: string) => {
    console.log(`Performing ${action} on agent ${agentId}`);
    // Here you would implement actual agent control logic
  };

  const totalAgents = agents.length;
  const activeAgents = agents.filter(a => a.status === 'active').length;
  const idleAgents = agents.filter(a => a.status === 'idle').length;
  const errorAgents = agents.filter(a => a.status === 'error').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP Agent Registry
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor autonomous AI agents across the system
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Registry
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Agents
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Deploy New Agent
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalAgents}</p>
                <p className="text-sm font-medium text-muted-foreground">Total Agents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{activeAgents}</p>
                <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-yellow-100">
                <Pause className="h-8 w-8 text-yellow-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{idleAgents}</p>
                <p className="text-sm font-medium text-muted-foreground">Idle Agents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-red-100">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-3xl font-bold">{errorAgents}</p>
                <p className="text-sm font-medium text-muted-foreground">Error Agents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Agents</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, type, or capabilities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="idle">Idle</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type-filter">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Development">Development</SelectItem>
                  <SelectItem value="API">API</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Monitoring">Monitoring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Registry Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Agent Registry</CardTitle>
          <CardDescription>
            {filteredAgents.length} agents found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Resources</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`} />
                        <div>
                          <div className="font-medium">{agent.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {agent.type} • v{agent.version}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                        {agent.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={agent.health} className="w-16" />
                        <span className="text-sm font-medium">{agent.health}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress value={agent.performance} className="w-16" />
                        <span className="text-sm font-medium">{agent.performance}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Cpu className="w-3 h-3" />
                          <span className="text-xs">{agent.cpu}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <HardDrive className="w-3 h-3" />
                          <span className="text-xs">{agent.memory}%</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{agent.tasks}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(agent.priority)}>
                        {agent.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAgentAction(agent.id, 'start')}
                                disabled={agent.status === 'active'}
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Start Agent</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAgentAction(agent.id, 'stop')}
                                disabled={agent.status === 'idle'}
                              >
                                <Pause className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Stop Agent</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAgentAction(agent.id, 'restart')}
                              >
                                <RotateCcw className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Restart Agent</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedAgent(agent.id)}
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>More Actions</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Agent Capabilities Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Agent Capabilities Distribution</CardTitle>
            <CardDescription>Overview of agent capabilities across the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Development', 'API', 'Security', 'Database', 'Monitoring'].map((capability) => {
                const count = agents.filter(a => a.capabilities.some(c => c.includes(capability))).length;
                const percentage = (count / totalAgents) * 100;
                return (
                  <div key={capability} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{capability}</span>
                      <span className="text-sm text-muted-foreground">{count} agents</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>System Resource Usage</CardTitle>
            <CardDescription>Current resource allocation across all agents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(agents.reduce((sum, a) => sum + a.cpu, 0) / agents.length)}% avg
                  </span>
                </div>
                <Progress 
                  value={agents.reduce((sum, a) => sum + a.cpu, 0) / agents.length} 
                  className="h-2" 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(agents.reduce((sum, a) => sum + a.memory, 0) / agents.length)}% avg
                  </span>
                </div>
                <Progress 
                  value={agents.reduce((sum, a) => sum + a.memory, 0) / agents.length} 
                  className="h-2" 
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Tasks</span>
                  <span className="text-sm text-muted-foreground">
                    {agents.reduce((sum, a) => sum + a.tasks, 0)} total
                  </span>
                </div>
                <Progress 
                  value={(agents.reduce((sum, a) => sum + a.tasks, 0) / (agents.length * 20)) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MCPAgentRegistryPage;
