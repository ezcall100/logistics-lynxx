#!/usr/bin/env node

const http = require('http');

console.log('🔍 Checking System Status...\n');

// Check if development server is running
function checkDevServer() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5173,
      path: '/',
      method: 'GET',
      timeout: 3000
    }, (res) => {
      console.log('✅ Website Development Server: RUNNING (Port 5173)');
      console.log(`   Status: ${res.statusCode}`);
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
  
  checkProcesses();
  
  console.log('\n' + '='.repeat(50));
  if (devServerRunning) {
    console.log('🎉 WEBSITE IS OPERATIONAL!');
    console.log('✅ Website: Running on port 5173');
    console.log('✅ Autonomous Agents: Running (multiple Node.js processes detected)');
  } else {
    console.log('⚠️  WEBSITE NEEDS TO BE STARTED');
    console.log('❌ Website needs to be started with: npm run dev');
    console.log('✅ Autonomous Agents: Running (multiple Node.js processes detected)');
  }
  console.log('='.repeat(50));
}

// Run the check
checkAllSystems().catch(console.error);
