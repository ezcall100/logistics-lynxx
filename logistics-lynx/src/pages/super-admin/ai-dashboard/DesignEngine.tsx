/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Layout, 
  Accessibility, 
  Gauge, 
  Smartphone, 
  MousePointer,
  Settings,
  RefreshCw,
  TrendingUp,
  Eye,
  Lightbulb
} from 'lucide-react';
import { toast } from 'sonner';

const DesignEngine = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    toast.success('Design engine data refreshed');
  };

  const designAgents = [
    {
      name: 'Color Harmony AI',
      type: 'VISUAL',
      efficiency: 94.0,
      tasksCompleted: 50,
      lastAction: 'Enhancing visual hierarchy',
      icon: Palette,
      color: 'text-pink-600'
    },
    {
      name: 'Layout Intelligence',
      type: 'UI',
      efficiency: 87.0,
      tasksCompleted: 32,
      lastAction: 'Refining button styles',
      icon: Layout,
      color: 'text-blue-600'
    },
    {
      name: 'Accessibility Sentinel',
      type: 'ACCESSIBILITY',
      efficiency: 96.0,
      tasksCompleted: 52,
      lastAction: 'Checking ARIA labels',
      icon: Accessibility,
      color: 'text-green-600'
    },
    {
      name: 'Performance Optimizer',
      type: 'PERFORMANCE',
      efficiency: 86.7,
      tasksCompleted: 31,
      lastAction: 'Reducing paint operations',
      icon: Gauge,
      color: 'text-orange-600'
    },
    {
      name: 'Mobile Experience AI',
      type: 'RESPONSIVE',
      efficiency: 85.6,
      tasksCompleted: 42,
      lastAction: 'Optimizing touch targets',
      icon: Smartphone,
      color: 'text-purple-600'
    },
    {
      name: 'UX Flow Analyzer',
      type: 'UX',
      efficiency: 87.8,
      tasksCompleted: 26,
      lastAction: 'Improving form interactions',
      icon: MousePointer,
      color: 'text-indigo-600'
    }
  ];

  const portalScores = [
    { name: 'Super Admin Portal', score: 96, improvements: 8 },
    { name: 'Carrier Portal', score: 92, improvements: 12 },
    { name: 'Driver Portal', score: 89, improvements: 15 },
    { name: 'Broker Portal', score: 94, improvements: 6 },
    { name: 'Shipper Portal', score: 91, improvements: 10 }
  ];

  const aiInsights = [
    {
      type: 'Color Contrast',
      severity: 'medium',
      description: 'Detected 3 areas with insufficient color contrast ratios',
      suggestion: 'Increase contrast in form labels and secondary text'
    },
    {
      type: 'Mobile Optimization',
      severity: 'high',
      description: 'Touch targets below 44px detected on mobile devices',
      suggestion: 'Increase button sizes for better mobile accessibility'
    },
    {
      type: 'Performance',
      severity: 'low',
      description: 'Bundle size could be optimized in driver portal',
      suggestion: 'Implement code splitting for route components'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Autonomous Design Engine
            </h1>
            <p className="text-muted-foreground">
              AI-powered UI/UX optimization across all TMS portals
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-3 py-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
              Active
            </Badge>
            <Button onClick={handleRefresh} disabled={refreshing} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="agents" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="agents">Design Agents</TabsTrigger>
            <TabsTrigger value="portals">Portal Scores</TabsTrigger>
            <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {designAgents.map((agent, index) => {
                const Icon = agent.icon;
                return (
                  <Card key={index} className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent"></div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Icon className={`w-6 h-6 ${agent.color}`} />
                        <Badge variant="outline" className="text-xs">
                          {agent.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Efficiency</span>
                          <span className="text-sm font-medium">{agent.efficiency}%</span>
                        </div>
                        <Progress value={agent.efficiency} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Tasks Completed</span>
                          <span className="text-sm font-medium">{agent.tasksCompleted}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last Action: {agent.lastAction}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="portals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Portal Performance Scores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portalScores.map((portal, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{portal.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {portal.improvements} optimizations applied
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{portal.score}</div>
                          <div className="text-sm text-muted-foreground">score</div>
                        </div>
                        <div className="w-20">
                          <Progress value={portal.score} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimizations" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-orange-600" />
                    Performance Optimizations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bundle size reduction</span>
                    <Badge className="bg-green-100 text-green-700">-23%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Paint operations</span>
                    <Badge className="bg-green-100 text-green-700">-18%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Load time improvement</span>
                    <Badge className="bg-green-100 text-green-700">-31%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    Visual Enhancements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Color harmony score</span>
                    <Badge className="bg-purple-100 text-purple-700">94%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Typography consistency</span>
                    <Badge className="bg-purple-100 text-purple-700">98%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Visual hierarchy</span>
                    <Badge className="bg-purple-100 text-purple-700">96%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  AI-Generated Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{insight.type}</h3>
                        <Badge variant="outline" className={getSeverityColor(insight.severity)}>
                          {insight.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      <p className="text-sm text-blue-600">
                        💡 {insight.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-600" />
              Design Engine Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                <Palette className="w-4 h-4 mr-2" />
                Color Theme Settings
              </Button>
              <Button variant="outline" className="justify-start">
                <Layout className="w-4 h-4 mr-2" />
                Layout Preferences
              </Button>
              <Button variant="outline" className="justify-start">
                <Accessibility className="w-4 h-4 mr-2" />
                Accessibility Rules
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default DesignEngine;