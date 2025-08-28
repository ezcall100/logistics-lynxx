import React, { useState, useEffect } from 'react';
import { X, Save, Shield, Users, Settings, Trash2 } from 'lucide-react';

interface EditRoleFormProps {
  roleId: string;
  onSave: (roleData: RoleData) => void;
  onCancel: () => void;
  onDelete: (roleId: string) => void;
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

const EditRoleForm: React.FC<EditRoleFormProps> = ({ roleId, onSave, onCancel, onDelete }) => {
  const [formData, setFormData] = useState<RoleData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const colors = [
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-500' }
  ];

  const icons = [
    { value: '👑', label: 'Crown' },
    { value: '⚡', label: 'Lightning' },
    { value: '👥', label: 'Group' },
    { value: '👤', label: 'User' },
    { value: '🛡️', label: 'Shield' },
    { value: '⚙️', label: 'Settings' },
    { value: '📊', label: 'Chart' },
    { value: '🔧', label: 'Tools' }
  ];

  const permissions = [
    { value: 'user.manage', label: 'User Management', category: 'Users' },
    { value: 'user.view', label: 'View Users', category: 'Users' },
    { value: 'user.create', label: 'Create Users', category: 'Users' },
    { value: 'user.edit', label: 'Edit Users', category: 'Users' },
    { value: 'user.delete', label: 'Delete Users', category: 'Users' },
    { value: 'role.manage', label: 'Role Management', category: 'Roles' },
    { value: 'role.view', label: 'View Roles', category: 'Roles' },
    { value: 'role.create', label: 'Create Roles', category: 'Roles' },
    { value: 'role.edit', label: 'Edit Roles', category: 'Roles' },
    { value: 'role.delete', label: 'Delete Roles', category: 'Roles' },
    { value: 'system.view', label: 'System View', category: 'System' },
    { value: 'system.settings', label: 'System Settings', category: 'System' },
    { value: 'analytics.view', label: 'Analytics View', category: 'Analytics' },
    { value: 'analytics.export', label: 'Export Analytics', category: 'Analytics' },
    { value: 'reports.create', label: 'Create Reports', category: 'Reports' },
    { value: 'reports.view', label: 'View Reports', category: 'Reports' },
    { value: 'reports.edit', label: 'Edit Reports', category: 'Reports' },
    { value: 'reports.delete', label: 'Delete Reports', category: 'Reports' }
  ];

  // Mock role data - in real app, this would be fetched from API
  const mockRoleData: RoleData = {
    id: roleId,
    name: 'Manager',
    description: 'Team management and reporting access',
    permissions: ['team.manage', 'reports.view', 'analytics.view'],
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
        setFormData(mockRoleData);
      } catch (error) {
        console.error('Error fetching role data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoleData();
  }, [roleId]);

  const validateForm = (): boolean => {
    if (!formData) return false;

    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors['name'] = 'Role name is required';
    }

    if (!formData.description.trim()) {
      newErrors['description'] = 'Description is required';
    }

    if (formData.permissions.length === 0) {
      newErrors['permissions'] = 'At least one permission is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number | string[]) => {
    if (!formData) return;

    setFormData(prev => prev ? { ...prev, [field]: value } : null);
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionChange = (permission: string) => {
    if (!formData) return;

    setFormData(prev => prev ? {
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData || !validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedRole: RoleData = {
        ...formData,
        updatedAt: new Date().toISOString().split('T')[0] || ''
      };

      onSave(updatedRole);
    } catch (error) {
      console.error('Error updating role:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onDelete(roleId);
    } catch (error) {
      console.error('Error deleting role:', error);
    } finally {
      setIsSubmitting(false);
      setShowDeleteConfirm(false);
    }
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

  if (!formData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <p className="text-red-600 dark:text-red-400">Role not found</p>
          <button
            onClick={onCancel}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = [];
    }
    if (acc[permission.category]) {
      if (acc[permission.category]) {
        acc[permission.category].push(permission);
      }
    }
    return acc;
  }, {} as Record<string, typeof permissions>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Edit Role: {formData.name}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Role Info Header */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Role ID: {formData.id}</p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Users with this role: {formData.userCount}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Created: {formData.createdAt}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Updated: {formData.updatedAt}
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                         errors['name'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Enter role name"
                />
                                 {errors['name'] && (
                   <p className="mt-1 text-sm text-red-600">{errors['name']}</p>
                 )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={1}>Critical (1)</option>
                  <option value={2}>High (2)</option>
                  <option value={3}>Medium (3)</option>
                  <option value={4}>Low (4)</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                     errors['description'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Enter role description"
              />
                             {errors['description'] && (
                 <p className="mt-1 text-sm text-red-600">{errors['description']}</p>
               )}
            </div>
          </div>

          {/* Visual Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Visual Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map(color => (
                    <label
                      key={color.value}
                      className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer ${
                        formData.color === color.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={formData.color === color.value}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full ${color.class}`}></div>
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {color.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {icons.map(icon => (
                    <label
                      key={icon.value}
                      className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer text-2xl ${
                        formData.icon === icon.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="icon"
                        value={icon.value}
                        checked={formData.icon === icon.value}
                        onChange={(e) => handleInputChange('icon', e.target.value)}
                        className="sr-only"
                      />
                      {icon.value}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as RoleData['status'])}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Permissions *
            </h3>
            {errors['permissions'] && (
              <p className="mb-4 text-sm text-red-600">{errors['permissions']}</p>
            )}
            
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([category, perms]) => (
                <div key={category} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    {category} Permissions
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {perms.map(permission => (
                      <label key={permission.value} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.value)}
                          onChange={() => handlePermissionChange(permission.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {permission.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={isSubmitting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Role
            </button>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to delete role "{formData.name}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditRoleForm;
