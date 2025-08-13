import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield, 
  Eye, 
  Search,
  Crown,
  UserCheck,
  UserX,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Wilson',
      email: 'john.wilson@transbotai.com',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2024-01-15 10:30 AM',
      department: 'Leadership',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah.chen@transbotai.com',
      role: 'engineering_manager',
      status: 'active',
      lastLogin: '2024-01-15 09:15 AM',
      department: 'Engineering',
      permissions: ['user_management', 'financial_reports', 'system_config']
    },
    {
      id: '3',
      name: 'Marcus Rodriguez',
      email: 'marcus.r@transbotai.com',
      role: 'support_agent',
      status: 'active',
      lastLogin: '2024-01-14 04:22 PM',
      department: 'Customer Success',
      permissions: ['tickets', 'customer_data']
    },
    {
      id: '4',
      name: 'Jennifer Wu',
      email: 'jennifer.wu@contractor.com',
      role: 'contractor',
      status: 'pending',
      lastLogin: 'Never',
      department: 'Design',
      permissions: ['design_assets']
    }
  ]);

  const [roles, setRoles] = useState([
    {
      id: '1',
      name: 'super_admin',
      displayName: 'Super Administrator',
      description: 'Full system access and control',
      permissions: ['all'],
      userCount: 1
    },
    {
      id: '2',
      name: 'engineering_manager',
      displayName: 'Engineering Manager',
      description: 'Manage engineering team and projects',
      permissions: ['user_management', 'financial_reports', 'system_config', 'ai_dashboard'],
      userCount: 3
    },
    {
      id: '3',
      name: 'support_agent',
      displayName: 'Support Agent',
      description: 'Handle customer support and tickets',
      permissions: ['tickets', 'customer_data', 'knowledge_base'],
      userCount: 8
    },
    {
      id: '4',
      name: 'contractor',
      displayName: 'Contractor',
      description: 'Limited access for external contractors',
      permissions: ['design_assets', 'project_files'],
      userCount: 5
    }
  ]);

  const permissions = [
    'user_management', 'financial_reports', 'system_config', 'ai_dashboard',
    'tickets', 'customer_data', 'knowledge_base', 'design_assets', 'project_files',
    'payroll_access', 'api_management', 'audit_logs'
  ];

  const getRoleBadge = (role: string) => {
    const variants = {
      'super_admin': 'destructive',
      'engineering_manager': 'default',
      'support_agent': 'secondary',
      'contractor': 'outline'
    } as const;
    
    return (
      <Badge variant={variants[role as keyof typeof variants] || 'outline'}>
        {role.replace('_', ' ')}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'inactive': 'secondary',
      'pending': 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* User Directory */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Directory
            </CardTitle>
            <CardDescription>
              Manage system users and their access permissions
            </CardDescription>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account and assign role permissions
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john.doe@transbotai.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leadership">Leadership</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="customer-success">Customer Success</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label>Send Welcome Email</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="welcome-email" defaultChecked />
                    <Label htmlFor="welcome-email" className="text-sm">
                      Send login credentials and welcome email to the user
                    </Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  setIsAddUserOpen(false);
                  toast({
                    title: 'User created successfully',
                    description: 'The user has been added and will receive login credentials via email.',
                  });
                }}>
                  Create User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{user.lastLogin}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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

      {/* Role Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role & Permission Management
          </CardTitle>
          <CardDescription>
            Define custom roles and assign granular permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium flex items-center gap-2">
                      {role.name === 'super_admin' && <Crown className="h-4 w-4 text-yellow-500" />}
                      {role.displayName}
                    </h4>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{role.userCount} users</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Permissions:</Label>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.includes('all') ? (
                      <Badge variant="destructive" className="text-xs">All Permissions</Badge>
                    ) : (
                      role.permissions.map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Settings className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  {role.name !== 'super_admin' && (
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <UserCheck className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">17</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <UserX className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Pending Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Custom Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Crown className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Super Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;