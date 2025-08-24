import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Upload,
  RefreshCw,
  Users,
  CheckCircle,
  Key
} from 'lucide-react';
import {
  EnhancedCard,
  EnhancedButton,
  EnhancedBadge,
  EnhancedInput,
  EnhancedModal,
  EnhancedTable,
  EnhancedSearch,
  stableStyles
} from '../../../components/ui/EnhancedUIComponents';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  priority: number;
  color: string;
  icon: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'enabled' | 'disabled';
}

const UserRoles: React.FC = () => {
  console.log('🔑 UserRoles component is rendering!');
  const [mode] = useState<'light' | 'dark'>('light');
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data for roles
  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['all'],
      userCount: 3,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      createdBy: 'System',
      priority: 1,
      color: 'red',
      icon: '👑'
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access with user management',
      permissions: ['user.manage', 'system.view', 'analytics.view'],
      userCount: 12,
      status: 'active',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-14',
      createdBy: 'Super Admin',
      priority: 2,
      color: 'blue',
      icon: '⚡'
    },
    {
      id: '3',
      name: 'Manager',
      description: 'Team management and reporting access',
      permissions: ['team.manage', 'reports.view', 'analytics.view'],
      userCount: 25,
      status: 'active',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-13',
      createdBy: 'Admin',
      priority: 3,
      color: 'green',
      icon: '👥'
    },
    {
      id: '4',
      name: 'User',
      description: 'Standard user access with basic permissions',
      permissions: ['profile.edit', 'dashboard.view'],
      userCount: 150,
      status: 'active',
      createdAt: '2024-01-04',
      updatedAt: '2024-01-12',
      createdBy: 'Admin',
      priority: 4,
      color: 'gray',
      icon: '👤'
    },
    {
      id: '5',
      name: 'Guest',
      description: 'Limited access for external users',
      permissions: ['dashboard.view'],
      userCount: 45,
      status: 'active',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-11',
      createdBy: 'Admin',
      priority: 5,
      color: 'yellow',
      icon: '👋'
    },
    {
      id: '6',
      name: 'Analyst',
      description: 'Data analysis and reporting access',
      permissions: ['analytics.view', 'reports.view', 'data.export'],
      userCount: 8,
      status: 'active',
      createdAt: '2024-01-06',
      updatedAt: '2024-01-10',
      createdBy: 'Admin',
      priority: 3,
      color: 'purple',
      icon: '📊'
    }
  ];

  // Mock data for permissions
  const mockPermissions: Permission[] = [
    { id: '1', name: 'User Management', description: 'Create, edit, and delete users', category: 'User', status: 'enabled' },
    { id: '2', name: 'Role Management', description: 'Create, edit, and delete roles', category: 'User', status: 'enabled' },
    { id: '3', name: 'System Settings', description: 'Access to system configuration', category: 'System', status: 'enabled' },
    { id: '4', name: 'Analytics View', description: 'View analytics and reports', category: 'Analytics', status: 'enabled' },
    { id: '5', name: 'Data Export', description: 'Export data and reports', category: 'Analytics', status: 'enabled' },
    { id: '6', name: 'Security Audit', description: 'Access to security logs', category: 'Security', status: 'enabled' },
    { id: '7', name: 'API Management', description: 'Manage API keys and endpoints', category: 'System', status: 'enabled' },
    { id: '8', name: 'Portal Management', description: 'Manage portal settings', category: 'Portal', status: 'enabled' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRoles(mockRoles);
      setPermissions(mockPermissions);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'danger';
      case 'draft': return 'warning';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'danger';
      case 2: return 'warning';
      case 3: return 'success';
      case 4: return 'default';
      case 5: return 'neutral';
      default: return 'default';
    }
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || role.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const roleColumns = [
    {
      key: 'name',
      title: 'Role',
      sortable: true,
      render: (_: any, row: Role) => (
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${stableStyles.surface[mode]}`}>
            {row.icon}
          </div>
          <div>
            <div className={`font-medium ${stableStyles.textPrimary[mode]}`}>
              {row.name}
            </div>
            <div className={`text-sm ${stableStyles.textSecondary[mode]}`}>
              {row.description}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'userCount',
      title: 'Users',
      sortable: true,
      render: (_: any, row: Role) => (
        <div className={`text-center ${stableStyles.textPrimary[mode]}`}>
          <div className="font-semibold">{row.userCount}</div>
          <div className={`text-xs ${stableStyles.textMuted[mode]}`}>active users</div>
        </div>
      )
    },
    {
      key: 'permissions',
      title: 'Permissions',
      sortable: false,
      render: (_: any, row: Role) => (
        <div className="flex flex-wrap gap-1">
          {row.permissions.slice(0, 3).map((perm, index) => (
            <EnhancedBadge
              key={index}
              variant="default"
              mode={mode}
            >
              {perm}
            </EnhancedBadge>
          ))}
          {row.permissions.length > 3 && (
            <EnhancedBadge
              variant="default"
              mode={mode}
            >
              +{row.permissions.length - 3}
            </EnhancedBadge>
          )}
        </div>
      )
    },
    {
      key: 'priority',
      title: 'Priority',
      sortable: true,
      render: (_: any, row: Role) => (
        <EnhancedBadge
          variant={getPriorityColor(row.priority) as any}
          mode={mode}
        >
          {row.priority}
        </EnhancedBadge>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (_: any, row: Role) => (
        <EnhancedBadge
          variant={getStatusColor(row.status) as any}
          mode={mode}
        >
          {row.status}
        </EnhancedBadge>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      sortable: false,
      render: (_: any, row: Role) => (
        <div className="flex space-x-2">
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Eye className="w-4 h-4" />}
            mode={mode}
            onClick={() => setSelectedRole(row)}
          >
            View
          </EnhancedButton>
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Edit className="w-4 h-4" />}
            mode={mode}
            onClick={() => {
              setSelectedRole(row);
              setShowEditModal(true);
            }}
          >
            Edit
          </EnhancedButton>
          <EnhancedButton
            variant="ghost"
            size="sm"
            icon={<Trash2 className="w-4 h-4" />}
            mode={mode}
            onClick={() => {
              setSelectedRole(row);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </EnhancedButton>
        </div>
      )
    }
  ];

  const metrics = {
    totalRoles: roles.length,
    activeRoles: roles.filter(r => r.status === 'active').length,
    totalUsers: roles.reduce((sum, role) => sum + role.userCount, 0),
    avgPermissions: Math.round(roles.reduce((sum, role) => sum + role.permissions.length, 0) / roles.length)
  };

  return (
    <div className={`min-h-screen ${stableStyles.primary[mode]} p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${stableStyles.textPrimary[mode]}`}>
              User Roles
            </h1>
            <p className={`text-lg ${stableStyles.textSecondary[mode]} mt-2`}>
              Manage user roles and permissions across the platform
            </p>
          </div>
          <div className="flex space-x-3">
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              mode={mode}
            >
              Export Roles
            </EnhancedButton>
            <EnhancedButton
              variant="secondary"
              size="sm"
              icon={<Upload className="w-4 h-4" />}
              mode={mode}
            >
              Import Roles
            </EnhancedButton>
            <EnhancedButton
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              mode={mode}
              onClick={() => setShowCreateModal(true)}
            >
              Create Role
            </EnhancedButton>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>Total Roles</p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.totalRoles}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stableStyles.accent[mode]} flex items-center justify-center`}>
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>Active Roles</p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.activeRoles}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stableStyles.accent[mode]} flex items-center justify-center`}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>Total Users</p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.totalUsers}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stableStyles.accent[mode]} flex items-center justify-center`}>
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard mode={mode}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${stableStyles.textMuted[mode]}`}>Avg Permissions</p>
                <p className={`text-2xl font-bold ${stableStyles.textPrimary[mode]}`}>
                  {metrics.avgPermissions}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stableStyles.accent[mode]} flex items-center justify-center`}>
                <Key className="w-6 h-6 text-white" />
              </div>
            </div>
          </EnhancedCard>
        </div>

        {/* Filters and Search */}
        <EnhancedCard mode={mode}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <EnhancedSearch
                placeholder="Search roles..."
                value={searchTerm}
                onChange={setSearchTerm}
                mode={mode}
              />
            </div>
            <div className="flex space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${stableStyles.border[mode]} ${stableStyles.textPrimary[mode]} bg-transparent`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
              <EnhancedButton
                variant="ghost"
                size="sm"
                icon={<RefreshCw className="w-4 h-4" />}
                mode={mode}
              >
                Refresh
              </EnhancedButton>
            </div>
          </div>
        </EnhancedCard>

        {/* Roles Table */}
        <EnhancedCard mode={mode}>
          <EnhancedTable
            data={filteredRoles}
            columns={roleColumns}
            loading={loading}
            mode={mode}
          />
        </EnhancedCard>
      </div>

      {/* Create Role Modal */}
      <EnhancedModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Role"
        mode={mode}
      >
        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
              Role Name
            </label>
            <EnhancedInput
              placeholder="Enter role name"
              mode={mode}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
              Description
            </label>
            <textarea
              placeholder="Enter role description"
              rows={3}
              className={`w-full px-4 py-3 ${mode === "light" ? 'bg-white/80' : 'bg-slate-800/80'} backdrop-blur-sm border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 ${stableStyles.transitionSmooth} ${mode === "light" ? 'text-slate-700 placeholder-slate-400' : 'text-white placeholder-slate-500'}`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
              Permissions
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {permissions.map(permission => (
                <label key={permission.id} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                    {permission.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <EnhancedButton
            variant="secondary"
            onClick={() => setShowCreateModal(false)}
            mode={mode}
          >
            Cancel
          </EnhancedButton>
          <EnhancedButton
            variant="primary"
            onClick={() => setShowCreateModal(false)}
            mode={mode}
          >
            Create Role
          </EnhancedButton>
        </div>
      </EnhancedModal>

      {/* Edit Role Modal */}
      <EnhancedModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Role"
        mode={mode}
      >
        {selectedRole && (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                Role Name
              </label>
              <EnhancedInput
                value={selectedRole.name}
                mode={mode}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                Description
              </label>
              <textarea
                value={selectedRole.description}
                rows={3}
                className={`w-full px-4 py-3 ${mode === "light" ? 'bg-white/80' : 'bg-slate-800/80'} backdrop-blur-sm border border-slate-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 ${stableStyles.transitionSmooth} ${mode === "light" ? 'text-slate-700 placeholder-slate-400' : 'text-white placeholder-slate-500'}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${stableStyles.textPrimary[mode]} mb-2`}>
                Permissions
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {permissions.map(permission => (
                  <label key={permission.id} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={selectedRole.permissions.includes(permission.name.toLowerCase().replace(' ', '.'))}
                    />
                    <span className={`text-sm ${stableStyles.textSecondary[mode]}`}>
                      {permission.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end space-x-3 mt-6">
          <EnhancedButton
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            mode={mode}
          >
            Cancel
          </EnhancedButton>
          <EnhancedButton
            variant="primary"
            onClick={() => setShowEditModal(false)}
            mode={mode}
          >
            Save Changes
          </EnhancedButton>
        </div>
      </EnhancedModal>

      {/* Delete Role Modal */}
      <EnhancedModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Role"
        mode={mode}
      >
        <div className="space-y-4">
          <p className={`${stableStyles.textSecondary[mode]}`}>
            Are you sure you want to delete the role "{selectedRole?.name}"? This action cannot be undone.
          </p>
          <div className={`p-4 rounded-lg ${stableStyles.surface[mode]}`}>
            <p className={`text-sm ${stableStyles.textMuted[mode]}`}>
              This role is currently assigned to {selectedRole?.userCount} users.
              You may want to reassign these users before deleting the role.
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <EnhancedButton
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            mode={mode}
          >
            Cancel
          </EnhancedButton>
          <EnhancedButton
            variant="danger"
            onClick={() => setShowDeleteModal(false)}
            mode={mode}
          >
            Delete Role
          </EnhancedButton>
        </div>
      </EnhancedModal>
    </div>
  );
};

export default UserRoles;
