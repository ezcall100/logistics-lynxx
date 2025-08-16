/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Gauge, Wrench, AlertTriangle } from 'lucide-react';

const VehicleSettingsPage = () => {
  return (
    <div className="w-full max-w-none p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Vehicle Settings</h1>
        <p className="text-muted-foreground">Truck preferences & maintenance settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5" />
              <span>Truck Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure your truck settings, weight limits, and specifications.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wrench className="w-5 h-5" />
              <span>Maintenance Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Set up maintenance schedules and reminder notifications.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleSettingsPage;