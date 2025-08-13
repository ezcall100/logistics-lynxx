const https = require('https');

console.log('🧪 Testing Edge Functions...\n');

// Test configuration
const config = {
  local: {
    baseUrl: 'http://localhost:54321',
    endpoint: '/functions/v1'
  },
  production: {
    baseUrl: process.env.SUPABASE_URL || 'https://your-project.supabase.co',
    endpoint: '/functions/v1',
    anonKey: process.env.SUPABASE_ANON_KEY || 'your-anon-key'
  }
};

// Test functions
const testFunctions = [
  {
    name: 'autonomous-ai',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      action: "introspect"
    }
  },
  {
    name: 'coding-assistant',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      prompt: "Write a simple hello world function",
      codeType: "javascript"
    }
  }
];

// Helper function to make HTTP requests
function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : require('http');
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };
    
    if (data) {
      const postData = JSON.stringify(data);
      requestOptions.headers['Content-Length'] = Buffer.byteLength(postData);
    }
    
    const req = client.request(requestOptions, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: parsed
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test local Supabase
async function testLocalSupabase() {
  console.log('🏠 Testing Local Supabase...');
  
  try {
    // Test each function
    for (const func of testFunctions) {
      console.log(`\n🧪 Testing ${func.name}...`);
      
      try {
        const response = await makeRequest(
          `${config.local.baseUrl}${config.local.endpoint}/${func.name}`,
          {
            method: func.method,
            headers: func.headers
          },
          func.body
        );
        
        console.log(`   Status: ${response.status}`);
        
        if (response.status === 200) {
          console.log('   ✅ Function is working!');
          if (response.data.success !== undefined) {
            console.log(`   Success: ${response.data.success}`);
          }
          if (response.data.mock !== undefined) {
            console.log(`   Mock mode: ${response.data.mock}`);
          }
        } else {
          console.log('   ❌ Function error:');
          console.log('   ', response.data);
        }
        
      } catch (error) {
        console.log(`   ❌ Error testing ${func.name}:`);
        console.log('   ', error.message);
      }
    }
    
  } catch (error) {
    console.log('❌ Local Supabase not running or not accessible');
    console.log('💡 Start Supabase with: npx supabase start');
    console.log('💡 Then serve functions with: npx supabase functions serve');
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
}

// Test production Supabase (if configured)
async function testProductionSupabase() {
  console.log('🌐 Testing Production Supabase...');
  
  if (config.production.anonKey === 'your-anon-key') {
    console.log('⚠️  Production not configured');
    console.log('💡 Set SUPABASE_URL and SUPABASE_ANON_KEY environment variables');
    return;
  }
  
  try {
    // Test each function
    for (const func of testFunctions) {
      console.log(`\n🧪 Testing ${func.name}...`);
      
      try {
        const response = await makeRequest(
          `${config.production.baseUrl}${config.production.endpoint}/${func.name}`,
          {
            method: func.method,
            headers: {
              ...func.headers,
              'Authorization': `Bearer ${config.production.anonKey}`
            }
          },
          func.body
        );
        
        console.log(`   Status: ${response.status}`);
        
        if (response.status === 200) {
          console.log('   ✅ Function is working!');
          if (response.data.success !== undefined) {
            console.log(`   Success: ${response.data.success}`);
          }
          if (response.data.mock !== undefined) {
            console.log(`   Mock mode: ${response.data.mock}`);
          }
        } else {
          console.log('   ❌ Function error:');
          console.log('   ', response.data);
        }
        
      } catch (error) {
        console.log(`   ❌ Error testing ${func.name}:`);
        console.log('   ', error.message);
      }
    }
    
  } catch (error) {
    console.log('❌ Production Supabase error:');
    console.log(error.message);
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting Edge Function Tests...\n');
  
  await testLocalSupabase();
  await testProductionSupabase();
  
  console.log('📊 Test Summary:');
  console.log('   - Local tests check if Supabase is running locally');
  console.log('   - Production tests check deployed functions');
  console.log('   - Mock mode indicates OpenAI API key not set');
  console.log('   - Success: true indicates function executed successfully');
  
  console.log('\n💡 Next Steps:');
  console.log('   1. Set up environment variables in .env file');
  console.log('   2. Deploy functions: npx supabase functions deploy');
  console.log('   3. Test locally: npx supabase functions serve');
  console.log('   4. Check logs: npx supabase functions logs');
}

// Run the tests
runTests().catch(console.error);
