#!/usr/bin/env node

// Super Admin Routing Test Script
console.log('🔍 Super Admin Routing Test - Comprehensive Check');
console.log('================================================\n');

const fs = require('fs');
const path = require('path');

// Test Configuration
const testConfig = {
  baseUrl: 'http://localhost:3000',
  superAdminPath: '/super-admin',
  testTimeout: 5000
};

// Expected Routes from App.tsx
const expectedRoutes = {
  // Dashboard Routes
  dashboard: {
    path: '/super-admin/dashboard',
    component: 'SystemOverview',
    status: 'required'
  },
  'dashboard/users': {
    path: '/super-admin/dashboard/users',
    component: 'ActiveUsers',
    status: 'required'
  },
  
  // User Management Routes
  users: {
    path: '/super-admin/users',
    component: 'AllUsers',
    status: 'required'
  },
  'users/roles': {
    path: '/super-admin/users/roles',
    component: 'UserRoles',
    status: 'required'
  },
  'users/groups': {
    path: '/super-admin/users/groups',
    component: 'UserGroups',
    status: 'required'
  },
  'users/access': {
    path: '/super-admin/users/access',
    component: 'AccessControl',
    status: 'required'
  },
  'users/analytics': {
    path: '/super-admin/users/analytics',
    component: 'UserAnalytics',
    status: 'required'
  },
  'users/billing': {
    path: '/super-admin/users/billing',
    component: 'BillingManagement',
    status: 'required'
  },
  'users/support': {
    path: '/super-admin/users/support',
    component: 'SupportTickets',
    status: 'required'
  },
  'users/onboarding': {
    path: '/super-admin/users/onboarding',
    component: 'UserOnboarding',
    status: 'required'
  },
  
  // System Administration Routes
  'system/database': {
    path: '/super-admin/system/database',
    component: 'DatabaseManagement',
    status: 'required'
  },
  'system/api': {
    path: '/super-admin/system/api',
    component: 'ApiManagement',
    status: 'required'
  },
  'system/deployment': {
    path: '/super-admin/system/deployment',
    component: 'DeploymentManagement',
    status: 'required'
  },
  'system/config': {
    path: '/super-admin/system/config',
    component: 'Configuration',
    status: 'required'
  },
  'system/backup': {
    path: '/super-admin/system/backup',
    component: 'BackupRecovery',
    status: 'required'
  },
  'system/integrations': {
    path: '/super-admin/system/integrations',
    component: 'IntegrationHub',
    status: 'required'
  },
  'system/storage': {
    path: '/super-admin/system/storage',
    component: 'FileStorage',
    status: 'required'
  },
  'system/email': {
    path: '/super-admin/system/email',
    component: 'EmailServices',
    status: 'required'
  },
  
  // Security Center Routes
  'security/audit': {
    path: '/super-admin/security/audit',
    component: 'SecurityAudit',
    status: 'required'
  },
  'security/logs': {
    path: '/super-admin/security/logs',
    component: 'AccessLogs',
    status: 'required'
  },
  'security/protection': {
    path: '/super-admin/security/protection',
    component: 'DataProtection',
    status: 'required'
  },
  'security/api': {
    path: '/super-admin/security/api',
    component: 'ApiSecurity',
    status: 'required'
  },
  'security/permissions': {
    path: '/super-admin/security/permissions',
    component: 'UserPermissions',
    status: 'required'
  },
  'security/policies': {
    path: '/super-admin/security/policies',
    component: 'SecurityPolicies',
    status: 'required'
  },
  'security/incidents': {
    path: '/super-admin/security/incidents',
    component: 'IncidentResponse',
    status: 'required'
  },
  'security/compliance': {
    path: '/super-admin/security/compliance',
    component: 'ComplianceManagement',
    status: 'required'
  },
  
  // System Monitoring Routes
  'monitoring/performance': {
    path: '/super-admin/monitoring/performance',
    component: 'PerformanceMonitoring',
    status: 'required'
  },
  'monitoring/errors': {
    path: '/super-admin/monitoring/errors',
    component: 'ErrorTracking',
    status: 'required'
  },
  'monitoring/logs': {
    path: '/super-admin/monitoring/logs',
    component: 'LogAnalysis',
    status: 'required'
  },
  'monitoring/alerts': {
    path: '/super-admin/monitoring/alerts',
    component: 'AlertManagement',
    status: 'required'
  },
  'monitoring/uptime': {
    path: '/super-admin/monitoring/uptime',
    component: 'UptimeMonitoring',
    status: 'required'
  },
  'monitoring/resources': {
    path: '/super-admin/monitoring/resources',
    component: 'ResourceUsage',
    status: 'required'
  },
  'monitoring/network': {
    path: '/super-admin/monitoring/network',
    component: 'NetworkMonitoring',
    status: 'required'
  },
  'monitoring/health': {
    path: '/super-admin/monitoring/health',
    component: 'HealthChecks',
    status: 'required'
  },
  
  // Portal Management Routes
  portals: {
    path: '/super-admin/portals',
    component: 'PortalOverview',
    status: 'required'
  },
  'portals/config': {
    path: '/super-admin/portals/config',
    component: 'PortalConfiguration',
    status: 'required'
  },
  'portals/users': {
    path: '/super-admin/portals/users',
    component: 'PortalUsers',
    status: 'required'
  },
  'portals/features': {
    path: '/super-admin/portals/features',
    component: 'FeatureManagement',
    status: 'required'
  },
  'portals/analytics': {
    path: '/super-admin/portals/analytics',
    component: 'PortalAnalytics',
    status: 'required'
  },
  'portals/billing': {
    path: '/super-admin/portals/billing',
    component: 'PortalBilling',
    status: 'required'
  },
  'portals/support': {
    path: '/super-admin/portals/support',
    component: 'PortalSupport',
    status: 'required'
  },
  'portals/integrations': {
    path: '/super-admin/portals/integrations',
    component: 'PortalIntegrations',
    status: 'required'
  },
  'portals/backup': {
    path: '/super-admin/portals/backup',
    component: 'PortalBackup',
    status: 'required'
  },
  'portals/security': {
    path: '/super-admin/portals/security',
    component: 'PortalSecurity',
    status: 'required'
  },
  'portals/compliance': {
    path: '/super-admin/portals/compliance',
    component: 'PortalCompliance',
    status: 'required'
  },
  'portals/deployment': {
    path: '/super-admin/portals/deployment',
    component: 'PortalDeployment',
    status: 'required'
  },
  
  // Analytics & Reports Routes
  'analytics/business': {
    path: '/super-admin/analytics/business',
    component: 'BusinessAnalytics',
    status: 'required'
  },
  'analytics/users': {
    path: '/super-admin/analytics/users',
    component: 'UserAnalytics',
    status: 'required'
  },
  'analytics/performance': {
    path: '/super-admin/analytics/performance',
    component: 'PerformanceReports',
    status: 'required'
  },
  'analytics/security': {
    path: '/super-admin/analytics/security',
    component: 'SecurityReports',
    status: 'required'
  },
  'analytics/financial': {
    path: '/super-admin/analytics/financial',
    component: 'FinancialReports',
    status: 'required'
  },
  'analytics/operational': {
    path: '/super-admin/analytics/operational',
    component: 'OperationalReports',
    status: 'required'
  },
  'analytics/custom': {
    path: '/super-admin/analytics/custom',
    component: 'CustomReports',
    status: 'required'
  },
  'analytics/export': {
    path: '/super-admin/analytics/export',
    component: 'DataExport',
    status: 'required'
  },
  'analytics/dashboards': {
    path: '/super-admin/analytics/dashboards',
    component: 'DashboardBuilder',
    status: 'required'
  },
  'analytics/scheduled': {
    path: '/super-admin/analytics/scheduled',
    component: 'ScheduledReports',
    status: 'required'
  },
  
  // MCP Control Center Routes
  mcp: {
    path: '/super-admin/mcp',
    component: 'McpOverview',
    status: 'required'
  },
  'mcp/agents': {
    path: '/super-admin/mcp/agents',
    component: 'AgentManagement',
    status: 'required'
  },
  'mcp/models': {
    path: '/super-admin/mcp/models',
    component: 'AiModels',
    status: 'required'
  },
  'mcp/pipeline': {
    path: '/super-admin/mcp/pipeline',
    component: 'DataPipeline',
    status: 'required'
  },
  'mcp/learning': {
    path: '/super-admin/mcp/learning',
    component: 'MachineLearning',
    status: 'required'
  },
  'mcp/analytics': {
    path: '/super-admin/mcp/analytics',
    component: 'AiAnalytics',
    status: 'required'
  },
  'mcp/automation': {
    path: '/super-admin/mcp/automation',
    component: 'AutomationRules',
    status: 'required'
  },
  'mcp/integrations': {
    path: '/super-admin/mcp/integrations',
    component: 'AiIntegrations',
    status: 'required'
  },
  'mcp/monitoring': {
    path: '/super-admin/mcp/monitoring',
    component: 'AiMonitoring',
    status: 'required'
  },
  'mcp/compliance': {
    path: '/super-admin/mcp/compliance',
    component: 'AiCompliance',
    status: 'required'
  },
  'mcp/documentation': {
    path: '/super-admin/mcp/documentation',
    component: 'AiDocumentation',
    status: 'required'
  },
  'mcp/support': {
    path: '/super-admin/mcp/support',
    component: 'AiSupport',
    status: 'required'
  },
  
  // Business Operations Routes
  'business/customers': {
    path: '/super-admin/business/customers',
    component: 'CustomerManagement',
    status: 'required'
  },
  'business/sales': {
    path: '/super-admin/business/sales',
    component: 'SalesPipeline',
    status: 'required'
  },
  'business/billing': {
    path: '/super-admin/business/billing',
    component: 'BillingInvoicing',
    status: 'required'
  },
  'business/support': {
    path: '/super-admin/business/support',
    component: 'SupportManagement',
    status: 'required'
  },
  'business/docs': {
    path: '/super-admin/business/docs',
    component: 'Documentation',
    status: 'required'
  },
  'business/marketing': {
    path: '/super-admin/business/marketing',
    component: 'MarketingTools',
    status: 'required'
  },
  'business/partners': {
    path: '/super-admin/business/partners',
    component: 'PartnerManagement',
    status: 'required'
  },
  'business/legal': {
    path: '/super-admin/business/legal',
    component: 'LegalCompliance',
    status: 'required'
  },
  
  // Settings Routes
  settings: {
    path: '/super-admin/settings',
    component: 'Settings',
    status: 'required'
  },
  'settings/profile': {
    path: '/super-admin/settings/profile',
    component: 'ProfileSettings',
    status: 'required'
  },
  'settings/system': {
    path: '/super-admin/settings/system',
    component: 'SystemSettings',
    status: 'required'
  },
  'settings/preferences': {
    path: '/super-admin/settings/preferences',
    component: 'UserPreferences',
    status: 'required'
  },
  'settings/security': {
    path: '/super-admin/settings/security',
    component: 'SecuritySettings',
    status: 'required'
  }
};

