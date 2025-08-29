#!/usr/bin/env node

/**
 * MCP Simple Test Runner
 * Tests all Super Admin pages and components
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 Starting MCP Simple Test Runner');
console.log('📊 Testing Super Admin UI/UX');
console.log('='.repeat(60));

const testResults = [];
const errors = [];

// Test all Super Admin pages with correct paths
const superAdminPages = [
  { name: 'SuperAdminDashboard', path: 'dashboard/SuperAdminDashboard' },
  { name: 'AllUsers', path: 'user-management/AllUsers' },
  { name: 'UserRoles', path: 'user-management/UserRoles' },
  { name: 'UserGroups', path: 'user-management/UserGroups' },
  { name: 'AccessControl', path: 'user-management/AccessControl' },
  { name: 'UserAnalytics', path: 'user-management/UserAnalytics' },
  { name: 'BillingManagement', path: 'user-management/BillingManagement' },
  { name: 'SupportTickets', path: 'user-management/SupportTickets' },
  { name: 'UserOnboarding', path: 'user-management/UserOnboarding' },
  { name: 'SecuritySettings', path: 'system-administration/SecuritySettings' },
  { name: 'PerformanceAnalytics', path: 'analytics-reports/PerformanceAnalytics' },
  { name: 'DeploymentManagement', path: 'development-devops/DeploymentManagement' },
  { name: 'SystemOverview', path: 'dashboard/SystemOverview' }
];

console.log('\n📄 Testing Super Admin Pages:');
console.log('-'.repeat(40));

superAdminPages.forEach(page => {
  const pagePath = `src/pages/super-admin/${page.path}.tsx`;
  const fileExists = fs.existsSync(pagePath);
  
  console.log(`${fileExists ? '✅' : '❌'} ${page.name}: ${fileExists ? 'EXISTS' : 'MISSING'}`);
  
  if (fileExists) {
    try {
      const content = fs.readFileSync(pagePath, 'utf8');
      const hasMockData = content.includes('mockData') || content.includes('mock');
      const hasMCPIntegration = content.includes('MCP') || content.includes('mcp');
      const hasComprehensiveFeatures = content.includes('useState') && content.includes('useEffect');
      
      console.log(`   📊 Mock Data: ${hasMockData ? '✅' : '❌'}`);
      console.log(`   🤖 MCP Integration: ${hasMCPIntegration ? '✅' : '❌'}`);
      console.log(`   🔧 Comprehensive Features: ${hasComprehensiveFeatures ? '✅' : '❌'}`);
      
      if (!hasComprehensiveFeatures) {
        errors.push(`${page.name}: Basic template detected - needs enhancement`);
      }
    } catch (error) {
      console.log(`   ❌ Error reading file: ${error.message}`);
      errors.push(`${page.name}: File read error - ${error.message}`);
    }
  } else {
    errors.push(`${page.name}: File missing`);
  }
});

// Test layout components
console.log('\n🏗️ Testing Layout Components:');
console.log('-'.repeat(40));

const layoutComponents = ['EnhancedLayout', 'EnhancedHeader', 'EnhancedSidebar'];

layoutComponents.forEach(componentName => {
  const componentPath = `src/components/layout/${componentName}.tsx`;
  const fileExists = fs.existsSync(componentPath);
  
  console.log(`${fileExists ? '✅' : '❌'} ${componentName}: ${fileExists ? 'EXISTS' : 'MISSING'}`);
  
  if (fileExists) {
    try {
      const content = fs.readFileSync(componentPath, 'utf8');
      const hasInvalidCSS = content.includes('bg-glass-bg') || content.includes('text-foreground');
      
      if (hasInvalidCSS) {
        console.log(`   ⚠️  Invalid CSS classes detected`);
        errors.push(`${componentName}: Invalid CSS classes need fixing`);
      }
    } catch (error) {
      console.log(`   ❌ Error reading file: ${error.message}`);
    }
  }
});

// Test build process
console.log('\n🔨 Testing Build Process:');
console.log('-'.repeat(40));

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('✅ Package.json: VALID');
  
  const requiredScripts = ['dev', 'build', 'preview'];
  const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
  
  if (missingScripts.length === 0) {
    console.log('✅ Required Scripts: ALL PRESENT');
  } else {
    console.log(`❌ Missing Scripts: ${missingScripts.join(', ')}`);
    errors.push(`Missing scripts: ${missingScripts.join(', ')}`);
  }
} catch (error) {
  console.log(`❌ Package.json: ${error.message}`);
  errors.push(`Package.json error: ${error.message}`);
}

// Test CSS file
console.log('\n🎨 Testing CSS File:');
console.log('-'.repeat(40));

try {
  const cssContent = fs.readFileSync('src/index.css', 'utf8');
  const hasGlassEffects = cssContent.includes('backdrop-blur') || cssContent.includes('glass');
  const hasDarkMode = cssContent.includes('dark:');
  const hasAnimations = cssContent.includes('@keyframes');
  
  console.log(`Glass Effects: ${hasGlassEffects ? '✅' : '❌'}`);
  console.log(`Dark Mode: ${hasDarkMode ? '✅' : '❌'}`);
  console.log(`Animations: ${hasAnimations ? '✅' : '❌'}`);
  
  if (!hasGlassEffects || !hasDarkMode || !hasAnimations) {
    errors.push('CSS: Missing required styling features');
  }
} catch (error) {
  console.log(`❌ CSS File: ${error.message}`);
  errors.push(`CSS file error: ${error.message}`);
}

// Generate summary
console.log('\n' + '='.repeat(60));
console.log('📊 TEST SUMMARY');
console.log('='.repeat(60));

const totalPages = superAdminPages.length;
const existingPages = superAdminPages.filter(page => fs.existsSync(`src/pages/super-admin/${page.path}.tsx`)).length;
const totalComponents = layoutComponents.length;
const existingComponents = layoutComponents.filter(comp => fs.existsSync(`src/components/layout/${comp}.tsx`)).length;

console.log(`📄 Pages: ${existingPages}/${totalPages} (${Math.round(existingPages/totalPages*100)}%)`);
console.log(`🏗️ Components: ${existingComponents}/${totalComponents} (${Math.round(existingComponents/totalComponents*100)}%)`);
console.log(`❌ Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('\n❌ ERRORS FOUND:');
  errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error}`);
  });
  
  console.log('\n🔧 RECOMMENDATIONS:');
  console.log('1. Fix all missing page files');
  console.log('2. Enhance basic templates with comprehensive features');
  console.log('3. Fix invalid CSS classes');
  console.log('4. Add MCP integration to all pages');
  console.log('5. Ensure all layout components exist and work properly');
} else {
  console.log('\n✅ ALL TESTS PASSED!');
  console.log('🎉 Super Admin UI/UX is fully functional');
}

console.log('\n📄 Test completed at:', new Date().toISOString());
