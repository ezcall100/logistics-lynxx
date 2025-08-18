import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

const SuspendedUsersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Suspended Users</h2>
          <p className="text-gray-600">Users with suspended accounts</p>
        </div>
        <Badge className="bg-red-100 text-red-800">5 Suspended</Badge>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Suspended Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Suspended users management interface - users with suspended accounts.</p>
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-red-800">❌ 5 users have suspended accounts due to security issues</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuspendedUsersPage;
