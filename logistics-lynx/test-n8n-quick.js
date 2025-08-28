// Quick N8N Webhook Test
// Tests the working webhook endpoint

const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/';

async function quickTest() {
  console.log('🧪 Quick N8N Webhook Test');
  console.log('URL:', webhookUrl);
  console.log('='.repeat(50));

  const testPayload = {
    test: true,
    message: 'Quick N8N webhook test',
    timestamp: new Date().toISOString(),
    source: 'transbot_ai_test',
    test_id: `quick_${Date.now()}`
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
      console.log('\n✅ SUCCESS: N8N webhook is working!');
      console.log('🎉 Ready for integration use.');
    } else {
      console.log('\n❌ FAILED: N8N webhook is not responding correctly.');
    }

  } catch (error) {
    console.log('\n💥 ERROR:', error.message);
    console.log('❌ N8N webhook is not accessible.');
  }
}

// Run the quick test
quickTest().catch(console.error);
