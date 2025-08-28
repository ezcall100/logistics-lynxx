import { useState } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { AlertTriangle, Clock, Plus, Edit, Upload, CheckCircle, X, RefreshCw, Settings, Eye, Activity, Users, Download, Shield, TrendingUp, TrendingDown, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DatabaseManagement: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState<number | null>(null);

  const [databases] = useState([
    {
      id: 1,
      name: 'Primary Database',
      type: 'PostgreSQL',
      status: 'online',
      size: '2.4 GB',
      connections: 45,
      uptime: '15d 8h 32m',
      lastBackup: '2 hours ago',
      performance: 98
    },
    {
      id: 2,
      name: 'Analytics Database',
      type: 'PostgreSQL',
      status: 'online',
      size: '8.7 GB',
      connections: 23,
      uptime: '8d 12h 15m',
      lastBackup: '1 hour ago',
      performance: 95
    },
    {
      id: 3,
      name: 'Cache Database',
      type: 'Redis',
      status: 'warning',
      size: '512 MB',
      connections: 67,
      uptime: '3d 6h 48m',
      lastBackup: '30 minutes ago',
      performance: 87
    },
    {
      id: 4,
      name: 'Archive Database',
      type: 'PostgreSQL',
      status: 'offline',
      size: '15.2 GB',
      connections: 0,
      uptime: '0d 0h 0m',
      lastBackup: '1 day ago',
      performance: 0
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
            Database Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Monitor and manage database performance, backups, and security
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary">
            Refresh
          </Button>
          <Button variant="default">
            Add Database
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/20">
            <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">4 Databases</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Instances</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">2 Online</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Healthy Databases</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/20">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">1 Warning</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">High Connections</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20">
            <X className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">1 Offline</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Archive Database</p>
        </ResponsiveCard>
      </div>

      {/* Database List */}
      <ResponsiveCard>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Database Status
          </h2>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>

        <div className="space-y-4">
          {databases.map((db) => (
            <div
              key={db.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedDatabase === db.id
                  ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              onClick={() => setSelectedDatabase(selectedDatabase === db.id ? null : db.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(db.status)}`}>
                      {getStatusIcon(db.status)}
                      <span className="ml-1 capitalize">{db.status}</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      {db.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {db.type} • Size: {db.size} • Uptime: {db.uptime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {db.connections} connections
                  </span>
                  <Eye className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              {selectedDatabase === db.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Performance</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{db.performance}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900/20">
                        <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Connections</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{db.connections}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                        <Database className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Size</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{db.size}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-orange-100 dark:bg-orange-900/20">
                        <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Last Backup</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{db.lastBackup}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button>
                 
              <Edit className="w-4 h-4 mr-2" /></Button>
                      <Button>
                Edit
              </Button><Button>
                 
              <Download className="w-4 h-4 mr-2" /></Button>
                      <Button>
                Backup
              </Button><Button>
                 
              <Upload className="w-4 h-4 mr-2" /></Button>
                      <Button>
                Restore
              </Button><Button>
                 
              <Shield className="w-4 h-4 mr-2" /></Button>
                      <Button>
                Security
              </Button>
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
              Database Performance
            </h3>
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="h-48 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400">Performance chart placeholder</p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Connection Usage
            </h3>
            <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="h-48 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400">Connection chart placeholder</p>
          </div>
        </ResponsiveCard>
      </div>

      {/* Security Status */}
      <ResponsiveCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Security Status
          </h3>
            <Shield className="w-4 h-4 mr-2" />
            Security Settings
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Encryption</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">AES-256 enabled</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
            <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Backups</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Automated daily</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-100">Access Control</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Review needed</p>
            </div>
          </div>
        </div>
      </ResponsiveCard>
    </div>
  );
};

export default DatabaseManagement;
