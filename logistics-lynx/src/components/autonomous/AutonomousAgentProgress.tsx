import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  Code, 
  Database, 
  Server, 
  Globe, 
  Monitor, 
  Smartphone, 
  Shield,
  Zap,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  Settings,
  TrendingUp,
  Target,
  Rocket,
  Users,
  FileText,
  Palette,
  TestTube,
  Wrench,
  Eye,
  Cpu,
  Network,
  HardDrive,
  Cloud,
  Lock,
  RefreshCw
} from 'lucide-react';

interface AgentTask {
  id: string;
  agentId: string;
  agentName: string;
  agentType: string;
  task: string;
  progress: number;
  status: 'idle' | 'working' | 'completed' | 'error' | 'paused';
  startTime: string;
  estimatedCompletion: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'portal' | 'website' | 'backend' | 'infrastructure' | 'testing' | 'deployment';
  currentStep: string;
  totalSteps: number;
  completedSteps: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  performance: number; // 0-100
  memoryUsage: number; // MB
  cpuUsage: number; // %
}

const AutonomousAgentProgress: React.FC = () => {
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [systemStatus, setSystemStatus] = useState<'autonomous' | 'manual' | 'paused'>('autonomous');

  // Initialize agent tasks
  useEffect(() => {
    const initialTasks: AgentTask[] = [
      // Portal Development Agents
      {
        id: 'task-001',
        agentId: 'portal-agent-001',
        agentName: 'Portal Development Agent',
        agentType: 'portal',
        task: 'Enhancing Super Admin Portal UI/UX',
        progress: 95,
        status: 'working',
        startTime: '2 hours ago',
        estimatedCompletion: '30 minutes',
        priority: 'high',
        category: 'portal',
        currentStep: 'Final UI polish and responsive design testing',
        totalSteps: 8,
        completedSteps: 7,
        health: 'excellent',
        performance: 98,
        memoryUsage: 245,
        cpuUsage: 15
      },
      {
        id: 'task-002',
        agentId: 'portal-agent-002',
        agentName: 'Broker Portal Agent',
        agentType: 'portal',
        task: 'Implementing advanced load matching algorithms',
        progress: 78,
        status: 'working',
        startTime: '1.5 hours ago',
        estimatedCompletion: '1 hour',
        priority: 'high',
        category: 'portal',
        currentStep: 'Testing matching algorithm with real data',
        totalSteps: 12,
        completedSteps: 9,
        health: 'good',
        performance: 92,
        memoryUsage: 312,
        cpuUsage: 28
      },
      {
        id: 'task-003',
        agentId: 'portal-agent-003',
        agentName: 'Carrier Portal Agent',
        agentType: 'portal',
        task: 'Fleet management dashboard optimization',
        progress: 82,
        status: 'working',
        startTime: '1 hour ago',
        estimatedCompletion: '45 minutes',
        priority: 'medium',
        category: 'portal',
        currentStep: 'Performance optimization and caching implementation',
        totalSteps: 10,
        completedSteps: 8,
        health: 'good',
        performance: 89,
        memoryUsage: 198,
        cpuUsage: 22
      },

      // Website Development Agents
      {
        id: 'task-004',
        agentId: 'website-agent-001',
        agentName: 'Website Design Agent',
        agentType: 'website',
        task: 'Creating responsive landing page components',
        progress: 100,
        status: 'completed',
        startTime: '3 hours ago',
        estimatedCompletion: 'Completed',
        priority: 'critical',
        category: 'website',
        currentStep: 'All components deployed and tested',
        totalSteps: 15,
        completedSteps: 15,
        health: 'excellent',
        performance: 100,
        memoryUsage: 156,
        cpuUsage: 8
      },
      {
        id: 'task-005',
        agentId: 'website-agent-002',
        agentName: 'Content Management Agent',
        agentType: 'website',
        task: 'Setting up blog and content management system',
        progress: 65,
        status: 'working',
        startTime: '2.5 hours ago',
        estimatedCompletion: '1.5 hours',
        priority: 'medium',
        category: 'website',
        currentStep: 'Implementing content editor and publishing workflow',
        totalSteps: 14,
        completedSteps: 9,
        health: 'warning',
        performance: 76,
        memoryUsage: 289,
        cpuUsage: 35
      },

      // Backend Development Agents
      {
        id: 'task-006',
        agentId: 'backend-agent-001',
        agentName: 'API Development Agent',
        agentType: 'backend',
        task: 'Building RESTful API endpoints',
        progress: 88,
        status: 'working',
        startTime: '4 hours ago',
        estimatedCompletion: '30 minutes',
        priority: 'critical',
        category: 'backend',
        currentStep: 'Final API testing and documentation',
        totalSteps: 20,
        completedSteps: 17,
        health: 'excellent',
        performance: 95,
        memoryUsage: 423,
        cpuUsage: 42
      },
      {
        id: 'task-007',
        agentId: 'backend-agent-002',
        agentName: 'Database Optimization Agent',
        agentType: 'backend',
        task: 'Query optimization and indexing',
        progress: 72,
        status: 'working',
        startTime: '3 hours ago',
        estimatedCompletion: '1 hour',
        priority: 'high',
        category: 'backend',
        currentStep: 'Analyzing slow queries and creating indexes',
        totalSteps: 16,
        completedSteps: 11,
        health: 'good',
        performance: 87,
        memoryUsage: 567,
        cpuUsage: 38
      },

      // Infrastructure Agents
      {
        id: 'task-008',
        agentId: 'infra-agent-001',
        agentName: 'Infrastructure Agent',
        agentType: 'infrastructure',
        task: 'Setting up monitoring and alerting',
        progress: 90,
        status: 'working',
        startTime: '2 hours ago',
        estimatedCompletion: '20 minutes',
        priority: 'high',
        category: 'infrastructure',
        currentStep: 'Configuring alert thresholds and notifications',
        totalSteps: 12,
        completedSteps: 10,
        health: 'excellent',
        performance: 93,
        memoryUsage: 234,
        cpuUsage: 18
      },
      {
        id: 'task-009',
        agentId: 'infra-agent-002',
        agentName: 'Security Agent',
        agentType: 'infrastructure',
        task: 'Security audit and vulnerability scanning',
        progress: 45,
        status: 'working',
        startTime: '1 hour ago',
        estimatedCompletion: '2 hours',
        priority: 'critical',
        category: 'infrastructure',
        currentStep: 'Running automated security scans',
        totalSteps: 18,
        completedSteps: 8,
        health: 'warning',
        performance: 68,
        memoryUsage: 445,
        cpuUsage: 55
      },

      // Testing Agents
      {
        id: 'task-010',
        agentId: 'test-agent-001',
        agentName: 'Automated Testing Agent',
        agentType: 'testing',
        task: 'Running comprehensive test suites',
        progress: 100,
        status: 'completed',
        startTime: '1 hour ago',
        estimatedCompletion: 'Completed',
        priority: 'high',
        category: 'testing',
        currentStep: 'All tests passed successfully',
        totalSteps: 25,
        completedSteps: 25,
        health: 'excellent',
        performance: 100,
        memoryUsage: 189,
        cpuUsage: 12
      },

      // Deployment Agents
      {
        id: 'task-011',
        agentId: 'deploy-agent-001',
        agentName: 'Deployment Agent',
        agentType: 'deployment',
        task: 'Production deployment preparation',
        progress: 85,
        status: 'working',
        startTime: '30 minutes ago',
        estimatedCompletion: '15 minutes',
        priority: 'critical',
        category: 'deployment',
        currentStep: 'Final deployment checks and rollback preparation',
        totalSteps: 8,
        completedSteps: 6,
        health: 'excellent',
        performance: 96,
        memoryUsage: 278,
        cpuUsage: 25
      }
    ];

    setAgentTasks(initialTasks);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgentTasks(prev => prev.map(task => {
        if (task.status === 'working' && task.progress < 100) {
          const increment = Math.random() * 3; // 0-3% increment
          const newProgress = Math.min(100, task.progress + increment);
          const newCompletedSteps = Math.floor((newProgress / 100) * task.totalSteps);
          
          let newStatus = task.status;
          if (newProgress >= 100) {
            newStatus = 'completed';
          }
          
          return {
            ...task,
            progress: Math.round(newProgress * 100) / 100,
            status: newStatus,
            completedSteps: newCompletedSteps,
            performance: Math.min(100, task.performance + Math.random() * 2),
            memoryUsage: task.memoryUsage + Math.random() * 10 - 5,
            cpuUsage: Math.max(0, Math.min(100, task.cpuUsage + Math.random() * 4 - 2))
          };
        }
        return task;
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getAgentIcon = (agentType: string) => {
    switch (agentType) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'working':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'working':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
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

  const filteredTasks = agentTasks.filter(task => {
    if (filterCategory !== 'all' && task.category !== filterCategory) {
      return false;
    }
    return true;
  });

  const categoryStats = {
    portal: agentTasks.filter(task => task.category === 'portal'),
    website: agentTasks.filter(task => task.category === 'website'),
    backend: agentTasks.filter(task => task.category === 'backend'),
    infrastructure: agentTasks.filter(task => task.category === 'infrastructure'),
    testing: agentTasks.filter(task => task.category === 'testing'),
    deployment: agentTasks.filter(task => task.category === 'deployment')
  };

  const overallProgress = agentTasks.length > 0 
    ? Math.round(agentTasks.reduce((sum, task) => sum + task.progress, 0) / agentTasks.length)
    : 0;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Autonomous Agent Progress</h1>
          <p className="text-gray-600">Real-time tracking of AI agent activities and completion status</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={systemStatus === 'autonomous' ? 'default' : 'secondary'}>
            <Brain className="w-4 h-4 mr-2" />
            {systemStatus === 'autonomous' ? 'Autonomous Mode' : 'Manual Mode'}
          </Badge>
          <Badge variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            {agentTasks.filter(task => task.status === 'working').length} Active Agents
          </Badge>
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            Overall Agent Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">{overallProgress}%</span>
              <span className="text-sm text-gray-600">
                {agentTasks.filter(task => task.progress === 100).length} of {agentTasks.length} tasks complete
              </span>
            </div>
            <Progress value={overallProgress} className="h-3" />
            <div className="grid grid-cols-6 gap-4 text-center">
              {Object.entries(categoryStats).map(([category, tasks]) => (
                <div key={category}>
                  <div className="text-lg font-bold text-blue-600">
                    {tasks.length > 0 ? 
                      Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length) : 0}%
                  </div>
                  <div className="text-xs text-gray-600 capitalize">{category}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Filter by category:</span>
        <Button
          variant={filterCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterCategory('all')}
        >
          All
        </Button>
        {Object.keys(categoryStats).map(category => (
          <Button
            key={category}
            variant={filterCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterCategory(category)}
          >
            {getAgentIcon(category)}
            <span className="ml-1 capitalize">{category}</span>
          </Button>
        ))}
      </div>

      {/* Agent Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getAgentIcon(task.agentType)}
                  <CardTitle className="text-lg">{task.agentName}</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusIcon(task.status)}
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">{task.task}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-bold text-gray-900">{task.progress}%</span>
                </div>
                <Progress value={task.progress} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{task.currentStep}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <span className={getHealthColor(task.health)}>
                      ● {task.health}
                    </span>
                  </div>
                  <span className="text-gray-500">{task.startTime}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Steps:</span>
                    <span className="ml-1 font-medium">{task.completedSteps}/{task.totalSteps}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">ETA:</span>
                    <span className="ml-1 font-medium">{task.estimatedCompletion}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500">Performance:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{task.performance}%</span>
                      <Zap className="w-3 h-3 text-yellow-500" />
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Memory:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{Math.round(task.memoryUsage)}MB</span>
                      <HardDrive className="w-3 h-3 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">CPU:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{Math.round(task.cpuUsage)}%</span>
                      <Cpu className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Agent Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              variant={systemStatus === 'autonomous' ? 'default' : 'outline'}
              onClick={() => setSystemStatus('autonomous')}
            >
              <Play className="w-4 h-4 mr-2" />
              Enable All Agents
            </Button>
            <Button 
              variant={systemStatus === 'paused' ? 'default' : 'outline'}
              onClick={() => setSystemStatus('paused')}
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause All Agents
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure Agents
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance Analytics
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousAgentProgress;
