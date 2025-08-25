import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Languages } from 'lucide-react';

const LanguageSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Language Settings</h1>
          <p className="text-gray-600 mt-2">Configure language and regional preferences</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Globe className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Language Preferences</CardTitle>
            <CardDescription>Choose your preferred language</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Language</label>
              <select className="w-full p-2 border rounded-lg">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Chinese</option>
                <option>Japanese</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Secondary Language</label>
              <select className="w-full p-2 border rounded-lg">
                <option>None</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto-detect Language</span>
              <input type="checkbox" className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Settings</CardTitle>
            <CardDescription>Configure date, time, and number formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Zone</label>
              <select className="w-full p-2 border rounded-lg">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (Central European)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Format</label>
              <select className="w-full p-2 border rounded-lg">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <select className="w-full p-2 border rounded-lg">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LanguageSettings;
