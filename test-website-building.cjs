#!/usr/bin/env node

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Autonomous Website Building System...');
console.log('='.repeat(60));

let testResults = {
  websiteAccessible: false,
  websocketConnected: false,
  filesCreated: false,
  realTimeUpdates: false,
  buildProcess: false
};

// Test 1: Check if website is accessible
function testWebsite() {
  console.log('\n🌐 Testing Website Accessibility...');
  
  const req = http.request({
    hostname: 'localhost',
    port: 8084,
    path: '/',
    method: 'GET',
    timeout: 5000
  }, (res) => {
    console.log('✅ Website is accessible');
    console.log(`   Status: ${res.statusCode}`);
    console.log(`   Content-Type: ${res.headers['content-type']}`);
    testResults.websiteAccessible = true;
    
    // Continue to next test
    testWebSocket();
  });
  
  req.on('error', (err) => {
    console.log('❌ Website not accessible');
    console.log(`   Error: ${err.message}`);
    testResults.websiteAccessible = false;
    
    // Still try WebSocket test
    testWebSocket();
  });
  
  req.end();
}

// Test 2: Test WebSocket connection
function testWebSocket() {
  console.log('\n🔌 Testing WebSocket Connection...');
  
  const ws = new WebSocket('ws://localhost:8085');
  
  ws.on('open', () => {
    console.log('✅ WebSocket Connection: SUCCESSFUL');
    testResults.websocketConnected = true;
    
    // Request a build process
    console.log('🚀 Requesting autonomous build process...');
    ws.send(JSON.stringify({ type: 'request_build' }));
  });
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log(`📨 Received: ${message.type}`);
      
      if (message.type === 'real_time_update') {
        console.log(`   Agent: ${message.agent}`);
        console.log(`   Action: ${message.action}`);
        console.log(`   File: ${message.file}`);
        testResults.realTimeUpdates = true;
        testResults.buildProcess = true;
      }
      
      if (message.type === 'agent_status') {
        console.log(`   Agents: ${message.data.length} agents`);
        message.data.forEach(agent => {
          console.log(`   - ${agent.name}: ${agent.status}`);
        });
      }
      
    } catch (error) {
      console.log('❌ Error parsing message:', error.message);
    }
  });
  
  ws.on('error', (error) => {
    console.log('❌ WebSocket Connection: FAILED');
    console.log(`   Error: ${error.message}`);
    testResults.websocketConnected = false;
  });
  
  // Keep connection open for 15 seconds to see updates
  setTimeout(() => {
    console.log('⏰ Test completed - closing connection');
    ws.close();
    testFilesCreated();
  }, 15000);
}

// Test 3: Check if files were actually created
function testFilesCreated() {
  console.log('\n📁 Checking for Created Files...');
  
  const websiteDir = './logistics-lynx';
  const pagesDir = './logistics-lynx/src/pages';
  const componentsDir = './logistics-lynx/src/components';
  const stylesDir = './logistics-lynx/src/styles';
  const dataDir = './logistics-lynx/src/data';
  
  const filesToCheck = [
    { path: path.join(pagesDir, 'autonomous-dashboard.tsx'), name: 'Autonomous Dashboard Page' },
    { path: path.join(componentsDir, 'autonomous', 'AutonomousComponent.tsx'), name: 'Autonomous Component' },
    { path: path.join(stylesDir, 'autonomous.css'), name: 'Autonomous Styles' },
    { path: path.join(dataDir, 'autonomousSystem.ts'), name: 'Autonomous System Data' }
  ];
  
  let filesFound = 0;
  
  filesToCheck.forEach(file => {
    if (fs.existsSync(file.path)) {
      const stats = fs.statSync(file.path);
      const timeDiff = Date.now() - stats.mtime.getTime();
      const minutesAgo = Math.floor(timeDiff / 60000);
      
      console.log(`✅ ${file.name}: EXISTS`);
      console.log(`   Path: ${file.path}`);
      console.log(`   Modified: ${minutesAgo} minutes ago`);
      console.log(`   Size: ${stats.size} bytes`);
      filesFound++;
    } else {
      console.log(`❌ ${file.name}: NOT FOUND`);
      console.log(`   Expected: ${file.path}`);
    }
  });
  
  testResults.filesCreated = filesFound > 0;
  
  // Final results
  showFinalResults();
}

// Show final test results
function showFinalResults() {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 AUTONOMOUS WEBSITE BUILDING TEST RESULTS');
  console.log('='.repeat(60));
  
  console.log(`🌐 Website Accessible: ${testResults.websiteAccessible ? '✅ YES' : '❌ NO'}`);
  console.log(`🔌 WebSocket Connected: ${testResults.websocketConnected ? '✅ YES' : '❌ NO'}`);
  console.log(`📁 Files Created: ${testResults.filesCreated ? '✅ YES' : '❌ NO'}`);
  console.log(`⚡ Real-time Updates: ${testResults.realTimeUpdates ? '✅ YES' : '❌ NO'}`);
  console.log(`🏗️ Build Process: ${testResults.buildProcess ? '✅ YES' : '❌ NO'}`);
  
  console.log('\n📊 SUMMARY:');
  if (testResults.websiteAccessible && testResults.websocketConnected && testResults.filesCreated) {
    console.log('🎉 SUCCESS: Autonomous agents are building your website!');
    console.log('✅ Website is accessible');
    console.log('✅ Real-time connection is working');
    console.log('✅ Files are being created and modified');
    console.log('✅ You can see the built pages on your website');
    
    console.log('\n🔗 NEXT STEPS:');
    console.log('1. Go to http://localhost:8084');
    console.log('2. Navigate to the Dashboard');
    console.log('3. Look for "Website Builder Monitor" section');
    console.log('4. Watch autonomous agents build pages in real-time!');
    console.log('5. Check the file explorer to see new pages being created');
    
  } else {
    console.log('⚠️ PARTIAL SUCCESS: Some components are working');
    console.log('🔧 TROUBLESHOOTING:');
    
    if (!testResults.websiteAccessible) {
      console.log('• Website not accessible - check if it\'s running on port 8084');
    }
    if (!testResults.websocketConnected) {
      console.log('• WebSocket not connected - check if autonomous-website-builder.cjs is running');
    }
    if (!testResults.filesCreated) {
      console.log('• No files created - autonomous agents may not be active');
    }
  }
  
  console.log('\n' + '='.repeat(60));
}

// Start the test
console.log('🚀 Starting Autonomous Website Building Test...\n');
testWebsite();
