/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Database, Server, HardDrive, Cpu, MemoryStick, Activity, AlertTriangle, CheckCircle, Clock, Download, Upload, Trash2, Settings, RefreshCw, Zap, Shield, Monitor, Wifi, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const SystemMaintenancePage = () => {
  const [autoMaintenance, setAutoMaintenance] = useState(true);

  const systemMetrics = [
    { name: 'CPU Usage', value: 45, max: 100, unit: '%', status: 'good', icon: Cpu },
    { name: 'Memory Usage', value: 68, max: 100, unit: '%', status: 'warning', icon: MemoryStick },
    { name: 'Disk Usage', value: 23, max: 100, unit: '%', status: 'good', icon: HardDrive },
    { name: 'Network I/O', value: 89, max: 100, unit: '%', status: 'critical', icon: Wifi }
  ];

  const maintenanceTasks = [
    {
      id: 1,
      name: 'Database Optimization',
      description: 'Optimize database indexes and clean up old data',
      status: 'scheduled',
      nextRun: '2024-01-21 02:00',
      lastRun: '2024-01-14 02:00',
      duration: '45 minutes',
      priority: 'high',
      automated: true
    },
    {
      id: 2,
      name: 'Log File Cleanup',
      description: 'Remove old log files and archive important logs',
      status: 'running',
      nextRun: 'Now',
      lastRun: '2024-01-20 01:00',
      duration: '15 minutes',
      priority: 'medium',
      automated: true
    },
    {
      id: 3,
      name: 'Security Scan',
      description: 'Full system security vulnerability scan',
      status: 'completed',
      nextRun: '2024-01-27 03:00',
      lastRun: '2024-01-20 03:00',
      duration: '2 hours',
      priority: 'high',
      automated: false
    },
    {
      id: 4,
      name: 'Backup Verification',
      description: 'Verify integrity of system backups',
      status: 'pending',
      nextRun: '2024-01-21 04:00',
      lastRun: '2024-01-13 04:00',
      duration: '30 minutes',
      priority: 'critical',
      automated: true
    },
    {
      id: 5,
      name: 'Performance Tuning',
      description: 'Optimize system performance and configurations',
      status: 'scheduled',
      nextRun: '2024-01-22 01:30',
      lastRun: '2024-01-15 01:30',
      duration: '1 hour',
      priority: 'medium',
      automated: false
    }
  ];

  const systemLogs = [
    {
      id: 1,
      timestamp: '2024-01-20 10:45:23',
      level: 'INFO',
      service: 'Database',
      message: 'Database backup completed successfully',
      details: 'Full backup of production database completed in 23 minutes'
    },
    {
      id: 2,
      timestamp: '2024-01-20 10:30:15',
      level: 'WARNING',
      service: 'API Gateway',
      message: 'High response time detected',
      details: 'Average response time exceeded 2000ms threshold'
    },
    {
      id: 3,
      timestamp: '2024-01-20 09:15:42',
      level: 'ERROR',
      service: 'File Storage',
      message: 'Disk space critically low',
      details: 'Available disk space: 2.3GB (5% remaining)'
    },
    {
      id: 4,
      timestamp: '2024-01-20 08:22:11',
      level: 'INFO',
      service: 'Authentication',
      message: 'Security scan completed',
      details: 'No vulnerabilities found in authentication system'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'running': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'scheduled': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'pending': return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'failed': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'high': return 'bg-orange-500/10 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'WARNING': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'INFO': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getMetricStatus = (status: string) => {
    switch (status) {
      case 'good': return 'text-emerald-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Maintenance</h1>
          <p className="text-muted-foreground">Monitor system health and manage maintenance tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Alert className="max-w-sm">
            <Activity className="h-4 w-4" />
            <AlertDescription>
              System Status: <span className="font-semibold text-emerald-600">Healthy</span>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Maintenance Tasks</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <Card key={metric.name}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{metric.name}</p>
                          <p className={`text-2xl font-bold ${getMetricStatus(metric.status)}`}>
                            {metric.value}{metric.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Connection Pool</span>
                  <span className="text-emerald-600">95% Available</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Query Performance</span>
                  <span className="text-emerald-600">Optimal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Backup</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Run Health Check
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Server Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Uptime</span>
                  <span className="text-emerald-600">99.98%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Load Average</span>
                  <span className="text-yellow-600">Medium</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Connections</span>
                  <span className="text-muted-foreground">247/500</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Monitor className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Firewall Status</span>
                  <span className="text-emerald-600">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>SSL Certificate</span>
                  <span className="text-emerald-600">Valid</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Scan</span>
                  <span className="text-muted-foreground">6 hours ago</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Security Scan
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Scheduled Maintenance Tasks</h3>
            <div className="flex items-center gap-2">
              <Label className="text-sm">Auto Maintenance</Label>
              <Switch checked={autoMaintenance} onCheckedChange={setAutoMaintenance} />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Next Run</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Automated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.name}</p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{task.nextRun}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{task.duration}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={task.automated ? "default" : "outline"}>
                          {task.automated ? "Yes" : "Manual"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="h-4 w-4" />
                          </Button>
                          {task.status === 'scheduled' && (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">System Logs</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Logs
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <span className="text-sm font-mono">{log.timestamp}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLogLevelColor(log.level)}>
                          {log.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.service}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{log.message}</p>
                          <p className="text-xs text-muted-foreground">{log.details}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Average Response Time</span>
                    <span className="font-medium">245ms</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Throughput</span>
                    <span className="font-medium">1,247 req/min</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Error Rate</span>
                    <span className="font-medium">0.12%</span>
                  </div>
                  <Progress value={2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Database Connections</span>
                    <span className="font-medium">45/100</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Cache Hit Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Queue Processing</span>
                    <span className="font-medium">567/1000</span>
                  </div>
                  <Progress value={57} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Automatic Maintenance</Label>
                    <p className="text-xs text-muted-foreground">Run maintenance tasks automatically</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Maintenance Window</Label>
                  <Select defaultValue="02:00-04:00">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="00:00-02:00">12:00 AM - 2:00 AM</SelectItem>
                      <SelectItem value="02:00-04:00">2:00 AM - 4:00 AM</SelectItem>
                      <SelectItem value="04:00-06:00">4:00 AM - 6:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Send maintenance notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
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
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Automatic Cleanup</Label>
                    <p className="text-xs text-muted-foreground">Remove old backups automatically</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemMaintenancePage;