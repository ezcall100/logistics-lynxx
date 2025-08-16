/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Zap, Plus, Settings, RefreshCw, AlertTriangle, CheckCircle, XCircle, Key, Globe, Database, Truck, DollarSign, Shield, Activity, Link, Unlink, TrendingUp, Wifi, Server, Clock, Download, Upload, BarChart3, Gauge } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

const IntegrationHubSettingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock integration data
  const integrations = [
    {
      id: 1,
      name: 'DAT Load Board',
      category: 'Load Boards',
      description: 'Connect to DAT load board for freight matching',
      status: 'connected',
      lastSync: '2024-01-20 09:30',
      version: 'v2.1',
      icon: Truck,
      color: 'bg-blue-500',
      apiCalls: 1250,
      errorRate: 0.2,
      uptime: 99.8
    },
    {
      id: 2,
      name: 'QuickBooks Online',
      category: 'Accounting',
      description: 'Sync financial data with QuickBooks',
      status: 'connected',
      lastSync: '2024-01-20 08:45',
      version: 'v3.0',
      icon: DollarSign,
      color: 'bg-emerald-500',
      apiCalls: 890,
      errorRate: 0.1,
      uptime: 99.9
    },
    {
      id: 3,
      name: 'Motive ELD',
      category: 'ELD',
      description: 'Electronic logging device integration',
      status: 'pending',
      lastSync: 'Never',
      version: 'v1.5',
      icon: Activity,
      color: 'bg-yellow-500',
      apiCalls: 0,
      errorRate: 0,
      uptime: 0
    },
    {
      id: 4,
      name: 'MacroPoint Visibility',
      category: 'Tracking',
      description: 'Real-time shipment tracking',
      status: 'error',
      lastSync: '2024-01-19 14:20',
      version: 'v2.3',
      icon: Globe,
      color: 'bg-red-500',
      apiCalls: 567,
      errorRate: 15.2,
      uptime: 85.3
    },
    {
      id: 5,
      name: 'Triumph Pay',
      category: 'Payments',
      description: 'Automated payment processing',
      status: 'connected',
      lastSync: '2024-01-20 10:15',
      version: 'v1.8',
      icon: DollarSign,
      color: 'bg-purple-500',
      apiCalls: 234,
      errorRate: 0.3,
      uptime: 99.5
    }
  ];

  const apiKeys = [
    {
      id: 1,
      name: 'DAT API Key',
      service: 'DAT Load Board',
      created: '2024-01-15',
      lastUsed: '2024-01-20',
      permissions: ['read', 'write'],
      status: 'active'
    },
    {
      id: 2,
      name: 'QuickBooks OAuth',
      service: 'QuickBooks Online',
      created: '2024-01-10',
      lastUsed: '2024-01-20',
      permissions: ['read', 'write', 'admin'],
      status: 'active'
    },
    {
      id: 3,
      name: 'MacroPoint API',
      service: 'MacroPoint Visibility',
      created: '2024-01-12',
      lastUsed: '2024-01-19',
      permissions: ['read'],
      status: 'expired'
    }
  ];

  const webhooks = [
    {
      id: 1,
      name: 'Load Status Updates',
      url: 'https://api.company.com/webhooks/load-status',
      events: ['load.created', 'load.updated', 'load.completed'],
      status: 'active',
      lastTriggered: '2024-01-20 09:45',
      successRate: 98.5
    },
    {
      id: 2,
      name: 'Payment Notifications',
      url: 'https://api.company.com/webhooks/payments',
      events: ['payment.processed', 'payment.failed'],
      status: 'active',
      lastTriggered: '2024-01-20 10:30',
      successRate: 99.8
    },
    {
      id: 3,
      name: 'Driver Check-in',
      url: 'https://api.company.com/webhooks/driver-checkin',
      events: ['driver.checkin', 'driver.checkout'],
      status: 'inactive',
      lastTriggered: '2024-01-18 16:20',
      successRate: 95.2
    }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || integration.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'disconnected': return <XCircle className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-500/10 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'error': return 'bg-red-500/10 text-red-700 border-red-200';
      case 'disconnected': return 'bg-gray-500/10 text-gray-700 border-gray-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Integration Hub</h1>
          <p className="text-muted-foreground">Manage API connections, webhooks, and third-party integrations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Integration</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Integration Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="load-board">Load Board</SelectItem>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="eld">ELD System</SelectItem>
                    <SelectItem value="tracking">Tracking</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input placeholder="Enter service name" />
              </div>
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input placeholder="https://api.service.com" />
              </div>
              <div className="space-y-2">
                <Label>API Version</Label>
                <Input placeholder="v1.0" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Enter integration description" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Integration</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-muted-foreground">Active Connections</p>
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
                    <p className="text-sm text-muted-foreground">Pending Setup</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-red-500/10">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Connection Errors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2.9k</p>
                    <p className="text-sm text-muted-foreground">API Calls Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search integrations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Load Boards">Load Boards</SelectItem>
                    <SelectItem value="Accounting">Accounting</SelectItem>
                    <SelectItem value="ELD">ELD Systems</SelectItem>
                    <SelectItem value="Tracking">Tracking</SelectItem>
                    <SelectItem value="Payments">Payments</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="connected">Connected</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="disconnected">Disconnected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => {
              const IconComponent = integration.icon;
              return (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${integration.color}/10`}>
                          <IconComponent className={`h-5 w-5 ${integration.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{integration.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">{integration.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(integration.status)}
                        <Badge className={getStatusColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Last Sync</span>
                        <span className="text-muted-foreground">{integration.lastSync}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Version</span>
                        <span className="text-muted-foreground">{integration.version}</span>
                      </div>
                      {integration.status === 'connected' && (
                        <>
                          <div className="flex justify-between text-sm">
                            <span>API Calls</span>
                            <span className="text-muted-foreground">{integration.apiCalls}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Uptime</span>
                            <span className="text-emerald-600">{integration.uptime}%</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {integration.status === 'connected' ? (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </>
                      ) : integration.status === 'pending' ? (
                        <Button size="sm" className="flex-1">
                          <Link className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Reconnect
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">API Keys Management</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Key className="h-4 w-4 mr-2" />
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
                    <Label>Service</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dat">DAT Load Board</SelectItem>
                        <SelectItem value="quickbooks">QuickBooks</SelectItem>
                        <SelectItem value="macropoint">MacroPoint</SelectItem>
                        <SelectItem value="motive">Motive ELD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="read" defaultChecked />
                        <Label htmlFor="read">Read</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="write" />
                        <Label htmlFor="write">Write</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="admin" />
                        <Label htmlFor="admin">Admin</Label>
                      </div>
                    </div>
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
                    <TableHead>Service</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>{key.service}</TableCell>
                      <TableCell>{key.created}</TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {key.permissions.map((perm) => (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={key.status === 'active' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-red-500/10 text-red-700'}>
                          {key.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-4 w-4" />
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

        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Webhook Management</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Webhook
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Webhook</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Webhook Name</Label>
                    <Input placeholder="Enter webhook name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Endpoint URL</Label>
                    <Input placeholder="https://your-api.com/webhook" />
                  </div>
                  <div className="space-y-2">
                    <Label>Events</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="load-created" />
                        <Label htmlFor="load-created">Load Created</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="load-updated" />
                        <Label htmlFor="load-updated">Load Updated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="payment-processed" />
                        <Label htmlFor="payment-processed">Payment Processed</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Create Webhook</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell className="font-medium">{webhook.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{webhook.url}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {webhook.events.map((event, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={webhook.status === 'active' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-gray-500/10 text-gray-700'}>
                          {webhook.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{webhook.successRate}%</span>
                          <Progress value={webhook.successRate} className="w-12 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>{webhook.lastTriggered}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Activity className="h-4 w-4" />
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

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Health Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">API Health Checks</Label>
                    <p className="text-xs text-muted-foreground">Monitor endpoint availability every 5 minutes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Performance Monitoring</Label>
                    <p className="text-xs text-muted-foreground">Track response times and throughput</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Error Rate Alerts</Label>
                    <p className="text-xs text-muted-foreground">Alert when error rate exceeds 5%</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integration Logs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Request Logging</Label>
                    <p className="text-xs text-muted-foreground">Log all API requests and responses</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Webhook Logs</Label>
                    <p className="text-xs text-muted-foreground">Track webhook delivery attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Data Retention</Label>
                    <p className="text-xs text-muted-foreground">Keep logs for 30 days</p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationHubSettingsPage;