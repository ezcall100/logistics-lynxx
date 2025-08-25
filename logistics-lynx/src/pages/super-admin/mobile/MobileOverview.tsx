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

const MobileOverview = () => {
  const [mobileStats] = useState({
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
        <Button className="bg-blue-600 hover:bg-blue-700">
          Add Device
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Mobile Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                📊
              </div>
              Mobile Statistics
            </CardTitle>
            <CardDescription>
              Overview of mobile device usage and status
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Device Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📱
              </div>
              Device Status
            </CardTitle>
            <CardDescription>
              Current status of connected mobile devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'iPhone 15 Pro', user: 'John Doe', status: 'online', lastSync: '1 minute ago' },
                { name: 'Samsung Galaxy S24', user: 'Jane Smith', status: 'online', lastSync: '3 minutes ago' },
                { name: 'iPad Pro', user: 'Mike Johnson', status: 'offline', lastSync: '2 hours ago' },
                { name: 'Google Pixel 8', user: 'Sarah Wilson', status: 'online', lastSync: '5 minutes ago' }
              ].map((device, index) => (
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
                    <Badge className={device.status === 'online' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }>
                      {device.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Manage
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sync Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                🔄
              </div>
              Synchronization Status
            </CardTitle>
            <CardDescription>
              Real-time synchronization status and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <Badge className="bg-green-100 text-green-800">
                  Healthy
                </Badge>
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
                <Badge className="bg-blue-100 text-blue-800">
                  Stable
                </Badge>
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
                <Badge className="bg-orange-100 text-orange-800">
                  Good
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileOverview;
