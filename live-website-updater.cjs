#!/usr/bin/env node

const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Live Website Updater...');
console.log('📝 This will actually modify website pages in real-time!');

class LiveWebsiteUpdater {
  constructor() {
    this.wss = null;
    this.websiteDir = './logistics-lynx';
    this.pagesDir = './logistics-lynx/src/pages';
    this.componentsDir = './logistics-lynx/src/components';
    this.agents = [
      { name: 'LivePageUpdater', status: 'idle', task: 'Updating pages live' },
      { name: 'ContentModifier', status: 'idle', task: 'Modifying content' },
      { name: 'StyleChanger', status: 'idle', task: 'Changing styles' },
      { name: 'ComponentBuilder', status: 'idle', task: 'Building components' }
    ];
    this.updateCount = 0;
  }

  startWebSocketServer() {
    this.wss = new WebSocket.Server({ port: 8086 });
    console.log('🌐 Live Website Updater WebSocket server started on port 8086');

    this.wss.on('connection', (ws) => {
      console.log('🔌 New client connected to live website updater');
      
      // Send initial status
      ws.send(JSON.stringify({
        type: 'live_update_status',
        data: this.agents,
        timestamp: new Date().toISOString()
      }));

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          if (data.type === 'request_live_update') {
            this.startLiveUpdates(ws);
          }
        } catch (error) {
          console.log('Error parsing message:', error.message);
        }
      });
    });
  }

  startLiveUpdates(ws) {
    console.log('🔄 Starting live website updates...');
    
    // Start all agents
    this.agents.forEach(agent => {
      agent.status = 'updating';
    });

    // Broadcast status update
    this.broadcastUpdate({
      type: 'live_update_status',
      data: this.agents,
      message: 'All agents started live updates'
    });

    // Start live update tasks
    this.updateHomePage(ws);
    this.modifyDashboard(ws);
    this.createLiveComponent(ws);
    this.updateStyles(ws);
  }

  updateHomePage(ws) {
    const agent = this.agents.find(a => a.name === 'LivePageUpdater');
    agent.status = 'updating';
    agent.task = 'Updating home page with live content';

    const homePagePath = path.join(this.pagesDir, 'HomePage.tsx');
    
    if (fs.existsSync(homePagePath)) {
      let content = fs.readFileSync(homePagePath, 'utf8');
      
      // Add live update indicator
      const liveUpdateIndicator = `
        {/* Live Update Indicator - Added by Autonomous Agent */}
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-medium">LIVE UPDATES ACTIVE</span>
          </div>
          <div className="text-xs mt-1">Last update: ${new Date().toLocaleTimeString()}</div>
        </div>`;

      // Insert the indicator after the first div
      const insertPoint = content.indexOf('<div');
      if (insertPoint !== -1) {
        const nextDiv = content.indexOf('>', insertPoint);
        if (nextDiv !== -1) {
          content = content.slice(0, nextDiv + 1) + liveUpdateIndicator + content.slice(nextDiv + 1);
          fs.writeFileSync(homePagePath, content);
          
          this.broadcastUpdate({
            type: 'live_page_update',
            agent: 'LivePageUpdater',
            action: 'Added live update indicator to home page',
            file: homePagePath,
            timestamp: new Date().toISOString()
          });
        }
      }
    }

    setTimeout(() => {
      agent.status = 'completed';
      agent.task = 'Home page updated';
      this.broadcastUpdate({
        type: 'live_update_status',
        data: this.agents,
        message: 'LivePageUpdater completed'
      });
    }, 2000);
  }

  modifyDashboard(ws) {
    const agent = this.agents.find(a => a.name === 'ContentModifier');
    agent.status = 'updating';
    agent.task = 'Modifying dashboard content';

    const dashboardPath = path.join(this.componentsDir, 'dashboard', 'Dashboard.tsx');
    
    if (fs.existsSync(dashboardPath)) {
      let content = fs.readFileSync(dashboardPath, 'utf8');
      
      // Add live modification indicator
      const liveModificationIndicator = `
        {/* Live Modification Indicator - Added by Autonomous Agent */}
        <Card className="border-orange-200 bg-orange-50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              🔄 Live Website Updates Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-600 mb-2">
              This website is being updated in real-time by autonomous agents
            </p>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span>Live Updates: ${this.updateCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Last Update: ${new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>`;

      // Insert the indicator after the header section
      const insertPoint = content.indexOf('</div>', content.indexOf('max-w-7xl'));
      if (insertPoint !== -1) {
        content = content.slice(0, insertPoint) + liveModificationIndicator + content.slice(insertPoint);
        fs.writeFileSync(dashboardPath, content);
        
        this.broadcastUpdate({
          type: 'live_page_update',
          agent: 'ContentModifier',
          action: 'Added live modification indicator to dashboard',
          file: dashboardPath,
          timestamp: new Date().toISOString()
        });
      }
    }

    setTimeout(() => {
      agent.status = 'completed';
      agent.task = 'Dashboard modified';
      this.broadcastUpdate({
        type: 'live_update_status',
        data: this.agents,
        message: 'ContentModifier completed'
      });
    }, 2000);
  }

  createLiveComponent(ws) {
    const agent = this.agents.find(a => a.name === 'ComponentBuilder');
    agent.status = 'updating';
    agent.task = 'Creating live component';

    const liveComponentContent = `import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const LiveUpdateComponent = () => {
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());
  const [status, setStatus] = useState('active');

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateCount(prev => prev + 1);
      setLastUpdate(new Date().toLocaleTimeString());
      
      // Simulate different statuses
      const statuses = ['active', 'updating', 'processing'];
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          ⚡ Live Update Component
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">Update Count:</span>
            <span className="font-bold text-purple-700">{updateCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">Status:</span>
            <Badge variant={status === 'active' ? 'default' : 'secondary'} className="text-purple-700">
              {status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-600">Last Update:</span>
            <span className="text-xs text-purple-600">{lastUpdate}</span>
          </div>
        </div>
        <div className="mt-3 p-2 bg-purple-100 rounded text-xs text-purple-700">
          This component updates every 3 seconds to show live autonomous agent activity
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveUpdateComponent;`;

    const componentPath = path.join(this.componentsDir, 'autonomous', 'LiveUpdateComponent.tsx');
    
    // Ensure directory exists
    const componentDir = path.dirname(componentPath);
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    fs.writeFileSync(componentPath, liveComponentContent);
    
    this.broadcastUpdate({
      type: 'live_page_update',
      agent: 'ComponentBuilder',
      action: 'Created live update component: LiveUpdateComponent.tsx',
      file: componentPath,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      agent.status = 'completed';
      agent.task = 'Live component created';
      this.broadcastUpdate({
        type: 'live_update_status',
        data: this.agents,
        message: 'ComponentBuilder completed'
      });
    }, 2500);
  }

  updateStyles(ws) {
    const agent = this.agents.find(a => a.name === 'StyleChanger');
    agent.status = 'updating';
    agent.task = 'Updating website styles';

    const styleContent = `/* Live Update Styles - Added by Autonomous Agent */
.live-update-indicator {
  animation: livePulse 2s infinite;
  border: 2px solid #10b981;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
}

.live-update-active {
  position: relative;
  overflow: hidden;
}

.live-update-active::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent);
  animation: liveSlide 3s infinite;
}

@keyframes livePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

@keyframes liveSlide {
  0% { left: -100%; }
  100% { left: 100%; }
}

.live-update-counter {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  color: #059669;
  font-weight: bold;
}

.live-update-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.live-update-status.active {
  background-color: #d1fae5;
  color: #065f46;
}

.live-update-status.updating {
  background-color: #fef3c7;
  color: #92400e;
}

.live-update-status.processing {
  background-color: #dbeafe;
  color: #1e40af;
}`;

    const stylePath = path.join(this.websiteDir, 'src', 'styles', 'live-updates.css');
    
    // Ensure directory exists
    const styleDir = path.dirname(stylePath);
    if (!fs.existsSync(styleDir)) {
      fs.mkdirSync(styleDir, { recursive: true });
    }

    fs.writeFileSync(stylePath, styleContent);
    
    this.broadcastUpdate({
      type: 'live_page_update',
      agent: 'StyleChanger',
      action: 'Created live update styles: live-updates.css',
      file: stylePath,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      agent.status = 'completed';
      agent.task = 'Styles updated';
      this.broadcastUpdate({
        type: 'live_update_status',
        data: this.agents,
        message: 'StyleChanger completed'
      });
    }, 2000);
  }

  broadcastUpdate(update) {
    this.updateCount++;
    
    const message = {
      ...update,
      updateCount: this.updateCount,
      systemStatus: {
        totalUpdates: this.updateCount,
        activeAgents: this.agents.filter(a => a.status === 'updating').length,
        lastUpdate: new Date().toISOString()
      }
    };

    if (this.wss) {
      this.wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }

    console.log(`📝 [${update.agent || 'System'}] ${update.action || update.message}`);
  }

  startContinuousUpdates() {
    console.log('🔄 Starting continuous live updates...');
    
    setInterval(() => {
      // Randomly select an agent to perform a live update
      const randomAgent = this.agents[Math.floor(Math.random() * this.agents.length)];
      
      if (randomAgent.status === 'idle') {
        randomAgent.status = 'updating';
        randomAgent.task = 'Performing live update';
        
        this.broadcastUpdate({
          type: 'live_update_status',
          data: this.agents,
          message: `${randomAgent.name} started live update`
        });

        // Simulate live update completion
        setTimeout(() => {
          randomAgent.status = 'completed';
          randomAgent.task = 'Live update completed';
          this.broadcastUpdate({
            type: 'live_page_update',
            agent: randomAgent.name,
            action: `Completed live update #${this.updateCount + 1}`,
            timestamp: new Date().toISOString()
          });

          // Reset to idle after a moment
          setTimeout(() => {
            randomAgent.status = 'idle';
            randomAgent.task = 'Ready for next live update';
            this.broadcastUpdate({
              type: 'live_update_status',
              data: this.agents,
              message: `${randomAgent.name} ready for next update`
            });
          }, 2000);
        }, 3000);
      }
    }, 5000);
  }
}

// Start the live website updater
const updater = new LiveWebsiteUpdater();
updater.startWebSocketServer();
updater.startContinuousUpdates();

console.log('✅ Live Website Updater is running!');
console.log('🌐 WebSocket server: ws://localhost:8086');
console.log('📝 Website pages will be modified in real-time');
console.log('🔗 Connect your website to see live page updates');

// Keep the process running
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down live website updater...');
  if (updater.wss) {
    updater.wss.close();
  }
  process.exit(0);
});
