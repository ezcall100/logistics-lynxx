// Comprehensive N8N Webhook Fix Script
const webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';

async function fixN8NWebhook() {
  console.log('🔧 N8N Webhook Fix & Diagnostic Tool');
  console.log('='.repeat(60));
  console.log('URL:', webhookUrl);
  console.log('='.repeat(60));

  // Test 1: Check if n8n instance is accessible
  console.log('\n🔍 Step 1: Checking N8N Instance Accessibility...');
  try {
    const response = await fetch('https://pixx100.app.n8n.cloud/', {
      method: 'GET',
      headers: {
        'User-Agent': 'TransBot-AI-Diagnostic/1.0'
      }
    });
    console.log(`✅ N8N Instance Status: ${response.status} ${response.statusText}`);
    console.log('✅ N8N instance is accessible');
  } catch (error) {
    console.log(`❌ N8N Instance Error: ${error.message}`);
    console.log('💡 Solution: Check if N8N instance is running');
    return;
  }

  // Test 2: Try different webhook endpoints
  console.log('\n🔍 Step 2: Testing Webhook Endpoints...');
  const webhookVariants = [
    'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
    'https://pixx100.app.n8n.cloud/webhook/cursor-webhook',
    'https://pixx100.app.n8n.cloud/webhook-test/',
    'https://pixx100.app.n8n.cloud/webhook/'
  ];

  for (const url of webhookVariants) {
    console.log(`\n📡 Testing: ${url}`);
    try {
      const startTime = Date.now();
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TransBot-AI-Diagnostic/1.0'
        },
        body: JSON.stringify({
          test: true,
          message: 'Diagnostic test',
          timestamp: new Date().toISOString()
        })
      });

      const responseTime = Date.now() - startTime;
      let responseData;
      
      try {
        responseData = await response.json();
      } catch {
        responseData = { raw: await response.text() };
      }

      console.log(`   Status: ${response.status} ${response.statusText}`);
      console.log(`   Response Time: ${responseTime}ms`);
      
      if (response.ok) {
        console.log(`   ✅ WORKING! Response:`, JSON.stringify(responseData, null, 2));
        console.log(`   🎉 Found working webhook URL: ${url}`);
        return { success: true, workingUrl: url, response: responseData };
      } else {
        console.log(`   ❌ Failed:`, JSON.stringify(responseData, null, 2));
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
  }

  // Test 3: Provide activation instructions
  console.log('\n🔍 Step 3: Providing Activation Instructions...');
  console.log('❌ All webhook endpoints are not working');
  console.log('\n💡 SOLUTIONS TO TRY:');
  console.log('='.repeat(60));
  
  console.log('\n1️⃣ ACTIVATE WEBHOOK IN N8N:');
  console.log('   → Open: https://pixx100.app.n8n.cloud/');
  console.log('   → Find workflow named "cursor-webhook"');
  console.log('   → Click "Execute workflow" button');
  console.log('   → Wait for activation');
  console.log('   → Test again');

  console.log('\n2️⃣ CREATE NEW WEBHOOK:');
  console.log('   → In N8N, create a new workflow');
  console.log('   → Add a "Webhook" trigger node');
  console.log('   → Set HTTP method to POST');
  console.log('   → Copy the new webhook URL');
  console.log('   → Update the URL in your configuration');

  console.log('\n3️⃣ CHECK WORKFLOW DEPLOYMENT:');
  console.log('   → Ensure workflow is deployed (not in draft)');
  console.log('   → Check if workflow is active');
  console.log('   → Verify webhook node is properly configured');

  console.log('\n4️⃣ ALTERNATIVE TEST:');
  console.log('   → Try accessing N8N API directly');
  console.log('   → Check workflow execution history');
  console.log('   → Verify authentication if required');

  // Test 4: Create a simple test workflow suggestion
  console.log('\n🔍 Step 4: Suggested Test Workflow...');
  console.log('Create this simple workflow in N8N:');
  console.log(`
┌─────────────────┐
│   Webhook       │ ← Trigger
│   (POST)        │
└─────────┬───────┘
          │
┌─────────▼───────┐
│   Set           │ ← Set response
│   (JSON)        │
└─────────┬───────┘
          │
┌─────────▼───────┐
│   Respond       │ ← Return response
│   to Webhook    │
└─────────────────┘
  `);

  console.log('\n📋 RESPONSE CONFIGURATION:');
  console.log('Set Node:');
  console.log('  {');
  console.log('    "success": true,');
  console.log('    "message": "Webhook working!",');
  console.log('    "timestamp": "={{$now}}",');
  console.log('    "received_data": "={{$json}}"');
  console.log('  }');

  return { success: false, message: 'Webhook needs activation in N8N interface' };
}

// Run the fix
fixN8NWebhook().then(result => {
  console.log('\n' + '='.repeat(60));
  console.log('🏁 DIAGNOSTIC COMPLETE');
  console.log('='.repeat(60));
  
  if (result.success) {
    console.log('✅ ISSUE RESOLVED!');
    console.log(`Working URL: ${result.workingUrl}`);
  } else {
    console.log('⚠️  MANUAL INTERVENTION REQUIRED');
    console.log('Follow the instructions above to activate the webhook');
  }
}).catch(console.error);
