#!/usr/bin/env node

import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';

class AutonomousBuildSystem {
  constructor() {
    this.buildLog = [];
    this.errors = [];
    this.startTime = new Date();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    this.buildLog.push(logEntry);
    console.log(logEntry);
  }

  async executeCommand(command, description) {
    try {
      this.log(`Starting: ${description}`);
      const result = execSync(command, { 
        encoding: 'utf8', 
        stdio: 'pipe',
        cwd: process.cwd()
      });
      this.log(`✅ Completed: ${description}`);
      return { success: true, output: result };
    } catch (error) {
      this.log(`❌ Failed: ${description} - ${error.message}`, 'error');
      this.errors.push({ command, description, error: error.message });
      return { success: false, error: error.message };
    }
  }

  async checkSystemHealth() {
    this.log('🔍 Checking system health...');
    
    // Check Node.js version
    const nodeVersion = process.version;
    this.log(`Node.js version: ${nodeVersion}`);
    
    // Check npm version
    try {
      const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
      this.log(`npm version: ${npmVersion}`);
    } catch (error) {
      this.log('npm not found', 'error');
    }

    // Check available disk space
    try {
      const diskSpace = execSync('df -h .', { encoding: 'utf8' });
      this.log('Disk space available');
    } catch (error) {
      this.log('Could not check disk space', 'warn');
    }

    // Check if we're in the right directory
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const hasPackageJson = await fs.access(packageJsonPath).then(() => true).catch(() => false);
    
    if (!hasPackageJson) {
      throw new Error('Not in a Node.js project directory (no package.json found)');
    }
    
    this.log('✅ System health check passed');
  }

  async installDependencies() {
    this.log('📦 Installing dependencies...');
    
    // Clean install
    await this.executeCommand('npm ci --silent', 'Clean install dependencies');
    
    // Check for security vulnerabilities
    await this.executeCommand('npm audit --audit-level=moderate', 'Security audit');
  }

  async runTests() {
    this.log('🧪 Running tests...');
    
    // Run unit tests
    await this.executeCommand('npm test -- --passWithNoTests', 'Unit tests');
    
    // Run portal checks
    await this.executeCommand('npm run check:portals', 'Portal route verification');
    
    // Run type checking
    await this.executeCommand('npx tsc --noEmit', 'TypeScript type checking');
  }

  async buildProject() {
    this.log('🏗️ Building project...');
    
    // Build for development
    await this.executeCommand('npm run build:dev', 'Development build');
    
    // Build for production
    await this.executeCommand('npm run build', 'Production build');
  }

  async deployToStaging() {
    this.log('🚀 Deploying to staging...');
    
    // Deploy to staging environment
    await this.executeCommand('npm run deploy:staging', 'Staging deployment');
  }

  async runHealthChecks() {
    this.log('🏥 Running post-deployment health checks...');
    
    // Wait for deployment to settle
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Check if the application is responding
    await this.executeCommand('npm run health:check', 'Application health check');
    
    // Verify all portals are accessible
    await this.executeCommand('npm run check:portals', 'Portal accessibility check');
  }

  async generateReport() {
    const endTime = new Date();
    const duration = endTime - this.startTime;
    
    const report = {
      timestamp: endTime.toISOString(),
      duration: `${Math.round(duration / 1000)}s`,
      success: this.errors.length === 0,
      errors: this.errors,
      log: this.buildLog,
      summary: {
        totalSteps: this.buildLog.length,
        errors: this.errors.length,
        successRate: `${((this.buildLog.length - this.errors.length) / this.buildLog.length * 100).toFixed(1)}%`
      }
    };

    // Save report to file
    const reportPath = path.join(process.cwd(), 'build-reports', `autonomous-build-${Date.now()}.json`);
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    
    this.log(`📊 Build report saved to: ${reportPath}`);
    
    return report;
  }

  async run() {
    try {
      this.log('🤖 Starting Autonomous Build System');
      this.log('=' * 50);
      
      // Step 1: Health Check
      await this.checkSystemHealth();
      
      // Step 2: Install Dependencies
      await this.installDependencies();
      
      // Step 3: Run Tests
      await this.runTests();
      
      // Step 4: Build Project
      await this.buildProject();
      
      // Step 5: Deploy (if tests pass)
      if (this.errors.length === 0) {
        await this.deployToStaging();
        await this.runHealthChecks();
      } else {
        this.log('⚠️ Skipping deployment due to errors', 'warn');
      }
      
      // Step 6: Generate Report
      const report = await this.generateReport();
      
      this.log('=' * 50);
      this.log(`🤖 Autonomous Build ${report.success ? 'SUCCESSFUL' : 'FAILED'}`);
      this.log(`Duration: ${report.duration}`);
      this.log(`Success Rate: ${report.summary.successRate}`);
      
      process.exit(report.success ? 0 : 1);
      
    } catch (error) {
      this.log(`💥 Fatal error: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run the autonomous build system
if (import.meta.url === `file://${process.argv[1]}`) {
  const buildSystem = new AutonomousBuildSystem();
  buildSystem.run();
}

export { AutonomousBuildSystem };
