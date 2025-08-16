import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Cpu, 
  Database, 
  Code, 
  TestTube, 
  Rocket, 
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react';

const shipperadminPortal: React.FC = () => {
  const { 
    agents, 
    systemStatus, 
    executeAgentTask, 
    getSystemStats,
    setSystemStatus 
  } = useAutonomousAgentManager();
  const { toast } = useToast();
  const [activeExecutions, setActiveExecutions] = useState(0);
  const [lastTaskTime, setLastTaskTime] = useState<Date | null>(null);

  const stats = getSystemStats();

  // Force autonomous mode and trigger agent executions
  useEffect(() => {
    if (systemStatus !== 'autonomous') {
      setSystemStatus('autonomous');
    }
  }, [systemStatus, setSystemStatus]);

  // Portal-specific autonomous features
  const portalFeatures = [
  "shipment_tracking_automation",
  "cost_analysis_ai",
  "performance_reporting_ai",
  "carrier_rating_automation",
  "demand_forecasting_ai"
];
  
  // Agent integration status
  const agentIntegration = {
  "shipment_tracking_agent": true,
  "cost_optimization_agent": true,
  "performance_analysis_agent": true,
  "forecasting_agent": true
};

  const handleAgentExecution = async (agentType: string) => {
    const agent = agents.find(a => a.type === agentType);
    if (agent) {
      setActiveExecutions(prev => prev + 1);
      await executeAgentTask(agent);
      setActiveExecutions(prev => prev - 1);
      setLastTaskTime(new Date());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Shipper Admin Portal
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-Powered Shipper Admin Portal with Autonomous Agent Integration
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <Brain className="h-4 w-4 mr-2" />
              Autonomous Mode Active
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Activity className="h-4 w-4 mr-2" />
              {stats.active_agents} Agents Active
            </Badge>
          </div>
        </div>

        {/* Autonomous Agent Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Autonomous Agent Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(agentIntegration).map(([agentType, isEnabled]) => {
                const agent = agents.find(a => a.type === agentType);
                return (
                  <div key={agentType} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold capitalize">{agentType.replace('_', ' ')}</h3>
                      <Badge variant={isEnabled ? "default" : "secondary"}>
                        {isEnabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    {agent && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Status:</span>
                          <span className="capitalize">{agent.status}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Success Rate:</span>
                          <span>{agent.successRate}%</span>
                        </div>
                        <Progress value={agent.successRate} className="h-2" />
                        <Button 
                          size="sm" 
                          onClick={() => handleAgentExecution(agent.type)}
                          disabled={activeExecutions > 0}
                        >
                          Execute Task
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Portal Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Autonomous Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {portalFeatures.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-primary/5 to-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold capitalize">{feature.replace('_', ' ')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    AI-powered automation for {feature.replace('_', ' ').toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.active_agents}</div>
                <div className="text-sm text-muted-foreground">Active Agents</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">{stats.average_success_rate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.total_tasks_completed}</div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.uptime_hours}h</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Last Activity */}
        {lastTaskTime && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Last Autonomous Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Last task executed: {lastTaskTime.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default shipperadminPortal;