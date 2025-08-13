import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Globe, 
  Zap,
  Shield,
  BarChart3,
  Users,
  Clock,
  ArrowUpRight,
  Server,
  Key,
  FileText,
  Code
} from 'lucide-react';

export const APIDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('24h');

  // Mock data for demonstration
  const metrics = {
    totalRequests: 24567,
    requestsChange: 12.5,
    activeKeys: 8,
    keysChange: 2,
    errorRate: 0.3,
    errorChange: -0.2,
    uptime: 99.97,
    uptimeChange: 0.1
  };

  const recentActivity = [
    { time: '2 mins ago', action: 'API Key created', user: 'john@company.com', status: 'success' },
    { time: '15 mins ago', action: 'Rate limit exceeded', user: 'API Key #1247', status: 'warning' },
    { time: '1 hour ago', action: 'Edge function deployed', user: 'deploy-bot', status: 'success' },
    { time: '3 hours ago', action: 'Authentication error', user: 'API Key #9281', status: 'error' },
  ];

  const quickActions = [
    { label: 'Create API Key', icon: Key, action: () => {}, color: 'bg-blue-500' },
    { label: 'View Functions', icon: Code, action: () => {}, color: 'bg-green-500' },
    { label: 'Check Logs', icon: FileText, action: () => {}, color: 'bg-orange-500' },
    { label: 'System Status', icon: Activity, action: () => {}, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Requests */}
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalRequests.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +{metrics.requestsChange}% from yesterday
            </div>
          </CardContent>
        </Card>

        {/* Active API Keys */}
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeKeys}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +{metrics.keysChange} new this week
            </div>
          </CardContent>
        </Card>

        {/* Error Rate */}
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.errorRate}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1 rotate-180" />
              {metrics.errorChange}% from yesterday
            </div>
          </CardContent>
        </Card>

        {/* System Uptime */}
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.uptime}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              +{metrics.uptimeChange}% this month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & System Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common API management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-3"
                  onClick={action.action}
                >
                  <div className={`p-2 rounded-md ${action.color} mr-3`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <span>{action.label}</span>
                  <ArrowUpRight className="h-4 w-4 ml-auto" />
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>Real-time system performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* API Performance */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Performance</span>
                <span className="text-green-600">98%</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>

            {/* Database Health */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database Health</span>
                <span className="text-green-600">99%</span>
              </div>
              <Progress value={99} className="h-2" />
            </div>

            {/* Edge Functions */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Edge Functions</span>
                <span className="text-green-600">100%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            {/* Rate Limiting */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Rate Limiting</span>
                <span className="text-yellow-600">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Performance Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest API management events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'success': return 'bg-green-100 text-green-800 border-green-200';
                    case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                    case 'error': return 'bg-red-100 text-red-800 border-red-200';
                    default: return 'bg-gray-100 text-gray-800 border-gray-200';
                  }
                };

                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">{activity.user}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="outline" className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* API Usage Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Usage Trends
            </CardTitle>
            <CardDescription>API usage patterns over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Time Range Selector */}
              <div className="flex space-x-2">
                {['1h', '24h', '7d', '30d'].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>

              {/* Mock Chart Representation */}
              <div className="space-y-3">
                <div className="text-sm font-medium">Request Volume by Hour</div>
                <div className="grid grid-cols-12 gap-1 h-20">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="bg-primary/20 rounded-sm flex items-end"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    >
                      <div className="w-full bg-primary rounded-sm" style={{ height: '100%' }} />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};