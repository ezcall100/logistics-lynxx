/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const LoadBoard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Load Board</h1>
      <Card>
        <CardHeader>
          <CardTitle>Available Loads</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Load board functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadBoard;
