#!/usr/bin/env node

/**
 * 🤖 Autonomous Portal Fixer
 * Automatically detects, diagnoses, and fixes blank page issues across all portals
 * Runs 24/7 without human intervention
 */

const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  // n8n Webhook
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL || 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook',
  N8N_WEBHOOK_SECRET: process.env.N8N_WEBHOOK_SECRET || 'your-secret-key-here',
  
  // Portal URLs to monitor and fix
  PORTALS: {
    'main-dashboard': 'http://localhost:3000',
    'broker-portal': 'http://localhost:3000/broker',
    'carrier-portal': 'http://localhost:3000/carrier',
    'driver-portal': 'http://localhost:3000/driver',
    'shipper-portal': 'http://localhost:3000/shipper',
    'admin-portal': 'http://localhost:3000/admin',
    'analytics-portal': 'http://localhost:3000/analytics',
    'autonomous-portal': 'http://localhost:3000/autonomous'
  },
  
  // System Settings
  CHECK_INTERVAL: 30 * 1000, // 30 seconds
  HEALTH_CHECK_INTERVAL: 10 * 1000, // 10 seconds
  MAX_RETRIES: 3,
  FIX_TIMEOUT: 60 * 1000 // 60 seconds
};

// System state
let systemState = {
  isRunning: false,
  portals: {},
  issues: [],
  fixes: [],
  lastHealthCheck: null,
  totalChecks: 0,
  successfulFixes: 0,
  failedFixes: 0
};

// Portal Agent Class
class PortalAgent {
  constructor(id, url, type) {
    this.id = id;
    this.url = url;
    this.type = type;
    this.isHealthy = true;
    this.lastCheck = null;
    this.issues = [];
    this.fixes = [];
    this.checkCount = 0;
    this.fixCount = 0;
  }

  async checkHealth() {
    try {
      console.log(`🔍 Checking portal: ${this.id} (${this.url})`);
      
      const response = await this.makeRequest(this.url);
      const isHealthy = response.status === 200 && response.body.length > 100;
      
      this.isHealthy = isHealthy;
      this.lastCheck = new Date();
      this.checkCount++;
      
      if (!isHealthy) {
        console.log(`❌ Portal ${this.id} is unhealthy - Status: ${response.status}, Body length: ${response.body.length}`);
        await this.diagnoseAndFix();
      } else {
        console.log(`✅ Portal ${this.id} is healthy`);
      }
      
      return isHealthy;
    } catch (error) {
      console.error(`❌ Error checking portal ${this.id}:`, error.message);
      this.isHealthy = false;
      await this.diagnoseAndFix();
      return false;
    }
  }

  async diagnoseAndFix() {
    try {
      console.log(`🔧 Diagnosing and fixing portal: ${this.id}`);
      
      // Step 1: Diagnose the issue
      const diagnosis = await this.diagnoseIssue();
      
      // Step 2: Apply fixes based on diagnosis
      const fixResult = await this.applyFixes(diagnosis);
      
      // Step 3: Verify the fix
      const verification = await this.verifyFix();
      
      // Step 4: Report results
      await this.reportResults(diagnosis, fixResult, verification);
      
      this.fixCount++;
      
    } catch (error) {
      console.error(`❌ Error fixing portal ${this.id}:`, error.message);
      await this.reportError(error);
    }
  }

  async diagnoseIssue() {
    const diagnosis = {
      portal: this.id,
      url: this.url,
      timestamp: new Date().toISOString(),
      issues: []
    };

    // Check for common blank page issues
    const checks = [
      { name: 'connectivity', check: () => this.checkConnectivity() },
      { name: 'build_status', check: () => this.checkBuildStatus() },
      { name: 'dependencies', check: () => this.checkDependencies() },
      { name: 'configuration', check: () => this.checkConfiguration() },
      { name: 'routing', check: () => this.checkRouting() },
      { name: 'components', check: () => this.checkComponents() }
    ];

    for (const check of checks) {
      try {
        const result = await check.check();
        if (!result.healthy) {
          diagnosis.issues.push({
            type: check.name,
            description: result.description,
            severity: result.severity || 'medium'
          });
        }
      } catch (error) {
        diagnosis.issues.push({
          type: check.name,
          description: `Check failed: ${error.message}`,
          severity: 'high'
        });
      }
    }

    return diagnosis;
  }

