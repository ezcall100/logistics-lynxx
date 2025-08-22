import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Settings, Shield, Database, Network, Bell, Globe, 
  Zap, Brain, Activity, Users, Lock, Unlock,
  CheckCircle, AlertTriangle, Info, Save, RefreshCw,
  Trash2, Download, Upload, Eye, EyeOff, Key,
  Server, HardDrive, Wifi, Cpu, Memory, HardDriveIcon,
  ShieldCheck, Fingerprint, Smartphone, Monitor, 
  Calendar, Clock, Target, Award, Trophy, Star,
  Cog, Wrench, Palette, Sun, Moon, Smartphone as Mobile,
  Building2, Globe2, ShieldX, UserCheck, UserX,
  TrendingUp, TrendingDown, BarChart3, PieChart, Code,
  Rocket, AlertCircle, Plus, X, ChevronRight, ChevronDown,
  Database as DatabaseIcon, Network as NetworkIcon, 
  HardDrive as StorageIcon, Cpu as CpuIcon,
  Wifi as NetworkStatusIcon, Shield as SecurityIcon,
  Activity as PerformanceIcon, Users as UserIcon,
  Settings as ConfigIcon, Bell as NotificationIcon,
  Globe as InternationalIcon, Palette as ThemeIcon,
  Zap as AutomationIcon, Brain as AIIcon, 
  Save as BackupIcon, RefreshCw as SyncIcon,
  Clock as ScheduleIcon, Target as GoalIcon,
  TrendingUp as AnalyticsIcon, BarChart3 as ReportsIcon
} from 'lucide-react';

