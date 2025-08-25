import http from 'http';

const BASE_URL = 'http://localhost:3000';

async function testReactRouter() {
  console.log('🔍 Testing React Router Setup...\n');
  
  try {
    const result = await new Promise((resolve) => {
      const req = http.get(`${BASE_URL}/super-admin/dashboard`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            dataLength: data.length,
            hasReact: data.includes('React') || data.includes('react'),
            hasReactRouter: data.includes('react-router') || data.includes('Router'),
            hasRootDiv: data.includes('id="root"'),
            hasScripts: data.includes('<script'),
            hasMainScript: data.includes('main.tsx') || data.includes('main.js'),
            contentType: res.headers['content-type'] || 'unknown',
            data: data.substring(0, 500) // First 500 chars for debugging
          });
        });
      });
      
      req.on('error', (err) => {
        resolve({
          status: 0,
          dataLength: 0,
          hasReact: false,
          hasReactRouter: false,
          hasRootDiv: false,
          hasScripts: false,
          hasMainScript: false,
          error: err.message
        });
      });
    });
    
    console.log(`Status: ${result.status}`);
    console.log(`Content Length: ${result.dataLength} bytes`);
    console.log(`Content Type: ${result.contentType}`);
    console.log(`Has React: ${result.hasReact}`);
    console.log(`Has React Router: ${result.hasReactRouter}`);
    console.log(`Has Root Div: ${result.hasRootDiv}`);
    console.log(`Has Scripts: ${result.hasScripts}`);
    console.log(`Has Main Script: ${result.hasMainScript}`);
    
    if (result.error) {
      console.log(`Error: ${result.error}`);
    }
    
    console.log('\n📄 First 500 characters of response:');
    console.log(result.data);
    
    console.log('\n🎯 ANALYSIS:');
    if (result.dataLength === 647) {
      console.log('❌ ISSUE: All routes return same 647-byte response');
      console.log('❌ ISSUE: Client-side routing is not working');
      console.log('❌ ISSUE: React Router is not taking over');
    } else {
      console.log('✅ Different response sizes indicate routing might be working');
    }
    
    if (!result.hasMainScript) {
      console.log('❌ ISSUE: Main script not found in HTML');
    }
    
    if (!result.hasRootDiv) {
      console.log('❌ ISSUE: Root div not found in HTML');
    }
    
  } catch (error) {
    console.log(`❌ Test failed: ${error.message}`);
  }
}

testReactRouter();
