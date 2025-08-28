#!/usr/bin/env node

/**
 * MCP Agent Integration Test Script
 * Tests MCP agent interactions and autonomous operations
 */

import http from 'http';

const MCP_BASE_URL = 'http://localhost:3001/api';
const TIMEOUT = 10000;

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

// Test MCP Agent Operations
async function testAgentOperations() {
  console.log('\n🤖 Testing MCP Agent Operations...\n');

  // Test agent list retrieval
  await testEndpoint('Get All Agents', `${MCP_BASE_URL}/mcp/agents`);

  // Test agent-specific operations
  await testEndpoint('Get Agent by ID', `${MCP_BASE_URL}/mcp/agents/agent-1`);

  // Test agent scaling
  await testEndpoint('Scale Agent', `${MCP_BASE_URL}/mcp/agents/agent-1`, 200, 'PATCH', {
    desired_concurrency: 8
  });

  // Test agent restart
  await testEndpoint('Restart Agent', `${MCP_BASE_URL}/mcp/agents/agent-1/restart`, 200, 'POST');

  // Test agent upgrade
  await testEndpoint('Upgrade Agent', `${MCP_BASE_URL}/mcp/agents/agent-1/upgrade`, 200, 'POST', {
    version: '2.1.5'
  });

  // Test agent enable/disable
  await testEndpoint('Enable Agent', `${MCP_BASE_URL}/mcp/agents/agent-1`, 200, 'PATCH', {
    status: 'online'
  });

  await testEndpoint('Disable Agent', `${MCP_BASE_URL}/mcp/agents/agent-1`, 200, 'PATCH', {
    status: 'offline'
  });
}

// Test Task Creation and Management
async function testTaskOperations() {
  console.log('\n📋 Testing Task Operations...\n');

  // Test various task types
  const taskTypes = [
    {
      name: 'Data Processing Task',
      type: 'data_processing',
      payload: { file_id: 'test-file-123', operation: 'ocr' }
    },
    {
      name: 'AI Assistant Task',
      type: 'ai_assistant',
      payload: { query: 'Analyze this shipment data', context: 'logistics' }
    },
    {
      name: 'System Maintenance Task',
      type: 'system_maintenance',
      payload: { operation: 'cleanup_logs', retention_days: 30 }
    },
    {
      name: 'Emergency Task',
      type: 'emergency_support',
      payload: { priority: 'high', issue: 'system_overload' }
    }
  ];

  for (const task of taskTypes) {
    await testEndpoint(
      task.name,
      `${MCP_BASE_URL}/mcp/tasks`,
      201,
      'POST',
      {
        type: task.type,
        payload: task.payload,
        priority: 1,
        agent_id: 'agent-1'
      }
    );
  }
}

// Test AI Assistant Interactions
async function testAIAssistant() {
  console.log('\n🧠 Testing AI Assistant...\n');

  const testConversations = [
    {
      name: 'Basic Query',
      message: 'What is the current system status?',
      context: 'system_monitoring'
    },
    {
      name: 'Complex Analysis',
      message: 'Analyze the performance metrics for the last 24 hours and provide recommendations',
      context: 'performance_analysis'
    },
    {
      name: 'Task Execution',
      message: 'Execute a data backup operation for all critical systems',
      context: 'system_operations'
    }
  ];

  for (const conv of testConversations) {
    await testEndpoint(
      conv.name,
      `${MCP_BASE_URL}/mcp/assistant/invoke`,
      200,
      'POST',
      {
        message: conv.message,
        conversation_id: `test-conv-${Date.now()}`,
        context: conv.context,
        tools: ['system_status', 'data_analysis', 'backup_operations']
      }
    );
  }
}

// Test System Operations
async function testSystemOperations() {
  console.log('\n⚙️ Testing System Operations...\n');

  const systemOps = [
    { name: 'System Restart', endpoint: '/mcp/system/restart' },
    { name: 'System Drain', endpoint: '/mcp/system/drain' },
    { name: 'System Reindex', endpoint: '/mcp/system/reindex' },
    { name: 'Refresh Caches', endpoint: '/mcp/system/refresh-caches' }
  ];

  for (const op of systemOps) {
    await testEndpoint(op.name, `${MCP_BASE_URL}${op.endpoint}`, 200, 'POST');
  }
}

// Test Metrics and Monitoring
async function testMetricsAndMonitoring() {
  console.log('\n📊 Testing Metrics and Monitoring...\n');

  await testEndpoint('System Health', `${MCP_BASE_URL}/mcp/system/health`);
  await testEndpoint('Metrics Overview', `${MCP_BASE_URL}/mcp/metrics/overview`);
  await testEndpoint('Metrics Trends (24h)', `${MCP_BASE_URL}/mcp/metrics/trends?timeframe=24h`);
  await testEndpoint('Metrics Trends (7d)', `${MCP_BASE_URL}/mcp/metrics/trends?timeframe=7d`);
  await testEndpoint('System Logs', `${MCP_BASE_URL}/mcp/logs`);
}

// Test User Management
async function testUserManagement() {
  console.log('\n👥 Testing User Management...\n');

  await testEndpoint('Get All Users', `${MCP_BASE_URL}/mcp/users`);
  await testEndpoint('Get User by ID', `${MCP_BASE_URL}/mcp/users/1`);
  
  // Test user creation
  await testEndpoint('Create User', `${MCP_BASE_URL}/mcp/users`, 201, 'POST', {
    email: 'test@transbot.com',
    name: 'Test User',
    role: 'manager',
    permissions: ['users:read', 'metrics:read'],
    features: ['dashboard', 'users']
  });

  // Test user update
  await testEndpoint('Update User', `${MCP_BASE_URL}/mcp/users/1`, 200, 'PATCH', {
    name: 'Updated System Administrator',
    permissions: ['*']
  });
}

// Test Settings Management
async function testSettingsManagement() {
  console.log('\n⚙️ Testing Settings Management...\n');

  await testEndpoint('Get Settings', `${MCP_BASE_URL}/mcp/settings`);
  
  // Test settings update
  await testEndpoint('Update Settings', `${MCP_BASE_URL}/mcp/settings`, 200, 'PATCH', {
    organization: {
      name: 'TransBot TMS Platform - Updated',
      timezone: 'UTC',
      contact_email: 'support@transbot.com'
    },
    security: {
      session_length_minutes: 480,
      two_factor_required: true
    }
  });
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting MCP Agent Integration Tests...\n');
  console.log(`📍 Testing against: ${MCP_BASE_URL}\n`);

  // Run all test suites
  await testMetricsAndMonitoring();
  await testAgentOperations();
  await testTaskOperations();
  await testAIAssistant();
  await testSystemOperations();
  await testUserManagement();
  await testSettingsManagement();

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
    console.log('\n🎉 All MCP agent tests passed! The API is fully functional.');
    console.log('\n🔧 MCP Agent System Status:');
    console.log('   ✅ Agent Management: Operational');
    console.log('   ✅ Task Processing: Operational');
    console.log('   ✅ AI Assistant: Operational');
    console.log('   ✅ System Operations: Operational');
    console.log('   ✅ Metrics & Monitoring: Operational');
    console.log('   ✅ User Management: Operational');
    console.log('   ✅ Settings Management: Operational');
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
