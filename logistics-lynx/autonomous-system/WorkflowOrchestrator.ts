import { LogManager } from './LogManager';

interface Workflow {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  lastRun: Date;
  status: 'active' | 'inactive' | 'error' | 'running';
  config: any;
  executionCount: number;
  successRate: number;
}

interface WorkflowStatus {
  allWorkflowsHealthy: boolean;
  workflows: Workflow[];
  totalWorkflows: number;
  activeWorkflows: number;
  failedWorkflows: number;
  totalExecutions: number;
  averageSuccessRate: number;
}

/**
 * 🔄 Workflow Orchestrator
 * Manages N8n workflows and business processes
 */
export class WorkflowOrchestrator {
  private logManager: LogManager;
  private workflows: Map<string, Workflow> = new Map();
  private isRunning: boolean = false;

  constructor() {
    this.logManager = new LogManager();
  }

  async initialize(): Promise<void> {
    this.logManager.log('🔄 Initializing Workflow Orchestrator...', 'info');
    
    // Initialize default workflows
    await this.initializeDefaultWorkflows();
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      this.logManager.log('⚠️ Workflow orchestrator is already running', 'warning');
      return;
    }

    this.isRunning = true;
    this.logManager.log('🔄 Starting workflow orchestrator...', 'info');

    // Activate all workflows
    for (const [id, workflow] of this.workflows) {
      await this.activateWorkflow(id);
    }

    this.logManager.log('✅ Workflow orchestrator started successfully', 'success');
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    this.logManager.log('🛑 Stopping workflow orchestrator...', 'info');

    // Deactivate all workflows
    for (const [id, workflow] of this.workflows) {
      await this.deactivateWorkflow(id);
    }

