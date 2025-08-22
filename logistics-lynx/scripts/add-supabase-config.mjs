#!/usr/bin/env node

/**
 * Add Supabase Configuration Script
 * 
 * This script adds the missing Supabase configuration to the .env file.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');

console.log('🔧 Adding Supabase configuration to .env file...\n');

// Read existing .env content
let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  console.log('📁 Found existing .env file');
}

// Check if Supabase configuration already exists
if (envContent.includes('SUPABASE_URL=')) {
  console.log('✅ Supabase URL already configured');
} else {
  // Add Supabase configuration at the beginning
  const supabaseConfig = `# Supabase Configuration
SUPABASE_URL=https://imcyiofodlnbomemvqto.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

`;
  
  envContent = supabaseConfig + envContent;
  console.log('✅ Added Supabase configuration');
}

// Check if service role key is configured
if (envContent.includes('SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here')) {
  console.log('⚠️  Service role key needs to be configured');
  console.log('   Please replace "your-service-role-key-here" with your actual service role key');
} else if (envContent.includes('SUPABASE_SERVICE_ROLE_KEY=')) {
  console.log('✅ Service role key is configured');
} else {
  console.log('❌ Service role key is missing');
}

// Write the updated .env file
try {
  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ .env file updated successfully!');
  
  console.log('\n📋 Next steps:');
  console.log('1. Get your Supabase service role key from:');
  console.log('   https://supabase.com/dashboard/project/imcyiofodlnbomemvqto/settings/api');
  console.log('2. Replace "your-service-role-key-here" in the .env file with your actual key');
  console.log('3. Run: node scripts/grant-mcp-permissions.mjs');
  
} catch (error) {
  console.error('❌ Failed to update .env file:', error.message);
}

console.log('\n🔗 Your Supabase project: https://imcyiofodlnbomemvqto.supabase.co');
