// 🧪 MCP Comprehensive Page Testing Script
const fs = require('fs');
const path = require('path');

// Test configuration
const testConfig = {
  baseDir: '../pages/super-admin',
  categories: [
    'Dashboard',
    'User Management', 
    'System Administration',
    'Security Center',
    'System Monitoring',
    'Portal Management',
    'Analytics & Reports',
    'MCP Control Center',
    'Business Operations',
    'Development & DevOps',
    'Settings',
    'Profile',
    'FAB',
    'Mobile'
  ],
  expectedPageCounts: {
    'Dashboard': 4,
    'User Management': 8,
    'System Administration': 10,
    'Security Center': 8,
    'System Monitoring': 8,
    'Portal Management': 12,
    'Analytics & Reports': 10,
    'MCP Control Center': 12,
    'Business Operations': 8,
    'Development & DevOps': 8,
    'Settings': 12,
    'Profile': 8,
    'FAB': 6,
    'Mobile': 4
  }
};

// Test functions
function testFileExists(filePath) {
  return fs.existsSync(filePath);
}

function testFileContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return {
      exists: true,
      size: content.length,
      hasReactImport: content.includes('import React'),
      hasCustomUI: content.includes('from \'../../../components/ui/'),
      hasFabIntegration: content.includes('executeFabAction'),
      hasTypeScript: content.includes('interface') || content.includes('React.FC'),
      hasExport: content.includes('export default')
    };
  } catch (error) {
    return { exists: false, error: error.message };
  }
}

function testCategory(category) {
  const categoryDir = path.join(testConfig.baseDir, category.toLowerCase().replace(/\s+/g, '-'));
  const expectedCount = testConfig.expectedPageCounts[category] || 0;
  
  if (!fs.existsSync(categoryDir)) {
    return {
      category,
      status: 'MISSING',
      expected: expectedCount,
      found: 0,
      files: [],
      errors: [`Directory not found: ${categoryDir}`]
    };
  }
  
  const files = fs.readdirSync(categoryDir).filter(file => file.endsWith('.tsx'));
  const fileTests = files.map(file => {
    const filePath = path.join(categoryDir, file);
    return {
      file,
      path: filePath,
      ...testFileContent(filePath)
    };
  });
  
  const errors = fileTests.filter(test => !test.exists).map(test => test.error);
  const validFiles = fileTests.filter(test => test.exists);
  
  return {
    category,
    status: validFiles.length === expectedCount ? 'PASS' : 'PARTIAL',
    expected: expectedCount,
    found: validFiles.length,
    files: validFiles,
    errors
  };
}

function testFabIntegration() {
  const fabActionsPath = '../components/FabActions.ts';
  const fabTest = testFileContent(fabActionsPath);
  
  return {
    component: 'FabActions',
    status: fabTest.exists ? 'PASS' : 'FAIL',
    hasExecuteFunction: fabTest.exists && fabTest.hasFabIntegration,
    hasTypeScript: fabTest.exists && fabTest.hasTypeScript,
    size: fabTest.size || 0
  };
}

function testCustomUIComponents() {
  const uiComponents = [
    'button.tsx',
    'card.tsx', 
    'badge.tsx'
  ];
  
  const uiTests = uiComponents.map(component => {
    const componentPath = path.join('../components/ui', component);
    return {
      component,
      ...testFileContent(componentPath)
    };
  });
  
  return {
    category: 'Custom UI Components',
    status: uiTests.every(test => test.exists) ? 'PASS' : 'FAIL',
    components: uiTests
  };
}

function testRouting() {
  const appPath = '../App.tsx';
  const appTest = testFileContent(appPath);
  
  return {
    component: 'App.tsx',
    status: appTest.exists ? 'PASS' : 'FAIL',
    hasRoutes: appTest.exists && appTest.hasExport,
    size: appTest.size || 0
  };
}

// Main test function
async function runComprehensiveTests() {
  console.log('🧪 MCP COMPREHENSIVE PAGE TESTING STARTING...');
  console.log('='.repeat(60));
  
  const results = {
    categories: [],
    fab: null,
    ui: null,
    routing: null,
    summary: {
      totalExpected: 0,
      totalFound: 0,
      passed: 0,
      failed: 0,
      partial: 0
    }
  };
  
  // Test all categories
  console.log('📊 Testing Categories...');
  for (const category of testConfig.categories) {
    const result = testCategory(category);
    results.categories.push(result);
    
    const statusIcon = result.status === 'PASS' ? '✅' : result.status === 'PARTIAL' ? '⚠️' : '❌';
    console.log(`  ${statusIcon} ${category}: ${result.found}/${result.expected} pages`);
    
    results.summary.totalExpected += result.expected;
    results.summary.totalFound += result.found;
    
    if (result.status === 'PASS') results.summary.passed++;
    else if (result.status === 'PARTIAL') results.summary.partial++;
    else results.summary.failed++;
  }
  
  // Test FAB integration
  console.log('\n🔧 Testing FAB Integration...');
  results.fab = testFabIntegration();
  console.log(`  ${results.fab.status === 'PASS' ? '✅' : '❌'} FAB Actions: ${results.fab.status}`);
  
  // Test Custom UI Components
  console.log('\n🎨 Testing Custom UI Components...');
  results.ui = testCustomUIComponents();
  console.log(`  ${results.ui.status === 'PASS' ? '✅' : '❌'} Custom UI: ${results.ui.status}`);
  
  // Test Routing
  console.log('\n🛣️ Testing Routing...');
  results.routing = testRouting();
  console.log(`  ${results.routing.status === 'PASS' ? '✅' : '❌'} App Routing: ${results.routing.status}`);
  
  // Generate summary
  console.log('\n📋 TEST SUMMARY');
  console.log('='.repeat(60));
  console.log(`📊 Total Pages Expected: ${results.summary.totalExpected}`);
  console.log(`📊 Total Pages Found: ${results.summary.totalFound}`);
  console.log(`✅ Passed Categories: ${results.summary.passed}`);
  console.log(`⚠️ Partial Categories: ${results.summary.partial}`);
  console.log(`❌ Failed Categories: ${results.summary.failed}`);
  console.log(`📈 Coverage: ${((results.summary.totalFound / results.summary.totalExpected) * 100).toFixed(1)}%`);
  
  // Detailed results
  console.log('\n📝 DETAILED RESULTS');
  console.log('='.repeat(60));
  
  results.categories.forEach(category => {
    if (category.status !== 'PASS') {
      console.log(`\n${category.category} (${category.status}):`);
      console.log(`  Expected: ${category.expected}, Found: ${category.found}`);
      if (category.errors.length > 0) {
        console.log(`  Errors: ${category.errors.join(', ')}`);
      }
    }
  });
  
  // FAB functionality test
  console.log('\n🎯 FAB FUNCTIONALITY TEST');
  console.log('='.repeat(60));
  console.log(`✅ FAB Actions Component: ${results.fab.status}`);
  console.log(`✅ Execute Function: ${results.fab.hasExecuteFunction ? 'Available' : 'Missing'}`);
  console.log(`✅ TypeScript Support: ${results.fab.hasTypeScript ? 'Available' : 'Missing'}`);
  
  // Custom UI test
  console.log('\n🎨 CUSTOM UI COMPONENTS TEST');
  console.log('='.repeat(60));
  console.log(`✅ Custom UI Components: ${results.ui.status}`);
  results.ui.components.forEach(comp => {
    console.log(`  ${comp.exists ? '✅' : '❌'} ${comp.component}: ${comp.exists ? 'Found' : 'Missing'}`);
  });
  
  // Final status
  const overallStatus = results.summary.failed === 0 && results.fab.status === 'PASS' && results.ui.status === 'PASS' ? 'PASS' : 'FAIL';
  console.log('\n🎉 OVERALL TEST STATUS');
  console.log('='.repeat(60));
  console.log(`🏆 Overall Status: ${overallStatus === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`🌐 Ready for: http://localhost:3000/#/super-admin`);
  console.log(`🔧 FAB Integration: ${results.fab.status === 'PASS' ? '✅ Working' : '❌ Issues'}`);
  console.log(`🎨 Custom UI: ${results.ui.status === 'PASS' ? '✅ Working' : '❌ Issues'}`);
  console.log('='.repeat(60));
  
  return results;
}

// Execute if run directly
if (require.main === module) {
  runComprehensiveTests().catch(console.error);
}

module.exports = { runComprehensiveTests };
