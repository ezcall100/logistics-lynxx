/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AIAgentManager from './AIAgentManager';
import { AutonomousTaskManager } from './AutonomousTaskManager';
import AutonomousKnowledgeBase from './AutonomousKnowledgeBase';
import RealtimeDashboard from './RealtimeDashboard';
import PerformanceOptimizationDashboard from './PerformanceOptimizationDashboard';
import PredictiveScalingDashboard from './PredictiveScalingDashboard';
import SelfHealingDashboard from './SelfHealingDashboard';
import AutonomousUIDesignDashboard from './AutonomousUIDesignDashboard';
import { AutonomousWebsiteUpdater } from './AutonomousWebsiteUpdater';
import { LiveWebsiteUpdater } from './LiveWebsiteUpdater';
import { RealAutonomousUpdater } from './RealAutonomousUpdater';
import { DashboardTemplate } from '../dashboard/DashboardTemplate';

const AutonomousTabs = () => {
  const location = useLocation();

  const mainNavigationItems = [
    {
      title: 'Agent Dashboard',
      path: '/autonomous/agent-dashboard',
      description: 'Monitor and manage autonomous AI agents',
      icon: '🤖'
    },
    {
      title: 'Performance Monitor',
      path: '/autonomous/performance-monitor',
      description: 'Real-time system performance monitoring',
      icon: '📊'
    },
    {
      title: 'Learning Models',
      path: '/autonomous/learning-models',
      description: 'Manage machine learning models',
      icon: '🧠'
    },
    {
      title: 'Decision Logs',
      path: '/autonomous/decision-logs',
      description: 'Track autonomous AI decisions',
      icon: '📝'
    },
    {
      title: 'Auto Scaling',
      path: '/autonomous/auto-scaling',
      description: 'Intelligent infrastructure scaling',
      icon: '⚡'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Autonomous TMS System</h1>
        <p className="text-muted-foreground">
          AI-powered transportation management with self-learning capabilities
        </p>
      </div>

      {/* Main Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mainNavigationItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-blue-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Open {item.title}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
          <CardDescription>
            Real-time metrics and performance indicators for the autonomous TMS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RealtimeDashboard />
        </CardContent>
      </Card>

      {/* Additional Features Tabs */}
      <Tabs defaultValue="agents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="agents">AI Agents</TabsTrigger>
          <TabsTrigger value="tasks">Task Manager</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="scaling">Scaling</TabsTrigger>
          <TabsTrigger value="healing">Self-Healing</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <AIAgentManager />
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <AutonomousTaskManager />
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-4">
          <AutonomousKnowledgeBase />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <PerformanceOptimizationDashboard />
        </TabsContent>

        <TabsContent value="scaling" className="space-y-4">
          <PredictiveScalingDashboard />
        </TabsContent>

        <TabsContent value="healing" className="space-y-4">
          <SelfHealingDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutonomousTabs;
