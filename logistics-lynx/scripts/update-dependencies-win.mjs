#!/usr/bin/env node

/**
 * 🔧 Dependency Update Script (Windows)
 * Updates dependencies and ensures package-lock.json is in sync
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

class DependencyUpdater {
  constructor() {
    this.packageJsonPath = path.join(process.cwd(), 'package.json');
    this.packageLockPath = path.join(process.cwd(), 'package-lock.json');
  }

  async run() {
    console.log('🔧 Dependency Update Script (Windows)');
    console.log('=====================================');
    
    try {
      // Check if package.json exists
      if (!fs.existsSync(this.packageJsonPath)) {
        console.error('❌ package.json not found');
        process.exit(1);
      }

      console.log('📦 Checking current dependencies...');
      
      // Clean npm cache
      console.log('🧹 Cleaning npm cache...');
      execSync('npm cache clean --force', { stdio: 'inherit' });
      
      // Remove node_modules and package-lock.json (Windows compatible)
      console.log('🗑️  Removing existing node_modules and package-lock.json...');
      if (fs.existsSync('node_modules')) {
        execSync('rmdir /s /q node_modules', { stdio: 'inherit' });
      }
      if (fs.existsSync(this.packageLockPath)) {
        execSync('del package-lock.json', { stdio: 'inherit' });
      }
      
      // Install dependencies fresh
      console.log('📥 Installing dependencies...');
      execSync('npm install --no-audit --no-fund', { stdio: 'inherit' });
      
      // Verify installation
      console.log('✅ Verifying installation...');
      execSync('npm ls --depth=0', { stdio: 'inherit' });
      
      console.log('\n🎉 Dependencies updated successfully!');
      console.log('✅ package-lock.json is now in sync');
      console.log('✅ All dependencies are properly installed');
      
    } catch (error) {
      console.error('❌ Error updating dependencies:', error.message);
      process.exit(1);
    }
  }
}

// Run the dependency updater
const updater = new DependencyUpdater();
updater.run();
