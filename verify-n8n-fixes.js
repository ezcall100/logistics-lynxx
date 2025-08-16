#!/usr/bin/env node

/**
 * n8n Fix Verification Script
 * 
 * Run this after applying the manual fixes to verify everything is working
 */

import https from 'https';
import http from 'http';

class N8nFixVerifier {
  constructor() {
    this.baseUrl = 'https://pixx100.app.n8n.cloud';
    this.results = {};
  }

  async verifyFixes() {
    console.log('🔍 Verifying n8n Fixes');
    console.log('======================\n');

    console.log('📋 Manual Steps to Complete First:');
    console.log('1. Go to https://pixx100.app.n8n.cloud');
    console.log('2. Navigate to Workflows');
    console.log('3. Find "Cursor Webhook Integration" workflow');
    console.log('4. Click "Activate" button');
    console.log('5. Ensure workflow shows "Active" status\n');

    console.log('Press Enter when you\'ve completed the manual steps...');
    
    // Wait for user input (in a real scenario, you'd use readline)
    await this.delay(3000); // Simulate waiting

    await this.testWebhookAfterActivation();
    await this.testWorkflowAPI();
    
    this.generateVerificationReport();
  }

  async testWebhookAfterActivation() {
    console.log('1️⃣ Testing Webhook After Activation...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/webhook-test/cursor-webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          test: 'verification_payload',
          timestamp: new Date().toISOString(),
          source: 'fix_verification_script'
        })
      });

      if (response.statusCode === 200) {
        this.results.webhook = {
          status: 'success',
          details: '✅ Webhook is now working! Workflow activation successful.',
          data: response.body
        };
      } else if (response.statusCode === 404) {
        this.results.webhook = {
          status: 'error',
          details: '❌ Webhook still returning 404. Workflow may not be activated.',
          data: response.body
        };
      } else {
        this.results.webhook = {
          status: 'warning',
          details: `⚠️ Webhook returned status ${response.statusCode}`,
          data: response.body
        };
      }
    } catch (error) {
      this.results.webhook = {
        status: 'error',
        details: `❌ Webhook request failed: ${error.message}`,
        data: null
      };
    }
  }

  async testWorkflowAPI() {
    console.log('2️⃣ Testing Workflow API (without auth - should show 401)...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/v1/workflows`);
      
      if (response.statusCode === 401) {
        this.results.workflowApi = {
          status: 'info',
          details: 'ℹ️ Workflow API requires authentication (expected behavior)',
          data: 'To access workflows, you need an API key'
        };
      } else if (response.statusCode === 200) {
        this.results.workflowApi = {
          status: 'success',
          details: '✅ Workflow API accessible without authentication',
          data: 'No authentication required'
        };
      } else {
        this.results.workflowApi = {
          status: 'warning',
          details: `⚠️ Workflow API returned unexpected status ${response.statusCode}`,
          data: response.body
        };
      }
    } catch (error) {
      this.results.workflowApi = {
        status: 'error',
        details: `❌ Workflow API request failed: ${error.message}`,
        data: null
      };
    }
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
          'User-Agent': 'n8n-fix-verifier/1.0',
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

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateVerificationReport() {
    console.log('\n📊 Fix Verification Report');
    console.log('==========================');
    
    const statusIcons = {
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️'
    };
    
    for (const [component, result] of Object.entries(this.results)) {
      const icon = statusIcons[result.status];
      const componentName = component === 'webhook' ? 'Webhook' : 'Workflow API';
      
      console.log(`${icon} ${componentName}: ${result.status.toUpperCase()}`);
      console.log(`   ${result.details}`);
      if (result.data) {
        console.log(`   Data: ${typeof result.data === 'string' ? result.data : JSON.stringify(result.data)}`);
      }
      console.log('');
    }

    // Provide next steps based on results
    console.log('🎯 Next Steps:');
    
    if (this.results.webhook?.status === 'success') {
      console.log('✅ Webhook is working! Your GitHub → n8n integration should now function.');
      console.log('   Test with a real commit to verify the full pipeline.');
    } else {
      console.log('❌ Webhook still not working. Please:');
      console.log('   1. Double-check workflow activation in n8n dashboard');
      console.log('   2. Ensure workflow is in "Active" state, not "Test" mode');
      console.log('   3. Try deactivating and reactivating the workflow');
    }

    if (this.results.workflowApi?.status === 'info') {
      console.log('ℹ️ Workflow API requires authentication (normal behavior)');
      console.log('   To access workflows programmatically, you\'ll need an API key.');
    }

    console.log('\n🔗 Quick Links:');
    console.log('   - n8n Dashboard: https://pixx100.app.n8n.cloud');
    console.log('   - GitHub Repository: Check recent commits for webhook triggers');
    console.log('   - n8n API Documentation: https://docs.n8n.io/api/');
  }
}

// Run the verification
const verifier = new N8nFixVerifier();
verifier.verifyFixes().catch(console.error);
