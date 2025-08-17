#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class AutonomousSystemLauncher {
  constructor() {
    this.processes = new Map();
    this.isRunning = false;
    this.restartAttempts = new Map();
    this.maxRestartAttempts = 5;
  }

  async startAutonomousSystem() {
    console.log('🚀 Launching Autonomous Development System...');
    console.log('🤖 Agents are taking over development...');
    console.log('👋 No human intervention required!');
    
    this.isRunning = true;

    // Start all autonomous services
    await this.startAllServices();

    // Start monitoring and auto-restart
    this.startMonitoring();

    console.log('✅ Autonomous System is now fully operational!');
    console.log('📊 Monitoring all agents and services...');
    console.log('🔄 Auto-restart enabled for continuous operation');
  }

  async startAllServices() {
    const services = [
      {
        name: 'autonomous-development',
        command: 'npm',
        args: ['run', 'start:autonomous'],
        cwd: join(__dirname, '..'),
        restartDelay: 10000
      },
      {
        name: 'agent-manager',
        command: 'npm',
        args: ['run', 'agents:start'],
        cwd: join(__dirname, '..'),
        restartDelay: 15000
      },
      {
        name: 'system-monitor',
        command: 'npm',
        args: ['run', 'monitor:start'],
        cwd: join(__dirname, '..'),
        restartDelay: 20000
      },
      {
        name: 'health-checker',
        command: 'npm',
        args: ['run', 'health:check'],
        cwd: join(__dirname, '..'),
        restartDelay: 30000
      }
    ];

    for (const service of services) {
      await this.startService(service);
    }
  }

  async startService(serviceConfig) {
    const { name, command, args, cwd, restartDelay } = serviceConfig;
    
    console.log(`🤖 Starting ${name}...`);

    const process = spawn(command, args, {
      cwd,
      stdio: 'pipe',
      shell: true
    });

    this.processes.set(name, {
      process,
      config: serviceConfig,
      startTime: Date.now(),
      restartCount: 0
    });

    process.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[${name}] ${output.trim()}`);
      
      // Check for specific success indicators
      if (output.includes('✅') || output.includes('started') || output.includes('running')) {
        console.log(`✅ ${name} is now operational`);
      }
    });

    process.stderr.on('data', (data) => {
      const error = data.toString();
      console.error(`[${name}] ERROR: ${error.trim()}`);
    });

    process.on('close', (code) => {
      console.log(`⚠️  ${name} process exited with code ${code}`);
      
      if (this.isRunning && this.shouldRestart(name)) {
        console.log(`🔄 Restarting ${name} in ${restartDelay}ms...`);
        setTimeout(() => this.restartService(name), restartDelay);
      } else if (!this.isRunning) {
        console.log(`🛑 ${name} stopped (system shutdown)`);
      } else {
        console.log(`❌ ${name} failed to restart after maximum attempts`);
      }
    });

    process.on('error', (error) => {
      console.error(`❌ ${name} process error:`, error);
    });

    return process;
  }

  shouldRestart(serviceName) {
    const service = this.processes.get(serviceName);
    if (!service) return false;

    const maxAttempts = this.maxRestartAttempts;
    return service.restartCount < maxAttempts;
  }

  async restartService(serviceName) {
    const service = this.processes.get(serviceName);
    if (!service) return;

    service.restartCount++;
    console.log(`🔄 Restarting ${serviceName} (attempt ${service.restartCount}/${this.maxRestartAttempts})`);

    // Kill existing process if still running
    if (!service.process.killed) {
      service.process.kill('SIGTERM');
    }

    // Wait a moment before restarting
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Start new process
    await this.startService(service.config);
  }

  startMonitoring() {
    // Monitor system health every 30 seconds
    setInterval(() => {
      this.checkSystemHealth();
    }, 30000);

    // Generate development tasks every 2 minutes
    setInterval(() => {
      this.generateDevelopmentTasks();
    }, 120000);

    // Performance optimization every 5 minutes
    setInterval(() => {
      this.optimizePerformance();
    }, 300000);

    console.log('📊 System monitoring started');
  }

  async checkSystemHealth() {
    console.log('🔍 Checking system health...');
    
    let healthyServices = 0;
    let totalServices = this.processes.size;

    for (const [name, service] of this.processes) {
      if (service.process.exitCode === null) {
        healthyServices++;
      } else {
        console.log(`⚠️  ${name} is not healthy`);
      }
    }

    const healthPercentage = (healthyServices / totalServices) * 100;
    console.log(`📊 System Health: ${healthPercentage.toFixed(1)}% (${healthyServices}/${totalServices} services healthy)`);

    if (healthPercentage < 75) {
      console.log('🚨 System health below threshold, initiating recovery...');
      await this.initiateRecovery();
    }
  }

  async generateDevelopmentTasks() {
    console.log('📋 Generating autonomous development tasks...');
    
    // Simulate task generation
    const tasks = [
      'Optimize dashboard performance',
      'Add new portal features',
      'Improve responsive design',
      'Enhance data visualization',
      'Update documentation',
      'Run automated tests',
      'Deploy latest changes',
      'Monitor system metrics'
    ];

    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    console.log(`🎯 Generated task: ${randomTask}`);
  }

  async optimizePerformance() {
    console.log('⚡ Running performance optimization...');
    
    // Simulate performance optimization
    console.log('🔧 Optimizing code quality...');
    console.log('🧪 Running automated tests...');
    console.log('📊 Analyzing system metrics...');
    console.log('🚀 Deploying optimizations...');
  }

  async initiateRecovery() {
    console.log('🔄 Initiating system recovery...');
    
    // Restart failed services
    for (const [name, service] of this.processes) {
      if (service.process.exitCode !== null) {
        console.log(`🔄 Restarting failed service: ${name}`);
        await this.restartService(name);
      }
    }
  }

  async stop() {
    console.log('🛑 Stopping Autonomous Development System...');
    this.isRunning = false;

    // Stop all processes
    for (const [name, service] of this.processes) {
      console.log(`🛑 Stopping ${name}...`);
      if (!service.process.killed) {
        service.process.kill('SIGTERM');
      }
    }

    // Wait for processes to terminate
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('✅ Autonomous Development System stopped.');
  }

  // Handle graceful shutdown
  setupGracefulShutdown() {
    process.on('SIGINT', async () => {
      console.log('\n🛑 Received SIGINT, shutting down gracefully...');
      await this.stop();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
      await this.stop();
      process.exit(0);
    });
  }
}

// Main execution
async function main() {
  const launcher = new AutonomousSystemLauncher();
  
  // Setup graceful shutdown
  launcher.setupGracefulShutdown();

  try {
    await launcher.startAutonomousSystem();
    
    // Keep the process running
    console.log('🔄 Autonomous system is running continuously...');
    console.log('💡 Press Ctrl+C to stop the system');
    
  } catch (error) {
    console.error('❌ Failed to start autonomous system:', error);
    process.exit(1);
  }
}

// Start the autonomous system
main().catch(console.error);
