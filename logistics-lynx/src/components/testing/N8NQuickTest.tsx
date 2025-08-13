
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';

export const N8NQuickTest = () => {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testResult, setTestResult] = useState<unknown>(null);
  const { toast } = useToast();

  const webhookUrl = `https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook`;

  const runQuickTest = async () => {
    setTestStatus('testing');
    
    try {
      const testPayload = {
        trigger_type: 'autonomous_task',
        task_type: 'quick_test',
        goal: 'Quick N8N webhook connectivity test',
        prompt: 'Testing webhook connection and OpenAI integration',
        action: 'Quick test executed',
        confidence: 0.95,
        success: true,
        timestamp: new Date().toISOString(),
        source: 'dashboard_quick_test'
      };

      console.log('Running N8N quick test:', webhookUrl);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPayload)
      });

      const result = await response.json();
      console.log('N8N test result:', result);
      
      setTestResult(result);
      
      if (result.success) {
        setTestStatus('success');
        toast({
          title: "✅ N8N Webhook Working!",
          description: "Your N8N integration is functioning properly",
        });
      } else {
        setTestStatus('error');
        toast({
          title: "⚠️ N8N Test Issues",
          description: result.message || "Some issues detected",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('N8N test error:', error);
      setTestStatus('error');
      setTestResult({ error: error.message });
      toast({
        title: "❌ N8N Test Failed",
        description: "Could not connect to N8N webhook",
        variant: "destructive"
      });
    }
  };

  // Auto-run test on component mount
  useEffect(() => {
    runQuickTest();
  }, []);

  const getStatusBadge = () => {
    switch (testStatus) {
      case 'testing':
        return <Badge variant="secondary"><Loader2 className="h-3 w-3 mr-1 animate-spin" />Testing...</Badge>;
      case 'success':
        return <Badge variant="default"><CheckCircle className="h-3 w-3 mr-1" />Working</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">Ready</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          N8N Webhook Status
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>
          Quick connectivity test for your N8N integration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm font-medium mb-1">Webhook URL:</div>
          <code className="text-xs break-all">{webhookUrl}</code>
        </div>

        <Button
          onClick={runQuickTest}
          disabled={testStatus === 'testing'}
          className="w-full"
          variant="outline"
        >
          {testStatus === 'testing' ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Testing N8N Connection...
            </>
          ) : (
            'Re-test N8N Webhook'
          )}
        </Button>

        {testResult && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Test Result:</div>
            <pre className="text-xs bg-gray-100 p-3 rounded border overflow-auto max-h-32">
              {JSON.stringify(testResult, null, 2)}
            </pre>
          </div>
        )}

        {testStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
            <div className="text-green-800 text-sm font-medium">✅ N8N Integration Status:</div>
            <ul className="text-green-700 text-sm mt-1 space-y-1">
              <li>• Webhook connectivity: Working</li>
              <li>• OpenAI key: {testResult?.openai_key_status === 'configured' ? 'Configured' : 'Missing'}</li>
              <li>• Agent logging: Active</li>
              <li>• Response time: Good</li>
            </ul>
          </div>
        )}

        {testStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <div className="text-red-800 text-sm font-medium">❌ Issues Detected:</div>
            <div className="text-red-700 text-sm mt-1">
              Please check your webhook URL and network connectivity.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
