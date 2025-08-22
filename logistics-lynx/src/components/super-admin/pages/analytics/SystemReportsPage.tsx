import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Icons
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Activity, Clock, Zap,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Shield, Key, Wifi, HardDrive, Cpu,
  WifiOff, AlertCircle, Info,
  Server, Cloud, GitPullRequest, GitCommit, GitMerge,
  Package, Docker, Kubernetes, Loader, Terminal, Workflow,
  Rocket, ShieldCheck, Monitor, ActivitySquare,
  Search, Table as TableIcon, Key as KeyIcon, Link,
  BarChart, Database, Network,
  ShieldX, ShieldAlert, ShieldCheck as ShieldCheckIcon,
  Target, Database as DatabaseIcon, Cpu as CpuIcon,
  HardDrive as HardDriveIcon, Wifi as WifiIcon, Clock as ClockIcon,
  AlertTriangle, CheckCircle, Minus, ArrowUpRight, ArrowDownRight,
  LayoutDashboard, Users, DollarSign, Package as PackageIcon,
  Truck, Calendar, FileText, Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon,
  Server as ServerIcon, Database as DatabaseIcon2, Cpu as CpuIcon2,
  HardDrive as HardDriveIcon2, Wifi as WifiIcon2, Clock as ClockIcon2
} from 'lucide-react';

// Enhanced data models
interface SystemReport {
  id: string;
  name: string;
  type: 'performance' | 'security' | 'infrastructure' | 'application' | 'database' | 'network';
  status: 'scheduled' | 'running' | 'completed' | 'failed';
  lastGenerated: string;
  nextRun: string;
  format: 'pdf' | 'csv' | 'excel' | 'json' | 'html';
  recipients: string[];
  size: string;
  description: string;
  schedule?: string;
  parameters?: Record<string, any>;
}

interface SystemMetric {
  id: string;
  name: string;
  category: 'cpu' | 'memory' | 'disk' | 'network' | 'database' | 'application';
  value: number;
  unit: string;
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
  timestamp: string;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  description: string;
}

interface SystemAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'performance' | 'security' | 'availability' | 'error';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  resolution?: string;
  system?: string;
  metric?: string;
}

// Mock API functions
const mockAPI = {
  getSystemReports: (): Promise<SystemReport[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Daily System Performance Report',
        type: 'performance',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 82800000).toISOString(),
        format: 'pdf',
        recipients: ['admin@transbot.ai', 'ops@transbot.ai'],
        size: '2.4 MB',
        description: 'Comprehensive daily system performance metrics',
        schedule: '0 6 * * *',
        parameters: { includeCharts: true, includeAlerts: true }
      },
      {
        id: '2',
        name: 'Weekly Security Audit Report',
        type: 'security',
        status: 'scheduled',
        lastGenerated: new Date(Date.now() - 604800000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'pdf',
        recipients: ['security@transbot.ai'],
        size: '1.8 MB',
        description: 'Weekly security audit and vulnerability assessment',
        schedule: '0 9 * * 1',
        parameters: { includeVulnerabilities: true, includeCompliance: true }
      },
      {
        id: '3',
        name: 'Infrastructure Health Report',
        type: 'infrastructure',
        status: 'running',
        lastGenerated: new Date(Date.now() - 1800000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString(),
        format: 'html',
        recipients: ['admin@transbot.ai'],
        size: '3.2 MB',
        description: 'Real-time infrastructure health and status',
        schedule: '*/30 * * * *',
        parameters: { includeMetrics: true, includeAlerts: true }
      },
      {
        id: '4',
        name: 'Database Performance Report',
        type: 'database',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 7200000).toISOString(),
        nextRun: new Date(Date.now() + 3600000).toISOString(),
        format: 'excel',
        recipients: ['dba@transbot.ai'],
        size: '4.1 MB',
        description: 'Database performance and optimization metrics',
        schedule: '0 */4 * * *',
        parameters: { includeQueries: true, includeIndexes: true }
      },
      {
        id: '5',
        name: 'Network Traffic Analysis',
        type: 'network',
        status: 'failed',
        lastGenerated: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString(),
        format: 'csv',
        recipients: ['network@transbot.ai'],
        size: '0 MB',
        description: 'Network traffic and bandwidth analysis',
        schedule: '0 */2 * * *',
        parameters: { includeTraffic: true, includeBandwidth: true }
      }
    ]),

  getSystemMetrics: (): Promise<SystemMetric[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'CPU Usage',
        category: 'cpu',
        value: 23.5,
        unit: '%',
        threshold: 80,
        status: 'normal',
        timestamp: new Date().toISOString(),
        trend: 'down',
        changePercent: -5.2,
        description: 'Average CPU utilization across all servers'
      },
      {
        id: '2',
        name: 'Memory Usage',
        category: 'memory',
        value: 67.8,
        unit: '%',
        threshold: 85,
        status: 'normal',
        timestamp: new Date().toISOString(),
        trend: 'up',
        changePercent: 2.1,
        description: 'Average memory utilization across all servers'
      },
      {
        id: '3',
        name: 'Disk Usage',
        category: 'disk',
        value: 45.2,
        unit: '%',
        threshold: 90,
        status: 'normal',
        timestamp: new Date().toISOString(),
        trend: 'stable',
        changePercent: 0.5,
        description: 'Average disk utilization across all servers'
      },
      {
        id: '4',
        name: 'Network Latency',
        category: 'network',
        value: 145,
        unit: 'ms',
        threshold: 500,
        status: 'normal',
        timestamp: new Date().toISOString(),
        trend: 'down',
        changePercent: -12.3,
        description: 'Average network latency to external services'
      },
      {
        id: '5',
        name: 'Database Connections',
        category: 'database',
        value: 1247,
        unit: '',
        threshold: 2000,
        status: 'normal',
        timestamp: new Date().toISOString(),
        trend: 'up',
        changePercent: 8.7,
        description: 'Active database connections'
      },
      {
        id: '6',
        name: 'API Response Time',
        category: 'application',
        value: 234,
        unit: 'ms',
        threshold: 1000,
        status: 'normal',
        timestamp: new Date().toISOString(),
        trend: 'up',
        changePercent: 15.2,
        description: 'Average API response time'
      }
    ]),

  getSystemAlerts: (): Promise<SystemAlert[]> => 
    Promise.resolve([
      {
        id: '1',
        title: 'High Memory Usage Detected',
        description: 'Memory usage has exceeded 80% on server-01',
        severity: 'medium',
        category: 'performance',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'acknowledged',
        assignedTo: 'ops@transbot.ai',
        system: 'server-01',
        metric: 'memory_usage'
      },
      {
        id: '2',
        title: 'Database Connection Pool Exhausted',
        description: 'Database connection pool is at 95% capacity',
        severity: 'high',
        category: 'availability',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        status: 'active',
        system: 'database-01',
        metric: 'db_connections'
      },
      {
        id: '3',
        title: 'SSL Certificate Expiring Soon',
        description: 'SSL certificate will expire in 7 days',
        severity: 'medium',
        category: 'security',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'active',
        system: 'load-balancer-01',
        metric: 'ssl_certificate'
      }
    ])
};

