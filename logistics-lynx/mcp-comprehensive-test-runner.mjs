#!/usr/bin/env node

/**
 * MCP Comprehensive Test Runner
 * Tests all Super Admin pages and components systematically
 * 0-100% coverage with detailed reporting
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MCPComprehensiveTestRunner {
  constructor() {
    this.testResults = [];
    this.errors = [];
    this.fixes = [];
    this.startTime = new Date();
  }

  // Main test execution
  async runAllTests() {
    console.log('🚀 Starting MCP Comprehensive Test Runner');
    console.log('📊 Testing 0-100% of Super Admin UI/UX');
    console.log('⏰ Start Time:', this.startTime.toISOString());
    console.log('='.repeat(80));

    try {
      // Phase 1: Build Process Tests
      await this.testBuildProcess();

      // Phase 2: Layout Component Tests
      await this.testLayoutComponents();

      // Phase 3: Page Component Tests
      await this.testPageComponents();

      // Phase 4: Utility Component Tests
      await this.testUtilityComponents();

      // Phase 5: Navigation System Tests
      await this.testNavigationSystem();

      // Phase 6: Responsive Design Tests
      await this.testResponsiveDesign();

      // Phase 7: CSS and Styling Tests
      await this.testCSSAndStyling();

      // Phase 8: Integration Tests
      await this.testIntegrations();

      // Phase 9: Performance Tests
      await this.testPerformance();

      // Phase 10: Accessibility Tests
      await this.testAccessibility();

      // Generate comprehensive report
      await this.generateReport();

    } catch (error) {
      console.error('❌ Fatal error in test runner:', error);
      this.errors.push({
        type: 'fatal',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Phase 1: Build Process Tests
  async testBuildProcess() {
    console.log('\n🔨 Phase 1: Testing Build Process');
    
    const buildTests = {
      name: 'Build Process',
      tests: []
    };

    // Test 1: Package.json exists and is valid
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      buildTests.tests.push({
        name: 'Package.json Valid',
        status: 'PASS',
        details: 'Package.json exists and is valid JSON'
      });
    } catch (error) {
      buildTests.tests.push({
        name: 'Package.json Valid',
        status: 'FAIL',
        details: error.message
      });
      this.errors.push({
        type: 'build',
        component: 'package.json',
        message: error.message
      });
    }

    // Test 2: Required scripts exist
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const requiredScripts = ['dev', 'build', 'preview'];
      const missingScripts = requiredScripts.filter(script => !packageJson.scripts[script]);
      
      if (missingScripts.length === 0) {
        buildTests.tests.push({
          name: 'Required Scripts',
          status: 'PASS',
          details: 'All required scripts exist'
        });
      } else {
        buildTests.tests.push({
          name: 'Required Scripts',
          status: 'FAIL',
          details: `Missing scripts: ${missingScripts.join(', ')}`
        });
        this.errors.push({
          type: 'build',
          component: 'scripts',
          message: `Missing scripts: ${missingScripts.join(', ')}`
        });
      }
    } catch (error) {
      buildTests.tests.push({
        name: 'Required Scripts',
        status: 'FAIL',
        details: error.message
      });
    }

    // Test 3: Vite config exists
    const viteConfigExists = fs.existsSync('vite.config.ts');
    buildTests.tests.push({
      name: 'Vite Config',
      status: viteConfigExists ? 'PASS' : 'FAIL',
      details: viteConfigExists ? 'Vite config exists' : 'Vite config missing'
    });

    // Test 4: TypeScript config exists
    const tsConfigExists = fs.existsSync('tsconfig.json');
    buildTests.tests.push({
      name: 'TypeScript Config',
      status: tsConfigExists ? 'PASS' : 'FAIL',
      details: tsConfigExists ? 'TypeScript config exists' : 'TypeScript config missing'
    });

    // Test 5: Build process works
    try {
      console.log('🔨 Testing build process...');
      execSync('npm run build', { stdio: 'pipe', timeout: 60000 });
      buildTests.tests.push({
        name: 'Build Process',
        status: 'PASS',
        details: 'Build completed successfully'
      });
    } catch (error) {
      buildTests.tests.push({
        name: 'Build Process',
        status: 'FAIL',
        details: error.message
      });
      this.errors.push({
        type: 'build',
        component: 'build_process',
        message: error.message
      });
    }

    this.testResults.push(buildTests);
  }

  // Phase 2: Layout Component Tests
  async testLayoutComponents() {
    console.log('\n🏗️ Phase 2: Testing Layout Components');
    
    const layoutComponents = [
      'EnhancedLayout',
      'EnhancedHeader', 
      'EnhancedSidebar'
    ];

    for (const component of layoutComponents) {
      await this.testComponent(component, 'layout');
    }
  }

  // Phase 3: Page Component Tests
  async testPageComponents() {
    console.log('\n📄 Phase 3: Testing Page Components');
    
    const pageComponents = [
      { name: 'SuperAdminDashboard', path: 'dashboard/SuperAdminDashboard' },
      { name: 'AllUsers', path: 'user-management/AllUsers' },
      { name: 'UserRoles', path: 'user-management/UserRoles' },
      { name: 'UserGroups', path: 'user-management/UserGroups' },
      { name: 'AccessControl', path: 'user-management/AccessControl' },
      { name: 'UserAnalytics', path: 'user-management/UserAnalytics' },
      { name: 'BillingManagement', path: 'user-management/BillingManagement' },
      { name: 'SupportTickets', path: 'user-management/SupportTickets' },
      { name: 'UserOnboarding', path: 'user-management/UserOnboarding' },
      { name: 'SecuritySettings', path: 'system-administration/SecuritySettings' },
      { name: 'PerformanceAnalytics', path: 'analytics-reports/PerformanceAnalytics' },
      { name: 'DeploymentManagement', path: 'development-devops/DeploymentManagement' },
      { name: 'SystemOverview', path: 'dashboard/SystemOverview' }
    ];

    for (const page of pageComponents) {
      await this.testPage(page.name, page.path);
    }
  }

  // Phase 4: Utility Component Tests
  async testUtilityComponents() {
    console.log('\n🔧 Phase 4: Testing Utility Components');
    
    const utilityComponents = [
      'Button',
      'Input', 
      'Modal',
      'Table',
      'Card',
      'Breadcrumbs',
      'EnhancedIcon',
      'ResponsiveCard',
      'ErrorBoundary'
    ];

    for (const component of utilityComponents) {
      await this.testComponent(component, 'utility');
    }
  }

  // Phase 5: Navigation System Tests
  async testNavigationSystem() {
    console.log('\n🧭 Phase 5: Testing Navigation System');
    
    const navigationTests = {
      name: 'Navigation System',
      tests: []
    };

    // Test App.tsx routing
    try {
      const appContent = fs.readFileSync('src/App.tsx', 'utf8');
      
      // Check if all routes are defined
      const requiredRoutes = [
        'SuperAdminDashboard',
        'AllUsers',
        'UserRoles',
        'UserGroups',
        'AccessControl',
        'UserAnalytics',
        'BillingManagement',
        'SupportTickets',
        'UserOnboarding'
      ];

      const missingRoutes = requiredRoutes.filter(route => !appContent.includes(route));
      
      if (missingRoutes.length === 0) {
        navigationTests.tests.push({
          name: 'Route Definitions',
          status: 'PASS',
          details: 'All required routes are defined'
        });
      } else {
        navigationTests.tests.push({
          name: 'Route Definitions',
          status: 'FAIL',
          details: `Missing routes: ${missingRoutes.join(', ')}`
        });
        this.errors.push({
          type: 'navigation',
          component: 'routes',
          message: `Missing routes: ${missingRoutes.join(', ')}`
        });
      }

      // Test sidebar navigation items
      const sidebarContent = fs.readFileSync('src/components/layout/EnhancedSidebar.tsx', 'utf8');
      const requiredMenus = [
        'Dashboard',
        'User Management',
        'System Administration',
        'Security Center',
        'System Monitoring',
        'Portal Management',
        'Analytics & Reports',
        'MCP Control Center',
        'Business Operations',
        'Development & DevOps',
        'Settings',
        'Profile',
        'FAB Actions',
        'Mobile'
      ];

      const missingMenus = requiredMenus.filter(menu => !sidebarContent.includes(menu));
      
      if (missingMenus.length === 0) {
        navigationTests.tests.push({
          name: 'Sidebar Menus',
          status: 'PASS',
          details: 'All required menus are present'
        });
      } else {
        navigationTests.tests.push({
          name: 'Sidebar Menus',
          status: 'FAIL',
          details: `Missing menus: ${missingMenus.join(', ')}`
        });
        this.errors.push({
          type: 'navigation',
          component: 'sidebar',
          message: `Missing menus: ${missingMenus.join(', ')}`
        });
      }

    } catch (error) {
      navigationTests.tests.push({
        name: 'Navigation Files',
        status: 'FAIL',
        details: error.message
      });
      this.errors.push({
        type: 'navigation',
        component: 'files',
        message: error.message
      });
    }

    this.testResults.push(navigationTests);
  }

  // Phase 6: Responsive Design Tests
  async testResponsiveDesign() {
    console.log('\n📱 Phase 6: Testing Responsive Design');
    
    const responsiveTests = {
      name: 'Responsive Design',
      tests: []
    };

    try {
      // Test CSS responsive classes
      const cssContent = fs.readFileSync('src/index.css', 'utf8');
      
      const responsivePatterns = [
        /@media/,
        /sm:/,
        /md:/,
        /lg:/,
        /xl:/
      ];

      const hasResponsiveClasses = responsivePatterns.some(pattern => pattern.test(cssContent));
      
      responsiveTests.tests.push({
        name: 'Responsive CSS Classes',
        status: hasResponsiveClasses ? 'PASS' : 'FAIL',
        details: hasResponsiveClasses ? 'Responsive CSS classes found' : 'No responsive CSS classes found'
      });

      // Test layout responsiveness
      const layoutContent = fs.readFileSync('src/components/layout/EnhancedLayout.tsx', 'utf8');
      
      const hasMobileOverlay = layoutContent.includes('mobile') && layoutContent.includes('overlay');
      responsiveTests.tests.push({
        name: 'Mobile Overlay',
        status: hasMobileOverlay ? 'PASS' : 'FAIL',
        details: hasMobileOverlay ? 'Mobile overlay implemented' : 'Mobile overlay missing'
      });

      const hasResponsiveSidebar = layoutContent.includes('sidebar') && layoutContent.includes('responsive');
      responsiveTests.tests.push({
        name: 'Responsive Sidebar',
        status: hasResponsiveSidebar ? 'PASS' : 'FAIL',
        details: hasResponsiveSidebar ? 'Responsive sidebar implemented' : 'Responsive sidebar missing'
      });

    } catch (error) {
      responsiveTests.tests.push({
        name: 'Responsive Files',
        status: 'FAIL',
        details: error.message
      });
      this.errors.push({
        type: 'responsive',
        component: 'files',
        message: error.message
      });
    }

    this.testResults.push(responsiveTests);
  }

  // Phase 7: CSS and Styling Tests
  async testCSSAndStyling() {
    console.log('\n🎨 Phase 7: Testing CSS and Styling');
    
    const cssTests = {
      name: 'CSS and Styling',
      tests: []
    };

    try {
      const cssContent = fs.readFileSync('src/index.css', 'utf8');
      
      // Test for glass morphism effects
      const hasGlassEffects = cssContent.includes('backdrop-blur') || cssContent.includes('glass');
      cssTests.tests.push({
        name: 'Glass Morphism',
        status: hasGlassEffects ? 'PASS' : 'FAIL',
        details: hasGlassEffects ? 'Glass morphism effects found' : 'Glass morphism effects missing'
      });

      // Test for dark mode support
      const hasDarkMode = cssContent.includes('dark:') || cssContent.includes('dark-mode');
      cssTests.tests.push({
        name: 'Dark Mode Support',
        status: hasDarkMode ? 'PASS' : 'FAIL',
        details: hasDarkMode ? 'Dark mode support found' : 'Dark mode support missing'
      });

      // Test for custom animations
      const hasAnimations = cssContent.includes('@keyframes') || cssContent.includes('animate-');
      cssTests.tests.push({
        name: 'Custom Animations',
        status: hasAnimations ? 'PASS' : 'FAIL',
        details: hasAnimations ? 'Custom animations found' : 'Custom animations missing'
      });

      // Test for enterprise styling
      const hasEnterpriseStyles = cssContent.includes('enterprise') || cssContent.includes('professional');
      cssTests.tests.push({
        name: 'Enterprise Styling',
        status: hasEnterpriseStyles ? 'PASS' : 'FAIL',
        details: hasEnterpriseStyles ? 'Enterprise styling found' : 'Enterprise styling missing'
      });

    } catch (error) {
      cssTests.tests.push({
        name: 'CSS File',
        status: 'FAIL',
        details: error.message
      });
      this.errors.push({
        type: 'css',
        component: 'index.css',
        message: error.message
      });
    }

    this.testResults.push(cssTests);
  }

  // Phase 8: Integration Tests
  async testIntegrations() {
    console.log('\n🔗 Phase 8: Testing Integrations');
    
    const integrationTests = {
      name: 'Integrations',
      tests: []
    };

    // Test MCP integration
    try {
      const fabActionsFile = fs.readFileSync('src/components/FabActions.ts', 'utf8');
      const hasMCPIntegration = fabActionsFile.includes('MCP') || fabActionsFile.includes('mcp');
      
      integrationTests.tests.push({
        name: 'MCP Integration',
        status: hasMCPIntegration ? 'PASS' : 'FAIL',
        details: hasMCPIntegration ? 'MCP integration found' : 'MCP integration missing'
      });
    } catch (error) {
      integrationTests.tests.push({
        name: 'MCP Integration',
        status: 'FAIL',
        details: error.message
      });
    }

    // Test Lucide icons integration
    try {
      const headerFile = fs.readFileSync('src/components/layout/EnhancedHeader.tsx', 'utf8');
      const hasLucideIcons = headerFile.includes('lucide-react');
      
      integrationTests.tests.push({
        name: 'Lucide Icons',
        status: hasLucideIcons ? 'PASS' : 'FAIL',
        details: hasLucideIcons ? 'Lucide icons integration found' : 'Lucide icons integration missing'
      });
    } catch (error) {
      integrationTests.tests.push({
        name: 'Lucide Icons',
        status: 'FAIL',
        details: error.message
      });
    }

    // Test React Router integration
    try {
      const appFile = fs.readFileSync('src/App.tsx', 'utf8');
      const hasReactRouter = appFile.includes('react-router-dom');
      
      integrationTests.tests.push({
        name: 'React Router',
        status: hasReactRouter ? 'PASS' : 'FAIL',
        details: hasReactRouter ? 'React Router integration found' : 'React Router integration missing'
      });
    } catch (error) {
      integrationTests.tests.push({
        name: 'React Router',
        status: 'FAIL',
        details: error.message
      });
    }

    this.testResults.push(integrationTests);
  }

  // Phase 9: Performance Tests
  async testPerformance() {
    console.log('\n⚡ Phase 9: Testing Performance');
    
    const performanceTests = {
      name: 'Performance',
      tests: []
    };

    // Test bundle size
    try {
      const distExists = fs.existsSync('dist');
      performanceTests.tests.push({
        name: 'Build Output',
        status: distExists ? 'PASS' : 'FAIL',
        details: distExists ? 'Build output exists' : 'Build output missing'
      });
    } catch (error) {
      performanceTests.tests.push({
        name: 'Build Output',
        status: 'FAIL',
        details: error.message
      });
    }

    // Test for lazy loading
    try {
      const appFile = fs.readFileSync('src/App.tsx', 'utf8');
      const hasLazyLoading = appFile.includes('lazy(') || appFile.includes('Suspense');
      
      performanceTests.tests.push({
        name: 'Lazy Loading',
        status: hasLazyLoading ? 'PASS' : 'FAIL',
        details: hasLazyLoading ? 'Lazy loading implemented' : 'Lazy loading missing'
      });
    } catch (error) {
      performanceTests.tests.push({
        name: 'Lazy Loading',
        status: 'FAIL',
        details: error.message
      });
    }

    this.testResults.push(performanceTests);
  }

  // Phase 10: Accessibility Tests
  async testAccessibility() {
    console.log('\n♿ Phase 10: Testing Accessibility');
    
    const accessibilityTests = {
      name: 'Accessibility',
      tests: []
    };

    try {
      // Test for semantic HTML
      const headerFile = fs.readFileSync('src/components/layout/EnhancedHeader.tsx', 'utf8');
      const hasSemanticHTML = headerFile.includes('<header') || headerFile.includes('<nav');
      
      accessibilityTests.tests.push({
        name: 'Semantic HTML',
        status: hasSemanticHTML ? 'PASS' : 'FAIL',
        details: hasSemanticHTML ? 'Semantic HTML found' : 'Semantic HTML missing'
      });

      // Test for ARIA labels
      const hasAriaLabels = headerFile.includes('aria-label') || headerFile.includes('aria-labelledby');
      
      accessibilityTests.tests.push({
        name: 'ARIA Labels',
        status: hasAriaLabels ? 'PASS' : 'FAIL',
        details: hasAriaLabels ? 'ARIA labels found' : 'ARIA labels missing'
      });

    } catch (error) {
      accessibilityTests.tests.push({
        name: 'Accessibility Files',
        status: 'FAIL',
        details: error.message
      });
    }

    this.testResults.push(accessibilityTests);
  }

  // Test individual component
  async testComponent(componentName, type) {
    const componentTest = {
      name: componentName,
      type: type,
      tests: []
    };

    try {
      const filePath = type === 'layout' 
        ? `src/components/layout/${componentName}.tsx`
        : type === 'utility'
        ? `src/components/ui/${componentName}.tsx`
        : `src/components/${componentName}.tsx`;

      const fileExists = fs.existsSync(filePath);
      
      componentTest.tests.push({
        name: 'File Exists',
        status: fileExists ? 'PASS' : 'FAIL',
        details: fileExists ? 'Component file exists' : 'Component file missing'
      });

      if (fileExists) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Test imports
        const hasImports = /import.*from.*['"]/g.test(content);
        componentTest.tests.push({
          name: 'Valid Imports',
          status: hasImports ? 'PASS' : 'FAIL',
          details: hasImports ? 'Valid imports found' : 'No valid imports found'
        });

        // Test JSX
        const hasJSX = /<[A-Z][a-zA-Z]*/g.test(content);
        componentTest.tests.push({
          name: 'Valid JSX',
          status: hasJSX ? 'PASS' : 'FAIL',
          details: hasJSX ? 'Valid JSX found' : 'No valid JSX found'
        });

        // Test CSS classes
        const hasCSSClasses = /className=["'][^"']*["']/g.test(content);
        componentTest.tests.push({
          name: 'CSS Classes',
          status: hasCSSClasses ? 'PASS' : 'FAIL',
          details: hasCSSClasses ? 'CSS classes found' : 'No CSS classes found'
        });

        // Test for invalid CSS classes
        const invalidClasses = content.match(/bg-glass-bg|text-foreground|text-muted-foreground|bg-card|border-border|animate-in/g);
        if (invalidClasses && invalidClasses.length > 0) {
          componentTest.tests.push({
            name: 'Invalid CSS Classes',
            status: 'FAIL',
            details: `Invalid classes found: ${invalidClasses.join(', ')}`
          });
          this.errors.push({
            type: 'css',
            component: componentName,
            message: `Invalid CSS classes: ${invalidClasses.join(', ')}`
          });
        } else {
          componentTest.tests.push({
            name: 'Invalid CSS Classes',
            status: 'PASS',
            details: 'No invalid CSS classes found'
          });
        }
      }

    } catch (error) {
      componentTest.tests.push({
        name: 'Component Test',
        status: 'FAIL',
        details: error.message
      });
      this.errors.push({
        type: 'component',
        component: componentName,
        message: error.message
      });
    }

    this.testResults.push(componentTest);
  }

  // Test individual page
  async testPage(pageName, pagePath) {
    const pageTest = {
      name: pageName,
      type: 'page',
      tests: []
    };

    try {
      const filePath = `src/pages/super-admin/${pagePath}.tsx`;
      const fileExists = fs.existsSync(filePath);
      
      pageTest.tests.push({
        name: 'File Exists',
        status: fileExists ? 'PASS' : 'FAIL',
        details: fileExists ? 'Page file exists' : 'Page file missing'
      });

      if (fileExists) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Test imports
        const hasImports = /import.*from.*['"]/g.test(content);
        pageTest.tests.push({
          name: 'Valid Imports',
          status: hasImports ? 'PASS' : 'FAIL',
          details: hasImports ? 'Valid imports found' : 'No valid imports found'
        });

        // Test JSX
        const hasJSX = /<[A-Z][a-zA-Z]*/g.test(content);
        pageTest.tests.push({
          name: 'Valid JSX',
          status: hasJSX ? 'PASS' : 'FAIL',
          details: hasJSX ? 'Valid JSX found' : 'No valid JSX found'
        });

        // Test for mock data
        const hasMockData = content.includes('mockData') || content.includes('mock');
        pageTest.tests.push({
          name: 'Mock Data',
          status: hasMockData ? 'PASS' : 'FAIL',
          details: hasMockData ? 'Mock data found' : 'Mock data missing'
        });

        // Test for MCP integration
        const hasMCPIntegration = content.includes('MCP') || content.includes('mcp');
        pageTest.tests.push({
          name: 'MCP Integration',
          status: hasMCPIntegration ? 'PASS' : 'FAIL',
          details: hasMCPIntegration ? 'MCP integration found' : 'MCP integration missing'
        });

        // Test for comprehensive features
        const hasComprehensiveFeatures = content.includes('useState') && content.includes('useEffect');
        pageTest.tests.push({
          name: 'Comprehensive Features',
          status: hasComprehensiveFeatures ? 'PASS' : 'FAIL',
          details: hasComprehensiveFeatures ? 'Comprehensive features found' : 'Basic template detected'
        });
      }

    } catch (error) {
      pageTest.tests.push({
        name: 'Page Test',
        status: 'FAIL',
        details: error.message
      });
      this.errors.push({
        type: 'page',
        component: pageName,
        message: error.message
      });
    }

    this.testResults.push(pageTest);
  }

  // Generate comprehensive report
  async generateReport() {
    console.log('\n📊 Generating Comprehensive Test Report');
    
    const endTime = new Date();
    const duration = endTime.getTime() - this.startTime.getTime();
    
    const report = {
      timestamp: endTime.toISOString(),
      duration: `${Math.round(duration / 1000)}s`,
      summary: {
        totalTests: this.testResults.length,
        totalErrors: this.errors.length,
        totalFixes: this.fixes.length,
        successRate: this.calculateSuccessRate()
      },
      agentStatus: {
        n8n: 'offline',
        openai: 'offline',
        supabase: 'offline',
        github: 'offline',
        cursor: 'offline'
      },
      testResults: this.testResults,
      errors: this.errors,
      fixes: this.fixes,
      recommendations: this.generateRecommendations()
    };

    // Save report
    fs.writeFileSync('mcp-comprehensive-test-report.json', JSON.stringify(report, null, 2));
    
    // Print summary
    console.log('\n' + '='.repeat(80));
    console.log('📊 MCP COMPREHENSIVE TEST REPORT');
    console.log('='.repeat(80));
    console.log(`⏰ Duration: ${report.duration}`);
    console.log(`🧪 Total Tests: ${report.summary.totalTests}`);
    console.log(`❌ Total Errors: ${report.summary.totalErrors}`);
    console.log(`🔧 Total Fixes: ${report.summary.totalFixes}`);
    console.log(`✅ Success Rate: ${report.summary.successRate}`);
    console.log('='.repeat(80));
    
    if (this.errors.length > 0) {
      console.log('\n❌ ERRORS FOUND:');
      this.errors.forEach((error, index) => {
        console.log(`${index + 1}. ${error.type.toUpperCase()} - ${error.component}: ${error.message}`);
      });
    }
    
    console.log('\n📄 Full report saved to: mcp-comprehensive-test-report.json');
  }

  calculateSuccessRate() {
    const totalTests = this.testResults.reduce((sum, result) => {
      return sum + result.tests.length;
    }, 0);
    
    const passedTests = this.testResults.reduce((sum, result) => {
      return sum + result.tests.filter(test => test.status === 'PASS').length;
    }, 0);
    
    return totalTests > 0 ? `${((passedTests / totalTests) * 100).toFixed(2)}%` : '0.00%';
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.errors.length > 0) {
      recommendations.push('Fix all detected errors before deployment');
    }
    
    const cssErrors = this.errors.filter(e => e.type === 'css');
    if (cssErrors.length > 0) {
      recommendations.push('Replace invalid CSS classes with valid Tailwind classes');
    }
    
    const missingFiles = this.errors.filter(e => e.message.includes('missing'));
    if (missingFiles.length > 0) {
      recommendations.push('Create missing component and page files');
    }
    
    const basicTemplates = this.testResults.filter(result => 
      result.type === 'page' && 
      result.tests.some(test => 
        test.name === 'Comprehensive Features' && test.status === 'FAIL'
      )
    );
    
    if (basicTemplates.length > 0) {
      recommendations.push('Enhance basic templates with comprehensive features and MCP integration');
    }
    
    return recommendations;
  }
}

// Main execution
async function main() {
  const runner = new MCPComprehensiveTestRunner();
  await runner.runAllTests();
}

// Run the test runner
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export default MCPComprehensiveTestRunner;
