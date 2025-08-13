// Enhanced N8N webhook test script with better error handling
const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';

async function testN8NWebhook() {
  console.log('🧪 Enhanced N8N Webhook Testing...');
  console.log('URL:', webhookUrl);
  console.log('='.repeat(60));
  
  const testPayloads = [
    {
      name: 'Basic Connectivity Test',
      payload: {
        test: true,
        message: 'Basic N8N webhook connectivity test',
        timestamp: new Date().toISOString(),
        source: 'transbot_ai_test',
        test_id: `basic_${Date.now()}`
      }
    },
    {
      name: 'Simple Ping Test',
      payload: {
        action: 'ping',
        data: { test: true, timestamp: Date.now() },
        timestamp: new Date().toISOString()
      }
    },
    {
      name: 'Autonomous Task Test',
      payload: {
        task_type: 'autonomous_task',
        agent_type: 'test_agent',
        task_name: 'N8N Integration Test',
        description: 'Testing autonomous task creation via N8N webhook',
        priority: 5,
        workflow_id: 'test_workflow_001',
        execution_id: `exec_${Date.now()}`,
        timestamp: new Date().toISOString()
      }
    },
    {
      name: 'Health Check Test',
      payload: {
        task_type: 'system_health_check',
        check_type: 'n8n_connectivity',
        components: ['webhook', 'database', 'autonomous_agents'],
        timestamp: new Date().toISOString()
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
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TransBot-AI-Enhanced-Test/1.0'
        },
        body: JSON.stringify(test.payload)
      });

      const responseTime = Date.now() - startTime;
      totalResponseTime += responseTime;

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        responseData = { error: 'Failed to parse JSON response', raw: await response.text() };
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
        
        // Provide helpful error guidance
        if (response.status === 404) {
          console.log(`💡 Hint: Webhook needs activation in N8N interface`);
          console.log(`   → Go to: https://pixx100.app.n8n.cloud/`);
          console.log(`   → Find "cursor-webhook" workflow`);
          console.log(`   → Click "Execute workflow" to activate`);
        }
      }

    } catch (error) {
      console.log(`❌ ${test.name} ERROR:`, error.message);
      failedTests++;
      
      if (error.code === 'ENOTFOUND') {
        console.log(`💡 Hint: Check internet connection or webhook URL`);
      } else if (error.code === 'ECONNREFUSED') {
        console.log(`💡 Hint: N8N instance might be down`);
      }
    }

    // Wait between tests to avoid overwhelming the webhook
    if (test !== testPayloads[testPayloads.length - 1]) {
      console.log(`⏳ Waiting 2 seconds before next test...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful Tests: ${successfulTests}`);
  console.log(`❌ Failed Tests: ${failedTests}`);
  console.log(`📈 Success Rate: ${((successfulTests / (successfulTests + failedTests)) * 100).toFixed(1)}%`);
  console.log(`⏱️  Average Response Time: ${totalResponseTime / (successfulTests + failedTests)}ms`);
  
  if (successfulTests > 0) {
    console.log(`\n🎉 N8N Webhook is PARTIALLY WORKING!`);
    console.log(`   → Basic connectivity is established`);
    console.log(`   → Some advanced features may need activation`);
  } else if (failedTests > 0) {
    console.log(`\n⚠️  N8N Webhook needs attention:`);
    console.log(`   → All tests failed`);
    console.log(`   → Check webhook activation in N8N interface`);
    console.log(`   → Verify workflow deployment status`);
  }

  console.log('\n🏁 Enhanced N8N Webhook Testing Complete!');
}

// Run the enhanced test
testN8NWebhook().catch(console.error);
