import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Download, 
  Settings, 
  Star, 
  Users, 
  Zap,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  CheckCircle,
  AlertCircle,
  Package
} from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  developer: string;
  rating: number;
  installs: number;
  price: string;
  status: 'available' | 'installed' | 'updating' | 'error';
  version: string;
  lastUpdated: string;
  permissions: string[];
  features: string[];
}

interface Integration {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error' | 'configuring';
  lastSync: string;
  syncStatus: 'success' | 'failed' | 'pending';
  dataPoints: number;
  errors: number;
}

const MarketplaceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState('apps');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const apps: App[] = [
    {
      id: '1',
      name: 'QuickBooks Integration',
      description: 'Seamlessly sync invoices, payments, and financial data with QuickBooks',
      category: 'Accounting',
      developer: 'Intuit',
      rating: 4.8,
      installs: 1250,
      price: 'Free',
      status: 'installed',
      version: '2.1.0',
      lastUpdated: '2024-01-15',
      permissions: ['Read invoices', 'Write payments', 'Sync customers'],
      features: ['Auto-sync', 'Real-time updates', 'Error handling']
    },
    {
      id: '2',
      name: 'Google Maps Fleet',
      description: 'Advanced mapping and route optimization for fleet management',
      category: 'Maps & Navigation',
      developer: 'Google',
      rating: 4.6,
      installs: 890,
      price: '$29/month',
      status: 'available',
      version: '1.5.2',
      lastUpdated: '2024-01-10',
      permissions: ['Location access', 'Route data', 'Traffic info'],
      features: ['Real-time tracking', 'Route optimization', 'Traffic alerts']
    },
    {
      id: '3',
      name: 'Samsara Telematics',
      description: 'Comprehensive telematics and fleet monitoring solution',
      category: 'Telematics',
      developer: 'Samsara',
      rating: 4.7,
      installs: 567,
      price: '$45/month',
      status: 'installed',
      version: '3.0.1',
      lastUpdated: '2024-01-12',
      permissions: ['Vehicle data', 'Driver info', 'Maintenance alerts'],
      features: ['GPS tracking', 'Fuel monitoring', 'Maintenance scheduling']
    }
  ];

  const integrations: Integration[] = [
    {
      id: '1',
      name: 'QuickBooks Online',
      type: 'Accounting',
      status: 'active',
      lastSync: '2024-01-20 14:30',
      syncStatus: 'success',
      dataPoints: 1247,
      errors: 0
    },
    {
      id: '2',
      name: 'Google Maps API',
      type: 'Maps',
      status: 'active',
      lastSync: '2024-01-20 14:25',
      syncStatus: 'success',
      dataPoints: 892,
      errors: 0
    },
    {
      id: '3',
      name: 'Samsara API',
      type: 'Telematics',
      status: 'error',
      lastSync: '2024-01-20 13:45',
      syncStatus: 'failed',
      dataPoints: 0,
      errors: 3
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'available': 'bg-green-100 text-green-800',
      'installed': 'bg-blue-100 text-blue-800',
      'updating': 'bg-yellow-100 text-yellow-800',
      'error': 'bg-red-100 text-red-800',
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'configuring': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getSyncStatusColor = (status: string) => {
    const colors = {
      'success': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800',
      'pending': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Accounting': 'bg-blue-100 text-blue-800',
      'Maps & Navigation': 'bg-green-100 text-green-800',
      'Telematics': 'bg-purple-100 text-purple-800',
      'Communication': 'bg-orange-100 text-orange-800',
      'Analytics': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600">Discover, install, and configure apps & integrations</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Request App
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search apps, integrations, or developers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="accounting">Accounting</option>
          <option value="maps">Maps & Navigation</option>
          <option value="telematics">Telematics</option>
          <option value="communication">Communication</option>
          <option value="analytics">Analytics</option>
        </select>
        <button className="btn-outline flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Apps</p>
              <p className="text-2xl font-bold text-gray-900">47</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Installed Apps</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Integrations</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
            <Zap className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sync Errors</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('apps')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'apps'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Apps
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'integrations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('installed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'installed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Installed
          </button>
          <button
            onClick={() => setActiveTab('developers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'developers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Developers
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'apps' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div key={app.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(app.category)}`}>
                      {app.category}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* App Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{app.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{app.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>by {app.developer}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{app.rating}</span>
                    </div>
                    <span>{app.installs} installs</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {app.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Version & Price */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span>v{app.version}</span>
                  <span className="font-medium text-gray-900">{app.price}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {app.status === 'available' ? (
                    <button className="flex-1 btn-primary text-sm py-2">
                      Install
                    </button>
                  ) : (
                    <button className="flex-1 btn-outline text-sm py-2">
                      Manage
                    </button>
                  )}
                  <button className="btn-outline text-sm py-2 px-3">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Active Integrations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Integration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sync</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sync Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {integrations.map((integration) => (
                    <tr key={integration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{integration.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{integration.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(integration.status)}`}>
                          {integration.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{integration.lastSync}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSyncStatusColor(integration.syncStatus)}`}>
                          {integration.syncStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {integration.dataPoints.toLocaleString()}
                        {integration.errors > 0 && (
                          <span className="text-red-600 ml-2">({integration.errors} errors)</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Configure</button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'installed' && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Installed Apps</h3>
          <p className="text-gray-600">Manage your installed applications and their settings</p>
          <button className="btn-primary mt-4">View Installed Apps</button>
        </div>
      )}

      {activeTab === 'developers' && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Developer Portal</h3>
          <p className="text-gray-600">Resources and documentation for app developers</p>
          <button className="btn-primary mt-4">Developer Portal</button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ShoppingCart className="w-6 h-6 text-blue-600 mr-3" />
            <span className="font-medium">Browse Apps</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Settings className="w-6 h-6 text-green-600 mr-3" />
            <span className="font-medium">Manage Integrations</span>
          </button>
          <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-6 h-6 text-purple-600 mr-3" />
            <span className="font-medium">Update Apps</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceModule;
