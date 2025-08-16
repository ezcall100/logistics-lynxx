#!/usr/bin/env node

/**
 * Basic Supabase Connection Test
 * This script tests basic Supabase functionality using the anon key
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('❌ Missing Supabase credentials!')
  process.exit(1)
}

// Create Supabase client with anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testBasicConnection() {
  console.log('🔍 Basic Supabase Connection Test')
  console.log('==================================\n')

  try {
    // Test basic connection
    console.log('📋 Testing basic connection...')
    const { data, error } = await supabase.from('agent_registry').select('count').limit(1)
    
    if (error) {
      console.log('❌ Connection failed:', error.message)
      return
    }
    
    console.log('✅ Basic connection successful!')
    console.log('✅ Agent registry table is accessible')
    
    // Test inserting a test agent
    console.log('\n📋 Testing agent registration...')
    const testAgent = {
      agent_id: 'test-agent-' + Date.now(),
      name: 'Test Agent',
      type: 'test',
      status: 'active',
      capabilities: ['test'],
      configuration: { test: true }
    }
    
    const { data: insertData, error: insertError } = await supabase
      .from('agent_registry')
      .insert(testAgent)
      .select()
    
    if (insertError) {
      console.log('❌ Agent registration failed:', insertError.message)
      return
    }
    
    console.log('✅ Agent registration successful!')
    console.log('✅ Test agent created:', insertData[0].agent_id)
    
    // Clean up test agent
    console.log('\n📋 Cleaning up test data...')
    const { error: deleteError } = await supabase
      .from('agent_registry')
      .delete()
      .eq('agent_id', testAgent.agent_id)
    
    if (deleteError) {
      console.log('⚠️  Cleanup failed:', deleteError.message)
    } else {
      console.log('✅ Test data cleaned up')
    }
    
    console.log('\n🎉 All tests passed!')
    console.log('✅ Supabase connection working')
    console.log('✅ Database tables accessible')
    console.log('✅ Agent operations working')
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

// Run the test
testBasicConnection().catch(console.error)
