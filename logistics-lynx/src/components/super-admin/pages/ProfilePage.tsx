import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  User, Shield, Bell, Globe, Key, Camera, Edit, Save, 
  Trash2, Download, Upload, Eye, EyeOff, Lock, Unlock,
  Activity, Clock, MapPin, Mail, Phone, Building2,
  CheckCircle, AlertTriangle, Info, Settings, Palette,
  Moon, Sun, Monitor, Smartphone, Tablet, Wifi,
  ShieldCheck, Fingerprint, Smartphone as Mobile, 
  Calendar, Award, Trophy, Star, Zap, Brain,
  TrendingUp, AlertCircle, RefreshCw, Plus, X,
  ChevronRight, Download as DownloadIcon, Upload as UploadIcon,
  ShieldX, UserCheck, UserX, Database, Network, HardDrive,
  Cpu, Memory, HardDriveIcon, WifiOff, Globe as GlobeIcon,
  Languages, Volume2, VolumeX, BellOff, BellRing,
  Palette as ThemeIcon, Eye as VisibilityIcon, EyeOff as VisibilityOffIcon
} from 'lucide-react';

// Import MCP Design System
import '@/styles/mcp-design-system.css';

const ProfilePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  // Enhanced mock user data
  const user = {
    id: 'SA-001',
    name: 'Commander Malak',
    email: 'commander.malak@transbot.ai',
    role: 'Super Administrator',
    avatar: '/api/avatar/sa-001',
    phone: '+1 (555) 123-4567',
    location: 'Command Center, TransBot HQ',
    department: 'System Administration',
    joinDate: '2024-01-15',
    lastLogin: '2024-12-19 14:30:00',
    status: 'active',
    permissions: ['full_access', 'user_management', 'system_config', 'analytics'],
    securityLevel: 'maximum',
    twoFactorEnabled: true,
    sessionTimeout: 30,
    activityScore: 98.5,
    totalLogins: 1247,
    securityScore: 95,
    uptime: 99.9,
    lastBackup: '2024-12-19 12:00:00',
    theme: 'auto',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      sms: false,
      security: true,
      system: true,
      updates: false
    },
    preferences: {
      autoSave: true,
      compactMode: false,
      showTutorials: true,
      enableSounds: false,
      enableAnimations: true
    }
  };

  const recentActivity = [
    { id: 1, action: 'System configuration updated', time: '2 minutes ago', type: 'config', severity: 'info' },
    { id: 2, action: 'User permissions modified', time: '15 minutes ago', type: 'security', severity: 'warning' },
    { id: 3, action: 'Analytics report generated', time: '1 hour ago', type: 'analytics', severity: 'success' },
    { id: 4, action: 'Backup completed successfully', time: '3 hours ago', type: 'system', severity: 'success' },
    { id: 5, action: 'New user account created', time: '5 hours ago', type: 'user', severity: 'info' },
    { id: 6, action: 'Security scan completed', time: '6 hours ago', type: 'security', severity: 'success' },
    { id: 7, action: 'Database optimization', time: '8 hours ago', type: 'system', severity: 'info' },
    { id: 8, action: 'API endpoint deployed', time: '12 hours ago', type: 'config', severity: 'success' }
  ];

  const securityLogs = [
    { id: 1, event: 'Login successful', time: '2024-12-19 14:30:00', ip: '192.168.1.100', location: 'Command Center', status: 'success' },
    { id: 2, event: 'Password changed', time: '2024-12-18 09:15:00', ip: '192.168.1.100', location: 'Command Center', status: 'success' },
    { id: 3, event: '2FA enabled', time: '2024-12-17 16:45:00', ip: '192.168.1.100', location: 'Command Center', status: 'success' },
    { id: 4, event: 'Failed login attempt', time: '2024-12-16 11:20:00', ip: '203.45.67.89', location: 'Unknown', status: 'error' },
    { id: 5, event: 'Session timeout', time: '2024-12-15 23:30:00', ip: '192.168.1.100', location: 'Command Center', status: 'warning' },
    { id: 6, event: 'Security scan initiated', time: '2024-12-15 20:00:00', ip: '192.168.1.100', location: 'Command Center', status: 'info' },
    { id: 7, event: 'Backup verification', time: '2024-12-15 18:30:00', ip: '192.168.1.100', location: 'Command Center', status: 'success' },
    { id: 8, event: 'Permission escalation', time: '2024-12-15 16:45:00', ip: '192.168.1.100', location: 'Command Center', status: 'warning' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'config': return <Settings className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'analytics': return <Activity className="w-4 h-4" />;
      case 'system': return <Zap className="w-4 h-4" />;
      case 'user': return <User className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'config': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'security': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'analytics': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'system': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'user': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'error': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <X className="w-4 h-4 text-red-600" />;
      case 'info': return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsEditing(false);
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
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-white/20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full animate-pulse border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      {user.name}
                    </h1>
                    <p className="text-lg text-blue-100 mt-2">
                      {user.role} • {user.department}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        <Shield className="w-3 h-3 mr-1" />
                        {user.securityLevel} Security
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        <Brain className="w-3 h-3 mr-1" />
                        AI Enhanced
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={() => setShowAvatarDialog(true)}
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Change Avatar
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-5 h-5 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
                {isEditing && (
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5 mr-2" />
                    )}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50">
                  <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{user.activityScore}%</p>
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Activity Score</p>
                  <p className="text-xs text-green-600 font-medium">+2.3% this week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/50">
                  <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-900 dark:text-green-100">{user.securityScore}%</p>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300">Security Score</p>
                  <p className="text-xs text-green-600 font-medium">Excellent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/50">
                  <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{user.uptime}%</p>
                  <p className="text-sm font-medium text-purple-700 dark:text-purple-300">System Uptime</p>
                  <p className="text-xs text-green-600 font-medium">Optimal</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900/50">
                  <User className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">{user.totalLogins}</p>
                  <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Total Logins</p>
                  <p className="text-xs text-green-600 font-medium">+12 today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs Navigation */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center space-x-2">
                  <Activity className="w-4 h-4" />
                  <span>Activity</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center space-x-2">
                  <Key className="w-4 h-4" />
                  <span>Advanced</span>
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-blue-600" />
                        <span>Personal Information</span>
                      </CardTitle>
                      <CardDescription>Your basic profile details and contact information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={user.name} 
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            value={user.email} 
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={user.phone} 
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            value={user.location} 
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department" 
                          value={user.department} 
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Account Statistics */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span>Account Statistics</span>
                      </CardTitle>
                      <CardDescription>Your account performance and usage metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Account Age</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {Math.floor((new Date().getTime() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        </div>
                        <Progress value={user.activityScore} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Security Level</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {user.securityLevel}
                          </Badge>
                        </div>
                        <Progress value={user.securityScore} className="h-2" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Last Login</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {new Date(user.lastLogin).toLocaleTimeString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Security Settings */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span>Security Settings</span>
                      </CardTitle>
                      <CardDescription>Manage your account security and authentication</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
                        </div>
                        <Switch checked={user.twoFactorEnabled} />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Session Timeout</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Auto-logout after inactivity</p>
                        </div>
                        <Select value={user.sessionTimeout.toString()}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowSecurityDialog(true)}
                      >
                        <Key className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Security Logs */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span>Recent Security Events</span>
                      </CardTitle>
                      <CardDescription>Your recent security-related activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {securityLogs.slice(0, 5).map((log) => (
                          <div key={log.id} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                            {getStatusIcon(log.status)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{log.event}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {log.time} • {log.ip} • {log.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5 text-purple-600" />
                      <span>Recent Activity</span>
                    </CardTitle>
                    <CardDescription>Your recent actions and system interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                          <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                            {getActivityIcon(activity.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{activity.action}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                          </div>
                          <Badge className={`text-xs ${getSeverityColor(activity.severity)}`}>
                            {activity.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preferences Tab */}
              <TabsContent value="preferences" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Display Preferences */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <ThemeIcon className="w-5 h-5 text-blue-600" />
                        <span>Display Preferences</span>
                      </CardTitle>
                      <CardDescription>Customize your interface appearance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Theme</Label>
                        <Select value={user.theme}>
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
                      <div>
                        <Label className="text-sm font-medium">Language</Label>
                        <Select value={user.language}>
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
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Compact Mode</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Reduce spacing and padding</p>
                        </div>
                        <Switch checked={user.preferences.compactMode} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Enable Animations</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Show interface animations</p>
                        </div>
                        <Switch checked={user.preferences.enableAnimations} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* System Preferences */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5 text-green-600" />
                        <span>System Preferences</span>
                      </CardTitle>
                      <CardDescription>Configure system behavior and features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Auto Save</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Automatically save changes</p>
                        </div>
                        <Switch checked={user.preferences.autoSave} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Show Tutorials</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Display helpful tips</p>
                        </div>
                        <Switch checked={user.preferences.showTutorials} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-sm font-medium">Enable Sounds</Label>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Play system sounds</p>
                        </div>
                        <Switch checked={user.preferences.enableSounds} />
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
                      <Bell className="w-5 h-5 text-orange-600" />
                      <span>Notification Preferences</span>
                    </CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <div>
                            <Label className="text-sm font-medium">Email Notifications</Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Receive updates via email</p>
                          </div>
                        </div>
                        <Switch checked={user.notifications.email} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-green-600" />
                          <div>
                            <Label className="text-sm font-medium">Push Notifications</Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Browser push notifications</p>
                          </div>
                        </div>
                        <Switch checked={user.notifications.push} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <Mobile className="w-5 h-5 text-purple-600" />
                          <div>
                            <Label className="text-sm font-medium">SMS Notifications</Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Text message alerts</p>
                          </div>
                        </div>
                        <Switch checked={user.notifications.sms} />
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-red-600" />
                          <div>
                            <Label className="text-sm font-medium">Security Alerts</Label>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Critical security notifications</p>
                          </div>
                        </div>
                        <Switch checked={user.notifications.security} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Account Management */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Key className="w-5 h-5 text-red-600" />
                        <span>Account Management</span>
                      </CardTitle>
                      <CardDescription>Advanced account settings and actions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full">
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                      <Button variant="outline" className="w-full">
                        <UploadIcon className="w-4 h-4 mr-2" />
                        Import Data
                      </Button>
                      <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>

                  {/* System Information */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        <span>System Information</span>
                      </CardTitle>
                      <CardDescription>Technical details about your account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">User ID</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{user.id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Join Date</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Last Backup</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(user.lastBackup).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Dialogs */}
        <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Profile Picture</DialogTitle>
              <DialogDescription>
                Upload a new profile picture. Supported formats: JPG, PNG, GIF (max 5MB)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-slate-500" />
                    <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, GIF up to 5MB</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAvatarDialog(false)}>
                Cancel
              </Button>
              <Button>Upload Picture</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showSecurityDialog} onOpenChange={setShowSecurityDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Change Password</DialogTitle>
              <DialogDescription>
                Enter your current password and choose a new one
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="current-password" 
                    type={showPassword ? "text" : "password"}
                    className="mt-1 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSecurityDialog(false)}>
                Cancel
              </Button>
              <Button>Change Password</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove all data.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="delete-confirmation">Type "DELETE" to confirm</Label>
                <Input 
                  id="delete-confirmation" 
                  placeholder="DELETE"
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive">Delete Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default ProfilePage;
