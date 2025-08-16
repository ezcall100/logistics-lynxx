import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dashboard page template
const dashboardPageTemplate = (portalKey) => `import React from "react";
import { DashboardTemplate } from "@/components/dashboard/DashboardTemplate";

export default function ${portalKey.charAt(0).toUpperCase() + portalKey.slice(1)}Dashboard() {
  return <DashboardTemplate portalKey="${portalKey}" />;
}
`;

// Get all portal keys from the registry
const getAllPortalKeys = () => {
  const registryPath = path.join(__dirname, '../src/portals/dashboard.registry.ts');
  const registryContent = fs.readFileSync(registryPath, 'utf8');
  
  // Extract portal keys using regex
  const portalKeyMatches = registryContent.match(/portalKey: "([^"]+)"/g);
  return portalKeyMatches.map(match => match.match(/"([^"]+)"/)[1]);
};

// Generate dashboard pages
const generateDashboardPages = () => {
  const portalKeys = getAllPortalKeys();
  const pagesDir = path.join(__dirname, '../src/pages');
  
  console.log('🚀 Generating dashboard pages for all portals...');
  
  portalKeys.forEach(portalKey => {
    const portalDir = path.join(pagesDir, portalKey);
    const dashboardFile = path.join(portalDir, 'dashboard.tsx');
    
    // Create portal directory if it doesn't exist
    if (!fs.existsSync(portalDir)) {
      fs.mkdirSync(portalDir, { recursive: true });
      console.log(`📁 Created directory: ${portalDir}`);
    }
    
    // Generate dashboard page
    const pageContent = dashboardPageTemplate(portalKey);
    fs.writeFileSync(dashboardFile, pageContent);
    console.log(`✅ Generated: ${dashboardFile}`);
  });
  
  console.log(`\n🎉 Successfully generated ${portalKeys.length} dashboard pages!`);
  console.log('\n📋 Generated dashboards:');
  portalKeys.forEach(key => {
    console.log(`   - ${key}/dashboard.tsx`);
  });
};

// Generate feature flags SQL
const generateFeatureFlags = () => {
  const portalKeys = getAllPortalKeys();
  const flagsDir = path.join(__dirname, '../supabase/seed');
  
  if (!fs.existsSync(flagsDir)) {
    fs.mkdirSync(flagsDir, { recursive: true });
  }
  
  const flagsContent = `-- Auto-generated feature flags for portal dashboards
-- Generated on: ${new Date().toISOString()}

INSERT INTO feature_flags (key, scope, enabled, description, created_by) VALUES
${portalKeys.map(key => `('portal.${key}.dashboard.enabled', 'global', true, 'Enable dashboard for ${key} portal', 'autonomous')`).join(',\n')}
ON CONFLICT (key) DO UPDATE SET
  enabled = EXCLUDED.enabled,
  updated_at = NOW();
`;

  const flagsFile = path.join(flagsDir, 'portal-dashboard-flags.sql');
  fs.writeFileSync(flagsFile, flagsContent);
  console.log(`\n🔧 Generated feature flags: ${flagsFile}`);
};

// Main execution
try {
  generateDashboardPages();
  generateFeatureFlags();
  console.log('\n✨ Dashboard generation complete!');
} catch (error) {
  console.error('❌ Error generating dashboards:', error);
  process.exit(1);
}
