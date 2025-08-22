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
  Download as DownloadIcon, Upload as UploadIcon, Database as DatabaseIcon2, FileText as FileTextIcon
} from 'lucide-react';

// Enhanced data models
interface DataExport {
  id: string;
  name: string;
  description: string;
  dataSource: string;
  format: 'csv' | 'excel' | 'json' | 'xml' | 'pdf';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  size: string;
  recordCount: number;
  createdAt: string;
  completedAt?: string;
  expiresAt: string;
  requestedBy: string;
  filters: Record<string, any>;
  columns: string[];
  isScheduled: boolean;
  schedule?: string;
  recipients: string[];
}

interface DataExportTemplate {
  id: string;
  name: string;
  description: string;
  dataSource: string;
  format: 'csv' | 'excel' | 'json' | 'xml' | 'pdf';
  columns: string[];
  filters: Record<string, any>;
  isPublic: boolean;
  createdBy: string;
  usageCount: number;
  lastUsed: string;
  tags: string[];
}

interface DataSource {
  id: string;
  name: string;
  description: string;
  type: 'database' | 'api' | 'file' | 'stream';
  status: 'active' | 'inactive' | 'maintenance';
  recordCount: number;
  lastUpdated: string;
  schema: Record<string, any>;
  accessLevel: 'public' | 'private' | 'restricted';
}

