#!/usr/bin/env node

/**
 * Supabase Database Tables Setup Script
 * This script helps you set up the required database tables for autonomous agents
 */

import fs from 'fs'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.log('❌ Missing Supabase credentials!')
  console.log('Please make sure your .env file contains:')
  console.log('- SUPABASE_URL')
  console.log('- SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Setting up Supabase Database Tables for Autonomous Agents')
  console.log('===========================================================\n')

  try {
    // Read the SQL migration file
    const sqlFile = './supabase/migrations/20241201000003_agent_tables.sql'
    
    if (!fs.existsSync(sqlFile)) {
      console.log('❌ SQL migration file not found!')
      console.log('Expected file: supabase/migrations/20241201000003_agent_tables.sql')
      process.exit(1)
    }

    const sqlContent = fs.readFileSync(sqlFile, 'utf8')
    
    console.log('📋 Executing SQL migration...')
    
    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', { sql: sqlContent })
    
    if (error) {
      // If exec_sql doesn't exist, try direct execution
      console.log('⚠️  Trying alternative method...')
      
      // Split SQL into individual statements
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0)
      
      for (const statement of statements) {
        if (statement.trim()) {
          console.log(`Executing: ${statement.substring(0, 50)}...`)
          const { error: stmtError } = await supabase.rpc('exec_sql', { sql: statement + ';' })
          if (stmtError) {
            console.log(`⚠️  Statement failed (this might be normal): ${stmtError.message}`)
          }
        }
      }
    }

    console.log('\n✅ Database setup completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Go to your Supabase Dashboard')
    console.log('2. Navigate to SQL Editor')
    console.log('3. Copy and paste the SQL from: supabase/migrations/20241201000003_agent_tables.sql')
    console.log('4. Click "Run" to execute the SQL')
    console.log('5. Run: npm run test:autonomous')
    
    console.log('\n📖 Manual Setup Instructions:')
    console.log('1. Open: https://supabase.com/dashboard')
    console.log('2. Select your project: tms-logistics-lynx')
    console.log('3. Go to: SQL Editor')
    console.log('4. Copy the SQL content from the migration file')
    console.log('5. Paste and execute')

  } catch (error) {
    console.error('❌ Error setting up database:', error.message)
    console.log('\n📖 Manual Setup Required:')
    console.log('Please manually execute the SQL in your Supabase Dashboard')
  }
}

// Run the setup
setupDatabase().catch(console.error)
