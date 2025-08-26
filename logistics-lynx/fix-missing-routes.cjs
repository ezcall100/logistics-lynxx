#!/usr/bin/env node

// Fix Missing Routes Script
console.log('🔧 Fixing Missing Routes - Comprehensive Check');
console.log('==============================================\n');

const fs = require('fs');

// Sidebar navigation paths from EnhancedSidebar.tsx
const sidebarPaths = [
  // Dashboard
  'dashboard',
  'dashboard/users',
  
  // User Management
  'users',
  'users/roles',
  'users/groups',
  'users/access',
  'users/analytics',
  'users/billing',
  'users/support',
  'users/onboarding',
  
  // System Administration
  'system/database',
  'system/api',
  'system/monitoring',
  'system/deployment',
  'system/config',
  'system/backup',
  'system/integrations',
  'system/storage',
  'system/email',
  
  // Security Center
  'security/audit',
  'security/logs',
  'security/protection',
  'security/api',
  'security/permissions',
  'security/policies',
  'security/incidents',
  'security/compliance',
  
  // System Monitoring
  'monitoring/performance',
  'monitoring/errors',
  'monitoring/logs',
  'monitoring/alerts',
  'monitoring/uptime',
  'monitoring/resources',
  'monitoring/network',
  'monitoring/health',
  
  // Portal Management
  'portals',
  'portals/config',
  'portals/users',
  'portals/features',
  'portals/analytics',
  'portals/billing',
  'portals/support',
  'portals/integrations',
  'portals/backup',
  'portals/security',
  'portals/compliance',
  'portals/deployment',
  
  // Analytics & Reports
  'analytics/business',
  'analytics/users',
  'analytics/performance',
  'analytics/security',
  'analytics/financial',
  'analytics/operational',
  'analytics/custom',
  'analytics/export',
  'analytics/dashboards',
  'analytics/scheduled',
  
  // MCP Control Center
  'mcp',
  'mcp/agents',
  'mcp/models',
  'mcp/pipeline',
  'mcp/learning',
  'mcp/analytics',
  'mcp/automation',
  'mcp/integrations',
  'mcp/monitoring',
  'mcp/compliance',
  'mcp/documentation',
  'mcp/support',
  
  // Business Operations
  'business/customers',
  'business/sales',
  'business/billing',
  'business/support',
  'business/docs',
  'business/marketing',
  'business/partners',
  'business/legal',
  
  // Settings
  'settings',
  'settings/profile',
  'settings/system',
  'settings/preferences',
  'settings/security'
];

// Extract routes from App.tsx
function extractRoutesFromApp() {
  const appPath = 'src/App.tsx';
  
  if (!fs.existsSync(appPath)) {
    console.log('❌ App.tsx not found');
    return [];
  }
  
  const content = fs.readFileSync(appPath, 'utf8');
  const routeMatches = content.match(/path="([^"]+)"/g);
  
  if (!routeMatches) {
    console.log('❌ No routes found in App.tsx');
    return [];
  }
  
  const routes = routeMatches.map(match => {
    const path = match.match(/path="([^"]+)"/)[1];
    return path;
  });
  
  return routes;
}

// Check for missing routes
function checkMissingRoutes() {
  console.log('🔍 Checking for missing routes...\n');
  
  const appRoutes = extractRoutesFromApp();
  const missingRoutes = [];
  const foundRoutes = [];
  
  console.log('📋 Sidebar paths to check:');
  sidebarPaths.forEach(path => {
    if (appRoutes.includes(path)) {
      console.log(`   ✅ ${path}`);
      foundRoutes.push(path);
    } else {
      console.log(`   ❌ ${path} - MISSING`);
      missingRoutes.push(path);
    }
  });
  
  console.log(`\n📊 Route Analysis:`);
  console.log(`   Total sidebar paths: ${sidebarPaths.length}`);
  console.log(`   Found in App.tsx: ${foundRoutes.length}`);
  console.log(`   Missing routes: ${missingRoutes.length}`);
  console.log(`   Success rate: ${((foundRoutes.length / sidebarPaths.length) * 100).toFixed(1)}%\n`);
  
  if (missingRoutes.length > 0) {
    console.log('❌ MISSING ROUTES:');
    console.log('==================');
    missingRoutes.forEach(route => {
      console.log(`   - ${route}`);
    });
    console.log('');
  }
  
  return {
    missing: missingRoutes,
    found: foundRoutes,
    total: sidebarPaths.length
  };
}

