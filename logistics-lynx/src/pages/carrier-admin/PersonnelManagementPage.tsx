/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DriverOwnerOperatorManagement from '@/components/carrier/DriverOwnerOperatorManagement';
import PersonnelOverview from '@/components/carrier/PersonnelOverview';
import InvitePersonnelDialog from '@/components/carrier/InvitePersonnelDialog';

const PersonnelManagementPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Personnel Management</h1>
          <p className="text-muted-foreground">
            Manage drivers and owner-operators with direct portal access
          </p>
        </div>
        <InvitePersonnelDialog />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="management">Detailed Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PersonnelOverview />
        </TabsContent>

        <TabsContent value="management">
          <DriverOwnerOperatorManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonnelManagementPage;