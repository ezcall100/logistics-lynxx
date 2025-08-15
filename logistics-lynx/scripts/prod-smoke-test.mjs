#!/usr/bin/env node

/**
 * 🚀 Production Smoke Test
 * Tests critical endpoints for production readiness
 */

import http from 'node:http';
import https from 'node:https';

const CONFIG = {
  HEALTH_PORT: process.env.HEALTH_PORT || 8089,
  HOST: process.env.PROD_HOST || 'localhost',
  TIMEOUT: 5000,
  RETRIES: 3
};

class SmokeTest {
  constructor() {
    this.results = {
      healthz: { passed: false, error: null, responseTime: 0 },
      readyz: { passed: false, error: null, responseTime: 0, details: null }
    };
    this.startTime = Date.now();
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https:') ? https : http;
      const startTime = Date.now();
      
      const req = protocol.request(url, {
        timeout: CONFIG.TIMEOUT,
        ...options
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const responseTime = Date.now() - startTime;
          try {
            const jsonData = JSON.parse(data);
            resolve({
              statusCode: res.statusCode,
              data: jsonData,
              responseTime,
              headers: res.headers
            });
          } catch (e) {
            resolve({
              statusCode: res.statusCode,
              data: data,
              responseTime,
              headers: res.headers
            });
          }
        });
      });

      req.on('error', (error) => {
        reject({
          error: error.message,
          responseTime: Date.now() - startTime
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject({
          error: 'Request timeout',
          responseTime: Date.now() - startTime
        });
      });

      req.end();
    });
  }

  async testHealthz() {
    console.log('🏥 Testing /healthz endpoint...');
    
    try {
      const url = `http://${CONFIG.HOST}:${CONFIG.HEALTH_PORT}/healthz`;
      const response = await this.makeRequest(url);
      
      if (response.statusCode === 200) {
        this.results.healthz = {
          passed: true,
          error: null,
          responseTime: response.responseTime,
          data: response.data
        };
        console.log(`✅ /healthz: PASSED (${response.responseTime}ms)`);
        return true;
    } else {
        throw new Error(`HTTP ${response.statusCode}`);
    }
  } catch (error) {
      this.results.healthz = {
        passed: false,
        error: error.error || error.message,
        responseTime: error.responseTime || 0
      };
      console.log(`❌ /healthz: FAILED - ${error.error || error.message}`);
    return false;
  }
}

  async testReadyz() {
    console.log('🔍 Testing /readyz endpoint...');
    
    try {
      const url = `http://${CONFIG.HOST}:${CONFIG.HEALTH_PORT}/readyz`;
      const response = await this.makeRequest(url);
      
      if (response.statusCode === 200) {
        this.results.readyz = {
          passed: true,
          error: null,
          responseTime: response.responseTime,
          details: response.data
        };
        console.log(`✅ /readyz: PASSED (${response.responseTime}ms)`);
        console.log(`   Mode: ${response.data.mode || 'unknown'}`);
        console.log(`   Ready: ${response.data.ready}`);
      return true;
      } else {
        this.results.readyz = {
          passed: false,
          error: `HTTP ${response.statusCode}`,
          responseTime: response.responseTime,
          details: response.data
        };
        console.log(`❌ /readyz: FAILED - HTTP ${response.statusCode}`);
        if (response.data && response.data.reason) {
          console.log(`   Reason: ${response.data.reason}`);
        }
      return false;
    }
  } catch (error) {
      this.results.readyz = {
        passed: false,
        error: error.error || error.message,
        responseTime: error.responseTime || 0
      };
      console.log(`❌ /readyz: FAILED - ${error.error || error.message}`);
    return false;
  }
}

  async run() {
    console.log('🚀 Starting Production Smoke Test...');
    console.log(`   Host: ${CONFIG.HOST}:${CONFIG.HEALTH_PORT}`);
    console.log(`   Timeout: ${CONFIG.TIMEOUT}ms`);
    console.log('');

    const healthzPassed = await this.testHealthz();
    console.log('');
    const readyzPassed = await this.testReadyz();
    console.log('');

    const totalTime = Date.now() - this.startTime;
    const allPassed = healthzPassed && readyzPassed;

    console.log('📊 Smoke Test Results:');
    console.log(`   Total Time: ${totalTime}ms`);
    console.log(`   /healthz: ${healthzPassed ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   /readyz: ${readyzPassed ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`   Overall: ${allPassed ? '✅ PASS' : '❌ FAIL'}`);

    if (allPassed) {
      console.log('');
      console.log('🎉 All smoke tests passed! System is ready for production.');
    process.exit(0);
  } else {
      console.log('');
      console.log('⚠️  Some smoke tests failed. Please check the system before deployment.');
    process.exit(1);
    }
  }
}

// Run the smoke test
const smokeTest = new SmokeTest();
smokeTest.run().catch(error => {
  console.error('❌ Smoke test failed with error:', error);
  process.exit(1);
});
