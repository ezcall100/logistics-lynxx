/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, TrendingUp, Target, Calculator, TrendingDown, Zap } from 'lucide-react';

const SmartPricingTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: 'ai-generator', label: 'AI Generator', icon: Bot, path: '/broker-admin/quotes/pricing/ai-generator' },
    { id: 'market-intel', label: 'Market Intelligence', icon: TrendingUp, path: '/broker-admin/quotes/pricing/market-intel' },
    { id: 'competitive', label: 'Competitive Analysis', icon: Target, path: '/broker-admin/quotes/pricing/competitive' },
    { id: 'calculator', label: 'Rate Calculator', icon: Calculator, path: '/broker-admin/quotes/pricing/calculator' },
    { id: 'optimizer', label: 'Margin Optimizer', icon: TrendingDown, path: '/broker-admin/quotes/pricing/optimizer' },
    { id: 'dynamic', label: 'Dynamic Pricing', icon: Zap, path: '/broker-admin/quotes/pricing/dynamic' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || 'ai-generator';

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Smart Pricing</h2>
        <p className="text-muted-foreground">
          Leverage AI and market intelligence for optimal pricing strategies
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
                  {tab.id === 'ai-generator' && 'Generate intelligent quotes using AI algorithms'}
                  {tab.id === 'market-intel' && 'Access real-time market pricing data and trends'}
                  {tab.id === 'competitive' && 'Compare your pricing against market competitors'}
                  {tab.id === 'calculator' && 'Calculate precise rates with advanced algorithms'}
                  {tab.id === 'optimizer' && 'Optimize profit margins across all quotes'}
                  {tab.id === 'dynamic' && 'Implement dynamic pricing based on market conditions'}
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

export default SmartPricingTabs;