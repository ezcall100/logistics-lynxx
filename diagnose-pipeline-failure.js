#!/usr/bin/env node

/**
 * Pipeline Failure Diagnostic Script
 * 
 * Identifies the specific issue causing pre-flight validation failure
 * in the Legacy Autonomous CI/CD Pipeline
 */

import fs from 'fs';
import path from 'path';

class PipelineFailureDiagnostic {
  constructor() {
    this.workflowFile = '.github/workflows/autonomous-cicd.yml';
    this.results = {};
  }

  async diagnoseFailure() {
    console.log('🔍 Diagnosing Pipeline Failure');
    console.log('==============================\n');

    if (!fs.existsSync(this.workflowFile)) {
      console.log('❌ Workflow file not found:', this.workflowFile);
      return;
    }

    const yaml = fs.readFileSync(this.workflowFile, 'utf8');
    
    // Test 1: YAML Syntax
    await this.testYamlSyntax(yaml);
    
    // Test 2: Pre-flight Job Analysis
    await this.analyzePreflightJob(yaml);
    
    // Test 3: Dependencies Check
    await this.checkDependencies(yaml);
    
    // Test 4: Security Scan Analysis
    await this.analyzeSecurityScan(yaml);
    
    // Test 5: Code Quality Analysis
    await this.analyzeCodeQuality(yaml);

    this.generateDiagnosticReport();
  }

