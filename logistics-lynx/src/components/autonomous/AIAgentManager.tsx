import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Truck, MapPin, DollarSign, Wrench, TrendingUp, Activity, Zap } from 'lucide-react';

interface AIAgent {
  id: string;
  name: string;
  type: 'dispatch' | 'route_optimization' | 'pricing' | 'maintenance' | 'predictive_analytics' | 'load_matching';
  status: 'active' | 'idle' | 'processing';
  lastAction: string;
  actionsToday: number;
  efficiency: number;
  icon: React.ComponentType<unknown>;
}

interface AgentAction {
  id: string;
  agent_id: string;
  action_type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

const AIAgentManager = () => {
  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: '1',
      name: 'Dispatch AI',
      type: 'dispatch',
      status: 'active',
      lastAction: 'Assigned shipment #SH-2024-001 to Driver John Smith',
      actionsToday: 47,
      efficiency: 94,
      icon: Truck,
    },
    {
      id: '2',
      name: 'Route Optimizer',
      type: 'route_optimization',
      status: 'processing',
      lastAction: 'Optimizing route for 12 shipments in Texas region',
      actionsToday: 156,
      efficiency: 89,
      icon: MapPin,
    },
    {
      id: '3',
      name: 'Dynamic Pricing',
      type: 'pricing',
      status: 'active',
      lastAction: 'Updated rates for Dallas-Houston corridor (+3.2%)',
      actionsToday: 23,
      efficiency: 97,
      icon: DollarSign,
    },
    {
      id: '4',
      name: 'Maintenance Predictor',
      type: 'maintenance',
      status: 'idle',
      lastAction: 'Scheduled maintenance for Vehicle #TR-4521',
      actionsToday: 8,
      efficiency: 92,
      icon: Wrench,
    },
    {
      id: '5',
      name: 'Analytics Engine',
      type: 'predictive_analytics',
      status: 'active',
      lastAction: 'Generated demand forecast for next week',
      actionsToday: 34,
      efficiency: 96,
      icon: TrendingUp,
    },
    {
      id: '6',
      name: 'Load Matcher',
      type: 'load_matching',
      status: 'processing',
      lastAction: 'Matching 15 available loads with optimal carriers',
      actionsToday: 89,
      efficiency: 91,
      icon: Activity,
    },
  ]);

  useEffect(() => {
    // Simulate real-time agent status updates
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        status: Math.random() > 0.7 ? 'processing' : 
                Math.random() > 0.3 ? 'active' : 'idle',
        actionsToday: agent.actionsToday + Math.floor(Math.random() * 3),
        efficiency: Math.min(100, agent.efficiency + (Math.random() - 0.5) * 2),
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'idle': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'active': return 'default';
      case 'processing': return 'secondary';
      case 'idle': return 'outline';
      default: return 'outline';
    }
  };

  const executeAction = async (action: AgentAction) => {
    // ... keep existing code (action execution logic) the same ...
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Agent Control Center</h2>
          <p className="text-muted-foreground">Monitor and manage autonomous AI agents</p>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium">All Systems Operational</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <Card key={agent.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)} animate-pulse`} />
                    <Badge variant={getStatusVariant(agent.status)}>
                      {agent.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  {agent.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} Agent
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency</span>
                    <span className="font-medium">{agent.efficiency.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${agent.efficiency}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Actions Today</span>
                    <span className="font-medium">{agent.actionsToday}</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <strong>Last Action:</strong> {agent.lastAction}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Logs
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {agents.filter(a => a.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {agents.reduce((sum, a) => sum + a.actionsToday, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Actions Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(agents.reduce((sum, a) => sum + a.efficiency, 0) / agents.length).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {agents.filter(a => a.status === 'processing').length}
              </div>
              <div className="text-sm text-muted-foreground">Processing Tasks</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAgentManager;
