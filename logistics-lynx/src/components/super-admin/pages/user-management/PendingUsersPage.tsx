import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const PendingUsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Pending Users</h2>
          <p className="text-gray-600">Users awaiting approval</p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800">23 Pending</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Pending Approval</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Pending users management interface - users waiting for approval.</p>
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800">⏳ 23 users require approval action</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingUsersPage;
