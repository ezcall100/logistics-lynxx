
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Server, Database, Globe, Shield, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const SystemHealthPanel: React.FC = () => {
  const healthMetrics = [
    { name: 'API Response', value: 125, unit: 'ms', status: 'excellent', color: 'text-green-600', progress: 95 },
    { name: 'Database Performance', value: 99.8, unit: '%', status: 'excellent', color: 'text-green-600', progress: 99 },
    { name: 'AI Agent Efficiency', value: 96.2, unit: '%', status: 'good', color: 'text-blue-600', progress: 96 },
    { name: 'System Uptime', value: 99.99, unit: '%', status: 'excellent', color: 'text-green-600', progress: 100 },
    { name: 'Active Connections', value: 2847, unit: '', status: 'normal', color: 'text-blue-600', progress: 75 },
    { name: 'Processing Queue', value: 42, unit: 'tasks', status: 'normal', color: 'text-orange-600', progress: 30 }
  ];

  const systemComponents = [
    { name: 'Supabase', icon: Database, status: 'operational', response: '23ms' },
    { name: 'OpenAI', icon: Zap, status: 'operational', response: '145ms' },
    { name: 'GitHub', icon: Globe, status: 'operational', response: '67ms' },
    { name: 'n8n Workflows', icon: Activity, status: 'operational', response: '12ms' },
    { name: 'Security Layer', icon: Shield, status: 'operational', response: '8ms' },
    { name: 'Load Balancer', icon: Server, status: 'operational', response: '15ms' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400';
      case 'normal': return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400';
      case 'operational': return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <Card className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary animate-pulse" />
            Real-time System Health
          </CardTitle>
          <CardDescription>
            Live performance metrics updated every 30 seconds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthMetrics.map((metric, index) => (
              <div 
                key={metric.name} 
                className={cn(
                  "p-4 rounded-lg border bg-gradient-to-br from-background/80 to-muted/10",
                  "transition-all duration-300 hover:shadow-md hover:scale-105",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={cn("text-2xl font-bold", metric.color)}>
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{metric.unit}</span>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Components Status */}
      <Card className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Integrated Systems Status
          </CardTitle>
          <CardDescription>
            Connected services and their current operational status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemComponents.map((component, index) => (
              <div 
                key={component.name}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border",
                  "bg-gradient-to-br from-background/80 to-muted/10",
                  "transition-all duration-300 hover:shadow-md hover:scale-105",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <component.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{component.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Response: {component.response}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <Badge className={getStatusColor(component.status)} variant="secondary">
                    {component.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealthPanel;
