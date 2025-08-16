/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck } from 'lucide-react';

const CarrierRelations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center border border-orange-200/30">
          <Truck className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Carrier Relations</h1>
          <p className="text-muted-foreground">Manage relationships with carriers</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Carrier Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            Carrier Relations functionality coming soon...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarrierRelations;
