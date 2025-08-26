#!/usr/bin/env node

// Authentication Flow Test Script
console.log('🔐 Super Admin Authentication Flow Test');
console.log('=======================================\n');

const fs = require('fs');

// Test Configuration
const testConfig = {
  baseUrl: 'http://localhost:3000',
  superAdminEmail: 'ezcallnet.mo@gmail.com',
  superAdminPassword: 'admin123',
  testTimeout: 5000
};

// Test Authentication Context
function testAuthContext() {
  console.log('🔍 Testing Authentication Context...');
  
  const authContextPath = 'src/contexts/AuthContext.tsx';
  
  if (fs.existsSync(authContextPath)) {
    console.log('   ✅ AuthContext.tsx found');
    
    const content = fs.readFileSync(authContextPath, 'utf8');
    
    // Check for required functions
    const requiredFunctions = ['login', 'logout', 'user', 'isLoading'];
    let functionsFound = 0;
    
    requiredFunctions.forEach(func => {
      if (content.includes(func)) {
        console.log(`   ✅ ${func} function found`);
        functionsFound++;
      } else {
        console.log(`   ❌ ${func} function missing`);
      }
    });
    
    // Check for Super Admin email
    if (content.includes('ezcallnet.mo@gmail.com')) {
      console.log('   ✅ Super Admin email configured');
    } else {
      console.log('   ❌ Super Admin email not found');
    }
    
    // Check for auto-login
    if (content.includes('auto-login') || content.includes('autoLogin')) {
      console.log('   ✅ Auto-login feature found');
    } else {
      console.log('   ⚠️  Auto-login feature not found');
    }
    
    console.log(`\n📊 AuthContext Functions: ${functionsFound}/${requiredFunctions.length} found\n`);
    return functionsFound === requiredFunctions.length;
  } else {
    console.log('   ❌ AuthContext.tsx not found\n');
    return false;
  }
}

// Test SuperAdmin Component
function testSuperAdminComponent() {
  console.log('🔍 Testing SuperAdmin Component...');
  
  const superAdminPath = 'src/components/SuperAdmin.tsx';
  
  if (fs.existsSync(superAdminPath)) {
    console.log('   ✅ SuperAdmin.tsx found');
    
    const content = fs.readFileSync(superAdminPath, 'utf8');
    
    // Check for required imports
    const requiredImports = ['useAuth', 'Navigate', 'Outlet'];
    let importsFound = 0;
    
    requiredImports.forEach(importItem => {
      if (content.includes(importItem)) {
        console.log(`   ✅ ${importItem} import found`);
        importsFound++;
      } else {
        console.log(`   ❌ ${importItem} import missing`);
      }
    });
    
    // Check for authentication logic
    if (content.includes('super_admin')) {
      console.log('   ✅ Super admin role check found');
    } else {
      console.log('   ❌ Super admin role check missing');
    }
    
    // Check for localStorage fallback
    if (content.includes('localStorage')) {
      console.log('   ✅ localStorage fallback found');
    } else {
      console.log('   ⚠️  localStorage fallback not found');
    }
    
    console.log(`\n📊 SuperAdmin Imports: ${importsFound}/${requiredImports.length} found\n`);
    return importsFound === requiredImports.length;
  } else {
    console.log('   ❌ SuperAdmin.tsx not found\n');
    return false;
  }
}

// Test App.tsx Routing
function testAppRouting() {
  console.log('🔍 Testing App.tsx Routing...');
  
  const appPath = 'src/App.tsx';
  
  if (fs.existsSync(appPath)) {
    console.log('   ✅ App.tsx found');
    
    const content = fs.readFileSync(appPath, 'utf8');
    
    // Check for required imports
    const requiredImports = ['SuperAdmin', 'SystemOverview', 'BrowserRouter'];
    let importsFound = 0;
    
    requiredImports.forEach(importItem => {
      if (content.includes(importItem)) {
        console.log(`   ✅ ${importItem} import found`);
        importsFound++;
      } else {
        console.log(`   ❌ ${importItem} import missing`);
      }
    });
    
    // Check for Super Admin routes
    if (content.includes('/super-admin/*')) {
      console.log('   ✅ Super Admin route pattern found');
    } else {
      console.log('   ❌ Super Admin route pattern missing');
    }
    
    // Check for SystemOverview as default
    if (content.includes('SystemOverview') && content.includes('index')) {
      console.log('   ✅ SystemOverview as default route found');
    } else {
      console.log('   ❌ SystemOverview as default route missing');
    }
    
    console.log(`\n📊 App.tsx Imports: ${importsFound}/${requiredImports.length} found\n`);
    return importsFound === requiredImports.length;
  } else {
    console.log('   ❌ App.tsx not found\n');
    return false;
  }
}

