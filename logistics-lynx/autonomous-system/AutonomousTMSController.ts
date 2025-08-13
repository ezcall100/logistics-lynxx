import { SystemHealthMonitor } from './SystemHealthMonitor';
import { AutonomousAgentManager } from './AutonomousAgentManager';
import { WorkflowOrchestrator } from './WorkflowOrchestrator';
import { DatabaseManager } from './DatabaseManager';
import { NotificationManager } from './NotificationManager';
import { LogManager } from './LogManager';

/**
 * 🚀 Autonomous TMS Controller
 * Main orchestrator for the 24/7 autonomous TMS system
 */
export class AutonomousTMSController {
  private healthMonitor: SystemHealthMonitor;
  private agentManager: AutonomousAgentManager;
  private workflowOrchestrator: WorkflowOrchestrator;
  private databaseManager: DatabaseManager;
  private notificationManager: NotificationManager;
  private logManager: LogManager;
  private isRunning: boolean = false;
  private restartCount: number = 0;
  private maxRestarts: number = 5;

  constructor() {
    this.logManager = new LogManager();
    this.healthMonitor = new SystemHealthMonitor();
    this.agentManager = new AutonomousAgentManager();
    this.workflowOrchestrator = new WorkflowOrchestrator();
    this.databaseManager = new DatabaseManager();
    this.notificationManager = new NotificationManager();
  }

  /**
   * Initialize the autonomous system
   */
  async initialize(): Promise<void> {
    try {
      this.logManager.log('🚀 Initializing Autonomous TMS System...', 'info');
      
      // Initialize all components
      await this.databaseManager.initialize();
      await this.healthMonitor.initialize();
      await this.agentManager.initialize();
      await this.workflowOrchestrator.initialize();
      await this.notificationManager.initialize();

      this.logManager.log('✅ Autonomous TMS System initialized successfully', 'success');
      
      // Send startup notification
      await this.notificationManager.sendNotification({
        type: 'system_startup',
        message: 'Autonomous TMS System is now online and monitoring',
        priority: 'info'
      });

    } catch (error) {
      this.logManager.log(`❌ Failed to initialize autonomous system: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Start the autonomous system
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      this.logManager.log('⚠️ System is already running', 'warning');
      return;
    }

    try {
      this.isRunning = true;
      this.logManager.log('🚀 Starting Autonomous TMS System...', 'info');

      // Start all components
      await this.healthMonitor.start();
      await this.agentManager.start();
      await this.workflowOrchestrator.start();

      // Start monitoring loop
      this.startMonitoringLoop();

      this.logManager.log('✅ Autonomous TMS System started successfully', 'success');

    } catch (error) {
      this.isRunning = false;
      this.logManager.log(`❌ Failed to start autonomous system: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Stop the autonomous system
   */
  async stop(): Promise<void> {
    if (!this.isRunning) {
      this.logManager.log('⚠️ System is not running', 'warning');
      return;
    }

    try {
      this.isRunning = false;
      this.logManager.log('🛑 Stopping Autonomous TMS System...', 'info');

      // Stop all components
      await this.healthMonitor.stop();
      await this.agentManager.stop();
      await this.workflowOrchestrator.stop();

      this.logManager.log('✅ Autonomous TMS System stopped successfully', 'success');

    } catch (error) {
      this.logManager.log(`❌ Failed to stop autonomous system: ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Main monitoring loop
   */
  private async startMonitoringLoop(): Promise<void> {
    const MONITORING_INTERVAL = 30000; // 30 seconds

    const monitoringLoop = async () => {
      if (!this.isRunning) return;

      try {
        // Check system health
        const healthStatus = await this.healthMonitor.checkHealth();
        
        if (!healthStatus.isHealthy) {
          this.logManager.log(`⚠️ System health issues detected: ${healthStatus.issues.join(', ')}`, 'warning');
          
          // Attempt auto-recovery
          await this.attemptAutoRecovery(healthStatus.issues);
        }

        // Check agent status
        const agentStatus = await this.agentManager.getStatus();
        if (!agentStatus.allAgentsRunning) {
          this.logManager.log('⚠️ Some agents are not running, attempting restart...', 'warning');
          await this.agentManager.restartFailedAgents();
        }

        // Check workflow status
        const workflowStatus = await this.workflowOrchestrator.getStatus();
        if (!workflowStatus.allWorkflowsHealthy) {
          this.logManager.log('⚠️ Some workflows are unhealthy, attempting recovery...', 'warning');
          await this.workflowOrchestrator.recoverFailedWorkflows();
        }

        // Schedule next check
        setTimeout(monitoringLoop, MONITORING_INTERVAL);

      } catch (error) {
        this.logManager.log(`❌ Error in monitoring loop: ${error}`, 'error');
        
        // Attempt restart if too many failures
        if (this.restartCount < this.maxRestarts) {
          this.restartCount++;
          this.logManager.log(`🔄 Attempting system restart (${this.restartCount}/${this.maxRestarts})`, 'warning');
          await this.restart();
        } else {
          this.logManager.log('❌ Max restart attempts reached, stopping system', 'error');
          await this.stop();
        }
      }
    };

    // Start the monitoring loop
    monitoringLoop();
  }

  /**
   * Attempt auto-recovery for system issues
   */
  private async attemptAutoRecovery(issues: string[]): Promise<void> {
    this.logManager.log('🔧 Attempting auto-recovery...', 'info');

    for (const issue of issues) {
      try {
        switch (issue) {
          case 'database_connection':
            await this.databaseManager.reconnect();
            break;
          case 'agent_failure':
            await this.agentManager.restartFailedAgents();
            break;
          case 'workflow_failure':
            await this.workflowOrchestrator.recoverFailedWorkflows();
            break;
          case 'memory_high':
            await this.healthMonitor.cleanupMemory();
            break;
          default:
            this.logManager.log(`⚠️ Unknown issue type: ${issue}`, 'warning');
        }
      } catch (error) {
        this.logManager.log(`❌ Failed to recover from ${issue}: ${error}`, 'error');
      }
    }
  }

  /**
   * Restart the system
   */
  private async restart(): Promise<void> {
    this.logManager.log('🔄 Restarting autonomous system...', 'info');
    
    await this.stop();
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
    await this.start();
  }

  /**
   * Get system status
   */
  async getStatus(): Promise<{
    isRunning: boolean;
    health: any;
    agents: any;
    workflows: any;
    uptime: number;
    restartCount: number;
  }> {
    return {
      isRunning: this.isRunning,
      health: await this.healthMonitor.checkHealth(),
      agents: await this.agentManager.getStatus(),
      workflows: await this.workflowOrchestrator.getStatus(),
      uptime: Date.now() - (this.startTime || Date.now()),
      restartCount: this.restartCount
    };
  }

  private startTime?: number;
}

// Export singleton instance
export const autonomousTMS = new AutonomousTMSController();
