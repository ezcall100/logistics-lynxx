/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  RefreshCw, 
  Eye, 
  CheckCircle, 
  XCircle,
  Clock,
  FileText,
  User,
  Calendar,
  Zap,
  RotateCcw,
  Download,
  Bug,
  Settings
} from 'lucide-react';

const ErrorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedError, setSelectedError] = useState<string | null>(null);

  const errorRecords = [
    {
      id: "ERR-2024-001847",
      timestamp: "2024-01-15 14:32:15",
      severity: "critical",
      status: "open",
      type: "mapping_error",
      partner: "QuickShip LLC",
      transaction: "EDI 210",
      message: "Required field B201 missing in invoice data",
      description: "Invoice processing failed due to missing shipment identification number in segment B2",
      assignedTo: "John Smith",
      resolution: "",
      attempts: 0,
      lastAttempt: null,
      errorCode: "MAP_001"
    },
    {
      id: "ERR-2024-001846",
      timestamp: "2024-01-15 14:28:22",
      severity: "high",
      status: "in_progress",
      type: "validation_error",
      partner: "TruckMaster Inc",
      transaction: "EDI 204",
      message: "Invalid date format in DTM segment",
      description: "Date format does not comply with CCYYMMDD standard",
      assignedTo: "Sarah Johnson",
      resolution: "Configuring date format transformation rule",
      attempts: 2,
      lastAttempt: "2024-01-15 14:30:00",
      errorCode: "VAL_003"
    },
    {
      id: "ERR-2024-001845",
      timestamp: "2024-01-15 14:25:08",
      severity: "medium",
      status: "resolved",
      type: "connection_error",
      partner: "ABC Logistics",
      transaction: "EDI 997",
      message: "Connection timeout during acknowledgment",
      description: "Network timeout occurred while sending functional acknowledgment",
      assignedTo: "Mike Davis",
      resolution: "Increased timeout threshold and implemented retry mechanism",
      attempts: 3,
      lastAttempt: "2024-01-15 14:26:45",
      errorCode: "CON_002"
    },
    {
      id: "ERR-2024-001844",
      timestamp: "2024-01-15 14:22:33",
      severity: "low",
      status: "open",
      type: "format_error",
      partner: "MegaHaul Corp",
      transaction: "EDI 214",
      message: "Unexpected character in segment terminator",
      description: "Non-standard segment terminator character detected",
      assignedTo: "Lisa Chen",
      resolution: "",
      attempts: 0,
      lastAttempt: null,
      errorCode: "FMT_001"
    },
    {
      id: "ERR-2024-001843",
      timestamp: "2024-01-15 14:19:45",
      severity: "critical",
      status: "escalated",
      type: "business_rule_error",
      partner: "FastTruck Express",
      transaction: "EDI 990",
      message: "Load acceptance exceeds carrier capacity",
      description: "Attempted to assign load exceeding maximum weight capacity",
      assignedTo: "Robert Wilson",
      resolution: "Escalated to operations team for capacity review",
      attempts: 1,
      lastAttempt: "2024-01-15 14:20:15",
      errorCode: "BUS_004"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      case 'high': return <Badge className="bg-orange-500 text-white">High</Badge>;
      case 'medium': return <Badge className="bg-yellow-500 text-white">Medium</Badge>;
      case 'low': return <Badge variant="secondary">Low</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge variant="destructive">Open</Badge>;
      case 'in_progress': return <Badge className="bg-blue-500 text-white">In Progress</Badge>;
      case 'resolved': return <Badge variant="default">Resolved</Badge>;
      case 'escalated': return <Badge className="bg-purple-500 text-white">Escalated</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'in_progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'escalated': return <AlertTriangle className="h-4 w-4 text-purple-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredErrors = errorRecords.filter(error => {
    const matchesSearch = searchTerm === '' || 
      error.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      error.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || error.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || error.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const selectedErrorData = selectedError ? errorRecords.find(err => err.id === selectedError) : null;

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EDI Error Management</h1>
          <p className="text-muted-foreground">
            Monitor, diagnose, and resolve EDI processing errors
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorRecords.length}</div>
            <p className="text-xs text-muted-foreground">Active issues</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {errorRecords.filter(e => e.severity === 'critical').length}
            </div>
            <p className="text-xs text-muted-foreground">Urgent attention needed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {errorRecords.filter(e => e.status === 'in_progress').length}
            </div>
            <p className="text-xs text-muted-foreground">Being resolved</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {errorRecords.filter(e => e.status === 'resolved').length}
            </div>
            <p className="text-xs text-muted-foreground">Successfully fixed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Error List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Error Records
            </CardTitle>
            <CardDescription>Recent EDI processing errors and their status</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex gap-4 mb-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search errors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error List */}
            <div className="space-y-3">
              {filteredErrors.map((error) => (
                <div 
                  key={error.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedError === error.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedError(error.id)}
                >
                  <div className="flex items-start gap-4">
                    {getStatusIcon(error.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{error.id}</span>
                        {getSeverityBadge(error.severity)}
                        {getStatusBadge(error.status)}
                      </div>
                      <div className="text-sm font-medium mb-1">{error.message}</div>
                      <div className="text-xs text-muted-foreground">
                        {error.partner} • {error.transaction} • {error.timestamp}
                      </div>
                      {error.assignedTo && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Assigned to: {error.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Error Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Error Details
            </CardTitle>
            <CardDescription>
              {selectedErrorData ? 'Detailed error information and resolution' : 'Select an error to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedErrorData ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Error ID</h4>
                  <p className="font-medium">{selectedErrorData.id}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Description</h4>
                  <p className="text-sm">{selectedErrorData.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Partner</h4>
                    <p className="text-sm">{selectedErrorData.partner}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Transaction</h4>
                    <p className="text-sm">{selectedErrorData.transaction}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Error Code</h4>
                  <Badge variant="outline">{selectedErrorData.errorCode}</Badge>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Resolution Notes</h4>
                  <Textarea 
                    value={selectedErrorData.resolution} 
                    placeholder="Add resolution notes..."
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Attempts</h4>
                    <p className="text-sm">{selectedErrorData.attempts}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Last Attempt</h4>
                    <p className="text-sm">{selectedErrorData.lastAttempt || 'None'}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Retry Processing
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Settings className="h-4 w-4" />
                    Configure Fix
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <User className="h-4 w-4" />
                    Reassign
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Bug className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>Select an error from the list to view detailed information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ErrorManagement;