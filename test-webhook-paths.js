#!/usr/bin/env node

/**
 * Test Different Webhook Paths
 * 
 * This script tests various common webhook paths to see if the workflow
 * exists under a different path than expected.
 */

import https from 'https';
import http from 'http';

class WebhookPathTester {
  constructor() {
    this.baseUrl = 'https://pixx100.app.n8n.cloud';
    this.results = {};
  }

  async testAllPaths() {
    console.log('🔍 Testing Different Webhook Paths');
    console.log('==================================\n');

    const paths = [
      '/webhook-test/cursor-webhook',
      '/webhook/cursor-webhook',
      '/webhook/github',
      '/webhook/cursor',
      '/webhook/test',
      '/webhook/webhook',
      '/webhook/trigger',
      '/webhook/n8n',
      '/webhook/automation'
    ];

    for (const path of paths) {
      await this.testPath(path);
    }

    this.generateReport();
  }

  async testPath(path) {
    try {
      const response = await this.makeRequest(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          test: 'path_discovery',
          timestamp: new Date().toISOString(),
          path: path
        })
      });

      this.results[path] = {
        status: response.statusCode,
        success: response.statusCode === 200,
        details: this.getStatusDescription(response.statusCode),
        data: response.body
      };
    } catch (error) {
      this.results[path] = {
        status: 'ERROR',
        success: false,
        details: `Request failed: ${error.message}`,
        data: null
      };
    }
  }

  getStatusDescription(statusCode) {
    switch (statusCode) {
      case 200:
        return '✅ Webhook found and working!';
      case 404:
        return '❌ Webhook not found - workflow not activated';
      case 401:
        return '🔐 Authentication required';
      case 403:
        return '🚫 Access forbidden';
      case 500:
        return '💥 Server error';
      default:
        return `⚠️ Unexpected status: ${statusCode}`;
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
          'User-Agent': 'webhook-path-tester/1.0',
          ...options.headers
        },
        timeout: options.timeout || 5000
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
    console.log('\n📊 Webhook Path Test Results');
    console.log('============================\n');

    const workingPaths = [];
    const notFoundPaths = [];

    for (const [path, result] of Object.entries(this.results)) {
      const icon = result.success ? '✅' : '❌';
      console.log(`${icon} ${path}: ${result.status} - ${result.details}`);
      
      if (result.success) {
        workingPaths.push(path);
      } else if (result.status === 404) {
        notFoundPaths.push(path);
      }
    }

    console.log('\n🎯 Summary:');
    
    if (workingPaths.length > 0) {
      console.log('✅ Working webhook paths found:');
      workingPaths.forEach(path => console.log(`   - ${path}`));
      console.log('\n💡 Use one of these working paths for your GitHub webhook configuration.');
    } else {
      console.log('❌ No working webhook paths found.');
      console.log('   This confirms that no webhook workflows are currently activated.');
      console.log('\n🔧 Next Steps:');
      console.log('   1. Go to n8n dashboard: https://pixx100.app.n8n.cloud');
      console.log('   2. Check if any workflows exist');
      console.log('   3. Activate a workflow with a webhook trigger');
      console.log('   4. Or create a new webhook workflow');
    }

    console.log('\n📋 All tested paths:');
    Object.keys(this.results).forEach(path => {
      console.log(`   - ${path}`);
    });
  }
}

// Run the path tester
const tester = new WebhookPathTester();
tester.testAllPaths().catch(console.error);
