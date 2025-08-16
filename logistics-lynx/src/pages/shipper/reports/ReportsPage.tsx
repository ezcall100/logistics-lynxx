/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Shipping Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Shipping analytics and reporting will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
