/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, Download, Eye, RefreshCw, Clock, Activity, CheckCircle, AlertTriangle, XCircle, Code } from 'lucide-react';
import { toast } from 'sonner';

interface APILog {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  statusCode: number;
  responseTime: number;
  userAgent: string;
  ipAddress: string;
  apiKey: string;
  requestSize: number;
  responseSize: number;
  requestBody?: unknown;
  responseBody?: unknown;
  headers: Record<string, string>;
  error?: string;
}

const mockLogs: APILog[] = [
  {
    id: '1',
    timestamp: '2024-01-20T10:30:45.123Z',
    method: 'GET',
    endpoint: '/api/v1/shipments',
    statusCode: 200,
    responseTime: 145,
    userAgent: 'TransBot Mobile App/1.2.3',
    ipAddress: '192.168.1.100',
    apiKey: 'tb_prod_7k8m9n***',
    requestSize: 0,
    responseSize: 2048,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer tb_prod_***',
      'User-Agent': 'TransBot Mobile App/1.2.3'
    },
    responseBody: {
      data: [
        { id: 'SH001', status: 'in_transit', origin: 'Los Angeles, CA', destination: 'Phoenix, AZ' },
        { id: 'SH002', status: 'delivered', origin: 'Chicago, IL', destination: 'Detroit, MI' }
      ],
      meta: { total: 25, page: 1, limit: 10 }
    }
  },
  {
    id: '2',
    timestamp: '2024-01-20T10:29:12.456Z',
    method: 'POST',
    endpoint: '/api/v1/loads',
    statusCode: 201,
    responseTime: 234,
    userAgent: 'TransBot Web Portal/2.1.0',
    ipAddress: '10.0.0.50',
    apiKey: 'tb_prod_a1b2c3***',
    requestSize: 512,
    responseSize: 256,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer tb_prod_***'
    },
    requestBody: {
      origin: 'Dallas, TX',
      destination: 'Houston, TX',
      weight: 15000,
      equipment_type: 'dry_van'
    },
    responseBody: {
      id: 'LD003',
      status: 'created',
      reference: 'TB-LD-003'
    }
  },
  {
    id: '3',
    timestamp: '2024-01-20T10:28:33.789Z',
    method: 'PUT',
    endpoint: '/api/v1/shipments/SH001/status',
    statusCode: 400,
    responseTime: 89,
    userAgent: 'Carrier Portal/1.5.2',
    ipAddress: '203.0.113.42',
    apiKey: 'tb_prod_x9y8z7***',
    requestSize: 128,
    responseSize: 180,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer tb_prod_***'
    },
    requestBody: {
      status: 'invalid_status'
    },
    responseBody: {
      error: 'Invalid status value',
      message: 'Status must be one of: pending, in_transit, delivered, cancelled'
    },
    error: 'Validation error: invalid status value'
  },
  {
    id: '4',
    timestamp: '2024-01-20T10:27:15.012Z',
    method: 'GET',
    endpoint: '/api/v1/tracking/SH002',
    statusCode: 200,
    responseTime: 67,
    userAgent: 'Customer Portal/3.0.1',
    ipAddress: '198.51.100.25',
    apiKey: 'tb_prod_m6n7o8***',
    requestSize: 0,
    responseSize: 1024,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer tb_prod_***'
    },
    responseBody: {
      shipment_id: 'SH002',
      current_location: 'Indianapolis, IN',
      eta: '2024-01-20T18:00:00Z',
      progress: 75
    }
  },
  {
    id: '5',
    timestamp: '2024-01-20T10:26:58.345Z',
    method: 'DELETE',
    endpoint: '/api/v1/quotes/QT001',
    statusCode: 500,
    responseTime: 2500,
    userAgent: 'Admin Panel/1.0.0',
    ipAddress: '172.16.0.10',
    apiKey: 'tb_prod_f5g6h7***',
    requestSize: 0,
    responseSize: 128,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer tb_prod_***'
    },
    responseBody: {
      error: 'Internal server error',
      message: 'Database connection timeout',
      trace_id: 'tr_abc123'
    },
    error: 'Database connection timeout'
  }
];

