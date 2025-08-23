import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Activity, Settings, Brain, Server, BarChart3, Globe, Database, Lock } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const systemStats = {
    totalUsers: 2847,
    activePortals: 8,
    systemHealth: '99.9%',
    securityScore: 'A+'
  };

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage users, roles, and permissions',
      icon: Users,
      color: 'text-green-600',
      action: 'Manage Users'
    },
    {
      title: 'System Health',
      description: 'Monitor system performance and status',
      icon: Activity,
      color: 'text-purple-600',
      action: 'View Health'
    },
    {
      title: 'Security Center',
      description: 'Security settings and compliance',
      icon: Shield,
      color: 'text-orange-600',
      action: 'Security'
    },
    {
      title: 'MCP Control',
      description: 'Master Control Program interface',
      icon: Brain,
      color: 'text-indigo-600',
      action: 'Launch MCP'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Portals</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activePortals}/8</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.systemHealth}</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.securityScore}</div>
            <p className="text-xs text-muted-foreground">No vulnerabilities</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <action.icon className={`w-5 h-5 ${action.color}`} />
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  {action.description}
                </CardDescription>
                <Button variant="outline" className="w-full">
                  {action.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-600" />
                <CardTitle>Database Status</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All database connections are healthy and responsive.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-green-600" />
                <CardTitle>API Gateway</CardTitle>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Healthy
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                API endpoints are responding normally with 99.8% uptime.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
