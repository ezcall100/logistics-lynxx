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
  Database, LayoutDashboard, FileText, CheckCircle, AlertTriangle, Clock, TrendingUp, Activity,
  Play, Pause, RotateCcw, Save, Download, Upload,
  Trash2, Edit, Plus, Filter, MoreHorizontal, Bell, User,
  Zap, Eye, EyeOff, RefreshCw, Settings, Code,
  ExternalLink, Copy, Share2, Maximize2, Minimize2,
  Globe, Lock, Shield, Key, Wifi, HardDrive, Cpu,
  HardDriveIcon, WifiOff, AlertCircle, Info,
  Server, Cloud, GitPullRequest, GitCommit, GitMerge,
  Package, Docker, Kubernetes, Loader, Terminal, Workflow,
  Rocket, ShieldCheck, Monitor, BarChart3, ActivitySquare,
  Search, Table as TableIcon, Key as KeyIcon, Link,
  BarChart, PieChart, TrendingDown, Gauge
} from 'lucide-react';

// Real data models
interface DatabaseTable {
  id: string;
  name: string;
  schema: string;
  size: string;
  rows: number;
  indexes: number;
  constraints: number;
  lastAnalyzed: string;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  fragmentation: number;
  performance: number;
}

interface DatabaseQuery {
  id: string;
  sql: string;
  table: string;
  executionTime: number;
  rowsAffected: number;
  timestamp: string;
  status: 'success' | 'error' | 'slow' | 'timeout';
  user: string;
  cost: number;
  plan: string;
}

interface DatabaseIndex {
  id: string;
  name: string;
  table: string;
  columns: string[];
  type: 'btree' | 'hash' | 'gin' | 'gist' | 'brin';
  size: string;
  usage: number;
  lastUsed: string;
  status: 'active' | 'unused' | 'duplicate' | 'missing';
  performance: number;
}

interface DatabaseConnection {
  id: string;
  database: string;
  user: string;
  application: string;
  status: 'active' | 'idle' | 'waiting' | 'blocked';
  duration: string;
  query: string;
  memory: number;
  cpu: number;
  ipAddress: string;
}

interface DatabaseBackup {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: string;
  status: 'completed' | 'running' | 'failed' | 'scheduled';
  startTime: string;
  endTime?: string;
  duration?: string;
  location: string;
  retention: string;
}

