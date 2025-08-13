// Test script for N8N webhook integration
const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';

async function testN8NWebhook() {
  console.log('🧪 Testing N8N Webhook Integration...');
  console.log('URL:', webhookUrl);
  
  const testPayloads = [
    {
      name: 'Basic Test',
      payload: {
        test: true,
        message: 'Basic N8N webhook connectivity test',
        timestamp: new Date().toISOString(),
        source: 'transbot_ai_test'
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

  for (const test of testPayloads) {
    console.log(`\n📡 Running ${test.name}...`);
    
    try {
      const startTime = Date.now();
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TransBot-AI-Test/1.0'
        },
        body: JSON.stringify(test.payload)
      });

      const responseTime = Date.now() - startTime;
      const responseData = await response.json();

      console.log(`✅ ${test.name} - Status: ${response.status}`);
      console.log(`⏱️  Response Time: ${responseTime}ms`);
      console.log(`📄 Response:`, JSON.stringify(responseData, null, 2));

      if (response.ok) {
        console.log(`🎉 ${test.name} SUCCESSFUL`);
      } else {
        console.log(`❌ ${test.name} FAILED`);
      }

    } catch (error) {
      console.log(`❌ ${test.name} ERROR:`, error.message);
    }

    // Wait 1 second between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🏁 N8N Webhook Testing Complete!');
}

// Run the test
testN8NWebhook().catch(console.error);
