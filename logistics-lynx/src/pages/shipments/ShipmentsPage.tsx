/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllShipmentsTab from '@/components/shipments/AllShipmentsTab';
import NewShipmentTab from '@/components/shipments/NewShipmentTab';
import AssignedShipmentsTab from '@/components/shipments/AssignedShipmentsTab';
import PendingShipmentsTab from '@/components/shipments/PendingShipmentsTab';
import InTransitShipmentsTab from '@/components/shipments/InTransitShipmentsTab';
import DeliveredShipmentsTab from '@/components/shipments/DeliveredShipmentsTab';

const ShipmentsPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (currentPath.includes('/shipments/new')) return 'new';
    if (currentPath.includes('/shipments/assigned')) return 'assigned';
    if (currentPath.includes('/shipments/pending')) return 'pending';
    if (currentPath.includes('/shipments/in-transit')) return 'in-transit';
    if (currentPath.includes('/shipments/delivered')) return 'delivered';
    return 'all';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Autonomous Shipments</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track shipments with AI-powered logistics automation
            </p>
          </div>
        </div>

        <Tabs value={getActiveTab()} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-[600px]">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <span>New</span>
            </TabsTrigger>
            <TabsTrigger value="assigned" className="flex items-center gap-2">
              <span>Assigned</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <span>Pending</span>
            </TabsTrigger>
            <TabsTrigger value="in-transit" className="flex items-center gap-2">
              <span>In Transit</span>
            </TabsTrigger>
            <TabsTrigger value="delivered" className="flex items-center gap-2">
              <span>Delivered</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <AllShipmentsTab />
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <NewShipmentTab />
          </TabsContent>

          <TabsContent value="assigned" className="space-y-6">
            <AssignedShipmentsTab />
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <PendingShipmentsTab />
          </TabsContent>

          <TabsContent value="in-transit" className="space-y-6">
            <InTransitShipmentsTab />
          </TabsContent>

          <TabsContent value="delivered" className="space-y-6">
            <DeliveredShipmentsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ShipmentsPage;
