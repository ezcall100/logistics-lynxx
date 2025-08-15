#!/usr/bin/env node

import http from 'http';
import { promises as fs } from 'fs';
import path from 'path';

class HealthCheckSystem {
  constructor() {
    this.baseUrl = process.env.APP_URL || 'http://localhost:8084';
    this.healthChecks = [];
  }

  async checkEndpoint(path, description) {
    return new Promise((resolve) => {
      const url = new URL(`${this.baseUrl}${path}`);
      
      const req = http.request({
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'GET',
        timeout: 5000
      }, (res) => {
        const success = res.statusCode >= 200 && res.statusCode < 400;
        const result = {
          path,
          description,
          status: res.statusCode,
          success,
          timestamp: new Date().toISOString()
        };
        
        console.log(`${success ? '✅' : '❌'} ${description} (${res.statusCode})`);
        this.healthChecks.push(result);
        resolve(result);
      });
      
      req.on('error', (error) => {
        const result = {
          path,
          description,
          status: 'ERROR',
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        };
        
        console.log(`❌ ${description} (ERROR: ${error.message})`);
        this.healthChecks.push(result);
        resolve(result);
      });
      
      req.on('timeout', () => {
        const result = {
          path,
          description,
          status: 'TIMEOUT',
          success: false,
          timestamp: new Date().toISOString()
        };
        
        console.log(`❌ ${description} (TIMEOUT)`);
        this.healthChecks.push(result);
        resolve(result);
      });
      
      req.end();
    });
  }

  async checkFileSystem() {
    console.log('📁 Checking file system...');
    
    const checks = [
      { path: 'package.json', description: 'Package.json exists' },
      { path: 'src', description: 'Source directory exists' },
      { path: 'dist', description: 'Build directory exists' },
      { path: 'node_modules', description: 'Dependencies installed' }
    ];

    for (const check of checks) {
      try {
        await fs.access(check.path);
        console.log(`✅ ${check.description}`);
        this.healthChecks.push({
          type: 'filesystem',
          path: check.path,
          description: check.description,
          success: true,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.log(`❌ ${check.description} - ${error.message}`);
        this.healthChecks.push({
          type: 'filesystem',
          path: check.path,
          description: check.description,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
  }

  async checkPortals() {
    console.log('🌐 Checking portal accessibility...');
    
    const portals = [
      '/',
      '/login',
      '/portal-selection',
      '/super-admin',
      '/admin',
      '/broker',
      '/carrier',
      '/driver',
      '/shipper',
      '/owner-operator'
    ];

    for (const portal of portals) {
      await this.checkEndpoint(portal, `Portal: ${portal}`);
    }
  }

  async checkDeprecatedRoutes() {
    console.log('⚠️ Checking deprecated routes...');
    
    const deprecated = [
      '/carrier-admin',
      '/broker-admin',
      '/shipper-admin',
      '/carrier-dispatch'
    ];

    for (const route of deprecated) {
      await this.checkEndpoint(route, `Deprecated: ${route}`);
    }
  }

  async generateReport() {
    const successful = this.healthChecks.filter(check => check.success);
    const failed = this.healthChecks.filter(check => !check.success);
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: this.healthChecks.length,
        successful: successful.length,
        failed: failed.length,
        successRate: `${((successful.length / this.healthChecks.length) * 100).toFixed(1)}%`
      },
      checks: this.healthChecks
    };

    // Save report
    const reportPath = path.join(process.cwd(), 'health-reports', `health-check-${Date.now()}.json`);
    await fs.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log('\n📊 Health Check Summary:');
    console.log('========================');
    console.log(`✅ Successful: ${successful.length}/${this.healthChecks.length}`);
    console.log(`❌ Failed: ${failed.length}/${this.healthChecks.length}`);
    console.log(`📈 Success Rate: ${report.summary.successRate}`);
    console.log(`📄 Report saved to: ${reportPath}`);

    return report;
  }

  async run() {
    console.log('🏥 Starting Health Check System');
    console.log('=' * 50);

    try {
      // Check file system
      await this.checkFileSystem();
      
      // Check portals
      await this.checkPortals();
      
      // Check deprecated routes
      await this.checkDeprecatedRoutes();
      
      // Generate report
      const report = await this.generateReport();
      
      console.log('=' * 50);
      console.log(`🏥 Health Check ${report.summary.successRate === '100.0%' ? 'PASSED' : 'FAILED'}`);
      
      process.exit(report.summary.successRate === '100.0%' ? 0 : 1);
      
    } catch (error) {
      console.error('💥 Health check failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the health check system
if (import.meta.url === `file://${process.argv[1]}`) {
  const healthCheck = new HealthCheckSystem();
  healthCheck.run();
}

export { HealthCheckSystem };
