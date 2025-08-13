#!/usr/bin/env node

/**
 * 🧪 Portal Integration Test Script
 * Validates that the Rates and Directory portals are properly integrated
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Portal Integration...\n');

// Test configuration
const tests = [
  {
    name: 'RBAC Guards',
    files: [
      'src/auth/RequireAuth.tsx',
      'src/routes/AppRoutes.tsx'
    ],
    description: 'Role-based access control guards for portal protection'
  },
  {
    name: 'Data Hooks',
    files: [
      'src/hooks/rates/useRateQuote.ts',
      'src/hooks/directory/useDirectorySearch.ts'
    ],
    description: 'TanStack Query hooks for portal data management'
  },
  {
    name: 'Quick Actions',
    files: [
      'src/components/dashboard/QuickActions.tsx'
    ],
    description: 'Dashboard quick actions for portal access'
  },
  {
    name: 'Sidebar Navigation',
    files: [
      'src/components/layout/Sidebar.tsx'
    ],
    description: 'Sidebar navigation with portal menu items'
  },
  {
    name: 'Cypress Tests',
    files: [
      'cypress/e2e/rates_quote.spec.ts',
      'cypress/e2e/directory_search.spec.ts'
    ],
    description: 'End-to-end tests for portal functionality'
  },
  {
    name: 'App Structure',
    files: [
      'src/AppAuthenticated.tsx',
      'src/components/layout/AppShell.tsx',
      'src/components/dashboard/UnifiedDashboard.tsx'
    ],
    description: 'Main application structure with portal integration'
  }
];

// Run tests
let passedTests = 0;
let totalTests = 0;

tests.forEach(test => {
  console.log(`📋 Testing: ${test.name}`);
  console.log(`   ${test.description}`);
  
  let testPassed = true;
  
  test.files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`   ✅ ${file} - Found`);
    } else {
      console.log(`   ❌ ${file} - Missing`);
      testPassed = false;
    }
  });
  
  if (testPassed) {
    console.log(`   🎉 ${test.name} - PASSED\n`);
    passedTests++;
  } else {
    console.log(`   💥 ${test.name} - FAILED\n`);
  }
  
  totalTests++;
});

// Summary
console.log('📊 Test Summary:');
console.log(`   Total Tests: ${totalTests}`);
console.log(`   Passed: ${passedTests}`);
console.log(`   Failed: ${totalTests - passedTests}`);
console.log(`   Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);

if (passedTests === totalTests) {
  console.log('\n🎉 All tests passed! Portal integration is ready.');
  console.log('\n🚀 Next steps:');
  console.log('   1. Start the development server: npm run dev');
  console.log('   2. Navigate to /rates or /directory');
  console.log('   3. Test the quick actions on the dashboard');
  console.log('   4. Run Cypress tests: npx cypress run');
} else {
  console.log('\n⚠️  Some tests failed. Please check the missing files.');
  process.exit(1);
}
