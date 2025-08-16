import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  RefreshCw,
  ExternalLink,
  Settings,
  Activity,
  Bot,
  Database,
  Globe,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface N8NTestResult {
  success: boolean;
  message?: string;
  response_time?: number;
  status_code?: number;
  data?: unknown;
  error?: string;
}

interface N8NStatus {
  webhook_connected: boolean;
  last_test: string;
  response_time: number;
  total_tests: number;
  successful_tests: number;
  error_rate: number;
}

const N8NIntegrationPanel = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<N8NTestResult[]>([]);
  const [status, setStatus] = useState<N8NStatus>({
    webhook_connected: false,
    last_test: '',
    response_time: 0,
    total_tests: 0,
    successful_tests: 0,
    error_rate: 0
  });
  const [webhookUrl, setWebhookUrl] = useState('https://pixx100.app.n8n.cloud/webhook-test/');
  const { toast } = useToast();

  const testWebhook = async (testType: 'basic' | 'autonomous' | 'health' = 'basic') => {
    setIsTesting(true);
    const startTime = Date.now();

    try {
      let payload: unknown = {
        timestamp: new Date().toISOString(),
        source: 'super_admin_dashboard',
        test_type: testType
      };

      // Different payloads for different test types
      switch (testType) {
        case 'autonomous':
          payload = {
            ...payload,
            task_type: 'autonomous_task',
            agent_type: 'test_agent',
            task_name: 'N8N Integration Test',
            description: 'Testing autonomous task creation via N8N webhook',
            priority: 5,
            workflow_id: 'test_workflow_001',
            execution_id: `exec_${Date.now()}`
          };
          break;
        case 'health':
          payload = {
            ...payload,
            task_type: 'system_health_check',
            check_type: 'n8n_connectivity',
            components: ['webhook', 'database', 'autonomous_agents']
          };
          break;
        default:
          payload = {
            ...payload,
            message: 'Basic N8N webhook connectivity test',
            action: 'ping',
            data: { test: true, timestamp: Date.now() }
          };
      }

      console.log(`Testing N8N webhook (${testType}):`, webhookUrl);
      console.log('Payload:', payload);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TransBot-AI-SuperAdmin/1.0'
        },
        body: JSON.stringify(payload)
      });

      const responseTime = Date.now() - startTime;
      const responseData = await response.json();

      const result: N8NTestResult = {
        success: response.ok,
        message: response.ok ? 'Webhook test successful' : 'Webhook test failed',
        response_time: responseTime,
        status_code: response.status,
        data: responseData
      };

      if (!response.ok) {
        result.error = `HTTP ${response.status}: ${response.statusText}`;
      }

      setTestResults(prev => [result, ...prev.slice(0, 4)]); // Keep last 5 results

      // Update status
      setStatus(prev => {
        const total = prev.total_tests + 1;
        const successful = prev.successful_tests + (result.success ? 1 : 0);
        return {
          webhook_connected: result.success,
          last_test: new Date().toLocaleTimeString(),
          response_time: result.response_time || 0,
          total_tests: total,
          successful_tests: successful,
          error_rate: ((total - successful) / total) * 100
        };
      });

      if (result.success) {
        toast({
          title: "✅ N8N Webhook Test Successful",
          description: `${testType} test completed in ${responseTime}ms`,
        });
      } else {
        toast({
          title: "❌ N8N Webhook Test Failed",
          description: result.error || "Connection failed",
          variant: "destructive"
        });
      }

    } catch (error) {
      const responseTime = Date.now() - startTime;
      const result: N8NTestResult = {
        success: false,
        message: 'Webhook test failed',
        response_time: responseTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      setTestResults(prev => [result, ...prev.slice(0, 4)]);

      toast({
        title: "❌ N8N Connection Error",
        description: "Could not connect to N8N webhook",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const runAllTests = async () => {
    setIsTesting(true);
    
    // Run tests in sequence
    await testWebhook('basic');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testWebhook('health');
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testWebhook('autonomous');
    
    setIsTesting(false);
  };

  // Auto-test on component mount
  useEffect(() => {
    testWebhook('basic');
  }, [testWebhook]);

  const getStatusBadge = () => {
    if (isTesting) {
      return <Badge variant="secondary"><Loader2 className="h-3 w-3 mr-1 animate-spin" />Testing</Badge>;
    }
    
    // Check if we have unknown successful tests
    if (status.total_tests > 0 && status.successful_tests > 0) {
      return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
    } else if (status.total_tests > 0) {
      return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Needs Activation</Badge>;
    } else {
      return <Badge variant="outline">Ready to Test</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">N8N Integration</h2>
            <p className="text-sm text-muted-foreground">Workflow automation and webhook testing</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Webhook Configuration
          </CardTitle>
          <CardDescription>N8N webhook endpoint configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Webhook URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md text-sm"
                placeholder="Enter N8N webhook URL"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(webhookUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="text-center">
               <div className="text-2xl font-bold text-blue-600">{status.total_tests}</div>
               <div className="text-sm text-muted-foreground">Total Tests</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-green-600">{status.successful_tests}</div>
               <div className="text-sm text-muted-foreground">Successful</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-orange-600">{status.response_time}ms</div>
               <div className="text-sm text-muted-foreground">Avg Response</div>
             </div>
             <div className="text-center">
               <div className="text-2xl font-bold text-red-600">{status.error_rate.toFixed(1)}%</div>
               <div className="text-sm text-muted-foreground">Error Rate</div>
             </div>
           </div>

           {/* Status Message */}
           {status.total_tests > 0 && status.successful_tests === 0 && (
             <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
               <div className="flex items-start gap-3">
                 <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                 <div>
                   <h4 className="text-sm font-medium text-yellow-800">N8N Webhook Needs Activation</h4>
                   <p className="text-sm text-yellow-700 mt-1">
                     Your webhook is in test mode. To activate it:
                   </p>
                   <ol className="text-sm text-yellow-700 mt-2 ml-4 list-decimal space-y-1">
                     <li>Open your N8N instance at <a href="https://pixx100.app.n8n.cloud/" target="_blank" rel="noopener noreferrer" className="underline">https://pixx100.app.n8n.cloud/</a></li>
                     <li>Find the workflow named "cursor-webhook"</li>
                     <li>Click "Execute workflow" to activate the webhook</li>
                     <li>Test again using the buttons below</li>
                   </ol>
                 </div>
               </div>
             </div>
           )}
        </CardContent>
      </Card>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Test Controls
          </CardTitle>
          <CardDescription>Run different types of N8N webhook tests</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              onClick={() => testWebhook('basic')}
              disabled={isTesting}
              variant="outline"
              className="h-20 flex flex-col gap-2"
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm">Basic Connectivity</span>
            </Button>
            
            <Button
              onClick={() => testWebhook('health')}
              disabled={isTesting}
              variant="outline"
              className="h-20 flex flex-col gap-2"
            >
              <Database className="h-5 w-5" />
              <span className="text-sm">Health Check</span>
            </Button>
            
            <Button
              onClick={() => testWebhook('autonomous')}
              disabled={isTesting}
              variant="outline"
              className="h-20 flex flex-col gap-2"
            >
              <Bot className="h-5 w-5" />
              <span className="text-sm">Autonomous Task</span>
            </Button>
          </div>

          <Button
            onClick={runAllTests}
            disabled={isTesting}
            className="w-full"
            size="lg"
          >
            {isTesting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running All Tests...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Run All Tests
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Test Results
          </CardTitle>
          <CardDescription>Latest webhook test outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No tests run yet
              </div>
            ) : (
              testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.success 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {result.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm font-medium">
                        {result.success ? 'Success' : 'Failed'}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {result.response_time}ms
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-2">
                    {result.message}
                  </div>
                  
                  {result.error && (
                    <div className="text-xs text-red-600 bg-red-100 p-2 rounded">
                      Error: {result.error}
                    </div>
                  )}
                  
                  {result.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer">
                        Response Data
                      </summary>
                      <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto max-h-20">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Webhook Connectivity</span>
              <Badge variant={status.webhook_connected ? "default" : "destructive"}>
                {status.webhook_connected ? "Connected" : "Disconnected"}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Test</span>
              <span className="text-sm text-muted-foreground">
                {status.last_test || "Never"}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Success Rate</span>
              <span className="text-sm font-medium">
                {status.total_tests > 0 
                  ? `${((status.successful_tests / status.total_tests) * 100).toFixed(1)}%`
                  : "N/A"
                }
              </span>
            </div>
            
            <Progress 
              value={status.total_tests > 0 ? (status.successful_tests / status.total_tests) * 100 : 0} 
              className="h-2" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default N8NIntegrationPanel;
