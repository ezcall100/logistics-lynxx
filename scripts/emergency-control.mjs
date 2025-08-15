#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

const [,, action] = process.argv;

if (!action) {
  console.error('Usage: node emergency-control.mjs <stop|resume|degrade|status>');
  process.exit(1);
}

const PROD_HOST = process.env.PROD_HOST;
const SUPABASE_DB_URL = process.env.SUPABASE_DB_URL;

if (!PROD_HOST || !SUPABASE_DB_URL) {
  console.error('Missing PROD_HOST or SUPABASE_DB_URL environment variables');
  process.exit(1);
}

async function executeSQL(sql) {
  try {
    execSync(`psql "${SUPABASE_DB_URL}" -c "${sql}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error('SQL execution failed:', error.message);
    process.exit(1);
  }
}

async function checkHealth() {
  try {
    const health = execSync(`curl -fsS "http://${PROD_HOST}/healthz"`, { encoding: 'utf8' });
    const ready = execSync(`curl -fsS "http://${PROD_HOST}/readyz"`, { encoding: 'utf8' });
    console.log('Health:', health);
    console.log('Ready:', ready);
  } catch (error) {
    console.error('Health check failed:', error.message);
  }
}

switch (action) {
  case 'stop':
    console.log('🚨 EMERGENCY STOP: Halting all autonomous systems...');
    await executeSQL(`
      UPDATE feature_flags_v2 
      SET value = 'false' 
      WHERE key IN ('agents.autonomousEnabled', 'autonomy.mode') 
      AND scope = 'global';
      
      UPDATE feature_flags_v2 
      SET value = 'true' 
      WHERE key = 'autonomy.emergencyStop' 
      AND scope = 'global';
    `);
    console.log('✅ Emergency stop activated');
    await checkHealth();
    break;

  case 'resume':
    console.log('🟢 RESUMING: Restarting autonomous systems...');
    await executeSQL(`
      UPDATE feature_flags_v2 
      SET value = 'true' 
      WHERE key = 'agents.autonomousEnabled' 
      AND scope = 'global';
      
      UPDATE feature_flags_v2 
      SET value = 'FULL' 
      WHERE key = 'autonomy.mode' 
      AND scope = 'global';
      
      UPDATE feature_flags_v2 
      SET value = 'false' 
      WHERE key = 'autonomy.emergencyStop' 
      AND scope = 'global';
    `);
    console.log('✅ Autonomous systems resumed');
    await checkHealth();
    break;

  case 'degrade':
    console.log('⚠️ DEGRADED MODE: Reducing autonomous capabilities...');
    await executeSQL(`
      UPDATE feature_flags_v2 
      SET value = 'DEGRADED' 
      WHERE key = 'autonomy.mode' 
      AND scope = 'global';
      
      UPDATE feature_flags_v2 
      SET value = 'false' 
      WHERE key = 'autonomy.emergencyStop' 
      AND scope = 'global';
    `);
    console.log('✅ Degraded mode activated');
    await checkHealth();
    break;

  case 'status':
    console.log('📊 SYSTEM STATUS:');
    await executeSQL(`
      SELECT key, value, updated_at 
      FROM feature_flags_v2 
      WHERE key IN ('agents.autonomousEnabled', 'autonomy.mode', 'autonomy.emergencyStop') 
      AND scope = 'global'
      ORDER BY key;
    `);
    await checkHealth();
    break;

  default:
    console.error('Invalid action. Use: stop, resume, degrade, or status');
    process.exit(1);
}