    this.logManager.log('✅ Workflow orchestrator stopped successfully', 'success');
  }

  /**
   * Initialize default workflows
   */
  private async initializeDefaultWorkflows(): Promise<void> {
    const defaultWorkflows = [
      {
        id: 'load-intake-automation',
        name: 'Load Intake Automation',
        type: 'load_processing',
        config: {
          trigger: 'webhook',
          interval: 60000, // 1 minute
          maxRetries: 3,
          priority: 'high'
        }
      },
      {
        id: 'pod-processing-automation',
        name: 'POD Processing Automation',
        type: 'document_processing',
        config: {
          trigger: 'file_upload',
          interval: 300000, // 5 minutes
          maxRetries: 5,
          priority: 'high'
        }
      },
      {
        id: 'agent-runner-cron-health',
        name: 'Agent Runner Cron Health',
        type: 'health_monitoring',
        config: {
          trigger: 'cron',
          interval: 300000, // 5 minutes
          maxRetries: 2,
          priority: 'medium'
        }
      },
      {
        id: 'rate-calculation-automation',
        name: 'Rate Calculation Automation',
        type: 'rate_processing',
        config: {
          trigger: 'api_call',
          interval: 120000, // 2 minutes
          maxRetries: 3,
          priority: 'medium'
        }
      },
      {
        id: 'compliance-check-automation',
        name: 'Compliance Check Automation',
        type: 'compliance_processing',
        config: {
          trigger: 'scheduled',
          interval: 600000, // 10 minutes
          maxRetries: 2,
          priority: 'high'
        }
      },
      {
        id: 'customer-notification-automation',
        name: 'Customer Notification Automation',
        type: 'notification_processing',
        config: {
          trigger: 'event_driven',
          interval: 30000, // 30 seconds
          maxRetries: 3,
          priority: 'high'
        }
      },
      {
        id: 'data-sync-automation',
        name: 'Data Sync Automation',
        type: 'data_synchronization',
        config: {
          trigger: 'cron',
          interval: 900000, // 15 minutes
          maxRetries: 5,
          priority: 'low'
        }
      },
      {
        id: 'report-generation-automation',
        name: 'Report Generation Automation',
        type: 'report_processing',
        config: {
          trigger: 'scheduled',
          interval: 3600000, // 1 hour
          maxRetries: 2,
          priority: 'low'
        }
      }
    ];

    for (const workflowConfig of defaultWorkflows) {
      const workflow: Workflow = {
        ...workflowConfig,
        isActive: false,
        lastRun: new Date(),
        status: 'inactive',
        executionCount: 0,
        successRate: 100
      };

      this.workflows.set(workflow.id, workflow);
    }

    this.logManager.log(`✅ Initialized ${defaultWorkflows.length} workflows`, 'success');
  }

  /**
   * Activate a workflow
   */
  async activateWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      this.logManager.log(`❌ Workflow not found: ${workflowId}`, 'error');
      return;
    }

    try {
      this.logManager.log(`🔄 Activating workflow: ${workflow.name}`, 'info');

      // Simulate workflow activation
      await this.simulateWorkflowActivation(workflow);

      workflow.isActive = true;
      workflow.status = 'active';

      this.logManager.log(`✅ Workflow activated: ${workflow.name}`, 'success');

    } catch (error) {
      workflow.status = 'error';
      this.logManager.log(`❌ Failed to activate workflow ${workflow.name}: ${error}`, 'error');
    }
  }

  /**
   * Deactivate a workflow
   */
  async deactivateWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      this.logManager.log(`❌ Workflow not found: ${workflowId}`, 'error');
      return;
    }

    try {
      this.logManager.log(`🛑 Deactivating workflow: ${workflow.name}`, 'info');

      // Simulate workflow deactivation
      await this.simulateWorkflowDeactivation(workflow);

      workflow.isActive = false;
      workflow.status = 'inactive';

      this.logManager.log(`✅ Workflow deactivated: ${workflow.name}`, 'success');

    } catch (error) {
      this.logManager.log(`❌ Failed to deactivate workflow ${workflow.name}: ${error}`, 'error');
    }
  }

  /**
   * Execute a workflow
   */
  async executeWorkflow(workflowId: string, data?: any): Promise<any> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      this.logManager.log(`❌ Workflow not found: ${workflowId}`, 'error');
      throw new Error(`Workflow not found: ${workflowId}`);
    }

    if (!workflow.isActive) {
      this.logManager.log(`❌ Workflow is not active: ${workflow.name}`, 'error');
      throw new Error(`Workflow is not active: ${workflow.name}`);
    }

    try {
      workflow.status = 'running';
      this.logManager.log(`🚀 Executing workflow: ${workflow.name}`, 'info');

      // Simulate workflow execution
      const result = await this.simulateWorkflowExecution(workflow, data);

      workflow.lastRun = new Date();
      workflow.executionCount++;
      workflow.status = 'active';

      // Update success rate
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        workflow.successRate = Math.min(100, workflow.successRate + 1);
      } else {
        workflow.successRate = Math.max(0, workflow.successRate - 2);
      }

      this.logManager.log(`✅ Workflow executed successfully: ${workflow.name}`, 'success');
      return result;

    } catch (error) {
      workflow.status = 'error';
      workflow.successRate = Math.max(0, workflow.successRate - 5);
      this.logManager.log(`❌ Workflow execution failed: ${workflow.name} - ${error}`, 'error');
      throw error;
    }
  }

  /**
   * Recover failed workflows
   */
  async recoverFailedWorkflows(): Promise<void> {
    this.logManager.log('🔧 Recovering failed workflows...', 'info');

    const failedWorkflows = Array.from(this.workflows.values()).filter(
      workflow => workflow.status === 'error'
    );

    for (const workflow of failedWorkflows) {
      this.logManager.log(`🔧 Recovering failed workflow: ${workflow.name}`, 'info');
      
      try {
        await this.deactivateWorkflow(workflow.id);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
        await this.activateWorkflow(workflow.id);
      } catch (error) {
        this.logManager.log(`❌ Failed to recover workflow ${workflow.name}: ${error}`, 'error');
      }
    }

    this.logManager.log(`✅ Recovered ${failedWorkflows.length} failed workflows`, 'success');
  }

  /**
   * Get workflow status
   */
  async getStatus(): Promise<WorkflowStatus> {
    const workflows = Array.from(this.workflows.values());
    const activeWorkflows = workflows.filter(workflow => workflow.isActive);
    const failedWorkflows = workflows.filter(workflow => workflow.status === 'error');

    const totalExecutions = workflows.reduce((sum, w) => sum + w.executionCount, 0);
    const averageSuccessRate = workflows.length > 0 
      ? workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length 
      : 0;

    return {
      allWorkflowsHealthy: failedWorkflows.length === 0,
      workflows,
      totalWorkflows: workflows.length,
      activeWorkflows: activeWorkflows.length,
      failedWorkflows: failedWorkflows.length,
      totalExecutions,
      averageSuccessRate: Math.round(averageSuccessRate)
    };
  }

  /**
   * Add a new workflow
   */
  async addWorkflow(workflowConfig: Omit<Workflow, 'isActive' | 'lastRun' | 'status' | 'executionCount' | 'successRate'>): Promise<void> {
    const workflow: Workflow = {
      ...workflowConfig,
      isActive: false,
      lastRun: new Date(),
      status: 'inactive',
      executionCount: 0,
      successRate: 100
    };

    this.workflows.set(workflow.id, workflow);
    this.logManager.log(`✅ Added new workflow: ${workflow.name}`, 'success');

    // Activate the workflow if the orchestrator is running
    if (this.isRunning) {
      await this.activateWorkflow(workflow.id);
    }
  }

  /**
   * Remove a workflow
   */
  async removeWorkflow(workflowId: string): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      this.logManager.log(`❌ Workflow not found: ${workflowId}`, 'error');
      return;
    }

    // Deactivate the workflow first
    if (workflow.isActive) {
      await this.deactivateWorkflow(workflowId);
    }

    this.workflows.delete(workflowId);
    this.logManager.log(`✅ Removed workflow: ${workflow.name}`, 'success');
  }

  /**
   * Update workflow configuration
   */
  async updateWorkflowConfig(workflowId: string, config: any): Promise<void> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      this.logManager.log(`❌ Workflow not found: ${workflowId}`, 'error');
      return;
    }

    const wasActive = workflow.isActive;
    
    // Deactivate workflow if active
    if (wasActive) {
      await this.deactivateWorkflow(workflowId);
    }

    // Update configuration
    workflow.config = { ...workflow.config, ...config };

    // Reactivate workflow if it was active
    if (wasActive) {
      await this.activateWorkflow(workflowId);
    }

    this.logManager.log(`✅ Updated configuration for workflow: ${workflow.name}`, 'success');
  }

  /**
   * Simulate workflow activation
   */
  private async simulateWorkflowActivation(workflow: Workflow): Promise<void> {
    // Simulate activation time
    const activationTime = Math.random() * 2000 + 1000; // 1-3 seconds
    await new Promise(resolve => setTimeout(resolve, activationTime));
  }

  /**
   * Simulate workflow deactivation
   */
  private async simulateWorkflowDeactivation(workflow: Workflow): Promise<void> {
    // Simulate deactivation time
    const deactivationTime = Math.random() * 1500 + 500; // 0.5-2 seconds
    await new Promise(resolve => setTimeout(resolve, deactivationTime));
  }

  /**
   * Simulate workflow execution
   */
  private async simulateWorkflowExecution(workflow: Workflow, data?: any): Promise<any> {
    // Simulate execution time based on workflow type
    const executionTime = Math.random() * 5000 + 2000; // 2-7 seconds
    await new Promise(resolve => setTimeout(resolve, executionTime));

    // Return simulated result
    return {
      workflowId: workflow.id,
      executionTime: Date.now(),
      data: data || {},
      result: 'success'
    };
  }

  /**
   * Get workflow by ID
   */
  getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  /**
   * Get all workflows
   */
  getAllWorkflows(): Workflow[] {
    return Array.from(this.workflows.values());
  }
}
