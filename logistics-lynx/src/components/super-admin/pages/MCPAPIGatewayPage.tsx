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
  Network, RefreshCw, Download, Upload, 
  CheckCircle, AlertCircle, Clock, Database, 
  Server, Shield, Users, Activity,
  FileText, Code, Globe, Lock, Key, Wrench,
  Cog, Zap, Eye, EyeOff, Trash2, Copy,
  Plus, Edit, Search, Filter, MoreHorizontal,
  HardDrive, Cloud, Archive, RotateCcw, ShieldCheck,
  AlertTriangle, Info, Play, Pause, Stop,
  Route, Settings, BarChart3, Timer
} from 'lucide-react';

const MCPAPIGatewayPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [apis, setApis] = useState([
    {
      id: 1,
      name: 'User Management API',
      endpoint: '/api/v1/users',
      method: 'GET',
      status: 'active',
      requests: 1250,
      responseTime: 45,
      uptime: 99.8
    },
    {
      id: 2,
      name: 'Authentication API',
      endpoint: '/api/v1/auth',
      method: 'POST',
      status: 'active',
      requests: 890,
      responseTime: 32,
      uptime: 99.9
    },
    {
      id: 3,
      name: 'Data Processing API',
      endpoint: '/api/v1/process',
      method: 'POST',
      status: 'active',
      requests: 567,
      responseTime: 78,
      uptime: 98.5
    },
    {
      id: 4,
      name: 'Analytics API',
      endpoint: '/api/v1/analytics',
      method: 'GET',
      status: 'maintenance',
      requests: 234,
      responseTime: 120,
      uptime: 95.2
    }
  ]);

  const [routes, setRoutes] = useState([
    {
      id: 1,
      path: '/api/v1/users',
      target: 'user-service:8080',
      method: 'GET',
      status: 'active',
      rateLimit: 1000,
      timeout: 30
    },
    {
      id: 2,
      path: '/api/v1/auth',
      target: 'auth-service:8081',
      method: 'POST',
      status: 'active',
      rateLimit: 500,
      timeout: 15
    },
    {
      id: 3,
      path: '/api/v1/process',
      target: 'processor-service:8082',
      method: 'POST',
      status: 'active',
      rateLimit: 200,
      timeout: 60
    }
  ]);

  const [gatewaySettings, setGatewaySettings] = useState({
    globalRateLimit: 10000,
    defaultTimeout: 30,
    corsEnabled: true,
    sslEnabled: true,
    loadBalancing: true,
    circuitBreaker: true,
    logging: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    apiKeyAuth: true,
    jwtAuth: true,
    rateLimiting: true,
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    requestValidation: true,
    responseValidation: true
  });

  const handleAPICreate = () => {
    // Simulate creating API
    console.log('Creating new API...');
  };

  const handleRouteCreate = () => {
    // Simulate creating route
    console.log('Creating new route...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP API Gateway
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage API routes, rate limiting, security, and monitoring
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={handleAPICreate}>
            <Plus className="w-4 h-4 mr-2" />
            New API
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Active APIs</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">4</p>
              </div>
              <Network className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Requests</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">2,941</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Avg Response</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">68ms</p>
              </div>
              <Timer className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Uptime</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">99.3%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="apis">APIs</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* API Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                API Performance Overview
              </CardTitle>
              <CardDescription>
                Real-time performance metrics for all APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apis.map((api) => (
                  <motion.div
                    key={api.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(api.status)}`} />
                        <h4 className="font-medium">{api.name}</h4>
                        <Badge variant="outline">{api.method}</Badge>
                      </div>
                      <div className="text-sm text-slate-500">
                        {api.endpoint}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Requests</p>
                        <p className="font-medium">{api.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Response Time</p>
                        <p className="font-medium">{api.responseTime}ms</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Uptime</p>
                        <p className="font-medium">{api.uptime}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Traffic Analytics
              </CardTitle>
              <CardDescription>
                API traffic patterns and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Requests per Minute</Label>
                    <span className="text-sm text-slate-500">1,247</span>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Error Rate</Label>
                    <span className="text-sm text-slate-500">0.8%</span>
                  </div>
                  <Progress value={8} className="w-full" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Average Response Time</Label>
                    <span className="text-sm text-slate-500">68ms</span>
                  </div>
                  <Progress value={68} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apis" className="space-y-6">
          {/* API List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Network className="w-5 h-5 mr-2" />
                API Endpoints
              </CardTitle>
              <CardDescription>
                Manage and monitor API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apis.map((api) => (
                  <motion.div
                    key={api.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(api.status)}`} />
                        <h4 className="font-medium">{api.name}</h4>
                        <Badge variant="outline">{api.method}</Badge>
                        <Badge variant={api.status === 'active' ? 'default' : 'secondary'}>
                          {api.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Config
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Endpoint</p>
                        <p className="font-mono text-xs">{api.endpoint}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Requests</p>
                        <p className="font-medium">{api.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Response Time</p>
                        <p className="font-medium">{api.responseTime}ms</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Uptime</p>
                        <p className="font-medium">{api.uptime}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create New API */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New API
              </CardTitle>
              <CardDescription>
                Add a new API endpoint to the gateway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="apiName">API Name</Label>
                  <Input id="apiName" placeholder="Enter API name" />
                </div>
                <div>
                  <Label htmlFor="apiEndpoint">Endpoint</Label>
                  <Input id="apiEndpoint" placeholder="/api/v1/example" />
                </div>
                <div>
                  <Label htmlFor="apiMethod">HTTP Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="apiTarget">Target Service</Label>
                  <Input id="apiTarget" placeholder="service:port" />
                </div>
              </div>
              <Button className="mt-4" onClick={handleAPICreate}>
                <Plus className="w-4 h-4 mr-2" />
                Create API
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-6">
          {/* Route Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route className="w-5 h-5 mr-2" />
                Route Configuration
              </CardTitle>
              <CardDescription>
                Manage API routing and load balancing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(route.status)}`} />
                        <h4 className="font-medium">{route.path}</h4>
                        <Badge variant="outline">{route.method}</Badge>
                        <Badge variant={route.status === 'active' ? 'default' : 'secondary'}>
                          {route.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3 mr-1" />
                          Config
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Target</p>
                        <p className="font-mono text-xs">{route.target}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Rate Limit</p>
                        <p className="font-medium">{route.rateLimit}/min</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-400">Timeout</p>
                        <p className="font-medium">{route.timeout}s</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Create New Route */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Route
              </CardTitle>
              <CardDescription>
                Add a new route to the gateway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="routePath">Route Path</Label>
                  <Input id="routePath" placeholder="/api/v1/example" />
                </div>
                <div>
                  <Label htmlFor="routeTarget">Target Service</Label>
                  <Input id="routeTarget" placeholder="service:port" />
                </div>
                <div>
                  <Label htmlFor="routeMethod">HTTP Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="routeRateLimit">Rate Limit</Label>
                  <Input id="routeRateLimit" type="number" placeholder="1000" />
                </div>
              </div>
              <Button className="mt-4" onClick={handleRouteCreate}>
                <Plus className="w-4 h-4 mr-2" />
                Create Route
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Configuration
              </CardTitle>
              <CardDescription>
                Configure API security and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="apiKeyAuth">API Key Authentication</Label>
                  <Switch
                    id="apiKeyAuth"
                    checked={securitySettings.apiKeyAuth}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, apiKeyAuth: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="jwtAuth">JWT Authentication</Label>
                  <Switch
                    id="jwtAuth"
                    checked={securitySettings.jwtAuth}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, jwtAuth: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="rateLimiting">Rate Limiting</Label>
                  <Switch
                    id="rateLimiting"
                    checked={securitySettings.rateLimiting}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, rateLimiting: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="requestValidation">Request Validation</Label>
                  <Switch
                    id="requestValidation"
                    checked={securitySettings.requestValidation}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, requestValidation: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="responseValidation">Response Validation</Label>
                  <Switch
                    id="responseValidation"
                    checked={securitySettings.responseValidation}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({ ...prev, responseValidation: checked }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                <Textarea
                  id="ipWhitelist"
                  value={securitySettings.ipWhitelist.join('\n')}
                  onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim()) }))}
                  placeholder="Enter IP addresses or CIDR ranges (one per line)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Gateway Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Gateway Settings
              </CardTitle>
              <CardDescription>
                Configure gateway behavior and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="globalRateLimit">Global Rate Limit</Label>
                  <Input
                    id="globalRateLimit"
                    type="number"
                    value={gatewaySettings.globalRateLimit}
                    onChange={(e) => setGatewaySettings(prev => ({ ...prev, globalRateLimit: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="defaultTimeout">Default Timeout (seconds)</Label>
                  <Input
                    id="defaultTimeout"
                    type="number"
                    value={gatewaySettings.defaultTimeout}
                    onChange={(e) => setGatewaySettings(prev => ({ ...prev, defaultTimeout: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="corsEnabled">Enable CORS</Label>
                  <Switch
                    id="corsEnabled"
                    checked={gatewaySettings.corsEnabled}
                    onCheckedChange={(checked) => setGatewaySettings(prev => ({ ...prev, corsEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sslEnabled">Enable SSL</Label>
                  <Switch
                    id="sslEnabled"
                    checked={gatewaySettings.sslEnabled}
                    onCheckedChange={(checked) => setGatewaySettings(prev => ({ ...prev, sslEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="loadBalancing">Load Balancing</Label>
                  <Switch
                    id="loadBalancing"
                    checked={gatewaySettings.loadBalancing}
                    onCheckedChange={(checked) => setGatewaySettings(prev => ({ ...prev, loadBalancing: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="circuitBreaker">Circuit Breaker</Label>
                  <Switch
                    id="circuitBreaker"
                    checked={gatewaySettings.circuitBreaker}
                    onCheckedChange={(checked) => setGatewaySettings(prev => ({ ...prev, circuitBreaker: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="logging">Request Logging</Label>
                  <Switch
                    id="logging"
                    checked={gatewaySettings.logging}
                    onCheckedChange={(checked) => setGatewaySettings(prev => ({ ...prev, logging: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          {/* Real-time Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Real-time Monitoring
              </CardTitle>
              <CardDescription>
                Live API gateway metrics and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Requests per Second</Label>
                    <span className="text-sm text-slate-500">247</span>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Error Rate</Label>
                    <span className="text-sm text-slate-500">0.8%</span>
                  </div>
                  <Progress value={8} className="w-full" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Average Response Time</Label>
                    <span className="text-sm text-slate-500">68ms</span>
                  </div>
                  <Progress value={68} className="w-full" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Active Connections</Label>
                    <span className="text-sm text-slate-500">1,234</span>
                  </div>
                  <Progress value={65} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Recent API requests and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, action: 'API Request', details: 'GET /api/v1/users', time: '2 seconds ago', status: 'success' },
                  { id: 2, action: 'Rate Limit Hit', details: 'POST /api/v1/auth', time: '5 seconds ago', status: 'warning' },
                  { id: 3, action: 'API Request', details: 'POST /api/v1/process', time: '10 seconds ago', status: 'success' },
                  { id: 4, action: 'Authentication Failed', details: 'GET /api/v1/analytics', time: '15 seconds ago', status: 'error' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'success' ? 'bg-green-500' : 
                        item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">{item.action}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {item.details}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MCPAPIGatewayPage;