  async checkConnectivity() {
    try {
      const response = await this.makeRequest(this.url);
      return {
        healthy: response.status < 500,
        description: response.status < 500 ? 'Connectivity OK' : `Server error: ${response.status}`
      };
    } catch (error) {
      return {
        healthy: false,
        description: `Connection failed: ${error.message}`
      };
    }
  }

  async checkBuildStatus() {
    try {
      // Check if build files exist
      const buildPath = path.join(process.cwd(), 'logistics-lynx', 'dist');
      const buildExists = fs.existsSync(buildPath);
      
      if (!buildExists) {
        return {
          healthy: false,
          description: 'Build files missing - needs rebuild',
          severity: 'high'
        };
      }
      
      return { healthy: true, description: 'Build files exist' };
    } catch (error) {
      return {
        healthy: false,
        description: `Build check failed: ${error.message}`
      };
    }
  }

  async checkDependencies() {
    try {
      const packagePath = path.join(process.cwd(), 'logistics-lynx', 'package.json');
      const packageExists = fs.existsSync(packagePath);
      
      if (!packageExists) {
        return {
          healthy: false,
          description: 'package.json missing',
          severity: 'high'
        };
      }
      
      // Check node_modules
      const nodeModulesPath = path.join(process.cwd(), 'logistics-lynx', 'node_modules');
      const nodeModulesExists = fs.existsSync(nodeModulesPath);
      
      if (!nodeModulesExists) {
        return {
          healthy: false,
          description: 'node_modules missing - needs npm install',
          severity: 'high'
        };
      }
      
      return { healthy: true, description: 'Dependencies OK' };
    } catch (error) {
      return {
        healthy: false,
        description: `Dependency check failed: ${error.message}`
      };
    }
  }

  async checkConfiguration() {
    try {
      // Check for common config issues
      const configChecks = [
        { file: 'vite.config.js', description: 'Vite configuration' },
        { file: 'tsconfig.json', description: 'TypeScript configuration' },
        { file: '.env', description: 'Environment variables' }
      ];
      
      for (const check of configChecks) {
        const configPath = path.join(process.cwd(), 'logistics-lynx', check.file);
        if (!fs.existsSync(configPath)) {
          return {
            healthy: false,
            description: `${check.description} missing`,
            severity: 'medium'
          };
        }
      }
      
      return { healthy: true, description: 'Configuration OK' };
    } catch (error) {
      return {
        healthy: false,
        description: `Configuration check failed: ${error.message}`
      };
    }
  }

  async checkRouting() {
    try {
      // Check if routing is properly configured
      const routerPath = path.join(process.cwd(), 'logistics-lynx', 'src', 'App.tsx');
      if (fs.existsSync(routerPath)) {
        const content = fs.readFileSync(routerPath, 'utf8');
        if (!content.includes('BrowserRouter') && !content.includes('Routes')) {
          return {
            healthy: false,
            description: 'Routing not properly configured',
            severity: 'medium'
          };
        }
      }
      
      return { healthy: true, description: 'Routing OK' };
    } catch (error) {
      return {
        healthy: false,
        description: `Routing check failed: ${error.message}`
      };
    }
  }

  async checkComponents() {
    try {
      // Check if main components exist
      const componentChecks = [
        { path: 'src/components/dashboard', description: 'Dashboard components' },
        { path: 'src/pages', description: 'Page components' },
        { path: 'src/App.tsx', description: 'Main App component' }
      ];
      
      for (const check of componentChecks) {
        const componentPath = path.join(process.cwd(), 'logistics-lynx', check.path);
        if (!fs.existsSync(componentPath)) {
          return {
            healthy: false,
            description: `${check.description} missing`,
            severity: 'medium'
          };
        }
      }
      
      return { healthy: true, description: 'Components OK' };
    } catch (error) {
      return {
        healthy: false,
        description: `Component check failed: ${error.message}`
      };
    }
  }

  async applyFixes(diagnosis) {
    const fixes = [];
    
    for (const issue of diagnosis.issues) {
      try {
        const fix = await this.applyFix(issue);
        fixes.push(fix);
      } catch (error) {
        fixes.push({
          issue: issue.type,
          success: false,
          error: error.message
        });
      }
    }
    
    return fixes;
  }

