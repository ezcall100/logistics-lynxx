// 🔧 MCP App Routes Update Script
const fs = require('fs');
const path = require('path');

// Function to read current App.tsx
function readAppTsx() {
  const appPath = path.join(__dirname, '../App.tsx');
  return fs.readFileSync(appPath, 'utf8');
}

// Function to generate imports for new pages
function generateImports() {
  const imports = [
    // Settings Pages
    "import SettingsOverview from './pages/super-admin/settings/SettingsOverview';",
    "import ProfileSettings from './pages/super-admin/settings/ProfileSettings';",
    "import SecuritySettings from './pages/super-admin/settings/SecuritySettings';",
    "import NotificationSettings from './pages/super-admin/settings/NotificationSettings';",
    "import AppearanceSettings from './pages/super-admin/settings/AppearanceSettings';",
    "import LanguageSettings from './pages/super-admin/settings/LanguageSettings';",
    "import AccessibilitySettings from './pages/super-admin/settings/AccessibilitySettings';",
    "import PrivacySettings from './pages/super-admin/settings/PrivacySettings';",
    "import IntegrationSettings from './pages/super-admin/settings/IntegrationSettings';",
    "import BackupSettings from './pages/super-admin/settings/BackupSettings';",
    "import AdvancedSettings from './pages/super-admin/settings/AdvancedSettings';",
    "import AboutSettings from './pages/super-admin/settings/AboutSettings';",
    
    // Profile Pages
    "import ProfileOverview from './pages/super-admin/profile/ProfileOverview';",
    "import PersonalInformation from './pages/super-admin/profile/PersonalInformation';",
    "import AvatarMedia from './pages/super-admin/profile/AvatarMedia';",
    "import UserPreferences from './pages/super-admin/profile/UserPreferences';",
    "import ActivityHistory from './pages/super-admin/profile/ActivityHistory';",
    "import ActiveSessions from './pages/super-admin/profile/ActiveSessions';",
    "import AccountVerification from './pages/super-admin/profile/AccountVerification';",
    "import AccountDeletion from './pages/super-admin/profile/AccountDeletion';",
    
    // FAB Pages
    "import FABOverview from './pages/super-admin/fab/FABOverview';",
    "import FABActions from './pages/super-admin/fab/FABActions';",
    "import FABCustomization from './pages/super-admin/fab/FABCustomization';",
    "import FABTemplates from './pages/super-admin/fab/FABTemplates';",
    "import FABAnalytics from './pages/super-admin/fab/FABAnalytics';",
    "import FABIntegrations from './pages/super-admin/fab/FABIntegrations';",
    
    // Mobile Pages
    "import MobileOverview from './pages/super-admin/mobile/MobileOverview';",
    "import MobileSettings from './pages/super-admin/mobile/MobileSettings';",
    "import MobileSync from './pages/super-admin/mobile/MobileSync';",
    "import MobileDevices from './pages/super-admin/mobile/MobileDevices';"
  ];
  
  return imports.join('\n');
}

// Function to generate route definitions
function generateRoutes() {
  const routes = [
    // Settings Routes
    "                <Route path=\"settings\" element={<SettingsOverview />} />",
    "                <Route path=\"settings/profile\" element={<ProfileSettings />} />",
    "                <Route path=\"settings/security\" element={<SecuritySettings />} />",
    "                <Route path=\"settings/notifications\" element={<NotificationSettings />} />",
    "                <Route path=\"settings/appearance\" element={<AppearanceSettings />} />",
    "                <Route path=\"settings/language\" element={<LanguageSettings />} />",
    "                <Route path=\"settings/accessibility\" element={<AccessibilitySettings />} />",
    "                <Route path=\"settings/privacy\" element={<PrivacySettings />} />",
    "                <Route path=\"settings/integrations\" element={<IntegrationSettings />} />",
    "                <Route path=\"settings/backup\" element={<BackupSettings />} />",
    "                <Route path=\"settings/advanced\" element={<AdvancedSettings />} />",
    "                <Route path=\"settings/about\" element={<AboutSettings />} />",
    
    // Profile Routes
    "                <Route path=\"profile\" element={<ProfileOverview />} />",
    "                <Route path=\"profile/personal\" element={<PersonalInformation />} />",
    "                <Route path=\"profile/avatar\" element={<AvatarMedia />} />",
    "                <Route path=\"profile/preferences\" element={<UserPreferences />} />",
    "                <Route path=\"profile/activity\" element={<ActivityHistory />} />",
    "                <Route path=\"profile/sessions\" element={<ActiveSessions />} />",
    "                <Route path=\"profile/verification\" element={<AccountVerification />} />",
    "                <Route path=\"profile/delete\" element={<AccountDeletion />} />",
    
    // FAB Routes
    "                <Route path=\"fab\" element={<FABOverview />} />",
    "                <Route path=\"fab/actions\" element={<FABActions />} />",
    "                <Route path=\"fab/customization\" element={<FABCustomization />} />",
    "                <Route path=\"fab/templates\" element={<FABTemplates />} />",
    "                <Route path=\"fab/analytics\" element={<FABAnalytics />} />",
    "                <Route path=\"fab/integrations\" element={<FABIntegrations />} />",
    
    // Mobile Routes
    "                <Route path=\"mobile\" element={<MobileOverview />} />",
    "                <Route path=\"mobile/settings\" element={<MobileSettings />} />",
    "                <Route path=\"mobile/sync\" element={<MobileSync />} />",
    "                <Route path=\"mobile/devices\" element={<MobileDevices />} />"
  ];
  
  return routes.join('\n');
}

