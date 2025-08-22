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
  Code as CodeIcon, Palette, Layers, Zap as ZapIcon
} from 'lucide-react';

// Enhanced data models
interface CustomReport {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'draft' | 'active' | 'archived' | 'scheduled';
  lastGenerated: string;
  nextRun?: string;
  format: 'pdf' | 'csv' | 'excel' | 'json' | 'html';
  recipients: string[];
  size: string;
  schedule?: string;
  parameters: Record<string, any>;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  version: string;
  isPublic: boolean;
  tags: string[];
}

interface CustomReportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  parameters: Record<string, any>;
  createdBy: string;
  downloads: number;
  rating: number;
  isOfficial: boolean;
  tags: string[];
}

interface CustomReportBuilder {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'building' | 'testing' | 'published';
  dataSources: string[];
  visualizations: string[];
  filters: Record<string, any>;
  createdBy: string;
  lastModified: string;
  version: string;
}

// Mock API functions
const mockAPI = {
  getCustomReports: (): Promise<CustomReport[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Executive Dashboard Summary',
        description: 'Custom executive dashboard with key business metrics',
        category: 'Executive',
        status: 'active',
        lastGenerated: new Date(Date.now() - 86400000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'pdf',
        recipients: ['ceo@transbot.ai', 'cfo@transbot.ai'],
        size: '2.8 MB',
        schedule: '0 8 * * 1',
        parameters: { includeKPIs: true, includeTrends: true, includeProjections: true },
        createdBy: 'admin@transbot.ai',
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        version: '1.2.0',
        isPublic: false,
        tags: ['executive', 'dashboard', 'kpi']
      },
      {
        id: '2',
        name: 'Customer Journey Analysis',
        description: 'Custom analysis of customer journey and touchpoints',
        category: 'Customer Analytics',
        status: 'active',
        lastGenerated: new Date(Date.now() - 172800000).toISOString(),
        nextRun: new Date(Date.now() + 604800000).toISOString(),
        format: 'html',
        recipients: ['marketing@transbot.ai', 'product@transbot.ai'],
        size: '4.1 MB',
        schedule: '0 9 * * 1',
        parameters: { includeTouchpoints: true, includeConversion: true, includeSegments: true },
        createdBy: 'analytics@transbot.ai',
        createdAt: new Date(Date.now() - 1209600000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        version: '2.1.0',
        isPublic: true,
        tags: ['customer', 'journey', 'analytics']
      },
      {
        id: '3',
        name: 'Revenue Forecasting Model',
        description: 'Custom revenue forecasting with machine learning insights',
        category: 'Financial',
        status: 'scheduled',
        lastGenerated: new Date(Date.now() - 2592000000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'excel',
        recipients: ['finance@transbot.ai'],
        size: '3.5 MB',
        schedule: '0 7 1 * *',
        parameters: { includeML: true, includeScenarios: true, includeConfidence: true },
        createdBy: 'data-science@transbot.ai',
        createdAt: new Date(Date.now() - 2592000000).toISOString(),
        updatedAt: new Date(Date.now() - 2592000000).toISOString(),
        version: '1.0.0',
        isPublic: false,
        tags: ['revenue', 'forecasting', 'ml']
      },
      {
        id: '4',
        name: 'System Performance Deep Dive',
        description: 'Custom system performance analysis with detailed metrics',
        category: 'Technical',
        status: 'draft',
        lastGenerated: new Date(Date.now() - 604800000).toISOString(),
        format: 'csv',
        recipients: ['devops@transbot.ai'],
        size: '1.9 MB',
        parameters: { includeMetrics: true, includeLogs: true, includeAlerts: true },
        createdBy: 'devops@transbot.ai',
        createdAt: new Date(Date.now() - 604800000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        version: '0.9.0',
        isPublic: false,
        tags: ['system', 'performance', 'technical']
      },
      {
        id: '5',
        name: 'Competitive Analysis Report',
        description: 'Custom competitive analysis with market positioning',
        category: 'Market Research',
        status: 'archived',
        lastGenerated: new Date(Date.now() - 5184000000).toISOString(),
        format: 'pdf',
        recipients: ['strategy@transbot.ai'],
        size: '5.2 MB',
        parameters: { includeCompetitors: true, includeMarketShare: true, includeTrends: true },
        createdBy: 'strategy@transbot.ai',
        createdAt: new Date(Date.now() - 5184000000).toISOString(),
        updatedAt: new Date(Date.now() - 5184000000).toISOString(),
        version: '1.0.0',
        isPublic: false,
        tags: ['competitive', 'market', 'strategy']
      }
    ]),

  getCustomReportTemplates: (): Promise<CustomReportTemplate[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Executive Dashboard Template',
        description: 'Pre-built template for executive dashboards with key metrics',
        category: 'Executive',
        thumbnail: '/templates/executive-dashboard.png',
        parameters: { includeKPIs: true, includeTrends: true },
        createdBy: 'admin@transbot.ai',
        downloads: 156,
        rating: 4.8,
        isOfficial: true,
        tags: ['executive', 'dashboard', 'template']
      },
      {
        id: '2',
        name: 'Customer Analytics Template',
        description: 'Template for customer behavior and journey analysis',
        category: 'Customer Analytics',
        thumbnail: '/templates/customer-analytics.png',
        parameters: { includeSegments: true, includeJourney: true },
        createdBy: 'analytics@transbot.ai',
        downloads: 89,
        rating: 4.6,
        isOfficial: true,
        tags: ['customer', 'analytics', 'template']
      },
      {
        id: '3',
        name: 'Financial Performance Template',
        description: 'Template for financial performance and forecasting',
        category: 'Financial',
        thumbnail: '/templates/financial-performance.png',
        parameters: { includeRevenue: true, includeExpenses: true },
        createdBy: 'finance@transbot.ai',
        downloads: 234,
        rating: 4.9,
        isOfficial: true,
        tags: ['financial', 'performance', 'template']
      }
    ]),

  getCustomReportBuilders: (): Promise<CustomReportBuilder[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Marketing Campaign Performance',
        description: 'Custom report builder for marketing campaign analysis',
        status: 'published',
        dataSources: ['Google Analytics', 'Facebook Ads', 'Email Marketing'],
        visualizations: ['Bar Chart', 'Line Chart', 'Pie Chart'],
        filters: { dateRange: 'last_30_days', campaign: 'all' },
        createdBy: 'marketing@transbot.ai',
        lastModified: new Date(Date.now() - 86400000).toISOString(),
        version: '1.0.0'
      },
      {
        id: '2',
        name: 'Product Usage Analytics',
        description: 'Custom report builder for product usage and feature adoption',
        status: 'testing',
        dataSources: ['Product Analytics', 'User Behavior', 'Feature Flags'],
        visualizations: ['Heatmap', 'Funnel Chart', 'Scatter Plot'],
        filters: { userSegment: 'all', feature: 'all' },
        createdBy: 'product@transbot.ai',
        lastModified: new Date(Date.now() - 172800000).toISOString(),
        version: '0.9.0'
      },
      {
        id: '3',
        name: 'Sales Pipeline Analysis',
        description: 'Custom report builder for sales pipeline and conversion tracking',
        status: 'building',
        dataSources: ['CRM', 'Sales Data', 'Lead Sources'],
        visualizations: ['Pipeline Chart', 'Conversion Funnel', 'Revenue Chart'],
        filters: { salesRep: 'all', stage: 'all' },
        createdBy: 'sales@transbot.ai',
        lastModified: new Date(Date.now() - 3600000).toISOString(),
        version: '0.5.0'
      }
    ])
};

