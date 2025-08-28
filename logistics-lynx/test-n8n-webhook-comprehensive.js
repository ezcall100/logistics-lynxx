// Comprehensive N8N Webhook Testing Script
// Tests multiple endpoints and scenarios with detailed reporting

const webhookUrls = [
  'https://pixx100.app.n8n.cloud/webhook-test/',
  'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
  'https://imcyiofodlnbomemvqto.supabase.co/functions/v1/n8n-webhook'
];

const testScenarios = [
  {
    name: 'Basic Connectivity Test',
    payload: {
      test: true,
      message: 'Basic N8N webhook connectivity test',
      timestamp: new Date().toISOString(),
      source: 'transbot_ai_test',
      test_id: `basic_${Date.now()}`
    }
  },
  {
    name: 'Autonomous Task Test',
    payload: {
      task_type: 'autonomous_task',
      agent_type: 'test_agent',
      task_name: 'N8N Integration Test',
      description: 'Testing autonomous task creation via N8N webhook',
      priority: 5,
      workflow_id: 'test_workflow_001',
      execution_id: `exec_${Date.now()}`,
      timestamp: new Date().toISOString()
    }
  },
  {
    name: 'Health Check Test',
    payload: {
      task_type: 'system_health_check',
      check_type: 'n8n_connectivity',
      components: ['webhook', 'database', 'autonomous_agents'],
      timestamp: new Date().toISOString()
    }
  },
  {
    name: 'Complex Data Test',
    payload: {
      trigger_type: 'autonomous_task',
      task_type: 'complex_test',
      goal: 'Test complex data handling',
      prompt: 'Testing webhook connection and data processing',
      action: 'Complex test executed',
      confidence: 0.95,
      success: true,
      metadata: {
        user_id: 'test_user_001',
        session_id: `session_${Date.now()}`,
        environment: 'test',
        version: '1.0.0'
      },
      timestamp: new Date().toISOString()
    }
  },
  {
    name: 'Error Simulation Test',
    payload: {
      test_type: 'error_simulation',
      should_fail: false,
      error_type: 'none',
      timestamp: new Date().toISOString()
    }
  }
];

class N8NWebhookTester {
  constructor() {
    this.results = [];
    this.summary = {
      totalTests: 0,
      successfulTests: 0,
      failedTests: 0,
      averageResponseTime: 0,
      totalResponseTime: 0
    };
  }

  async testWebhook(url, scenario) {
    const testId = `${scenario.name}_${Date.now()}`;
    const startTime = Date.now();
    
    console.log(`\n🔍 Testing: ${scenario.name}`);
    console.log(`📍 URL: ${url}`);
    console.log(`📦 Payload:`, JSON.stringify(scenario.payload, null, 2));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'TransBot-AI-Test/1.0',
          'X-Test-ID': testId
        },
        body: JSON.stringify(scenario.payload)
      });

      const responseTime = Date.now() - startTime;
      let responseData = null;

      try {
        responseData = await response.json();
      } catch (e) {
        // Some webhooks return empty responses
        responseData = { raw: '' };
      }

      const result = {
        testId,
        scenario: scenario.name,
        url,
        success: response.ok,
        statusCode: response.status,
        statusText: response.statusText,
        responseTime,
        responseData,
        timestamp: new Date().toISOString()
      };

      if (response.ok) {
        console.log(`✅ SUCCESS - Status: ${response.status} (${responseTime}ms)`);
        console.log(`📄 Response:`, JSON.stringify(responseData, null, 2));
      } else {
        console.log(`❌ FAILED - Status: ${response.status} ${response.statusText} (${responseTime}ms)`);
        console.log(`📄 Response:`, JSON.stringify(responseData, null, 2));
      }

      return result;

    } catch (error) {
      const responseTime = Date.now() - startTime;
      console.log(`💥 ERROR - ${error.message} (${responseTime}ms)`);
      
      return {
        testId,
        scenario: scenario.name,
        url,
        success: false,
        statusCode: 0,
        statusText: 'Network Error',
        responseTime,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async runAllTests() {
    console.log('🧪 Starting Comprehensive N8N Webhook Testing...');
    console.log('='.repeat(80));
    console.log(`📅 Test Started: ${new Date().toISOString()}`);
    console.log(`🎯 Testing ${webhookUrls.length} URLs with ${testScenarios.length} scenarios each`);
    console.log('='.repeat(80));

    for (const url of webhookUrls) {
      console.log(`\n🌐 Testing URL: ${url}`);
      console.log('-'.repeat(60));

      for (const scenario of testScenarios) {
        const result = await this.testWebhook(url, scenario);
        this.results.push(result);
        
        // Update summary
        this.summary.totalTests++;
        this.summary.totalResponseTime += result.responseTime;
        
        if (result.success) {
          this.summary.successfulTests++;
        } else {
          this.summary.failedTests++;
        }

        // Wait between tests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    this.summary.averageResponseTime = this.summary.totalResponseTime / this.summary.totalTests;
    this.generateReport();
  }

  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 N8N WEBHOOK TESTING REPORT');
    console.log('='.repeat(80));
    
    console.log(`\n📈 SUMMARY:`);
    console.log(`   Total Tests: ${this.summary.totalTests}`);
    console.log(`   Successful: ${this.summary.successfulTests} (${((this.summary.successfulTests / this.summary.totalTests) * 100).toFixed(1)}%)`);
    console.log(`   Failed: ${this.summary.failedTests} (${((this.summary.failedTests / this.summary.totalTests) * 100).toFixed(1)}%)`);
    console.log(`   Average Response Time: ${this.summary.averageResponseTime.toFixed(0)}ms`);

    console.log(`\n🌐 URL ANALYSIS:`);
    const urlResults = {};
    webhookUrls.forEach(url => {
      const urlTests = this.results.filter(r => r.url === url);
      const successful = urlTests.filter(r => r.success).length;
      const total = urlTests.length;
      const avgTime = urlTests.reduce((sum, r) => sum + r.responseTime, 0) / total;
      
      urlResults[url] = { successful, total, avgTime };
      
      console.log(`   ${url}:`);
      console.log(`     Success Rate: ${successful}/${total} (${((successful/total)*100).toFixed(1)}%)`);
      console.log(`     Avg Response Time: ${avgTime.toFixed(0)}ms`);
    });

    console.log(`\n📋 DETAILED RESULTS:`);
    this.results.forEach((result, index) => {
      const status = result.success ? '✅' : '❌';
      console.log(`   ${index + 1}. ${status} ${result.scenario} - ${result.url}`);
      console.log(`      Status: ${result.statusCode} ${result.statusText}`);
      console.log(`      Time: ${result.responseTime}ms`);
      if (result.error) {
        console.log(`      Error: ${result.error}`);
      }
    });

    // Find best performing URL
    const bestUrl = Object.entries(urlResults).reduce((best, [url, stats]) => {
      return stats.successful > best.successful ? { url, ...stats } : best;
    }, { url: '', successful: 0, total: 0, avgTime: 0 });

    console.log(`\n🏆 BEST PERFORMING URL:`);
    console.log(`   ${bestUrl.url}`);
    console.log(`   Success Rate: ${bestUrl.successful}/${bestUrl.total} (${((bestUrl.successful/bestUrl.total)*100).toFixed(1)}%)`);
    console.log(`   Avg Response Time: ${bestUrl.avgTime.toFixed(0)}ms`);

    console.log('\n' + '='.repeat(80));
    console.log('🏁 Testing Complete!');
    console.log('='.repeat(80));

    // Save results to file
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: this.summary,
      urlResults,
      detailedResults: this.results,
      bestUrl: bestUrl.url
    };

    // Write to file if in Node.js environment
    if (typeof require !== 'undefined') {
      const fs = require('fs');
      fs.writeFileSync('n8n-webhook-test-results.json', JSON.stringify(reportData, null, 2));
      console.log('\n💾 Results saved to: n8n-webhook-test-results.json');
    }
  }
}

// Run the comprehensive test
const tester = new N8NWebhookTester();
tester.runAllTests().catch(console.error);
