#!/usr/bin/env node

/**
 * 🟢 Green Posture Script - Production-Grade Autonomous System Monitor
 * 
 * Generates daily compliance artifacts and monitors critical operational metrics
 * Implements the "operate & prove" checklist for 24/7 autonomous operation
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

// Configuration
const CONFIG = {
  // Feature Flags (non-negotiable guardrails)
  REQUIRED_FLAGS: {
    'autonomy.emergencyStop': false,
    'autonomy.mode': 'FULL',
    'agents.autonomousEnabled': true,
    'obs.otelEnabled': true
  },
  
  // Budget Limits
  BUDGETS: {
    agentsConcurrency: 150,
    replayPerTenantPerDay: 3,
    replayBatchSize: 50,
    replayMaxSize: 2 * 1024 * 1024, // 2MB
    replayFailThreshold: 0.2 // 20%
  },
  
  // SLO Gates
  SLO_GATES: {
    uptime: 0.9995, // 99.95%
    successRate: 0.98, // 98%
    p95ResponseTime: 2500, // 2.5s
    outboxLagP95: 5000, // 5s
    outboxLagAvg: 2000, // 2s
    agentSuccessRate: 0.98, // 98%
    agentQuarantineRate: 0.01, // 1%
    dlqReplayFailRate: 0.02, // 2%
    ciSelfHealTriggers: 0
  },
  
  // Monitoring Intervals
  INTERVALS: {
    outboxLagCheck: 30000, // 30s
    agentHealthCheck: 60000, // 1m
    dlqReplayCheck: 300000, // 5m
    ciHealthCheck: 600000, // 10m
    traceCoverageCheck: 900000 // 15m
  },
  
  // Artifacts Directory
  ARTIFACTS_DIR: path.join(__dirname, '../artifacts/green-posture'),
  RETENTION_DAYS: 35
};

// System state
let systemState = {
  isRunning: false,
  lastCheck: null,
  metrics: {},
  alerts: [],
  traces: []
};

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class GreenPostureMonitor {
  constructor() {
    this.ensureArtifactsDirectory();
  }

  async initialize() {
    console.log('🟢 Initializing Green Posture Monitor...');
    systemState.isRunning = true;
    await this.startMonitoring();
  }

  ensureArtifactsDirectory() {
    const today = new Date().toISOString().split('T')[0];
    const todayDir = path.join(CONFIG.ARTIFACTS_DIR, today);
    
    if (!fs.existsSync(CONFIG.ARTIFACTS_DIR)) {
      fs.mkdirSync(CONFIG.ARTIFACTS_DIR, { recursive: true });
    }
    
    if (!fs.existsSync(todayDir)) {
      fs.mkdirSync(todayDir, { recursive: true });
    }
  }

  async startMonitoring() {
    console.log('📊 Starting continuous monitoring...');
    
    // Start all monitoring loops
    this.monitorFeatureFlags();
    this.monitorBudgets();
    this.monitorSLOMetrics();
    this.monitorOutboxLag();
    this.monitorAgentHealth();
    this.monitorDLQReplay();
    this.monitorCIHealth();
    this.monitorTraceCoverage();
    
    // Generate daily artifacts
    setInterval(() => this.generateDailyArtifacts(), 24 * 60 * 60 * 1000);
    
    // Cleanup old artifacts
    setInterval(() => this.cleanupOldArtifacts(), 60 * 60 * 1000); // Every hour
  }

  async monitorFeatureFlags() {
    setInterval(async () => {
      try {
        const flags = await this.getFeatureFlags();
        const violations = this.checkFlagViolations(flags);
        
        if (violations.length > 0) {
          await this.triggerEmergencyStop(violations);
        }
        
        systemState.metrics.flags = flags;
      } catch (error) {
        console.error('❌ Feature flag monitoring failed:', error);
        await this.recordAlert('feature_flags_monitoring_failed', error.message);
      }
    }, CONFIG.INTERVALS.agentHealthCheck);
  }

  async monitorBudgets() {
    setInterval(async () => {
      try {
        const budgets = await this.getBudgetMetrics();
        const violations = this.checkBudgetViolations(budgets);
        
        if (violations.length > 0) {
          await this.throttleSystem(violations);
        }
        
        systemState.metrics.budgets = budgets;
      } catch (error) {
        console.error('❌ Budget monitoring failed:', error);
        await this.recordAlert('budget_monitoring_failed', error.message);
      }
    }, CONFIG.INTERVALS.agentHealthCheck);
  }

  async monitorSLOMetrics() {
    setInterval(async () => {
      try {
        const sloMetrics = await this.getSLOMetrics();
        const breaches = this.checkSLOBreaches(sloMetrics);
        
        if (breaches.length > 0) {
          await this.handleSLOBreach(breaches);
        }
        
        systemState.metrics.slo = sloMetrics;
      } catch (error) {
        console.error('❌ SLO monitoring failed:', error);
        await this.recordAlert('slo_monitoring_failed', error.message);
      }
    }, CONFIG.INTERVALS.agentHealthCheck);
  }

  async monitorOutboxLag() {
    setInterval(async () => {
      try {
        const outboxMetrics = await this.getOutboxLagMetrics();
        
        if (outboxMetrics.p95 > CONFIG.SLO_GATES.outboxLagP95) {
          await this.recordAlert('outbox_lag_high', `P95: ${outboxMetrics.p95}ms`);
        }
        
        systemState.metrics.outboxLag = outboxMetrics;
      } catch (error) {
        console.error('❌ Outbox lag monitoring failed:', error);
        await this.recordAlert('outbox_lag_monitoring_failed', error.message);
      }
    }, CONFIG.INTERVALS.outboxLagCheck);
  }

  async monitorAgentHealth() {
    setInterval(async () => {
      try {
        const agentMetrics = await this.getAgentHealthMetrics();
        
        if (agentMetrics.successRate < CONFIG.SLO_GATES.agentSuccessRate) {
          await this.recordAlert('agent_success_rate_low', `${agentMetrics.successRate}%`);
        }
        
        if (agentMetrics.quarantineRate > CONFIG.SLO_GATES.agentQuarantineRate) {
          await this.recordAlert('agent_quarantine_rate_high', `${agentMetrics.quarantineRate}%`);
        }
        
        systemState.metrics.agentHealth = agentMetrics;
      } catch (error) {
        console.error('❌ Agent health monitoring failed:', error);
        await this.recordAlert('agent_health_monitoring_failed', error.message);
      }
    }, CONFIG.INTERVALS.agentHealthCheck);
  }

  async monitorDLQReplay() {
    setInterval(async () => {
      try {
        const dlqMetrics = await this.getDLQReplayMetrics();
        
        if (dlqMetrics.failRate > CONFIG.SLO_GATES.dlqReplayFailRate) {
          await this.recordAlert('dlq_replay_fail_rate_high', `${dlqMetrics.failRate}%`);
        }
        
        if (dlqMetrics.replaysPerTenant > CONFIG.BUDGETS.replayPerTenantPerDay) {
          await this.recordAlert('dlq_replay_budget_exceeded', `${dlqMetrics.replaysPerTenant} replays`);
        }
        
        systemState.metrics.dlqReplay = dlqMetrics;
      } catch (error) {
        console.error('❌ DLQ replay monitoring failed:', error);
        await this.recordAlert('dlq_replay_monitoring_failed', error.message);
      }
    }, CONFIG.INTERVALS.dlqReplayCheck);
  }

  async monitorCIHealth() {
    setInterval(async () => {
      try {
        const ciMetrics = await this.getCIHealthMetrics();
        
        if (ciMetrics.selfHealTriggers > CONFIG.SLO_GATES.ciSelfHealTriggers) {
          await this.recordAlert('ci_self_heal_triggers_high', `${ciMetrics.selfHealTriggers} triggers`);
        }
        
        systemState.metrics.ciHealth = ciMetrics;
      } catch (error) {
        console.error('❌ CI health monitoring failed:', error);
        await this.recordAlert('ci_health_monitoring_failed', error.message);
      }
    }, CONFIG.INTERVALS.ciHealthCheck);
  }

  async monitorTraceCoverage() {
    setInterval(async () => {
      try {
        const traceMetrics = await this.getTraceCoverageMetrics();
        systemState.traces = traceMetrics.sampleTraces;
        systemState.metrics.traceCoverage = traceMetrics;
      } catch (error) {
        console.error('❌ Trace coverage monitoring failed:', error);
        await this.recordAlert('trace_coverage_monitoring_failed', error.message);
      }
    }, CONFIG.INTERVALS.traceCoverageCheck);
  }

  // Data Collection Methods
  async getFeatureFlags() {
    const { data, error } = await supabase
      .from('feature_flags')
      .select('*')
      .eq('active', true);
    
    if (error) throw error;
    
    const flags = {};
    data.forEach(flag => {
      flags[flag.key] = flag.value;
    });
    
    return flags;
  }

  async getBudgetMetrics() {
    const { data, error } = await supabase
      .from('system_budgets')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    
    if (error) throw error;
    
    return {
      agentsConcurrency: data.reduce((sum, record) => sum + record.agents_concurrency, 0) / data.length,
      replayCount: data.reduce((sum, record) => sum + record.replay_count, 0),
      replaySize: data.reduce((sum, record) => sum + record.replay_size, 0),
      replayFailures: data.reduce((sum, record) => sum + record.replay_failures, 0)
    };
  }

  async getSLOMetrics() {
    const { data, error } = await supabase
      .from('slo_metrics')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: false })
      .limit(100);
    
    if (error) throw error;
    
    const uptime = data.filter(d => d.uptime === 1).length / data.length;
    const successRate = data.reduce((sum, d) => sum + d.success_rate, 0) / data.length;
    const p95ResponseTime = Math.percentile(data.map(d => d.response_time), 95);
    
    return { uptime, successRate, p95ResponseTime };
  }

  async getOutboxLagMetrics() {
    const { data, error } = await supabase
      .from('outbox_metrics')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 5 * 60 * 1000).toISOString());
    
    if (error) throw error;
    
    const lags = data.map(d => d.lag_ms);
    return {
      p50: Math.percentile(lags, 50),
      p95: Math.percentile(lags, 95),
      avg: lags.reduce((sum, lag) => sum + lag, 0) / lags.length
    };
  }

  async getAgentHealthMetrics() {
    const { data, error } = await supabase
      .from('agent_metrics')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 10 * 60 * 1000).toISOString());
    
    if (error) throw error;
    
    const totalTasks = data.reduce((sum, d) => sum + d.total_tasks, 0);
    const successfulTasks = data.reduce((sum, d) => sum + d.successful_tasks, 0);
    const quarantinedAgents = data.reduce((sum, d) => sum + d.quarantined_agents, 0);
    
    return {
      successRate: totalTasks > 0 ? successfulTasks / totalTasks : 1,
      quarantineRate: quarantinedAgents / data.length,
      totalAgents: data.length
    };
  }

  async getDLQReplayMetrics() {
    const { data, error } = await supabase
      .from('dlq_replay_metrics')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    
    if (error) throw error;
    
    const totalReplays = data.reduce((sum, d) => sum + d.replay_count, 0);
    const failedReplays = data.reduce((sum, d) => sum + d.failed_count, 0);
    const replaysPerTenant = data.reduce((sum, d) => sum + d.replays_per_tenant, 0);
    
    return {
      failRate: totalReplays > 0 ? failedReplays / totalReplays : 0,
      replaysPerTenant: replaysPerTenant / data.length,
      totalReplays
    };
  }

  async getCIHealthMetrics() {
    const { data, error } = await supabase
      .from('ci_health_metrics')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    
    if (error) throw error;
    
    return {
      selfHealTriggers: data.reduce((sum, d) => sum + d.self_heal_triggers, 0),
      rollbacks: data.reduce((sum, d) => sum + d.rollbacks, 0),
      deployments: data.reduce((sum, d) => sum + d.deployments, 0)
    };
  }

  async getTraceCoverageMetrics() {
    const { data, error } = await supabase
      .from('trace_metrics')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 15 * 60 * 1000).toISOString())
      .limit(3);
    
    if (error) throw error;
    
    return {
      coverage: data.length > 0 ? data[0].coverage_percentage : 0,
      sampleTraces: data.map(d => ({
        traceId: d.trace_id,
        spanCount: d.span_count,
        duration: d.duration_ms,
        deepLink: d.deep_link
      }))
    };
  }

  // Violation Detection Methods
  checkFlagViolations(flags) {
    const violations = [];
    
    Object.entries(CONFIG.REQUIRED_FLAGS).forEach(([key, expectedValue]) => {
      if (flags[key] !== expectedValue) {
        violations.push({
          flag: key,
          expected: expectedValue,
          actual: flags[key],
          severity: 'critical'
        });
      }
    });
    
    return violations;
  }

  checkBudgetViolations(budgets) {
    const violations = [];
    
    if (budgets.agentsConcurrency > CONFIG.BUDGETS.agentsConcurrency) {
      violations.push({
        budget: 'agentsConcurrency',
        limit: CONFIG.BUDGETS.agentsConcurrency,
        actual: budgets.agentsConcurrency,
        severity: 'high'
      });
    }
    
    if (budgets.replayCount > CONFIG.BUDGETS.replayBatchSize) {
      violations.push({
        budget: 'replayBatchSize',
        limit: CONFIG.BUDGETS.replayBatchSize,
        actual: budgets.replayCount,
        severity: 'medium'
      });
    }
    
    if (budgets.replaySize > CONFIG.BUDGETS.replayMaxSize) {
      violations.push({
        budget: 'replayMaxSize',
        limit: CONFIG.BUDGETS.replayMaxSize,
        actual: budgets.replaySize,
        severity: 'high'
      });
    }
    
    const failRate = budgets.replayFailures / budgets.replayCount;
    if (failRate > CONFIG.BUDGETS.replayFailThreshold) {
      violations.push({
        budget: 'replayFailRate',
        limit: CONFIG.BUDGETS.replayFailThreshold,
        actual: failRate,
        severity: 'critical'
      });
    }
    
    return violations;
  }

  checkSLOBreaches(sloMetrics) {
    const breaches = [];
    
    if (sloMetrics.uptime < CONFIG.SLO_GATES.uptime) {
      breaches.push({
        slo: 'uptime',
        threshold: CONFIG.SLO_GATES.uptime,
        actual: sloMetrics.uptime,
        severity: 'critical'
      });
    }
    
    if (sloMetrics.successRate < CONFIG.SLO_GATES.successRate) {
      breaches.push({
        slo: 'successRate',
        threshold: CONFIG.SLO_GATES.successRate,
        actual: sloMetrics.successRate,
        severity: 'high'
      });
    }
    
    if (sloMetrics.p95ResponseTime > CONFIG.SLO_GATES.p95ResponseTime) {
      breaches.push({
        slo: 'p95ResponseTime',
        threshold: CONFIG.SLO_GATES.p95ResponseTime,
        actual: sloMetrics.p95ResponseTime,
        severity: 'high'
      });
    }
    
    return breaches;
  }

  // Action Methods
  async triggerEmergencyStop(violations) {
    console.log('🚨 EMERGENCY STOP TRIGGERED');
    console.log('Violations:', violations);
    
    // Set emergency stop flag
    await supabase
      .from('feature_flags')
      .update({ value: true })
      .eq('key', 'autonomy.emergencyStop');
    
    await this.recordAlert('emergency_stop_triggered', JSON.stringify(violations));
  }

  async throttleSystem(violations) {
    console.log('⚠️ System throttling due to budget violations');
    console.log('Violations:', violations);
    
    // Implement throttling logic
    await this.recordAlert('system_throttled', JSON.stringify(violations));
  }

  async handleSLOBreach(breaches) {
    console.log('🚨 SLO breach detected');
    console.log('Breaches:', breaches);
    
    // Trigger CI rollback if critical
    const criticalBreaches = breaches.filter(b => b.severity === 'critical');
    if (criticalBreaches.length > 0) {
      await this.triggerCIRollback(criticalBreaches);
    }
    
    await this.recordAlert('slo_breach', JSON.stringify(breaches));
  }

  async triggerCIRollback(breaches) {
    console.log('🔄 Triggering CI rollback due to critical SLO breaches');
    
    // Implement CI rollback logic
    await this.recordAlert('ci_rollback_triggered', JSON.stringify(breaches));
  }

  async recordAlert(type, message) {
    const alert = {
      id: crypto.randomUUID(),
      type,
      message,
      timestamp: new Date().toISOString(),
      severity: this.calculateAlertSeverity(type)
    };
    
    systemState.alerts.push(alert);
    
    // Store in database
    await supabase
      .from('system_alerts')
      .insert(alert);
    
    console.log(`🚨 Alert: ${type} - ${message}`);
  }

  calculateAlertSeverity(type) {
    const severityMap = {
      'emergency_stop_triggered': 'critical',
      'slo_breach': 'high',
      'ci_rollback_triggered': 'critical',
      'system_throttled': 'medium',
      'outbox_lag_high': 'medium',
      'agent_success_rate_low': 'high',
      'dlq_replay_fail_rate_high': 'high'
    };
    
    return severityMap[type] || 'low';
  }

  // Artifact Generation
  async generateDailyArtifacts() {
    const today = new Date().toISOString().split('T')[0];
    const artifactsDir = path.join(CONFIG.ARTIFACTS_DIR, today);
    
    console.log(`📦 Generating daily artifacts for ${today}...`);
    
    // Generate flags.json
    await this.generateFlagsArtifact(artifactsDir);
    
    // Generate slo_snapshot.json
    await this.generateSLOSnapshot(artifactsDir);
    
    // Generate outbox_lag.json
    await this.generateOutboxLagArtifact(artifactsDir);
    
    // Generate alerts.sql.out
    await this.generateAlertsArtifact(artifactsDir);
    
    // Generate trace-sample.txt
    await this.generateTraceSample(artifactsDir);
    
    // Generate audit_digest.json
    await this.generateAuditDigest(artifactsDir);
    
    console.log(`✅ Daily artifacts generated in ${artifactsDir}`);
  }

  async generateFlagsArtifact(artifactsDir) {
    const flags = await this.getFeatureFlags();
    const budgets = await this.getBudgetMetrics();
    
    const artifact = {
      timestamp: new Date().toISOString(),
      flags: { ...CONFIG.REQUIRED_FLAGS, ...flags },
      budgets: { ...CONFIG.BUDGETS, ...budgets }
    };
    
    fs.writeFileSync(
      path.join(artifactsDir, 'flags.json'),
      JSON.stringify(artifact, null, 2)
    );
  }

  async generateSLOSnapshot(artifactsDir) {
    const sloMetrics = await this.getSLOMetrics();
    const outboxLag = await this.getOutboxLagMetrics();
    const agentHealth = await this.getAgentHealthMetrics();
    const dlqReplay = await this.getDLQReplayMetrics();
    const ciHealth = await this.getCIHealthMetrics();
    
    const artifact = {
      timestamp: new Date().toISOString(),
      uptime: sloMetrics.uptime,
      successRate: sloMetrics.successRate,
      p95ResponseTime: sloMetrics.p95ResponseTime,
      outboxLagP95: outboxLag.p95,
      outboxLagAvg: outboxLag.avg,
      agentSuccessRate: agentHealth.successRate,
      agentQuarantineRate: agentHealth.quarantineRate,
      dlqReplayFailRate: dlqReplay.failRate,
      ciSelfHealTriggers: ciHealth.selfHealTriggers
    };
    
    fs.writeFileSync(
      path.join(artifactsDir, 'slo_snapshot.json'),
      JSON.stringify(artifact, null, 2)
    );
  }

  async generateOutboxLagArtifact(artifactsDir) {
    const outboxLag = await this.getOutboxLagMetrics();
    
    const artifact = {
      timestamp: new Date().toISOString(),
      p50: outboxLag.p50,
      p95: outboxLag.p95,
      avg: outboxLag.avg
    };
    
    fs.writeFileSync(
      path.join(artifactsDir, 'outbox_lag.json'),
      JSON.stringify(artifact, null, 2)
    );
  }

  async generateAlertsArtifact(artifactsDir) {
    const { data: alerts, error } = await supabase
      .from('system_alerts')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    
    const alertOutput = alerts.length === 0 ? 
      '-- No active alerts in the last 24 hours --' :
      alerts.map(alert => 
        `${alert.timestamp} [${alert.severity.toUpperCase()}] ${alert.type}: ${alert.message}`
      ).join('\n');
    
    fs.writeFileSync(
      path.join(artifactsDir, 'alerts.sql.out'),
      alertOutput
    );
  }

  async generateTraceSample(artifactsDir) {
    const traceMetrics = await this.getTraceCoverageMetrics();
    
    const traceOutput = traceMetrics.sampleTraces.length === 0 ?
      '-- No trace samples available --' :
      traceMetrics.sampleTraces.map(trace =>
        `Trace ID: ${trace.traceId}\nSpans: ${trace.spanCount}\nDuration: ${trace.duration}ms\nDeep Link: ${trace.deepLink}\n`
      ).join('\n---\n\n');
    
    fs.writeFileSync(
      path.join(artifactsDir, 'trace-sample.txt'),
      traceOutput
    );
  }

  async generateAuditDigest(artifactsDir) {
    const { data: auditLogs, error } = await supabase
      .from('audit_logs')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .eq('critical', true)
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    
    const artifact = {
      timestamp: new Date().toISOString(),
      criticalActions: auditLogs.length,
      actions: auditLogs.map(log => ({
        timestamp: log.timestamp,
        action: log.action,
        user: log.user_id,
        resource: log.resource,
        details: log.details
      }))
    };
    
    fs.writeFileSync(
      path.join(artifactsDir, 'audit_digest.json'),
      JSON.stringify(artifact, null, 2)
    );
  }

  // Cleanup
  async cleanupOldArtifacts() {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - CONFIG.RETENTION_DAYS);
    
    const artifacts = fs.readdirSync(CONFIG.ARTIFACTS_DIR);
    
    for (const artifact of artifacts) {
      const artifactPath = path.join(CONFIG.ARTIFACTS_DIR, artifact);
      const stat = fs.statSync(artifactPath);
      
      if (stat.isDirectory() && stat.mtime < cutoffDate) {
        fs.rmSync(artifactPath, { recursive: true, force: true });
        console.log(`🗑️ Cleaned up old artifacts: ${artifact}`);
      }
    }
  }

  // Utility Methods
  shutdown() {
    console.log('🛑 Shutting down Green Posture Monitor...');
    systemState.isRunning = false;
    process.exit(0);
  }
}

// Math utility for percentiles
Math.percentile = function(array, percentile) {
  const sorted = array.sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[index];
};

// Main execution
async function main() {
  const monitor = new GreenPostureMonitor();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => monitor.shutdown());
  process.on('SIGTERM', () => monitor.shutdown());
  
  try {
    await monitor.initialize();
    console.log('🟢 Green Posture Monitor is running...');
  } catch (error) {
    console.error('❌ Failed to initialize Green Posture Monitor:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { GreenPostureMonitor, CONFIG };
