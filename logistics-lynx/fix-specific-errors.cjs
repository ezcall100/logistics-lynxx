const fs = require('fs');
const path = require('path');

console.log('🚀 FIXING SPECIFIC REMAINING ERRORS');

// Function to remove duplicate state variables
function removeDuplicateVariables(content) {
  let modified = false;
  
  // Remove duplicate state variable declarations
  const lines = content.split('\n');
  const seenVariables = new Set();
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is a state variable declaration
    const stateMatch = line.match(/const\s+\[([^,]+),\s*set\w+\]\s*=\s*useState\(/);
    if (stateMatch) {
      const varName = stateMatch[1].trim();
      
      if (seenVariables.has(varName)) {
        // Skip this duplicate line
        console.log(`  Removing duplicate: ${varName}`);
        modified = true;
        continue;
      } else {
        seenVariables.add(varName);
      }
    }
    
    newLines.push(line);
  }
  
  if (modified) {
    content = newLines.join('\n');
  }
  
  return { content, modified };
}

// Function to fix button properties
function fixButtonProperties(content) {
  let modified = false;
  
  // Remove invalid button properties
  const originalContent = content;
  content = content.replace(/<button([^>]*)\s+icon="[^"]*"([^>]*)>/g, '<button$1$2>');
  content = content.replace(/<button([^>]*)\s+variant="[^"]*"([^>]*)>/g, '<button$1$2>');
  content = content.replace(/<button([^>]*)\s+size="[^"]*"([^>]*)>/g, '<button$1$2>');
  
  if (content !== originalContent) {
    modified = true;
  }
  
  return { content, modified };
}

// Function to add missing imports
function addMissingImports(content) {
  let modified = false;
  
  // Add missing lucide-react imports
  const missingIcons = [];
  
  if (content.includes('<Settings') && !content.includes('Settings')) {
    missingIcons.push('Settings');
  }
  if (content.includes('<Database') && !content.includes('Database')) {
    missingIcons.push('Database');
  }
  if (content.includes('<Code') && !content.includes('Code')) {
    missingIcons.push('Code');
  }
  if (content.includes('<Shield') && !content.includes('Shield')) {
    missingIcons.push('Shield');
  }
  if (content.includes('<Bell') && !content.includes('Bell')) {
    missingIcons.push('Bell');
  }
  if (content.includes('<HardDrive') && !content.includes('HardDrive')) {
    missingIcons.push('HardDrive');
  }
  if (content.includes('<Server') && !content.includes('Server')) {
    missingIcons.push('Server');
  }
  if (content.includes('<Network') && !content.includes('Network')) {
    missingIcons.push('Network');
  }
  
  if (missingIcons.length > 0) {
    const importRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"];?/;
    const match = content.match(importRegex);
    
    if (match) {
      const existingImports = match[1].split(',').map(imp => imp.trim());
      const newImports = [...existingImports, ...missingIcons];
      const newImportLine = `import { ${newImports.join(', ')} } from 'lucide-react';`;
      content = content.replace(importRegex, newImportLine);
      modified = true;
    }
  }
  
  return { content, modified };
}

// Function to add missing state variables for simple components
function addMissingStateForSimpleComponents(content) {
  let modified = false;
  
  // Add missing setIsLoading for simple components
  if (content.includes('setIsLoading') && !content.includes('const [isLoading, setIsLoading]')) {
    // Find the component start
    const componentMatch = content.match(/(const\s+\w+\s*:\s*React\.FC\s*=\s*\(\)\s*=>\s*{)/);
    if (componentMatch) {
      const componentStart = componentMatch[0];
      const newStateBlock = '\n  const [isLoading, setIsLoading] = useState(true);\n';
      content = content.replace(componentStart, componentStart + newStateBlock);
      modified = true;
    }
  }
  
  return { content, modified };
}

// Function to fix confidence logger
function fixConfidenceLogger(content) {
  let modified = false;
  
  // Add back missing properties
  if (!content.includes('private confidenceThreshold: number = 0.4;')) {
    content = content.replace(
      '  // private confidenceThreshold: number = 0.4;',
      '  private confidenceThreshold: number = 0.4;'
    );
    modified = true;
  }
  
  if (!content.includes('private maxRetries: number = 3;')) {
    content = content.replace(
      '  // private maxRetries: number = 3;',
      '  private maxRetries: number = 3;'
    );
    modified = true;
  }
  
  return { content, modified };
}

// Main fix function
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Apply fixes
    const duplicateResult = removeDuplicateVariables(content);
    content = duplicateResult.content;
    modified = modified || duplicateResult.modified;
    
    const buttonResult = fixButtonProperties(content);
    content = buttonResult.content;
    modified = modified || buttonResult.modified;
    
    const importResult = addMissingImports(content);
    content = importResult.content;
    modified = modified || importResult.modified;
    
    const simpleStateResult = addMissingStateForSimpleComponents(content);
    content = simpleStateResult.content;
    modified = modified || simpleStateResult.modified;
    
    // Special fixes for specific files
    if (filePath.includes('confidence-logger.ts')) {
      const loggerResult = fixConfidenceLogger(content);
      content = loggerResult.content;
      modified = modified || loggerResult.modified;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Get all TypeScript files
function getAllTSFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
      files.push(...getAllTSFiles(fullPath));
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Fix all files
console.log('🔧 Applying specific fixes to all TypeScript files...');
const allFiles = getAllTSFiles('src');
let fixedCount = 0;

for (const file of allFiles) {
  if (fixFile(file)) {
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount} files!`);
console.log('🎯 All specific errors should now be resolved!');
