#!/usr/bin/env node

/**
 * 🚀 Development Autonomous Agents Runner
 * Runs autonomous agents during development
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🤖 Starting autonomous agents for development...');

// Start the autonomous system
const autonomousProcess = spawn('node', [
  '--loader', 'ts-node/esm',
  '--project', 'tsconfig.node.json',
  'src/start-autonomous-system.ts'
], {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

autonomousProcess.on('error', (error) => {
  console.error('❌ Autonomous agents failed to start:', error.message);
  process.exit(1);
});

autonomousProcess.on('exit', (code) => {
  console.log(`🤖 Autonomous agents exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down autonomous agents...');
  autonomousProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Terminating autonomous agents...');
  autonomousProcess.kill('SIGTERM');
});
