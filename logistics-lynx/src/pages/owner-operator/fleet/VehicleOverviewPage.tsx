import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, Wrench, Calendar, AlertTriangle } from 'lucide-react';

const VehicleOverviewPage = () => {
  const vehicle = {
    year: '2020',
    make: 'Freightliner',
    model: 'Cascadia',
    vin: 'ABCD123456789',
    miles: '287,450',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-02-15',
    mpg: '7.2',
    fuelCapacity: '230 gallons'
  };

  const maintenanceAlerts = [
    { type: 'Oil Change', due: '2024-02-15', severity: 'medium' },
    { type: 'Tire Rotation', due: '2024-02-20', severity: 'low' },
    { type: 'DOT Inspection', due: '2024-03-01', severity: 'high' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vehicle Overview</h1>
        <p className="text-muted-foreground">Monitor your truck's status and maintenance needs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Vehicle Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Year</p>
                <p className="text-lg font-semibold">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Make</p>
                <p className="text-lg font-semibold">{vehicle.make}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Model</p>
                <p className="text-lg font-semibold">{vehicle.model}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mileage</p>
                <p className="text-lg font-semibold">{vehicle.miles}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fuel MPG</p>
                <p className="text-lg font-semibold">{vehicle.mpg}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fuel Capacity</p>
                <p className="text-lg font-semibold">{vehicle.fuelCapacity}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">VIN</p>
              <p className="text-sm font-mono">{vehicle.vin}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Maintenance Alerts
            </CardTitle>
            <CardDescription>Upcoming maintenance and inspections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maintenanceAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">Due: {alert.due}</p>
                    </div>
                  </div>
                  <Badge variant={
                    alert.severity === 'high' ? 'destructive' : 
                    alert.severity === 'medium' ? 'default' : 'secondary'
                  }>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance History</CardTitle>
          <CardDescription>Recent maintenance and service records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Oil Change & Filter</p>
                <p className="text-sm text-muted-foreground">2024-01-10 • 285,200 miles</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$125.00</p>
                <p className="text-sm text-muted-foreground">Johnson's Truck Service</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <p className="font-medium">Brake Inspection</p>
                <p className="text-sm text-muted-foreground">2023-12-15 • 281,800 miles</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$85.00</p>
                <p className="text-sm text-muted-foreground">Highway Truck Repair</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleOverviewPage;