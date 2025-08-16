/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MaintenancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Maintenance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Maintenance scheduling and tracking will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenancePage;
