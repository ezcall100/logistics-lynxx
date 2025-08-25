// ========================
// 🧪 QA Intelligence Layer - Confidence Logger
// ========================

import { supabase } from '@/integrations/supabase/client';

export interface ConfidenceLogEntry {
  agent_id: string;
  task_type: string;
  confidence_score: number;
  decision_summary: string;
  context_data?: Record<string, any>;
}

export interface AssertionEntry {
  agent_id: string;
  assertion_type: string;
  result: boolean;
  error_message?: string;
  context_data?: Record<string, any>;
}

export interface FailureEntry {
  agent_id: string;
  task_type: string;
  failure_type: string;
  error_message: string;
  stack_trace?: string;
  retry_count?: number;
}

export interface PerformanceMetrics {
  agent_id: string;
  task_type: string;
  success_rate: number;
  avg_response_time_ms: number;
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  retry_count: number;
  measurement_period_hours: number;
}

// ========================
// Confidence Logger Class
// ========================
export class ConfidenceLogger {
  private static instance: ConfidenceLogger;
  private isEnabled: boolean = true;
  private confidenceThreshold: number = 0.4;
  private maxRetries: number = 3;

  private constructor() {}

  public static getInstance(): ConfidenceLogger {
    if (!ConfidenceLogger.instance) {
      ConfidenceLogger.instance = new ConfidenceLogger();
    }
    return ConfidenceLogger.instance;
  }

  // ========================
  // Confidence Logging
  // ========================
  async logConfidence(entry: ConfidenceLogEntry): Promise<void> {
    if (!this.isEnabled) return;

    try {
      const { error } = await supabase
        .from('agent_confidence_logs')
        .insert({
          agent_id: entry.agent_id,
          task_type: entry.task_type,
          confidence_score: Math.max(0, Math.min(1, entry.confidence_score)),
          decision_summary: entry.decision_summary,
          context_data: entry.context_data || {},
          timestamp: new Date().toISOString()
        });

      if (error) {
        console.error('❌ Failed to log confidence:', error);
        return;
      }

      // Check if confidence is below threshold
      if (entry.confidence_score < this.confidenceThreshold) {
        await this.triggerLowConfidenceAlert(entry);
      }

      console.log(`🧪 Confidence logged: ${entry.task_type} - ${entry.confidence_score}`);
    } catch (error) {
      console.error('❌ Confidence logging error:', error);
    }
  }

  // ========================
  // Assertion Monitoring
  // ========================
  async logAssertion(entry: AssertionEntry): Promise<void> {
    if (!this.isEnabled) return;

    try {
      const { error } = await supabase
        .from('agent_assertions')
        .insert({
          agent_id: entry.agent_id,
          assertion_type: entry.assertion_type,
          result: entry.result,
          error_message: entry.error_message,
          context_data: entry.context_data || {},
          triggered_at: new Date().toISOString()
        });

      if (error) {
        console.error('❌ Failed to log assertion:', error);
        return;
      }

      // If assertion failed, trigger alert
      if (!entry.result) {
        await this.triggerAssertionFailureAlert(entry);
      }

      console.log(`🔍 Assertion logged: ${entry.assertion_type} - ${entry.result ? 'PASS' : 'FAIL'}`);
    } catch (error) {
      console.error('❌ Assertion logging error:', error);
    }
  }

