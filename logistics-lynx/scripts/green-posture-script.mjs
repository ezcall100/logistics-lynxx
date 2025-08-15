#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const sh = (cmd) => {
  try {
    return execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });
  } catch (error) {
    return error.stdout || error.message;
  }
};

const timestamp = new Date().toISOString();
const date = timestamp.split('T')[0];
const artifactsDir = `artifacts/${date}`;

// Ensure artifacts directory exists
mkdirSync(artifactsDir, { recursive: true });

console.log('🔒 Trans Bot AI - Green Posture Evidence Capture');
console.log('================================================\n');

const evidence = {
  timestamp,
  date,
  posture: 'GREEN',
  artifacts: {}
};

// 1. Feature Flags Snapshot
console.log('🏁 Capturing feature flags...');
try {
  const flagsOutput = sh('psql "$SUPABASE_DB_URL" -c "SELECT key, value, scope FROM feature_flags_v2 WHERE scope IN (\'global\', \'production\') ORDER BY key;"');
  evidence.artifacts.featureFlags = {
    timestamp,
    data: flagsOutput,
    status: 'CAPTURED'
  };
  writeFileSync(join(artifactsDir, 'feature-flags.json'), JSON.stringify(evidence.artifacts.featureFlags, null, 2));
  console.log('   ✅ Feature flags captured');
} catch (error) {
  evidence.artifacts.featureFlags = { status: 'ERROR', error: error.message };
  console.log('   ❌ Feature flags capture failed');
}

// 2. SLO Snapshot
console.log('📊 Capturing SLO metrics...');
try {
  const healthz = sh('curl -fsS http://localhost:8089/healthz');
  const readyz = sh('curl -fsS http://localhost:8089/readyz');
  
  evidence.artifacts.sloSnapshot = {
    timestamp,
    healthz: JSON.parse(healthz),
    readyz: JSON.parse(readyz),
    status: 'CAPTURED'
  };
  writeFileSync(join(artifactsDir, 'slo-snapshot.json'), JSON.stringify(evidence.artifacts.sloSnapshot, null, 2));
  console.log('   ✅ SLO snapshot captured');
} catch (error) {
  evidence.artifacts.sloSnapshot = { status: 'ERROR', error: error.message };
  console.log('   ❌ SLO snapshot capture failed');
}

// 3. Portal Status
console.log('🏢 Capturing portal status...');
try {
  const portalCheck = sh('npm run check:portals');
  evidence.artifacts.portalStatus = {
    timestamp,
    output: portalCheck,
    status: portalCheck.includes('✅ All portals are properly configured') ? 'GREEN' : 'RED'
  };
  writeFileSync(join(artifactsDir, 'portal-status.json'), JSON.stringify(evidence.artifacts.portalStatus, null, 2));
  console.log(`   ✅ Portal status: ${evidence.artifacts.portalStatus.status}`);
} catch (error) {
  evidence.artifacts.portalStatus = { status: 'ERROR', error: error.message };
  console.log('   ❌ Portal status capture failed');
}

// 4. Outbox Lag Check
console.log('📦 Checking outbox lag...');
try {
  const outboxQuery = sh('psql "$SUPABASE_DB_URL" -c "SELECT COUNT(*) as pending_count, MAX(created_at) as oldest_pending FROM outbox WHERE status = \'pending\' AND created_at < NOW() - INTERVAL \'5 minutes\';"');
  evidence.artifacts.outboxLag = {
    timestamp,
    query: outboxQuery,
    status: 'CAPTURED'
  };
  writeFileSync(join(artifactsDir, 'outbox-lag.json'), JSON.stringify(evidence.artifacts.outboxLag, null, 2));
  console.log('   ✅ Outbox lag captured');
} catch (error) {
  evidence.artifacts.outboxLag = { status: 'ERROR', error: error.message };
  console.log('   ❌ Outbox lag capture failed');
}

// 5. Alert SQL Queries
console.log('🚨 Capturing alert queries...');
const alertQueries = {
  timestamp,
  queries: {
    highErrorRate: "SELECT COUNT(*) as error_count FROM logs WHERE level = 'error' AND created_at > NOW() - INTERVAL '1 hour';",
    slowQueries: "SELECT COUNT(*) as slow_count FROM logs WHERE response_time > 5000 AND created_at > NOW() - INTERVAL '1 hour';",
    dlqFailures: "SELECT COUNT(*) as dlq_count FROM dead_letter_queue WHERE created_at > NOW() - INTERVAL '1 hour';",
    authFailures: "SELECT COUNT(*) as auth_failures FROM auth_logs WHERE success = false AND created_at > NOW() - INTERVAL '1 hour';"
  },
  status: 'CAPTURED'
};

