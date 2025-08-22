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
  Clock as ClockIcon2, Calendar as CalendarIcon, Bell as BellIcon, Zap as ZapIcon
} from 'lucide-react';

// Enhanced data models
interface ScheduledReport {
  id: string;
  name: string;
  description: string;
  reportType: string;
  schedule: string;
  status: 'active' | 'paused' | 'disabled' | 'error';
  lastRun: string;
  nextRun: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  format: 'pdf' | 'csv' | 'excel' | 'json' | 'html';
  recipients: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  timezone: string;
  retryCount: number;
  maxRetries: number;
  isRecurring: boolean;
  endDate?: string;
  parameters: Record<string, any>;
}

interface ScheduledReportExecution {
  id: string;
  reportId: string;
  reportName: string;
  status: 'scheduled' | 'running' | 'completed' | 'failed' | 'cancelled';
  scheduledAt: string;
  startedAt?: string;
  completedAt?: string;
  duration?: number;
  fileSize?: string;
  errorMessage?: string;
  retryAttempt: number;
  triggeredBy: 'schedule' | 'manual' | 'api';
}

interface ScheduleTemplate {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
  cronExpression: string;
  timezone: string;
  isPublic: boolean;
  createdBy: string;
  usageCount: number;
  tags: string[];
}

// Mock API functions
const mockAPI = {
  getScheduledReports: (): Promise<ScheduledReport[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Daily Executive Summary',
        description: 'Daily executive summary with key business metrics',
        reportType: 'executive_dashboard',
        schedule: '0 8 * * *',
        status: 'active',
        lastRun: new Date(Date.now() - 86400000).toISOString(),
        nextRun: new Date(Date.now() + 3600000).toISOString(),
        frequency: 'daily',
        format: 'pdf',
        recipients: ['ceo@transbot.ai', 'cfo@transbot.ai'],
        createdBy: 'admin@transbot.ai',
        createdAt: new Date(Date.now() - 2592000000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        timezone: 'America/New_York',
        retryCount: 0,
        maxRetries: 3,
        isRecurring: true,
        parameters: { includeKPIs: true, includeTrends: true }
      },
      {
        id: '2',
        name: 'Weekly Performance Report',
        description: 'Weekly performance metrics and analysis',
        reportType: 'performance_metrics',
        schedule: '0 9 * * 1',
        status: 'active',
        lastRun: new Date(Date.now() - 604800000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        frequency: 'weekly',
        format: 'excel',
        recipients: ['management@transbot.ai'],
        createdBy: 'analytics@transbot.ai',
        createdAt: new Date(Date.now() - 5184000000).toISOString(),
        updatedAt: new Date(Date.now() - 604800000).toISOString(),
        timezone: 'America/New_York',
        retryCount: 1,
        maxRetries: 3,
        isRecurring: true,
        parameters: { includeBreakdown: true, includeComparisons: true }
      },
      {
        id: '3',
        name: 'Monthly Financial Report',
        description: 'Monthly financial performance and compliance report',
        reportType: 'financial_report',
        schedule: '0 10 1 * *',
        status: 'paused',
        lastRun: new Date(Date.now() - 2592000000).toISOString(),
        nextRun: new Date(Date.now() + 2592000000).toISOString(),
        frequency: 'monthly',
        format: 'pdf',
        recipients: ['finance@transbot.ai', 'board@transbot.ai'],
        createdBy: 'finance@transbot.ai',
        createdAt: new Date(Date.now() - 7776000000).toISOString(),
        updatedAt: new Date(Date.now() - 2592000000).toISOString(),
        timezone: 'America/New_York',
        retryCount: 0,
        maxRetries: 3,
        isRecurring: true,
        parameters: { includeCompliance: true, includeProjections: true }
      },
      {
        id: '4',
        name: 'Quarterly Security Audit',
        description: 'Quarterly security audit and compliance report',
        reportType: 'security_audit',
        schedule: '0 11 1 */3 *',
        status: 'error',
        lastRun: new Date(Date.now() - 7776000000).toISOString(),
        nextRun: new Date(Date.now() + 7776000000).toISOString(),
        frequency: 'quarterly',
        format: 'html',
        recipients: ['security@transbot.ai', 'compliance@transbot.ai'],
        createdBy: 'security@transbot.ai',
        createdAt: new Date(Date.now() - 15552000000).toISOString(),
        updatedAt: new Date(Date.now() - 7776000000).toISOString(),
        timezone: 'America/New_York',
        retryCount: 3,
        maxRetries: 3,
        isRecurring: true,
        parameters: { includeVulnerabilities: true, includeRemediation: true }
      },
      {
        id: '5',
        name: 'Annual Business Review',
        description: 'Annual business review and strategic planning report',
        reportType: 'business_review',
        schedule: '0 12 1 1 *',
        status: 'active',
        lastRun: new Date(Date.now() - 31536000000).toISOString(),
        nextRun: new Date(Date.now() + 31536000000).toISOString(),
        frequency: 'yearly',
        format: 'pdf',
        recipients: ['ceo@transbot.ai', 'board@transbot.ai', 'management@transbot.ai'],
        createdBy: 'admin@transbot.ai',
        createdAt: new Date(Date.now() - 31536000000).toISOString(),
        updatedAt: new Date(Date.now() - 31536000000).toISOString(),
        timezone: 'America/New_York',
        retryCount: 0,
        maxRetries: 3,
        isRecurring: true,
        parameters: { includeStrategy: true, includeForecasting: true }
      }
    ]),

  getScheduledReportExecutions: (): Promise<ScheduledReportExecution[]> => 
    Promise.resolve([
      {
        id: '1',
        reportId: '1',
        reportName: 'Daily Executive Summary',
        status: 'completed',
        scheduledAt: new Date(Date.now() - 86400000).toISOString(),
        startedAt: new Date(Date.now() - 86400000 + 300000).toISOString(),
        completedAt: new Date(Date.now() - 86400000 + 1800000).toISOString(),
        duration: 1500000,
        fileSize: '2.1 MB',
        retryAttempt: 0,
        triggeredBy: 'schedule'
      },
      {
        id: '2',
        reportId: '2',
        reportName: 'Weekly Performance Report',
        status: 'completed',
        scheduledAt: new Date(Date.now() - 604800000).toISOString(),
        startedAt: new Date(Date.now() - 604800000 + 600000).toISOString(),
        completedAt: new Date(Date.now() - 604800000 + 2400000).toISOString(),
        duration: 1800000,
        fileSize: '3.5 MB',
        retryAttempt: 0,
        triggeredBy: 'schedule'
      },
      {
        id: '3',
        reportId: '4',
        reportName: 'Quarterly Security Audit',
        status: 'failed',
        scheduledAt: new Date(Date.now() - 7776000000).toISOString(),
        startedAt: new Date(Date.now() - 7776000000 + 900000).toISOString(),
        errorMessage: 'Data source connection timeout',
        retryAttempt: 3,
        triggeredBy: 'schedule'
      },
      {
        id: '4',
        reportId: '1',
        reportName: 'Daily Executive Summary',
        status: 'running',
        scheduledAt: new Date(Date.now() - 3600000).toISOString(),
        startedAt: new Date(Date.now() - 1800000).toISOString(),
        retryAttempt: 0,
        triggeredBy: 'manual'
      }
    ]),

  getScheduleTemplates: (): Promise<ScheduleTemplate[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Daily Morning Report',
        description: 'Template for daily morning reports at 8 AM',
        frequency: 'daily',
        cronExpression: '0 8 * * *',
        timezone: 'America/New_York',
        isPublic: true,
        createdBy: 'admin@transbot.ai',
        usageCount: 45,
        tags: ['daily', 'morning', 'template']
      },
      {
        id: '2',
        name: 'Weekly Monday Report',
        description: 'Template for weekly reports every Monday at 9 AM',
        frequency: 'weekly',
        cronExpression: '0 9 * * 1',
        timezone: 'America/New_York',
        isPublic: true,
        createdBy: 'analytics@transbot.ai',
        usageCount: 23,
        tags: ['weekly', 'monday', 'template']
      },
      {
        id: '3',
        name: 'Monthly First Day Report',
        description: 'Template for monthly reports on the first day of each month',
        frequency: 'monthly',
        cronExpression: '0 10 1 * *',
        timezone: 'America/New_York',
        isPublic: false,
        createdBy: 'finance@transbot.ai',
        usageCount: 12,
        tags: ['monthly', 'finance', 'template']
      }
    ])
};

