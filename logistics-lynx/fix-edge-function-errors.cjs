const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Edge Function Errors (non-2xx status codes)...\n');

// Check edge function configurations
function checkEdgeFunctionConfigs() {
  console.log('📋 Checking Edge Function Configurations:');
  
  const edgeFunctions = [
    'autonomous-ai',
    'autonomous-intelligence',
    'coding-assistant',
    'n8n-integration',
    'n8n-webhook',
    'realtime-agent-updates',
    'test-openai-autonomous'
  ];
  
  edgeFunctions.forEach(funcName => {
    const funcPath = path.join(__dirname, 'supabase', 'functions', funcName);
    const indexPath = path.join(funcPath, 'index.ts');
    
    if (fs.existsSync(indexPath)) {
      console.log(`\n📁 ${funcName}:`);
      
      const content = fs.readFileSync(indexPath, 'utf8');
      
      // Check for proper error handling
      if (content.includes('catch') && content.includes('error')) {
        console.log('   ✅ Has error handling');
      } else {
        console.log('   ❌ Missing error handling');
      }
      
      // Check for proper response format
      if (content.includes('return ok(') || content.includes('return err(')) {
        console.log('   ✅ Uses proper response format');
      } else {
        console.log('   ❌ Missing proper response format');
      }
      
      // Check for CORS headers
      if (content.includes('access-control-allow-origin')) {
        console.log('   ✅ Has CORS headers');
      } else {
        console.log('   ❌ Missing CORS headers');
      }
      
      // Check for environment variable validation
      if (content.includes('OPENAI_API_KEY') && content.includes('if (!OPENAI_API_KEY)')) {
        console.log('   ✅ Validates environment variables');
      } else {
        console.log('   ⚠️  May not validate environment variables');
      }
      
      // Check for mock mode fallback
      if (content.includes('mock') || content.includes('Mock')) {
        console.log('   ✅ Has mock mode fallback');
      } else {
        console.log('   ⚠️  No mock mode fallback');
      }
      
    } else {
      console.log(`\n❌ ${funcName}: index.ts not found`);
    }
  });
  
  console.log('');
}

// Check Supabase configuration
function checkSupabaseConfig() {
  console.log('🔧 Checking Supabase Configuration:');
  
  const configPath = path.join(__dirname, 'supabase', 'config.toml');
  
  if (fs.existsSync(configPath)) {
    console.log('✅ config.toml found');
    
    const config = fs.readFileSync(configPath, 'utf8');
    
    // Check for edge runtime
    if (config.includes('[edge_runtime]')) {
      console.log('✅ Edge runtime configured');
    } else {
      console.log('❌ Edge runtime not configured');
    }
    
    // Check for function configurations
    const functionConfigs = config.match(/\[functions\.([^\]]+)\]/g);
    if (functionConfigs) {
      console.log(`✅ Function configs found: ${functionConfigs.length}`);
      functionConfigs.forEach(config => {
        console.log(`   - ${config.replace(/[\[\]]/g, '')}`);
      });
    } else {
      console.log('❌ No function configurations found');
    }
    
  } else {
    console.log('❌ config.toml not found');
  }
  
  console.log('');
}

// Check environment variables
function checkEnvironmentVariables() {
  console.log('🔑 Checking Environment Variables:');
  
  // Check if .env file exists
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file found');
    
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check for required environment variables
    const requiredVars = [
      'OPENAI_API_KEY',
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];
    
    requiredVars.forEach(varName => {
      if (envContent.includes(varName)) {
        console.log(`   ✅ ${varName} found`);
      } else {
        console.log(`   ❌ ${varName} missing`);
      }
    });
    
  } else {
    console.log('❌ .env file not found');
    console.log('💡 Create a .env file with your environment variables');
  }
  
  console.log('');
}

// Generate fix commands
function generateFixCommands() {
  console.log('🚀 Fix Commands:');
  console.log('');
  console.log('1. Set up environment variables:');
  console.log('   Create a .env file in the logistics-lynx directory with:');
  console.log('   OPENAI_API_KEY=your_openai_api_key_here');
  console.log('   SUPABASE_URL=your_supabase_project_url');
  console.log('   SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key');
  console.log('');
  console.log('2. Deploy edge functions:');
  console.log('   cd logistics-lynx');
  console.log('   npx supabase functions deploy');
  console.log('');
  console.log('3. Test edge functions locally:');
  console.log('   npx supabase functions serve');
  console.log('');
  console.log('4. Check function logs:');
  console.log('   npx supabase functions logs');
  console.log('');
  console.log('5. Test specific function:');
  console.log('   curl -X POST http://localhost:54321/functions/v1/autonomous-ai \\');
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -d \'{"action": "introspect"}\'');
  console.log('');
}

