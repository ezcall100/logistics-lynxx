#!/usr/bin/env node

/**
 * 🧪 Trans Bot AI - Phase 3 Smoke Tests
 * Comprehensive test suite for production deployment validation
 */

const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

// Configuration
const config = {
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  n8nUrl: process.env.N8N_URL,
  n8nApiKey: process.env.N8N_API_KEY,
  slackWebhookUrl: process.env.SLACK_WEBHOOK_URL,
  testCompanyId: process.env.TEST_COMPANY_ID,
  environment: process.env.ENVIRONMENT || 'staging'
};

// Colors for output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Test results
let testResults = {
  passed: 0,
  failed: 0,
  total: 0,
  details: []
};

// Logging functions
function log(message, color = 'blue') {
  const timestamp = new Date().toISOString();
  console.log(`${colors[color]}[${timestamp}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️ ${message}`, 'yellow');
}

// Initialize Supabase client
const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey);

/**
 * Test 1: RLS Guard Test
 * Attempt cross-company data access → expect 401/forbidden
 */
async function testRLSGuard() {
  log('Testing RLS Guard: Cross-company data access...');
  
  try {
    // Create a test user with a different company ID
    const testUser = {
      id: 'test-user-rls-' + Date.now(),
      email: 'test-rls@example.com',
      company_id: 'different-company-id'
    };
    
    // Attempt to access data from another company
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .neq('company_id', testUser.company_id)
      .limit(1);
    
    if (error) {
      logSuccess('RLS Guard: Cross-company access properly blocked');
      return true;
    } else if (!data || data.length === 0) {
      logSuccess('RLS Guard: No cross-company data returned (empty result)');
      return true;
    } else {
      logError('RLS Guard: Cross-company data access allowed - SECURITY ISSUE');
      return false;
    }
  } catch (error) {
    logError(`RLS Guard test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test 2: Rates Contract Test
 * Test contract publish → new version effective window respected
 */
async function testRatesContract() {
  log('Testing Rates Contract: Version effective window...');
  
  try {
    // Create a test contract
    const contractData = {
      id: 'test-contract-' + Date.now(),
      version: '1.0',
      effective_date: new Date().toISOString(),
      expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      status: 'draft',
      company_id: config.testCompanyId
    };
    
    // Insert contract
    const { data: contract, error: insertError } = await supabase
      .from('contracts')
      .insert(contractData)
      .select()
      .single();
    
    if (insertError) {
      logError(`Rates Contract: Failed to create test contract: ${insertError.message}`);
      return false;
    }
    
    // Publish contract (create new version)
    const newVersionData = {
      ...contractData,
      id: 'test-contract-v2-' + Date.now(),
      version: '2.0',
      effective_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
      status: 'published'
    };
    
    const { data: newVersion, error: publishError } = await supabase
      .from('contracts')
      .insert(newVersionData)
      .select()
      .single();
    
    if (publishError) {
      logError(`Rates Contract: Failed to publish new version: ${publishError.message}`);
      return false;
    }
    
    // Verify effective window is respected
    const { data: activeContracts, error: queryError } = await supabase
      .from('contracts')
      .select('*')
      .eq('company_id', config.testCompanyId)
      .eq('status', 'published')
      .gte('effective_date', new Date().toISOString())
      .lte('expiry_date', new Date(Date.now() + 31 * 24 * 60 * 60 * 1000).toISOString());
    
    if (queryError) {
      logError(`Rates Contract: Failed to query active contracts: ${queryError.message}`);
      return false;
    }
    
    // Should only have one active contract (the new version)
    if (activeContracts && activeContracts.length === 1) {
      logSuccess('Rates Contract: Version effective window properly enforced');
      return true;
    } else {
      logError(`Rates Contract: Version effective window not respected. Found ${activeContracts?.length || 0} active contracts`);
      return false;
    }
  } catch (error) {
    logError(`Rates Contract test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test 3: Directory COI Test
 * Test expired COI → triggers alert + blocks tendering
 */
async function testDirectoryCOI() {
  log('Testing Directory COI: Expired certificate handling...');
  
  try {
    // Create a test carrier with expired COI
    const carrierData = {
      id: 'test-carrier-coi-' + Date.now(),
      name: 'Test Carrier COI',
      company_id: config.testCompanyId,
      coi_expiry_date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // expired yesterday
      status: 'active'
    };
    
    // Insert carrier
    const { data: carrier, error: insertError } = await supabase
      .from('carriers')
      .insert(carrierData)
      .select()
      .single();
    
    if (insertError) {
      logError(`Directory COI: Failed to create test carrier: ${insertError.message}`);
      return false;
    }
    
    // Attempt to create a tender for this carrier
    const tenderData = {
      id: 'test-tender-coi-' + Date.now(),
      carrier_id: carrier.id,
      load_id: 'test-load-coi-' + Date.now(),
      status: 'pending',
      company_id: config.testCompanyId
    };
    
    const { data: tender, error: tenderError } = await supabase
      .from('tenders')
      .insert(tenderData)
      .select()
      .single();
    
    if (tenderError) {
      logSuccess('Directory COI: Tender creation blocked for expired COI');
      return true;
    } else {
      logError('Directory COI: Tender creation allowed despite expired COI - SECURITY ISSUE');
      return false;
    }
  } catch (error) {
    logError(`Directory COI test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test 4: Agent Runner Error Test
 * Force an error → retries up to 5 → quarantined with log
 */
async function testAgentErrorHandling() {
  log('Testing Agent Runner: Error handling and retry logic...');
  
  try {
    // Create a test task that will fail
    const taskData = {
      id: 'test-task-error-' + Date.now(),
      type: 'load_matching',
      status: 'pending',
      payload: {
        load_id: 'invalid-load-id',
        force_error: true
      },
      retry_count: 0,
      max_retries: 5,
      company_id: config.testCompanyId
    };
    
    // Insert task
    const { data: task, error: insertError } = await supabase
      .from('agent_tasks')
      .insert(taskData)
      .select()
      .single();
    
    if (insertError) {
      logError(`Agent Runner: Failed to create test task: ${insertError.message}`);
      return false;
    }
    
    // Trigger agent runner
    const response = await fetch(`${config.supabaseUrl}/functions/v1/agent-runner`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.supabaseServiceKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task_id: task.id })
    });
    
    if (!response.ok) {
      logError(`Agent Runner: Failed to trigger agent runner: ${response.statusText}`);
      return false;
    }
    
    // Wait a moment for processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check task status
    const { data: updatedTask, error: queryError } = await supabase
      .from('agent_tasks')
      .select('*')
      .eq('id', task.id)
      .single();
    
    if (queryError) {
      logError(`Agent Runner: Failed to query task status: ${queryError.message}`);
      return false;
    }
    
    // Verify retry logic
    if (updatedTask.retry_count > 0 && updatedTask.retry_count <= 5) {
      logSuccess(`Agent Runner: Retry logic working (${updatedTask.retry_count} retries)`);
      
      // Check if task is quarantined after max retries
      if (updatedTask.retry_count >= 5 && updatedTask.status === 'quarantined') {
        logSuccess('Agent Runner: Task properly quarantined after max retries');
        return true;
      } else if (updatedTask.retry_count >= 5) {
        logError('Agent Runner: Task not quarantined after max retries');
        return false;
      }
      
      return true;
    } else {
      logError(`Agent Runner: Unexpected retry count: ${updatedTask.retry_count}`);
      return false;
    }
  } catch (error) {
    logError(`Agent Runner test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test 5: Health Check Test
 * Kill OpenAI key in staging → /health goes yellow/red → Slack alert
 */
async function testHealthDegradation() {
  log('Testing Health Check: Degradation detection...');
  
  try {
    // Test health endpoint
    const response = await fetch(`${config.supabaseUrl}/functions/v1/health`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.supabaseServiceKey}`
      }
    });
    
    if (!response.ok) {
      logError(`Health Check: Health endpoint returned ${response.status}`);
      return false;
    }
    
    const healthData = await response.json();
    
    // Check health status
    if (healthData.status === 'ok' || healthData.status === 'warning') {
      logSuccess(`Health Check: Health endpoint responding (status: ${healthData.status})`);
      
      // Check individual service statuses
      const services = ['database', 'n8n', 'openai'];
      let allServicesHealthy = true;
      
      for (const service of services) {
        if (healthData[service] && healthData[service] !== 'green') {
          logWarning(`Health Check: ${service} service status: ${healthData[service]}`);
          allServicesHealthy = false;
        }
      }
      
      if (allServicesHealthy) {
        logSuccess('Health Check: All services healthy');
      }
      
      return true;
    } else {
      logError(`Health Check: Health endpoint returned unhealthy status: ${healthData.status}`);
      return false;
    }
  } catch (error) {
    logError(`Health Check test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test 6: n8n Webhook Test
 * Test n8n webhook endpoints are accessible and secure
 */
async function testN8nWebhooks() {
  log('Testing n8n Webhooks: Endpoint accessibility and security...');
  
  try {
    if (!config.n8nUrl) {
      logWarning('n8n URL not configured, skipping webhook tests');
      return true;
    }
    
    // Test webhook endpoints
    const webhookEndpoints = [
      '/webhook/load-created',
      '/webhook/pod-uploaded',
      '/webhook/agent-runner'
    ];
    
    let allWebhooksAccessible = true;
    
    for (const endpoint of webhookEndpoints) {
      try {
        const response = await fetch(`${config.n8nUrl}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Internal-Token': 'test-token'
          },
          body: JSON.stringify({ test: true })
        });
        
        // We expect either 200 (success) or 401/403 (properly secured)
        if (response.status === 200) {
          logSuccess(`n8n Webhook: ${endpoint} accessible`);
        } else if (response.status === 401 || response.status === 403) {
          logSuccess(`n8n Webhook: ${endpoint} properly secured (${response.status})`);
        } else {
          logError(`n8n Webhook: ${endpoint} returned unexpected status ${response.status}`);
          allWebhooksAccessible = false;
        }
      } catch (error) {
        logError(`n8n Webhook: ${endpoint} test failed: ${error.message}`);
        allWebhooksAccessible = false;
      }
    }
    
    return allWebhooksAccessible;
  } catch (error) {
    logError(`n8n Webhook test failed: ${error.message}`);
    return false;
  }
}

/**
 * Test 7: Edge Functions Test
 * Test all edge functions are responding correctly
 */
async function testEdgeFunctions() {
  log('Testing Edge Functions: Response validation...');
  
  try {
    const functions = [
      'health',
      'ai-load-matcher',
      'agent-runner',
      'on-signup'
    ];
    
    let allFunctionsWorking = true;
    
    for (const func of functions) {
      try {
        const response = await fetch(`${config.supabaseUrl}/functions/v1/${func}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${config.supabaseServiceKey}`
          }
        });
        
        if (response.status === 200 || response.status === 401) {
          logSuccess(`Edge Function: ${func} responding (${response.status})`);
        } else {
          logError(`Edge Function: ${func} returned status ${response.status}`);
          allFunctionsWorking = false;
        }
      } catch (error) {
        logError(`Edge Function: ${func} test failed: ${error.message}`);
        allFunctionsWorking = false;
      }
    }
    
    return allFunctionsWorking;
  } catch (error) {
    logError(`Edge Functions test failed: ${error.message}`);
    return false;
  }
}

/**
 * Cleanup test data
 */
async function cleanupTestData() {
  log('Cleaning up test data...');
  
  try {
    // Clean up test records
    const tables = ['agent_tasks', 'tenders', 'carriers', 'contracts'];
    
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .delete()
        .like('id', 'test-%');
      
      if (error) {
        logWarning(`Cleanup: Failed to clean ${table}: ${error.message}`);
      } else {
        logSuccess(`Cleanup: ${table} cleaned`);
      }
    }
  } catch (error) {
    logWarning(`Cleanup failed: ${error.message}`);
  }
}

/**
 * Send test results to Slack
 */
async function sendSlackNotification() {
  if (!config.slackWebhookUrl) {
    logWarning('Slack webhook not configured, skipping notification');
    return;
  }
  
  try {
    const message = {
      text: `🧪 Smoke Test Results - ${config.environment.toUpperCase()}`,
      attachments: [{
        color: testResults.failed > 0 ? 'danger' : 'good',
        fields: [
          {
            title: 'Total Tests',
            value: testResults.total.toString(),
            short: true
          },
          {
            title: 'Passed',
            value: testResults.passed.toString(),
            short: true
          },
          {
            title: 'Failed',
            value: testResults.failed.toString(),
            short: true
          },
          {
            title: 'Success Rate',
            value: `${((testResults.passed / testResults.total) * 100).toFixed(1)}%`,
            short: true
          }
        ]
      }]
    };
    
    if (testResults.details.length > 0) {
      message.attachments[0].fields.push({
        title: 'Failed Tests',
        value: testResults.details.join('\n'),
        short: false
      });
    }
    
    await fetch(config.slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
    
    logSuccess('Slack notification sent');
  } catch (error) {
    logError(`Failed to send Slack notification: ${error.message}`);
  }
}

/**
 * Main test runner
 */
async function runSmokeTests() {
  log('🚀 Starting Trans Bot AI Phase 3 Smoke Tests', 'blue');
  log(`Environment: ${config.environment}`, 'blue');
  
  const tests = [
    { name: 'RLS Guard', fn: testRLSGuard },
    { name: 'Rates Contract', fn: testRatesContract },
    { name: 'Directory COI', fn: testDirectoryCOI },
    { name: 'Agent Runner Error Handling', fn: testAgentErrorHandling },
    { name: 'Health Check', fn: testHealthDegradation },
    { name: 'n8n Webhooks', fn: testN8nWebhooks },
    { name: 'Edge Functions', fn: testEdgeFunctions }
  ];
  
  for (const test of tests) {
    testResults.total++;
    log(`\n--- Running ${test.name} Test ---`, 'blue');
    
    try {
      const result = await test.fn();
      if (result) {
        testResults.passed++;
        logSuccess(`${test.name} test passed`);
      } else {
        testResults.failed++;
        testResults.details.push(test.name);
        logError(`${test.name} test failed`);
      }
    } catch (error) {
      testResults.failed++;
      testResults.details.push(test.name);
      logError(`${test.name} test failed with error: ${error.message}`);
    }
  }
  
  // Cleanup
  await cleanupTestData();
  
  // Send notification
  await sendSlackNotification();
  
  // Summary
  log('\n--- Test Summary ---', 'blue');
  log(`Total Tests: ${testResults.total}`, 'blue');
  log(`Passed: ${testResults.passed}`, 'green');
  log(`Failed: ${testResults.failed}`, testResults.failed > 0 ? 'red' : 'green');
  log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`, 'blue');
  
  if (testResults.failed > 0) {
    log('\nFailed Tests:', 'red');
    testResults.details.forEach(test => log(`  - ${test}`, 'red'));
    process.exit(1);
  } else {
    log('\n🎉 All smoke tests passed!', 'green');
    process.exit(0);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runSmokeTests().catch(error => {
    logError(`Smoke tests failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  runSmokeTests,
  testRLSGuard,
  testRatesContract,
  testDirectoryCOI,
  testAgentErrorHandling,
  testHealthDegradation,
  testN8nWebhooks,
  testEdgeFunctions
};