  async testYamlSyntax(yaml) {
    console.log('1️⃣ Testing YAML Syntax...');
    
    try {
      const lines = yaml.split('\n');
      let errors = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Check for tabs
        if (line.includes('\t')) {
          errors.push(`Line ${i + 1}: Contains tabs (use spaces)`);
        }
        
        // Check for malformed YAML
        if (line.includes('{{') && !line.includes('}}')) {
          errors.push(`Line ${i + 1}: Unclosed GitHub expression`);
        }
      }
      
      this.results.syntax = {
        status: errors.length === 0 ? 'success' : 'error',
        details: errors.length === 0 ? 'YAML syntax is valid' : `Found ${errors.length} syntax errors`,
        errors
      };
    } catch (error) {
      this.results.syntax = {
        status: 'error',
        details: `YAML parsing failed: ${error.message}`,
        errors: [error.message]
      };
    }
  }

  async analyzePreflightJob(yaml) {
    console.log('2️⃣ Analyzing Pre-flight Job...');
    
    const preflightSection = this.extractJobSection(yaml, 'preflight');
    
    if (!preflightSection) {
      this.results.preflight = {
        status: 'error',
        details: 'Pre-flight job not found in workflow',
        errors: ['Missing preflight job definition']
      };
      return;
    }

    const issues = [];
    
    // Check for required steps
    if (!preflightSection.includes('- name: 📦 Checkout Repository')) {
      issues.push('Missing checkout step');
    }
    
    if (!preflightSection.includes('- name: 🎯 Deployment Decision Logic')) {
      issues.push('Missing decision logic step');
    }
    
    // Check for outputs
    if (!preflightSection.includes('outputs:')) {
      issues.push('Missing outputs section');
    }
    
    // Check for GitHub expressions
    const githubExpressions = preflightSection.match(/\{\{.*?\}\}/g) || [];
    const invalidExpressions = githubExpressions.filter(expr => 
      expr.includes('github.') && !expr.includes('github.event_name') && 
      !expr.includes('github.repository') && !expr.includes('github.ref_name') &&
      !expr.includes('github.sha') && !expr.includes('github.actor') &&
      !expr.includes('github.workflow') && !expr.includes('github.event.inputs')
    );
    
    if (invalidExpressions.length > 0) {
      issues.push(`Invalid GitHub expressions: ${invalidExpressions.join(', ')}`);
    }
    
    this.results.preflight = {
      status: issues.length === 0 ? 'success' : 'warning',
      details: issues.length === 0 ? 'Pre-flight job looks good' : `Found ${issues.length} potential issues`,
      issues
    };
  }

  async checkDependencies(yaml) {
    console.log('3️⃣ Checking Dependencies...');
    
    const issues = [];
    
    // Check for reusable workflow
    if (yaml.includes('uses: ./.github/workflows/reusable-security-scan.yml')) {
      if (!fs.existsSync('.github/workflows/reusable-security-scan.yml')) {
        issues.push('Missing reusable-security-scan.yml workflow');
      }
    }
    
    // Check for package.json
    if (!fs.existsSync('package.json')) {
      issues.push('Missing package.json in root directory');
    }
    
    // Check for logistics-lynx/package.json
    if (!fs.existsSync('logistics-lynx/package.json')) {
      issues.push('Missing logistics-lynx/package.json');
    }
    
    this.results.dependencies = {
      status: issues.length === 0 ? 'success' : 'error',
      details: issues.length === 0 ? 'All dependencies found' : `Missing ${issues.length} dependencies`,
      issues
    };
  }

  async analyzeSecurityScan(yaml) {
    console.log('4️⃣ Analyzing Security Scan...');
    
    const securitySection = this.extractJobSection(yaml, 'security-scan');
    
    if (!securitySection) {
      this.results.securityScan = {
        status: 'warning',
        details: 'Security scan job not found',
        issues: ['No security scanning configured']
      };
      return;
    }

    const issues = [];
    
    // Check for reusable workflow reference
    if (!securitySection.includes('uses: ./.github/workflows/reusable-security-scan.yml')) {
      issues.push('Not using reusable security scan workflow');
    }
    
    // Check for proper needs
    if (!securitySection.includes('needs: preflight')) {
      issues.push('Security scan not depending on preflight');
    }
    
    this.results.securityScan = {
      status: issues.length === 0 ? 'success' : 'warning',
      details: issues.length === 0 ? 'Security scan properly configured' : `Found ${issues.length} issues`,
      issues
    };
  }

  async analyzeCodeQuality(yaml) {
    console.log('5️⃣ Analyzing Code Quality...');
    
    const codeQualitySection = this.extractJobSection(yaml, 'code-quality');
    
    if (!codeQualitySection) {
      this.results.codeQuality = {
        status: 'warning',
        details: 'Code quality job not found',
        issues: ['No code quality checks configured']
      };
      return;
    }

    const issues = [];
    
    // Check for npm scripts
    if (codeQualitySection.includes('npm run lint:ci')) {
      // Check if lint:ci script exists
      try {
        const packageJson = JSON.parse(fs.readFileSync('logistics-lynx/package.json', 'utf8'));
        if (!packageJson.scripts || !packageJson.scripts['lint:ci']) {
          issues.push('Missing lint:ci script in package.json');
        }
      } catch (error) {
        issues.push('Cannot read package.json to check scripts');
      }
    }
    
    // Check for Node.js setup
    if (!codeQualitySection.includes('actions/setup-node@v4')) {
      issues.push('Using older setup-node action');
    }
    
    this.results.codeQuality = {
      status: issues.length === 0 ? 'success' : 'warning',
      details: issues.length === 0 ? 'Code quality properly configured' : `Found ${issues.length} issues`,
      issues
    };
  }

  extractJobSection(yaml, jobName) {
    const lines = yaml.split('\n');
    let inJob = false;
    let jobLines = [];
    let indentLevel = 0;
    
    for (const line of lines) {
      const trimmed = line.trim();
      const currentIndent = line.length - line.trimStart().length;
      
      // Check if we're entering the job
      if (trimmed === `${jobName}:` && currentIndent === 2) {
        inJob = true;
        indentLevel = currentIndent;
        jobLines.push(line);
        continue;
      }
      
      // If we're in the job, collect lines
      if (inJob) {
        // Check if we've left the job (same or less indentation, not empty)
        if (trimmed !== '' && currentIndent <= indentLevel && !line.startsWith(' ')) {
          break;
        }
        jobLines.push(line);
      }
    }
    
    return jobLines.join('\n');
  }

  generateDiagnosticReport() {
    console.log('\n📊 Pipeline Failure Diagnostic Report');
    console.log('=====================================\n');

    const statusIcons = {
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };

    for (const [testName, result] of Object.entries(this.results)) {
      const icon = statusIcons[result.status];
      const testDisplayName = testName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      
      console.log(`${icon} ${testDisplayName}: ${result.status.toUpperCase()}`);
      console.log(`   ${result.details}`);
      
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach(error => console.log(`   ❌ ${error}`));
      }
      
      if (result.issues && result.issues.length > 0) {
        result.issues.forEach(issue => console.log(`   ⚠️ ${issue}`));
      }
      
      console.log('');
    }

    // Root cause analysis
    console.log('🎯 Root Cause Analysis:');
    console.log('=======================');
    
    const criticalErrors = [];
    const warnings = [];
    
    for (const [testName, result] of Object.entries(this.results)) {
      if (result.status === 'error') {
        criticalErrors.push(`${testName}: ${result.details}`);
      } else if (result.status === 'warning') {
        warnings.push(`${testName}: ${result.details}`);
      }
    }
    
    if (criticalErrors.length > 0) {
      console.log('❌ Critical Issues (likely causing failure):');
      criticalErrors.forEach(error => console.log(`   • ${error}`));
    }
    
    if (warnings.length > 0) {
      console.log('⚠️ Warnings (may contribute to issues):');
      warnings.forEach(warning => console.log(`   • ${warning}`));
    }
    
    if (criticalErrors.length === 0 && warnings.length === 0) {
      console.log('✅ No obvious issues found in workflow file');
      console.log('   The failure may be due to:');
      console.log('   • Missing secrets or environment variables');
      console.log('   • Network connectivity issues');
      console.log('   • Runtime errors in the workflow execution');
    }

    console.log('\n🔧 Recommended Fixes:');
    console.log('=====================');
    
    if (this.results.dependencies?.status === 'error') {
      console.log('1. Create missing files:');
      if (!fs.existsSync('package.json')) {
        console.log('   • Create package.json in root directory');
      }
      if (!fs.existsSync('logistics-lynx/package.json')) {
        console.log('   • Create logistics-lynx/package.json');
      }
      if (!fs.existsSync('.github/workflows/reusable-security-scan.yml')) {
        console.log('   • Create reusable-security-scan.yml workflow');
      }
    }
    
    if (this.results.syntax?.status === 'error') {
      console.log('2. Fix YAML syntax errors:');
      this.results.syntax.errors.forEach(error => console.log(`   • ${error}`));
    }
    
    console.log('3. Check GitHub repository settings:');
    console.log('   • Verify all required secrets are configured');
    console.log('   • Check repository permissions');
    console.log('   • Review workflow execution logs for specific error messages');
  }
}

// Run the diagnostic
const diagnostic = new PipelineFailureDiagnostic();
diagnostic.diagnoseFailure().catch(console.error);
