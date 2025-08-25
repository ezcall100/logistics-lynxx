import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Moon, Sun, Monitor } from 'lucide-react';

const AppearanceSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appearance Settings</h1>
          <p className="text-gray-600 mt-2">Customize the look and feel of your interface</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Palette className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Choose your preferred theme</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme Mode</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto (System)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Color Scheme</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Blue</option>
                <option>Green</option>
                <option>Purple</option>
                <option>Orange</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Accent Color</label>
              <input type="color" className="w-full h-10 border rounded-lg" defaultValue="#3b82f6" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Layout Options</CardTitle>
            <CardDescription>Customize the layout and spacing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sidebar Position</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Left</option>
                <option>Right</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Density</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Comfortable</option>
                <option>Compact</option>
                <option>Spacious</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Show Animations</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your changes will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-8">
            <div className="w-64 h-40 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
              <div className="text-center">
                <Palette className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-600 font-medium">Theme Preview</p>
                <p className="text-xs text-blue-500">Your selected theme will appear here</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
