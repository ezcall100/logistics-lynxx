/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Lock, Brain, Shield, FileText, Wrench } from 'lucide-react';

const SettingsConfigTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'general', label: 'Quote Settings', icon: Settings, path: '/broker-admin/quotes/settings/general' },
    { id: 'approval-limits', label: 'Approval Limits', icon: Lock, path: '/broker-admin/quotes/settings/approval-limits' },
    { id: 'pricing-rules', label: 'Pricing Rules', icon: Brain, path: '/broker-admin/quotes/settings/pricing-rules' },
    { id: 'permissions', label: 'User Permissions', icon: Shield, path: '/broker-admin/quotes/settings/permissions' },
    { id: 'formats', label: 'Quote Formats', icon: FileText, path: '/broker-admin/quotes/settings/formats' },
    { id: 'system', label: 'System Config', icon: Wrench, path: '/broker-admin/quotes/settings/system' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'general';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings & Configuration</h2>
        <p className="text-muted-foreground">
          Configure quote system settings and user permissions
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
                  {tab.id === 'general' && 'Configure general quote system settings'}
                  {tab.id === 'approval-limits' && 'Set approval limits and thresholds'}
                  {tab.id === 'pricing-rules' && 'Configure pricing rules and algorithms'}
                  {tab.id === 'permissions' && 'Manage user access and permissions'}
                  {tab.id === 'formats' && 'Customize quote formats and templates'}
                  {tab.id === 'system' && 'Advanced system configuration options'}
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

export default SettingsConfigTabs;