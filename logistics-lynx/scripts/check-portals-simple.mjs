#!/usr/bin/env node

import http from 'http';

const BASE_URL = 'http://localhost:8085';

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

function checkPortal(path) {
  return new Promise((resolve) => {
    const url = new URL(`${BASE_URL}${path}`);
    
    const req = http.request({
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: 'GET',
      timeout: 5000
    }, (res) => {
      const success = res.statusCode >= 200 && res.statusCode < 400;
      console.log(`${success ? '✅' : '❌'} ${String(res.statusCode).padEnd(3)} ${path}`);
      resolve({ path, status: res.statusCode, success });
    });
    
    req.on('error', (error) => {
      console.log(`❌ ERR ${path} → ${error.message}`);
      resolve({ path, status: 'ERROR', success: false, error: error.message });
    });
    
    req.on('timeout', () => {
      console.log(`❌ TIMEOUT ${path}`);
      req.destroy();
      resolve({ path, status: 'TIMEOUT', success: false });
    });
    
    req.end();
  });
}

async function main() {
  console.log('🔍 Checking all portal routes...\n');
  
  const allPaths = [
    "/", "/login", "/register",
    ...PORTALS.map(p => p.path),
    ...Object.keys(DEPRECATED_ROUTES)
  ];
  
  const results = [];
  
  for (const path of allPaths) {
    const result = await checkPortal(path);
    results.push(result);
  }
  
  console.log('\n📊 Results Summary:');
  console.log('==================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ Failed Routes:');
    failed.forEach(r => {
      console.log(`  ${r.path}: ${r.status}${r.error ? ` (${r.error})` : ''}`);
    });
  }
  
  console.log('\n🎯 Portal Registry Status:');
  console.log('========================');
  PORTALS.forEach(portal => {
    const result = results.find(r => r.path === portal.path);
    const status = result?.success ? '✅' : '❌';
    console.log(`${status} ${portal.title} (${portal.path})`);
  });
  
  console.log(`\n🎉 Portal check completed!`);
  console.log(`Success rate: ${((successful.length / results.length) * 100).toFixed(1)}%`);
  
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch(console.error);
