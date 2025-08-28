import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, Users, Calendar, Activity, ArrowLeft, Lock, UserPlus } from 'lucide-react';

interface ViewGroupFormProps {
  groupId: string;
  onEdit: (groupId: string) => void;
  onDelete: (groupId: string) => void;
  onBack: () => void;
}

interface GroupData {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  status: 'active' | 'inactive' | 'archived';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  category: string;
  color: string;
  icon: string;
  permissions: string[];
  isPrivate: boolean;
  joinApproval: boolean;
  members: string[];
}

const ViewGroupForm: React.FC<ViewGroupFormProps> = ({ groupId, onEdit, onDelete, onBack }) => {
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock group data - in real app, this would be fetched from API
  const mockGroupData: GroupData = {
    id: groupId,
    name: 'Development Team',
    description: 'Core development team members working on product features and maintaining the codebase',
    memberCount: 15,
    maxMembers: 20,
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'Admin',
    category: 'development',
    color: 'blue',
    icon: '💻',
    permissions: ['code.access', 'deploy.access', 'testing.access', 'content.create'],
    isPrivate: false,
    joinApproval: true,
    members: ['user1', 'user2', 'user3', 'user4', 'user5']
  };

  useEffect(() => {
    // Simulate API call to fetch group data
    const fetchGroupData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGroupData(mockGroupData);
      } catch (error) {
        console.error('Error fetching group data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>;
      case 'inactive':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>;
      case 'archived':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Archived</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const getPermissionLabel = (permission: string) => {
    const permMap: Record<string, string> = {
      'group.manage': 'Manage Group',
      'group.view': 'View Group',
      'member.add': 'Add Members',
      'member.remove': 'Remove Members',
      'member.view': 'View Members',
      'content.create': 'Create Content',
      'content.edit': 'Edit Content',
      'content.delete': 'Delete Content',
      'analytics.view': 'View Analytics',
      'reports.create': 'Create Reports',
      'code.access': 'Code Access',
      'deploy.access': 'Deploy Access',
      'testing.access': 'Testing Access'
    };
    return permMap[permission] || permission;
  };

  const getCategoryLabel = (category: string) => {
    const catMap: Record<string, string> = {
      'general': 'General',
      'development': 'Development',
      'marketing': 'Marketing',
      'sales': 'Sales',
      'support': 'Support',
      'operations': 'Operations',
      'finance': 'Finance',
      'hr': 'Human Resources'
    };
    return catMap[category] || category;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading group data...</p>
        </div>
      </div>
    );
  }

  if (!groupData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <p className="text-red-600 dark:text-red-400">Group not found</p>
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
                Group Details: {groupData.name}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onEdit(groupId)}
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
          {/* Group Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl ${getColorClass(groupData.color)}`}>
                {groupData.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {groupData.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{groupData.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  {getStatusBadge(groupData.status)}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {groupData.memberCount} / {groupData.maxMembers} members
                  </span>
                  {groupData.isPrivate && (
                    <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Lock className="w-4 h-4 mr-1" />
                      Private
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">Group ID</p>
                <p className="text-sm font-mono text-gray-900 dark:text-white">{groupData.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Category</p>
                <p className="text-sm text-gray-900 dark:text-white">{getCategoryLabel(groupData.category)}</p>
              </div>
            </div>
          </div>

          {/* Group Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Group Name</label>
                  <p className="text-gray-900 dark:text-white">{groupData.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                  <p className="text-gray-900 dark:text-white">{groupData.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                  <div className="mt-1">{getStatusBadge(groupData.status)}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Category</label>
                  <p className="text-gray-900 dark:text-white">{getCategoryLabel(groupData.category)}</p>
                </div>
              </div>
            </div>

            {/* Member Information */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Member Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Current Members</label>
                  <p className="text-gray-900 dark:text-white">{groupData.memberCount} users</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Maximum Members</label>
                  <p className="text-gray-900 dark:text-white">{groupData.maxMembers} users</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Privacy</label>
                  <div className="mt-1 flex items-center space-x-2">
                    {groupData.isPrivate ? (
                      <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Lock className="w-4 h-4 mr-1" />
                        Private Group
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600 dark:text-gray-400">Public Group</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Join Approval</label>
                  <div className="mt-1 flex items-center space-x-2">
                    {groupData.joinApproval ? (
                      <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <UserPlus className="w-4 h-4 mr-1" />
                        Required
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600 dark:text-gray-400">Not Required</span>
                    )}
                  </div>
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
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created By</label>
                  <p className="text-gray-900 dark:text-white">{groupData.createdBy}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Created Date</label>
                  <p className="text-gray-900 dark:text-white">{groupData.createdAt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                  <p className="text-gray-900 dark:text-white">{groupData.updatedAt}</p>
                </div>
              </div>
            </div>

            {/* Visual Settings */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Visual Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Icon</label>
                  <div className="mt-1 text-3xl">{groupData.icon}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Color Theme</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full ${getColorClass(groupData.color)}`}></div>
                    <span className="text-gray-900 dark:text-white capitalize">{groupData.color}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Group Permissions ({groupData.permissions.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {groupData.permissions.length > 0 ? (
                  groupData.permissions.map(permission => (
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
                  <p className="text-sm text-gray-900 dark:text-white">Group updated</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{groupData.updatedAt}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">New member joined</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2024-01-14</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">Group created</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{groupData.createdAt}</p>
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
                Are you sure you want to delete group "{groupData.name}"? This action cannot be undone.
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
                    onDelete(groupId);
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
    case 'blue': return 'bg-blue-500';
    case 'green': return 'bg-green-500';
    case 'purple': return 'bg-purple-500';
    case 'orange': return 'bg-orange-500';
    case 'red': return 'bg-red-500';
    case 'indigo': return 'bg-indigo-500';
    case 'pink': return 'bg-pink-500';
    case 'gray': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};

export default ViewGroupForm;
