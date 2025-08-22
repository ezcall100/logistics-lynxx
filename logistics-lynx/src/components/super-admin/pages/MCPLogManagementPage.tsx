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
  FileText, RefreshCw, Download, Upload, 
  CheckCircle, AlertCircle, Clock, Database, 
  Server, Shield, Users, Activity,
  Code, Globe, Lock, Key, Wrench,
  Cog, Zap, Eye, EyeOff, Trash2, Copy,
  Plus, Edit, Search, Filter, MoreHorizontal,
  HardDrive, Cloud, Archive, RotateCcw, ShieldCheck,
  AlertTriangle, Info, Play, Pause, Stop,
  Settings, BarChart3, Timer, Terminal,
  Bug, Network
} from 'lucide-react';

const MCPLogManagementPage = () => {
  const [activeTab, setActiveTab] = useState('logs');
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:30:25',
      level: 'INFO',
      service: 'user-service',
      message: 'User authentication successful',
      details: 'User ID: 12345, IP: 192.168.1.100',
      traceId: 'abc123-def456'
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:30:20',
      level: 'WARN',
      service: 'database-service',
      message: 'High query execution time detected',
      details: 'Query took 2.5s, threshold: 1s',
      traceId: 'abc123-def456'
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:30:15',
      level: 'ERROR',
      service: 'api-gateway',
      message: 'Rate limit exceeded for user',
      details: 'User ID: 67890, limit: 100/min',
      traceId: 'xyz789-uvw012'
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:30:10',
      level: 'DEBUG',
      service: 'auth-service',
      message: 'JWT token validation',
      details: 'Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      traceId: 'abc123-def456'
    }
  ]);

  const [logSettings, setLogSettings] = useState({
    logLevel: 'INFO',
    retentionDays: 30,
    maxFileSize: 100,
    compressionEnabled: true,
    encryptionEnabled: true,
    realTimeLogging: true,
    structuredLogging: true
  });

  const [filters, setFilters] = useState({
    level: 'ALL',
    service: 'ALL',
    timeRange: '1h',
    searchTerm: ''
  });

  const [logAnalytics, setLogAnalytics] = useState({
    totalLogs: 125000,
    errorRate: 2.5,
    avgResponseTime: 45,
    topServices: [
      { name: 'user-service', count: 45000 },
      { name: 'api-gateway', count: 38000 },
      { name: 'database-service', count: 25000 },
      { name: 'auth-service', count: 17000 }
    ]
  });

  const handleLogExport = () => {
    // Simulate exporting logs
    console.log('Exporting logs...');
  };

  const handleLogClear = () => {
    // Simulate clearing logs
    console.log('Clearing logs...');
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      case 'WARN': return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
      case 'INFO': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'DEBUG': return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR': return <AlertTriangle className="w-4 h-4" />;
      case 'WARN': return <AlertCircle className="w-4 h-4" />;
      case 'INFO': return <Info className="w-4 h-4" />;
      case 'DEBUG': return <Bug className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MCP Log Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            View, analyze, and manage system logs and audit trails
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" onClick={handleLogExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Logs</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">125K</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Errors</p>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">3.1K</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Warnings</p>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">8.5K</p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Services</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">12</p>
              </div>
              <Server className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6">
          {/* Log Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Log Filters
              </CardTitle>
              <CardDescription>
                Filter and search through system logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="logLevel">Log Level</Label>
                  <Select value={filters.level} onValueChange={(value) => setFilters(prev => ({ ...prev, level: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Levels</SelectItem>
                      <SelectItem value="ERROR">Error</SelectItem>
                      <SelectItem value="WARN">Warning</SelectItem>
                      <SelectItem value="INFO">Info</SelectItem>
                      <SelectItem value="DEBUG">Debug</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="logService">Service</Label>
                  <Select value={filters.service} onValueChange={(value) => setFilters(prev => ({ ...prev, service: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All Services</SelectItem>
                      <SelectItem value="user-service">User Service</SelectItem>
                      <SelectItem value="api-gateway">API Gateway</SelectItem>
                      <SelectItem value="database-service">Database Service</SelectItem>
                      <SelectItem value="auth-service">Auth Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timeRange">Time Range</Label>
                  <Select value={filters.timeRange} onValueChange={(value) => setFilters(prev => ({ ...prev, timeRange: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Last Hour</SelectItem>
                      <SelectItem value="6h">Last 6 Hours</SelectItem>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="searchTerm">Search</Label>
                  <Input
                    id="searchTerm"
                    placeholder="Search logs..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Log List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Terminal className="w-5 h-5 mr-2" />
                  System Logs
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={handleLogClear}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                Real-time system log entries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Badge className={getLevelColor(log.level)}>
                          {getLevelIcon(log.level)}
                          <span className="ml-1">{log.level}</span>
                        </Badge>
                        <span className="text-sm text-slate-500">{log.timestamp}</span>
                        <Badge variant="outline">{log.service}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="font-medium">{log.message}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {log.details}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Trace ID: {log.traceId}</span>
                      <span>ID: {log.id}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Log Analytics Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Log Analytics
              </CardTitle>
              <CardDescription>
                Log patterns and system insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Log Volume by Level</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">INFO</span>
                      <span className="text-sm font-medium">85,000</span>
                    </div>
                    <Progress value={68} className="w-full" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">WARN</span>
                      <span className="text-sm font-medium">8,500</span>
                    </div>
                    <Progress value={7} className="w-full" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">ERROR</span>
                      <span className="text-sm font-medium">3,100</span>
                    </div>
                    <Progress value={2.5} className="w-full" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">DEBUG</span>
                      <span className="text-sm font-medium">28,400</span>
                    </div>
                    <Progress value={23} className="w-full" />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Top Services</h4>
                  <div className="space-y-2">
                    {logAnalytics.topServices.map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{service.name}</span>
                        <span className="text-sm font-medium">{service.count.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Error Rate</Label>
                        <span className="text-sm text-slate-500">{logAnalytics.errorRate}%</span>
                      </div>
                      <Progress value={logAnalytics.errorRate} className="w-full" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Avg Response Time</Label>
                        <span className="text-sm text-slate-500">{logAnalytics.avgResponseTime}ms</span>
                      </div>
                      <Progress value={logAnalytics.avgResponseTime / 2} className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Log Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Log Trends
              </CardTitle>
              <CardDescription>
                Log volume trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-slate-500">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Log trend visualization would be displayed here</p>
                  <p className="text-sm">Showing hourly log volume for the last 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Log Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Log Configuration
              </CardTitle>
              <CardDescription>
                Configure logging behavior and retention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logLevel">Default Log Level</Label>
                  <Select value={logSettings.logLevel} onValueChange={(value) => setLogSettings(prev => ({ ...prev, logLevel: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DEBUG">Debug</SelectItem>
                      <SelectItem value="INFO">Info</SelectItem>
                      <SelectItem value="WARN">Warning</SelectItem>
                      <SelectItem value="ERROR">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="retentionDays">Retention Period (days)</Label>
                  <Input
                    id="retentionDays"
                    type="number"
                    value={logSettings.retentionDays}
                    onChange={(e) => setLogSettings(prev => ({ ...prev, retentionDays: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={logSettings.maxFileSize}
                    onChange={(e) => setLogSettings(prev => ({ ...prev, maxFileSize: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="compressionEnabled">Enable Compression</Label>
                  <Switch
                    id="compressionEnabled"
                    checked={logSettings.compressionEnabled}
                    onCheckedChange={(checked) => setLogSettings(prev => ({ ...prev, compressionEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="encryptionEnabled">Enable Encryption</Label>
                  <Switch
                    id="encryptionEnabled"
                    checked={logSettings.encryptionEnabled}
                    onCheckedChange={(checked) => setLogSettings(prev => ({ ...prev, encryptionEnabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="realTimeLogging">Real-time Logging</Label>
                  <Switch
                    id="realTimeLogging"
                    checked={logSettings.realTimeLogging}
                    onCheckedChange={(checked) => setLogSettings(prev => ({ ...prev, realTimeLogging: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="structuredLogging">Structured Logging</Label>
                  <Switch
                    id="structuredLogging"
                    checked={logSettings.structuredLogging}
                    onCheckedChange={(checked) => setLogSettings(prev => ({ ...prev, structuredLogging: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Log Destinations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="w-5 h-5 mr-2" />
                Log Destinations
              </CardTitle>
              <CardDescription>
                Configure where logs are stored and sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <HardDrive className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Local File System</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">/var/log/mcp/</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Cloud className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Cloud Storage</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">AWS S3 / logs-bucket</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Database</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">PostgreSQL / logs_table</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Network className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-medium">External Service</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">ELK Stack / logstash</p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          {/* Advanced Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Advanced Log Search
              </CardTitle>
              <CardDescription>
                Search logs with advanced filters and queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="searchQuery">Search Query</Label>
                  <Textarea
                    id="searchQuery"
                    placeholder="Enter search query (supports regex, wildcards, etc.)"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="datetime-local" />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="datetime-local" />
                  </div>
                  <div>
                    <Label htmlFor="maxResults">Max Results</Label>
                    <Select defaultValue="1000">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                        <SelectItem value="1000">1,000</SelectItem>
                        <SelectItem value="5000">5,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Results
                  </Button>
                  <Button variant="outline">
                    <Save className="w-4 h-4 mr-2" />
                    Save Query
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Queries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bookmark className="w-5 h-5 mr-2" />
                Saved Queries
              </CardTitle>
              <CardDescription>
                Reuse frequently used search queries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, name: 'Error Logs', query: 'level:ERROR', lastUsed: '2 hours ago' },
                  { id: 2, name: 'Authentication Events', query: 'service:auth-service', lastUsed: '1 day ago' },
                  { id: 3, name: 'Slow Queries', query: 'message:"execution time"', lastUsed: '3 days ago' },
                  { id: 4, name: 'Rate Limit Hits', query: 'message:"rate limit"', lastUsed: '1 week ago' }
                ].map((query) => (
                  <div key={query.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{query.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{query.query}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500">{query.lastUsed}</span>
                      <Button size="sm" variant="outline">
                        <Play className="w-3 h-3 mr-1" />
                        Run
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
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

export default MCPLogManagementPage;
