import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Play, 
  Pause, 
  RotateCcw, 
  Activity, 
  Users, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Zap
} from 'lucide-react';

interface OrchestratorState {
  isRunning: boolean;
  totalAgents: number;
  activeAgents: number;
  completedTasks: number;
  failedTasks: number;
  systemHealth: number;
  orchestrationMode: 'sequential' | 'parallel' | 'adaptive';
  batchSize: number;
  concurrencyLimit: number;
}

interface AgentOrchestration {
  agent_type: string;
  allocated_count: number;
  max_count: number;
  current_tasks: number;
  completion_rate: number;
  health_status: 'healthy' | 'warning' | 'error';
}

const AutonomousOrchestrator: React.FC = () => {
  const [orchestratorState, setOrchestratorState] = useState<OrchestratorState>({
    isRunning: false,
    totalAgents: 250,
    activeAgents: 0,
    completedTasks: 0,
    failedTasks: 0,
    systemHealth: 100,
    orchestrationMode: 'adaptive',
    batchSize: 25,
    concurrencyLimit: 5
  });

  const [agentOrchestration, setAgentOrchestration] = useState<AgentOrchestration[]>([
    { agent_type: 'UI Builder', allocated_count: 0, max_count: 39, current_tasks: 0, completion_rate: 0, health_status: 'healthy' },
    { agent_type: 'Data Processor', allocated_count: 0, max_count: 39, current_tasks: 0, completion_rate: 0, health_status: 'healthy' },
    { agent_type: 'Security', allocated_count: 0, max_count: 37, current_tasks: 0, completion_rate: 0, health_status: 'healthy' },
    { agent_type: 'Optimization', allocated_count: 0, max_count: 39, current_tasks: 0, completion_rate: 0, health_status: 'healthy' },
    { agent_type: 'Testing', allocated_count: 0, max_count: 52, current_tasks: 0, completion_rate: 0, health_status: 'healthy' },
    { agent_type: 'Deployment', allocated_count: 0, max_count: 44, current_tasks: 0, completion_rate: 0, health_status: 'healthy' }
  ]);

  const { toast } = useToast();

  const startOrchestration = async () => {
    setOrchestratorState(prev => ({ ...prev, isRunning: true }));
    
    // Simulate progressive agent allocation
    const phases = [
      { phase: 'initialization', duration: 2000, agents: ['UI Builder', 'Data Processor', 'Security'] },
      { phase: 'development', duration: 3000, agents: ['UI Builder', 'Data Processor', 'Security', 'Optimization'] },
      { phase: 'testing', duration: 2000, agents: ['Testing', 'UI Builder', 'Data Processor'] },
      { phase: 'deployment', duration: 1500, agents: ['Deployment', 'Testing'] }
    ];

    for (const phase of phases) {
      await new Promise(resolve => setTimeout(resolve, phase.duration));
      
      setAgentOrchestration(prev => prev.map(agent => {
        if (phase.agents.includes(agent.agent_type)) {
          const newAllocated = Math.min(
            agent.allocated_count + Math.ceil(agent.max_count * 0.3),
            agent.max_count
          );
          return {
            ...agent,
            allocated_count: newAllocated,
            current_tasks: Math.floor(newAllocated * 0.8),
            completion_rate: Math.min(agent.completion_rate + 25, 100)
          };
        }
        return agent;
      }));

      setOrchestratorState(prev => ({
        ...prev,
        activeAgents: agentOrchestration.reduce((sum, agent) => sum + agent.allocated_count, 0),
        completedTasks: prev.completedTasks + Math.floor(Math.random() * 20) + 10
      }));
    }

    toast({
      title: "Orchestration Active",
      description: "All 250 agents are now coordinated and working autonomously",
    });
  };

  const pauseOrchestration = () => {
    setOrchestratorState(prev => ({ ...prev, isRunning: false }));
    toast({
      title: "Orchestration Paused",
      description: "Agent coordination has been temporarily suspended",
      variant: "destructive"
    });
  };

  const resetOrchestration = () => {
    setOrchestratorState(prev => ({
      ...prev,
      isRunning: false,
      activeAgents: 0,
      completedTasks: 0,
      failedTasks: 0,
      systemHealth: 100
    }));
    
    setAgentOrchestration(prev => prev.map(agent => ({
      ...agent,
      allocated_count: 0,
      current_tasks: 0,
      completion_rate: 0,
      health_status: 'healthy' as const
    })));

    toast({
      title: "Orchestration Reset",
      description: "All agents have been reset to standby mode"
    });
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  // Update system health based on agent status
  useEffect(() => {
    const healthyAgents = agentOrchestration.filter(a => a.health_status === 'healthy').length;
    const systemHealth = Math.round((healthyAgents / agentOrchestration.length) * 100);
    setOrchestratorState(prev => ({ ...prev, systemHealth }));
  }, [agentOrchestration]);

  return (
    <div className="space-y-6">
      {/* Orchestrator Control Panel */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Autonomous Orchestrator Control
              </CardTitle>
              <CardDescription>
                Coordinate and manage all 250 autonomous agents for optimal TMS development
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={orchestratorState.isRunning ? "default" : "secondary"}>
                {orchestratorState.isRunning ? "Active" : "Standby"}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {orchestratorState.orchestrationMode}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{orchestratorState.activeAgents}</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{orchestratorState.completedTasks}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{orchestratorState.systemHealth}%</div>
              <div className="text-sm text-muted-foreground">System Health</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{orchestratorState.batchSize}</div>
              <div className="text-sm text-muted-foreground">Batch Size</div>
            </div>
          </div>

          <div className="flex gap-2 justify-center">
            <Button
              onClick={startOrchestration}
              disabled={orchestratorState.isRunning}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Start Orchestration
            </Button>
            <Button
              onClick={pauseOrchestration}
              disabled={!orchestratorState.isRunning}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button
              onClick={resetOrchestration}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agent Fleet Orchestration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Agent Fleet Coordination
          </CardTitle>
          <CardDescription>
            Real-time allocation and status of specialized agent teams
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentOrchestration.map((agent) => (
              <Card key={agent.agent_type} className="border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{agent.agent_type}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getHealthIcon(agent.health_status)}
                      <Badge className={getHealthColor(agent.health_status)}>
                        {agent.health_status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Allocation</span>
                      <span>{agent.allocated_count}/{agent.max_count}</span>
                    </div>
                    <Progress 
                      value={(agent.allocated_count / agent.max_count) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Rate</span>
                      <span>{agent.completion_rate}%</span>
                    </div>
                    <Progress 
                      value={agent.completion_rate} 
                      className="h-2" 
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Active Tasks:</span>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span className="font-medium">{agent.current_tasks}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousOrchestrator;