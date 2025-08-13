const fs = require('fs');
const path = require('path');

console.log('🔍 Testing OpenAI API Integration with Supabase Edge Functions...\n');

// Check environment variables and configuration
function checkEnvironment() {
  console.log('📋 Environment Configuration:');
  
  // Check if .env file exists
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file found');
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check for OpenAI API key
    if (envContent.includes('OPENAI_API_KEY')) {
      console.log('✅ OPENAI_API_KEY found in .env');
    } else {
      console.log('❌ OPENAI_API_KEY not found in .env');
    }
    
    // Check for Supabase configuration
    if (envContent.includes('SUPABASE_URL')) {
      console.log('✅ SUPABASE_URL found in .env');
    } else {
      console.log('❌ SUPABASE_URL not found in .env');
    }
    
    if (envContent.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      console.log('✅ SUPABASE_SERVICE_ROLE_KEY found in .env');
    } else {
      console.log('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env');
    }
  } else {
    console.log('❌ .env file not found');
  }
  
  console.log('');
}

// Check edge functions that use OpenAI
function checkOpenAIEdgeFunctions() {
  console.log('🤖 Edge Functions with OpenAI Integration:');
  
  const edgeFunctions = [
    'autonomous-ai',
    'autonomous-intelligence',
    'coding-assistant',
    'test-openai-autonomous'
  ];
  
  edgeFunctions.forEach(funcName => {
    const funcPath = path.join(__dirname, 'supabase', 'functions', funcName);
    const indexPath = path.join(funcPath, 'index.ts');
    
    if (fs.existsSync(indexPath)) {
      console.log(`\n📁 ${funcName}:`);
      
      const content = fs.readFileSync(indexPath, 'utf8');
      
      // Check for OpenAI API key usage
      if (content.includes('OPENAI_API_KEY')) {
        console.log('   ✅ Uses OPENAI_API_KEY');
      } else {
        console.log('   ❌ No OPENAI_API_KEY usage found');
      }
      
      // Check for OpenAI API calls
      if (content.includes('api.openai.com')) {
        console.log('   ✅ Makes OpenAI API calls');
      } else {
        console.log('   ❌ No OpenAI API calls found');
      }
      
      // Check for mock mode handling
      if (content.includes('mock') || content.includes('Mock')) {
        console.log('   ✅ Has mock mode fallback');
      } else {
        console.log('   ⚠️  No mock mode fallback');
      }
      
      // Check for error handling
      if (content.includes('catch') || content.includes('error')) {
        console.log('   ✅ Has error handling');
      } else {
        console.log('   ⚠️  Limited error handling');
      }
      
      // Extract OpenAI model usage
      const modelMatch = content.match(/model:\s*["']([^"']+)["']/);
      if (modelMatch) {
        console.log(`   📋 Uses model: ${modelMatch[1]}`);
      } else {
        console.log('   ❓ Model not specified');
      }
    } else {
      console.log(`\n❌ ${funcName}: index.ts not found`);
    }
  });
  
  console.log('');
}

// Test specific edge function
function testOpenAIFunction() {
  console.log('🧪 Testing OpenAI Function (coding-assistant):');
  
  const funcPath = path.join(__dirname, 'supabase', 'functions', 'coding-assistant', 'index.ts');
  
  if (fs.existsSync(funcPath)) {
    const content = fs.readFileSync(funcPath, 'utf8');
    
    // Extract the callOpenAI function
    const callOpenAIMatch = content.match(/async function callOpenAI\([^)]*\)\s*\{[\s\S]*?\}/);
    
    if (callOpenAIMatch) {
      console.log('✅ callOpenAI function found');
      
      const functionContent = callOpenAIMatch[0];
      
      // Check for proper error handling
      if (functionContent.includes('if (!OPENAI_API_KEY)')) {
        console.log('✅ Has API key validation');
      } else {
        console.log('❌ Missing API key validation');
      }
      
      // Check for mock mode
      if (functionContent.includes('mock: true')) {
        console.log('✅ Has mock mode for testing');
      } else {
        console.log('❌ No mock mode');
      }
      
      // Check for proper fetch call
      if (functionContent.includes('fetch("https://api.openai.com/v1/chat/completions"')) {
        console.log('✅ Makes proper OpenAI API call');
      } else {
        console.log('❌ Incorrect API endpoint');
      }
      
      // Check for response handling
      if (functionContent.includes('res.ok') || functionContent.includes('res.status')) {
        console.log('✅ Has response status checking');
      } else {
        console.log('❌ No response status checking');
      }
      
    } else {
      console.log('❌ callOpenAI function not found');
    }
  } else {
    console.log('❌ coding-assistant function not found');
  }
  
  console.log('');
}

// Check Supabase configuration
function checkSupabaseConfig() {
  console.log('🔧 Supabase Configuration:');
  
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

// Generate test commands
function generateTestCommands() {
  console.log('🚀 Test Commands:');
  console.log('');
  console.log('1. Test edge function locally:');
  console.log('   cd logistics-lynx');
  console.log('   npx supabase functions serve');
  console.log('');
  console.log('2. Test OpenAI integration:');
  console.log('   curl -X POST http://localhost:54321/functions/v1/coding-assistant \\');
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -d \'{"prompt": "Write a hello world function in JavaScript"}\'');
  console.log('');
  console.log('3. Test autonomous AI function:');
  console.log('   curl -X POST http://localhost:54321/functions/v1/autonomous-ai \\');
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -d \'{"action": "introspect"}\'');
  console.log('');
  console.log('4. Deploy to production:');
  console.log('   npx supabase functions deploy');
  console.log('');
  console.log('5. Test production endpoint:');
  console.log('   curl -X POST https://your-project.supabase.co/functions/v1/coding-assistant \\');
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -H "Authorization: Bearer YOUR_ANON_KEY" \\');
  console.log('     -d \'{"prompt": "Test prompt"}\'');
  console.log('');
}

// Check for potential issues
function checkPotentialIssues() {
  console.log('⚠️  Potential Issues to Check:');
  console.log('');
  
  const issues = [
    '1. OpenAI API Key not set in environment variables',
    '2. Supabase project not properly configured',
    '3. Edge functions not deployed',
    '4. CORS issues with local development',
    '5. Rate limiting on OpenAI API',
    '6. Network connectivity issues',
    '7. Incorrect function URLs',
    '8. Missing authentication headers'
  ];
  
  issues.forEach(issue => {
    console.log(`   ${issue}`);
  });
  
  console.log('');
}

// Main execution
function main() {
  checkEnvironment();
  checkOpenAIEdgeFunctions();
  testOpenAIFunction();
  checkSupabaseConfig();
  generateTestCommands();
  checkPotentialIssues();
  
  console.log('📊 Summary:');
  console.log('   - Check that OPENAI_API_KEY is set in your environment');
  console.log('   - Ensure Supabase project is properly configured');
  console.log('   - Test edge functions locally before deploying');
  console.log('   - Monitor OpenAI API usage and rate limits');
  console.log('   - Check function logs for any errors');
  console.log('');
  console.log('💡 Next Steps:');
  console.log('   1. Set up your .env file with proper API keys');
  console.log('   2. Start Supabase locally: npx supabase start');
  console.log('   3. Serve edge functions: npx supabase functions serve');
  console.log('   4. Test with curl commands above');
  console.log('   5. Deploy to production when ready');
}

main();
