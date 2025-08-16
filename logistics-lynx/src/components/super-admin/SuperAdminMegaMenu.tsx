/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Settings, 
  ChevronDown, 
  Users, 
  Shield, 
  Database, 
  Network, 
  Bot, 
  Zap, 
  Globe, 
  Monitor, 
  BarChart3, 
  FileText,
  Key,
  Bell,
  Palette,
  Code,
  Server,
  Cloud,
  Lock,
  Activity,
  GitBranch,
  Webhook,
  Cpu,
  HardDrive,
  Wifi,
  Database as DatabaseIcon,
  Settings as SettingsIcon,
  UserCheck,
  Eye,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Save,
  Search,
  Filter,
  MoreHorizontal,
  CircleDollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuperAdminMegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('general');

  if (!isOpen) return null;

  const systemStatus = {
    overall: 'operational',
    uptime: '99.95%',
    lastCheck: '2 minutes ago',
    alerts: 3,
    warnings: 7
  };

  const quickActions = [
    { name: 'Add User', icon: Plus, color: 'text-green-600', action: () => console.log('Add User') },
    { name: 'System Backup', icon: Download, color: 'text-blue-600', action: () => console.log('System Backup') },
    { name: 'Security Scan', icon: Shield, color: 'text-red-600', action: () => console.log('Security Scan') },
    { name: 'Performance Test', icon: Zap, color: 'text-yellow-600', action: () => console.log('Performance Test') }
  ];

  const recentActivities = [
    { action: 'User login', user: 'admin@company.com', time: '2 min ago', status: 'success' },
    { action: 'System backup', user: 'automated', time: '15 min ago', status: 'success' },
    { action: 'Security alert', user: 'system', time: '1 hour ago', status: 'warning' },
    { action: 'Database update', user: 'automated', time: '2 hours ago', status: 'success' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute top-16 right-4 w-[95vw] max-w-7xl max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <Card className="w-full h-full shadow-2xl border-0 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-xl">
          <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Settings className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Super Admin Portal Settings</CardTitle>
                  <CardDescription>Comprehensive system configuration and management</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={systemStatus.overall === 'operational' ? 'default' : 'destructive'}>
                  {systemStatus.overall === 'operational' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {systemStatus.overall}
                </Badge>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 h-full overflow-hidden">
            <div className="grid grid-cols-12 h-full">
              {/* Left Sidebar - Navigation */}
              <div className="col-span-3 border-r border-border/50 bg-muted/20">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent border-0 p-4 space-y-2">
                    <TabsTrigger 
                      value="general" 
                      className="justify-start h-auto p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      General Settings
                    </TabsTrigger>
                    <TabsTrigger 
                      value="users" 
                      className="justify-start h-auto p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      User Management
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="justify-start h-auto p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Security & Access
                    </TabsTrigger>
                    <TabsTrigger 
                      value="system" 
                      className="justify-start h-auto p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Server className="h-4 w-4 mr-2" />
                      System Configuration
                    </TabsTrigger>
                    <TabsTrigger 
                      value="integrations" 
                      className="justify-start h-auto p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Network className="h-4 w-4 mr-2" />
                      Integrations
                    </TabsTrigger>
                    <TabsTrigger 
                      value="ai" 
                      className="justify-start h-auto p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Bot className="h-4 w-4 mr-2" />
                      AI & Automation
                    </TabsTrigger>
                    <TabsTrigger 
                      value="monitoring" 
                      className="justify-start h-auto p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Monitor className="h-4 w-4 mr-2" />
                      Monitoring & Analytics
                    </TabsTrigger>
                    <TabsTrigger 
                      value="backup" 
                      className="justify-start h-auto p-3 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                    >
                      <Database className="h-4 w-4 mr-2" />
                      Backup & Recovery
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Main Content Area */}
              <div className="col-span-9 p-6 overflow-y-auto">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  
                  {/* General Settings Tab */}
                  <TabsContent value="general" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* System Overview */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            System Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <div className="text-2xl font-bold text-green-600">{systemStatus.uptime}</div>
                              <div className="text-sm text-muted-foreground">Uptime</div>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">{systemStatus.alerts}</div>
                              <div className="text-sm text-muted-foreground">Active Alerts</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>System Health</span>
                              <span>95%</span>
                            </div>
                            <Progress value={95} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Quick Actions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            {quickActions.map((action, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="justify-start h-auto p-3"
                                onClick={action.action}
                              >
                                <action.icon className={`h-4 w-4 mr-2 ${action.color}`} />
                                {action.name}
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Activity */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Recent Activity
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {recentActivities.map((activity, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="text-xs">
                                      {activity.user.split('@')[0].charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-sm">{activity.action}</div>
                                    <div className="text-xs text-muted-foreground">{activity.user}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant={activity.status === 'success' ? 'default' : 'secondary'}>
                                    {activity.status === 'success' ? (
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                    ) : (
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                    )}
                                    {activity.status}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* User Management Tab */}
                  <TabsContent value="users" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* User Statistics */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            User Statistics
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold">2,847</div>
                              <div className="text-sm text-muted-foreground">Total Users</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold">156</div>
                              <div className="text-sm text-muted-foreground">Active Today</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>User Growth</span>
                              <span>+12.5%</span>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Role Management */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5" />
                            Role Management
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            {['Super Admin', 'Admin', 'Manager', 'User', 'Guest'].map((role, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                <span className="text-sm font-medium">{role}</span>
                                <Badge variant="outline">{Math.floor(Math.random() * 500) + 50}</Badge>
                              </div>
                            ))}
                          </div>
                          <Button className="w-full" size="sm">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Role
                          </Button>
                        </CardContent>
                      </Card>

                      {/* User Search */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Search className="h-5 w-5" />
                            Find Users
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <Input placeholder="Search users..." />
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Filter by role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="guest">Guest</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button className="w-full" size="sm">
                              <Search className="h-4 w-4 mr-2" />
                              Search
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Security & Access Tab */}
                  <TabsContent value="security" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Security Settings */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Two-Factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Session Timeout</Label>
                                <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>IP Whitelist</Label>
                                <p className="text-sm text-muted-foreground">Restrict access by IP</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Audit Logging</Label>
                                <p className="text-sm text-muted-foreground">Log all user actions</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Access Control */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5" />
                            Access Control
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                              <div>
                                <div className="font-medium">API Access</div>
                                <div className="text-sm text-muted-foreground">External API connections</div>
                              </div>
                              <Badge variant="default">Enabled</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                              <div>
                                <div className="font-medium">Database Access</div>
                                <div className="text-sm text-muted-foreground">Direct database connections</div>
                              </div>
                              <Badge variant="secondary">Restricted</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                              <div>
                                <div className="font-medium">File Upload</div>
                                <div className="text-sm text-muted-foreground">User file uploads</div>
                              </div>
                              <Badge variant="default">Enabled</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* System Configuration Tab */}
                  <TabsContent value="system" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Server Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Server className="h-5 w-5" />
                            Server Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div>
                              <Label>Server Environment</Label>
                              <Select defaultValue="production">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="development">Development</SelectItem>
                                  <SelectItem value="staging">Staging</SelectItem>
                                  <SelectItem value="production">Production</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Database Connection</Label>
                              <Input defaultValue="postgresql://localhost:5432/tms" />
                            </div>
                            <div>
                              <Label>Cache Configuration</Label>
                              <Select defaultValue="redis">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="redis">Redis</SelectItem>
                                  <SelectItem value="memory">In-Memory</SelectItem>
                                  <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Performance Settings */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Performance Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div>
                              <Label>Max Concurrent Users</Label>
                              <Input type="number" defaultValue="1000" />
                            </div>
                            <div>
                              <Label>Request Timeout (seconds)</Label>
                              <Input type="number" defaultValue="30" />
                            </div>
                            <div>
                              <Label>Memory Limit (MB)</Label>
                              <Input type="number" defaultValue="512" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Auto-scaling</Label>
                                <p className="text-sm text-muted-foreground">Enable automatic scaling</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Integrations Tab */}
                  <TabsContent value="integrations" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* API Integrations */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Webhook className="h-5 w-5" />
                            API Integrations
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            {[
                              { name: 'N8N Workflows', status: 'connected', icon: Webhook },
                              { name: 'GitHub API', status: 'connected', icon: GitBranch },
                              { name: 'OpenAI API', status: 'connected', icon: Bot },
                              { name: 'Supabase', status: 'connected', icon: Database },
                              { name: 'Stripe Payments', status: 'disconnected', icon: CircleDollarSign }
                            ].map((integration, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                                <div className="flex items-center gap-3">
                                  <integration.icon className="h-4 w-4" />
                                  <span className="font-medium">{integration.name}</span>
                                </div>
                                <Badge variant={integration.status === 'connected' ? 'default' : 'secondary'}>
                                  {integration.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Webhook Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Network className="h-5 w-5" />
                            Webhook Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div>
                              <Label>N8N Webhook URL</Label>
                              <Input defaultValue="https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook" />
                            </div>
                            <div>
                              <Label>Webhook Secret</Label>
                              <Input type="password" defaultValue="••••••••••••••••" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Enable Webhooks</Label>
                                <p className="text-sm text-muted-foreground">Allow external webhook calls</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <Button className="w-full" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Test Connection
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* AI & Automation Tab */}
                  <TabsContent value="ai" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* AI Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Bot className="h-5 w-5" />
                            AI Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div>
                              <Label>OpenAI API Key</Label>
                              <Input type="password" defaultValue="••••••••••••••••" />
                            </div>
                            <div>
                              <Label>AI Model</Label>
                              <Select defaultValue="gpt-4">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                                  <SelectItem value="claude-3">Claude-3</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Autonomous Mode</Label>
                                <p className="text-sm text-muted-foreground">Enable AI autonomous decisions</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Learning Mode</Label>
                                <p className="text-sm text-muted-foreground">Allow AI to learn from interactions</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Automation Rules */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Zap className="h-5 w-5" />
                            Automation Rules
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            {[
                              'Auto-scale based on load',
                              'Automated backups',
                              'Security monitoring',
                              'Performance optimization',
                              'User activity tracking'
                            ].map((rule, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded">
                                <span className="text-sm">{rule}</span>
                                <Switch defaultChecked />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Monitoring & Analytics Tab */}
                  <TabsContent value="monitoring" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* System Metrics */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            System Metrics
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>CPU Usage</span>
                                <span>45%</span>
                              </div>
                              <Progress value={45} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Memory Usage</span>
                                <span>67%</span>
                              </div>
                              <Progress value={67} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Disk Usage</span>
                                <span>23%</span>
                              </div>
                              <Progress value={23} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Network I/O</span>
                                <span>12%</span>
                              </div>
                              <Progress value={12} className="h-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Alert Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Alert Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Email Alerts</Label>
                                <p className="text-sm text-muted-foreground">Send alerts via email</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>SMS Alerts</Label>
                                <p className="text-sm text-muted-foreground">Send alerts via SMS</p>
                              </div>
                              <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Slack Integration</Label>
                                <p className="text-sm text-muted-foreground">Send alerts to Slack</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div>
                              <Label>Alert Threshold</Label>
                              <Select defaultValue="medium">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low (80%)</SelectItem>
                                  <SelectItem value="medium">Medium (90%)</SelectItem>
                                  <SelectItem value="high">High (95%)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Backup & Recovery Tab */}
                  <TabsContent value="backup" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Backup Configuration */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5" />
                            Backup Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Auto Backup</Label>
                                <p className="text-sm text-muted-foreground">Automated daily backups</p>
                              </div>
                              <Switch defaultChecked />
                            </div>
                            <div>
                              <Label>Backup Frequency</Label>
                              <Select defaultValue="daily">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hourly">Hourly</SelectItem>
                                  <SelectItem value="daily">Daily</SelectItem>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="monthly">Monthly</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label>Retention Period</Label>
                              <Select defaultValue="30">
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="7">7 days</SelectItem>
                                  <SelectItem value="30">30 days</SelectItem>
                                  <SelectItem value="90">90 days</SelectItem>
                                  <SelectItem value="365">1 year</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="flex gap-2">
                              <Button className="flex-1" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Create Backup
                              </Button>
                              <Button className="flex-1" size="sm" variant="outline">
                                <Upload className="h-4 w-4 mr-2" />
                                Restore
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recovery Options */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <RefreshCw className="h-5 w-5" />
                            Recovery Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-3">
                            <div className="p-3 bg-muted/30 rounded">
                              <div className="font-medium text-sm">Last Backup</div>
                              <div className="text-xs text-muted-foreground">2 hours ago</div>
                              <div className="text-xs text-muted-foreground">Size: 2.4 GB</div>
                            </div>
                            <div className="p-3 bg-muted/30 rounded">
                              <div className="font-medium text-sm">Backup Status</div>
                              <div className="text-xs text-muted-foreground">All systems backed up</div>
                              <Badge variant="default" className="mt-1">Healthy</Badge>
                            </div>
                            <div className="space-y-2">
                              <Button className="w-full" size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                View Backup History
                              </Button>
                              <Button className="w-full" size="sm" variant="outline">
                                <Settings className="h-4 w-4 mr-2" />
                                Configure Recovery
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminMegaMenu;
