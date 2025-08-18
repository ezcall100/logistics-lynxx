import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Download, 
  Calendar, Filter, Search, FileText, Users, DollarSign,
  Activity, Globe, Shield, Database, Server, Clock,
  Eye, Edit, Trash2, Plus, RefreshCw, Settings,
  ArrowUpRight, ArrowDownRight, Minus, Target, Play
} from 'lucide-react';

// Real data models
interface Report {
  id: string;
  name: string;
  type: 'analytics' | 'financial' | 'operational' | 'security' | 'performance';
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  lastGenerated: string;
  nextRun: string;
  format: 'pdf' | 'csv' | 'excel' | 'json';
  recipients: string[];
  size: string;
  description: string;
}

interface ReportData {
  id: string;
  metric: string;
  currentValue: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  timestamp: string;
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  parameters: string[];
  lastUsed: string;
  usageCount: number;
}

// Mock API functions
const mockAPI = {
  getReports: (): Promise<Report[]> => Promise.resolve([
    {
      id: 'report-001',
      name: 'Monthly System Performance',
      type: 'performance',
      status: 'completed',
      lastGenerated: '2024-01-15T10:30:00Z',
      nextRun: '2024-02-15T10:30:00Z',
      format: 'pdf',
      recipients: ['admin@transbot.ai', 'devops@transbot.ai'],
      size: '2.4 MB',
      description: 'Comprehensive system performance analysis for January 2024'
    },
    {
      id: 'report-002',
      name: 'User Activity Analytics',
      type: 'analytics',
      status: 'running',
      lastGenerated: '2024-01-14T15:20:00Z',
      nextRun: '2024-01-16T15:20:00Z',
      format: 'csv',
      recipients: ['analytics@transbot.ai'],
      size: '1.8 MB',
      description: 'Daily user activity and engagement metrics'
    },
    {
      id: 'report-003',
      name: 'Security Audit Report',
      type: 'security',
      status: 'scheduled',
      lastGenerated: '2024-01-13T09:45:00Z',
      nextRun: '2024-01-16T09:45:00Z',
      format: 'pdf',
      recipients: ['security@transbot.ai'],
      size: '3.2 MB',
      description: 'Weekly security audit and vulnerability assessment'
    },
    {
      id: 'report-004',
      name: 'Financial Summary Q4 2023',
      type: 'financial',
      status: 'completed',
      lastGenerated: '2024-01-10T14:30:00Z',
      nextRun: '2024-04-10T14:30:00Z',
      format: 'excel',
      recipients: ['finance@transbot.ai', 'ceo@transbot.ai'],
      size: '4.1 MB',
      description: 'Quarterly financial performance and revenue analysis'
    }
  ]),

  getReportData: (): Promise<ReportData[]> => Promise.resolve([
    {
      id: 'metric-001',
      metric: 'Active Users',
      currentValue: 15420,
      previousValue: 14230,
      change: 1190,
      changePercent: 8.4,
      trend: 'up',
      category: 'User Engagement',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'metric-002',
      metric: 'Revenue',
      currentValue: 125000,
      previousValue: 118000,
      change: 7000,
      changePercent: 5.9,
      trend: 'up',
      category: 'Financial',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'metric-003',
      metric: 'System Uptime',
      currentValue: 99.8,
      previousValue: 99.5,
      change: 0.3,
      changePercent: 0.3,
      trend: 'up',
      category: 'Performance',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'metric-004',
      metric: 'API Response Time',
      currentValue: 245,
      previousValue: 280,
      change: -35,
      changePercent: -12.5,
      trend: 'down',
      category: 'Performance',
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: 'metric-005',
      metric: 'Security Incidents',
      currentValue: 3,
      previousValue: 7,
      change: -4,
      changePercent: -57.1,
      trend: 'down',
      category: 'Security',
      timestamp: '2024-01-15T10:30:00Z'
    }
  ]),

  getReportTemplates: (): Promise<ReportTemplate[]> => Promise.resolve([
    {
      id: 'template-001',
      name: 'Executive Dashboard',
      description: 'High-level overview of key business metrics',
      category: 'Executive',
      parameters: ['date_range', 'metrics', 'format'],
      lastUsed: '2024-01-15T10:30:00Z',
      usageCount: 45
    },
    {
      id: 'template-002',
      name: 'Technical Performance',
      description: 'Detailed technical performance metrics',
      category: 'Technical',
      parameters: ['systems', 'timeframe', 'thresholds'],
      lastUsed: '2024-01-14T15:20:00Z',
      usageCount: 32
    },
    {
      id: 'template-003',
      name: 'Security Summary',
      description: 'Security events and compliance status',
      category: 'Security',
      parameters: ['security_events', 'compliance', 'risks'],
      lastUsed: '2024-01-13T09:45:00Z',
      usageCount: 28
    }
  ])
};

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [templates, setTemplates] = useState<ReportTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [newReportDialog, setNewReportDialog] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const [reportsData, data, templatesData] = await Promise.all([
        mockAPI.getReports(),
        mockAPI.getReportData(),
        mockAPI.getReportTemplates()
      ]);

      setReports(reportsData);
      setReportData(data);
      setTemplates(templatesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load reports",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = (id: string) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id ? { ...report, status: 'running' as const } : report
      )
    );
    toast({
      title: "Report Generation Started",
      description: "Report is being generated. You will be notified when complete.",
    });
    
    // Simulate report completion
    setTimeout(() => {
      setReports(prev => 
        prev.map(report => 
          report.id === id ? { ...report, status: 'completed' as const } : report
        )
      );
      toast({
        title: "Report Generated",
        description: "Report has been generated successfully",
      });
    }, 3000);
  };

  const handleDownloadReport = (id: string) => {
    toast({
      title: "Download Started",
      description: "Report download has been initiated",
    });
  };

  const handleDeleteReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
    toast({
      title: "Report Deleted",
      description: "Report has been deleted successfully",
    });
  };

  const handleCreateReport = () => {
    toast({
      title: "Report Created",
      description: "New report has been created successfully",
    });
    setNewReportDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'analytics': return 'bg-purple-100 text-purple-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate, manage, and analyze comprehensive system reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadReports} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewReportDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportData.slice(0, 4).map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              {getTrendIcon(metric.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.metric === 'Revenue' ? `$${metric.currentValue.toLocaleString()}` : 
                 metric.metric === 'System Uptime' ? `${metric.currentValue}%` :
                 metric.currentValue.toLocaleString()}
              </div>
              <p className={`text-xs flex items-center space-x-1 ${
                metric.trend === 'up' ? 'text-green-600' : 
                metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {getTrendIcon(metric.trend)}
                <span>{metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%</span>
                <span>from last period</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>
                    View and manage all generated reports
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {report.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(report.lastGenerated).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(report.nextRun).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.format.toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {report.status === 'completed' && (
                            <Button size="sm" variant="outline" onClick={() => handleDownloadReport(report.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {report.status === 'scheduled' && (
                            <Button size="sm" variant="outline" onClick={() => handleGenerateReport(report.id)}>
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDeleteReport(report.id)}>
                            <Trash2 className="h-4 w-4" />
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

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Pre-configured report templates for quick generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Category:</span>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Usage:</span>
                          <span className="text-sm font-medium">{template.usageCount} times</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Last Used:</span>
                          <span className="text-sm">{new Date(template.lastUsed).toLocaleDateString()}</span>
                        </div>
                        <Button className="w-full mt-4" onClick={() => handleCreateReport()}>
                          <Plus className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Analytics</CardTitle>
              <CardDescription>
                Insights and trends from report generation and usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Report Generation Trends */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Report Generation Trends</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">This Month</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={75} className="w-24" />
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Month</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={60} className="w-24" />
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Success Rate</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={92} className="w-24" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popular Report Types */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Popular Report Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Performance Reports</span>
                      <Badge className="bg-blue-100 text-blue-800">45%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Analytics Reports</span>
                      <Badge className="bg-purple-100 text-purple-800">32%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Security Reports</span>
                      <Badge className="bg-red-100 text-red-800">18%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Financial Reports</span>
                      <Badge className="bg-green-100 text-green-800">5%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