const ReportSchedulerPage = () => {
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([]);
  const [executions, setExecutions] = useState<ScheduledReportExecution[]>([]);
  const [templates, setTemplates] = useState<ScheduleTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFrequency, setFilterFrequency] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newScheduleDialog, setNewScheduleDialog] = useState(false);
  const [newTemplateDialog, setNewTemplateDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSchedulerData();
  }, []);

  const loadSchedulerData = async () => {
    try {
      setLoading(true);
      const [reportsData, executionsData, templatesData] = await Promise.all([
        mockAPI.getScheduledReports(),
        mockAPI.getScheduledReportExecutions(),
        mockAPI.getScheduleTemplates()
      ]);
      setScheduledReports(reportsData);
      setExecutions(executionsData);
      setTemplates(templatesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load scheduler data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      case 'disabled': return 'text-gray-600 bg-gray-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getExecutionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'running': return 'text-blue-600 bg-blue-50';
      case 'scheduled': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'cancelled': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'text-blue-600 bg-blue-50';
      case 'weekly': return 'text-green-600 bg-green-50';
      case 'monthly': return 'text-purple-600 bg-purple-50';
      case 'quarterly': return 'text-orange-600 bg-orange-50';
      case 'yearly': return 'text-red-600 bg-red-50';
      case 'custom': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDuration = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const filteredReports = scheduledReports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesFrequency = filterFrequency === 'all' || report.frequency === filterFrequency;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesFrequency && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading scheduler data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Report Scheduler</h1>
          <p className="text-muted-foreground">
            Schedule and manage automated report generation
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadSchedulerData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewScheduleDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Schedule
          </Button>
          <Button onClick={() => setNewTemplateDialog(true)} variant="secondary">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      {/* Scheduler and Analytics */}
      <Tabs defaultValue="schedules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedules">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="executions">Execution History</TabsTrigger>
          <TabsTrigger value="templates">Schedule Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="schedules" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="status">Status:</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="frequency">Frequency:</Label>
                  <Select value={filterFrequency} onValueChange={setFilterFrequency}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Frequencies</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search schedules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>
                Manage your automated report schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Recipients</TableHead>
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
                          <div className="text-xs text-muted-foreground mt-1">
                            Created by {report.createdBy}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getFrequencyColor(report.frequency)}>
                          {report.frequency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(report.lastRun).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(report.nextRun).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="uppercase">
                          {report.format}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {report.recipients.length} recipient{report.recipients.length !== 1 ? 's' : ''}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="executions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Execution History</CardTitle>
              <CardDescription>
                Track the execution history of scheduled reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scheduled At</TableHead>
                    <TableHead>Started At</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Triggered By</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {executions.map(execution => (
                    <TableRow key={execution.id}>
                      <TableCell>
                        <div className="font-medium">{execution.reportName}</div>
                        {execution.errorMessage && (
                          <div className="text-sm text-red-600 mt-1">
                            {execution.errorMessage}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={getExecutionStatusColor(execution.status)}>
                          {execution.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(execution.scheduledAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {execution.startedAt ? new Date(execution.startedAt).toLocaleString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {execution.duration ? formatDuration(execution.duration) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {execution.fileSize || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {execution.triggeredBy}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {execution.status === 'completed' && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
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

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Templates</CardTitle>
              <CardDescription>
                Pre-configured schedule templates for common reporting patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(template => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge className={getFrequencyColor(template.frequency)}>
                          {template.frequency}
                        </Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div>Cron: <code className="text-xs bg-gray-100 px-1 rounded">{template.cronExpression}</code></div>
                          <div>Timezone: {template.timezone}</div>
                          <div>Usage Count: {template.usageCount}</div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          By {template.createdBy}
                        </div>
                        <Button size="sm" className="w-full">
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Schedule success rate chart will be implemented here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Execution Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Execution timeline chart will be implemented here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Schedule Dialog */}
      <Dialog open={newScheduleDialog} onOpenChange={setNewScheduleDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Schedule</DialogTitle>
            <DialogDescription>
              Configure a new automated report schedule
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Schedule Name</Label>
              <Input
                id="name"
                placeholder="Enter schedule name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter schedule description"
              />
            </div>
            <div>
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="executive_dashboard">Executive Dashboard</SelectItem>
                  <SelectItem value="performance_metrics">Performance Metrics</SelectItem>
                  <SelectItem value="financial_report">Financial Report</SelectItem>
                  <SelectItem value="security_audit">Security Audit</SelectItem>
                  <SelectItem value="business_review">Business Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Output Format</Label>
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
            <div className="flex items-center space-x-2">
              <Switch id="recurring" />
              <Label htmlFor="recurring">Recurring schedule</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewScheduleDialog(false)}>
              Cancel
            </Button>
            <Button>
              Create Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Template Dialog */}
      <Dialog open={newTemplateDialog} onOpenChange={setNewTemplateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Schedule Template</DialogTitle>
            <DialogDescription>
              Save current schedule configuration as a template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                placeholder="Enter template name"
              />
            </div>
            <div>
              <Label htmlFor="template-description">Description</Label>
              <Textarea
                id="template-description"
                placeholder="Enter template description"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="public-template" />
              <Label htmlFor="public-template">Make template public</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTemplateDialog(false)}>
              Cancel
            </Button>
            <Button>
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportSchedulerPage;