// Mock API functions
const mockAPI = {
  getDatabaseTables: (): Promise<DatabaseTable[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'users',
        schema: 'public',
        size: '2.3 MB',
        rows: 15420,
        indexes: 5,
        constraints: 3,
        lastAnalyzed: '2 hours ago',
        health: 'excellent',
        fragmentation: 5,
        performance: 95
      },
      {
        id: '2',
        name: 'orders',
        schema: 'public',
        size: '1.8 MB',
        rows: 8920,
        indexes: 4,
        constraints: 2,
        lastAnalyzed: '1 hour ago',
        health: 'good',
        fragmentation: 12,
        performance: 87
      },
      {
        id: '3',
        name: 'products',
        schema: 'public',
        size: '450 KB',
        rows: 1250,
        indexes: 3,
        constraints: 1,
        lastAnalyzed: '3 hours ago',
        health: 'warning',
        fragmentation: 25,
        performance: 72
      },
      {
        id: '4',
        name: 'logs',
        schema: 'public',
        size: '15.2 MB',
        rows: 125000,
        indexes: 2,
        constraints: 0,
        lastAnalyzed: '30 minutes ago',
        health: 'critical',
        fragmentation: 45,
        performance: 58
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
        user: 'api_user',
        cost: 0.05,
        plan: 'Index Scan on users_status_idx'
      },
      {
        id: '2',
        sql: 'INSERT INTO users (name, email, status) VALUES ($1, $2, $3)',
        table: 'users',
        executionTime: 8,
        rowsAffected: 1,
        timestamp: '3 minutes ago',
        status: 'success',
        user: 'api_user',
        cost: 0.02,
        plan: 'Insert on users'
      },
      {
        id: '3',
        sql: 'SELECT COUNT(*) FROM orders WHERE created_at > $1',
        table: 'orders',
        executionTime: 150,
        rowsAffected: 1,
        timestamp: '5 minutes ago',
        status: 'slow',
        user: 'analytics_user',
        cost: 0.85,
        plan: 'Sequential Scan on orders'
      },
      {
        id: '4',
        sql: 'UPDATE users SET last_login = NOW() WHERE id = $1',
        table: 'users',
        executionTime: 5,
        rowsAffected: 1,
        timestamp: '4 minutes ago',
        status: 'success',
        user: 'api_user',
        cost: 0.03,
        plan: 'Index Scan on users_pkey'
      }
    ]),

  getDatabaseIndexes: (): Promise<DatabaseIndex[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'users_email_idx',
        table: 'users',
        columns: ['email'],
        type: 'btree',
        size: '256 KB',
        usage: 95,
        lastUsed: '1 minute ago',
        status: 'active',
        performance: 98
      },
      {
        id: '2',
        name: 'orders_created_at_idx',
        table: 'orders',
        columns: ['created_at'],
        type: 'btree',
        size: '128 KB',
        usage: 78,
        lastUsed: '5 minutes ago',
        status: 'active',
        performance: 85
      },
      {
        id: '3',
        name: 'products_category_idx',
        table: 'products',
        columns: ['category'],
        type: 'btree',
        size: '64 KB',
        usage: 15,
        lastUsed: '1 hour ago',
        status: 'unused',
        performance: 45
      },
      {
        id: '4',
        name: 'logs_timestamp_idx',
        table: 'logs',
        columns: ['timestamp'],
        type: 'btree',
        size: '512 KB',
        usage: 100,
        lastUsed: '30 seconds ago',
        status: 'active',
        performance: 92
      }
    ]),

  getDatabaseConnections: (): Promise<DatabaseConnection[]> => 
    Promise.resolve([
      {
        id: '1',
        database: 'transbot_prod',
        user: 'api_user',
        application: 'Trans Bot API',
        status: 'active',
        duration: '2m 15s',
        query: 'SELECT * FROM users WHERE id = $1',
        memory: 45,
        cpu: 25,
        ipAddress: '192.168.1.100'
      },
      {
        id: '2',
        database: 'transbot_prod',
        user: 'analytics_user',
        application: 'Analytics Dashboard',
        status: 'waiting',
        duration: '5m 30s',
        query: 'SELECT COUNT(*) FROM orders WHERE created_at > $1',
        memory: 120,
        cpu: 85,
        ipAddress: '192.168.1.101'
      },
      {
        id: '3',
        database: 'transbot_prod',
        user: 'admin_user',
        application: 'Admin Panel',
        status: 'idle',
        duration: '15m 45s',
        query: '',
        memory: 15,
        cpu: 5,
        ipAddress: '192.168.1.102'
      }
    ]),

  getDatabaseBackups: (): Promise<DatabaseBackup[]> => 
    Promise.resolve([
      {
        id: '1',
        name: 'Full Backup - 2024-01-15',
        type: 'full',
        size: '2.5 GB',
        status: 'completed',
        startTime: '2:00 AM',
        endTime: '2:45 AM',
        duration: '45 minutes',
        location: 'S3://backups/transbot/',
        retention: '30 days'
      },
      {
        id: '2',
        name: 'Incremental Backup - 2024-01-15',
        type: 'incremental',
        size: '150 MB',
        status: 'completed',
        startTime: '6:00 PM',
        endTime: '6:05 PM',
        duration: '5 minutes',
        location: 'S3://backups/transbot/',
        retention: '7 days'
      },
      {
        id: '3',
        name: 'Full Backup - 2024-01-16',
        type: 'full',
        size: '2.6 GB',
        status: 'running',
        startTime: '2:00 AM',
        location: 'S3://backups/transbot/',
        retention: '30 days'
      }
    ])
};

