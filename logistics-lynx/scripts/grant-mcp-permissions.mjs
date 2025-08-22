#!/usr/bin/env node

/**
 * Grant MCP Permissions Script
 * 
 * This script grants all necessary MCP (Master Control Program) permissions
 * to the super_admin role to ensure full authority over the MCP system.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Use existing environment variable names
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - SUPABASE_URL (or VITE_SUPABASE_URL)');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('\n💡 To fix this, create a .env file in the logistics-lynx directory with:');
  console.error('   SUPABASE_URL=https://your-project.supabase.co');
  console.error('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// MCP Permissions to grant
const MCP_PERMISSIONS = [
  'mcp.access',
  'mcp.configuration.manage',
  'mcp.configuration.read',
  'mcp.configuration.write',
  'mcp.deployment.manage',
  'mcp.deployment.read',
  'mcp.deployment.write',
  'mcp.logs.manage',
  'mcp.logs.read',
  'mcp.logs.write',
  'mcp.alerts.manage',
  'mcp.alerts.read',
  'mcp.alerts.write',
  'mcp.agents.manage',
  'mcp.agents.read',
  'mcp.agents.write',
  'mcp.system.monitor',
  'mcp.security.manage',
  'mcp.security.read',
  'mcp.security.write',
  'mcp.performance.manage',
  'mcp.performance.read',
  'mcp.performance.write',
  'mcp.backup.manage',
  'mcp.backup.read',
  'mcp.backup.write',
  'mcp.api.manage',
  'mcp.api.read',
  'mcp.api.write',
  'mcp.emergency.control',
  'mcp.full.authority'
];

async function grantMCPPermissions() {
  console.log('🚀 Granting MCP Permissions to Super Admin...\n');
  console.log(`🔗 Using Supabase URL: ${supabaseUrl}\n`);

  try {
    // 1. Ensure all MCP permissions exist in the permissions table
    console.log('📋 Adding MCP permissions to permissions table...');
    
    for (const permissionKey of MCP_PERMISSIONS) {
      const { error } = await supabase
        .from('permissions')
        .upsert({
          key: permissionKey,
          resource: 'mcp',
          action: permissionKey.includes('.manage') || permissionKey.includes('.control') || permissionKey.includes('.authority') ? 'manage' : 
                 permissionKey.includes('.write') ? 'write' : 'read',
          description: `MCP permission: ${permissionKey}`
        }, {
          onConflict: 'key'
        });

      if (error) {
        console.error(`❌ Failed to add permission ${permissionKey}:`, error.message);
      } else {
        console.log(`✅ Added permission: ${permissionKey}`);
      }
    }

    // 2. Grant all MCP permissions to super_admin role
    console.log('\n🔐 Granting MCP permissions to super_admin role...');
    
    for (const permissionKey of MCP_PERMISSIONS) {
      const { error } = await supabase
        .from('role_permissions')
        .upsert({
          role_key: 'super_admin',
          permission_key: permissionKey
        }, {
          onConflict: 'role_key,permission_key'
        });

      if (error) {
        console.error(`❌ Failed to grant permission ${permissionKey} to super_admin:`, error.message);
      } else {
        console.log(`✅ Granted ${permissionKey} to super_admin`);
      }
    }

    // 3. Verify the permissions were granted
    console.log('\n🔍 Verifying MCP permissions...');
    
    const { data: permissions, error: verifyError } = await supabase
      .from('role_permissions')
      .select(`
        permission_key,
        permissions!inner(key, resource, action, description)
      `)
      .eq('role_key', 'super_admin')
      .like('permission_key', 'mcp.%');

    if (verifyError) {
      console.error('❌ Failed to verify permissions:', verifyError.message);
    } else {
      console.log(`✅ Verified ${permissions?.length || 0} MCP permissions granted to super_admin`);
      
      if (permissions && permissions.length > 0) {
        console.log('\n📋 Granted MCP Permissions:');
        permissions.forEach(p => {
          console.log(`   - ${p.permission_key} (${p.permissions.action})`);
        });
      }
    }

    console.log('\n🎉 MCP Permissions granted successfully!');
    console.log('   The super_admin role now has full authority over the MCP system.');
    console.log('   You can now access all MCP pages and functionality.');

  } catch (error) {
    console.error('❌ Error granting MCP permissions:', error);
    process.exit(1);
  }
}

// Run the script
grantMCPPermissions().then(() => {
  console.log('\n✨ Script completed successfully!');
  process.exit(0);
}).catch((error) => {
  console.error('\n💥 Script failed:', error);
  process.exit(1);
});
