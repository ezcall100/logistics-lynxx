import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const AccessControlPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Access Control</h2>
          <p className="text-gray-600">Manage user access and permissions</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Access Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Access control interface - manage user permissions, role-based access, and security policies.</p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">🔐 Access control system is active and secure</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessControlPage;