export const APILogsViewer: React.FC = () => {
  const [logs, setLogs] = useState<APILog[]>(mockLogs);
  const [filteredLogs, setFilteredLogs] = useState<APILog[]>(mockLogs);
  const [selectedLog, setSelectedLog] = useState<APILog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('1h');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, statusFilter, methodFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, status, methodFilter);
  };

  const handleMethodFilter = (method: string) => {
    setMethodFilter(method);
    applyFilters(searchTerm, statusFilter, method);
  };

  const applyFilters = (search: string, status: string, method: string) => {
    const filtered = logs;

    if (search) {
      filtered = filtered.filter(log => 
        log.endpoint.toLowerCase().includes(search.toLowerCase()) ||
        log.ipAddress.includes(search) ||
        log.userAgent.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      if (status === 'success') {
        filtered = filtered.filter(log => log.statusCode >= 200 && log.statusCode < 300);
      } else if (status === 'error') {
        filtered = filtered.filter(log => log.statusCode >= 400);
      }
    }

    if (method !== 'all') {
      filtered = filtered.filter(log => log.method === method);
    }

    setFilteredLogs(filtered);
  };

  const getStatusBadge = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return <Badge className="bg-green-100 text-green-700 border-green-300">Success</Badge>;
    } else if (statusCode >= 400 && statusCode < 500) {
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Client Error</Badge>;
    } else if (statusCode >= 500) {
      return <Badge className="bg-red-100 text-red-700 border-red-300">Server Error</Badge>;
    }
    return <Badge variant="secondary">{statusCode}</Badge>;
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-700';
      case 'POST': return 'bg-green-100 text-green-700';
      case 'PUT': return 'bg-yellow-100 text-yellow-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      case 'PATCH': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'Method', 'Endpoint', 'Status', 'Response Time', 'IP Address', 'User Agent'].join(','),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.method,
        log.endpoint,
        log.statusCode,
        log.responseTime,
        log.ipAddress,
        `"${log.userAgent}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Logs exported successfully');
  };

  const refreshLogs = () => {
    toast.success('Logs refreshed');
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Calculate stats
  const totalRequests = filteredLogs.length;
  const successRate = filteredLogs.length > 0 
    ? ((filteredLogs.filter(log => log.statusCode >= 200 && log.statusCode < 300).length / filteredLogs.length) * 100).toFixed(1)
    : '0';
  const avgResponseTime = filteredLogs.length > 0
    ? Math.round(filteredLogs.reduce((sum, log) => sum + log.responseTime, 0) / filteredLogs.length)
    : 0;
  const errorCount = filteredLogs.filter(log => log.statusCode >= 400).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            API Logs
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze API request logs in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshLogs}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              In selected timeframe
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successRate}%</div>
            <p className="text-xs text-muted-foreground">
              2xx responses
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/5 to-red-500/10 border-red-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorCount}</div>
            <p className="text-xs text-muted-foreground">
              4xx/5xx responses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search endpoints, IPs..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success (2xx)</SelectItem>
                  <SelectItem value="error">Error (4xx/5xx)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Method</Label>
              <Select value={methodFilter} onValueChange={handleMethodFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Time Range</Label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Request Logs
          </CardTitle>
          <CardDescription>Real-time API request and response logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>User Agent</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatTimestamp(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getMethodColor(log.method)}>
                        {log.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.endpoint}</TableCell>
                    <TableCell>
                      {getStatusBadge(log.statusCode)}
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className={log.responseTime > 1000 ? 'text-red-600' : log.responseTime > 500 ? 'text-yellow-600' : 'text-green-600'}>
                        {log.responseTime}ms
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-40">
                      {log.userAgent}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                          <DialogHeader>
                            <DialogTitle>Request Details</DialogTitle>
                            <DialogDescription>
                              {log.method} {log.endpoint} - {log.statusCode}
                            </DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="overview">Overview</TabsTrigger>
                              <TabsTrigger value="request">Request</TabsTrigger>
                              <TabsTrigger value="response">Response</TabsTrigger>
                              <TabsTrigger value="headers">Headers</TabsTrigger>
                            </TabsList>
                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Timestamp</Label>
                                  <div className="text-sm font-mono">{formatTimestamp(log.timestamp)}</div>
                                </div>
                                <div>
                                  <Label>Response Time</Label>
                                  <div className="text-sm">{log.responseTime}ms</div>
                                </div>
                                <div>
                                  <Label>IP Address</Label>
                                  <div className="text-sm font-mono">{log.ipAddress}</div>
                                </div>
                                <div>
                                  <Label>API Key</Label>
                                  <div className="text-sm font-mono">{log.apiKey}</div>
                                </div>
                                <div>
                                  <Label>Request Size</Label>
                                  <div className="text-sm">{log.requestSize} bytes</div>
                                </div>
                                <div>
                                  <Label>Response Size</Label>
                                  <div className="text-sm">{log.responseSize} bytes</div>
                                </div>
                              </div>
                              {log.error && (
                                <div>
                                  <Label>Error</Label>
                                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{log.error}</div>
                                </div>
                              )}
                            </TabsContent>
                            <TabsContent value="request">
                              <ScrollArea className="h-96">
                                <div className="space-y-4">
                                  <div>
                                    <Label>URL</Label>
                                    <div className="text-sm font-mono bg-muted p-2 rounded">
                                      {log.method} {log.endpoint}
                                    </div>
                                  </div>
                                  {log.requestBody && (
                                    <div>
                                      <Label>Request Body</Label>
                                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                                        {JSON.stringify(log.requestBody, null, 2)}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              </ScrollArea>
                            </TabsContent>
                            <TabsContent value="response">
                              <ScrollArea className="h-96">
                                <div className="space-y-4">
                                  <div>
                                    <Label>Status Code</Label>
                                    <div className="text-sm">{getStatusBadge(log.statusCode)}</div>
                                  </div>
                                  {log.responseBody && (
                                    <div>
                                      <Label>Response Body</Label>
                                      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                                        {JSON.stringify(log.responseBody, null, 2)}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              </ScrollArea>
                            </TabsContent>
                            <TabsContent value="headers">
                              <ScrollArea className="h-96">
                                <div className="space-y-2">
                                  {Object.entries(log.headers).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center py-1 border-b">
                                      <span className="font-medium text-sm">{key}</span>
                                      <span className="text-sm font-mono text-muted-foreground">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </ScrollArea>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};