#!/usr/bin/env node

/**
 * n8n Troubleshooting Script
 * 
 * This script helps diagnose n8n issues including:
 * - 503 errors when fetching workflows
 * - 404 errors on webhook endpoints
 * - Service availability problems
 */

import https from 'https';
import http from 'http';

class N8nTroubleshooter {
  constructor() {
    this.baseUrl = 'https://pixx100.app.n8n.cloud';
    this.results = {};
  }

  async runDiagnostic() {
    console.log('🔍 n8n Troubleshooting Diagnostic');
    console.log('==================================\n');

    await this.checkInstanceHealth();
    await this.checkWebhookEndpoint();
    await this.checkWorkflowAPI();
    await this.checkAuthentication();
    await this.checkNetworkConnectivity();

    this.generateReport();
    this.provideSolutions();
  }

  async checkInstanceHealth() {
    console.log('1️⃣ Checking n8n Instance Health...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/healthz`);
      
      if (response.statusCode === 200) {
        this.results.health = {
          status: 'success',
          details: 'n8n instance is healthy and responding',
          data: response.body
        };
      } else {
        this.results.health = {
          status: 'error',
          details: `Health check failed with status ${response.statusCode}`,
          data: response.body
        };
      }
    } catch (error) {
      this.results.health = {
        status: 'error',
        details: `Cannot reach n8n instance: ${error.message}`,
        data: null
      };
    }
  }