const SystemReportsPage = () => {
  const [reports, setReports] = useState<SystemReport[]>([]);
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newReportDialog, setNewReportDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<SystemReport | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSystemData();
  }, []);

  const loadSystemData = async () => {
    try {
      setLoading(true);
      const [reportsData, metricsData, alertsData] = await Promise.all([
        mockAPI.getSystemReports(),
        mockAPI.getSystemMetrics(),
        mockAPI.getSystemAlerts()
      ]);
      setReports(reportsData);
      setMetrics(metricsData);
      setAlerts(alertsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load system data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'scheduled': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDownIcon className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const generateReport = async (reportId: string) => {
    try {
      toast({
        title: "Generating Report",
        description: "Report generation started..."
      });
      
      // Simulate report generation
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Report generated successfully"
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading system reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive system reports and infrastructure analytics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadSystemData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewReportDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <Card key={metric.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{metric.name}</CardTitle>
                <Badge variant={metric.status === 'critical' ? 'destructive' : metric.status === 'warning' ? 'secondary' : 'default'}>
                  {metric.status}
                </Badge>
              </div>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {metric.value}{metric.unit}
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 
                      metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.changePercent > 0 ? '+' : ''}{metric.changePercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Threshold</span>
                    <span>{metric.threshold}{metric.unit}</span>
                  </div>
                  <Progress value={(metric.value / metric.threshold) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports and Alerts */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">System Reports</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="type">Type:</Label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="network">Network</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="status">Status:</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>System Reports</CardTitle>
              <CardDescription>
                Manage and generate system reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
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
                  {filteredReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{report.name}</div>
                          <div className="text-sm text-muted-foreground">{report.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(report.lastGenerated).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(report.nextRun).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="uppercase">
                          {report.format}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => generateReport(report.id)}
                            disabled={report.status === 'running'}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
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

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Active system alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <div>
                          <div className="font-medium">{alert.title}</div>
                          <div className="text-sm text-muted-foreground">{alert.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(alert.timestamp).toLocaleString()} • {alert.system}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <Badge variant={alert.status === 'active' ? 'destructive' : 'secondary'}>
                        {alert.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                    <p>No active alerts</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Generation Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Report generation trends chart will be implemented here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  System health overview chart will be implemented here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Report Dialog */}
      <Dialog open={newReportDialog} onOpenChange={setNewReportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New System Report</DialogTitle>
            <DialogDescription>
              Configure a new automated system report
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Report Name</Label>
              <Input
                id="name"
                placeholder="Enter report name"
              />
            </div>
            <div>
              <Label htmlFor="type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewReportDialog(false)}>
              Cancel
            </Button>
            <Button>
              Create Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SystemReportsPage;
