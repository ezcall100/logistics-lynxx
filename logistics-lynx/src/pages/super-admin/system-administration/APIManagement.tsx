import React, { useState } from 'react';
import { Globe, Activity, AlertTriangle, CheckCircle, Clock, Settings, RefreshCw, Eye, TrendingUp, TrendingDown, Plus, Edit, Download, Upload, Shield, Zap, X } from 'lucide-react';
import { ResponsiveCard } from '../../../components/ui';

const APIManagement: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedApi, setSelectedApi] = useState<number | null>(null);

  const [apis, setApis] = useState([
    {
      id: 1,
      name: 'User Management API',
      endpoint: '/api/v1/users',
      status: 'online',
      version: 'v1.2.3',
      requests: 1247,
      responseTime: 142,
      uptime: '99.9%',
      lastDeploy: '2 hours ago'
    },
    {
      id: 2,
      name: 'Authentication API',
      endpoint: '/api/v1/auth',
      status: 'online',
      version: 'v1.1.8',
      requests: 892,
      responseTime: 89,
      uptime: '99.8%',
      lastDeploy: '1 day ago'
    },
    {
      id: 3,
      name: 'Logistics API',
      endpoint: '/api/v1/logistics',
      status: 'warning',
      version: 'v1.0.5',
      requests: 567,
      responseTime: 234,
      uptime: '98.5%',
      lastDeploy: '3 days ago'
    },
    {
      id: 4,
      name: 'Analytics API',
      endpoint: '/api/v1/analytics',
      status: 'offline',
      version: 'v1.3.1',
      requests: 0,
      responseTime: 0,
      uptime: '0%',
      lastDeploy: '1 week ago'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-emerald-600 bg-emerald-100';
      case 'warning': return 'text-amber-600 bg-amber-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'offline': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            API Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor and manage API endpoints, performance, and security
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={refreshData}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add API</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/20">
            <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">4 APIs</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Endpoints</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">2 Online</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Healthy APIs</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/20">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">1 Warning</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">High Response Time</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20">
            <X className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">1 Offline</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Analytics API</p>
        </ResponsiveCard>
      </div>

      {/* API List */}
      <ResponsiveCard>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            API Status
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </button>
        </div>

        <div className="space-y-4">
          {apis.map((api) => (
            <div
              key={api.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedApi === api.id
                  ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              onClick={() => setSelectedApi(selectedApi === api.id ? null : api.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(api.status)}`}>
                      {getStatusIcon(api.status)}
                      <span className="ml-1 capitalize">{api.status}</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      {api.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {api.endpoint} • Version: {api.version} • Uptime: {api.uptime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {api.requests} requests
                  </span>
                  <Eye className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {selectedApi === api.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Requests</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{api.requests}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900/20">
                        <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Response Time</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{api.responseTime}ms</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                        <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Uptime</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{api.uptime}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-orange-100 dark:bg-orange-900/20">
                        <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Last Deploy</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{api.lastDeploy}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Download className="w-4 h-4 mr-2" />
                      Documentation
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Deploy
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      <Shield className="w-4 h-4 mr-2" />
                      Security
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ResponsiveCard>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponsiveCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              API Response Times
            </h3>
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="h-48 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400">Response time chart placeholder</p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Request Volume
            </h3>
            <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="h-48 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400">Request volume chart placeholder</p>
          </div>
        </ResponsiveCard>
      </div>

      {/* Security Status */}
      <ResponsiveCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            API Security Status
          </h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Shield className="w-4 h-4 mr-2" />
            Security Settings
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Rate Limiting</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">1000 req/min enabled</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Authentication</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">JWT tokens active</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">CORS Policy</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Review needed</p>
            </div>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default APIManagement;
