// Browser-compatible N8N Webhook Test
// Copy and paste this into your browser console to test the n8n webhook

async function testN8NWebhook() {
  console.log('🧪 Testing N8N Webhook from Browser...');
  
  const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/';
  console.log('URL:', webhookUrl);
  
  const testPayload = {
    test: true,
    message: 'Browser N8N webhook test',
    timestamp: new Date().toISOString(),
    source: 'browser_test',
    test_id: `browser_${Date.now()}`,
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  try {
    console.log('📦 Sending payload:', testPayload);
    
    const startTime = Date.now();
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TransBot-AI-Browser-Test/1.0'
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
    console.log(`Response:`, responseData);

    if (response.ok) {
      console.log('\n✅ SUCCESS: N8N webhook is working from browser!');
      console.log('🎉 Ready for integration use.');
      return { success: true, responseTime, status: response.status };
    } else {
      console.log('\n❌ FAILED: N8N webhook is not responding correctly.');
      return { success: false, responseTime, status: response.status, error: responseData };
    }

  } catch (error) {
    console.log('\n💥 ERROR:', error.message);
    console.log('❌ N8N webhook is not accessible from browser.');
    return { success: false, error: error.message };
  }
}

// Run the test and return results
const result = await testN8NWebhook();
console.log('\n🏁 Test completed. Result:', result);

// Return result for further use
result;
