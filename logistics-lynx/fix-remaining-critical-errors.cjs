const fs = require('fs');
const path = require('path');

console.log('🚀 FIXING REMAINING CRITICAL ERRORS');

// Function to fix SecuritySettings.tsx by creating a proper formData structure
function fixSecuritySettings(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the formData structure with a proper one that includes all required properties
    const newFormDataStructure = `  const [formData, setFormData] = useState({
    general: { appName: 'Logistics Lynx', version: '1.0.0', environment: 'production' },
    database: { host: 'localhost', port: 5432, name: 'logistics_lynx', user: 'admin' },
    api: { baseUrl: 'http://localhost:3001', timeout: 30000, retries: 3 },
    security: { 
      maxLoginAttempts: 5, 
      lockoutDuration: 15, 
      passwordHistory: 5, 
      twoFactorEnabled: false, 
      sslEnabled: true,
      sessionTimeout: 30,
      ipWhitelist: ['192.168.1.1', '10.0.0.1'],
      ipBlacklist: ['192.168.1.100'],
      sslCertificate: '',
      sslKey: ''
    },
    notifications: { 
      emailNotifications: true, 
      smsNotifications: false, 
      pushNotifications: true, 
      webhookUrl: '', 
      slackWebhook: '', 
      teamsWebhook: '' 
    },
    storage: { 
      provider: 'local', 
      bucket: '', 
      region: '', 
      accessKey: '', 
      secretKey: '', 
      maxFileSize: 10485760, 
      cdnEnabled: false 
    },
    authentication: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true
      },
      lockoutPolicy: {
        maxAttempts: 5,
        lockoutDuration: 15
      }
    },
    accessControl: {
      ipWhitelist: ['192.168.1.1', '10.0.0.1'],
      ipBlacklist: ['192.168.1.100'],
      geoRestrictions: {
        enabled: false,
        allowedCountries: 'US,CA,GB',
        blockedCountries: 'CN,RU'
      }
    },
    auditLogging: {
      enabled: true,
      retentionDays: 90,
      logLevel: 'info',
      events: {
        login: true,
        logout: true,
        dataAccess: true,
        dataModification: true,
        systemChanges: true
      }
    },
    encryption: {
      dataAtRest: true,
      dataInTransit: true,
      algorithm: 'AES-256',
      keyRotation: 90
    },
    compliance: {
      gdpr: true,
      hipaa: false,
      soc2: true,
      pci: false
    }
  });`;

    // Find and replace the formData declaration
    const formDataRegex = /const \[formData, setFormData\] = useState\([^}]+}\);?/s;
    content = content.replace(formDataRegex, newFormDataStructure);

    // Add missing setShowIPModal state
    if (!content.includes('setShowIPModal')) {
      content = content.replace(
        /const \[formData, setFormData\] = useState\(/,
        'const [showIPModal, setShowIPModal] = useState(false);\n  const [formData, setFormData] = useState('
      );
    }

    // Fix map functions to include proper index parameter
    content = content.replace(
      /formData\.accessControl\.ipWhitelist\.map\(\(ip\) => \(/g,
      'formData.accessControl.ipWhitelist.map((ip, index) => ('
    );
    
    content = content.replace(
      /formData\.accessControl\.ipBlacklist\.map\(\(ip\) => \(/g,
      'formData.accessControl.ipBlacklist.map((ip, index) => ('
    );

    // Fix the filter functions to use proper index
    content = content.replace(
      /const newList = formData\.accessControl\.ipWhitelist\.filter\(\(_, i\) => i !== index\);/g,
      'const newList = formData.accessControl.ipWhitelist.filter((_, i) => i !== index);'
    );
    
    content = content.replace(
      /const newList = formData\.accessControl\.ipBlacklist\.filter\(\(_, i\) => i !== index\);/g,
      'const newList = formData.accessControl.ipBlacklist.filter((_, i) => i !== index);'
    );

    // Fix the enabled type casting
    content = content.replace(
      /checked={enabled}/g,
      'checked={enabled as boolean}'
    );

    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed SecuritySettings.tsx`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing SecuritySettings.tsx:`, error.message);
    return false;
  }
}

// Function to fix SystemSettings.tsx type issues
function fixSystemSettings(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix fromAddress to fromEmail
    content = content.replace(
      /fromAddress: 'noreply@logisticslynx.com',/g,
      'fromEmail: \'noreply@logisticslynx.com\','
    );

    // Fix security object to include missing properties
    content = content.replace(
      /security: {\s*maxLoginAttempts: 5,\s*lockoutDuration: 15,\s*passwordHistory: 5,\s*twoFactorEnabled: false,\s*sslEnabled: true,\s*sessionTimeout: 30\s*}/s,
      `security: {
        maxLoginAttempts: 5,
        lockoutDuration: 15,
        passwordHistory: 5,
        twoFactorEnabled: false,
        sslEnabled: true,
        sessionTimeout: 30,
        ipWhitelist: ['192.168.1.1', '10.0.0.1'],
        ipBlacklist: ['192.168.1.100'],
        sslCertificate: '',
        sslKey: ''
      }`
    );

    // Fix storage provider from 'aws' to 's3'
    content = content.replace(
      /provider: 'aws',/g,
      'provider: \'s3\','
    );

    // Remove unused setMode
    content = content.replace(
      /const \[mode, setMode\] = useState<'light' | 'dark'>\('light'\);/g,
      'const [mode] = useState<\'light\' | \'dark\'>(\'light\');'
    );

    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed SystemSettings.tsx`);
    return true;
  } catch (error) {
    console.error(`❌ Error fixing SystemSettings.tsx:`, error.message);
    return false;
  }
}

// Function to remove unused variables
function removeUnusedVariables(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove unused setApis
    if (content.includes('setApis') && !content.includes('setApis(')) {
      content = content.replace(/const \[apis, setApis\] = useState\(/g, 'const [apis] = useState(');
      modified = true;
    }

    // Remove unused setDatabases
    if (content.includes('setDatabases') && !content.includes('setDatabases(')) {
      content = content.replace(/const \[databases, setDatabases\] = useState\(/g, 'const [databases] = useState(');
      modified = true;
    }

    // Remove unused setServers
    if (content.includes('setServers') && !content.includes('setServers(')) {
      content = content.replace(/const \[servers, setServers\] = useState\(/g, 'const [servers] = useState(');
      modified = true;
    }

    // Remove unused variables from PerformanceMonitorDashboard
    if (filePath.includes('PerformanceMonitorDashboard.tsx')) {
      if (content.includes('isLoading') && !content.includes('isLoading &&')) {
        content = content.replace(/const \[isLoading, setIsLoading\] = useState\(false\);/g, 'const [isLoading] = useState(false);');
        modified = true;
      }
      
      if (content.includes('setSelectedTimeframe') && !content.includes('setSelectedTimeframe(')) {
        content = content.replace(/const \[selectedTimeframe, setSelectedTimeframe\] = useState\('24h'\);/g, 'const [selectedTimeframe] = useState(\'24h\');');
        modified = true;
      }
      
      if (content.includes('confidenceData') && !content.includes('confidenceData &&')) {
        content = content.replace(/const \[confidenceData, setConfidenceData\] = useState<ConfidenceData\[\]>\(\[\]\);/g, 'const [confidenceData] = useState<ConfidenceData[]>([]);');
        modified = true;
      }
      
      if (content.includes('retryHeatmapData') && !content.includes('retryHeatmapData &&')) {
        content = content.replace(/const \[retryHeatmapData, setRetryHeatmapData\] = useState<RetryHeatmapData\[\]>\(\[\]\);/g, 'const [retryHeatmapData] = useState<RetryHeatmapData[]>([]);');
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Removed unused variables from ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error removing unused variables from ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log('🔧 Applying critical fixes...');

// Fix SecuritySettings.tsx
const securitySettingsPath = 'src/pages/super-admin/settings/SecuritySettings.tsx';
if (fs.existsSync(securitySettingsPath)) {
  fixSecuritySettings(securitySettingsPath);
}

// Fix SystemSettings.tsx
const systemSettingsPath = 'src/pages/super-admin/settings/SystemSettings.tsx';
if (fs.existsSync(systemSettingsPath)) {
  fixSystemSettings(systemSettingsPath);
}

// Remove unused variables from specific files
const filesToFix = [
  'src/pages/super-admin/system-administration/APIManagement.tsx',
  'src/pages/super-admin/system-administration/DatabaseManagement.tsx',
  'src/pages/super-admin/system-administration/ServerMonitoring.tsx',
  'src/pages/super-admin/system-monitoring/PerformanceMonitorDashboard.tsx'
];

let fixedCount = 0;
for (const filePath of filesToFix) {
  if (fs.existsSync(filePath)) {
    if (removeUnusedVariables(filePath)) {
      fixedCount++;
    }
  }
}

console.log(`✅ Fixed ${fixedCount} additional files!`);
console.log('🎯 Critical errors should now be resolved!');

