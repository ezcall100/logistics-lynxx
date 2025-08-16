/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Webhook, TestTube, CheckCircle, AlertTriangle, ExternalLink, Settings, BarChart3 } from 'lucide-react';

export const N8NWebhookTester = () => {
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [isTestingAdminDashboard, setIsTestingAdminDashboard] = useState(false);
  const [webhookResult, setWebhookResult] = useState<unknown>(null);
  const [adminDashboardResult, setAdminDashboardResult] = useState<unknown>(null);
  const [recentActivity, setRecentActivity] = useState<unknown[]>([]);
  const { toast } = useToast();

  const webhookUrl = `https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook`;

  const testWebhook = async () => {
    setIsTestingWebhook(true);
    
    try {
      const testPayload = {
        trigger_type: 'autonomous_task',
        task_type: 'webhook_test',
        goal: 'Test N8N webhook integration with updated OpenAI key',
        prompt: 'Testing webhook from Lovable project with new OpenAI configuration',
        action: 'Webhook test executed successfully',
        confidence: 0.95,
        success: true,
        timestamp: new Date().toISOString(),
        source: 'lovable_test',
        openai_key_updated: true
      };

      console.log('Testing webhook with updated OpenAI key:', webhookUrl);
      console.log('Test payload:', testPayload);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPayload)
      });

      const result = await response.json();
      console.log('Webhook test result:', result);
      
      setWebhookResult(result);
      
      if (result.success) {
        toast({
          title: "✅ Webhook Test Successful",
          description: "Your N8N webhook is working with updated OpenAI key!",
        });
        
        await fetchRecentActivity();
      } else {
        toast({
          title: "❌ Webhook Test Failed",
          description: result.message || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Webhook test error:', error);
      toast({
        title: "Error Testing Webhook",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const testAdminDashboardCreation = async () => {
    setIsTestingAdminDashboard(true);
    
    try {
      const adminDashboardPayload = {
        trigger_type: 'ui_update',
        task_type: 'admin_dashboard_creation',
        goal: 'Create comprehensive admin dashboard for TMS system',
        prompt: 'Create an advanced admin dashboard with user management, system metrics, real-time analytics, and autonomous agent controls. Include charts, tables, and management interfaces.',
        action: 'Generate admin dashboard components and pages',
        confidence: 0.90,
        success: true,
        timestamp: new Date().toISOString(),
        source: 'lovable_admin_request',
        component: 'admin_dashboard',
        changes: {
          type: 'create_dashboard',
          features: [
            'user_management_panel',
            'system_metrics_display',
            'real_time_analytics',
            'autonomous_agent_controls',
            'data_visualization_charts',
            'activity_monitoring',
            'performance_tracking'
          ]
        },
        priority: 'high'
      };

      console.log('Requesting admin dashboard creation:', adminDashboardPayload);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminDashboardPayload)
      });

      const result = await response.json();
      console.log('Admin dashboard creation result:', result);
      
      setAdminDashboardResult(result);
      
      if (result.success) {
        toast({
          title: "🎯 Admin Dashboard Request Sent",
          description: "Agents are now working on creating your admin dashboard!",
        });
        
        await fetchRecentActivity();
      } else {
        toast({
          title: "❌ Admin Dashboard Request Failed",
          description: result.message || "Failed to send admin dashboard request",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Admin dashboard request error:', error);
      toast({
        title: "Error Requesting Admin Dashboard",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsTestingAdminDashboard(false);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('agent_memory')
        .select('*')
        .in('agent_id', ['n8n-webhook', 'n8n-ui_update', 'n8n-admin_dashboard_creation'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error && data) {
        setRecentActivity(data);
      }
    } catch (error) {
      console.error('Error fetching activity:', error);
    }
  };

  React.useEffect(() => {
    fetchRecentActivity();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            N8N Webhook Integration & Admin Dashboard Creation
          </CardTitle>
          <CardDescription>
            Test your N8N workflow integration and request agents to create admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">Your Project-Specific Webhook URL:</span>
              <Badge variant="outline">Ready</Badge>
              <Badge variant="secondary">OpenAI Key Updated</Badge>
            </div>
            <code className="text-sm break-all bg-white p-2 rounded border block">
              {webhookUrl}
            </code>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <TestTube className="h-4 w-4" />
                Basic Webhook Test
              </h3>
              <Button
                onClick={testWebhook}
                disabled={isTestingWebhook}
                className="w-full flex items-center gap-2"
                variant="outline"
              >
                <TestTube className="h-4 w-4" />
                {isTestingWebhook ? 'Testing Webhook...' : 'Test Webhook Connection'}
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Admin Dashboard Creation
              </h3>
              <Button
                onClick={testAdminDashboardCreation}
                disabled={isTestingAdminDashboard}
                className="w-full flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                {isTestingAdminDashboard ? 'Requesting Dashboard...' : 'Create Admin Dashboard'}
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => window.open('https://n8n.io', '_blank')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Open N8N
            </Button>
          </div>

          {webhookResult && (
            <Card className={webhookResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  {webhookResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  Webhook Test Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-white p-3 rounded border overflow-auto max-h-40">
                  {JSON.stringify(webhookResult, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}

          {adminDashboardResult && (
            <Card className={adminDashboardResult.success ? 'border-blue-200 bg-blue-50' : 'border-red-200 bg-red-50'}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  {adminDashboardResult.success ? (
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                  Admin Dashboard Creation Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm bg-white p-3 rounded border overflow-auto max-h-40">
                  {JSON.stringify(adminDashboardResult, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {recentActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent N8N & Agent Activity</CardTitle>
            <CardDescription>
              Latest webhook activities and agent tasks from your workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{activity.goal}</div>
                    <div className="text-sm text-muted-foreground">
                      Agent: {activity.agent_id} | {new Date(activity.created_at).toLocaleString()}
                    </div>
                    {activity.action_taken && (
                      <div className="text-sm text-blue-600 mt-1">{activity.action_taken}</div>
                    )}
                  </div>
                  <Badge variant={activity.outcome === 'success' ? 'default' : 'secondary'}>
                    {activity.outcome} ({Math.round((activity.confidence || 0) * 100)}%)
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="text-blue-800">N8N Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 space-y-2">
          <div className="text-sm">
            <strong>1. In your N8N workflow:</strong> Use an HTTP Request node
          </div>
          <div className="text-sm">
            <strong>2. Method:</strong> POST
          </div>
          <div className="text-sm">
            <strong>3. URL:</strong> {webhookUrl}
          </div>
          <div className="text-sm">
            <strong>4. Headers:</strong> Content-Type: application/json
          </div>
          <div className="text-sm">
            <strong>5. Body:</strong> Include trigger_type, task_type, goal, and your data
          </div>
          <div className="text-sm font-semibold text-blue-800 mt-3">
            <strong>Admin Dashboard Trigger:</strong> Use trigger_type: "ui_update" and task_type: "admin_dashboard_creation"
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
