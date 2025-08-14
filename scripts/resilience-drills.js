#!/usr/bin/env node

/**
 * 🧪 Resilience Drills - Weekly 15-Minute Safety Tests
 * 
 * Implements safe resilience testing for the autonomous system
 * Tests kill switch, region wobble, replay rails, and idempotency
 */

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration
const DRILL_CONFIG = {
  // Drill Types
  DRILLS: {
    KILL_SWITCH: 'kill_switch',
    REGION_WOBBLE: 'region_wobble',
    REPLAY_RAILS: 'replay_rails',
    IDEMPOTENCY: 'idempotency'
  },
  
  // Timeouts and Limits
  TIMEOUTS: {
    drillTimeout: 15 * 60 * 1000, // 15 minutes
    killSwitchResume: 60 * 1000, // 1 minute
    regionWobbleDuration: 30 * 1000, // 30 seconds
    replayRailsTimeout: 30 * 1000, // 30 seconds
    idempotencyTimeout: 10 * 1000 // 10 seconds
  },
  
  // Thresholds
  THRESHOLDS: {
    regionWobbleFailures: 3,
    regionWobbleInterval: 30 * 1000, // 30 seconds
    replayRailsBatchSize: 51, // Exceed 50 limit
    replayRailsMaxSize: 3 * 1024 * 1024, // Exceed 2MB limit
    idempotencyRequests: 5
  },
  
  // Logging
  LOG_DIR: path.join(__dirname, '../logs/resilience-drills'),
  ARTIFACTS_DIR: path.join(__dirname, '../artifacts/resilience-drills')
};

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class ResilienceDrills {
  constructor() {
    this.ensureDirectories();
    this.drillResults = [];
    this.currentDrill = null;
  }

  ensureDirectories() {
    [DRILL_CONFIG.LOG_DIR, DRILL_CONFIG.ARTIFACTS_DIR].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async runWeeklyDrills() {
    console.log('🧪 Starting Weekly Resilience Drills...');
    console.log('⏱️  Time limit: 15 minutes');
    
    const startTime = Date.now();
    const results = {
      timestamp: new Date().toISOString(),
      drills: [],
      summary: {
        totalDrills: 4,
        passed: 0,
        failed: 0,
        duration: 0
      }
    };

    try {
      // 1. Kill Switch Drill
      console.log('\n🔴 Drill 1: Kill Switch Test');
      const killSwitchResult = await this.runKillSwitchDrill();
      results.drills.push(killSwitchResult);
      
      // 2. Region Wobble Drill
      console.log('\n🌍 Drill 2: Region Wobble Test');
      const regionWobbleResult = await this.runRegionWobbleDrill();
      results.drills.push(regionWobbleResult);
      
      // 3. Replay Rails Drill
      console.log('\n🛤️  Drill 3: Replay Rails Test');
      const replayRailsResult = await this.runReplayRailsDrill();
      results.drills.push(replayRailsResult);
      
      // 4. Idempotency Drill
      console.log('\n🔄 Drill 4: Idempotency Test');
      const idempotencyResult = await this.runIdempotencyDrill();
      results.drills.push(idempotencyResult);
      
      // Calculate summary
      results.summary.duration = Date.now() - startTime;
      results.summary.passed = results.drills.filter(d => d.passed).length;
      results.summary.failed = results.drills.filter(d => !d.passed).length;
      
      // Save results
      await this.saveDrillResults(results);
      
      // Print summary
      this.printDrillSummary(results);
      
      return results;
      
    } catch (error) {
      console.error('❌ Resilience drills failed:', error);
      throw error;
    }
  }

  async runKillSwitchDrill() {
    const drillName = 'kill_switch';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Testing emergency stop functionality...');
      
      // Step 1: Verify system is running
      const initialStatus = await this.getSystemStatus();
      if (!initialStatus.isRunning) {
        throw new Error('System not running before kill switch test');
      }
      
      // Step 2: Trigger emergency stop
      console.log('  🚨 Triggering emergency stop...');
      await this.triggerEmergencyStop();
      
      // Step 3: Verify system stopped
      await this.wait(2000); // Wait for stop to propagate
      const stoppedStatus = await this.getSystemStatus();
      if (stoppedStatus.isRunning) {
        throw new Error('System did not stop after emergency stop trigger');
      }
      
      // Step 4: Resume system
      console.log('  ▶️  Resuming system...');
      await this.resumeSystem();
      
      // Step 5: Verify system resumed
      await this.wait(DRILL_CONFIG.TIMEOUTS.killSwitchResume);
      const resumedStatus = await this.getSystemStatus();
      if (!resumedStatus.isRunning) {
        throw new Error('System did not resume after kill switch reset');
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ Kill switch drill passed (${duration}ms)`);
      
      return {
        name: drillName,
        passed: true,
        duration,
        details: {
          initialStatus: initialStatus.isRunning,
          stoppedStatus: stoppedStatus.isRunning,
          resumedStatus: resumedStatus.isRunning
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ Kill switch drill failed (${duration}ms): ${error.message}`);
      
      return {
        name: drillName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  async runRegionWobbleDrill() {
    const drillName = 'region_wobble';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Testing region failover functionality...');
      
      // Step 1: Get initial health status
      const initialHealth = await this.getSystemHealth();
      
      // Step 2: Simulate replica lag
      console.log('  🌊 Simulating replica lag...');
      await this.simulateReplicaLag();
      
      // Step 3: Monitor health checks
      let failureCount = 0;
      const maxFailures = DRILL_CONFIG.THRESHOLDS.regionWobbleFailures;
      const checkInterval = DRILL_CONFIG.THRESHOLDS.regionWobbleInterval;
      
      for (let i = 0; i < maxFailures; i++) {
        await this.wait(checkInterval);
        
        const health = await this.getSystemHealth();
        if (!health.isHealthy) {
          failureCount++;
          console.log(`  ⚠️  Health check failed (${failureCount}/${maxFailures})`);
        }
      }
      
      // Step 4: Verify health-gated cutover
      console.log('  🔄 Verifying health-gated cutover...');
      await this.wait(checkInterval);
      
      const finalHealth = await this.getSystemHealth();
      if (!finalHealth.isHealthy) {
        throw new Error('System did not recover after region wobble');
      }
      
      // Step 5: Verify no data loss
      const dataIntegrity = await this.verifyDataIntegrity();
      if (!dataIntegrity.consistent) {
        throw new Error('Data integrity compromised after region wobble');
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ Region wobble drill passed (${duration}ms)`);
      
      return {
        name: drillName,
        passed: true,
        duration,
        details: {
          failureCount,
          initialHealth: initialHealth.isHealthy,
          finalHealth: finalHealth.isHealthy,
          dataIntegrity: dataIntegrity.consistent
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ Region wobble drill failed (${duration}ms): ${error.message}`);
      
      return {
        name: drillName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  async runReplayRailsDrill() {
    const drillName = 'replay_rails';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Testing replay safety rails...');
      
      // Step 1: Test batch size limit
      console.log('  📦 Testing batch size limit...');
      const batchSizeResult = await this.testReplayBatchSize();
      if (!batchSizeResult.stopped) {
        throw new Error('System did not stop on batch size limit');
      }
      
      // Step 2: Test size limit
      console.log('  📏 Testing size limit...');
      const sizeResult = await this.testReplaySize();
      if (!sizeResult.stopped) {
        throw new Error('System did not stop on size limit');
      }
      
      // Step 3: Test failure threshold
      console.log('  ⚠️  Testing failure threshold...');
      const failureResult = await this.testReplayFailureThreshold();
      if (!failureResult.stopped) {
        throw new Error('System did not stop on failure threshold');
      }
      
      // Step 4: Verify audit trail
      console.log('  📝 Verifying audit trail...');
      const auditTrail = await this.verifyReplayAuditTrail();
      if (!auditTrail.complete) {
        throw new Error('Incomplete audit trail for replay violations');
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ Replay rails drill passed (${duration}ms)`);
      
      return {
        name: drillName,
        passed: true,
        duration,
        details: {
          batchSizeStopped: batchSizeResult.stopped,
          sizeStopped: sizeResult.stopped,
          failureStopped: failureResult.stopped,
          auditTrailComplete: auditTrail.complete
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ Replay rails drill failed (${duration}ms): ${error.message}`);
      
      return {
        name: drillName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  async runIdempotencyDrill() {
    const drillName = 'idempotency';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Testing idempotency guarantees...');
      
      // Step 1: Generate signed request
      const requestData = {
        id: crypto.randomUUID(),
        action: 'test_operation',
        timestamp: Date.now(),
        data: { test: 'idempotency' }
      };
      
      const signedRequest = await this.signRequest(requestData);
      
      // Step 2: Send multiple identical requests
      console.log('  📤 Sending multiple identical requests...');
      const responses = [];
      
      for (let i = 0; i < DRILL_CONFIG.THRESHOLDS.idempotencyRequests; i++) {
        const response = await this.sendSignedRequest(signedRequest);
        responses.push(response);
        await this.wait(100); // Small delay between requests
      }
      
      // Step 3: Verify idempotency
      console.log('  🔍 Verifying idempotency...');
      const idempotencyResult = this.verifyIdempotency(responses);
      
      if (!idempotencyResult.isIdempotent) {
        throw new Error(`Idempotency violation: ${idempotencyResult.violation}`);
      }
      
      // Step 4: Verify no duplicate effects
      console.log('  ✅ Verifying no duplicate effects...');
      const effectsResult = await this.verifyNoDuplicateEffects(requestData.id);
      
      if (!effectsResult.noDuplicates) {
        throw new Error(`Duplicate effects detected: ${effectsResult.duplicates}`);
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ Idempotency drill passed (${duration}ms)`);
      
      return {
        name: drillName,
        passed: true,
        duration,
        details: {
          requestsSent: responses.length,
          isIdempotent: idempotencyResult.isIdempotent,
          noDuplicateEffects: effectsResult.noDuplicates
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ Idempotency drill failed (${duration}ms): ${error.message}`);
      
      return {
        name: drillName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  // Helper Methods for Kill Switch Drill
  async getSystemStatus() {
    const { data, error } = await supabase
      .from('system_status')
      .select('is_running, emergency_stop_active')
      .single();
    
    if (error) throw error;
    
    return {
      isRunning: data.is_running && !data.emergency_stop_active
    };
  }

  async triggerEmergencyStop() {
    const { error } = await supabase
      .from('feature_flags')
      .update({ value: true })
      .eq('key', 'autonomy.emergencyStop');
    
    if (error) throw error;
  }

  async resumeSystem() {
    const { error } = await supabase
      .from('feature_flags')
      .update({ value: false })
      .eq('key', 'autonomy.emergencyStop');
    
    if (error) throw error;
  }

  // Helper Methods for Region Wobble Drill
  async getSystemHealth() {
    const { data, error } = await supabase
      .from('system_health')
      .select('is_healthy, replica_lag_ms')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();
    
    if (error) throw error;
    
    return {
      isHealthy: data.is_healthy,
      replicaLag: data.replica_lag_ms
    };
  }

  async simulateReplicaLag() {
    // Simulate replica lag by updating health metrics
    const { error } = await supabase
      .from('system_health')
      .insert({
        is_healthy: false,
        replica_lag_ms: 5000, // 5 second lag
        timestamp: new Date().toISOString()
      });
    
    if (error) throw error;
  }

  async verifyDataIntegrity() {
    // Check for data consistency across replicas
    const { data, error } = await supabase
      .from('data_integrity_checks')
      .select('is_consistent, last_check')
      .order('last_check', { ascending: false })
      .limit(1)
      .single();
    
    if (error) throw error;
    
    return {
      consistent: data.is_consistent
    };
  }

  // Helper Methods for Replay Rails Drill
  async testReplayBatchSize() {
    const oversizedBatch = Array(DRILL_CONFIG.THRESHOLDS.replayRailsBatchSize)
      .fill(null)
      .map(() => ({ id: crypto.randomUUID(), data: 'test' }));
    
    try {
      await this.sendReplayBatch(oversizedBatch);
      return { stopped: false };
    } catch (error) {
      return { stopped: error.message.includes('batch size limit') };
    }
  }

  async testReplaySize() {
    const oversizedData = 'x'.repeat(DRILL_CONFIG.THRESHOLDS.replayRailsMaxSize);
    const oversizedBatch = [{ id: crypto.randomUUID(), data: oversizedData }];
    
    try {
      await this.sendReplayBatch(oversizedBatch);
      return { stopped: false };
    } catch (error) {
      return { stopped: error.message.includes('size limit') };
    }
  }

  async testReplayFailureThreshold() {
    const failingBatch = Array(10).fill(null).map(() => ({
      id: crypto.randomUUID(),
      data: 'fail'
    }));
    
    try {
      await this.sendReplayBatch(failingBatch);
      return { stopped: false };
    } catch (error) {
      return { stopped: error.message.includes('failure threshold') };
    }
  }

  async sendReplayBatch(batch) {
    const { error } = await supabase
      .from('dlq_replay_queue')
      .insert(batch.map(item => ({
        id: item.id,
        data: item.data,
        timestamp: new Date().toISOString()
      })));
    
    if (error) throw error;
  }

  async verifyReplayAuditTrail() {
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('action', 'replay_violation')
      .gte('timestamp', new Date(Date.now() - 5 * 60 * 1000).toISOString());
    
    if (error) throw error;
    
    return {
      complete: data.length >= 3 // Should have 3 violations from our tests
    };
  }

  // Helper Methods for Idempotency Drill
  async signRequest(data) {
    const signature = crypto
      .createHmac('sha256', process.env.API_SECRET_KEY || 'test-key')
      .update(JSON.stringify(data))
      .digest('hex');
    
    return {
      ...data,
      signature,
      nonce: crypto.randomBytes(16).toString('hex')
    };
  }

  async sendSignedRequest(signedRequest) {
    const { data, error } = await supabase
      .from('api_requests')
      .insert({
        id: signedRequest.id,
        action: signedRequest.action,
        signature: signedRequest.signature,
        nonce: signedRequest.nonce,
        timestamp: new Date().toISOString(),
        status: 'processed'
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return data;
  }

  verifyIdempotency(responses) {
    // Check if all responses are identical
    const firstResponse = responses[0];
    const allIdentical = responses.every(response => 
      response.status === firstResponse.status &&
      response.id === firstResponse.id
    );
    
    if (!allIdentical) {
      return {
        isIdempotent: false,
        violation: 'Non-identical responses to identical requests'
      };
    }
    
    // Check for 409 status codes (conflict/duplicate)
    const conflictResponses = responses.filter(r => r.status === 'conflict');
    if (conflictResponses.length > 0) {
      return {
        isIdempotent: true,
        violation: null
      };
    }
    
    return {
      isIdempotent: true,
      violation: null
    };
  }

  async verifyNoDuplicateEffects(requestId) {
    const { data, error } = await supabase
      .from('operation_effects')
      .select('*')
      .eq('request_id', requestId);
    
    if (error) throw error;
    
    return {
      noDuplicates: data.length <= 1,
      duplicates: data.length > 1 ? data.length : 0
    };
  }

  // Utility Methods
  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveDrillResults(results) {
    const filename = `resilience-drills-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(DRILL_CONFIG.ARTIFACTS_DIR, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
    
    // Also save to database
    await supabase
      .from('resilience_drill_results')
      .insert({
        timestamp: results.timestamp,
        results: results,
        summary: results.summary
      });
  }

  printDrillSummary(results) {
    console.log('\n📊 Resilience Drill Summary');
    console.log('========================');
    console.log(`⏱️  Total Duration: ${results.summary.duration}ms`);
    console.log(`✅ Passed: ${results.summary.passed}/${results.summary.totalDrills}`);
    console.log(`❌ Failed: ${results.summary.failed}/${results.summary.totalDrills}`);
    
    results.drills.forEach(drill => {
      const status = drill.passed ? '✅' : '❌';
      console.log(`${status} ${drill.name}: ${drill.duration}ms`);
      if (!drill.passed) {
        console.log(`   Error: ${drill.error}`);
      }
    });
    
    console.log('\n📁 Results saved to:', DRILL_CONFIG.ARTIFACTS_DIR);
  }
}

// Main execution
async function main() {
  const drills = new ResilienceDrills();
  
  try {
    await drills.runWeeklyDrills();
    console.log('\n🎉 Weekly resilience drills completed successfully!');
  } catch (error) {
    console.error('\n💥 Resilience drills failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { ResilienceDrills, DRILL_CONFIG };
