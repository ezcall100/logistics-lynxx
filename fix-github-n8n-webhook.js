#!/usr/bin/env node

/**
 * GitHub → n8n Webhook Fix Script
 * 
 * This script helps fix the issues preventing GitHub commits from being received by n8n.
 * It provides step-by-step solutions and can automate some fixes.
 */

import fs from 'fs';
import path from 'path';

class WebhookFixer {
  constructor() {
    this.issues = [];
    this.fixes = [];
  }

  async runFix() {
    console.log('🔧 GitHub → n8n Webhook Fix Tool');
    console.log('================================\n');

    await this.identifyIssues();
    await this.generateFixes();
    await this.applyFixes();
    this.provideManualSteps();
  }

  async identifyIssues() {
    console.log('🔍 Identifying Issues...\n');

    // Issue 1: n8n workflow not activated
    this.issues.push({
      id: 'n8n-inactive',
      severity: 'critical',
      description: 'n8n webhook workflow is not activated',
      impact: 'Webhook endpoint returns 404 - no webhooks can be received'
    });

    // Issue 2: GitHub workflows have push events disabled
    const workflowFiles = this.findWorkflowFiles();
    const disabledWorkflows = this.findDisabledWorkflows(workflowFiles);
    
    if (disabledWorkflows.length > 0) {
      this.issues.push({
        id: 'workflows-disabled',
        severity: 'warning',
        description: `Main CI/CD workflows have push events disabled: ${disabledWorkflows.join(', ')}`,
        impact: 'GitHub commits won\'t trigger the main deployment workflows'
      });
    }

    // Issue 3: Check if n8n webhook configuration is missing
    if (!fs.existsSync('n8n-cursor-webhook-workflow.json')) {
      this.issues.push({
        id: 'missing-config',
        severity: 'warning',
        description: 'n8n webhook workflow configuration file is missing',
        impact: 'No reference configuration for setting up the webhook'
      });
    }

    // Issue 4: Check if GitHub secrets are configured
    this.issues.push({
      id: 'secrets-config',
      severity: 'info',
      description: 'GitHub repository secrets need to be configured',
      impact: 'n8n webhook notifications won\'t work without proper secrets'
    });

    console.log(`Found ${this.issues.length} issues to address:\n`);
    
    this.issues.forEach((issue, index) => {
      const severityIcon = {
        critical: '🚨',
        warning: '⚠️',
        info: 'ℹ️'
      }[issue.severity];
      
      console.log(`${index + 1}. ${severityIcon} ${issue.description}`);
      console.log(`   Impact: ${issue.impact}\n`);
    });
  }

  async generateFixes() {
    console.log('🔧 Generating Fixes...\n');

    for (const issue of this.issues) {
      switch (issue.id) {
        case 'n8n-inactive':
          this.fixes.push({
            id: issue.id,
            type: 'manual',
            description: 'Activate n8n workflow',
            steps: [
              'Open https://pixx100.app.n8n.cloud',
              'Navigate to Workflows',
              'Find "Cursor Webhook Integration" workflow',
              'Click "Activate" button',
              'Verify webhook endpoint is accessible'
            ]
          });
          break;

        case 'workflows-disabled':
          this.fixes.push({
            id: issue.id,
            type: 'automated',
            description: 'Enable push events in main workflows',
            files: this.getWorkflowFilesToFix()
          });
          break;

        case 'missing-config':
          this.fixes.push({
            id: issue.id,
            type: 'automated',
            description: 'Create n8n webhook configuration',
            files: ['n8n-cursor-webhook-workflow.json']
          });
          break;

        case 'secrets-config':
          this.fixes.push({
            id: issue.id,
            type: 'manual',
            description: 'Configure GitHub repository secrets',
            steps: [
              'Go to GitHub repository Settings → Secrets and variables → Actions',
              'Add N8N_WEBHOOK_URL: https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
              'Add N8N_WEBHOOK_SECRET: [generate a secure secret]',
              'Add N8N_API_KEY: [your n8n API key if available]'
            ]
          });
          break;
      }
    }
  }

  async applyFixes() {
    console.log('🚀 Applying Automated Fixes...\n');

    for (const fix of this.fixes) {
      if (fix.type === 'automated') {
        console.log(`🔧 Applying: ${fix.description}`);
        
        try {
          if (fix.id === 'workflows-disabled') {
            await this.enableWorkflowPushEvents();
          } else if (fix.id === 'missing-config') {
            await this.createWebhookConfiguration();
          }
          
          console.log(`✅ Successfully applied: ${fix.description}\n`);
        } catch (error) {
          console.log(`❌ Failed to apply: ${fix.description}`);
          console.log(`   Error: ${error.message}\n`);
        }
      }
    }
  }

