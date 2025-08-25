import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Eye, Lock, Download } from 'lucide-react';

const PrivacySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Privacy Settings</h1>
          <p className="text-gray-600 mt-2">Manage your privacy and data preferences</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700">
          <Shield className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Collection</CardTitle>
            <CardDescription>Control what data is collected about you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Analytics Data</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Usage Statistics</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Error Reporting</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Performance Monitoring</span>
              <input type="checkbox" className="rounded" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Sharing</CardTitle>
            <CardDescription>Control how your data is shared</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Third-party Services</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Marketing Communications</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Research & Development</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Anonymous Usage Data</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your personal data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Download className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-gray-500">Download your personal data</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium">View Data</p>
              <p className="text-sm text-gray-500">See what data we have</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Lock className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <p className="font-medium">Delete Data</p>
              <p className="text-sm text-gray-500">Request data deletion</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
