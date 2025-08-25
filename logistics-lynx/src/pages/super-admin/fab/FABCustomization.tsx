import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Settings, Eye, Plus } from 'lucide-react';

const FABCustomization: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAB Customization</h1>
          <p className="text-gray-600 mt-2">Customize floating action button appearance and behavior</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Palette className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>Customize the visual appearance of FABs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Default</option>
                <option>Dark</option>
                <option>Light</option>
                <option>Custom</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Size</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Position</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Bottom Right</option>
                <option>Bottom Left</option>
                <option>Top Right</option>
                <option>Top Left</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Behavior Settings</CardTitle>
            <CardDescription>Configure FAB interaction behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto-hide on scroll</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Show on hover</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Animate entrance</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Enable sound effects</span>
              <input type="checkbox" className="rounded" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your FAB will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-600 rounded-full shadow-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FABCustomization;
