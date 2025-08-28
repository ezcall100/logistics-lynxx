import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Activity, 
  Cpu, 
  HardDrive, 
  Network,
  Zap,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface AgentMetrics {
  id: string;
  name: string;
  cpu: number;
  memory: number;
  network: number;
  status: 'online' | 'offline' | 'busy' | 'error';
  load: number;
  responseTime: number;
  lastSeen: string;
}

const AgentLoadBalancer: React.FC = () => {
  const [agents, setAgents] = useState<AgentMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoBalance, setAutoBalance] = useState(true);
  const [threshold, setThreshold] = useState(80);

  // Mock data for demonstration
  const mockAgents: AgentMetrics[] = [
    {
      id: 'agent-1',
      name: 'Frontend Agent',
      cpu: 45,
      memory: 62,
      network: 28,
      status: 'online',
      load: 65,
      responseTime: 120,
      lastSeen: new Date().toISOString()
    },
    {
      id: 'agent-2',
      name: 'Backend Agent',
      cpu: 78,
      memory: 85,
      network: 45,
      status: 'busy',
      load: 92,
      responseTime: 350,
      lastSeen: new Date().toISOString()
    },
    {
      id: 'agent-3',
      name: 'Database Agent',
      cpu: 32,
      memory: 48,
      network: 15,
      status: 'online',
      load: 42,
      responseTime: 85,
      lastSeen: new Date().toISOString()
    },
    {
      id: 'agent-4',
      name: 'Analytics Agent',
      cpu: 91,
      memory: 88,
      network: 67,
      status: 'error',
      load: 98,
      responseTime: 1200,
      lastSeen: new Date().toISOString()
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setAgents(mockAgents);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'busy':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'error':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4" />;
      case 'busy':
        return <Clock className="w-4 h-4" />;
      case 'error':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getLoadColor = (load: number) => {
    if (load >= 90) return 'text-red-600 dark:text-red-400';
    if (load >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Agent Load Balancer
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and balance MCP agent workloads
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoBalance}
              onChange={(e) => setAutoBalance(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Auto-balance
            </span>
          </div>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Threshold Control */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Load Threshold: {threshold}%
          </label>
          <Settings className="w-4 h-4 text-gray-400" />
        </div>
        <Slider
          value={threshold}
          onChange={setThreshold}
          min={50}
          max={95}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>50%</span>
          <span>95%</span>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {agent.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ID: {agent.id}
                </p>
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                {getStatusIcon(agent.status)}
                <span>{agent.status}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">CPU</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {agent.cpu}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Memory</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {agent.memory}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Network className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Network</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {agent.network}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Load</span>
                </div>
                <span className={`text-sm font-medium ${getLoadColor(agent.load)}`}>
                  {agent.load}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Response</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {agent.responseTime}ms
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Load Level</span>
                <span>{agent.load}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    agent.load >= 90 ? 'bg-red-500' :
                    agent.load >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${agent.load}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Load Balancer Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {agents.filter(a => a.status === 'online').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Online</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {agents.filter(a => a.status === 'busy').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Busy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {agents.filter(a => a.status === 'error').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Errors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(agents.reduce((sum, a) => sum + a.load, 0) / agents.length)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Load</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLoadBalancer;
