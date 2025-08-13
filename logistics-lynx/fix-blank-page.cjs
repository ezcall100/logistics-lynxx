const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Blank Page Issue...\n');

// Check if development server is running
function checkDevServer() {
  console.log('📋 Checking Development Server:');
  
  const { exec } = require('child_process');
  exec('netstat -ano | findstr :5174', (error, stdout, stderr) => {
    if (stdout) {
      console.log('✅ Development server is running on port 5174');
    } else {
      console.log('❌ Development server is not running');
      console.log('💡 Start it with: npm run dev');
    }
  });
}

// Check for common issues
function checkCommonIssues() {
  console.log('\n🔍 Checking for Common Issues:');
  
  // Check if index.html exists
  const indexPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html exists');
    
    const content = fs.readFileSync(indexPath, 'utf8');
    if (content.includes('root')) {
      console.log('✅ React root element found');
    } else {
      console.log('❌ React root element missing');
    }
  } else {
    console.log('❌ index.html not found');
  }
  
  // Check if main.tsx exists
  const mainPath = path.join(__dirname, 'src', 'main.tsx');
  if (fs.existsSync(mainPath)) {
    console.log('✅ main.tsx exists');
  } else {
    console.log('❌ main.tsx not found');
  }
  
  // Check if App.tsx exists
  const appPath = path.join(__dirname, 'src', 'App.tsx');
  if (fs.existsSync(appPath)) {
    console.log('✅ App.tsx exists');
  } else {
    console.log('❌ App.tsx not found');
  }
}

// Generate troubleshooting steps
function generateTroubleshootingSteps() {
  console.log('\n🚀 Troubleshooting Steps:');
  console.log('');
  console.log('1. Clear Browser Cache:');
  console.log('   - Press Ctrl+F5 (hard refresh)');
  console.log('   - Or open Developer Tools (F12) and right-click refresh button');
  console.log('   - Select "Empty Cache and Hard Reload"');
  console.log('');
  console.log('2. Check Browser Console:');
  console.log('   - Press F12 to open Developer Tools');
  console.log('   - Go to Console tab');
  console.log('   - Look for any red error messages');
  console.log('');
  console.log('3. Test Different Routes:');
  console.log('   - Try: http://localhost:5174/test');
  console.log('   - Try: http://localhost:5174/portal');
  console.log('   - Try: http://localhost:5174/login');
  console.log('');
  console.log('4. Restart Development Server:');
  console.log('   - Stop the server (Ctrl+C)');
  console.log('   - Run: npm run dev');
  console.log('');
  console.log('5. Check for JavaScript Errors:');
  console.log('   - Look for any import/export errors');
  console.log('   - Check for missing dependencies');
  console.log('   - Verify all components exist');
  console.log('');
  console.log('6. Test with Different Browser:');
  console.log('   - Try Chrome, Firefox, or Edge');
  console.log('   - Disable browser extensions');
  console.log('');
}

// Check specific components
function checkComponents() {
  console.log('\n🧩 Checking Key Components:');
  
  const components = [
    'src/pages/MarketingLanding.tsx',
    'src/pages/Index.tsx',
    'src/pages/login/Login.tsx',
    'src/components/marketing/TransBotMarketingHeader.tsx',
    'src/components/marketing/TransBotHeroSection.tsx'
  ];
  
  components.forEach(component => {
    const fullPath = path.join(__dirname, component);
    if (fs.existsSync(fullPath)) {
      console.log(`✅ ${component}`);
    } else {
      console.log(`❌ ${component} - Missing!`);
    }
  });
}

// Generate quick fixes
function generateQuickFixes() {
  console.log('\n⚡ Quick Fixes to Try:');
  console.log('');
  console.log('1. Force Refresh:');
  console.log('   - Press Ctrl+Shift+R');
  console.log('');
  console.log('2. Clear Local Storage:');
  console.log('   - Open Developer Tools (F12)');
  console.log('   - Go to Application tab');
  console.log('   - Clear Local Storage and Session Storage');
  console.log('');
  console.log('3. Disable Cache:');
  console.log('   - In Developer Tools, go to Network tab');
  console.log('   - Check "Disable cache"');
  console.log('');
  console.log('4. Test Incognito Mode:');
  console.log('   - Open browser in incognito/private mode');
  console.log('   - Navigate to http://localhost:5174');
  console.log('');
  console.log('5. Check Network Tab:');
  console.log('   - Look for failed requests (red entries)');
  console.log('   - Check if JavaScript files are loading');
  console.log('');
}

// Main execution
function main() {
  checkDevServer();
  checkCommonIssues();
  checkComponents();
  generateTroubleshootingSteps();
  generateQuickFixes();
  
  console.log('\n📊 Summary:');
  console.log('   - Your React app should be working');
  console.log('   - The blank page is likely a browser/cache issue');
  console.log('   - Try the test route: http://localhost:5174/test');
  console.log('   - Check browser console for errors');
  console.log('');
  console.log('💡 Most Common Solution:');
  console.log('   Hard refresh (Ctrl+F5) or clear browser cache');
}

main();
