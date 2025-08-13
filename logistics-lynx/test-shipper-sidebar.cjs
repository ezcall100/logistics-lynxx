const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Shipper Admin Sidebar Configuration...\n');

// Check the SHIPPER_ADMIN_MENU configuration
const menuPath = path.join(__dirname, 'src', 'lib', 'menus', 'shipper-admin-menu.ts');
if (fs.existsSync(menuPath)) {
  console.log('✅ SHIPPER_ADMIN_MENU configuration found');
  
  const menuContent = fs.readFileSync(menuPath, 'utf8');
  
  // Extract menu items
  const menuItemsMatch = menuContent.match(/title:\s*"([^"]+)"/g);
  if (menuItemsMatch) {
    const menuItems = menuItemsMatch.map(match => match.match(/"([^"]+)"/)[1]);
    console.log('\n📋 Menu Items in SHIPPER_ADMIN_MENU:');
    menuItems.forEach((item, index) => {
      console.log(`   ${index + 1}. ${item}`);
    });
    
    // Check for duplicates
    const duplicates = menuItems.filter((item, index) => menuItems.indexOf(item) !== index);
    if (duplicates.length > 0) {
      console.log('\n⚠️  Duplicate menu items found:');
      duplicates.forEach(duplicate => {
        console.log(`   - ${duplicate}`);
      });
    } else {
      console.log('\n✅ No duplicate menu items found');
    }
  }
} else {
  console.log('❌ SHIPPER_ADMIN_MENU configuration not found');
}

// Check ShipperSidebar component
const sidebarPath = path.join(__dirname, 'src', 'components', 'shipper', 'ShipperSidebar.tsx');
if (fs.existsSync(sidebarPath)) {
  console.log('\n✅ ShipperSidebar component found');
  
  const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
  
  // Check if it's using SHIPPER_ADMIN_MENU
  if (sidebarContent.includes('SHIPPER_ADMIN_MENU')) {
    console.log('✅ ShipperSidebar is using SHIPPER_ADMIN_MENU');
  } else {
    console.log('❌ ShipperSidebar is not using SHIPPER_ADMIN_MENU');
  }
  
  // Check for any hardcoded menu items
  const hardcodedItems = sidebarContent.match(/title:\s*["']([^"']+)["']/g);
  if (hardcodedItems) {
    console.log('\n⚠️  Potential hardcoded menu items in ShipperSidebar:');
    hardcodedItems.forEach(item => {
      console.log(`   - ${item}`);
    });
  }
} else {
  console.log('\n❌ ShipperSidebar component not found');
}

// Check for other sidebar components that might conflict
const sidebarComponents = [
  'src/components/layout/Sidebar.tsx',
  'src/components/layout/ModernSidebar.tsx',
  'src/components/layout/EnhancedModernSidebar.tsx',
  'src/hooks/auth/useMenuGenerator.ts'
];

console.log('\n🔍 Checking for conflicting sidebar configurations...');

sidebarComponents.forEach(componentPath => {
  const fullPath = path.join(__dirname, componentPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if this component has shipper_admin configuration
    if (content.includes('shipper_admin')) {
      if (content.includes('// shipper_admin: Removed to prevent conflicts')) {
        console.log(`✅ ${componentPath} - shipper_admin configuration properly removed`);
      } else {
        console.log(`⚠️  ${componentPath} - contains shipper_admin configuration (potential conflict)`);
        
        // Show the shipper_admin section
        const lines = content.split('\n');
        let inShipperSection = false;
        lines.forEach((line, index) => {
          if (line.includes('shipper_admin')) {
            inShipperSection = true;
            console.log(`   Line ${index + 1}: ${line.trim()}`);
          } else if (inShipperSection && (line.includes('},') || line.includes(']'))) {
            inShipperSection = false;
            console.log(`   Line ${index + 1}: ${line.trim()}`);
          } else if (inShipperSection) {
            console.log(`   Line ${index + 1}: ${line.trim()}`);
          }
        });
      }
    } else {
      console.log(`✅ ${componentPath} - no shipper_admin configuration`);
    }
  } else {
    console.log(`❌ ${componentPath} - file not found`);
  }
});

console.log('\n📊 Summary:');
console.log('   - SHIPPER_ADMIN_MENU should be the single source of truth for shipper admin navigation');
console.log('   - ShipperSidebar component should use SHIPPER_ADMIN_MENU');
console.log('   - Other sidebar components should not have shipper_admin configurations');
console.log('   - This prevents duplicate navigation items from appearing');

console.log('\n💡 If duplicates are still appearing:');
console.log('   1. Check if multiple sidebar components are being rendered');
console.log('   2. Verify that only ShipperLayout is used for shipper admin pages');
console.log('   3. Ensure no other components are importing conflicting menu configurations');
