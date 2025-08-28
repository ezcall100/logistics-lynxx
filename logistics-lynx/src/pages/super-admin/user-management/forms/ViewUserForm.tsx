import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, User, Building, Shield, Calendar, Activity, ArrowLeft } from 'lucide-react';

interface ViewUserFormProps {
  userId: string;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
  onBack: () => void;
}

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  permissions: string[];
  mcpAgentId?: string;
  agentStatus?: 'online' | 'offline' | 'busy';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  loginCount?: number;
  avatar?: string;
}

const ViewUserForm: React.FC<ViewUserFormProps> = ({ userId, onEdit, onDelete, onBack }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock user data - in real app, this would be fetched from API
  const mockUserData: UserData = {
    id: userId,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    role: 'manager',
    department: 'engineering',
    status: 'active',
    permissions: ['user.manage', 'analytics.view', 'reports.create'],
    mcpAgentId: 'agent_12345',
    agentStatus: 'online',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    lastLogin: '2024-01-20 14:30:00',
    loginCount: 127,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  };

  useEffect(() => {
    // Simulate API call to fetch user data
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUserData(mockUserData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getAgentStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Online</span>;
      case 'offline':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Offline</span>;
      case 'busy':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Busy</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getRoleLabel = (role: string) => {
    const roleMap: Record<string, string> = {
      'super-admin': 'Super Admin',
      'admin': 'Admin',
      'manager': 'Manager',
      'user': 'User',
      'viewer': 'Viewer'
    };
    return roleMap[role] || role;
  };

  const getDepartmentLabel = (department: string) => {
    const deptMap: Record<string, string> = {
      'engineering': 'Engineering',
      'marketing': 'Marketing',
      'sales': 'Sales',
      'support': 'Support',
      'operations': 'Operations',
      'finance': 'Finance'
    };
    return deptMap[department] || department;
  };

  const getPermissionLabel = (permission: string) => {
    const permMap: Record<string, string> = {
      'user.manage': 'User Management',
      'role.manage': 'Role Management',
      'system.view': 'System View',
      'analytics.view': 'Analytics View',
      'reports.create': 'Create Reports',
      'settings.manage': 'Settings Management'
    };
    return permMap[permission] || permission;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <p className="text-red-600 dark:text-red-400">User not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                User Details: {userData.firstName} {userData.lastName}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onEdit(userId)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* User Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {userData.avatar ? (
                  <img
                    src={userData.avatar}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <User className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userData.firstName} {userData.lastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{userData.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  {getStatusBadge(userData.status)}
                  {getAgentStatusBadge(userData.agentStatus || 'offline')}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{userData.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">MCP Agent</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{userData.mcpAgentId}</p>
              </div>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                  <p className="text-gray-900 dark:text-white">{userData.firstName} {userData.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                  <p className="text-gray-900 dark:text-white">{userData.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                  <p className="text-gray-900 dark:text-white">{userData.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                  <div className="mt-1">{getStatusBadge(userData.status)}</div>
                </div>
              </div>
            </div>

            {/* Role & Department */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Role & Department
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                  <p className="text-gray-900 dark:text-white">{getRoleLabel(userData.role)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
                  <p className="text-gray-900 dark:text-white">{getDepartmentLabel(userData.department)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">MCP Agent Status</label>
                  <div className="mt-1">{getAgentStatusBadge(userData.agentStatus || 'offline')}</div>
                </div>
              </div>
            </div>

            {/* Activity Information */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Activity Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</label>
                  <p className="text-gray-900 dark:text-white">{userData.lastLogin || 'Never'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Login Count</label>
                  <p className="text-gray-900 dark:text-white">{userData.loginCount || 0}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</label>
                  <p className="text-gray-900 dark:text-white">{userData.createdAt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                  <p className="text-gray-900 dark:text-white">{userData.updatedAt}</p>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Permissions ({userData.permissions.length})
              </h3>
              <div className="space-y-2">
                {userData.permissions.length > 0 ? (
                  userData.permissions.map(permission => (
                    <div
                      key={permission}
                      className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-600 rounded"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {getPermissionLabel(permission)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No permissions assigned</p>
                )}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Activity Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">User logged in</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userData.lastLogin}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Profile updated</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userData.updatedAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">User account created</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{userData.createdAt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete user "{userData.firstName} {userData.lastName}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete(userId);
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewUserForm;
