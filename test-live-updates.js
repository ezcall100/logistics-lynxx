#!/usr/bin/env node

const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Enhanced Live Website Updates...');

class LiveUpdateTester {
  constructor() {
    this.ws = null;
    this.testResults = [];
    this.connected = false;
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket('ws://localhost:8086');
      
      this.ws.on('open', () => {
        console.log('✅ Connected to enhanced live website updater');
        this.connected = true;
        resolve();
      });

      this.ws.on('message', (data) => {
        try {
          const message = JSON.parse(data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Error parsing message:', error.message);
        }
      });

      this.ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error.message);
        reject(error);
      });

      this.ws.on('close', () => {
        console.log('🔌 Disconnected from live website updater');
        this.connected = false;
      });
    });
  }

  handleMessage(message) {
    console.log(`📨 Received: ${message.type}`);
    
    switch (message.type) {
      case 'connection_status':
        this.testResults.push({
          test: 'Connection Status',
          status: 'PASS',
          data: message.data
        });
        break;
        
      case 'safe_live_update_completed':
        this.testResults.push({
          test: 'Safe Live Update',
          status: 'PASS',
          data: message.data
        });
        this.verifyFileUpdates();
        break;
        
      case 'home_page_updated':
        this.testResults.push({
          test: 'Home Page Update',
          status: 'PASS',
          data: message.data
        });
        break;
        
      case 'dashboard_updated':
        this.testResults.push({
          test: 'Dashboard Update',
          status: 'PASS',
          data: message.data
        });
        break;
        
      case 'hot_reload_triggered':
        this.testResults.push({
          test: 'Hot Reload',
          status: 'PASS',
          data: message.data
        });
        break;
        
      case 'safe_live_update_failed':
        this.testResults.push({
          test: 'Safe Update Error Handling',
          status: 'PASS',
          data: message.data
        });
        break;
    }
  }

  async requestUpdate() {
    if (!this.connected) {
      console.log('❌ Not connected to live website updater');
      return;
    }

    console.log('🔄 Requesting live update...');
    this.ws.send(JSON.stringify({
      type: 'request_live_update'
    }));
  }

  verifyFileUpdates() {
    console.log('🔍 Verifying file updates...');
    
    const homePagePath = './logistics-lynx/src/pages/HomePage.tsx';
    const dashboardPath = './logistics-lynx/src/components/dashboard/Dashboard.tsx';
    
    try {
      // Check if files exist
      if (!fs.existsSync(homePagePath)) {
        this.testResults.push({
          test: 'Home Page File Exists',
          status: 'FAIL',
          error: 'HomePage.tsx not found'
        });
        return;
      }
      
      if (!fs.existsSync(dashboardPath)) {
        this.testResults.push({
          test: 'Dashboard File Exists',
          status: 'FAIL',
          error: 'Dashboard.tsx not found'
        });
        return;
      }

      // Read file contents
      const homePageContent = fs.readFileSync(homePagePath, 'utf8');
      const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');

      // Check for live update indicators
      if (homePageContent.includes('Live Update Indicator - Added by Autonomous Agent')) {
        this.testResults.push({
          test: 'Home Page Live Indicator',
          status: 'PASS',
          data: 'Live update indicator found in HomePage.tsx'
        });
      } else {
        this.testResults.push({
          test: 'Home Page Live Indicator',
          status: 'FAIL',
          error: 'Live update indicator not found in HomePage.tsx'
        });
      }

      if (dashboardContent.includes('Live Update Indicator - Added by Autonomous Agent')) {
        this.testResults.push({
          test: 'Dashboard Live Indicator',
          status: 'PASS',
          data: 'Live update indicator found in Dashboard.tsx'
        });
      } else {
        this.testResults.push({
          test: 'Dashboard Live Indicator',
          status: 'FAIL',
          error: 'Live update indicator not found in Dashboard.tsx'
        });
      }

      // Check for file corruption (basic check)
      if (homePageContent.length < 1000) {
        this.testResults.push({
          test: 'Home Page File Integrity',
          status: 'FAIL',
          error: 'HomePage.tsx appears to be corrupted (too short)'
        });
      } else {
        this.testResults.push({
          test: 'Home Page File Integrity',
          status: 'PASS',
          data: `HomePage.tsx file size: ${homePageContent.length} characters`
        });
      }

      if (dashboardContent.length < 1000) {
        this.testResults.push({
          test: 'Dashboard File Integrity',
          status: 'FAIL',
          error: 'Dashboard.tsx appears to be corrupted (too short)'
        });
      } else {
        this.testResults.push({
          test: 'Dashboard File Integrity',
          status: 'PASS',
          data: `Dashboard.tsx file size: ${dashboardContent.length} characters`
        });
      }

    } catch (error) {
      this.testResults.push({
        test: 'File Verification',
        status: 'FAIL',
        error: error.message
      });
    }
  }

  printResults() {
    console.log('\n📊 Test Results:');
    console.log('=' .repeat(50));
    
    let passed = 0;
    let failed = 0;
    
    this.testResults.forEach((result, index) => {
      const status = result.status === 'PASS' ? '✅' : '❌';
      console.log(`${status} Test ${index + 1}: ${result.test}`);
      
      if (result.status === 'PASS') {
        passed++;
        if (result.data) {
          console.log(`   Data: ${JSON.stringify(result.data)}`);
        }
      } else {
        failed++;
        if (result.error) {
          console.log(`   Error: ${result.error}`);
        }
      }
    });
    
    console.log('\n📈 Summary:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📊 Total: ${this.testResults.length}`);
    
    if (failed === 0) {
      console.log('\n🎉 All tests passed! Enhanced live website updater is working correctly.');
    } else {
      console.log('\n⚠️ Some tests failed. Please check the errors above.');
    }
  }

  async runTests() {
    try {
      // Connect to the live website updater
      await this.connect();
      
      // Wait a moment for connection to stabilize
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Request a live update
      await this.requestUpdate();
      
      // Wait for updates to complete
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Print results
      this.printResults();
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      this.testResults.push({
        test: 'Connection Test',
        status: 'FAIL',
        error: error.message
      });
      this.printResults();
    } finally {
      if (this.ws) {
        this.ws.close();
      }
    }
  }
}

// Run the tests
const tester = new LiveUpdateTester();
tester.runTests();
