#!/usr/bin/env node

/**
 * Simple Test Script for Autonomous Agents
 * This script checks basic setup without requiring Supabase credentials
 */

import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

console.log('🚀 Simple Autonomous Agents Test')
console.log('================================')

// Check environment variables
console.log('\n📋 Environment Variables:')
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Not set')
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set')
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Not set')

// Check if files exist
import fs from 'fs'
import path from 'path'

console.log('\n📁 File System Check:')
const filesToCheck = [
  'src/lib/supabase-agents.ts',
  'src/agents/BaseAgent.ts',
  'src/agents/TMSDecisionAgent.ts',
  'src/agents/AgentManager.ts',
  'src/lib/agent-integration.ts',
  'src/components/autonomous/AgentDashboard.tsx',
  'supabase/migrations/20241201000003_agent_tables.sql'
]

filesToCheck.forEach(file => {
  const exists = fs.existsSync(file)
  console.log(`${file}: ${exists ? '✅ Exists' : '❌ Missing'}`)
})

// Check package.json scripts
console.log('\n📦 Package.json Scripts:')
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const scripts = packageJson.scripts || {}
  
  const requiredScripts = ['test:autonomous', 'dev', 'build']
  requiredScripts.forEach(script => {
    const exists = scripts[script] ? '✅ Available' : '❌ Missing'
    console.log(`${script}: ${exists}`)
  })
} catch (error) {
  console.log('❌ Error reading package.json:', error.message)
}

// Check if Supabase is configured
console.log('\n🔧 Supabase Configuration:')
if (process.env.SUPABASE_URL && process.env.SUPABASE_URL !== 'https://your-project.supabase.co') {
  console.log('✅ Supabase URL is configured')
} else {
  console.log('⚠️  Supabase URL needs to be configured')
}

if (process.env.SUPABASE_ANON_KEY && process.env.SUPABASE_ANON_KEY !== 'your-anon-key') {
  console.log('✅ Supabase Anon Key is configured')
} else {
  console.log('⚠️  Supabase Anon Key needs to be configured')
}

if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY !== 'your-service-role-key') {
  console.log('✅ Supabase Service Role Key is configured')
} else {
  console.log('⚠️  Supabase Service Role Key needs to be configured')
}

console.log('\n📊 Summary:')
console.log('================================')

const hasEnvFile = fs.existsSync('.env')
const hasSupabaseConfig = process.env.SUPABASE_URL && 
                          process.env.SUPABASE_URL !== 'https://your-project.supabase.co'

console.log(`Environment file: ${hasEnvFile ? '✅' : '❌'}`)
console.log(`Supabase configured: ${hasSupabaseConfig ? '✅' : '❌'}`)

if (hasSupabaseConfig) {
  console.log('\n🎉 Ready to test with Supabase!')
  console.log('Run: npm run test:autonomous')
} else {
  console.log('\n⚠️  Please configure your Supabase credentials in .env file')
  console.log('Then run: npm run test:autonomous')
}

console.log('\n📖 For setup instructions, see: AUTONOMOUS_AGENTS_TEST_GUIDE.md')
