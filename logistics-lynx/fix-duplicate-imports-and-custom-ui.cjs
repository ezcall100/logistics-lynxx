const fs = require('fs');
const path = require('path');

console.log('🚀 FIXING DUPLICATE IMPORTS AND CUSTOM UI COMPONENT ISSUES');

// Function to fix duplicate imports
function fixDuplicateImports(content) {
  let modified = false;
  
  // Remove duplicate ResponsiveCard and EnhancedButton imports
  const lines = content.split('\n');
  const seenImports = new Set();
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for ResponsiveCard/EnhancedButton imports
    if (line.includes('import { ResponsiveCard, EnhancedButton }')) {
      const importKey = 'ResponsiveCard-EnhancedButton';
      if (seenImports.has(importKey)) {
        console.log(`  Removing duplicate import: ${line.trim()}`);
        modified = true;
        continue;
      } else {
        seenImports.add(importKey);
      }
    }
    
    newLines.push(line);
  }
  
  return { content: newLines.join('\n'), modified };
}

// Function to fix custom UI component imports
function fixCustomUIComponentImports(content) {
  let modified = false;
  
  // Replace incorrect imports with correct custom UI component imports
  if (content.includes('import { ResponsiveCard, EnhancedButton } from \'@/components/ui/EnhancedUIComponents\';')) {
    content = content.replace(
      'import { ResponsiveCard, EnhancedButton } from \'@/components/ui/EnhancedUIComponents\';',
      'import ResponsiveCard from \'@/components/ui/ResponsiveCard\';\nimport EnhancedButton from \'@/components/ui/EnhancedButton\';'
    );
    modified = true;
  }
  
  // Also fix the relative path imports
  if (content.includes('import { ResponsiveCard, EnhancedButton } from \'../../../components/ui\';')) {
    content = content.replace(
      'import { ResponsiveCard, EnhancedButton } from \'../../../components/ui\';',
      'import ResponsiveCard from \'../../../components/ui/ResponsiveCard\';\nimport EnhancedButton from \'../../../components/ui/EnhancedButton\';'
    );
    modified = true;
  }
  
  return { content, modified };
}

// Function to remove unused icon imports
function removeUnusedIconImports(content) {
  let modified = false;
  
  // Remove unused icons
  const unusedIcons = ['Settings', 'Shield', 'Database', 'Network', 'Code', 'Users', 'Server'];
  
  for (const icon of unusedIcons) {
    const importRegex = new RegExp(`import\\s*{[^}]*\\b${icon}\\b[^}]*}\\s*from\\s*['"]lucide-react['"];?`, 'g');
    if (importRegex.test(content) && !content.includes(`<${icon}`) && !content.includes(`icon: ${icon}`)) {
      content = content.replace(importRegex, (match) => {
        const icons = match.match(/{([^}]+)}/)[1].split(',').map(i => i.trim()).filter(i => i !== icon);
        if (icons.length > 0) {
          return `import { ${icons.join(', ')} } from 'lucide-react';`;
        } else {
          return '';
        }
      });
      modified = true;
    }
  }
  
  return { content, modified };
}

// Function to fix duplicate state variables
function fixDuplicateStateVariables(content) {
  let modified = false;
  const lines = content.split('\n');
  const seenVariables = new Set();
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const stateMatch = line.match(/const\s+\[([^,]+),\s*set\w+\]\s*=\s*useState\(/);
    if (stateMatch) {
      const varName = stateMatch[1].trim();
      if (seenVariables.has(varName)) {
        console.log(`  Removing duplicate state: ${varName}`);
        modified = true;
        continue;
      } else {
        seenVariables.add(varName);
      }
    }
    newLines.push(line);
  }
  
  return { content: newLines.join('\n'), modified };
}

// Main function to process files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply all fixes
    const fixes = [
      fixDuplicateImports,
      fixCustomUIComponentImports,
      removeUnusedIconImports,
      fixDuplicateStateVariables
    ];
    
    for (const fix of fixes) {
      const result = fix(content);
      content = result.content;
      if (result.modified) {
        modified = true;
      }
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

// Process all TypeScript files
function processDirectory(dirPath) {
  let totalFixed = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        totalFixed += processDirectory(fullPath);
      } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
        if (processFile(fullPath)) {
          totalFixed++;
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
  }
  
  return totalFixed;
}

// Start processing
console.log('🔍 Scanning for TypeScript files...');
const totalFixed = processDirectory('./src');
console.log(`\n🎉 DUPLICATE IMPORTS AND CUSTOM UI FIX COMPLETE!`);
console.log(`📊 Total files fixed: ${totalFixed}`);
console.log('🚀 Issues addressed:');
console.log('  ✅ Duplicate imports removed');
console.log('  ✅ Custom UI component imports fixed');
console.log('  ✅ Unused icon imports removed');
console.log('  ✅ Duplicate state variables removed');

