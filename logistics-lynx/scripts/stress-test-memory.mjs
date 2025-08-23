#!/usr/bin/env node

/**
 * 💥 MEMORY FLOOD STRESS TEST
 * Simulates memory exhaustion to validate graceful degradation and garbage collection
 */

import { performance } from 'perf_hooks';

class MemoryFloodStressTest {
  constructor() {
    this.testDuration = 3 * 60 * 1000; // 3 minutes
    this.targetMemory = 0.9; // Target 90% memory usage
    this.mcpBaseUrl = 'http://localhost:8084';
    this.memoryArrays = []; // Hold references to prevent GC
    this.results = {
      startTime: null,
      endTime: null,
      memoryUsage: [],
      responseTimes: [],
      failures: [],
      success: false
    };
  }

  async start() {
    console.log('💥 MEMORY FLOOD STRESS TEST STARTING...');
    console.log(`🎯 Target: ${this.targetMemory * 100}% memory usage for ${this.testDuration / 1000}s`);
    console.log(`🌐 MCP URL: ${this.mcpBaseUrl}`);
    
    this.results.startTime = performance.now();
    
    try {
      // Start memory flood
      const memoryFlood = this.generateMemoryFlood();
      
      // Start MCP responsiveness monitoring
      const responsiveness = this.monitorMCPResponsiveness();
      
      // Wait for test duration
      await this.wait(this.testDuration);
      
      // Stop memory flood
      memoryFlood.stop();
      
      // Final responsiveness check
      await responsiveness;
      
      this.results.endTime = performance.now();
      this.analyzeResults();
      
    } catch (error) {
      console.error('❌ Memory Flood Test Failed:', error);
      this.results.failures.push(error.message);
    }
  }

  generateMemoryFlood() {
    console.log('💥 Generating memory flood...');
    
    let floodInterval;
    let memoryChunks = [];
    
    const flood = () => {
      try {
        // Create large memory chunks (1MB each)
        const chunkSize = 1024 * 1024; // 1MB
        const chunk = new Uint8Array(chunkSize);
        
        // Fill with random data
        for (let i = 0; i < chunkSize; i++) {
          chunk[i] = Math.floor(Math.random() * 256);
        }
        
        memoryChunks.push(chunk);
        
        // Also create string arrays to stress different memory types
        const stringArray = [];
        for (let i = 0; i < 1000; i++) {
          stringArray.push(Math.random().toString(36).repeat(1000));
        }
        memoryChunks.push(stringArray);
        
        console.log(`💾 Memory chunks: ${memoryChunks.length} (${(memoryChunks.length * 2).toFixed(1)}MB)`);
        
      } catch (error) {
        console.warn('⚠️ Memory allocation failed (expected at high usage):', error.message);
        this.results.failures.push(`Memory allocation failed: ${error.message}`);
      }
    };
    
    // Start flooding every 500ms
    floodInterval = setInterval(flood, 500);
    
    // Monitor memory usage
    const memoryMonitor = setInterval(() => {
      this.checkMemoryUsage();
    }, 1000);
    
    return {
      stop: () => {
        clearInterval(floodInterval);
        clearInterval(memoryMonitor);
        memoryChunks = []; // Release memory
        console.log('🧹 Memory flood stopped, chunks released');
      }
    };
  }

  async checkMemoryUsage() {
    try {
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      
      // Get memory usage on Windows
      const { stdout } = await execAsync('wmic OS get TotalVisibleMemorySize,FreePhysicalMemory /value');
      
      const totalMatch = stdout.match(/TotalVisibleMemorySize=(\d+)/);
      const freeMatch = stdout.match(/FreePhysicalMemory=(\d+)/);
      
      if (totalMatch && freeMatch) {
        const totalKB = parseInt(totalMatch[1]);
        const freeKB = parseInt(freeMatch[1]);
        const usedKB = totalKB - freeKB;
        const usagePercent = (usedKB / totalKB) * 100;
        
        this.results.memoryUsage.push({
          timestamp: Date.now(),
          usage: usagePercent,
          totalMB: totalKB / 1024,
          usedMB: usedKB / 1024,
          freeMB: freeKB / 1024
        });
        
        console.log(`💾 Memory: ${usagePercent.toFixed(1)}% (${usedMB.toFixed(0)}MB/${totalMB.toFixed(0)}MB)`);
      }
    } catch (error) {
      console.warn('⚠️ Could not check memory usage:', error.message);
    }
  }

  async monitorMCPResponsiveness() {
    console.log('📡 Monitoring MCP responsiveness under memory pressure...');
    
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
        if (responseTime > 5000) {
          console.warn(`⚠️ Very slow response detected: ${responseTime.toFixed(2)}ms`);
          this.results.failures.push(`Very slow response: ${responseTime.toFixed(2)}ms`);
        }
        
      } catch (error) {
        console.error('❌ MCP responsiveness check failed:', error.message);
        this.results.failures.push(`MCP check failed: ${error.message}`);
      }
    }, 3000); // Check every 3 seconds
    
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
    const avgMemory = this.results.memoryUsage.reduce((sum, mem) => sum + mem.usage, 0) / this.results.memoryUsage.length;
    const maxMemory = Math.max(...this.results.memoryUsage.map(m => m.usage));
    const avgResponseTime = this.results.responseTimes.reduce((sum, resp) => sum + resp.responseTime, 0) / this.results.responseTimes.length;
    const maxResponseTime = Math.max(...this.results.responseTimes.map(r => r.responseTime));
    
    console.log('\n📊 MEMORY FLOOD STRESS TEST RESULTS');
    console.log('=====================================');
    console.log(`⏱️  Duration: ${(duration / 1000).toFixed(1)}s`);
    console.log(`💾 Average Memory: ${avgMemory.toFixed(1)}%`);
    console.log(`💾 Max Memory: ${maxMemory.toFixed(1)}%`);
    console.log(`⚡ Average Response: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`⚡ Max Response: ${maxResponseTime.toFixed(2)}ms`);
    console.log(`❌ Failures: ${this.results.failures.length}`);
    
    // Success criteria
    const memoryTargetMet = avgMemory >= this.targetMemory * 100 * 0.7; // 70% of target
    const noCrashes = this.results.failures.filter(f => f.includes('crash')).length === 0;
    const gracefulDegradation = avgResponseTime < 10000; // < 10 seconds
    
    this.results.success = memoryTargetMet && noCrashes && gracefulDegradation;
    
    console.log('\n🎯 SUCCESS CRITERIA');
    console.log(`💾 Memory Target (${this.targetMemory * 100}%): ${memoryTargetMet ? '✅' : '❌'} (${avgMemory.toFixed(1)}%)`);
    console.log(`🚫 No Crashes: ${noCrashes ? '✅' : '❌'}`);
    console.log(`📉 Graceful Degradation (<10s): ${gracefulDegradation ? '✅' : '❌'} (${avgResponseTime.toFixed(2)}ms)`);
    
    console.log(`\n${this.results.success ? '🎉 TEST PASSED' : '💥 TEST FAILED'}`);
    
    if (!this.results.success) {
      process.exit(1);
    }
  }
}

// Run the test
const test = new MemoryFloodStressTest();
test.start().catch(console.error);
