import http from 'http';

const BASE_URL = 'http://localhost:3000';

// Test a few specific paths that the user mentioned are not working
const testPaths = [
  '/super-admin/users',
  '/super-admin/users/roles',
  '/super-admin/dashboard',
  '/super-admin/settings'
];

async function testNavigationDebug() {
  console.log('🔍 Testing Navigation Debug...\n');
  console.log('📝 This test will help identify if the issue is with:');
  console.log('   1. Route definitions (server-side)');
  console.log('   2. Component imports');
  console.log('   3. JavaScript errors (client-side)');
  console.log('   4. Navigation logic (client-side)\n');
  
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
              headers: res.headers,
              dataLength: data.length
            });
          });
        });
        
        req.on('error', (err) => {
          resolve({
            status: 0,
            url: fullUrl,
            success: false,
            error: err.message,
            headers: {},
            dataLength: 0
          });
        });
        
        req.setTimeout(5000, () => {
          req.destroy();
          resolve({
            status: 0,
            url: fullUrl,
            success: false,
            error: 'Timeout',
            headers: {},
            dataLength: 0
          });
        });
      });
      
      if (result.success) {
        console.log(`  ✅ PASS - ${result.status} (${result.dataLength} bytes)`);
        
        // Check if the response contains React content
        if (result.dataLength > 1000) {
          console.log(`  📄 Response appears to be a full page`);
        } else {
          console.log(`  ⚠️  Response seems small (${result.dataLength} bytes) - might be an error page`);
        }
      } else {
        console.log(`  ❌ FAIL - ${result.error}`);
        if (result.headers.location) {
          console.log(`  🔄 Redirects to: ${result.headers.location}`);
        }
      }
      
    } catch (error) {
      console.log(`  ❌ ERROR - ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n🎉 Navigation Debug Test Completed!');
  console.log('\n🔧 Analysis:');
  console.log('✅ If all tests PASS: Routes are working correctly');
  console.log('❌ If any tests FAIL: There are server-side issues');
  console.log('⚠️  If tests PASS but navigation still doesn\'t work: Client-side JavaScript issue');
  
  console.log('\n🔧 Next Steps:');
  console.log('1. Open browser developer tools (F12)');
  console.log('2. Go to Console tab');
  console.log('3. Navigate to http://localhost:3000');
  console.log('4. Click "Launch Super Admin Portal"');
  console.log('5. Try clicking sidebar menu items');
  console.log('6. Look for any JavaScript errors in the console');
  console.log('7. Check if the URL changes in the address bar');
  
  console.log('\n🔧 Common Issues:');
  console.log('- JavaScript errors preventing navigation');
  console.log('- Missing or incorrect component imports');
  console.log('- TypeScript compilation errors');
  console.log('- React Router configuration issues');
  console.log('- Browser cache issues');
  
  console.log('\n🔧 Debugging Commands:');
  console.log('1. Clear browser cache: Ctrl+Shift+R (or Cmd+Shift+R on Mac)');
  console.log('2. Check for TypeScript errors: npm run build');
  console.log('3. Restart development server: npm run dev');
}

// Run the test
testNavigationDebug().catch(console.error);
