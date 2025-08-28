import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Activity, Bot, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { executeFabAction } from '../../../components/FabActions';
import { Button } from '@/components/ui/button';

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
            <Button>
                variant="outline" 
              </Button>onClick={() =>handleFabAction('quickAction', { action: 'refresh', page: 'agent-monitor' })}
            >
              Refresh
              variant="default"
              onClick={() => handleFabAction('assistant', 'Help me with Agent Monitor')}
            >
              AI Assistant<Button>
                 
              </Button></div>
        <p className="text-gray-600">
          Real-time monitoring of all autonomous agents
        </p>
      </div>

      {/* Autonomous Agent Status */}
      <ResponsiveCard className="shadow-lg border-l-4 border-l-blue-500">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg">Autonomous Agent: monitor-agent</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${agentStatus.isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{agentStatus.isRunning ? 'Running' : 'Stopped'}</span>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400">AI-powered automation for agent monitor</p>
        </div>
        <div>
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
              size="sm" 
              variant="outline"
              onClick={() => handleAgentAction('start')}
              disabled={agentStatus.isRunning}
            >
              <Play className="h-3 w-3 mr-1" />
              Start Agent
              size="sm" 
              variant="outline"
              onClick={() => handleAgentAction('stop')}
              disabled={!agentStatus.isRunning}
            >
              <Pause className="h-3 w-3 mr-1" />
              Stop Agent
              size="sm" 
              variant="outline"
              onClick={() => handleAgentAction('restart')}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Restart Agent
          </div>
        </div>
      </ResponsiveCard>

      {/* Main Content */}
      <ResponsiveCard className="shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Agent Monitor</h3>
          <p className="text-slate-600 dark:text-slate-400">Real-time monitoring of all autonomous agents</p>
        </div>
        <div>
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
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Agent Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Performance Metrics</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Error Tracking</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Real Time Monitoring</span>
                </div>
              </div>

              {/* Portal-specific content */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Portal Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('dispatch', { type: 'agent-monitor_configure', payload: { action: 'configure' } })}
                  >
                    <Settings className="h-5 w-5 mb-1" />
                    Configure
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('assistant', 'Help me understand Agent Monitor')}
                  >
                    <Bot className="h-5 w-5 mb-1" />
                    AI Help
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center"
                    onClick={() => handleFabAction('quickAction', { action: 'export', page: 'agent-monitor' })}
                  >
                    <Activity className="h-5 w-5 mb-1" />
                    Monitor
                </div>
              </div></Button>
            </div>
          )}
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default AgentMonitor;