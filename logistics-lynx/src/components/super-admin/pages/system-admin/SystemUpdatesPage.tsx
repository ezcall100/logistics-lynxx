import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const SystemUpdatesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">System Updates</h2>
          <p className="text-gray-600">Manage system updates and version control</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">v2.1.4</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Update Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">System updates interface - check for updates, install patches, and manage version control.</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">🔄 System is up to date (v2.1.4)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemUpdatesPage;
