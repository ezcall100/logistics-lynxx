import React, { useState, useEffect } from 'react';
import { 
  // Users, 
  Plus, 
  // Search, 
  // Filter, 
  Download,
  Upload, 
  Edit, 
  Trash2, 
  Eye, 
  // MoreHorizontal,
  // RefreshCw,
  // Settings,
  // User,
  // Shield,
  // Building,
  // Mail,
  // Phone,
  // Calendar,
  // MapPin,
  // CheckCircle,
  // XCircle,
  // AlertCircle,
  // Clock,
  // Star,
  // Heart,
  // ThumbsUp,
  // ThumbsDown,
  // ExternalLink,
  // Copy,
  // Share,
  // Archive,
  // RotateCcw,
  // Save,
  // Send,
  // MessageSquare,
  // Key,
  // Lock,
  // Unlock,
  // Bell,
  // Star as StarIcon,
  // Heart as HeartIcon,
  // Zap as ZapIcon,
  // Droplets,
  // Cloud,
  // CloudRain,
  // CloudSnow,
  // CloudLightning,
  // Sun,
  // Moon,
  // Sunrise,
  // Sunset,
  // Wind,
  // Thermometer,
  // Gauge,
  // Timer,
  // Navigation,
  // Compass,
  // Map,
  // Layers,
  // Grid3X3,
  // Grid,
  // List,
  // Columns,
  // Maximize,
  // Minimize,
  // Move,
  // RotateCw,
  // ZoomIn,
  // ZoomOut,
  // Type,
  // Bold,
  // Italic,
  // Underline,
  // Link,
  // Unlink,
  // Code,
  // Quote,
  // Hash,
  // AtSign,
  // Percent,
  // Minus,
  // Divide,
  // Plus as PlusIcon,
  // Equal,
  // Infinity,
  // Pi,
  // Sigma,
  // Square,
  // Circle,
  // Triangle,
  // Hexagon,
  // Octagon,
  // Star as StarIcon2,
  // Heart as HeartIcon2,
  // Zap as ZapIcon2
} from 'lucide-react';
import {
  EnhancedCard,
  EnhancedButton,
  EnhancedBadge,
  EnhancedTable,
  EnhancedSearch,
  EnhancedModal,
  EnhancedInput,
  stableStyles
} from '../../../components/ui/EnhancedUIComponents';
import { UserManagementFAB } from '../../../components/ui/FloatingActionButton';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
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
}

interface UserFormData {
  name: string;
  email: string;
  role: string;
  company: string;
  department: string;
  phone: string;
  location: string;
  subscription: string;
  permissions: string[];
}

