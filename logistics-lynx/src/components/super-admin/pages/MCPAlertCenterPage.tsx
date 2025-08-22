import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, RefreshCw, Download, Upload, 
  CheckCircle, AlertCircle, Clock, Database, 
  Server, Shield, Users, Activity,
  Code, Globe, Lock, Key, Wrench,
  Cog, Zap, Eye, EyeOff, Trash2, Copy,
  Plus, Edit, Search, Filter, MoreHorizontal,
  HardDrive, Cloud, Archive, RotateCcw, ShieldCheck,
  AlertTriangle, Info, Play, Pause, Stop,
  Settings, BarChart3, Timer, Terminal,
  Bug, Network,
  Mail, MessageSquare, Smartphone, Volume2
} from 'lucide-react';

const MCPAlertCenterPage = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'High CPU Usage Detected',
      severity: 'critical',
      status: 'active',
      service: 'database-service',
      timestamp: '2024-01-15 14:30:25',
      description: 'CPU usage has exceeded 90% for more than 5 minutes',
      acknowledged: false,
      assignedTo: null
    },
    {
      id: 2,
      title: 'Database Connection Pool Exhausted',
      severity: 'warning',
      status: 'active',
      service: 'database-service',
      timestamp: '2024-01-15 14:25:10',
      description: 'Connection pool is at 95% capacity',
      acknowledged: true,
      assignedTo: 'admin@transbot.ai'
    },
    {
      id: 3,
      title: 'API Gateway Response Time High',
      severity: 'warning',
      status: 'resolved',
      service: 'api-gateway',
      timestamp: '2024-01-15 14:20:15',
      description: 'Average response time exceeded 500ms',
      acknowledged: true,
      assignedTo: 'dev@transbot.ai'
    },
    {
      id: 4,
      title: 'Security Scan Completed',
      severity: 'info',
      status: 'resolved',
      service: 'security-service',
      timestamp: '2024-01-15 14:15:30',
      description: 'Daily security scan completed successfully',
      acknowledged: false,
      assignedTo: null
    }
  ]);

  const [alertRules, setAlertRules] = useState([
    {
      id: 1,
      name: 'CPU Usage Alert',
      condition: 'cpu_usage > 85%',
      severity: 'warning',
      enabled: true,
      service: 'all',
      cooldown: 300
    },
    {
      id: 2,
      name: 'Memory Usage Alert',
      condition: 'memory_usage > 90%',
      severity: 'critical',
      enabled: true,
      service: 'all',
      cooldown: 180
    },
    {
      id: 3,
      name: 'Database Connection Alert',
      condition: 'db_connections > 80%',
      severity: 'warning',
      enabled: true,
      service: 'database-service',
      cooldown: 600
    },
    {
      id: 4,
      name: 'API Response Time Alert',
      condition: 'response_time > 500ms',
      severity: 'warning',
      enabled: true,
      service: 'api-gateway',
      cooldown: 300
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    emailEnabled: true,
    smsEnabled: false,
    slackEnabled: true,
    webhookEnabled: false,
    criticalAlerts: true,
    warningAlerts: true,
    infoAlerts: false
  });

  const [escalationPolicies, setEscalationPolicies] = useState([
    {
      id: 1,
      name: 'Critical Infrastructure',
      levels: [
        { level: 1, delay: 0, contacts: ['admin@transbot.ai'] },
        { level: 2, delay: 300, contacts: ['admin@transbot.ai', 'dev@transbot.ai'] },
        { level: 3, delay: 900, contacts: ['admin@transbot.ai', 'dev@transbot.ai', 'ops@transbot.ai'] }
      ]
    },
    {
      id: 2,
      name: 'Standard Operations',
      levels: [
        { level: 1, delay: 300, contacts: ['dev@transbot.ai'] },
        { level: 2, delay: 900, contacts: ['dev@transbot.ai', 'admin@transbot.ai'] }
      ]
    }
  ]);

  const handleAlertAcknowledge = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true, assignedTo: 'admin@transbot.ai' }
        : alert
    ));
  };

  const handleAlertResolve = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' }
        : alert
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP Alert Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage alerts, notifications, and incident response
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Alert Rule
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Active Alerts</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">2</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Critical</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">1</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Resolved</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">2</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Rules</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">4</p>
              </div>
              <Bell className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="rules">Rules</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="escalation">Escalation</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          {/* Alert Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Alert Filters
              </CardTitle>
              <CardDescription>
                Filter and search through alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="alertSeverity">Severity</Label>
                  <Select defaultValue="ALL">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alertStatus">Status</Label>
                  <Select defaultValue="ALL">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alertService">Service</Label>
                  <Select defaultValue="ALL">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Services</SelectItem>
                      <SelectItem value="database-service">Database Service</SelectItem>
                      <SelectItem value="api-gateway">API Gateway</SelectItem>
                      <SelectItem value="security-service">Security Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alertSearch">Search</Label>
                  <Input id="alertSearch" placeholder="Search alerts..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alert List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Active Alerts
              </CardTitle>
              <CardDescription>
                Current system alerts and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(alert.severity)}>
                          {getSeverityIcon(alert.severity)}
                          <span className="ml-1">{alert.severity.toUpperCase()}</span>
                        </Badge>
                        <Badge variant={alert.status === 'active' ? 'default' : 'secondary'}>
                          {alert.status}
                        </Badge>
                        <Badge variant="outline">{alert.service}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!alert.acknowledged && (
                          <Button size="sm" variant="outline" onClick={() => handleAlertAcknowledge(alert.id)}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Acknowledge
                          </Button>
                        )}
                        {alert.status === 'active' && (
                          <Button size="sm" variant="outline" onClick={() => handleAlertResolve(alert.id)}>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolve
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-3">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {alert.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{alert.timestamp}</span>
                      {alert.assignedTo && (
                        <span>Assigned to: {alert.assignedTo}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          {/* Alert Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Alert Rules
              </CardTitle>
              <CardDescription>
                Configure alert conditions and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Badge className={getSeverityColor(rule.severity)}>
                          {getSeverityIcon(rule.severity)}
                          <span className="ml-1">{rule.severity.toUpperCase()}</span>
                        </Badge>
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge variant="outline">{rule.service}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={rule.enabled} />
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Condition</p>
                        <p className="font-mono text-xs">{rule.condition}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Cooldown</p>
                        <p className="font-medium">{rule.cooldown}s</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Status</p>
                        <p className="font-medium">{rule.enabled ? 'Enabled' : 'Disabled'}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create New Rule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Alert Rule
              </CardTitle>
              <CardDescription>
                Create a new alert rule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ruleName">Rule Name</Label>
                  <Input id="ruleName" placeholder="Enter rule name" />
                </div>
                <div>
                  <Label htmlFor="ruleSeverity">Severity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ruleService">Service</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      <SelectItem value="database-service">Database Service</SelectItem>
                      <SelectItem value="api-gateway">API Gateway</SelectItem>
                      <SelectItem value="security-service">Security Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ruleCooldown">Cooldown (seconds)</Label>
                  <Input id="ruleCooldown" type="number" placeholder="300" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="ruleCondition">Condition</Label>
                  <Textarea
                    id="ruleCondition"
                    placeholder="Enter alert condition (e.g., cpu_usage > 85%)"
                    rows={2}
                  />
                </div>
              </div>
              <Button className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Create Rule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Configure how alerts are delivered
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Channels */}
              <div>
                <h4 className="font-medium mb-3">Notification Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Send alerts via email</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.emailEnabled}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, emailEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Slack Notifications</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Send alerts to Slack channels</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.slackEnabled}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, slackEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Send alerts via SMS</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.smsEnabled}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, smsEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium">Webhook Notifications</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Send alerts to webhook endpoints</p>
                      </div>
                    </div>
                    <Switch
                      checked={notificationSettings.webhookEnabled}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, webhookEnabled: checked }))}
                    />
                  </div>
                </div>
              </div>

              {/* Alert Types */}
              <div>
                <h4 className="font-medium mb-3">Alert Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="criticalAlerts">Critical Alerts</Label>
                    <Switch
                      id="criticalAlerts"
                      checked={notificationSettings.criticalAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, criticalAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="warningAlerts">Warning Alerts</Label>
                    <Switch
                      id="warningAlerts"
                      checked={notificationSettings.warningAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, warningAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="infoAlerts">Info Alerts</Label>
                    <Switch
                      id="infoAlerts"
                      checked={notificationSettings.infoAlerts}
                      onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, infoAlerts: checked }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Notification History
              </CardTitle>
              <CardDescription>
                Recent notification delivery history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, type: 'Email', recipient: 'admin@transbot.ai', alert: 'High CPU Usage', time: '2 minutes ago', status: 'delivered' },
                  { id: 2, type: 'Slack', recipient: '#alerts', alert: 'Database Connection Pool', time: '5 minutes ago', status: 'delivered' },
                  { id: 3, type: 'SMS', recipient: '+1234567890', alert: 'Critical System Alert', time: '10 minutes ago', status: 'failed' },
                  { id: 4, type: 'Webhook', recipient: 'https://api.example.com/webhook', alert: 'Security Scan Complete', time: '15 minutes ago', status: 'delivered' }
                ].map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        notification.status === 'delivered' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{notification.type}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {notification.recipient} - {notification.alert}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{notification.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="escalation" className="space-y-6">
          {/* Escalation Policies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Escalation Policies
              </CardTitle>
              <CardDescription>
                Configure alert escalation procedures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {escalationPolicies.map((policy) => (
                  <motion.div
                    key={policy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{policy.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {policy.levels.map((level, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <Badge variant="outline">Level {level.level}</Badge>
                            <span>Delay: {level.delay}s</span>
                          </div>
                          <div className="text-slate-600 dark:text-slate-400">
                            {level.contacts.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create Escalation Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create Escalation Policy
              </CardTitle>
              <CardDescription>
                Create a new escalation policy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="policyName">Policy Name</Label>
                  <Input id="policyName" placeholder="Enter policy name" />
                </div>
                <div>
                  <Label htmlFor="policyDescription">Description</Label>
                  <Textarea
                    id="policyDescription"
                    placeholder="Enter policy description"
                    rows={2}
                  />
                </div>
                <div className="space-y-3">
                  <Label>Escalation Levels</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Delay (seconds)" type="number" className="w-32" />
                      <Input placeholder="Contacts (comma-separated)" className="flex-1" />
                      <Button size="sm" variant="outline">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MCPAlertCenterPage;
