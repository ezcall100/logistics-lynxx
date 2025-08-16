import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  Bot, 
  Database, 
  GitBranch, 
  Monitor, 
  Rocket,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: string;
  lastAction: string;
  nextAction: string;
  uptime: number;
  startTime: number;
}

interface Update {
  agentId: string;
  agentName: string;
  action: string;
  timestamp: string;
  type: string;
}

interface SystemStatus {
  totalAgents: number;
  activeAgents: number;
  totalUptime: number;
  lastUpdate: string;
}

interface RealTimeData {
  type: string;
  agents: Agent[];
  recentUpdates: Update[];
  systemStatus: SystemStatus;
  timestamp: string;
}

const getAgentIcon = (type: string) => {
  switch (type) {
    case 'deployment':
      return <Rocket className="h-4 w-4" />;
    case 'monitoring':
      return <Monitor className="h-4 w-4" />;
    case 'ai-analysis':
      return <Bot className="h-4 w-4" />;
    case 'database-maintenance':
      return <Database className="h-4 w-4" />;
    case 'github-sync':
      return <GitBranch className="h-4 w-4" />;
    default:
      return <Activity className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-500';
    case 'inactive':
      return 'bg-gray-500';
    case 'error':
      return 'bg-red-500';
    default:
      return 'bg-yellow-500';
  }
};

const formatUptime = (uptime: number) => {
  const seconds = Math.floor(uptime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

export const RealTimeAgentMonitor: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    const ws = new WebSocket('ws://localhost:8085');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to autonomous agent WebSocket');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const data: RealTimeData = JSON.parse(event.data);
        
        if (data.type === 'agent_status') {
          setAgents(data.data);
        } else if (data.type === 'real_time_update') {
          if (!isPaused) {
            setAgents(data.agents);
            setUpdates(data.recentUpdates);
            setSystemStatus(data.systemStatus);
          }
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from autonomous agent WebSocket');
      setIsConnected(false);
      // Try to reconnect after 5 seconds
      setTimeout(connectWebSocket, 5000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Autonomous Agent Monitor</h2>
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={togglePause}
          className="flex items-center space-x-2"
        >
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          <span>{isPaused ? "Resume" : "Pause"}</span>
        </Button>
      </div>

      {/* System Status */}
      {systemStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>System Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{systemStatus.totalAgents}</div>
                <div className="text-sm text-gray-600">Total Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{systemStatus.activeAgents}</div>
                <div className="text-sm text-gray-600">Active Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatUptime(systemStatus.totalUptime)}
                </div>
                <div className="text-sm text-gray-600">Total Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {updates.length}
                </div>
                <div className="text-sm text-gray-600">Total Updates</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {getAgentIcon(agent.type)}
                  <span>{agent.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                  <Badge variant="outline" className="text-xs">
                    {agent.status}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Clock className="h-3 w-3" />
                  <span>Uptime: {formatUptime(agent.uptime)}</span>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Last Action:</div>
                  <div className="text-gray-600 text-xs">{agent.lastAction}</div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">Next Action:</div>
                  <div className="text-gray-600 text-xs">{agent.nextAction}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Real-time Updates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {updates.slice().reverse().map((update, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-sm text-gray-900">
                        {update.agentName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(update.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {update.action}
                    </div>
                  </div>
                </div>
              ))}
              {updates.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Bot className="h-8 w-8 mx-auto mb-2" />
                  <p>Waiting for autonomous agent updates...</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
