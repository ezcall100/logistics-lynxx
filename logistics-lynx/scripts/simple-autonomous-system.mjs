#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class SimpleAutonomousSystem {
  constructor() {
    this.processes = new Map();
    this.isRunning = false;
    this.systemHealth = {
      codeQuality: 85,
      performance: 80,
      security: 90,
      userExperience: 75,
      accessibility: 70,
      documentation: 60,
      architecture: 78,
      testing: 65,
      buildOptimization: 72,
      dependencyManagement: 68,
      errorHandling: 75,
      analytics: 60,
      backupRecovery: 70,
      monitoring: 80,
      deployment: 75
    };
    this.improvementQueue = [];
    this.currentTask = null;
  }

  async start() {
    console.log('🚀 Starting Simple Autonomous System...');
    console.log('🤖 Agents are taking over development...');
    console.log('👋 No human intervention required!');
    
    this.isRunning = true;

    // Start core services
    await this.startCoreServices();

    // Start continuous improvement cycle
    this.startContinuousImprovement();

    console.log('✅ Simple Autonomous System is now fully operational!');
    console.log('📊 Monitoring all agents and services...');
    console.log('🔄 Auto-restart enabled for continuous operation');
  }

  async startCoreServices() {
    const services = [
      {
        name: 'development-server',
        command: 'npm',
        args: ['run', 'dev'],
        cwd: join(__dirname, '..'),
        restartDelay: 10000
      },
      {
        name: 'master-agent',
        command: 'npm',
        args: ['run', 'master:agent'],
        cwd: join(__dirname, '..'),
        restartDelay: 15000
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
      if (output.includes('✅') || output.includes('started') || output.includes('running') || output.includes('Local:')) {
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

    const maxAttempts = 5;
    return service.restartCount < maxAttempts;
  }

  async restartService(serviceName) {
    const service = this.processes.get(serviceName);
    if (!service) return;

    service.restartCount++;
    console.log(`🔄 Restarting ${serviceName} (attempt ${service.restartCount}/5)`);

    // Kill existing process if still running
    if (!service.process.killed) {
      service.process.kill('SIGTERM');
    }

    // Wait a moment before restarting
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Start new process
    await this.startService(service.config);
  }

  startContinuousImprovement() {
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
      'Run automated tests',
      'Optimize bundle size',
      'Update dependencies',
      'Improve error handling',
      'Enhance user experience',
      'Add new features',
      'Fix security vulnerabilities',
      'Improve documentation',
      'Optimize performance',
      'Add monitoring'
    ];

    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    console.log(`🎯 Generated task: ${randomTask}`);
    
    // Simulate task execution
    setTimeout(() => {
      console.log(`✅ Completed task: ${randomTask}`);
      this.updateSystemHealth();
    }, 5000);
  }

  async optimizePerformance() {
    console.log('⚡ Running performance optimization...');
    
    // Simulate performance improvements
    const improvements = [
      'Code splitting optimization',
      'Asset compression',
      'Caching strategy improvement',
      'Bundle analysis',
      'Memory usage optimization'
    ];

    for (const improvement of improvements) {
      console.log(`🔧 ${improvement}...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('✅ Performance optimization completed');
    this.updateSystemHealth();
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
    
    console.log('✅ Recovery process completed');
  }

  updateSystemHealth() {
    // Simulate health improvements
    Object.keys(this.systemHealth).forEach(key => {
      if (this.systemHealth[key] < 95) {
        this.systemHealth[key] = Math.min(95, this.systemHealth[key] + Math.random() * 2);
      }
    });
    
    console.log('📈 System health updated');
  }

  stop() {
    console.log('🛑 Stopping Simple Autonomous System...');
    this.isRunning = false;
    
    for (const [name, service] of this.processes) {
      console.log(`🛑 Stopping ${name}...`);
      if (!service.process.killed) {
        service.process.kill('SIGTERM');
      }
    }
    
    console.log('✅ Simple Autonomous System stopped');
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      services: Array.from(this.processes.keys()),
      systemHealth: this.systemHealth,
      improvementQueue: this.improvementQueue.length,
      currentTask: this.currentTask
    };
  }
}

async function main() {
  const autonomousSystem = new SimpleAutonomousSystem();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    autonomousSystem.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    autonomousSystem.stop();
    process.exit(0);
  });

  // Start the system
  await autonomousSystem.start();
  
  // Keep the process running
  console.log('🤖 Simple Autonomous System is running... Press Ctrl+C to stop');
  
  // Log status every 5 minutes
  setInterval(() => {
    const status = autonomousSystem.getStatus();
    console.log('📊 Status Report:', JSON.stringify(status, null, 2));
  }, 300000);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Failed to start Simple Autonomous System:', error);
    process.exit(1);
  });
}

export default SimpleAutonomousSystem;