// Function to update App.tsx
function updateAppTsx() {
  console.log('🔧 Updating App.tsx with new routes...');
  
  const appContent = readAppTsx();
  
  // Find the import section and add new imports
  const importSection = appContent.indexOf('// Development & DevOps Pages');
  const endOfImports = appContent.indexOf('// Landing page component');
  
  if (importSection === -1 || endOfImports === -1) {
    console.error('❌ Could not find import sections in App.tsx');
    return false;
  }
  
  // Insert new imports before the landing page component
  const newImports = generateImports();
  const updatedContent1 = appContent.slice(0, endOfImports) + '\n' + newImports + '\n' + appContent.slice(endOfImports);
  
  // Find the routes section and add new routes
  const routesSection = updatedContent1.indexOf('                {/* Settings Routes */}');
  const endOfRoutes = updatedContent1.indexOf('                {/* Security Dashboard Routes */}');
  
  if (routesSection === -1 || endOfRoutes === -1) {
    console.error('❌ Could not find routes sections in App.tsx');
    return false;
  }
  
  // Insert new routes before the security dashboard routes
  const newRoutes = generateRoutes();
  const updatedContent2 = updatedContent1.slice(0, endOfRoutes) + '\n' + newRoutes + '\n' + updatedContent1.slice(endOfRoutes);
  
  // Write the updated content back to App.tsx
  fs.writeFileSync(path.join(__dirname, '../App.tsx'), updatedContent2);
  
  console.log('✅ App.tsx updated successfully');
  return true;
}

// Function to verify the update
function verifyUpdate() {
  const appContent = readAppTsx();
  
  const checks = [
    { name: 'Settings Overview Import', check: appContent.includes('import SettingsOverview') },
    { name: 'Profile Overview Import', check: appContent.includes('import ProfileOverview') },
    { name: 'FAB Overview Import', check: appContent.includes('import FABOverview') },
    { name: 'Mobile Overview Import', check: appContent.includes('import MobileOverview') },
    { name: 'Settings Routes', check: appContent.includes('path="settings" element={<SettingsOverview />}') },
    { name: 'Profile Routes', check: appContent.includes('path="profile" element={<ProfileOverview />}') },
    { name: 'FAB Routes', check: appContent.includes('path="fab" element={<FABOverview />}') },
    { name: 'Mobile Routes', check: appContent.includes('path="mobile" element={<MobileOverview />}') }
  ];
  
  console.log('\n🔍 Verifying App.tsx update...');
  checks.forEach(check => {
    console.log(`  ${check.check ? '✅' : '❌'} ${check.name}`);
  });
  
  return checks.every(check => check.check);
}

// Main function
async function updateAppRoutes() {
  console.log('🚀 MCP APP ROUTES UPDATE STARTING...');
  console.log('='.repeat(60));
  
  try {
    const success = updateAppTsx();
    if (success) {
      const verified = verifyUpdate();
      if (verified) {
        console.log('\n🎉 APP ROUTES UPDATE COMPLETE!');
        console.log('='.repeat(60));
        console.log('✅ All new routes added to App.tsx');
        console.log('✅ All imports updated');
        console.log('🌐 Ready for: http://localhost:3000/#/super-admin');
        console.log('📱 New sections available:');
        console.log('  ⚙️ Settings (12 pages)');
        console.log('  👤 Profile (8 pages)');
        console.log('  🎯 FAB (6 pages)');
        console.log('  📱 Mobile (4 pages)');
        console.log('='.repeat(60));
      } else {
        console.log('\n⚠️ Update completed but verification failed');
      }
    } else {
      console.log('\n❌ Update failed');
    }
  } catch (error) {
    console.error('❌ Error updating App.tsx:', error.message);
  }
}

// Execute if run directly
if (require.main === module) {
  updateAppRoutes().catch(console.error);
}

module.exports = { updateAppRoutes };
