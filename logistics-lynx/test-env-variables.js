#!/usr/bin/env node

/**
 * Simple Environment Variables Test
 * This script tests if environment variables are loaded correctly
 */

import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

console.log('🔍 Environment Variables Test')
console.log('=============================\n')

// Test Supabase variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('📋 Supabase Configuration:')
console.log(`SUPABASE_URL: ${supabaseUrl ? '✅ Set' : '❌ Not set'}`)
if (supabaseUrl) {
  console.log(`  URL: ${supabaseUrl.substring(0, 30)}...`)
}

console.log(`SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✅ Set' : '❌ Not set'}`)
if (supabaseAnonKey) {
  console.log(`  Key: ${supabaseAnonKey.substring(0, 20)}...`)
}

console.log(`SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey ? '✅ Set' : '❌ Not set'}`)
if (supabaseServiceKey) {
  console.log(`  Key: ${supabaseServiceKey.substring(0, 20)}...`)
}

// Test autonomous system variables
console.log('\n🤖 Autonomous System Configuration:')
console.log(`AUTONOMY_MODE: ${process.env.AUTONOMY_MODE || '❌ Not set'}`)
console.log(`AGENTS_AUTONOMOUS_ENABLED: ${process.env.AGENTS_AUTONOMOUS_ENABLED || '❌ Not set'}`)
console.log(`AUTONOMY_EMERGENCY_STOP: ${process.env.AUTONOMY_EMERGENCY_STOP || '❌ Not set'}`)

// Test website configuration
console.log('\n🌐 Website Configuration:')
console.log(`VITE_APP_TITLE: ${process.env.VITE_APP_TITLE || '❌ Not set'}`)
console.log(`VITE_APP_VERSION: ${process.env.VITE_APP_VERSION || '❌ Not set'}`)

// Test portal configuration
console.log('\n🚪 Portal Configuration:')
console.log(`PORTAL_SUPER_ADMIN_ENABLED: ${process.env.PORTAL_SUPER_ADMIN_ENABLED || '❌ Not set'}`)
console.log(`PORTAL_ADMIN_ENABLED: ${process.env.PORTAL_ADMIN_ENABLED || '❌ Not set'}`)
console.log(`PORTAL_BROKER_ENABLED: ${process.env.PORTAL_BROKER_ENABLED || '❌ Not set'}`)

console.log('\n📊 Summary:')
console.log('================================')
console.log(`Total environment variables loaded: ${Object.keys(process.env).length}`)
console.log(`Supabase configured: ${supabaseUrl && supabaseAnonKey && supabaseServiceKey ? '✅ Yes' : '❌ No'}`)
console.log(`Autonomous system configured: ${process.env.AUTONOMY_MODE && process.env.AGENTS_AUTONOMOUS_ENABLED ? '✅ Yes' : '❌ No'}`)

if (supabaseUrl && supabaseAnonKey && supabaseServiceKey) {
  console.log('\n🎉 Environment variables are properly configured!')
  console.log('Next step: Set up Supabase database tables')
  console.log('Run: npm run setup:supabase-tables')
} else {
  console.log('\n⚠️  Some environment variables are missing')
  console.log('Please check your .env file')
}
