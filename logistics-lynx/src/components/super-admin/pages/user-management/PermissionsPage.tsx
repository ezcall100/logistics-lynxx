import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const PermissionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Permissions</h2>
          <p className="text-gray-600">Manage system permissions and access control</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">🔒 Permissions</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Access Control</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Permissions management interface - configure system permissions and access control.</p>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-purple-800">🔒 Granular permissions system active</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionsPage;
