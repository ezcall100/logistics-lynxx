#!/usr/bin/env node

// Since we can't import TypeScript directly in Node.js, let's define the paths manually
const PORTALS = [
  { key: "superAdmin", title: "Super Admin", path: "/super-admin" },
  { key: "admin", title: "Admin", path: "/admin" },
  { key: "tmsAdmin", title: "TMS Admin", path: "/tms-admin" },
  { key: "onboarding", title: "Onboarding", path: "/onboarding" },
  { key: "broker", title: "Broker", path: "/broker" },
  { key: "shipper", title: "Shipper", path: "/shipper" },
  { key: "carrier", title: "Carrier", path: "/carrier" },
  { key: "driver", title: "Driver", path: "/driver" },
  { key: "ownerOperator", title: "Owner Operator", path: "/owner-operator" },
  { key: "factoring", title: "Factoring", path: "/factoring" },
  { key: "loadBoard", title: "Load Board", path: "/load-board" },
  { key: "crm", title: "CRM", path: "/crm" },
  { key: "financials", title: "Financials", path: "/financials" },
  { key: "edi", title: "EDI", path: "/edi" },
  { key: "marketplace", title: "Marketplace", path: "/marketplace" },
  { key: "analytics", title: "Analytics", path: "/analytics" },
  { key: "autonomous", title: "Autonomous AI", path: "/autonomous" },
  { key: "workers", title: "Workers", path: "/workers" },
  { key: "rates", title: "Rates", path: "/rates" },
  { key: "directory", title: "Directory", path: "/directory" }
];

const DEPRECATED_ROUTES = {
  "/carrier-admin": "/carrier",
  "/broker-admin": "/broker", 
  "/shipper-admin": "/shipper",
  "/carrier-dispatch": "/load-board"
};

const BASE_URL = 'http://localhost:8085';

// All canonical paths to check
const paths = [
  "/", "/login", "/register",
  ...PORTALS.map(p => p.path),
  ...Object.keys(DEPRECATED_ROUTES)
];

async function checkPortal(path) {
  try {
    // Use http module for Node.js compatibility
    const http = await import('http');
    const url = new URL(`${BASE_URL}${path}`);
    
    return new Promise((resolve) => {
      const req = http.request({
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'User-Agent': 'Portal-Checker/1.0'
        }
      }, (res) => {
        resolve({
          path,
          status: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 400
        });
      });
      
      req.on('error', (error) => {
        resolve({
          path,
          status: 'ERROR',
          error: error.message,
          success: false
        });
      });
      
      req.end();
    });
  } catch (error) {
    return {
      path,
      status: 'ERROR',
      error: error.message,
      success: false
    };
  }
}

async function checkAllPortals() {
  console.log('🔍 Checking all portal routes...\n');
  
  const results = [];
  
  for (const path of paths) {
    process.stdout.write(`Checking ${path}... `);
    const result = await checkPortal(path);
    results.push(result);
    
    if (result.success) {
      console.log(`✅ ${result.status}`);
    } else {
      console.log(`❌ ${result.status}${result.error ? ` (${result.error})` : ''}`);
    }
  }
  
  console.log('\n📊 Results Summary:');
  console.log('==================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const deprecated = results.filter(r => DEPRECATED_ROUTES[r.path]);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  console.log(`⚠️  Deprecated: ${deprecated.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed Routes:');
    failed.forEach(r => {
      console.log(`  ${r.path}: ${r.status}${r.error ? ` (${r.error})` : ''}`);
    });
  }
  
  if (deprecated.length > 0) {
    console.log('\n⚠️  Deprecated Routes:');
    deprecated.forEach(r => {
      const newPath = DEPRECATED_ROUTES[r.path];
      console.log(`  ${r.path} → ${newPath} (${r.status})`);
    });
  }
  
  console.log('\n🎯 Portal Registry Status:');
  console.log('========================');
  PORTALS.forEach(portal => {
    const result = results.find(r => r.path === portal.path);
    const status = result?.success ? '✅' : '❌';
    console.log(`${status} ${portal.title} (${portal.path})`);
  });
  
  return {
    total: results.length,
    successful: successful.length,
    failed: failed.length,
    deprecated: deprecated.length
  };
}

// Run the check
if (import.meta.url === `file://${process.argv[1]}`) {
  checkAllPortals()
    .then(summary => {
      console.log(`\n🎉 Portal check completed!`);
      console.log(`Success rate: ${((summary.successful / summary.total) * 100).toFixed(1)}%`);
      process.exit(summary.failed > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('Error checking portals:', error);
      process.exit(1);
    });
}

export { checkAllPortals };
