import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Zap, Palette, Copy, BarChart3, Plug } from 'lucide-react';

const FABOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Actions Overview</h1>
          <p className="text-gray-600 mt-2">Manage floating action buttons and quick actions</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          New Feature
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </div>
            <CardDescription>Configure floating action buttons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active FABs</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Custom Actions</span>
                <Badge variant="secondary">8</Badge>
              </div>
              <Button size="sm" className="w-full mt-3">
                Configure Actions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Customization</CardTitle>
            </div>
            <CardDescription>Style and appearance settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Themes</span>
                <Badge variant="secondary">4</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Templates</span>
                <Badge variant="secondary">6</Badge>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3">
                Customize
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Analytics</CardTitle>
            </div>
            <CardDescription>Usage and performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Clicks</span>
                <Badge variant="secondary">1,247</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg. Response</span>
                <Badge variant="secondary">2.3s</Badge>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-3">
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent FAB Activity</CardTitle>
          <CardDescription>Latest floating action button interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New Load Created', user: 'John Doe', time: '2 minutes ago', icon: Plus },
              { action: 'Quick Quote Generated', user: 'Jane Smith', time: '5 minutes ago', icon: Zap },
              { action: 'Support Ticket Opened', user: 'Mike Johnson', time: '12 minutes ago', icon: Plus },
              { action: 'Analytics Dashboard', user: 'Sarah Wilson', time: '18 minutes ago', icon: BarChart3 }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <item.icon className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-500">by {item.user}</p>
                </div>
                <span className="text-sm text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FABOverview;
