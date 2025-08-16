#!/usr/bin/env node

/**
 * Simple Pipeline Diagnostic
 * Quickly identifies and fixes common CI/CD pipeline issues
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🔍 Simple Pipeline Diagnostic Starting...\n');

// Check package.json for missing scripts
console.log('📦 Checking package.json scripts...');
try {
  const packageJsonPath = path.join('logistics-lynx', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredScripts = ['lint', 'lint:ci', 'build', 'test'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length > 0) {
    console.log(`❌ Missing scripts: ${missingScripts.join(', ')}`);
    
    // Add missing scripts
    console.log('🔧 Adding missing scripts...');
    missingScripts.forEach(script => {
      if (script === 'lint') {
        packageJson.scripts[script] = 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0';
      } else if (script === 'lint:ci') {
        packageJson.scripts[script] = 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --format=compact';
      } else if (script === 'build') {
        packageJson.scripts[script] = 'vite build';
      } else if (script === 'test') {
        packageJson.scripts[script] = 'vitest run';
      }
    });
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Added missing scripts to package.json');
  } else {
    console.log('✅ All required scripts found');
  }
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}`);
}

// Check for ESLint configuration
console.log('\n🔍 Checking ESLint configuration...');
const eslintConfigs = [
  '.eslintrc.js',
  '.eslintrc.json',
  '.eslintrc.yml',
  'eslint.config.js'
];

const hasEslintConfig = eslintConfigs.some(config => 
  fs.existsSync(path.join('logistics-lynx', config))
);

if (!hasEslintConfig) {
  console.log('❌ No ESLint configuration found');
  console.log('💡 Consider adding an ESLint config file');
} else {
  console.log('✅ ESLint configuration found');
}

// Test the lint script
console.log('\n🧪 Testing lint script...');
try {
  process.chdir('logistics-lynx');
  const result = execSync('npm run lint', { 
    encoding: 'utf8',
    stdio: 'pipe',
    timeout: 30000
  });
  console.log('✅ Lint script runs successfully');
} catch (error) {
  console.log(`❌ Lint script failed: ${error.message}`);
  if (error.stdout) {
    console.log('Output:', error.stdout);
  }
  if (error.stderr) {
    console.log('Errors:', error.stderr);
  }
}

// Check workflow files for common issues
console.log('\n📋 Checking workflow files...');
const workflowFiles = [
  '.github/workflows/autonomous-cicd.yml',
  '.github/workflows/autonomous-ci-cd.yml',
  '.github/workflows/autonomous-ci-cd-secure.yml'
];

workflowFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ Found: ${file}`);
    
    // Check for common YAML issues
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for unquoted values that might cause issues
      const unquotedPatterns = [
        /on:\s*\[[^\]]*\]/g,
        /runs-on:\s*[^\n]+/g
      ];
      
      let hasIssues = false;
      unquotedPatterns.forEach(pattern => {
        if (pattern.test(content)) {
          hasIssues = true;
        }
      });
      
      if (hasIssues) {
        console.log(`⚠️  Potential YAML issues in ${file}`);
      } else {
        console.log(`✅ ${file} looks good`);
      }
    } catch (error) {
      console.log(`❌ Error reading ${file}: ${error.message}`);
    }
  } else {
    console.log(`❌ Missing: ${file}`);
  }
});

console.log('\n🎯 Quick Fix Summary:');
console.log('1. ✅ Added missing scripts to package.json');
console.log('2. 🔍 Checked ESLint configuration');
console.log('3. 🧪 Tested lint script execution');
console.log('4. 📋 Verified workflow files');

console.log('\n💡 Next Steps:');
console.log('- Commit the updated package.json');
console.log('- Push to trigger the pipeline again');
console.log('- Monitor the Code Quality step');

console.log('\n✨ Simple diagnostic complete!');
