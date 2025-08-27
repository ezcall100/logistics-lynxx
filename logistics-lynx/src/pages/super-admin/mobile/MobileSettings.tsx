import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const MobileSettings = () => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    locationServices: false,
    autoSync: true,
    offlineMode: true,
    dataCompression: true,
    backgroundRefresh: false
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure mobile app behavior and preferences
          </p>
        </div>
        <EnhancedButton className="bg-blue-600 hover:bg-blue-700">
          Save Settings
        </EnhancedButton>
      </div>

      <div className="grid gap-6">
        {/* Notification Settings */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🔔
              </div>
              Notification Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Configure how and when you receive notifications
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Push Notifications</Label>
                <p className="text-sm text-gray-600">Receive real-time updates and alerts</p>
              </div>
              <Switch checked={settings.pushNotifications} />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Background Refresh</Label>
                <p className="text-sm text-gray-600">Allow app to refresh data in background</p>
              </div>
              <Switch checked={settings.backgroundRefresh} />
            </div>
          </div>
        </ResponsiveCard>

        {/* Data & Sync Settings */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Data & Sync Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Manage data synchronization and storage preferences
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Auto Sync</Label>
                <p className="text-sm text-gray-600">Automatically sync data when connected</p>
              </div>
              <Switch checked={settings.autoSync} />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Offline Mode</Label>
                <p className="text-sm text-gray-600">Allow app to work without internet</p>
              </div>
              <Switch checked={settings.offlineMode} />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Data Compression</Label>
                <p className="text-sm text-gray-600">Reduce data usage with compression</p>
              </div>
              <Switch checked={settings.dataCompression} />
            </div>
          </div>
        </ResponsiveCard>

        {/* Location & Privacy */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                📍
              </div>
              Location & Privacy
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Control location services and privacy settings
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Location Services</Label>
                <p className="text-sm text-gray-600">Allow app to access your location</p>
              </div>
              <Switch checked={settings.locationServices} />
            </div>
          </div>
        </ResponsiveCard>

        {/* App Performance */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                ⚡
              </div>
              App Performance
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Optimize app performance and battery usage
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Battery Usage</h4>
                  <p className="text-sm text-gray-600">Low impact mode enabled</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Optimized
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Storage Usage</h4>
                  <p className="text-sm text-gray-600">2.3 GB of 64 GB used</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  3.6%
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Cache Size</h4>
                  <p className="text-sm text-gray-600">156 MB cached data</p>
                </div>
                <EnhancedButton size="sm" variant="outline">
                  Clear Cache
                </EnhancedButton>
              </div>
            </div>
          </div>
        </ResponsiveCard>

        {/* Security Settings */}
        <ResponsiveCard>
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🔒
              </div>
              Security Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Manage app security and authentication
            </p>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Biometric Authentication</h4>
                  <p className="text-sm text-gray-600">Use fingerprint or face ID</p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  Enabled
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Session Timeout</h4>
                  <p className="text-sm text-gray-600">Auto-logout after 30 minutes</p>
                </div>
                <EnhancedButton size="sm" variant="outline">
                  Configure
                </EnhancedButton>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Device Management</h4>
                  <p className="text-sm text-gray-600">Manage trusted devices</p>
                </div>
                <EnhancedButton size="sm" variant="outline">
                  Manage
                </EnhancedButton>
              </div>
            </div>
          </div>
        </ResponsiveCard>
      </div>
    </div>
  );
};

export default MobileSettings;
