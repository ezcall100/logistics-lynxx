import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  Shield,
  User,
  Activity,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const AuditTrail = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  // Sample audit trail data
  const auditLogs = [
    {
      id: '1',
      timestamp: '2024-01-20T14:30:15Z',
      userId: 'USR-001',
      userName: 'John Smith',
      userRole: 'Admin',
      action: 'CREATE',
      resource: 'Invoice',
      resourceId: 'INV-2024-001',
      description: 'Created new invoice for ABC Logistics Corp',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      changes: {
        customer: 'ABC Logistics Corp',
        amount: 5500.00,
        status: 'draft'
      }
    },
    {
      id: '2',
      timestamp: '2024-01-20T14:25:42Z',
      userId: 'USR-002',
      userName: 'Sarah Johnson',
      userRole: 'Manager',
      action: 'UPDATE',
      resource: 'Carrier Rate',
      resourceId: 'RATE-001',
      description: 'Updated carrier rate for Express Transport',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      changes: {
        oldRate: 2.50,
        newRate: 2.75,
        effectiveDate: '2024-02-01'
      }
    },
    {
      id: '3',
      timestamp: '2024-01-20T14:20:18Z',
      userId: 'USR-003',
      userName: 'Mike Wilson',
      userRole: 'Dispatcher',
      action: 'DELETE',
      resource: 'Load',
      resourceId: 'LOAD-001',
      description: 'Attempted to delete completed load',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'failed',
      changes: {
        reason: 'Permission denied - completed loads cannot be deleted'
      }
    },
    {
      id: '4',
      timestamp: '2024-01-20T14:15:33Z',
      userId: 'USR-001',
      userName: 'John Smith',
      userRole: 'Admin',
      action: 'LOGIN',
      resource: 'System',
      resourceId: null,
      description: 'User logged in to the system',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      changes: {}
    },
    {
      id: '5',
      timestamp: '2024-01-20T14:10:07Z',
      userId: 'USR-004',
      userName: 'Lisa Chen',
      userRole: 'Accountant',
      action: 'VIEW',
      resource: 'Financial Report',
      resourceId: 'RPT-001',
      description: 'Accessed quarterly financial report',
      ipAddress: '192.168.1.115',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      changes: {}
    },
    {
      id: '6',
      timestamp: '2024-01-20T14:05:22Z',
      userId: 'USR-005',
      userName: 'Robert Brown',
      userRole: 'Operator',
      action: 'UPDATE',
      resource: 'Load Status',
      resourceId: 'LOAD-002',
      description: 'Updated load status to delivered',
      ipAddress: '192.168.1.120',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      status: 'success',
      changes: {
        oldStatus: 'in_transit',
        newStatus: 'delivered',
        deliveryTime: '2024-01-20T14:00:00Z'
      }
    },
    {
      id: '7',
      timestamp: '2024-01-20T13:58:41Z',
      userId: 'USR-002',
      userName: 'Sarah Johnson',
      userRole: 'Manager',
      action: 'CREATE',
      resource: 'User Account',
      resourceId: 'USR-006',
      description: 'Created new user account for Maria Rodriguez',
      ipAddress: '192.168.1.105',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success',
      changes: {
        username: 'maria.rodriguez',
        role: 'Dispatcher',
        department: 'Operations'
      }
    },
    {
      id: '8',
      timestamp: '2024-01-20T13:45:16Z',
      userId: 'USR-003',
      userName: 'Mike Wilson',
      userRole: 'Dispatcher',
      action: 'EXPORT',
      resource: 'Load Data',
      resourceId: null,
      description: 'Exported load data for January 2024',
      ipAddress: '192.168.1.110',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success',
      changes: {
        exportFormat: 'CSV',
        recordCount: 1250,
        dateRange: '2024-01-01 to 2024-01-31'
      }
    },
  ];

  const actionTypes = ['all', 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LOGIN', 'LOGOUT', 'EXPORT'];
  const users = [
    { id: 'all', name: 'All Users' },
    { id: 'USR-001', name: 'John Smith' },
    { id: 'USR-002', name: 'Sarah Johnson' },
    { id: 'USR-003', name: 'Mike Wilson' },
    { id: 'USR-004', name: 'Lisa Chen' },
    { id: 'USR-005', name: 'Robert Brown' },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesUser = selectedUser === 'all' || log.userId === selectedUser;
    return matchesSearch && matchesAction && matchesUser;
  });

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'CREATE':
        return <Badge className="bg-green-100 text-green-800">CREATE</Badge>;
      case 'UPDATE':
        return <Badge className="bg-blue-100 text-blue-800">UPDATE</Badge>;
      case 'DELETE':
        return <Badge className="bg-red-100 text-red-800">DELETE</Badge>;
      case 'VIEW':
        return <Badge className="bg-gray-100 text-gray-800">VIEW</Badge>;
      case 'LOGIN':
        return <Badge className="bg-purple-100 text-purple-800">LOGIN</Badge>;
      case 'LOGOUT':
        return <Badge className="bg-orange-100 text-orange-800">LOGOUT</Badge>;
      case 'EXPORT':
        return <Badge className="bg-yellow-100 text-yellow-800">EXPORT</Badge>;
      default:
        return <Badge variant="secondary">{action}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  // Calculate summary statistics
  const totalActions = auditLogs.length;
  const uniqueUsers = new Set(auditLogs.map(log => log.userId)).size;
  const successfulActions = auditLogs.filter(log => log.status === 'success').length;
  const failedActions = auditLogs.filter(log => log.status === 'failed').length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Audit Trail</h1>
            <p className="text-muted-foreground">
              Track all system activities and user actions for compliance and security
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Actions</p>
                  <p className="text-lg font-bold">
                    {totalActions}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <Activity className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-lg font-bold">
                    {uniqueUsers}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <User className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Successful</p>
                  <p className="text-lg font-bold text-green-600">
                    {successfulActions}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Failed</p>
                  <p className="text-lg font-bold text-red-600">
                    {failedActions}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-red-100">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Activity Logs</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto flex-wrap">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Select value={selectedAction} onValueChange={setSelectedAction}>
                  <SelectTrigger className="w-32">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {actionTypes.map((action) => (
                      <SelectItem key={action} value={action}>
                        {action === 'all' ? 'All Actions' : action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="w-48">
                    <User className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-32">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      From
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-32">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      To
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{log.userName}</div>
                        <div className="text-sm text-muted-foreground">{log.userRole}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getActionBadge(log.action)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{log.resource}</div>
                        {log.resourceId && (
                          <div className="text-sm text-muted-foreground font-mono">{log.resourceId}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate">{log.description}</div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.ipAddress}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="capitalize">{log.status}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AuditTrail;