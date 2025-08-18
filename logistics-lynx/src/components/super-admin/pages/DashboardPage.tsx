import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [systemStats] = useState({
    users: 2847,
    portals: 7,
    health: 99.9,
    security: 'A+',
    uptime: '99.9%',
    responseTime: '45ms'
  });

  const [notifications] = useState([
    { id: 1, type: 'info', message: 'System backup completed successfully', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'High memory usage detected', time: '5 min ago' },
    { id: 3, type: 'success', message: 'New user registration approved', time: '10 min ago' }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, action: 'New user registered', user: 'john.doe@company.com', time: '2 min ago', type: 'user' },
    { id: 2, action: 'Security scan completed', user: 'System', time: '5 min ago', type: 'security' },
    { id: 3, action: 'Database backup completed', user: 'System', time: '15 min ago', type: 'system' },
    { id: 4, action: 'Portal access granted', user: 'admin@company.com', time: '1 hour ago', type: 'access' },
    { id: 5, action: 'System update deployed', user: 'System', time: '2 hours ago', type: 'update' }
  ]);

  const [quickStats, setQuickStats] = useState({
    activeSessions: 1247,
    pendingApprovals: 23,
    systemAlerts: 3,
    apiRequests: 15420
  });

  const [performanceMetrics, setPerformanceMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 67,
    diskUsage: 23,
    networkUsage: 89
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Welcome Section with Enhanced Components */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Welcome to Super Admin Portal</h1>
              <p className="text-purple-100 text-sm lg:text-base">
                Complete system control with full administrative authority. All systems operational.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white">System Online</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">Security: A+</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white">Uptime: 99.9%</Badge>
              </div>
            </div>
            
            {/* Enhanced Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-white/10 rounded-lg p-1">
                <Button
                  variant={selectedTimeRange === '1h' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTimeRange('1h')}
                  className="text-white hover:bg-white/20"
                >
                  1H
                </Button>
                <Button
                  variant={selectedTimeRange === '24h' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTimeRange('24h')}
                  className="text-white hover:bg-white/20"
                >
                  24H
                </Button>
                <Button
                  variant={selectedTimeRange === '7d' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTimeRange('7d')}
                  className="text-white hover:bg-white/20"
                >
                  7D
                </Button>
                <Button
                  variant={selectedTimeRange === '30d' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTimeRange('30d')}
                  className="text-white hover:bg-white/20"
                >
                  30D
                </Button>
              </div>
              
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metrics</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tabs for Different Views */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* System Health Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <span className="text-purple-600 text-lg">👥</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Total Users</p>
                        <p className="text-lg font-semibold text-purple-600">{systemStats.users.toLocaleString()}</p>
                        <p className="text-xs text-green-600">+12.5% from last month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <span className="text-blue-600 text-lg">🌐</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Active Portals</p>
                        <p className="text-lg font-semibold text-blue-600">{systemStats.portals}/{systemStats.portals}</p>
                        <p className="text-xs text-green-600">All operational</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <span className="text-green-600 text-lg">💚</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">System Health</p>
                        <p className="text-lg font-semibold text-green-600">{systemStats.health}%</p>
                        <p className="text-xs text-green-600">Optimal performance</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <span className="text-orange-600 text-lg">🔒</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Security Score</p>
                        <p className="text-lg font-semibold text-orange-600">{systemStats.security}</p>
                        <p className="text-xs text-green-600">Excellent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>📊</span>
                      Quick Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{quickStats.activeSessions.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">Active Sessions</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">{quickStats.pendingApprovals}</p>
                        <p className="text-sm text-slate-600">Pending Approvals</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-red-600">{quickStats.systemAlerts}</p>
                        <p className="text-sm text-slate-600">System Alerts</p>
                      </div>
                      <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{quickStats.apiRequests.toLocaleString()}</p>
                        <p className="text-sm text-slate-600">API Requests</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span>🕒</span>
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'user' ? 'bg-blue-500' :
                            activity.type === 'security' ? 'bg-green-500' :
                            activity.type === 'system' ? 'bg-purple-500' :
                            activity.type === 'access' ? 'bg-orange-500' : 'bg-gray-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Performance Metrics with Sliders */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Performance</CardTitle>
                    <CardDescription>Real-time performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>CPU Usage</Label>
                          <span className="text-sm text-slate-600">{performanceMetrics.cpuUsage}%</span>
                        </div>
                        <Progress value={performanceMetrics.cpuUsage} className="w-full" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Memory Usage</Label>
                          <span className="text-sm text-slate-600">{performanceMetrics.memoryUsage}%</span>
                        </div>
                        <Progress value={performanceMetrics.memoryUsage} className="w-full" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Disk Usage</Label>
                          <span className="text-sm text-slate-600">{performanceMetrics.diskUsage}%</span>
                        </div>
                        <Progress value={performanceMetrics.diskUsage} className="w-full" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Network Usage</Label>
                          <span className="text-sm text-slate-600">{performanceMetrics.networkUsage}%</span>
                        </div>
                        <Progress value={performanceMetrics.networkUsage} className="w-full" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
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
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="conservative" name="optimization" value="conservative" defaultChecked={false} />
                            <Label htmlFor="conservative">Conservative</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="balanced" name="optimization" value="balanced" defaultChecked={true} />
                            <Label htmlFor="balanced">Balanced</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="aggressive" name="optimization" value="aggressive" defaultChecked={false} />
                            <Label htmlFor="aggressive">Aggressive</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              {/* Security Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Status</CardTitle>
                    <CardDescription>Current security posture</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Firewall Status</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Encryption</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">AES-256</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>MFA Enabled</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Yes</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Security Scan</span>
                        <span className="text-sm text-slate-600">2 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
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
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="low" name="security" value="low" defaultChecked={false} />
                            <Label htmlFor="low">Low</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="medium" name="security" value="medium" defaultChecked={false} />
                            <Label htmlFor="medium">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="radio" id="high" name="security" value="high" defaultChecked={true} />
                            <Label htmlFor="high">High</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {/* Analytics Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Analytics</CardTitle>
                    <CardDescription>User activity and engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Active Users</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                      <Progress value={75} className="w-full" />
                      
                      <div className="flex justify-between items-center">
                        <span>Session Duration</span>
                        <span className="font-semibold">24m 32s</span>
                      </div>
                      <Progress value={60} className="w-full" />
                      
                      <div className="flex justify-between items-center">
                        <span>Page Views</span>
                        <span className="font-semibold">45,892</span>
                      </div>
                      <Progress value={85} className="w-full" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Analytics</CardTitle>
                    <CardDescription>System performance and usage analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>API Requests</span>
                        <span className="font-semibold">15,420</span>
                      </div>
                      <Progress value={90} className="w-full" />
                      
                      <div className="flex justify-between items-center">
                        <span>Response Time</span>
                        <span className="font-semibold">45ms</span>
                      </div>
                      <Progress value={95} className="w-full" />
                      
                      <div className="flex justify-between items-center">
                        <span>Error Rate</span>
                        <span className="font-semibold">0.02%</span>
                      </div>
                      <Progress value={98} className="w-full" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔔</span>
                System Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`flex items-center gap-3 p-3 rounded-lg ${
                    notification.type === 'info' ? 'bg-blue-50 border border-blue-200' :
                    notification.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
                    notification.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      notification.type === 'info' ? 'bg-blue-500' :
                      notification.type === 'warning' ? 'bg-orange-500' :
                      notification.type === 'success' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-slate-500">{notification.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">Dismiss</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TooltipProvider>
  );
};

export default DashboardPage;
