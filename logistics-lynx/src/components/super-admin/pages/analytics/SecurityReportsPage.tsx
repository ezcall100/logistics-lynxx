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
  Shield as ShieldIcon, Lock as LockIcon, Key as KeyIcon2, Eye as EyeIcon, AlertCircle as AlertCircleIcon
} from 'lucide-react';

// Enhanced data models
interface SecurityReport {
  id: string;
  name: string;
  type: 'vulnerability' | 'threat' | 'compliance' | 'audit' | 'incident' | 'access';
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

interface SecurityMetric {
  id: string;
  name: string;
  category: 'vulnerabilities' | 'threats' | 'compliance' | 'access' | 'incidents';
  value: number;
  unit: string;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  status: 'excellent' | 'good' | 'warning' | 'critical';
  timestamp: string;
  description: string;
  target?: number;
  threshold?: {
    warning: number;
    critical: number;
  };
}

interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'vulnerability' | 'threat' | 'compliance' | 'access' | 'incident';
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignedTo?: string;
  resolution?: string;
  system?: string;
  source?: string;
  cveId?: string;
  cvssScore?: number;
}

interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'contained' | 'resolved';
  timestamp: string;
  assignedTo?: string;
  affectedSystems: string[];
  impact: string;
  resolution?: string;
  lessonsLearned?: string;
}

// Mock API functions
const mockAPI = {
  getSecurityReports: (): Promise<SecurityReport[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Daily Security Scan Report',
        type: 'vulnerability',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 82800000).toISOString(),
        format: 'pdf',
        recipients: ['security@transbot.ai', 'admin@transbot.ai'],
        size: '2.8 MB',
        description: 'Daily vulnerability scan and security assessment',
        schedule: '0 2 * * *',
        parameters: { includeCVEs: true, includeRemediation: true }
      },
      {
        id: '2',
        name: 'Weekly Threat Intelligence Report',
        type: 'threat',
        status: 'scheduled',
        lastGenerated: new Date(Date.now() - 604800000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'excel',
        recipients: ['threat-intel@transbot.ai'],
        size: '3.1 MB',
        description: 'Weekly threat intelligence and IOCs analysis',
        schedule: '0 9 * * 1',
        parameters: { includeIOCs: true, includeTrends: true }
      },
      {
        id: '3',
        name: 'Compliance Audit Report',
        type: 'compliance',
        status: 'running',
        lastGenerated: new Date(Date.now() - 2592000000).toISOString(),
        nextRun: new Date(Date.now() + 2592000000).toISOString(),
        format: 'html',
        recipients: ['compliance@transbot.ai'],
        size: '4.2 MB',
        description: 'Monthly compliance audit and certification status',
        schedule: '0 10 1 * *',
        parameters: { includeCertifications: true, includeGaps: true }
      },
      {
        id: '4',
        name: 'Access Control Audit',
        type: 'access',
        status: 'completed',
        lastGenerated: new Date(Date.now() - 7200000).toISOString(),
        nextRun: new Date(Date.now() + 86400000).toISOString(),
        format: 'csv',
        recipients: ['admin@transbot.ai'],
        size: '1.9 MB',
        description: 'User access control and permission audit',
        schedule: '0 8 * * *',
        parameters: { includePermissions: true, includeAnomalies: true }
      },
      {
        id: '5',
        name: 'Security Incident Report',
        type: 'incident',
        status: 'failed',
        lastGenerated: new Date(Date.now() - 3600000).toISOString(),
        nextRun: new Date(Date.now() + 1800000).toISOString(),
        format: 'pdf',
        recipients: ['incident-response@transbot.ai'],
        size: '0 MB',
        description: 'Security incident tracking and response',
        schedule: '0 */6 * * *',
        parameters: { includeTimeline: true, includeLessons: true }
      }
    ]),

  getSecurityMetrics: (): Promise<SecurityMetric[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Security Score',
        category: 'compliance',
        value: 94.5,
        unit: '',
        change: -2.1,
        changePercent: -2.2,
        trend: 'down',
        status: 'warning',
        timestamp: new Date().toISOString(),
        description: 'Overall security health score',
        target: 95,
        threshold: { warning: 90, critical: 85 }
      },
      {
        id: '2',
        name: 'Active Vulnerabilities',
        category: 'vulnerabilities',
        value: 12,
        unit: '',
        change: -3,
        changePercent: -20.0,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Number of active security vulnerabilities',
        target: 5,
        threshold: { warning: 10, critical: 20 }
      },
      {
        id: '3',
        name: 'Threat Detection Rate',
        category: 'threats',
        value: 98.7,
        unit: '%',
        change: 1.2,
        changePercent: 1.2,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Percentage of threats successfully detected',
        target: 95,
        threshold: { warning: 90, critical: 85 }
      },
      {
        id: '4',
        name: 'Failed Login Attempts',
        category: 'access',
        value: 156,
        unit: '',
        change: 23,
        changePercent: 17.3,
        trend: 'down',
        status: 'warning',
        timestamp: new Date().toISOString(),
        description: 'Failed login attempts in the last 24 hours',
        target: 100,
        threshold: { warning: 150, critical: 300 }
      },
      {
        id: '5',
        name: 'Security Incidents',
        category: 'incidents',
        value: 2,
        unit: '',
        change: -1,
        changePercent: -33.3,
        trend: 'up',
        status: 'good',
        timestamp: new Date().toISOString(),
        description: 'Active security incidents',
        target: 0,
        threshold: { warning: 3, critical: 10 }
      },
      {
        id: '6',
        name: 'Compliance Score',
        category: 'compliance',
        value: 97.8,
        unit: '%',
        change: 0.5,
        changePercent: 0.5,
        trend: 'up',
        status: 'excellent',
        timestamp: new Date().toISOString(),
        description: 'Overall compliance score',
        target: 95,
        threshold: { warning: 90, critical: 85 }
      }
    ]),

  getSecurityAlerts: (): Promise<SecurityAlert[]> => 
    Promise.resolve([
      {
        id: '1',
        title: 'High Severity Vulnerability Detected',
        description: 'CVE-2024-1234: SQL injection vulnerability in user service',
        severity: 'high',
        category: 'vulnerability',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'acknowledged',
        assignedTo: 'security@transbot.ai',
        system: 'user-service',
        source: 'automated-scan',
        cveId: 'CVE-2024-1234',
        cvssScore: 8.5
      },
      {
        id: '2',
        title: 'Suspicious Login Activity',
        description: 'Multiple failed login attempts from unknown IP',
        severity: 'medium',
        category: 'threat',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        status: 'active',
        system: 'auth-service',
        source: 'security-monitor'
      },
      {
        id: '3',
        title: 'Compliance Gap Identified',
        description: 'Missing encryption for sensitive data in transit',
        severity: 'medium',
        category: 'compliance',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'active',
        system: 'api-gateway',
        source: 'compliance-audit'
      }
    ]),

  getSecurityIncidents: (): Promise<SecurityIncident[]> => 
    Promise.resolve([
      {
        id: '1',
        title: 'Data Breach Attempt',
        description: 'Attempted unauthorized access to customer data',
        severity: 'high',
        status: 'contained',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        assignedTo: 'incident-response@transbot.ai',
        affectedSystems: ['user-service', 'database'],
        impact: 'No data compromised, incident contained',
        resolution: 'Blocked suspicious IP addresses and enhanced monitoring',
        lessonsLearned: 'Implement additional access controls and monitoring'
      },
      {
        id: '2',
        title: 'Malware Detection',
        description: 'Suspicious file upload detected in file service',
        severity: 'medium',
        status: 'resolved',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        assignedTo: 'security@transbot.ai',
        affectedSystems: ['file-service'],
        impact: 'File quarantined, no system compromise',
        resolution: 'File quarantined and deleted, enhanced file scanning',
        lessonsLearned: 'Improve file upload validation and scanning'
      }
    ])
};

