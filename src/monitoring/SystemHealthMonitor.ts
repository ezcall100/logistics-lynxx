import { createClient } from '@supabase/supabase-js';

interface HealthCheckResult {
  component: string;
  healthy: boolean;
  responseTime: number;
  error?: string;
  timestamp: Date;
  metrics?: Record<string, any>;
}

interface SystemMetrics {
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeConnections: number;
  memoryUsage: number;
  cpuUsage: number;
}

export class SystemHealthMonitor {
  private supabase: any;
  private checkInterval: NodeJS.Timeout | null = null;
  private isRunning: boolean = false;
  private alertThresholds = {
    responseTime: 5000, // 5 seconds
    errorRate: 0.05,    // 5%
    memoryUsage: 0.9,   // 90%
    cpuUsage: 0.8       // 80%
  };

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!
    );
  }

  public async startMonitoring(intervalMs: number = 300000) { // 5 minutes default
    if (this.isRunning) {
      console.log('System monitoring is already running');
      return;
    }

    console.log(`Starting system health monitoring with ${intervalMs}ms interval`);
    this.isRunning = true;

    // Run initial health check
    await this.runHealthChecks();

    // Set up periodic monitoring
    this.checkInterval = setInterval(async () => {
      await this.runHealthChecks();
    }, intervalMs);
  }

  public stopMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.isRunning = false;
    console.log('System health monitoring stopped');
  }

  private async runHealthChecks(): Promise<HealthCheckResult[]> {
    const checks = [
      new DatabaseHealthCheck(),
      new APIHealthCheck(),
      new WorkflowHealthCheck(),
      new PerformanceHealthCheck()
    ];

    const results = await Promise.all(
      checks.map(check => check.execute())
    );

    // Log results
    await this.logHealthCheckResults(results);

    // Handle any issues
    const issues = results.filter(result => !result.healthy);
    if (issues.length > 0) {
      await this.handleIssues(issues);
    }

    // Update system metrics
    await this.updateSystemMetrics(results);

    return results;
  }

  private async handleIssues(issues: HealthCheckResult[]) {
    console.log(`Handling ${issues.length} system issues`);

    for (const issue of issues) {
      // Log the issue
      await this.logIssue(issue);
      
      // Send alert
      await this.sendAlert(issue);
      
      // Attempt auto-recovery
      await this.attemptRecovery(issue);
    }
  }

  private async attemptRecovery(issue: HealthCheckResult) {
    console.log(`Attempting recovery for ${issue.component}`);

    try {
      switch (issue.component) {
        case 'database':
          await this.recoverDatabase(issue);
          break;
        case 'api':
          await this.restartAPI(issue);
          break;
        case 'workflow':
          await this.restartWorkflow(issue);
          break;
        case 'performance':
          await this.optimizePerformance(issue);
          break;
        default:
          await this.generalRecovery(issue);
      }
    } catch (error) {
      console.error(`Recovery failed for ${issue.component}:`, error);
      await this.escalateToHuman(issue, error);
    }
  }

  private async recoverDatabase(issue: HealthCheckResult) {
    console.log('Attempting database recovery...');
    
    // Check connection
    const { error } = await this.supabase
      .from('system_health')
      .select('id')
      .limit(1);

    if (error) {
      // Try to reconnect
      await this.reconnectDatabase();
    }

    // Check for deadlocks or long-running queries
    await this.cleanupDatabaseConnections();
  }

  private async restartAPI(issue: HealthCheckResult) {
    console.log('Attempting API restart...');
    
    // Check if API is responding
    const apiHealth = await this.checkAPIHealth();
    
    if (!apiHealth.healthy) {
      // Trigger API restart via deployment system
      await this.triggerAPIRestart();
    }
  }

  private async restartWorkflow(issue: HealthCheckResult) {
    console.log('Attempting workflow restart...');
    
    // Check n8n workflow status
    const workflowHealth = await this.checkWorkflowHealth();
    
    if (!workflowHealth.healthy) {
      // Restart specific workflow
      await this.restartSpecificWorkflow(workflowHealth.workflowId);
    }
  }

  private async optimizePerformance(issue: HealthCheckResult) {
    console.log('Attempting performance optimization...');
    
    const metrics = issue.metrics;
    if (metrics) {
      if (metrics.memoryUsage > this.alertThresholds.memoryUsage) {
        await this.optimizeMemoryUsage();
      }
      
      if (metrics.cpuUsage > this.alertThresholds.cpuUsage) {
        await this.optimizeCPUUsage();
      }
    }
  }

  private async generalRecovery(issue: HealthCheckResult) {
    console.log('Attempting general recovery...');
    
    // Log the issue for manual review
    await this.supabase
      .from('system_issues')
      .insert({
        component: issue.component,
        error: issue.error,
        severity: 'medium',
        status: 'pending_manual_review',
        created_at: new Date().toISOString()
      });
  }

  private async logHealthCheckResults(results: HealthCheckResult[]) {
    await this.supabase
      .from('health_checks')
      .insert(
        results.map(result => ({
          component: result.component,
          healthy: result.healthy,
          response_time: result.responseTime,
          error: result.error,
          metrics: result.metrics,
          timestamp: result.timestamp.toISOString()
        }))
      );
  }

  private async logIssue(issue: HealthCheckResult) {
    await this.supabase
      .from('system_issues')
      .insert({
        component: issue.component,
        error: issue.error,
        severity: this.calculateSeverity(issue),
        status: 'detected',
        created_at: new Date().toISOString()
      });
  }

  private async sendAlert(issue: HealthCheckResult) {
    const alertData = {
      component: issue.component,
      error: issue.error,
      severity: this.calculateSeverity(issue),
      timestamp: new Date().toISOString(),
      responseTime: issue.responseTime
    };

    // Send to multiple channels
    await Promise.all([
      this.sendEmailAlert(alertData),
      this.sendSlackAlert(alertData),
      this.sendWebhookAlert(alertData)
    ]);
  }

  private async updateSystemMetrics(results: HealthCheckResult[]) {
    const metrics: SystemMetrics = {
      uptime: process.uptime(),
      responseTime: this.calculateAverageResponseTime(results),
      errorRate: this.calculateErrorRate(results),
      activeConnections: await this.getActiveConnections(),
      memoryUsage: process.memoryUsage().heapUsed / process.memoryUsage().heapTotal,
      cpuUsage: await this.getCPUUsage()
    };

    await this.supabase
      .from('system_metrics')
      .insert({
        ...metrics,
        timestamp: new Date().toISOString()
      });
  }

  private calculateSeverity(issue: HealthCheckResult): 'low' | 'medium' | 'high' | 'critical' {
    if (issue.responseTime > 10000) return 'critical';
    if (issue.responseTime > 5000) return 'high';
    if (issue.responseTime > 2000) return 'medium';
    return 'low';
  }

  private calculateAverageResponseTime(results: HealthCheckResult[]): number {
    const validResults = results.filter(r => r.responseTime > 0);
    if (validResults.length === 0) return 0;
    
    return validResults.reduce((sum, r) => sum + r.responseTime, 0) / validResults.length;
  }

  private calculateErrorRate(results: HealthCheckResult[]): number {
    if (results.length === 0) return 0;
    return results.filter(r => !r.healthy).length / results.length;
  }

  private async getActiveConnections(): Promise<number> {
    // Implement connection counting logic
    return 0;
  }

  private async getCPUUsage(): Promise<number> {
    // Implement CPU usage monitoring
    return 0.5;
  }

  private async reconnectDatabase() {
    // Implement database reconnection logic
    console.log('Reconnecting to database...');
  }

  private async cleanupDatabaseConnections() {
    // Implement database cleanup logic
    console.log('Cleaning up database connections...');
  }

  private async checkAPIHealth() {
    // Implement API health check
    return { healthy: true };
  }

  private async triggerAPIRestart() {
    // Implement API restart logic
    console.log('Triggering API restart...');
  }

  private async checkWorkflowHealth() {
    // Implement workflow health check
    return { healthy: true, workflowId: null };
  }

  private async restartSpecificWorkflow(workflowId: string | null) {
    // Implement workflow restart logic
    console.log(`Restarting workflow: ${workflowId}`);
  }

  private async optimizeMemoryUsage() {
    // Implement memory optimization
    console.log('Optimizing memory usage...');
  }

  private async optimizeCPUUsage() {
    // Implement CPU optimization
    console.log('Optimizing CPU usage...');
  }

  private async escalateToHuman(issue: HealthCheckResult, error: any) {
    await this.supabase
      .from('escalations')
      .insert({
        issue_type: 'system_recovery_failed',
        component: issue.component,
        error: error.message,
        priority: 'high',
        status: 'pending',
        created_at: new Date().toISOString()
      });
  }

  private async sendEmailAlert(alertData: any) {
    // Implement email alert logic
    console.log('Sending email alert:', alertData);
  }

  private async sendSlackAlert(alertData: any) {
    // Implement Slack alert logic
    console.log('Sending Slack alert:', alertData);
  }

  private async sendWebhookAlert(alertData: any) {
    // Implement webhook alert logic
    console.log('Sending webhook alert:', alertData);
  }
}