// Check if component files exist for missing routes
function checkMissingComponents(missingRoutes) {
  console.log('🔍 Checking if component files exist for missing routes...\n');
  
  const missingComponents = [];
  const existingComponents = [];
  
  missingRoutes.forEach(route => {
    const componentName = route.split('/').pop();
    const capitalizedComponent = componentName.charAt(0).toUpperCase() + componentName.slice(1);
    
    // Check possible component file locations
    const possiblePaths = [
      `src/pages/super-admin/dashboard/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/user-management/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/system-administration/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/security-center/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/system-monitoring/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/portal-management/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/analytics-reports/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/mcp-control-center/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/business-operations/${capitalizedComponent}.tsx`,
      `src/pages/super-admin/settings/${capitalizedComponent}.tsx`
    ];
    
    let found = false;
    for (const filePath of possiblePaths) {
      if (fs.existsSync(filePath)) {
        console.log(`   ✅ ${route} -> ${filePath}`);
        existingComponents.push({ route, component: capitalizedComponent, path: filePath });
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.log(`   ❌ ${route} -> Component not found`);
      missingComponents.push(route);
    }
  });
  
  console.log(`\n📊 Component Analysis:`);
  console.log(`   Missing routes: ${missingRoutes.length}`);
  console.log(`   Components found: ${existingComponents.length}`);
  console.log(`   Components missing: ${missingComponents.length}\n`);
  
  return {
    existing: existingComponents,
    missing: missingComponents
  };
}

// Main function
async function fixMissingRoutes() {
  try {
    console.log('🚀 Starting route analysis...\n');
    
    const routeAnalysis = checkMissingRoutes();
    
    if (routeAnalysis.missing.length === 0) {
      console.log('🎉 ALL ROUTES ARE PRESENT!');
      console.log('==========================');
      console.log('   ✅ All sidebar navigation paths have corresponding routes');
      console.log('   ✅ No missing routes detected');
      console.log('   ✅ Navigation should work correctly\n');
      return;
    }
    
    const componentAnalysis = checkMissingComponents(routeAnalysis.missing);
    
    if (componentAnalysis.existing.length > 0) {
      console.log('🔧 ROUTES TO ADD:');
      console.log('=================');
      componentAnalysis.existing.forEach(item => {
        console.log(`   - Add route: <Route path="${item.route}" element={<${item.component} />} />`);
        console.log(`     Component: ${item.path}`);
      });
      console.log('');
    }
    
    if (componentAnalysis.missing.length > 0) {
      console.log('⚠️  MISSING COMPONENTS:');
      console.log('=======================');
      componentAnalysis.missing.forEach(route => {
        console.log(`   - ${route} (component file needs to be created)`);
      });
      console.log('');
    }
    
    console.log('📋 SUMMARY:');
    console.log('===========');
    console.log(`   Total routes needed: ${routeAnalysis.total}`);
    console.log(`   Routes present: ${routeAnalysis.found.length}`);
    console.log(`   Routes missing: ${routeAnalysis.missing.length}`);
    console.log(`   Components ready: ${componentAnalysis.existing.length}`);
    console.log(`   Components needed: ${componentAnalysis.missing.length}\n`);
    
    // Generate fix report
    const report = {
      timestamp: new Date().toISOString(),
      analysis: routeAnalysis,
      components: componentAnalysis,
      summary: {
        totalRoutes: routeAnalysis.total,
        presentRoutes: routeAnalysis.found.length,
        missingRoutes: routeAnalysis.missing.length,
        readyComponents: componentAnalysis.existing.length,
        missingComponents: componentAnalysis.missing.length
      }
    };
    
    fs.writeFileSync('missing-routes-report.json', JSON.stringify(report, null, 2));
    console.log('📋 Detailed report saved: missing-routes-report.json\n');
    
  } catch (error) {
    console.error('❌ Analysis failed:', error.message);
  }
}

// Run the analysis
fixMissingRoutes();
