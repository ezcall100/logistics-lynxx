import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Activity, 
  Cpu, 
  Memory, 
  Network, 
  Zap, 
  Settings, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Gauge,
  Shield,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';

interface AgentMetrics {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'overloaded' | 'idle';
  cpu: number;
  memory: number;
  network: number;
  queueLength: number;
  maxConcurrency: number;
  currentLoad: number;
  responseTime: number;
  errorRate: number;
  throughput: number;
  lastHeartbeat: string;
  uptime: number;
  tasksCompleted: number;
  tasksFailed: number;
}

interface LoadBalancerConfig {
  autoThrottle: boolean;
  maxCpuThreshold: number;
  maxMemoryThreshold: number;
  maxResponseTime: number;
  maxErrorRate: number;
  loadBalancingStrategy: 'round-robin' | 'least-loaded' | 'fastest-response' | 'weighted';
  healthCheckInterval: number;
  failoverEnabled: boolean;
}

interface AgentLoadBalancerProps {
  className?: string;
}

export function AgentLoadBalancer({ className }: AgentLoadBalancerProps) {
  const [agents, setAgents] = useState<AgentMetrics[]>([]);
  const [config, setConfig] = useState<LoadBalancerConfig>({
    autoThrottle: true,
    maxCpuThreshold: 80,
    maxMemoryThreshold: 85,
    maxResponseTime: 5000,
    maxErrorRate: 5,
    loadBalancingStrategy: 'least-loaded',
    healthCheckInterval: 30,
    failoverEnabled: true
  });
  const [isAutoThrottling, setIsAutoThrottling] = useState(false);
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');

  // Mock data for demonstration
  useEffect(() => {
    const mockAgents: AgentMetrics[] = [
      {
        id: 'agent-1',
        name: 'Frontend Dev Agent',
        type: 'frontend-dev-agent',
        status: 'online',
        cpu: 45,
        memory: 62,
        network: 28,
        queueLength: 3,
        maxConcurrency: 5,
        currentLoad: 2,
        responseTime: 1200,
        errorRate: 0.5,
        throughput: 45,
        lastHeartbeat: new Date().toISOString(),
        uptime: 86400,
        tasksCompleted: 156,
        tasksFailed: 2
      },
      {
        id: 'agent-2',
        name: 'Backend API Agent',
        type: 'backend-api-agent',
        status: 'overloaded',
        cpu: 92,
        memory: 88,
        network: 75,
        queueLength: 12,
        maxConcurrency: 8,
        currentLoad: 7,
        responseTime: 8500,
        errorRate: 8.2,
        throughput: 23,
        lastHeartbeat: new Date().toISOString(),
        uptime: 43200,
        tasksCompleted: 89,
        tasksFailed: 8
      },
      {
        id: 'agent-3',
        name: 'Data Pipeline Agent',
        type: 'data-pipeline-agent',
        status: 'idle',
        cpu: 15,
        memory: 25,
        network: 8,
        queueLength: 0,
        maxConcurrency: 3,
        currentLoad: 0,
        responseTime: 800,
        errorRate: 0.1,
        throughput: 12,
        lastHeartbeat: new Date().toISOString(),
        uptime: 172800,
        tasksCompleted: 234,
        tasksFailed: 1
      },
      {
        id: 'agent-4',
        name: 'ML Agent',
        type: 'ml-agent',
        status: 'online',
        cpu: 78,
        memory: 82,
        network: 45,
        queueLength: 5,
        maxConcurrency: 4,
        currentLoad: 3,
        responseTime: 3200,
        errorRate: 2.1,
        throughput: 18,
        lastHeartbeat: new Date().toISOString(),
        uptime: 64800,
        tasksCompleted: 67,
        tasksFailed: 3
      }
    ];

    setAgents(mockAgents);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        cpu: Math.max(0, Math.min(100, agent.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, agent.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(0, Math.min(100, agent.network + (Math.random() - 0.5) * 15)),
        responseTime: Math.max(100, agent.responseTime + (Math.random() - 0.5) * 500),
        lastHeartbeat: new Date().toISOString()
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-throttling logic
  useEffect(() => {
    if (!config.autoThrottle) return;

    const checkAndThrottle = () => {
      const overloadedAgents = agents.filter(agent => 
        agent.cpu > config.maxCpuThreshold ||
        agent.memory > config.maxMemoryThreshold ||
        agent.responseTime > config.maxResponseTime ||
        agent.errorRate > config.maxErrorRate
      );

      if (overloadedAgents.length > 0) {
        setIsAutoThrottling(true);
        setSystemHealth('warning');
        
        // Simulate throttling
        setTimeout(() => {
          setAgents(prev => prev.map(agent => {
            if (overloadedAgents.find(o => o.id === agent.id)) {
              return {
                ...agent,
                status: 'overloaded' as const,
                maxConcurrency: Math.max(1, agent.maxConcurrency - 1)
              };
            }
            return agent;
          }));
          setIsAutoThrottling(false);
        }, 2000);
      } else {
        setSystemHealth('healthy');
      }
    };

    const interval = setInterval(checkAndThrottle, 10000);
    return () => clearInterval(interval);
  }, [agents, config]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'default';
      case 'idle': return 'secondary';
      case 'overloaded': return 'destructive';
      case 'offline': return 'outline';
      default: return 'outline';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'default';
      case 'warning': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const handleThrottleAgent = (agentId: string, action: 'throttle' | 'unthrottle') => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          maxConcurrency: action === 'throttle' 
            ? Math.max(1, agent.maxConcurrency - 1)
            : Math.min(10, agent.maxConcurrency + 1)
        };
      }
      return agent;
    }));
  };

  const handleRestartAgent = (agentId: string) => {
    setAgents(prev => prev.map(agent => {
      if (agent.id === agentId) {
        return {
          ...agent,
          status: 'offline' as const,
          uptime: 0
        };
      }
      return agent;
    }));

    // Simulate restart
    setTimeout(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.id === agentId) {
          return {
            ...agent,
            status: 'online' as const,
            uptime: 0,
            cpu: 0,
            memory: 0,
            network: 0,
            queueLength: 0,
            currentLoad: 0
          };
        }
        return agent;
      }));
    }, 3000);
  };

  const totalAgents = agents.length;
  const onlineAgents = agents.filter(a => a.status === 'online').length;
  const overloadedAgents = agents.filter(a => a.status === 'overloaded').length;
  const averageCpu = agents.reduce((sum, a) => sum + a.cpu, 0) / totalAgents;
  const averageMemory = agents.reduce((sum, a) => sum + a.memory, 0) / totalAgents;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agent Load Balancer</h2>
          <p className="text-muted-foreground">
            Real-time load dashboard and auto-throttle mechanism
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={config.autoThrottle}
              onCheckedChange={(checked) => setConfig(prev => ({ ...prev, autoThrottle: checked }))}
            />
            <span className="text-sm">Auto Throttle</span>
          </div>
          <Badge variant={getHealthColor(systemHealth)}>
            {isAutoThrottling ? 'Throttling...' : systemHealth}
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Agents</p>
                <p className="text-2xl font-bold">{totalAgents}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                {onlineAgents} online, {overloadedAgents} overloaded
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Avg CPU</p>
                <p className="text-2xl font-bold">{averageCpu.toFixed(1)}%</p>
              </div>
              <Cpu className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <Progress value={averageCpu} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Avg Memory</p>
                <p className="text-2xl font-bold">{averageMemory.toFixed(1)}%</p>
              </div>
              <Memory className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <Progress value={averageMemory} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Throughput</p>
                <p className="text-2xl font-bold">
                  {agents.reduce((sum, a) => sum + a.throughput, 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">tasks/min</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Metrics */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Agent Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agents.map(agent => (
                  <div key={agent.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{agent.name}</h4>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleThrottleAgent(agent.id, 'throttle')}
                          disabled={agent.maxConcurrency <= 1}
                        >
                          <TrendingDown className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleThrottleAgent(agent.id, 'unthrottle')}
                          disabled={agent.maxConcurrency >= 10}
                        >
                          <TrendingUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRestartAgent(agent.id)}
                        >
                          <Zap className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>CPU</span>
                          <span>{agent.cpu.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={agent.cpu} 
                          className="h-2 mt-1"
                          variant={agent.cpu > config.maxCpuThreshold ? 'destructive' : 'default'}
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Memory</span>
                          <span>{agent.memory.toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={agent.memory} 
                          className="h-2 mt-1"
                          variant={agent.memory > config.maxMemoryThreshold ? 'destructive' : 'default'}
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Load</span>
                          <span>{agent.currentLoad}/{agent.maxConcurrency}</span>
                        </div>
                        <Progress 
                          value={(agent.currentLoad / agent.maxConcurrency) * 100} 
                          className="h-2 mt-1"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Response</span>
                          <span>{(agent.responseTime / 1000).toFixed(1)}s</span>
                        </div>
                        <div className="h-2 mt-1 bg-muted rounded">
                          <div 
                            className={`h-full rounded ${
                              agent.responseTime > config.maxResponseTime ? 'bg-destructive' : 'bg-primary'
                            }`}
                            style={{ width: `${Math.min(100, (agent.responseTime / config.maxResponseTime) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Queue:</span>
                        <span className="ml-1 font-medium">{agent.queueLength}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Error Rate:</span>
                        <span className="ml-1 font-medium">{agent.errorRate.toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Throughput:</span>
                        <span className="ml-1 font-medium">{agent.throughput}/min</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Uptime:</span>
                        <span className="ml-1 font-medium">
                          {Math.floor(agent.uptime / 3600)}h {Math.floor((agent.uptime % 3600) / 60)}m
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Load Balancer Config</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Max CPU Threshold</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Slider
                    value={[config.maxCpuThreshold]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, maxCpuThreshold: value }))}
                    max={100}
                    min={50}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm w-12">{config.maxCpuThreshold}%</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Max Memory Threshold</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Slider
                    value={[config.maxMemoryThreshold]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, maxMemoryThreshold: value }))}
                    max={100}
                    min={50}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm w-12">{config.maxMemoryThreshold}%</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Max Response Time</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Slider
                    value={[config.maxResponseTime / 1000]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, maxResponseTime: value * 1000 }))}
                    max={10}
                    min={1}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-sm w-12">{config.maxResponseTime / 1000}s</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Max Error Rate</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Slider
                    value={[config.maxErrorRate]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, maxErrorRate: value }))}
                    max={20}
                    min={1}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="text-sm w-12">{config.maxErrorRate}%</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Health Check Interval</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Slider
                    value={[config.healthCheckInterval]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, healthCheckInterval: value }))}
                    max={60}
                    min={10}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm w-12">{config.healthCheckInterval}s</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {agents.filter(a => a.status === 'overloaded').map(agent => (
                  <div key={agent.id} className="flex items-center space-x-2 p-2 bg-destructive/10 rounded">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">{agent.name} is overloaded</span>
                  </div>
                ))}
                {agents.filter(a => a.errorRate > config.maxErrorRate).map(agent => (
                  <div key={agent.id} className="flex items-center space-x-2 p-2 bg-destructive/10 rounded">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">{agent.name} has high error rate</span>
                  </div>
                ))}
                {agents.filter(a => a.responseTime > config.maxResponseTime).map(agent => (
                  <div key={agent.id} className="flex items-center space-x-2 p-2 bg-destructive/10 rounded">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">{agent.name} is slow to respond</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
