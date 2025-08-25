import http from 'http';

const BASE_URL = 'http://localhost:3000';

async function simpleTest() {
  console.log('🔍 Simple Application Test...\n');
  
  try {
    const result = await new Promise((resolve) => {
      const req = http.get(`${BASE_URL}/`, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            dataLength: data.length,
            contentType: res.headers['content-type'] || 'unknown',
            hasReact: data.includes('React') || data.includes('react'),
            hasTMS: data.includes('TMS Enterprise Platform'),
            hasSuperAdmin: data.includes('Super Admin Portal')
          });
        });
      });
      
      req.on('error', (err) => {
        resolve({
          status: 0,
          dataLength: 0,
          contentType: 'unknown',
          hasReact: false,
          hasTMS: false,
          hasSuperAdmin: false,
          error: err.message
        });
      });
    });
    
    console.log(`Status: ${result.status}`);
    console.log(`Content Length: ${result.dataLength} bytes`);
    console.log(`Content Type: ${result.contentType}`);
    console.log(`Has React: ${result.hasReact}`);
    console.log(`Has TMS: ${result.hasTMS}`);
    console.log(`Has Super Admin: ${result.hasSuperAdmin}`);
    
    if (result.error) {
      console.log(`Error: ${result.error}`);
    }
    
    console.log('\n🎉 Test completed!');
    console.log('\n📝 Analysis:');
    if (result.status === 200 && result.dataLength > 1000) {
      console.log('✅ Application appears to be working correctly');
    } else if (result.status === 200 && result.dataLength < 1000) {
      console.log('⚠️  Application is responding but with small content');
    } else {
      console.log('❌ Application is not responding correctly');
    }
    
  } catch (error) {
    console.log(`❌ Test failed: ${error.message}`);
  }
}

simpleTest();