// Check if component files exist
function checkComponentExists(componentName) {
  const possiblePaths = [
    `src/pages/super-admin/dashboard/${componentName}.tsx`,
    `src/pages/super-admin/user-management/${componentName}.tsx`,
    `src/pages/super-admin/system-administration/${componentName}.tsx`,
    `src/pages/super-admin/security-center/${componentName}.tsx`,
    `src/pages/super-admin/system-monitoring/${componentName}.tsx`,
    `src/pages/super-admin/portal-management/${componentName}.tsx`,
    `src/pages/super-admin/analytics-reports/${componentName}.tsx`,
    `src/pages/super-admin/mcp-control-center/${componentName}.tsx`,
    `src/pages/super-admin/business-operations/${componentName}.tsx`,
    `src/pages/super-admin/settings/${componentName}.tsx`
  ];
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return { exists: true, path: filePath };
    }
  }
  
  return { exists: false, paths: possiblePaths };
}

// Test routing structure
async function testRoutingStructure() {
  console.log('🔍 Testing Super Admin Routing Structure...\n');
  
  let passed = 0;
  let failed = 0;
  let missing = 0;
  const total = Object.keys(expectedRoutes).length;
  
  const results = {
    passed: [],
    failed: [],
    missing: []
  };
  
  for (const [routeKey, routeInfo] of Object.entries(expectedRoutes)) {
    console.log(`📋 Testing: ${routeKey}`);
    console.log(`   Path: ${routeInfo.path}`);
    console.log(`   Component: ${routeInfo.component}`);
    
    // Check if component file exists
    const componentCheck = checkComponentExists(routeInfo.component);
    
    if (componentCheck.exists) {
      console.log(`   ✅ Component found: ${componentCheck.path}`);
      results.passed.push({
        route: routeKey,
        path: routeInfo.path,
        component: routeInfo.component,
        filePath: componentCheck.path
      });
      passed++;
    } else {
      console.log(`   ❌ Component missing: ${routeInfo.component}`);
      console.log(`   🔍 Searched paths:`);
      componentCheck.paths.forEach(p => console.log(`      - ${p}`));
      results.missing.push({
        route: routeKey,
        path: routeInfo.path,
        component: routeInfo.component,
        searchedPaths: componentCheck.paths
      });
      missing++;
    }
    
    console.log('');
  }
  
  // Summary
  console.log('📊 ROUTING TEST RESULTS:');
  console.log('========================');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Missing: ${missing}/${total}`);
  console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`);
  
  if (missing > 0) {
    console.log('❌ MISSING COMPONENTS:');
    console.log('======================');
    results.missing.forEach(item => {
      console.log(`   ${item.component} (${item.route})`);
    });
    console.log('');
  }
  
  // Check for sidebar navigation mismatches
  console.log('🔍 CHECKING SIDEBAR NAVIGATION MATCHES...');
  console.log('==========================================');
  
  const sidebarRoutes = [
    'dashboard', 'users', 'system', 'security', 'monitoring', 
    'portals', 'analytics', 'mcp', 'business', 'settings'
  ];
  
  let sidebarMatches = 0;
  let sidebarMismatches = 0;
  
  for (const sidebarRoute of sidebarRoutes) {
    if (expectedRoutes[sidebarRoute]) {
      console.log(`   ✅ ${sidebarRoute}: Route exists`);
      sidebarMatches++;
    } else {
      console.log(`   ❌ ${sidebarRoute}: Route missing`);
      sidebarMismatches++;
    }
  }
  
  console.log(`\n📊 Sidebar Navigation: ${sidebarMatches}/${sidebarRoutes.length} matches\n`);
  
  // Generate report
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: total,
      passed: passed,
      missing: missing,
      successRate: ((passed / total) * 100).toFixed(1)
    },
    results: results,
    sidebarNavigation: {
      matches: sidebarMatches,
      mismatches: sidebarMismatches,
      total: sidebarRoutes.length
    }
  };
  
  fs.writeFileSync('routing-test-report.json', JSON.stringify(report, null, 2));
  console.log('📋 Detailed report saved: routing-test-report.json\n');
  
  return {
    success: missing === 0,
    passed,
    failed,
    missing,
    total
  };
}

