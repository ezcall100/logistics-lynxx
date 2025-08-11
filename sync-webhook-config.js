#!/usr/bin/env node

/**
 * Webhook Sync Configuration Script
 * This script helps sync your n8n webhook with GitHub Actions
 */

import crypto from 'crypto';

// Configuration
const WEBHOOK_URL = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
const WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || 'your-secret-key-here';

console.log('🔧 Webhook Sync Configuration');
console.log('============================');
console.log();

// 1. Display current configuration
console.log('📋 Current Configuration:');
console.log(`   Webhook URL: ${WEBHOOK_URL}`);
console.log(`   Webhook Secret: ${WEBHOOK_SECRET ? '***configured***' : '❌ NOT SET'}`);
console.log();

// 2. GitHub Actions configuration
console.log('🚀 GitHub Actions Setup Required:');
console.log('   1. Go to your GitHub repository');
console.log('   2. Navigate to Settings → Secrets and variables → Actions');
console.log('   3. Add these repository secrets:');
console.log();
console.log(`   N8N_WEBHOOK_URL = ${WEBHOOK_URL}`);
console.log(`   N8N_WEBHOOK_SECRET = ${WEBHOOK_SECRET}`);
console.log();

// 3. Test the webhook with GitHub Actions format
console.log('🧪 Testing webhook with GitHub Actions format...');

const githubPayload = {
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

const payloadString = JSON.stringify(githubPayload);
const signature = crypto.createHmac('sha256', WEBHOOK_SECRET).update(payloadString).digest('base64');

console.log('📦 GitHub Actions Payload:');
console.log(JSON.stringify(githubPayload, null, 2));
console.log();
console.log(`🔐 Signature: sha256=${signature}`);
console.log();

// 4. Generate curl command for testing
console.log('🔗 Test Command (copy and run):');
console.log(`curl -X POST "${WEBHOOK_URL}" \\`);
console.log(`  -H "Content-Type: application/json" \\`);
console.log(`  -H "X-Signature-256: sha256=${signature}" \\`);
console.log(`  -H "X-Idempotency-Key: test-${Date.now()}" \\`);
console.log(`  -d '${payloadString}'`);
console.log();

// 5. Environment setup instructions
console.log('⚙️  Environment Setup:');
console.log('   For local testing, set these environment variables:');
console.log(`   export N8N_WEBHOOK_URL="${WEBHOOK_URL}"`);
console.log(`   export N8N_WEBHOOK_SECRET="${WEBHOOK_SECRET}"`);
console.log();

// 6. Next steps
console.log('📋 Next Steps:');
console.log('   1. ✅ Configure GitHub repository secrets');
console.log('   2. ✅ Test webhook with curl command above');
console.log('   3. ✅ Push a commit to trigger GitHub Actions');
console.log('   4. ✅ Check n8n workflow for incoming webhooks');
console.log('   5. ✅ Verify Slack notifications (if configured)');
console.log();

console.log('🎯 Expected Results:');
console.log('   • GitHub Actions will send webhooks to n8n');
console.log('   • n8n will verify HMAC signature');
console.log('   • n8n will send Slack notifications');
console.log('   • You\'ll see deployment status in Slack');
console.log();

if (!WEBHOOK_SECRET || WEBHOOK_SECRET === 'your-secret-key-here') {
  console.log('⚠️  WARNING: N8N_WEBHOOK_SECRET not configured!');
  console.log('   Please set the environment variable or update the script.');
  console.log();
}
