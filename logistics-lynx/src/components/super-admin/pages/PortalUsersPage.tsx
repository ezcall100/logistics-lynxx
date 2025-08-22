import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, UserPlus, UserMinus, UserCheck, UserX,
  Search, Filter, Download, Upload, RefreshCw,
  Mail, Phone, Calendar, Clock, Activity,
  Shield, Lock, Unlock, Eye, EyeOff, MoreHorizontal,
  TrendingUp, TrendingDown, Minus, Target
} from 'lucide-react';

interface PortalUser {
  id: string;
  portalId: string;
  portalName: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer' | 'manager';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin: string;
  loginCount: number;
  permissions: string[];
  createdAt: string;
  department?: string;
  phone?: string;
  location?: string;
  avatar?: string;
}

interface UserAnalytics {
  portalId: string;
  portalName: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  avgLoginFrequency: number;
  userGrowth: number;
  topRoles: { role: string; count: number }[];
}

const PortalUsersPage = () => {
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [analytics, setAnalytics] = useState<UserAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPortalUsers();
  }, []);

  const loadPortalUsers = async () => {
    setLoading(true);
    try {
      // Mock users data
      const mockUsers: PortalUser[] = [
        {
          id: 'user-001',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          name: 'John Smith',
          email: 'john.smith@carrier.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-15T10:30:00Z',
          loginCount: 45,
          permissions: ['read', 'write', 'admin'],
          createdAt: '2023-06-15T00:00:00Z',
          department: 'Operations',
          phone: '+1-555-0123',
          location: 'New York, US'
        },
        {
          id: 'user-002',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          name: 'Sarah Johnson',
          email: 'sarah.johnson@carrier.com',
          role: 'manager',
          status: 'active',
          lastLogin: '2024-01-15T09:15:00Z',
          loginCount: 32,
          permissions: ['read', 'write'],
          createdAt: '2023-07-20T00:00:00Z',
          department: 'Logistics',
          phone: '+1-555-0124',
          location: 'Chicago, US'
        },
        {
          id: 'user-003',
          portalId: 'portal-002',
          portalName: 'Broker Portal',
          name: 'Mike Davis',
          email: 'mike.davis@broker.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-15T08:45:00Z',
          loginCount: 28,
          permissions: ['read', 'write', 'admin'],
          createdAt: '2023-08-10T00:00:00Z',
          department: 'Sales',
          phone: '+1-555-0125',
          location: 'Los Angeles, US'
        },
        {
          id: 'user-004',
          portalId: 'portal-002',
          portalName: 'Broker Portal',
          name: 'Lisa Wilson',
          email: 'lisa.wilson@broker.com',
          role: 'user',
          status: 'inactive',
          lastLogin: '2024-01-10T14:20:00Z',
          loginCount: 15,
          permissions: ['read'],
          createdAt: '2023-09-05T00:00:00Z',
          department: 'Customer Service',
          phone: '+1-555-0126',
          location: 'Miami, US'
        },
        {
          id: 'user-005',
          portalId: 'portal-003',
          portalName: 'Shipper Portal',
          name: 'David Brown',
          email: 'david.brown@shipper.com',
          role: 'manager',
          status: 'active',
          lastLogin: '2024-01-15T11:00:00Z',
          loginCount: 67,
          permissions: ['read', 'write'],
          createdAt: '2023-05-12T00:00:00Z',
          department: 'Supply Chain',
          phone: '+1-555-0127',
          location: 'Seattle, US'
        }
      ];

      const mockAnalytics: UserAnalytics[] = [
        {
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          totalUsers: 1250,
          activeUsers: 890,
          newUsers: 45,
          inactiveUsers: 280,
          suspendedUsers: 35,
          avgLoginFrequency: 3.2,
          userGrowth: 12.5,
          topRoles: [
            { role: 'user', count: 800 },
            { role: 'manager', count: 300 },
            { role: 'admin', count: 150 }
          ]
        },
        {
          portalId: 'portal-002',
          portalName: 'Broker Portal',
          totalUsers: 890,
          activeUsers: 650,
          newUsers: 28,
          inactiveUsers: 180,
          suspendedUsers: 32,
          avgLoginFrequency: 4.1,
          userGrowth: 8.7,
          topRoles: [
            { role: 'user', count: 600 },
            { role: 'manager', count: 200 },
            { role: 'admin', count: 90 }
          ]
        },
        {
          portalId: 'portal-003',
          portalName: 'Shipper Portal',
          totalUsers: 2100,
          activeUsers: 1650,
          newUsers: 78,
          inactiveUsers: 320,
          suspendedUsers: 52,
          avgLoginFrequency: 2.8,
          userGrowth: 15.2,
          topRoles: [
            { role: 'user', count: 1400 },
            { role: 'manager', count: 500 },
            { role: 'admin', count: 200 }
          ]
        }
      ];

      setUsers(mockUsers);
      setAnalytics(mockAnalytics);
      if (mockAnalytics.length > 0) {
        setSelectedPortal(mockAnalytics[0].portalId);
      }
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
      case 'suspended': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesPortal = !selectedPortal || user.portalId === selectedPortal;
    return matchesSearch && matchesRole && matchesStatus && matchesPortal;
  });

  const selectedPortalAnalytics = analytics.find(a => a.portalId === selectedPortal);

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
            User management and access control for all portals
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
          <Button onClick={loadPortalUsers}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Portal Selection */}
      <div className="flex gap-2">
        {analytics.map((portal) => (
          <Button
            key={portal.portalId}
            variant={selectedPortal === portal.portalId ? "default" : "outline"}
            onClick={() => setSelectedPortal(portal.portalId)}
          >
            {portal.portalName}
          </Button>
        ))}
      </div>

      {selectedPortalAnalytics && (
        <>
          {/* User Analytics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPortalAnalytics.totalUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{selectedPortalAnalytics.userGrowth}% from last month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPortalAnalytics.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((selectedPortalAnalytics.activeUsers / selectedPortalAnalytics.totalUsers) * 100).toFixed(1)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Users</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+{selectedPortalAnalytics.newUsers}</div>
                <p className="text-xs text-muted-foreground">
                  This month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Login Frequency</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{selectedPortalAnalytics.avgLoginFrequency}</div>
                <p className="text-xs text-muted-foreground">
                  Logins per week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Management */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users">User List</TabsTrigger>
              <TabsTrigger value="roles">Role Distribution</TabsTrigger>
              <TabsTrigger value="activity">User Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              {/* Filters */}
              <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Users Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>
                    {filteredUsers.length} users found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Login Count</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getRoleColor(user.role)} text-white capitalize`}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(user.status)} text-white`}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {new Date(user.lastLogin).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(user.lastLogin).toLocaleTimeString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">{user.loginCount}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{user.department || 'N/A'}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
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
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Role Distribution</CardTitle>
                  <CardDescription>
                    User roles across {selectedPortalAnalytics.portalName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedPortalAnalytics.topRoles.map((roleData) => (
                      <div key={roleData.role} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getRoleColor(roleData.role)} text-white capitalize`}>
                            {roleData.role}
                          </Badge>
                          <span className="font-medium">{roleData.count} users</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {((roleData.count / selectedPortalAnalytics.totalUsers) * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>
                    Recent user activity and login patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted rounded">
                    <div className="text-center">
                      <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">User Activity Chart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default PortalUsersPage;
