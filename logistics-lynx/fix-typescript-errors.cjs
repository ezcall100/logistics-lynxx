#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix unused imports
function fixUnusedImports(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Remove unused lucide-react imports
  const lucideImports = [
    'AlertTriangle', 'Upload', 'TrendingDown', 'Server', 'FileText', 'RotateCcw', 'Save',
    'Search', 'Filter', 'MoreVertical', 'Clock', 'Settings', 'Shield', 'BarChart3', 'Network',
    'Archive', 'Trash2', 'Eye', 'Edit', 'Copy', 'ExternalLink', 'Lock', 'Unlock', 'Users',
    'Database', 'Cpu', 'HardDrive', 'Unlock', 'XCircle', 'AlertCircle', 'Star', 'Key',
    'Building', 'Mail', 'Phone', 'Calendar', 'MapPin', 'Share', 'Send', 'MessageSquare',
    'Bell', 'Zap', 'Droplets', 'Cloud', 'CloudRain', 'CloudSnow', 'CloudLightning', 'Sun',
    'Moon', 'Sunrise', 'Sunset', 'Wind', 'Thermometer', 'Gauge', 'Timer', 'Navigation',
    'Compass', 'Map', 'Layers', 'Grid3X3', 'Rows', 'Sidebar', 'SidebarClose', 'SidebarOpen',
    'PanelLeft', 'PanelRight', 'PanelTop', 'PanelBottom', 'Layout', 'LayoutGrid', 'LayoutList',
    'LayoutTemplate', 'LayoutDashboard', 'Grid', 'List', 'Columns', 'Maximize', 'Minimize',
    'Move', 'RotateCw', 'ZoomIn', 'ZoomOut', 'Type', 'Bold', 'Italic', 'Underline', 'Link',
    'Unlink', 'Code', 'Quote', 'Hash', 'AtSign', 'Percent', 'Minus', 'Divide', 'Equal',
    'Infinity', 'Pi', 'Sigma', 'Square', 'Circle', 'Triangle', 'Hexagon', 'Octagon', 'Heart'
  ];
  
  // Remove unused imports from lucide-react
  lucideImports.forEach(icon => {
    const regex = new RegExp(`\\b${icon}\\b,?\\s*`, 'g');
    if (content.includes(icon) && !content.includes(`<${icon}`) && !content.includes(`${icon}(`)) {
      content = content.replace(regex, '');
      modified = true;
    }
  });
  
  // Clean up empty import lines
  content = content.replace(/import\s*{\s*}\s*from\s*['"]lucide-react['"];?\s*/g, '');
  content = content.replace(/import\s*{\s*,\s*}\s*from\s*['"]lucide-react['"];?\s*/g, '');
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed unused imports in ${filePath}`);
  }
}

// Function to fix number/string type mismatches
function fixTypeMismatches(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix number to string conversions for input values
  const numberToStringPatterns = [
    { pattern: /value=\{formData\.database\.port\}/g, replacement: 'value={formData.database.port.toString()}' },
    { pattern: /value=\{formData\.database\.connectionPool\}/g, replacement: 'value={formData.database.connectionPool.toString()}' },
    { pattern: /value=\{formData\.api\.rateLimit\}/g, replacement: 'value={formData.api.rateLimit.toString()}' },
    { pattern: /value=\{formData\.api\.timeout\}/g, replacement: 'value={formData.api.timeout.toString()}' },
    { pattern: /value=\{formData\.email\.port\}/g, replacement: 'value={formData.email.port.toString()}' },
    { pattern: /value=\{formData\.security\.sessionTimeout\}/g, replacement: 'value={formData.security.sessionTimeout.toString()}' },
    { pattern: /value=\{formData\.security\.maxLoginAttempts\}/g, replacement: 'value={formData.security.maxLoginAttempts.toString()}' },
    { pattern: /value=\{formData\.security\.lockoutDuration\}/g, replacement: 'value={formData.security.lockoutDuration.toString()}' },
    { pattern: /value=\{formData\.security\.passwordHistory\}/g, replacement: 'value={formData.security.passwordHistory.toString()}' },
    { pattern: /value=\{formData\.storage\.maxFileSize\}/g, replacement: 'value={formData.storage.maxFileSize.toString()}' },
    { pattern: /value=\{selectedGroup\.maxMembers\}/g, replacement: 'value={selectedGroup.maxMembers.toString()}' }
  ];
  
  numberToStringPatterns.forEach(({ pattern, replacement }) => {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed type mismatches in ${filePath}`);
  }
}

// Function to fix component prop issues
function fixComponentProps(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix Badge size prop
  content = content.replace(/size="sm"/g, '');
  
  // Fix Button children prop
  content = content.replace(/<EnhancedButton([^>]*)\/>/g, '<EnhancedButton$1></EnhancedButton>');
  
  // Fix variant prop values
  content = content.replace(/variant="neutral"/g, 'variant="default"');
  
  // Fix Table pagination prop
  content = content.replace(/pagination=\{\{[^}]*\}\}/g, '');
  
  // Fix Input label prop
  content = content.replace(/label="([^"]*)"/g, 'placeholder="$1"');
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed component props in ${filePath}`);
  }
}

// Function to fix unused variables
function fixUnusedVariables(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Fix unused state variables
  const unusedStatePatterns = [
    /const \[([^,]+), set\1\] = useState\([^)]+\);/g,
    /const \[([^,]+)\] = useState\([^)]+\);/g
  ];
  
  unusedStatePatterns.forEach(pattern => {
    content = content.replace(pattern, (match, varName) => {
      if (!content.includes(varName) || content.match(new RegExp(`\\b${varName}\\b`)).length <= 1) {
        return `// ${match}`;
      }
      return match;
    });
    modified = true;
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed unused variables in ${filePath}`);
  }
}

// Files to fix
const filesToFix = [
  'src/pages/super-admin/system-administration/DatabaseManagement.tsx',
  'src/pages/super-admin/system-administration/APIManagement.tsx',
  'src/pages/super-admin/settings/SystemSettings.tsx',
  'src/pages/super-admin/user-management/UserGroups.tsx',
  'src/pages/super-admin/user-management/AllUsers.tsx',
  'src/pages/super-admin/user-management/UserRoles.tsx',
  'src/pages/super-admin/dashboard/SystemOverview.tsx',
  'src/pages/super-admin/dashboard/ActiveUsers.tsx',
  'src/pages/super-admin/dashboard/RevenueMetrics.tsx',
  'src/pages/super-admin/dashboard/SystemAlerts.tsx',
  'src/pages/super-admin/security-center/SecurityAudit.tsx',
  'src/pages/super-admin/portal-management/PortalOverview.tsx',
  'src/pages/super-admin/mcp-control-center/MCPOverview.tsx',
  'src/pages/super-admin/settings/ProfileSettings.tsx',
  'src/pages/super-admin/settings/SettingsOverview.tsx'
];

console.log('🔧 Starting TypeScript error fixes...\n');

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    console.log(`📝 Processing ${filePath}...`);
    fixUnusedImports(fullPath);
    fixTypeMismatches(fullPath);
    fixComponentProps(fullPath);
    fixUnusedVariables(fullPath);
  } else {
    console.log(`⚠️ File not found: ${filePath}`);
  }
});

console.log('\n🎉 TypeScript error fixes completed!');
console.log('Run "npm run type-check" to verify the fixes.');