  async applyFix(issue) {
    console.log(`🔧 Applying fix for ${issue.type} on portal ${this.id}`);
    
    switch (issue.type) {
      case 'build_status':
        return await this.fixBuildStatus();
      case 'dependencies':
        return await this.fixDependencies();
      case 'configuration':
        return await this.fixConfiguration();
      case 'routing':
        return await this.fixRouting();
      case 'components':
        return await this.fixComponents();
      default:
        return await this.fixGeneric(issue);
    }
  }

  async fixBuildStatus() {
    try {
      console.log(`🏗️ Rebuilding portal ${this.id}...`);
      
      // Run build command
      const { exec } = require('child_process');
      const buildCommand = 'cd logistics-lynx && npm run build';
      
      return new Promise((resolve, reject) => {
        exec(buildCommand, { timeout: CONFIG.FIX_TIMEOUT }, (error, stdout, stderr) => {
          if (error) {
            resolve({
              issue: 'build_status',
              success: false,
              error: error.message,
              output: stderr
            });
          } else {
            resolve({
              issue: 'build_status',
              success: true,
              output: stdout
            });
          }
        });
      });
    } catch (error) {
      return {
        issue: 'build_status',
        success: false,
        error: error.message
      };
    }
  }

  async fixDependencies() {
    try {
      console.log(`📦 Installing dependencies for portal ${this.id}...`);
      
      const { exec } = require('child_process');
      const installCommand = 'cd logistics-lynx && npm install';
      
      return new Promise((resolve, reject) => {
        exec(installCommand, { timeout: CONFIG.FIX_TIMEOUT }, (error, stdout, stderr) => {
          if (error) {
            resolve({
              issue: 'dependencies',
              success: false,
              error: error.message,
              output: stderr
            });
          } else {
            resolve({
              issue: 'dependencies',
              success: true,
              output: stdout
            });
          }
        });
      });
    } catch (error) {
      return {
        issue: 'dependencies',
        success: false,
        error: error.message
      };
    }
  }

  async fixConfiguration() {
    try {
      console.log(`⚙️ Fixing configuration for portal ${this.id}...`);
      
      // Create basic configuration files if missing
      const configs = [
        {
          file: 'vite.config.js',
          content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})`
        },
        {
          file: 'tsconfig.json',
          content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`
        }
      ];
      
      for (const config of configs) {
        const configPath = path.join(process.cwd(), 'logistics-lynx', config.file);
        if (!fs.existsSync(configPath)) {
          fs.writeFileSync(configPath, config.content);
        }
      }
      
