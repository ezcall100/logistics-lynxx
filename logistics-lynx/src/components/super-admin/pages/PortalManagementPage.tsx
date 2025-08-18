import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Globe, Users, Settings, Shield, Activity, 
  Plus, Edit, Trash2, Eye, EyeOff, RefreshCw,
  Search, Filter, Download, Upload, Lock, Unlock,
  AlertTriangle, CheckCircle, Clock, Calendar,
  Database, Server, Network, Zap, Target,
  ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';

// Real data models
interface Portal {
  id: string;
  name: string;
  type: 'carrier' | 'broker' | 'shipper' | 'admin' | 'autonomous' | 'super_admin';
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
}

interface PortalUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer' | 'manager';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  portalAccess: string[];
  permissions: string[];
  createdAt: string;
}

interface PortalConfig {
  id: string;
  portalId: string;
  setting: string;
  value: string | number | boolean;
  type: 'string' | 'number' | 'boolean' | 'select';
  description: string;
  category: 'security' | 'performance' | 'features' | 'integrations';
  lastModified: string;
  modifiedBy: string;
}

// Mock API functions
const mockAPI = {
  getPortals: (): Promise<Portal[]> => Promise.resolve([
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
      storage: {
        used: 45.2,
        total: 100,
        unit: 'GB'
      },
      performance: {
        uptime: 99.8,
        responseTime: 245,
        errorRate: 0.2
      }
    },
    {
      id: 'portal-002',
      name: 'Broker Portal',
      type: 'broker',
      status: 'active',
      users: 890,
      maxUsers: 1500,
      lastActive: '2024-01-15T09:45:00Z',
      createdDate: '2023-07-20T00:00:00Z',
      description: 'Portal for freight brokers to manage loads and carrier relationships',
      features: ['load_management', 'carrier_matching', 'pricing_tools'],
      permissions: ['read', 'write', 'admin'],
      storage: {
        used: 32.8,
        total: 75,
        unit: 'GB'
      },
      performance: {
        uptime: 99.9,
        responseTime: 180,
        errorRate: 0.1
      }
    },
    {
      id: 'portal-003',
      name: 'Shipper Portal',
      type: 'shipper',
      status: 'active',
      users: 2100,
      maxUsers: 3000,
      lastActive: '2024-01-15T11:15:00Z',
      createdDate: '2023-05-10T00:00:00Z',
      description: 'Portal for shippers to book shipments and track deliveries',
      features: ['shipment_booking', 'tracking', 'invoicing'],
      permissions: ['read', 'write'],
      storage: {
        used: 78.5,
        total: 150,
        unit: 'GB'
      },
      performance: {
        uptime: 99.7,
        responseTime: 320,
        errorRate: 0.3
      }
    },
    {
      id: 'portal-004',
      name: 'Admin Portal',
      type: 'admin',
      status: 'maintenance',
      users: 45,
      maxUsers: 100,
      lastActive: '2024-01-15T08:30:00Z',
      createdDate: '2023-08-01T00:00:00Z',
      description: 'Administrative portal for system management and oversight',
      features: ['user_management', 'system_config', 'analytics'],
      permissions: ['read', 'write', 'admin', 'super_admin'],
      storage: {
        used: 12.3,
        total: 50,
        unit: 'GB'
      },
      performance: {
        uptime: 99.5,
        responseTime: 150,
        errorRate: 0.5
      }
    }
  ]),

  getPortalUsers: (): Promise<PortalUser[]> => Promise.resolve([
    {
      id: 'user-001',
      name: 'John Smith',
      email: 'john.smith@carrier.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-01-15T10:30:00Z',
      portalAccess: ['portal-001'],
      permissions: ['read', 'write', 'admin'],
      createdAt: '2023-06-20T00:00:00Z'
    },
    {
      id: 'user-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@broker.com',
      role: 'manager',
      status: 'active',
      lastLogin: '2024-01-15T09:45:00Z',
      portalAccess: ['portal-002'],
      permissions: ['read', 'write'],
      createdAt: '2023-07-25T00:00:00Z'
    },
    {
      id: 'user-003',
      name: 'Mike Davis',
      email: 'mike.davis@shipper.com',
      role: 'user',
      status: 'active',
      lastLogin: '2024-01-15T11:15:00Z',
      portalAccess: ['portal-003'],
      permissions: ['read', 'write'],
      createdAt: '2023-05-15T00:00:00Z'
    },
    {
      id: 'user-004',
      name: 'Lisa Wilson',
      email: 'lisa.wilson@admin.com',
      role: 'admin',
      status: 'inactive',
      lastLogin: '2024-01-10T14:20:00Z',
      portalAccess: ['portal-004'],
      permissions: ['read', 'write', 'admin'],
      createdAt: '2023-08-05T00:00:00Z'
    }
  ]),

  getPortalConfigs: (): Promise<PortalConfig[]> => Promise.resolve([
    {
      id: 'config-001',
      portalId: 'portal-001',
      setting: 'max_users',
      value: 2000,
      type: 'number',
      description: 'Maximum number of users allowed',
      category: 'features',
      lastModified: '2024-01-15T10:30:00Z',
      modifiedBy: 'admin@transbot.ai'
    },
    {
      id: 'config-002',
      portalId: 'portal-001',
      setting: 'session_timeout',
      value: 30,
      type: 'number',
      description: 'Session timeout in minutes',
      category: 'security',
      lastModified: '2024-01-14T15:20:00Z',
      modifiedBy: 'admin@transbot.ai'
    },
    {
      id: 'config-003',
      portalId: 'portal-001',
      setting: 'maintenance_mode',
      value: false,
      type: 'boolean',
      description: 'Enable maintenance mode',
      category: 'features',
      lastModified: '2024-01-13T09:45:00Z',
      modifiedBy: 'admin@transbot.ai'
    },
    {
      id: 'config-004',
      portalId: 'portal-002',
      setting: 'rate_limiting',
      value: true,
      type: 'boolean',
      description: 'Enable API rate limiting',
      category: 'performance',
      lastModified: '2024-01-12T14:30:00Z',
      modifiedBy: 'admin@transbot.ai'
    }
  ])
};

