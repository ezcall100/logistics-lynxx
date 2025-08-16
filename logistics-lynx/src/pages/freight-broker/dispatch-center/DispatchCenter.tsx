/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const DispatchCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dispatch Center</h1>
      <Card>
        <CardHeader>
          <CardTitle>Load Dispatching</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Dispatch center functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DispatchCenter;
