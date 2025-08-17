#!/usr/bin/env node

import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import { watch } from 'fs';
import path from 'path';

class ContinuousAutonomousAgent {
  constructor() {
    this.isRunning = false;
    this.lastBuildTime = null;
    this.buildInterval = 5 * 60 * 1000; // 5 minutes
    this.watchPaths = [
      'src/**/*',
      'package.json',
      'vite.config.ts',
      'tsconfig.json'
    ];
    this.agentId = `agent-${Date.now()}`;
    this.logFile = path.join(process.cwd(), 'logs', 'autonomous-agent.log');
  }

  async log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${this.agentId}] [${type.toUpperCase()}] ${message}`;
    
    // Console output
    console.log(logEntry);
    
    // File logging
    try {
      await fs.mkdir(path.dirname(this.logFile), { recursive: true });
      await fs.appendFile(this.logFile, logEntry + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  async checkForChanges() {
    try {
      // Check git status for changes
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
      return gitStatus.trim().length > 0;
    } catch (error) {
      this.log('Could not check git status', 'warn');
      return false;
    }
  }

  async shouldBuild() {
    // Don't build if already building
    if (this.isRunning) {
      return false;
    }

    // Check if enough time has passed since last build
    if (this.lastBuildTime && (Date.now() - this.lastBuildTime) < this.buildInterval) {
      return false;
    }

    // Check for file changes
    const hasChanges = await this.checkForChanges();
    if (!hasChanges) {
      return false;
    }

    return true;
  }

  async runAutonomousBuild() {
    if (this.isRunning) {
      this.log('Build already in progress, skipping', 'warn');
      return;
    }

    this.isRunning = true;
    this.lastBuildTime = Date.now();

    try {
      this.log('🤖 Starting autonomous build...');
      
      // Import and run the autonomous build system
      const { AutonomousBuildSystem } = await import('./autonomous-build.mjs');
      const buildSystem = new AutonomousBuildSystem();
      
      // Override the log method to use our logging
      buildSystem.log = (message, type) => this.log(message, type);
      
      await buildSystem.run();
      
      this.log('✅ Autonomous build completed successfully');
      
    } catch (error) {
      this.log(`❌ Autonomous build failed: ${error.message}`, 'error');
    } finally {
      this.isRunning = false;
    }
  }

  async monitorFileSystem() {
    this.log('👀 Starting file system monitoring...');
    
    const watchCallback = async (eventType, filename) => {
      if (filename) {
        this.log(`📁 File change detected: ${filename}`);
        
        // Debounce the build trigger
        setTimeout(async () => {
          if (await this.shouldBuild()) {
            await this.runAutonomousBuild();
          }
        }, 2000); // Wait 2 seconds after last change
      }
    };

    // Watch the src directory
    const srcPath = path.join(process.cwd(), 'src');
    watch(srcPath, { recursive: true }, watchCallback);
    
    // Watch package.json
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    watch(packageJsonPath, watchCallback);
    
    // Watch config files
    const configFiles = ['vite.config.ts', 'tsconfig.json'];
    for (const configFile of configFiles) {
      const configPath = path.join(process.cwd(), configFile);
      try {
        watch(configPath, watchCallback);
      } catch (error) {
        this.log(`Could not watch ${configFile}: ${error.message}`, 'warn');
      }
    }
  }

  async startPeriodicChecks() {
    this.log('⏰ Starting periodic build checks...');
    
    setInterval(async () => {
      if (await this.shouldBuild()) {
        await this.runAutonomousBuild();
      }
    }, this.buildInterval);
  }

  async start() {
    try {
      this.log('🤖 Starting Continuous Autonomous Agent');
      this.log(`Agent ID: ${this.agentId}`);
      this.log(`Build interval: ${this.buildInterval / 1000}s`);
      this.log(`Watch paths: ${this.watchPaths.join(', ')}`);
      
      // Start file system monitoring
      await this.monitorFileSystem();
      
      // Start periodic checks
      await this.startPeriodicChecks();
      
      // Initial build check
      if (await this.shouldBuild()) {
        await this.runAutonomousBuild();
      }
      
      this.log('✅ Continuous Autonomous Agent is now running');
      this.log('Press Ctrl+C to stop');
      
      // Keep the process alive
      process.on('SIGINT', () => {
        this.log('🛑 Shutting down Continuous Autonomous Agent...');
        process.exit(0);
      });
      
      // Keep the process alive indefinitely
      setInterval(() => {
        // Just keep the process running
      }, 60000); // Check every minute
      
    } catch (error) {
      this.log(`💥 Failed to start agent: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run the continuous autonomous agent
if (import.meta.url === `file://${process.argv[1]}`) {
  const agent = new ContinuousAutonomousAgent();
  agent.start();
}

export { ContinuousAutonomousAgent };
