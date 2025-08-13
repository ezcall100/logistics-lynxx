
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AIAgentManager from './AIAgentManager';
import { AutonomousTaskManager } from './AutonomousTaskManager';
import AutonomousKnowledgeBase from './AutonomousKnowledgeBase';
import RealtimeDashboard from './RealtimeDashboard';
import PerformanceOptimizationDashboard from './PerformanceOptimizationDashboard';
import PredictiveScalingDashboard from './PredictiveScalingDashboard';
import SelfHealingDashboard from './SelfHealingDashboard';
import AutonomousUIDesignDashboard from './AutonomousUIDesignDashboard';

const AutonomousTabs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Autonomous TMS System</h1>
        <p className="text-muted-foreground">
          AI-powered transportation management with self-learning capabilities
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="agents">AI Agents</TabsTrigger>
          <TabsTrigger value="tasks">Task Manager</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="scaling">Scaling</TabsTrigger>
          <TabsTrigger value="healing">Self-Healing</TabsTrigger>
          <TabsTrigger value="ui-design">UI Design</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time System Overview</CardTitle>
              <CardDescription>
                Live metrics and performance indicators for the autonomous TMS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RealtimeDashboard />
            </CardContent>
          </Card>
        </TabsContent>

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

        <TabsContent value="ui-design" className="space-y-4">
          <AutonomousUIDesignDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutonomousTabs;
