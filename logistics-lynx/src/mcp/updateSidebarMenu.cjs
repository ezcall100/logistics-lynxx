// 🔧 MCP Sidebar Menu Update Script
const fs = require('fs');
const path = require('path');

// Function to read current EnhancedSidebar.tsx
function readSidebar() {
  const sidebarPath = path.join(__dirname, '../components/layout/EnhancedSidebar.tsx');
  return fs.readFileSync(sidebarPath, 'utf8');
}

// Function to update the settings menu section
function updateSettingsMenu(content) {
  const settingsSection = `    {
      id: 'settings',
      title: 'Settings',
      icon: 'Settings',
      description: 'System and user preferences',
      children: [
        { id: 'settings-overview', title: 'Settings Overview', icon: 'Settings', path: 'settings' },
        { id: 'profile-settings', title: 'Profile Settings', icon: 'User', path: 'settings/profile' },
        { id: 'security-settings', title: 'Security Settings', icon: 'Shield', path: 'settings/security' },
        { id: 'notification-settings', title: 'Notification Settings', icon: 'Bell', path: 'settings/notifications' },
        { id: 'appearance-settings', title: 'Appearance Settings', icon: 'Palette', path: 'settings/appearance' },
        { id: 'language-settings', title: 'Language & Region', icon: 'Globe', path: 'settings/language' },
        { id: 'accessibility-settings', title: 'Accessibility Settings', icon: 'Accessibility', path: 'settings/accessibility' },
        { id: 'privacy-settings', title: 'Privacy Settings', icon: 'Lock', path: 'settings/privacy' },
        { id: 'integration-settings', title: 'Integration Settings', icon: 'Plug', path: 'settings/integrations' },
        { id: 'backup-settings', title: 'Backup & Export', icon: 'Download', path: 'settings/backup' },
        { id: 'advanced-settings', title: 'Advanced Settings', icon: 'Code', path: 'settings/advanced' },
        { id: 'about-settings', title: 'About & Support', icon: 'Info', path: 'settings/about' }
      ],
      priority: 'medium'
    }`;

  // Find and replace the existing settings section
  const settingsPattern = /{\s*id:\s*'settings',[\s\S]*?priority:\s*'medium'\s*}/;
  const updatedContent = content.replace(settingsPattern, settingsSection);
  
  return updatedContent;
}

// Function to add new menu sections
function addNewMenuSections(content) {
  const newSections = `
    {
      id: 'profile',
      title: 'Profile',
      icon: 'User',
      description: 'Personal profile management',
      children: [
        { id: 'profile-overview', title: 'Profile Overview', icon: 'User', path: 'profile' },
        { id: 'personal-information', title: 'Personal Information', icon: 'UserCheck', path: 'profile/personal' },
        { id: 'avatar-media', title: 'Avatar & Media', icon: 'Image', path: 'profile/avatar' },
        { id: 'user-preferences', title: 'User Preferences', icon: 'Settings', path: 'profile/preferences' },
        { id: 'activity-history', title: 'Activity History', icon: 'Activity', path: 'profile/activity' },
        { id: 'active-sessions', title: 'Active Sessions', icon: 'Monitor', path: 'profile/sessions' },
        { id: 'account-verification', title: 'Account Verification', icon: 'CheckCircle', path: 'profile/verification' },
        { id: 'account-deletion', title: 'Account Deletion', icon: 'Trash2', path: 'profile/delete' }
      ],
      priority: 'medium'
    },
    {
      id: 'fab',
      title: 'FAB Actions',
      icon: 'Plus',
      badge: 'New',
      description: 'Floating Action Button management',
      children: [
        { id: 'fab-overview', title: 'FAB Overview', icon: 'Plus', path: 'fab' },
        { id: 'fab-actions', title: 'FAB Actions', icon: 'Zap', path: 'fab/actions' },
        { id: 'fab-customization', title: 'FAB Customization', icon: 'Palette', path: 'fab/customization' },
        { id: 'fab-templates', title: 'FAB Templates', icon: 'Copy', path: 'fab/templates' },
        { id: 'fab-analytics', title: 'FAB Analytics', icon: 'BarChart3', path: 'fab/analytics' },
        { id: 'fab-integrations', title: 'FAB Integrations', icon: 'Plug', path: 'fab/integrations' }
      ],
      priority: 'medium'
    },
    {
      id: 'mobile',
      title: 'Mobile',
      icon: 'Smartphone',
      description: 'Mobile app management',
      children: [
        { id: 'mobile-overview', title: 'Mobile Overview', icon: 'Smartphone', path: 'mobile' },
        { id: 'mobile-settings', title: 'Mobile Settings', icon: 'Settings', path: 'mobile/settings' },
        { id: 'mobile-sync', title: 'Mobile Sync', icon: 'RefreshCw', path: 'mobile/sync' },
        { id: 'mobile-devices', title: 'Mobile Devices', icon: 'Devices', path: 'mobile/devices' }
      ],
      priority: 'low'
    }`;

  // Find the end of the navigationItems array and add new sections
  const endPattern = /];\s*$/m;
  const insertPoint = content.lastIndexOf(']');
  
  if (insertPoint !== -1) {
    const beforeInsert = content.slice(0, insertPoint);
    const afterInsert = content.slice(insertPoint);
    return beforeInsert + ',' + newSections + afterInsert;
  }
  
  return content;
}

