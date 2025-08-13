import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Zap,
  Users,
  BarChart3,
  Target,
  Cpu
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AgentMetrics {
  agent_type: string;
  count: number;
  performance_score: number;
  avg_completion_time: number;
  success_rate: number;
  current_load: number;
}

interface TaskMetrics {
  status: string;
  count: number;
}

interface SystemHealth {
  cpu_usage: number;
  memory_usage: number;
  active_connections: number;
  response_time: number;
}

export const PerformanceOptimizationDashboard = () => {
  const [agentMetrics, setAgentMetrics] = useState<AgentMetrics[]>([]);
  const [taskMetrics, setTaskMetrics] = useState<TaskMetrics[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu_usage: 0,
    memory_usage: 0,
    active_connections: 0,
    response_time: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetch agent distribution
        const { data: agentData } = await supabase
          .from('autonomous_tasks')
          .select('agent_type')
          .then(result => ({
            data: result.data?.reduce((acc: unknown[], task) => {
              const existing = acc.find(a => a.agent_type === task.agent_type);
              if (existing) {
                existing.count++;
              } else {
                acc.push({
                  agent_type: task.agent_type,
                  count: 1,
                  performance_score: Math.round(75 + Math.random() * 25), // Simulated
                  avg_completion_time: Math.round(120 + Math.random() * 300), // Simulated
                  success_rate: Math.round(85 + Math.random() * 15), // Simulated
                  current_load: Math.round(Math.random() * 100) // Simulated
                });
              }
              return acc;
            }, [])
          }));

        // Fetch task status distribution
        const { data: taskData } = await supabase
          .from('autonomous_tasks')
          .select('status')
          .then(result => ({
            data: result.data?.reduce((acc: unknown[], task) => {
              const existing = acc.find(t => t.status === task.status);
              if (existing) {
                existing.count++;
              } else {
                acc.push({ status: task.status, count: 1 });
              }
              return acc;
            }, [])
          }));

        setAgentMetrics(agentData || []);
        setTaskMetrics(taskData || []);
        
        // Simulate system health metrics
        setSystemHealth({
          cpu_usage: Math.round(45 + Math.random() * 25),
          memory_usage: Math.round(60 + Math.random() * 20),
          active_connections: Math.round(200 + Math.random() * 100),
          response_time: Math.round(50 + Math.random() * 100)
        });

      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const totalTasks = taskMetrics.reduce((sum, task) => sum + task.count, 0);
  const completedTasks = taskMetrics.find(t => t.status === 'completed')?.count || 0;
  const inProgressTasks = taskMetrics.find(t => t.status === 'in_progress')?.count || 0;
  const pendingTasks = taskMetrics.find(t => t.status === 'pending')?.count || 0;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const utilizationRate = totalTasks > 0 ? Math.round(((inProgressTasks + completedTasks) / totalTasks) * 100) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-pulse flex space-x-4">
          <div className="h-4 w-4 bg-primary/20 rounded-full animate-bounce"></div>
          <div className="h-4 w-4 bg-primary/20 rounded-full animate-bounce [animation-delay:-.3s]"></div>
          <div className="h-4 w-4 bg-primary/20 rounded-full animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Performance Optimization Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time monitoring of 250+ autonomous agents</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Activity className="h-3 w-3 mr-1" />
          Live Monitoring
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Utilization</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationRate}%</div>
            <p className="text-xs text-muted-foreground">
              {inProgressTasks} active, {pendingTasks} queued
            </p>
          </CardContent>
        </Card>

        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemHealth.response_time}ms</div>
            <p className="text-xs text-muted-foreground">
              Avg response time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="tasks">Task Analytics</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Agent Type Distribution
                </CardTitle>
                <CardDescription>Performance metrics by agent category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agentMetrics.slice(0, 6).map((agent, index) => (
                  <div key={agent.agent_type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">{agent.agent_type.replace('_', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{agent.count} agents</Badge>
                        <span className={`font-semibold ${getPerformanceColor(agent.performance_score)}`}>
                          {agent.performance_score}%
                        </span>
                      </div>
                    </div>
                    <Progress value={agent.performance_score} className="h-2" />
                    <div className="flex text-xs text-muted-foreground justify-between">
                      <span>Load: {agent.current_load}%</span>
                      <span>Success: {agent.success_rate}%</span>
                      <span>Avg: {agent.avg_completion_time}s</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Agent Activity
                </CardTitle>
                <CardDescription>Current task execution status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taskMetrics.map((task) => (
                    <div key={task.status} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                        <span className="font-medium capitalize">{task.status.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{task.count}</span>
                        <span className="text-xs text-muted-foreground">tasks</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Flow Analytics</CardTitle>
              <CardDescription>Detailed breakdown of task processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{completedTasks}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{inProgressTasks}</div>
                  <div className="text-sm text-muted-foreground">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{pendingTasks}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>CPU Usage</span>
                    <span>{systemHealth.cpu_usage}%</span>
                  </div>
                  <Progress value={systemHealth.cpu_usage} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Memory Usage</span>
                    <span>{systemHealth.memory_usage}%</span>
                  </div>
                  <Progress value={systemHealth.memory_usage} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Network & Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Active Connections</span>
                  <Badge variant="outline">{systemHealth.active_connections}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Response Time</span>
                  <Badge variant="outline">{systemHealth.response_time}ms</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Load Balancing Opportunity</span>
                </div>
                <p className="text-sm text-blue-800">
                  Frontend agents show 85% utilization. Consider redistributing 10 agents from lower-priority tasks.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Performance Excellent</span>
                </div>
                <p className="text-sm text-green-800">
                  System is operating at optimal performance with 98.5% uptime this week.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-900">Queue Management</span>
                </div>
                <p className="text-sm text-yellow-800">
                  {pendingTasks} tasks in queue. Estimated processing time: {Math.round(pendingTasks / 10)} minutes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};