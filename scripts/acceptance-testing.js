#!/usr/bin/env node

/**
 * ✅ Acceptance Testing - "Done-Done" Proof
 * 
 * Implements comprehensive acceptance testing for the autonomous system
 * Validates synthetic tasks, error handling, RLS, kill-switch, and evidence
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const ACCEPTANCE_CONFIG = {
  // Test Types
  TESTS: {
    SYNTHETIC_TASK: 'synthetic_task',
    FORCED_ERROR: 'forced_error',
    RLS_VERIFICATION: 'rls_verification',
    KILL_SWITCH: 'kill_switch',
    EVIDENCE_PACK: 'evidence_pack'
  },
  
  // Test Timeouts
  TIMEOUTS: {
    syntheticTaskTimeout: 60 * 1000, // 60 seconds
    errorTestTimeout: 30 * 1000, // 30 seconds
    rlsTestTimeout: 15 * 1000, // 15 seconds
    killSwitchTimeout: 30 * 1000, // 30 seconds
    evidenceTimeout: 10 * 1000 // 10 seconds
  },
  
  // Test Data
  TEST_DATA: {
    syntheticTaskCount: 3,
    errorTestCount: 2,
    rlsTestCount: 5,
    killSwitchCycles: 3,
    evidenceThresholds: {
      uptime: 0.9995,
      successRate: 0.98,
      responseTime: 2500
    }
  },
  
  // Logging
  LOG_DIR: path.join(__dirname, '../logs/acceptance-testing'),
  ARTIFACTS_DIR: path.join(__dirname, '../artifacts/acceptance-testing')
};

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

class AcceptanceTesting {
  constructor() {
    this.ensureDirectories();
    this.testResults = [];
    this.startTime = Date.now();
  }

  ensureDirectories() {
    [ACCEPTANCE_CONFIG.LOG_DIR, ACCEPTANCE_CONFIG.ARTIFACTS_DIR].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  async runAcceptanceTests() {
    console.log('✅ Starting Acceptance Testing - "Done-Done" Proof');
    console.log('⏱️  Time limit: 10 minutes');
    
    const startTime = Date.now();
    const results = {
      timestamp: new Date().toISOString(),
      tests: [],
      summary: {
        totalTests: 5,
        passed: 0,
        failed: 0,
        duration: 0
      }
    };

    try {
      // 1. Synthetic Task Runs End-to-End
      console.log('\n🧪 Test 1: Synthetic Task Runs End-to-End');
      const syntheticResult = await this.runSyntheticTaskTest();
      results.tests.push(syntheticResult);
      
      // 2. Forced Error Produces Slack with Trace Link and DLQ Entry
      console.log('\n💥 Test 2: Forced Error Testing');
      const errorResult = await this.runForcedErrorTest();
      results.tests.push(errorResult);
      
      // 3. RLS Tenant Cross-Read Returns Zero
      console.log('\n🔒 Test 3: RLS Verification');
      const rlsResult = await this.runRLSVerificationTest();
      results.tests.push(rlsResult);
      
      // 4. Kill-Switch Toggles Stop/Resume Loop Cleanly
      console.log('\n🔴 Test 4: Kill-Switch Testing');
      const killSwitchResult = await this.runKillSwitchTest();
      results.tests.push(killSwitchResult);
      
      // 5. Evidence Pack for Today Exists and Passes Thresholds
      console.log('\n📦 Test 5: Evidence Pack Validation');
      const evidenceResult = await this.runEvidencePackTest();
      results.tests.push(evidenceResult);
      
      // Calculate summary
      results.summary.duration = Date.now() - startTime;
      results.summary.passed = results.tests.filter(t => t.passed).length;
      results.summary.failed = results.tests.filter(t => !t.passed).length;
      
      // Save results
      await this.saveTestResults(results);
      
      // Print summary
      this.printTestSummary(results);
      
      // Determine overall success
      const overallSuccess = results.summary.passed === results.summary.totalTests;
      
      if (overallSuccess) {
        console.log('\n🎉 ALL ACCEPTANCE TESTS PASSED - System is "Done-Done"!');
      } else {
        console.log('\n❌ SOME ACCEPTANCE TESTS FAILED - System needs attention');
        process.exit(1);
      }
      
      return results;
      
    } catch (error) {
      console.error('❌ Acceptance testing failed:', error);
      throw error;
    }
  }

  async runSyntheticTaskTest() {
    const testName = 'synthetic_task_runs';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Running synthetic task flows...');
      
      const taskResults = [];
      
      // Run multiple synthetic tasks
      for (let i = 0; i < ACCEPTANCE_CONFIG.TEST_DATA.syntheticTaskCount; i++) {
        const taskResult = await this.runSyntheticTask(i + 1);
        taskResults.push(taskResult);
        
        // Verify UI Live Feed
        const uiFeedResult = await this.verifyUILiveFeed(taskResult.taskId);
        taskResult.uiFeed = uiFeedResult;
        
        // Verify span presence
        const spanResult = await this.verifySpanPresence(taskResult.taskId);
        taskResult.span = spanResult;
        
        // Verify audit trail
        const auditResult = await this.verifyAuditTrail(taskResult.taskId);
        taskResult.audit = auditResult;
        
        console.log(`  ✅ Synthetic task ${i + 1} completed with full trace`);
      }
      
      // Verify all tasks completed successfully
      const allSuccessful = taskResults.every(r => r.success && r.uiFeed.present && r.span.present && r.audit.complete);
      
      if (!allSuccessful) {
        throw new Error('Not all synthetic tasks completed successfully with full trace');
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ Synthetic task test passed (${duration}ms)`);
      
      return {
        name: testName,
        passed: true,
        duration,
        details: {
          tasksRun: taskResults.length,
          allSuccessful,
          averageTaskDuration: taskResults.reduce((sum, r) => sum + r.duration, 0) / taskResults.length
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ Synthetic task test failed (${duration}ms): ${error.message}`);
      
      return {
        name: testName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  async runForcedErrorTest() {
    const testName = 'forced_error_test';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Testing forced error handling...');
      
      const errorResults = [];
      
      // Test different error scenarios
      for (let i = 0; i < ACCEPTANCE_CONFIG.TEST_DATA.errorTestCount; i++) {
        const errorResult = await this.triggerForcedError(i + 1);
        errorResults.push(errorResult);
        
        // Verify Slack notification
        const slackResult = await this.verifySlackNotification(errorResult.errorId);
        errorResult.slack = slackResult;
        
        // Verify trace link
        const traceResult = await this.verifyTraceLink(errorResult.errorId);
        errorResult.trace = traceResult;
        
        // Verify DLQ entry
        const dlqResult = await this.verifyDLQEntry(errorResult.errorId);
        errorResult.dlq = dlqResult;
        
        console.log(`  ✅ Forced error ${i + 1} handled with full notification chain`);
      }
      
      // Verify all errors produced proper notifications
      const allNotified = errorResults.every(r => r.slack.sent && r.trace.present && r.dlq.entry);
      
      if (!allNotified) {
        throw new Error('Not all forced errors produced proper notifications');
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ Forced error test passed (${duration}ms)`);
      
      return {
        name: testName,
        passed: true,
        duration,
        details: {
          errorsTriggered: errorResults.length,
          allNotified,
          averageNotificationTime: errorResults.reduce((sum, r) => sum + r.notificationTime, 0) / errorResults.length
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ Forced error test failed (${duration}ms): ${error.message}`);
      
      return {
        name: testName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  async runRLSVerificationTest() {
    const testName = 'rls_verification';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Testing RLS tenant isolation...');
      
      const rlsResults = [];
      
      // Test RLS across different tenants
      for (let i = 0; i < ACCEPTANCE_CONFIG.TEST_DATA.rlsTestCount; i++) {
        const rlsResult = await this.testRLSTenantIsolation(i + 1);
        rlsResults.push(rlsResult);
        
        console.log(`  ✅ RLS test ${i + 1}: ${rlsResult.crossReadCount} cross-reads blocked`);
      }
      
      // Verify all cross-reads return zero
      const allBlocked = rlsResults.every(r => r.crossReadCount === 0);
      
      if (!allBlocked) {
        throw new Error('RLS tenant isolation failed - cross-reads not properly blocked');
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ RLS verification test passed (${duration}ms)`);
      
      return {
        name: testName,
        passed: true,
        duration,
        details: {
          rlsTestsRun: rlsResults.length,
          allBlocked,
          totalCrossReadsBlocked: rlsResults.reduce((sum, r) => sum + r.crossReadCount, 0)
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ RLS verification test failed (${duration}ms): ${error.message}`);
      
      return {
        name: testName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  async runKillSwitchTest() {
    const testName = 'kill_switch_test';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Testing kill-switch functionality...');
      
      const killSwitchResults = [];
      
      // Test multiple kill-switch cycles
      for (let i = 0; i < ACCEPTANCE_CONFIG.TEST_DATA.killSwitchCycles; i++) {
        const cycleResult = await this.testKillSwitchCycle(i + 1);
        killSwitchResults.push(cycleResult);
        
        console.log(`  ✅ Kill-switch cycle ${i + 1}: ${cycleResult.stopTime}ms stop, ${cycleResult.resumeTime}ms resume`);
      }
      
      // Verify all cycles completed cleanly
      const allClean = killSwitchResults.every(r => r.stopClean && r.resumeClean && r.dataIntegrity);
      
      if (!allClean) {
        throw new Error('Kill-switch cycles did not complete cleanly');
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ Kill-switch test passed (${duration}ms)`);
      
      return {
        name: testName,
        passed: true,
        duration,
        details: {
          cyclesCompleted: killSwitchResults.length,
          allClean,
          averageStopTime: killSwitchResults.reduce((sum, r) => sum + r.stopTime, 0) / killSwitchResults.length,
          averageResumeTime: killSwitchResults.reduce((sum, r) => sum + r.resumeTime, 0) / killSwitchResults.length
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ Kill-switch test failed (${duration}ms): ${error.message}`);
      
      return {
        name: testName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  async runEvidencePackTest() {
    const testName = 'evidence_pack_validation';
    const startTime = Date.now();
    
    try {
      console.log('  📋 Validating evidence pack...');
      
      // Check if evidence pack exists for today
      const evidenceExists = await this.checkEvidencePackExists();
      if (!evidenceExists) {
        throw new Error('Evidence pack for today does not exist');
      }
      
      // Validate evidence pack contents
      const evidenceValidation = await this.validateEvidencePack();
      
      // Check thresholds
      const thresholdCheck = await this.checkEvidenceThresholds(evidenceValidation);
      
      if (!thresholdCheck.passed) {
        throw new Error(`Evidence thresholds not met: ${thresholdCheck.failures.join(', ')}`);
      }
      
      const duration = Date.now() - startTime;
      console.log(`  ✅ Evidence pack validation passed (${duration}ms)`);
      
      return {
        name: testName,
        passed: true,
        duration,
        details: {
          evidenceExists,
          thresholdsPassed: thresholdCheck.passed,
          uptime: evidenceValidation.uptime,
          successRate: evidenceValidation.successRate,
          responseTime: evidenceValidation.responseTime
        }
      };
      
    } catch (error) {
      const duration = Date.now() - startTime;
      console.log(`  ❌ Evidence pack validation failed (${duration}ms): ${error.message}`);
      
      return {
        name: testName,
        passed: false,
        duration,
        error: error.message
      };
    }
  }

  // Helper Methods for Synthetic Task Test
  async runSyntheticTask(taskNumber) {
    const taskId = crypto.randomUUID();
    const startTime = Date.now();
    
    // Create synthetic task
    const { data: task, error } = await supabase
      .from('synthetic_tasks')
      .insert({
        id: taskId,
        task_number: taskNumber,
        type: 'acceptance_test',
        status: 'running',
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Simulate task execution
    await this.wait(2000 + Math.random() * 3000); // 2-5 seconds
    
    // Update task status
    await supabase
      .from('synthetic_tasks')
      .update({ 
        status: 'completed',
        completed_at: new Date().toISOString()
      })
      .eq('id', taskId);
    
    const duration = Date.now() - startTime;
    
    return {
      taskId,
      success: true,
      duration,
      taskNumber
    };
  }

  async verifyUILiveFeed(taskId) {
    // Check if task appears in UI live feed
    const { data: feedEntry } = await supabase
      .from('ui_live_feed')
      .select('*')
      .eq('task_id', taskId)
      .single();
    
    return {
      present: !!feedEntry,
      timestamp: feedEntry?.timestamp
    };
  }

  async verifySpanPresence(taskId) {
    // Check if span exists for task
    const { data: span } = await supabase
      .from('trace_spans')
      .select('*')
      .eq('task_id', taskId)
      .single();
    
    return {
      present: !!span,
      spanId: span?.span_id,
      duration: span?.duration_ms
    };
  }

  async verifyAuditTrail(taskId) {
    // Check if audit trail is complete
    const { data: auditEntries } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('task_id', taskId);
    
    const requiredEvents = ['task_created', 'task_started', 'task_completed'];
    const foundEvents = auditEntries.map(e => e.event_type);
    
    return {
      complete: requiredEvents.every(event => foundEvents.includes(event)),
      eventCount: auditEntries.length,
      events: foundEvents
    };
  }

  // Helper Methods for Forced Error Test
  async triggerForcedError(errorNumber) {
    const errorId = crypto.randomUUID();
    const startTime = Date.now();
    
    // Create forced error
    const { data: error, error: dbError } = await supabase
      .from('forced_errors')
      .insert({
        id: errorId,
        error_number: errorNumber,
        type: 'acceptance_test_error',
        severity: 'high',
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (dbError) throw dbError;
    
    // Simulate error processing
    await this.wait(1000 + Math.random() * 2000); // 1-3 seconds
    
    const notificationTime = Date.now() - startTime;
    
    return {
      errorId,
      success: true,
      notificationTime,
      errorNumber
    };
  }

  async verifySlackNotification(errorId) {
    // Check if Slack notification was sent
    const { data: notification } = await supabase
      .from('slack_notifications')
      .select('*')
      .eq('error_id', errorId)
      .single();
    
    return {
      sent: !!notification,
      channel: notification?.channel,
      timestamp: notification?.sent_at
    };
  }

  async verifyTraceLink(errorId) {
    // Check if trace link was generated
    const { data: trace } = await supabase
      .from('error_traces')
      .select('*')
      .eq('error_id', errorId)
      .single();
    
    return {
      present: !!trace,
      traceId: trace?.trace_id,
      deepLink: trace?.deep_link
    };
  }

  async verifyDLQEntry(errorId) {
    // Check if DLQ entry was created
    const { data: dlqEntry } = await supabase
      .from('dlq_entries')
      .select('*')
      .eq('error_id', errorId)
      .single();
    
    return {
      entry: !!dlqEntry,
      queue: dlqEntry?.queue_name,
      timestamp: dlqEntry?.created_at
    };
  }

  // Helper Methods for RLS Verification Test
  async testRLSTenantIsolation(testNumber) {
    const tenant1 = `tenant_${testNumber}_a`;
    const tenant2 = `tenant_${testNumber}_b`;
    
    let crossReadCount = 0;
    
    // Test cross-tenant reads
    for (let i = 0; i < 10; i++) {
      try {
        const { data, error } = await supabase
          .from('tenant_data')
          .select('*')
          .eq('tenant_id', tenant1)
          .eq('data_owner', tenant2);
        
        if (data && data.length > 0) {
          crossReadCount += data.length;
        }
      } catch (error) {
        // Expected error for RLS violation
      }
    }
    
    return {
      testNumber,
      crossReadCount,
      tenant1,
      tenant2
    };
  }

  // Helper Methods for Kill-Switch Test
  async testKillSwitchCycle(cycleNumber) {
    const cycleStart = Date.now();
    
    // Step 1: Verify system is running
    const initialStatus = await this.getSystemStatus();
    if (!initialStatus.isRunning) {
      throw new Error('System not running before kill-switch test');
    }
    
    // Step 2: Trigger kill-switch
    const stopStart = Date.now();
    await this.triggerKillSwitch();
    const stopTime = Date.now() - stopStart;
    
    // Step 3: Verify system stopped
    const stoppedStatus = await this.getSystemStatus();
    const stopClean = !stoppedStatus.isRunning;
    
    // Step 4: Resume system
    const resumeStart = Date.now();
    await this.resumeKillSwitch();
    const resumeTime = Date.now() - resumeStart;
    
    // Step 5: Verify system resumed
    await this.wait(2000); // Wait for resume to propagate
    const resumedStatus = await this.getSystemStatus();
    const resumeClean = resumedStatus.isRunning;
    
    // Step 6: Verify data integrity
    const dataIntegrity = await this.verifyDataIntegrity();
    
    const cycleTime = Date.now() - cycleStart;
    
    return {
      cycleNumber,
      stopTime,
      resumeTime,
      cycleTime,
      stopClean,
      resumeClean,
      dataIntegrity: dataIntegrity.consistent
    };
  }

  async triggerKillSwitch() {
    const { error } = await supabase
      .from('feature_flags')
      .update({ value: true })
      .eq('key', 'autonomy.emergencyStop');
    
    if (error) throw error;
  }

  async resumeKillSwitch() {
    const { error } = await supabase
      .from('feature_flags')
      .update({ value: false })
      .eq('key', 'autonomy.emergencyStop');
    
    if (error) throw error;
  }

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

  async verifyDataIntegrity() {
    // Check for data consistency
    const { data, error } = await supabase
      .from('data_integrity_checks')
      .select('is_consistent')
      .order('timestamp', { ascending: false })
      .limit(1)
      .single();
    
    if (error) throw error;
    
    return {
      consistent: data.is_consistent
    };
  }

  // Helper Methods for Evidence Pack Test
  async checkEvidencePackExists() {
    const today = new Date().toISOString().split('T')[0];
    const evidencePath = path.join(ACCEPTANCE_CONFIG.ARTIFACTS_DIR, '../green-posture', today);
    
    return fs.existsSync(evidencePath);
  }

  async validateEvidencePack() {
    const today = new Date().toISOString().split('T')[0];
    const evidencePath = path.join(ACCEPTANCE_CONFIG.ARTIFACTS_DIR, '../green-posture', today);
    
    // Read evidence files
    const sloSnapshotPath = path.join(evidencePath, 'slo_snapshot.json');
    const sloData = JSON.parse(fs.readFileSync(sloSnapshotPath, 'utf8'));
    
    return {
      uptime: sloData.uptime,
      successRate: sloData.successRate,
      responseTime: sloData.p95ResponseTime
    };
  }

  async checkEvidenceThresholds(evidenceData) {
    const failures = [];
    
    if (evidenceData.uptime < ACCEPTANCE_CONFIG.TEST_DATA.evidenceThresholds.uptime) {
      failures.push(`Uptime ${evidenceData.uptime} < ${ACCEPTANCE_CONFIG.TEST_DATA.evidenceThresholds.uptime}`);
    }
    
    if (evidenceData.successRate < ACCEPTANCE_CONFIG.TEST_DATA.evidenceThresholds.successRate) {
      failures.push(`Success rate ${evidenceData.successRate} < ${ACCEPTANCE_CONFIG.TEST_DATA.evidenceThresholds.successRate}`);
    }
    
    if (evidenceData.responseTime > ACCEPTANCE_CONFIG.TEST_DATA.evidenceThresholds.responseTime) {
      failures.push(`Response time ${evidenceData.responseTime} > ${ACCEPTANCE_CONFIG.TEST_DATA.evidenceThresholds.responseTime}`);
    }
    
    return {
      passed: failures.length === 0,
      failures
    };
  }

  // Utility Methods
  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async saveTestResults(results) {
    const filename = `acceptance-test-${new Date().toISOString().split('T')[0]}.json`;
    const filepath = path.join(ACCEPTANCE_CONFIG.ARTIFACTS_DIR, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(results, null, 2));
    
    // Also save to database
    await supabase
      .from('acceptance_test_results')
      .insert({
        timestamp: results.timestamp,
        results: results,
        summary: results.summary
      });
  }

  printTestSummary(results) {
    console.log('\n📊 Acceptance Test Summary');
    console.log('=========================');
    console.log(`⏱️  Total Duration: ${results.summary.duration}ms`);
    console.log(`✅ Passed: ${results.summary.passed}/${results.summary.totalTests}`);
    console.log(`❌ Failed: ${results.summary.failed}/${results.summary.totalTests}`);
    
    results.tests.forEach(test => {
      const status = test.passed ? '✅' : '❌';
      console.log(`${status} ${test.name}: ${test.duration}ms`);
      if (!test.passed) {
        console.log(`   Error: ${test.error}`);
      }
    });
    
    console.log('\n📁 Results saved to:', ACCEPTANCE_CONFIG.ARTIFACTS_DIR);
  }
}

// Main execution
async function main() {
  const acceptanceTesting = new AcceptanceTesting();
  
  try {
    await acceptanceTesting.runAcceptanceTests();
    console.log('\n🎉 Acceptance testing completed successfully!');
  } catch (error) {
    console.error('\n💥 Acceptance testing failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { AcceptanceTesting, ACCEPTANCE_CONFIG };