  // ========================
  // Failure Tracking
  // ========================
  async logFailure(entry: FailureEntry): Promise<void> {
    if (!this.isEnabled) return;

    try {
      const { error } = await supabase
        .from('agent_failures')
        .insert({
          agent_id: entry.agent_id,
          task_type: entry.task_type,
          failure_type: entry.failure_type,
          error_message: entry.error_message,
          stack_trace: entry.stack_trace,
          retry_count: entry.retry_count || 0,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('❌ Failed to log failure:', error);
        return;
      }

      // Check if retry count exceeds max
      if ((entry.retry_count || 0) >= this.maxRetries) {
        await this.triggerMaxRetriesAlert(entry);
      }

      console.log(`🚨 Failure logged: ${entry.task_type} - ${entry.failure_type}`);
    } catch (error) {
      console.error('❌ Failure logging error:', error);
    }
  }

  // ========================
  // Performance Metrics
  // ========================
  async updatePerformanceMetrics(metrics: PerformanceMetrics): Promise<void> {
    if (!this.isEnabled) return;

    try {
      const { error } = await supabase
        .from('agent_performance_metrics')
        .upsert({
          agent_id: metrics.agent_id,
          task_type: metrics.task_type,
          success_rate: metrics.success_rate,
          avg_response_time_ms: metrics.avg_response_time_ms,
          total_requests: metrics.total_requests,
          successful_requests: metrics.successful_requests,
          failed_requests: metrics.failed_requests,
          retry_count: metrics.retry_count,
          measurement_period_hours: metrics.measurement_period_hours,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'agent_id,task_type'
        });

      if (error) {
        console.error('❌ Failed to update performance metrics:', error);
        return;
      }

      console.log(`📊 Performance updated: ${metrics.task_type} - ${metrics.success_rate}% success`);
    } catch (error) {
      console.error('❌ Performance metrics error:', error);
    }
  }

  // ========================
  // Alert System
  // ========================
  private async triggerLowConfidenceAlert(entry: ConfidenceLogEntry): Promise<void> {
    console.warn(`⚠️ Low confidence alert: ${entry.task_type} - ${entry.confidence_score}`);
    
    // TODO: Integrate with notification system (Slack, Email, etc.)
    // await this.sendNotification({
    //   type: 'low_confidence',
    //   agent_id: entry.agent_id,
    //   task_type: entry.task_type,
    //   confidence_score: entry.confidence_score,
    //   message: `Agent ${entry.agent_id} has low confidence (${entry.confidence_score}) for task ${entry.task_type}`
    // });
  }

  private async triggerAssertionFailureAlert(entry: AssertionEntry): Promise<void> {
    console.warn(`⚠️ Assertion failure alert: ${entry.assertion_type}`);
    
    // TODO: Integrate with notification system
    // await this.sendNotification({
    //   type: 'assertion_failure',
    //   agent_id: entry.agent_id,
    //   assertion_type: entry.assertion_type,
    //   error_message: entry.error_message,
    //   message: `Assertion ${entry.assertion_type} failed for agent ${entry.agent_id}`
    // });
  }

  private async triggerMaxRetriesAlert(entry: FailureEntry): Promise<void> {
    console.warn(`🚨 Max retries alert: ${entry.task_type} - ${entry.failure_type}`);
    
    // TODO: Integrate with notification system
    // await this.sendNotification({
    //   type: 'max_retries',
    //   agent_id: entry.agent_id,
    //   task_type: entry.task_type,
    //   retry_count: entry.retry_count,
    //   message: `Agent ${entry.agent_id} exceeded max retries for task ${entry.task_type}`
    // });
  }

  // ========================
  // Analytics & Reporting
  // ========================
  async getConfidenceSummary(agentId?: string, taskType?: string, hours: number = 24): Promise<any> {
    try {
      let query = supabase
        .from('agent_confidence_summary')
        .select('*');

      if (agentId) {
        query = query.eq('agent_id', agentId);
      }

      if (taskType) {
        query = query.eq('task_type', taskType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Failed to get confidence summary:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Confidence summary error:', error);
      return null;
    }
  }

  async getFailureSummary(agentId?: string, hours: number = 24): Promise<any> {
    try {
      let query = supabase
        .from('agent_failure_summary')
        .select('*');

      if (agentId) {
        query = query.eq('agent_id', agentId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Failed to get failure summary:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Failure summary error:', error);
      return null;
    }
  }

  // ========================
  // Configuration
  // ========================
  setConfidenceThreshold(threshold: number): void {
    this.confidenceThreshold = Math.max(0, Math.min(1, threshold));
  }

  setMaxRetries(maxRetries: number): void {
    this.maxRetries = Math.max(0, maxRetries);
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  isLoggerEnabled(): boolean {
    return this.isEnabled;
  }
}

// ========================
// Utility Functions
// ========================
export const confidenceLogger = ConfidenceLogger.getInstance();

// Decorator for automatic confidence logging
export function withConfidenceLogging(agentId: string, taskType: string) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      let success = false;
      let error: any = null;
      let confidenceScore = 0.5; // Default confidence

      try {
        // Execute the original method
        const result = await method.apply(this, args);
        success = true;
        confidenceScore = 0.9; // High confidence for successful execution

        // Log confidence
        await confidenceLogger.logConfidence({
          agent_id: agentId,
          task_type: taskType,
          confidence_score: confidenceScore,
          decision_summary: `Successfully executed ${taskType}`,
          context_data: { args, result, execution_time_ms: Date.now() - startTime }
        });

        return result;
      } catch (err) {
        error = err;
        confidenceScore = 0.1; // Low confidence for failed execution

        // Log failure
        await confidenceLogger.logFailure({
          agent_id: agentId,
          task_type: taskType,
          failure_type: 'execution_error',
          error_message: err.message,
          stack_trace: err.stack
        });

        throw err;
      } finally {
        // Update performance metrics
        const executionTime = Date.now() - startTime;
        await confidenceLogger.updatePerformanceMetrics({
          agent_id: agentId,
          task_type: taskType,
          success_rate: success ? 100 : 0,
          avg_response_time_ms: executionTime,
          total_requests: 1,
          successful_requests: success ? 1 : 0,
          failed_requests: success ? 0 : 1,
          retry_count: 0,
          measurement_period_hours: 1
        });
      }
    };

    return descriptor;
  };
}

// ========================
// Export Default Instance
// ========================
export default confidenceLogger;
