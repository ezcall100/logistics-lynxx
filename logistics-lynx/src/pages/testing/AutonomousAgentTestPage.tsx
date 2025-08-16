/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import AutonomousOrchestrator from '@/components/autonomous/AutonomousOrchestrator';
import AutonomousForecastDashboard from '@/components/autonomous/AutonomousForecastDashboard';
import { RealtimeAgentDashboard } from '@/components/testing/RealtimeAgentDashboard';
import { DocumentationAgents } from '@/components/testing/DocumentationAgents';
import { LiveTestingDashboard } from '@/components/testing/LiveTestingDashboard';
import { AgentFleetManager } from '@/components/testing/AgentFleetManager';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import { useContinuousAgentManager } from '@/hooks/autonomous/useContinuousAgentManager';
import { 
  Settings, 
  Users, 
  Calendar, 
  BarChart3, 
  TestTube,
  FileText,
  Brain,
  Activity,
  Shield,
  Zap,
  TrendingUp,
  Clock
} from 'lucide-react';

const AutonomousAgentTestPage = () => {
  const [activeTab, setActiveTab] = useState('orchestrator');
  const [systemStatus, setSystemStatus] = useState({
    totalAgents: 250,
    activeAgents: 250, // All active for 24/7 operation
    completedTasks: 0,
    systemHealth: 100,
    uptime: '00:00:00'
  });
  const { toast } = useToast();
  const { isRunning, completedTasks, activeAgents } = useContinuousAgentManager();

  // Update system status with continuous agent data
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        activeAgents: activeAgents,
        completedTasks: completedTasks,
        uptime: new Date(Date.now()).toISOString().substr(11, 8)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeAgents, completedTasks]);

  const quickStats = [
    { 
      label: 'Total Agents', 
      value: systemStatus.totalAgents, 
      icon: Users, 
      color: 'text-blue-600',
      change: '+0'
    },
    { 
      label: 'Active Agents', 
      value: systemStatus.activeAgents, 
      icon: Activity, 
      color: 'text-green-600',
      change: '24/7 ACTIVE'
    },
    { 
      label: 'System Health', 
      value: `${systemStatus.systemHealth}%`, 
      icon: Shield, 
      color: 'text-emerald-600',
      change: '+2%'
    },
    { 
      label: 'Tasks Completed', 
      value: systemStatus.completedTasks, 
      icon: Zap, 
      color: 'text-purple-600',
      change: '+47'
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Header Section */}
        <div className="border-b bg-card shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground flex items-center gap-3">
                    <Brain className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                    <span className="hidden sm:inline">Autonomous TMS Development Center</span>
                    <span className="sm:hidden">Agent Control</span>
                  </h1>
                  <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                    Complete autonomous development and testing environment for 250 specialized agents
                  </p>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Activity className="h-3 w-3 mr-1" />
                    250 AGENTS ACTIVE 24/7
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {systemStatus.uptime}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    FULLY AUTONOMOUS - NO HUMAN INTERVENTION
                  </Badge>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {quickStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-muted-foreground truncate">{stat.label}</p>
                            <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <TrendingUp className="h-3 w-3 text-green-600" />
                              <span className="text-xs text-green-600">{stat.change}</span>
                            </div>
                          </div>
                          <IconComponent className={`h-8 w-8 ${stat.color} flex-shrink-0`} />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full bg-card shadow-sm h-auto p-1">
              <TabsTrigger 
                value="orchestrator" 
                className="flex flex-col items-center gap-1 px-2 py-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Orchestrator</span>
                <span className="sm:hidden">Control</span>
              </TabsTrigger>
              <TabsTrigger 
                value="fleet" 
                className="flex flex-col items-center gap-1 px-2 py-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Agent Fleet</span>
                <span className="sm:hidden">Fleet</span>
              </TabsTrigger>
              <TabsTrigger 
                value="forecast" 
                className="flex flex-col items-center gap-1 px-2 py-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Forecast</span>
                <span className="sm:hidden">Timeline</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="flex flex-col items-center gap-1 px-2 py-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger 
                value="testing" 
                className="flex flex-col items-center gap-1 px-2 py-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <TestTube className="h-4 w-4" />
                <span className="hidden sm:inline">Live Testing</span>
                <span className="sm:hidden">Test</span>
              </TabsTrigger>
              <TabsTrigger 
                value="documentation" 
                className="flex flex-col items-center gap-1 px-2 py-3 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Documentation</span>
                <span className="sm:hidden">Docs</span>
              </TabsTrigger>
            </TabsList>

            {/* Orchestrator Tab */}
            <TabsContent value="orchestrator" className="space-y-6">
              <div className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Settings className="h-5 w-5" />
                      System Orchestrator
                    </CardTitle>
                    <CardDescription>
                      Central command and control for all 250 autonomous agents
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <AutonomousOrchestrator />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Agent Fleet Tab */}
            <TabsContent value="fleet" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Users className="h-5 w-5" />
                    Agent Fleet Management
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Monitor and manage all specialized autonomous agents
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <AgentFleetManager />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Forecast Tab */}
            <TabsContent value="forecast" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Calendar className="h-5 w-5" />
                    Development Forecast & Timeline
                  </CardTitle>
                  <CardDescription className="text-purple-700">
                    7-day forecast with daily progress tracking and completion estimates
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <AutonomousForecastDashboard />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-emerald-900">
                    <BarChart3 className="h-5 w-5" />
                    Advanced Analytics Dashboard
                  </CardTitle>
                  <CardDescription className="text-emerald-700">
                    Real-time performance metrics and system insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <AnalyticsDashboard />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Live Testing Tab */}
            <TabsContent value="testing" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-orange-900">
                    <TestTube className="h-5 w-5" />
                    Live Testing Environment
                  </CardTitle>
                  <CardDescription className="text-orange-700">
                    Real-time testing and validation of TMS functionality
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <LiveTestingDashboard />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documentation Tab */}
            <TabsContent value="documentation" className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50 border-b">
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <FileText className="h-5 w-5" />
                    Documentation Agents
                  </CardTitle>
                  <CardDescription className="text-slate-700">
                    Compliance, legal, and policy documentation automation
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <DocumentationAgents />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AutonomousAgentTestPage;