const DatabaseOptimizerPage = () => {
  const { toast } = useToast();
  const [databaseTables, setDatabaseTables] = useState<DatabaseTable[]>([]);
  const [databaseQueries, setDatabaseQueries] = useState<DatabaseQuery[]>([]);
  const [databaseIndexes, setDatabaseIndexes] = useState<DatabaseIndex[]>([]);
  const [databaseConnections, setDatabaseConnections] = useState<DatabaseConnection[]>([]);
  const [databaseBackups, setDatabaseBackups] = useState<DatabaseBackup[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [showOptimizeDialog, setShowOptimizeDialog] = useState(false);
  const [optimizationTarget, setOptimizationTarget] = useState({
    table: '',
    type: 'index' as const,
    description: ''
  });

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [tablesData, queriesData, indexesData, connectionsData, backupsData] = await Promise.all([
          mockAPI.getDatabaseTables(),
          mockAPI.getDatabaseQueries(),
          mockAPI.getDatabaseIndexes(),
          mockAPI.getDatabaseConnections(),
          mockAPI.getDatabaseBackups()
        ]);

        setDatabaseTables(tablesData);
        setDatabaseQueries(queriesData);
        setDatabaseIndexes(indexesData);
        setDatabaseConnections(connectionsData);
        setDatabaseBackups(backupsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load database data",
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
  const handleOptimize = async () => {
    try {
      toast({
        title: "Success",
        description: `Database optimization for ${optimizationTarget.table} initiated`,
      });

      setShowOptimizeDialog(false);
      setOptimizationTarget({
        table: '',
        type: 'index',
        description: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate optimization",
        variant: "destructive"
      });
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'slow': return 'bg-yellow-500';
      case 'timeout': return 'bg-red-600';
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-gray-500';
      case 'waiting': return 'bg-yellow-500';
      case 'blocked': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'scheduled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthBadgeColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'slow': return 'bg-yellow-100 text-yellow-800';
      case 'timeout': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'blocked': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIndexStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'unused': return 'bg-yellow-100 text-yellow-800';
      case 'duplicate': return 'bg-orange-100 text-orange-800';
      case 'missing': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Database Optimizer Agent
            </h1>
            <p className="text-sm md:text-base mt-2 text-slate-600">
              Database performance monitoring, query optimization, and schema management
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-teal-100 text-teal-800 border-teal-200">
              <Database className="w-4 h-4 mr-1" />
              Database Active
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
              <CardTitle className="text-sm font-medium">Database Tables</CardTitle>
              <TableIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{databaseTables.length}</div>
              <p className="text-xs text-muted-foreground">
                {databaseTables.filter(t => t.health === 'excellent').length} excellent health
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Queries</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{databaseQueries.filter(q => q.status === 'success').length}</div>
              <p className="text-xs text-muted-foreground">
                {databaseQueries.filter(q => q.status === 'slow').length} slow queries
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database Indexes</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{databaseIndexes.length}</div>
              <p className="text-xs text-muted-foreground">
                {databaseIndexes.filter(i => i.status === 'active').length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connections</CardTitle>
              <Link className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{databaseConnections.length}</div>
              <p className="text-xs text-muted-foreground">
                {databaseConnections.filter(c => c.status === 'active').length} active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="tables" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="queries">Queries</TabsTrigger>
            <TabsTrigger value="indexes">Indexes</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
          </TabsList>

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Database Tables</CardTitle>
                    <CardDescription>Monitor table health, performance, and optimization opportunities</CardDescription>
                  </div>
                  <Dialog open={showOptimizeDialog} onOpenChange={setShowOptimizeDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Zap className="w-4 h-4 mr-2" />
                        Optimize
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Database Optimization</DialogTitle>
                        <DialogDescription>
                          Optimize database tables for better performance.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="table">Target Table</Label>
                          <Select value={optimizationTarget.table} onValueChange={(value) => setOptimizationTarget(prev => ({ ...prev, table: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a table" />
                            </SelectTrigger>
                            <SelectContent>
                              {databaseTables.map(table => (
                                <SelectItem key={table.id} value={table.name}>{table.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="type">Optimization Type</Label>
                          <Select value={optimizationTarget.type} onValueChange={(value: 'index' | 'vacuum' | 'analyze' | 'reindex') => setOptimizationTarget(prev => ({ ...prev, type: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="index">Create Index</SelectItem>
                              <SelectItem value="vacuum">Vacuum</SelectItem>
                              <SelectItem value="analyze">Analyze</SelectItem>
                              <SelectItem value="reindex">Reindex</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={optimizationTarget.description}
                            onChange={(e) => setOptimizationTarget(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter optimization description"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowOptimizeDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleOptimize} disabled={!optimizationTarget.table}>
                          Optimize
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
                      <TableHead>Table</TableHead>
                      <TableHead>Schema</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Rows</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Fragmentation</TableHead>
                      <TableHead>Last Analyzed</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseTables.map((table) => (
                      <TableRow key={table.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{table.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {table.indexes} indexes, {table.constraints} constraints
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{table.schema}</TableCell>
                        <TableCell>{table.size}</TableCell>
                        <TableCell>{table.rows.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getHealthColor(table.health)}`} />
                            <Badge className={getHealthBadgeColor(table.health)}>
                              {table.health}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{table.performance}%</span>
                            </div>
                            <Progress value={table.performance} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{table.fragmentation}%</span>
                            </div>
                            <Progress value={table.fragmentation} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{table.lastAnalyzed}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Queries Tab */}
          <TabsContent value="queries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Queries</CardTitle>
                <CardDescription>Monitor query performance and execution plans</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Query</TableHead>
                      <TableHead>Table</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Execution Time</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseQueries.map((query) => (
                      <TableRow key={query.id}>
                        <TableCell>
                          <div>
                            <div className="font-mono text-sm max-w-xs truncate">{query.sql}</div>
                            <div className="text-xs text-muted-foreground">{query.plan}</div>
                          </div>
                        </TableCell>
                        <TableCell>{query.table}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(query.status)}`} />
                            <Badge className={getStatusBadgeColor(query.status)}>
                              {query.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{query.executionTime}ms</div>
                          {query.executionTime > 100 && (
                            <div className="text-red-600 text-xs">Slow</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">{query.cost}</div>
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

          {/* Indexes Tab */}
          <TabsContent value="indexes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Indexes</CardTitle>
                <CardDescription>Monitor index usage and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Index</TableHead>
                      <TableHead>Table</TableHead>
                      <TableHead>Columns</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Usage</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseIndexes.map((index) => (
                      <TableRow key={index.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{index.name}</div>
                            <div className="text-sm text-muted-foreground">Last used: {index.lastUsed}</div>
                          </div>
                        </TableCell>
                        <TableCell>{index.table}</TableCell>
                        <TableCell>
                          <div className="text-sm font-mono">{index.columns.join(', ')}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="uppercase">
                            {index.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getIndexStatusColor(index.status)}>
                            {index.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{index.usage}%</span>
                            </div>
                            <Progress value={index.usage} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{index.performance}%</span>
                            </div>
                            <Progress value={index.performance} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>{index.size}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Connections Tab */}
          <TabsContent value="connections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Connections</CardTitle>
                <CardDescription>Monitor active database connections and their resource usage</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Database</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Application</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Memory</TableHead>
                      <TableHead>CPU</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseConnections.map((connection) => (
                      <TableRow key={connection.id}>
                        <TableCell className="font-medium">{connection.database}</TableCell>
                        <TableCell>{connection.user}</TableCell>
                        <TableCell>{connection.application}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(connection.status)}`} />
                            <Badge className={getStatusBadgeColor(connection.status)}>
                              {connection.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{connection.duration}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{connection.memory}MB</span>
                            </div>
                            <Progress value={connection.memory / 2} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{connection.cpu}%</span>
                            </div>
                            <Progress value={connection.cpu} className="h-2" />
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{connection.ipAddress}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backups Tab */}
          <TabsContent value="backups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Backups</CardTitle>
                <CardDescription>Monitor backup status and retention policies</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Backup</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Retention</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseBackups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{backup.name}</div>
                            <div className="text-sm text-muted-foreground">{backup.startTime}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {backup.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(backup.status)}`} />
                            <Badge className={getStatusBadgeColor(backup.status)}>
                              {backup.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>{backup.duration || 'Running...'}</TableCell>
                        <TableCell className="font-mono text-sm">{backup.location}</TableCell>
                        <TableCell>{backup.retention}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
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
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default DatabaseOptimizerPage;
