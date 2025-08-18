import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

// Icons
import { 
  Server, Database, GitBranch, Palette, LayoutDashboard, FileText, 
  Play, Pause, Stop, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  CheckCircle, AlertTriangle, Clock, TrendingUp, Activity,
  Zap, Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Shield, Key, Wifi, HardDrive, Cpu,
  Memory, HardDriveIcon, WifiOff, AlertCircle, Info
} from 'lucide-react';

// Real data models
interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  status: 'active' | 'deprecated' | 'development' | 'testing';
  responseTime: number;
  requestsPerMinute: number;
  errorRate: number;
  lastUpdated: string;
  description: string;
  version: string;
}

interface DatabaseTable {
  id: string;
  name: string;
  schema: string;
  records: number;
  size: string;
  lastBackup: string;
  status: 'healthy' | 'warning' | 'error';
  indexes: number;
  constraints: number;
}

interface APILog {
  id: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  requestSize: string;
  responseSize: string;
}

interface DatabaseQuery {
  id: string;
  sql: string;
  table: string;
  executionTime: number;
  rowsAffected: number;
  timestamp: string;
  status: 'success' | 'error' | 'slow';
  user: string;
}

// Mock API functions
const mockAPI = {
  getEndpoints: (): Promise<APIEndpoint[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Get Users',
        method: 'GET',
        path: '/api/v1/users',
        status: 'active',
        responseTime: 45,
        requestsPerMinute: 120,
        errorRate: 0.2,
        lastUpdated: '2 minutes ago',
        description: 'Retrieve all users with pagination',
        version: 'v1.0'
      },
      {
        id: '2',
        name: 'Create User',
        method: 'POST',
        path: '/api/v1/users',
        status: 'active',
        responseTime: 78,
        requestsPerMinute: 15,
        errorRate: 1.5,
        lastUpdated: '5 minutes ago',
        description: 'Create a new user account',
        version: 'v1.0'
      },
      {
        id: '3',
        name: 'Update User',
        method: 'PUT',
        path: '/api/v1/users/{id}',
        status: 'active',
        responseTime: 62,
        requestsPerMinute: 25,
        errorRate: 0.8,
        lastUpdated: '1 minute ago',
        description: 'Update user information',
        version: 'v1.0'
      },
      {
        id: '4',
        name: 'Delete User',
        method: 'DELETE',
        path: '/api/v1/users/{id}',
        status: 'active',
        responseTime: 35,
        requestsPerMinute: 8,
        errorRate: 0.1,
        lastUpdated: '10 minutes ago',
        description: 'Delete user account',
        version: 'v1.0'
      },
      {
        id: '5',
        name: 'Get Orders',
        method: 'GET',
        path: '/api/v1/orders',
        status: 'development',
        responseTime: 0,
        requestsPerMinute: 0,
        errorRate: 0,
        lastUpdated: '1 hour ago',
        description: 'Retrieve order data with filtering',
        version: 'v1.1'
      }
    ]),

  getDatabaseTables: (): Promise<DatabaseTable[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'users',
        schema: 'public',
        records: 15420,
        size: '2.3 MB',
        lastBackup: '2 hours ago',
        status: 'healthy',
        indexes: 5,
        constraints: 3
      },
      {
        id: '2',
        name: 'orders',
        schema: 'public',
        records: 8920,
        size: '1.8 MB',
        lastBackup: '2 hours ago',
        status: 'healthy',
        indexes: 4,
        constraints: 2
      },
      {
        id: '3',
        name: 'products',
        schema: 'public',
        records: 1250,
        size: '450 KB',
        lastBackup: '2 hours ago',
        status: 'warning',
        indexes: 3,
        constraints: 1
      },
      {
        id: '4',
        name: 'logs',
        schema: 'public',
        records: 125000,
        size: '15.2 MB',
        lastBackup: '1 hour ago',
        status: 'healthy',
        indexes: 2,
        constraints: 0
      }
    ]),

  getAPILogs: (): Promise<APILog[]> => 
    Promise.resolve([
      {
        id: '1',
        endpoint: '/api/v1/users',
        method: 'GET',
        statusCode: 200,
        responseTime: 45,
        timestamp: '2 minutes ago',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        requestSize: '1.2 KB',
        responseSize: '15.8 KB'
      },
      {
        id: '2',
        endpoint: '/api/v1/users',
        method: 'POST',
        statusCode: 201,
        responseTime: 78,
        timestamp: '3 minutes ago',
        ipAddress: '192.168.1.101',
        userAgent: 'PostmanRuntime/7.32.3',
        requestSize: '2.1 KB',
        responseSize: '856 B'
      },
      {
        id: '3',
        endpoint: '/api/v1/users/123',
        method: 'PUT',
        statusCode: 200,
        responseTime: 62,
        timestamp: '4 minutes ago',
        ipAddress: '192.168.1.102',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        requestSize: '1.8 KB',
        responseSize: '1.2 KB'
      },
      {
        id: '4',
        endpoint: '/api/v1/users/456',
        method: 'DELETE',
        statusCode: 404,
        responseTime: 35,
        timestamp: '5 minutes ago',
        ipAddress: '192.168.1.103',
        userAgent: 'curl/7.68.0',
        requestSize: '256 B',
        responseSize: '1.1 KB'
      }
    ]),

  getDatabaseQueries: (): Promise<DatabaseQuery[]> => 
    Promise.resolve([
      {
        id: '1',
        sql: 'SELECT * FROM users WHERE status = $1 LIMIT 50',
        table: 'users',
        executionTime: 12,
        rowsAffected: 50,
        timestamp: '2 minutes ago',
        status: 'success',
        user: 'api_user'
      },
      {
        id: '2',
        sql: 'INSERT INTO users (name, email, status) VALUES ($1, $2, $3)',
        table: 'users',
        executionTime: 8,
        rowsAffected: 1,
        timestamp: '3 minutes ago',
        status: 'success',
        user: 'api_user'
      },
      {
        id: '3',
        sql: 'UPDATE users SET last_login = NOW() WHERE id = $1',
        table: 'users',
        executionTime: 5,
        rowsAffected: 1,
        timestamp: '4 minutes ago',
        status: 'success',
        user: 'api_user'
      },
      {
        id: '4',
        sql: 'SELECT COUNT(*) FROM orders WHERE created_at > $1',
        table: 'orders',
        executionTime: 150,
        rowsAffected: 1,
        timestamp: '5 minutes ago',
        status: 'slow',
        user: 'analytics_user'
      }
    ])
};

