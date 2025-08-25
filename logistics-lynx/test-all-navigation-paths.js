import http from 'http';

const BASE_URL = 'http://localhost:3000';

// Test all navigation paths systematically
const testPaths = [
  // Dashboard
  '/super-admin/dashboard',
  
  // User Management
  '/super-admin/users',
  '/super-admin/users/roles',
  '/super-admin/users/groups',
  '/super-admin/users/access',
  '/super-admin/users/analytics',
  '/super-admin/users/billing',
  '/super-admin/users/support',
  '/super-admin/users/onboarding',
  
  // System Administration
  '/super-admin/system/database',
  '/super-admin/system/api',
  '/super-admin/system/monitoring',
  '/super-admin/system/deployment',
  '/super-admin/system/config',
  '/super-admin/system/backup',
  '/super-admin/system/security',
  '/super-admin/system/integrations',
  '/super-admin/system/storage',
  '/super-admin/system/email',
  
  // Security Center
  '/super-admin/security/audit',
  '/super-admin/security/logs',
  '/super-admin/security/protection',
  '/super-admin/security/api',
  '/super-admin/security/permissions',
  '/super-admin/security/policies',
  '/super-admin/security/incidents',
  '/super-admin/security/compliance',
  
  // System Monitoring
  '/super-admin/monitoring/performance',
  '/super-admin/monitoring/errors',
  '/super-admin/monitoring/logs',
  '/super-admin/monitoring/alerts',
  '/super-admin/monitoring/uptime',
  '/super-admin/monitoring/resources',
  '/super-admin/monitoring/network',
  '/super-admin/monitoring/health',
  
  // Portal Management
  '/super-admin/portals',
  '/super-admin/portals/config',
  '/super-admin/portals/users',
  '/super-admin/portals/features',
  '/super-admin/portals/analytics',
  '/super-admin/portals/billing',
  '/super-admin/portals/support',
  '/super-admin/portals/integrations',
  '/super-admin/portals/backup',
  '/super-admin/portals/security',
  '/super-admin/portals/compliance',
  '/super-admin/portals/deployment',
  
  // Analytics & Reports
  '/super-admin/analytics/business',
  '/super-admin/analytics/users',
  '/super-admin/analytics/performance',
  '/super-admin/analytics/security',
  '/super-admin/analytics/financial',
  '/super-admin/analytics/operational',
  '/super-admin/analytics/custom',
  '/super-admin/analytics/export',
  '/super-admin/analytics/dashboards',
  '/super-admin/analytics/scheduled',
  
  // MCP Control Center
  '/super-admin/mcp',
  '/super-admin/mcp/agents',
  '/super-admin/mcp/models',
  '/super-admin/mcp/pipeline',
  '/super-admin/mcp/learning',
  '/super-admin/mcp/analytics',
  '/super-admin/mcp/automation',
  '/super-admin/mcp/integrations',
  '/super-admin/mcp/monitoring',
  '/super-admin/mcp/compliance',
  '/super-admin/mcp/documentation',
  '/super-admin/mcp/support',
  
  // Business Operations
  '/super-admin/business/customers',
  '/super-admin/business/sales',
  '/super-admin/business/billing',
  '/super-admin/business/support',
  '/super-admin/business/docs',
  '/super-admin/business/marketing',
  '/super-admin/business/partners',
  '/super-admin/business/legal',
  
  // Development & DevOps
  '/super-admin/dev/repository',
  '/super-admin/dev/pipeline',
  '/super-admin/dev/testing',
  '/super-admin/dev/environments',
  '/super-admin/dev/performance',
  '/super-admin/dev/security',
  '/super-admin/dev/documentation',
  '/super-admin/dev/releases',
  
  // Settings
  '/super-admin/settings',
  '/super-admin/settings/profile',
  '/super-admin/settings/system',
  '/super-admin/settings/preferences',
  '/super-admin/settings/security'
];

async function testAllNavigationPaths() {
  console.log('🔍 Testing All Navigation Paths...\n');
  
  let passed = 0;
  let failed = 0;
  const failedPaths = [];
  
  for (const path of testPaths) {
    const fullUrl = `${BASE_URL}${path}`;
    console.log(`Testing: ${path}`);
    
    try {
      const result = await new Promise((resolve) => {
        const req = http.get(fullUrl, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve({
              status: res.statusCode,
              url: fullUrl,
              success: res.statusCode === 200,
              error: res.statusCode !== 200 ? `HTTP ${res.statusCode}` : null,
              headers: res.headers
            });
          });
        });
        
        req.on('error', (err) => {
          resolve({
            status: 0,
            url: fullUrl,
            success: false,
            error: err.message,
            headers: {}
          });
        });
        
        req.setTimeout(5000, () => {
          req.destroy();
          resolve({
            status: 0,
            url: fullUrl,
            success: false,
            error: 'Timeout',
            headers: {}
          });
        });
      });
      
      if (result.success) {
        console.log(`  ✅ PASS - ${result.status}`);
        passed++;
      } else {
        console.log(`  ❌ FAIL - ${result.error}`);
        failed++;
        failedPaths.push(path);
        
        if (result.headers.location) {
          console.log(`  🔄 Redirects to: ${result.headers.location}`);
        }
      }
      
    } catch (error) {
      console.log(`  ❌ ERROR - ${error.message}`);
      failed++;
      failedPaths.push(path);
    }
    
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  console.log('\n🎉 Navigation Path Test Completed!');
  console.log(`📊 Results: ${passed} passed, ${failed} failed`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n❌ Failed Paths:');
    failedPaths.forEach(path => {
      console.log(`  - ${path}`);
    });
  }
  
  console.log('\n🔧 Debugging Information:');
  console.log('1. Check if the server is running on port 3000');
  console.log('2. Check if all route components are properly imported');
  console.log('3. Check if there are any TypeScript compilation errors');
  console.log('4. Check browser console for JavaScript errors');
  console.log('5. Check if the sidebar click handlers are working');
  
  console.log('\n🔧 Manual Testing Steps:');
  console.log('1. Navigate to http://localhost:3000');
  console.log('2. Click "Launch Super Admin Portal"');
  console.log('3. Test each sidebar menu item one by one');
  console.log('4. Check browser address bar for URL changes');
  console.log('5. Check browser console for any errors');
}

// Run the test
testAllNavigationPaths().catch(console.error);
