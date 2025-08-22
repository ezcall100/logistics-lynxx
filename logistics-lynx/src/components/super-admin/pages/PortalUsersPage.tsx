import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, UserPlus, UserX, Shield, Lock, Unlock, Eye, EyeOff,
  Search, Filter, Download, Upload, RefreshCw, Edit, Trash2,
  Mail, Phone, Calendar, MapPin, Building, Globe, Settings,
  AlertTriangle, CheckCircle, Clock, MoreHorizontal
} from 'lucide-react';

interface PortalUser {
  id: string;
  portalId: string;
  portalName: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastLogin: string;
  loginCount: number;
  permissions: string[];
  department: string;
  phone?: string;
  location?: string;
  createdAt: string;
  lastModified: string;
}

interface PortalRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isDefault: boolean;
}

const PortalUsersPage = () => {
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [roles, setRoles] = useState<PortalRole[]>([]);
  const [selectedPortal, setSelectedPortal] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const { toast } = useToast();

  useEffect(() => {
    loadPortalUsers();
  }, []);

  const loadPortalUsers = async () => {
    setLoading(true);
    try {
      // Mock portal users data
      const mockUsers: PortalUser[] = [
        {
          id: 'user-001',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          email: 'john.doe@carrier.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-15T14:30:00Z',
          loginCount: 156,
          permissions: ['read', 'write', 'delete', 'admin'],
          department: 'Operations',
          phone: '+1-555-0123',
          location: 'New York, NY',
          createdAt: '2023-06-15T10:00:00Z',
          lastModified: '2024-01-15T14:30:00Z'
        },
        {
          id: 'user-002',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          email: 'jane.smith@carrier.com',
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'manager',
          status: 'active',
          lastLogin: '2024-01-15T12:15:00Z',
          loginCount: 89,
          permissions: ['read', 'write'],
          department: 'Customer Service',
          phone: '+1-555-0124',
          location: 'Chicago, IL',
          createdAt: '2023-08-20T09:00:00Z',
          lastModified: '2024-01-15T12:15:00Z'
        },
        {
          id: 'user-003',
          portalId: 'portal-002',
          portalName: 'Shipper Portal',
          email: 'mike.wilson@shipper.com',
          firstName: 'Mike',
          lastName: 'Wilson',
          role: 'user',
          status: 'active',
          lastLogin: '2024-01-15T11:45:00Z',
          loginCount: 234,
          permissions: ['read'],
          department: 'Logistics',
          phone: '+1-555-0125',
          location: 'Los Angeles, CA',
          createdAt: '2023-09-10T14:00:00Z',
          lastModified: '2024-01-15T11:45:00Z'
        },
        {
          id: 'user-004',
          portalId: 'portal-002',
          portalName: 'Shipper Portal',
          email: 'sarah.jones@shipper.com',
          firstName: 'Sarah',
          lastName: 'Jones',
          role: 'viewer',
          status: 'pending',
          lastLogin: '2024-01-14T16:20:00Z',
          loginCount: 12,
          permissions: ['read'],
          department: 'Finance',
          phone: '+1-555-0126',
          location: 'Houston, TX',
          createdAt: '2024-01-10T08:00:00Z',
          lastModified: '2024-01-14T16:20:00Z'
        }
      ];

      const mockRoles: PortalRole[] = [
        {
          id: 'role-001',
          name: 'Admin',
          description: 'Full access to all portal features and user management',
          permissions: ['read', 'write', 'delete', 'admin', 'user_management'],
          userCount: 3,
          isDefault: false
        },
        {
          id: 'role-002',
          name: 'Manager',
          description: 'Can manage operations and view reports',
          permissions: ['read', 'write', 'reports'],
          userCount: 8,
          isDefault: false
        },
        {
          id: 'role-003',
          name: 'User',
          description: 'Standard user with basic access',
          permissions: ['read', 'write'],
          userCount: 45,
          isDefault: true
        },
        {
          id: 'role-004',
          name: 'Viewer',
          description: 'Read-only access to portal data',
          permissions: ['read'],
          userCount: 12,
          isDefault: false
        }
      ];

      setUsers(mockUsers);
      setRoles(mockRoles);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portal users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "Add user functionality would be implemented here"
    });
  };

  const handleEditUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Edit user ${userId} functionality would be implemented here`
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "Delete User",
      description: `Delete user ${userId} functionality would be implemented here`
    });
  };

  const handleExportUsers = () => {
    toast({
      title: "Export Users",
      description: "User data export functionality would be implemented here"
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'manager': return 'bg-blue-500';
      case 'user': return 'bg-green-500';
      case 'viewer': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'pending': return 'bg-yellow-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPortal = selectedPortal === 'all' || user.portalId === selectedPortal;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesPortal && matchesStatus && matchesRole;
  });

  const portals = Array.from(new Set(users.map(user => ({ id: user.portalId, name: user.portalName }))));

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Users</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions across all portals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button onClick={handleAddUser}>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="roles">Roles ({roles.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Users</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portal">Portal</Label>
                  <Select value={selectedPortal} onValueChange={setSelectedPortal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select portal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Portals</SelectItem>
                      {portals.map((portal) => (
                        <SelectItem key={portal.id} value={portal.id}>
                          {portal.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Manage user access and permissions across portals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Portal</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{user.portalName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{new Date(user.lastLogin).toLocaleDateString()}</div>
                          <div className="text-muted-foreground">
                            {new Date(user.lastLogin).toLocaleTimeString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span>{user.department}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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

        <TabsContent value="roles" className="space-y-6">
          {/* Roles Management */}
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>
                Manage user roles and their associated permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {roles.map((role) => (
                  <Card key={role.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                        <Badge variant={role.isDefault ? "default" : "outline"}>
                          {role.isDefault ? 'Default' : 'Custom'}
                        </Badge>
                      </div>
                      <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Users:</span>
                          <Badge variant="outline">{role.userCount}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Permissions:</div>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((permission) => (
                              <Badge key={permission} variant="secondary" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          {!role.isDefault && (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalUsersPage;
