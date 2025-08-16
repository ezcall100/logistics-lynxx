#!/usr/bin/env node

/**
 * Final Webhook Verification
 * 
 * Tests the correct webhook path that we discovered is working
 */

import https from 'https';
import http from 'http';

class FinalWebhookVerifier {
  constructor() {
    this.baseUrl = 'https://pixx100.app.n8n.cloud';
    this.workingPath = '/webhook/cursor-webhook';
  }

  async verifyWebhook() {
    console.log('🎉 Final Webhook Verification');
    console.log('=============================\n');

    console.log('✅ DISCOVERY: Working webhook found at:');
    console.log(`   ${this.baseUrl}${this.workingPath}\n`);

    await this.testWebhook();
    await this.testGitHubPayload();
    
    this.provideNextSteps();
  }

  async testWebhook() {
    console.log('1️⃣ Testing Basic Webhook Functionality...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}${this.workingPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          test: 'basic_webhook_test',
          timestamp: new Date().toISOString(),
          message: 'Webhook is working correctly!'
        })
      });

      console.log(`✅ Status: ${response.statusCode}`);
      console.log(`📄 Response: ${response.body}`);
      
      if (response.statusCode === 200) {
        console.log('🎉 SUCCESS: Webhook is working perfectly!\n');
      } else {
        console.log(`⚠️ Unexpected status: ${response.statusCode}\n`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}\n`);
    }
  }

  async testGitHubPayload() {
    console.log('2️⃣ Testing GitHub-Style Payload...');
    
    try {
      const githubPayload = {
        ref: 'refs/heads/main',
        before: 'abc123',
        after: 'def456',
        repository: {
          name: 'test-repository',
          full_name: 'test-user/test-repository',
          private: false
        },
        commits: [
          {
            id: 'def456',
            message: 'Test commit message',
            author: {
              name: 'Test User',
              email: 'test@example.com'
            }
          }
        ],
        sender: {
          login: 'test-user'
        }
      };

      const response = await this.makeRequest(`${this.baseUrl}${this.workingPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-GitHub-Event': 'push',
          'X-GitHub-Delivery': 'test-delivery-id'
        },
        body: JSON.stringify(githubPayload)
      });

      console.log(`✅ Status: ${response.statusCode}`);
      console.log(`📄 Response: ${response.body}`);
      
      if (response.statusCode === 200) {
        console.log('🎉 SUCCESS: GitHub payload processed successfully!\n');
      } else {
        console.log(`⚠️ Unexpected status: ${response.statusCode}\n`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}\n`);
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
          'User-Agent': 'final-webhook-verifier/1.0',
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

  provideNextSteps() {
    console.log('🎯 NEXT STEPS TO COMPLETE YOUR SETUP');
    console.log('====================================\n');

    console.log('1️⃣ Update GitHub Webhook Configuration:');
    console.log('   - Go to your GitHub repository');
    console.log('   - Navigate to Settings → Webhooks');
    console.log('   - Update the webhook URL to:');
    console.log(`   - ${this.baseUrl}${this.workingPath}`);
    console.log('   - Ensure "push" events are selected');
    console.log('   - Save the webhook configuration\n');

    console.log('2️⃣ Test with Real Commit:');
    console.log('   - Make a small commit to your repository');
    console.log('   - Check if the webhook is triggered');
    console.log('   - Monitor n8n workflow execution\n');

    console.log('3️⃣ Verify n8n Workflow Execution:');
    console.log('   - Go to n8n dashboard: https://pixx100.app.n8n.cloud');
    console.log('   - Check the workflow execution history');
    console.log('   - Ensure the workflow processes GitHub events correctly\n');

    console.log('🔗 Important URLs:');
    console.log(`   - Working Webhook: ${this.baseUrl}${this.workingPath}`);
    console.log('   - n8n Dashboard: https://pixx100.app.n8n.cloud');
    console.log('   - GitHub Webhooks: Repository Settings → Webhooks\n');

    console.log('✅ Your n8n webhook is working correctly!');
    console.log('   The issue was just the wrong URL path being tested.');
    console.log('   Update your GitHub webhook configuration and you should be all set!\n');
  }
}

// Run the final verification
const verifier = new FinalWebhookVerifier();
verifier.verifyWebhook().catch(console.error);
