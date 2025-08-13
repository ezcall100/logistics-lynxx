import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Activity, 
  Webhook,
  Settings,
  TestTube,
  Zap
} from 'lucide-react';

interface TestResult {
  id: string;
  test_type: string;
  status: 'success' | 'failed' | 'pending';
  message: string;
  timestamp: string;
  response_data?: unknown;
}

export const N8NWebhookTester = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [customPayload, setCustomPayload] = useState('');
  const [activeTests, setActiveTests] = useState(0);
  const { toast } = useToast();

  // Get webhook URLs
  const getWebhookUrl = (functionName: string) => {
    return `https://imcyiofodlnbomemvqto.supabase.co/functions/v1/${functionName}`;
  };

  // Test webhook endpoint
  const testWebhook = async (testType: string, payload: unknown) => {
    const testId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newTest: TestResult = {
      id: testId,
      test_type: testType,
      status: 'pending',
      message: `Testing ${testType}...`,
      timestamp: new Date().toISOString()
    };

    setTestResults(prev => [newTest, ...prev]);
    setActiveTests(prev => prev + 1);

    try {
      const response = await supabase.functions.invoke('n8n-webhook', {
        body: payload
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      setTestResults(prev => prev.map(test => 
        test.id === testId ? {
          ...test,
          status: 'success',
          message: `${testType} test completed successfully`,
          response_data: response.data
        } : test
      ));

      return { success: true, data: response.data };
    } catch (error) {
      setTestResults(prev => prev.map(test => 
        test.id === testId ? {
          ...test,
          status: 'failed',
          message: `${testType} test failed: ${error.message}`
        } : test
      ));

      return { success: false, error: error.message };
    } finally {
      setActiveTests(prev => prev - 1);
    }
  };

  // Run comprehensive webhook tests
  const runComprehensiveTests = async () => {
    setIsTestRunning(true);
    setTestResults([]);

    try {
      // Test 1: Connection Test
      await testWebhook('Connection Test', {
        task_type: 'test_connection',
        workflow_id: 'test_workflow_001',
        execution_id: 'test_exec_001',
        timestamp: new Date().toISOString()
      });

      // Test 2: Autonomous Task Creation
      await testWebhook('Autonomous Task Creation', {
        task_type: 'autonomous_task',
        agent_type: 'testing',
        task_name: 'N8N Test Task - Autonomous Processing',
        description: 'Test task created by N8N webhook integration test',
        priority: 8,
        portal: 'admin',
        workflow_id: 'test_workflow_002',
        execution_id: 'test_exec_002'
      });

      // Test 3: System Health Check
      await testWebhook('System Health Check', {
        task_type: 'system_health_check',
        workflow_id: 'test_workflow_003',
        execution_id: 'test_exec_003',
        check_components: ['database', 'agents', 'tasks']
      });

      // Test 4: Performance Alert
      await testWebhook('Performance Alert', {
        task_type: 'performance_alert',
        alert_type: 'high_cpu_usage',
        severity: 'medium',
        description: 'Test performance alert from N8N monitoring',
        workflow_id: 'test_workflow_004',
        execution_id: 'test_exec_004',
        metrics: {
          cpu_usage: 85,
          memory_usage: 72,
          active_connections: 150
        }
      });

      // Test 5: Agent Deployment
      await testWebhook('Agent Deployment', {
        task_type: 'agent_deployment',
        workflow_id: 'test_workflow_005',
        execution_id: 'test_exec_005',
        agent_config: {
          name: 'N8N Test Agent',
          confidence_threshold: 0.8,
          auto_execute_threshold: 0.9,
          openai_enabled: true,
          query_frequency_minutes: 25
        }
      });

      // Test 6: Task Completion
      await testWebhook('Task Completion', {
        task_type: 'task_completion',
        task_id: 'test_task_001',
        success: true,
        workflow_id: 'test_workflow_006',
        execution_id: 'test_exec_006',
        result: {
          duration: 120,
          output: 'Test task completed successfully',
          performance_metrics: {
            cpu_time: 0.5,
            memory_peak: 128
          }
        }
      });

      toast({
        title: "✅ Webhook Tests Completed",
        description: "All N8N webhook tests have been executed. Check results below.",
        duration: 5000,
      });

    } catch (error) {
      toast({
        title: "❌ Test Suite Failed",
        description: `Error during webhook testing: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsTestRunning(false);
    }
  };

  // Test N8N integration endpoint
  const testN8NIntegration = async () => {
    try {
      const response = await supabase.functions.invoke('n8n-integration', {
        body: {
          action: 'test_n8n_connection',
          data: {
            test_timestamp: new Date().toISOString(),
            source: 'webhook_tester'
          }
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast({
        title: "🔗 N8N Integration Test Successful",
        description: "N8N integration endpoint is working correctly",
      });

      return response.data;
    } catch (error) {
      toast({
        title: "❌ N8N Integration Test Failed",
        description: `Integration test failed: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  // Send custom webhook payload
  const sendCustomPayload = async () => {
    if (!customPayload) {
      toast({
        title: "❌ Empty Payload",
        description: "Please enter a JSON payload to test",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = JSON.parse(customPayload);
      const result = await testWebhook('Custom Payload', payload);

      if (result.success) {
        toast({
          title: "✅ Custom Payload Sent",
          description: "Custom webhook payload processed successfully",
        });
      }
    } catch (error) {
      toast({
        title: "❌ Invalid JSON",
        description: "Please enter valid JSON payload",
        variant: "destructive",
      });
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Activity className="h-4 w-4" />;
      default: return <TestTube className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid gap-4">
      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5 text-blue-500" />
            N8N Webhook Testing Suite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>N8N Webhook URL</Label>
                <Input 
                  value={getWebhookUrl('n8n-webhook')}
                  readOnly
                  className="font-mono text-sm"
                />
              </div>
              <div>
                <Label>N8N Integration URL</Label>
                <Input 
                  value={getWebhookUrl('n8n-integration')}
                  readOnly
                  className="font-mono text-sm"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={runComprehensiveTests}
                disabled={isTestRunning}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {isTestRunning ? 'Running Tests...' : 'Run All Tests'}
              </Button>
              
              <Button 
                onClick={testN8NIntegration}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Test Integration
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Custom Payload Test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Custom Webhook Payload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>JSON Payload</Label>
              <Textarea 
                value={customPayload}
                onChange={(e) => setCustomPayload(e.target.value)}
                placeholder='{"task_type": "autonomous_task", "agent_type": "testing", "task_name": "Custom Test Task"}'
                rows={4}
                className="font-mono text-sm"
              />
            </div>
            <Button 
              onClick={sendCustomPayload}
              disabled={!customPayload}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Send Custom Payload
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-500" />
            Test Results
            {activeTests > 0 && (
              <Badge variant="secondary">
                {activeTests} Running
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No tests run yet. Click "Run All Tests" to start testing.
              </p>
            ) : (
              testResults.map((result) => (
                <div 
                  key={result.id}
                  className="flex items-center justify-between p-3 bg-muted rounded"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <div className="font-medium">{result.test_type}</div>
                      <div className="text-sm text-muted-foreground">{result.message}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(result.status)} text-white`}>
                    {result.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};