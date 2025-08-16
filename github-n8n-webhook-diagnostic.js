#!/usr/bin/env node

/**
 * GitHub → n8n Webhook Diagnostic Tool
 * 
 * This script helps diagnose why GitHub commits are not being received by n8n.
 * It checks various components of the webhook pipeline and provides solutions.
 */

import https from 'https';
import http from 'http';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration
const CONFIG = {
  n8nWebhookUrl: 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
  n8nBaseUrl: 'https://pixx100.app.n8n.cloud',
  githubRepo: 'your-repo-name', // Update this with your actual repo name
  testPayload: {
    event: 'push',
    repository: 'your-repo-name',
    ref: 'refs/heads/main',
    commits: [
      {
        id: 'test-commit-id',
        message: 'Test commit for webhook diagnostic',
        timestamp: new Date().toISOString()
      }
    ],
    sender: {
      login: 'test-user'
    },
    timestamp: new Date().toISOString()
  }
};

class WebhookDiagnostic {
  constructor() {
    this.results = {
      n8nWebhook: { status: 'unknown', details: '' },
      n8nHealth: { status: 'unknown', details: '' },
      githubWorkflows: { status: 'unknown', details: '' },
      webhookConfig: { status: 'unknown', details: '' },
      networkConnectivity: { status: 'unknown', details: '' }
    };
  }

  async runDiagnostic() {
    console.log('🔍 GitHub → n8n Webhook Diagnostic Tool');
    console.log('=====================================\n');

    await this.checkN8nWebhook();
    await this.checkN8nHealth();
    await this.checkGitHubWorkflows();
    await this.checkWebhookConfiguration();
    await this.checkNetworkConnectivity();

    this.generateReport();
    this.provideSolutions();
  }

  async checkN8nWebhook() {
    console.log('1️⃣ Testing n8n Webhook Endpoint...');
    
    try {
      const response = await this.makeRequest(CONFIG.n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'GitHub-Webhook-Diagnostic/1.0'
        },
        body: JSON.stringify(CONFIG.testPayload)
      });

