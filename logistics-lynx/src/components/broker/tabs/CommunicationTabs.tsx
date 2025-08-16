/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Globe, ScanLine, Phone, MessageSquare } from 'lucide-react';

const CommunicationTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'notifications', label: 'Quote Notifications', icon: Bell, path: '/broker-admin/quotes/communication/notifications' },
    { id: 'portal', label: 'Customer Portal', icon: Globe, path: '/broker-admin/quotes/communication/portal' },
    { id: 'tracking', label: 'Quote Tracking', icon: ScanLine, path: '/broker-admin/quotes/communication/tracking' },
    { id: 'followup', label: 'Follow-up Manager', icon: Phone, path: '/broker-admin/quotes/communication/followup' },
    { id: 'chat', label: 'Quote Chat', icon: MessageSquare, path: '/broker-admin/quotes/communication/chat' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'notifications';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Communication</h2>
        <p className="text-muted-foreground">
          Manage customer communications and quote interactions
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
                  {tab.id === 'notifications' && 'Configure and manage quote notification systems'}
                  {tab.id === 'portal' && 'Manage customer portal access and features'}
                  {tab.id === 'tracking' && 'Track quote status and customer interactions'}
                  {tab.id === 'followup' && 'Manage follow-up activities and reminders'}
                  {tab.id === 'chat' && 'Real-time chat for quote discussions'}
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

export default CommunicationTabs;