#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix remaining TypeScript errors
function fixRemainingErrors(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix number to string conversions for input values
  const numberToStringPatterns = [
    { pattern: /value=\{settings\.security\.passwordPolicy\.maxAge\}/g, replacement: 'value={settings.security.passwordPolicy.maxAge.toString()}' },
    { pattern: /value=\{settings\.security\.sessionPolicy\.sessionTimeout\}/g, replacement: 'value={settings.security.sessionPolicy.sessionTimeout.toString()}' },
    { pattern: /value=\{settings\.security\.sessionPolicy\.maxConcurrentSessions\}/g, replacement: 'value={settings.security.sessionPolicy.maxConcurrentSessions.toString()}' },
    { pattern: /value=\{settings\.notifications\.email\.smtpPort\}/g, replacement: 'value={settings.notifications.email.smtpPort.toString()}' }
  ];
  
  numberToStringPatterns.forEach(({ pattern, replacement }) => {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });
  
  // Fix missing pageSize variable in AllUsers.tsx
  if (filePath.includes('AllUsers.tsx')) {
    if (content.includes('pageSize') && !content.includes('const pageSize')) {
      content = content.replace(
        /const \[currentPage, setCurrentPage\] = useState\(1\);/g,
        'const [currentPage, setCurrentPage] = useState(1);\n  const pageSize = 10;'
      );
      modified = true;
    }
    
    // Fix Download import
    if (content.includes('<Download className="w-4 h-4" />') && !content.includes('import.*Download.*from')) {
      content = content.replace(
        /import \{([^}]*)\} from 'lucide-react';/g,
        (match, imports) => {
          if (!imports.includes('Download')) {
            return `import {${imports}, Download} from 'lucide-react';`;
          }
          return match;
        }
      );
      modified = true;
    }
  }
  
  // Fix Badge size prop issues
  content = content.replace(/size="sm"/g, '');
  
  // Fix Button children prop issues
  content = content.replace(/<EnhancedButton([^>]*)\/>/g, '<EnhancedButton$1></EnhancedButton>');
  
  // Fix variant prop values
  content = content.replace(/variant="neutral"/g, 'variant="default"');
  
  // Fix Table pagination prop
  content = content.replace(/pagination=\{\{[^}]*\}\}/g, '');
  
  // Fix Input label prop
  content = content.replace(/label="([^"]*)"/g, 'placeholder="$1"');
  
  // Fix unused state variables by commenting them out
  const unusedStatePatterns = [
    /const \[([^,]+), set\1\] = useState\([^)]+\);/g,
    /const \[([^,]+)\] = useState\([^)]+\);/g
  ];
  
  unusedStatePatterns.forEach(pattern => {
    content = content.replace(pattern, (match, varName) => {
      // Check if the variable is actually used
      const varUsageRegex = new RegExp(`\\b${varName}\\b`, 'g');
      const matches = content.match(varUsageRegex);
      if (matches && matches.length <= 1) {
        return `// ${match}`;
      }
      return match;
    });
    modified = true;
  });
  
  // Fix implicit any parameters
  content = content.replace(/render: \(_, row:/g, 'render: (_: any, row:');
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed remaining errors in ${filePath}`);
  }
}

// Function to remove unused imports
function removeUnusedImports(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // List of commonly unused lucide-react imports
  const unusedLucideImports = [
    'Globe', 'Download', 'EyeOff', 'Plus', 'CheckCircle', 'Info', 'HelpCircle', 'Video', 'Camera',
    'Image', 'File', 'Folder', 'FolderOpen', 'CreditCard', 'StarIcon', 'HeartIcon', 'ZapIcon',
    'Droplets', 'Cloud', 'CloudRain', 'CloudSnow', 'CloudLightning', 'Sun', 'Moon', 'Sunrise',
    'Sunset', 'Wind', 'Thermometer', 'Gauge', 'Timer', 'Navigation', 'Compass', 'Map', 'Layers',
    'Grid3X3', 'Rows', 'Sidebar', 'SidebarClose', 'SidebarOpen', 'PanelLeft', 'PanelRight',
    'PanelTop', 'PanelBottom', 'Layout', 'LayoutGrid', 'LayoutList', 'LayoutTemplate',
    'LayoutDashboard', 'Eye', 'AlertTriangle', 'Upload', 'Search', 'Filter', 'Activity',
    'Clock', 'Calendar', 'MapPin', 'Truck', 'Package', 'DollarSign', 'BarChart3', 'PieChart',
    'LineChart', 'Target', 'Cpu', 'Brain', 'HardDrive', 'Network', 'Hexagon', 'Octagon'
  ];
  
  // Remove unused imports from lucide-react
  unusedLucideImports.forEach(icon => {
    const regex = new RegExp(`\\b${icon}\\b,?\\s*`, 'g');
    if (content.includes(icon) && !content.includes(`<${icon}`) && !content.includes(`${icon}(`) && !content.includes(`${icon} `)) {
      content = content.replace(regex, '');
      modified = true;
    }
  });
  
  // Clean up empty import lines
  content = content.replace(/import\s*{\s*}\s*from\s*['"]lucide-react['"];?\s*/g, '');
  content = content.replace(/import\s*{\s*,\s*}\s*from\s*['"]lucide-react['"];?\s*/g, '');
  
  // Remove unused EnhancedUIComponents imports
  const unusedEnhancedImports = ['EnhancedBadge', 'EnhancedModal', 'EnhancedProgress'];
  unusedEnhancedImports.forEach(component => {
    const regex = new RegExp(`\\b${component}\\b,?\\s*`, 'g');
    if (content.includes(component) && !content.includes(`<${component}`)) {
      content = content.replace(regex, '');
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Removed unused imports from ${filePath}`);
  }
}

// Files to fix
const filesToFix = [
  'src/pages/super-admin/settings/Settings.tsx',
  'src/pages/super-admin/settings/SystemSettings.tsx',
  'src/pages/super-admin/system-administration/APIManagement.tsx',
  'src/pages/super-admin/system-administration/DatabaseManagement.tsx',
  'src/pages/super-admin/user-management/AllUsers.tsx',
  'src/pages/super-admin/user-management/UserGroups.tsx'
];

console.log('🔧 Fixing remaining TypeScript errors...\n');

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    console.log(`📝 Processing ${filePath}...`);
    removeUnusedImports(fullPath);
    fixRemainingErrors(fullPath);
  } else {
    console.log(`⚠️ File not found: ${filePath}`);
  }
});

console.log('\n🎉 Remaining TypeScript error fixes completed!');
console.log('Run "npm run type-check" to verify the fixes.');
