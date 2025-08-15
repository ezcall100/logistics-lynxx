#!/usr/bin/env node
import { execSync } from 'child_process';

const PROD_HOST = process.env.PROD_HOST;

if (!PROD_HOST) {
  console.error('Missing PROD_HOST environment variable');
  process.exit(1);
}

console.log('🚬 Running production smoke tests...');

const tests = [
  {
    name: 'Health endpoint',
    command: `curl -fsS "http://${PROD_HOST}/healthz"`,
    expected: 'status'
  },
  {
    name: 'Readiness endpoint',
    command: `curl -fsS "http://${PROD_HOST}/readyz"`,
    expected: 'ready'
  },
  {
    name: 'Main dashboard',
    command: `curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}/"`,
    expected: '200'
  },
  {
    name: 'Super admin portal',
    command: `curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}/super-admin"`,
    expected: '200'
  },
  {
    name: 'Broker portal',
    command: `curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}/broker"`,
    expected: '200'
  },
  {
    name: 'Carrier portal',
    command: `curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}/carrier"`,
    expected: '200'
  },
  {
    name: 'Analytics portal',
    command: `curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}/analytics"`,
    expected: '200'
  },
  {
    name: 'Autonomous portal',
    command: `curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}/autonomous"`,
    expected: '200'
  }
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    const result = execSync(test.command, { encoding: 'utf8' }).trim();
    
    if (test.expected === '200') {
      if (result === '200') {
        console.log(`✅ ${test.name}: ${result}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: Expected 200, got ${result}`);
        failed++;
      }
    } else {
      const parsed = JSON.parse(result);
      if (parsed[test.expected]) {
        console.log(`✅ ${test.name}: ${test.expected} = ${parsed[test.expected]}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: Missing ${test.expected}`);
        failed++;
      }
    }
  } catch (error) {
    console.log(`❌ ${test.name}: Failed - ${error.message}`);
    failed++;
  }
}

console.log(`\n📊 Smoke test results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('❌ Smoke tests failed!');
  process.exit(1);
} else {
  console.log('✅ All smoke tests passed!');
}
