
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { 
  Brain, 
  Cpu, 
  Monitor, 
  Palette, 
  RefreshCw, 
  GraduationCap,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

const AutonomousAgentDashboard = () => {
  const {
    agents,
    systemStatus,
    setSystemStatus,
    getSystemStats,
    executeAgentTask
  } = useAutonomousAgentManager();

  const stats = getSystemStats();

  const getAgentIcon = (type: string) => {
    switch (type) {
      case 'refactoring': return <RefreshCw className="h-4 w-4" />;
      case 'optimization': return <Cpu className="h-4 w-4" />;
      case 'ui_improvement': return <Palette className="h-4 w-4" />;
      case 'monitoring': return <Monitor className="h-4 w-4" />;
      case 'learning': return <GraduationCap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'working': return 'bg-blue-100 text-blue-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'working': return <Activity className="h-4 w-4 text-blue-600 animate-pulse" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                24/7 Autonomous TMS System
              </CardTitle>
              <CardDescription>
                AI agents working continuously to improve and optimize the platform
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant={systemStatus === 'autonomous' ? 'default' : 'secondary'}
                className="text-sm"
              >
                {systemStatus.toUpperCase()}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSystemStatus(systemStatus === 'autonomous' ? 'manual' : 'autonomous')}
              >
                {systemStatus === 'autonomous' ? 'Switch to Manual' : 'Enable Autonomous'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.active_agents}</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.total_tasks_completed}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.average_success_rate}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.uptime_hours}h</div>
              <div className="text-sm text-muted-foreground">Uptime Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card key={agent.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getAgentIcon(agent.type)}
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(agent.status)}
                  <Badge className={getStatusColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Success Rate</span>
                  <span>{Math.round(agent.successRate)}%</span>
                </div>
                <Progress value={agent.successRate} className="h-2" />
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Tasks Completed:</span>
                  <span className="ml-2 font-medium">{agent.tasksCompleted}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Action:</span>
                  <p className="mt-1 text-xs bg-gray-50 p-2 rounded">{agent.lastAction}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Run:</span>
                  <span className="ml-2 text-xs">
                    {new Date(agent.nextScheduledRun).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {agent.status === 'active' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => executeAgentTask(agent)}
                >
                  Execute Task Now
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* GitHub Actions Integration Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Activity className="h-5 w-5" />
            GitHub Actions Integration Active
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <p className="mb-2">
            Autonomous agents are also triggered via GitHub Actions every 5 minutes for continuous development.
          </p>
          <div className="text-sm">
            <div>✅ Automated code quality checks</div>
            <div>✅ Performance monitoring triggers</div>
            <div>✅ UI/UX improvement workflows</div>
            <div>✅ Secure credential management</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousAgentDashboard;
