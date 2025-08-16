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
import { Textarea } from '@/components/ui/textarea';
import { Search, Filter, AlertTriangle, XCircle, CheckCircle, Clock, TrendingDown, Bug, Code, Eye, Archive, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';

interface APIError {
  id: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'resolved' | 'ignored';
  errorCode: string;
  errorMessage: string;
  endpoint: string;
  method: string;
  statusCode: number;
  occurrences: number;
  firstOccurrence: string;
  lastOccurrence: string;
  affectedUsers: number;
  stackTrace?: string;
  resolution?: string;
  assignedTo?: string;
  tags: string[];
  metadata: Record<string, unknown>;
}

const mockErrors: APIError[] = [
  {
    id: '1',
    timestamp: '2024-01-20T10:30:45.123Z',
    severity: 'critical',
    status: 'investigating',
    errorCode: 'TIMEOUT_ERROR',
    errorMessage: 'Database connection timeout after 30 seconds',
    endpoint: '/api/v1/shipments',
    method: 'GET',
    statusCode: 500,
    occurrences: 23,
    firstOccurrence: '2024-01-20T09:15:30.000Z',
    lastOccurrence: '2024-01-20T10:30:45.123Z',
    affectedUsers: 15,
    stackTrace: `Error: Database connection timeout
    at DatabasePool.query (/app/db/pool.js:142)
    at ShipmentService.getShipments (/app/services/shipment.js:45)
    at ShipmentController.list (/app/controllers/shipment.js:23)`,
    assignedTo: 'Backend Team',
    tags: ['database', 'timeout', 'production'],
    metadata: {
      server: 'api-server-03',
      region: 'us-west-2',
      load: '85%'
    }
  },
  {
    id: '2',
    timestamp: '2024-01-20T10:25:12.456Z',
    severity: 'high',
    status: 'open',
    errorCode: 'VALIDATION_ERROR',
    errorMessage: 'Invalid shipment status transition from delivered to pending',
    endpoint: '/api/v1/shipments/SH001/status',
    method: 'PUT',
    statusCode: 400,
    occurrences: 8,
    firstOccurrence: '2024-01-20T08:45:20.000Z',
    lastOccurrence: '2024-01-20T10:25:12.456Z',
    affectedUsers: 3,
    tags: ['validation', 'business-logic'],
    metadata: {
      shipment_id: 'SH001',
      current_status: 'delivered',
      requested_status: 'pending'
    }
  },
  {
    id: '3',
    timestamp: '2024-01-20T10:20:33.789Z',
    severity: 'medium',
    status: 'resolved',
    errorCode: 'RATE_LIMIT_EXCEEDED',
    errorMessage: 'API rate limit exceeded: 1000 requests per hour',
    endpoint: '/api/v1/tracking',
    method: 'GET',
    statusCode: 429,
    occurrences: 156,
    firstOccurrence: '2024-01-20T09:00:00.000Z',
    lastOccurrence: '2024-01-20T10:20:33.789Z',
    affectedUsers: 12,
    resolution: 'Increased rate limit for authenticated users to 2000 requests per hour',
    tags: ['rate-limiting', 'capacity'],
    metadata: {
      api_key: 'tb_prod_***',
      current_limit: 1000,
      new_limit: 2000
    }
  },
  {
    id: '4',
    timestamp: '2024-01-20T10:15:45.012Z',
    severity: 'low',
    status: 'ignored',
    errorCode: 'INVALID_API_KEY',
    errorMessage: 'API key not found or expired',
    endpoint: '/api/v1/loads',
    method: 'POST',
    statusCode: 401,
    occurrences: 45,
    firstOccurrence: '2024-01-20T08:00:00.000Z',
    lastOccurrence: '2024-01-20T10:15:45.012Z',
    affectedUsers: 5,
    resolution: 'Automated detection of old/invalid API keys',
    tags: ['authentication', 'security'],
    metadata: {
      api_key_pattern: 'tb_old_***',
      automated_detection: true
    }
  },
  {
    id: '5',
    timestamp: '2024-01-20T10:10:18.345Z',
    severity: 'high',
    status: 'resolved',
    errorCode: 'EXTERNAL_SERVICE_DOWN',
    errorMessage: 'Unable to connect to GPS tracking service',
    endpoint: '/api/v1/tracking/update',
    method: 'POST',
    statusCode: 503,
    occurrences: 67,
    firstOccurrence: '2024-01-20T09:30:00.000Z',
    lastOccurrence: '2024-01-20T10:10:18.345Z',
    affectedUsers: 20,
    resolution: 'Implemented fallback tracking service and circuit breaker pattern',
    tags: ['external-service', 'tracking', 'fallback'],
    metadata: {
      service: 'gps-tracking-api',
      fallback_enabled: true,
      circuit_breaker: 'open'
    }
  }
];

const errorTrendData = [
  { time: '00:00', critical: 0, high: 2, medium: 5, low: 8 },
  { time: '04:00', critical: 1, high: 1, medium: 3, low: 6 },
  { time: '08:00', critical: 2, high: 4, medium: 8, low: 12 },
  { time: '12:00', critical: 1, high: 3, medium: 6, low: 15 },
  { time: '16:00', critical: 0, high: 2, medium: 4, low: 10 },
  { time: '20:00', critical: 1, high: 1, medium: 3, low: 7 },
];

const severityDistribution = [
  { name: 'Critical', value: 5, color: '#ef4444' },
  { name: 'High', value: 15, color: '#f97316' },
  { name: 'Medium', value: 35, color: '#eab308' },
  { name: 'Low', value: 45, color: '#22c55e' },
];

export const APIErrorTracker: React.FC = () => {
  const [errors, setErrors] = useState<APIError[]>(mockErrors);
  const [filteredErrors, setFilteredErrors] = useState<APIError[]>(mockErrors);
  const [selectedError, setSelectedError] = useState<APIError | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(term, severityFilter, statusFilter);
  };

  const handleSeverityFilter = (severity: string) => {
    setSeverityFilter(severity);
    applyFilters(searchTerm, severity, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    applyFilters(searchTerm, severityFilter, status);
  };

  const applyFilters = (search: string, severity: string, status: string) => {
    const filtered = errors;

    if (search) {
      filtered = filtered.filter(error => 
        error.errorMessage.toLowerCase().includes(search.toLowerCase()) ||
        error.endpoint.toLowerCase().includes(search.toLowerCase()) ||
        error.errorCode.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (severity !== 'all') {
      filtered = filtered.filter(error => error.severity === severity);
    }

    if (status !== 'all') {
      filtered = filtered.filter(error => error.status === status);
    }

    setFilteredErrors(filtered);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-700 border-red-300';
      case 'investigating': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'resolved': return 'bg-green-100 text-green-700 border-green-300';
      case 'ignored': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const updateErrorStatus = (errorId: string, newStatus: APIError['status']) => {
    setErrors(prev => prev.map(error => 
      error.id === errorId ? { ...error, status: newStatus } : error
    ));
    setFilteredErrors(prev => prev.map(error => 
      error.id === errorId ? { ...error, status: newStatus } : error
    ));
    toast.success(`Error status updated to ${newStatus}`);
  };

  const addResolution = (errorId: string, resolution: string) => {
    setErrors(prev => prev.map(error => 
      error.id === errorId ? { ...error, resolution, status: 'resolved' } : error
    ));
    setFilteredErrors(prev => prev.map(error => 
      error.id === errorId ? { ...error, resolution, status: 'resolved' } : error
    ));
    toast.success('Resolution added and error marked as resolved');
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  // Calculate stats
  const totalErrors = filteredErrors.length;
  const unresolvedErrors = filteredErrors.filter(error => error.status !== 'resolved' && error.status !== 'ignored').length;
  const criticalErrors = filteredErrors.filter(error => error.severity === 'critical').length;
  const resolutionRate = filteredErrors.length > 0 
    ? ((filteredErrors.filter(error => error.status === 'resolved').length / filteredErrors.length) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            API Error Tracker
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor, track, and resolve API errors and issues
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
            <Bug className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalErrors}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/5 to-red-500/10 border-red-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unresolved</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unresolvedErrors}</div>
            <p className="text-xs text-muted-foreground">
              {criticalErrors} critical
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalErrors}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Error Trends */}
        <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Error Trends
            </CardTitle>
            <CardDescription>Error occurrence by severity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={errorTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Critical" />
                <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} name="High" />
                <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} name="Medium" />
                <Line type="monotone" dataKey="low" stroke="#22c55e" strokeWidth={2} name="Low" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Severity Distribution */}
        <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Severity Distribution
            </CardTitle>
            <CardDescription>Error breakdown by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={severityDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {severityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search errors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>Severity</Label>
              <Select value={severityFilter} onValueChange={handleSeverityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="ignored">Ignored</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Errors Table */}
      <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Error Log
          </CardTitle>
          <CardDescription>Track and manage API errors and issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Error</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Occurrences</TableHead>
                  <TableHead>Affected Users</TableHead>
                  <TableHead>Last Occurrence</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredErrors.map((error) => (
                  <TableRow key={error.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{error.errorCode}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-60">
                          {error.errorMessage}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {error.method} {error.endpoint}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getSeverityColor(error.severity)}>
                        {error.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(error.status)}>
                        {error.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      <span className={error.occurrences > 50 ? 'text-red-600 font-medium' : ''}>
                        {error.occurrences}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{error.affectedUsers}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatTimestamp(error.lastOccurrence)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedError(error)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                            <DialogHeader>
                              <DialogTitle>{error.errorCode}</DialogTitle>
                              <DialogDescription>{error.errorMessage}</DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="details" className="w-full">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="stacktrace">Stack Trace</TabsTrigger>
                                <TabsTrigger value="metadata">Metadata</TabsTrigger>
                                <TabsTrigger value="resolution">Resolution</TabsTrigger>
                              </TabsList>
                              <TabsContent value="details" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>First Occurrence</Label>
                                    <div className="text-sm">{formatTimestamp(error.firstOccurrence)}</div>
                                  </div>
                                  <div>
                                    <Label>Last Occurrence</Label>
                                    <div className="text-sm">{formatTimestamp(error.lastOccurrence)}</div>
                                  </div>
                                  <div>
                                    <Label>Status Code</Label>
                                    <div className="text-sm">{error.statusCode}</div>
                                  </div>
                                  <div>
                                    <Label>Assigned To</Label>
                                    <div className="text-sm">{error.assignedTo || 'Unassigned'}</div>
                                  </div>
                                </div>
                                <div>
                                  <Label>Tags</Label>
                                  <div className="flex gap-2 mt-1">
                                    {error.tags.map((tag) => (
                                      <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateErrorStatus(error.id, 'investigating')}
                                    disabled={error.status === 'investigating'}
                                  >
                                    Start Investigation
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateErrorStatus(error.id, 'resolved')}
                                    disabled={error.status === 'resolved'}
                                  >
                                    Mark Resolved
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateErrorStatus(error.id, 'ignored')}
                                    disabled={error.status === 'ignored'}
                                  >
                                    Ignore
                                  </Button>
                                </div>
                              </TabsContent>
                              <TabsContent value="stacktrace">
                                <ScrollArea className="h-96">
                                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                                    {error.stackTrace || 'No stack trace available'}
                                  </pre>
                                </ScrollArea>
                              </TabsContent>
                              <TabsContent value="metadata">
                                <ScrollArea className="h-96">
                                  <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
                                    {JSON.stringify(error.metadata, null, 2)}
                                  </pre>
                                </ScrollArea>
                              </TabsContent>
                              <TabsContent value="resolution" className="space-y-4">
                                {error.resolution ? (
                                  <div>
                                    <Label>Current Resolution</Label>
                                    <div className="text-sm bg-green-50 p-3 rounded border">
                                      {error.resolution}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="resolution">Add Resolution</Label>
                                      <Textarea
                                        id="resolution"
                                        placeholder="Describe how this error was resolved..."
                                        rows={4}
                                      />
                                    </div>
                                    <Button
                                      onClick={() => {
                                        const textarea = document.getElementById('resolution') as HTMLTextAreaElement;
                                        if (textarea?.value) {
                                          addResolution(error.id, textarea.value);
                                        }
                                      }}
                                    >
                                      Add Resolution
                                    </Button>
                                  </div>
                                )}
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                        <Select
                          value={error.status}
                          onValueChange={(value) => updateErrorStatus(error.id, value as APIError['status'])}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="investigating">Investigating</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="ignored">Ignored</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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