const fs = require('fs');
const path = require('path');

console.log('🚀 FIXING MISSING STATE VARIABLES AND CRITICAL ERRORS');

// Function to add missing state variables
function addMissingStateVariables(content, filePath) {
  let modified = false;
  
  // Add missing state variables based on usage
  if (content.includes('setIsLoading') && !content.includes('const [isLoading, setIsLoading]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [isLoading, setIsLoading] = useState(false);\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setLoading') && !content.includes('const [loading, setLoading]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [loading, setLoading] = useState(false);\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setIsRefreshing') && !content.includes('const [isRefreshing, setIsRefreshing]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [isRefreshing, setIsRefreshing] = useState(false);\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setActiveTab') && !content.includes('const [activeTab, setActiveTab]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [activeTab, setActiveTab] = useState(\'general\');\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setFormData') && !content.includes('const [formData, setFormData]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [formData, setFormData] = useState({});\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setSearchQuery') && !content.includes('const [searchQuery, setSearchQuery]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [searchQuery, setSearchQuery] = useState(\'\');\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setSelectedFilter') && !content.includes('const [selectedFilter, setSelectedFilter]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [selectedFilter, setSelectedFilter] = useState(\'all\');\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setIsDarkMode') && !content.includes('const [isDarkMode, setIsDarkMode]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [isDarkMode, setIsDarkMode] = useState(false);\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setSearchTerm') && !content.includes('const [searchTerm, setSearchTerm]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [searchTerm, setSearchTerm] = useState(\'\');\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setMonitoringActive') && !content.includes('const [monitoringActive, setMonitoringActive]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [monitoringActive, setMonitoringActive] = useState(true);\n  const [$1, set$1] = useState('
    );
    modified = true;
  }
  
  if (content.includes('setAutoRefresh') && !content.includes('const [autoRefresh, setAutoRefresh]')) {
    content = content.replace(
      /const \[([^,]+),\s*set\w+\]\s*=\s*useState\(/,
      'const [autoRefresh, setAutoRefresh] = useState(true);\n  const [$1, set$1] = useState('
    );
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

// Function to fix button properties
function fixButtonProperties(content) {
  let modified = false;
  
  // Remove invalid button properties
  content = content.replace(/<button([^>]*)\s+icon="[^"]*"([^>]*)>/g, '<button$1$2>');
  content = content.replace(/<button([^>]*)\s+variant="[^"]*"([^>]*)>/g, '<button$1$2>');
  content = content.replace(/<button([^>]*)\s+size="[^"]*"([^>]*)>/g, '<button$1$2>');
  
  if (content !== content) {
    modified = true;
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
    const stateResult = addMissingStateVariables(content, filePath);
    content = stateResult.content;
    modified = modified || stateResult.modified;
    
    const importResult = addMissingImports(content);
    content = importResult.content;
    modified = modified || importResult.modified;
    
    const buttonResult = fixButtonProperties(content);
    content = buttonResult.content;
    modified = modified || buttonResult.modified;
    
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
console.log('🔧 Fixing missing state variables and critical errors...');
const allFiles = getAllTSFiles('src');
let fixedCount = 0;

for (const file of allFiles) {
  if (fixFile(file)) {
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount} files!`);
console.log('🎯 Missing state variables and critical errors should now be resolved!');
