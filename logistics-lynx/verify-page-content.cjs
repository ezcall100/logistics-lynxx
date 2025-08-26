#!/usr/bin/env node

// Verify Page Content Script
console.log('🔍 Verifying Page Content - Ensuring Pages Load Correctly');
console.log('========================================================\n');

const fs = require('fs');

// Test specific pages that were having issues
const testPages = [
  {
    name: 'Server Monitoring',
    path: 'system/monitoring',
    component: 'ServerMonitoring',
    expectedContent: ['Server Monitoring', 'System Status', 'Performance Metrics']
  },
  {
    name: 'Database Management',
    path: 'system/database',
    component: 'DatabaseManagement',
    expectedContent: ['Database Management', 'Tables', 'Queries']
  },
  {
    name: 'API Management',
    path: 'system/api',
    component: 'ApiManagement',
    expectedContent: ['API Management', 'Endpoints', 'Authentication']
  },
  {
    name: 'Security Audit',
    path: 'security/audit',
    component: 'SecurityAudit',
    expectedContent: ['Security Audit', 'Compliance', 'Risk Assessment']
  },
  {
    name: 'Performance Monitoring',
    path: 'monitoring/performance',
    component: 'PerformanceMonitoring',
    expectedContent: ['Performance Monitoring', 'Metrics', 'Alerts']
  },
  {
    name: 'MCP Overview',
    path: 'mcp',
    component: 'McpOverview',
    expectedContent: ['MCP Overview', 'Agent Status', 'AI Models']
  },
  {
    name: 'User Management',
    path: 'users',
    component: 'AllUsers',
    expectedContent: ['User Management', 'Users', 'Roles']
  }
];

// Check if component files exist and have proper content
function checkComponentContent() {
  console.log('🔍 Checking component files and content...\n');
  
  const results = {
    passed: [],
    failed: [],
    missing: []
  };
  
  testPages.forEach(page => {
    console.log(`📋 Testing: ${page.name}`);
    console.log(`   Path: ${page.path}`);
    console.log(`   Component: ${page.component}`);
    
    // Check if component file exists
    const possiblePaths = [
      `src/pages/super-admin/dashboard/${page.component}.tsx`,
      `src/pages/super-admin/user-management/${page.component}.tsx`,
      `src/pages/super-admin/system-administration/${page.component}.tsx`,
      `src/pages/super-admin/security-center/${page.component}.tsx`,
      `src/pages/super-admin/system-monitoring/${page.component}.tsx`,
      `src/pages/super-admin/portal-management/${page.component}.tsx`,
      `src/pages/super-admin/analytics-reports/${page.component}.tsx`,
      `src/pages/super-admin/mcp-control-center/${page.component}.tsx`,
      `src/pages/super-admin/business-operations/${page.component}.tsx`,
      `src/pages/super-admin/settings/${page.component}.tsx`
    ];
    
    let componentFound = false;
    let componentPath = '';
    
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        componentFound = true;
        componentPath = filePath;
        break;
      }
    }
    
    if (!componentFound) {
      console.log(`   ❌ Component file not found`);
      results.missing.push({
        name: page.name,
        path: page.path,
        component: page.component
      });
      console.log('');
      return;
    }
    
    console.log(`   ✅ Component found: ${componentPath}`);
    
    // Check component content
    try {
      const content = fs.readFileSync(componentPath, 'utf8');
      
      // Check if component has proper React structure
      if (!content.includes('export default') && !content.includes('export const')) {
        console.log(`   ❌ Component missing proper export`);
        results.failed.push({
          name: page.name,
          path: page.path,
          component: page.component,
          issue: 'Missing proper export'
        });
        console.log('');
        return;
      }
      
      // Check if component has expected content
      const hasExpectedContent = page.expectedContent.some(expected => 
        content.includes(expected)
      );
      
      if (hasExpectedContent) {
        console.log(`   ✅ Component has expected content`);
        results.passed.push({
          name: page.name,
          path: page.path,
          component: page.component,
          filePath: componentPath
        });
      } else {
        console.log(`   ⚠️  Component may be showing generic content`);
        results.failed.push({
          name: page.name,
          path: page.path,
          component: page.component,
          issue: 'May be showing generic content instead of specific content'
        });
      }
      
    } catch (error) {
      console.log(`   ❌ Error reading component: ${error.message}`);
      results.failed.push({
        name: page.name,
        path: page.path,
        component: page.component,
        issue: `Error reading file: ${error.message}`
      });
    }
    
    console.log('');
  });
  
  return results;
}

