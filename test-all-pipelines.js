#!/usr/bin/env node

/**
 * Comprehensive Pipeline Testing Script
 * 
 * Tests all three Autonomous CI/CD Pipeline variants:
 * 1. Standard (autonomous-ci-cd.yml)
 * 2. Secure (autonomous-ci-cd-secure.yml) 
 * 3. Legacy (autonomous-cicd.yml)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

class PipelineTester {
  constructor() {
    this.workflowsDir = '.github/workflows';
    this.results = {};
    this.pipelines = {
      standard: 'autonomous-ci-cd.yml',
      secure: 'autonomous-ci-cd-secure.yml',
      legacy: 'autonomous-cicd.yml'
    };
  }

  async testAllPipelines() {
    console.log('🚀 Testing All Autonomous CI/CD Pipelines');
    console.log('==========================================\n');

    for (const [name, file] of Object.entries(this.pipelines)) {
      console.log(`🔍 Testing ${name.toUpperCase()} Pipeline: ${file}`);
      console.log('─'.repeat(50));
      
      await this.testPipeline(name, file);
      console.log('');
    }

    this.generateReport();
  }

  async testPipeline(name, filename) {
    const filepath = path.join(this.workflowsDir, filename);
    
    try {
      // Check if file exists
      if (!fs.existsSync(filepath)) {
        this.results[name] = {
          status: 'error',
          details: `File not found: ${filename}`,
          tests: {}
        };
        return;
      }

      const tests = {};
      
      // Test 1: YAML Syntax Validation
      tests.syntax = await this.testYamlSyntax(filepath);
      
      // Test 2: GitHub Actions Validation
      tests.githubActions = await this.testGitHubActions(filepath);
      
      // Test 3: Structure Analysis
      tests.structure = await this.analyzeStructure(filepath);
      
      // Test 4: Security Analysis
      tests.security = await this.analyzeSecurity(filepath);
      
      // Test 5: Performance Analysis
      tests.performance = await this.analyzePerformance(filepath);

      this.results[name] = {
        status: 'success',
        details: 'All tests completed',
        tests
      };

    } catch (error) {
      this.results[name] = {
        status: 'error',
        details: error.message,
        tests: {}
      };
    }
  }

  async testYamlSyntax(filepath) {
    try {
      const yaml = fs.readFileSync(filepath, 'utf8');
      
      // Basic YAML structure check
      const lines = yaml.split('\n');
      let indentLevel = 0;
      let errors = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        
        if (trimmed === '') continue;
        
        const currentIndent = line.length - line.trimStart().length;
        
        // Check for mixed tabs/spaces
        if (line.includes('\t')) {
          errors.push(`Line ${i + 1}: Contains tabs (use spaces)`);
        }
        
        // Check indentation consistency
        if (currentIndent % 2 !== 0 && !trimmed.startsWith('-')) {
          errors.push(`Line ${i + 1}: Odd indentation (should be multiples of 2)`);
        }
      }
      
      return {
        status: errors.length === 0 ? 'success' : 'warning',
        details: errors.length === 0 ? 'YAML syntax is valid' : `Found ${errors.length} formatting issues`,
        errors
      };
    } catch (error) {
      return {
        status: 'error',
        details: `YAML parsing failed: ${error.message}`,
        errors: [error.message]
      };
    }
  }

  async testGitHubActions(filepath) {
    try {
      const yaml = fs.readFileSync(filepath, 'utf8');
      const errors = [];
      const warnings = [];
      
      // Check for required fields
      if (!yaml.includes('name:')) {
        errors.push('Missing workflow name');
      }
      
      if (!yaml.includes('on:')) {
        errors.push('Missing triggers section');
      }
      
      if (!yaml.includes('jobs:')) {
        errors.push('Missing jobs section');
      }
      
      // Check for common issues
      if (yaml.includes('uses: actions/checkout@v3')) {
        warnings.push('Using older checkout action (v3), consider upgrading to v4');
      }
      
      if (yaml.includes('uses: actions/setup-node@v3')) {
        warnings.push('Using older setup-node action (v3), consider upgrading to v4');
      }
      
      // Check for security best practices
      if (!yaml.includes('permissions:')) {
        warnings.push('No explicit permissions defined (security best practice)');
      }
      
      if (yaml.includes('GITHUB_TOKEN') && !yaml.includes('contents: read')) {
        warnings.push('Using GITHUB_TOKEN without explicit permissions');
      }
      
      return {
        status: errors.length === 0 ? 'success' : 'error',
        details: errors.length === 0 ? 'GitHub Actions structure is valid' : `Found ${errors.length} critical issues`,
        errors,
        warnings
      };
    } catch (error) {
      return {
        status: 'error',
        details: `GitHub Actions validation failed: ${error.message}`,
        errors: [error.message]
      };
    }
  }

  async analyzeStructure(filepath) {
    try {
      const yaml = fs.readFileSync(filepath, 'utf8');
      const analysis = {
        jobs: 0,
        steps: 0,
        triggers: [],
        features: []
      };
      
      // Count jobs
      const jobMatches = yaml.match(/^\s*[a-zA-Z-]+:\s*$/gm) || [];
      analysis.jobs = jobMatches.length;
      
      // Count steps
      const stepMatches = yaml.match(/^\s*-\s*name:/gm) || [];
      analysis.steps = stepMatches.length;
      
      // Identify triggers
      if (yaml.includes('push:')) analysis.triggers.push('push');
      if (yaml.includes('pull_request:')) analysis.triggers.push('pull_request');
      if (yaml.includes('workflow_dispatch:')) analysis.triggers.push('manual');
      if (yaml.includes('schedule:')) analysis.triggers.push('scheduled');
      
      // Identify features
      if (yaml.includes('step-security/harden-runner')) analysis.features.push('security-hardening');
      if (yaml.includes('github/codeql-action')) analysis.features.push('codeql-analysis');
      if (yaml.includes('actions/upload-artifact')) analysis.features.push('artifact-management');
      if (yaml.includes('actions/download-artifact')) analysis.features.push('artifact-management');
      if (yaml.includes('deployment')) analysis.features.push('deployment');
      if (yaml.includes('health')) analysis.features.push('health-monitoring');
      if (yaml.includes('rollback')) analysis.features.push('rollback-capability');
      
      return {
        status: 'success',
        details: `Pipeline structure analyzed`,
        analysis
      };
    } catch (error) {
      return {
        status: 'error',
        details: `Structure analysis failed: ${error.message}`,
        analysis: {}
      };
    }
  }

  async analyzeSecurity(filepath) {
    try {
      const yaml = fs.readFileSync(filepath, 'utf8');
      const security = {
        score: 0,
        features: [],
        issues: []
      };
      
      // Security features
      if (yaml.includes('step-security/harden-runner')) {
        security.features.push('supply-chain-hardening');
        security.score += 20;
      }
      
      if (yaml.includes('github/codeql-action')) {
        security.features.push('static-code-analysis');
        security.score += 15;
      }
      
      if (yaml.includes('permissions:')) {
        security.features.push('explicit-permissions');
        security.score += 10;
      }
      
      if (yaml.includes('contents: read')) {
        security.features.push('minimal-permissions');
        security.score += 10;
      }
      
      if (yaml.includes('if: github.event_name != \'pull_request\'')) {
        security.features.push('fork-protection');
        security.score += 10;
      }
      
      if (yaml.includes('allowed-endpoints:')) {
        security.features.push('network-restrictions');
        security.score += 15;
      }
      
      // Security issues
      if (yaml.includes('GITHUB_TOKEN') && !yaml.includes('permissions:')) {
        security.issues.push('Using default permissions (security risk)');
        security.score -= 10;
      }
      
      if (yaml.includes('secrets.GITHUB_TOKEN')) {
        security.issues.push('Using deprecated secrets.GITHUB_TOKEN');
        security.score -= 5;
      }
      
      if (yaml.includes('actions/checkout@v3')) {
        security.issues.push('Using older checkout action (security updates)');
        security.score -= 5;
      }
      
      return {
        status: security.score >= 50 ? 'success' : 'warning',
        details: `Security score: ${security.score}/100`,
        security
      };
    } catch (error) {
      return {
        status: 'error',
        details: `Security analysis failed: ${error.message}`,
        security: { score: 0, features: [], issues: [] }
      };
    }
  }

  async analyzePerformance(filepath) {
    try {
      const yaml = fs.readFileSync(filepath, 'utf8');
      const performance = {
        score: 0,
        features: [],
        issues: []
      };
      
      // Performance features
      if (yaml.includes('cache:')) {
        performance.features.push('dependency-caching');
        performance.score += 15;
      }
      
      if (yaml.includes('fetch-depth: 1')) {
        performance.features.push('shallow-clone');
        performance.score += 10;
      }
      
      if (yaml.includes('timeout-minutes:')) {
        performance.features.push('timeout-control');
        performance.score += 5;
      }
      
      if (yaml.includes('runs-on: ubuntu-latest')) {
        performance.features.push('latest-runner');
        performance.score += 5;
      }
      
      if (yaml.includes('if: success()')) {
        performance.features.push('conditional-execution');
        performance.score += 10;
      }
      
      // Performance issues
      if (yaml.includes('fetch-depth: 0')) {
        performance.issues.push('Full history fetch (slow for large repos)');
        performance.score -= 10;
      }
      
      if (yaml.includes('timeout-minutes: 60')) {
        performance.issues.push('Long timeout (consider shorter timeouts)');
        performance.score -= 5;
      }
      
      if (yaml.includes('npm install')) {
        performance.issues.push('Using npm install instead of npm ci');
        performance.score -= 5;
      }
      
      return {
        status: performance.score >= 30 ? 'success' : 'warning',
        details: `Performance score: ${performance.score}/100`,
        performance
      };
    } catch (error) {
      return {
        status: 'error',
        details: `Performance analysis failed: ${error.message}`,
        performance: { score: 0, features: [], issues: [] }
      };
    }
  }

  generateReport() {
    console.log('📊 Pipeline Test Results Summary');
    console.log('================================\n');

    const statusIcons = {
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };

    for (const [name, result] of Object.entries(this.results)) {
      const icon = statusIcons[result.status];
      console.log(`${icon} ${name.toUpperCase()} PIPELINE: ${result.status.toUpperCase()}`);
      console.log(`   ${result.details}`);
      
      if (result.tests) {
        for (const [testName, testResult] of Object.entries(result.tests)) {
          const testIcon = statusIcons[testResult.status];
          console.log(`   ${testIcon} ${testName}: ${testResult.details}`);
          
          if (testResult.errors && testResult.errors.length > 0) {
            testResult.errors.forEach(error => console.log(`      ❌ ${error}`));
          }
          
          if (testResult.warnings && testResult.warnings.length > 0) {
            testResult.warnings.forEach(warning => console.log(`      ⚠️ ${warning}`));
          }
          
          if (testResult.analysis) {
            if (testResult.analysis.jobs) console.log(`      📊 Jobs: ${testResult.analysis.jobs}`);
            if (testResult.analysis.steps) console.log(`      📊 Steps: ${testResult.analysis.steps}`);
            if (testResult.analysis.triggers) console.log(`      📊 Triggers: ${testResult.analysis.triggers.join(', ')}`);
            if (testResult.analysis.features) console.log(`      📊 Features: ${testResult.analysis.features.join(', ')}`);
          }
          
          if (testResult.security) {
            console.log(`      🔒 Security Score: ${testResult.security.score}/100`);
            if (testResult.security.features.length > 0) {
              console.log(`      🔒 Features: ${testResult.security.features.join(', ')}`);
            }
          }
          
          if (testResult.performance) {
            console.log(`      ⚡ Performance Score: ${testResult.performance.score}/100`);
            if (testResult.performance.features.length > 0) {
              console.log(`      ⚡ Features: ${testResult.performance.features.join(', ')}`);
            }
          }
        }
      }
      console.log('');
    }

    // Overall recommendations
    console.log('🎯 Recommendations:');
    console.log('===================');
    
    const recommendations = [];
    
    for (const [name, result] of Object.entries(this.results)) {
      if (result.tests) {
        if (result.tests.security && result.tests.security.security.score < 50) {
          recommendations.push(`🔒 ${name}: Improve security score (currently ${result.tests.security.security.score}/100)`);
        }
        if (result.tests.performance && result.tests.performance.performance.score < 30) {
          recommendations.push(`⚡ ${name}: Improve performance score (currently ${result.tests.performance.performance.score}/100)`);
        }
      }
    }
    
    if (recommendations.length === 0) {
      console.log('✅ All pipelines are in good condition!');
    } else {
      recommendations.forEach(rec => console.log(rec));
    }
  }
}

// Run the comprehensive test
const tester = new PipelineTester();
tester.testAllPipelines().catch(console.error);
