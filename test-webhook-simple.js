#!/usr/bin/env node

/**
 * Simple Webhook Test (No Authentication)
 * This tests if your n8n webhook is accessible
 */

import https from 'https';

// Configuration
const WEBHOOK_URL = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';

// Simple test payload
const payload = {
  timestamp: new Date().toISOString(),
  source: 'TMS-Test',
  action: 'test-webhook',
  message: 'Testing webhook connectivity from TMS system',
  status: 'active',
  system: 'logistics-lynx',
  version: '1.0.0'
};

function testWebhookSimple() {
  console.log('🚀 Simple Webhook Test (No Authentication)');
  console.log('==========================================');
  console.log();
  
  console.log('📋 Configuration:');
  console.log(`   URL: ${WEBHOOK_URL}`);
  console.log('   Authentication: None (for testing)');
  console.log();
  
  const payloadString = JSON.stringify(payload);
  
  console.log('📦 Payload:');
  console.log(JSON.stringify(payload, null, 2));
  console.log();
  
  const url = new URL(WEBHOOK_URL);
  const postData = payloadString;
  
  const options = {
    hostname: url.hostname,
    port: url.port || 443,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'TMS-Test/1.0'
    },
    timeout: 10000
  };
  
  console.log('📤 Sending request...');
  console.log(`   Method: ${options.method}`);
  console.log(`   Host: ${options.hostname}`);
  console.log(`   Path: ${options.path}`);
  console.log();
  
  const req = https.request(options, (res) => {
    console.log(`✅ Response received:`);
    console.log(`   Status: ${res.statusCode} ${res.statusMessage}`);
    console.log(`   Headers:`, res.headers);
    
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
        console.log('   Your n8n webhook is accessible and responding.');
        console.log('   Next step: Configure GitHub Actions secrets.');
      } else {
        console.log('\n⚠️  Webhook test completed with non-success status');
        console.log('   Check your n8n workflow configuration.');
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('\n❌ Error testing webhook:');
    console.error('   Error details:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.error('   DNS resolution failed - check the URL');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   Connection refused - webhook might be down');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('   Request timed out');
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
testWebhookSimple();
