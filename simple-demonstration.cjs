#!/usr/bin/env node

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🎬 AUTONOMOUS WEBSITE BUILDING DEMONSTRATION');
console.log('='.repeat(60));
console.log('This will show you exactly how autonomous agents build your website!');
console.log('');

// Step 1: Show current website status
console.log('📊 STEP 1: Current Website Status');
console.log('--------------------------------');

const req = http.request({
  hostname: 'localhost',
  port: 8084,
  path: '/',
  method: 'GET',
  timeout: 5000
}, (res) => {
  console.log('✅ Website is running on http://localhost:8084');
  console.log(`   Status: ${res.statusCode}`);
  console.log(`   Content-Type: ${res.headers['content-type']}`);
  console.log('');
  
  // Step 2: Connect to autonomous builder
  demonstrateAutonomousBuilding();
});

req.on('error', (err) => {
  console.log('❌ Website not accessible');
  console.log(`   Error: ${err.message}`);
  console.log('   Please make sure the website is running on port 8084');
  console.log('');
});

req.end();

function demonstrateAutonomousBuilding() {
  console.log('🤖 STEP 2: Autonomous Agent Connection');
  console.log('--------------------------------------');
  
  const ws = new WebSocket('ws://localhost:8085');
  
  ws.on('open', () => {
    console.log('✅ Connected to autonomous website builder');
    console.log('   WebSocket: ws://localhost:8085');
    console.log('   Agents are ready to build your website!');
    console.log('');
    
    // Step 3: Trigger a build process
    console.log('🚀 STEP 3: Triggering Autonomous Build Process');
    console.log('---------------------------------------------');
    console.log('Requesting agents to build new website pages...');
    console.log('');
    
    ws.send(JSON.stringify({ type: 'request_build' }));
  });
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'real_time_update') {
        console.log(`📝 AGENT ACTION: ${message.agent || 'Unknown Agent'}`);
        console.log(`   Action: ${message.action || 'Unknown Action'}`);
        console.log(`   File: ${message.file || 'Unknown File'}`);
        console.log(`   Time: ${new Date(message.timestamp || Date.now()).toLocaleTimeString()}`);
        console.log('');
        
        // Show file creation in real-time
        if (message.file) {
          setTimeout(() => {
            showFileCreation(message.file);
          }, 1000);
        }
      }
      
      if (message.type === 'agent_status') {
        console.log('🤖 AGENT STATUS UPDATE:');
        if (message.data && Array.isArray(message.data)) {
          message.data.forEach(agent => {
            const statusIcon = agent.status === 'building' ? '🔨' : 
                             agent.status === 'completed' ? '✅' : '⏸️';
            console.log(`   ${statusIcon} ${agent.name}: ${agent.status} - ${agent.task}`);
          });
        }
        console.log('');
      }
      
    } catch (error) {
      console.log('❌ Error parsing message:', error.message);
    }
  });
  
  ws.on('error', (error) => {
    console.log('❌ WebSocket connection failed');
    console.log(`   Error: ${error.message}`);
    console.log('   Please make sure autonomous-website-builder.cjs is running');
    console.log('');
  });
  
  // Keep connection open for demonstration
  setTimeout(() => {
    console.log('🎯 STEP 4: How to See the Built Pages');
    console.log('------------------------------------');
    showHowToViewPages();
    ws.close();
  }, 20000);
}

function showFileCreation(filePath) {
  if (!filePath) {
    console.log('📁 FILE CREATED: Unknown file');
    console.log('   ⏳ File is being created...');
    console.log('');
    return;
  }
  
  const fileName = filePath.split('/').pop() || 'Unknown';
  const fileType = getFileType(fileName);
  
  console.log(`📁 FILE CREATED: ${fileName}`);
  console.log(`   Type: ${fileType}`);
  console.log(`   Path: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    console.log(`   Size: ${stats.size} bytes`);
    console.log(`   Created: ${stats.mtime.toLocaleTimeString()}`);
    console.log(`   ✅ File exists and is ready to use!`);
  } else {
    console.log(`   ⏳ File is being created...`);
  }
  console.log('');
}

function getFileType(fileName) {
  if (fileName.includes('dashboard') || fileName.includes('page')) return '📄 Page';
  if (fileName.includes('Component') || fileName.includes('component')) return '🧩 Component';
  if (fileName.includes('.css') || fileName.includes('style')) return '🎨 Style';
  return '📊 Data';
}

function showHowToViewPages() {
  console.log('🌐 HOW TO SEE THE BUILT PAGES ON YOUR WEBSITE:');
  console.log('');
  console.log('1️⃣ Go to your website: http://localhost:8084');
  console.log('2️⃣ Navigate to the Dashboard');
  console.log('3️⃣ Look for "Website Builder Monitor" section');
  console.log('4️⃣ You will see:');
  console.log('   • Real-time file creation updates');
  console.log('   • Agent activity feed');
  console.log('   • Build statistics');
  console.log('   • Live file modification tracking');
  console.log('');
  console.log('📁 FILES BEING BUILT:');
  console.log('   • New pages in src/pages/');
  console.log('   • Components in src/components/');
  console.log('   • Styles in src/styles/');
  console.log('   • Data files in src/data/');
  console.log('');
  console.log('🎯 SPECIFIC PAGES TO CHECK:');
  console.log('   • http://localhost:8084/autonomous-dashboard');
  console.log('   • http://localhost:8084/dashboard (look for Website Builder Monitor)');
  console.log('');
  console.log('💡 TIP: Refresh your browser to see new pages!');
  console.log('');
  console.log('='.repeat(60));
  console.log('🎉 DEMONSTRATION COMPLETE!');
  console.log('Autonomous agents are actively building your website!');
  console.log('Check the dashboard to see real-time updates.');
  console.log('='.repeat(60));
}