const PortalManagementPage = () => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [configs, setConfigs] = useState<PortalConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const [newPortalDialog, setNewPortalDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadPortalData();
  }, []);

  const loadPortalData = async () => {
    setLoading(true);
    try {
      const [portalsData, usersData, configsData] = await Promise.all([
        mockAPI.getPortals(),
        mockAPI.getPortalUsers(),
        mockAPI.getPortalConfigs()
      ]);

      setPortals(portalsData);
      setUsers(usersData);
      setConfigs(configsData);
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

  const handleDeletePortal = (id: string) => {
    setPortals(prev => prev.filter(portal => portal.id !== id));
    toast({
      title: "Portal Deleted",
      description: "Portal has been deleted successfully",
    });
  };

  const handleCreatePortal = () => {
    toast({
      title: "Portal Created",
      description: "New portal has been created successfully",
    });
    setNewPortalDialog(false);
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
      )
    );
    toast({
      title: "User Status Updated",
      description: "User status has been toggled",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'carrier': return 'bg-blue-100 text-blue-800';
      case 'broker': return 'bg-purple-100 text-purple-800';
      case 'shipper': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      case 'autonomous': return 'bg-indigo-100 text-indigo-800';
      case 'super_admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'manager': return 'bg-orange-100 text-orange-800';
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (value: number, threshold: number) => {
    const percentage = (value / threshold) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredPortals = portals.filter(portal => {
    const matchesStatus = filterStatus === 'all' || portal.status === filterStatus;
    const matchesSearch = portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         portal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Loading portal data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portal Management</h1>
          <p className="text-muted-foreground">
            Manage all portals, users, and configurations across the platform
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadPortalData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setNewPortalDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Portal
          </Button>
        </div>
      </div>

      {/* Portal Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portals</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portals.length}</div>
            <p className="text-xs text-muted-foreground">
              {portals.filter(p => p.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portals.reduce((sum, portal) => sum + portal.users, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all portals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(portals.reduce((sum, portal) => sum + portal.performance.uptime, 0) / portals.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              System reliability
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portals.reduce((sum, portal) => sum + portal.storage.used, 0).toFixed(1)} GB
            </div>
            <p className="text-xs text-muted-foreground">
              Of {portals.reduce((sum, portal) => sum + portal.storage.total, 0)} GB total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="portals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portals">Portals</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="configurations">Configurations</TabsTrigger>
        </TabsList>

        {/* Portals Tab */}
        <TabsContent value="portals" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Portal Management</CardTitle>
                  <CardDescription>
                    View and manage all portals in the system
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
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
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search portals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPortals.map((portal) => (
                  <Card key={portal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{portal.name}</CardTitle>
                          <CardDescription>{portal.description}</CardDescription>
                        </div>
                        <Badge className={getTypeColor(portal.type)}>
                          {portal.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge className={getStatusColor(portal.status)}>
                          {portal.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Users:</span>
                          <span className="text-sm font-medium">
                            {portal.users.toLocaleString()} / {portal.maxUsers.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={(portal.users / portal.maxUsers) * 100} 
                          className="h-2" 
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Storage:</span>
                          <span className="text-sm font-medium">
                            {portal.storage.used} / {portal.storage.total} {portal.storage.unit}
                          </span>
                        </div>
                        <Progress 
                          value={(portal.storage.used / portal.storage.total) * 100} 
                          className="h-2" 
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="font-medium">{portal.performance.uptime}%</div>
                          <div className="text-muted-foreground">Uptime</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{portal.performance.responseTime}ms</div>
                          <div className="text-muted-foreground">Response</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{portal.performance.errorRate}%</div>
                          <div className="text-muted-foreground">Errors</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-muted-foreground">
                          Last active: {new Date(portal.lastActive).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDeletePortal(portal.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portal Users</CardTitle>
              <CardDescription>
                Manage user access and permissions across all portals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Portal Access</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.portalAccess.map((portalId) => {
                            const portal = portals.find(p => p.id === portalId);
                            return (
                              <Badge key={portalId} variant="outline" className="text-xs">
                                {portal?.name || portalId}
                              </Badge>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleToggleUserStatus(user.id)}>
                            {user.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
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

        {/* Configurations Tab */}
        <TabsContent value="configurations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Portal Configurations</CardTitle>
              <CardDescription>
                Manage portal settings and configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Portal</TableHead>
                    <TableHead>Setting</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {configs.map((config) => {
                    const portal = portals.find(p => p.id === config.portalId);
                    return (
                      <TableRow key={config.id}>
                        <TableCell>
                          <div className="font-medium">{portal?.name || config.portalId}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{config.setting}</div>
                            <div className="text-sm text-muted-foreground">{config.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {typeof config.value === 'boolean' ? (
                            <Switch checked={config.value} disabled />
                          ) : (
                            <span className="font-medium">{config.value}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{config.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(config.lastModified).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalManagementPage;
