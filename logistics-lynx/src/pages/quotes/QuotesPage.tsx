
import React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AllQuotesTab from '@/components/quotes/AllQuotesTab';
import NewQuoteTab from '@/components/quotes/NewQuoteTab';

const QuotesPage = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine active tab based on current route
  const getActiveTab = () => {
    if (currentPath.includes('/quotes/new')) return 'new';
    return 'all';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Autonomous Quotes</h1>
            <p className="text-muted-foreground mt-2">
              Manage and create shipping quotes with AI-powered automation
            </p>
          </div>
        </div>

        <Tabs value={getActiveTab()} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <span>All Quotes</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center gap-2">
              <span>New Quote</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <AllQuotesTab />
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <NewQuoteTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default QuotesPage;
