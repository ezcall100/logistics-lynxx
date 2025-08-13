import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Truck, Users, Database, Zap, Globe } from 'lucide-react';

const IntegrationApiTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'load-board', label: 'Load Board', icon: Search, path: '/broker-admin/quotes/integration/load-board' },
    { id: 'tms', label: 'TMS Integration', icon: Truck, path: '/broker-admin/quotes/integration/tms' },
    { id: 'crm', label: 'CRM Sync', icon: Users, path: '/broker-admin/quotes/integration/crm' },
    { id: 'api', label: 'API Endpoints', icon: Database, path: '/broker-admin/quotes/integration/api' },
    { id: 'edi', label: 'EDI Quotes', icon: Zap, path: '/broker-admin/quotes/integration/edi' },
    { id: 'third-party', label: 'Third-Party Tools', icon: Globe, path: '/broker-admin/quotes/integration/third-party' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'load-board';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integration & API</h2>
        <p className="text-muted-foreground">
          Connect quotes with external systems and manage API integrations
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
                  {tab.id === 'load-board' && 'Integrate with load board platforms for quote distribution'}
                  {tab.id === 'tms' && 'Connect with Transportation Management Systems'}
                  {tab.id === 'crm' && 'Synchronize quotes with CRM systems'}
                  {tab.id === 'api' && 'Manage API endpoints for quote operations'}
                  {tab.id === 'edi' && 'Handle EDI quote transactions and communications'}
                  {tab.id === 'third-party' && 'Integrate with third-party tools and services'}
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

export default IntegrationApiTabs;