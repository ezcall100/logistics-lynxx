// Corrected System Status Check
// Uses proper environment variable names for this project

const https = require('https');
const http = require('http');
const fs = require('fs');

// Configuration
const config = {
  mcpApiUrl: process.env.NEXT_PUBLIC_MCP_API_URL || 'http://localhost:3001/api',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://imcyiofodlnbomemvqto.supabase.co',
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL || 'https://pixx100.app.n8n.cloud/webhook-test/',
  githubApiUrl: 'https://api.github.com',
  openaiApiUrl: 'https://api.openai.com/v1',
  timeout: 10000
};

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Utility functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const requestOptions = {
      timeout: config.timeout,
      ...options
    };

    const req = client.request(url, requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });

    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Request timeout')));
    
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Test functions
async function testMCPApi() {
  log('\n🔧 Testing MCP API...', 'blue');
  log(`   URL: ${config.mcpApiUrl}`, 'cyan');
  
  try {
    const response = await makeRequest(`${config.mcpApiUrl}/health`);
    
    if (response.status === 200) {
      log('✅ MCP API is responding', 'green');
      log(`   Status: ${response.status}`, 'cyan');
      return true;
    } else {
      log(`❌ MCP API returned status ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ MCP API connection failed: ${error.message}`, 'red');
    return false;
  }
}

async function testSupabase() {
  log('\n🗄️ Testing Supabase Connection...', 'blue');
  log(`   URL: ${config.supabaseUrl}`, 'cyan');
  
  try {
    const response = await makeRequest(`${config.supabaseUrl}/rest/v1/autonomous_agent_configs?select=count`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test'}`
      }
    });
    
    if (response.status === 200 || response.status === 401) {
      log('✅ Supabase connection successful', 'green');
      log(`   Status: ${response.status}`, 'cyan');
      return true;
    } else {
      log(`❌ Supabase returned status ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Supabase connection failed: ${error.message}`, 'red');
    return false;
  }
}

async function testN8NWebhook() {
  log('\n🔄 Testing N8N Webhook...', 'blue');
  log(`   URL: ${config.n8nWebhookUrl}`, 'cyan');
  
  try {
    const testPayload = {
      test: true,
      message: 'System status check',
      timestamp: new Date().toISOString(),
      source: 'system_status_check'
    };

    const response = await makeRequest(config.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'System-Status-Check/1.0'
      },
      body: JSON.stringify(testPayload)
    });
    
    if (response.status === 204 || response.status === 200) {
      log('✅ N8N webhook is responding', 'green');
      log(`   Status: ${response.status}`, 'cyan');
      return true;
    } else {
      log(`❌ N8N webhook returned status ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ N8N webhook connection failed: ${error.message}`, 'red');
    return false;
  }
}

