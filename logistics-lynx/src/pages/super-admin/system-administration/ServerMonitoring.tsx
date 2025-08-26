import React, { useState } from 'react';
import { 
  Server, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Cpu, 
  HardDrive, 
  Network, 
  Zap,
  RefreshCw,
  Settings,
  Eye,
  BarChart3,
  TrendingUp,
  TrendingDown,
  X
} from 'lucide-react';
import { ResponsiveCard, EnhancedButton } from '../../../components/ui';

const ServerMonitoring: React.FC = () => {
  const [servers, setServers] = useState([
    {
      id: 1,
      name: 'Production Server 1',
      status: 'online',
      cpu: 45,
      memory: 67,
      disk: 23,
      network: 89,
      uptime: '15d 8h 32m',
      lastCheck: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Database Server',
      status: 'online',
      cpu: 78,
      memory: 82,
      disk: 45,
      network: 34,
      uptime: '8d 12h 15m',
      lastCheck: '1 minute ago'
    },
    {
      id: 3,
      name: 'Load Balancer',
      status: 'warning',
      cpu: 92,
      memory: 45,
      disk: 12,
      network: 67,
      uptime: '3d 6h 48m',
      lastCheck: '30 seconds ago'
    },
    {
      id: 4,
      name: 'Backup Server',
      status: 'offline',
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0,
      uptime: '0d 0h 0m',
      lastCheck: '5 minutes ago'
    }
  ]);

  const [selectedServer, setSelectedServer] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
            Server Monitoring
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Real-time monitoring of system infrastructure and performance metrics
          </p>
        </div>
        <EnhancedButton
          onClick={refreshData}
          icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
          variant="primary"
        >
          Refresh
        </EnhancedButton>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
            <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">4 Servers</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Infrastructure</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">2 Online</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Healthy Servers</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/20">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">1 Warning</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">High CPU Usage</p>
        </ResponsiveCard>

        <ResponsiveCard className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/20">
            <X className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">1 Offline</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Backup Server</p>
        </ResponsiveCard>
      </div>

      {/* Server List */}
      <ResponsiveCard>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Server Status
          </h2>
          <EnhancedButton variant="ghost" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure Alerts
          </EnhancedButton>
        </div>

        <div className="space-y-4">
          {servers.map((server) => (
            <div
              key={server.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                selectedServer === server.id
                  ? 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              onClick={() => setSelectedServer(selectedServer === server.id ? null : server.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                      {getStatusIcon(server.status)}
                      <span className="ml-1 capitalize">{server.status}</span>
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      {server.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Uptime: {server.uptime} • Last check: {server.lastCheck}
                    </p>
                  </div>
                </div>
                <Eye className="w-4 h-4 text-slate-400" />
              </div>

              {selectedServer === server.id && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">CPU</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{server.cpu}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-green-100 dark:bg-green-900/20">
                        <HardDrive className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Memory</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{server.memory}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                        <HardDrive className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Disk</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{server.disk}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-8 h-8 mx-auto mb-2 rounded-full bg-orange-100 dark:bg-orange-900/20">
                        <Network className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Network</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{server.network}%</p>
                    </div>
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
              CPU Usage Trend
            </h3>
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="h-48 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400">Chart placeholder</p>
          </div>
        </ResponsiveCard>

        <ResponsiveCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Memory Usage Trend
            </h3>
            <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="h-48 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <p className="text-slate-500 dark:text-slate-400">Chart placeholder</p>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default ServerMonitoring;
