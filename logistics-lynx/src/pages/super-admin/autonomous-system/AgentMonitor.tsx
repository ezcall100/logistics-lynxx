import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card.tsx';
import { Button } from '../../../components/ui/button.tsx';
import { Badge } from '../../../components/ui/badge.tsx';
import { Activity, Bot, Activity, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { executeFabAction } from '../../../components/FabActions';

interface AgentMonitorProps {}

const AgentMonitor: React.FC<AgentMonitorProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [agentStatus, setAgentStatus] = useState({
    isRunning: true,
    lastActivity: new Date(),
    performance: { cpu: 25, memory: 60, tasksCompleted: 0, successRate: 95 }
  });

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleFabAction = async (action: string, params?: any) => {
    try {
      const result = await executeFabAction(action as any, params);
      if (result.success) {
        console.log('FAB action successful:', result.message);
      }
    } catch (error) {
      console.error('FAB action failed:', error);
    }
  };

  const handleAgentAction = async (action: 'start' | 'stop' | 'restart') => {
    console.log(`Agent ${item.autonomousAgent} action: ${action}`);
    // Implement autonomous agent control
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Agent Monitor
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handleFabAction('quickAction', { action: 'refresh', page: 'agent-monitor' })}
            >
              Refresh
            </Button>
            <Button 
              variant="default"
              onClick={() => handleFabAction('assistant', 'Help me with Agent Monitor')}
            >
              AI Assistant
            </Button>
          </div>
        </div>
        <p className="text-gray-600">
          Real-time monitoring of all autonomous agents
        </p>
      </div>

      {/* Autonomous Agent Status */}
      <Card className="shadow-lg border-l-4 border-l-blue-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Autonomous Agent: monitor-agent</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${agentStatus.isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <Badge variant="outline">{agentStatus.isRunning ? 'Running' : 'Stopped'}</Badge>
            </div>
          </div>
          <CardDescription>AI-powered automation for agent monitor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">{agentStatus.performance.cpu}%</div>
              <div className="text-sm text-gray-500">CPU Usage</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-600">{agentStatus.performance.memory}%</div>
              <div className="text-sm text-gray-500">Memory</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-600">{agentStatus.performance.tasksCompleted}</div>
              <div className="text-sm text-gray-500">Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-orange-600">{agentStatus.performance.successRate}%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleAgentAction('start')}
              disabled={agentStatus.isRunning}
            >
              <Play className="h-3 w-3 mr-1" />
              Start Agent
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleAgentAction('stop')}
              disabled={!agentStatus.isRunning}
            >
              <Pause className="h-3 w-3 mr-1" />
              Stop Agent
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleAgentAction('restart')}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Restart Agent
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Agent Monitor</CardTitle>
          <CardDescription>Real-time monitoring of all autonomous agents</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Content Section */}
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Agent Monitor
                </h3>
                <p className="text-gray-600 mt-2">
                  Real-time monitoring of all autonomous agents
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Badge variant="outline">Agent Status</Badge>
                  <Badge variant="outline">Performance Metrics</Badge>
                  <Badge variant="outline">Error Tracking</Badge>
                  <Badge variant="outline">Real Time Monitoring</Badge>
                </div>
              </div>

              {/* Portal-specific content */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Portal Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('dispatch', { type: 'agent-monitor_configure', payload: { action: 'configure' } })}
                  >
                    <Settings className="h-5 w-5 mb-1" />
                    Configure
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('assistant', 'Help me understand Agent Monitor')}
                  >
                    <Bot className="h-5 w-5 mb-1" />
                    AI Help
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('quickAction', { action: 'export', page: 'agent-monitor' })}
                  >
                    <Activity className="h-5 w-5 mb-1" />
                    Monitor
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentMonitor;