import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, Tablet, Laptop, Monitor, Trash2, Settings } from 'lucide-react';

const MobileDevices: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile Devices</h1>
          <p className="text-gray-600 mt-2">Manage and monitor connected mobile devices</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Smartphone className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            name: 'iPhone 14 Pro', 
            user: 'John Doe', 
            type: 'smartphone', 
            status: 'online', 
            lastSeen: '2 min ago', 
            battery: '85%',
            os: 'iOS 17.2',
            icon: Smartphone
          },
          { 
            name: 'iPad Pro 12.9"', 
            user: 'Jane Smith', 
            type: 'tablet', 
            status: 'online', 
            lastSeen: '15 min ago', 
            battery: '67%',
            os: 'iPadOS 17.2',
            icon: Tablet
          },
          { 
            name: 'Samsung Galaxy S23', 
            user: 'Mike Johnson', 
            type: 'smartphone', 
            status: 'offline', 
            lastSeen: '1 hour ago', 
            battery: '23%',
            os: 'Android 14',
            icon: Smartphone
          },
          { 
            name: 'MacBook Pro', 
            user: 'Sarah Wilson', 
            type: 'laptop', 
            status: 'online', 
            lastSeen: '2 hours ago', 
            battery: '92%',
            os: 'macOS 14.1',
            icon: Laptop
          },
          { 
            name: 'Dell XPS 13', 
            user: 'Alex Brown', 
            type: 'laptop', 
            status: 'online', 
            lastSeen: '30 min ago', 
            battery: '45%',
            os: 'Windows 11',
            icon: Laptop
          },
          { 
            name: 'Desktop PC', 
            user: 'Chris Davis', 
            type: 'desktop', 
            status: 'online', 
            lastSeen: '5 min ago', 
            battery: 'N/A',
            os: 'Windows 11',
            icon: Monitor
          }
        ].map((device, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <device.icon className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                </div>
                <Badge variant={device.status === 'online' ? 'default' : 'secondary'}>
                  {device.status}
                </Badge>
              </div>
              <CardDescription>{device.user} • {device.os}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last seen:</span>
                  <span className="font-medium">{device.lastSeen}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Battery:</span>
                  <span className="font-medium">{device.battery}</span>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Device Statistics</CardTitle>
          <CardDescription>Overview of device distribution and usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600">Total Devices</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-gray-600">Online</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-gray-600">Offline</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Mobile</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileDevices;
