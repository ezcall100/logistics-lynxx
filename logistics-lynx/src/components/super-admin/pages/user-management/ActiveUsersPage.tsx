import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const ActiveUsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Active Users</h2>
          <p className="text-gray-600">Users with active status and recent activity</p>
        </div>
        <Badge className="bg-green-100 text-green-800">2,847 Active</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Users Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Active users management interface - similar to AllUsersPage but filtered for active status only.</p>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800">✅ All active users are currently online and operational</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActiveUsersPage;
