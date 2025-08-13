// Test script for the working N8N webhook URL
const workingWebhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/';

async function testWorkingWebhook() {
  console.log('🎉 Testing Working N8N Webhook...');
  console.log('URL:', workingWebhookUrl);
  console.log('='.repeat(60));

  const testPayloads = [
    {
      name: 'Basic Test',
      payload: {
        test: true,
        message: 'Basic webhook test',
        timestamp: new Date().toISOString(),
        source: 'transbot_ai'
      }
    },
    {
      name: 'Autonomous Task',
      payload: {
        task_type: 'autonomous_task',
        agent_type: 'test_agent',
        task_name: 'N8N Integration Test',
        description: 'Testing autonomous task creation',
        priority: 5,
        workflow_id: 'test_workflow_001',
        execution_id: `exec_${Date.now()}`,
        timestamp: new Date().toISOString()
      }
    },
    {
      name: 'Health Check',
      payload: {
        task_type: 'system_health_check',
        check_type: 'n8n_connectivity',
        components: ['webhook', 'database', 'autonomous_agents'],
        timestamp: new Date().toISOString()
      }
    },
    {
      name: 'Complex Data',
      payload: {
        user_id: 'test_user_123',
        action: 'webhook_test',
        data: {
          shipment_id: 'ship_001',
          carrier_id: 'carrier_456',
          status: 'in_transit',
          location: {
            lat: 40.7128,
            lng: -74.0060,
            city: 'New York'
          }
        },
        metadata: {
          test_run: true,
          timestamp: new Date().toISOString(),
          version: '1.0.0'
        }
      }
    }
  ];

  let successfulTests = 0;
  let failedTests = 0;
  let totalResponseTime = 0;

  for (const test of testPayloads) {
    console.log(`\n📡 Running ${test.name}...`);
    
    try {
      const startTime = Date.now();
      
      const response = await fetch(workingWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TransBot-AI-Working-Test/1.0'
        },
        body: JSON.stringify(test.payload)
      });

      const responseTime = Date.now() - startTime;
      totalResponseTime += responseTime;

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        responseData = { raw: await response.text() };
      }

      console.log(`✅ Status: ${response.status} ${response.statusText}`);
      console.log(`⏱️  Response Time: ${responseTime}ms`);
      
      if (response.ok) {
        console.log(`🎉 ${test.name} SUCCESSFUL`);
        console.log(`📄 Response:`, JSON.stringify(responseData, null, 2));
        successfulTests++;
      } else {
        console.log(`❌ ${test.name} FAILED`);
        console.log(`📄 Error Response:`, JSON.stringify(responseData, null, 2));
        failedTests++;
      }

    } catch (error) {
      console.log(`❌ ${test.name} ERROR:`, error.message);
      failedTests++;
    }

    // Wait between tests
    if (test !== testPayloads[testPayloads.length - 1]) {
      console.log(`⏳ Waiting 1 second before next test...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL TEST RESULTS');
  console.log('='.repeat(60));
  console.log(`✅ Successful Tests: ${successfulTests}`);
  console.log(`❌ Failed Tests: ${failedTests}`);
  console.log(`📈 Success Rate: ${((successfulTests / (successfulTests + failedTests)) * 100).toFixed(1)}%`);
  console.log(`⏱️  Average Response Time: ${totalResponseTime / (successfulTests + failedTests)}ms`);
  
  if (successfulTests > 0) {
    console.log(`\n🎉 N8N Webhook is WORKING!`);
    console.log(`✅ Working URL: ${workingWebhookUrl}`);
    console.log(`✅ Ready for integration with TransBot AI`);
  }

  console.log('\n🏁 Working Webhook Test Complete!');
}

// Run the test
testWorkingWebhook().catch(console.error);
