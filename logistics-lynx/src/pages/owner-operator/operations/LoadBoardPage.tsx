/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, MapPin, DollarSign, Clock } from 'lucide-react';

const LoadBoardPage = () => {
  const availableLoads = [
    {
      id: '1',
      pickup: 'Los Angeles, CA',
      delivery: 'Phoenix, AZ',
      weight: '45,000 lbs',
      rate: '$1,850',
      distance: '372 miles',
      commodity: 'Electronics',
      deadline: '2024-01-15',
      status: 'available'
    },
    {
      id: '2',
      pickup: 'Chicago, IL',
      delivery: 'Detroit, MI',
      weight: '38,000 lbs',
      rate: '$1,200',
      distance: '280 miles',
      commodity: 'Auto Parts',
      deadline: '2024-01-16',
      status: 'available'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Load Board</h1>
        <p className="text-muted-foreground">Find and bid on available freight loads</p>
      </div>

      <div className="grid gap-4">
        {availableLoads.map((load) => (
          <Card key={load.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {load.commodity}
                </CardTitle>
                <Badge variant="secondary">{load.status}</Badge>
              </div>
              <CardDescription>Load ID: #{load.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Pickup</p>
                    <p className="text-sm text-muted-foreground">{load.pickup}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Delivery</p>
                    <p className="text-sm text-muted-foreground">{load.delivery}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{load.rate}</p>
                    <p className="text-sm text-muted-foreground">{load.distance}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Deadline</p>
                    <p className="text-sm text-muted-foreground">{load.deadline}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Weight: {load.weight}</p>
                <Button>Bid on Load</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoadBoardPage;