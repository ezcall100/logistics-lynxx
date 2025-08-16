/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowUpDown, ArrowDownCircle, Upload, Layers } from 'lucide-react';

const BulkOperationsTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'creator', label: 'Bulk Creator', icon: Plus, path: '/broker-admin/quotes/bulk/creator' },
    { id: 'updates', label: 'Mass Updates', icon: ArrowUpDown, path: '/broker-admin/quotes/bulk/updates' },
    { id: 'export', label: 'Export Manager', icon: ArrowDownCircle, path: '/broker-admin/quotes/bulk/export' },
    { id: 'import', label: 'Import Quotes', icon: Upload, path: '/broker-admin/quotes/bulk/import' },
    { id: 'batch', label: 'Batch Processing', icon: Layers, path: '/broker-admin/quotes/bulk/batch' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'creator';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Bulk Operations</h2>
        <p className="text-muted-foreground">
          Perform bulk operations on quotes for improved efficiency
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
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
                  {tab.id === 'creator' && 'Create multiple quotes simultaneously'}
                  {tab.id === 'updates' && 'Update multiple quotes at once'}
                  {tab.id === 'export' && 'Export quotes in various formats'}
                  {tab.id === 'import' && 'Import quotes from external sources'}
                  {tab.id === 'batch' && 'Process quotes in batches for efficiency'}
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

export default BulkOperationsTabs;