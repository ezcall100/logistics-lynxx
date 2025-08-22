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
  UserPlus, UserCheck, UserX, UserCog, UserMinus, UserEdit
} from 'lucide-react';

// Enhanced data models
interface UserReport {
  id: string;
  name: string;
  type: 'activity' | 'engagement' | 'growth' | 'retention' | 'behavior' | 'demographics';
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

interface UserMetric {
  id: string;
  name: string;
  category: 'growth' | 'engagement' | 'retention' | 'activity' | 'demographics';
  value: number;
  unit: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  timestamp: string;
  description: string;
  target?: number;
}

interface UserActivity {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  action: string;
  category: 'login' | 'feature_usage' | 'data_access' | 'settings' | 'admin';
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  sessionDuration?: number;
  success: boolean;
  details?: Record<string, any>;
}

interface UserSegment {
  id: string;
  name: string;
  description: string;
  criteria: Record<string, any>;
  userCount: number;
  lastUpdated: string;
  isActive: boolean;
  tags: string[];
}

// Mock API functions
const mockAPI = {
  getUserReports: (): Promise<UserReport[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Daily User Activity Report',
        type: 'activity',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 82800000).toISOString(),
        format: 'pdf',
        recipients: ['admin@transbot.ai', 'product@transbot.ai'],
        size: '1.8 MB',
        description: 'Daily user activity and engagement metrics',
        schedule: '0 6 * * *',
        parameters: { includeSessions: true, includeFeatures: true }
      },
      {
        id: '2',
        name: 'Weekly User Growth Report',
        type: 'growth',
        status: 'scheduled',
        lastGenerated: new Date(Date.now() - 604800000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'excel',
        recipients: ['growth@transbot.ai'],
        size: '2.1 MB',
        description: 'Weekly user growth and acquisition metrics',
        schedule: '0 9 * * 1',
        parameters: { includeSources: true, includeConversion: true }
      },
      {
        id: '3',
        name: 'Monthly User Retention Report',
        type: 'retention',
        status: 'running',
        lastGenerated: new Date(Date.now() - 2592000000).toISOString(),
        nextRun: new Date(Date.now() + 2592000000).toISOString(),
        format: 'html',
        recipients: ['product@transbot.ai'],
        size: '3.5 MB',
        description: 'Monthly user retention and churn analysis',
        schedule: '0 10 1 * *',
        parameters: { includeCohorts: true, includePredictions: true }
      },
      {
        id: '4',
        name: 'User Behavior Analysis',
        type: 'behavior',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 7200000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'csv',
        recipients: ['analytics@transbot.ai'],
        size: '4.2 MB',
        description: 'User behavior patterns and feature usage',
        schedule: '0 8 * * *',
        parameters: { includeHeatmaps: true, includeFunnels: true }
      },
      {
        id: '5',
        name: 'User Demographics Report',
        type: 'demographics',
        status: 'failed',
        lastGenerated: new Date(Date.now() - 604800000).toISOString(),
        nextRun: new Date(Date.now() + 604800000).toISOString(),
        format: 'pdf',
        recipients: ['marketing@transbot.ai'],
        size: '0 MB',
        description: 'User demographics and segmentation analysis',
        schedule: '0 7 * * 1',
        parameters: { includeGeo: true, includeAge: true }
      }
    ]),

  getUserMetrics: (): Promise<UserMetric[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Active Users',
        category: 'engagement',
        value: 1247,
        unit: '',
        change: 89,
        changePercent: 7.7,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Number of active users in the last 24 hours',
        target: 1500
      },
      {
        id: '2',
        name: 'New Registrations',
        category: 'growth',
        value: 156,
        unit: '',
        change: 23,
        changePercent: 17.3,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'New user registrations in the last 24 hours',
        target: 200
      },
      {
        id: '3',
        name: 'User Retention Rate',
        category: 'retention',
        value: 78.5,
        unit: '%',
        change: -2.1,
        changePercent: -2.6,
        trend: 'down',
        status: 'warning',
        timestamp: new Date().toISOString(),
        description: '30-day user retention rate',
        target: 85
      },
      {
        id: '4',
        name: 'Session Duration',
        category: 'activity',
        value: 12.4,
        unit: 'min',
        change: 1.2,
        changePercent: 10.7,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Average session duration',
        target: 15
      },
      {
        id: '5',
        name: 'Feature Adoption Rate',
        category: 'engagement',
        value: 67.3,
        unit: '%',
        change: 5.8,
        changePercent: 9.4,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Percentage of users using core features',
        target: 75
      },
      {
        id: '6',
        name: 'Churn Rate',
        category: 'retention',
        value: 3.2,
        unit: '%',
        change: 0.5,
        changePercent: 18.5,
        trend: 'down',
        status: 'critical',
        timestamp: new Date().toISOString(),
        description: 'Monthly user churn rate',
        target: 2
      }
    ]),

  getUserActivities: (): Promise<UserActivity[]> => 
    Promise.resolve([
      {
        id: '1',
        userId: 'user-001',
        userName: 'John Doe',
        userEmail: 'john.doe@example.com',
        action: 'Login',
        category: 'login',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionDuration: 1800,
        success: true
      },
      {
        id: '2',
        userId: 'user-002',
        userName: 'Jane Smith',
        userEmail: 'jane.smith@example.com',
        action: 'Created Load',
        category: 'feature_usage',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        ipAddress: '192.168.1.101',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        success: true,
        details: { loadId: 'load-123', loadType: 'dry_van' }
      },
      {
        id: '3',
        userId: 'user-003',
        userName: 'Bob Johnson',
        userEmail: 'bob.johnson@example.com',
        action: 'Failed Login',
        category: 'login',
        timestamp: new Date(Date.now() - 5400000).toISOString(),
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        success: false,
        details: { reason: 'invalid_password' }
      }
    ]),

  getUserSegments: (): Promise<UserSegment[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Power Users',
        description: 'Users with high activity and feature usage',
        criteria: { minSessions: 10, minFeatures: 5 },
        userCount: 234,
        lastUpdated: new Date().toISOString(),
        isActive: true,
        tags: ['high-value', 'engaged']
      },
      {
        id: '2',
        name: 'New Users',
        description: 'Users who registered in the last 7 days',
        criteria: { registrationDate: 'last_7_days' },
        userCount: 156,
        lastUpdated: new Date().toISOString(),
        isActive: true,
        tags: ['onboarding', 'new']
      },
      {
        id: '3',
        name: 'At Risk Users',
        description: 'Users with declining activity',
        criteria: { activityDecline: 'last_30_days', minDecline: 50 },
        userCount: 89,
        lastUpdated: new Date().toISOString(),
        isActive: true,
        tags: ['churn-risk', 'declining']
      }
    ])
};

