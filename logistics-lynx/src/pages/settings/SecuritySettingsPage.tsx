/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Lock, Shield, Key, Eye, EyeOff, Smartphone, AlertTriangle, CheckCircle, Users, Clock, Activity, Settings, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SecuritySettingsPage = () => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock security data
  const securityLogs = [
    {
      id: 1,
      event: 'Successful Login',
      user: 'john.smith@company.com',
      timestamp: '2024-01-20 09:30:15',
      ipAddress: '192.168.1.100',
      device: 'Chrome/Windows',
      location: 'Chicago, IL',
      riskLevel: 'low'
    },
    {
      id: 2,
      event: 'Failed Login Attempt',
      user: 'unknown@example.com',
      timestamp: '2024-01-20 08:45:22',
      ipAddress: '203.0.113.42',
      device: 'Unknown',
      location: 'Unknown',
      riskLevel: 'high'
    },
    {
      id: 3,
      event: 'Password Changed',
      user: 'sarah.johnson@company.com',
      timestamp: '2024-01-19 14:20:10',
      ipAddress: '192.168.1.105',
      device: 'Firefox/macOS',
      location: 'Houston, TX',
      riskLevel: 'low'
    },
    {
      id: 4,
      event: 'API Key Generated',
      user: 'admin@company.com',
      timestamp: '2024-01-19 11:15:33',
      ipAddress: '192.168.1.101',
      device: 'Chrome/Windows',
      location: 'Chicago, IL',
      riskLevel: 'medium'
    },
    {
      id: 5,
      event: 'Multiple Failed Logins',
      user: 'mike.wilson@company.com',
      timestamp: '2024-01-18 16:45:18',
      ipAddress: '192.168.1.110',
      device: 'Edge/Windows',
      location: 'Dallas, TX',
      riskLevel: 'high'
    }
  ];

  const activeSessions = [
    {
      id: 1,
      user: 'john.smith@company.com',
      device: 'Chrome on Windows 11',
      location: 'Chicago, IL',
      ipAddress: '192.168.1.100',
      lastActivity: '2 minutes ago',
      sessionStart: '2024-01-20 09:00',
      status: 'active'
    },
    {
      id: 2,
      user: 'sarah.johnson@company.com',
      device: 'Safari on iPhone',
      location: 'Houston, TX',
      ipAddress: '10.0.0.45',
      lastActivity: '15 minutes ago',
      sessionStart: '2024-01-20 08:30',
      status: 'active'
    },
    {
      id: 3,
      user: 'mike.wilson@company.com',
      device: 'Edge on Windows 10',
      location: 'Dallas, TX',
      ipAddress: '192.168.1.110',
      lastActivity: '1 hour ago',
      sessionStart: '2024-01-20 07:45',
      status: 'idle'
    }
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      permissions: ['read', 'write'],
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      expiresIn: '90 days',
      status: 'active'
    },
    {
      id: 2,
      name: 'Mobile App Key',
      permissions: ['read'],
      created: '2024-01-10',
      lastUsed: '2024-01-19',
      expiresIn: '45 days',
      status: 'active'
    },
    {
      id: 3,
      name: 'Legacy Integration',
      permissions: ['read', 'write', 'admin'],
      created: '2023-12-01',
      lastUsed: '2024-01-05',
      expiresIn: 'Expired',
      status: 'expired'
    }
  ];

  const filteredLogs = securityLogs.filter(log => 
    log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ipAddress.includes(searchTerm)
  );

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'high': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'idle': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'expired': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Settings</h1>
          <p className="text-muted-foreground">Manage authentication, access control, and security monitoring</p>
        </div>
        <Alert className="max-w-sm">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Security score: <span className="font-semibold text-emerald-600">95/100</span>
          </AlertDescription>
        </Alert>
      </div>

      <Tabs defaultValue="authentication" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="access-control">Access Control</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="api-security">API Security</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="authentication" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">2FA Enabled</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-yellow-500/10">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2</p>
                    <p className="text-sm text-muted-foreground">Failed Attempts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">15</p>
                    <p className="text-sm text-muted-foreground">Active Sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Authentication Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Password Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Minimum Password Length</Label>
                    <p className="text-xs text-muted-foreground">Require at least 8 characters</p>
                  </div>
                  <Select defaultValue="8">
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Require Special Characters</Label>
                    <p className="text-xs text-muted-foreground">Include symbols and numbers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Password Expiry</Label>
                    <p className="text-xs text-muted-foreground">Force password change every 90 days</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Password History</Label>
                    <p className="text-xs text-muted-foreground">Prevent reuse of last 5 passwords</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Require 2FA for All Users</Label>
                    <p className="text-xs text-muted-foreground">Mandatory two-factor authentication</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Allow SMS Authentication</Label>
                    <p className="text-xs text-muted-foreground">SMS-based verification codes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Allow Authenticator Apps</Label>
                    <p className="text-xs text-muted-foreground">TOTP apps like Google Authenticator</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Backup Codes</Label>
                    <p className="text-xs text-muted-foreground">Generate recovery codes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Sessions</CardTitle>
                <Button variant="outline" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Device & Browser</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{session.user}</p>
                          <p className="text-sm text-muted-foreground">{session.ipAddress}</p>
                        </div>
                      </TableCell>
                      <TableCell>{session.device}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>{session.lastActivity}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-control" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Login Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Account Lockout</Label>
                    <p className="text-xs text-muted-foreground">Lock account after 5 failed attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Session Timeout</Label>
                    <p className="text-xs text-muted-foreground">Auto logout after 30 minutes</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">IP Whitelisting</Label>
                    <p className="text-xs text-muted-foreground">Restrict access by IP address</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Strict Role Enforcement</Label>
                    <p className="text-xs text-muted-foreground">Users can only access assigned features</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Permission Inheritance</Label>
                    <p className="text-xs text-muted-foreground">Allow role hierarchy permissions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Time-Based Access</Label>
                    <p className="text-xs text-muted-foreground">Restrict access to business hours</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Real-time Threat Detection</Label>
                    <p className="text-xs text-muted-foreground">Monitor for suspicious activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Failed Login Alerts</Label>
                    <p className="text-xs text-muted-foreground">Alert on multiple failed attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Unusual Activity Detection</Label>
                    <p className="text-xs text-muted-foreground">Detect anomalous user behavior</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Alert Threshold</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 failed attempts</SelectItem>
                      <SelectItem value="5">5 failed attempts</SelectItem>
                      <SelectItem value="10">10 failed attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notification Method</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-alerts" defaultChecked />
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-alerts" />
                      <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="slack-alerts" defaultChecked />
                      <Label htmlFor="slack-alerts">Slack Notifications</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api-security" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">API Security Management</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate API Key
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate New API Key</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Key Name</Label>
                    <Input placeholder="Enter key name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="api-read" defaultChecked />
                        <Label htmlFor="api-read">Read Access</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="api-write" />
                        <Label htmlFor="api-write">Write Access</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="api-admin" />
                        <Label htmlFor="api-admin">Admin Access</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Generate Key</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key Name</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {key.permissions.map((perm) => (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{key.created}</TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell>{key.expiresIn}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(key.status)}>
                          {key.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="audit" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Security Audit Logs</CardTitle>
                <div className="flex gap-2">
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button variant="outline">
                    <Activity className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Risk Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.event.includes('Failed') ? 
                            <AlertTriangle className="h-4 w-4 text-red-500" /> :
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          }
                          <span className="font-medium">{log.event}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.ipAddress}</TableCell>
                      <TableCell>{log.device}</TableCell>
                      <TableCell>
                        <Badge className={getRiskLevelColor(log.riskLevel)}>
                          {log.riskLevel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecuritySettingsPage;