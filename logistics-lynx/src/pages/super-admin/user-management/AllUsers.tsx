import React, { useState, useEffect } from 'react';
import {
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Search,
  RefreshCw,
  UserPlus,
  Shield,
  Activity,
  Users,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/DataTable';
import { FormDialog } from '@/components/ui/FormDialog';
import { ConfirmDeleteDialog } from '@/components/ui/ConfirmDeleteDialog';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  company: string;
  department: string;
  lastLogin: string;
  createdAt: string;
  avatar?: string;
  phone?: string;
  location?: string;
  permissions: string[];
  subscription: 'free' | 'basic' | 'premium' | 'enterprise';
  verified: boolean;
  twoFactorEnabled: boolean;
  loginCount: number;
  lastActivity: string;
  mcpAgentId?: string;
  agentStatus?: 'online' | 'offline' | 'busy';
  confidenceScore?: number;
}

const AllUsers: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [mcpStatus, setMcpStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  // Enhanced mock data with MCP agent integration
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin',
      status: 'active',
      company: 'Tech Corp',
      department: 'Engineering',
      lastLogin: '2024-01-15 14:30:00',
      createdAt: '2023-06-15',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      permissions: ['read', 'write', 'admin'],
      subscription: 'premium',
      verified: true,
      twoFactorEnabled: true,
      loginCount: 156,
      lastActivity: '2024-01-15 14:30:00',
      mcpAgentId: 'agent-admin-001',
      agentStatus: 'online',
      confidenceScore: 0.95
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'user',
      status: 'active',
      company: 'Tech Corp',
      department: 'Marketing',
      lastLogin: '2024-01-15 13:45:00',
      createdAt: '2023-08-20',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      permissions: ['read', 'write'],
      subscription: 'basic',
      verified: true,
      twoFactorEnabled: false,
      loginCount: 89,
      lastActivity: '2024-01-15 13:45:00',
      mcpAgentId: 'agent-user-002',
      agentStatus: 'online',
      confidenceScore: 0.87
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'manager',
      status: 'pending',
      company: 'Tech Corp',
      department: 'Sales',
      lastLogin: '2024-01-14 16:20:00',
      createdAt: '2024-01-10',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      permissions: ['read', 'write', 'manage'],
      subscription: 'premium',
      verified: false,
      twoFactorEnabled: true,
      loginCount: 23,
      lastActivity: '2024-01-14 16:20:00',
      mcpAgentId: 'agent-manager-003',
      agentStatus: 'busy',
      confidenceScore: 0.72
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@company.com',
      role: 'user',
      status: 'inactive',
      company: 'Tech Corp',
      department: 'HR',
      lastLogin: '2024-01-10 09:15:00',
      createdAt: '2023-12-01',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      permissions: ['read'],
      subscription: 'basic',
      verified: true,
      twoFactorEnabled: false,
      loginCount: 45,
      lastActivity: '2024-01-10 09:15:00',
      mcpAgentId: 'agent-user-004',
      agentStatus: 'offline',
      confidenceScore: 0.65
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@company.com',
      role: 'admin',
      status: 'suspended',
      company: 'Tech Corp',
      department: 'Finance',
      lastLogin: '2024-01-08 11:30:00',
      createdAt: '2023-09-15',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      permissions: ['read', 'write', 'admin'],
      subscription: 'enterprise',
      verified: true,
      twoFactorEnabled: true,
      loginCount: 234,
      lastActivity: '2024-01-08 11:30:00',
      mcpAgentId: 'agent-admin-005',
      agentStatus: 'offline',
      confidenceScore: 0.0
    },
    {
      id: '6',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'viewer',
      status: 'active',
      company: 'Tech Corp',
      department: 'Support',
      lastLogin: '2024-01-15 12:00:00',
      createdAt: '2023-11-15',
      phone: '+1 (555) 678-9012',
      location: 'Denver, CO',
      permissions: ['read'],
      subscription: 'free',
      verified: true,
      twoFactorEnabled: false,
      loginCount: 67,
      lastActivity: '2024-01-15 12:00:00',
      mcpAgentId: 'agent-viewer-006',
      agentStatus: 'online',
      confidenceScore: 0.91
    },
    {
      id: '7',
      name: 'Alex Chen',
      email: 'alex.chen@company.com',
      role: 'manager',
      status: 'active',
      company: 'Tech Corp',
      department: 'Engineering',
      lastLogin: '2024-01-15 15:20:00',
      createdAt: '2023-07-01',
      phone: '+1 (555) 789-0123',
      location: 'Boston, MA',
      permissions: ['read', 'write', 'manage'],
      subscription: 'premium',
      verified: true,
      twoFactorEnabled: true,
      loginCount: 189,
      lastActivity: '2024-01-15 15:20:00',
      mcpAgentId: 'agent-manager-007',
      agentStatus: 'online',
      confidenceScore: 0.88
    },
    {
      id: '8',
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@company.com',
      role: 'user',
      status: 'pending',
      company: 'Tech Corp',
      department: 'Marketing',
      lastLogin: 'Never',
      createdAt: '2024-01-12',
      phone: '+1 (555) 890-1234',
      location: 'Miami, FL',
      permissions: ['read'],
      subscription: 'basic',
      verified: false,
      twoFactorEnabled: false,
      loginCount: 0,
      lastActivity: 'Never',
      mcpAgentId: 'agent-user-008',
      agentStatus: 'offline',
      confidenceScore: 0.0
    }
  ];

  useEffect(() => {
    // Simulate MCP connection check
    const checkMcpConnection = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setMcpStatus('connected');
      } catch (error) {
        setMcpStatus('disconnected');
      }
    };

    // Simulate API call for users
    const loadUsers = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load users:', error);
        setLoading(false);
      }
    };

    checkMcpConnection();
    loadUsers();
  }, []);

  // DataTable columns configuration
  const userColumns = [
    { key: 'name', label: 'Full Name', sortable: true },
    { key: 'email', label: 'Email Address', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true },
    { key: 'createdAt', label: 'Created', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  // Transform data for DataTable with custom renderers
  const tableData = users.map(user => ({
    ...user,
    role: (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
        user.role === 'manager' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
        user.role === 'user' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      }`}>
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </span>
    ),
    status: (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        user.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
        user.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
      </span>
    ),
    actions: (
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEditUser(user)}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEditUser(user)}
          className="h-8 w-8 p-0"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDeleteUser(user)}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    )
  }));

  // Form fields for Add/Edit User
  const userFormFields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      required: true,
      placeholder: 'Enter full name',
      validation: { min: 2, max: 50 }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      required: true,
      placeholder: 'user@company.com',
      validation: {
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
        message: 'Please enter a valid email address'
      }
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'manager', label: 'Manager' },
        { value: 'user', label: 'User' },
        { value: 'viewer', label: 'Viewer' }
      ]
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select' as const,
      required: false,
      options: [
        { value: 'engineering', label: 'Engineering' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'sales', label: 'Sales' },
        { value: 'support', label: 'Support' },
        { value: 'hr', label: 'Human Resources' },
        { value: 'finance', label: 'Finance' }
      ]
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'pending', label: 'Pending' },
        { value: 'suspended', label: 'Suspended' }
      ]
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text' as const,
      required: false,
      placeholder: '+1 (555) 123-4567'
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text' as const,
      required: false,
      placeholder: 'City, State'
    },
    {
      name: 'avatar',
      label: 'Profile Picture',
      type: 'file' as const,
      required: false
    }
  ];

  const handleAddUser = () => {
    setEditingUser(null);
    setShowAddUser(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditUser(true);
  };

  const handleDeleteUser = (user: User) => {
    setDeletingUser(user);
    setShowDeleteUser(true);
  };

  const handleSubmitUser = async (data: any) => {
    try {
      if (editingUser) {
        // Update existing user
        setUsers(prev => prev.map(user =>
          user.id === editingUser.id ? { ...user, ...data } : user
        ));
      } else {
        // Add new user
        const newUser: User = {
          id: Date.now().toString(),
          ...data,
          company: 'Tech Corp',
          permissions: ['read'],
          subscription: 'basic',
          verified: false,
          twoFactorEnabled: false,
          loginCount: 0,
          lastActivity: 'Never',
          createdAt: new Date().toISOString().split('T')[0]
        };
        setUsers(prev => [...prev, newUser]);
      }
      setShowAddUser(false);
      setShowEditUser(false);
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const handleDeleteConfirm = async (reason?: string) => {
    if (deletingUser) {
      try {
        setUsers(prev => prev.filter(user => user.id !== deletingUser.id));
        setShowDeleteUser(false);
        setDeletingUser(null);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleBulkDelete = async () => {
    try {
      setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    } catch (error) {
      console.error('Failed to delete users:', error);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Role', 'Status', 'Department', 'Last Login', 'Created'],
      ...users.map(user => [
        user.name,
        user.email,
        user.role,
        user.status,
        user.department,
        user.lastLogin,
        user.createdAt
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-7xl mx-auto p-6 space-y-6">

        {/* Enhanced Header with SectionHeader */}
        <SectionHeader
          title="All Users"
          subtitle={`${users.length} users managed across the platform`}
          icon={<Users className="h-6 w-6" />}
          action={
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${mcpStatus === 'connected' ? 'bg-green-500' : mcpStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  MCP {mcpStatus === 'connected' ? 'Connected' : mcpStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
              Export
              </Button>
              <Button onClick={handleAddUser}>
                <UserPlus className="h-4 w-4 mr-2" />
              Add User
              </Button>
            </div>
          }
        />

        {/* User Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Across all departments
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.status === 'active').length}
                        </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Currently active
                          </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Pending Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {users.filter(u => u.status === 'pending').length}
            </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Awaiting approval
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Administrators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {users.filter(u => u.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                System administrators
              </div>
            </CardContent>
          </Card>
            </div>

        {/* Users DataTable */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <div className="flex items-center space-x-2">
                {selectedUsers.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Selected ({selectedUsers.length})
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              data={tableData}
              columns={userColumns}
              title=""
              searchable={true}
              filterable={true}
              sortable={true}
              pagination={true}
              bulkActions={true}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
              onView={(user) => handleEditUser(user)}
            />
          </CardContent>
        </Card>

        {/* Add User FormDialog */}
        <FormDialog
          isOpen={showAddUser}
          onClose={() => setShowAddUser(false)}
          title="Add New User"
          fields={userFormFields}
          onSubmit={handleSubmitUser}
          submitLabel="Create User"
        />

        {/* Edit User FormDialog */}
        <FormDialog
          isOpen={showEditUser}
          onClose={() => setShowEditUser(false)}
          title="Edit User"
          fields={userFormFields}
          onSubmit={handleSubmitUser}
          submitLabel="Update User"
          initialData={editingUser || undefined}
        />

        {/* Delete User ConfirmDeleteDialog */}
        <ConfirmDeleteDialog
          isOpen={showDeleteUser}
          onClose={() => setShowDeleteUser(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
          itemName={deletingUser?.name || ''}
          requireReason={true}
        />
      </div>
    </div>
  );
};

export default AllUsers;