// Function to update the sidebar
function updateSidebar() {
  console.log('🔧 Updating EnhancedSidebar with new menu items...');
  
  let content = readSidebar();
  
  // Update settings menu
  content = updateSettingsMenu(content);
  
  // Add new menu sections
  content = addNewMenuSections(content);
  
  // Write the updated content back
  const sidebarPath = path.join(__dirname, '../components/layout/EnhancedSidebar.tsx');
  fs.writeFileSync(sidebarPath, content);
  
  console.log('✅ EnhancedSidebar updated successfully');
  return true;
}

// Function to verify the update
function verifySidebarUpdate() {
  const content = readSidebar();
  
  const checks = [
    { name: 'Settings Overview Menu', check: content.includes('settings-overview') },
    { name: 'Profile Overview Menu', check: content.includes('profile-overview') },
    { name: 'FAB Overview Menu', check: content.includes('fab-overview') },
    { name: 'Mobile Overview Menu', check: content.includes('mobile-overview') },
    { name: 'Settings Menu Items', check: content.includes('Notification Settings') },
    { name: 'Profile Menu Items', check: content.includes('Personal Information') },
    { name: 'FAB Menu Items', check: content.includes('FAB Customization') },
    { name: 'Mobile Menu Items', check: content.includes('Mobile Sync') }
  ];
  
  console.log('\n🔍 Verifying sidebar update...');
  checks.forEach(check => {
    console.log(`  ${check.check ? '✅' : '❌'} ${check.name}`);
  });
  
  return checks.every(check => check.check);
}

// Main function
async function updateSidebarMenu() {
  console.log('🚀 MCP SIDEBAR MENU UPDATE STARTING...');
  console.log('='.repeat(60));
  
  try {
    const success = updateSidebar();
    if (success) {
      const verified = verifySidebarUpdate();
      if (verified) {
        console.log('\n🎉 SIDEBAR MENU UPDATE COMPLETE!');
        console.log('='.repeat(60));
        console.log('✅ All new menu items added to sidebar');
        console.log('✅ Settings menu updated with all 12 pages');
        console.log('✅ Profile menu added with 8 pages');
        console.log('✅ FAB menu added with 6 pages');
        console.log('✅ Mobile menu added with 4 pages');
        console.log('🌐 Ready for: http://localhost:3000/#/super-admin');
        console.log('='.repeat(60));
      } else {
        console.log('\n⚠️ Update completed but verification failed');
      }
    } else {
      console.log('\n❌ Update failed');
    }
  } catch (error) {
    console.error('❌ Error updating sidebar:', error.message);
  }
}

// Execute if run directly
if (require.main === module) {
  updateSidebarMenu().catch(console.error);
}

module.exports = { updateSidebarMenu };
