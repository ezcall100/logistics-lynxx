const http = require('http');

console.log('🔍 Diagnosing React App Issues...\n');

// Test 1: Check if server is responding
function testServerResponse() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:3000', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Test 2: Check for common React app issues
function analyzeHTML(html) {
  const issues = [];
  
  // Check if root element exists
  if (!html.includes('id="root"')) {
    issues.push('❌ Missing root element (id="root")');
  } else {
    console.log('✅ Root element found');
  }
  
  // Check if React script is loaded
  if (!html.includes('main.tsx')) {
    issues.push('❌ Missing main.tsx script');
  } else {
    console.log('✅ main.tsx script found');
  }
  
  // Check if Vite client is loaded
  if (!html.includes('@vite/client')) {
    issues.push('❌ Missing Vite client script');
  } else {
    console.log('✅ Vite client script found');
  }
  
  // Check for React refresh
  if (!html.includes('react-refresh')) {
    issues.push('❌ Missing React refresh script');
  } else {
    console.log('✅ React refresh script found');
  }
  
  return issues;
}

// Test 3: Check for JavaScript errors by examining the main.tsx
function checkMainTSX() {
  const fs = require('fs');
  const path = require('path');
  
  try {
    const mainTSXPath = path.join(__dirname, 'src', 'main.tsx');
    const content = fs.readFileSync(mainTSXPath, 'utf8');
    
    console.log('✅ main.tsx file exists and readable');
    
    // Check for common issues
    if (!content.includes('ReactDOM.createRoot')) {
      console.log('⚠️  ReactDOM.createRoot not found in main.tsx');
    } else {
      console.log('✅ ReactDOM.createRoot found');
    }
    
    if (!content.includes('App')) {
      console.log('⚠️  App component import not found in main.tsx');
    } else {
      console.log('✅ App component import found');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Error reading main.tsx:', error.message);
    return false;
  }
}

// Test 4: Check for import issues
function checkImportIssues() {
  const fs = require('fs');
  const path = require('path');
  
  const criticalFiles = [
    'src/App.tsx',
    'src/contexts/AuthContext.tsx',
    'src/components/SuperAdmin.tsx',
    'src/components/layout/EnhancedLayout.tsx'
  ];
  
  console.log('\n🔍 Checking critical files...');
  
  criticalFiles.forEach(file => {
    try {
      const filePath = path.join(__dirname, file);
      const content = fs.readFileSync(filePath, 'utf8');
      console.log(`✅ ${file} exists and readable`);
      
      // Check for common import issues
      if (content.includes('import') && content.includes('from')) {
        const imports = content.match(/import.*from\s+['"]([^'"]+)['"]/g);
        if (imports) {
          imports.forEach(importStatement => {
            const match = importStatement.match(/from\s+['"]([^'"]+)['"]/);
            if (match) {
              const importPath = match[1];
              if (importPath.startsWith('@/')) {
                const resolvedPath = importPath.replace('@/', 'src/');
                const fullPath = path.join(__dirname, resolvedPath);
                if (!fs.existsSync(fullPath) && !fs.existsSync(fullPath + '.tsx') && !fs.existsSync(fullPath + '.ts')) {
                  console.log(`⚠️  Potential import issue: ${importPath} in ${file}`);
                }
              }
            }
          });
        }
      }
    } catch (error) {
      console.log(`❌ Error reading ${file}:`, error.message);
    }
  });
}

// Run all tests
async function runDiagnostics() {
  try {
    console.log('=== Test 1: Server Response ===');
    const result = await testServerResponse();
    console.log(`✅ Server responding with status: ${result.status}`);
    
    console.log('\n=== Test 2: HTML Analysis ===');
    const issues = analyzeHTML(result.data);
    if (issues.length > 0) {
      console.log('Issues found:');
      issues.forEach(issue => console.log(issue));
    } else {
      console.log('✅ No HTML issues detected');
    }
    
    console.log('\n=== Test 3: main.tsx Check ===');
    checkMainTSX();
    
    console.log('\n=== Test 4: Import Issues Check ===');
    checkImportIssues();
    
    console.log('\n=== Summary ===');
    console.log('If the server is running but the page is blank, the issue is likely:');
    console.log('1. JavaScript error in the browser console');
    console.log('2. Import path resolution issue');
    console.log('3. React component error preventing rendering');
    console.log('\nTo debug further:');
    console.log('1. Open browser developer tools (F12)');
    console.log('2. Check the Console tab for JavaScript errors');
    console.log('3. Check the Network tab for failed requests');
    console.log('4. Try accessing http://localhost:3000 in your browser');
    
  } catch (error) {
    console.log('❌ Diagnostic failed:', error.message);
  }
}

runDiagnostics();
