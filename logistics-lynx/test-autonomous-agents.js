#!/usr/bin/env node

/**
 * 🧪 AUTONOMOUS AGENT TEST SCRIPT
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Autonomous Agent System...\n');

// Test 1: File system access
console.log('📁 Testing file system access...');
try {
  const testPath = path.join(process.cwd(), 'test-autonomous-write.txt');
  const testContent = 'Autonomous agent test content';
  
  fs.writeFileSync(testPath, testContent, 'utf8');
  const readContent = fs.readFileSync(testPath, 'utf8');
  
  if (readContent === testContent) {
    fs.unlinkSync(testPath);
    console.log('  ✅ File system access working');
  } else {
    console.log('  ❌ File system access failed');
  }
} catch (error) {
  console.log('  ❌ File system access failed:', error.message);
}

// Test 2: Check page files
console.log('\n📄 Testing page files...');
const pagesPath = path.join(process.cwd(), 'src', 'pages');
const requiredPages = ['UserManagement.tsx', 'SettingsDashboard.tsx', 'AnalyticsDashboard.tsx'];

if (fs.existsSync(pagesPath)) {
  const pageFiles = fs.readdirSync(pagesPath);
  const allPagesExist = requiredPages.every(page => pageFiles.includes(page));
  
  if (allPagesExist) {
    console.log('  ✅ All required pages exist');
  } else {
    console.log('  ❌ Some required pages missing');
  }
} else {
  console.log('  ❌ Pages directory not found');
}

// Test 3: Check agent files
console.log('\n🤖 Testing agent files...');
const agentFiles = [
  'src/agents/WebsitePageAgent.ts',
  'src/agents/TransBotAIWebsiteBuilder.ts',
  'src/components/autonomous/AutonomousAgentCenter.tsx'
];

const allAgentsExist = agentFiles.every(file => 
  fs.existsSync(path.join(process.cwd(), file))
);

if (allAgentsExist) {
  console.log('  ✅ All agent files exist');
} else {
  console.log('  ❌ Some agent files missing');
}

console.log('\n🎉 Test completed!');
console.log('\nNext steps:');
console.log('1. Visit http://localhost:3000/autonomous');
console.log('2. Click "📝 Create Test Page" to test page creation');
console.log('3. Click "🚀 GRANT FULL TMS AUTHORITY TO AI AGENTS" to activate all agents');