      return {
        issue: 'configuration',
        success: true,
        description: 'Configuration files created/verified'
      };
    } catch (error) {
      return {
        issue: 'configuration',
        success: false,
        error: error.message
      };
    }
  }

  async fixRouting() {
    try {
      console.log(`🛣️ Fixing routing for portal ${this.id}...`);
      
      // Create basic routing setup
      const routerContent = `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import BrokerPortal from './components/broker/BrokerPortal';
import CarrierPortal from './components/carrier/CarrierPortal';
import DriverPortal from './components/driver/DriverPortal';
import ShipperPortal from './components/shipper/ShipperPortal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/broker" element={<BrokerPortal />} />
        <Route path="/carrier" element={<CarrierPortal />} />
        <Route path="/driver" element={<DriverPortal />} />
        <Route path="/shipper" element={<ShipperPortal />} />
      </Routes>
    </Router>
  );
}

export default App;`;
      
      const appPath = path.join(process.cwd(), 'logistics-lynx', 'src', 'App.tsx');
      fs.writeFileSync(appPath, routerContent);
      
      return {
        issue: 'routing',
        success: true,
        description: 'Routing configuration updated'
      };
    } catch (error) {
      return {
        issue: 'routing',
        success: false,
        error: error.message
      };
    }
  }

  async fixComponents() {
    try {
      console.log(`🧩 Fixing components for portal ${this.id}...`);
      
      // Create basic components if missing
      const components = [
        {
          path: 'src/components/dashboard/Dashboard.tsx',
          content: `import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to the TMS Dashboard</p>
    </div>
  );
};

export default Dashboard;`
        },
        {
          path: 'src/components/broker/BrokerPortal.tsx',
          content: `import React from 'react';

const BrokerPortal = () => {
  return (
    <div className="broker-portal">
      <h1>Broker Portal</h1>
      <p>Broker management interface</p>
    </div>
  );
};

export default BrokerPortal;`
        }
      ];
      
      for (const component of components) {
        const componentPath = path.join(process.cwd(), 'logistics-lynx', component.path);
        const dir = path.dirname(componentPath);
        
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        if (!fs.existsSync(componentPath)) {
          fs.writeFileSync(componentPath, component.content);
        }
      }
      
      return {
        issue: 'components',
        success: true,
        description: 'Basic components created'
      };
    } catch (error) {
      return {
        issue: 'components',
        success: false,
        error: error.message
      };
    }
  }

  async fixGeneric(issue) {
    try {
      console.log(`🔧 Applying generic fix for ${issue.type} on portal ${this.id}...`);
      
      // Restart development server
      const { exec } = require('child_process');
      const restartCommand = 'cd logistics-lynx && npm run dev';
      
      return new Promise((resolve, reject) => {
        exec(restartCommand, { timeout: CONFIG.FIX_TIMEOUT }, (error, stdout, stderr) => {
          if (error) {
            resolve({
              issue: issue.type,
              success: false,
              error: error.message,
              output: stderr
            });
          } else {
            resolve({
              issue: issue.type,
              success: true,
              output: stdout
            });
          }
        });
      });
    } catch (error) {
      return {
        issue: issue.type,
        success: false,
        error: error.message
      };
    }
  }

  async verifyFix() {
    try {
      console.log(`✅ Verifying fix for portal ${this.id}...`);
      
      // Wait a moment for fixes to take effect
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Check health again
      const isHealthy = await this.checkHealth();
      
      return {
        success: isHealthy,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async reportResults(diagnosis, fixes, verification) {
    const report = {
      portal: this.id,
      url: this.url,
      timestamp: new Date().toISOString(),
      diagnosis,
      fixes,
      verification,
      overall_success: verification.success
    };
    
    // Send to n8n webhook
    await sendWebhook({
      event: 'portal_fix_report',
      portal: this.id,
      status: verification.success ? 'fixed' : 'failed',
      diagnosis: diagnosis.issues.length,
      fixes_applied: fixes.length,
      successful_fixes: fixes.filter(f => f.success).length,
      timestamp: new Date().toISOString()
    });
    
    // Store in system state
    systemState.fixes.push(report);
    
    if (verification.success) {
      systemState.successfulFixes++;
      console.log(`🎉 Portal ${this.id} fixed successfully!`);
    } else {
      systemState.failedFixes++;
      console.log(`❌ Portal ${this.id} fix failed`);
    }
  }

  async reportError(error) {
    await sendWebhook({
      event: 'portal_fix_error',
      portal: this.id,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }

  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      const req = https.request(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            body: data,
            headers: res.headers
          });
        });
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      req.end();
    });
  }
}

