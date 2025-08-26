#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix JSX tags in a file
function fixJsxTags(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix ResponsiveCardTitle -> h3
    if (content.includes('ResponsiveCardTitle')) {
      content = content.replace(/<ResponsiveCardTitle/g, '<h3');
      content = content.replace(/<\/ResponsiveCardTitle>/g, '</h3>');
      modified = true;
    }
    
    // Fix ResponsiveCardContent -> div
    if (content.includes('ResponsiveCardContent')) {
      content = content.replace(/<ResponsiveCardContent/g, '<div');
      content = content.replace(/<\/ResponsiveCardContent>/g, '</div>');
      modified = true;
    }
    
    // Fix ResponsiveCardHeader -> div
    if (content.includes('ResponsiveCardHeader')) {
      content = content.replace(/<ResponsiveCardHeader/g, '<div');
      content = content.replace(/<\/ResponsiveCardHeader>/g, '</div>');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed JSX tags in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

// List of files with JSX errors
const filesToFix = [
  'src/components/invites/InviteStatusCard.tsx',
  'src/components/onboarding/OnboardingWizard.tsx',
  'src/components/QA/ConfidenceLogChart.tsx',
  'src/components/SecurityDashboard.tsx',
  'src/pages/mcp/AgentControlUI.tsx',
  'src/pages/super-admin/autonomous-system/AgentMonitor.tsx',
  'src/pages/super-admin/autonomous-system/AutonomousAgentManager.tsx',
  'src/pages/super-admin/autonomous-system/AutonomousControl.tsx',
  'src/pages/super-admin/fab/FABActions.tsx',
  'src/pages/super-admin/fab/FABAnalytics.tsx',
  'src/pages/super-admin/fab/FABCustomization.tsx',
  'src/pages/super-admin/fab/FABIntegrations.tsx',
  'src/pages/super-admin/fab/FABOverview.tsx',
  'src/pages/super-admin/fab/FABTemplates.tsx',
  'src/pages/super-admin/mcp-control-center/QAIntelligence.tsx',
  'src/pages/super-admin/mobile/MobileDevices.tsx',
  'src/pages/super-admin/mobile/MobileOverview.tsx',
  'src/pages/super-admin/mobile/MobileSettings.tsx',
  'src/pages/super-admin/mobile/MobileSync.tsx',
  'src/pages/super-admin/profile/AccountDeletion.tsx',
  'src/pages/super-admin/profile/AccountVerification.tsx',
  'src/pages/super-admin/profile/ActiveSessions.tsx',
  'src/pages/super-admin/profile/ActivityHistory.tsx',
  'src/pages/super-admin/profile/AvatarMedia.tsx',
  'src/pages/super-admin/profile/PersonalInformation.tsx',
  'src/pages/super-admin/profile/ProfileOverview.tsx',
  'src/pages/super-admin/profile/UserPreferences.tsx',
  'src/pages/super-admin/security-center/SecurityScannerDashboard.tsx',
  'src/pages/super-admin/settings/AboutSettings.tsx',
  'src/pages/super-admin/settings/AccessibilitySettings.tsx',
  'src/pages/super-admin/settings/AdvancedSettings.tsx',
  'src/pages/super-admin/settings/AppearanceSettings.tsx',
  'src/pages/super-admin/settings/BackupSettings.tsx',
  'src/pages/super-admin/settings/IntegrationSettings.tsx',
  'src/pages/super-admin/settings/LanguageSettings.tsx',
  'src/pages/super-admin/settings/NotificationSettings.tsx',
  'src/pages/super-admin/settings/PrivacySettings.tsx',
  'src/pages/super-admin/system-monitoring/PerformanceMonitorDashboard.tsx'
];

console.log('🔧 Fixing JSX closing tag errors...');

filesToFix.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fixJsxTags(fullPath);
  } else {
    console.log(`⚠️ File not found: ${file}`);
  }
});

console.log('✅ JSX tag fixes completed!');
