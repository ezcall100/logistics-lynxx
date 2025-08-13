
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Wifi, 
  WifiOff, 
  RefreshCw,
  CheckCircle, 
  AlertTriangle,
  Clock,
  Zap,
  Info,
  Loader
} from 'lucide-react';
import { useRealtimeAgentUpdates } from '@/hooks/useRealtimeAgentUpdates';
import { useN8NIntegration } from '@/hooks/autonomous/useN8NIntegration';
import { useToast } from '@/hooks/use-toast';

export const RealtimeAgentDashboard: React.FC = () => {
  const {
    isConnected,
    connectionError,
    agentUpdates,
    taskCompletions,
    runHealthCheck,
    connect
  } = useRealtimeAgentUpdates();
  
  const {
    isConnected: n8nConnected,
    currentBatch,
    agentUpdates: n8nAgentUpdates,
    workflowStatus,
    totalAgentsActivated,
    activate250Agents
  } = useN8NIntegration();
  
  const [systemHealth, setSystemHealth] = useState(0);
  const [isRunningHealthCheck, setIsRunningHealthCheck] = useState(false);
  const { toast } = useToast();

  const agentTypes = ['researcher', 'frontend', 'backend', 'database', 'testing', 'deployment'];

  useEffect(() => {
    if (agentUpdates.length > 0) {
      const healthyAgents = agentUpdates.filter(update => update.status === 'healthy').length;
      const totalAgents = agentUpdates.length;
      setSystemHealth(totalAgents > 0 ? (healthyAgents / totalAgents) * 100 : 0);
    }
  }, [agentUpdates]);

  const handleHealthCheck = async () => {
    if (!isConnected) {
      toast({
        title: "Connection Required",
        description: "Please establish WebSocket connection first",
        variant: "destructive"
      });
      return;
    }

    setIsRunningHealthCheck(true);
    runHealthCheck(agentTypes);
    
    toast({
      title: "Health Check Started",
      description: "Running real-time health check for all agents",
    });

    // Auto-stop the loading state after 10 seconds
    setTimeout(() => {
      setIsRunningHealthCheck(false);
    }, 10000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'checking': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'working': return <Zap className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'checking': return 'bg-blue-100 text-blue-800';
      case 'working': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className={`border-2 ${isConnected ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isConnected ? <Wifi className="h-5 w-5 text-green-600" /> : <WifiOff className="h-5 w-5 text-red-600" />}
              <CardTitle className={isConnected ? 'text-green-800' : 'text-red-800'}>
                Real-time Connection {isConnected ? 'Active' : 'Disconnected'}
              </CardTitle>
            </div>
            {!isConnected && (
              <Button onClick={connect} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reconnect
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {connectionError && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Connection Error:</strong> {connectionError}
              </AlertDescription>
            </Alert>
          )}
          
          {!isConnected && !connectionError && (
            <Alert className="mb-4">
              <Loader className="h-4 w-4 animate-spin" />
              <AlertDescription>
                Attempting to establish WebSocket connection to receive real-time updates...
              </AlertDescription>
            </Alert>
          )}
          
          <div className="text-sm">
            {isConnected ? 
              '✅ Receiving live updates from autonomous agents' : 
              '🔄 Connecting to receive real-time agent status updates'
            }
          </div>
          
          {!isConnected && (
            <div className="text-xs text-muted-foreground mt-2">
              WebSocket URL: wss://imcyiofodlnbomemvqto.supabase.co/functions/v1/realtime-agent-updates
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Health Overview */}
      <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time System Health
                </CardTitle>
                <CardDescription>
                  Live monitoring of all autonomous agents
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => activate250Agents()}
                  disabled={!n8nConnected || workflowStatus === 'starting'}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {workflowStatus === 'starting' ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  {workflowStatus === 'starting' ? 'Activating...' : 'Activate 250 Agents'}
                </Button>
                <Button
                  onClick={handleHealthCheck}
                  disabled={!isConnected || isRunningHealthCheck}
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  {isRunningHealthCheck ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                  {isRunningHealthCheck ? 'Running Check...' : 'Health Check'}
                </Button>
              </div>
            </div>
        </CardHeader>
        <CardContent>
          {/* Activation Status */}
          {totalAgentsActivated > 0 && (
            <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-800">Agent Activation Progress</span>
                <span className="text-sm font-medium text-green-800">{totalAgentsActivated}/250 Agents</span>
              </div>
              <Progress value={(totalAgentsActivated / 250) * 100} className="h-2 mb-2" />
              <div className="text-xs text-green-700">
                Status: {workflowStatus === 'completed' ? '✅ All Agents Active' : `🚀 ${workflowStatus}`}
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall System Health</span>
              <span className="text-sm font-medium">{Math.round(systemHealth)}%</span>
            </div>
            <Progress value={systemHealth} className="h-3" />
          </div>
          
          {agentUpdates.length === 0 && isConnected && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                No agent updates received yet. Click "Activate 250 Agents" to start the autonomous system or "Health Check" to test individual agents.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Live Agent Updates */}
      {agentUpdates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agentUpdates.slice(0, 6).map((update, index) => (
            <Card key={`${update.agent_type}-${update.timestamp}-${index}`} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg capitalize">{update.agent_type} Agent</CardTitle>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(update.status)}
                    <Badge className={getStatusColor(update.status)}>
                      {update.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Status Message:</p>
                  <p className="text-xs bg-gray-50 p-2 rounded">{update.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="ml-1 font-medium">{update.response_time}ms</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Update:</span>
                    <span className="ml-1 font-medium">
                      {new Date(update.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Task Completions */}
      {taskCompletions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Task Completions</CardTitle>
            <CardDescription>Live feed of completed autonomous tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {taskCompletions.slice(0, 5).map((task, index) => (
                <div key={`${task.task_id}-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {task.status === 'completed' ? 
                      <CheckCircle className="h-4 w-4 text-green-600" /> : 
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    }
                    <span className="text-sm font-medium">Task {task.task_id}</span>
                    <Badge variant="secondary" className="text-xs">
                      {task.agent_id}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {task.duration}ms • {new Date(task.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
