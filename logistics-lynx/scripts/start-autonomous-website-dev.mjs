#!/usr/bin/env node

import { AutonomousTMSController } from '../autonomous-system/AutonomousTMSController.js';
import { WebsiteDevelopmentAgent } from '../src/agents/WebsiteDevelopmentAgent.js';

class AutonomousWebsiteDevelopmentSystem {
  constructor() {
    this.controller = new AutonomousTMSController();
    this.websiteAgent = new WebsiteDevelopmentAgent();
    this.isRunning = false;
  }

  async start() {
    try {
      console.log('🚀 Starting Autonomous Website Development System...');
      console.log('🌐 Enabling full production access for website development...');
      
      // Initialize the system
      await this.controller.initialize();
      
      // Start the system
      await this.controller.start();
      
      // Enable full production access for website development
      this.websiteAgent.setProductionAccess(true);
      
      this.isRunning = true;
      
      console.log('✅ Autonomous Website Development System started successfully!');
      console.log('🤖 Website Development Agent has full production access');
      console.log('📝 Agents can now create, modify, and deploy website pages autonomously');
      console.log('🚀 System is running in full production mode');
      
      // Keep the system running
      this.keepAlive();
      
    } catch (error) {
      console.error('❌ Failed to start Autonomous Website Development System:', error);
      process.exit(1);
    }
  }

  async stop() {
    try {
      console.log('🛑 Stopping Autonomous Website Development System...');
      
      await this.controller.stop();
      this.isRunning = false;
      
      console.log('✅ Autonomous Website Development System stopped successfully');
      
    } catch (error) {
      console.error('❌ Failed to stop Autonomous Website Development System:', error);
    }
  }

  keepAlive() {
    // Keep the process alive
    process.on('SIGINT', async () => {
      console.log('\n🛑 Received SIGINT, shutting down gracefully...');
      await this.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
      await this.stop();
      process.exit(0);
    });

    // Log system status every 5 minutes
    setInterval(() => {
      if (this.isRunning) {
        console.log('🔄 Autonomous Website Development System is running...');
        console.log('🌐 Website Development Agent: ACTIVE with full production access');
        console.log('📝 Agents are autonomously managing website pages');
      }
    }, 300000); // 5 minutes
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      websiteAgentStatus: this.websiteAgent.getStatus(),
      timestamp: new Date().toISOString()
    };
  }
}

// Start the system
const system = new AutonomousWebsiteDevelopmentSystem();

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === 'stop') {
  system.stop();
} else if (command === 'status') {
  console.log('📊 System Status:', system.getStatus());
} else {
  // Default: start the system
  system.start();
}

export default AutonomousWebsiteDevelopmentSystem;
