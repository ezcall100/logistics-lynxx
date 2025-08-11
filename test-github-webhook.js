#!/usr/bin/env node

/**
 * Test GitHub Actions Webhook Format
 * This script sends the exact same payload format as GitHub Actions
 */

import https from 'https';
import crypto from 'crypto';

// Configuration - MUST match your GitHub secrets
const WEBHOOK_URL = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || 'your-secret-key-here';

// GitHub Actions payload format (exact match)
const payload = {
  event: "deployment",
  status: "success",
  repo: "your-username/your-repo",
  sha: "abc123def456",
  ref: "main",
  run_id: "1234567890",
  run_attempt: "1",
  environment: "staging",
  app_url: "https://staging.example.com",
  should_deploy: "true",
  target_environment: "staging",
  timestamp: new Date().toISOString()
};

function testGitHubWebhook() {
  console.log('🚀 Testing GitHub Actions Webhook Format');
  console.log('=======================================');
  console.log();
  
  console.log('📋 Configuration:');
  console.log(`   URL: ${WEBHOOK_URL}`);
  console.log(`   Secret: ${WEBHOOK_SECRET ? '***configured***' : '❌ NOT SET'}`);
  console.log();
  
  if (!WEBHOOK_SECRET || WEBHOOK_SECRET === 'your-secret-key-here') {
    console.log('❌ ERROR: N8N_WEBHOOK_SECRET not set!');
    console.log('   Please set the environment variable:');
    console.log('   set N8N_WEBHOOK_SECRET=your-actual-secret-key');
    console.log();
    return;
  }
  
  const payloadString = JSON.stringify(payload);
  const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(payloadString).digest('base64');
  const idempotencyKey = `test-${Date.now()}`;
  
  console.log('📦 Payload:');
  console.log(JSON.stringify(payload, null, 2));
  console.log();
  console.log(`🔐 Signature: sha256=${signature}`);
  console.log(`🆔 Idempotency Key: ${idempotencyKey}`);
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
      'X-Signature-256': `sha256=${signature}`,
      'X-Idempotency-Key': idempotencyKey,
      'User-Agent': 'GitHub-Actions/1.0'
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
        console.log('\n🎉 GitHub Actions webhook test SUCCESSFUL!');
        console.log('   This means your n8n webhook is ready for GitHub Actions!');
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
testGitHubWebhook();
