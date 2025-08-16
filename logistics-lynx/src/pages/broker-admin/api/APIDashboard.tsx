/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  Database, 
  Shield, 
  Zap,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const APIDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  // Mock data for API metrics
  const apiMetrics = [
    {
      title: "Total API Calls",
      value: "2,847,391",
      change: "+12.5%",
      trend: "up",
      icon: Database,
      color: "text-blue-500"
    },
    {
      title: "Success Rate",
      value: "99.7%",
      change: "+0.3%",
      trend: "up", 
      icon: CheckCircle,
      color: "text-green-500"
    },
    {
      title: "Avg Response Time",
      value: "127ms",
      change: "-15ms",
      trend: "up",
      icon: Clock,
      color: "text-purple-500"
    },
    {
      title: "Active Integrations",
      value: "47",
      change: "+3",
      trend: "up",
      icon: Zap,
      color: "text-orange-500"
    }
  ];

  // Mock data for recent API activity
  const recentActivity = [
    {
      id: "api_001",
      endpoint: "/v1/loads/search",
      method: "GET",
      status: 200,
      responseTime: "89ms",
      timestamp: "2024-01-20 14:35:22",
      source: "Carrier Portal",
      integration: "Swift Transport"
    },
    {
      id: "api_002", 
      endpoint: "/v1/quotes/create",
      method: "POST",
      status: 201,
      responseTime: "156ms",
      timestamp: "2024-01-20 14:34:18",
      source: "Mobile App",
      integration: "ABC Logistics"
    },
    {
      id: "api_003",
      endpoint: "/v1/shipments/update",
      method: "PUT", 
      status: 500,
      responseTime: "2.1s",
      timestamp: "2024-01-20 14:33:45",
      source: "External API",
      integration: "XYZ Freight"
    },
    {
      id: "api_004",
      endpoint: "/v1/rates/calculate",
      method: "POST",
      status: 200,
      responseTime: "203ms", 
      timestamp: "2024-01-20 14:32:11",
      source: "Web Portal",
      integration: "Owner-Operator"
    },
    {
      id: "api_005",
      endpoint: "/v1/tracking/update", 
      method: "POST",
      status: 429,
      responseTime: "45ms",
      timestamp: "2024-01-20 14:31:08",
      source: "Mobile SDK",
      integration: "TruckStop API"
    }
  ];

  // Mock data for top integrations
  const topIntegrations = [
    {
      name: "Swift Transport API",
      type: "Carrier",
      calls: "847,392",
      successRate: 99.8,
      avgResponse: "92ms",
      status: "active"
    },
    {
      name: "DAT Load Board",
      type: "Load Board", 
      calls: "523,841",
      successRate: 98.9,
      avgResponse: "156ms",
      status: "active"
    },
    {
      name: "Motive ELD",
      type: "ELD Provider",
      calls: "234,567",
      successRate: 99.5,
      avgResponse: "78ms", 
      status: "active"
    },
    {
      name: "Factoring API",
      type: "Financial",
      calls: "189,432",
      successRate: 97.2,
      avgResponse: "234ms",
      status: "warning"
    },
    {
      name: "Owner-Operator Portal",
      type: "Internal",
      calls: "156,789",
      successRate: 99.9,
      avgResponse: "67ms",
      status: "active"
    }
  ];

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-50';
    if (status >= 400 && status < 500) return 'text-yellow-600 bg-yellow-50';
    if (status >= 500) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-orange-100 text-orange-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">API Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage all API integrations and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-2 h-4 w-4" />
            View Docs
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Integration
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apiMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-600 font-medium">{metric.change}</span>
                <span className="ml-1">from last {selectedTimeRange}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent API Activity */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Recent API Activity
            </CardTitle>
            <CardDescription>Latest API requests and responses</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Integration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-mono text-sm">{activity.endpoint}</TableCell>
                    <TableCell>
                      <Badge className={getMethodColor(activity.method)} variant="secondary">
                        {activity.method}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(activity.status)} variant="secondary">
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{activity.responseTime}</TableCell>
                    <TableCell>{activity.integration}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => copyToClipboard(activity.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy ID
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Report Issue
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-primary" />
              Top Integrations
            </CardTitle>
            <CardDescription>Most active API integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topIntegrations.map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{integration.name}</span>
                    <Badge 
                      variant={integration.status === 'active' ? 'default' : 'secondary'}
                      className={integration.status === 'warning' ? 'bg-yellow-100 text-yellow-800' : ''}
                    >
                      {integration.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{integration.type}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Calls: </span>
                      <span className="font-medium">{integration.calls}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Avg: </span>
                      <span className="font-medium">{integration.avgResponse}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Success Rate</span>
                      <span>{integration.successRate}%</span>
                    </div>
                    <Progress value={integration.successRate} className="h-1" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common API management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Generate API Key", description: "Create new API access", icon: Plus, action: "generate" },
              { title: "Monitor Health", description: "Check system status", icon: Activity, action: "monitor" },
              { title: "View Documentation", description: "API reference guide", icon: Database, action: "docs" },
              { title: "Configure Webhooks", description: "Set up event notifications", icon: Zap, action: "webhooks" }
            ].map((action) => (
              <Button key={action.title} variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APIDashboard;