      if (response.statusCode === 404) {
        this.results.n8nWebhook = {
          status: 'error',
          details: 'Webhook not registered. The workflow needs to be activated in n8n.'
        };
      } else if (response.statusCode >= 200 && response.statusCode < 300) {
        this.results.n8nWebhook = {
          status: 'success',
          details: `Webhook responded successfully (${response.statusCode})`
        };
      } else {
        this.results.n8nWebhook = {
          status: 'error',
          details: `Webhook returned status ${response.statusCode}: ${response.body}`
        };
      }
    } catch (error) {
      this.results.n8nWebhook = {
        status: 'error',
        details: `Connection failed: ${error.message}`
      };
    }
  }

  async checkN8nHealth() {
    console.log('2️⃣ Checking n8n Instance Health...');
    
    try {
      const response = await this.makeRequest(`${CONFIG.n8nBaseUrl}/healthz`);
      
      if (response.statusCode === 200) {
        this.results.n8nHealth = {
          status: 'success',
          details: 'n8n instance is healthy and responding'
        };
      } else {
        this.results.n8nHealth = {
          status: 'error',
          details: `n8n health check failed with status ${response.statusCode}`
        };
      }
    } catch (error) {
      this.results.n8nHealth = {
        status: 'error',
        details: `Cannot reach n8n instance: ${error.message}`
      };
    }
  }

  async checkGitHubWorkflows() {
    console.log('3️⃣ Analyzing GitHub Workflows...');
    
    try {
      const workflowFiles = this.findWorkflowFiles();
      const activeWorkflows = this.analyzeWorkflows(workflowFiles);
      
      if (activeWorkflows.length > 0) {
        this.results.githubWorkflows = {
          status: 'success',
          details: `Found ${activeWorkflows.length} active workflows with push triggers`
        };
      } else {
        this.results.githubWorkflows = {
          status: 'warning',
          details: 'No active workflows found with push triggers. Main workflows are disabled.'
        };
      }
    } catch (error) {
      this.results.githubWorkflows = {
        status: 'error',
        details: `Error analyzing workflows: ${error.message}`
      };
    }
  }

  async checkWebhookConfiguration() {
    console.log('4️⃣ Checking Webhook Configuration...');
    
    try {
      // Check if webhook configuration files exist
      const webhookFiles = [
        'n8n-cursor-webhook-workflow.json',
        'n8n-webhook-setup-guide.md'
      ];
      
      const existingFiles = webhookFiles.filter(file => fs.existsSync(file));
      
      if (existingFiles.length > 0) {
        this.results.webhookConfig = {
          status: 'success',
          details: `Webhook configuration files found: ${existingFiles.join(', ')}`
        };
      } else {
        this.results.webhookConfig = {
          status: 'warning',
          details: 'No webhook configuration files found'
        };
      }
    } catch (error) {
      this.results.webhookConfig = {
        status: 'error',
        details: `Error checking configuration: ${error.message}`
      };
    }
  }

  async checkNetworkConnectivity() {
    console.log('5️⃣ Testing Network Connectivity...');
    
    try {
      const url = new URL(CONFIG.n8nWebhookUrl);
      const response = await this.makeRequest(`${url.protocol}//${url.hostname}`, {
        method: 'HEAD',
        timeout: 5000
      });
      
      this.results.networkConnectivity = {
        status: 'success',
        details: `Successfully connected to ${url.hostname}`
      };
    } catch (error) {
      this.results.networkConnectivity = {
        status: 'error',
        details: `Network connectivity issue: ${error.message}`
      };
    }
  }

  findWorkflowFiles() {
    const workflowDir = '.github/workflows';
    if (!fs.existsSync(workflowDir)) {
      return [];
    }
    
    return fs.readdirSync(workflowDir)
      .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'))
      .map(file => path.join(workflowDir, file));
  }

  analyzeWorkflows(workflowFiles) {
    const activeWorkflows = [];
    
    for (const file of workflowFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check if workflow has push triggers and is not disabled
        if (content.includes('push:') && !content.includes('# push:')) {
          const nameMatch = content.match(/name:\s*(.+)/);
          const name = nameMatch ? nameMatch[1].trim() : path.basename(file);
          
          activeWorkflows.push({
            name,
            file: path.basename(file),
            hasN8nIntegration: content.includes('n8n') || content.includes('webhook')
          });
        }
      } catch (error) {
        console.warn(`Warning: Could not parse workflow file ${file}: ${error.message}`);
      }
    }
    
    return activeWorkflows;
  }

  makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const isHttps = urlObj.protocol === 'https:';
      const client = isHttps ? https : http;
      
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'GitHub-Webhook-Diagnostic/1.0',
          ...options.headers
        },
        timeout: options.timeout || 10000
      };
      
      const req = client.request(requestOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        });
      });
      
      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      if (options.body) {
        req.write(options.body);
      }
      
      req.end();
    });
  }

  generateReport() {
    console.log('\n📊 Diagnostic Report');
    console.log('==================');
    
    const statusIcons = {
      success: '✅',
      warning: '⚠️',
      error: '❌',
      unknown: '❓'
    };
    
    for (const [component, result] of Object.entries(this.results)) {
      const icon = statusIcons[result.status];
      const componentName = component.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      
      console.log(`${icon} ${componentName}: ${result.status.toUpperCase()}`);
      console.log(`   ${result.details}\n`);
    }
  }

  provideSolutions() {
    console.log('🔧 Recommended Solutions');
    console.log('=======================\n');
    
    // Check n8n webhook status
    if (this.results.n8nWebhook.status === 'error') {
      console.log('🚨 CRITICAL: n8n Webhook Not Working');
      console.log('   Solution:');
      console.log('   1. Open your n8n instance at https://pixx100.app.n8n.cloud');
      console.log('   2. Go to Workflows and find the "Cursor Webhook Integration" workflow');
      console.log('   3. Click "Activate" to enable the workflow');
      console.log('   4. Make sure the webhook node is properly configured');
      console.log('   5. Test the webhook by clicking "Execute workflow" button\n');
    }
    
    // Check GitHub workflows
    if (this.results.githubWorkflows.status === 'warning') {
      console.log('⚠️ WARNING: GitHub Workflows Disabled');
      console.log('   Solution:');
      console.log('   1. Your main CI/CD workflows have push events disabled');
      console.log('   2. Enable push events in .github/workflows/autonomous-cicd.yml:');
      console.log('      - Remove the # comments from the push: section');
      console.log('   3. Or use the autonomous-deploy.yml workflow which is active');
      console.log('   4. Make sure the workflow includes n8n webhook notifications\n');
    }
    
    // Check n8n health
    if (this.results.n8nHealth.status === 'error') {
      console.log('❌ ERROR: n8n Instance Unreachable');
      console.log('   Solution:');
      console.log('   1. Check if your n8n instance is running');
      console.log('   2. Verify the URL: https://pixx100.app.n8n.cloud');
      console.log('   3. Check your n8n deployment status');
      console.log('   4. Contact your n8n administrator if needed\n');
    }
    
    // General setup instructions
    console.log('📋 Complete Setup Checklist:');
    console.log('   1. ✅ Ensure n8n workflow is activated');
    console.log('   2. ✅ Configure GitHub repository webhook (if using GitHub webhooks)');
    console.log('   3. ✅ Set up N8N_WEBHOOK_URL and N8N_WEBHOOK_SECRET in GitHub secrets');
    console.log('   4. ✅ Enable push events in GitHub Actions workflows');
    console.log('   5. ✅ Test the webhook with a commit');
    console.log('   6. ✅ Monitor n8n execution logs for incoming webhooks\n');
    
    console.log('🔗 Useful Links:');
    console.log('   - n8n Dashboard: https://pixx100.app.n8n.cloud');
    console.log('   - GitHub Repository Settings: https://github.com/[your-repo]/settings/hooks');
    console.log('   - GitHub Actions: https://github.com/[your-repo]/actions');
    console.log('   - n8n Webhook Setup Guide: n8n-webhook-setup-guide.md\n');
  }
}

// Run the diagnostic
const diagnostic = new WebhookDiagnostic();
diagnostic.runDiagnostic().catch(console.error);
