import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Volume2, MousePointer, Type } from 'lucide-react';

const AccessibilitySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accessibility Settings</h1>
          <p className="text-gray-600 mt-2">Configure accessibility features and preferences</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Eye className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visual Accessibility</CardTitle>
            <CardDescription>Configure visual accessibility features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">High Contrast Mode</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Reduce Motion</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Large Text</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Size</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>Extra Large</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audio & Navigation</CardTitle>
            <CardDescription>Configure audio and navigation accessibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Screen Reader Support</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Keyboard Navigation</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Audio Descriptions</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Focus Indicator</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Default</option>
                <option>High Visibility</option>
                <option>Custom Color</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility Testing</CardTitle>
          <CardDescription>Test and verify accessibility features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Visual Test</p>
              <p className="text-sm text-gray-500">Test contrast and readability</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Volume2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium">Audio Test</p>
              <p className="text-sm text-gray-500">Test screen reader compatibility</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <MousePointer className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="font-medium">Navigation Test</p>
              <p className="text-sm text-gray-500">Test keyboard navigation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilitySettings;
