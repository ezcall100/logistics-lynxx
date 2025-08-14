import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RateFormDialog from './RateFormDialog';
import RateFilters from './RateFilters';

export default function RatesPortal() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rates Portal</h1>
          <p className="text-muted-foreground">
            Manage freight rates, quotes, and pricing strategies
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Rate Management</CardTitle>
            <CardDescription>
              View and manage your freight rates and pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RateFilters />
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Rate management features coming soon...
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common rate-related tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <RateFormDialog />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
