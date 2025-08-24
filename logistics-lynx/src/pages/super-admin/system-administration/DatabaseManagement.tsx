import React, { useState, useEffect } from 'react';
import { 
  Database, 
  HardDrive, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw, 
  Download, 
  Upload, 
  Settings, 
  Shield, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Server, 
  Network, 
  FileText, 
  Archive, 
  RotateCcw,
  Save,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  ExternalLink
} from 'lucide-react';

interface DatabaseStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  type: 'primary' | 'replica' | 'backup';
  size: string;
  connections: number;
  maxConnections: number;
  uptime: string;
  lastBackup: string;
  performance: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
}

interface BackupJob {
  id: string;
  database: string;
  type: 'full' | 'incremental' | 'differential';
  status: 'completed' | 'running' | 'failed' | 'scheduled';
  size: string;
  duration: string;
  createdAt: string;
  retention: string;
}

const DatabaseManagement: React.FC = () => {
  const [databases, setDatabases] = useState<DatabaseStatus[]>([]);
  const [backups, setBackups] = useState<BackupJob[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setDatabases([
        {
          id: '1',
          name: 'TMS Primary Database',
          status: 'online',
          type: 'primary',
          size: '2.4 TB',
          connections: 156,
          maxConnections: 200,
          uptime: '45 days, 12 hours',
          lastBackup: '2 hours ago',
          performance: 94,
          health: 'excellent'
        },
        {
          id: '2',
          name: 'Analytics Database',
          status: 'online',
          type: 'replica',
          size: '1.8 TB',
          connections: 89,
          maxConnections: 150,
          uptime: '23 days, 8 hours',
          lastBackup: '6 hours ago',
          performance: 87,
          health: 'good'
        },
        {
          id: '3',
          name: 'Backup Database',
          status: 'maintenance',
          type: 'backup',
          size: '2.1 TB',
          connections: 12,
          maxConnections: 50,
          uptime: '5 days, 3 hours',
          lastBackup: '1 day ago',
          performance: 72,
          health: 'warning'
        }
      ]);

      setBackups([
        {
          id: '1',
          database: 'TMS Primary Database',
          type: 'full',
          status: 'completed',
          size: '2.4 TB',
          duration: '45 minutes',
          createdAt: '2 hours ago',
          retention: '30 days'
        },
        {
          id: '2',
          database: 'Analytics Database',
          type: 'incremental',
          status: 'running',
          size: '156 GB',
          duration: '12 minutes',
          createdAt: '6 hours ago',
          retention: '7 days'
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600';
    if (performance >= 75) return 'text-blue-600';
    if (performance >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Database Management
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor, backup, and maintain all database systems
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Database</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Backup Now</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Databases</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{databases.length}</p>
            </div>
            <Database className="h-8 w-8 text-blue-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">All Online</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Size</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">6.3 TB</p>
            </div>
            <HardDrive className="h-8 w-8 text-green-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600">+12% this month</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Connections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">257</p>
            </div>
            <Network className="h-8 w-8 text-purple-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">78% capacity</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Backup Status</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Current</p>
            </div>
            <Shield className="h-8 w-8 text-emerald-600" />
          </div>
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Last: 2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {['overview', 'backups', 'performance', 'maintenance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Database Status</h3>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="space-y-4">
                {databases.map((db) => (
                  <div key={db.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Database className="h-6 w-6 text-blue-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{db.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{db.type} database</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(db.status)}`}>
                          {db.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthColor(db.health)}`}>
                          {db.health}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Size</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{db.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Connections</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{db.connections}/{db.maxConnections}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{db.uptime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
                        <p className={`font-semibold ${getPerformanceColor(db.performance)}`}>{db.performance}%</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last backup: {db.lastBackup}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm">Configure</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'backups' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Backup Jobs</h3>
                <button 
                  onClick={() => setShowBackupModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Backup Job</span>
                </button>
              </div>

              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Archive className="h-6 w-6 text-green-600" />
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{backup.database}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{backup.type} backup</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        backup.status === 'completed' ? 'text-green-600 bg-green-100' :
                        backup.status === 'running' ? 'text-blue-600 bg-blue-100' :
                        'text-red-600 bg-red-100'
                      }`}>
                        {backup.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Size</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{backup.size}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{backup.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{backup.createdAt}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Retention</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{backup.retention}</p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-sm">Download</button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm">Restore</button>
                        <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Query Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Average Response Time</span>
                      <span className="font-semibold text-green-600">45ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Slow Queries (>1s)</span>
                      <span className="font-semibold text-yellow-600">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Cache Hit Rate</span>
                      <span className="font-semibold text-blue-600">87%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resource Usage</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                      <span className="font-semibold text-blue-600">34%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
                      <span className="font-semibold text-green-600">67%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Disk I/O</span>
                      <span className="font-semibold text-purple-600">23%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Maintenance Tasks</h3>
                <button 
                  onClick={() => setShowMaintenanceModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  <span>Schedule Maintenance</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Scheduled Tasks</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Daily Backup</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Every day at 2:00 AM</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Weekly Optimization</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Every Sunday at 3:00 AM</p>
                      </div>
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                      <span className="font-medium text-gray-900 dark:text-white">Optimize Tables</span>
                      <Zap className="h-5 w-5 text-blue-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                      <span className="font-medium text-gray-900 dark:text-white">Clear Logs</span>
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                      <span className="font-medium text-gray-900 dark:text-white">Update Statistics</span>
                      <BarChart3 className="h-5 w-5 text-green-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagement;