const UserReportsPage = () => {
  const [reports, setReports] = useState<UserReport[]>([]);
  const [metrics, setMetrics] = useState<UserMetric[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [segments, setSegments] = useState<UserSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newReportDialog, setNewReportDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [reportsData, metricsData, activitiesData, segmentsData] = await Promise.all([
        mockAPI.getUserReports(),
        mockAPI.getUserMetrics(),
        mockAPI.getUserActivities(),
        mockAPI.getUserSegments()
      ]);
      setReports(reportsData);
      setMetrics(metricsData);
      setActivities(activitiesData);
      setSegments(segmentsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load user data",
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading user reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Reports</h1>
          <p className="text-muted-foreground">
            User analytics, behavior insights, and engagement metrics
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadUserData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewReportDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* User Metrics Overview */}
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
                {metric.target && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Target</span>
                      <span>{metric.target}{metric.unit}</span>
                    </div>
                    <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reports and Analytics */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reports">User Reports</TabsTrigger>
          <TabsTrigger value="activity">User Activity</TabsTrigger>
          <TabsTrigger value="segments">User Segments</TabsTrigger>
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
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="retention">Retention</SelectItem>
                      <SelectItem value="behavior">Behavior</SelectItem>
                      <SelectItem value="demographics">Demographics</SelectItem>
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
              <CardTitle>User Reports</CardTitle>
              <CardDescription>
                Manage and generate user analytics reports
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
                          <Button size="sm" variant="outline">
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

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
              <CardDescription>
                Real-time user activity and behavior tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map(activity => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{activity.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{activity.userName}</div>
                            <div className="text-sm text-muted-foreground">{activity.userEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {activity.category.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(activity.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{activity.ipAddress}</TableCell>
                      <TableCell>
                        <Badge variant={activity.success ? 'default' : 'destructive'}>
                          {activity.success ? 'Success' : 'Failed'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Segments</CardTitle>
              <CardDescription>
                User segmentation and targeting analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {segments.map(segment => (
                  <Card key={segment.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{segment.name}</CardTitle>
                        <Badge variant={segment.isActive ? 'default' : 'secondary'}>
                          {segment.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <CardDescription>{segment.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-2xl font-bold">{segment.userCount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">users</div>
                        <div className="flex flex-wrap gap-1">
                          {segment.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Updated: {new Date(segment.lastUpdated).toLocaleDateString()}
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
                <CardTitle>User Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  User growth trends chart will be implemented here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  User engagement overview chart will be implemented here
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
            <DialogTitle>Create New User Report</DialogTitle>
            <DialogDescription>
              Configure a new user analytics report
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
                  <SelectItem value="activity">Activity</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="retention">Retention</SelectItem>
                  <SelectItem value="behavior">Behavior</SelectItem>
                  <SelectItem value="demographics">Demographics</SelectItem>
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

export default UserReportsPage;
