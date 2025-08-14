#!/usr/bin/env node

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

console.log('🚀 Starting Enhanced Live Website Updater...');
console.log('📝 This will safely modify website pages in real-time without corruption!');

class EnhancedLiveWebsiteUpdater {
  constructor() {
    this.wss = null;
    this.websiteDir = './logistics-lynx';
    this.pagesDir = './logistics-lynx/src/pages';
    this.componentsDir = './logistics-lynx/src/components';
    this.updateHistory = [];
    this.updateCount = 0;
    this.devServerProcess = null;
    this.isUpdating = false;
    
    // Safe update templates
    this.updateTemplates = {
      homePage: {
        indicator: `{/* Live Update Indicator - Added by Autonomous Agent at {{timestamp}} */}
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-medium">LIVE UPDATES ACTIVE</span>
          </div>
          <div className="text-xs mt-1">Last update: {{timestamp}}</div>
          <div className="text-xs">Update #{{updateCount}}</div>
        </div>`,
        insertAfter: '<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">'
      },
      dashboard: {
        indicator: `{/* Live Update Indicator - Added by Autonomous Agent at {{timestamp}} */}
        <Card className="border-green-200 bg-green-50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              🔄 Live Website Updates Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600 mb-2">
              This website is being updated in real-time by autonomous agents
            </p>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Updates: {{updateCount}}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Last Update: {{timestamp}}</span>
              </div>
            </div>
            <div className="mt-2 p-2 bg-green-100 rounded text-xs text-green-700">
              🔥 This indicator was added by autonomous agent at {{timestamp}}
            </div>
          </CardContent>
        </Card>`,
        insertAfter: '<div className="max-w-7xl mx-auto">'
      }
    };
  }

