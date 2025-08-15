#!/usr/bin/env node

import { AutonomousTMSController } from '../autonomous-system/AutonomousTMSController.js';
import { WebsiteDevelopmentAgent } from '../src/agents/WebsiteDevelopmentAgent.js';
import { PortalDevelopmentAgent } from '../src/agents/PortalDevelopmentAgent.js';

class AutonomousFullDevelopmentSystem {
  constructor() {
    this.controller = new AutonomousTMSController();
    this.websiteAgent = new WebsiteDevelopmentAgent();
    this.portalAgent = new PortalDevelopmentAgent();
    this.isRunning = false;
  }

  async start() {
    try {
      console.log('🚀 Starting Autonomous Full Development System...');
      console.log('🌐 Enabling full production access for website development...');
      console.log('🏢 Enabling full production access for portal development...');
      
      // Initialize the system
      await this.controller.initialize();
      
      // Start the system
      await this.controller.start();
      
      // Enable full production access for both agents
      this.websiteAgent.setProductionAccess(true);
      this.portalAgent.setProductionAccess(true);
      
      this.isRunning = true;
      
      console.log('✅ Autonomous Full Development System started successfully!');
      console.log('🤖 Website Development Agent has full production access');
      console.log('🏢 Portal Development Agent has full production access');
      console.log('📝 Agents can now create, modify, and deploy website pages autonomously');
      console.log('🏢 Agents can now create, modify, and deploy portals for all role types');
      console.log('🚀 System is running in full production mode');
      
      // Display portal types and roles
      console.log('\n📋 Supported Portal Types:');
      console.log('  • Carrier Portal');
      console.log('  • Broker Portal');
      console.log('  • Shipper Portal');
      console.log('  • Driver Portal');
      console.log('  • Owner-Operator Portal');
      console.log('  • Admin Portal');
      console.log('  • Enterprise Portal');
      console.log('  • Marketplace Portal');
      console.log('  • Analytics Portal');
      console.log('  • Billing Portal');
      console.log('  • Support Portal');
      
      console.log('\n👥 Supported User Roles:');
      console.log('  • Carrier');
      console.log('  • Broker');
      console.log('  • Shipper');
      console.log('  • Driver');
      console.log('  • Owner-Operator');
      console.log('  • Admin');
      console.log('  • Super-Admin');
      console.log('  • Enterprise');
      console.log('  • Analyst');
      console.log('  • Billing');
      console.log('  • Support');
      
      // Keep the system running
      this.keepAlive();
      
    } catch (error) {
      console.error('❌ Failed to start Autonomous Full Development System:', error);
      process.exit(1);
    }
  }

  async stop() {
    try {
      console.log('🛑 Stopping Autonomous Full Development System...');
      
      await this.controller.stop();
      this.isRunning = false;
      
      console.log('✅ Autonomous Full Development System stopped successfully');
      
    } catch (error) {
      console.error('❌ Failed to stop Autonomous Full Development System:', error);
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
        console.log('🔄 Autonomous Full Development System is running...');
        console.log('🌐 Website Development Agent: ACTIVE with full production access');
        console.log('🏢 Portal Development Agent: ACTIVE with full production access');
        console.log('📝 Agents are autonomously managing website pages and portals');
      }
    }, 300000); // 5 minutes
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      websiteAgentStatus: this.websiteAgent.getStatus(),
      portalAgentStatus: this.portalAgent.getStatus(),
      timestamp: new Date().toISOString()
    };
  }

  async createPortal(portalType, roles) {
    try {
      console.log(`🏢 Creating portal: ${portalType} for roles: ${roles.join(', ')}`);
      const portal = await this.portalAgent.createCustomPortal({
        type: portalType,
        roles: roles,
        name: `${portalType.charAt(0).toUpperCase() + portalType.slice(1)} Portal`,
        path: `/${portalType}`
      });
      console.log(`✅ Portal created successfully: ${portal.name}`);
      return portal;
    } catch (error) {
      console.error(`❌ Failed to create portal: ${error}`);
      throw error;
    }
  }

  async createWebsitePage(pageData) {
    try {
      console.log(`🌐 Creating website page: ${pageData.name}`);
      const page = await this.websiteAgent.createCustomPage(pageData);
      console.log(`✅ Website page created successfully: ${page.name}`);
      return page;
    } catch (error) {
      console.error(`❌ Failed to create website page: ${error}`);
      throw error;
    }
  }
}

// Start the system
const system = new AutonomousFullDevelopmentSystem();

// Handle command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (command === 'stop') {
  system.stop();
} else if (command === 'status') {
  console.log('📊 System Status:', system.getStatus());
} else if (command === 'create-portal') {
  const portalType = args[1];
  const roles = args[2] ? args[2].split(',') : ['admin'];
  system.createPortal(portalType, roles);
} else if (command === 'create-page') {
  const pageName = args[1] || 'Custom Page';
  const pagePath = args[2] || '/custom';
  system.createWebsitePage({
    name: pageName,
    path: pagePath,
    component: 'CustomPage'
  });
} else {
  // Default: start the system
  system.start();
}

export default AutonomousFullDevelopmentSystem;
