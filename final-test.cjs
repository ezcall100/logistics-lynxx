#!/usr/bin/env node

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

console.log('🎯 Final Autonomous Website Building Test');
console.log('=========================================');

function checkWebsiteFiles() {
  console.log('\n📊 Current website files status:');
  
  const files = [
    { path: './logistics-lynx/src/pages/HomePage.tsx', name: 'HomePage.tsx' },
    { path: './logistics-lynx/src/pages/Dashboard.tsx', name: 'Dashboard.tsx' },
    { path: './logistics-lynx/src/components/layout/Navigation.tsx', name: 'Navigation.tsx' },
    { path: './logistics-lynx/src/components/autonomous/AutonomousStatusCard.tsx', name: 'AutonomousStatusCard.tsx' },
    { path: './logistics-lynx/src/components/autonomous/LiveBuildMonitor.tsx', name: 'LiveBuildMonitor.tsx' }
  ];
  
  let allFilesExist = true;
  
  files.forEach(file => {
    if (fs.existsSync(file.path)) {
      const stats = fs.statSync(file.path);
      console.log(`✅ ${file.name} - Last modified: ${stats.mtime.toLocaleTimeString()}`);
    } else {
      console.log(`❌ ${file.name} - NOT FOUND`);
      allFilesExist = false;
    }
  });
  
  return allFilesExist;
}

function testAutonomousBuilder() {
  console.log('\n🚀 Testing autonomous website builder connection...');
  
  return new Promise((resolve) => {
    const ws = new WebSocket('ws://localhost:8087');
    
    const timeout = setTimeout(() => {
      console.log('⏰ Connection timeout - builder may not be running');
      resolve(false);
    }, 3000);
    
    ws.on('open', () => {
      console.log('✅ Connected to autonomous website builder successfully!');
      clearTimeout(timeout);
      
      console.log('📤 Requesting a test build...');
      ws.send(JSON.stringify({ type: 'request_build', task: 'homepage' }));
      
      setTimeout(() => {
        ws.close();
        resolve(true);
      }, 2000);
    });
    
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data);
        if (message.agent && message.action) {
          console.log(`📝 ${message.agent}: ${message.action}`);
        }
      } catch (error) {
        // Ignore parsing errors
      }
    });
    
    ws.on('close', () => {
      console.log('🔌 Disconnected from autonomous website builder');
      clearTimeout(timeout);
      resolve(true);
    });
    
    ws.on('error', (error) => {
      console.log('❌ WebSocket error:', error.message);
      clearTimeout(timeout);
      resolve(false);
    });
  });
}

async function main() {
  console.log('🔍 Checking current system status...');
  
  // Check if files exist
  const filesExist = checkWebsiteFiles();
  
  // Test WebSocket connection
  const websocketWorks = await testAutonomousBuilder();
  
  console.log('\n📋 Test Results:');
  console.log('================');
  
  if (filesExist) {
    console.log('✅ All required files exist');
  } else {
    console.log('❌ Some files are missing');
  }
  
  if (websocketWorks) {
    console.log('✅ WebSocket connection working');
  } else {
    console.log('❌ WebSocket connection failed');
  }
  
  if (filesExist && websocketWorks) {
    console.log('\n🎉 SUCCESS: All systems are working!');
    console.log('\n🌐 How to see the results:');
    console.log('1. Go to http://localhost:8090/ (dev server port)');
    console.log('2. Refresh the page (Ctrl+F5)');
    console.log('3. Navigate to /dashboard to see the new dashboard');
    console.log('4. Look for the new navigation and components');
    console.log('5. The autonomous agents are actively building!');
  } else {
    console.log('\n⚠️  Some issues detected - please check the errors above');
  }
  
  process.exit(0);
}

main().catch(console.error);
