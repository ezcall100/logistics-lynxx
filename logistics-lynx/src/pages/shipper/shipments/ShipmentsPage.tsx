
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ShipmentsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shipments</h1>
      <Card>
        <CardHeader>
          <CardTitle>Shipment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Shipment tracking and management will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShipmentsPage;
