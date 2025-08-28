import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  Settings, 
  Activity, 
  Zap, 
  Database, 
  Network, 
  Shield, 
  BarChart3, 
  Plus,
  Edit,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Cpu,
  MemoryStick
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../../../components/layout/EnhancedLayout';
import { EnhancedCard, EnhancedTable } from '../../../components/ui/EnhancedUIComponents';
interface MCPAgent {
  id: string;
  name: string;
  type: 'autonomous' | 'assistant' | 'monitor' | 'processor';
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  cpu: number;
  memory: number;
  uptime: string;
  lastActivity: string;
  tasksCompleted: number;
  errorRate: number;
  apiEndpoint: string;
  version: string;
  capabilities: string[];
}

const MCPAgentManagement: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [agents, setAgents] = useState<MCPAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<MCPAgent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected');

  // Mock data for demonstration
  useEffect(() => {
    const mockAgents: MCPAgent[] = [
      {
        id: '1',
        name: 'Autonomous Route Optimizer',
        type: 'autonomous',
        status: 'active',
        cpu: 45,
        memory: 67,
        uptime: '7d 12h 34m',
        lastActivity: '2 minutes ago',
        tasksCompleted: 1247,
        errorRate: 0.2,
        apiEndpoint: 'http://localhost:3001/api/agents/route-optimizer',
        version: '2.1.4',
        capabilities: ['route-optimization', 'traffic-analysis', 'fuel-efficiency']
      },
      {
        id: '2',
        name: 'Load Balancing Assistant',
        type: 'assistant',
        status: 'active',
        cpu: 23,
        memory: 34,
        uptime: '3d 8h 15m',
        lastActivity: '5 minutes ago',
        tasksCompleted: 892,
        errorRate: 0.1,
        apiEndpoint: 'http://localhost:3001/api/agents/load-balancer',
        version: '1.8.2',
        capabilities: ['load-balancing', 'capacity-planning', 'demand-forecasting']
      },
      {
        id: '3',
        name: 'System Health Monitor',
        type: 'monitor',
        status: 'active',
        cpu: 12,
        memory: 28,
        uptime: '15d 4h 22m',
        lastActivity: '1 minute ago',
        tasksCompleted: 2156,
        errorRate: 0.0,
        apiEndpoint: 'http://localhost:3001/api/agents/health-monitor',
        version: '3.0.1',
        capabilities: ['health-monitoring', 'alerting', 'performance-tracking']
      },
      {
        id: '4',
        name: 'Data Processor',
        type: 'processor',
        status: 'error',
        cpu: 89,
        memory: 95,
        uptime: '1d 2h 45m',
        lastActivity: '15 minutes ago',
        tasksCompleted: 456,
        errorRate: 12.5,
        apiEndpoint: 'http://localhost:3001/api/agents/data-processor',
        version: '1.5.3',
        capabilities: ['data-processing', 'etl', 'analytics']
      }
    ];

    setAgents(mockAgents);
      setIsLoading(false);
    
    // Test API connection
    testAPIConnection();
  }, []);

  const testAPIConnection = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        setApiStatus('connected');
      } else {
        setApiStatus('error');
      }
    } catch (error) {
      console.error('MCP API connection failed:', error);
      setApiStatus('disconnected');
    }
  };

  const refreshAgents = () => {
    console.log('Refreshing agents...');
    // Implement refresh logic here
  };

  const addNewAgent = () => {
    console.log('Adding new agent...');
    // Implement add agent logic here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'error': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'inactive': return <Pause className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'autonomous': return <Bot className="w-5 h-5 text-blue-600" />;
      case 'assistant': return <Zap className="w-5 h-5 text-purple-600" />;
      case 'monitor': return <Activity className="w-5 h-5 text-green-600" />;
      case 'processor': return <Database className="w-5 h-5 text-orange-600" />;
      default: return <Bot className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleAgentAction = async (agentId: string, action: 'start' | 'stop' | 'restart' | 'configure') => {
    try {
      const agent = agents.find(a => a.id === agentId);
      if (!agent) return;

      const response = await fetch(`http://localhost:3001/api/agents/${agentId}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update agent status locally
        setAgents(prev => prev.map(agent => 
          agent.id === agentId 
            ? { ...agent, status: action === 'stop' ? 'inactive' : 'active' }
            : agent
        ));
      }
    } catch (error) {
      console.error(`Failed to ${action} agent:`, error);
    }
  };

  const columns = [
    {
      key: 'name',
      title: 'Agent Name',
      render: (agent: MCPAgent) => (
        <div className="flex items-center space-x-3">
          {getTypeIcon(agent.type)}
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-100">
              {agent.name}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              v{agent.version}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (agent: MCPAgent) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
          {getStatusIcon(agent.status)}
          <span className="ml-1 capitalize">{agent.status}</span>
        </span>
      )
    },
    {
      key: 'performance',
      title: 'Performance',
      render: (agent: MCPAgent) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Cpu className="w-3 h-3 text-blue-500" />
            <span className="text-sm">{agent.cpu}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <MemoryStick className="w-3 h-3 text-green-500" />
            <span className="text-sm">{agent.memory}%</span>
          </div>
        </div>
      )
    },
    {
      key: 'uptime',
      title: 'Uptime',
      render: (agent: MCPAgent) => (
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {agent.uptime}
        </div>
      )
    },
    {
      key: 'tasks',
      title: 'Tasks',
      render: (agent: MCPAgent) => (
        <div className="text-sm">
          <div className="font-medium text-slate-800 dark:text-slate-100">
            {agent.tasksCompleted.toLocaleString()}
          </div>
          <div className="text-slate-500 dark:text-slate-400">
            {agent.errorRate}% error rate
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (agent: MCPAgent) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => handleAgentAction(agent.id, 'start')}
            disabled={agent.status === 'active'}
          >
            <Play className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => handleAgentAction(agent.id, 'stop')}
            disabled={agent.status === 'inactive'}
          >
            <Pause className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => handleAgentAction(agent.id, 'configure')}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
          <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              🤖 MCP Agent Management
              </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage and monitor your AI agents and autonomous systems
              </p>
            </div>
            <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              apiStatus === 'connected' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : apiStatus === 'error'
                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
            }`}>
              <Network className="w-4 h-4" />
              <span className="text-sm font-medium">
                API: {apiStatus === 'connected' ? 'Connected' : apiStatus === 'error' ? 'Error' : 'Disconnected'}
              </span>
            </div>
            <Button onClick={refreshAgents}>
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button onClick={addNewAgent}>
              <Plus className="w-4 h-4" />
              Add Agent
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Agents</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{agents.length}</p>
              </div>
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
          </EnhancedCard>

          <EnhancedCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Active Agents</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {agents.filter(a => a.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </EnhancedCard>

          <EnhancedCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {agents.reduce((sum, agent) => sum + agent.tasksCompleted, 0).toLocaleString()}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </EnhancedCard>

          <EnhancedCard>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Error Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {(agents.reduce((sum, agent) => sum + agent.errorRate, 0) / agents.length).toFixed(1)}%
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </EnhancedCard>
        </div>

        {/* Agents Table */}
        <EnhancedCard>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Agent Overview
              </h2>
              <div className="flex space-x-2">
                <Button>
                  <Edit className="w-4 h-4" />
                  Configure
                </Button>
                <Button>
                  <Shield className="w-4 h-4" />
                  Security
                </Button>
              </div>
            </div>
            
            <EnhancedTable
              data={agents}
              columns={columns}
              mode={isDarkMode ? 'dark' : 'light'}
            />
          </div>
        </EnhancedCard>

        {/* Agent Details Modal */}
        {selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Agent Details: {selectedAgent.name}
                  </h3>
                  <Button onClick={() => setSelectedAgent(null)}>
                    ×
                  </Button>
        </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type
                      </label>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(selectedAgent.type)}
                        <span className="capitalize">{selectedAgent.type}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAgent.status)}`}>
                        {getStatusIcon(selectedAgent.status)}
                        <span className="ml-1 capitalize">{selectedAgent.status}</span>
                      </span>
                    </div>
          </div>
          
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API Endpoint
                    </label>
                    <code className="block p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                      {selectedAgent.apiEndpoint}
                    </code>
            </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Capabilities
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.capabilities.map((capability, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-full text-xs"
                        >
                          {capability}
                        </span>
                      ))}
            </div>
        </div>

                  <div className="flex justify-end space-x-3">
                    <Button onClick={() => setSelectedAgent(null)}>
                      Close
                    </Button>
                    <Button>
                      <Settings className="w-4 h-4" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCPAgentManagement;