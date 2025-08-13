
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const FleetManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Fleet Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Fleet</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Fleet management and tracking will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FleetManagementPage;