async function testGitHubIntegration() {
  log('\n🐙 Testing GitHub Integration...', 'blue');
  
  try {
    const response = await makeRequest(`${config.githubApiUrl}/rate_limit`, {
      headers: {
        'User-Agent': 'System-Status-Check/1.0'
      }
    });
    
    if (response.status === 200) {
      log('✅ GitHub API is accessible', 'green');
      log(`   Status: ${response.status}`, 'cyan');
      
      if (process.env.GITHUB_TOKEN) {
        log('✅ GitHub token is configured', 'green');
      } else {
        log('⚠️ GitHub token not configured (using public API)', 'yellow');
      }
      return true;
    } else {
      log(`❌ GitHub API returned status ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ GitHub API connection failed: ${error.message}`, 'red');
    return false;
  }
}

async function testOpenAI() {
  log('\n🧠 Testing OpenAI Integration...', 'blue');
  
  try {
    if (!process.env.OPENAI_API_KEY) {
      log('⚠️ OpenAI API key not configured', 'yellow');
      return false;
    }

    const response = await makeRequest(`${config.openaiApiUrl}/models`, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200) {
      log('✅ OpenAI API is working', 'green');
      log(`   Status: ${response.status}`, 'cyan');
      return true;
    } else {
      log(`❌ OpenAI API returned status ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ OpenAI API connection failed: ${error.message}`, 'red');
    return false;
  }
}

async function testMCPAgents() {
  log('\n🤖 Testing MCP Agents...', 'blue');
  
  try {
    const response = await makeRequest(`${config.mcpApiUrl}/mcp/agents`);
    
    if (response.status === 200) {
      log('✅ MCP Agents endpoint is responding', 'green');
      log(`   Status: ${response.status}`, 'cyan');
      
      try {
        const agents = JSON.parse(response.data);
        log(`   Found ${agents.length || 0} agents`, 'cyan');
        return true;
      } catch (parseError) {
        log('⚠️ Could not parse agents response', 'yellow');
        return true;
      }
    } else {
      log(`❌ MCP Agents returned status ${response.status}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ MCP Agents connection failed: ${error.message}`, 'red');
    return false;
  }
}

async function checkEnvironmentVariables() {
  log('\n🔧 Checking Environment Variables...', 'blue');
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_MCP_API_URL',
    'OPENAI_API_KEY',
    'GITHUB_TOKEN'
  ];
  
  let allConfigured = true;
  
  for (const varName of requiredVars) {
    if (process.env[varName]) {
      log(`✅ ${varName} is configured`, 'green');
    } else {
      log(`❌ ${varName} is not configured`, 'red');
      allConfigured = false;
    }
  }
  
  return allConfigured;
}

async function checkPortStatus() {
  log('\n🔌 Checking Port Status...', 'blue');
  
  const ports = [3000, 3001, 5175];
  
  for (const port of ports) {
    try {
      const response = await makeRequest(`http://localhost:${port}/health`, {
        timeout: 5000
      });
      
      if (response.status === 200) {
        log(`✅ Port ${port} is active`, 'green');
      } else {
        log(`⚠️ Port ${port} returned status ${response.status}`, 'yellow');
      }
    } catch (error) {
      log(`❌ Port ${port} is not responding`, 'red');
    }
  }
}

async function generateStatusReport(results) {
  log('\n📊 System Status Report', 'bold');
  log('='.repeat(50), 'cyan');
  
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;
  const failedTests = totalTests - passedTests;
  
  log(`\nOverall Status: ${passedTests}/${totalTests} tests passed`, passedTests === totalTests ? 'green' : 'red');
  
  log('\nDetailed Results:', 'bold');
  for (const [test, passed] of Object.entries(results)) {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const color = passed ? 'green' : 'red';
    log(`   ${status} ${test}`, color);
  }
  
  if (failedTests > 0) {
    log('\n🔧 Recommendations:', 'yellow');
    log('   1. Check environment variables', 'cyan');
    log('   2. Verify service configurations', 'cyan');
    log('   3. Check network connectivity', 'cyan');
    log('   4. Review service logs', 'cyan');
  } else {
    log('\n🎉 All systems are operational!', 'green');
  }
}

// Main execution
async function main() {
  log('🚀 Starting Corrected System Status Check', 'bold');
  log('='.repeat(60), 'cyan');
  
  const results = {};
  
  // Run all tests
  results['Environment Variables'] = await checkEnvironmentVariables();
  results['MCP API'] = await testMCPApi();
  results['Supabase Connection'] = await testSupabase();
  results['N8N Webhook'] = await testN8NWebhook();
  results['GitHub Integration'] = await testGitHubIntegration();
  results['OpenAI Integration'] = await testOpenAI();
  results['MCP Agents'] = await testMCPAgents();
  
  // Check ports
  await checkPortStatus();
  
  // Generate report
  await generateStatusReport(results);
  
  log('\n🏁 System status check completed', 'bold');
}

// Run the check
main().catch(error => {
  log(`\n💥 Fatal error during system check: ${error.message}`, 'red');
  process.exit(1);
});