  async enableWorkflowPushEvents() {
    const workflowFiles = [
      '.github/workflows/autonomous-cicd.yml',
      '.github/workflows/autonomous-ci-cd.yml'
    ];

    for (const file of workflowFiles) {
      if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Enable push events by removing comments
        content = content.replace(/# push:/g, 'push:');
        content = content.replace(/#   branches:/g, '  branches:');
        content = content.replace(/#     - main/g, '    - main');
        content = content.replace(/#     - develop/g, '    - develop');
        content = content.replace(/#     - feature\/\*/g, '    - feature/*');
        
        // Enable pull_request events
        content = content.replace(/# pull_request:/g, 'pull_request:');
        content = content.replace(/#   branches:/g, '  branches:');
        content = content.replace(/#   types:/g, '  types:');
        
        fs.writeFileSync(file, content);
        console.log(`   ✅ Enabled push events in ${file}`);
      }
    }
  }

  async createWebhookConfiguration() {
    const webhookConfig = {
      name: "Cursor Webhook Integration",
      nodes: [
        {
          parameters: {
            httpMethod: "POST",
            path: "cursor-webhook",
            responseMode: "responseNode",
            options: {
              rawBody: true,
              responseHeaders: {
                "Content-Type": "application/json"
              }
            }
          },
          id: "webhook-trigger",
          name: "Cursor Webhook",
          type: "n8n-nodes-base.webhook",
          typeVersion: 1,
          position: [240, 300],
          webhookId: "cursor-webhook-trigger"
        },
        {
          parameters: {
            respondWith: "json",
            responseBody: JSON.stringify({
              success: true,
              message: "Webhook received successfully",
              timestamp: "{{ new Date().toISOString() }}"
            }, null, 2),
            options: {}
          },
          id: "respond-webhook",
          name: "Respond to Webhook",
          type: "n8n-nodes-base.respondToWebhook",
          typeVersion: 1,
          position: [460, 300]
        }
      ],
      connections: {
        "Cursor Webhook": {
          main: [
            [
              {
                node: "Respond to Webhook",
                type: "main",
                index: 0
              }
            ]
          ]
        }
      },
      active: false,
      settings: {
        executionOrder: "v1"
      },
      versionId: "1",
      id: "cursor-webhook-workflow"
    };

    fs.writeFileSync('n8n-cursor-webhook-workflow.json', JSON.stringify(webhookConfig, null, 2));
    console.log('   ✅ Created n8n webhook configuration file');
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

  findDisabledWorkflows(workflowFiles) {
    const disabled = [];
    
    for (const file of workflowFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check if workflow has commented out push events
        if (content.includes('# push:') && content.includes('push:')) {
          const nameMatch = content.match(/name:\s*(.+)/);
          const name = nameMatch ? nameMatch[1].trim() : path.basename(file);
          disabled.push(name);
        }
      } catch (error) {
        console.warn(`Warning: Could not parse workflow file ${file}: ${error.message}`);
      }
    }
    
    return disabled;
  }

  getWorkflowFilesToFix() {
    return [
      '.github/workflows/autonomous-cicd.yml',
      '.github/workflows/autonomous-ci-cd.yml'
    ].filter(file => fs.existsSync(file));
  }

  provideManualSteps() {
    console.log('📋 Manual Steps Required');
    console.log('========================\n');

    const manualFixes = this.fixes.filter(fix => fix.type === 'manual');
    
    if (manualFixes.length === 0) {
      console.log('✅ All fixes have been applied automatically!\n');
    } else {
      manualFixes.forEach((fix, index) => {
        console.log(`${index + 1}. ${fix.description}:`);
        fix.steps.forEach((step, stepIndex) => {
          console.log(`   ${stepIndex + 1}. ${step}`);
        });
        console.log('');
      });
    }

    console.log('🧪 Testing Your Fix');
    console.log('==================\n');
    console.log('After completing the fixes, test your setup:');
    console.log('1. Make a test commit to your repository');
    console.log('2. Check GitHub Actions tab for workflow runs');
    console.log('3. Check n8n execution logs for incoming webhooks');
    console.log('4. Run the diagnostic script again: node github-n8n-webhook-diagnostic.js\n');

    console.log('🔗 Quick Links');
    console.log('==============\n');
    console.log('• n8n Dashboard: https://pixx100.app.n8n.cloud');
    console.log('• GitHub Actions: https://github.com/[your-repo]/actions');
    console.log('• Repository Settings: https://github.com/[your-repo]/settings');
    console.log('• Webhook Setup Guide: n8n-webhook-setup-guide.md\n');

    console.log('📞 Need Help?');
    console.log('=============\n');
    console.log('If you continue to have issues:');
    console.log('1. Check n8n execution logs for detailed error messages');
    console.log('2. Verify GitHub repository webhook settings');
    console.log('3. Test webhook connectivity with: node test-n8n-webhook.cjs');
    console.log('4. Review the n8n webhook setup guide for detailed instructions\n');
  }
}

// Run the fix
const fixer = new WebhookFixer();
fixer.runFix().catch(console.error);
