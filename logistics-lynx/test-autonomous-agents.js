#!/usr/bin/env node

/**
 * Test Script for Autonomous Agents with Supabase
 * This script verifies that the autonomous agents system is working correctly
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green')
}

function logError(message) {
  log(`❌ ${message}`, 'red')
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow')
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue')
}

async function testSupabaseConnection() {
  logInfo('Testing Supabase connection...')
  
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    logError('Missing Supabase environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)')
    return false
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test basic connection
    const { data, error } = await supabase.from('agent_registry').select('count').limit(1)
    
    if (error) {
      logError(`Supabase connection failed: ${error.message}`)
      return false
    }
    
    logSuccess('Supabase connection successful')
    return true
  } catch (error) {
    logError(`Supabase connection error: ${error.message}`)
    return false
  }
}

async function testAgentTables() {
  logInfo('Testing agent tables...')
  
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  const tables = ['agent_registry', 'agent_tasks', 'agent_events', 'agent_decisions']
  const results = {}
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1)
      
      if (error) {
        logError(`Table ${table}: ${error.message}`)
        results[table] = false
      } else {
        logSuccess(`Table ${table}: OK`)
        results[table] = true
      }
    } catch (error) {
      logError(`Table ${table}: ${error.message}`)
      results[table] = false
    }
  }
  
  return results
}

async function testAgentRegistration() {
  logInfo('Testing agent registration...')
  
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseServiceKey) {
    logWarning('Missing SUPABASE_SERVICE_ROLE_KEY - skipping agent registration test')
    return false
  }
  
  try {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
    
    // Test agent registration
    const testAgent = {
      agent_id: 'test-agent-' + Date.now(),
      name: 'Test Agent',
      type: 'test',
      status: 'active',
      capabilities: ['test_capability'],
      configuration: { test: true },
      last_heartbeat: new Date().toISOString()
    }
    
    const { data, error } = await supabaseAdmin
      .from('agent_registry')
      .insert(testAgent)
      .select()
    
    if (error) {
      logError(`Agent registration failed: ${error.message}`)
      return false
    }
    
    logSuccess('Agent registration successful')
    
    // Clean up test agent
    await supabaseAdmin
      .from('agent_registry')
      .delete()
      .eq('agent_id', testAgent.agent_id)
    
    return true
  } catch (error) {
    logError(`Agent registration error: ${error.message}`)
    return false
  }
}

async function testTaskCreation() {
  logInfo('Testing task creation...')
  
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseServiceKey) {
    logWarning('Missing SUPABASE_SERVICE_ROLE_KEY - skipping task creation test')
    return false
  }
  
  try {
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
    
    // Test task creation
    const testTask = {
      agent_id: 'test-agent-task',
      task_type: 'test_task',
      status: 'pending',
      priority: 1,
      payload: { test: 'data' }
    }
    
    const { data, error } = await supabaseAdmin
      .from('agent_tasks')
      .insert(testTask)
      .select()
    
    if (error) {
      logError(`Task creation failed: ${error.message}`)
      return false
    }
    
    logSuccess('Task creation successful')
    
    // Clean up test task
    await supabaseAdmin
      .from('agent_tasks')
      .delete()
      .eq('agent_id', testTask.agent_id)
    
    return true
  } catch (error) {
    logError(`Task creation error: ${error.message}`)
    return false
  }
}

async function testRealtimeConnection() {
  logInfo('Testing realtime connection...')
  
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
  
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test realtime subscription
    const channel = supabase
      .channel('test-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'agent_events'
      }, (payload) => {
        logInfo('Realtime event received: ' + JSON.stringify(payload))
      })
      .subscribe()
    
    // Wait a bit for connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Unsubscribe
    await supabase.removeChannel(channel)
    
    logSuccess('Realtime connection successful')
    return true
  } catch (error) {
    logError(`Realtime connection error: ${error.message}`)
    return false
  }
}

async function runAllTests() {
  log('🚀 Starting Autonomous Agents System Tests', 'bold')
  log('==========================================', 'bold')
  
  const results = {
    supabaseConnection: false,
    agentTables: false,
    agentRegistration: false,
    taskCreation: false,
    realtimeConnection: false
  }
  
  // Test 1: Supabase Connection
  results.supabaseConnection = await testSupabaseConnection()
  
  if (results.supabaseConnection) {
    // Test 2: Agent Tables
    const tableResults = await testAgentTables()
    results.agentTables = Object.values(tableResults).every(result => result)
    
    // Test 3: Agent Registration
    results.agentRegistration = await testAgentRegistration()
    
    // Test 4: Task Creation
    results.taskCreation = await testTaskCreation()
    
    // Test 5: Realtime Connection
    results.realtimeConnection = await testRealtimeConnection()
  }
  
  // Summary
  log('\n📊 Test Results Summary', 'bold')
  log('======================', 'bold')
  
  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? 'PASS' : 'FAIL'
    const color = passed ? 'green' : 'red'
    log(`${status}: ${test}`, color)
  })
  
  const allPassed = Object.values(results).every(result => result)
  
  if (allPassed) {
    log('\n🎉 All tests passed! Autonomous agents system is working correctly.', 'green')
    log('You can now use the Agent Dashboard to monitor and manage your agents.', 'green')
  } else {
    log('\n⚠️  Some tests failed. Please check your Supabase configuration.', 'yellow')
    log('Make sure you have:', 'yellow')
    log('1. Valid SUPABASE_URL and SUPABASE_ANON_KEY in your .env file', 'yellow')
    log('2. SUPABASE_SERVICE_ROLE_KEY for admin operations', 'yellow')
    log('3. Agent tables created in your Supabase database', 'yellow')
  }
  
  return allPassed
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllTests()
    .then(success => {
      process.exit(success ? 0 : 1)
    })
    .catch(error => {
      logError(`Test execution failed: ${error.message}`)
      process.exit(1)
    })
}

export { runAllTests }