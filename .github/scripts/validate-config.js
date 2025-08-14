#!/usr/bin/env node
/**
 * Configuration validation script for GitHub Actions workflow.
 * Validates package.json and tsconfig.json files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function validatePackageJson() {
  try {
    const packagePath = path.join(__dirname, '../../logistics-lynx/package.json');
    if (!fs.existsSync(packagePath)) {
      console.log(`❌ File not found: ${packagePath}`);
      return false;
    }
    const data = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    // Check required fields
    const requiredFields = ['name', 'version', 'scripts'];
    for (const field of requiredFields) {
      if (!(field in data)) {
        console.log(`❌ Missing required field: ${field}`);
        return false;
      }
    }
    
    // Check required scripts
    const scripts = data.scripts || {};
    const requiredScripts = ['build', 'lint'];
    const optionalScripts = ['test', 'dev', 'start', 'deploy'];
    
    for (const script of requiredScripts) {
      if (script in scripts) {
        console.log(`✅ ${script} script present`);
      } else {
        console.log(`❌ Missing required script: ${script}`);
        return false;
      }
    }
    
    for (const script of optionalScripts) {
      if (script in scripts) {
        console.log(`✅ ${script} script present (optional)`);
      } else {
        console.log(`⚠️ ${script} script missing (optional)`);
      }
    }
    
    console.log('✅ package.json validation passed');
    return true;
  } catch (error) {
    console.log(`❌ package.json validation failed: ${error.message}`);
    return false;
  }
}

function validateTsConfigJson() {
  try {
    const tsConfigPath = path.join(__dirname, '../../logistics-lynx/tsconfig.json');
    if (!fs.existsSync(tsConfigPath)) {
      console.log(`❌ File not found: ${tsConfigPath}`);
      return false;
    }
    
    // Parse the JSON directly since we have a clean file
    const data = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
    
    const requiredFields = ['compilerOptions'];
    for (const field of requiredFields) {
      if (!(field in data)) {
        console.log(`❌ Missing required field: ${field}`);
        return false;
      }
    }
    
    // Check for essential compiler options
    const compilerOptions = data.compilerOptions || {};
    const essentialOptions = ['target', 'module', 'moduleResolution'];
    
    for (const option of essentialOptions) {
      if (option in compilerOptions) {
        console.log(`✅ ${option} compiler option present`);
      } else {
        console.log(`⚠️ ${option} compiler option missing (optional)`);
      }
    }
    
    console.log('✅ tsconfig.json validation passed');
    return true;
  } catch (error) {
    console.log(`❌ tsconfig.json validation failed: ${error.message}`);
    return false;
  }
}

function main() {
  console.log("⚙️ Validating configuration files...");
  
  let success = true;
  
  // Validate package.json
  const packagePath = path.join(__dirname, '../../logistics-lynx/package.json');
  if (fs.existsSync(packagePath)) {
    console.log("📦 Validating logistics-lynx/package.json...");
    if (!validatePackageJson()) {
      success = false;
    }
  } else {
    console.log("❌ logistics-lynx/package.json not found");
    success = false;
  }
  
  // Validate TypeScript config
  const tsConfigPath = path.join(__dirname, '../../logistics-lynx/tsconfig.json');
  if (fs.existsSync(tsConfigPath)) {
    console.log("📝 Validating tsconfig.json...");
    if (!validateTsConfigJson()) {
      success = false;
    }
  } else {
    console.log("❌ logistics-lynx/tsconfig.json not found");
    success = false;
  }
  
  if (!success) {
    process.exit(1);
  }
  
  console.log("✅ All configuration files validated successfully");
}

// Execute main function
main();

export { validatePackageJson, validateTsConfigJson };
