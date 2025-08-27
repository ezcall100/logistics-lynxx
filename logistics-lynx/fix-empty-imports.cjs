const fs = require('fs');
const path = require('path');

console.log('🚀 FIXING EMPTY IMPORT STATEMENTS');

// Function to fix empty imports
function fixEmptyImports(content) {
  let modified = false;
  
  // Fix empty imports like "import { , Settings, ... }"
  const emptyImportRegex = /import\s*{\s*,\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"];?/g;
  if (emptyImportRegex.test(content)) {
    content = content.replace(emptyImportRegex, (match, imports) => {
      const cleanImports = imports.split(',').map(i => i.trim()).filter(i => i.length > 0).join(', ');
      return `import { ${cleanImports} } from 'lucide-react';`;
    });
    modified = true;
  }
  
  return { content, modified };
}

// Main function to process files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    const result = fixEmptyImports(content);
    content = result.content;
    if (result.modified) {
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Process the specific files with errors
const filesToFix = [
  'src/hooks/auth/useMenuGenerator.ts',
  'src/lib/menus/agents-menu.ts',
  'src/lib/menus/broker-admin-menu.ts',
  'src/lib/menus/carrier-admin-menu.ts',
  'src/lib/menus/driver-menu.ts',
  'src/lib/menus/drivers-menu.ts',
  'src/lib/menus/employee-menu.ts',
  'src/lib/menus/executive-menu.ts',
  'src/lib/menus/owner-operator-menu.ts',
  'src/lib/menus/shipper-admin-menu.ts',
  'src/lib/menus/super-admin-menu.ts',
  'src/lib/menus/ui-constants.ts'
];

let totalFixed = 0;
for (const file of filesToFix) {
  if (processFile(file)) {
    totalFixed++;
  }
}

console.log(`\n🎉 EMPTY IMPORT FIX COMPLETE!`);
console.log(`📊 Total files fixed: ${totalFixed}`);

