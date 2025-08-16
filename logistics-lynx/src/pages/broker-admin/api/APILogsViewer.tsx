/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, ChevronDown, Download, Filter, RefreshCw, Search } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface APILog {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  statusCode: number;
  responseTime: number;
  ipAddress: string;
  userAgent: string;
  apiKey: string;
  requestSize: number;
  responseSize: number;
  error?: string;
}

const APILogsViewer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [apiLogs] = useState<APILog[]>([
    {
      id: '1',
      timestamp: '2024-01-15T10:30:15Z',
      method: 'GET',
      endpoint: '/api/v1/loads',
      statusCode: 200,
      responseTime: 145,
      ipAddress: '192.168.1.100',
      userAgent: 'TMS-Mobile/2.1.0',
      apiKey: 'sk_prod_1234...cdef',
      requestSize: 0,
      responseSize: 15400
    },
    {
      id: '2',
      timestamp: '2024-01-15T10:29:45Z',
      method: 'POST',
      endpoint: '/api/v1/shipments',
      statusCode: 201,
      responseTime: 289,
      ipAddress: '192.168.1.101',
      userAgent: 'Chrome/121.0.0.0',
      apiKey: 'sk_dev_abcd...7890',
      requestSize: 2340,
      responseSize: 890
    },
    {
      id: '3',
      timestamp: '2024-01-15T10:29:12Z',
      method: 'GET',
      endpoint: '/api/v1/carriers',
      statusCode: 500,
      responseTime: 1205,
      ipAddress: '192.168.1.102',
      userAgent: 'PostmanRuntime/7.32.0',
      apiKey: 'sk_prod_1234...cdef',
      requestSize: 0,
      responseSize: 245,
      error: 'Database connection timeout'
    },
    {
      id: '4',
      timestamp: '2024-01-15T10:28:33Z',
      method: 'PUT',
      endpoint: '/api/v1/loads/12345',
      statusCode: 200,
      responseTime: 234,
      ipAddress: '192.168.1.103',
      userAgent: 'TMS-Web/3.0.0',
      apiKey: 'sk_prod_1234...cdef',
      requestSize: 1560,
      responseSize: 1100
    },
    {
      id: '5',
      timestamp: '2024-01-15T10:27:58Z',
      method: 'DELETE',
      endpoint: '/api/v1/quotes/67890',
      statusCode: 204,
      responseTime: 89,
      ipAddress: '192.168.1.104',
      userAgent: 'TMS-Mobile/2.1.0',
      apiKey: 'sk_dev_abcd...7890',
      requestSize: 0,
      responseSize: 0
    },
    {
      id: '6',
      timestamp: '2024-01-15T10:27:22Z',
      method: 'GET',
      endpoint: '/api/v1/rates',
      statusCode: 401,
      responseTime: 45,
      ipAddress: '192.168.1.105',
      userAgent: 'Python-requests/2.28.0',
      apiKey: 'sk_invalid_key',
      requestSize: 0,
      responseSize: 156,
      error: 'Invalid API key'
    }
  ]);

  const getStatusBadge = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return <Badge className="bg-green-100 text-green-800">Success</Badge>;
    } else if (statusCode >= 400 && statusCode < 500) {
      return <Badge variant="destructive">Client Error</Badge>;
    } else if (statusCode >= 500) {
      return <Badge className="bg-red-100 text-red-800">Server Error</Badge>;
    }
    return <Badge variant="secondary">{statusCode}</Badge>;
  };

  const getMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      GET: 'bg-blue-100 text-blue-800',
      POST: 'bg-green-100 text-green-800',
      PUT: 'bg-yellow-100 text-yellow-800',
      DELETE: 'bg-red-100 text-red-800',
      PATCH: 'bg-purple-100 text-purple-800'
    };
    return <Badge className={colors[method] || 'bg-gray-100 text-gray-800'}>{method}</Badge>;
  };

  const filteredLogs = apiLogs.filter(log => {
    const matchesSearch = log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress.includes(searchTerm) ||
                         log.apiKey.includes(searchTerm);
    const matchesMethod = selectedMethod === 'all' || log.method === selectedMethod;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'success' && log.statusCode >= 200 && log.statusCode < 300) ||
                         (selectedStatus === 'error' && log.statusCode >= 400);
    return matchesSearch && matchesMethod && matchesStatus;
  });

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Logs</h1>
          <p className="text-muted-foreground">
            Monitor and analyze API request logs in real-time
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Activity</CardTitle>
          <CardDescription>
            Live API request monitoring with filtering capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search endpoints, IPs, or API keys..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedMethod} onValueChange={setSelectedMethod}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="error">Errors</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Last 1 hour</DropdownMenuItem>
                <DropdownMenuItem>Last 24 hours</DropdownMenuItem>
                <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                <DropdownMenuItem>Custom range</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getMethodBadge(log.method)}
                    <span className="font-mono text-sm">{log.endpoint}</span>
                    {getStatusBadge(log.statusCode)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="block font-medium">Response Time</span>
                    <span className={log.responseTime > 1000 ? 'text-red-600' : log.responseTime > 500 ? 'text-yellow-600' : 'text-green-600'}>
                      {log.responseTime}ms
                    </span>
                  </div>
                  <div>
                    <span className="block font-medium">IP Address</span>
                    <span>{log.ipAddress}</span>
                  </div>
                  <div>
                    <span className="block font-medium">API Key</span>
                    <span className="font-mono">{log.apiKey}</span>
                  </div>
                  <div>
                    <span className="block font-medium">Request Size</span>
                    <span>{log.requestSize} bytes</span>
                  </div>
                  <div>
                    <span className="block font-medium">Response Size</span>
                    <span>{log.responseSize} bytes</span>
                  </div>
                  <div>
                    <span className="block font-medium">User Agent</span>
                    <span className="truncate">{log.userAgent}</span>
                  </div>
                </div>
                {log.error && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    <strong>Error:</strong> {log.error}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No logs match your current filters</p>
              <Button variant="outline" className="mt-2" onClick={() => {
                setSearchTerm('');
                setSelectedMethod('all');
                setSelectedStatus('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">
              +15.2% from last hour
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-muted-foreground">
              -0.5% from last hour
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">
              -12ms from last hour
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default APILogsViewer;