const SecurityReportsPage = () => {
  const [reports, setReports] = useState<SecurityReport[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newReportDialog, setNewReportDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      setLoading(true);
      const [reportsData, metricsData, alertsData, incidentsData] = await Promise.all([
        mockAPI.getSecurityReports(),
        mockAPI.getSecurityMetrics(),
        mockAPI.getSecurityAlerts(),
        mockAPI.getSecurityIncidents()
      ]);
      setReports(reportsData);
      setMetrics(metricsData);
      setAlerts(alertsData);
      setIncidents(incidentsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load security data",
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading security reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Reports</h1>
          <p className="text-muted-foreground">
            Security analytics, threat intelligence, and compliance monitoring
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadSecurityData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewReportDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      {/* Security Metrics Overview */}
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
          <TabsTrigger value="reports">Security Reports</TabsTrigger>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="incidents">Security Incidents</TabsTrigger>
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
                      <SelectItem value="vulnerability">Vulnerability</SelectItem>
                      <SelectItem value="threat">Threat</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                      <SelectItem value="incident">Incident</SelectItem>
                      <SelectItem value="access">Access</SelectItem>
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
              <CardTitle>Security Reports</CardTitle>
              <CardDescription>
                Manage and generate security analysis reports
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

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>
                Active security alerts and threat notifications
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
                            {alert.cveId && ` • ${alert.cveId}`}
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
                      {alert.cvssScore && (
                        <Badge variant="outline">
                          CVSS: {alert.cvssScore}
                        </Badge>
                      )}
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                    <p>No active security alerts</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Incidents</CardTitle>
              <CardDescription>
                Security incident tracking and response management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map(incident => (
                  <Card key={incident.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                          <Badge variant={incident.status === 'resolved' ? 'default' : 'secondary'}>
                            {incident.status}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{incident.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Impact:</span> {incident.impact}
                          </div>
                          <div>
                            <span className="font-medium">Assigned To:</span> {incident.assignedTo || 'Unassigned'}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-sm">Affected Systems:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {incident.affectedSystems.map(system => (
                              <Badge key={system} variant="outline" className="text-xs">
                                {system}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {incident.resolution && (
                          <div>
                            <span className="font-medium text-sm">Resolution:</span>
                            <p className="text-sm text-muted-foreground mt-1">{incident.resolution}</p>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {new Date(incident.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {incidents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <CheckCircle className="h-12 w-12 mx-auto mb-2 text-green-600" />
                    <p>No security incidents</p>
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
                <CardTitle>Security Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Security trends chart will be implemented here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threat Intelligence Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Threat intelligence overview chart will be implemented here
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
            <DialogTitle>Create New Security Report</DialogTitle>
            <DialogDescription>
              Configure a new security analysis report
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
                  <SelectItem value="vulnerability">Vulnerability</SelectItem>
                  <SelectItem value="threat">Threat</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                  <SelectItem value="audit">Audit</SelectItem>
                  <SelectItem value="incident">Incident</SelectItem>
                  <SelectItem value="access">Access</SelectItem>
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

export default SecurityReportsPage;
