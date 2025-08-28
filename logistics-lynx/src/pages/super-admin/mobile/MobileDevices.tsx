import { useState } from 'react';

import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Button } from '@/components/ui/button';
const MobileDevices = () => {
  const [devices] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      user: 'John Doe',
      model: 'iPhone 15 Pro',
      os: 'iOS 17.2',
      status: 'active',
      lastSeen: '2 minutes ago',
      battery: 85,
      storage: '128 GB',
      storageUsed: '64 GB'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      user: 'Jane Smith',
      model: 'Samsung Galaxy S24',
      os: 'Android 14',
      status: 'active',
      lastSeen: '5 minutes ago',
      battery: 67,
      storage: '256 GB',
      storageUsed: '128 GB'
    },
    {
      id: 3,
      name: 'iPad Pro',
      user: 'Mike Johnson',
      model: 'iPad Pro 12.9"',
      os: 'iPadOS 17.2',
      status: 'inactive',
      lastSeen: '2 hours ago',
      battery: 23,
      storage: '512 GB',
      storageUsed: '256 GB'
    },
    {
      id: 4,
      name: 'Google Pixel 8',
      user: 'Sarah Wilson',
      model: 'Google Pixel 8',
      os: 'Android 14',
      status: 'active',
      lastSeen: '1 minute ago',
      battery: 92,
      storage: '128 GB',
      storageUsed: '89 GB'
    }
  ]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Devices</h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor all connected mobile devices
          </p>
        </div>
        <Button>
                Add Device
              </Button><Button>
                 
              </Button><div className="grid gap-6">
        {/* Device Statistics */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Device Statistics
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Overview of mobile device usage and status
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{devices.length}</div>
                <div className="text-sm text-blue-600">Total Devices</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {devices.filter(d => d.status === 'active').length}
                </div>
                <div className="text-sm text-green-600">Active Devices</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">iOS</div>
                <div className="text-sm text-purple-600">
                  {devices.filter(d => d.os.includes('iOS')).length} devices
                </div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">Android</div>
                <div className="text-sm text-orange-600">
                  {devices.filter(d => d.os.includes('Android')).length} devices
                </div>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Device List */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              Connected Devices
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Detailed information about each connected device
            </p>
          </div>
          <div>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">📱</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{device.name}</h4>
                        <p className="text-sm text-gray-600">{device.user}</p>
                        <p className="text-xs text-gray-500">{device.model}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        {device.status}
                      </span>
                        Manage
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Operating System</p>
                      <p className="text-sm font-medium text-gray-900">{device.os}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Last Seen</p>
                      <p className="text-sm font-medium text-gray-900">{device.lastSeen}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Battery</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              device.battery > 50 ? 'bg-green-500' : 
                              device.battery > 20 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{device.battery}%</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Storage</p>
                      <p className="text-sm font-medium text-gray-900">
                        {device.storageUsed} / {device.storage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ResponsiveCard>

        {/* Device Management */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                ⚙️
              </div>
              Device Management
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Bulk actions and device management tools
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Remote Wipe</h4>
                  <p className="text-sm text-gray-600">Securely erase data from selected devices</p>
                </div>
                  Wipe Device
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Device Lock</h4>
                  <p className="text-sm text-gray-600">Lock devices remotely for security</p>
                </div>
                  Lock Device
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">App Updates</h4>
                  <p className="text-sm text-gray-600">Push app updates to all devices</p>
                </div>
                  Update Apps
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Device Reports</h4>
                  <p className="text-sm text-gray-600">Generate device usage reports</p>
                </div>
                  Generate Report
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Security Status */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🔒
              </div>
              Security Status
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Security compliance and device health status
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
                    <h4 className="font-medium text-gray-900">Encryption Status</h4>
                    <p className="text-sm text-gray-600">All devices are encrypted</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Compliant
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    ✅
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Screen Lock</h4>
                    <p className="text-sm text-gray-600">All devices have screen lock enabled</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Compliant
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    ⚠️
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">OS Updates</h4>
                    <p className="text-sm text-gray-600">2 devices need OS updates</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Attention
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    ✅
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Jailbreak Detection</h4>
                    <p className="text-sm text-gray-600">No jailbroken devices detected</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Secure
                </span>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default MobileDevices;
