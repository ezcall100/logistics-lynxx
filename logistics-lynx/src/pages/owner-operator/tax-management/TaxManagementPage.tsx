
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const TaxManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tax Management</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tax Planning & Filing</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Tax management and preparation tools will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxManagementPage;
