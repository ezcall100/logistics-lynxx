/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Download, Filter } from 'lucide-react';
import { UnitsTab } from '@/components/assets/UnitsTab';
import { TrucksTab } from '@/components/assets/TrucksTab';
import { TrailersTab } from '@/components/assets/TrailersTab';
import { FleetTrackerTab } from '@/components/assets/FleetTrackerTab';
import { ComplianceTab } from '@/components/assets/ComplianceTab';
import { FuelAuditTab } from '@/components/assets/FuelAuditTab';
import { useAssetManagement } from '@/hooks/useAssetManagement';
export default function AssetsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('units');
  const [searchTerm, setSearchTerm] = useState('');
  const {
    stats
  } = useAssetManagement();

  // Set active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/units') || path.includes('/unit')) {
      setActiveTab('units');
    } else if (path.includes('/trucks') || path.includes('/truck')) {
      setActiveTab('trucks');
    } else if (path.includes('/trailers') || path.includes('/trailer')) {
      setActiveTab('trailers');
    } else if (path.includes('/tracker') || path.includes('/fleet-tracker')) {
      setActiveTab('tracker');
    } else if (path.includes('/compliance')) {
      setActiveTab('compliance');
    } else if (path.includes('/fuel')) {
      setActiveTab('fuel');
    } else if (path === '/carrier-admin/assets') {
      setActiveTab('units'); // Default to units for main assets page
    }
  }, [location.pathname]);
  const tabs = [{
    id: 'units',
    label: 'Units',
    count: stats.units.total
  }, {
    id: 'trucks',
    label: 'Trucks',
    count: stats.trucks.total
  }, {
    id: 'trailers',
    label: 'Trailers',
    count: stats.trailers.total
  }, {
    id: 'tracker',
    label: 'Fleet Tracker',
    count: stats.fleetTracker.activeTracking
  }, {
    id: 'compliance',
    label: 'Compliance',
    count: stats.compliance.pendingItems
  }, {
    id: 'fuel',
    label: 'Fuel Audit',
    count: stats.fuelAudit.recentTransactions
  }];
  return <Layout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        

        {/* Search and Filter Bar */}
        <Card>
          
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          

          <TabsContent value="units" className="space-y-4">
            <UnitsTab searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="trucks" className="space-y-4">
            <TrucksTab searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="trailers" className="space-y-4">
            <TrailersTab searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="tracker" className="space-y-4">
            <FleetTrackerTab searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <ComplianceTab searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="fuel" className="space-y-4">
            <FuelAuditTab searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>;
}