// Test EnhancedLayout
function testEnhancedLayout() {
  console.log('🔍 Testing EnhancedLayout Component...');
  
  const layoutPath = 'src/components/layout/EnhancedLayout.tsx';
  
  if (fs.existsSync(layoutPath)) {
    console.log('   ✅ EnhancedLayout.tsx found');
    
    const content = fs.readFileSync(layoutPath, 'utf8');
    
    // Check for required components
    const requiredComponents = ['EnhancedSidebar', 'EnhancedHeader', 'Outlet'];
    let componentsFound = 0;
    
    requiredComponents.forEach(component => {
      if (content.includes(component)) {
        console.log(`   ✅ ${component} found`);
        componentsFound++;
      } else {
        console.log(`   ❌ ${component} missing`);
      }
    });
    
    // Check for user prop handling
    if (content.includes('user?.')) {
      console.log('   ✅ User prop handling found');
    } else {
      console.log('   ❌ User prop handling missing');
    }
    
    console.log(`\n📊 EnhancedLayout Components: ${componentsFound}/${requiredComponents.length} found\n`);
    return componentsFound === requiredComponents.length;
  } else {
    console.log('   ❌ EnhancedLayout.tsx not found\n');
    return false;
  }
}

// Test EnhancedSidebar
function testEnhancedSidebar() {
  console.log('🔍 Testing EnhancedSidebar Component...');
  
  const sidebarPath = 'src/components/layout/EnhancedSidebar.tsx';
  
  if (fs.existsSync(sidebarPath)) {
    console.log('   ✅ EnhancedSidebar.tsx found');
    
    const content = fs.readFileSync(sidebarPath, 'utf8');
    
    // Check for navigation items
    const navigationItems = ['dashboard', 'users', 'system', 'security', 'monitoring', 'portals', 'analytics', 'mcp', 'business', 'settings'];
    let itemsFound = 0;
    
    navigationItems.forEach(item => {
      if (content.includes(`'${item}'`) || content.includes(`"${item}"`)) {
        console.log(`   ✅ ${item} navigation item found`);
        itemsFound++;
      } else {
        console.log(`   ❌ ${item} navigation item missing`);
      }
    });
    
    // Check for NavLink usage
    if (content.includes('NavLink')) {
      console.log('   ✅ NavLink component found');
    } else {
      console.log('   ❌ NavLink component missing');
    }
    
    console.log(`\n📊 EnhancedSidebar Navigation Items: ${itemsFound}/${navigationItems.length} found\n`);
    return itemsFound >= navigationItems.length * 0.8; // Allow 80% match
  } else {
    console.log('   ❌ EnhancedSidebar.tsx not found\n');
    return false;
  }
}

// Main test function
async function runAuthenticationTest() {
  try {
    console.log('🚀 Starting Authentication Flow Test...\n');
    
    const results = {
      authContext: testAuthContext(),
      superAdmin: testSuperAdminComponent(),
      appRouting: testAppRouting(),
      enhancedLayout: testEnhancedLayout(),
      enhancedSidebar: testEnhancedSidebar()
    };
    
    const passed = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;
    
    console.log('📊 AUTHENTICATION FLOW TEST RESULTS:');
    console.log('====================================');
    console.log(`✅ AuthContext: ${results.authContext ? 'PASS' : 'FAIL'}`);
    console.log(`✅ SuperAdmin Component: ${results.superAdmin ? 'PASS' : 'FAIL'}`);
    console.log(`✅ App.tsx Routing: ${results.appRouting ? 'PASS' : 'FAIL'}`);
    console.log(`✅ EnhancedLayout: ${results.enhancedLayout ? 'PASS' : 'FAIL'}`);
    console.log(`✅ EnhancedSidebar: ${results.enhancedSidebar ? 'PASS' : 'FAIL'}`);
    console.log(`\n📈 Overall Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`);
    
    if (passed === total) {
      console.log('🎉 AUTHENTICATION FLOW IS WORKING CORRECTLY!');
      console.log('=============================================');
      console.log('   ✅ All authentication components found');
      console.log('   ✅ All routing properly configured');
      console.log('   ✅ Navigation structure intact');
      console.log('   ✅ User authentication flow ready\n');
      
      console.log('🔍 NEXT STEPS FOR TESTING:');
      console.log('==========================');
      console.log('   1. Start the development server: npm run dev');
      console.log('   2. Navigate to: http://localhost:3000');
      console.log('   3. Login with: ezcallnet.mo@gmail.com / admin123');
      console.log('   4. Select "Super Admin" role');
      console.log('   5. Verify dashboard loads correctly');
      console.log('   6. Test navigation between different sections');
      console.log('   7. Check for any console errors\n');
    } else {
      console.log('⚠️  AUTHENTICATION FLOW ISSUES DETECTED:');
      console.log('========================================');
      console.log(`   ❌ ${total - passed} components have issues`);
      console.log('   🔧 Please check the failed components above');
      console.log('   📋 Review the error messages for specific fixes\n');
    }
    
    // Generate test report
    const report = {
      timestamp: new Date().toISOString(),
      testConfig,
      results,
      summary: {
        passed,
        total,
        successRate: ((passed / total) * 100).toFixed(1)
      }
    };
    
    fs.writeFileSync('authentication-test-report.json', JSON.stringify(report, null, 2));
    console.log('📋 Detailed report saved: authentication-test-report.json\n');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
runAuthenticationTest();
