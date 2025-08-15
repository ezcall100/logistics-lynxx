#!/usr/bin/env node
import { execSync } from 'child_process';

const PROD_HOST = process.env.PROD_HOST;

if (!PROD_HOST) {
  console.error('Missing PROD_HOST environment variable');
  process.exit(1);
}

console.log('🟢 Running golden path tests...');

const goldenPaths = [
  {
    name: 'Super Admin → Portal Management',
    steps: [
      { url: '/super-admin', expected: 200 },
      { url: '/super-admin/settings', expected: 200 },
      { url: '/super-admin/settings/users', expected: 200 }
    ]
  },
  {
    name: 'Broker → Load Management',
    steps: [
      { url: '/broker', expected: 200 },
      { url: '/broker/loads', expected: 200 },
      { url: '/broker/carriers', expected: 200 }
    ]
  },
  {
    name: 'Carrier → Fleet Operations',
    steps: [
      { url: '/carrier', expected: 200 },
      { url: '/carrier/fleet', expected: 200 },
      { url: '/carrier/drivers', expected: 200 }
    ]
  },
  {
    name: 'Analytics → Dashboard',
    steps: [
      { url: '/analytics', expected: 200 },
      { url: '/analytics/dashboard', expected: 200 }
    ]
  },
  {
    name: 'Autonomous → Agent Management',
    steps: [
      { url: '/autonomous', expected: 200 },
      { url: '/autonomous/agents', expected: 200 }
    ]
  }
];

let totalPassed = 0;
let totalFailed = 0;

for (const path of goldenPaths) {
  console.log(`\n🔍 Testing: ${path.name}`);
  let pathPassed = 0;
  let pathFailed = 0;

  for (const step of path.steps) {
    try {
      const result = execSync(`curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}${step.url}"`, { encoding: 'utf8' }).trim();
      
      if (result === step.expected.toString()) {
        console.log(`  ✅ ${step.url}: ${result}`);
        pathPassed++;
        totalPassed++;
      } else {
        console.log(`  ❌ ${step.url}: Expected ${step.expected}, got ${result}`);
        pathFailed++;
        totalFailed++;
      }
    } catch (error) {
      console.log(`  ❌ ${step.url}: Failed - ${error.message}`);
      pathFailed++;
      totalFailed++;
    }
  }

  if (pathFailed === 0) {
    console.log(`  🎉 ${path.name}: All steps passed`);
  } else {
    console.log(`  ⚠️ ${path.name}: ${pathPassed} passed, ${pathFailed} failed`);
  }
}

console.log(`\n📊 Golden path results: ${totalPassed} passed, ${totalFailed} failed`);

if (totalFailed > 0) {
  console.log('❌ Golden path tests failed!');
  process.exit(1);
} else {
  console.log('✅ All golden path tests passed!');
}
