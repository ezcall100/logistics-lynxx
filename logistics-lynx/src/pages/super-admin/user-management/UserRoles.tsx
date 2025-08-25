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

const UserRoles: React.FC = () => {
  console.log('🔑 UserRoles component is rendering!');
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
      createdBy: 'Super Admin',
      priority: 3,
      color: 'green',
      icon: '👥'
    },
    {
      id: '4',
      name: 'User',
      description: 'Standard user access with basic permissions',
      permissions: ['basic.access', 'profile.edit'],
      userCount: 150,
      status: 'active',
      createdAt: '2024-01-04',
      updatedAt: '2024-01-12',
      createdBy: 'Admin',
      priority: 4,
      color: 'gray',
      icon: '👤'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRoles(mockRoles);
      setLoading(false);
    }, 1000);
  }, []);

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

  const getPriorityBadge = (priority: number) => {
    switch (priority) {
      case 1:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Critical</span>;
      case 2:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">High</span>;
      case 3:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>;
      case 4:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Low</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              User Roles
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Manage user roles and permissions across the platform
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Download className="w-4 h-4 inline mr-2" />
              Export
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Upload className="w-4 h-4 inline mr-2" />
              Import
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 inline mr-2" />
              Add Role
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search roles by name, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Roles Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {role.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {role.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {role.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(role.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(role.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{role.userCount}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">users</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {role.permissions.length} permissions
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {role.permissions.slice(0, 2).join(', ')}
                        {role.permissions.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(role.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{roles.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Roles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {roles.filter(r => r.status === 'active').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Roles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {roles.reduce((sum, role) => sum + role.userCount, 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {roles.reduce((sum, role) => sum + role.permissions.length, 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Permissions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
