import { LogManager } from './LogManager';
import { createClient } from '@supabase/supabase-js';
import * as os from 'os';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  uptime: number;
}

interface HealthCheckResult {
  agent_type: string;
  status: 'healthy' | 'warning' | 'critical' | 'error';
  response_time: number;
  message: string;
  metrics: SystemMetrics;
  timestamp: Date;
}

interface HealthThresholds {
  cpu: { warning: number; critical: number };
  memory: { warning: number; critical: number };
  disk: { warning: number; critical: number };
  latency: { warning: number; critical: number };
}

/**
 * 🔍 Health Check Runner
 * Monitors system health and stores results in Supabase
 */
export class HealthCheckRunner {
  private logManager: LogManager;
  private supabase: any;
  private isRunning: boolean = false;
  private checkInterval: number = 30000; // 30 seconds
  private thresholds: HealthThresholds = {
    cpu: { warning: 70, critical: 85 },
    memory: { warning: 75, critical: 90 },
    disk: { warning: 80, critical: 95 },
    latency: { warning: 300, critical: 600 }
  };

  constructor() {
    this.logManager = new LogManager();
    
    // Initialize Supabase client
    const supabaseUrl = process.env['VITE_SUPABASE_URL'] || process.env['SUPABASE_URL'];
const supabaseKey = process.env['VITE_SUPABASE_ANON_KEY'] || process.env['SUPABASE_ANON_KEY'];
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not found in environment variables');
    }
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async initialize(): Promise<void> {
    this.logManager.log('🔍 Initializing Health Check Runner...', 'info');
    
    // Test Supabase connection
    try {
      const { data, error } = await this.supabase
        .from('agent_health_checks')
        .select('count')
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      this.logManager.log('✅ Supabase connection established', 'success');
    } catch (error) {
      this.logManager.log(`❌ Supabase connection failed: ${error}`, 'error');
      throw error;
    }
  }

  async start(): Promise<void> {
    if (this.isRunning) {
      this.logManager.log('⚠️ Health check runner is already running', 'warning');
      return;
    }

    this.isRunning = true;
    this.logManager.log('🔍 Starting health check runner...', 'info');
    
    // Run initial health check
    await this.runHealthCheck();
    
    // Start continuous monitoring
    this.startContinuousMonitoring();
  }

  async stop(): Promise<void> {
    this.isRunning = false;
    this.logManager.log('🛑 Stopping health check runner...', 'info');
  }

  /**
   * Run a single health check
   */
  async runHealthCheck(): Promise<HealthCheckResult> {
    const startTime = Date.now();
    
    try {
      // Collect system metrics
      const metrics = await this.collectSystemMetrics();
      
      // Test Supabase latency
      const latency = await this.testSupabaseLatency();
      
      // Determine overall status
      const status = this.determineHealthStatus(metrics, latency);
      
      // Create result
      const result: HealthCheckResult = {
        agent_type: 'system_health',
        status,
        response_time: Date.now() - startTime,
        message: this.generateStatusMessage(status, metrics, latency),
        metrics,
        timestamp: new Date()
      };
      
      // Store in Supabase
      await this.storeHealthCheck(result);
      
      // Log status
      if (status === 'healthy') {
        this.logManager.log('✅ Health check passed', 'success');
      } else {
        this.logManager.log(`⚠️ Health check: ${status} - ${result.message}`, 'warning');
      }
      
      return result;
      
    } catch (error) {
      const result: HealthCheckResult = {
        agent_type: 'system_health',
        status: 'error',
        response_time: Date.now() - startTime,
        message: `Health check failed: ${error}`,
        metrics: this.getDefaultMetrics(),
        timestamp: new Date()
      };
      
      await this.storeHealthCheck(result);
      this.logManager.log(`❌ Health check failed: ${error}`, 'error');
      
      return result;
    }
  }

  /**
   * Collect system metrics
   */
  private async collectSystemMetrics(): Promise<SystemMetrics> {
    const cpus = os.cpus();
    const totalCPU = cpus.reduce((acc, cpu) => {
      const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
      const idle = cpu.times.idle;
      return acc + (total - idle) / total;
    }, 0);
    
    const cpuUsage = (totalCPU / cpus.length) * 100;
    
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;
    
    // Simple disk check (Windows)
    const diskUsage = await this.getDiskUsage();
    
    return {
      cpu: Math.round(cpuUsage * 100) / 100,
      memory: Math.round(memoryUsage * 100) / 100,
      disk: diskUsage,
      network: 0, // Placeholder for network metrics
      uptime: os.uptime()
    };
  }

