import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Globe, Users, Settings, Shield, Activity, 
  Plus, Edit, Trash2, Eye, EyeOff, RefreshCw,
  Search, Filter, Download, Upload, Lock, Unlock,
  AlertTriangle, CheckCircle, Clock, Calendar,
  Database, Server, Network, Zap, Target,
  ArrowUpRight, ArrowDownRight, Minus, MoreHorizontal
} from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  type: 'carrier' | 'broker' | 'shipper' | 'admin' | 'autonomous' | 'super_admin' | 'driver' | 'owner_operator';
  status: 'active' | 'inactive' | 'maintenance' | 'suspended';
  users: number;
  maxUsers: number;
  lastActive: string;
  createdDate: string;
  description: string;
  features: string[];
  permissions: string[];
  storage: {
    used: number;
    total: number;
    unit: string;
  };
  performance: {
    uptime: number;
    responseTime: number;
    errorRate: number;
  };
  version: string;
  environment: 'production' | 'staging' | 'development';
}

const AllPortalsPage = () => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    loadAllPortals();
  }, []);

  const loadAllPortals = async () => {
    setLoading(true);
    try {
      // Mock data for all portals
      const mockPortals: Portal[] = [
        {
          id: 'portal-001',
          name: 'Carrier Portal',
          type: 'carrier',
          status: 'active',
          users: 1250,
          maxUsers: 2000,
          lastActive: '2024-01-15T10:30:00Z',
          createdDate: '2023-06-15T00:00:00Z',
          description: 'Portal for carrier companies to manage shipments and track deliveries',
          features: ['shipment_tracking', 'rate_management', 'document_management'],
          permissions: ['read', 'write', 'admin'],
          storage: { used: 45.2, total: 100, unit: 'GB' },
          performance: { uptime: 99.8, responseTime: 245, errorRate: 0.2 },
          version: '2.1.0',
          environment: 'production'
        },
        {
          id: 'portal-002',
          name: 'Broker Portal',
          type: 'broker',
          status: 'active',
          users: 890,
          maxUsers: 1500,
          lastActive: '2024-01-15T10:25:00Z',
          createdDate: '2023-07-20T00:00:00Z',
          description: 'Freight broker operations and load management',
          features: ['load_matching', 'rate_negotiation', 'carrier_management'],
          permissions: ['read', 'write', 'admin'],
          storage: { used: 32.1, total: 80, unit: 'GB' },
          performance: { uptime: 99.9, responseTime: 180, errorRate: 0.1 },
          version: '2.0.5',
          environment: 'production'
        },
        {
          id: 'portal-003',
          name: 'Shipper Portal',
          type: 'shipper',
          status: 'active',
          users: 2100,
          maxUsers: 3000,
          lastActive: '2024-01-15T10:28:00Z',
          createdDate: '2023-05-10T00:00:00Z',
          description: 'Shipper operations and shipment management',
          features: ['shipment_creation', 'tracking', 'invoicing'],
          permissions: ['read', 'write'],
          storage: { used: 78.5, total: 150, unit: 'GB' },
          performance: { uptime: 99.7, responseTime: 320, errorRate: 0.3 },
          version: '2.2.1',
          environment: 'production'
        },
        {
          id: 'portal-004',
          name: 'Admin Portal',
          type: 'admin',
          status: 'active',
          users: 45,
          maxUsers: 100,
          lastActive: '2024-01-15T10:20:00Z',
          createdDate: '2023-04-01T00:00:00Z',
          description: 'System administration and user management',
          features: ['user_management', 'system_config', 'audit_logs'],
          permissions: ['admin'],
          storage: { used: 12.3, total: 50, unit: 'GB' },
          performance: { uptime: 99.9, responseTime: 150, errorRate: 0.05 },
          version: '2.1.5',
          environment: 'production'
        },
        {
          id: 'portal-005',
          name: 'Driver Portal',
          type: 'driver',
          status: 'active',
          users: 3500,
          maxUsers: 5000,
          lastActive: '2024-01-15T10:35:00Z',
          createdDate: '2023-08-15T00:00:00Z',
          description: 'Mobile interface for drivers',
          features: ['route_navigation', 'load_updates', 'time_tracking'],
          permissions: ['read', 'write'],
          storage: { used: 25.8, total: 60, unit: 'GB' },
          performance: { uptime: 99.6, responseTime: 280, errorRate: 0.4 },
          version: '1.9.2',
          environment: 'production'
        },
        {
          id: 'portal-006',
          name: 'Owner Operator Portal',
          type: 'owner_operator',
          status: 'maintenance',
          users: 120,
          maxUsers: 300,
          lastActive: '2024-01-15T09:45:00Z',
          createdDate: '2023-09-01T00:00:00Z',
          description: 'Owner operator business management',
          features: ['business_management', 'financial_tracking', 'compliance'],
          permissions: ['read', 'write', 'admin'],
          storage: { used: 8.7, total: 40, unit: 'GB' },
          performance: { uptime: 98.5, responseTime: 450, errorRate: 1.5 },
          version: '1.8.0',
          environment: 'staging'
        }
      ];
      setPortals(mockPortals);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portal data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'production': return 'bg-blue-500';
      case 'staging': return 'bg-orange-500';
      case 'development': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredPortals = portals.filter(portal => {
    const matchesSearch = portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         portal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || portal.status === filterStatus;
    const matchesType = filterType === 'all' || portal.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleTogglePortalStatus = (id: string, newStatus: string) => {
    setPortals(prev => 
      prev.map(portal => 
        portal.id === id ? { ...portal, status: newStatus as any } : portal
      )
    );
    toast({
      title: "Portal Status Updated",
      description: `Portal status changed to ${newStatus}`,
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading All Portals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Portals</h1>
          <p className="text-muted-foreground">
            View and manage all portals in the system
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Portal
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search portals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="carrier">Carrier</SelectItem>
            <SelectItem value="broker">Broker</SelectItem>
            <SelectItem value="shipper">Shipper</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="driver">Driver</SelectItem>
            <SelectItem value="owner_operator">Owner Operator</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={loadAllPortals}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Portals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Portal List</CardTitle>
          <CardDescription>
            {filteredPortals.length} of {portals.length} portals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Portal</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPortals.map((portal) => (
                <TableRow key={portal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{portal.name}</div>
                      <div className="text-sm text-muted-foreground">{portal.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {portal.type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(portal.status)} text-white`}>
                      {portal.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {portal.users.toLocaleString()} / {portal.maxUsers.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {((portal.users / portal.maxUsers) * 100).toFixed(1)}% capacity
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        {portal.performance.uptime}% uptime
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {portal.performance.responseTime}ms response
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {portal.storage.used} / {portal.storage.total} {portal.storage.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {((portal.storage.used / portal.storage.total) * 100).toFixed(1)}% used
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getEnvironmentColor(portal.environment)} text-white text-xs`}>
                        {portal.environment}
                      </Badge>
                      <span className="text-sm">{portal.version}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(portal.lastActive).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(portal.lastActive).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
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

export default AllPortalsPage;
