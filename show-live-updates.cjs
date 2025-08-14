#!/usr/bin/env node

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

console.log('🎯 Live Website Update Demonstrator');
console.log('=====================================');

function checkWebsiteStatus() {
  console.log('\n📊 Checking website status...');
  
  const websiteDir = './logistics-lynx';
  const pagesDir = './logistics-lynx/src/pages';
  const componentsDir = './logistics-lynx/src/components';
  
  // Check if directories exist
  if (!fs.existsSync(websiteDir)) {
    console.log('❌ Website directory not found');
    return false;
  }
  
  console.log('✅ Website directory found');
  
  // Check for key files
  const keyFiles = [
    path.join(pagesDir, 'HomePage.tsx'),
    path.join(componentsDir, 'dashboard', 'Dashboard.tsx'),
    path.join(componentsDir, 'autonomous', 'LiveUpdateComponent.tsx'),
    path.join(websiteDir, 'src', 'styles', 'live-updates.css')
  ];
  
  keyFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const stats = fs.statSync(file);
      console.log(`✅ ${path.basename(file)} - Last modified: ${stats.mtime.toLocaleTimeString()}`);
    } else {
      console.log(`❌ ${path.basename(file)} - NOT FOUND`);
    }
  });
  
  return true;
}

function demonstrateLiveUpdates() {
  console.log('\n🚀 Connecting to live website updater...');
  
  const ws = new WebSocket('ws://localhost:8086');
  
  ws.on('open', () => {
    console.log('✅ Connected to live website updater');
    console.log('📤 Requesting live updates...');
    ws.send(JSON.stringify({ type: 'request_live_update' }));
  });
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      
      if (message.type === 'live_page_update') {
        console.log(`\n📝 LIVE UPDATE: ${message.agent}`);
        console.log(`   Action: ${message.action}`);
        console.log(`   File: ${path.basename(message.file)}`);
        console.log(`   Time: ${new Date(message.timestamp).toLocaleTimeString()}`);
        console.log(`   Update #: ${message.updateCount}`);
        
        // Check if file was actually created/modified
        setTimeout(() => {
          if (fs.existsSync(message.file)) {
            const stats = fs.statSync(message.file);
            console.log(`   ✅ File updated at: ${stats.mtime.toLocaleTimeString()}`);
          } else {
            console.log(`   ❌ File not found: ${message.file}`);
          }
        }, 1000);
      }
      
      if (message.type === 'dev_server_restart') {
        console.log(`\n🔄 DEV SERVER RESTART: ${message.action}`);
        console.log('   The development server is restarting to show live changes...');
      }
      
      if (message.type === 'live_update_status') {
        const updatingAgents = message.data.filter(agent => agent.status === 'updating');
        if (updatingAgents.length > 0) {
          console.log(`\n🤖 Active Agents: ${updatingAgents.map(a => a.name).join(', ')}`);
        }
      }
      
    } catch (error) {
      console.log('Error parsing message:', error.message);
    }
  });
  
  ws.on('close', () => {
    console.log('\n🔌 Disconnected from live website updater');
  });
  
  ws.on('error', (error) => {
    console.log('❌ WebSocket error:', error.message);
  });
  
  // Close connection after 30 seconds
  setTimeout(() => {
    console.log('\n⏰ Demonstration complete');
    ws.close();
    
    // Final status check
    setTimeout(() => {
      console.log('\n📊 Final website status:');
      checkWebsiteStatus();
      
      console.log('\n🎯 How to see the changes:');
      console.log('1. Go to http://localhost:8084/');
      console.log('2. Refresh the page (Ctrl+F5)');
      console.log('3. Look for live update indicators');
      console.log('4. Check the dashboard for live modification indicators');
      console.log('5. Look for the new LiveUpdateComponent');
      
      process.exit(0);
    }, 2000);
  }, 30000);
}

// Start demonstration
if (checkWebsiteStatus()) {
  demonstrateLiveUpdates();
} else {
  console.log('❌ Cannot proceed - website not found');
  process.exit(1);
}
