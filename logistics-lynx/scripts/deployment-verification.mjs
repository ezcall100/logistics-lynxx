#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const sh = (cmd) => {
  try {
    return execSync(cmd, { stdio: 'pipe', encoding: 'utf8' });
  } catch (error) {
    return error.stdout || error.message;
  }
};

console.log('🚀 Trans Bot AI - Deployment Verification');
console.log('==========================================\n');

const results = {
  timestamp: new Date().toISOString(),
  checks: {}
};

// 1. Portal Configuration Check
console.log('🔍 Checking portal configuration...');
try {
  const portalCheck = sh('npm run check:portals');
  results.checks.portals = {
    status: portalCheck.includes('✅ All portals are properly configured') ? 'PASS' : 'FAIL',
    output: portalCheck
  };
  console.log(`   Portals: ${results.checks.portals.status}`);
} catch (error) {
  results.checks.portals = { status: 'ERROR', output: error.message };
  console.log('   Portals: ERROR');
}

// 2. Smoke Tests
console.log('🏥 Running smoke tests...');
try {
  const smokeTest = sh('npm run smoke:test');
  results.checks.smoke = {
    status: smokeTest.includes('✅ PASS') ? 'PASS' : 'FAIL',
    output: smokeTest
  };
  console.log(`   Smoke Tests: ${results.checks.smoke.status}`);
} catch (error) {
  results.checks.smoke = { status: 'ERROR', output: error.message };
  console.log('   Smoke Tests: ERROR');
}

// 3. Health Endpoints
console.log('💚 Checking health endpoints...');
try {
  const healthz = sh('curl -fsS http://localhost:8089/healthz');
  const readyz = sh('curl -fsS http://localhost:8089/readyz');
  
  results.checks.health = {
    status: healthz.includes('"status":"ok"') && readyz.includes('"ready":true') ? 'PASS' : 'FAIL',
    healthz: healthz,
    readyz: readyz
  };
  console.log(`   Health Endpoints: ${results.checks.health.status}`);
} catch (error) {
  results.checks.health = { status: 'ERROR', output: error.message };
  console.log('   Health Endpoints: ERROR');
}

// 4. Emergency Status
console.log('🚨 Checking emergency system status...');
try {
  const emergencyStatus = sh('npm run emergency:status');
  results.checks.emergency = {
    status: 'INFO',
    output: emergencyStatus
  };
  console.log('   Emergency Status: INFO');
} catch (error) {
  results.checks.emergency = { status: 'ERROR', output: error.message };
  console.log('   Emergency Status: ERROR');
}

// 5. System Information
console.log('📊 Gathering system information...');
try {
  const nodeVersion = sh('node --version');
  const npmVersion = sh('npm --version');
  const packageInfo = JSON.parse(sh('npm list --depth=0 --json'));
  
  results.system = {
    nodeVersion: nodeVersion.trim(),
    npmVersion: npmVersion.trim(),
    dependencies: Object.keys(packageInfo.dependencies || {}).length,
    devDependencies: Object.keys(packageInfo.devDependencies || {}).length
  };
  console.log(`   Node: ${results.system.nodeVersion}`);
  console.log(`   Dependencies: ${results.system.dependencies} + ${results.system.devDependencies} dev`);
} catch (error) {
  results.system = { error: error.message };
  console.log('   System Info: ERROR');
}

// Summary
console.log('\n📋 Deployment Verification Summary');
console.log('===================================');

const allChecks = Object.values(results.checks);
const passed = allChecks.filter(check => check.status === 'PASS').length;
const failed = allChecks.filter(check => check.status === 'FAIL').length;
const errors = allChecks.filter(check => check.status === 'ERROR').length;

console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`⚠️  Errors: ${errors}`);

if (failed === 0 && errors === 0) {
  console.log('\n🎉 All checks passed! Deployment is successful.');
  results.overall = 'SUCCESS';
} else {
  console.log('\n⚠️  Some checks failed. Please review the results.');
  results.overall = 'FAILED';
}

// Save results
const reportFile = `deployment-verification-${new Date().toISOString().split('T')[0]}.json`;
writeFileSync(reportFile, JSON.stringify(results, null, 2));

console.log(`\n📄 Detailed report saved to: ${reportFile}`);

// Exit with appropriate code
process.exit(failed === 0 && errors === 0 ? 0 : 1);
