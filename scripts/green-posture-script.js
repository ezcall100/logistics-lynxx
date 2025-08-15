#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

const PROD_HOST = process.env.PROD_HOST;
const timestamp = new Date().toISOString();

console.log('📦 Generating green posture evidence...');

// Create evidence directory
const evidenceDir = './evidence';
if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

const evidence = {
  timestamp,
  production_host: PROD_HOST,
  checks: {}
};

// Health checks
try {
  console.log('🔍 Health check...');
  const health = execSync(`curl -fsS "http://${PROD_HOST}/healthz"`, { encoding: 'utf8' });
  evidence.checks.health = JSON.parse(health);
  console.log('✅ Health check passed');
} catch (error) {
  evidence.checks.health = { error: error.message };
  console.log('❌ Health check failed');
}

// Readiness check
try {
  console.log('🔍 Readiness check...');
  const ready = execSync(`curl -fsS "http://${PROD_HOST}/readyz"`, { encoding: 'utf8' });
  evidence.checks.readiness = JSON.parse(ready);
  console.log('✅ Readiness check passed');
} catch (error) {
  evidence.checks.readiness = { error: error.message };
  console.log('❌ Readiness check failed');
}

// Portal count
try {
  console.log('🔍 Portal count...');
  const portalCount = execSync(`node scripts/check-portals.mjs`, { encoding: 'utf8' });
  evidence.checks.portal_count = portalCount.trim();
  console.log('✅ Portal count:', portalCount.trim());
} catch (error) {
  evidence.checks.portal_count = { error: error.message };
  console.log('❌ Portal count failed');
}

// Portal accessibility
evidence.checks.portal_accessibility = {};
const portals = ['/', '/super-admin', '/broker', '/carrier', '/driver', '/shipper', '/analytics', '/autonomous'];

for (const portal of portals) {
  try {
    const response = execSync(`curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}${portal}"`, { encoding: 'utf8' });
    evidence.checks.portal_accessibility[portal] = response.trim();
    console.log(`✅ ${portal}: ${response.trim()}`);
  } catch (error) {
    evidence.checks.portal_accessibility[portal] = { error: error.message };
    console.log(`❌ ${portal}: Failed`);
  }
}

// System info
evidence.system_info = {
  node_version: process.version,
  platform: process.platform,
  arch: process.arch,
  timestamp: new Date().toISOString()
};

// Write evidence file
const evidenceFile = `${evidenceDir}/green-posture-${timestamp.replace(/[:.]/g, '-')}.json`;
fs.writeFileSync(evidenceFile, JSON.stringify(evidence, null, 2));

console.log(`\n📄 Evidence saved to: ${evidenceFile}`);

// Summary
const summary = {
  total_checks: Object.keys(evidence.checks).length,
  successful_checks: Object.values(evidence.checks).filter(check => 
    typeof check === 'object' && !check.error
  ).length,
  portal_count: evidence.checks.portal_count,
  health_status: evidence.checks.health?.status || 'unknown',
  readiness_status: evidence.checks.readiness?.ready || 'unknown'
};

console.log('\n📊 Green Posture Summary:');
console.log(JSON.stringify(summary, null, 2));

if (summary.successful_checks === summary.total_checks) {
  console.log('\n✅ All checks passed - Green posture confirmed!');
} else {
  console.log('\n⚠️ Some checks failed - Review evidence file');
  process.exit(1);
}
