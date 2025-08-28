import React, { useState, useEffect } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Bot, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AutonomousAgentProps {
  agentId: string;
  agentName: string;
  agentType: string;
  status: 'running' | 'stopped' | 'error' | 'starting';
  lastActivity: Date;
  performance: {
    cpu: number;
    memory: number;
    tasksCompleted: number;
    successRate: number;
  };
}

const AutonomousAgentManager: React.FC = () => {
  const [agents, setAgents] = useState<AutonomousAgentProps[]>([]);
  const [, setIsLoading] = useState(true);
  // const [, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading autonomous agents
    setTimeout(() => {
      setAgents([
        {
          agentId: 'dashboard-monitor',
          agentName: 'Dashboard Monitor',
          agentType: 'monitoring',
          status: 'running',
          lastActivity: new Date(),
          performance: { cpu: 15, memory: 45, tasksCompleted: 1250, successRate: 98.5 }
        },
        {
          agentId: 'load-matcher',
          agentName: 'Load Matcher',
          agentType: 'matching',
          status: 'running',
          lastActivity: new Date(Date.now() - 30000),
          performance: { cpu: 25, memory: 60, tasksCompleted: 890, successRate: 95.2 }
        },
        {
          agentId: 'rate-optimizer',
          agentName: 'Rate Optimizer',
          agentType: 'optimization',
          status: 'running',
          lastActivity: new Date(Date.now() - 60000),
          performance: { cpu: 35, memory: 75, tasksCompleted: 567, successRate: 97.8 }
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAgentAction = async (agentId: string, action: 'start' | 'stop' | 'restart') => {
    console.log(`Agent ${agentId} action: ${action}`);
    // Implement agent control logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      case 'starting': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Autonomous Agent Manager
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => handleAgentAction('all', 'restart')}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart All
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Agent Settings
            </Button>
          </div>
        </div>
        <p className="text-gray-600">
          Manage and monitor autonomous AI agents across the TMS ecosystem
        </p>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <ResponsiveCard key={agent.agentId} className="shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg">{agent.agentName}</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(agent.status)}`}></div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">{agent.status}</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">{agent.agentType} agent</p>
            </div>
            <div>
              <div className="space-y-4">
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{agent.performance.cpu}%</div>
                    <div className="text-sm text-gray-500">CPU</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{agent.performance.memory}%</div>
                    <div className="text-sm text-gray-500">Memory</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tasks Completed:</span>
                    <span className="font-semibold">{agent.performance.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate:</span>
                    <span className="font-semibold text-green-600">{agent.performance.successRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Last Activity:</span>
                    <span className="font-semibold">{agent.lastActivity.toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Agent Controls */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAgentAction(agent.agentId, 'start')}
                    disabled={agent.status === 'running'}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                  <Button
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAgentAction(agent.agentId, 'stop')}
                    disabled={agent.status === 'stopped'}
                  >
                    <Pause className="h-3 w-3 mr-1" />
                    Stop
                  </Button>
                  <Button
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAgentAction(agent.agentId, 'restart')}
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Restart
                  </Button>
                </div>
              </div>
            </div>
          </ResponsiveCard>
        ))}
      </div>
    </div>
  );
};

export default AutonomousAgentManager;