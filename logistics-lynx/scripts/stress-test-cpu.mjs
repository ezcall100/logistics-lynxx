#!/usr/bin/env node

/**
 * 🚨 CPU SPIKE STRESS TEST
 * Simulates 95% CPU usage to validate MCP responsiveness under extreme load
 */

import { spawn } from 'child_process';
import { performance } from 'perf_hooks';

class CPUSpikeStressTest {
  constructor() {
    this.testDuration = 5 * 60 * 1000; // 5 minutes
    this.targetCPU = 95; // Target 95% CPU usage
    this.mcpBaseUrl = 'http://localhost:8084';
    this.results = {
      startTime: null,
      endTime: null,
      cpuSpikes: [],
      responseTimes: [],
      failures: [],
      success: false
    };
  }

  async start() {
    console.log('🔥 CPU SPIKE STRESS TEST STARTING...');
    console.log(`🎯 Target: ${this.targetCPU}% CPU usage for ${this.testDuration / 1000}s`);
    console.log(`🌐 MCP URL: ${this.mcpBaseUrl}`);
    
    this.results.startTime = performance.now();
    
    try {
      // Start CPU load generation
      const cpuLoad = this.generateCPULoad();
      
      // Start MCP responsiveness monitoring
      const responsiveness = this.monitorMCPResponsiveness();
      
      // Wait for test duration
      await this.wait(this.testDuration);
      
      // Stop CPU load
      cpuLoad.kill();
      
      // Final responsiveness check
      await responsiveness;
      
      this.results.endTime = performance.now();
      this.analyzeResults();
      
    } catch (error) {
      console.error('❌ CPU Spike Test Failed:', error);
      this.results.failures.push(error.message);
    }
  }

  generateCPULoad() {
    console.log('🔥 Generating CPU load...');
    
    // Create CPU-intensive processes
    const processes = [];
    
    // Process 1: Mathematical computations
    const mathProcess = spawn('node', ['-e', `
      const start = Date.now();
      while (Date.now() - start < ${this.testDuration}) {
        for (let i = 0; i < 1000000; i++) {
          Math.sqrt(i) * Math.sin(i) * Math.cos(i);
        }
      }
    `]);
    
    // Process 2: String operations
    const stringProcess = spawn('node', ['-e', `
      const start = Date.now();
      while (Date.now() - start < ${this.testDuration}) {
        let str = '';
        for (let i = 0; i < 100000; i++) {
          str += Math.random().toString(36).substring(7);
        }
      }
    `]);
    
    processes.push(mathProcess, stringProcess);
    
    // Monitor CPU usage
    const cpuMonitor = setInterval(() => {
      this.checkCPUUsage();
    }, 1000);
    
    // Return cleanup function
    return {
      kill: () => {
        processes.forEach(p => p.kill());
        clearInterval(cpuMonitor);
      }
    };
  }

  async checkCPUUsage() {
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      
      const { stdout } = await execAsync('wmic cpu get loadpercentage /value');
      const match = stdout.match(/LoadPercentage=(\d+)/);
      
      if (match) {
        const cpuUsage = parseInt(match[1]);
        this.results.cpuSpikes.push({
          timestamp: Date.now(),
          usage: cpuUsage
        });
        
        console.log(`🔥 CPU Usage: ${cpuUsage}%`);
      }
    } catch (error) {
      console.warn('⚠️ Could not check CPU usage:', error.message);
    }
  }

  async monitorMCPResponsiveness() {
    console.log('📡 Monitoring MCP responsiveness...');
    
    const checkInterval = setInterval(async () => {
      try {
        const start = performance.now();
        
        // Test MCP endpoint responsiveness
        const response = await fetch(`${this.mcpBaseUrl}/#/super-admin`);
        const end = performance.now();
        
        const responseTime = end - start;
        this.results.responseTimes.push({
          timestamp: Date.now(),
          responseTime,
          status: response.status
        });
        
        console.log(`⚡ MCP Response: ${responseTime.toFixed(2)}ms (${response.status})`);
        
        // Alert if response time is too slow
        if (responseTime > 2000) {
          console.warn(`⚠️ Slow response detected: ${responseTime.toFixed(2)}ms`);
          this.results.failures.push(`Slow response: ${responseTime.toFixed(2)}ms`);
        }
        
      } catch (error) {
        console.error('❌ MCP responsiveness check failed:', error.message);
        this.results.failures.push(`MCP check failed: ${error.message}`);
      }
    }, 2000); // Check every 2 seconds
    
    // Return cleanup function
    return {
      stop: () => clearInterval(checkInterval)
    };
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  analyzeResults() {
    const duration = this.results.endTime - this.results.startTime;
    const avgCPU = this.results.cpuSpikes.reduce((sum, spike) => sum + spike.usage, 0) / this.results.cpuSpikes.length;
    const avgResponseTime = this.results.responseTimes.reduce((sum, resp) => sum + resp.responseTime, 0) / this.results.responseTimes.length;
    const maxResponseTime = Math.max(...this.results.responseTimes.map(r => r.responseTime));
    
    console.log('\n📊 CPU SPIKE STRESS TEST RESULTS');
    console.log('=====================================');
    console.log(`⏱️  Duration: ${(duration / 1000).toFixed(1)}s`);
    console.log(`🔥 Average CPU: ${avgCPU.toFixed(1)}%`);
    console.log(`⚡ Average Response: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`⚡ Max Response: ${maxResponseTime.toFixed(2)}ms`);
    console.log(`❌ Failures: ${this.results.failures.length}`);
    
    // Success criteria
    const cpuTargetMet = avgCPU >= this.targetCPU * 0.8; // 80% of target
    const responseTimeOK = avgResponseTime < 2000; // < 2 seconds
    const noCriticalFailures = this.results.failures.length === 0;
    
    this.results.success = cpuTargetMet && responseTimeOK && noCriticalFailures;
    
    console.log('\n🎯 SUCCESS CRITERIA');
    console.log(`🔥 CPU Target (${this.targetCPU}%): ${cpuTargetMet ? '✅' : '❌'} (${avgCPU.toFixed(1)}%)`);
    console.log(`⚡ Response Time (<2s): ${responseTimeOK ? '✅' : '❌'} (${avgResponseTime.toFixed(2)}ms)`);
    console.log(`❌ No Critical Failures: ${noCriticalFailures ? '✅' : '❌'} (${this.results.failures.length})`);
    
    console.log(`\n${this.results.success ? '🎉 TEST PASSED' : '💥 TEST FAILED'}`);
    
    if (!this.results.success) {
      process.exit(1);
    }
  }
}

// Run the test
const test = new CPUSpikeStressTest();
test.start().catch(console.error);
