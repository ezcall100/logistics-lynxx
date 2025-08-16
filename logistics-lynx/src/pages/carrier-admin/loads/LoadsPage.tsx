/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const LoadsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Loads</h1>
      <Card>
        <CardHeader>
          <CardTitle>Load Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Load tracking and management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadsPage;