// Mock API functions
const mockAPI = {
  getDataExports: (): Promise<DataExport[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'User Analytics Export',
        description: 'Complete user analytics data for Q4 2024',
        dataSource: 'user_analytics',
        format: 'csv',
        status: 'completed',
        progress: 100,
        size: '45.2 MB',
        recordCount: 125000,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        completedAt: new Date(Date.now() - 1800000).toISOString(),
        expiresAt: new Date(Date.now() + 604800000).toISOString(),
        requestedBy: 'analytics@transbot.ai',
        filters: { dateRange: 'last_quarter', includeInactive: false },
        columns: ['user_id', 'email', 'signup_date', 'last_login', 'total_sessions'],
        isScheduled: false,
        recipients: ['analytics@transbot.ai']
      },
      {
        id: '2',
        name: 'Financial Transactions Export',
        description: 'Monthly financial transactions for compliance',
        dataSource: 'financial_transactions',
        format: 'excel',
        status: 'processing',
        progress: 65,
        size: '0 MB',
        recordCount: 0,
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        expiresAt: new Date(Date.now() + 2592000000).toISOString(),
        requestedBy: 'finance@transbot.ai',
        filters: { month: 'december_2024', includeReversals: true },
        columns: ['transaction_id', 'amount', 'currency', 'status', 'created_at'],
        isScheduled: false,
        recipients: ['finance@transbot.ai', 'compliance@transbot.ai']
      },
      {
        id: '3',
        name: 'System Logs Export',
        description: 'System logs for security audit',
        dataSource: 'system_logs',
        format: 'json',
        status: 'pending',
        progress: 0,
        size: '0 MB',
        recordCount: 0,
        createdAt: new Date(Date.now() - 900000).toISOString(),
        expiresAt: new Date(Date.now() + 604800000).toISOString(),
        requestedBy: 'security@transbot.ai',
        filters: { dateRange: 'last_30_days', logLevel: 'error,warning' },
        columns: ['timestamp', 'level', 'message', 'source', 'user_id'],
        isScheduled: false,
        recipients: ['security@transbot.ai']
      },
      {
        id: '4',
        name: 'Customer Feedback Export',
        description: 'Customer feedback and survey responses',
        dataSource: 'customer_feedback',
        format: 'csv',
        status: 'failed',
        progress: 0,
        size: '0 MB',
        recordCount: 0,
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        expiresAt: new Date(Date.now() + 604800000).toISOString(),
        requestedBy: 'product@transbot.ai',
        filters: { surveyType: 'satisfaction', dateRange: 'last_month' },
        columns: ['feedback_id', 'rating', 'comment', 'category', 'created_at'],
        isScheduled: false,
        recipients: ['product@transbot.ai']
      },
      {
        id: '5',
        name: 'Weekly Performance Metrics',
        description: 'Automated weekly performance metrics export',
        dataSource: 'performance_metrics',
        format: 'excel',
        status: 'completed',
        progress: 100,
        size: '12.8 MB',
        recordCount: 8500,
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        completedAt: new Date(Date.now() - 604800000).toISOString(),
        expiresAt: new Date(Date.now() + 2592000000).toISOString(),
        requestedBy: 'system@transbot.ai',
        filters: { week: 'last_week', includeTrends: true },
        columns: ['metric_name', 'value', 'timestamp', 'trend'],
        isScheduled: true,
        schedule: '0 8 * * 1',
        recipients: ['management@transbot.ai']
      }
    ]),

  getDataExportTemplates: (): Promise<DataExportTemplate[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'User Analytics Template',
        description: 'Standard template for user analytics data export',
        dataSource: 'user_analytics',
        format: 'csv',
        columns: ['user_id', 'email', 'signup_date', 'last_login', 'total_sessions'],
        filters: { dateRange: 'last_month', includeInactive: false },
        isPublic: true,
        createdBy: 'analytics@transbot.ai',
        usageCount: 156,
        lastUsed: new Date(Date.now() - 86400000).toISOString(),
        tags: ['user', 'analytics', 'template']
      },
      {
        id: '2',
        name: 'Financial Report Template',
        description: 'Template for financial data exports',
        dataSource: 'financial_transactions',
        format: 'excel',
        columns: ['transaction_id', 'amount', 'currency', 'status', 'created_at'],
        filters: { month: 'current_month', includeReversals: false },
        isPublic: false,
        createdBy: 'finance@transbot.ai',
        usageCount: 89,
        lastUsed: new Date(Date.now() - 172800000).toISOString(),
        tags: ['financial', 'transactions', 'template']
      },
      {
        id: '3',
        name: 'System Logs Template',
        description: 'Template for system logs export',
        dataSource: 'system_logs',
        format: 'json',
        columns: ['timestamp', 'level', 'message', 'source', 'user_id'],
        filters: { dateRange: 'last_7_days', logLevel: 'error' },
        isPublic: true,
        createdBy: 'devops@transbot.ai',
        usageCount: 234,
        lastUsed: new Date(Date.now() - 3600000).toISOString(),
        tags: ['system', 'logs', 'template']
      }
    ]),

  getDataSources: (): Promise<DataSource[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'User Analytics',
        description: 'User behavior and analytics data',
        type: 'database',
        status: 'active',
        recordCount: 1250000,
        lastUpdated: new Date().toISOString(),
        schema: {
          user_id: 'string',
          email: 'string',
          signup_date: 'datetime',
          last_login: 'datetime',
          total_sessions: 'integer'
        },
        accessLevel: 'restricted'
      },
      {
        id: '2',
        name: 'Financial Transactions',
        description: 'Financial transaction data',
        type: 'database',
        status: 'active',
        recordCount: 890000,
        lastUpdated: new Date().toISOString(),
        schema: {
          transaction_id: 'string',
          amount: 'decimal',
          currency: 'string',
          status: 'string',
          created_at: 'datetime'
        },
        accessLevel: 'private'
      },
      {
        id: '3',
        name: 'System Logs',
        description: 'System and application logs',
        type: 'stream',
        status: 'active',
        recordCount: 5000000,
        lastUpdated: new Date().toISOString(),
        schema: {
          timestamp: 'datetime',
          level: 'string',
          message: 'text',
          source: 'string',
          user_id: 'string'
        },
        accessLevel: 'restricted'
      }
    ])
};

