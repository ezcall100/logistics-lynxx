#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Portal components to fix
const components = [
  'dashboard/Dashboard.tsx',
  'broker/BrokerPortal.tsx',
  'carrier/CarrierPortal.tsx',
  'driver/DriverPortal.tsx',
  'shipper/ShipperPortal.tsx',
  'admin/AdminPortal.tsx',
  'analytics/AnalyticsPortal.tsx',
  'autonomous/AutonomousPortal.tsx'
];

const componentsDir = path.join(__dirname, 'logistics-lynx', 'src', 'components');

components.forEach(componentPath => {
  const fullPath = path.join(componentsDir, componentPath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix import paths
    content = content.replace(
      /from '\.\/ui\//g,
      "from '../ui/"
    );
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed imports in ${componentPath}`);
  } else {
    console.log(`⚠️ File not found: ${componentPath}`);
  }
});

console.log('\n🎉 All import paths fixed!');
