#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

// Get the maximum allowed linting problems from environment
const maxProblems = Number(process.env.LINT_MAX ?? '9999');

// Check if the artifacts directory exists
const artifactsDir = path.join(process.cwd(), 'artifacts');
const reportPath = path.join(artifactsDir, 'eslint.json');

if (!fs.existsSync(reportPath)) {
  console.log('❌ ESLint report not found. Run "npm run lint:report" first.');
  process.exit(1);
}

try {
  // Read and parse the ESLint report
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  
  // Calculate total problems (errors + warnings)
  const totalProblems = report.reduce((total, file) => {
    return total + (file.errorCount || 0) + (file.warningCount || 0);
  }, 0);
  
  console.log(`📊 ESLint Analysis:`);
  console.log(`   Total problems: ${totalProblems}`);
  console.log(`   Budget: ${maxProblems}`);
  console.log(`   Status: ${totalProblems <= maxProblems ? '✅ PASS' : '❌ FAIL'}`);
  
  if (totalProblems > maxProblems) {
    console.log(`\n❌ Too many linting problems!`);
    console.log(`   Current: ${totalProblems}`);
    console.log(`   Budget: ${maxProblems}`);
    console.log(`   Over budget by: ${totalProblems - maxProblems}`);
    console.log(`\n💡 To fix this:`);
    console.log(`   1. Run "npm run lint:fix" to auto-fix some issues`);
    console.log(`   2. Manually fix remaining issues`);
    console.log(`   3. Or increase LINT_MAX to ${totalProblems} temporarily`);
    process.exit(1);
  } else {
    console.log(`\n✅ Linting problems within budget!`);
    console.log(`   ${totalProblems <= maxProblems * 0.8 ? '🎉 Great job!' : '📈 Keep improving!'}`);
  }
  
} catch (error) {
  console.error('❌ Error reading ESLint report:', error.message);
  process.exit(1);
}
