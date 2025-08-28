import React, { useState, useEffect } from 'react';
import { Clock, Search, Filter, Upload, Plus, Edit, Sun, Moon, CheckCircle, RefreshCw, Settings, Eye, TrendingUp, BarChart3, Trash2 } from 'lucide-react';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';
import ViewUserForm from './forms/ViewUserForm';

interface User {
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
  createdAt?: string;
  updatedAt?: string;
}

const UserManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit' | 'view'>('list');
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  // Mock data for demonstration
  const mockUsers: User[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      role: 'manager',
      department: 'engineering',
      status: 'active',
      permissions: ['user.manage', 'analytics.view'],
      mcpAgentId: 'agent_12345',
      agentStatus: 'online',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 234-5678',
      role: 'admin',
      department: 'marketing',
      status: 'active',
      permissions: ['user.manage', 'role.manage'],
      mcpAgentId: 'agent_12346',
      agentStatus: 'online',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-19'
    },
    {
      id: '3',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1 (555) 345-6789',
      role: 'user',
      department: 'sales',
      status: 'pending',
      permissions: ['basic.access'],
      mcpAgentId: 'agent_12347',
      agentStatus: 'offline',
      createdAt: '2024-01-17',
      updatedAt: '2024-01-18'
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalValue = users.reduce((sum, user) => sum + (user.permissions.length * 10), 0);

  // CRUD Operation Handlers
  const handleAddUser = (userData: User) => {
    setUsers(prev => [...prev, userData]);
    setViewMode('list');
  };

  const handleEditUser = (userData: User) => {
    setUsers(prev => prev.map(user => user.id === userData.id ? userData : user));
    setViewMode('list');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setViewMode('list');
  };

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    setViewMode('view');
  };

  const handleEditUserClick = (userId: string) => {
    setSelectedUserId(userId);
    setViewMode('edit');
  };

  const handleAddUserClick = () => {
    setViewMode('add');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedUserId('');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                User & Role Management
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Comprehensive user management with role-based access control
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'} shadow-lg`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`rounded-xl shadow-lg p-6 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Total Items</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{users.length}</p>
              </div>
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <BarChart3 className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-6 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>Active</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {users.filter(user => user.status === 'active').length}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                <CheckCircle className={`w-6 h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-6 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>Pending</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {users.filter(user => user.status === 'pending').length}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                <Clock className={`w-6 h-6 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-xl shadow-lg p-6 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>Total Value</p>
                <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <TrendingUp className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`rounded-xl shadow-lg p-6 border mb-8 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
              <button className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`rounded-xl shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Data Overview</h2>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      ID
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Name
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Status
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Role
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Email
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className={`hover:bg-opacity-50 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        #{user.id}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.firstName} {user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {user.role}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleViewUser(user.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEditUserClick(user.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={`mt-8 rounded-xl shadow-lg p-6 border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={handleAddUserClick}
              className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-opacity-50 transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <Plus className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="text-left">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Create New</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Add a new user</p>
              </div>
            </button>
            
            <button className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-opacity-50 transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                <Upload className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div className="text-left">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Import Data</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Bulk import items</p>
              </div>
            </button>
            
            <button className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-opacity-50 transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <BarChart3 className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div className="text-left">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Generate Report</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Create detailed report</p>
              </div>
            </button>
            
            <button className={`flex items-center space-x-3 p-4 border rounded-lg hover:bg-opacity-50 transition-colors ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
              <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-orange-900' : 'bg-orange-100'}`}>
                <Settings className={`w-5 h-5 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
              <div className="text-left">
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Configure</p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Settings & preferences</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Form Components */}
      {viewMode === 'add' && (
        <AddUserForm
          onSave={handleAddUser}
          onCancel={handleBackToList}
        />
      )}

      {viewMode === 'edit' && selectedUserId && (
        <EditUserForm
          userId={selectedUserId}
          onSave={handleEditUser}
          onCancel={handleBackToList}
          onDelete={handleDeleteUser}
        />
      )}

      {viewMode === 'view' && selectedUserId && (
        <ViewUserForm
          userId={selectedUserId}
          onEdit={handleEditUserClick}
          onDelete={handleDeleteUser}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default UserManagement;
