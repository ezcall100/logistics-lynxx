#!/usr/bin/env node

/**
 * Comprehensive MCP API Endpoint Test Script
 * Tests all endpoints to ensure they're working properly
 */

import http from 'http';

const MCP_BASE_URL = 'http://localhost:3001/api';
const TIMEOUT = 5000;

// Test results
const results = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

// Utility function to make HTTP requests
function makeRequest(url, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: TIMEOUT
    };

    const req = http.request(options, (res) => {
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

    if (body) {
      req.write(JSON.stringify(body));
    }
    
    req.end();
  });
}

// Test function
async function testEndpoint(name, url, expectedStatus = 200, method = 'GET', body = null) {
  try {
    console.log(`🔍 Testing ${name}...`);
    const response = await makeRequest(url, method, body);
    
    if (response.status === expectedStatus) {
      console.log(`✅ ${name}: PASSED (${response.status})`);
      results.passed++;
      
      // Log response data for debugging
      if (response.data && response.data.success) {
        console.log(`   📊 Data received: ${JSON.stringify(response.data.data).substring(0, 100)}...`);
      }
    } else {
      console.log(`❌ ${name}: FAILED (${response.status}) - Expected ${expectedStatus}`);
      console.log(`   📄 Response: ${response.rawData.substring(0, 200)}...`);
      results.failed++;
    }
    
    results.total++;
    results.details.push({
      name,
      status: response.status,
      expected: expectedStatus,
      success: response.status === expectedStatus,
      data: response.data
    });
    
  } catch (error) {
    console.log(`❌ ${name}: ERROR - ${error.message}`);
    results.failed++;
    results.total++;
    results.details.push({
      name,
      status: 'ERROR',
      expected: expectedStatus,
      success: false,
      error: error.message
    });
  }
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting Comprehensive MCP API Tests...\n');
  console.log(`📍 Testing against: ${MCP_BASE_URL}\n`);

  // Test all endpoints
  await testEndpoint('Health Check', `${MCP_BASE_URL}/mcp/system/health`);
  await testEndpoint('Metrics Overview', `${MCP_BASE_URL}/mcp/metrics/overview`);
  await testEndpoint('Metrics Trends', `${MCP_BASE_URL}/mcp/metrics/trends`);
  await testEndpoint('Users List', `${MCP_BASE_URL}/mcp/users`);
  await testEndpoint('Agents List', `${MCP_BASE_URL}/mcp/agents`);
  await testEndpoint('Settings Get', `${MCP_BASE_URL}/mcp/settings`);
  await testEndpoint('Logs List', `${MCP_BASE_URL}/mcp/logs`);
  
  // Test POST endpoints
  await testEndpoint('Create Task', `${MCP_BASE_URL}/mcp/tasks`, 200, 'POST', {
    type: 'test_task',
    payload: { test: true },
    priority: 1
  });
  
  await testEndpoint('Assistant Invoke', `${MCP_BASE_URL}/mcp/assistant/invoke`, 200, 'POST', {
    message: 'Hello, this is a test message',
    conversation_id: 'test-conv-123'
  });
  
  await testEndpoint('System Restart', `${MCP_BASE_URL}/mcp/system/restart`, 200, 'POST');
  await testEndpoint('System Drain', `${MCP_BASE_URL}/mcp/system/drain`, 200, 'POST');
  await testEndpoint('System Reindex', `${MCP_BASE_URL}/mcp/system/reindex`, 200, 'POST');
  await testEndpoint('System Refresh Caches', `${MCP_BASE_URL}/mcp/system/refresh-caches`, 200, 'POST');
  
  // Test root endpoint
  await testEndpoint('Root API', `${MCP_BASE_URL}`);

  // Print results
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Total: ${results.total}`);
  console.log(`🎯 Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);

  // Detailed results
  console.log('\n📋 Detailed Results:');
  results.details.forEach(detail => {
    const status = detail.success ? '✅' : '❌';
    console.log(`${status} ${detail.name}: ${detail.status}${detail.expected ? ` (expected ${detail.expected})` : ''}`);
  });

  // Summary
  if (results.failed === 0) {
    console.log('\n🎉 All tests passed! MCP API is fully functional.');
    return true;
  } else {
    console.log(`\n⚠️  ${results.failed} test(s) failed. Please check the errors above.`);
    return false;
  }
}

// Run the tests
runAllTests().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Test runner error:', error);
  process.exit(1);
});
