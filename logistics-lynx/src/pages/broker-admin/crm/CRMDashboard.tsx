/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign,
  Users,
  TrendingUp,
  Phone,
  Mail,
  Calendar,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  Eye,
  MessageSquare,
  Activity
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const CRMDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Mock data for metrics
  const metrics = [
    {
      title: "Pipeline Value",
      value: "$4.2M",
      change: "+23.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
      description: "Active opportunities"
    },
    {
      title: "Leads Generated",
      value: "284",
      change: "+18.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      description: "This month"
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+4.1%",
      trend: "up",
      icon: Target,
      color: "text-purple-600",
      description: "Lead to customer"
    },
    {
      title: "Active Deals",
      value: "47",
      change: "-2.3%",
      trend: "down",
      icon: TrendingUp,
      color: "text-orange-600",
      description: "In negotiation"
    }
  ];

  // Pipeline stage data
  const pipelineData = [
    { stage: 'Prospects', deals: 45, value: 1200000, conversion: 78 },
    { stage: 'Qualified', deals: 35, value: 980000, conversion: 65 },
    { stage: 'Proposal', deals: 22, value: 750000, conversion: 58 },
    { stage: 'Negotiation', deals: 15, value: 540000, conversion: 42 },
    { stage: 'Closed Won', deals: 8, value: 320000, conversion: 35 }
  ];

  // Revenue trend data
  const revenueData = [
    { month: 'Jan', revenue: 45000, deals: 12, forecast: 48000 },
    { month: 'Feb', revenue: 52000, deals: 15, forecast: 55000 },
    { month: 'Mar', revenue: 48000, deals: 11, forecast: 52000 },
    { month: 'Apr', revenue: 61000, deals: 18, forecast: 58000 },
    { month: 'May', revenue: 55000, deals: 14, forecast: 60000 },
    { month: 'Jun', revenue: 67000, deals: 20, forecast: 65000 },
    { month: 'Jul', revenue: 72000, deals: 22, forecast: 70000 }
  ];

  // Activity data
  const activityData = [
    { type: 'Calls', count: 156, color: '#3B82F6' },
    { type: 'Emails', count: 89, color: '#10B981' },
    { type: 'Meetings', count: 34, color: '#F59E0B' },
    { type: 'Proposals', count: 12, color: '#8B5CF6' }
  ];

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'call',
      title: 'Call with Global Manufacturing Inc',
      description: 'Discussed Q4 shipping requirements',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'email',
      title: 'Proposal sent to TechCorp',
      description: 'Annual logistics contract proposal',
      time: '4 hours ago',
      status: 'sent'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Demo scheduled with RetailCorp',
      description: 'Product demonstration meeting',
      time: '6 hours ago',
      status: 'scheduled'
    },
    {
      id: 4,
      type: 'deal',
      title: 'Deal closed with FastShip Ltd',
      description: '$125,000 annual contract signed',
      time: '1 day ago',
      status: 'won'
    }
  ];

  // Top opportunities
  const topOpportunities = [
    {
      id: 1,
      company: 'Global Manufacturing Inc',
      value: 450000,
      stage: 'Negotiation',
      probability: 85,
      closeDate: '2024-02-15',
      contact: 'Sarah Johnson'
    },
    {
      id: 2,
      company: 'TechCorp Solutions',
      value: 320000,
      stage: 'Proposal',
      probability: 70,
      closeDate: '2024-02-28',
      contact: 'Mike Chen'
    },
    {
      id: 3,
      company: 'RetailCorp Inc',
      value: 280000,
      stage: 'Qualified',
      probability: 60,
      closeDate: '2024-03-10',
      contact: 'Lisa Rodriguez'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
      case 'deal': return DollarSign;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'sent': return 'text-blue-600';
      case 'scheduled': return 'text-orange-600';
      case 'won': return 'text-emerald-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM Dashboard</h1>
          <p className="text-muted-foreground">
            Complete overview of your sales performance and pipeline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Lead
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {metric.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {metric.change}
                </span>
                <span className="ml-1">{metric.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Revenue Trend */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>
                  Monthly revenue vs forecast comparison
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      name="Actual Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.2}
                      name="Forecast"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity Breakdown */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Activity Breakdown</CardTitle>
                <CardDescription>
                  This month's communication activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={activityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      nameKey="type"
                    >
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {activityData.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: activity.color }}
                      />
                      <span className="text-sm font-medium">{activity.type}</span>
                      <span className="text-sm text-muted-foreground ml-auto">
                        {activity.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
                <CardDescription>
                  Latest sales and communication activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <IconComponent className={`h-4 w-4 mt-1 ${getStatusColor(activity.status)}`} />
                        <div className="flex-1 space-y-1">
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {activity.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Top Opportunities
                </CardTitle>
                <CardDescription>
                  Highest value deals in your pipeline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-semibold text-sm">{opportunity.company}</p>
                        <p className="text-xs text-muted-foreground">{opportunity.contact}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{opportunity.stage}</Badge>
                          <span className="text-xs text-muted-foreground">
                            Close: {opportunity.closeDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-bold text-lg">${(opportunity.value / 1000).toFixed(0)}K</p>
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(opportunity.probability / 20)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {opportunity.probability}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline Analysis</CardTitle>
              <CardDescription>
                Visual representation of your sales funnel performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pipelineData.map((stage, index) => (
                  <div key={stage.stage} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{stage.stage}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{stage.deals} deals</span>
                        <span>${(stage.value / 1000).toFixed(0)}K</span>
                        <span>{stage.conversion}% conversion</span>
                      </div>
                    </div>
                    <Progress value={stage.conversion} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Deal Closure Rate</CardTitle>
                <CardDescription>Monthly deal closure performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="deals" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Average Deal Size</span>
                  <span className="text-lg font-bold">$85,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sales Cycle Length</span>
                  <span className="text-lg font-bold">32 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Win Rate</span>
                  <span className="text-lg font-bold">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Monthly Growth</span>
                  <span className="text-lg font-bold text-green-600">+12.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Calls Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">3 scheduled, 9 completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Emails Sent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28</div>
                <p className="text-sm text-muted-foreground">85% open rate</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Meetings Booked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-sm text-muted-foreground">This week</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRMDashboard;