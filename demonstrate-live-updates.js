#!/usr/bin/env node

const WebSocket = require('ws');
const fs = require('fs');

console.log('🎯 Live Website Updates Demonstration');
console.log('=====================================');

class LiveUpdateDemonstrator {
  constructor() {
    this.ws = null;
    this.updateCount = 0;
  }

  async start() {
    try {
      // Connect to the live website updater
      await this.connect();
      
      console.log('\n🚀 Starting live update demonstration...');
      console.log('📝 This will show real-time updates to your website files');
      console.log('🌐 Open http://localhost:8084 in your browser to see the changes');
      
      // Request updates every 15 seconds
      setInterval(() => {
        this.requestUpdate();
      }, 15000);
      
      // Request first update immediately
      setTimeout(() => {
        this.requestUpdate();
      }, 2000);
      
    } catch (error) {
      console.error('❌ Failed to start demonstration:', error.message);
    }
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket('ws://localhost:8086');
      
      this.ws.on('open', () => {
        console.log('✅ Connected to live website updater');
        resolve();
      });

      this.ws.on('message', (data) => {
        try {
          const message = JSON.parse(data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Error parsing message:', error.message);
        }
      });

      this.ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error.message);
        reject(error);
      });
    });
  }

  handleMessage(message) {
    const timestamp = new Date().toLocaleTimeString();
    
    switch (message.type) {
      case 'connection_status':
        console.log(`📡 [${timestamp}] Connected to live updater (Update count: ${message.data.updateCount})`);
        break;
        
      case 'safe_live_update_completed':
        this.updateCount++;
        console.log(`✅ [${timestamp}] Live update #${this.updateCount} completed successfully!`);
        console.log(`   📁 Files updated: ${message.data.files.join(', ')}`);
        console.log(`   🔄 Total updates: ${message.systemStatus.totalUpdates}`);
        this.showFileStatus();
        break;
        
      case 'home_page_updated':
        console.log(`🏠 [${timestamp}] Home page updated (Update #${message.updateCount})`);
        break;
        
      case 'dashboard_updated':
        console.log(`📊 [${timestamp}] Dashboard updated (Update #${message.updateCount})`);
        break;
        
      case 'hot_reload_triggered':
        console.log(`🔄 [${timestamp}] Hot reload triggered - changes should be visible in browser`);
        break;
        
      case 'safe_live_update_failed':
        console.log(`❌ [${timestamp}] Live update failed: ${message.error}`);
        break;
    }
  }

  requestUpdate() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log('\n🔄 Requesting live update...');
      this.ws.send(JSON.stringify({
        type: 'request_live_update'
      }));
    } else {
      console.log('❌ Not connected to live website updater');
    }
  }

  showFileStatus() {
    try {
      const homePagePath = './logistics-lynx/src/pages/HomePage.tsx';
      const dashboardPath = './logistics-lynx/src/components/dashboard/Dashboard.tsx';
      
      if (fs.existsSync(homePagePath)) {
        const homeContent = fs.readFileSync(homePagePath, 'utf8');
        const hasHomeIndicator = homeContent.includes('Live Update Indicator - Added by Autonomous Agent');
        console.log(`   🏠 HomePage.tsx: ${hasHomeIndicator ? '✅ Has live indicator' : '❌ No live indicator'}`);
      }
      
      if (fs.existsSync(dashboardPath)) {
        const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
        const hasDashboardIndicator = dashboardContent.includes('Live Update Indicator - Added by Autonomous Agent');
        console.log(`   📊 Dashboard.tsx: ${hasDashboardIndicator ? '✅ Has live indicator' : '❌ No live indicator'}`);
      }
      
    } catch (error) {
      console.log(`   ⚠️ Error checking files: ${error.message}`);
    }
  }

  stop() {
    if (this.ws) {
      this.ws.close();
    }
    console.log('\n🛑 Live update demonstration stopped');
  }
}

// Start the demonstration
const demonstrator = new LiveUpdateDemonstrator();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down demonstration...');
  demonstrator.stop();
  process.exit(0);
});

// Start the demonstration
demonstrator.start();

console.log('\n💡 Tips:');
console.log('   • Open http://localhost:8084 in your browser');
console.log('   • Watch for the green "LIVE UPDATES ACTIVE" indicator');
console.log('   • The indicator will update every 15 seconds');
console.log('   • Press Ctrl+C to stop the demonstration');
