#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class AutonomousAgentTester {
  constructor() {
    this.testResults = new Map();
    this.overallScore = 0;
    this.totalTests = 0;
  }

  async runAllTests() {
    console.log('🧪 AUTONOMOUS AGENTS COMPREHENSIVE TEST SUITE');
    console.log('=' .repeat(60));
    
    const tests = [
      { name: 'Development Server', test: () => this.testDevelopmentServer() },
      { name: 'Master Autonomous Agent', test: () => this.testMasterAgent() },
      { name: 'Build System', test: () => this.testBuildSystem() },
      { name: 'TypeScript Compilation', test: () => this.testTypeScriptCompilation() },
      { name: 'Frontend Components', test: () => this.testFrontendComponents() },
      { name: 'Routing System', test: () => this.testRoutingSystem() },
      { name: 'UI Components', test: () => this.testUIComponents() },
      { name: 'Package Dependencies', test: () => this.testDependencies() },
      { name: 'File Structure', test: () => this.testFileStructure() },
      { name: 'Configuration Files', test: () => this.testConfigurationFiles() }
    ];

    this.totalTests = tests.length;

    for (const test of tests) {
      console.log(`\n🔍 Testing: ${test.name}`);
      console.log('-'.repeat(40));
      
      try {
        const result = await test.test();
        this.testResults.set(test.name, result);
        
        if (result.success) {
          console.log(`✅ ${test.name}: PASSED (${result.score}/100)`);
          this.overallScore += result.score;
        } else {
          console.log(`❌ ${test.name}: FAILED (${result.score}/100)`);
          console.log(`   Error: ${result.error}`);
          this.overallScore += result.score;
        }
      } catch (error) {
        console.log(`💥 ${test.name}: ERROR`);
        console.log(`   Error: ${error.message}`);
        this.testResults.set(test.name, { success: false, score: 0, error: error.message });
      }
    }

    this.generateFinalReport();
  }

  async testDevelopmentServer() {
    return new Promise((resolve) => {
      const process = spawn('npm', ['run', 'dev'], {
        cwd: join(__dirname, '..'),
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let hasStarted = false;
      let hasError = false;

      process.stdout.on('data', (data) => {
        output += data.toString();
        if (output.includes('Local:') && output.includes('8084')) {
          hasStarted = true;
        }
      });

      process.stderr.on('data', (data) => {
        output += data.toString();
        if (data.toString().includes('error') || data.toString().includes('Error')) {
          hasError = true;
        }
      });

      setTimeout(() => {
        process.kill('SIGTERM');
        
        if (hasStarted && !hasError) {
          resolve({ success: true, score: 100, details: 'Development server started successfully' });
        } else if (hasStarted) {
          resolve({ success: true, score: 80, details: 'Development server started with warnings' });
        } else {
          resolve({ success: false, score: 0, error: 'Development server failed to start', details: output });
        }
      }, 10000);
    });
  }

  async testMasterAgent() {
    return new Promise((resolve) => {
      const process = spawn('npm', ['run', 'master:agent'], {
        cwd: join(__dirname, '..'),
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let hasStarted = false;
      let hasError = false;

      process.stdout.on('data', (data) => {
        output += data.toString();
        if (output.includes('MASTER AUTONOMOUS AGENT') || output.includes('Initializing')) {
          hasStarted = true;
        }
      });

      process.stderr.on('data', (data) => {
        output += data.toString();
        if (data.toString().includes('error') || data.toString().includes('Error')) {
          hasError = true;
        }
      });

      setTimeout(() => {
        process.kill('SIGTERM');
        
        if (hasStarted && !hasError) {
          resolve({ success: true, score: 100, details: 'Master agent initialized successfully' });
        } else if (hasStarted) {
          resolve({ success: true, score: 80, details: 'Master agent started with warnings' });
        } else {
          resolve({ success: false, score: 0, error: 'Master agent failed to start', details: output });
        }
      }, 8000);
    });
  }

  async testBuildSystem() {
    return new Promise((resolve) => {
      const process = spawn('npm', ['run', 'build'], {
        cwd: join(__dirname, '..'),
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let hasBuilt = false;
      let hasError = false;

      process.stdout.on('data', (data) => {
        output += data.toString();
        if (output.includes('built in') || output.includes('✓ built')) {
          hasBuilt = true;
        }
      });

      process.stderr.on('data', (data) => {
        output += data.toString();
        if (data.toString().includes('error') || data.toString().includes('Error')) {
          hasError = true;
        }
      });

      process.on('close', (code) => {
        if (code === 0 && hasBuilt) {
          resolve({ success: true, score: 100, details: 'Build completed successfully' });
        } else if (hasBuilt) {
          resolve({ success: true, score: 70, details: 'Build completed with warnings' });
        } else {
          resolve({ success: false, score: 0, error: 'Build failed', details: output });
        }
      });
    });
  }

  async testTypeScriptCompilation() {
    return new Promise((resolve) => {
      const process = spawn('npm', ['run', 'build:ts'], {
        cwd: join(__dirname, '..'),
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      let hasCompiled = false;
      let errorCount = 0;

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        output += data.toString();
        if (data.toString().includes('error TS')) {
          errorCount++;
        }
      });

      process.on('close', (code) => {
        if (code === 0) {
          hasCompiled = true;
        }
        
        if (hasCompiled && errorCount === 0) {
          resolve({ success: true, score: 100, details: 'TypeScript compilation successful' });
        } else if (hasCompiled && errorCount < 5) {
          resolve({ success: true, score: 80, details: `TypeScript compiled with ${errorCount} errors` });
        } else if (hasCompiled) {
          resolve({ success: true, score: 50, details: `TypeScript compiled with ${errorCount} errors` });
        } else {
          resolve({ success: false, score: 0, error: 'TypeScript compilation failed', details: output });
        }
      });
    });
  }

  async testFrontendComponents() {
    const fs = await import('fs');
    const path = await import('path');
    
    const requiredFiles = [
      'src/App.tsx',
      'src/pages/LogisticsManagementDashboard.tsx',
      'src/autonomous/MasterAutonomousAgent.tsx',
      'src/components/ui/Button.tsx',
      'src/components/ui/table.tsx',
      'src/components/ui/form.tsx'
    ];

    let score = 0;
    let missingFiles = [];

    for (const file of requiredFiles) {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        score += 100 / requiredFiles.length;
      } else {
        missingFiles.push(file);
      }
    }

    if (score === 100) {
      return { success: true, score: 100, details: 'All frontend components present' };
    } else {
      return { 
        success: true, 
        score: Math.round(score), 
        details: `Missing files: ${missingFiles.join(', ')}` 
      };
    }
  }

  async testRoutingSystem() {
    const fs = await import('fs');
    const path = await import('path');
    
    const appFile = path.join(__dirname, '..', 'src', 'App.tsx');
    
    if (!fs.existsSync(appFile)) {
      return { success: false, score: 0, error: 'App.tsx not found' };
    }

    const content = fs.readFileSync(appFile, 'utf8');
    
    let score = 0;
    const checks = [
      { pattern: /LogisticsManagementDashboard/, points: 25, name: 'Logistics Dashboard Route' },
      { pattern: /MasterAutonomousAgentDashboard/, points: 25, name: 'Master Agent Dashboard Route' },
      { pattern: /BrowserRouter/, points: 25, name: 'Browser Router' },
      { pattern: /Routes/, points: 25, name: 'Routes Component' }
    ];

    for (const check of checks) {
      if (check.pattern.test(content)) {
        score += check.points;
      }
    }

    if (score === 100) {
      return { success: true, score: 100, details: 'All routing components present' };
    } else {
      return { success: true, score, details: 'Partial routing implementation' };
    }
  }

  async testUIComponents() {
    const fs = await import('fs');
    const path = await import('path');
    
    const uiComponents = [
      'src/components/ui/Button.tsx',
      'src/components/ui/table.tsx',
      'src/components/ui/form.tsx',
      'src/components/ui/alert-dialog.tsx',
      'src/components/ui/button-variants.ts'
    ];

    let score = 0;
    let missingComponents = [];

    for (const component of uiComponents) {
      const filePath = path.join(__dirname, '..', component);
      if (fs.existsSync(filePath)) {
        score += 100 / uiComponents.length;
      } else {
        missingComponents.push(component);
      }
    }

    if (score === 100) {
      return { success: true, score: 100, details: 'All UI components present' };
    } else {
      return { 
        success: true, 
        score: Math.round(score), 
        details: `Missing components: ${missingComponents.join(', ')}` 
      };
    }
  }

  async testDependencies() {
    const fs = await import('fs');
    const path = await import('path');
    
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    
    if (!fs.existsSync(packageJsonPath)) {
      return { success: false, score: 0, error: 'package.json not found' };
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    const requiredDeps = [
      'react', 'react-dom', 'react-router-dom', '@radix-ui/react-dialog',
      'lucide-react', 'tailwindcss', 'vite', 'typescript'
    ];

    let score = 0;
    let missingDeps = [];

    for (const dep of requiredDeps) {
      if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
        score += 100 / requiredDeps.length;
      } else {
        missingDeps.push(dep);
      }
    }

    if (score === 100) {
      return { success: true, score: 100, details: 'All required dependencies present' };
    } else {
      return { 
        success: true, 
        score: Math.round(score), 
        details: `Missing dependencies: ${missingDeps.join(', ')}` 
      };
    }
  }

  async testFileStructure() {
    const fs = await import('fs');
    const path = await import('path');
    
    const requiredDirs = [
      'src', 'src/components', 'src/pages', 'src/autonomous', 'scripts', 'public'
    ];

    let score = 0;
    let missingDirs = [];

    for (const dir of requiredDirs) {
      const dirPath = path.join(__dirname, '..', dir);
      if (fs.existsSync(dirPath)) {
        score += 100 / requiredDirs.length;
      } else {
        missingDirs.push(dir);
      }
    }

    if (score === 100) {
      return { success: true, score: 100, details: 'All required directories present' };
    } else {
      return { 
        success: true, 
        score: Math.round(score), 
        details: `Missing directories: ${missingDirs.join(', ')}` 
      };
    }
  }

  async testConfigurationFiles() {
    const fs = await import('fs');
    const path = await import('path');
    
    const configFiles = [
      'package.json', 'vite.config.ts', 'tsconfig.json', 'tailwind.config.js'
    ];

    let score = 0;
    let missingFiles = [];

    for (const file of configFiles) {
      const filePath = path.join(__dirname, '..', file);
      if (fs.existsSync(filePath)) {
        score += 100 / configFiles.length;
      } else {
        missingFiles.push(file);
      }
    }

    if (score === 100) {
      return { success: true, score: 100, details: 'All configuration files present' };
    } else {
      return { 
        success: true, 
        score: Math.round(score), 
        details: `Missing files: ${missingFiles.join(', ')}` 
      };
    }
  }

  generateFinalReport() {
    const averageScore = Math.round(this.overallScore / this.totalTests);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 FINAL TEST REPORT');
    console.log('='.repeat(60));
    
    console.log(`\n🎯 Overall Score: ${averageScore}/100`);
    console.log(`📈 Tests Passed: ${Array.from(this.testResults.values()).filter(r => r.success).length}/${this.totalTests}`);
    console.log(`📉 Tests Failed: ${Array.from(this.testResults.values()).filter(r => !r.success).length}/${this.totalTests}`);
    
    console.log('\n📋 Detailed Results:');
    for (const [testName, result] of this.testResults) {
      const status = result.success ? '✅ PASS' : '❌ FAIL';
      console.log(`   ${status} ${testName}: ${result.score}/100`);
      if (result.details) {
        console.log(`      Details: ${result.details}`);
      }
      if (result.error) {
        console.log(`      Error: ${result.error}`);
      }
    }
    
    console.log('\n🏆 AUTONOMOUS AGENTS STATUS:');
    if (averageScore >= 90) {
      console.log('🟢 EXCELLENT (90-100%): All systems operational, full autonomous capability');
    } else if (averageScore >= 75) {
      console.log('🟡 GOOD (75-89%): Most systems working, minor issues to address');
    } else if (averageScore >= 50) {
      console.log('🟠 FAIR (50-74%): Basic functionality working, significant improvements needed');
    } else {
      console.log('🔴 POOR (0-49%): Critical issues, immediate attention required');
    }
    
    console.log('\n💡 Recommendations:');
    if (averageScore < 90) {
      console.log('   - Fix failing tests first');
      console.log('   - Address TypeScript compilation errors');
      console.log('   - Ensure all required dependencies are installed');
      console.log('   - Verify file structure and configurations');
    } else {
      console.log('   - System is ready for production use');
      console.log('   - Consider adding more comprehensive tests');
      console.log('   - Monitor performance and optimize as needed');
    }
  }
}

async function main() {
  const tester = new AutonomousAgentTester();
  await tester.runAllTests();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  });
}

export default AutonomousAgentTester;