const DataExportPage = () => {
  const [exports, setExports] = useState<DataExport[]>([]);
  const [templates, setTemplates] = useState<DataExportTemplate[]>([]);
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newExportDialog, setNewExportDialog] = useState(false);
  const [newTemplateDialog, setNewTemplateDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadDataExportData();
  }, []);

  const loadDataExportData = async () => {
    try {
      setLoading(true);
      const [exportsData, templatesData, dataSourcesData] = await Promise.all([
        mockAPI.getDataExports(),
        mockAPI.getDataExportTemplates(),
        mockAPI.getDataSources()
      ]);
      setExports(exportsData);
      setTemplates(templatesData);
      setDataSources(dataSourcesData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data export information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'cancelled': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDataSourceStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'maintenance': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'text-green-600 bg-green-50';
      case 'private': return 'text-red-600 bg-red-50';
      case 'restricted': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatFileSize = (size: string) => {
    if (size === '0 MB') return 'Processing...';
    return size;
  };

  const filteredExports = exports.filter(exportItem => {
    const matchesStatus = filterStatus === 'all' || exportItem.status === filterStatus;
    const matchesFormat = filterFormat === 'all' || exportItem.format === filterFormat;
    const matchesSearch = exportItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exportItem.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesFormat && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading data exports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Export</h1>
          <p className="text-muted-foreground">
            Export and manage data from various sources and formats
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadDataExportData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewExportDialog(true)}>
            <DownloadIcon className="h-4 w-4 mr-2" />
            New Export
          </Button>
          <Button onClick={() => setNewTemplateDialog(true)} variant="secondary">
            <FileTextIcon className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </div>
      </div>

      {/* Data Export and Analytics */}
      <Tabs defaultValue="exports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="exports">Data Exports</TabsTrigger>
          <TabsTrigger value="templates">Export Templates</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="exports" className="space-y-4">
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="format">Format:</Label>
                  <Select value={filterFormat} onValueChange={setFilterFormat}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Formats</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search exports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Data Exports</CardTitle>
              <CardDescription>
                Manage and track your data export requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Data Source</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExports.map(exportItem => (
                    <TableRow key={exportItem.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{exportItem.name}</div>
                          <div className="text-sm text-muted-foreground">{exportItem.description}</div>
                          {exportItem.isScheduled && (
                            <Badge variant="outline" className="text-xs mt-1">
                              Scheduled
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{exportItem.dataSource}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="uppercase">
                          {exportItem.format}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(exportItem.status)}>
                          {exportItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Progress value={exportItem.progress} className="w-16 h-2" />
                          <span className="text-sm">{exportItem.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatFileSize(exportItem.size)}</TableCell>
                      <TableCell>{exportItem.recordCount.toLocaleString()}</TableCell>
                      <TableCell>
                        {new Date(exportItem.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {exportItem.status === 'completed' && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                          {exportItem.status === 'processing' && (
                            <Button size="sm" variant="outline">
                              <Pause className="h-4 w-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
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

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Templates</CardTitle>
              <CardDescription>
                Pre-configured templates for common data exports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(template => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <Badge variant="secondary" className="uppercase">
                          {template.format}
                        </Badge>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div>Data Source: {template.dataSource}</div>
                          <div>Usage Count: {template.usageCount}</div>
                          <div>Last Used: {new Date(template.lastUsed).toLocaleDateString()}</div>
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
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            Use Template
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
              <CardDescription>
                Available data sources for export
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataSources.map(source => (
                  <Card key={source.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                        <Badge className={getDataSourceStatusColor(source.status)}>
                          {source.status}
                        </Badge>
                      </div>
                      <CardDescription>{source.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div>Type: {source.type}</div>
                          <div>Records: {source.recordCount.toLocaleString()}</div>
                          <div>Last Updated: {new Date(source.lastUpdated).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <Badge className={getAccessLevelColor(source.accessLevel)}>
                            {source.accessLevel}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Schema: {Object.keys(source.schema).length} fields
                        </div>
                        <Button size="sm" className="w-full">
                          Export Data
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
                <CardTitle>Export Volume Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Export volume trends chart will be implemented here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Format Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Format distribution chart will be implemented here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Export Dialog */}
      <Dialog open={newExportDialog} onOpenChange={setNewExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Data Export</DialogTitle>
            <DialogDescription>
              Configure a new data export request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Export Name</Label>
              <Input
                id="name"
                placeholder="Enter export name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter export description"
              />
            </div>
            <div>
              <Label htmlFor="data-source">Data Source</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data source" />
                </SelectTrigger>
                <SelectContent>
                  {dataSources.map(source => (
                    <SelectItem key={source.id} value={source.id}>
                      {source.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="format">Export Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="scheduled" />
              <Label htmlFor="scheduled">Schedule export</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewExportDialog(false)}>
              Cancel
            </Button>
            <Button>
              Create Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Template Dialog */}
      <Dialog open={newTemplateDialog} onOpenChange={setNewTemplateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Export Template</DialogTitle>
            <DialogDescription>
              Save current export configuration as a template
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

export default DataExportPage;
