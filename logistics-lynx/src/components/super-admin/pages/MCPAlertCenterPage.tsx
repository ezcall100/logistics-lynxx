import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, Settings, Plus, Edit, Trash2, Eye, EyeOff, RefreshCw, Save, 
  AlertTriangle, CheckCircle, Clock, Calendar, Server, Database, Globe, 
  Code, Terminal, Activity, TrendingUp, Download, Upload, MoreHorizontal,
  ArrowUpRight, ArrowDownRight, Minus, XCircle, Info, Shield, Zap, Target, Award, Trophy, Users, Globe2, Cpu,
  HardDrive, Network, Wifi, ShieldCheck, Rocket, Brain, CircuitBoard,
  Gauge, BarChart3, PieChart, Filter, Search, Mail, MessageSquare,
  Phone, Smartphone, Tablet, Monitor, Laptop
} from 'lucide-react';

// Import MCP Design System
import '../styles/mcp-design-system.css';
import {
  MCPStatusBadge,
  MCPMetricCard,
  MCPProgressCard,
  MCPActionButton,
  MCPLoadingSkeleton,
  MCPEmptyState
} from '@/components/ui/mcp-components';

interface AlertRule {
  id: string;
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'inactive' | 'draft';
  type: 'system' | 'performance' | 'security' | 'business';
  conditions: string[];
  actions: string[];
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
  enabled: boolean;
}

interface NotificationChannel {
  id: string;
  name: string;
  type: 'email' | 'slack' | 'webhook' | 'sms' | 'pagerduty';
  config: Record<string, any>;
  status: 'active' | 'inactive' | 'error';
  lastUsed?: string;
  successRate: number;
  enabled: boolean;
}

interface Alert {
  id: string;
  ruleId: string;
  ruleName: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved' | 'suppressed';
  message: string;
  source: string;
  timestamp: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  tags: string[];
}

const MCPAlertCenterPage: React.FC = () => {
  const { toast } = useToast();
  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'High CPU Usage',
      description: 'Alert when CPU usage exceeds 80% for more than 5 minutes',
      severity: 'high',
      status: 'active',
      type: 'performance',
      conditions: ['CPU > 80%', 'Duration > 5min'],
      actions: ['Send email', 'Create ticket'],
      createdAt: '2024-01-15 10:00:00',
      lastTriggered: '2024-01-15 14:30:00',
      triggerCount: 12,
      enabled: true
    },
    {
      id: '2',
      name: 'Database Connection Failure',
      description: 'Alert when database connection fails',
      severity: 'critical',
      status: 'active',
      type: 'system',
      conditions: ['DB Connection = Failed'],
      actions: ['Send SMS', 'Page on-call'],
      createdAt: '2024-01-15 09:00:00',
      lastTriggered: '2024-01-15 13:15:00',
      triggerCount: 3,
      enabled: true
    },
    {
      id: '3',
      name: 'Security Breach Attempt',
      description: 'Alert on suspicious login attempts',
      severity: 'critical',
      status: 'active',
      type: 'security',
      conditions: ['Failed Logins > 10', 'Time Window < 5min'],
      actions: ['Block IP', 'Send alert'],
      createdAt: '2024-01-15 08:00:00',
      triggerCount: 0,
      enabled: true
    }
  ]);

  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([
    {
      id: '1',
      name: 'Admin Email',
      type: 'email',
      config: { email: 'admin@company.com' },
      status: 'active',
      lastUsed: '2024-01-15 14:30:00',
      successRate: 98.5,
      enabled: true
    },
    {
      id: '2',
      name: 'Slack Alerts',
      type: 'slack',
      config: { webhook: 'https://hooks.slack.com/...' },
      status: 'active',
      lastUsed: '2024-01-15 13:15:00',
      successRate: 99.2,
      enabled: true
    },
    {
      id: '3',
      name: 'On-Call SMS',
      type: 'sms',
      config: { phone: '+1234567890' },
      status: 'active',
      lastUsed: '2024-01-15 13:15:00',
      successRate: 95.8,
      enabled: true
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      ruleId: '1',
      ruleName: 'High CPU Usage',
      severity: 'high',
      status: 'active',
      message: 'CPU usage is at 85% for the last 6 minutes',
      source: 'server-01',
      timestamp: '2024-01-15 14:30:00',
      tags: ['performance', 'cpu', 'server-01']
    },
    {
      id: '2',
      ruleId: '2',
      ruleName: 'Database Connection Failure',
      severity: 'critical',
      status: 'acknowledged',
      message: 'Database connection failed on primary server',
      source: 'db-primary',
      timestamp: '2024-01-15 13:15:00',
      acknowledgedBy: 'admin',
      acknowledgedAt: '2024-01-15 13:20:00',
      tags: ['database', 'connection', 'critical']
    },
    {
      id: '3',
      ruleId: '1',
      ruleName: 'High CPU Usage',
      severity: 'high',
      status: 'resolved',
      message: 'CPU usage returned to normal levels',
      source: 'server-02',
      timestamp: '2024-01-15 12:45:00',
      resolvedBy: 'system',
      resolvedAt: '2024-01-15 13:00:00',
      tags: ['performance', 'cpu', 'server-02', 'resolved']
    }
  ]);

  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [showBulkToolbar, setShowBulkToolbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('alerts');
  const [newRuleDialog, setNewRuleDialog] = useState(false);
  const [newChannelDialog, setNewChannelDialog] = useState(false);
  const [alertDetailsDialog, setAlertDetailsDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Calculate metrics
  const metrics = {
    totalAlerts: alerts.length,
    activeAlerts: alerts.filter(a => a.status === 'active').length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical').length,
    acknowledgedAlerts: alerts.filter(a => a.status === 'acknowledged').length,
    resolvedAlerts: alerts.filter(a => a.status === 'resolved').length,
    totalRules: alertRules.length,
    activeRules: alertRules.filter(r => r.enabled).length,
    totalChannels: notificationChannels.length,
    activeChannels: notificationChannels.filter(c => c.enabled).length
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'suppressed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'system': return <Server className="w-4 h-4" />;
      case 'performance': return <Activity className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'business': return <BarChart3 className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'slack': return <MessageSquare className="w-4 h-4" />;
      case 'webhook': return <Globe className="w-4 h-4" />;
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'pagerduty': return <Bell className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const handleAlertSelection = (alertId: string, checked: boolean) => {
    if (checked) {
      setSelectedAlerts([...selectedAlerts, alertId]);
    } else {
      setSelectedAlerts(selectedAlerts.filter(id => id !== alertId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAlerts(alerts.map(alert => alert.id));
    } else {
      setSelectedAlerts([]);
    }
  };

  const handleBulkAction = (action: string, alertIds: string[]) => {
    setLoading(true);
    setTimeout(() => {
      switch (action) {
        case 'acknowledge':
          setAlerts(prev => prev.map(alert => 
            alertIds.includes(alert.id) && alert.status === 'active'
              ? { ...alert, status: 'acknowledged', acknowledgedBy: 'admin', acknowledgedAt: new Date().toISOString() }
              : alert
          ));
          toast({
            title: "Alerts Acknowledged",
            description: `${alertIds.length} alerts have been acknowledged.`,
          });
          break;
        case 'resolve':
          setAlerts(prev => prev.map(alert => 
            alertIds.includes(alert.id)
              ? { ...alert, status: 'resolved', resolvedBy: 'admin', resolvedAt: new Date().toISOString() }
              : alert
          ));
          toast({
            title: "Alerts Resolved",
            description: `${alertIds.length} alerts have been resolved.`,
          });
          break;
        case 'suppress':
          setAlerts(prev => prev.map(alert => 
            alertIds.includes(alert.id)
              ? { ...alert, status: 'suppressed' }
              : alert
          ));
          toast({
            title: "Alerts Suppressed",
            description: `${alertIds.length} alerts have been suppressed.`,
          });
          break;
      }
      setSelectedAlerts([]);
      setLoading(false);
    }, 1000);
  };

  const handleAlertAction = (action: string, alert: Alert) => {
    switch (action) {
      case 'view':
        setSelectedAlert(alert);
        setAlertDetailsDialog(true);
        break;
      case 'acknowledge':
        setAlerts(prev => prev.map(a => 
          a.id === alert.id 
            ? { ...a, status: 'acknowledged', acknowledgedBy: 'admin', acknowledgedAt: new Date().toISOString() }
            : a
        ));
        toast({
          title: "Alert Acknowledged",
          description: `Alert "${alert.ruleName}" has been acknowledged.`,
        });
        break;
      case 'resolve':
        setAlerts(prev => prev.map(a => 
          a.id === alert.id 
            ? { ...a, status: 'resolved', resolvedBy: 'admin', resolvedAt: new Date().toISOString() }
            : a
        ));
        toast({
          title: "Alert Resolved",
          description: `Alert "${alert.ruleName}" has been resolved.`,
        });
        break;
      case 'suppress':
        setAlerts(prev => prev.map(a => 
          a.id === alert.id 
            ? { ...a, status: 'suppressed' }
            : a
        ));
        toast({
          title: "Alert Suppressed",
          description: `Alert "${alert.ruleName}" has been suppressed.`,
        });
        break;
    }
  };

  // Show bulk toolbar when alerts are selected
  useEffect(() => {
    setShowBulkToolbar(selectedAlerts.length > 0);
  }, [selectedAlerts]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Enhanced Hero Header */}
        <div className="mcp-hero relative overflow-hidden text-white">
          <div className="relative z-10 p-8">
            <div className="flex items-center justify-between">
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="p-6 rounded-3xl bg-gradient-to-r from-red-500 to-orange-600 shadow-2xl">
                      <Bell className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
                  </div>
                  <div>
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                      MCP Alert Center
                    </h1>
                    <p className="text-xl text-red-100 mt-3">
                      Intelligent Alert Management & Response System
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Live Status Indicators */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                    <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-lg font-medium">Active Alerts: {metrics.activeAlerts}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                    <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                    <span className="text-lg font-medium">Critical: {metrics.criticalAlerts}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    <span className="text-lg font-medium">Acknowledged: {metrics.acknowledgedAlerts}</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/20">
                    <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                    <span className="text-lg font-medium">Resolved: {metrics.resolvedAlerts}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MCPActionButton
                  variant="secondary"
                  icon={Plus}
                  onClick={() => setNewRuleDialog(true)}
                >
                  New Rule
                </MCPActionButton>
                <MCPActionButton
                  variant="ghost"
                  icon={RefreshCw}
                  loading={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1000);
                    toast({ title: "Refreshed", description: "Alert data updated." });
                  }}
                >
                  Refresh
                </MCPActionButton>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bulk Actions Toolbar */}
        {showBulkToolbar && (
          <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 shadow-lg">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-slate-700">
                    {selectedAlerts.length} alert{selectedAlerts.length !== 1 ? 's' : ''} selected
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAlerts([])}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    Clear Selection
                  </Button>
                </div>
                <div className="flex items-center space-x-3">
                  <MCPActionButton
                    variant="secondary"
                    size="sm"
                    onClick={() => handleBulkAction('acknowledge', selectedAlerts)}
                    disabled={selectedAlerts.length === 0}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Acknowledge</span>
                  </MCPActionButton>
                  <MCPActionButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleBulkAction('resolve', selectedAlerts)}
                    disabled={selectedAlerts.length === 0}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Resolve</span>
                  </MCPActionButton>
                  <MCPActionButton
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBulkAction('suppress', selectedAlerts)}
                    disabled={selectedAlerts.length === 0}
                  >
                    <EyeOff className="w-4 h-4" />
                    <span>Suppress</span>
                  </MCPActionButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Main Content */}
        <div className="p-8 space-y-8">
          {/* Enhanced Metrics Dashboard */}
          <div className="mcp-card-grid">
            <MCPMetricCard
              title="Total Alerts"
              value={metrics.totalAlerts}
              icon={Bell}
              trend="up"
              change={{ value: 8, type: 'increase', period: 'last hour' }}
            />
            <MCPMetricCard
              title="Active Alerts"
              value={metrics.activeAlerts}
              icon={AlertTriangle}
              status="error"
              trend="up"
            />
            <MCPMetricCard
              title="Critical Alerts"
              value={metrics.criticalAlerts}
              icon={XCircle}
              status="error"
              trend="down"
            />
            <MCPMetricCard
              title="Resolution Rate"
              value={`${((metrics.resolvedAlerts / metrics.totalAlerts) * 100).toFixed(1)}%`}
              icon={CheckCircle}
              status="success"
              trend="up"
              change={{ value: 2.5, type: 'increase', period: 'last week' }}
            />
          </div>

          {/* Enhanced Alert Management */}
          <Card className="mcp-glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <Bell className="w-6 h-6 text-primary" />
                    Alert Management
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Monitor and manage system alerts and notifications
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-3">
                  <MCPActionButton
                    variant="primary"
                    icon={Plus}
                    onClick={() => setNewRuleDialog(true)}
                  >
                    New Rule
                  </MCPActionButton>
                  <MCPActionButton
                    variant="secondary"
                    icon={Plus}
                    onClick={() => setNewChannelDialog(true)}
                  >
                    New Channel
                  </MCPActionButton>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="alerts" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Alerts ({metrics.totalAlerts})
                  </TabsTrigger>
                  <TabsTrigger value="rules" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Rules ({metrics.totalRules})
                  </TabsTrigger>
                  <TabsTrigger value="channels" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Channels ({metrics.totalChannels})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="alerts" className="space-y-4">
                  {loading ? (
                    <MCPLoadingSkeleton type="table" count={3} />
                  ) : alerts.length === 0 ? (
                    <MCPEmptyState
                      icon={Bell}
                      title="No Alerts Found"
                      description="All systems are running smoothly with no active alerts."
                    />
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                                                     <TableHead className="w-12">
                             <input
                               type="checkbox"
                               checked={selectedAlerts.length === alerts.length && alerts.length > 0}
                               onChange={(e) => handleSelectAll(e.target.checked)}
                               className="h-4 w-4 rounded border-gray-300"
                             />
                           </TableHead>
                          <TableHead>Alert</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead className="w-32">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {alerts.map((alert) => (
                          <TableRow key={alert.id} className="group mcp-table-row">
                                                         <TableCell>
                               <input
                                 type="checkbox"
                                 checked={selectedAlerts.includes(alert.id)}
                                 onChange={(e) => handleAlertSelection(alert.id, e.target.checked)}
                                 className="h-4 w-4 rounded border-gray-300"
                               />
                             </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{alert.ruleName}</p>
                                <p className="text-sm text-slate-500">{alert.message}</p>
                                <div className="flex space-x-1 mt-1">
                                  {alert.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getSeverityColor(alert.severity)}>
                                {alert.severity.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <MCPStatusBadge
                                status={alert.status === 'active' ? 'critical' : 
                                       alert.status === 'acknowledged' ? 'degraded' :
                                       alert.status === 'resolved' ? 'operational' : 'offline'}
                                size="sm"
                              />
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{alert.source}</span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">{alert.timestamp}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => handleAlertAction('view', alert)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>View Details</TooltipContent>
                                </Tooltip>
                                
                                {alert.status === 'active' && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleAlertAction('acknowledge', alert)}
                                        className="h-8 w-8 p-0"
                                      >
                                        <CheckCircle className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Acknowledge</TooltipContent>
                                  </Tooltip>
                                )}
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-8 w-8 p-0"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {alert.status === 'active' && (
                                      <DropdownMenuItem onClick={() => handleAlertAction('acknowledge', alert)}>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Acknowledge
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem onClick={() => handleAlertAction('resolve', alert)}>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Resolve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleAlertAction('suppress', alert)}>
                                      <EyeOff className="w-4 h-4 mr-2" />
                                      Suppress
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </TabsContent>

                <TabsContent value="rules" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {alertRules.map((rule) => (
                      <Card key={rule.id} className="mcp-glass-card">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(rule.type)}
                              <CardTitle className="text-base">{rule.name}</CardTitle>
                            </div>
                            <Switch
                              checked={rule.enabled}
                              onCheckedChange={(checked) => {
                                setAlertRules(prev => prev.map(r => 
                                  r.id === rule.id ? { ...r, enabled: checked } : r
                                ));
                                toast({
                                  title: rule.enabled ? "Rule Disabled" : "Rule Enabled",
                                  description: `Rule "${rule.name}" has been ${rule.enabled ? 'disabled' : 'enabled'}.`,
                                });
                              }}
                            />
                          </div>
                          <CardDescription className="text-sm">{rule.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge className={getSeverityColor(rule.severity)}>
                              {rule.severity.toUpperCase()}
                            </Badge>
                            <MCPStatusBadge
                              status={rule.enabled ? 'operational' : 'offline'}
                              size="sm"
                              showIcon={false}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="text-xs text-muted-foreground">Conditions:</div>
                            <div className="space-y-1">
                              {rule.conditions.map((condition, index) => (
                                <div key={index} className="text-xs bg-muted px-2 py-1 rounded">
                                  {condition}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Triggers: {rule.triggerCount}</span>
                            <span>Created: {rule.createdAt}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="channels" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notificationChannels.map((channel) => (
                      <Card key={channel.id} className="mcp-glass-card">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              {getChannelIcon(channel.type)}
                              <CardTitle className="text-base">{channel.name}</CardTitle>
                            </div>
                            <Switch
                              checked={channel.enabled}
                              onCheckedChange={(checked) => {
                                setNotificationChannels(prev => prev.map(c => 
                                  c.id === channel.id ? { ...c, enabled: checked } : c
                                ));
                                toast({
                                  title: channel.enabled ? "Channel Disabled" : "Channel Enabled",
                                  description: `Channel "${channel.name}" has been ${channel.enabled ? 'disabled' : 'enabled'}.`,
                                });
                              }}
                            />
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="capitalize">
                              {channel.type}
                            </Badge>
                            <MCPStatusBadge
                              status={channel.enabled ? 'operational' : 'offline'}
                              size="sm"
                              showIcon={false}
                            />
                          </div>
                          <MCPProgressCard
                            title="Success Rate"
                            value={channel.successRate}
                            max={100}
                            unit="%"
                            status={channel.successRate > 95 ? 'success' : channel.successRate > 80 ? 'warning' : 'error'}
                            className="border-0 shadow-none bg-transparent"
                          />
                          {channel.lastUsed && (
                            <div className="text-xs text-muted-foreground">
                              Last used: {channel.lastUsed}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Alert Details Dialog */}
        <Dialog open={alertDetailsDialog} onOpenChange={setAlertDetailsDialog}>
          <DialogContent className="mcp-glass-card max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>Alert Details - {selectedAlert?.ruleName}</span>
              </DialogTitle>
              <DialogDescription>
                Detailed information about this alert
              </DialogDescription>
            </DialogHeader>
            {selectedAlert && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Alert ID</Label>
                    <Input value={selectedAlert.id} readOnly className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Rule Name</Label>
                    <Input value={selectedAlert.ruleName} readOnly className="bg-slate-50" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Badge className={getSeverityColor(selectedAlert.severity)}>
                      {selectedAlert.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <MCPStatusBadge
                      status={selectedAlert.status === 'active' ? 'critical' : 
                             selectedAlert.status === 'acknowledged' ? 'degraded' :
                             selectedAlert.status === 'resolved' ? 'operational' : 'offline'}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea 
                    value={selectedAlert.message}
                    readOnly
                    rows={3}
                    className="bg-slate-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source</Label>
                    <Input value={selectedAlert.source} readOnly className="bg-slate-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Timestamp</Label>
                    <Input value={selectedAlert.timestamp} readOnly className="bg-slate-50" />
                  </div>
                </div>
                {selectedAlert.acknowledgedBy && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Acknowledged By</Label>
                      <Input value={selectedAlert.acknowledgedBy} readOnly className="bg-slate-50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Acknowledged At</Label>
                      <Input value={selectedAlert.acknowledgedAt} readOnly className="bg-slate-50" />
                    </div>
                  </div>
                )}
                {selectedAlert.resolvedBy && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Resolved By</Label>
                      <Input value={selectedAlert.resolvedBy} readOnly className="bg-slate-50" />
                    </div>
                    <div className="space-y-2">
                      <Label>Resolved At</Label>
                      <Input value={selectedAlert.resolvedAt} readOnly className="bg-slate-50" />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex space-x-2">
                    {selectedAlert.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setAlertDetailsDialog(false)}>
                Close
              </Button>
              {selectedAlert && selectedAlert.status === 'active' && (
                <MCPActionButton
                  onClick={() => {
                    handleAlertAction('acknowledge', selectedAlert);
                    setAlertDetailsDialog(false);
                  }}
                >
                  Acknowledge Alert
                </MCPActionButton>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Rule Dialog */}
        <Dialog open={newRuleDialog} onOpenChange={setNewRuleDialog}>
          <DialogContent className="mcp-glass-card">
            <DialogHeader>
              <DialogTitle>Create New Alert Rule</DialogTitle>
              <DialogDescription>
                Configure a new alert rule to monitor system conditions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Rule Name</Label>
                <Input placeholder="Enter rule name" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Describe what this rule monitors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewRuleDialog(false)}>
                Cancel
              </Button>
              <MCPActionButton onClick={() => {
                setNewRuleDialog(false);
                toast({ title: "Rule Created", description: "New alert rule has been created." });
              }}>
                Create Rule
              </MCPActionButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Channel Dialog */}
        <Dialog open={newChannelDialog} onOpenChange={setNewChannelDialog}>
          <DialogContent className="mcp-glass-card">
            <DialogHeader>
              <DialogTitle>Create New Notification Channel</DialogTitle>
              <DialogDescription>
                Configure a new notification channel for alert delivery
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Channel Name</Label>
                <Input placeholder="Enter channel name" />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="pagerduty">PagerDuty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Configuration</Label>
                <Textarea 
                  placeholder="Enter configuration (JSON format)"
                  rows={4}
                />
                <p className="text-xs text-slate-500">
                  Example: {'{"email": "admin@company.com"}'} or {'{"webhook": "https://hooks.slack.com/..."}'}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewChannelDialog(false)}>
                Cancel
              </Button>
              <MCPActionButton onClick={() => {
                setNewChannelDialog(false);
                toast({ title: "Channel Created", description: "New notification channel has been created." });
              }}>
                Create Channel
              </MCPActionButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default MCPAlertCenterPage;
