import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import basic UI components that we know exist
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const DashboardPage: React.FC = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [systemStats] = useState({
    users: 2847,
    portals: 7,
    health: 99.9,
    security: 'A+',
    uptime: '99.9%',
    responseTime: '45ms',
    activeSessions: 1247,
    pendingApprovals: 23,
    systemAlerts: 3,
    apiRequests: 15420
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 23,
    networkUsage: 89,
    databaseConnections: 156,
    cacheHitRate: 94.2
  });

  const [securityMetrics, setSecurityMetrics] = useState({
    failedLogins: 12,
    blockedIPs: 8,
    securityScans: 156,
    vulnerabilities: 2,
    lastBackup: '2 hours ago',
    encryptionStatus: 'AES-256'
  });

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'New user registered', user: 'john.doe@company.com', time: '2 min ago', type: 'user', priority: 'low' },
    { id: 2, action: 'Security scan completed', user: 'System', time: '5 min ago', type: 'security', priority: 'medium' },
    { id: 3, action: 'Database backup completed', user: 'System', time: '15 min ago', type: 'system', priority: 'high' },
    { id: 4, action: 'Portal access granted', user: 'admin@company.com', time: '1 hour ago', type: 'access', priority: 'low' },
    { id: 5, action: 'System update deployed', user: 'System', time: '2 hours ago', type: 'update', priority: 'high' },
    { id: 6, action: 'API rate limit exceeded', user: 'api-client-3', time: '3 hours ago', type: 'warning', priority: 'medium' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'System backup completed successfully', time: '2 min ago', read: false },
    { id: 2, type: 'warning', message: 'High memory usage detected', time: '5 min ago', read: false },
    { id: 3, type: 'success', message: 'New user registration approved', time: '10 min ago', read: true },
    { id: 4, type: 'error', message: 'Database connection timeout', time: '1 hour ago', read: false }
  ]);

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Quick actions
  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // Add actual functionality here
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'security': return '🔒';
      case 'system': return '⚙️';
      case 'access': return '🚪';
      case 'update': return '🔄';
      case 'warning': return '⚠️';
      default: return '📋';
    }
  };

  return (
    <TooltipProvider>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="space-y-6 p-6">
          {/* Enhanced Header with Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl p-6 ${isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white/20'}`}>
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Super Admin Command Center</h1>
                    <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-blue-100'}`}>
                      Complete system control with real-time monitoring and advanced analytics
                    </p>
                  </div>
                </div>
                
                {/* System Status Indicators */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <Badge variant="secondary" className={`${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-white/20'}`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    System Online
                  </Badge>
                  <Badge variant="secondary" className={`${isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-white/20'}`}>
                    Security: {systemStats.security}
                  </Badge>
                  <Badge variant="secondary" className={`${isDarkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-white/20'}`}>
                    Uptime: {systemStats.uptime}
                  </Badge>
                  <Badge variant="secondary" className={`${isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-white/20'}`}>
                    Response: {systemStats.responseTime}
                  </Badge>
                </div>
              </div>

              {/* Theme Toggle and Controls */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-white hover:bg-white/20'}`}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </Button>
                
                <div className="flex bg-white/10 rounded-lg p-1">
                  {['1h', '24h', '7d', '30d'].map((range) => (
                    <Button
                      key={range}
                      variant={selectedTimeRange === range ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedTimeRange(range)}
                      className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-white'}`}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4`}
          >
            {[
              { icon: '👥', label: 'Add User', action: 'add-user' },
              { icon: '🔒', label: 'Security Scan', action: 'security-scan' },
              { icon: '💾', label: 'Backup Now', action: 'backup' },
              { icon: '📊', label: 'Generate Report', action: 'report' },
              { icon: '⚙️', label: 'System Config', action: 'config' },
              { icon: '🚨', label: 'Emergency Mode', action: 'emergency' }
            ].map((action) => (
              <Button
                key={action.action}
                variant="outline"
                onClick={() => handleQuickAction(action.action)}
                className={`h-20 flex flex-col gap-2 ${isDarkMode 
                  ? 'border-gray-600 hover:bg-gray-800' 
                  : 'border-gray-200 hover:bg-white'
                }`}
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </motion.div>

          {/* Enhanced Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-full grid-cols-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <TabsTrigger value="overview">📊 Overview</TabsTrigger>
                <TabsTrigger value="performance">⚡ Performance</TabsTrigger>
                <TabsTrigger value="security">🔒 Security</TabsTrigger>
                <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
                <TabsTrigger value="activity">🕒 Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* System Health Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: '👥', label: 'Total Users', value: systemStats.users.toLocaleString(), trend: '+12.5%', color: 'purple' },
                    { icon: '🌐', label: 'Active Portals', value: `${systemStats.portals}/${systemStats.portals}`, trend: 'All Operational', color: 'blue' },
                    { icon: '💚', label: 'System Health', value: `${systemStats.health}%`, trend: 'Optimal', color: 'green' },
                    { icon: '🔒', label: 'Security Score', value: systemStats.security, trend: 'Excellent', color: 'orange' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className={`h-full transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                              <span className="text-2xl">{stat.icon}</span>
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                              <p className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</p>
                              <p className={`text-xs text-green-600 dark:text-green-400`}>{stat.trend}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Stats and Notifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Enhanced Quick Stats */}
                  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span>📊</span>
                        Real-Time Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Active Sessions', value: systemStats.activeSessions.toLocaleString(), color: 'blue' },
                          { label: 'Pending Approvals', value: systemStats.pendingApprovals, color: 'orange' },
                          { label: 'System Alerts', value: systemStats.systemAlerts, color: 'red' },
                          { label: 'API Requests', value: systemStats.apiRequests.toLocaleString(), color: 'green' }
                        ].map((stat) => (
                          <div key={stat.label} className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <p className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Enhanced Notifications */}
                  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span>🔔</span>
                        System Notifications
                        <Badge variant="secondary" className="ml-auto">
                          {notifications.filter(n => !n.read).length} new
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {notifications.slice(0, 4).map((notification) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${
                              notification.type === 'info' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                              notification.type === 'warning' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' :
                              notification.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                              'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                            } ${!notification.read ? 'ring-2 ring-blue-500/20' : ''}`}
                          >
                            <div className={`w-2 h-2 rounded-full ${
                              notification.type === 'info' ? 'bg-blue-500' :
                              notification.type === 'warning' ? 'bg-orange-500' :
                              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notification.message}</p>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => dismissNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              ×
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6 mt-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle>System Performance</CardTitle>
                      <CardDescription>Real-time performance metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        { label: 'CPU Usage', value: performanceMetrics.cpuUsage, color: 'blue' },
                        { label: 'Memory Usage', value: performanceMetrics.memoryUsage, color: 'green' },
                        { label: 'Disk Usage', value: performanceMetrics.diskUsage, color: 'orange' },
                        { label: 'Network Usage', value: performanceMetrics.networkUsage, color: 'purple' }
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between mb-2">
                            <Label>{metric.label}</Label>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{metric.value}%</span>
                          </div>
                          <Progress value={metric.value} className="w-full" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle>Performance Controls</CardTitle>
                      <CardDescription>System optimization settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-optimize">Auto Optimization</Label>
                          <Switch id="auto-optimize" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="performance-mode">Performance Mode</Label>
                          <Switch id="performance-mode" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="resource-monitoring">Resource Monitoring</Label>
                          <Switch id="resource-monitoring" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <Label>Optimization Level</Label>
                          <div className="mt-2 space-y-2">
                            {['Conservative', 'Balanced', 'Aggressive'].map((level) => (
                              <div key={level} className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  id={level.toLowerCase()} 
                                  name="optimization" 
                                  value={level.toLowerCase()} 
                                  defaultChecked={level === 'Balanced'}
                                />
                                <Label htmlFor={level.toLowerCase()}>{level}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 mt-6">
                {/* Security Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle>Security Status</CardTitle>
                      <CardDescription>Current security posture</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span>Firewall Status</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Encryption</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">{securityMetrics.encryptionStatus}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>MFA Enabled</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Yes</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Failed Logins (24h)</span>
                          <span className={`text-sm ${securityMetrics.failedLogins > 10 ? 'text-red-600' : 'text-green-600'}`}>
                            {securityMetrics.failedLogins}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Blocked IPs</span>
                          <span className="text-sm text-orange-600">{securityMetrics.blockedIPs}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Last Security Scan</span>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{securityMetrics.lastBackup}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle>Security Controls</CardTitle>
                      <CardDescription>Security settings and options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-scan">Auto Security Scan</Label>
                          <Switch id="auto-scan" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="threat-detection">Threat Detection</Label>
                          <Switch id="threat-detection" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Label htmlFor="access-logging">Access Logging</Label>
                          <Switch id="access-logging" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <Label>Security Level</Label>
                          <div className="mt-2 space-y-2">
                            {['Low', 'Medium', 'High'].map((level) => (
                              <div key={level} className="flex items-center space-x-2">
                                <input 
                                  type="radio" 
                                  id={`security-${level.toLowerCase()}`} 
                                  name="security" 
                                  value={level.toLowerCase()} 
                                  defaultChecked={level === 'High'}
                                />
                                <Label htmlFor={`security-${level.toLowerCase()}`}>{level}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6 mt-6">
                {/* Analytics Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle>User Analytics</CardTitle>
                      <CardDescription>User activity and engagement metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { label: 'Active Users', value: '1,247', progress: 75 },
                          { label: 'Session Duration', value: '24m 32s', progress: 60 },
                          { label: 'Page Views', value: '45,892', progress: 85 }
                        ].map((metric) => (
                          <div key={metric.label} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>{metric.label}</span>
                              <span className="font-semibold">{metric.value}</span>
                            </div>
                            <Progress value={metric.progress} className="w-full" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle>System Analytics</CardTitle>
                      <CardDescription>System performance and usage analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { label: 'API Requests', value: '15,420', progress: 90 },
                          { label: 'Response Time', value: '45ms', progress: 95 },
                          { label: 'Error Rate', value: '0.02%', progress: 98 }
                        ].map((metric) => (
                          <div key={metric.label} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>{metric.label}</span>
                              <span className="font-semibold">{metric.value}</span>
                            </div>
                            <Progress value={metric.progress} className="w-full" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6 mt-6">
                {/* Enhanced Activity Feed */}
                <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>🕒</span>
                      Recent Activity Feed
                    </CardTitle>
                    <CardDescription>Real-time system activity and user actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`flex items-center gap-4 p-4 rounded-lg border ${
                            isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${getPriorityColor(activity.priority)}`}>
                            <span className="text-lg">{getTypeIcon(activity.type)}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.action}</p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {activity.user} • {activity.time}
                            </p>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className={`${getPriorityColor(activity.priority)}`}
                          >
                            {activity.priority}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardPage;
