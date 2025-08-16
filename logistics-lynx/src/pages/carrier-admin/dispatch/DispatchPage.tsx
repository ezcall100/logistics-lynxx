/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const DispatchPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dispatch</h1>
      <Card>
        <CardHeader>
          <CardTitle>Load Dispatch Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Load dispatching and routing will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DispatchPage;