// Webhook sender
async function sendWebhook(payload) {
  return new Promise((resolve, reject) => {
    const payloadString = JSON.stringify(payload);
    const signature = crypto.createHmac('sha256', CONFIG.N8N_WEBHOOK_SECRET)
      .update(payloadString)
      .digest('base64');

    const url = new URL(CONFIG.N8N_WEBHOOK_URL);
    const postData = payloadString;

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'X-Signature-256': `sha256=${signature}`,
        'X-Idempotency-Key': `portal-fix-${Date.now()}`,
        'User-Agent': 'Autonomous-Portal-Fixer/1.0'
      },
      timeout: 10000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`Webhook failed: ${res.statusCode}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Initialize portal agents
function initializePortalAgents() {
  const agents = [];
  
  for (const [id, url] of Object.entries(CONFIG.PORTALS)) {
    const agent = new PortalAgent(id, url, 'portal');
    agents.push(agent);
    systemState.portals[id] = agent;
  }
  
  console.log(`🤖 Initialized ${agents.length} portal agents`);
  return agents;
}

// Main portal fixing loop
async function portalFixingLoop() {
  if (systemState.isRunning) {
    console.log('🔄 Portal fixing loop already running, skipping iteration');
    return;
  }

  systemState.isRunning = true;
  systemState.totalChecks++;

  try {
    console.log('\n🚀 Starting autonomous portal fixing iteration...');
    console.log(`📊 Total checks: ${systemState.totalChecks}`);

    // Check all portals
    const portalPromises = Object.values(systemState.portals)
      .map(portal => portal.checkHealth());

    const results = await Promise.allSettled(portalPromises);
    
    // Count healthy vs unhealthy portals
    const healthyPortals = results.filter(r => r.status === 'fulfilled' && r.value).length;
    const unhealthyPortals = results.length - healthyPortals;

    console.log(`📊 Portal Health Summary:`);
    console.log(`   ✅ Healthy: ${healthyPortals}`);
    console.log(`   ❌ Unhealthy: ${unhealthyPortals}`);
    console.log(`   🔧 Total fixes applied: ${systemState.fixes.length}`);

    // Send health summary to n8n
    await sendWebhook({
      event: 'portal_health_summary',
      healthy_portals: healthyPortals,
      unhealthy_portals: unhealthyPortals,
      total_checks: systemState.totalChecks,
      successful_fixes: systemState.successfulFixes,
      failed_fixes: systemState.failedFixes,
      timestamp: new Date().toISOString()
    });

    console.log('✅ Portal fixing iteration completed successfully');

  } catch (error) {
    console.error('❌ Portal fixing iteration failed:', error.message);
    
    await sendWebhook({
      event: 'portal_fixing_error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  } finally {
    systemState.isRunning = false;
  }
}

// Health check loop
async function healthCheckLoop() {
  setInterval(async () => {
    try {
      const healthyPortals = Object.values(systemState.portals)
        .filter(portal => portal.isHealthy).length;
      
      const totalPortals = Object.keys(systemState.portals).length;
      
      console.log(`🏥 Portal Health Check: ${healthyPortals}/${totalPortals} portals healthy`);
      
      if (healthyPortals < totalPortals) {
        await sendWebhook({
          event: 'portal_health_warning',
          healthy_portals: healthyPortals,
          total_portals: totalPortals,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('❌ Health check failed:', error.message);
    }
  }, CONFIG.HEALTH_CHECK_INTERVAL);
}

// System startup
async function startAutonomousPortalFixer() {
  console.log('🚀 Starting Autonomous Portal Fixer...');
  console.log('=====================================');
  console.log();
  console.log('🔧 Configuration:');
  console.log(`   Portals to monitor: ${Object.keys(CONFIG.PORTALS).length}`);
  console.log(`   Check interval: ${CONFIG.CHECK_INTERVAL / 1000} seconds`);
  console.log(`   Health check interval: ${CONFIG.HEALTH_CHECK_INTERVAL / 1000} seconds`);
  console.log();

  // Initialize portal agents
  initializePortalAgents();

  // Start health check loop
  healthCheckLoop();

  // Start main portal fixing loop
  setInterval(portalFixingLoop, CONFIG.CHECK_INTERVAL);

  // Send startup notification
  await sendWebhook({
    event: 'portal_fixer_startup',
    status: 'started',
    portals: Object.keys(CONFIG.PORTALS),
    timestamp: new Date().toISOString()
  });

  console.log('✅ Autonomous Portal Fixer started successfully!');
  console.log('🤖 System will automatically detect and fix portal issues');
  console.log('📊 Monitor logs for portal health and fix activities');
  console.log('🛑 Press Ctrl+C to stop the system');
  console.log();
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down autonomous portal fixer...');
  
  await sendWebhook({
    event: 'portal_fixer_shutdown',
    status: 'shutting_down',
    total_checks: systemState.totalChecks,
    successful_fixes: systemState.successfulFixes,
    failed_fixes: systemState.failedFixes,
    timestamp: new Date().toISOString()
  });

  console.log('✅ Autonomous portal fixer shutdown complete');
  process.exit(0);
});

// Error handling
process.on('uncaughtException', async (error) => {
  console.error('💥 Uncaught exception:', error);
  
  await sendWebhook({
    event: 'portal_fixer_crash',
    status: 'crashed',
    error: error.message,
    timestamp: new Date().toISOString()
  });

  process.exit(1);
});

// Start the system
startAutonomousPortalFixer().catch(console.error);
