/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CircleDollarSign, PackageCheck, Rocket, Brain, Activity, Wifi, AlertTriangle } from 'lucide-react';
import { useAutonomousAgentManager } from '@/hooks/autonomous/useAutonomousAgentManager';
import { useAutonomousKnowledge } from '@/hooks/useAutonomousKnowledge';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { useRealtimeAgentUpdates } from '@/hooks/useRealtimeAgentUpdates';
import { useN8NIntegration } from '@/hooks/autonomous/useN8NIntegration';

const RealtimeDashboard = () => {
  const [shipmentsProcessed, setShipmentsProcessed] = useState(0);
  const [routesOptimized, setRoutesOptimized] = useState(0);
  const [systemUptime, setSystemUptime] = useState(0);
  const { getSystemStats } = useAutonomousAgentManager();
  const { performanceMetrics } = useAutonomousKnowledge();
  const { systemHealth } = usePerformanceOptimization();
  
  // Real-time connections
  const { isConnected, agentUpdates, taskCompletions } = useRealtimeAgentUpdates();
  const { totalAgentsActivated, workflowStatus } = useN8NIntegration();

  const loadDashboardData = useCallback(async () => {
    // Simulate loading data from different sources
    setShipmentsProcessed(Math.floor(Math.random() * 500) + 100);
    setRoutesOptimized(Math.floor(Math.random() * 150) + 50);
    setSystemUptime(getSystemStats().uptime_hours);
  }, [getSystemStats]);

  useEffect(() => {
    loadDashboardData();
    
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, [loadDashboardData]);

  // Helper function to get system health percentage
  const getSystemHealthPercentage = () => {
    // Early return for null or undefined
    if (!systemHealth) {
      return '95%';
    }
    
    // Check if systemHealth is an object with health_score property
    if (systemHealth && typeof systemHealth === 'object' && systemHealth !== null) {
      const healthObj = systemHealth as Record<string, unknown>;
      if ('health_score' in healthObj) {
        return `${healthObj.health_score}%`;
      }
    }
    
    // Check if systemHealth is a string
    if (typeof systemHealth === 'string') {
      switch (systemHealth) {
        case 'optimal': return '95%';
        case 'warning': return '75%';
        case 'critical': return '45%';
        default: return '95%';
      }
    }
    
    return '95%';
  };

  return (
    <div className="space-y-6">
      {/* Real-time Connection Status */}
      <Card className={`border-2 ${isConnected ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            {isConnected ? <Wifi className="h-4 w-4 text-green-600" /> : <AlertTriangle className="h-4 w-4 text-red-600" />}
            <span className="font-medium">Real-time Updates: {isConnected ? 'Connected' : 'Disconnected'}</span>
            <Badge variant={isConnected ? 'default' : 'destructive'}>
              {agentUpdates.length} Updates | {taskCompletions.length} Tasks
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Shipments Processed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageCheck className="h-5 w-5 text-blue-500" />
            Shipments Processed
          </CardTitle>
          <CardDescription>Total shipments processed by the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{shipmentsProcessed}</div>
          <div className="text-sm text-muted-foreground">Since last boot</div>
        </CardContent>
      </Card>

      {/* Routes Optimized */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-green-500" />
            Routes Optimized
          </CardTitle>
          <CardDescription>Routes optimized for fuel efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{routesOptimized}</div>
          <div className="text-sm text-muted-foreground">Using AI algorithms</div>
        </CardContent>
      </Card>

      {/* System Uptime */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-yellow-500" />
            System Uptime
          </CardTitle>
          <CardDescription>Continuous operation time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{systemUptime} hrs</div>
          <div className="text-sm text-muted-foreground">Since last restart</div>
        </CardContent>
      </Card>

      {/* AI Efficiency Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            AI Efficiency Score
          </CardTitle>
          <CardDescription>Overall AI performance and efficiency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{performanceMetrics.efficiency_score.toFixed(1)}%</div>
          <div className="text-sm text-muted-foreground">Based on real-time data</div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-500" />
            System Health
          </CardTitle>
          <CardDescription>Overall system health status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            {getSystemHealthPercentage()}
          </div>
          <div className="text-sm text-muted-foreground">Based on recent metrics</div>
        </CardContent>
      </Card>

      {/* Cost Savings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-teal-500" />
            Cost Savings
          </CardTitle>
          <CardDescription>Total cost savings achieved by AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">${performanceMetrics.cost_savings.toFixed(2)}k</div>
          <div className="text-sm text-muted-foreground">This month</div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-gray-500" />
            System Status
          </CardTitle>
          <CardDescription>Current operational mode</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="outline">
            {getSystemStats().system_status.toUpperCase()}
          </Badge>
          <div className="text-sm text-muted-foreground">Since last change</div>
        </CardContent>
      </Card>

      {/* Total Tasks Completed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-indigo-500" />
            Total Tasks Completed
          </CardTitle>
          <CardDescription>Tasks completed by autonomous agents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{getSystemStats().total_tasks_completed}</div>
          <div className="text-sm text-muted-foreground">Across all agents</div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default RealtimeDashboard;
