#!/usr/bin/env npx ts-node

/**
 * 🤖 Agent Log Tailer
 * Real-time monitoring of agent logs for a specific tenant
 * Usage: npx ts-node scripts/agent-tail.ts <company_id>
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing environment variables: SUPABASE_URL, SUPABASE_ANON_KEY');
  process.exit(1);
}

const companyId = process.argv[2];
if (!companyId) {
  console.error('❌ Usage: npx ts-node scripts/agent-tail.ts <company_id>');
  console.error('Example: npx ts-node scripts/agent-tail.ts 00000000-0000-4000-8000-000000000001');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log(`🔍 Tailing agent logs for company: ${companyId}`);
console.log('Press Ctrl+C to stop\n');

// Subscribe to real-time logs
const subscription = supabase
  .channel('agent-logs')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'agent_logs',
      filter: `company_id=eq.${companyId}`
    },
    (payload) => {
      const log = payload.new as any;
      const timestamp = new Date(log.created_at).toLocaleTimeString();
      const level = log.level;
      const message = log.message;
      
      // Color coding based on log level
      const colors = {
        ERROR: '\x1b[31m', // Red
        WARN: '\x1b[33m',  // Yellow
        INFO: '\x1b[36m',  // Cyan
        DEBUG: '\x1b[37m'  // White
      };
      
      const color = colors[level as keyof typeof colors] || '\x1b[37m';
      const reset = '\x1b[0m';
      
      console.log(`${color}[${timestamp}] [${level}] ${message}${reset}`);
    }
  )
  .subscribe();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping log tail...');
  subscription.unsubscribe();
  process.exit(0);
});

// Keep the process alive
setInterval(() => {
  // Heartbeat to keep connection alive
}, 30000);
