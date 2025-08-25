import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const MobileSync: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Sync</h1>
          <p className="text-gray-600 mt-2">Manage data synchronization between mobile and web</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync Now
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 min ago</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">Successful</span> sync
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-xs text-muted-foreground">
              All devices connected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Changes</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Waiting to sync
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sync Conflicts</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">
              Need resolution
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sync History</CardTitle>
            <CardDescription>Recent synchronization activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 minutes ago', status: 'success', action: 'Data sync completed', device: 'iPhone 14' },
                { time: '15 minutes ago', status: 'success', action: 'Settings updated', device: 'Android Tablet' },
                { time: '1 hour ago', status: 'error', action: 'Sync failed - network error', device: 'iPad Pro' },
                { time: '2 hours ago', status: 'success', action: 'User data synced', device: 'iPhone 13' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className={`p-2 rounded-lg ${
                    item.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {item.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-500">{item.device} • {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
            <CardDescription>Connected mobile devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'iPhone 14', status: 'online', lastSeen: '2 min ago', battery: '85%' },
                { name: 'Android Tablet', status: 'online', lastSeen: '15 min ago', battery: '67%' },
                { name: 'iPad Pro', status: 'offline', lastSeen: '1 hour ago', battery: '23%' },
                { name: 'iPhone 13', status: 'online', lastSeen: '2 hours ago', battery: '92%' }
              ].map((device, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{device.name}</p>
                    <p className="text-sm text-gray-500">Last seen: {device.lastSeen}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={device.status === 'online' ? 'default' : 'secondary'}>
                      {device.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{device.battery}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileSync;
