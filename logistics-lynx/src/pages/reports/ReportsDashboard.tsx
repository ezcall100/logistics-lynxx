import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Truck,
  Clock,
  Package,
  Users,
  Shield,
  MapPin,
  FileText,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  Fuel,
  Settings,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  LineChart
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';

const ReportsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReportType, setSelectedReportType] = useState('all');

  // Key Performance Indicators
  const kpis = [
    {
      title: 'Total Revenue',
      value: '$2,847,350',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Loads',
      value: '1,247',
      change: '+8.3%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Fleet Utilization',
      value: '89.2%',
      change: '+5.1%',
      trend: 'up',
      icon: Truck,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Safety Score',
      value: '94.7%',
      change: '-2.1%',
      trend: 'down',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // Recent Reports
  const recentReports = [
    {
      id: 1,
      name: 'Monthly Financial Summary',
      type: 'Financial',
      category: 'financial',
      generatedBy: 'System',
      createdAt: '2024-01-15 14:30',
      status: 'completed',
      size: '2.3 MB',
      format: 'PDF',
      downloads: 24
    },
    {
      id: 2,
      name: 'Driver Performance Report',
      type: 'Operations',
      category: 'drivers',
      generatedBy: 'John Smith',
      createdAt: '2024-01-15 12:15',
      status: 'completed',
      size: '1.8 MB',
      format: 'Excel',
      downloads: 18
    },
    {
      id: 3,
      name: 'Fleet Maintenance Analysis',
      type: 'Maintenance',
      category: 'vehicles',
      generatedBy: 'System',
      createdAt: '2024-01-15 10:45',
      status: 'processing',
      size: '- MB',
      format: 'PDF',
      downloads: 0
    },
    {
      id: 4,
      name: 'Route Efficiency Report',
      type: 'Analytics',
      category: 'routes',
      generatedBy: 'Sarah Johnson',
      createdAt: '2024-01-15 09:20',
      status: 'completed',
      size: '3.1 MB',
      format: 'PDF',
      downloads: 35
    },
    {
      id: 5,
      name: 'Compliance Audit Report',
      type: 'Compliance',
      category: 'compliance',
      generatedBy: 'System',
      createdAt: '2024-01-14 16:00',
      status: 'completed',
      size: '4.2 MB',
      format: 'PDF',
      downloads: 12
    }
  ];

  // Popular Report Categories
  const reportCategories = [
    {
      name: 'Financial Reports',
      icon: DollarSign,
      count: 156,
      description: 'Revenue, expenses, and profitability analysis',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      href: '/carrier-admin/reports/financial'
    },
    {
      name: 'Operations Reports',
      icon: Truck,
      count: 89,
      description: 'Fleet operations and logistics performance',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      href: '/carrier-admin/reports/operations'
    },
    {
      name: 'Driver Reports',
      icon: Users,
      count: 234,
      description: 'Driver performance and safety metrics',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      href: '/carrier-admin/reports/drivers'
    },
    {
      name: 'Compliance Reports',
      icon: Shield,
      count: 67,
      description: 'Regulatory compliance and safety audits',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      href: '/carrier-admin/reports/compliance'
    },
    {
      name: 'Vehicle Reports',
      icon: Settings,
      count: 123,
      description: 'Vehicle maintenance and performance data',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      href: '/carrier-admin/reports/vehicles'
    },
    {
      name: 'Route Analytics',
      icon: MapPin,
      count: 98,
      description: 'Route optimization and efficiency analysis',
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      href: '/carrier-admin/reports/routes'
    }
  ];

  // Scheduled Reports
  const scheduledReports = [
    {
      name: 'Weekly Financial Summary',
      frequency: 'Weekly',
      nextRun: '2024-01-22 08:00',
      status: 'active',
      recipients: 3
    },
    {
      name: 'Monthly Safety Report',
      frequency: 'Monthly',
      nextRun: '2024-02-01 09:00',
      status: 'active',
      recipients: 5
    },
    {
      name: 'Daily Operations Dashboard',
      frequency: 'Daily',
      nextRun: '2024-01-16 06:00',
      status: 'active',
      recipients: 8
    },
    {
      name: 'Quarterly Compliance Audit',
      frequency: 'Quarterly',
      nextRun: '2024-04-01 10:00',
      status: 'paused',
      recipients: 2
    }
  ];

  const handleDownloadReport = (reportId: number) => {
    toast.success(`Downloading report ${reportId}...`);
  };

  const handleViewReport = (reportId: number) => {
    toast.info(`Opening report ${reportId} viewer...`);
  };

  const handleGenerateReport = (category: string) => {
    toast.success(`Generating new ${category} report...`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-50 text-green-600">Completed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-50 text-yellow-600">Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-50 text-red-600">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and reporting for your transportation operations
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <div className="flex items-center mt-1">
                      {kpi.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Report Categories */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Report Categories</CardTitle>
                <CardDescription>
                  Browse reports by category and generate new ones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {reportCategories.map((category) => (
                    <Card key={category.name} className="hover:shadow-lg transition-all cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-lg ${category.bgColor}`}>
                              <category.icon className={`h-6 w-6 ${category.iconColor}`} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">{category.name}</h3>
                              <p className="text-sm text-gray-500 mb-2">{category.description}</p>
                              <Badge variant="outline">{category.count} reports</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleGenerateReport(category.name)}
                          >
                            Generate New
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={category.href}>
                              <Eye className="h-3 w-3 mr-1" />
                              View All
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Automated report generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{report.name}</h4>
                      <Badge 
                        variant={report.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{report.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Next: {report.nextRun}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{report.recipients} recipients</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Manage Schedules
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>
                Latest generated reports and their status
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-gray-500">{report.format}</div>
                      </div>
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.generatedBy}</TableCell>
                    <TableCell className="text-sm">{report.createdAt}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{report.downloads}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewReport(report.id)}
                          disabled={report.status !== 'completed'}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                          disabled={report.status !== 'completed'}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-semibold mb-2">Custom Report Builder</h3>
              <p className="text-sm text-muted-foreground mb-4">Create custom reports with drag & drop</p>
              <Button asChild className="w-full">
                <Link to="/carrier-admin/reports/custom">Build Report</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <PieChart className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <h3 className="font-semibold mb-2">Performance Analytics</h3>
              <p className="text-sm text-muted-foreground mb-4">Deep dive into performance metrics</p>
              <Button asChild className="w-full">
                <Link to="/carrier-admin/reports/performance">View Analytics</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <LineChart className="h-12 w-12 mx-auto mb-4 text-purple-600" />
              <h3 className="font-semibold mb-2">Trend Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">Analyze trends and forecasts</p>
              <Button asChild className="w-full">
                <Link to="/carrier-admin/reports/trends">View Trends</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-orange-600" />
              <h3 className="font-semibold mb-2">Executive Summary</h3>
              <p className="text-sm text-muted-foreground mb-4">High-level business overview</p>
              <Button asChild className="w-full">
                <Link to="/carrier-admin/reports/executive">Generate Summary</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsDashboard;