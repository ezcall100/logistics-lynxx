import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

const GlobalSettingsPage: React.FC = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Global Settings</h1>
          <p className="text-gray-600 mt-1">Configure global system settings and preferences</p>
        </div>
        <Badge className="bg-green-100 text-green-800">Configured</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Global Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Global settings interface - configure system-wide settings, appearance, notifications, and integrations.</p>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800">⚙️ Global settings are properly configured</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GlobalSettingsPage;
