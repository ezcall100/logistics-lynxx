import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const MobileSettings = () => {
  const [settings] = useState({
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
        <Button className="bg-blue-600 hover:bg-blue-700">
          Save Settings
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                🔔
              </div>
              Notification Settings
            </CardTitle>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Data & Sync Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Data & Sync Settings
            </CardTitle>
            <CardDescription>
              Manage data synchronization and storage preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Location & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                📍
              </div>
              Location & Privacy
            </CardTitle>
            <CardDescription>
              Control location services and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <Label className="text-base font-medium">Location Services</Label>
                <p className="text-sm text-gray-600">Allow app to access your location</p>
              </div>
              <Switch checked={settings.locationServices} />
            </div>
          </CardContent>
        </Card>

        {/* App Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                ⚡
              </div>
              App Performance
            </CardTitle>
            <CardDescription>
              Optimize app performance and battery usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Battery Usage</h4>
                  <p className="text-sm text-gray-600">Low impact mode enabled</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Optimized
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Storage Usage</h4>
                  <p className="text-sm text-gray-600">2.3 GB of 64 GB used</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  3.6%
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Cache Size</h4>
                  <p className="text-sm text-gray-600">156 MB cached data</p>
                </div>
                <Button size="sm" variant="outline">
                  Clear Cache
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                🔒
              </div>
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage app security and authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Biometric Authentication</h4>
                  <p className="text-sm text-gray-600">Use fingerprint or face ID</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  Enabled
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Session Timeout</h4>
                  <p className="text-sm text-gray-600">Auto-logout after 30 minutes</p>
                </div>
                <Button size="sm" variant="outline">
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">Device Management</h4>
                  <p className="text-sm text-gray-600">Manage trusted devices</p>
                </div>
                <Button size="sm" variant="outline">
                  Manage
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileSettings;
