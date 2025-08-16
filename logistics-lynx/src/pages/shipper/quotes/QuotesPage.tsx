/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const QuotesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quotes</h1>
      <Card>
        <CardHeader>
          <CardTitle>Quote Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Quote request and management functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuotesPage;
