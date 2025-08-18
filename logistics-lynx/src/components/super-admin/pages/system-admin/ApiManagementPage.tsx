import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const ApiManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">API Management</h2>
          <p className="text-gray-600">Manage API endpoints and integrations</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">Healthy</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>API Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">API management interface - monitor endpoints, manage keys, and configure integrations.</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">🔌 All API services are healthy and responding</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiManagementPage;