// Check route configuration
function checkRouteConfiguration() {
  console.log('🔍 Checking route configuration...\n');
  
  const appPath = 'src/App.tsx';
  
  if (!fs.existsSync(appPath)) {
    console.log('❌ App.tsx not found');
    return false;
  }
  
  const content = fs.readFileSync(appPath, 'utf8');
  
  // Check if all test pages have routes
  let allRoutesPresent = true;
  
  testPages.forEach(page => {
    const routePattern = `path="${page.path}"`;
    if (content.includes(routePattern)) {
      console.log(`   ✅ Route found: ${page.path}`);
    } else {
      console.log(`   ❌ Route missing: ${page.path}`);
      allRoutesPresent = false;
    }
  });
  
  console.log('');
  return allRoutesPresent;
}

// Check for common issues that cause pages to show dashboard
function checkCommonIssues() {
  console.log('🔍 Checking for common issues...\n');
  
  const issues = [];
  
  // Check if catch-all route is too broad
  const appPath = 'src/App.tsx';
  if (fs.existsSync(appPath)) {
    const content = fs.readFileSync(appPath, 'utf8');
    
    if (content.includes('path="*"') && content.includes('SystemOverview')) {
      console.log('   ⚠️  Catch-all route found - may cause pages to show dashboard');
      issues.push('Catch-all route may be interfering with specific routes');
    }
  }
  
  // Check SuperAdmin component for proper Outlet rendering
  const superAdminPath = 'src/components/SuperAdmin.tsx';
  if (fs.existsSync(superAdminPath)) {
    const content = fs.readFileSync(superAdminPath, 'utf8');
    
    if (!content.includes('<Outlet />')) {
      console.log('   ❌ SuperAdmin missing Outlet component');
      issues.push('SuperAdmin component missing Outlet - pages won\'t render');
    }
  }
  
  // Check EnhancedLayout for proper children rendering
  const layoutPath = 'src/components/layout/EnhancedLayout.tsx';
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf8');
    
    if (!content.includes('{children}')) {
      console.log('   ❌ EnhancedLayout missing children rendering');
      issues.push('EnhancedLayout not rendering children - pages won\'t show');
    }
  }
  
  if (issues.length === 0) {
    console.log('   ✅ No common issues detected');
  }
  
  console.log('');
  return issues;
}

// Main verification function
async function verifyPageContent() {
  try {
    console.log('🚀 Starting page content verification...\n');
    
    const componentResults = checkComponentContent();
    const routesOk = checkRouteConfiguration();
    const commonIssues = checkCommonIssues();
    
    // Summary
    console.log('📊 VERIFICATION RESULTS:');
    console.log('========================');
    console.log(`✅ Components passed: ${componentResults.passed.length}/${testPages.length}`);
    console.log(`❌ Components failed: ${componentResults.failed.length}/${testPages.length}`);
    console.log(`❌ Components missing: ${componentResults.missing.length}/${testPages.length}`);
    console.log(`✅ Routes configured: ${routesOk ? 'Yes' : 'No'}`);
    console.log(`⚠️  Common issues: ${commonIssues.length}\n`);
    
    if (componentResults.failed.length > 0) {
      console.log('❌ FAILED COMPONENTS:');
      console.log('=====================');
      componentResults.failed.forEach(item => {
        console.log(`   - ${item.name} (${item.issue})`);
      });
      console.log('');
    }
    
    if (componentResults.missing.length > 0) {
      console.log('❌ MISSING COMPONENTS:');
      console.log('======================');
      componentResults.missing.forEach(item => {
        console.log(`   - ${item.name} (${item.component}.tsx)`);
      });
      console.log('');
    }
    
    if (commonIssues.length > 0) {
      console.log('⚠️  COMMON ISSUES:');
      console.log('==================');
      commonIssues.forEach(issue => {
        console.log(`   - ${issue}`);
      });
      console.log('');
    }
    
    // Recommendations
    console.log('🔍 RECOMMENDATIONS:');
    console.log('===================');
    
    if (componentResults.passed.length === testPages.length && routesOk && commonIssues.length === 0) {
      console.log('   ✅ All pages should be working correctly');
      console.log('   ✅ Each page should show its specific content');
      console.log('   ✅ No dashboard fallback should occur');
      console.log('');
      console.log('   🧪 MANUAL TESTING STEPS:');
      console.log('   ========================');
      console.log('   1. Login as Super Admin');
      console.log('   2. Navigate to each section');
      console.log('   3. Verify each page shows unique content');
      console.log('   4. Check that no pages show dashboard content');
      console.log('');
    } else {
      console.log('   🔧 Issues detected - manual review needed');
      console.log('   🔧 Check component implementations');
      console.log('   🔧 Verify route configurations');
      console.log('   🔧 Test each page individually');
      console.log('');
    }
    
    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      testPages: testPages.length,
      results: componentResults,
      routesConfigured: routesOk,
      commonIssues,
      summary: {
        passed: componentResults.passed.length,
        failed: componentResults.failed.length,
        missing: componentResults.missing.length,
        total: testPages.length
      }
    };
    
    fs.writeFileSync('page-content-verification.json', JSON.stringify(report, null, 2));
    console.log('📋 Detailed report saved: page-content-verification.json\n');
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

// Run verification
verifyPageContent();
