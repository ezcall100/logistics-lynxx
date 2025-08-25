const fs = require('fs');

// Read the EnhancedSidebar file
const sidebarPath = './src/components/layout/EnhancedSidebar.tsx';
let content = fs.readFileSync(sidebarPath, 'utf8');

// Replace all remaining /super-admin paths with the correct paths
const replacements = [
  // Portals
  ['/super-admin/portals', '/portals'],
  ['/super-admin/portals/config', '/portals/config'],
  ['/super-admin/portals/users', '/portals/users'],
  ['/super-admin/portals/features', '/portals/features'],
  ['/super-admin/portals/analytics', '/portals/analytics'],
  ['/super-admin/portals/billing', '/portals/billing'],
  ['/super-admin/portals/support', '/portals/support'],
  ['/super-admin/portals/integrations', '/portals/integrations'],
  ['/super-admin/portals/backup', '/portals/backup'],
  ['/super-admin/portals/security', '/portals/security'],
  ['/super-admin/portals/compliance', '/portals/compliance'],
  ['/super-admin/portals/deployment', '/portals/deployment'],
  
  // Analytics
  ['/super-admin/analytics/business', '/analytics/business'],
  ['/super-admin/analytics/users', '/analytics/users'],
  ['/super-admin/analytics/performance', '/analytics/performance'],
  ['/super-admin/analytics/security', '/analytics/security'],
  ['/super-admin/analytics/financial', '/analytics/financial'],
  ['/super-admin/analytics/operational', '/analytics/operational'],
  ['/super-admin/analytics/custom', '/analytics/custom'],
  ['/super-admin/analytics/export', '/analytics/export'],
  ['/super-admin/analytics/dashboards', '/analytics/dashboards'],
  ['/super-admin/analytics/scheduled', '/analytics/scheduled'],
  
  // MCP
  ['/super-admin/mcp', '/mcp'],
  ['/super-admin/mcp/agents', '/mcp/agents'],
  ['/super-admin/mcp/models', '/mcp/models'],
  ['/super-admin/mcp/pipeline', '/mcp/pipeline'],
  ['/super-admin/mcp/learning', '/mcp/learning'],
  ['/super-admin/mcp/analytics', '/mcp/analytics'],
  ['/super-admin/mcp/automation', '/mcp/automation'],
  ['/super-admin/mcp/integrations', '/mcp/integrations'],
  ['/super-admin/mcp/monitoring', '/mcp/monitoring'],
  ['/super-admin/mcp/compliance', '/mcp/compliance'],
  ['/super-admin/mcp/documentation', '/mcp/documentation'],
  ['/super-admin/mcp/support', '/mcp/support'],
  
  // Business
  ['/super-admin/business/customers', '/business/customers'],
  ['/super-admin/business/sales', '/business/sales'],
  ['/super-admin/business/billing', '/business/billing'],
  ['/super-admin/business/support', '/business/support'],
  ['/super-admin/business/docs', '/business/docs'],
  ['/super-admin/business/marketing', '/business/marketing'],
  ['/super-admin/business/partners', '/business/partners'],
  ['/super-admin/business/legal', '/business/legal'],
  
  // Development & DevOps
  ['/super-admin/dev/repository', '/dev/repository'],
  ['/super-admin/dev/pipeline', '/dev/pipeline'],
  ['/super-admin/dev/testing', '/dev/testing'],
  ['/super-admin/dev/environments', '/dev/environments'],
  ['/super-admin/dev/performance', '/dev/performance'],
  ['/super-admin/dev/security', '/dev/security'],
  ['/super-admin/dev/documentation', '/dev/documentation'],
  ['/super-admin/dev/releases', '/dev/releases'],
  
  // Settings
  ['/super-admin/settings', '/settings'],
  ['/super-admin/settings/profile', '/settings/profile'],
  ['/super-admin/settings/system', '/settings/system'],
  ['/super-admin/settings/preferences', '/settings/preferences'],
  
  // Security Dashboard
  ['/super-admin/security/dashboard', '/security/dashboard'],
  
  // Invites
  ['/super-admin/invites', '/invites']
];

// Apply all replacements
replacements.forEach(([oldPath, newPath]) => {
  content = content.replace(new RegExp(oldPath.replace(/\//g, '\\/'), 'g'), newPath);
});

// Write the updated content back to the file
fs.writeFileSync(sidebarPath, content, 'utf8');

console.log('✅ Successfully updated all sidebar navigation paths!');
console.log('🔧 Removed /super-admin prefix from all navigation paths');
console.log('🚀 Sub-menu navigation should now work properly');