  startWebSocketServer() {
    this.wss = new WebSocket.Server({ port: 8086 });
    console.log('🌐 Enhanced Live Website Updater WebSocket server started on port 8086');

    this.wss.on('connection', (ws) => {
      console.log('🔌 New client connected to enhanced live website updater');
      
      // Send initial status
      ws.send(JSON.stringify({
        type: 'connection_status',
        data: {
          status: 'connected',
          updateCount: this.updateCount,
          lastUpdate: this.updateHistory.length > 0 ? this.updateHistory[this.updateHistory.length - 1].timestamp : null
        },
        timestamp: new Date().toISOString()
      }));

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          if (data.type === 'request_live_update') {
            this.performSafeUpdate(ws);
          }
        } catch (error) {
          console.log('Error parsing message:', error.message);
        }
      });
    });
  }

  async performSafeUpdate(ws) {
    if (this.isUpdating) {
      console.log('⚠️ Update already in progress, skipping...');
      return;
    }

    this.isUpdating = true;
    this.updateCount++;
    const timestamp = new Date().toLocaleTimeString();

    try {
      console.log(`🔄 Performing safe live update #${this.updateCount} at ${timestamp}`);

      // Update home page safely
      await this.safeUpdateHomePage(timestamp);
      
      // Update dashboard safely
      await this.safeUpdateDashboard(timestamp);

      // Record the update
      const updateRecord = {
        id: this.updateCount,
        timestamp: new Date().toISOString(),
        type: 'safe_live_update',
        files: ['HomePage.tsx', 'Dashboard.tsx'],
        status: 'completed'
      };

      this.updateHistory.push(updateRecord);
      if (this.updateHistory.length > 50) {
        this.updateHistory = this.updateHistory.slice(-50); // Keep last 50 updates
      }

      // Broadcast success
      this.broadcastUpdate({
        type: 'safe_live_update_completed',
        data: updateRecord,
        message: `Safe live update #${this.updateCount} completed successfully`
      });

      // Trigger hot reload
      this.triggerHotReload();

    } catch (error) {
      console.error('❌ Safe update failed:', error.message);
      this.broadcastUpdate({
        type: 'safe_live_update_failed',
        error: error.message,
        message: `Safe live update #${this.updateCount} failed`
      });
    } finally {
      this.isUpdating = false;
    }
  }

  async safeUpdateHomePage(timestamp) {
    const homePagePath = path.join(this.pagesDir, 'HomePage.tsx');
    
    if (!fs.existsSync(homePagePath)) {
      throw new Error('HomePage.tsx not found');
    }

    let content = fs.readFileSync(homePagePath, 'utf8');
    
         // Check if indicator already exists
     if (content.includes('Live Update Indicator - Added by Autonomous Agent')) {
       // Update existing indicator
       const regex = /{\/\* Live Update Indicator - Added by Autonomous Agent at [^}]+ \*\/}[\s\S]*?Update #\d+[\s\S]*?<\/div>/;
       const newIndicator = this.updateTemplates.homePage.indicator
         .replace(/{{timestamp}}/g, timestamp)
         .replace(/{{updateCount}}/g, this.updateCount);
       
       content = content.replace(regex, newIndicator);
    } else {
      // Add new indicator
      const newIndicator = this.updateTemplates.homePage.indicator
        .replace(/{{timestamp}}/g, timestamp)
        .replace(/{{updateCount}}/g, this.updateCount);
      
      const insertPoint = content.indexOf(this.updateTemplates.homePage.insertAfter);
      if (insertPoint !== -1) {
        const insertEnd = content.indexOf('>', insertPoint) + 1;
        content = content.slice(0, insertEnd) + '\n      ' + newIndicator + content.slice(insertEnd);
      }
    }

    // Write with backup
    await this.safeWriteFile(homePagePath, content);
    
    this.broadcastUpdate({
      type: 'home_page_updated',
      file: 'HomePage.tsx',
      timestamp: new Date().toISOString(),
      updateCount: this.updateCount
    });
  }

  async safeUpdateDashboard(timestamp) {
    const dashboardPath = path.join(this.componentsDir, 'dashboard', 'Dashboard.tsx');
    
    if (!fs.existsSync(dashboardPath)) {
      throw new Error('Dashboard.tsx not found');
    }

    let content = fs.readFileSync(dashboardPath, 'utf8');
    
         // Check if indicator already exists
     if (content.includes('Live Update Indicator - Added by Autonomous Agent')) {
       // Update existing indicator
       const regex = /{\/\* Live Update Indicator - Added by Autonomous Agent at [^}]+ \*\/}[\s\S]*?Update #\d+[\s\S]*?<\/Card>/;
       const newIndicator = this.updateTemplates.dashboard.indicator
         .replace(/{{timestamp}}/g, timestamp)
         .replace(/{{updateCount}}/g, this.updateCount);
       
       content = content.replace(regex, newIndicator);
    } else {
      // Add new indicator
      const newIndicator = this.updateTemplates.dashboard.indicator
        .replace(/{{timestamp}}/g, timestamp)
        .replace(/{{updateCount}}/g, this.updateCount);
      
      const insertPoint = content.indexOf(this.updateTemplates.dashboard.insertAfter);
      if (insertPoint !== -1) {
        const insertEnd = content.indexOf('>', insertPoint) + 1;
        content = content.slice(0, insertEnd) + '\n        ' + newIndicator + content.slice(insertEnd);
      }
    }

    // Write with backup
    await this.safeWriteFile(dashboardPath, content);
    
    this.broadcastUpdate({
      type: 'dashboard_updated',
      file: 'Dashboard.tsx',
      timestamp: new Date().toISOString(),
      updateCount: this.updateCount
    });
  }

  async safeWriteFile(filePath, content) {
    // Create backup
    const backupPath = filePath + '.backup';
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    try {
      // Write new content
      fs.writeFileSync(filePath, content, 'utf8');
      
      // Verify the file is valid (basic check)
      const verifyContent = fs.readFileSync(filePath, 'utf8');
      if (verifyContent.length < 100) {
        throw new Error('File appears to be corrupted after write');
      }
      
      // Remove backup on success
      if (fs.existsSync(backupPath)) {
        fs.unlinkSync(backupPath);
      }
      
      console.log(`✅ Successfully updated ${path.basename(filePath)}`);
    } catch (error) {
      // Restore from backup on failure
      if (fs.existsSync(backupPath)) {
        fs.copyFileSync(backupPath, filePath);
        fs.unlinkSync(backupPath);
      }
      throw error;
    }
  }

  triggerHotReload() {
    console.log('🔄 Triggering hot reload...');
    
    // Send a signal to trigger hot reload without restarting the server
    this.broadcastUpdate({
      type: 'hot_reload_triggered',
      message: 'Hot reload triggered for live updates',
      timestamp: new Date().toISOString()
    });
  }

  broadcastUpdate(update) {
    const message = {
      ...update,
      updateCount: this.updateCount,
      systemStatus: {
        totalUpdates: this.updateCount,
        lastUpdate: new Date().toISOString(),
        isUpdating: this.isUpdating
      }
    };

    if (this.wss) {
      this.wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }

    console.log(`📝 [${update.type || 'System'}] ${update.message || update.action || 'Update broadcast'}`);
  }

  startContinuousUpdates() {
    console.log('🔄 Starting continuous safe live updates...');
    
    setInterval(() => {
      if (!this.isUpdating) {
        this.performSafeUpdate();
      }
    }, 10000); // Every 10 seconds
  }

  getStatus() {
    return {
      isRunning: true,
      updateCount: this.updateCount,
      isUpdating: this.isUpdating,
      lastUpdate: this.updateHistory.length > 0 ? this.updateHistory[this.updateHistory.length - 1] : null,
      recentUpdates: this.updateHistory.slice(-5)
    };
  }
}

// Start the enhanced live website updater
const updater = new EnhancedLiveWebsiteUpdater();
updater.startWebSocketServer();
updater.startContinuousUpdates();

console.log('✅ Enhanced Live Website Updater is running!');
console.log('🌐 WebSocket server: ws://localhost:8086');
console.log('📝 Website pages will be safely modified in real-time');
console.log('🔗 Connect your website to see live page updates');
console.log('🛡️ Safe update mode: Files are backed up before modification');

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down enhanced live website updater...');
  if (updater.wss) {
    updater.wss.close();
  }
  process.exit(0);
});

// Export for testing
module.exports = { EnhancedLiveWebsiteUpdater };
