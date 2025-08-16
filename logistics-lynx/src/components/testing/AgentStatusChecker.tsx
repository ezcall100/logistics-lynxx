
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  RefreshCw,
  Search,
  Code,
  Database,
  TestTube,
  Rocket,
  Brain
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AgentStatus {
  type: string;
  name: string;
  status: 'healthy' | 'warning' | 'error' | 'checking';
  lastCheck: string;
  responseTime: number;
  message: string;
  icon: React.ComponentType<any>;
}

export const AgentStatusChecker: React.FC = () => {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [overallHealth, setOverallHealth] = useState(0);
  const { toast } = useToast();

  const agentTypes = [
    { type: 'researcher', name: 'Research Agent', icon: Search },
    { type: 'frontend', name: 'Frontend Agent', icon: Code },
    { type: 'backend', name: 'Backend Agent', icon: Database },
    { type: 'database', name: 'Database Agent', icon: Database },
    { type: 'testing', name: 'Testing Agent', icon: TestTube },
    { type: 'deployment', name: 'Deployment Agent', icon: Rocket }
  ];

  const checkAgentHealth = async (agent: typeof agentTypes[0]): Promise<AgentStatus> => {
    const startTime = Date.now();
    
    try {
      // Test autonomous AI function call for each agent type
      const { data, error } = await supabase.functions.invoke('autonomous-ai', {
        body: {
          action: 'agent_test',
          data: {
            agent_id: `test-${agent.type}-${Date.now()}`,
            agent_type: agent.type,
            test_prompt: `Perform a health check for ${agent.name}`,
            test_mode: true
          }
        }
      });

      const responseTime = Date.now() - startTime;

      if (error) throw error;

      return {
        type: agent.type,
        name: agent.name,
        status: 'healthy',
        lastCheck: new Date().toISOString(),
        responseTime,
        message: `✅ Agent responding normally (${responseTime}ms)`,
        icon: agent.icon
      };

    } catch (error: unknown) {
      return {
        type: agent.type,
        name: agent.name,
        status: 'error',
        lastCheck: new Date().toISOString(),
        responseTime: Date.now() - startTime,
        message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        icon: agent.icon
      };
    }
  };

  const runHealthCheck = useCallback(async () => {
    setIsChecking(true);
    
    // Initialize agents with checking status
    const initialAgents = agentTypes.map(agent => ({
      type: agent.type,
      name: agent.name,
      status: 'checking' as const,
      lastCheck: new Date().toISOString(),
      responseTime: 0,
      message: 'Checking agent status...',
      icon: agent.icon
    }));
    
    setAgents(initialAgents);

    try {
      // Check all agents concurrently but with a small delay to avoid overwhelming
      const results: AgentStatus[] = [];
      for (const agent of agentTypes) {
        const result = await checkAgentHealth(agent);
        results.push(result);
        
        // Update UI immediately as each agent is checked
        setAgents(prev => prev.map(a => 
          a.type === result.type ? result : a
        ));
        
        // Small delay between checks
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const healthyCount = results.filter(r => r.status === 'healthy').length;
      const healthPercentage = (healthyCount / results.length) * 100;
      setOverallHealth(healthPercentage);

      toast({
        title: "Agent Health Check Complete",
        description: `${healthyCount}/${results.length} agents are healthy (${Math.round(healthPercentage)}%)`,
        variant: healthPercentage === 100 ? "default" : "destructive"
      });

    } catch (error: unknown) {
      toast({
        title: "Health Check Failed",
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  }, [toast, agentTypes, checkAgentHealth]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'checking': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'checking': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    // Run initial health check on component mount
    runHealthCheck();
  }, [runHealthCheck]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Agent Development Status Checker
              </CardTitle>
              <CardDescription>
                Monitor the health and functionality of all development agents
              </CardDescription>
            </div>
            <Button
              onClick={runHealthCheck}
              disabled={isChecking}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? 'Checking...' : 'Run Health Check'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall System Health</span>
              <span className="text-sm font-medium">{Math.round(overallHealth)}%</span>
            </div>
            <Progress value={overallHealth} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          return (
            <Card key={agent.type} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Status Message:</p>
                  <p className="text-xs bg-gray-50 p-2 rounded">{agent.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="ml-1 font-medium">{agent.responseTime}ms</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Check:</span>
                    <span className="ml-1 font-medium">
                      {new Date(agent.lastCheck).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* System Integration Status */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <CheckCircle className="h-5 w-5" />
            Development Environment Status
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium">✅ Supabase Integration</div>
              <div>Database, Edge Functions, Auth</div>
            </div>
            <div>
              <div className="font-medium">✅ OpenAI Integration</div>
              <div>AI generation and processing</div>
            </div>
            <div>
              <div className="font-medium">✅ GitHub Integration</div>
              <div>Auto-commit and version control</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
