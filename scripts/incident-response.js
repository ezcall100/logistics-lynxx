#!/usr/bin/env node

/**
 * 🚨 Incident Response - One-Page Incident Levers
 * 
 * Implements emergency response procedures for the autonomous system
 * Includes big red button, soft degrade, and rollback mechanisms
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const INCIDENT_CONFIG = {
  // Emergency Levels
  LEVELS: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low'
  },
  
  // Response Actions
  ACTIONS: {
    EMERGENCY_STOP: 'emergency_stop',
    SOFT_DEGRADE: 'soft_degrade',
    ROLLBACK: 'rollback',
    THROTTLE: 'throttle',
    ISOLATE: 'isolate'
  },
  
  // Degradation Levels
  DEGRADATION: {
    FULL: 'full',
    PARTIAL: 'partial',
    MINIMAL: 'minimal'
  },
  
  // Timeouts
  TIMEOUTS: {
    emergencyStopTimeout: 30 * 1000, // 30 seconds
    softDegradeTimeout: 60 * 1000, // 1 minute
    rollbackTimeout: 5 * 60 * 1000, // 5 minutes
    healthCheckInterval: 10 * 1000 // 10 seconds
  },
  
  // Logging
  LOG_DIR: path.join(__dirname, '../logs/incident-response'),
  ARTIFACTS_DIR: path.join(__dirname, '../artifacts/incident-response')
};

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class IncidentResponse {
  constructor() {
    this.ensureDirectories();
    this.activeIncidents = new Map();
    this.responseHistory = [];
  }

  ensureDirectories() {
    [INCIDENT_CONFIG.LOG_DIR, INCIDENT_CONFIG.ARTIFACTS_DIR].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async handleIncident(incidentData) {
    const incidentId = crypto.randomUUID();
    const incident = {
      id: incidentId,
      timestamp: new Date().toISOString(),
      level: incidentData.level || INCIDENT_CONFIG.LEVELS.MEDIUM,
      type: incidentData.type,
      description: incidentData.description,
      source: incidentData.source,
      status: 'active',
      actions: [],
      resolution: null
    };

    console.log(`🚨 Incident ${incidentId} detected: ${incident.type}`);
    console.log(`📋 Level: ${incident.level}, Description: ${incident.description}`);

    this.activeIncidents.set(incidentId, incident);

    try {
      // Determine response based on incident level
      switch (incident.level) {
        case INCIDENT_CONFIG.LEVELS.CRITICAL:
          await this.handleCriticalIncident(incident);
          break;
        case INCIDENT_CONFIG.LEVELS.HIGH:
          await this.handleHighIncident(incident);
          break;
        case INCIDENT_CONFIG.LEVELS.MEDIUM:
          await this.handleMediumIncident(incident);
          break;
        case INCIDENT_CONFIG.LEVELS.LOW:
          await this.handleLowIncident(incident);
          break;
        default:
          throw new Error(`Unknown incident level: ${incident.level}`);
      }

      // Save incident record
      await this.saveIncidentRecord(incident);
      
      return incident;

    } catch (error) {
      console.error(`❌ Failed to handle incident ${incidentId}:`, error);
      incident.status = 'failed';
      incident.error = error.message;
      await this.saveIncidentRecord(incident);
      throw error;
    }
  }

  async handleCriticalIncident(incident) {
    console.log('🚨 CRITICAL INCIDENT - Initiating emergency procedures...');
    
    // Step 1: Big Red Button - Emergency Stop
    const emergencyStopResult = await this.triggerEmergencyStop(incident);
    incident.actions.push(emergencyStopResult);
    
    // Step 2: Immediate isolation
    const isolationResult = await this.isolateAffectedComponents(incident);
    incident.actions.push(isolationResult);
    
    // Step 3: Alert stakeholders
    const alertResult = await this.alertStakeholders(incident, 'critical');
    incident.actions.push(alertResult);
    
    // Step 4: Begin investigation
    const investigationResult = await this.beginInvestigation(incident);
    incident.actions.push(investigationResult);
    
    console.log('✅ Critical incident response initiated');
  }

  async handleHighIncident(incident) {
    console.log('⚠️ HIGH INCIDENT - Initiating soft degrade procedures...');
    
    // Step 1: Soft degrade
    const degradeResult = await this.triggerSoftDegrade(incident);
    incident.actions.push(degradeResult);
    
    // Step 2: Throttle affected services
    const throttleResult = await this.throttleServices(incident);
    incident.actions.push(throttleResult);
    
    // Step 3: Monitor for escalation
    const monitorResult = await this.monitorForEscalation(incident);
    incident.actions.push(monitorResult);
    
    // Step 4: Alert stakeholders
    const alertResult = await this.alertStakeholders(incident, 'high');
    incident.actions.push(alertResult);
    
    console.log('✅ High incident response initiated');
  }

  async handleMediumIncident(incident) {
    console.log('📊 MEDIUM INCIDENT - Initiating monitoring procedures...');
    
    // Step 1: Increase monitoring
    const monitoringResult = await this.increaseMonitoring(incident);
    incident.actions.push(monitoringResult);
    
    // Step 2: Prepare rollback if needed
    const rollbackPrepResult = await this.prepareRollback(incident);
    incident.actions.push(rollbackPrepResult);
    
    // Step 3: Alert stakeholders
    const alertResult = await this.alertStakeholders(incident, 'medium');
    incident.actions.push(alertResult);
    
    console.log('✅ Medium incident response initiated');
  }

  async handleLowIncident(incident) {
    console.log('📝 LOW INCIDENT - Initiating logging procedures...');
    
    // Step 1: Log incident
    const loggingResult = await this.logIncident(incident);
    incident.actions.push(loggingResult);
    
    // Step 2: Monitor for escalation
    const monitorResult = await this.monitorForEscalation(incident);
    incident.actions.push(monitorResult);
    
    console.log('✅ Low incident response initiated');
  }

  // Big Red Button - Emergency Stop
  async triggerEmergencyStop(incident) {
    const actionId = crypto.randomUUID();
    const startTime = Date.now();
    
    try {
      console.log('🔴 BIG RED BUTTON: Triggering emergency stop...');
      
      // Step 1: Set emergency stop flag
      await this.setEmergencyStopFlag(true);
      
      // Step 2: Halt all autonomous writes
      await this.haltAutonomousWrites();
      
      // Step 3: Stop all agents
      await this.stopAllAgents();
      
      // Step 4: Pause all workflows
      await this.pauseAllWorkflows();
      
      // Step 5: Verify system is stopped
      const verificationResult = await this.verifySystemStopped();
      
      const duration = Date.now() - startTime;
      console.log(`✅ Emergency stop completed in ${duration}ms`);
      
      return {
        id: actionId,
        type: INCIDENT_CONFIG.ACTIONS.EMERGENCY_STOP,
        timestamp: new Date().toISOString(),
        duration,
        success: true,
        details: {
          emergencyStopActive: true,
          autonomousWritesHalted: true,
          agentsStopped: true,
          workflowsPaused: true,
          systemVerified: verificationResult.stopped
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ Emergency stop failed: ${error.message}`);
      
      return {
        id: actionId,
        type: INCIDENT_CONFIG.ACTIONS.EMERGENCY_STOP,
        timestamp: new Date().toISOString(),
        duration,
        success: false,
        error: error.message
      };
    }
  }

  // Soft Degrade
  async triggerSoftDegrade(incident) {
    const actionId = crypto.randomUUID();
    const startTime = Date.now();
    
    try {
      console.log('🟡 SOFT DEGRADE: Initiating graceful degradation...');
      
      // Step 1: Lower concurrency
      const concurrencyResult = await this.lowerConcurrency();
      
      // Step 2: Pause DLQ processing
      const dlqResult = await this.pauseDLQProcessing();
      
      // Step 3: Flip canary flags to SAFE
      const canaryResult = await this.setCanaryFlagsSafe();
      
      // Step 4: Reduce resource allocation
      const resourceResult = await this.reduceResourceAllocation();
      
      const duration = Date.now() - startTime;
      console.log(`✅ Soft degrade completed in ${duration}ms`);
      
      return {
        id: actionId,
        type: INCIDENT_CONFIG.ACTIONS.SOFT_DEGRADE,
        timestamp: new Date().toISOString(),
        duration,
        success: true,
        details: {
          concurrencyReduced: concurrencyResult.success,
          dlqPaused: dlqResult.success,
          canaryFlagsSafe: canaryResult.success,
          resourcesReduced: resourceResult.success
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ Soft degrade failed: ${error.message}`);
      
      return {
        id: actionId,
        type: INCIDENT_CONFIG.ACTIONS.SOFT_DEGRADE,
        timestamp: new Date().toISOString(),
        duration,
        success: false,
        error: error.message
      };
    }
  }

  // Rollback
  async triggerRollback(incident) {
    const actionId = crypto.randomUUID();
    const startTime = Date.now();
    
    try {
      console.log('🔄 ROLLBACK: Initiating CI self-heal workflow...');
      
      // Step 1: Trigger CI rollback
      const ciResult = await this.triggerCIRollback();
      
      // Step 2: Revert to last known good state
      const revertResult = await this.revertToLastKnownGood();
      
      // Step 3: Post audit and trace links
      const auditResult = await this.postAuditAndTraces(incident);
      
      // Step 4: Verify rollback success
      const verificationResult = await this.verifyRollbackSuccess();
      
      const duration = Date.now() - startTime;
      console.log(`✅ Rollback completed in ${duration}ms`);
      
      return {
        id: actionId,
        type: INCIDENT_CONFIG.ACTIONS.ROLLBACK,
        timestamp: new Date().toISOString(),
        duration,
        success: true,
        details: {
          ciRollbackTriggered: ciResult.success,
          revertedToGoodState: revertResult.success,
          auditPosted: auditResult.success,
          rollbackVerified: verificationResult.success
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ Rollback failed: ${error.message}`);
      
      return {
        id: actionId,
        type: INCIDENT_CONFIG.ACTIONS.ROLLBACK,
        timestamp: new Date().toISOString(),
        duration,
        success: false,
        error: error.message
      };
    }
  }

  // Resume System
  async resumeSystem(incidentId) {
    const incident = this.activeIncidents.get(incidentId);
    if (!incident) {
      throw new Error(`Incident ${incidentId} not found`);
    }

    console.log(`🟢 RESUMING SYSTEM after incident ${incidentId}...`);
    
    const startTime = Date.now();
    
    try {
      // Step 1: Clear emergency stop flag
      await this.setEmergencyStopFlag(false);
      
      // Step 2: Resume autonomous writes
      await this.resumeAutonomousWrites();
      
      // Step 3: Restart agents
      await this.restartAgents();
      
      // Step 4: Resume workflows
      await this.resumeWorkflows();
      
      // Step 5: Verify system is running
      const verificationResult = await this.verifySystemRunning();
      
      // Step 6: Mark incident as resolved
      incident.status = 'resolved';
      incident.resolution = {
        timestamp: new Date().toISOString(),
        method: 'manual_resume',
        duration: Date.now() - new Date(incident.timestamp).getTime()
      };
      
      const duration = Date.now() - startTime;
      console.log(`✅ System resumed in ${duration}ms`);
      
      // Save updated incident record
      await this.saveIncidentRecord(incident);
      
      return {
        success: true,
        duration,
        systemRunning: verificationResult.running
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`❌ System resume failed: ${error.message}`);
      
      return {
        success: false,
        duration,
        error: error.message
      };
    }
  }

  // Helper Methods for Emergency Stop
  async setEmergencyStopFlag(enabled) {
    const { error } = await supabase
      .from('feature_flags')
      .update({ value: enabled })
      .eq('key', 'autonomy.emergencyStop');
    
    if (error) throw error;
  }

  async haltAutonomousWrites() {
    const { error } = await supabase
      .from('system_config')
      .update({ autonomous_writes_enabled: false })
      .eq('key', 'autonomous_writes');
    
    if (error) throw error;
  }

  async stopAllAgents() {
    const { error } = await supabase
      .from('agent_status')
      .update({ 
        status: 'stopped',
        stopped_at: new Date().toISOString()
      })
      .eq('status', 'running');
    
    if (error) throw error;
  }

  async pauseAllWorkflows() {
    const { error } = await supabase
      .from('workflow_status')
      .update({ 
        status: 'paused',
        paused_at: new Date().toISOString()
      })
      .eq('status', 'running');
    
    if (error) throw error;
  }

  async verifySystemStopped() {
    const { data: agents } = await supabase
      .from('agent_status')
      .select('status')
      .eq('status', 'running');
    
    const { data: workflows } = await supabase
      .from('workflow_status')
      .select('status')
      .eq('status', 'running');
    
    const { data: flags } = await supabase
      .from('feature_flags')
      .select('value')
      .eq('key', 'autonomy.emergencyStop')
      .single();
    
    return {
      stopped: agents.length === 0 && workflows.length === 0 && flags.value === true,
      runningAgents: agents.length,
      runningWorkflows: workflows.length,
      emergencyStopActive: flags.value
    };
  }

  // Helper Methods for Soft Degrade
  async lowerConcurrency() {
    const { error } = await supabase
      .from('system_config')
      .update({ 
        max_concurrency: 50, // Reduce from 150
        updated_at: new Date().toISOString()
      })
      .eq('key', 'agent_concurrency');
    
    if (error) throw error;
    
    return { success: true };
  }

  async pauseDLQProcessing() {
    const { error } = await supabase
      .from('dlq_config')
      .update({ 
        processing_enabled: false,
        paused_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return { success: true };
  }

  async setCanaryFlagsSafe() {
    const canaryFlags = [
      'canary.rollout_percentage',
      'canary.auto_rollback',
      'canary.health_threshold'
    ];
    
    for (const flag of canaryFlags) {
      const { error } = await supabase
        .from('feature_flags')
        .update({ value: 'SAFE' })
        .eq('key', flag);
      
      if (error) throw error;
    }
    
    return { success: true };
  }

  async reduceResourceAllocation() {
    const { error } = await supabase
      .from('system_config')
      .update({ 
        resource_allocation: 'minimal',
        updated_at: new Date().toISOString()
      })
      .eq('key', 'resource_allocation');
    
    if (error) throw error;
    
    return { success: true };
  }

  // Helper Methods for Rollback
  async triggerCIRollback() {
    // Trigger CI/CD rollback workflow
    const { error } = await supabase
      .from('ci_workflows')
      .insert({
        type: 'rollback',
        status: 'triggered',
        triggered_at: new Date().toISOString(),
        reason: 'incident_response'
      });
    
    if (error) throw error;
    
    return { success: true };
  }

  async revertToLastKnownGood() {
    // Get last known good deployment
    const { data: lastGoodDeployment } = await supabase
      .from('deployments')
      .select('*')
      .eq('status', 'successful')
      .order('deployed_at', { ascending: false })
      .limit(1)
      .single();
    
    if (!lastGoodDeployment) {
      throw new Error('No last known good deployment found');
    }
    
    // Trigger rollback to this deployment
    const { error } = await supabase
      .from('rollback_requests')
      .insert({
        deployment_id: lastGoodDeployment.id,
        reason: 'incident_response',
        requested_at: new Date().toISOString()
      });
    
    if (error) throw error;
    
    return { success: true, deploymentId: lastGoodDeployment.id };
  }

  async postAuditAndTraces(incident) {
    // Generate audit report
    const auditReport = await this.generateAuditReport(incident);
    
    // Get trace links
    const traceLinks = await this.getTraceLinks(incident);
    
    // Post to notification channels
    await this.postToNotificationChannels({
      type: 'rollback_completed',
      incident: incident.id,
      audit: auditReport,
      traces: traceLinks
    });
    
    return { success: true };
  }

  async verifyRollbackSuccess() {
    // Check if system is back to stable state
    const healthCheck = await this.performHealthCheck();
    const sloCheck = await this.checkSLOCompliance();
    
    return {
      success: healthCheck.healthy && sloCheck.compliant,
      health: healthCheck,
      slo: sloCheck
    };
  }

  // Helper Methods for System Resume
  async resumeAutonomousWrites() {
    const { error } = await supabase
      .from('system_config')
      .update({ autonomous_writes_enabled: true })
      .eq('key', 'autonomous_writes');
    
    if (error) throw error;
  }

  async restartAgents() {
    const { error } = await supabase
      .from('agent_status')
      .update({ 
        status: 'running',
        started_at: new Date().toISOString()
      })
      .eq('status', 'stopped');
    
    if (error) throw error;
  }

  async resumeWorkflows() {
    const { error } = await supabase
      .from('workflow_status')
      .update({ 
        status: 'running',
        resumed_at: new Date().toISOString()
      })
      .eq('status', 'paused');
    
    if (error) throw error;
  }

  async verifySystemRunning() {
    const { data: agents } = await supabase
      .from('agent_status')
      .select('status')
      .eq('status', 'running');
    
    const { data: workflows } = await supabase
      .from('workflow_status')
      .select('status')
      .eq('status', 'running');
    
    return {
      running: agents.length > 0 && workflows.length > 0,
      runningAgents: agents.length,
      runningWorkflows: workflows.length
    };
  }

  // Additional Helper Methods
  async isolateAffectedComponents(incident) {
    // Implementation would isolate specific components based on incident type
    return { success: true };
  }

  async alertStakeholders(incident, level) {
    // Implementation would send alerts to appropriate stakeholders
    return { success: true };
  }

  async beginInvestigation(incident) {
    // Implementation would start investigation procedures
    return { success: true };
  }

  async throttleServices(incident) {
    // Implementation would throttle specific services
    return { success: true };
  }

  async monitorForEscalation(incident) {
    // Implementation would set up escalation monitoring
    return { success: true };
  }

  async increaseMonitoring(incident) {
    // Implementation would increase monitoring frequency
    return { success: true };
  }

  async prepareRollback(incident) {
    // Implementation would prepare rollback procedures
    return { success: true };
  }

  async logIncident(incident) {
    // Implementation would log incident details
    return { success: true };
  }

  async generateAuditReport(incident) {
    // Implementation would generate audit report
    return { report: 'audit_report' };
  }

  async getTraceLinks(incident) {
    // Implementation would get trace links
    return { traces: ['trace1', 'trace2'] };
  }

  async postToNotificationChannels(data) {
    // Implementation would post to notification channels
    return { success: true };
  }

  async performHealthCheck() {
    // Implementation would perform health check
    return { healthy: true };
  }

  async checkSLOCompliance() {
    // Implementation would check SLO compliance
    return { compliant: true };
  }

  async saveIncidentRecord(incident) {
    // Save to database
    await supabase
      .from('incident_records')
      .insert(incident);
    
    // Save to file
    const filename = `incident-${incident.id}-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(INCIDENT_CONFIG.ARTIFACTS_DIR, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(incident, null, 2));
  }

  // Utility Methods
  getActiveIncidents() {
    return Array.from(this.activeIncidents.values());
  }

  getIncidentHistory() {
    return this.responseHistory;
  }

  async getIncidentById(incidentId) {
    return this.activeIncidents.get(incidentId);
  }
}

// Main execution
async function main() {
  const incidentResponse = new IncidentResponse();
  
  const command = process.argv[2];
  const incidentData = process.argv[3] ? JSON.parse(process.argv[3]) : null;
  
  try {
    switch (command) {
      case 'handle':
        if (!incidentData) {
          throw new Error('Incident data required for handle command');
        }
        const result = await incidentResponse.handleIncident(incidentData);
        console.log('✅ Incident handled:', result.id);
        break;
        
      case 'resume':
        const incidentId = process.argv[3];
        if (!incidentId) {
          throw new Error('Incident ID required for resume command');
        }
        const resumeResult = await incidentResponse.resumeSystem(incidentId);
        console.log('✅ System resumed:', resumeResult.success);
        break;
        
      case 'list':
        const activeIncidents = incidentResponse.getActiveIncidents();
        console.log('📋 Active incidents:', activeIncidents.length);
        activeIncidents.forEach(incident => {
          console.log(`  - ${incident.id}: ${incident.type} (${incident.level})`);
        });
        break;
        
      case 'test':
        // Test incident handling
        const testIncident = {
          level: INCIDENT_CONFIG.LEVELS.MEDIUM,
          type: 'test_incident',
          description: 'Test incident for validation',
          source: 'manual_test'
        };
        await incidentResponse.handleIncident(testIncident);
        console.log('✅ Test incident handled successfully');
        break;
        
      default:
        console.error('Invalid command. Use: handle, resume, list, or test');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Incident response failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { IncidentResponse, INCIDENT_CONFIG };
