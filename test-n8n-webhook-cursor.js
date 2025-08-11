const https = require('https');
const http = require('http');

// Test webhook URL
const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';

// Test data
const testData = {
  timestamp: new Date().toISOString(),
  source: 'TMS-Autonomous-System',
  action: 'test-webhook',
  data: {
    message: 'Testing n8n webhook from TMS system',
    status: 'active',
    system: 'logistics-lynx',
    version: '1.0.0'
  }
};

function testWebhook() {
  console.log('🚀 Testing n8n webhook...');
  console.log('📡 URL:', webhookUrl);
  console.log('📦 Data:', JSON.stringify(testData, null, 2));
  
  const url = new URL(webhookUrl);
  const isHttps = url.protocol === 'https:';
  const client = isHttps ? https : http;
  
  const postData = JSON.stringify(testData);
  
  const options = {
    hostname: url.hostname,
    port: url.port || (isHttps ? 443 : 80),
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'TMS-Autonomous-System/1.0.0'
    },
    timeout: 10000 // 10 seconds timeout
  };
  
  console.log('\n📤 Sending request...');
  
  const req = client.request(options, (res) => {
    console.log(`\n✅ Response received:`);
    console.log(`📊 Status: ${res.statusCode} ${res.statusMessage}`);
    console.log(`🔗 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`\n📄 Response body:`);
      try {
        const jsonResponse = JSON.parse(data);
        console.log(JSON.stringify(jsonResponse, null, 2));
      } catch (e) {
        console.log(data);
      }
      
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('\n🎉 Webhook test SUCCESSFUL!');
      } else {
        console.log('\n⚠️  Webhook test completed with non-success status');
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('\n❌ Error testing webhook:');
    console.error('🔍 Error details:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.error('🌐 DNS resolution failed - check the URL');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('🚫 Connection refused - webhook might be down');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('⏰ Request timed out');
    }
  });
  
  req.on('timeout', () => {
    console.error('\n⏰ Request timed out after 10 seconds');
    req.destroy();
  });
  
  req.write(postData);
  req.end();
  
  console.log('⏳ Waiting for response...\n');
}

// Run the test
testWebhook();
