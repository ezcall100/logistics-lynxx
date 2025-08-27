const fs = require('fs');

console.log('🔧 Fixing PerformanceMonitorDashboard.tsx completely...');

// Read the current file
let content = fs.readFileSync('src/pages/super-admin/system-monitoring/PerformanceMonitorDashboard.tsx', 'utf8');

// Remove ResponsiveCard and EnhancedButton imports
content = content.replace(
  "import { ResponsiveCard, EnhancedButton } from '../../../components/ui';",
  "// import { ResponsiveCard, EnhancedButton } from '../../../components/ui';"
);

// Replace all ResponsiveCard with div
content = content.replace(/<ResponsiveCard>/g, '<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">');
content = content.replace(/<\/ResponsiveCard>/g, '</div>');

// Replace all EnhancedButton with button
content = content.replace(/<EnhancedButton([^>]*)>/g, '<button$1 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">');
content = content.replace(/<\/EnhancedButton>/g, '</button>');

// Write the fixed file
fs.writeFileSync('src/pages/super-admin/system-monitoring/PerformanceMonitorDashboard.tsx', content);

console.log('✅ PerformanceMonitorDashboard.tsx completely fixed!');
