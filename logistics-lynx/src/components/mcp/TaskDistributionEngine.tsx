import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  GitBranch, 
  Users, 
  Clock, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed';
  agentType: string;
  assignedAgent?: string;
  estimatedDuration: number;
  actualDuration?: number;
  createdAt: string;
  updatedAt: string;
  dependencies: string[];
  tags: string[];
}

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'busy' | 'idle';
  currentLoad: number;
  maxConcurrency: number;
  skills: string[];
  performance: {
    tasksCompleted: number;
    averageCompletionTime: number;
    successRate: number;
  };
  lastHeartbeat: string;
}

interface TaskDistributionEngineProps {
  className?: string;
}

export function TaskDistributionEngine({ className }: TaskDistributionEngineProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [distributionMode, setDistributionMode] = useState<'auto' | 'manual'>('auto');
  const [isRunning, setIsRunning] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: 'task-1',
        name: 'Build Shipper Dashboard',
        description: 'Create comprehensive dashboard for shipper portal',
        priority: 'high',
        status: 'pending',
        agentType: 'frontend-dev-agent',
        estimatedDuration: 120,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dependencies: [],
        tags: ['dashboard', 'shipper', 'ui']
      },
      {
        id: 'task-2',
        name: 'API Rate Limiting',
        description: 'Implement rate limiting for carrier API endpoints',
        priority: 'critical',
        status: 'assigned',
        agentType: 'backend-api-agent',
        assignedAgent: 'agent-1',
        estimatedDuration: 60,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dependencies: [],
        tags: ['api', 'security', 'rate-limiting']
      },
      {
        id: 'task-3',
        name: 'Database Optimization',
        description: 'Optimize query performance for load tracking',
        priority: 'medium',
        status: 'in_progress',
        agentType: 'data-pipeline-agent',
        assignedAgent: 'agent-2',
        estimatedDuration: 180,
        actualDuration: 90,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dependencies: ['task-2'],
        tags: ['database', 'optimization', 'performance']
      }
    ];

    const mockAgents: Agent[] = [
      {
        id: 'agent-1',
        name: 'Frontend Dev Agent',
        type: 'frontend-dev-agent',
        status: 'busy',
        currentLoad: 2,
        maxConcurrency: 3,
        skills: ['react', 'typescript', 'ui-design'],
        performance: {
          tasksCompleted: 45,
          averageCompletionTime: 85,
          successRate: 0.98
        },
        lastHeartbeat: new Date().toISOString()
      },
      {
        id: 'agent-2',
        name: 'Backend API Agent',
        type: 'backend-api-agent',
        status: 'online',
        currentLoad: 1,
        maxConcurrency: 4,
        skills: ['nodejs', 'api-design', 'security'],
        performance: {
          tasksCompleted: 67,
          averageCompletionTime: 120,
          successRate: 0.95
        },
        lastHeartbeat: new Date().toISOString()
      },
      {
        id: 'agent-3',
        name: 'Data Pipeline Agent',
        type: 'data-pipeline-agent',
        status: 'idle',
        currentLoad: 0,
        maxConcurrency: 2,
        skills: ['etl', 'database', 'optimization'],
        performance: {
          tasksCompleted: 23,
          averageCompletionTime: 200,
          successRate: 0.92
        },
        lastHeartbeat: new Date().toISOString()
      }
    ];

    setTasks(mockTasks);
    setAgents(mockAgents);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in_progress': return 'secondary';
      case 'assigned': return 'outline';
      case 'pending': return 'outline';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'default';
      case 'idle': return 'secondary';
      case 'busy': return 'outline';
      case 'offline': return 'destructive';
      default: return 'outline';
    }
  };

  const handleAutoDistribute = () => {
    setIsRunning(true);
    // Simulate auto-distribution logic
    setTimeout(() => {
      const updatedTasks = tasks.map(task => {
        if (task.status === 'pending') {
          const availableAgent = agents.find(agent => 
            agent.type === task.agentType && 
            agent.status === 'online' && 
            agent.currentLoad < agent.maxConcurrency
          );
          
          if (availableAgent) {
            return {
              ...task,
              status: 'assigned' as const,
              assignedAgent: availableAgent.id
            };
          }
        }
        return task;
      });
      
      setTasks(updatedTasks);
      setIsRunning(false);
    }, 2000);
  };

  const handleManualAssign = (taskId: string, agentId: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: 'assigned' as const, assignedAgent: agentId }
        : task
    );
    setTasks(updatedTasks);
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Task Distribution Engine</h2>
          <p className="text-muted-foreground">
            Dynamic task routing based on agent availability and priority
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={distributionMode === 'auto' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDistributionMode('auto')}
          >
            <Zap className="w-4 h-4 mr-2" />
            Auto
          </Button>
          <Button
            variant={distributionMode === 'manual' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDistributionMode('manual')}
          >
            <Users className="w-4 h-4 mr-2" />
            Manual
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Task Queue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {pendingTasks.length} pending tasks
              </span>
              {distributionMode === 'auto' && (
                <Button
                  size="sm"
                  onClick={handleAutoDistribute}
                  disabled={isRunning || pendingTasks.length === 0}
                >
                  {isRunning ? (
                    <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" />
                  )}
                  {isRunning ? 'Distributing...' : 'Auto Distribute'}
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              {pendingTasks.map(task => (
                <div
                  key={task.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50"
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{task.name}</h4>
                    <Badge variant={getPriorityColor(task.priority)} size="sm">
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" size="sm">
                      {task.agentType}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {task.estimatedDuration}m
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {agents.map(agent => (
                <div key={agent.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{agent.name}</h4>
                    <Badge variant={getAgentStatusColor(agent.status)} size="sm">
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Load:</span>
                      <span>{agent.currentLoad}/{agent.maxConcurrency}</span>
                    </div>
                    <Progress 
                      value={(agent.currentLoad / agent.maxConcurrency) * 100} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Success Rate:</span>
                      <span>{(agent.performance.successRate * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitBranch className="w-5 h-5 mr-2" />
              Task Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-muted rounded">
                    <div className="text-lg font-bold">{pendingTasks.length}</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="text-lg font-bold">{inProgressTasks.length}</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="text-lg font-bold">{completedTasks.length}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
            </div>
            
            <div className="space-y-2">
              {inProgressTasks.map(task => (
                <div key={task.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{task.name}</h4>
                    <Badge variant={getStatusColor(task.status)} size="sm">
                      {task.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress:</span>
                      <span>
                        {task.actualDuration ? 
                          `${Math.round((task.actualDuration / task.estimatedDuration) * 100)}%` : 
                          '0%'
                        }
                      </span>
                    </div>
                    <Progress 
                      value={task.actualDuration ? 
                        (task.actualDuration / task.estimatedDuration) * 100 : 0
                      } 
                      className="h-2"
                    />
                    <div className="text-xs text-muted-foreground">
                      Assigned to: {agents.find(a => a.id === task.assignedAgent)?.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{selectedTask.name}</h3>
                <p className="text-muted-foreground">{selectedTask.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Badge variant={getPriorityColor(selectedTask.priority)}>
                    {selectedTask.priority}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge variant={getStatusColor(selectedTask.status)}>
                    {selectedTask.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium">Agent Type</label>
                  <div className="text-sm">{selectedTask.agentType}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Estimated Duration</label>
                  <div className="text-sm">{selectedTask.estimatedDuration} minutes</div>
                </div>
              </div>

              {distributionMode === 'manual' && selectedTask.status === 'pending' && (
                <div>
                  <label className="text-sm font-medium">Assign to Agent</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {agents
                      .filter(agent => agent.type === selectedTask.agentType && agent.status === 'online')
                      .map(agent => (
                        <Button
                          key={agent.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleManualAssign(selectedTask.id, agent.id)}
                        >
                          {agent.name}
                        </Button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
