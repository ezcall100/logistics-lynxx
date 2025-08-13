import React, { useState } from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Cpu, 
  Brain, 
  Code, 
  Database, 
  TestTube, 
  Rocket, 
  Search, 
  Users,
  Activity,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  Settings
} from 'lucide-react';

const AutonomousAgents = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };
  const agentTypes = [
    { type: 'Research', count: 50, icon: Search, color: 'text-blue-500' },
    { type: 'Frontend', count: 80, icon: Code, color: 'text-green-500' },
    { type: 'Backend', count: 60, icon: Cpu, color: 'text-purple-500' },
    { type: 'Database', count: 30, icon: Database, color: 'text-orange-500' },
    { type: 'Testing', count: 20, icon: TestTube, color: 'text-red-500' },
    { type: 'Deployment', count: 10, icon: Rocket, color: 'text-indigo-500' },
  ];

  const agents = [
    { id: 'agent-001', name: 'Research Agent Alpha', type: 'Research', status: 'active', progress: 85 },
    { id: 'agent-002', name: 'Frontend Builder Beta', type: 'Frontend', status: 'working', progress: 62 },
    { id: 'agent-003', name: 'Backend Core Gamma', type: 'Backend', status: 'idle', progress: 100 },
    { id: 'agent-004', name: 'Database Optimizer Delta', type: 'Database', status: 'active', progress: 45 },
    { id: 'agent-005', name: 'Test Runner Epsilon', type: 'Testing', status: 'working', progress: 78 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'working':
        return <Badge className="bg-blue-100 text-blue-800">Working</Badge>;
      case 'idle':
        return <Badge className="bg-gray-100 text-gray-800">Idle</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Autonomous Agents</h1>
          <p className="text-muted-foreground">
            Manage and monitor all 250 autonomous agents working on the TMS
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={refreshing}
            variant="outline" 
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
          <Button variant="outline" className="gap-2">
            <PauseCircle className="h-4 w-4" />
            Pause All
          </Button>
          <Button className="gap-2">
            <PlayCircle className="h-4 w-4" />
            Start All
          </Button>
        </div>
      </div>

      {/* Agent Type Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agentTypes.map((agentType) => {
          const Icon = agentType.icon;
          return (
            <Card key={agentType.type}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{agentType.type} Agents</CardTitle>
                <Icon className={`h-4 w-4 ${agentType.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agentType.count}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.floor(agentType.count * 0.9)} active
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agent Details</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tasks">Current Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Agent Distribution</CardTitle>
                <CardDescription>Current allocation of agents by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentTypes.map((type) => (
                    <div key={type.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <type.icon className={`h-4 w-4 ${type.color}`} />
                        <span className="text-sm">{type.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{type.count}</span>
                        <Progress value={(type.count / 250) * 100} className="w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Overall agent system metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="text-sm font-medium">98.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Avg Response Time</span>
                    <span className="text-sm font-medium">1.2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tasks Completed Today</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Workflows</span>
                    <span className="text-sm font-medium">45</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Individual Agents</CardTitle>
              <CardDescription>Status and progress of individual agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-muted-foreground">{agent.type} • {agent.id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Progress value={agent.progress} className="w-20 mb-1" />
                        <p className="text-xs text-muted-foreground">{agent.progress}% complete</p>
                      </div>
                      {getStatusBadge(agent.status)}
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Detailed performance analytics for agent operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Throughput</span>
                  </div>
                  <div className="text-2xl font-bold">124/min</div>
                  <p className="text-xs text-muted-foreground">Tasks processed</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Efficiency</span>
                  </div>
                  <div className="text-2xl font-bold">97.2%</div>
                  <p className="text-xs text-muted-foreground">Resource utilization</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium">CPU Usage</span>
                  </div>
                  <div className="text-2xl font-bold">34%</div>
                  <p className="text-xs text-muted-foreground">Average load</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Memory</span>
                  </div>
                  <div className="text-2xl font-bold">2.1GB</div>
                  <p className="text-xs text-muted-foreground">Total usage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Tasks</CardTitle>
              <CardDescription>Active tasks being processed by agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { task: 'Frontend Component Development', agent: 'Frontend Builder Beta', progress: 62 },
                  { task: 'Database Schema Optimization', agent: 'Database Optimizer Delta', progress: 45 },
                  { task: 'API Endpoint Testing', agent: 'Test Runner Epsilon', progress: 78 },
                  { task: 'Market Research Analysis', agent: 'Research Agent Alpha', progress: 85 },
                  { task: 'Code Deployment Pipeline', agent: 'Deploy Agent Zeta', progress: 23 },
                ].map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-muted-foreground">Assigned to: {task.agent}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={task.progress} className="w-20" />
                      <span className="text-sm">{task.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default AutonomousAgents;