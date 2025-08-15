#!/usr/bin/env node

import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import path from 'path';

class EmergencyStop {
  constructor() {
    this.controlFile = path.join(process.cwd(), '.autonomous-control');
    this.agentProcesses = [];
  }

  async log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [EMERGENCY-STOP] [${type.toUpperCase()}] ${message}`;
    console.log(logEntry);
  }

  async getControlState() {
    try {
      const state = await fs.readFile(this.controlFile, 'utf8');
      return JSON.parse(state);
    } catch (error) {
      return { status: 'running', timestamp: null, reason: null };
    }
  }

  async setControlState(status, reason = null) {
    const state = {
      status,
      timestamp: new Date().toISOString(),
      reason
    };
    await fs.writeFile(this.controlFile, JSON.stringify(state, null, 2));
  }

  async findAutonomousProcesses() {
    try {
      // Find Node.js processes running autonomous scripts
      const psOutput = execSync('tasklist /FI "IMAGENAME eq node.exe" /FO CSV', { encoding: 'utf8' });
      const lines = psOutput.split('\n').filter(line => line.includes('node.exe'));
      
      this.agentProcesses = lines.map(line => {
        const parts = line.split(',');
        return {
          pid: parts[1]?.replace(/"/g, ''),
          name: parts[0]?.replace(/"/g, ''),
          memory: parts[4]?.replace(/"/g, '')
        };
      }).filter(process => process.pid);
      
    } catch (error) {
      this.log(`Could not find autonomous processes: ${error.message}`, 'warn');
    }
  }

  async stopAutonomousProcesses() {
    this.log('🛑 Stopping autonomous processes...');
    
    for (const process of this.agentProcesses) {
      try {
        execSync(`taskkill /PID ${process.pid} /F`, { stdio: 'pipe' });
        this.log(`✅ Stopped process ${process.pid} (${process.name})`);
      } catch (error) {
        this.log(`❌ Failed to stop process ${process.pid}: ${error.message}`, 'warn');
      }
    }
  }

  async stop() {
    try {
      this.log('🚨 EMERGENCY STOP ACTIVATED');
      this.log('=' * 50);
      
      // Set control state to stopped
      await this.setControlState('stopped', 'Emergency stop activated');
      
      // Find and stop autonomous processes
      await this.findAutonomousProcesses();
      await this.stopAutonomousProcesses();
      
      // Stop any running dev servers
      try {
        execSync('taskkill /FI "WINDOWTITLE eq *vite*" /F', { stdio: 'pipe' });
        this.log('✅ Stopped Vite dev servers');
      } catch (error) {
        this.log('No Vite servers found to stop', 'info');
      }
      
      // Stop any running build processes
      try {
        execSync('taskkill /FI "WINDOWTITLE eq *build*" /F', { stdio: 'pipe' });
        this.log('✅ Stopped build processes');
      } catch (error) {
        this.log('No build processes found to stop', 'info');
      }
      
      this.log('=' * 50);
      this.log('🛑 EMERGENCY STOP COMPLETE');
      this.log('All autonomous agents and build processes have been halted');
      this.log('Use "node scripts/emergency-stop.mjs resume" to restart');
      
    } catch (error) {
      this.log(`💥 Emergency stop failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }

  async resume() {
    try {
      this.log('🟢 RESUMING AUTONOMOUS OPERATIONS');
      this.log('=' * 50);
      
      // Set control state to running
      await this.setControlState('running', 'Operations resumed');
      
      this.log('✅ Autonomous operations resumed');
      this.log('Agents will restart automatically on next trigger');
      this.log('Use "node scripts/emergency-stop.mjs status" to check state');
      
    } catch (error) {
      this.log(`💥 Resume failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }

  async status() {
    try {
      const state = await this.getControlState();
      
      this.log('📊 AUTONOMOUS SYSTEM STATUS');
      this.log('=' * 50);
      this.log(`Status: ${state.status.toUpperCase()}`);
      this.log(`Last Updated: ${state.timestamp || 'Never'}`);
      if (state.reason) {
        this.log(`Reason: ${state.reason}`);
      }
      
      // Check for running processes
      await this.findAutonomousProcesses();
      this.log(`Active Processes: ${this.agentProcesses.length}`);
      
      if (this.agentProcesses.length > 0) {
        this.log('\nRunning Processes:');
        this.agentProcesses.forEach(process => {
          this.log(`  PID ${process.pid}: ${process.name} (${process.memory})`);
        });
      }
      
      this.log('=' * 50);
      
    } catch (error) {
      this.log(`💥 Status check failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }

  async run() {
    const command = process.argv[2];
    
    switch (command) {
      case 'stop':
        await this.stop();
        break;
      case 'resume':
        await this.resume();
        break;
      case 'status':
        await this.status();
        break;
      default:
        this.log('Usage: node scripts/emergency-stop.mjs [stop|resume|status]', 'error');
        this.log('  stop   - Emergency stop all autonomous agents', 'info');
        this.log('  resume - Resume autonomous operations', 'info');
        this.log('  status - Check current system status', 'info');
        process.exit(1);
    }
  }
}

// Run the emergency stop system
if (import.meta.url === `file://${process.argv[1]}`) {
  const emergencyStop = new EmergencyStop();
  emergencyStop.run();
}

export { EmergencyStop };
