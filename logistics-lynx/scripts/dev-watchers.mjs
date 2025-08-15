#!/usr/bin/env node

/**
 * 🔍 Development Watchers Runner
 * Runs additional development watchers and monitors
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('👀 Starting development watchers...');

// Start Supabase local development
const supabaseProcess = spawn('supabase', ['start'], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

supabaseProcess.on('error', (error) => {
  console.error('❌ Supabase failed to start:', error.message);
  // Don't exit, just log the error
});

supabaseProcess.on('exit', (code) => {
  console.log(`👀 Supabase watcher exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development watchers...');
  supabaseProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Terminating development watchers...');
  supabaseProcess.kill('SIGTERM');
});