// Check for common edge function issues
function checkCommonIssues() {
  console.log('⚠️  Common Edge Function Issues:');
  console.log('');
  
  const issues = [
    '1. Missing environment variables (OPENAI_API_KEY, SUPABASE_URL, etc.)',
    '2. Edge functions not deployed to production',
    '3. Incorrect function URLs or endpoints',
    '4. Missing CORS headers in function responses',
    '5. Improper error handling in functions',
    '6. Network connectivity issues',
    '7. Rate limiting on OpenAI API',
    '8. Authentication/authorization issues',
    '9. Function timeout issues',
    '10. Missing dependencies in function code'
  ];
  
  issues.forEach(issue => {
    console.log(`   ${issue}`);
  });
  
  console.log('');
}

// Create a test script for edge functions
function createTestScript() {
  const testScript = `const https = require('https');

console.log('🧪 Testing Edge Functions...\\n');

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
      console.log(\`\\n🧪 Testing \${func.name}...\`);
      
      try {
        const response = await makeRequest(
          \`\${config.local.baseUrl}\${config.local.endpoint}/\${func.name}\`,
          {
            method: func.method,
            headers: func.headers
          },
          func.body
        );
        
        console.log(\`   Status: \${response.status}\`);
        
        if (response.status === 200) {
          console.log('   ✅ Function is working!');
          if (response.data.success !== undefined) {
            console.log(\`   Success: \${response.data.success}\`);
          }
          if (response.data.mock !== undefined) {
            console.log(\`   Mock mode: \${response.data.mock}\`);
          }
        } else {
          console.log('   ❌ Function error:');
          console.log('   ', response.data);
        }
        
      } catch (error) {
        console.log(\`   ❌ Error testing \${func.name}:\`);
        console.log('   ', error.message);
      }
    }
    
  } catch (error) {
    console.log('❌ Local Supabase not running or not accessible');
    console.log('💡 Start Supabase with: npx supabase start');
    console.log('💡 Then serve functions with: npx supabase functions serve');
  }
  
  console.log('\\n' + '='.repeat(50) + '\\n');
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
      console.log(\`\\n🧪 Testing \${func.name}...\`);
      
      try {
        const response = await makeRequest(
          \`\${config.production.baseUrl}\${config.production.endpoint}/\${func.name}\`,
          {
            method: func.method,
            headers: {
              ...func.headers,
              'Authorization': \`Bearer \${config.production.anonKey}\`
            }
          },
          func.body
        );
        
        console.log(\`   Status: \${response.status}\`);
        
        if (response.status === 200) {
          console.log('   ✅ Function is working!');
          if (response.data.success !== undefined) {
            console.log(\`   Success: \${response.data.success}\`);
          }
          if (response.data.mock !== undefined) {
            console.log(\`   Mock mode: \${response.data.mock}\`);
          }
        } else {
          console.log('   ❌ Function error:');
          console.log('   ', response.data);
        }
        
      } catch (error) {
        console.log(\`   ❌ Error testing \${func.name}:\`);
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
  console.log('🚀 Starting Edge Function Tests...\\n');
  
  await testLocalSupabase();
  await testProductionSupabase();
  
  console.log('📊 Test Summary:');
  console.log('   - Local tests check if Supabase is running locally');
  console.log('   - Production tests check deployed functions');
  console.log('   - Mock mode indicates OpenAI API key not set');
  console.log('   - Success: true indicates function executed successfully');
  
  console.log('\\n💡 Next Steps:');
  console.log('   1. Set up environment variables in .env file');
  console.log('   2. Deploy functions: npx supabase functions deploy');
  console.log('   3. Test locally: npx supabase functions serve');
  console.log('   4. Check logs: npx supabase functions logs');
}

// Run the tests
runTests().catch(console.error);
`;

  fs.writeFileSync(path.join(__dirname, 'test-edge-functions.cjs'), testScript);
  console.log('✅ Created test-edge-functions.cjs for testing edge functions');
}

// Main execution
function main() {
  checkEdgeFunctionConfigs();
  checkSupabaseConfig();
  checkEnvironmentVariables();
  checkCommonIssues();
  generateFixCommands();
  createTestScript();
  
  console.log('📊 Summary:');
  console.log('   - The "non-2xx action code" error means edge functions are failing');
  console.log('   - Most likely cause: Missing environment variables or functions not deployed');
  console.log('   - Check the generated test script to diagnose specific issues');
  console.log('   - Ensure all required environment variables are set');
  console.log('');
  console.log('💡 Immediate Actions:');
  console.log('   1. Create .env file with your API keys');
  console.log('   2. Deploy edge functions: npx supabase functions deploy');
  console.log('   3. Test with: node test-edge-functions.cjs');
  console.log('   4. Check function logs for specific error messages');
}

main();
