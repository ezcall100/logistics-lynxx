import React, { useState } from 'react';
import { X, Save, Users, Settings, Lock, UserPlus } from 'lucide-react';

interface AddGroupFormProps {
  onSave: (groupData: GroupData) => void;
  onCancel: () => void;
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

const AddGroupForm: React.FC<AddGroupFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<GroupData, 'id' | 'memberCount' | 'createdAt' | 'updatedAt' | 'createdBy' | 'members'>>({
    name: '',
    description: '',
    maxMembers: 50,
    status: 'active',
    category: 'general',
    color: 'blue',
    icon: '👥',
    permissions: [],
    isPrivate: false,
    joinApproval: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'development', label: 'Development' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'support', label: 'Support' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' }
  ];

  const colors = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-500' }
  ];

  const icons = [
    { value: '👥', label: 'Group' },
    { value: '💻', label: 'Development' },
    { value: '📢', label: 'Marketing' },
    { value: '💰', label: 'Sales' },
    { value: '🎧', label: 'Support' },
    { value: '⚙️', label: 'Operations' },
    { value: '📊', label: 'Finance' },
    { value: '👤', label: 'HR' },
    { value: '🚀', label: 'Project' },
    { value: '🎯', label: 'Team' }
  ];

  const permissions = [
    { value: 'group.manage', label: 'Manage Group', category: 'Group Management' },
    { value: 'group.view', label: 'View Group', category: 'Group Management' },
    { value: 'member.add', label: 'Add Members', category: 'Member Management' },
    { value: 'member.remove', label: 'Remove Members', category: 'Member Management' },
    { value: 'member.view', label: 'View Members', category: 'Member Management' },
    { value: 'content.create', label: 'Create Content', category: 'Content' },
    { value: 'content.edit', label: 'Edit Content', category: 'Content' },
    { value: 'content.delete', label: 'Delete Content', category: 'Content' },
    { value: 'analytics.view', label: 'View Analytics', category: 'Analytics' },
    { value: 'reports.create', label: 'Create Reports', category: 'Reports' }
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors['name'] = 'Group name is required';
    }

    if (!formData.description.trim()) {
      newErrors['description'] = 'Description is required';
    }

    if (formData.maxMembers < 1) {
      newErrors['maxMembers'] = 'Maximum members must be at least 1';
    }

    if (formData.maxMembers > 1000) {
      newErrors['maxMembers'] = 'Maximum members cannot exceed 1000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionChange = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newGroup: GroupData = {
        ...formData,
        id: `group_${Date.now()}`,
        memberCount: 0,
        createdAt: new Date().toISOString().split('T')[0] || '',
        updatedAt: new Date().toISOString().split('T')[0] || '',
        createdBy: 'Current User',
        members: []
      };

      onSave(newGroup);
    } catch (error) {
      console.error('Error adding group:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Add New Group
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
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                                     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                     errors['name'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                   } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                   placeholder="Enter group name"
                 />
                 {errors['name'] && (
                   <p className="mt-1 text-sm text-red-600">{errors['name']}</p>
                 )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
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
                 placeholder="Enter group description"
               />
               {errors['description'] && (
                 <p className="mt-1 text-sm text-red-600">{errors['description']}</p>
               )}
            </div>
          </div>

          {/* Group Settings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Group Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Members *
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={formData.maxMembers}
                  onChange={(e) => handleInputChange('maxMembers', parseInt(e.target.value))}
                                     className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                     errors['maxMembers'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                   } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                   placeholder="Enter maximum members"
                 />
                 {errors['maxMembers'] && (
                   <p className="mt-1 text-sm text-red-600">{errors['maxMembers']}</p>
                 )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as GroupData['status'])}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={formData.isPrivate}
                  onChange={(e) => handleInputChange('isPrivate', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPrivate" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <Lock className="w-4 h-4 mr-2" />
                  Private Group (requires invitation to join)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="joinApproval"
                  checked={formData.joinApproval}
                  onChange={(e) => handleInputChange('joinApproval', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="joinApproval" className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Require approval for new members
                </label>
              </div>
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
                <div className="grid grid-cols-4 gap-2">
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
                <div className="grid grid-cols-5 gap-2">
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

          {/* Permissions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Group Permissions
            </h3>
            
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([category, perms]) => (
                <div key={category} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
                    {category}
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
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
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
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Group
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGroupForm;
