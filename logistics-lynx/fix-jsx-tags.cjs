#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix JSX closing tag issues
function fixJSXTags(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix JSX closing tag issues
  content = content.replace(/<([A-Z][a-zA-Z]*)\s+className="[^"]*"\s*><\/EnhancedButton>/g, '<$1 className="w-4 h-4" />');
  
  if (content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed JSX tags in ${filePath}`);
    modified = true;
  }
  
  return modified;
}

// Files to fix
const filesToFix = [
  'src/pages/super-admin/settings/SystemSettings.tsx',
  'src/pages/super-admin/user-management/AllUsers.tsx',
  'src/pages/super-admin/user-management/UserGroups.tsx'
];

console.log('🔧 Fixing JSX closing tag issues...\n');

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  fixJSXTags(fullPath);
});

console.log('\n🎉 JSX tag fixes completed!');
