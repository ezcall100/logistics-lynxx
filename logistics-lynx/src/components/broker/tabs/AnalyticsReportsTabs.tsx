import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Target, TrendingUp, PieChart, Clock, Filter, FileText } from 'lucide-react';

const AnalyticsReportsTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'performance', label: 'Quote Performance', icon: Activity, path: '/broker-admin/quotes/analytics/performance' },
    { id: 'win-rate', label: 'Win Rate Analysis', icon: Target, path: '/broker-admin/quotes/analytics/win-rate' },
    { id: 'forecast', label: 'Revenue Forecast', icon: TrendingUp, path: '/broker-admin/quotes/analytics/forecast' },
    { id: 'margins', label: 'Margin Analysis', icon: PieChart, path: '/broker-admin/quotes/analytics/margins' },
    { id: 'response-time', label: 'Response Time', icon: Clock, path: '/broker-admin/quotes/analytics/response-time' },
    { id: 'funnel', label: 'Conversion Funnel', icon: Filter, path: '/broker-admin/quotes/analytics/funnel' },
    { id: 'reports', label: 'Custom Reports', icon: FileText, path: '/broker-admin/quotes/analytics/reports' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'performance';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
        <p className="text-muted-foreground">
          Analyze quote performance and generate comprehensive reports
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          {tabs.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              <span className="hidden lg:inline">{tab.label}</span>
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
                  {tab.id === 'performance' && 'Track and analyze overall quote performance metrics'}
                  {tab.id === 'win-rate' && 'Analyze quote win rates across different segments'}
                  {tab.id === 'forecast' && 'Generate revenue forecasts based on quote pipeline'}
                  {tab.id === 'margins' && 'Analyze profit margins and pricing effectiveness'}
                  {tab.id === 'response-time' && 'Monitor quote response times and efficiency'}
                  {tab.id === 'funnel' && 'Analyze the quote conversion funnel'}
                  {tab.id === 'reports' && 'Create and manage custom analytics reports'}
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

export default AnalyticsReportsTabs;