const BackendAPIPage = () => {
  const { toast } = useToast();
  const [endpoints, setEndpoints] = useState<APIEndpoint[]>([]);
  const [databaseTables, setDatabaseTables] = useState<DatabaseTable[]>([]);
  const [apiLogs, setApiLogs] = useState<APILog[]>([]);
  const [databaseQueries, setDatabaseQueries] = useState<DatabaseQuery[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [showAddEndpointDialog, setShowAddEndpointDialog] = useState(false);
  const [newEndpoint, setNewEndpoint] = useState({
    name: '',
    method: 'GET' as const,
    path: '',
    description: '',
    version: 'v1.0'
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [endpointsData, tablesData, logsData, queriesData] = await Promise.all([
          mockAPI.getEndpoints(),
          mockAPI.getDatabaseTables(),
          mockAPI.getAPILogs(),
          mockAPI.getDatabaseQueries()
        ]);

        setEndpoints(endpointsData);
        setDatabaseTables(tablesData);
        setApiLogs(logsData);
        setDatabaseQueries(queriesData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load backend data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [toast]);

  // Action handlers
  const handleAddEndpoint = async () => {
    try {
      const endpoint: APIEndpoint = {
        id: Date.now().toString(),
        name: newEndpoint.name,
        method: newEndpoint.method,
        path: newEndpoint.path,
        status: 'development',
        responseTime: 0,
        requestsPerMinute: 0,
        errorRate: 0,
        lastUpdated: 'Just now',
        description: newEndpoint.description,
        version: newEndpoint.version
      };

      setEndpoints(prev => [...prev, endpoint]);
      setShowAddEndpointDialog(false);
      setNewEndpoint({
        name: '',
        method: 'GET',
        path: '',
        description: '',
        version: 'v1.0'
      });

      toast({
        title: "Success",
        description: "API endpoint added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add API endpoint",
        variant: "destructive"
      });
    }
  };

  const handleUpdateEndpointStatus = async (endpointId: string, status: APIEndpoint['status']) => {
    try {
      setEndpoints(prev => prev.map(endpoint => 
        endpoint.id === endpointId 
          ? { ...endpoint, status, lastUpdated: 'Just now' }
          : endpoint
      ));

      toast({
        title: "Success",
        description: "Endpoint status updated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update endpoint status",
        variant: "destructive"
      });
    }
  };

  const handleDeleteEndpoint = async (endpointId: string) => {
    try {
      setEndpoints(prev => prev.filter(endpoint => endpoint.id !== endpointId));
      
      toast({
        title: "Success",
        description: "API endpoint deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete API endpoint",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'development': return 'bg-blue-500';
      case 'testing': return 'bg-yellow-500';
      case 'deprecated': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusCodeColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'text-green-600';
    if (statusCode >= 300 && statusCode < 400) return 'text-blue-600';
    if (statusCode >= 400 && statusCode < 500) return 'text-yellow-600';
    if (statusCode >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const getDatabaseStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Backend API Agent
            </h1>
            <p className="text-sm md:text-base mt-2 text-slate-600">
              API endpoint management, database operations, and performance monitoring
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <Server className="w-4 h-4 mr-1" />
              API Active
            </Badge>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Endpoints</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{endpoints.filter(e => e.status === 'active').length}</div>
              <p className="text-xs text-muted-foreground">
                {endpoints.length} total endpoints
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(endpoints.reduce((acc, e) => acc + e.responseTime, 0) / endpoints.length)}ms
              </div>
              <p className="text-xs text-muted-foreground">
                Across all endpoints
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database Tables</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{databaseTables.length}</div>
              <p className="text-xs text-muted-foreground">
                {databaseTables.filter(t => t.status === 'healthy').length} healthy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(endpoints.reduce((acc, e) => acc + e.errorRate, 0) / endpoints.length * 100) / 100}%
              </div>
              <p className="text-xs text-muted-foreground">
                Average across endpoints
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="logs">API Logs</TabsTrigger>
            <TabsTrigger value="queries">Query Monitor</TabsTrigger>
          </TabsList>

          {/* API Endpoints Tab */}
          <TabsContent value="endpoints" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Endpoints</CardTitle>
                    <CardDescription>Manage and monitor API endpoints</CardDescription>
                  </div>
                  <Dialog open={showAddEndpointDialog} onOpenChange={setShowAddEndpointDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Endpoint
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New API Endpoint</DialogTitle>
                        <DialogDescription>
                          Create a new API endpoint with specifications.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Endpoint Name</Label>
                          <Input
                            id="name"
                            value={newEndpoint.name}
                            onChange={(e) => setNewEndpoint(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter endpoint name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="method">HTTP Method</Label>
                          <Select value={newEndpoint.method} onValueChange={(value: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH') => setNewEndpoint(prev => ({ ...prev, method: value }))}>
                            <SelectTrigger>
                              <SelectValue />
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
                          <Label htmlFor="path">API Path</Label>
                          <Input
                            id="path"
                            value={newEndpoint.path}
                            onChange={(e) => setNewEndpoint(prev => ({ ...prev, path: e.target.value }))}
                            placeholder="/api/v1/resource"
                          />
                        </div>
                        <div>
                          <Label htmlFor="version">API Version</Label>
                          <Input
                            id="version"
                            value={newEndpoint.version}
                            onChange={(e) => setNewEndpoint(prev => ({ ...prev, version: e.target.value }))}
                            placeholder="v1.0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newEndpoint.description}
                            onChange={(e) => setNewEndpoint(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter endpoint description"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddEndpointDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddEndpoint} disabled={!newEndpoint.name || !newEndpoint.path}>
                          Add Endpoint
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>Requests/min</TableHead>
                      <TableHead>Error Rate</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {endpoints.map((endpoint) => (
                      <TableRow key={endpoint.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{endpoint.name}</div>
                            <div className="text-sm text-muted-foreground font-mono">{endpoint.path}</div>
                            <div className="text-sm text-muted-foreground">{endpoint.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getMethodColor(endpoint.method)}>
                            {endpoint.method}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(endpoint.status)}`} />
                            <span className="capitalize">{endpoint.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{endpoint.responseTime}ms</div>
                            <div className="text-muted-foreground">Last: {endpoint.lastUpdated}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{endpoint.requestsPerMinute}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{endpoint.errorRate}%</div>
                            {endpoint.errorRate > 1 && (
                              <div className="text-red-600 text-xs">High</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{endpoint.version}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Select value={endpoint.status} onValueChange={(value: APIEndpoint['status']) => handleUpdateEndpointStatus(endpoint.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="development">Development</SelectItem>
                                <SelectItem value="testing">Testing</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="deprecated">Deprecated</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEndpoint(endpoint.id)}
                            >
                              <Trash2 className="w-4 h-4" />
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

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Tables</CardTitle>
                <CardDescription>Monitor database health and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Table Name</TableHead>
                      <TableHead>Schema</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Indexes</TableHead>
                      <TableHead>Constraints</TableHead>
                      <TableHead>Last Backup</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseTables.map((table) => (
                      <TableRow key={table.id}>
                        <TableCell className="font-medium">{table.name}</TableCell>
                        <TableCell>{table.schema}</TableCell>
                        <TableCell>{table.records.toLocaleString()}</TableCell>
                        <TableCell>{table.size}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getDatabaseStatusColor(table.status)}`} />
                            <span className="capitalize">{table.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>{table.indexes}</TableCell>
                        <TableCell>{table.constraints}</TableCell>
                        <TableCell>{table.lastBackup}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Request Logs</CardTitle>
                <CardDescription>Monitor API requests and responses</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Request Size</TableHead>
                      <TableHead>Response Size</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{log.endpoint}</TableCell>
                        <TableCell>
                          <Badge className={getMethodColor(log.method)}>
                            {log.method}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${getStatusCodeColor(log.statusCode)}`}>
                            {log.statusCode}
                          </span>
                        </TableCell>
                        <TableCell>{log.responseTime}ms</TableCell>
                        <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                        <TableCell>{log.requestSize}</TableCell>
                        <TableCell>{log.responseSize}</TableCell>
                        <TableCell>{log.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Query Monitor Tab */}
          <TabsContent value="queries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Query Monitor</CardTitle>
                <CardDescription>Track database query performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SQL Query</TableHead>
                      <TableHead>Table</TableHead>
                      <TableHead>Execution Time</TableHead>
                      <TableHead>Rows Affected</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseQueries.map((query) => (
                      <TableRow key={query.id}>
                        <TableCell>
                          <div className="max-w-xs truncate font-mono text-sm">
                            {query.sql}
                          </div>
                        </TableCell>
                        <TableCell>{query.table}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="font-medium">{query.executionTime}ms</div>
                            {query.executionTime > 100 && (
                              <div className="text-red-600 text-xs">Slow</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{query.rowsAffected}</TableCell>
                        <TableCell>
                          <Badge variant={
                            query.status === 'success' ? 'default' :
                            query.status === 'error' ? 'destructive' : 'secondary'
                          }>
                            {query.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{query.user}</TableCell>
                        <TableCell>{query.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default BackendAPIPage;