const CustomReportsPage = () => {
  const [reports, setReports] = useState<CustomReport[]>([]);
  const [templates, setTemplates] = useState<CustomReportTemplate[]>([]);
  const [builders, setBuilders] = useState<CustomReportBuilder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newReportDialog, setNewReportDialog] = useState(false);
  const [newBuilderDialog, setNewBuilderDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCustomData();
  }, []);

  const loadCustomData = async () => {
    try {
      setLoading(true);
      const [reportsData, templatesData, buildersData] = await Promise.all([
        mockAPI.getCustomReports(),
        mockAPI.getCustomReportTemplates(),
        mockAPI.getCustomReportBuilders()
      ]);
      setReports(reportsData);
      setTemplates(templatesData);
      setBuilders(buildersData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load custom reports data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'scheduled': return 'text-blue-600 bg-blue-50';
      case 'draft': return 'text-yellow-600 bg-yellow-50';
      case 'archived': return 'text-gray-600 bg-gray-50';
      case 'published': return 'text-green-600 bg-green-50';
      case 'testing': return 'text-orange-600 bg-orange-50';
      case 'building': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getBuilderStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-50';
      case 'testing': return 'text-orange-600 bg-orange-50';
      case 'building': return 'text-blue-600 bg-blue-50';
      case 'draft': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading custom reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Custom Reports</h1>
          <p className="text-muted-foreground">
            Create, manage, and customize your own analytics reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadCustomData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewReportDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
          <Button onClick={() => setNewBuilderDialog(true)} variant="secondary">
            <CodeIcon className="h-4 w-4 mr-2" />
            Report Builder
          </Button>
        </div>
      </div>

      {/* Custom Reports and Analytics */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="builders">Report Builders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
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
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="category">Category:</Label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Executive">Executive</SelectItem>
                      <SelectItem value="Customer Analytics">Customer Analytics</SelectItem>
                      <SelectItem value="Financial">Financial</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Market Research">Market Research</SelectItem>
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
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>
                Manage your custom analytics reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Version</TableHead>
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
                          <div className="flex items-center space-x-2 mt-1">
                            {report.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(report.lastGenerated).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="uppercase">
                          {report.format}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.version}</Badge>
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

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
              <CardDescription>
                Pre-built templates to jumpstart your custom reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map(template => (
                  <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {template.isOfficial && (
                          <Badge variant="default" className="text-xs">
                            Official
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Downloads</span>
                          <span>{template.downloads}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Rating</span>
                          <div className="flex items-center space-x-1">
                            <span>{template.rating}</span>
                            <span className="text-yellow-500">★</span>
                          </div>
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
                        <Button className="w-full" size="sm">
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

        <TabsContent value="builders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Builders</CardTitle>
              <CardDescription>
                Visual report builders for creating custom analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {builders.map(builder => (
                  <Card key={builder.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{builder.name}</CardTitle>
                        <Badge className={getBuilderStatusColor(builder.status)}>
                          {builder.status}
                        </Badge>
                      </div>
                      <CardDescription>{builder.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-sm">Data Sources:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {builder.dataSources.map(source => (
                              <Badge key={source} variant="outline" className="text-xs">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Visualizations:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {builder.visualizations.map(viz => (
                              <Badge key={viz} variant="secondary" className="text-xs">
                                {viz}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm">
                          <div>Version: {builder.version}</div>
                          <div>By: {builder.createdBy}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last modified: {new Date(builder.lastModified).toLocaleDateString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1">
                            {builder.status === 'published' ? 'Open Builder' : 'Continue Building'}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Custom report usage analytics chart will be implemented here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Popularity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Template popularity chart will be implemented here
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
            <DialogTitle>Create New Custom Report</DialogTitle>
            <DialogDescription>
              Configure a new custom analytics report
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter report description"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Executive">Executive</SelectItem>
                  <SelectItem value="Customer Analytics">Customer Analytics</SelectItem>
                  <SelectItem value="Financial">Financial</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Market Research">Market Research</SelectItem>
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
            <div className="flex items-center space-x-2">
              <Switch id="public" />
              <Label htmlFor="public">Make report public</Label>
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

      {/* New Builder Dialog */}
      <Dialog open={newBuilderDialog} onOpenChange={setNewBuilderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Report Builder</DialogTitle>
            <DialogDescription>
              Start building a custom report with visual tools
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="builder-name">Builder Name</Label>
              <Input
                id="builder-name"
                placeholder="Enter builder name"
              />
            </div>
            <div>
              <Label htmlFor="builder-description">Description</Label>
              <Textarea
                id="builder-description"
                placeholder="Enter builder description"
              />
            </div>
            <div>
              <Label htmlFor="data-sources">Data Sources</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="crm">CRM</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewBuilderDialog(false)}>
              Cancel
            </Button>
            <Button>
              Start Building
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomReportsPage;
