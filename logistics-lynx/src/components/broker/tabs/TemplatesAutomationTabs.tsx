/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Bot, CheckCircle, Mail, Zap } from 'lucide-react';

const TemplatesAutomationTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'templates', label: 'Quote Templates', icon: FileText, path: '/broker-admin/quotes/templates' },
    { id: 'rules', label: 'Auto-Quote Rules', icon: Bot, path: '/broker-admin/quotes/automation/rules' },
    { id: 'workflows', label: 'Approval Workflows', icon: CheckCircle, path: '/broker-admin/quotes/automation/workflows' },
    { id: 'emails', label: 'Email Templates', icon: Mail, path: '/broker-admin/quotes/automation/email-templates' },
    { id: 'triggers', label: 'Quote Triggers', icon: Zap, path: '/broker-admin/quotes/automation/triggers' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'templates';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Templates & Automation</h2>
        <p className="text-muted-foreground">
          Streamline your quote process with templates and automated workflows
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
                  {tab.id === 'templates' && 'Create and manage reusable quote templates'}
                  {tab.id === 'rules' && 'Set up automated quote generation rules'}
                  {tab.id === 'workflows' && 'Configure approval workflows for quotes'}
                  {tab.id === 'emails' && 'Design email templates for quote communications'}
                  {tab.id === 'triggers' && 'Set up automated triggers for quote actions'}
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

export default TemplatesAutomationTabs;