// Import MCP Design System
import '../../styles/mcp-design-system.css';

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [aiAssistance, setAiAssistance] = useState(true);
  const [performanceMode, setPerformanceMode] = useState('balanced');
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);

  // Enhanced mock system data
  const systemStats = {
    cpu: 68,
    memory: 72,
    storage: 45,
    network: 89,
    uptime: '15 days, 7 hours, 32 minutes',
    version: 'v2.1.4',
    lastUpdate: '2024-12-15 10:30:00',
    totalUsers: 1247,
    activeSessions: 89,
    securityScore: 95,
    performanceScore: 88,
    backupStatus: 'healthy',
    lastBackup: '2024-12-19 02:00:00',
    nextBackup: '2024-12-20 02:00:00'
  };

  const securityPolicies = [
    { id: 1, name: 'Password Policy', status: 'enabled', description: 'Enforce strong password requirements', priority: 'high' },
    { id: 2, name: 'Session Management', status: 'enabled', description: 'Control user session timeouts', priority: 'medium' },
    { id: 3, name: 'IP Whitelist', status: 'disabled', description: 'Restrict access to specific IP addresses', priority: 'low' },
    { id: 4, name: 'Rate Limiting', status: 'enabled', description: 'Prevent brute force attacks', priority: 'high' },
    { id: 5, name: 'Data Encryption', status: 'enabled', description: 'Encrypt sensitive data at rest', priority: 'critical' },
    { id: 6, name: 'Two-Factor Auth', status: 'enabled', description: 'Require 2FA for all users', priority: 'high' },
    { id: 7, name: 'Audit Logging', status: 'enabled', description: 'Track all system activities', priority: 'medium' },
    { id: 8, name: 'Vulnerability Scan', status: 'enabled', description: 'Automated security scanning', priority: 'high' }
  ];

  const automationRules = [
    { id: 1, name: 'Auto Backup', status: 'active', schedule: 'Daily at 2:00 AM', type: 'backup', lastRun: '2024-12-19 02:00:00', nextRun: '2024-12-20 02:00:00' },
    { id: 2, name: 'Performance Monitoring', status: 'active', schedule: 'Every 5 minutes', type: 'monitoring', lastRun: '2024-12-19 14:25:00', nextRun: '2024-12-19 14:30:00' },
    { id: 3, name: 'Security Scan', status: 'active', schedule: 'Weekly on Sunday', type: 'security', lastRun: '2024-12-15 03:00:00', nextRun: '2024-12-22 03:00:00' },
    { id: 4, name: 'Log Cleanup', status: 'inactive', schedule: 'Monthly', type: 'maintenance', lastRun: '2024-11-30 01:00:00', nextRun: '2024-12-31 01:00:00' },
    { id: 5, name: 'User Sync', status: 'active', schedule: 'Every hour', type: 'sync', lastRun: '2024-12-19 14:00:00', nextRun: '2024-12-19 15:00:00' },
    { id: 6, name: 'Database Optimization', status: 'active', schedule: 'Daily at 4:00 AM', type: 'maintenance', lastRun: '2024-12-19 04:00:00', nextRun: '2024-12-20 04:00:00' },
    { id: 7, name: 'Analytics Processing', status: 'active', schedule: 'Every 30 minutes', type: 'analytics', lastRun: '2024-12-19 14:00:00', nextRun: '2024-12-19 14:30:00' },
    { id: 8, name: 'Health Check', status: 'active', schedule: 'Every 10 minutes', type: 'monitoring', lastRun: '2024-12-19 14:20:00', nextRun: '2024-12-19 14:30:00' }
  ];

  const getAutomationIcon = (type: string) => {
    switch (type) {
      case 'backup': return <BackupIcon className="w-4 h-4" />;
      case 'monitoring': return <PerformanceIcon className="w-4 h-4" />;
      case 'security': return <SecurityIcon className="w-4 h-4" />;
      case 'maintenance': return <Wrench className="w-4 h-4" />;
      case 'sync': return <SyncIcon className="w-4 h-4" />;
      case 'analytics': return <AnalyticsIcon className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const getAutomationColor = (type: string) => {
    switch (type) {
      case 'backup': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'monitoring': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'security': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'maintenance': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'sync': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30';
      case 'analytics': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'high': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const handleSaveAll = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <TooltipProvider>
      <div className="p-6 space-y-8">
        {/* Enhanced Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-8 text-white">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      System Settings
                    </h1>
                    <p className="text-lg text-blue-100 mt-2">
                      Configure system behavior, security, and automation
                    </p>
                  </div>
                </div>
                
                {/* System Status Indicators */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">System Operational</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm font-medium">v{systemStats.version}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm font-medium">{systemStats.uptime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={() => setShowBackupDialog(true)}
                >
                  <BackupIcon className="w-5 h-5 mr-2" />
                  Backup Now
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Refresh
                </Button>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl"
                  onClick={handleSaveAll}
                  disabled={loading}
                >
                  {loading ? (
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5 mr-2" />
                  )}
                  {loading ? 'Saving...' : 'Save All Changes'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <CpuIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{systemStats.cpu}%</p>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">CPU Usage</p>
                  <p className="text-xs text-green-600 font-medium">Optimal</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/50">
                  <MemoryIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{systemStats.memory}%</p>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Memory Usage</p>
                  <p className="text-xs text-green-600 font-medium">Efficient</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/50">
                  <StorageIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{systemStats.storage}%</p>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Storage Used</p>
                  <p className="text-xs text-green-600 font-medium">Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/50">
                  <NetworkStatusIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{systemStats.network}%</p>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Network</p>
                  <p className="text-xs text-green-600 font-medium">High Bandwidth</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Navigation */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-7 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="automation" className="flex items-center space-x-2">
                  <AutomationIcon className="w-4 h-4" />
                  <span>Automation</span>
                </TabsTrigger>
                <TabsTrigger value="performance" className="flex items-center space-x-2">
                  <PerformanceIcon className="w-4 h-4" />
                  <span>Performance</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <NotificationIcon className="w-4 h-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center space-x-2">
                  <ThemeIcon className="w-4 h-4" />
                  <span>Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center space-x-2">
                  <Cog className="w-4 h-4" />
                  <span>Advanced</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* System Information */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Server className="w-5 h-5 text-blue-600" />
                        <span>System Information</span>
                      </CardTitle>
                      <CardDescription>Current system status and configuration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Version</Label>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{systemStats.version}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Uptime</Label>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{systemStats.uptime}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Total Users</Label>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{systemStats.totalUsers.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Active Sessions</Label>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{systemStats.activeSessions}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Security Score</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {systemStats.securityScore}%
                          </Badge>
                        </div>
                        <Progress value={systemStats.securityScore} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Performance Score</span>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {systemStats.performanceScore}%
                          </Badge>
                        </div>
                        <Progress value={systemStats.performanceScore} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Backup Status */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BackupIcon className="w-5 h-5 text-green-600" />
                        <span>Backup Status</span>
                      </CardTitle>
                      <CardDescription>System backup configuration and status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Status</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {systemStats.backupStatus}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Last Backup</span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {new Date(systemStats.lastBackup).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Next Backup</span>
                          <span className="text-slate-600 dark:text-slate-400">
                            {new Date(systemStats.nextBackup).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Auto Backup</span>
                          <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">AI Assistance</span>
                          <Switch checked={aiAssistance} onCheckedChange={setAiAssistance} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span>Security Policies</span>
                    </CardTitle>
                    <CardDescription>Configure and manage security policies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {securityPolicies.map((policy) => (
                        <div key={policy.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${getPriorityColor(policy.priority)}`}>
                              <Shield className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{policy.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{policy.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${
                              policy.status === 'enabled' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                            }`}>
                              {policy.status}
                            </Badge>
                            <Switch checked={policy.status === 'enabled'} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Automation Tab */}
              <TabsContent value="automation" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AutomationIcon className="w-5 h-5 text-purple-600" />
                      <span>Automation Rules</span>
                    </CardTitle>
                    <CardDescription>Manage automated system tasks and schedules</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {automationRules.map((rule) => (
                        <div key={rule.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${getAutomationColor(rule.type)}`}>
                              {getAutomationIcon(rule.type)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{rule.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {rule.schedule} • Last: {new Date(rule.lastRun).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${
                              rule.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                            }`}>
                              {rule.status}
                            </Badge>
                            <Switch checked={rule.status === 'active'} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Settings */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PerformanceIcon className="w-5 h-5 text-blue-600" />
                        <span>Performance Settings</span>
                      </CardTitle>
                      <CardDescription>Optimize system performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Performance Mode</Label>
                        <Select value={performanceMode} onValueChange={setPerformanceMode}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="power-saver">Power Saver</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="performance">Performance</SelectItem>
                            <SelectItem value="turbo">Turbo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Auto Optimization</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Background Processing</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Cache Management</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Resource Monitoring */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-green-600" />
                        <span>Resource Monitoring</span>
                      </CardTitle>
                      <CardDescription>Real-time resource usage</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">CPU Usage</span>
                          <span className="text-sm font-medium">{systemStats.cpu}%</span>
                        </div>
                        <Progress value={systemStats.cpu} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Memory Usage</span>
                          <span className="text-sm font-medium">{systemStats.memory}%</span>
                        </div>
                        <Progress value={systemStats.memory} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Storage Usage</span>
                          <span className="text-sm font-medium">{systemStats.storage}%</span>
                        </div>
                        <Progress value={systemStats.storage} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <NotificationIcon className="w-5 h-5 text-orange-600" />
                      <span>Notification Settings</span>
                    </CardTitle>
                    <CardDescription>Configure system notifications and alerts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <div>
                            <Label className="text-sm font-medium">Critical Alerts</Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">System failures and errors</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-5 h-5 text-yellow-600" />
                          <div>
                            <Label className="text-sm font-medium">Warning Alerts</Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Performance warnings</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <Info className="w-5 h-5 text-blue-600" />
                          <div>
                            <Label className="text-sm font-medium">Info Notifications</Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">General system updates</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <Label className="text-sm font-medium">Success Notifications</Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Completed operations</p>
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Theme Settings */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <ThemeIcon className="w-5 h-5 text-purple-600" />
                        <span>Theme Settings</span>
                      </CardTitle>
                      <CardDescription>Customize the interface appearance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Theme Mode</Label>
                        <Select value={isDarkMode ? 'dark' : 'light'} onValueChange={(value) => setIsDarkMode(value === 'dark')}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Compact Mode</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Show Animations</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">High Contrast</span>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Language & Region */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <InternationalIcon className="w-5 h-5 text-blue-600" />
                        <span>Language & Region</span>
                      </CardTitle>
                      <CardDescription>Localization settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Time Zone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="est">EST</SelectItem>
                            <SelectItem value="pst">PST</SelectItem>
                            <SelectItem value="gmt">GMT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Date Format</Label>
                        <Select defaultValue="mm-dd-yyyy">
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* System Maintenance */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Wrench className="w-5 h-5 text-orange-600" />
                        <span>System Maintenance</span>
                      </CardTitle>
                      <CardDescription>Advanced system operations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Clear Cache
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Database className="w-4 h-4 mr-2" />
                        Optimize Database
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clean Logs
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export Configuration
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Developer Options */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Code className="w-5 h-5 text-purple-600" />
                        <span>Developer Options</span>
                      </CardTitle>
                      <CardDescription>Advanced development settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Debug Mode</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Verbose Logging</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">API Testing</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Performance Profiling</span>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Dialogs */}
        <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Manual Backup</DialogTitle>
              <DialogDescription>
                Create a manual backup of the system configuration and data
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Backup Type</Label>
                <Select defaultValue="full">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Backup</SelectItem>
                    <SelectItem value="config">Configuration Only</SelectItem>
                    <SelectItem value="data">Data Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <Input 
                  placeholder="Optional backup description"
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
                Cancel
              </Button>
              <Button>Start Backup</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default SettingsPage;
