import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const MobileSync = () => {
  const [syncStatus] = useState({
    lastSync: '2 minutes ago',
    nextSync: 'in 3 minutes',
    syncProgress: 85,
    isActive: true
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Sync</h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage data synchronization across mobile devices
          </p>
        </div>
        <Button>
                Force Sync
              </Button><Button>
                 
              </Button><div className="grid gap-6">
        {/* Sync Status Overview */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🔄
              </div>
              Sync Status Overview
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Current synchronization status and progress
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    ✅
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Sync Status</h4>
                    <p className="text-sm text-gray-600">Active and running</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Active
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sync Progress</span>
                  <span className="text-gray-900">{syncStatus.syncProgress}%</span>
                </div>
                <Progress value={syncStatus.syncProgress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-gray-600">Last Sync</p>
                  <p className="font-medium text-gray-900">{syncStatus.lastSync}</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="text-sm text-gray-600">Next Sync</p>
                  <p className="font-medium text-gray-900">{syncStatus.nextSync}</p>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Device Sync Status */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              Device Sync Status
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Synchronization status for each connected device
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {[
                { name: 'iPhone 15 Pro', user: 'John Doe', status: 'synced', lastSync: '1 minute ago', dataSize: '2.3 MB' },
                { name: 'Samsung Galaxy S24', user: 'Jane Smith', status: 'syncing', lastSync: 'in progress', dataSize: '1.8 MB' },
                { name: 'iPad Pro', user: 'Mike Johnson', status: 'pending', lastSync: '2 hours ago', dataSize: '4.1 MB' },
                { name: 'Google Pixel 8', user: 'Sarah Wilson', status: 'synced', lastSync: '5 minutes ago', dataSize: '3.2 MB' }
              ].map((device) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">📱</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{device.name}</h4>
                      <p className="text-sm text-gray-600">{device.user}</p>
                      <p className="text-xs text-gray-500">Last sync: {device.lastSync}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">{device.dataSize}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {device.status}
                    </span>
                      Sync Now
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Sync History */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                📋
              </div>
              Sync History
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Recent synchronization activities and logs
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {[
                { time: '2 minutes ago', action: 'Data sync completed', device: 'iPhone 15 Pro', status: 'success', dataSize: '2.3 MB' },
                { time: '5 minutes ago', action: 'Configuration sync', device: 'Samsung Galaxy S24', status: 'success', dataSize: '156 KB' },
                { time: '12 minutes ago', action: 'User preferences sync', device: 'iPad Pro', status: 'success', dataSize: '89 KB' },
                { time: '1 hour ago', action: 'Full data sync', device: 'Google Pixel 8', status: 'success', dataSize: '15.2 MB' },
                { time: '2 hours ago', action: 'Sync failed', device: 'iPad Pro', status: 'error', dataSize: '0 KB' }
              ].map((entry) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      entry.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {entry.status === 'success' ? '✅' : '❌'}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{entry.action}</h4>
                      <p className="text-sm text-gray-600">{entry.device} • {entry.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{entry.dataSize}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {entry.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Sync Settings */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                ⚙️
              </div>
              Sync Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure synchronization preferences and schedules
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Auto Sync Interval</h4>
                  <p className="text-sm text-gray-600">Every 5 minutes</p>
                </div>
                  Configure
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Sync on WiFi Only</h4>
                  <p className="text-sm text-gray-600">Save mobile data</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Enabled
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Conflict Resolution</h4>
                  <p className="text-sm text-gray-600">Server wins by default</p>
                </div>
                  Configure
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Data Retention</h4>
                  <p className="text-sm text-gray-600">Keep sync logs for 30 days</p>
                </div>
                  Configure
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default MobileSync;
