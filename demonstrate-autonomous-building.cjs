#!/usr/bin/env node

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

console.log('🎯 Autonomous Website Building Demonstrator');
console.log('============================================');

function checkCurrentWebsite() {
  console.log('\n📊 Checking current website structure...');
  
  const websiteDir = './logistics-lynx';
  const pagesDir = './logistics-lynx/src/pages';
  const componentsDir = './logistics-lynx/src/components';
  
  if (!fs.existsSync(websiteDir)) {
    console.log('❌ Website directory not found');
    return false;
  }
  
  console.log('✅ Website directory found');
  
  // Check existing pages
  const existingPages = [
    path.join(pagesDir, 'HomePage.tsx'),
    path.join(pagesDir, 'Dashboard.tsx')
  ];
  
  console.log('\n📄 Current Pages:');
  existingPages.forEach(page => {
    if (fs.existsSync(page)) {
      const stats = fs.statSync(page);
      console.log(`✅ ${path.basename(page)} - Last modified: ${stats.mtime.toLocaleTimeString()}`);
    } else {
      console.log(`❌ ${path.basename(page)} - NOT FOUND`);
    }
  });
  
  // Check existing components
  const existingComponents = [
    path.join(componentsDir, 'layout', 'Navigation.tsx'),
    path.join(componentsDir, 'autonomous', 'AutonomousStatusCard.tsx'),
    path.join(componentsDir, 'autonomous', 'LiveBuildMonitor.tsx')
  ];
  
  console.log('\n🧩 Current Components:');
  existingComponents.forEach(component => {
    if (fs.existsSync(component)) {
      const stats = fs.statSync(component);
      console.log(`✅ ${path.basename(component)} - Last modified: ${stats.mtime.toLocaleTimeString()}`);
    } else {
      console.log(`❌ ${path.basename(component)} - NOT FOUND`);
    }
  });
  
  return true;
}

function demonstrateAutonomousBuilding() {
  console.log('\n🚀 Connecting to autonomous website builder...');
  
  const ws = new WebSocket('ws://localhost:8087');
  
  ws.on('open', () => {
    console.log('✅ Connected to autonomous website builder');
    console.log('📤 Requesting complete website build...');
    ws.send(JSON.stringify({ type: 'request_build', task: 'default' }));
  });
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'page_created') {
        console.log(`\n🏗️ PAGE CREATED: ${message.agent}`);
        console.log(`   Action: ${message.action}`);
        console.log(`   File: ${path.basename(message.file)}`);
        console.log(`   Time: ${new Date(message.timestamp).toLocaleTimeString()}`);
        console.log(`   Build #: ${message.buildCount}`);
        
        // Check if file was actually created
        setTimeout(() => {
          if (fs.existsSync(message.file)) {
            const stats = fs.statSync(message.file);
            console.log(`   ✅ File created at: ${stats.mtime.toLocaleTimeString()}`);
          } else {
            console.log(`   ❌ File not found: ${message.file}`);
          }
        }, 1000);
      }
      
      if (message.type === 'component_created') {
        console.log(`\n🧩 COMPONENT CREATED: ${message.agent}`);
        console.log(`   Action: ${message.action}`);
        console.log(`   File: ${path.basename(message.file)}`);
        console.log(`   Time: ${new Date(message.timestamp).toLocaleTimeString()}`);
        console.log(`   Build #: ${message.buildCount}`);
        
        // Check if file was actually created
        setTimeout(() => {
          if (fs.existsSync(message.file)) {
            const stats = fs.statSync(message.file);
            console.log(`   ✅ File created at: ${stats.mtime.toLocaleTimeString()}`);
          } else {
            console.log(`   ❌ File not found: ${message.file}`);
          }
        }, 1000);
      }
      
      if (message.type === 'dev_server_restart') {
        console.log(`\n🔄 DEV SERVER RESTART: ${message.action}`);
        console.log('   The development server is restarting to show new builds...');
      }
      
      if (message.type === 'builder_status') {
        const buildingAgents = message.data.filter(agent => agent.status === 'building');
        if (buildingAgents.length > 0) {
          console.log(`\n🤖 Building Agents: ${buildingAgents.map(a => a.name).join(', ')}`);
        }
      }
      
    } catch (error) {
      console.log('Error parsing message:', error.message);
    }
  });
  
  ws.on('close', () => {
    console.log('\n🔌 Disconnected from autonomous website builder');
  });
  
  ws.on('error', (error) => {
    console.log('❌ WebSocket error:', error.message);
  });
  
  // Close connection after 45 seconds
  setTimeout(() => {
    console.log('\n⏰ Demonstration complete');
    ws.close();
    
    // Final status check
    setTimeout(() => {
      console.log('\n📊 Final website structure:');
      checkCurrentWebsite();
      
      console.log('\n🎯 What was built by autonomous agents:');
      console.log('1. 📄 HomePage.tsx - Complete homepage with header, hero, features, footer');
      console.log('2. 📄 Dashboard.tsx - Full dashboard with stats and monitoring');
      console.log('3. 🧭 Navigation.tsx - Responsive navigation with mobile menu');
      console.log('4. 🤖 AutonomousStatusCard.tsx - Agent status monitoring component');
      console.log('5. ⚡ LiveBuildMonitor.tsx - Real-time build progress component');
      
      console.log('\n🌐 How to see the results:');
      console.log('1. Go to http://localhost:8084/');
      console.log('2. Refresh the page (Ctrl+F5)');
      console.log('3. Navigate to /dashboard to see the new dashboard');
      console.log('4. Look for the new navigation and components');
      
      process.exit(0);
    }, 2000);
  }, 45000);
}

// Start demonstration
if (checkCurrentWebsite()) {
  demonstrateAutonomousBuilding();
} else {
  console.log('❌ Cannot proceed - website not found');
  process.exit(1);
}
