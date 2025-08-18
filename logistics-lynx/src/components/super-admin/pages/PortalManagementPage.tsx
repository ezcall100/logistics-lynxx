import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';

const PortalManagementPage: React.FC = () => {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Portal Management</h1>
          <p className="text-gray-600 mt-1">Manage all system portals and access control</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">7 Portals Active</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Portal Management Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Portal management interface - configure, monitor, and manage all system portals.</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">🌐 All 7 portals are active and operational</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalManagementPage;
