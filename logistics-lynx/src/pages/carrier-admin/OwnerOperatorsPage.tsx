import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OwnerOperatorsTable from '@/components/carrier/OwnerOperatorsTable';
import PersonnelOverview from '@/components/carrier/PersonnelOverview';
import InvitePersonnelDialog from '@/components/carrier/InvitePersonnelDialog';

const OwnerOperatorsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Owner-Operator Management</h1>
          <p className="text-muted-foreground">
            Manage all owner-operators with direct portal access and performance tracking
          </p>
        </div>
        <InvitePersonnelDialog />
      </div>

      <Tabs defaultValue="owner-operators" className="space-y-6">
        <TabsList>
          <TabsTrigger value="owner-operators">All Owner-Operators</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="owner-operators">
          <OwnerOperatorsTable />
        </TabsContent>

        <TabsContent value="overview">
          <PersonnelOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OwnerOperatorsPage;