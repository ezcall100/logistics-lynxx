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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, Settings, AlertTriangle, CheckCircle, Clock, 
  XCircle, Info, Zap, Eye, EyeOff, Plus, Edit, Trash2,
  RefreshCw, Save, Filter, Search, Volume2, VolumeX,
  Mail, MessageSquare, Smartphone, Globe, Shield,
  TrendingUp, TrendingDown, Activity, Target, Award
} from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'critical' | 'success';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  source: string;
  timestamp: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  tags: string[];
  priority: number;
}

interface AlertRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'inactive' | 'draft';
  actions: string[];
  createdBy: string;
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
}

interface NotificationChannel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'webhook' | 'slack' | 'teams';
  status: 'active' | 'inactive' | 'error';
  config: Record<string, any>;
  lastTest?: string;
  successRate: number;
}

const MCPAlertCenterPage: React.FC = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'High CPU Usage Detected',
      message: 'CPU usage has exceeded 90% for more than 5 minutes on server-web-01',
      type: 'warning',
      severity: 'high',
      status: 'active',
      source: 'System Monitor',
      timestamp: '2024-01-15 14:30:00',
      tags: ['performance', 'cpu', 'server-web-01'],
      priority: 8
    },
    {
      id: '2',
      title: 'Database Connection Failed',
      message: 'Unable to establish connection to primary database server',
      type: 'error',
      severity: 'critical',
      status: 'active',
      source: 'Database Monitor',
      timestamp: '2024-01-15 14:25:00',
      tags: ['database', 'connection', 'critical'],
      priority: 10
    },
    {
      id: '3',
      title: 'Backup Completed Successfully',
      message: 'Daily backup completed successfully. 2.5GB of data backed up.',
      type: 'success',
      severity: 'low',
      status: 'acknowledged',
      source: 'Backup Service',
      timestamp: '2024-01-15 14:00:00',
      acknowledgedBy: 'admin@company.com',
      acknowledgedAt: '2024-01-15 14:05:00',
      tags: ['backup', 'success'],
      priority: 2
    }
  ]);

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: '1',
      name: 'High CPU Usage',
      description: 'Alert when CPU usage exceeds 90% for more than 5 minutes',
      condition: 'cpu_usage > 90 AND duration > 300',
      severity: 'high',
      status: 'active',
      actions: ['email', 'slack'],
      createdBy: 'admin@company.com',
      createdAt: '2024-01-10 10:00:00',
      lastTriggered: '2024-01-15 14:30:00',
      triggerCount: 15
    },
    {
      id: '2',
      name: 'Database Connection Failure',
      description: 'Alert when database connection fails',
      condition: 'db_connection_status == "failed"',
      severity: 'critical',
      status: 'active',
      actions: ['email', 'sms', 'slack'],
      createdBy: 'admin@company.com',
      createdAt: '2024-01-08 09:00:00',
      lastTriggered: '2024-01-15 14:25:00',
      triggerCount: 3
    }
  ]);

  const [notificationChannels, setNotificationChannels] = useState<NotificationChannel[]>([
    {
      id: '1',
      name: 'Admin Email',
      type: 'email',
      status: 'active',
      config: { email: 'admin@company.com' },
      lastTest: '2024-01-15 10:00:00',
      successRate: 98
    },
    {
      id: '2',
      name: 'Slack Alerts',
      type: 'slack',
      status: 'active',
      config: { channel: '#alerts', webhook: 'https://hooks.slack.com/...' },
      lastTest: '2024-01-15 09:30:00',
      successRate: 95
    },
    {
      id: '3',
      name: 'SMS Notifications',
      type: 'sms',
      status: 'active',
      config: { phone: '+1234567890' },
      lastTest: '2024-01-15 08:00:00',
      successRate: 92
    }
  ]);

  // Dialog states
  const [newAlertRuleDialog, setNewAlertRuleDialog] = useState(false);
  const [newChannelDialog, setNewChannelDialog] = useState(false);
  const [alertDetailsDialog, setAlertDetailsDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [alertRuleConfig, setAlertRuleConfig] = useState({
    name: '',
    description: '',
    condition: '',
    severity: 'medium' as const,
    actions: [] as string[]
  });
  const [channelConfig, setChannelConfig] = useState({
    name: '',
    type: 'email' as const,
    config: {} as Record<string, any>
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { 
            ...alert, 
            status: 'acknowledged', 
            acknowledgedBy: 'current-user@company.com',
            acknowledgedAt: new Date().toISOString()
          }
        : alert
    ));
    
    toast({
      title: "Alert Acknowledged",
      description: "The alert has been marked as acknowledged.",
    });
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' }
        : alert
    ));
    
    toast({
      title: "Alert Resolved",
      description: "The alert has been marked as resolved.",
    });
  };

  const handleNewAlertRule = () => {
    if (!alertRuleConfig.name || !alertRuleConfig.condition) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newRule: AlertRule = {
      id: Date.now().toString(),
      name: alertRuleConfig.name,
      description: alertRuleConfig.description,
      condition: alertRuleConfig.condition,
      severity: alertRuleConfig.severity,
      status: 'active',
      actions: alertRuleConfig.actions,
      createdBy: 'current-user@company.com',
      createdAt: new Date().toISOString(),
      triggerCount: 0
    };

    setAlertRules([newRule, ...alertRules]);
    setNewAlertRuleDialog(false);
    setAlertRuleConfig({ name: '', description: '', condition: '', severity: 'medium', actions: [] });
    
    toast({
      title: "Alert Rule Created",
      description: `Alert rule "${alertRuleConfig.name}" has been created.`,
    });
  };

  const handleNewChannel = () => {
    if (!channelConfig.name || !channelConfig.type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newChannel: NotificationChannel = {
      id: Date.now().toString(),
      name: channelConfig.name,
      type: channelConfig.type,
      status: 'active',
      config: channelConfig.config,
      successRate: 100
    };

    setNotificationChannels([newChannel, ...notificationChannels]);
    setNewChannelDialog(false);
    setChannelConfig({ name: '', type: 'email', config: {} });
    
    toast({
      title: "Notification Channel Created",
      description: `Channel "${channelConfig.name}" has been created.`,
    });
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'slack': return <MessageSquare className="w-4 h-4" />;
      case 'webhook': return <Globe className="w-4 h-4" />;
      case 'teams': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
        <div className="relative z-10 p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                    <Bell className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse border-4 border-white shadow-lg"></div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Alert Center
                  </h1>
                  <p className="text-lg text-blue-100 mt-2">
                    MCP Alert Management & Notification System
                  </p>
                </div>
              </div>
              
              {/* Live Status Indicators */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Active Alerts: {alerts.filter(a => a.status === 'active').length}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm font-medium">Alert Rules: {alertRules.length}</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-sm font-medium">Notification Channels: {notificationChannels.length}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setNewAlertRuleDialog(true)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Alert Rule
              </Button>
              <Button
                variant="outline"
                onClick={() => setNewChannelDialog(true)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                <Bell className="h-4 w-4 mr-2" />
                New Channel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-8">
        <Tabs defaultValue="alerts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
            <TabsTrigger value="rules">Alert Rules</TabsTrigger>
            <TabsTrigger value="channels">Notification Channels</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Active Alerts</span>
                </CardTitle>
                <CardDescription>Monitor and manage system alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg ${getTypeColor(alert.type)}`}>
                            {alert.type === 'critical' && <AlertTriangle className="w-5 h-5" />}
                            {alert.type === 'error' && <XCircle className="w-5 h-5" />}
                            {alert.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                            {alert.type === 'info' && <Info className="w-5 h-5" />}
                            {alert.type === 'success' && <CheckCircle className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{alert.title}</h3>
                            <p className="text-sm text-slate-500">
                              {alert.source} • {alert.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status.toUpperCase()}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedAlert(alert);
                                setAlertDetailsDialog(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {alert.status === 'active' && (
                              <>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleAcknowledgeAlert(alert.id)}
                                >
                                  Acknowledge
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleResolveAlert(alert.id)}
                                >
                                  Resolve
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-slate-700 mb-4">{alert.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {alert.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-sm text-slate-500">
                          Priority: {alert.priority}/10
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alert Rules Tab */}
          <TabsContent value="rules" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Alert Rules</span>
                </CardTitle>
                <CardDescription>Manage alert rules and conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Condition</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Triggered</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alertRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{rule.name}</p>
                            <p className="text-sm text-slate-500">{rule.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                            {rule.condition}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(rule.severity)}>
                            {rule.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {rule.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{rule.lastTriggered || 'Never'}</p>
                            <p className="text-xs text-slate-500">Triggered {rule.triggerCount} times</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
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

          {/* Notification Channels Tab */}
          <TabsContent value="channels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notificationChannels.map((channel) => (
                <Card key={channel.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          channel.status === 'active' ? 'bg-green-100' :
                          channel.status === 'error' ? 'bg-red-100' :
                          'bg-gray-100'
                        }`}>
                          {getChannelIcon(channel.type)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{channel.name}</CardTitle>
                          <CardDescription>{channel.type}</CardDescription>
                        </div>
                      </div>
                      <Badge className={channel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {channel.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Success Rate:</span>
                        <span className="font-medium">{channel.successRate}%</span>
                      </div>
                      <Progress value={channel.successRate} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Last Test:</span>
                      <span className="font-medium">{channel.lastTest || 'Never'}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-slate-600" />
                  <span>Alert Settings</span>
                </CardTitle>
                <CardDescription>Configure alert system preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Alert Aggregation</Label>
                    <Select defaultValue="5min">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1min">1 minute</SelectItem>
                        <SelectItem value="5min">5 minutes</SelectItem>
                        <SelectItem value="15min">15 minutes</SelectItem>
                        <SelectItem value="1hour">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Auto-resolve Timeout</Label>
                    <Input type="number" defaultValue={24} placeholder="Hours" />
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Escalation Delay</Label>
                    <Input type="number" defaultValue={30} placeholder="Minutes" />
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Max Alerts per Hour</Label>
                    <Input type="number" defaultValue={100} placeholder="Count" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label className="text-base font-medium">Global Settings</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-alerts" defaultChecked />
                      <Label htmlFor="enable-alerts">Enable alert system</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-escalation" defaultChecked />
                      <Label htmlFor="enable-escalation">Enable alert escalation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-snooze" defaultChecked />
                      <Label htmlFor="enable-snooze">Enable alert snoozing</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Alert Rule Dialog */}
      <Dialog open={newAlertRuleDialog} onOpenChange={setNewAlertRuleDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Create New Alert Rule</span>
            </DialogTitle>
            <DialogDescription>
              Define a new alert rule with conditions and actions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Rule Name *</Label>
                <Input 
                  value={alertRuleConfig.name}
                  onChange={(e) => setAlertRuleConfig({...alertRuleConfig, name: e.target.value})}
                  placeholder="e.g., High CPU Usage"
                />
              </div>
              <div className="space-y-2">
                <Label>Severity *</Label>
                <Select 
                  value={alertRuleConfig.severity}
                  onValueChange={(value: any) => setAlertRuleConfig({...alertRuleConfig, severity: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                value={alertRuleConfig.description}
                onChange={(e) => setAlertRuleConfig({...alertRuleConfig, description: e.target.value})}
                placeholder="Describe what this alert rule monitors..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Condition *</Label>
              <Input 
                value={alertRuleConfig.condition}
                onChange={(e) => setAlertRuleConfig({...alertRuleConfig, condition: e.target.value})}
                placeholder="e.g., cpu_usage > 90 AND duration > 300"
              />
            </div>
            <div className="space-y-2">
              <Label>Actions</Label>
              <div className="space-y-2">
                {['email', 'sms', 'slack', 'webhook'].map((action) => (
                  <div key={action} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={action}
                      checked={alertRuleConfig.actions.includes(action)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAlertRuleConfig({
                            ...alertRuleConfig,
                            actions: [...alertRuleConfig.actions, action]
                          });
                        } else {
                          setAlertRuleConfig({
                            ...alertRuleConfig,
                            actions: alertRuleConfig.actions.filter(a => a !== action)
                          });
                        }
                      }}
                    />
                    <Label htmlFor={action}>{action.toUpperCase()}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewAlertRuleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleNewAlertRule}>
              Create Alert Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Notification Channel Dialog */}
      <Dialog open={newChannelDialog} onOpenChange={setNewChannelDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Create Notification Channel</span>
            </DialogTitle>
            <DialogDescription>
              Set up a new notification channel for alerts
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Channel Name *</Label>
                <Input 
                  value={channelConfig.name}
                  onChange={(e) => setChannelConfig({...channelConfig, name: e.target.value})}
                  placeholder="e.g., Admin Email"
                />
              </div>
              <div className="space-y-2">
                <Label>Channel Type *</Label>
                <Select 
                  value={channelConfig.type}
                  onValueChange={(value: any) => setChannelConfig({...channelConfig, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="slack">Slack</SelectItem>
                    <SelectItem value="webhook">Webhook</SelectItem>
                    <SelectItem value="teams">Microsoft Teams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Configuration</Label>
              <Textarea 
                placeholder="Enter channel configuration (JSON format)"
                rows={4}
                onChange={(e) => {
                  try {
                    const config = JSON.parse(e.target.value);
                    setChannelConfig({...channelConfig, config});
                  } catch (error) {
                    // Handle invalid JSON
                  }
                }}
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
            <Button onClick={handleNewChannel}>
              Create Channel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Details Dialog */}
      <Dialog open={alertDetailsDialog} onOpenChange={setAlertDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Alert Details - {selectedAlert?.title}</span>
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
                  <Label>Type</Label>
                  <Input value={selectedAlert.type} readOnly className="bg-slate-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Input value={selectedAlert.severity} readOnly className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Input value={selectedAlert.status} readOnly className="bg-slate-50" />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input value={selectedAlert.source} readOnly className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Input value={`${selectedAlert.priority}/10`} readOnly className="bg-slate-50" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Created</Label>
                  <Input value={selectedAlert.timestamp} readOnly className="bg-slate-50" />
                </div>
                {selectedAlert.acknowledgedAt && (
                  <div className="space-y-2">
                    <Label>Acknowledged</Label>
                    <Input value={selectedAlert.acknowledgedAt} readOnly className="bg-slate-50" />
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAlertDetailsDialog(false)}>
              Close
            </Button>
            {selectedAlert?.status === 'active' && (
              <>
                <Button variant="outline" onClick={() => {
                  handleAcknowledgeAlert(selectedAlert.id);
                  setAlertDetailsDialog(false);
                }}>
                  Acknowledge
                </Button>
                <Button onClick={() => {
                  handleResolveAlert(selectedAlert.id);
                  setAlertDetailsDialog(false);
                }}>
                  Resolve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MCPAlertCenterPage;
