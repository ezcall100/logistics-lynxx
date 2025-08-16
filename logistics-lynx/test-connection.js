#!/usr/bin/env node

/**
 * Quick Supabase Connection Test
 */

import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config()

console.log('🔍 Testing Supabase Connection...')
console.log('================================')

// Check environment variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('📋 Environment Variables:')
console.log('SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Not set')
console.log('SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Not set')
console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Not set')

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ Missing required Supabase credentials')
  process.exit(1)
}

// Test connection
async function testConnection() {
  try {
    console.log('\n🔗 Testing Supabase connection...')
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Test basic connection
    const { data, error } = await supabase.from('agent_registry').select('count').limit(1)
    
    if (error) {
      console.log('❌ Connection failed:', error.message)
      
      // Check if tables exist
      if (error.message.includes('relation "agent_registry" does not exist')) {
        console.log('\n⚠️  Agent tables not found. You need to run the database migration.')
        console.log('📋 To fix this:')
        console.log('1. Go to Supabase Dashboard → SQL Editor')
        console.log('2. Copy and paste the SQL from: supabase/migrations/20241201000003_agent_tables.sql')
        console.log('3. Click "Run" to create the agent tables')
      }
    } else {
      console.log('✅ Supabase connection successful!')
      console.log('✅ Agent tables exist and are accessible')
    }
    
    // Test service role connection
    if (supabaseServiceKey) {
      console.log('\n🔐 Testing service role connection...')
      
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
      
      // Test admin operations
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('agent_registry')
        .select('*')
        .limit(1)
      
      if (adminError) {
        console.log('❌ Service role connection failed:', adminError.message)
      } else {
        console.log('✅ Service role connection successful!')
        console.log('✅ Admin operations are working')
      }
    }
    
  } catch (error) {
    console.log('❌ Connection error:', error.message)
  }
}

testConnection()
