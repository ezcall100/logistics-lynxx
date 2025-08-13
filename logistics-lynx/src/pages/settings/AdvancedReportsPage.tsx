import React, { useState } from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Filter, Settings, Eye, Share2, Clock, Users, Truck, DollarSign, Activity, FileText, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

const AdvancedReportsPage = () => {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const reportTemplates = [
    {
      id: 'financial-summary',
      name: 'Financial Summary',
      description: 'Comprehensive financial analysis with revenue, expenses, and profit margins',
      category: 'Financial',
      icon: DollarSign,
      color: 'text-emerald-600',
      frequency: 'Monthly',
      lastGenerated: '2024-01-15',
      size: '2.4 MB',
      recipients: 5,
      automated: true
    },
    {
      id: 'fleet-performance',
      name: 'Fleet Performance',
      description: 'Vehicle utilization, maintenance costs, and driver performance metrics',
      category: 'Operations',
      icon: Truck,
      color: 'text-blue-600',
      frequency: 'Weekly',
      lastGenerated: '2024-01-18',
      size: '1.8 MB',
      recipients: 3,
      automated: true
    },
    {
      id: 'safety-compliance',
      name: 'Safety & Compliance',
      description: 'Safety incidents, compliance status, and regulatory adherence',
      category: 'Safety',
      icon: Activity,
      color: 'text-red-600',
      frequency: 'Monthly',
      lastGenerated: '2024-01-10',
      size: '1.2 MB',
      recipients: 8,
      automated: false
    },
    {
      id: 'customer-analytics',
      name: 'Customer Analytics',
      description: 'Customer satisfaction, retention rates, and service quality metrics',
      category: 'CRM',
      icon: Users,
      color: 'text-purple-600',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-01',
      size: '3.1 MB',
      recipients: 6,
      automated: true
    }
  ];

  const scheduledReports = [
    {
      id: 1,
      name: 'Weekly Operations Dashboard',
      schedule: 'Every Monday 8:00 AM',
      nextRun: '2024-01-22 08:00',
      recipients: ['manager@company.com', 'ops@company.com'],
      status: 'active',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Monthly Financial Report',
      schedule: '1st of every month 9:00 AM',
      nextRun: '2024-02-01 09:00',
      recipients: ['cfo@company.com', 'accounting@company.com'],
      status: 'active',
      format: 'Excel'
    },
    {
      id: 3,
      name: 'Safety Incident Summary',
      schedule: 'Every Friday 5:00 PM',
      nextRun: '2024-01-26 17:00',
      recipients: ['safety@company.com'],
      status: 'paused',
      format: 'PDF'
    }
  ];

  const customReports = [
    {
      id: 1,
      name: 'Driver Performance Analysis',
      description: 'Custom analysis of driver efficiency and safety metrics',
      createdBy: 'John Smith',
      createdAt: '2024-01-15',
      lastRun: '2024-01-19',
      parameters: {
        dateRange: '30 days',
        includeMetrics: ['miles', 'safety', 'fuel'],
        groupBy: 'driver'
      }
    },
    {
      id: 2,
      name: 'Route Optimization Report',
      description: 'Analysis of route efficiency and cost optimization opportunities',
      createdBy: 'Sarah Johnson',
      createdAt: '2024-01-10',
      lastRun: '2024-01-18',
      parameters: {
        dateRange: '60 days',
        includeMetrics: ['distance', 'time', 'fuel', 'cost'],
        groupBy: 'route'
      }
    }
  ];

  const analyticsData = [
    { metric: 'Reports Generated', value: '1,247', change: '+12%', trend: 'up' },
    { metric: 'Data Points Analyzed', value: '45.2K', change: '+8%', trend: 'up' },
    { metric: 'Automated Reports', value: '24', change: '+3', trend: 'up' },
    { metric: 'Storage Used', value: '2.8 GB', change: '+0.3 GB', trend: 'up' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'paused': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'error': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Advanced Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate insights with automated reporting and custom analytics</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Create Custom Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Custom Report</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Report Name</Label>
                <Input placeholder="Enter report name" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="crm">Customer Relations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data Source</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="loads">Load Data</SelectItem>
                    <SelectItem value="financial">Financial Data</SelectItem>
                    <SelectItem value="fleet">Fleet Data</SelectItem>
                    <SelectItem value="drivers">Driver Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Report</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.metric}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`h-3 w-3 ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`} />
                    <span className={`text-xs ${item.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Available Report Templates</h3>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="crm">Customer Relations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card key={template.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <IconComponent className={`h-5 w-5 ${template.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                      </div>
                      <Switch defaultChecked={template.automated} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Frequency</span>
                        <span className="text-muted-foreground">{template.frequency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Last Generated</span>
                        <span className="text-muted-foreground">{template.lastGenerated}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>File Size</span>
                        <span className="text-muted-foreground">{template.size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Recipients</span>
                        <span className="text-muted-foreground">{template.recipients} users</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Scheduled Reports</h3>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Report
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <Badge variant="outline" className="text-xs">{report.format}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{report.schedule}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{report.nextRun}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{report.recipients.length} recipients</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Custom Reports</h3>
            <div className="flex items-center gap-2">
              <Input placeholder="Search reports..." className="w-64" />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {customReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Run Report
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created by:</span>
                      <p className="font-medium">{report.createdBy}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <p className="font-medium">{report.createdAt}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last run:</span>
                      <p className="font-medium">{report.lastRun}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Parameters:</span>
                      <div className="flex gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">{report.parameters.dateRange}</Badge>
                        <Badge variant="outline" className="text-xs">{report.parameters.groupBy}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Generation Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Financial Reports</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-24 h-2" />
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Operations Reports</span>
                    <div className="flex items-center gap-2">
                      <Progress value={72} className="w-24 h-2" />
                      <span className="text-sm font-medium">72%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Safety Reports</span>
                    <div className="flex items-center gap-2">
                      <Progress value={91} className="w-24 h-2" />
                      <span className="text-sm font-medium">91%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Custom Reports</span>
                    <div className="flex items-center gap-2">
                      <Progress value={58} className="w-24 h-2" />
                      <span className="text-sm font-medium">58%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Export Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>PDF Exports</span>
                    <span className="font-medium">1,247 this month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Excel Exports</span>
                    <span className="font-medium">892 this month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>CSV Exports</span>
                    <span className="font-medium">456 this month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>API Downloads</span>
                    <span className="font-medium">2,134 this month</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total Exports</span>
                    <span>4,729 this month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600">2.3s</div>
                  <p className="text-sm text-muted-foreground">Average Generation Time</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">99.2%</div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">45GB</div>
                  <p className="text-sm text-muted-foreground">Data Processed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedReportsPage;