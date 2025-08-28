import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  GitBranch, 
  Users, 
  Zap, 
  Settings, 
  BarChart3,
  Cpu,
  HardDrive,
  Network,
  Clock,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { TaskDistributionEngine } from '@/components/mcp/TaskDistributionEngine';
import { WorkflowBuilder } from '@/components/mcp/WorkflowBuilder';
import AgentLoadBalancer from '@/components/mcp/AgentLoadBalancer';
import { AutomationRuleEngine } from '@/components/mcp/AutomationRuleEngine';

export default function Phase2OrchestrationPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [systemStatus, setSystemStatus] = useState<'operational' | 'degraded' | 'critical'>('operational');

  // Mock system metrics
  const systemMetrics = {
    totalAgents: 14,
    activeAgents: 12,
    overloadedAgents: 1,
    totalTasks: 156,
    pendingTasks: 23,
    completedTasks: 133,
    activeWorkflows: 8,
    automationRules: 15,
    systemCpu: 45.2,
    systemMemory: 62.8,
    systemNetwork: 28.4,
    averageResponseTime: 1200,
    successRate: 98.7
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'default';
      case 'degraded': return 'secondary';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Phase 2: MCP Orchestration</h1>
          <p className="text-muted-foreground">
            Advanced workflow orchestration and agent management system
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant={getStatusColor(systemStatus)}>
            {systemStatus === 'operational' ? '🟢 Operational' : 
             systemStatus === 'degraded' ? '🟡 Degraded' : '🔴 Critical'}
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Agents</p>
                <p className="text-2xl font-bold">{systemMetrics.totalAgents}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                {systemMetrics.activeAgents} active, {systemMetrics.overloadedAgents} overloaded
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active Tasks</p>
                <p className="text-2xl font-bold">{systemMetrics.totalTasks}</p>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                {systemMetrics.pendingTasks} pending, {systemMetrics.completedTasks} completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Active Workflows</p>
                <p className="text-2xl font-bold">{systemMetrics.activeWorkflows}</p>
              </div>
              <GitBranch className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                {systemMetrics.automationRules} automation rules
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold">{systemMetrics.successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2">
              <p className="text-xs text-muted-foreground">
                Avg response: {(systemMetrics.averageResponseTime / 1000).toFixed(1)}s
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Cpu className="w-4 h-4 mr-2" />
              System CPU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.systemCpu.toFixed(1)}%</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-muted-foreground">+2.3% from last hour</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <HardDrive className="w-4 h-4 mr-2" />
              System Memory
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.systemMemory.toFixed(1)}%</div>
            <div className="flex items-center mt-2">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-xs text-muted-foreground">-1.2% from last hour</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-sm">
              <Network className="w-4 h-4 mr-2" />
              Network I/O
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.systemNetwork.toFixed(1)}%</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-muted-foreground">+5.7% from last hour</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="task-distribution">Task Distribution</TabsTrigger>
          <TabsTrigger value="workflow-builder">Workflow Builder</TabsTrigger>
          <TabsTrigger value="load-balancer">Load Balancer</TabsTrigger>
          <TabsTrigger value="automation-rules">Automation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Task completed successfully</p>
                      <p className="text-xs text-muted-foreground">Frontend Dev Agent completed "Build Dashboard"</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Agent overloaded</p>
                      <p className="text-xs text-muted-foreground">Backend API Agent CPU usage at 92%</p>
                    </div>
                    <span className="text-xs text-muted-foreground">5 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Workflow triggered</p>
                      <p className="text-xs text-muted-foreground">"Database Backup" workflow started</p>
                    </div>
                    <span className="text-xs text-muted-foreground">10 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 border rounded">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Automation rule executed</p>
                      <p className="text-xs text-muted-foreground">"High CPU Alert Handler" completed</p>
                    </div>
                    <span className="text-xs text-muted-foreground">15 min ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex-col">
                    <Activity className="w-5 h-5 mb-1" />
                    <span className="text-xs">View Tasks</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <GitBranch className="w-5 h-5 mb-1" />
                    <span className="text-xs">Create Workflow</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="w-5 h-5 mb-1" />
                    <span className="text-xs">Manage Agents</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Settings className="w-5 h-5 mb-1" />
                    <span className="text-xs">System Config</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                System Health Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98.7%</div>
                  <div className="text-sm text-green-600">Uptime</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-blue-600">Tasks Today</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <div className="text-sm text-yellow-600">Warnings</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-green-600">Errors</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="task-distribution">
          <TaskDistributionEngine />
        </TabsContent>

        <TabsContent value="workflow-builder">
          <WorkflowBuilder />
        </TabsContent>

        <TabsContent value="load-balancer">
          <AgentLoadBalancer />
        </TabsContent>

        <TabsContent value="automation-rules">
          <AutomationRuleEngine />
        </TabsContent>
      </Tabs>
    </div>
  );
}
