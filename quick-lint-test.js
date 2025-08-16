#!/usr/bin/env node

/**
 * Quick Lint Test
 * Tests the lint command to identify the specific issue
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 Quick Lint Test Starting...\n');

// Check if we're in the right directory
const currentDir = process.cwd();
console.log(`📍 Current directory: ${currentDir}`);

// Check if package.json exists
const packageJsonPath = path.join('package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.log('❌ package.json not found in current directory');
  console.log('💡 Make sure you\'re in the logistics-lynx directory');
  process.exit(1);
}

// Read package.json to check scripts
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log('📦 Found package.json');
  
  if (packageJson.scripts) {
    console.log('📋 Available scripts:');
    Object.keys(packageJson.scripts).forEach(script => {
      console.log(`  - ${script}: ${packageJson.scripts[script]}`);
    });
    
    // Check for required scripts
    const requiredScripts = ['lint', 'lint:ci'];
    const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
    
    if (missingScripts.length > 0) {
      console.log(`\n❌ Missing scripts: ${missingScripts.join(', ')}`);
      
      // Add missing scripts
      console.log('🔧 Adding missing scripts...');
      missingScripts.forEach(script => {
        if (script === 'lint') {
          packageJson.scripts[script] = 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0';
        } else if (script === 'lint:ci') {
          packageJson.scripts[script] = 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --format=compact';
        }
      });
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ Added missing scripts to package.json');
    } else {
      console.log('\n✅ All required scripts found');
    }
  }
} catch (error) {
  console.log(`❌ Error reading package.json: ${error.message}`);
  process.exit(1);
}

// Check for ESLint configuration
console.log('\n🔍 Checking ESLint configuration...');
const eslintConfigs = [
  '.eslintrc.js',
  '.eslintrc.json',
  '.eslintrc.yml',
  'eslint.config.js'
];

const hasEslintConfig = eslintConfigs.some(config => fs.existsSync(config));

if (!hasEslintConfig) {
  console.log('❌ No ESLint configuration found');
  console.log('💡 Creating basic ESLint configuration...');
  
  // Create a basic ESLint config
  const basicConfig = {
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
      "@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": [
      "@typescript-eslint"
    ],
    "rules": {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"]
    }
  };
  
  fs.writeFileSync('.eslintrc.json', JSON.stringify(basicConfig, null, 2));
  console.log('✅ Created basic ESLint configuration');
} else {
  console.log('✅ ESLint configuration found');
}

// Test the lint command with a shorter timeout
console.log('\n🧪 Testing lint command...');
try {
  console.log('Running: npm run lint:ci');
  const result = execSync('npm run lint:ci', { 
    encoding: 'utf8',
    stdio: 'pipe',
    timeout: 15000  // 15 second timeout
  });
  console.log('✅ Lint command completed successfully');
  console.log('Output:', result);
} catch (error) {
  console.log(`❌ Lint command failed: ${error.message}`);
  
  if (error.stdout) {
    console.log('\n📤 STDOUT:');
    console.log(error.stdout);
  }
  
  if (error.stderr) {
    console.log('\n📤 STDERR:');
    console.log(error.stderr);
  }
  
  // Try a simpler lint command
  console.log('\n🔄 Trying simpler lint command...');
  try {
    const simpleResult = execSync('npx eslint --version', { 
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 5000
    });
    console.log('✅ ESLint is available:', simpleResult.trim());
  } catch (simpleError) {
    console.log(`❌ ESLint not available: ${simpleError.message}`);
  }
}

console.log('\n🎯 Quick Fix Summary:');
console.log('1. ✅ Checked package.json scripts');
console.log('2. ✅ Verified ESLint configuration');
console.log('3. 🧪 Tested lint command execution');
console.log('4. 🔧 Applied fixes if needed');

console.log('\n💡 Next Steps:');
console.log('- If scripts were added, commit the updated package.json');
console.log('- If ESLint config was created, commit .eslintrc.json');
console.log('- Push to trigger the pipeline again');

console.log('\n✨ Quick lint test complete!');
