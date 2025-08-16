/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CustomerPortalPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customer Portal</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer Access</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Customer portal functionality will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerPortalPage;
