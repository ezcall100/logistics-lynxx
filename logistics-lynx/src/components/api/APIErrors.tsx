
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, AlertTriangle, CheckCircle, Eye, RefreshCw, XCircle, AlertCircle, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { mockAPIErrors, APIError } from '@/data/mockAPIData';

export const APIErrors: React.FC = () => {
  const [errors, setErrors] = useState<APIError[]>(mockAPIErrors);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedError, setSelectedError] = useState<APIError | null>(null);

  const filteredErrors = errors.filter(error => {
    const matchesSearch = error.error_message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         error.error_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || error.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'resolved' && error.resolved) ||
                         (statusFilter === 'unresolved' && !error.resolved);
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <AlertCircle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <XCircle className="h-4 w-4" />;
      case 'critical': return <Zap className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const totalErrors = errors.length;
  const resolvedErrors = errors.filter(error => error.resolved).length;
  const criticalErrors = errors.filter(error => error.severity === 'critical').length;
  const unresolvedErrors = totalErrors - resolvedErrors;

  const handleResolve = (errorId: string) => {
    setErrors(prev => prev.map(error => 
      error.id === errorId ? { ...error, resolved: true } : error
    ));
    toast({
      title: "Error Resolved",
      description: "The error has been marked as resolved."
    });
  };

  const handleRefresh = () => {
    // Simulate refreshing errors
    setErrors([...mockAPIErrors]);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalErrors}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unresolved</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unresolvedErrors}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <Zap className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalErrors}</div>
            <p className="text-xs text-muted-foreground">
              High priority
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((resolvedErrors / totalErrors) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {resolvedErrors} resolved
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>API Errors</CardTitle>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search errors by message, endpoint, or error code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Error Code</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="w-[140px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredErrors.map((error) => (
                <TableRow key={error.id}>
                  <TableCell>
                    {new Date(error.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {error.error_code}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {error.endpoint}
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(error.severity)}>
                      <div className="flex items-center space-x-1">
                        {getSeverityIcon(error.severity)}
                        <span>{error.severity}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={error.resolved ? "default" : "destructive"}>
                      {error.resolved ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                      )}
                      {error.resolved ? 'Resolved' : 'Unresolved'}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {error.error_message}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedError(error)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[700px]">
                          <DialogHeader>
                            <DialogTitle>Error Details</DialogTitle>
                          </DialogHeader>
                          {selectedError && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Error Code</label>
                                  <p className="font-mono text-sm">{selectedError.error_code}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Severity</label>
                                  <Badge className={getSeverityColor(selectedError.severity)}>
                                    {selectedError.severity}
                                  </Badge>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Endpoint</label>
                                  <p className="font-mono text-sm">{selectedError.endpoint}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Method</label>
                                  <p>{selectedError.method}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">IP Address</label>
                                  <p className="font-mono text-sm">{selectedError.ip_address}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Timestamp</label>
                                  <p>{new Date(selectedError.timestamp).toLocaleString()}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Error Message</label>
                                <p className="text-sm">{selectedError.error_message}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium">Stack Trace</label>
                                <Textarea 
                                  value={selectedError.stack_trace} 
                                  readOnly 
                                  className="font-mono text-xs h-32"
                                />
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      {!error.resolved && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleResolve(error.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
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
