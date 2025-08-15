#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }
});

async function emergencyStop() {
  try {
    const { data, error } = await supabase
      .from('feature_flags_v2')
      .update({ value: true })
      .eq('key', 'autonomy.emergencyStop')
      .eq('scope', 'global')
      .select();

    if (error) {
      console.error('❌ Emergency stop failed:', error.message);
      return false;
    }

    console.log('🛑 Emergency stop activated');
    console.log('   All autonomous operations halted');
    console.log('   Use "npm run emergency:resume" to resume');
    return true;
  } catch (error) {
    console.error('❌ Emergency stop error:', error.message);
    return false;
  }
}

async function emergencyResume() {
  try {
    const { data, error } = await supabase
      .from('feature_flags_v2')
      .update({ value: false })
      .eq('key', 'autonomy.emergencyStop')
      .eq('scope', 'global')
      .select();

    if (error) {
      console.error('❌ Emergency resume failed:', error.message);
      return false;
    }

    console.log('✅ Emergency stop deactivated');
    console.log('   Autonomous operations resumed');
    return true;
  } catch (error) {
    console.error('❌ Emergency resume error:', error.message);
    return false;
  }
}

async function degradePerformance() {
  try {
    const updates = [
      { key: 'agents.maxConcurrency', value: 10 },
      { key: 'budget.replay.per5m', value: 1 }
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('feature_flags_v2')
        .update({ value: update.value })
        .eq('key', update.key)
        .eq('scope', 'global');

      if (error) {
        console.error(`❌ Failed to update ${update.key}:`, error.message);
        return false;
      }
    }

    console.log('⚠️  Performance degraded');
    console.log('   Max concurrency: 10');
    console.log('   Replay rate: 1 per 5 minutes');
    console.log('   Use "npm run emergency:resume" to restore normal performance');
    return true;
  } catch (error) {
    console.error('❌ Performance degradation error:', error.message);
    return false;
  }
}

async function checkStatus() {
  try {
    const { data, error } = await supabase
      .from('feature_flags_v2')
      .select('key, value')
      .in('key', ['autonomy.emergencyStop', 'agents.maxConcurrency', 'budget.replay.per5m'])
      .eq('scope', 'global');

    if (error) {
      console.error('❌ Status check failed:', error.message);
      return false;
    }

    console.log('📊 System Status');
    console.log('===============');
    
    data.forEach(flag => {
      const status = flag.key === 'autonomy.emergencyStop' 
        ? (flag.value ? '🛑 STOPPED' : '✅ RUNNING')
        : `Value: ${flag.value}`;
      console.log(`${flag.key}: ${status}`);
    });

    return true;
  } catch (error) {
    console.error('❌ Status check error:', error.message);
    return false;
  }
}

// Parse command line arguments
const command = process.argv[2];

switch (command) {
  case 'stop':
    emergencyStop().then(success => process.exit(success ? 0 : 1));
    break;
  case 'resume':
    emergencyResume().then(success => process.exit(success ? 0 : 1));
    break;
  case 'degrade':
    degradePerformance().then(success => process.exit(success ? 0 : 1));
    break;
  case 'status':
    checkStatus().then(success => process.exit(success ? 0 : 1));
    break;
  default:
    console.log('🚨 Emergency Control Script');
    console.log('==========================');
    console.log('');
    console.log('Usage:');
    console.log('  npm run emergency:stop     - Stop all autonomous operations');
    console.log('  npm run emergency:resume   - Resume autonomous operations');
    console.log('  npm run emergency:degrade  - Reduce performance (buy time)');
    console.log('  npm run emergency:status   - Check current status');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/emergency-control.mjs stop');
    console.log('  node scripts/emergency-control.mjs resume');
    console.log('  node scripts/emergency-control.mjs status');
    process.exit(1);
}
