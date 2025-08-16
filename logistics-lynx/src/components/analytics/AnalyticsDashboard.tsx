/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  Users, 
  Brain, 
  Activity, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import AILearningMetrics from './AILearningMetrics';
import UserBehaviorTracking from './UserBehaviorTracking';
import RoleSpecificMetrics from './RoleSpecificMetrics';
import SystemHealthMonitor from './SystemHealthMonitor';
import { useAnalytics } from '@/hooks/useAnalytics';

const AnalyticsDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedRole, setSelectedRole] = useState('all');
  
  const { 
    analyticsData, 
    isLoading, 
    refreshAnalytics,
    getOverviewStats,
    getSystemHealthStatus 
  } = useAnalytics(selectedTimeRange, selectedRole);

  const overviewStats = getOverviewStats();
  const systemHealth = getSystemHealthStatus();

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      refreshAnalytics();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshAnalytics]);

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'good': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time AI performance and user behavior insights
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="super_admin">Super Admin</SelectItem>
              <SelectItem value="carrier_admin">Carrier Admin</SelectItem>
              <SelectItem value="freight_broker_admin">Broker Admin</SelectItem>
              <SelectItem value="shipper_admin">Shipper Admin</SelectItem>
              <SelectItem value="carrier_driver">Driver</SelectItem>
              <SelectItem value="owner_operator">Owner Operator</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={autoRefresh ? 'bg-green-50 border-green-200' : ''}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto' : 'Manual'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={refreshAnalytics}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <Card className={`border-2 ${getHealthColor(systemHealth.overall)}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getHealthIcon(systemHealth.overall)}
              <CardTitle className="text-lg">System Health</CardTitle>
            </div>
            <Badge variant="outline" className={getHealthColor(systemHealth.overall)}>
              {systemHealth.overall.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{systemHealth.uptime}%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{systemHealth.avgResponseTime}ms</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{systemHealth.errorRate}%</div>
              <div className="text-sm text-muted-foreground">Error Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{systemHealth.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">{overviewStats.aiAccuracy}%</div>
                <div className="text-sm text-muted-foreground">AI Accuracy</div>
                <div className="text-xs text-green-600">+{overviewStats.aiAccuracyChange}% from last period</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{overviewStats.totalInteractions}</div>
                <div className="text-sm text-muted-foreground">User Interactions</div>
                <div className="text-xs text-green-600">+{overviewStats.interactionChange}% from last period</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{overviewStats.adaptationRate}%</div>
                <div className="text-sm text-muted-foreground">Adaptation Rate</div>
                <div className="text-xs text-blue-600">{overviewStats.adaptationTrend} trend</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{overviewStats.avgLearningTime}ms</div>
                <div className="text-sm text-muted-foreground">Learning Speed</div>
                <div className="text-xs text-green-600">-{overviewStats.learningSpeedImprovement}% faster</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="ai-learning" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ai-learning" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Learning
          </TabsTrigger>
          <TabsTrigger value="user-behavior" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Behavior
          </TabsTrigger>
          <TabsTrigger value="role-metrics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Role Metrics
          </TabsTrigger>
          <TabsTrigger value="system-health" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            System Health
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-learning">
          <AILearningMetrics 
            data={analyticsData.aiLearning} 
            timeRange={selectedTimeRange}
            role={selectedRole}
          />
        </TabsContent>

        <TabsContent value="user-behavior">
          <UserBehaviorTracking 
            data={analyticsData.userBehavior} 
            timeRange={selectedTimeRange}
            role={selectedRole}
          />
        </TabsContent>

        <TabsContent value="role-metrics">
          <RoleSpecificMetrics 
            data={analyticsData.roleMetrics} 
            timeRange={selectedTimeRange}
            selectedRole={selectedRole}
          />
        </TabsContent>

        <TabsContent value="system-health">
          <SystemHealthMonitor 
            data={analyticsData.systemHealth} 
            timeRange={selectedTimeRange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
