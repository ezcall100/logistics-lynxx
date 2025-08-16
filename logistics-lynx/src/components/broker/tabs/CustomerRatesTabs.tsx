/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Clock, BarChart, Truck, Route, Fuel } from 'lucide-react';

const CustomerRatesTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'customer-rates', label: 'Customer Rates', icon: DollarSign, path: '/broker-admin/quotes/customer/rates' },
    { id: 'customer-history', label: 'Customer History', icon: Clock, path: '/broker-admin/quotes/customer/history' },
    { id: 'rate-tables', label: 'Rate Tables', icon: BarChart, path: '/broker-admin/quotes/rates/tables' },
    { id: 'carrier-rates', label: 'Carrier Rates', icon: Truck, path: '/broker-admin/quotes/rates/carrier' },
    { id: 'lane-pricing', label: 'Lane Pricing', icon: Route, path: '/broker-admin/quotes/rates/lane-pricing' },
    { id: 'fuel-surcharges', label: 'Fuel Surcharges', icon: Fuel, path: '/broker-admin/quotes/rates/fuel-surcharges' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'customer-rates';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customer & Rates</h2>
        <p className="text-muted-foreground">
          Manage customer pricing, rate tables, and carrier rates
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(tab => (
          <TabsContent key={tab.id} value={tab.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </CardTitle>
                <CardDescription>
                  {tab.id === 'customer-rates' && 'Manage customer-specific pricing and rates'}
                  {tab.id === 'customer-history' && 'Review historical pricing and quote data'}
                  {tab.id === 'rate-tables' && 'Configure and maintain rate table structures'}
                  {tab.id === 'carrier-rates' && 'Manage carrier pricing and rate agreements'}
                  {tab.id === 'lane-pricing' && 'Set pricing for specific lanes and routes'}
                  {tab.id === 'fuel-surcharges' && 'Configure fuel surcharge calculations'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64 text-muted-foreground">
                  <div className="text-center">
                    <tab.icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Content for {tab.label} will be implemented here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CustomerRatesTabs;