import { useState } from 'react';
const MobileOverview = () => {
  const [mobileStats, setMobileStats] = useState({
    totalDevices: 24,
    activeDevices: 18,
    syncStatus: 'healthy',
    lastSync: '2 minutes ago'
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Overview</h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage mobile device connections and synchronization
          </p>
        </div>
        <EnhancedButton className="bg-blue-600 hover:bg-blue-700">
          Add Device
        </EnhancedButton>
      </div>

      <div className="grid gap-6">
        {/* Mobile Statistics */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Mobile Statistics
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Overview of mobile device usage and status
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{mobileStats.totalDevices}</div>
                <div className="text-sm text-blue-600">Total Devices</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{mobileStats.activeDevices}</div>
                <div className="text-sm text-green-600">Active Devices</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">75%</div>
                <div className="text-sm text-purple-600">Sync Success Rate</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">2.3s</div>
                <div className="text-sm text-orange-600">Avg Response Time</div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Device Status */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              Device Status
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Current status of connected mobile devices
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {[
                { name: 'iPhone 15 Pro', user: 'John Doe', status: 'online', lastSync: '1 minute ago' },
                { name: 'Samsung Galaxy S24', user: 'Jane Smith', status: 'online', lastSync: '3 minutes ago' },
                { name: 'iPad Pro', user: 'Mike Johnson', status: 'offline', lastSync: '2 hours ago' },
                { name: 'Google Pixel 8', user: 'Sarah Wilson', status: 'online', lastSync: '5 minutes ago' }
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
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {device.status}
                    </span>
                    <EnhancedButton size="sm" variant="outline">
                      Manage
                    </EnhancedButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Sync Status */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🔄
              </div>
              Synchronization Status
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Real-time synchronization status and performance
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    ✅
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Data Sync</h4>
                    <p className="text-sm text-gray-600">All devices synchronized</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Healthy
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    📡
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Network Status</h4>
                    <p className="text-sm text-gray-600">All connections stable</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Stable
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    ⚡
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Performance</h4>
                    <p className="text-sm text-gray-600">Average response time: 2.3s</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Good
                </span>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default MobileOverview;
