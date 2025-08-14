#!/usr/bin/env node

const http = require('http');
const https = require('https');

console.log('🔍 Checking System Status...\n');

// Check if development server is running
function checkDevServer() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5173,
      path: '/',
      method: 'GET',
      timeout: 5000
    }, (res) => {
      console.log('✅ Website Development Server: RUNNING (Port 5173)');
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Headers: ${JSON.stringify(res.headers['content-type'])}`);
      resolve(true);
    });

    req.on('error', (err) => {
      console.log('❌ Website Development Server: NOT RUNNING');
      console.log(`   Error: ${err.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('❌ Website Development Server: TIMEOUT');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Check if autonomous system is running
function checkAutonomousSystem() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3001,
      path: '/health',
      method: 'GET',
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('✅ Autonomous System: RUNNING (Port 3001)');
        console.log(`   Status: ${res.statusCode}`);
        try {
          const health = JSON.parse(data);
          console.log(`   Uptime: ${health.uptime || 'N/A'}`);
          console.log(`   Agents: ${health.agents || 'N/A'}`);
        } catch (e) {
          console.log(`   Response: ${data.substring(0, 100)}...`);
        }
        resolve(true);
      });
    });

    req.on('error', (err) => {
      console.log('❌ Autonomous System: NOT RUNNING');
      console.log(`   Error: ${err.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('❌ Autonomous System: TIMEOUT');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

// Check process status
function checkProcesses() {
  const { exec } = require('child_process');
  
  console.log('🔍 Checking Running Processes...');
  
  exec('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', (error, stdout, stderr) => {
    if (error) {
      console.log('❌ Could not check processes');
      return;
    }
    
    const lines = stdout.split('\n').filter(line => line.includes('node.exe'));
    console.log(`📊 Found ${lines.length} Node.js processes running`);
    
    if (lines.length > 0) {
      console.log('   Active Node.js processes:');
      lines.forEach(line => {
        const parts = line.split(',');
        if (parts.length > 1) {
          console.log(`   - ${parts[0].replace(/"/g, '')} (PID: ${parts[1].replace(/"/g, '')})`);
        }
      });
    }
  });
}

// Main check function
async function checkAllSystems() {
  console.log('='.repeat(50));
  console.log('🤖 TMS AUTONOMOUS SYSTEM STATUS CHECK');
  console.log('='.repeat(50));
  
  const devServerRunning = await checkDevServer();
  console.log('');
  
  const autonomousRunning = await checkAutonomousSystem();
  console.log('');
  
  checkProcesses();
  
  console.log('\n' + '='.repeat(50));
  if (devServerRunning && autonomousRunning) {
    console.log('🎉 ALL SYSTEMS OPERATIONAL!');
    console.log('✅ Website: Running');
    console.log('✅ Autonomous Agents: Running');
  } else {
    console.log('⚠️  SOME SYSTEMS NEED ATTENTION');
    if (!devServerRunning) console.log('❌ Website needs to be started');
    if (!autonomousRunning) console.log('❌ Autonomous system needs to be started');
  }
  console.log('='.repeat(50));
}

// Run the check
checkAllSystems().catch(console.error);
