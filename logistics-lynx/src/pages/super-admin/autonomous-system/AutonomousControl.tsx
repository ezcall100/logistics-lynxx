import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
import { Bot, Activity, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { executeFabAction } from '../../../components/FabActions';

const AutonomousControl: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [agentStatus] = useState({
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
    console.log(`Agent action: ${action}`);
    // Implement autonomous agent control
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Autonomous Control
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleFabAction('quickAction', { action: 'refresh', page: 'autonomous-control' })}>
              Refresh
            </Button>
            <Button>
              AI Assistant
            </Button>
          </div>
        </div>
        <p className="text-gray-600">
          AI agent management and autonomous system control
        </p>
      </div>

      {/* Autonomous Agent Status */}
      <ResponsiveCard className="shadow-lg border-l-4 border-l-blue-500">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg">Autonomous Agent: system-controller</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${agentStatus.isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{agentStatus.isRunning ? 'Running' : 'Stopped'}</span>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400">AI-powered automation for autonomous control</p>
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
            <Button
              onClick={() => handleAgentAction('start')}
              disabled={agentStatus.isRunning}
            >
              <Play className="h-3 w-3 mr-1" />
              Start Agent
            </Button>
            <Button
              onClick={() => handleAgentAction('stop')}
              disabled={!agentStatus.isRunning}
            >
              <Pause className="h-3 w-3 mr-1" />
              Stop Agent
            </Button>
            <Button
              onClick={() => handleAgentAction('restart')}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Restart Agent
            </Button>
          </div>
        </div>
      </ResponsiveCard>

      {/* Main Content */}
      <ResponsiveCard className="shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Autonomous Control
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            AI agent management and autonomous system control
          </p>
        </div>
      {/* End Main Content Header */}
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
                <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Autonomous Control
                </h3>
                <p className="text-gray-600 mt-2">
                  AI agent management and autonomous system control
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Agent Management</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">System Control</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Workflow Orchestration</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">Health Monitoring</span>
                </div>
              </div>

              {/* Portal-specific content */}
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Portal Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button
                    onClick={() => handleFabAction('dispatch', { type: 'autonomous-control_configure', payload: { action: 'configure' } })}
                  >
                    <Settings className="h-5 w-5 mb-1" />
                    Configure
                  </Button>
                  <Button>
                    <Bot className="h-5 w-5 mb-1" />
                    AI Help
                  </Button>
                  <Button>
                    <Activity className="h-5 w-5 mb-1" />
                    Monitor
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default AutonomousControl;