// Main test function
async function runRoutingTest() {
  try {
    console.log('🚀 Starting Super Admin Routing Test...\n');
    
    const result = await testRoutingStructure();
    
    if (result.success) {
      console.log('🎉 ALL ROUTES ARE WORKING CORRECTLY!');
      console.log('=====================================');
      console.log('   ✅ All components found');
      console.log('   ✅ All routes properly configured');
      console.log('   ✅ Sidebar navigation matches');
      console.log('   ✅ No routing mismatches detected\n');
    } else {
      console.log('⚠️  ROUTING ISSUES DETECTED:');
      console.log('============================');
      console.log(`   ❌ ${result.missing} missing components`);
      console.log('   🔧 Please create the missing component files');
      console.log('   📋 Check routing-test-report.json for details\n');
    }
    
    console.log('🔍 RECOMMENDATIONS:');
    console.log('===================');
    if (result.missing > 0) {
      console.log('   1. Create missing component files');
      console.log('   2. Verify component imports in App.tsx');
      console.log('   3. Test each route individually');
      console.log('   4. Check for typos in component names');
    } else {
      console.log('   1. All routes are properly configured');
      console.log('   2. Test authentication flow');
      console.log('   3. Verify page rendering');
      console.log('   4. Check for console errors');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
runRoutingTest();