const AllUsers: React.FC = () => {
  const [mode] = useState<'light' | 'dark'>('light');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    status: '',
    role: '',
    subscription: '',
    company: ''
  });

  // Mock data
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
      lastActivity: '2024-01-15 14:30:00'
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
      lastActivity: '2024-01-15 13:45:00'
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
      createdAt: '2023-12-01',
      phone: '+1 (555) 345-6789',
      location: 'Chicago, IL',
      permissions: ['read', 'write', 'manage'],
      subscription: 'enterprise',
      verified: false,
      twoFactorEnabled: true,
      loginCount: 234,
      lastActivity: '2024-01-14 16:20:00'
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
      createdAt: '2023-09-10',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      permissions: ['read'],
      subscription: 'free',
      verified: true,
      twoFactorEnabled: false,
      loginCount: 45,
      lastActivity: '2024-01-10 09:15:00'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@company.com',
      role: 'admin',
      status: 'active',
      company: 'Tech Corp',
      department: 'Finance',
      lastLogin: '2024-01-15 11:30:00',
      createdAt: '2023-07-05',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, WA',
      permissions: ['read', 'write', 'admin', 'finance'],
      subscription: 'premium',
      verified: true,
      twoFactorEnabled: true,
      loginCount: 312,
      lastActivity: '2024-01-15 11:30:00'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, filters, sortColumn, sortDirection]);

  const filterUsers = () => {
    let filtered = [...users];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    // Role filter
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    // Subscription filter
    if (filters.subscription) {
      filtered = filtered.filter(user => user.subscription === filters.subscription);
    }

    // Company filter
    if (filters.company) {
      filtered = filtered.filter(user => user.company === filters.company);
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortColumn as keyof User];
      const bValue = b[sortColumn as keyof User];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

    setFilteredUsers(filtered);
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleCreateUser = (formData: UserFormData) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      company: formData.company,
      department: formData.department,
      phone: formData.phone || '',
      location: formData.location || '',
      subscription: formData.subscription as 'free' | 'basic' | 'premium' | 'enterprise',
      permissions: formData.permissions,
      status: 'pending',
      lastLogin: '',
      createdAt: new Date().toISOString().split('T')[0] || '',
      verified: false,
      twoFactorEnabled: false,
      loginCount: 0,
      lastActivity: ''
    };
    
    setUsers([...users, newUser]);
    setShowCreateModal(false);
  };

  const handleEditUser = (formData: UserFormData) => {
    if (!editingUser) return;
    
    const updatedUsers = users.map(user =>
      user.id === editingUser.id ? {
        ...user,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        company: formData.company,
        department: formData.department,
        phone: formData.phone || '',
        location: formData.location || '',
        subscription: formData.subscription as 'free' | 'basic' | 'premium' | 'enterprise',
        permissions: formData.permissions
      } : user
    );
    
    setUsers(updatedUsers);
    setShowEditModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = () => {
    if (!deletingUser) return;
    
    const updatedUsers = users.filter(user => user.id !== deletingUser.id);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
    setDeletingUser(null);
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'activate':
        const activatedUsers = users.map(user =>
          selectedUsers.some(selected => selected.id === user.id)
            ? { ...user, status: 'active' as const }
            : user
        );
        setUsers(activatedUsers);
        break;
      case 'deactivate':
        const deactivatedUsers = users.map(user =>
          selectedUsers.some(selected => selected.id === user.id)
            ? { ...user, status: 'inactive' as const }
            : user
        );
        setUsers(deactivatedUsers);
        break;
      case 'delete':
        const remainingUsers = users.filter(user =>
          !selectedUsers.some(selected => selected.id === user.id)
        );
        setUsers(remainingUsers);
        break;
    }
    setSelectedUsers([]);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <EnhancedBadge variant="success" mode={mode}>Active</EnhancedBadge>;
      case 'inactive':
        return <EnhancedBadge variant="default" mode={mode}>Inactive</EnhancedBadge>;
      case 'pending':
        return <EnhancedBadge variant="warning" mode={mode}>Pending</EnhancedBadge>;
      case 'suspended':
        return <EnhancedBadge variant="danger" mode={mode}>Suspended</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>Unknown</EnhancedBadge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <EnhancedBadge variant="danger" mode={mode}>Admin</EnhancedBadge>;
      case 'manager':
        return <EnhancedBadge variant="warning" mode={mode}>Manager</EnhancedBadge>;
      case 'user':
        return <EnhancedBadge variant="default" mode={mode}>User</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>{role}</EnhancedBadge>;
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case 'enterprise':
        return <EnhancedBadge variant="premium" mode={mode}>Enterprise</EnhancedBadge>;
      case 'premium':
        return <EnhancedBadge variant="success" mode={mode}>Premium</EnhancedBadge>;
      case 'basic':
        return <EnhancedBadge variant="default" mode={mode}>Basic</EnhancedBadge>;
      case 'free':
        return <EnhancedBadge variant="default" mode={mode}>Free</EnhancedBadge>;
      default:
        return <EnhancedBadge variant="default" mode={mode}>{subscription}</EnhancedBadge>;
    }
  };

  const tableColumns = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      render: (value: string, row: User) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
              {row.name}
            </div>
            <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
              {row.email}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      render: (value: string) => getRoleBadge(value)
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'company',
      title: 'Company',
      sortable: true,
      render: (value: string, row: User) => (
        <div>
          <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
            {row.company}
          </div>
          <div className={`text-sm ${stableStyles.textMuted[mode]}`}>
            {row.department}
          </div>
        </div>
      )
    },
    {
      key: 'subscription',
      title: 'Subscription',
      sortable: true,
      render: (value: string) => getSubscriptionBadge(value)
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      sortable: true,
      render: (value: string, row: User) => (
        <div>
          <div className={`text-sm ${stableStyles.textPrimary[mode]}`}>
            {row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : 'Never'}
          </div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>
            {row.loginCount} logins
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (value: any, row: User) => (
        <div className="flex items-center space-x-2">
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Eye className="w-4 h-4" />}
            mode={mode}
            onClick={() => console.log('View user:', row.id)}
          >
            View
          </EnhancedButton>
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Edit className="w-4 h-4" />}
            mode={mode}
            onClick={() => {
              setEditingUser(row);
              setShowEditModal(true);
            }}
          />
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            mode={mode}
            onClick={() => {
              setDeletingUser(row);
              setShowDeleteModal(true);
            }}
          />
        </div>
      )
    }
  ];

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              User Management
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Manage all users across the platform
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
            >
              Export
            </EnhancedButton>
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Upload className="w-4 h-4" />}
              mode={mode}
            >
              Import
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setShowCreateModal(true)}
              mode={mode}
            >
              Add User
            </EnhancedButton>
          </div>
        </div>

        {/* Filters and Search */}
        <EnhancedCard mode={mode}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <EnhancedSearch
                placeholder="Search users by name, email, company..."
                value={searchQuery}
                onChange={setSearchQuery}
                mode={mode}
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
              <select
                value={filters.subscription}
                onChange={(e) => setFilters({ ...filters, subscription: e.target.value })}
                className={`px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="">All Subscriptions</option>
                <option value="enterprise">Enterprise</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
                <option value="free">Free</option>
              </select>
            </div>
          </div>
        </EnhancedCard>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <span className={`${stableStyles.textPrimary[mode]}`}>
                {selectedUsers.length} user(s) selected
              </span>
              <div className="flex space-x-2">
                <EnhancedButton
                  variant="success"
                  size="sm"
                  onClick={() => handleBulkAction('activate')}
                  mode={mode}
                >
                  Activate
                </EnhancedButton>
                <EnhancedButton
                  variant="warning"
                  size="sm"
                  onClick={() => handleBulkAction('deactivate')}
                  mode={mode}
                >
                  Deactivate
                </EnhancedButton>
                <EnhancedButton
                  variant="danger"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  mode={mode}
                >
                  Delete
                </EnhancedButton>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Users Table */}
        <EnhancedTable
          columns={tableColumns}
          data={currentUsers}
          mode={mode}
          sortable
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          selectable
          onSelectionChange={setSelectedUsers}
          loading={loading}
          emptyMessage="No users found"
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                Showing {startIndex + 1} to {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex space-x-2">
                <EnhancedButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  mode={mode}
                >
                  Previous
                </EnhancedButton>
                <span className={`px-3 py-2 text-sm ${stableStyles.textPrimary[mode]}`}>
                  Page {currentPage} of {totalPages}
                </span>
                <EnhancedButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  mode={mode}
                >
                  Next
                </EnhancedButton>
              </div>
            </div>
          </EnhancedCard>
        )}

                            {/* Create User Modal */}
                    <EnhancedModal
                      isOpen={showCreateModal}
                      onClose={() => setShowCreateModal(false)}
                      title="Create New User"
                      mode={mode}
                      size="lg"
                    >
                      <UserForm
                        onSubmit={handleCreateUser}
                        onCancel={() => setShowCreateModal(false)}
                        mode={mode}
                      />
                    </EnhancedModal>

                    {/* Edit User Modal */}
                    <EnhancedModal
                      isOpen={showEditModal}
                      onClose={() => {
                        setShowEditModal(false);
                        setEditingUser(null);
                      }}
                      title="Edit User"
                      mode={mode}
                      size="lg"
                    >
                      <UserForm
                        user={editingUser}
                        onSubmit={handleEditUser}
                        onCancel={() => {
                          setShowEditModal(false);
                          setEditingUser(null);
                        }}
                        mode={mode}
                      />
                    </EnhancedModal>

                    {/* Delete Confirmation Modal */}
                    <EnhancedModal
                      isOpen={showDeleteModal}
                      onClose={() => {
                        setShowDeleteModal(false);
                        setDeletingUser(null);
                      }}
                      title="Delete User"
                      mode={mode}
                      size="md"
                    >
                      <div className="space-y-4">
                        <p className={`${stableStyles.textSecondary[mode]}`}>
                          Are you sure you want to delete <strong>{deletingUser?.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                          <EnhancedButton
                            variant="secondary"
                            onClick={() => {
                              setShowDeleteModal(false);
                              setDeletingUser(null);
                            }}
                            mode={mode}
                          >
                            Cancel
                          </EnhancedButton>
                          <EnhancedButton
                            variant="danger"
                            onClick={handleDeleteUser}
                            mode={mode}
                          >
                            Delete
                          </EnhancedButton>
                        </div>
                      </div>
                    </EnhancedModal>

                    {/* Floating Action Button */}
                    <UserManagementFAB mode={mode} />
                  </div>
                </div>
              );
            };

// User Form Component
interface UserFormProps {
  user?: User | null;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  mode: 'light' | 'dark';
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel, mode }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    company: user?.company || '',
    department: user?.department || '',
    phone: user?.phone || '',
    location: user?.location || '',
    subscription: user?.subscription || 'basic',
    permissions: user?.permissions || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Name
          </label>
          <EnhancedInput
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            required
            mode={mode}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Email
          </label>
          <EnhancedInput
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            required
            mode={mode}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Company
          </label>
          <EnhancedInput
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Enter company name"
            mode={mode}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Department
          </label>
          <EnhancedInput
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="Enter department"
            mode={mode}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Phone
          </label>
          <EnhancedInput
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            mode={mode}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Location
          </label>
          <EnhancedInput
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Enter location"
            mode={mode}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
            Subscription
          </label>
          <select
            value={formData.subscription}
            onChange={(e) => setFormData({ ...formData, subscription: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
          >
            <option value="free">Free</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <EnhancedButton
          variant="secondary"
          onClick={onCancel}
          mode={mode}
        >
          Cancel
        </EnhancedButton>
        <EnhancedButton
          variant="primary"
          type="submit"
          mode={mode}
        >
          {user ? 'Update User' : 'Create User'}
        </EnhancedButton>
      </div>
    </form>
  );
};

export default AllUsers;
