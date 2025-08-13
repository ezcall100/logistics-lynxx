
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Bot, Brain, Zap, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const AutonomousAgentsPanel: React.FC = () => {
  const agentTypes = [
    { name: 'Research Agents', count: 50, active: 48, efficiency: 94, color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
    { name: 'Frontend Agents', count: 80, active: 76, efficiency: 97, color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20' },
    { name: 'Backend Agents', count: 60, active: 58, efficiency: 96, color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/20' },
    { name: 'Database Agents', count: 30, active: 29, efficiency: 98, color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/20' },
    { name: 'Testing Agents', count: 20, active: 18, efficiency: 92, color: 'text-pink-600', bgColor: 'bg-pink-100 dark:bg-pink-900/20' },
    { name: 'Deploy Agents', count: 10, active: 10, efficiency: 99, color: 'text-indigo-600', bgColor: 'bg-indigo-100 dark:bg-indigo-900/20' }
  ];

  const recentActivities = [
    { id: 1, action: 'Database schema updated', agent: 'DB-Agent-001', time: '2 min ago', status: 'completed' },
    { id: 2, action: 'UI components optimized', agent: 'FE-Agent-045', time: '5 min ago', status: 'in_progress' },
    { id: 3, action: 'API endpoints validated', agent: 'BE-Agent-023', time: '8 min ago', status: 'completed' },
    { id: 4, action: 'Load testing initiated', agent: 'TEST-Agent-012', time: '12 min ago', status: 'in_progress' },
    { id: 5, action: 'Deployment pipeline ready', agent: 'DEPLOY-Agent-001', time: '15 min ago', status: 'completed' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const totalAgents = agentTypes.reduce((sum, type) => sum + type.count, 0);
  const totalActive = agentTypes.reduce((sum, type) => sum + type.active, 0);
  const averageEfficiency = Math.round(agentTypes.reduce((sum, type) => sum + type.efficiency, 0) / agentTypes.length);

  return (
    <div className="space-y-6">
      {/* Agent Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/20">
                <Bot className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{totalAgents}</div>
                <div className="text-sm text-muted-foreground">Total Agents</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Zap className="h-8 w-8 text-green-600 animate-pulse" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{totalActive}</div>
                <div className="text-sm text-muted-foreground">Active Now</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{averageEfficiency}%</div>
                <div className="text-sm text-muted-foreground">Avg Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Types Grid */}
      <Card className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Agent Distribution & Performance
          </CardTitle>
          <CardDescription>
            Real-time status of all 250 autonomous agents across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agentTypes.map((agent, index) => (
              <div 
                key={agent.name}
                className={cn(
                  "p-4 rounded-xl border transition-all duration-300",
                  "hover:shadow-lg hover:scale-105",
                  "bg-gradient-to-br from-background/80 to-muted/10",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">{agent.name}</h3>
                  <Badge className={cn(agent.bgColor, "text-xs")}>
                    {agent.active}/{agent.count} Active
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold" style={{ color: agent.color.replace('text-', '') }}>
                      {agent.count}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {agent.efficiency}% efficiency
                    </span>
                  </div>
                  
                  <Progress 
                    value={(agent.active / agent.count) * 100} 
                    className="h-2"
                  />
                  
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", 
                      agent.active === agent.count ? "bg-green-500" : "bg-orange-500"
                    )} />
                    <span className="text-xs text-muted-foreground">
                      {agent.active === agent.count ? "All operational" : `${agent.count - agent.active} inactive`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Agent Activities
          </CardTitle>
          <CardDescription>
            Live feed of autonomous agent actions and system updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div 
                key={activity.id}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg border",
                  "bg-gradient-to-r from-background/80 to-muted/10",
                  "transition-all duration-300 hover:bg-muted/20",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">
                    by {activity.agent}
                  </div>
                </div>
                <div className="flex-shrink-0 text-xs text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutonomousAgentsPanel;
