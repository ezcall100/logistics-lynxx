#!/usr/bin/env node

/**
 * 24/7 n8n Webhook Monitor
 * Continuously monitors webhook availability for autonomous agents
 */

import crypto from 'crypto';
import https from 'https';

// Configuration
const WEBHOOK_URL = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || 'your-secret-key-here';
const CHECK_INTERVAL = 5 * 60 * 1000; // Check every 5 minutes
const MAX_RETRIES = 3;

// Health check payload
const healthPayload = {
  event: 'health_check',
  status: 'monitoring',
  timestamp: new Date().toISOString(),
  monitor_id: '24-7-monitor',
  agent_type: 'autonomous_monitor'
};

function signPayload(payload, secret) {
  const canonical = JSON.stringify(payload);
  return crypto.createHmac('sha256', secret).update(canonical).digest('base64');
}

function makeHealthCheck(url, payload, signature) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Signature-256': `sha256=${signature}`,
        'X-Idempotency-Key': `health-${Date.now()}`,
        'User-Agent': 'TMS-24-7-Monitor/1.0'
      },
      timeout: 10000 // 10 second timeout
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
          body: responseData,
          timestamp: new Date()
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(data);
    req.end();
  });
}

async function performHealthCheck() {
  const timestamp = new Date().toISOString();
  console.log(`\n🔍 [${timestamp}] Performing 24/7 webhook health check...`);
  
  try {
    const signature = signPayload(healthPayload, WEBHOOK_SECRET);
    const response = await makeHealthCheck(WEBHOOK_URL, healthPayload, signature);
    
    if (response.statusCode === 200) {
      console.log(`✅ [${timestamp}] Webhook is healthy and responding`);
      console.log(`   Status: ${response.statusCode}`);
      console.log(`   Response: ${response.body}`);
      return { success: true, timestamp, response };
    } else {
      console.log(`⚠️ [${timestamp}] Webhook responded with status ${response.statusCode}`);
      console.log(`   Response: ${response.body}`);
      return { success: false, timestamp, response, error: 'Unexpected status code' };
    }
    
  } catch (error) {
    console.log(`❌ [${timestamp}] Webhook health check failed: ${error.message}`);
    return { success: false, timestamp, error: error.message };
  }
}

async function startMonitoring() {
  console.log('🚀 Starting 24/7 n8n Webhook Monitor for Autonomous Agents');
  console.log(`📡 Monitoring URL: ${WEBHOOK_URL}`);
  console.log(`⏰ Check interval: ${CHECK_INTERVAL / 1000} seconds`);
  console.log('🔄 Monitor will run continuously...\n');
  
  let consecutiveFailures = 0;
  let totalChecks = 0;
  let successfulChecks = 0;
  
  const monitor = async () => {
    totalChecks++;
    const result = await performHealthCheck();
    
    if (result.success) {
      consecutiveFailures = 0;
      successfulChecks++;
      console.log(`📊 Stats: ${successfulChecks}/${totalChecks} successful (${((successfulChecks/totalChecks)*100).toFixed(1)}%)`);
    } else {
      consecutiveFailures++;
      console.log(`📊 Stats: ${successfulChecks}/${totalChecks} successful, ${consecutiveFailures} consecutive failures`);
      
      if (consecutiveFailures >= MAX_RETRIES) {
        console.log(`🚨 ALERT: ${consecutiveFailures} consecutive failures detected!`);
        console.log('🔧 Autonomous agents may be unable to communicate with n8n');
        console.log('📧 Consider sending alert notification');
      }
    }
    
    // Schedule next check
    setTimeout(monitor, CHECK_INTERVAL);
  };
  
  // Start the monitoring loop
  monitor();
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down 24/7 webhook monitor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down 24/7 webhook monitor...');
  process.exit(0);
});

// Start monitoring
startMonitoring();
