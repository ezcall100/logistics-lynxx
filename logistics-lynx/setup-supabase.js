#!/usr/bin/env node
/* eslint-env node */
/* eslint-disable no-undef, no-console */

/**
 * Supabase Setup Helper Script
 * This script helps you configure your Supabase credentials
 */

import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

console.log('🚀 Supabase Setup Helper')
console.log('========================\n')

async function setupSupabase() {
  console.log('Choose your Supabase setup option:\n')
  console.log('1. 🌐 Supabase Cloud (Recommended - Free tier)')
  console.log('2. 🛠️ Supabase CLI (Local development)')
  console.log('3. 🗄️ Direct PostgreSQL (Advanced)')
  console.log('4. 📖 View setup guide only\n')

  const choice = await question('Enter your choice (1-4): ')

  switch (choice) {
    case '1':
      await setupSupabaseCloud()
      break
    case '2':
      await setupSupabaseCLI()
      break
    case '3':
      await setupDirectPostgreSQL()
      break
    case '4':
      showSetupGuide()
      break
    default:
      console.log('❌ Invalid choice. Please run the script again.')
  }

  rl.close()
}

async function setupSupabaseCloud() {
  console.log('\n🌐 Supabase Cloud Setup')
  console.log('=======================\n')
  
  console.log('📋 Steps to follow:')
  console.log('1. Go to: https://supabase.com/dashboard')
  console.log('2. Sign up/Login with GitHub, GitLab, or Google')
  console.log('3. Create a new project named "tms-logistics-lynx"')
  console.log('4. Get your credentials from Settings → API\n')

  const url = await question('Enter your Supabase Project URL (e.g., https://abc123.supabase.co): ')
  const anonKey = await question('Enter your anon public key: ')
  const serviceKey = await question('Enter your service_role key: ')

  if (url && anonKey && serviceKey) {
    await updateEnvFile(url, anonKey, serviceKey)
    console.log('\n✅ Credentials saved to .env file!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to Supabase Dashboard → SQL Editor')
    console.log('2. Copy and paste the SQL from: supabase/migrations/20241201000003_agent_tables.sql')
    console.log('3. Click "Run" to create the agent tables')
    console.log('4. Run: npm run test:autonomous')
  } else {
    console.log('\n❌ Please provide all credentials.')
  }
}

async function setupSupabaseCLI() {
  console.log('\n🛠️ Supabase CLI Setup')
  console.log('=====================\n')
  
  console.log('📋 Steps to follow:')
  console.log('1. Install Supabase CLI: npm install -g supabase')
  console.log('2. Initialize: supabase init')
  console.log('3. Start: supabase start')
  console.log('4. Copy the credentials shown after startup\n')

  const url = await question('Enter your local Supabase URL (e.g., http://127.0.0.1:54321): ')
  const anonKey = await question('Enter your local anon key: ')
  const serviceKey = await question('Enter your local service_role key: ')

  if (url && anonKey && serviceKey) {
    await updateEnvFile(url, anonKey, serviceKey)
    console.log('\n✅ Credentials saved to .env file!')
    console.log('\n📋 Next steps:')
    console.log('1. Run: supabase db push')
    console.log('2. Run: npm run test:autonomous')
  } else {
    console.log('\n❌ Please provide all credentials.')
  }
}

async function setupDirectPostgreSQL() {
  console.log('\n🗄️ Direct PostgreSQL Setup')
  console.log('==========================\n')
  
  console.log('📋 Steps to follow:')
  console.log('1. Create a PostgreSQL database named "tms_logistics_lynx"')
  console.log('2. Run the SQL from: supabase/migrations/20241201000003_agent_tables.sql')
  console.log('3. Generate your own JWT keys\n')

  const url = await question('Enter your PostgreSQL connection URL: ')
  const anonKey = await question('Enter your custom anon key: ')
  const serviceKey = await question('Enter your custom service_role key: ')

  if (url && anonKey && serviceKey) {
    await updateEnvFile(url, anonKey, serviceKey)
    console.log('\n✅ Credentials saved to .env file!')
    console.log('\n📋 Next steps:')
    console.log('1. Run: npm run test:autonomous')
  } else {
    console.log('\n❌ Please provide all credentials.')
  }
}

function showSetupGuide() {
  console.log('\n📖 Setup Guide')
  console.log('==============\n')
  console.log('For detailed instructions, see: SUPABASE_SETUP_GUIDE.md')
  console.log('\nQuick reference:')
  console.log('- Supabase Cloud: https://supabase.com/dashboard')
  console.log('- Supabase CLI: https://supabase.com/docs/guides/cli')
  console.log('- Migration file: supabase/migrations/20241201000003_agent_tables.sql')
}

async function updateEnvFile(url, anonKey, serviceKey) {
  try {
    let envContent = fs.readFileSync('.env', 'utf8')
    
    // Replace the placeholder values
    envContent = envContent.replace(
      /SUPABASE_URL=.*/,
      `SUPABASE_URL=${url}`
    )
    envContent = envContent.replace(
      /SUPABASE_ANON_KEY=.*/,
      `SUPABASE_ANON_KEY=${anonKey}`
    )
    envContent = envContent.replace(
      /SUPABASE_SERVICE_ROLE_KEY=.*/,
      `SUPABASE_SERVICE_ROLE_KEY=${serviceKey}`
    )
    
    fs.writeFileSync('.env', envContent)
    return true
  } catch (error) {
    console.error('❌ Error updating .env file:', error.message)
    return false
  }
}

// Run the setup
setupSupabase().catch(console.error)
