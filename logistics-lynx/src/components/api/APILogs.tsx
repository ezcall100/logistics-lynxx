/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, Eye, Download, RefreshCw, Activity, Clock, Server, Zap } from 'lucide-react';
import { mockAPILogs, APILog } from '@/data/mockAPIData';

export const APILogs: React.FC = () => {
  const [logs, setLogs] = useState<APILog[]>(mockAPILogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<APILog | null>(null);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ip_address.includes(searchTerm) ||
                         log.user_agent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'success' && log.status_code >= 200 && log.status_code < 300) ||
                         (statusFilter === 'error' && log.status_code >= 400);
    
    const matchesMethod = methodFilter === 'all' || log.method === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) return 'bg-green-100 text-green-800';
    if (statusCode >= 300 && statusCode < 400) return 'bg-blue-100 text-blue-800';
    if (statusCode >= 400 && statusCode < 500) return 'bg-yellow-100 text-yellow-800';
    if (statusCode >= 500) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalRequests = logs.length;
  const successfulRequests = logs.filter(log => log.status_code >= 200 && log.status_code < 300).length;
  const averageResponseTime = Math.round(logs.reduce((sum, log) => sum + log.response_time, 0) / logs.length);
  const totalDataTransfer = logs.reduce((sum, log) => sum + log.request_size + log.response_size, 0);

  const handleRefresh = () => {
    // Simulate refreshing logs
    setLogs([...mockAPILogs]);
  };

  const handleExport = () => {
    // Simulate exporting logs
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Timestamp,Endpoint,Method,Status,Response Time,IP Address\n" +
      filteredLogs.map(log => 
        `${log.timestamp},${log.endpoint},${log.method},${log.status_code},${log.response_time},${log.ip_address}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "api_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Server className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((successfulRequests / totalRequests) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {successfulRequests} successful
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageResponseTime}ms</div>
            <p className="text-xs text-muted-foreground">
              Average latency
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Transfer</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(totalDataTransfer / 1024)}KB
            </div>
            <p className="text-xs text-muted-foreground">
              Total bandwidth
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>API Logs</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search endpoints, IP addresses, or user agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success (2xx)</SelectItem>
                <SelectItem value="error">Error (4xx, 5xx)</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by method" />
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-[70px]">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.endpoint}
                  </TableCell>
                  <TableCell>
                    <Badge className={getMethodColor(log.method)}>
                      {log.method}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(log.status_code)}>
                      {log.status_code}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.response_time}ms</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip_address}</TableCell>
                  <TableCell>
                    {Math.round((log.request_size + log.response_size) / 1024)}KB
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Request Details</DialogTitle>
                        </DialogHeader>
                        {selectedLog && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Endpoint</label>
                                <p className="font-mono text-sm">{selectedLog.endpoint}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Method</label>
                                <p>{selectedLog.method}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Status Code</label>
                                <p>{selectedLog.status_code}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Response Time</label>
                                <p>{selectedLog.response_time}ms</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">IP Address</label>
                                <p className="font-mono text-sm">{selectedLog.ip_address}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Timestamp</label>
                                <p>{new Date(selectedLog.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">User Agent</label>
                              <p className="font-mono text-sm break-all">{selectedLog.user_agent}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Request Size</label>
                                <p>{selectedLog.request_size} bytes</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Response Size</label>
                                <p>{selectedLog.response_size} bytes</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
