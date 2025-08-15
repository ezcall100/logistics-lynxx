import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Brain, 
  Activity, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Zap,
  Cpu,
  HardDrive,
  Network,
  Cloud,
  Shield,
  Target,
  TrendingUp,
  Users,
  Globe,
  Monitor,
  Server,
  Database,
  TestTube,
  Rocket
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface AgentActivity {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error' | 'completed';
  progress: number;
  currentTask: string;
  lastUpdate: string;
  performance: number;
}

const AutonomousSystemStatus: React.FC = () => {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [agentActivities, setAgentActivities] = useState<AgentActivity[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Initialize system metrics
  useEffect(() => {
    const initialMetrics: SystemMetric[] = [
      {
        name: 'Overall Completion',
        value: 89,
        unit: '%',
        status: 'excellent',
        trend: 'up',
        icon: Target
      },
      {
        name: 'Active Agents',
        value: 12,
        unit: '',
        status: 'good',
        trend: 'stable',
        icon: Brain
      },
      {
        name: 'System Performance',
        value: 94,
        unit: '%',
        status: 'excellent',
        trend: 'up',
        icon: Zap
      },
      {
        name: 'CPU Usage',
        value: 45,
        unit: '%',
        status: 'good',
        trend: 'stable',
        icon: Cpu
      },
      {
        name: 'Memory Usage',
        value: 2.8,
        unit: 'GB',
        status: 'good',
        trend: 'stable',
        icon: HardDrive
      },
      {
        name: 'Network Latency',
        value: 12,
        unit: 'ms',
        status: 'excellent',
        trend: 'down',
        icon: Network
      },
      {
        name: 'Uptime',
        value: 99.98,
        unit: '%',
        status: 'excellent',
        trend: 'stable',
        icon: Cloud
      },
      {
        name: 'Security Status',
        value: 100,
        unit: '%',
        status: 'excellent',
        trend: 'stable',
        icon: Shield
      }
    ];

    setSystemMetrics(initialMetrics);
  }, []);

  // Initialize agent activities
  useEffect(() => {
    const initialActivities: AgentActivity[] = [
      {
        id: 'agent-001',
        name: 'Portal Development Agent',
        type: 'portal',
        status: 'active',
        progress: 95,
        currentTask: 'Finalizing Super Admin Portal UI',
        lastUpdate: 'Just now',
        performance: 98
      },
      {
        id: 'agent-002',
        name: 'Website Design Agent',
        type: 'website',
        status: 'active',
        progress: 88,
        currentTask: 'Implementing responsive components',
        lastUpdate: '2 minutes ago',
        performance: 92
      },
      {
        id: 'agent-003',
        name: 'API Development Agent',
        type: 'backend',
        status: 'active',
        progress: 92,
        currentTask: 'Testing REST endpoints',
        lastUpdate: '3 minutes ago',
        performance: 95
      },
      {
        id: 'agent-004',
        name: 'Database Optimization Agent',
        type: 'backend',
        status: 'active',
        progress: 78,
        currentTask: 'Creating performance indexes',
        lastUpdate: '5 minutes ago',
        performance: 87
      },
      {
        id: 'agent-005',
        name: 'Security Agent',
        type: 'infrastructure',
        status: 'active',
        progress: 45,
        currentTask: 'Running security scans',
        lastUpdate: '8 minutes ago',
        performance: 68
      },
      {
        id: 'agent-006',
        name: 'Testing Agent',
        type: 'testing',
        status: 'completed',
        progress: 100,
        currentTask: 'All tests passed successfully',
        lastUpdate: '10 minutes ago',
        performance: 100
      }
    ];

    setAgentActivities(initialActivities);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.name === 'Overall Completion' 
          ? Math.min(100, metric.value + Math.random() * 0.5)
          : metric.name === 'Active Agents'
          ? Math.max(8, Math.min(15, metric.value + (Math.random() > 0.5 ? 1 : -1)))
          : metric.value + (Math.random() * 2 - 1)
      })));

      setAgentActivities(prev => prev.map(agent => {
        if (agent.status === 'active' && agent.progress < 100) {
          const increment = Math.random() * 2;
          const newProgress = Math.min(100, agent.progress + increment);
          
          return {
            ...agent,
            progress: Math.round(newProgress * 100) / 100,
            status: newProgress >= 100 ? 'completed' : 'active',
            performance: Math.min(100, agent.performance + Math.random() * 1),
            lastUpdate: 'Just now'
          };
        }
        return agent;
      }));

      setLastUpdate(new Date());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-500';
      case 'good':
        return 'text-blue-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'portal':
        return <Monitor className="w-4 h-4" />;
      case 'website':
        return <Globe className="w-4 h-4" />;
      case 'backend':
        return <Server className="w-4 h-4" />;
      case 'infrastructure':
        return <Database className="w-4 h-4" />;
      case 'testing':
        return <TestTube className="w-4 h-4" />;
      case 'deployment':
        return <Rocket className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const overallCompletion = systemMetrics.find(m => m.name === 'Overall Completion')?.value || 0;
  const activeAgents = systemMetrics.find(m => m.name === 'Active Agents')?.value || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-Time System Status</h2>
          <p className="text-gray-600">Live monitoring of autonomous system performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Live Updates
          </Badge>
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* System Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {typeof metric.value === 'number' && metric.value % 1 === 0 
                      ? metric.value 
                      : metric.value.toFixed(1)
                    }{metric.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <metric.icon className={`w-6 h-6 ${getStatusColor(metric.status)}`} />
                  {getTrendIcon(metric.trend)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Overall System Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">{overallCompletion.toFixed(1)}%</span>
              <span className="text-sm text-gray-600">
                {activeAgents} active agents working
              </span>
            </div>
            <Progress value={overallCompletion} className="h-3" />
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">92%</div>
                <div className="text-xs text-gray-600">Portals</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">88%</div>
                <div className="text-xs text-gray-600">Website</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">95%</div>
                <div className="text-xs text-gray-600">Backend</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">85%</div>
                <div className="text-xs text-gray-600">Infrastructure</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Active Agent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agentActivities.map((agent) => (
              <div key={agent.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getAgentIcon(agent.type)}
                  <div>
                    <h3 className="font-medium text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.currentTask}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-bold text-gray-900">{agent.progress}%</span>
                  </div>
                  <Progress value={agent.progress} className="h-2" />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900">{agent.performance}%</div>
                    <div className="text-xs text-gray-600">Performance</div>
                  </div>
                  
                  <Badge className={getAgentStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{agent.lastUpdate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousSystemStatus;
