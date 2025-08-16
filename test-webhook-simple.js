#!/usr/bin/env node

import https from 'https';
import http from 'http';

async function testWebhook(payload, description) {
  console.log(`\n🧪 Testing: ${description}`);
  console.log('📦 Payload:', JSON.stringify(payload, null, 2));
  
  const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
  const url = new URL(webhookUrl);
  
  const postData = JSON.stringify(payload);
  
  const options = {
    hostname: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'Webhook-Test/1.0'
    }
  };

  return new Promise((resolve, reject) => {
    const protocol = url.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const result = {
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          success: res.statusCode >= 200 && res.statusCode < 300
        };
        
        console.log(`📡 Status: ${res.statusCode}`);
        console.log(`📡 Response: ${data}`);
        console.log(`✅ Result: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        
        resolve(result);
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Error: ${error.message}`);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🔍 Testing n8n Webhook with Different Payloads');
  console.log('=============================================\n');

  const tests = [
    {
      payload: { test: "payload" },
      description: "Simple test payload"
    },
    {
      payload: {
        task_type: 'system_health_check',
        agent_type: 'test_agent',
        task_name: 'N8N Webhook Test',
        description: 'Testing n8n webhook connectivity',
        priority: 5,
        workflow_id: 'test_workflow',
        execution_id: 'test_execution_' + Date.now()
      },
      description: "Full TMS task payload (from working test)"
    },
    {
      payload: {
        event: 'push',
        repository: 'test-repo',
        ref: 'refs/heads/main',
        commits: [
          {
            id: 'test-commit-id',
            message: 'Test commit for webhook diagnostic',
            timestamp: new Date().toISOString()
          }
        ],
        sender: {
          login: 'test-user'
        },
        timestamp: new Date().toISOString()
      },
      description: "GitHub push event payload"
    }
  ];

  const results = [];
  
  for (const test of tests) {
    try {
      const result = await testWebhook(test.payload, test.description);
      results.push({ ...test, result });
    } catch (error) {
      results.push({ ...test, result: { success: false, error: error.message } });
    }
  }

  console.log('\n📊 Test Summary');
  console.log('===============');
  
  results.forEach((test, index) => {
    const status = test.result.success ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${test.description}: ${test.result.success ? 'SUCCESS' : 'FAILED'}`);
  });

  const successfulTests = results.filter(r => r.result.success);
  console.log(`\n🎯 Successful tests: ${successfulTests.length}/${results.length}`);
  
  if (successfulTests.length > 0) {
    console.log('✅ Webhook is working with at least one payload format!');
  } else {
    console.log('❌ All tests failed - webhook may not be properly configured');
  }
}

runTests().catch(console.error);
