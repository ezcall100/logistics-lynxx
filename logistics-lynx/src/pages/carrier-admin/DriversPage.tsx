/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DriversTable from '@/components/carrier/DriversTable';
import PersonnelOverview from '@/components/carrier/PersonnelOverview';
import InvitePersonnelDialog from '@/components/carrier/InvitePersonnelDialog';

const DriversPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Driver Management</h1>
          <p className="text-muted-foreground">
            Manage all drivers with direct portal access and real-time tracking
          </p>
        </div>
        <InvitePersonnelDialog />
      </div>

      <Tabs defaultValue="drivers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="drivers">All Drivers</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="drivers">
          <DriversTable />
        </TabsContent>

        <TabsContent value="overview">
          <PersonnelOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriversPage;