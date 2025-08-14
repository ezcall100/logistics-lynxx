#!/usr/bin/env node

import { LogManager } from '../../autonomous-system/LogManager.js';
import { DatabaseManager } from '../../autonomous-system/DatabaseManager.js';
import { NotificationManager } from '../../autonomous-system/NotificationManager.js';
import { AutonomousTMSController } from '../../autonomous-system/AutonomousTMSController.js';
import { PortalManager } from './agents/PortalManager.js';

class AutonomousSystem {
  private logManager: LogManager;
  private databaseManager: DatabaseManager;
  private notificationManager: NotificationManager;
  private tmsController: AutonomousTMSController;
  private portalManager: PortalManager;
  private isRunning: boolean = false;
  private emergencyStopCheckInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.logManager = new LogManager();
    this.databaseManager = new DatabaseManager();
    this.notificationManager = new NotificationManager();
    this.tmsController = new AutonomousTMSController();
    this.portalManager = new PortalManager();
  }

  async initialize(): Promise<void> {
    try {
      this.logManager.log('🚀 Initializing Full Authority Autonomous System...', 'info');
      
      // Initialize all core systems
      await this.databaseManager.initialize();
      await this.notificationManager.initialize();
      await this.tmsController.initialize();
      await this.portalManager.initialize();
      
      this.logManager.log('✅ All systems initialized successfully', 'success');
      
    } catch (error) {
      this.logManager.log(`❌ Failed to initialize autonomous system: ${error}`, 'error');
      throw error;
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      this.logManager.log('⚠️ Autonomous system is already running', 'warning');
      return;
    }

    try {
      // Check emergency stop flag before starting
      const emergencyStop = await this.checkEmergencyStop();
      if (emergencyStop) {
        this.logManager.log('🚨 EMERGENCY STOP ACTIVE - System cannot start', 'error');
        return;
      }

      this.isRunning = true;
      this.logManager.log('🤖 Starting Full Authority Autonomous System...', 'info');
      
      // Start all autonomous components
      await this.tmsController.start();
      await this.portalManager.start();
      
      // Start emergency stop monitoring
      await this.startEmergencyStopMonitoring();
      
      this.logManager.log('✅ Full Authority Autonomous System started successfully', 'success');
      this.logManager.log('🌐 Managing 20 portals + 50-page website + real-time updates', 'info');
      this.logManager.log('🤖 24/7 autonomous operation: ACTIVE', 'success');
      
      // Send startup notification
      await this.notificationManager.sendNotification({
        type: 'system',
        title: 'Full Authority Autonomous System Started',
        message: 'All 20 portals and website are now under autonomous control. 24/7 operation active.',
        priority: 'info'
      });
      
    } catch (error) {
      this.logManager.log(`❌ Failed to start autonomous system: ${error}`, 'error');
      this.isRunning = false;
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.isRunning) {
      this.logManager.log('⚠️ Autonomous system is not running', 'warning');
      return;
    }

    try {
      this.isRunning = false;
      
      // Stop all components
      await this.tmsController.stop();
      await this.portalManager.stop();
      
      // Stop emergency stop monitoring
      if (this.emergencyStopCheckInterval) {
        clearInterval(this.emergencyStopCheckInterval);
        this.emergencyStopCheckInterval = null;
      }
      
      this.logManager.log('🛑 Full Authority Autonomous System stopped successfully', 'success');
      
    } catch (error) {
      this.logManager.log(`❌ Failed to stop autonomous system: ${error}`, 'error');
      throw error;
    }
  }

  private async checkEmergencyStop(): Promise<boolean> {
    try {
      const query = `
        SELECT value FROM feature_flags_v2 
        WHERE key = 'autonomy.emergencyStop' AND scope = 'global'
      `;
      const result = await this.databaseManager.executeQuery(query);
      return result.rows[0]?.value === true;
    } catch (error) {
      this.logManager.log(`❌ Error checking emergency stop: ${error}`, 'error');
      return true; // Default to emergency stop if we can't check
    }
  }

  private async startEmergencyStopMonitoring(): Promise<void> {
    // Check emergency stop flag every 30 seconds
    this.emergencyStopCheckInterval = setInterval(async () => {
      if (this.isRunning) {
        const emergencyStop = await this.checkEmergencyStop();
        if (emergencyStop) {
          this.logManager.log('🚨 EMERGENCY STOP DETECTED - Stopping all autonomous operations', 'error');
          
          // Send emergency notification
          await this.notificationManager.sendNotification({
            type: 'emergency',
            title: 'EMERGENCY STOP ACTIVATED',
            message: 'All autonomous operations have been halted due to emergency stop flag.',
            priority: 'critical'
          });
          
          // Stop the system
          await this.stop();
        }
      }
    }, 30000); // 30 seconds
  }

  async getSystemStatus(): Promise<any> {
    try {
      const portalStatus = await this.portalManager.getPortalStatus();
      const tmsStatus = await this.tmsController.getStatus();
      
      return {
        isRunning: this.isRunning,
        emergencyStop: await this.checkEmergencyStop(),
        portals: {
          total: 20,
          active: portalStatus.filter(p => p.status === 'active').length,
          inactive: portalStatus.filter(p => p.status === 'inactive').length,
          maintenance: portalStatus.filter(p => p.status === 'maintenance').length,
          details: portalStatus
        },
        tms: tmsStatus,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      this.logManager.log(`❌ Error getting system status: ${error}`, 'error');
      return { error: error.message };
    }
  }

  isReady(): boolean {
    return this.databaseManager.isReady() && 
           this.notificationManager.isReady() && 
           this.tmsController.isReady() && 
           this.portalManager.isReady();
  }
}

// Main execution
async function main() {
  const autonomousSystem = new AutonomousSystem();
  
  try {
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Received SIGINT - Shutting down gracefully...');
      await autonomousSystem.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🛑 Received SIGTERM - Shutting down gracefully...');
      await autonomousSystem.stop();
      process.exit(0);
    });

    // Initialize and start the system
    await autonomousSystem.initialize();
    await autonomousSystem.start();
    
    // Keep the process running
    console.log('🤖 Full Authority Autonomous System is running...');
    console.log('🌐 Managing 20 portals + 50-page website + real-time updates');
    console.log('🚨 Emergency stop monitoring: ACTIVE');
    console.log('📊 Press Ctrl+C to stop gracefully');
    
  } catch (error) {
    console.error('❌ Failed to start autonomous system:', error);
    process.exit(1);
  }
}

// Start the autonomous system
main().catch(console.error);
