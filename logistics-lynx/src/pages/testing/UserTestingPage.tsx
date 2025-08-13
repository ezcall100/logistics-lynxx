
import React from 'react';
import Layout from '@/components/layout/Layout';
import { UserTestingPanel } from '@/components/testing/UserTestingPanel';
import { PerformanceMonitoringDashboard } from '@/components/analytics/PerformanceMonitoringDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, BarChart3, Info } from 'lucide-react';
import { N8NWebhookTester } from '@/components/testing/N8NWebhookTester';
import { useAuth } from '@/context/AuthContext';

const UserTestingPage = () => {
  const { user, isAuthenticated } = useAuth();

  // Debug authentication state
  console.log('UserTestingPage - Authentication state:', { user, isAuthenticated });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Authentication Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please log in to access the User Testing page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">User Testing & Integration</h1>
          <p className="text-muted-foreground">
            Test platform functionality and external integrations
          </p>
          {user && (
            <p className="text-sm text-green-600 mt-2">
              ✅ Authenticated as: {user.email} ({user.role})
            </p>
          )}
        </div>

        <Tabs defaultValue="user-testing" className="space-y-6">
          <TabsList>
            <TabsTrigger value="user-testing">User Testing</TabsTrigger>
            <TabsTrigger value="n8n-integration">N8N Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="user-testing">
            <UserTestingPanel />
          </TabsContent>

          <TabsContent value="n8n-integration">
            <N8NWebhookTester />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UserTestingPage;
