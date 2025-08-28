// Test Supabase N8N Webhook
// Tests the Supabase Edge Function n8n webhook

const webhookUrl = 'https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook';

async function testSupabaseN8N() {
  console.log('🧪 Testing Supabase N8N Webhook');
  console.log('URL:', webhookUrl);
  console.log('='.repeat(50));

  const testPayload = {
    trigger_type: 'autonomous_task',
    task_type: 'supabase_test',
    goal: 'Test Supabase n8n webhook integration',
    prompt: 'Testing webhook connection and OpenAI integration',
    action: 'Supabase test executed',
    confidence: 0.95,
    success: true,
    metadata: {
      user_id: 'test_user_001',
      session_id: `session_${Date.now()}`,
      environment: 'test',
      version: '1.0.0'
    },
    timestamp: new Date().toISOString()
  };

  try {
    console.log('📦 Sending payload:', JSON.stringify(testPayload, null, 2));
    
    const startTime = Date.now();
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TransBot-AI-Test/1.0'
      },
      body: JSON.stringify(testPayload)
    });

    const responseTime = Date.now() - startTime;
    let responseData = null;

    try {
      responseData = await response.json();
    } catch (e) {
      responseData = { raw: '' };
    }

    console.log(`\n📊 RESULTS:`);
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Response Time: ${responseTime}ms`);
    console.log(`Response:`, JSON.stringify(responseData, null, 2));

    if (response.ok) {
      console.log('\n✅ SUCCESS: Supabase N8N webhook is working!');
      console.log('🎉 Ready for integration use.');
    } else {
      console.log('\n❌ FAILED: Supabase N8N webhook is not responding correctly.');
    }

  } catch (error) {
    console.log('\n💥 ERROR:', error.message);
    console.log('❌ Supabase N8N webhook is not accessible.');
  }
}

// Run the test
testSupabaseN8N().catch(console.error);
