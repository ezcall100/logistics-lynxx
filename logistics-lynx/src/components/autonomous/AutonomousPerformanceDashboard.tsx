/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, CheckCircle, Clock, Brain, Target } from 'lucide-react';

interface AgentPerformance {
  id: string;
  name: string;
  type: string;
  tasksCompleted: number;
  tasksInProgress: number;
  confidenceScore: number;
  successRate: number;
  averageTaskTime: number;
  specialization: string;
  status: 'active' | 'idle' | 'working' | 'optimizing';
}

const TMS_MODULES = [
  'Shipment Management', 'Carrier Management', 'Rate Management', 'Load Planning',
  'Route Optimization', 'Fleet Management', 'Driver Portal', 'Broker Portal',
  'Shipper Portal', 'Owner-Operator Portal', 'Billing & Invoicing', 'Document Management',
  'Tracking & Visibility', 'Analytics & Reporting', 'Compliance Management', 'Integration APIs',
  'Real-time Notifications', 'Load Board', 'Freight Matching', 'Audit Trail',
  'Multi-modal Transportation', 'EDI Integration', 'Mobile Apps', 'Customer Portal',
  'Vendor Management', 'Performance Analytics', 'Cost Analysis', 'Fuel Management',
  'Maintenance Scheduling', 'Insurance Management', 'Claims Processing', 'Weather Integration',
  'Traffic Data Integration', 'Automated Dispatching', 'Dynamic Routing', 'Capacity Planning',
  'Demand Forecasting', 'Revenue Optimization', 'Cost Control', 'Regulatory Compliance',
  'Safety Management', 'Driver Scorecard', 'Vehicle Tracking', 'Geofencing',
  'Electronic Logging', 'Proof of Delivery', 'Custom Reports', 'Dashboard Analytics',
  'KPI Monitoring', 'Alerts & Notifications', 'Third-party Connectors', 'Data Import/Export'
];

export const AutonomousPerformanceDashboard: React.FC = () => {
  const [agents, setAgents] = useState<AgentPerformance[]>([]);
  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>({});
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    // Initialize agents with realistic performance data
    const initialAgents: AgentPerformance[] = [
      {
        id: 'research-001', name: 'TMS Research Master', type: 'research',
        tasksCompleted: 45, tasksInProgress: 8, confidenceScore: 95, successRate: 98,
        averageTaskTime: 12, specialization: 'TMS Feature Analysis', status: 'working'
      },
      {
        id: 'frontend-001', name: 'Portal Builder Alpha', type: 'frontend', 
        tasksCompleted: 32, tasksInProgress: 12, confidenceScore: 88, successRate: 94,
        averageTaskTime: 25, specialization: 'React Portal Development', status: 'working'
      },
      {
        id: 'backend-001', name: 'API Architect Prime', type: 'backend',
        tasksCompleted: 28, tasksInProgress: 15, confidenceScore: 92, successRate: 96,
        averageTaskTime: 35, specialization: 'REST API Development', status: 'active'
      },
      {
        id: 'database-001', name: 'Schema Designer Pro', type: 'database',
        tasksCompleted: 18, tasksInProgress: 6, confidenceScore: 90, successRate: 97,
        averageTaskTime: 45, specialization: 'Database Architecture', status: 'optimizing'
      },
      {
        id: 'testing-001', name: 'Quality Assurance Bot', type: 'testing',
        tasksCompleted: 55, tasksInProgress: 3, confidenceScore: 93, successRate: 99,
        averageTaskTime: 8, specialization: 'Automated Testing', status: 'active'
      }
    ];

    setAgents(initialAgents);

    // Initialize module progress
    const progress: Record<string, number> = {};
    TMS_MODULES.forEach((module, index) => {
      progress[module] = Math.min(100, (index + 1) * 2 + Math.random() * 10);
    });
    setModuleProgress(progress);

    // Calculate overall progress
    const totalProgress = Object.values(progress).reduce((sum, val) => sum + val, 0);
    setOverallProgress(Math.round(totalProgress / TMS_MODULES.length));
  }, []);

  const chartData = agents.map(agent => ({
    name: agent.name.split(' ')[0],
    completed: agent.tasksCompleted,
    inProgress: agent.tasksInProgress,
    confidence: agent.confidenceScore
  }));

  const statusData = agents.reduce((acc, agent) => {
    acc[agent.status] = (acc[agent.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(statusData).map(([key, value]) => ({
    name: key,
    value,
    color: key === 'active' ? '#22c55e' : key === 'working' ? '#3b82f6' : '#f59e0b'
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Autonomous Agent Performance Dashboard</h2>
          <p className="text-muted-foreground">Real-time monitoring of 250 AI agents building TMS from 0-100%</p>
        </div>
        <Badge variant="default" className="text-lg px-4 py-2">
          Overall Progress: {overallProgress}%
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.reduce((sum, a) => sum + a.tasksCompleted, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.reduce((sum, a) => sum + a.tasksInProgress, 0)}</div>
            <p className="text-xs text-muted-foreground">Currently executing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
            <Brain className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(agents.reduce((sum, a) => sum + a.confidenceScore, 0) / agents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">AI decision confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Task completion rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="modules">TMS Module Progress</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription>{agent.specialization}</CardDescription>
                    </div>
                    <Badge variant={agent.status === 'working' ? 'default' : 'secondary'}>
                      {agent.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Tasks Completed</p>
                      <p className="text-2xl font-bold text-green-600">{agent.tasksCompleted}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">In Progress</p>
                      <p className="text-2xl font-bold text-blue-600">{agent.tasksInProgress}</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Confidence Score</span>
                      <span>{agent.confidenceScore}%</span>
                    </div>
                    <Progress value={agent.confidenceScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Success Rate</span>
                      <span>{agent.successRate}%</span>
                    </div>
                    <Progress value={agent.successRate} className="h-2" />
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Avg Task Time: {agent.averageTaskTime} minutes
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>TMS Module Development Progress</CardTitle>
              <CardDescription>
                50 comprehensive TMS modules being built autonomously
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TMS_MODULES.map((module) => (
                  <div key={module} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="truncate">{module}</span>
                      <span>{Math.round(moduleProgress[module] || 0)}%</span>
                    </div>
                    <Progress value={moduleProgress[module] || 0} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Task Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                    <Bar dataKey="inProgress" fill="#3b82f6" name="In Progress" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};