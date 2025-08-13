
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const InsurancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Insurance</h1>
      <Card>
        <CardHeader>
          <CardTitle>Insurance Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Insurance policy management and claims will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsurancePage;
