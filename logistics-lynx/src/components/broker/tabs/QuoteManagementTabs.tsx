import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Clock, CheckCircle, TrendingDown, Timer, FileCheck } from 'lucide-react';

const QuoteManagementTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'active', label: 'Active Quotes', icon: Activity, path: '/broker-admin/quotes/management/active' },
    { id: 'pending', label: 'Pending Approval', icon: Clock, path: '/broker-admin/quotes/management/pending' },
    { id: 'won', label: 'Won Quotes', icon: CheckCircle, path: '/broker-admin/quotes/management/won' },
    { id: 'lost', label: 'Lost Quotes', icon: TrendingDown, path: '/broker-admin/quotes/management/lost' },
    { id: 'expired', label: 'Expired Quotes', icon: Timer, path: '/broker-admin/quotes/management/expired' },
    { id: 'drafts', label: 'Draft Quotes', icon: FileCheck, path: '/broker-admin/quotes/management/drafts' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'active';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quote Management</h2>
        <p className="text-muted-foreground">
          Manage and track all your quotes across different stages
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
                  {tab.id === 'active' && 'View and manage currently active quotes'}
                  {tab.id === 'pending' && 'Review quotes awaiting approval'}
                  {tab.id === 'won' && 'Track successful quote conversions'}
                  {tab.id === 'lost' && 'Analyze quotes that were not converted'}
                  {tab.id === 'expired' && 'Review expired quotes and follow-up opportunities'}
                  {tab.id === 'drafts' && 'Complete and manage draft quotes'}
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

export default QuoteManagementTabs;