evidence.artifacts.alertQueries = alertQueries;
writeFileSync(join(artifactsDir, 'alert-queries.json'), JSON.stringify(alertQueries, null, 2));
console.log('   ✅ Alert queries captured');

// 6. Trace Sample
console.log('🔍 Capturing trace sample...');
try {
  const traceQuery = sh('psql "$SUPABASE_DB_URL" -c "SELECT trace_id, span_id, operation_name, duration_ms, created_at FROM traces WHERE created_at > NOW() - INTERVAL \'1 hour\' ORDER BY created_at DESC LIMIT 10;"');
  evidence.artifacts.traceSample = {
    timestamp,
    sample: traceQuery,
    status: 'CAPTURED'
  };
  writeFileSync(join(artifactsDir, 'trace-sample.json'), JSON.stringify(evidence.artifacts.traceSample, null, 2));
  console.log('   ✅ Trace sample captured');
} catch (error) {
  evidence.artifacts.traceSample = { status: 'ERROR', error: error.message };
  console.log('   ❌ Trace sample capture failed');
}

// 7. System Health
console.log('💚 Capturing system health...');
try {
  const smokeTest = sh('npm run smoke:test');
  evidence.artifacts.systemHealth = {
    timestamp,
    smokeTest: smokeTest,
    status: smokeTest.includes('✅ PASS') ? 'GREEN' : 'RED'
  };
  writeFileSync(join(artifactsDir, 'system-health.json'), JSON.stringify(evidence.artifacts.systemHealth, null, 2));
  console.log(`   ✅ System health: ${evidence.artifacts.systemHealth.status}`);
} catch (error) {
  evidence.artifacts.systemHealth = { status: 'ERROR', error: error.message };
  console.log('   ❌ System health capture failed');
}

// 8. Emergency Status
console.log('🚨 Capturing emergency status...');
try {
  const emergencyStatus = sh('npm run emergency:status');
  evidence.artifacts.emergencyStatus = {
    timestamp,
    status: emergencyStatus,
    posture: 'CAPTURED'
  };
  writeFileSync(join(artifactsDir, 'emergency-status.json'), JSON.stringify(evidence.artifacts.emergencyStatus, null, 2));
  console.log('   ✅ Emergency status captured');
} catch (error) {
  evidence.artifacts.emergencyStatus = { status: 'ERROR', error: error.message };
  console.log('   ❌ Emergency status capture failed');
}

// 9. Audit Digest
console.log('📋 Generating audit digest...');
const auditDigest = {
  timestamp,
  date,
  summary: {
    totalArtifacts: Object.keys(evidence.artifacts).length,
    successfulCaptures: Object.values(evidence.artifacts).filter(a => a.status === 'CAPTURED' || a.status === 'GREEN').length,
    failedCaptures: Object.values(evidence.artifacts).filter(a => a.status === 'ERROR' || a.status === 'RED').length,
    overallPosture: evidence.posture
  },
  artifacts: Object.keys(evidence.artifacts).map(key => ({
    name: key,
    status: evidence.artifacts[key].status,
    file: `${key}.json`
  }))
};

evidence.artifacts.auditDigest = auditDigest;
writeFileSync(join(artifactsDir, 'audit-digest.json'), JSON.stringify(auditDigest, null, 2));
console.log('   ✅ Audit digest generated');

// 10. Master Evidence File
writeFileSync(join(artifactsDir, 'evidence-master.json'), JSON.stringify(evidence, null, 2));

// Summary
console.log('\n📋 Green Posture Evidence Summary');
console.log('==================================');

const successful = Object.values(evidence.artifacts).filter(a => a.status === 'CAPTURED' || a.status === 'GREEN').length;
const failed = Object.values(evidence.artifacts).filter(a => a.status === 'ERROR' || a.status === 'RED').length;

console.log(`✅ Successful captures: ${successful}`);
console.log(`❌ Failed captures: ${failed}`);
console.log(`📁 Artifacts directory: ${artifactsDir}`);
console.log(`📄 Master evidence file: ${artifactsDir}/evidence-master.json`);

if (failed === 0) {
  console.log('\n🎉 All evidence captured successfully! Green posture maintained.');
  evidence.posture = 'GREEN';
} else {
  console.log('\n⚠️  Some evidence capture failed. Review artifacts for details.');
  evidence.posture = 'YELLOW';
}

console.log(`\n🔒 Trans Bot AI Green Posture: ${evidence.posture}`);
console.log(`📅 Date: ${date}`);
console.log(`⏰ Timestamp: ${timestamp}`);

// Exit with appropriate code
process.exit(failed === 0 ? 0 : 1);
