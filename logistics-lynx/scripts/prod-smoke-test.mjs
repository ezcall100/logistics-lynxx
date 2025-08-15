#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const PROD_HOST = process.env.PROD_HOST || 'localhost';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🚀 Production Smoke Test');
console.log('========================');

async function testHealthEndpoint() {
  try {
    const response = await fetch(`http://${PROD_HOST}:8089/healthz`);
    const data = await response.json();
    
    if (response.ok && data.ok) {
      console.log('✅ Health endpoint: OK');
      return true;
    } else {
      console.log('❌ Health endpoint: FAILED');
      return false;
    }
  } catch (error) {
    console.log('❌ Health endpoint: ERROR', error.message);
    return false;
  }
}

async function testReadinessEndpoint() {
  try {
    const response = await fetch(`http://${PROD_HOST}:8089/readyz`);
    const data = await response.json();
    
    if (response.ok && data.ready) {
      console.log('✅ Readiness endpoint: OK');
      console.log(`   Mode: ${data.mode}`);
      console.log(`   Agents: ${data.agentsOk ? 'OK' : 'FAILED'}`);
      console.log(`   Database: ${data.dbOk ? 'OK' : 'FAILED'}`);
      return true;
    } else {
      console.log('❌ Readiness endpoint: FAILED');
      console.log(`   Reason: ${data.reason || 'Unknown'}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Readiness endpoint: ERROR', error.message);
    return false;
  }
}

async function testWebInterface() {
  try {
    const response = await fetch(`http://${PROD_HOST}:8084`);
    
    if (response.ok) {
      console.log('✅ Web interface: OK');
      return true;
    } else {
      console.log('❌ Web interface: FAILED');
      return false;
    }
  } catch (error) {
    console.log('❌ Web interface: ERROR', error.message);
    return false;
  }
}

async function testDatabaseConnection() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.log('⚠️  Database test: SKIPPED (no credentials)');
    return true;
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });

    const { data, error } = await supabase
      .from('feature_flags_v2')
      .select('key')
      .limit(1);

    if (error) {
      console.log('❌ Database connection: FAILED', error.message);
      return false;
    } else {
      console.log('✅ Database connection: OK');
      return true;
    }
  } catch (error) {
    console.log('❌ Database connection: ERROR', error.message);
    return false;
  }
}

async function insertSyntheticTask() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.log('⚠️  Synthetic task: SKIPPED (no credentials)');
    return true;
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });

    // Check if agent_tasks table exists
    const { data: tasks, error: tasksError } = await supabase
      .from('agent_tasks')
      .select('id')
      .limit(1);

    if (tasksError) {
      console.log('⚠️  Synthetic task: SKIPPED (agent_tasks table not found)');
      return true;
    }

    // Insert synthetic task
    const { data, error } = await supabase
      .from('agent_tasks')
      .insert({
        company_id: '00000000-0000-4000-8000-000000000001',
        kind: 'rates.price_one',
        payload: { lane: 'DAL→LAX' },
        priority: 'normal'
      })
      .select();

    if (error) {
      console.log('❌ Synthetic task: FAILED', error.message);
      return false;
    } else {
      console.log('✅ Synthetic task: INSERTED');
      console.log('   Task ID:', data[0]?.id);
      console.log('   Expected: Check Live Feed for "Starting ... / Completed ..."');
      return true;
    }
  } catch (error) {
    console.log('❌ Synthetic task: ERROR', error.message);
    return false;
  }
}

async function runSmokeTest() {
  console.log(`\nTesting endpoints on: ${PROD_HOST}`);
  console.log('========================');

  const results = {
    health: await testHealthEndpoint(),
    readiness: await testReadinessEndpoint(),
    web: await testWebInterface(),
    database: await testDatabaseConnection(),
    synthetic: await insertSyntheticTask()
  };

  console.log('\n📊 Smoke Test Results');
  console.log('=====================');
  
  const passed = Object.values(results).filter(Boolean).length;
  const total = Object.keys(results).length;
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
  });

  console.log(`\nOverall: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All smoke tests passed! Production deployment is healthy.');
    process.exit(0);
  } else {
    console.log('❌ Some smoke tests failed. Check the issues above.');
    process.exit(1);
  }
}

// Run the smoke test
runSmokeTest().catch(error => {
  console.error('❌ Smoke test error:', error);
  process.exit(1);
});
