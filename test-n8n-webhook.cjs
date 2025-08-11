// Test script for n8n webhook
const https = require('https');
const http = require('http');

async function testN8NWebhook() {
  console.log('🧪 Testing N8N Webhook URL...\n');
  
  const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
  
  console.log('🔗 Testing URL:', webhookUrl);
  
  try {
    // Test with a simple GET request first
    const testData = {
      task_type: 'system_health_check',
      agent_type: 'test_agent',
      task_name: 'N8N Webhook Test',
      description: 'Testing n8n webhook connectivity',
      priority: 5,
      workflow_id: 'test_workflow',
      execution_id: 'test_execution_' + Date.now()
    };

    const postData = JSON.stringify(testData);
    
    const url = new URL(webhookUrl);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Autonomous-TMS-Test/1.0'
      }
    };

    const protocol = url.protocol === 'https:' ? https : http;
    
    const req = protocol.request(options, (res) => {
      console.log('📡 Response Status:', res.statusCode);
      console.log('📡 Response Headers:', res.headers);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('📡 Response Body:', data);
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ N8N webhook is working!');
        } else {
          console.log('❌ N8N webhook returned error status');
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Request failed:', error.message);
      console.log('\n💡 Possible issues:');
      console.log('   - N8N instance is not running');
      console.log('   - Webhook URL is incorrect');
      console.log('   - Network connectivity issues');
      console.log('   - SSL/TLS certificate problems');
    });

    req.write(postData);
    req.end();
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Also test the local Supabase webhook
async function testLocalWebhook() {
  console.log('\n🧪 Testing Local Supabase Webhook...\n');
  
  const localWebhookUrl = 'http://127.0.0.1:54321/functions/v1/n8n-webhook';
  
  console.log('🔗 Testing Local URL:', localWebhookUrl);
  
  try {
    const testData = {
      task_type: 'system_health_check',
      agent_type: 'test_agent',
      task_name: 'Local Webhook Test',
      description: 'Testing local Supabase webhook',
      priority: 5
    };

    const postData = JSON.stringify(testData);
    
    const options = {
      hostname: '127.0.0.1',
      port: 54321,
      path: '/functions/v1/n8n-webhook',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
      }
    };

    const req = http.request(options, (res) => {
      console.log('📡 Local Response Status:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('📡 Local Response Body:', data);
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ Local webhook is working!');
        } else {
          console.log('❌ Local webhook returned error status');
        }
      });
    });

    req.on('error', (error) => {
      console.log('❌ Local request failed:', error.message);
      console.log('\n💡 Make sure Supabase is running locally:');
      console.log('   npx supabase start');
    });

    req.write(postData);
    req.end();
    
  } catch (error) {
    console.log('❌ Local test failed:', error.message);
  }
}

// Run both tests
async function runTests() {
  await testN8NWebhook();
  await testLocalWebhook();
  
  console.log('\n📋 Summary:');
  console.log('   - If N8N webhook fails: Check n8n instance and webhook URL');
  console.log('   - If local webhook fails: Start Supabase with "npx supabase start"');
  console.log('   - Both should work for full autonomous system operation');
}

runTests();
