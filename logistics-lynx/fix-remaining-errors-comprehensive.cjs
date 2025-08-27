const fs = require('fs');
const path = require('path');

console.log('🚀 FIXING REMAINING TYPESCRIPT ERRORS COMPREHENSIVELY');

// Function to fix missing state variables
function fixMissingStateVariables(content) {
  let modified = false;
  
  // Fix setShowIPModal in SecuritySettings
  if (content.includes('setShowIPModal') && !content.includes('const [showIPModal, setShowIPModal]')) {
    content = content.replace(
      /const \[.*?\] = useState\(/,
      (match) => {
        if (!content.includes('showIPModal')) {
          return match + '\n  const [showIPModal, setShowIPModal] = useState(false);';
        }
        return match;
      }
    );
    modified = true;
  }
  
  return { content, modified };
}

// Function to fix duplicate variables in PerformanceMonitorDashboard
function fixDuplicateVariables(content) {
  let modified = false;
  
  if (content.includes('PerformanceMonitorDashboard')) {
    // Remove duplicate variable declarations
    const lines = content.split('\n');
    const seenVariables = new Set();
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const stateMatch = line.match(/const\s+\[([^,]+),\s*set\w+\]\s*=\s*useState\(/);
      if (stateMatch) {
        const varName = stateMatch[1].trim();
        if (seenVariables.has(varName)) {
          console.log(`  Removing duplicate variable: ${varName}`);
          modified = true;
          continue;
        } else {
          seenVariables.add(varName);
        }
      }
      newLines.push(line);
    }
    
    content = newLines.join('\n');
  }
  
  return { content, modified };
}

// Function to fix PerformanceMonitor type issues
function fixPerformanceMonitorTypes(content) {
  let modified = false;
  
  if (content.includes('PerformanceMonitor') && content.includes('const [data, setData] = useState([])')) {
    // Add proper type to data state
    content = content.replace(
      'const [data, setData] = useState([])',
      'const [data, setData] = useState<Array<{id: number; name: string; status: string; value: number; date: string}>>([])'
    );
    
    // Fix getStatusColor parameter type
    content = content.replace(
      'const getStatusColor = (status) => {',
      'const getStatusColor = (status: string) => {'
    );
    
    modified = true;
  }
  
  return { content, modified };
}

// Function to remove unused imports and variables
function removeUnusedImports(content) {
  let modified = false;
  
  // Remove unused icon imports
  const unusedIcons = ['Lock', 'Shield', 'Network', 'BarChart', 'Bar', 'Input'];
  
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
  
  // Remove unused variable declarations
  const unusedVars = [
    'setDevices', 'setMobileStats', 'setSettings', 'setSyncStatus', 'setSelectedPortal',
    'setVerificationStatus', 'setActivities', 'setProfile', 'setSelectedTimeframe',
    'setIsLoading', 'setMode', 'setShowIPModal'
  ];
  
  for (const varName of unusedVars) {
    const regex = new RegExp(`const\\s+\\[\\w+,\\s*${varName}\\]\\s*=\\s*useState\\([^)]+\\);?`, 'g');
    if (regex.test(content) && !content.includes(`${varName}(`)) {
      content = content.replace(regex, (match) => {
        const varMatch = match.match(/const\s+\[(\w+),\s*set\w+\]/);
        if (varMatch) {
          return `const [${varMatch[1]}] = useState(${match.match(/useState\(([^)]+)\)/)[1]});`;
        }
        return match;
      });
      modified = true;
    }
  }
  
  return { content, modified };
}

// Function to fix missing index variables in map functions
function fixMissingIndexVariables(content) {
  let modified = false;
  
  // Fix missing index in map functions
  content = content.replace(
    /\.map\(\([^,)]+\)\s*=>\s*{[\s\S]*?<div key={index}/g,
    (match) => {
      if (!match.includes('(item, index)')) {
        return match.replace(/\.map\(\([^)]+\)\s*=>/, (mapMatch) => {
          return mapMatch.replace(/\(([^)]+)\)/, '($1, index)');
        });
      }
      return match;
    }
  );
  
  if (content !== content.replace(/\.map\(\([^,)]+\)\s*=>\s*{[\s\S]*?<div key={index}/g, '')) {
    modified = true;
  }
  
  return { content, modified };
}

// Function to fix duplicate EnhancedButton imports
function fixDuplicateEnhancedButtonImports(content) {
  let modified = false;
  
  // Remove duplicate EnhancedButton imports
  const lines = content.split('\n');
  const seenImports = new Set();
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.includes('EnhancedButton')) {
      if (seenImports.has('EnhancedButton')) {
        console.log(`  Removing duplicate EnhancedButton import: ${line.trim()}`);
        modified = true;
        continue;
      } else {
        seenImports.add('EnhancedButton');
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
      fixMissingStateVariables,
      fixDuplicateVariables,
      fixPerformanceMonitorTypes,
      removeUnusedImports,
      fixMissingIndexVariables,
      fixDuplicateEnhancedButtonImports
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
console.log(`\n🎉 COMPREHENSIVE ERROR FIX COMPLETE!`);
console.log(`📊 Total files fixed: ${totalFixed}`);
console.log('🚀 Issues addressed:');
console.log('  ✅ Missing state variables added');
console.log('  ✅ Duplicate variables removed');
console.log('  ✅ Type issues fixed');
console.log('  ✅ Unused imports and variables removed');
console.log('  ✅ Missing index variables fixed');
console.log('  ✅ Duplicate EnhancedButton imports removed');
