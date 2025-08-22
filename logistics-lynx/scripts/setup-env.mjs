#!/usr/bin/env node

/**
 * Environment Setup Script
 * 
 * This script helps you set up the required environment variables
 * for the MCP permissions script.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');

console.log('🔧 Setting up environment variables for MCP permissions...\n');

// Check if .env file already exists
if (fs.existsSync(envPath)) {
  console.log('📁 .env file already exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('SUPABASE_URL') && envContent.includes('SUPABASE_SERVICE_ROLE_KEY')) {
    console.log('✅ Environment variables are already configured');
    console.log('   You can now run: node scripts/grant-mcp-permissions.mjs');
  } else {
    console.log('⚠️  .env file exists but missing required variables');
    console.log('   Please add the following to your .env file:');
    console.log('   SUPABASE_URL=https://imcyiofodlnbomemvqto.supabase.co');
    console.log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  }
} else {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Supabase Configuration
SUPABASE_URL=https://imcyiofodlnbomemvqto.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Development Configuration
NODE_ENV=development
LOG_LEVEL=info

# MCP System Configuration
MCP_ENABLED=true
MCP_FULL_AUTHORITY=true
`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Edit the .env file and replace "your-service-role-key-here" with your actual service role key');
    console.log('2. Run: node scripts/grant-mcp-permissions.mjs');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
    console.log('\n💡 Manual setup:');
    console.log('1. Create a .env file in the logistics-lynx directory');
    console.log('2. Add the following content:');
    console.log('   SUPABASE_URL=https://imcyiofodlnbomemvqto.supabase.co');
    console.log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  }
}

console.log('\n🔗 Your Supabase project URL: https://imcyiofodlnbomemvqto.supabase.co');
console.log('   (Based on your supabase/config.toml project_id)');
