/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const SafetyCompliancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Safety & Compliance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Safety Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Safety compliance and regulatory management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetyCompliancePage;
