#!/usr/bin/env node

/**
 * 🚨 COMPREHENSIVE STRESS TEST RUNNER
 * Orchestrates all stress test scenarios for MCP combat hardening
 */

import { spawn } from 'child_process';
import { performance } from 'perf_hooks';

class StressTestRunner {
  constructor() {
    this.tests = [
      { name: 'CPU Spike', script: 'stress-test-cpu.mjs', duration: '5m' },
      { name: 'Memory Flood', script: 'stress-test-memory.mjs', duration: '3m' },
      // Future tests: Agent Crash, IDS Alert, System Degradation
    ];
    this.results = {
      startTime: null,
      endTime: null,
      testResults: [],
      overallSuccess: false
    };
  }

  async runAllTests() {
    console.log('🚨 COMPREHENSIVE STRESS TEST SUITE STARTING...');
    console.log('🎯 Mission: Harden MCP under combat conditions');
    console.log(`📋 Tests: ${this.tests.length} scenarios`);
    console.log('=====================================\n');
    
    this.results.startTime = performance.now();
    
    for (let i = 0; i < this.tests.length; i++) {
      const test = this.tests[i];
      console.log(`\n🔥 TEST ${i + 1}/${this.tests.length}: ${test.name}`);
      console.log(`⏱️  Duration: ${test.duration}`);
      console.log('-------------------------------------');
      
      const result = await this.runTest(test);
      this.results.testResults.push(result);
      
      if (!result.success) {
        console.log(`❌ ${test.name} FAILED - stopping test suite`);
        break;
      }
      
      // Wait between tests
      if (i < this.tests.length - 1) {
        console.log('\n⏳ Waiting 30 seconds between tests...');
        await this.wait(30000);
      }
    }
    
    this.results.endTime = performance.now();
    this.analyzeOverallResults();
  }

  async runTest(test) {
    return new Promise((resolve) => {
      const startTime = performance.now();
      
      console.log(`🚀 Starting ${test.name}...`);
      
      const testProcess = spawn('node', [`scripts/${test.script}`], {
        stdio: 'pipe',
        cwd: process.cwd()
      });
      
      let output = '';
      let errorOutput = '';
      
      testProcess.stdout.on('data', (data) => {
        const text = data.toString();
        output += text;
        process.stdout.write(text);
      });
      
      testProcess.stderr.on('data', (data) => {
        const text = data.toString();
        errorOutput += text;
        process.stderr.write(text);
      });
      
      testProcess.on('close', (code) => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;
        
        const success = code === 0;
        
        console.log(`\n📊 ${test.name} completed in ${duration.toFixed(1)}s`);
        console.log(`Status: ${success ? '✅ PASSED' : '❌ FAILED'}`);
        
        resolve({
          name: test.name,
          success,
          duration,
          exitCode: code,
          output,
          errorOutput
        });
      });
      
      testProcess.on('error', (error) => {
        console.error(`❌ Failed to start ${test.name}:`, error.message);
        resolve({
          name: test.name,
          success: false,
          duration: 0,
          exitCode: -1,
          output: '',
          errorOutput: error.message
        });
      });
    });
  }

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  analyzeOverallResults() {
    const totalDuration = (this.results.endTime - this.results.startTime) / 1000;
    const passedTests = this.results.testResults.filter(r => r.success).length;
    const totalTests = this.results.testResults.length;
    
    console.log('\n🎯 COMPREHENSIVE STRESS TEST RESULTS');
    console.log('=====================================');
    console.log(`⏱️  Total Duration: ${totalDuration.toFixed(1)}s`);
    console.log(`✅ Passed: ${passedTests}/${totalTests}`);
    console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
    
    console.log('\n📋 INDIVIDUAL TEST RESULTS');
    console.log('-------------------------');
    
    this.results.testResults.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      console.log(`${index + 1}. ${status} ${result.name} (${result.duration.toFixed(1)}s)`);
    });
    
    this.results.overallSuccess = passedTests === totalTests;
    
    console.log('\n🎯 OVERALL SUCCESS CRITERIA');
    console.log(`All Tests Passed: ${this.results.overallSuccess ? '✅' : '❌'}`);
    
    console.log(`\n${this.results.overallSuccess ? '🎉 ALL STRESS TESTS PASSED' : '💥 STRESS TESTS FAILED'}`);
    
    if (this.results.overallSuccess) {
      console.log('\n🚀 MCP COMBAT HARDENING COMPLETE');
      console.log('✅ System validated under extreme conditions');
      console.log('✅ Ready for production deployment');
    } else {
      console.log('\n⚠️ MCP NEEDS ADDITIONAL HARDENING');
      console.log('❌ System vulnerabilities detected');
      console.log('❌ Production readiness compromised');
      process.exit(1);
    }
  }
}

// Run the comprehensive stress test suite
const runner = new StressTestRunner();
runner.runAllTests().catch(console.error);
