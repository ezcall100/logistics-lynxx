const fs = require('fs');
const path = require('path');

console.log('🚀 FIXING DUPLICATE VARIABLES AND REMAINING ERRORS');

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

// Function to fix formData type issues
function fixFormDataTypes(content) {
  let modified = false;
  
  // Replace empty object with proper type
  if (content.includes('const [formData, setFormData] = useState({});')) {
    content = content.replace(
      'const [formData, setFormData] = useState({});',
      `const [formData, setFormData] = useState({
        general: { appName: '', version: '', environment: '' },
        database: { host: '', port: 5432, name: '', user: '' },
        api: { baseUrl: '', timeout: 30000, retries: 3 },
        security: { maxLoginAttempts: 5, lockoutDuration: 15, passwordHistory: 5, twoFactorEnabled: false, sslEnabled: true },
        notifications: { emailNotifications: true, smsNotifications: false, pushNotifications: true, webhookUrl: '', slackWebhook: '', teamsWebhook: '' },
        storage: { provider: 'aws', bucket: '', region: '', accessKey: '', secretKey: '', maxFileSize: 10485760, cdnEnabled: false }
      });`
    );
    modified = true;
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
  
  if (content.includes('<Database') && !content.includes('Database')) {
    missingIcons.push('Database');
  }
  if (content.includes('<Server') && !content.includes('Server')) {
    missingIcons.push('Server');
  }
  if (content.includes('<HardDrive') && !content.includes('HardDrive')) {
    missingIcons.push('HardDrive');
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
    
    const formDataResult = fixFormDataTypes(content);
    content = formDataResult.content;
    modified = modified || formDataResult.modified;
    
    const buttonResult = fixButtonProperties(content);
    content = buttonResult.content;
    modified = modified || buttonResult.modified;
    
    const importResult = addMissingImports(content);
    content = importResult.content;
    modified = modified || importResult.modified;
    
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
console.log('🔧 Fixing duplicate variables and remaining errors...');
const allFiles = getAllTSFiles('src');
let fixedCount = 0;

for (const file of allFiles) {
  if (fixFile(file)) {
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount} files!`);
console.log('🎯 All duplicate variables and remaining errors should now be resolved!');
