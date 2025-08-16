/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Cpu,
  Zap,
  Network
} from 'lucide-react';
import { toast } from 'sonner';

const AgentMonitoring = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    toast.success('Agent monitoring data refreshed');
  };

  const systemStats = {
    activeAgents: 250,
    completedTasks: 48,
    queuedTasks: 53,
    successRate: 98.5,
    systemEfficiency: 96.2,
    networkStatus: "Optimal",
    responseTime: "42ms"
  };

  const agentTypes = [
    { name: 'Development Agents', count: 130, category: 'Frontend, Backend, Testing', efficiency: 94 },
    { name: 'Research Agents', count: 50, category: 'Market Analysis, R&D', efficiency: 97 },
    { name: 'Operations Agents', count: 70, category: 'Database, Deploy, Security', efficiency: 92 }
  ];

  const recentActivity = [
    { agent: 'testing Agent', time: '1:24:14 PM', status: 'completed', task: 'Unit Test Suite' },
    { agent: 'code_generation Agent', time: '1:24:12 PM', status: 'completed', task: 'Component Generation' },
    { agent: 'learning Agent', time: '1:24:10 PM', status: 'completed', task: 'Pattern Analysis' },
    { agent: 'deployment Agent', time: '1:24:06 PM', status: 'completed', task: 'Build Pipeline' }
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agent Monitoring
            </h1>
            <p className="text-muted-foreground">
              24/7 TMS Intelligence System - Real-time monitoring and control
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              ACTIVE
            </Badge>
            <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border-blue-200/60">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600/80">Overall Efficiency</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {systemStats.systemEfficiency}%
                  </p>
                </div>
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-200/60">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600/80">Active Agents</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {systemStats.activeAgents}
                  </p>
                </div>
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 border-orange-200/60">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600/80">Completed Tasks</p>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                    {systemStats.completedTasks}
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border-purple-200/60">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600/80">Success Rate</p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                    {systemStats.successRate}%
                  </p>
                </div>
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Agent Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold">{type.count}</div>
                      <div className="text-sm text-muted-foreground">agents</div>
                    </div>
                    <div className="w-20">
                      <Progress value={type.efficiency} className="h-2" />
                      <p className="text-xs text-center mt-1">{type.efficiency}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Real-Time Activity Stream
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-950/20 rounded-r">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-sm">{activity.agent}</p>
                      <p className="text-xs text-muted-foreground">{activity.task}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">All agents operational</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Network connectivity</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">100%</span>
                  <Network className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API response time</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">&lt;{systemStats.responseTime}</span>
                  <Zap className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Self-healing</span>
                <Badge className="bg-green-100 text-green-700">Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                Active Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Real-time TMS optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Autonomous route planning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Predictive maintenance alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Dynamic load matching</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default AgentMonitoring;