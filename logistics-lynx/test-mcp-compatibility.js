import http from 'http';
import https from 'https';

// Configuration
const MCP_BASE_URL = process.env.VITE_MCP_BASE_URL || 'http://localhost:3001/api';
const TIMEOUT = 10000;

// Test results storage
const results = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

// Utility function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const requestOptions = {
      timeout: TIMEOUT,
      ...options
    };

    const req = client.request(url, requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : null;
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData,
            rawData: data
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: null,
            rawData: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

// Test function
async function testEndpoint(name, url, expectedStatus = 200, method = 'GET', body = null) {
  results.total++;
  
  try {
    console.log(`🔍 Testing ${name}...`);
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await makeRequest(url, options);
    
    const success = response.status === expectedStatus;
    
    if (success) {
      results.passed++;
      console.log(`✅ ${name}: PASSED (${response.status})`);
    } else {
      results.failed++;
      console.log(`❌ ${name}: FAILED (Expected ${expectedStatus}, got ${response.status})`);
    }
    
    results.details.push({
      name,
      url,
      expectedStatus,
      actualStatus: response.status,
      success,
      responseSize: response.rawData?.length || 0,
      hasData: !!response.data
    });
    
    return success;
  } catch (error) {
    results.failed++;
    console.log(`❌ ${name}: ERROR (${error.message})`);
    
    results.details.push({
      name,
      url,
      expectedStatus,
      actualStatus: 'ERROR',
      success: false,
      error: error.message
    });
    
    return false;
  }
}

// Main test suite
async function runTests() {
  console.log('🚀 Starting MCP API Compatibility Tests...\n');
  console.log(`📍 Testing against: ${MCP_BASE_URL}\n`);

  // Test basic connectivity
  await testEndpoint('Health Check', `${MCP_BASE_URL}/mcp/system/health`);
  
  // Test metrics endpoints
  await testEndpoint('Metrics Overview', `${MCP_BASE_URL}/mcp/metrics/overview`);
  await testEndpoint('Metrics Trends', `${MCP_BASE_URL}/mcp/metrics/trends?timeframe=24h`);
  
  // Test user management endpoints
  await testEndpoint('Users List', `${MCP_BASE_URL}/mcp/users`);
  await testEndpoint('Users Export', `${MCP_BASE_URL}/mcp/users/export`);
  
  // Test settings endpoints
  await testEndpoint('Settings Get', `${MCP_BASE_URL}/mcp/settings`);
  
  // Test agent management endpoints
  await testEndpoint('Agents List', `${MCP_BASE_URL}/mcp/agents`);
  
  // Test workflow management endpoints
  await testEndpoint('Workflows List', `${MCP_BASE_URL}/mcp/workflows`);
  
  // Test logs endpoints
  await testEndpoint('Logs List', `${MCP_BASE_URL}/mcp/logs`);
  await testEndpoint('Logs Export', `${MCP_BASE_URL}/mcp/logs/export`);
  
  // Test task management endpoints
  await testEndpoint('Tasks List', `${MCP_BASE_URL}/mcp/tasks`);
  
  // Test assistant endpoints
  await testEndpoint('Assistant Conversations', `${MCP_BASE_URL}/mcp/assistant/conversations`);
  
  // Test document processing endpoints
  await testEndpoint('Docs Upload (GET)', `${MCP_BASE_URL}/mcp/docs/upload`, 405); // Should return 405 for GET
  
  // Test system operations endpoints
  await testEndpoint('System Health', `${MCP_BASE_URL}/mcp/system/health`);
  
  // Test POST endpoints (with mock data)
  const mockUser = {
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    permissions: ['read'],
    features: ['basic']
  };
  
  await testEndpoint('Create User', `${MCP_BASE_URL}/mcp/users`, 201, 'POST', mockUser);
  
  const mockTask = {
    type: 'test_task',
    payload: { test: true },
    priority: 1
  };
  
  await testEndpoint('Create Task', `${MCP_BASE_URL}/mcp/tasks`, 201, 'POST', mockTask);
  
  const mockAssistantRequest = {
    message: 'Hello, this is a test message',
    context: { test: true }
  };
  
  await testEndpoint('Assistant Invoke', `${MCP_BASE_URL}/mcp/assistant/invoke`, 200, 'POST', mockAssistantRequest);
  
  // Test PATCH endpoints
  const mockSettingsUpdate = {
    organization: {
      name: 'Test Organization'
    }
  };
  
  await testEndpoint('Update Settings', `${MCP_BASE_URL}/mcp/settings`, 200, 'PATCH', mockSettingsUpdate);
  
  // Test system operations
  await testEndpoint('System Restart', `${MCP_BASE_URL}/mcp/system/restart`, 200, 'POST');
  await testEndpoint('System Drain', `${MCP_BASE_URL}/mcp/system/drain`, 200, 'POST');
  await testEndpoint('System Reindex', `${MCP_BASE_URL}/mcp/system/reindex`, 200, 'POST');
  await testEndpoint('System Refresh Caches', `${MCP_BASE_URL}/mcp/system/refresh-caches`, 200, 'POST');

  // Print results
  console.log('\n📊 Test Results Summary:');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Total: ${results.total}`);
  console.log(`🎯 Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  
  console.log('\n📋 Detailed Results:');
  console.log('='.repeat(50));
  
  results.details.forEach((test, index) => {
    const status = test.success ? '✅' : '❌';
    const statusText = test.success ? 'PASSED' : 'FAILED';
    console.log(`${index + 1}. ${status} ${test.name} - ${statusText}`);
    console.log(`   URL: ${test.url}`);
    console.log(`   Expected: ${test.expectedStatus}, Got: ${test.actualStatus}`);
    if (test.responseSize) {
      console.log(`   Response Size: ${test.responseSize} bytes`);
    }
    if (test.error) {
      console.log(`   Error: ${test.error}`);
    }
    console.log('');
  });
  
  // Generate compatibility report
  console.log('📄 MCP Compatibility Report:');
  console.log('='.repeat(50));
  
  const workingEndpoints = results.details.filter(d => d.success);
  const brokenEndpoints = results.details.filter(d => !d.success);
  
  if (workingEndpoints.length > 0) {
    console.log('\n✅ Working Endpoints:');
    workingEndpoints.forEach(endpoint => {
      console.log(`   - ${endpoint.name} (${endpoint.actualStatus})`);
    });
  }
  
  if (brokenEndpoints.length > 0) {
    console.log('\n❌ Broken/Missing Endpoints:');
    brokenEndpoints.forEach(endpoint => {
      console.log(`   - ${endpoint.name} (${endpoint.actualStatus})`);
    });
  }
  
  // Recommendations
  console.log('\n💡 Recommendations:');
  if (results.failed === 0) {
    console.log('   🎉 All endpoints are working correctly!');
    console.log('   ✅ Super Admin portal is fully compatible with MCP API');
  } else {
    console.log(`   ⚠️  ${results.failed} endpoints need attention`);
    console.log('   🔧 Consider implementing missing endpoints or fixing broken ones');
    console.log('   📝 Check server logs for detailed error information');
  }
  
  // Exit with appropriate code
  process.exit(results.failed === 0 ? 0 : 1);
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
MCP API Compatibility Test Script

Usage: node test-mcp-compatibility.js [options]

Options:
  --help, -h     Show this help message
  --url <url>    Set custom MCP base URL (default: http://localhost:3001/api)
  --timeout <ms> Set request timeout in milliseconds (default: 10000)

Environment Variables:
  VITE_MCP_BASE_URL  Set MCP base URL

Examples:
  node test-mcp-compatibility.js
  node test-mcp-compatibility.js --url http://localhost:3001/api
  VITE_MCP_BASE_URL=http://localhost:3001/api node test-mcp-compatibility.js
  `);
  process.exit(0);
}

// Parse custom URL from arguments
const urlIndex = args.indexOf('--url');
if (urlIndex !== -1 && args[urlIndex + 1]) {
  process.env.VITE_MCP_BASE_URL = args[urlIndex + 1];
}

// Parse custom timeout from arguments
const timeoutIndex = args.indexOf('--timeout');
if (timeoutIndex !== -1 && args[timeoutIndex + 1]) {
  TIMEOUT = parseInt(args[timeoutIndex + 1]);
}

// Run tests
runTests().catch(error => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});
