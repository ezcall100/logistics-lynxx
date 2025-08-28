import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, Shield, Users, Calendar, Activity, ArrowLeft } from 'lucide-react';

interface ViewRoleFormProps {
  roleId: string;
  onEdit: (roleId: string) => void;
  onDelete: (roleId: string) => void;
  onBack: () => void;
}

interface RoleData {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  priority: number;
  color: string;
  icon: string;
  status: 'active' | 'inactive' | 'draft';
  userCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

const ViewRoleForm: React.FC<ViewRoleFormProps> = ({ roleId, onEdit, onDelete, onBack }) => {
  const [roleData, setRoleData] = useState<RoleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock role data - in real app, this would be fetched from API
  const mockRoleData: RoleData = {
    id: roleId,
    name: 'Manager',
    description: 'Team management and reporting access with full control over team operations and analytics',
    permissions: ['team.manage', 'reports.view', 'analytics.view', 'user.view', 'content.create'],
    priority: 3,
    color: 'green',
    icon: '👥',
    status: 'active',
    userCount: 25,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-13',
    createdBy: 'Super Admin'
  };

  useEffect(() => {
    // Simulate API call to fetch role data
    const fetchRoleData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRoleData(mockRoleData);
      } catch (error) {
        console.error('Error fetching role data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleData();
  }, [roleId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Draft</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1: return 'Critical';
      case 2: return 'High';
      case 3: return 'Medium';
      case 4: return 'Low';
      default: return 'Unknown';
    }
  };

  const getPermissionLabel = (permission: string) => {
    const permMap: Record<string, string> = {
      'user.manage': 'User Management',
      'user.view': 'View Users',
      'user.create': 'Create Users',
      'user.edit': 'Edit Users',
      'user.delete': 'Delete Users',
      'role.manage': 'Role Management',
      'role.view': 'View Roles',
      'role.create': 'Create Roles',
      'role.edit': 'Edit Roles',
      'role.delete': 'Delete Roles',
      'system.view': 'System View',
      'system.settings': 'System Settings',
      'analytics.view': 'Analytics View',
      'analytics.export': 'Export Analytics',
      'reports.create': 'Create Reports',
      'reports.view': 'View Reports',
      'reports.edit': 'Edit Reports',
      'reports.delete': 'Delete Reports',
      'team.manage': 'Team Management',
      'content.create': 'Create Content'
    };
    return permMap[permission] || permission;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading role data...</p>
        </div>
      </div>
    );
  }

  if (!roleData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <p className="text-red-600 dark:text-red-400">Role not found</p>
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
                Role Details: {roleData.name}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onEdit(roleId)}
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
          {/* Role Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${getColorClass(roleData.color)}`}>
                {roleData.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {roleData.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{roleData.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  {getStatusBadge(roleData.status)}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Priority: {getPriorityLabel(roleData.priority)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Role ID</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{roleData.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Users</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{roleData.userCount}</p>
              </div>
            </div>
          </div>

          {/* Role Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Role Name</label>
                  <p className="text-gray-900 dark:text-white">{roleData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                  <p className="text-gray-900 dark:text-white">{roleData.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                  <div className="mt-1">{getStatusBadge(roleData.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Priority Level</label>
                  <p className="text-gray-900 dark:text-white">{getPriorityLabel(roleData.priority)} ({roleData.priority})</p>
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
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Users with Role</label>
                  <p className="text-gray-900 dark:text-white">{roleData.userCount} users</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created By</label>
                  <p className="text-gray-900 dark:text-white">{roleData.createdBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</label>
                  <p className="text-gray-900 dark:text-white">{roleData.createdAt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                  <p className="text-gray-900 dark:text-white">{roleData.updatedAt}</p>
                </div>
              </div>
            </div>

            {/* Visual Settings */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Visual Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Icon</label>
                  <div className="mt-1 text-3xl">{roleData.icon}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Color Theme</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${getColorClass(roleData.color)}`}></div>
                    <span className="text-gray-900 dark:text-white capitalize">{roleData.color}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Permissions ({roleData.permissions.length})
              </h3>
              <div className="space-y-2">
                {roleData.permissions.length > 0 ? (
                  roleData.permissions.map(permission => (
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
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Role updated</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{roleData.updatedAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Role activated</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{roleData.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Role created</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{roleData.createdAt}</p>
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
                Are you sure you want to delete role "{roleData.name}"? This action cannot be undone.
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
                    onDelete(roleId);
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

// Helper function to get color classes
const getColorClass = (color: string) => {
  switch (color) {
    case 'red': return 'bg-red-500';
    case 'blue': return 'bg-blue-500';
    case 'green': return 'bg-green-500';
    case 'purple': return 'bg-purple-500';
    case 'orange': return 'bg-orange-500';
    case 'gray': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};

export default ViewRoleForm;
