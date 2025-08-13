
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ShipperNetwork: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shipper Network</h1>
      <Card>
        <CardHeader>
          <CardTitle>Network Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Shipper network management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipperNetwork;
