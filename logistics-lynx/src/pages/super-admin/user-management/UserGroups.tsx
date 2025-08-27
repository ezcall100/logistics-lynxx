import React, { useState, useEffect } from 'react';
import { Plus, Edit, Upload, Eye, Users, Download, Trash2, Lock } from 'lucide-react';

interface UserGroup {
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
}

const UserGroups: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState<UserGroup[]>([]);

  console.log('👥 UserGroups component is rendering!');

  // Mock data for groups
  const mockGroups: UserGroup[] = [
    {
      id: '1',
      name: 'Development Team',
      description: 'Core development team members',
      memberCount: 15,
      maxMembers: 20,
      status: 'active',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
      createdBy: 'Admin',
      category: 'Development',
      color: 'blue',
      icon: '💻',
      permissions: ['code.access', 'deploy.access', 'testing.access'],
      isPrivate: false,
      joinApproval: true
    },
    {
      id: '2',
      name: 'Marketing Team',
      description: 'Marketing and communications team',
      memberCount: 8,
      maxMembers: 12,
      status: 'active',
      createdAt: '2024-01-02',
      updatedAt: '2024-01-14',
      createdBy: 'Admin',
      category: 'Marketing',
      color: 'green',
      icon: '📢',
      permissions: ['content.create', 'analytics.view', 'campaign.manage'],
      isPrivate: false,
      joinApproval: false
    },
    {
      id: '3',
      name: 'Sales Team',
      description: 'Sales and customer success team',
      memberCount: 12,
      maxMembers: 15,
      status: 'active',
      createdAt: '2024-01-03',
      updatedAt: '2024-01-13',
      createdBy: 'Admin',
      category: 'Sales',
      color: 'purple',
      icon: '💰',
      permissions: ['leads.view', 'deals.manage', 'reports.view'],
      isPrivate: true,
      joinApproval: true
    },
    {
      id: '4',
      name: 'Support Team',
      description: 'Customer support and help desk',
      memberCount: 6,
      maxMembers: 10,
      status: 'active',
      createdAt: '2024-01-04',
      updatedAt: '2024-01-12',
      createdBy: 'Admin',
      category: 'Support',
      color: 'orange',
      icon: '🎧',
      permissions: ['tickets.view', 'tickets.resolve', 'knowledge.access'],
      isPrivate: false,
      joinApproval: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setGroups(mockGroups);
      setLoading(false);
    }, 1000);
  }, []);

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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Development':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Development</span>;
      case 'Marketing':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Marketing</span>;
      case 'Sales':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Sales</span>;
      case 'Support':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">Support</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{category}</span>;
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
              User Groups
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Manage user groups and team organization
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
              Add Group
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search groups by name, description..."
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
                <option value="archived">Archived</option>
              </select>
              <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">All Categories</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
              </select>
            </div>
          </div>
        </div>

        {/* Groups Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Group
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Members
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Privacy
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
                {groups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {group.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {group.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {group.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(group.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getCategoryBadge(group.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {group.memberCount} / {group.maxMembers}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        members
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {group.isPrivate ? (
                          <Lock className="w-4 h-4 text-red-500" />
                        ) : (
                          <Users className="w-4 h-4 text-green-500" />
                        )}
                        <span className="text-sm text-gray-900 dark:text-white">
                          {group.isPrivate ? 'Private' : 'Public'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(group.updatedAt).toLocaleDateString()}
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
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{groups.length}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {groups.filter(g => g.status === 'active').length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Groups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {groups.reduce((sum, group) => sum + group.memberCount, 0)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {groups.filter(g => g.isPrivate).length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Private Groups</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroups;
