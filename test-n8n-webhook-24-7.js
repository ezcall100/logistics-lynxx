#!/usr/bin/env node

/**
 * 24/7 n8n Webhook Test Script
 * Tests autonomous agent webhook functionality
 */

import crypto from 'crypto';
import https from 'https';

// Configuration
const WEBHOOK_URL = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || 'your-secret-key-here';

// Test payload for autonomous agent
const testPayload = {
  event: 'autonomous_agent',
  status: 'success',
  repo: 'New-TMS-software',
  sha: 'test-sha-123',
  ref: 'main',
  run_id: 'test-run-456',
  run_attempt: '1',
  environment: 'production',
  app_url: 'https://your-app.com',
  should_deploy: 'true',
  target_environment: 'production',
  timestamp: new Date().toISOString(),
  agent_type: 'autonomous',
  agent_id: 'agent-001',
  task: 'deployment_automation'
};

function signPayload(payload, secret) {
  const canonical = JSON.stringify(payload);
  return crypto.createHmac('sha256', secret).update(canonical).digest('base64');
}

function makeRequest(url, payload, signature) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Signature-256': `sha256=${signature}`,
        'X-Idempotency-Key': `test-${Date.now()}`,
        'User-Agent': 'TMS-Autonomous-Agent/1.0'
      }
    };

    const req = https.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseData
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function testWebhook() {
  console.log('🚀 Testing 24/7 n8n Webhook for Autonomous Agents...\n');
  
  try {
    // Sign the payload
    const signature = signPayload(testPayload, WEBHOOK_SECRET);
    
    console.log('📤 Sending test payload:');
    console.log(JSON.stringify(testPayload, null, 2));
    console.log('\n🔐 Signature:', signature);
    
    // Make the request
    const response = await makeRequest(WEBHOOK_URL, testPayload, signature);
    
    console.log('\n📥 Response:');
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers, null, 2));
    console.log('Body:', response.body);
    
    if (response.statusCode === 200) {
      console.log('\n✅ Webhook is running 24/7 and responding correctly!');
      console.log('🤖 Autonomous agents can now communicate with n8n');
    } else {
      console.log('\n⚠️ Webhook responded but with unexpected status code');
    }
    
  } catch (error) {
    console.error('\n❌ Webhook test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if n8n workflow is ACTIVE');
    console.log('2. Verify N8N_WEBHOOK_SECRET is set correctly');
    console.log('3. Ensure webhook URL is accessible');
    console.log('4. Check n8n logs for errors');
  }
}

// Run the test
testWebhook();