  /**
   * Test Supabase latency
   */
  private async testSupabaseLatency(): Promise<number> {
    const startTime = Date.now();
    
    try {
      const { data, error } = await this.supabase
        .from('agent_health_checks')
        .select('count')
        .limit(1);
      
      if (error) {
        throw error;
      }
      
      return Date.now() - startTime;
    } catch (error) {
      this.logManager.log(`❌ Supabase latency test failed: ${error}`, 'error');
      return 999999; // High latency to trigger critical status
    }
  }

  /**
   * Get disk usage (Windows)
   */
  private async getDiskUsage(): Promise<number> {
    try {
      // For Windows, we'll use a simple approach
      // In production, you might want to use a proper disk monitoring library
      return 50; // Placeholder - 50% disk usage
    } catch (error) {
      this.logManager.log(`❌ Disk usage check failed: ${error}`, 'error');
      return 0;
    }
  }

  /**
   * Determine overall health status
   */
  private determineHealthStatus(metrics: SystemMetrics, latency: number): 'healthy' | 'warning' | 'critical' | 'error' {
    const issues = [];
    
    if (metrics.cpu >= this.thresholds.cpu.critical) issues.push('critical_cpu');
    else if (metrics.cpu >= this.thresholds.cpu.warning) issues.push('warning_cpu');
    
    if (metrics.memory >= this.thresholds.memory.critical) issues.push('critical_memory');
    else if (metrics.memory >= this.thresholds.memory.warning) issues.push('warning_memory');
    
    if (metrics.disk >= this.thresholds.disk.critical) issues.push('critical_disk');
    else if (metrics.disk >= this.thresholds.disk.warning) issues.push('warning_disk');
    
    if (latency >= this.thresholds.latency.critical) issues.push('critical_latency');
    else if (latency >= this.thresholds.latency.warning) issues.push('warning_latency');
    
    if (issues.some(issue => issue.startsWith('critical'))) return 'critical';
    if (issues.some(issue => issue.startsWith('warning'))) return 'warning';
    
    return 'healthy';
  }

  /**
   * Generate status message
   */
  private generateStatusMessage(status: string, metrics: SystemMetrics, latency: number): string {
    const parts = [];
    
    if (metrics.cpu > this.thresholds.cpu.warning) {
      parts.push(`CPU: ${metrics.cpu}%`);
    }
    
    if (metrics.memory > this.thresholds.memory.warning) {
      parts.push(`Memory: ${metrics.memory}%`);
    }
    
    if (metrics.disk > this.thresholds.disk.warning) {
      parts.push(`Disk: ${metrics.disk}%`);
    }
    
    if (latency > this.thresholds.latency.warning) {
      parts.push(`Latency: ${latency}ms`);
    }
    
    if (parts.length === 0) {
      return 'All systems operational';
    }
    
    return `Issues detected: ${parts.join(', ')}`;
  }

  /**
   * Store health check result in Supabase
   */
  private async storeHealthCheck(result: HealthCheckResult): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('agent_health_checks')
        .insert({
          agent_type: result.agent_type,
          status: result.status,
          response_time: result.response_time,
          message: result.message,
          timestamp: result.timestamp.toISOString()
        });
      
      if (error) {
        throw error;
      }
      
      this.logManager.log('✅ Health check stored in database', 'success');
    } catch (error) {
      this.logManager.log(`❌ Failed to store health check: ${error}`, 'error');
    }
  }

  /**
   * Start continuous monitoring
   */
  private startContinuousMonitoring(): void {
    const interval = setInterval(async () => {
      if (!this.isRunning) {
        clearInterval(interval);
        return;
      }
      
      await this.runHealthCheck();
    }, this.checkInterval);
    
    this.logManager.log(`🔍 Continuous monitoring started (${this.checkInterval}ms intervals)`, 'info');
  }

  /**
   * Get default metrics for error cases
   */
  private getDefaultMetrics(): SystemMetrics {
    return {
      cpu: 0,
      memory: 0,
      disk: 0,
      network: 0,
      uptime: 0
    };
  }

  /**
   * Get current health status
   */
  async getCurrentStatus(): Promise<HealthCheckResult | null> {
    try {
      const { data, error } = await this.supabase
        .from('agent_health_checks')
        .select('*')
        .eq('agent_type', 'system_health')
        .order('timestamp', { ascending: false })
        .limit(1);
      
      if (error || !data || data.length === 0) {
        return null;
      }
      
      return data[0] as HealthCheckResult;
    } catch (error) {
      this.logManager.log(`❌ Failed to get current status: ${error}`, 'error');
      return null;
    }
  }
}
