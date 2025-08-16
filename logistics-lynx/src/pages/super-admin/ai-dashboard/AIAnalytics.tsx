/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot,
  Activity,
  BarChart3,
  Cpu,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Users,
  Clock,
  RefreshCw
} from 'lucide-react';

const AIAnalytics = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    totalRequests: 2840,
    successRate: 98.5,
    avgResponseTime: 125,
    activeAgents: 250
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAnalyticsData(prev => ({
      ...prev,
      totalRequests: prev.totalRequests + Math.floor(Math.random() * 100),
      successRate: 95 + Math.random() * 5,
      avgResponseTime: 100 + Math.random() * 50,
    }));
    setRefreshing(false);
  };
  const aiStats = [
    { title: 'Total AI Agents', value: '250', change: '+5%', icon: Bot, color: 'text-blue-600' },
    { title: 'Active Agents', value: '247', change: '+2%', icon: Activity, color: 'text-green-600' },
    { title: 'Tasks Completed', value: '15,432', change: '+18%', icon: CheckCircle, color: 'text-purple-600' },
    { title: 'Efficiency Rate', value: '98.7%', change: '+3%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const agentTypes = [
    { name: 'Research Agents', count: 50, active: 49, efficiency: '99.2%', status: 'Excellent' },
    { name: 'Frontend Agents', count: 80, active: 79, efficiency: '98.8%', status: 'Excellent' },
    { name: 'Backend Agents', count: 60, active: 60, efficiency: '99.1%', status: 'Excellent' },
    { name: 'Database Agents', count: 30, active: 30, efficiency: '97.5%', status: 'Good' },
    { name: 'Testing Agents', count: 20, active: 19, efficiency: '98.3%', status: 'Excellent' },
    { name: 'Deployment Agents', count: 10, active: 10, efficiency: '99.0%', status: 'Excellent' },
  ];

  const recentActivities = [
    { agent: 'Frontend-Agent-23', task: 'UI Component Optimization', time: '2 min ago', status: 'completed' },
    { agent: 'Backend-Agent-45', task: 'API Endpoint Creation', time: '5 min ago', status: 'in-progress' },
    { agent: 'Database-Agent-12', task: 'Schema Migration', time: '8 min ago', status: 'completed' },
    { agent: 'Research-Agent-67', task: 'Market Analysis', time: '12 min ago', status: 'completed' },
    { agent: 'Testing-Agent-34', task: 'Integration Testing', time: '15 min ago', status: 'in-progress' },
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">AI Analytics Dashboard</h1>
            <p className="text-muted-foreground">Monitor and analyze autonomous agent performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Live Analytics
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last hour
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Agent Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5" />
                Agent Type Performance
              </CardTitle>
              <CardDescription>Performance metrics by agent category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentTypes.map((type) => (
                  <div key={type.name} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{type.name}</h4>
                      <Badge variant={type.status === 'Excellent' ? 'default' : 'secondary'}>
                        {type.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-medium">{type.count}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Active</p>
                        <p className="font-medium text-green-600">{type.active}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Efficiency</p>
                        <p className="font-medium">{type.efficiency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Real-time Agent Activity
              </CardTitle>
              <CardDescription>Live activity feed from all agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{activity.task}</p>
                      <p className="text-sm text-muted-foreground">{activity.agent}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                        {activity.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Key Performance Indicators
            </CardTitle>
            <CardDescription>Critical metrics for AI system performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">0.23s</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">99.8%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default AIAnalytics;