// Health Check Implementations
class DatabaseHealthCheck {
  async execute(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      const supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from('system_health')
        .select('id')
        .limit(1);

      const responseTime = Date.now() - startTime;

      return {
        component: 'database',
        healthy: !error && data !== null,
        responseTime,
        error: error?.message,
        timestamp: new Date(),
        metrics: {
          connectionActive: !error,
          queryTime: responseTime
        }
      };
    } catch (error) {
      return {
        component: 'database',
        healthy: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
    }
  }
}

class APIHealthCheck {
  async execute(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      // Check main API endpoint
      const response = await fetch(`${process.env.API_BASE_URL}/health`, {
        method: 'GET',
        timeout: 5000
      });

      const responseTime = Date.now() - startTime;

      return {
        component: 'api',
        healthy: response.ok,
        responseTime,
        error: response.ok ? undefined : `HTTP ${response.status}`,
        timestamp: new Date(),
        metrics: {
          statusCode: response.status,
          responseSize: response.headers.get('content-length')
        }
      };
    } catch (error) {
      return {
        component: 'api',
        healthy: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
    }
  }
}

class WorkflowHealthCheck {
  async execute(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      // Check n8n workflow status
      const response = await fetch(`${process.env.N8N_BASE_URL}/api/v1/executions`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.N8N_API_KEY}`
        },
        timeout: 5000
      });

      const responseTime = Date.now() - startTime;

      return {
        component: 'workflow',
        healthy: response.ok,
        responseTime,
        error: response.ok ? undefined : `HTTP ${response.status}`,
        timestamp: new Date(),
        metrics: {
          activeWorkflows: 0, // Parse from response
          failedExecutions: 0 // Parse from response
        }
      };
    } catch (error) {
      return {
        component: 'workflow',
        healthy: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
    }
  }
}

class PerformanceHealthCheck {
  async execute(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      const memoryUsage = process.memoryUsage();
      const cpuUsage = await this.getCPUUsage();

      const responseTime = Date.now() - startTime;

      return {
        component: 'performance',
        healthy: memoryUsage.heapUsed / memoryUsage.heapTotal < 0.9 && cpuUsage < 0.8,
        responseTime,
        timestamp: new Date(),
        metrics: {
          memoryUsage: memoryUsage.heapUsed / memoryUsage.heapTotal,
          cpuUsage,
          heapUsed: memoryUsage.heapUsed,
          heapTotal: memoryUsage.heapTotal
        }
      };
    } catch (error) {
      return {
        component: 'performance',
        healthy: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      };
    }
  }

  private async getCPUUsage(): Promise<number> {
    // Implement CPU usage calculation
    return 0.5;
  }
}