  async checkWebhookEndpoint() {
    console.log('2️⃣ Testing Webhook Endpoint...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/webhook-test/cursor-webhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          test: 'payload',
          timestamp: new Date().toISOString()
        })
      });

      if (response.statusCode === 200) {
        this.results.webhook = {
          status: 'success',
          details: 'Webhook endpoint is working',
          data: response.body
        };
      } else if (response.statusCode === 404) {
        this.results.webhook = {
          status: 'error',
          details: 'Webhook not registered - workflow needs activation',
          data: response.body
        };
      } else {
        this.results.webhook = {
          status: 'error',
          details: `Webhook returned status ${response.statusCode}`,
          data: response.body
        };
      }
    } catch (error) {
      this.results.webhook = {
        status: 'error',
        details: `Webhook request failed: ${error.message}`,
        data: null
      };
    }
  }

  async checkWorkflowAPI() {
    console.log('3️⃣ Testing Workflow API Access...');
    
    try {
      // Test the workflows endpoint (this might require authentication)
      const response = await this.makeRequest(`${this.baseUrl}/api/v1/workflows`);
      
      if (response.statusCode === 200) {
        this.results.workflowApi = {
          status: 'success',
          details: 'Workflow API is accessible',
          data: 'Workflows endpoint responding'
        };
      } else if (response.statusCode === 401) {
        this.results.workflowApi = {
          status: 'warning',
          details: 'Workflow API requires authentication',
          data: 'Authentication needed for workflow access'
        };
      } else if (response.statusCode === 503) {
        this.results.workflowApi = {
          status: 'error',
          details: 'Workflow API service unavailable (503)',
          data: 'Service temporarily unavailable'
        };
      } else {
        this.results.workflowApi = {
          status: 'error',
          details: `Workflow API returned status ${response.statusCode}`,
          data: response.body
        };
      }
    } catch (error) {
      this.results.workflowApi = {
        status: 'error',
        details: `Workflow API request failed: ${error.message}`,
        data: null
      };
    }
  }

  async checkAuthentication() {
    console.log('4️⃣ Checking Authentication Requirements...');
    
    try {
      // Test if the main dashboard requires authentication
      const response = await this.makeRequest(`${this.baseUrl}/`);
      
      if (response.statusCode === 200) {
        this.results.auth = {
          status: 'success',
          details: 'Dashboard accessible without authentication',
          data: 'Public access available'
        };
      } else if (response.statusCode === 302 || response.statusCode === 401) {
        this.results.auth = {
          status: 'warning',
          details: 'Authentication required for dashboard access',
          data: 'Login required'
        };
      } else {
        this.results.auth = {
          status: 'error',
          details: `Dashboard returned status ${response.statusCode}`,
          data: response.body
        };
      }
    } catch (error) {
      this.results.auth = {
        status: 'error',
        details: `Authentication check failed: ${error.message}`,
        data: null
      };
    }
  }

  async checkNetworkConnectivity() {
    console.log('5️⃣ Testing Network Connectivity...');
    
    try {
      const url = new URL(this.baseUrl);
      const response = await this.makeRequest(`${url.protocol}//${url.hostname}`, {
        method: 'HEAD',
        timeout: 5000
      });
      
      this.results.network = {
        status: 'success',
        details: `Successfully connected to ${url.hostname}`,
        data: `Response: ${response.statusCode}`
      };
    } catch (error) {
      this.results.network = {
        status: 'error',
        details: `Network connectivity issue: ${error.message}`,
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
          'User-Agent': 'n8n-troubleshooter/1.0',
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
    console.log('\n📊 n8n Diagnostic Report');
    console.log('========================');
    
    const statusIcons = {
      success: '✅',
      warning: '⚠️',
      error: '❌'
    };
    
    for (const [component, result] of Object.entries(this.results)) {
      const icon = statusIcons[result.status];
      const componentName = component.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      
      console.log(`${icon} ${componentName}: ${result.status.toUpperCase()}`);
      console.log(`   ${result.details}`);
      if (result.data) {
        console.log(`   Data: ${typeof result.data === 'string' ? result.data : JSON.stringify(result.data)}`);
      }
      console.log('');
    }
  }

  provideSolutions() {
    console.log('🔧 Recommended Solutions');
    console.log('=======================\n');

    // Check for 503 workflow API errors
    if (this.results.workflowApi?.status === 'error' && this.results.workflowApi.details.includes('503')) {
      console.log('🚨 CRITICAL: Workflow API Service Unavailable (503)');
      console.log('   Solutions:');
      console.log('   1. Check n8n instance status and resources');
      console.log('   2. Restart the n8n service if possible');
      console.log('   3. Check n8n logs for errors');
      console.log('   4. Contact n8n administrator');
      console.log('   5. Wait for service to recover (temporary issue)\n');
    }

    // Check for webhook 404 errors
    if (this.results.webhook?.status === 'error' && this.results.webhook.details.includes('404')) {
      console.log('⚠️ WARNING: Webhook Not Registered (404)');
      console.log('   Solutions:');
      console.log('   1. Go to n8n dashboard: https://pixx100.app.n8n.cloud');
      console.log('   2. Navigate to Workflows');
      console.log('   3. Find "Cursor Webhook Integration" workflow');
      console.log('   4. Click "Activate" button');
      console.log('   5. Ensure workflow is in "Active" state, not "Test" mode\n');
    }

    // Check for authentication issues
    if (this.results.auth?.status === 'warning') {
      console.log('🔐 INFO: Authentication Required');
      console.log('   Solutions:');
      console.log('   1. Log in to n8n dashboard with your credentials');
      console.log('   2. Check if you have proper permissions');
      console.log('   3. Contact administrator if access is denied\n');
    }

    // General troubleshooting steps
    console.log('📋 General Troubleshooting Steps:');
    console.log('   1. Clear browser cache and cookies');
    console.log('   2. Try accessing n8n from a different browser');
    console.log('   3. Check if n8n instance is under maintenance');
    console.log('   4. Verify your internet connection');
    console.log('   5. Wait a few minutes and try again\n');

    console.log('🔗 Useful Links:');
    console.log('   - n8n Dashboard: https://pixx100.app.n8n.cloud');
    console.log('   - n8n Documentation: https://docs.n8n.io/');
    console.log('   - n8n Community: https://community.n8n.io/\n');
  }
}

// Run the diagnostic
const troubleshooter = new N8nTroubleshooter();
troubleshooter.runDiagnostic().catch(console.error);
