require('dotenv').config();
const https = require('https');

console.log('🔄 Testing Working N8N Webhook Endpoints...\n');

// Test different N8N webhook URLs
const webhookUrls = [
  'https://pixx100.app.n8n.cloud/webhook-test/',
  'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
  'https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook'
];

const testPayload = {
  test: true,
  message: 'System status check',
  timestamp: new Date().toISOString(),
  source: 'system_status_check',
  trigger_type: 'autonomous_task',
  task_type: 'webhook_test',
  goal: 'Test webhook connectivity',
  action: 'Webhook test executed',
  confidence: 0.95,
  success: true
};

async function testWebhook(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'System-Status-Check/1.0'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          data: data,
          success: res.statusCode === 200 || res.statusCode === 204
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        data: err.message,
        success: false
      });
    });

    req.on('timeout', () => {
      resolve({
        url,
        status: 'TIMEOUT',
        data: 'Request timeout',
        success: false
      });
    });

    req.write(JSON.stringify(testPayload));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing N8N Webhook Endpoints...\n');
  
  for (const url of webhookUrls) {
    console.log(`📡 Testing: ${url}`);
    const result = await testWebhook(url);
    
    if (result.success) {
      console.log(`✅ SUCCESS - Status: ${result.status}`);
    } else {
      console.log(`❌ FAILED - Status: ${result.status}`);
      if (result.data) {
        console.log(`   Error: ${result.data.substring(0, 100)}...`);
      }
    }
    console.log('');
  }

  // Test a simple webhook service
  console.log('🌐 Testing webhook.site (should always work)...');
  const webhookSiteResult = await testWebhook('https://webhook.site/your-unique-url');
  console.log(`Webhook.site result: ${webhookSiteResult.success ? '✅' : '❌'} ${webhookSiteResult.status}`);
}

runTests().catch(console.error);
