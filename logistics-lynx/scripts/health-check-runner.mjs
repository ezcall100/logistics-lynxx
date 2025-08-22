#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the TypeScript file
const healthCheckPath = join(__dirname, '..', 'autonomous-system', 'HealthCheckRunner.ts');

console.log('🚀 Starting Health Check Runner...');
console.log('🔍 Using tsx to run TypeScript directly...');

// Use tsx to run the TypeScript file
const child = spawn('npx', ['tsx', healthCheckPath], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('❌ Failed to start Health Check Runner:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`❌ Health Check Runner exited with code ${code}`);
    process.exit(code);
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('🛑 Shutting down Health Check Runner...');
  child.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('🛑 Shutting down Health Check Runner...');
  child.kill('SIGTERM');
});
