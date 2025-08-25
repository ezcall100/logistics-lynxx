import http from 'http';

const BASE_URL = 'http://localhost:3000';

async function testPath(path, description) {
  try {
    const result = await new Promise((resolve) => {
      const req = http.get(`${BASE_URL}${path}`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            path,
            description,
            status: res.statusCode,
            dataLength: data.length,
            hasReact: data.includes('React') || data.includes('react'),
            hasTMS: data.includes('TMS Enterprise Platform'),
            hasSuperAdmin: data.includes('Super Admin Portal'),
            hasErrorPage: data.includes('Route Not Found'),
            hasDashboard: data.includes('System Overview') || data.includes('Dashboard'),
            contentType: res.headers['content-type'] || 'unknown'
          });
        });
      });
      
      req.on('error', (err) => {
        resolve({
          path,
          description,
          status: 0,
          dataLength: 0,
          hasReact: false,
          hasTMS: false,
          hasSuperAdmin: false,
          hasErrorPage: false,
          hasDashboard: false,
          error: err.message
        });
      });
    });
    
    return result;
  } catch (error) {
    return {
      path,
      description,
      status: 0,
      dataLength: 0,
      hasReact: false,
      hasTMS: false,
      hasSuperAdmin: false,
      hasErrorPage: false,
      hasDashboard: false,
      error: error.message
    };
  }
}

async function testAllPaths() {
  console.log('🔍 Testing All Navigation Paths...\n');
  
  const testPaths = [
    { path: '/', description: 'Landing Page' },
    { path: '/super-admin', description: 'Super Admin Redirect' },
    { path: '/super-admin/dashboard', description: 'Dashboard' },
    { path: '/super-admin/users', description: 'All Users' },
    { path: '/super-admin/users/roles', description: 'User Roles' },
    { path: '/super-admin/users/groups', description: 'User Groups' },
    { path: '/super-admin/settings', description: 'Settings' },
    { path: '/super-admin/settings/profile', description: 'Profile Settings' },
    { path: '/super-admin/mcp', description: 'MCP Overview' },
    { path: '/super-admin/mcp/agents', description: 'Agent Management' },
    { path: '/super-admin/system/database', description: 'Database Management' },
    { path: '/super-admin/security/audit', description: 'Security Audit' },
    { path: '/super-admin/analytics/business', description: 'Business Analytics' },
    { path: '/super-admin/business/customers', description: 'Customer Management' },
    { path: '/super-admin/portals', description: 'Portal Overview' },
    { path: '/super-admin/monitoring/performance', description: 'Performance Monitoring' }
  ];

  const results = [];
  
  for (const pathTest of testPaths) {
    console.log(`Testing: ${pathTest.path} (${pathTest.description})`);
    const result = await testPath(pathTest.path, pathTest.description);
    results.push(result);
    
    console.log(`  Status: ${result.status}`);
    console.log(`  Content Length: ${result.dataLength} bytes`);
    console.log(`  Has React: ${result.hasReact}`);
    console.log(`  Has TMS: ${result.hasTMS}`);
    console.log(`  Has Super Admin: ${result.hasSuperAdmin}`);
    console.log(`  Has Error Page: ${result.hasErrorPage}`);
    console.log(`  Has Dashboard: ${result.hasDashboard}`);
    
    if (result.error) {
      console.log(`  Error: ${result.error}`);
    }
    
    console.log('');
  }
  
  // Analysis
  console.log('📊 ANALYSIS RESULTS:\n');
  
  const workingPaths = results.filter(r => r.status === 200 && !r.hasErrorPage);
  const errorPaths = results.filter(r => r.hasErrorPage);
  const failedPaths = results.filter(r => r.status !== 200);
  
  console.log(`✅ Working Paths: ${workingPaths.length}`);
  workingPaths.forEach(r => console.log(`  - ${r.path} (${r.description})`));
  
  console.log(`\n❌ Error Page Paths: ${errorPaths.length}`);
  errorPaths.forEach(r => console.log(`  - ${r.path} (${r.description})`));
  
  console.log(`\n🚫 Failed Paths: ${failedPaths.length}`);
  failedPaths.forEach(r => console.log(`  - ${r.path} (${r.description}) - Status: ${r.status}`));
  
  console.log('\n🎯 RECOMMENDATIONS:');
  
  if (errorPaths.length > 0) {
    console.log('1. Routes with error pages need to be added to SuperAdminRoutes.tsx');
    console.log('2. Check if component imports are correct');
    console.log('3. Verify route path definitions match navigation paths');
  }
  
  if (failedPaths.length > 0) {
    console.log('4. Failed paths indicate server or network issues');
  }
  
  console.log('\n🎉 Test completed!');
}

testAllPaths();
