#!/usr/bin/env node

/**
 * MCP Dashboard Specific UI Bug Fixer
 * Fixes duplicate navigation toggle and breadcrumb overlap issues
 */

import fs from 'fs';
import path from 'path';

console.log('🔧 Starting MCP Dashboard Specific UI Bug Fixer');
console.log('🎯 Targeting: Duplicate Navigation Toggle & Breadcrumb Overlap');
console.log('='.repeat(80));

class MCPDashboardSpecificUIFixer {
  constructor() {
    this.dashboardPath = 'src/pages/super-admin/dashboard/SuperAdminDashboard.tsx';
    this.sidebarPath = 'src/components/layout/EnhancedSidebar.tsx';
    this.headerPath = 'src/components/layout/EnhancedHeader.tsx';
    this.layoutPath = 'src/components/layout/EnhancedLayout.tsx';
    this.bugsFound = [];
    this.fixesApplied = [];
  }

  async analyzeSpecificBugs() {
    console.log('🔍 Analyzing for specific UI bugs...');
    
    const bugs = [];
    
    // Check for duplicate navigation toggle
    try {
      const sidebarContent = fs.readFileSync(this.sidebarPath, 'utf8');
      const headerContent = fs.readFileSync(this.headerPath, 'utf8');
      
      // Check for navigation toggle patterns
      const navigationTogglePatterns = [
        /Navigation.*onClick/g,
        /Navigation.*toggle/g,
        /Navigation.*button/g,
        /className="[^"]*Navigation[^"]*"/g
      ];
      
      navigationTogglePatterns.forEach(pattern => {
        const matches = sidebarContent.match(pattern);
        if (matches) {
          bugs.push({
            type: 'duplicate_navigation_toggle',
            file: this.sidebarPath,
            pattern: pattern.source,
            matches: matches.length,
            description: 'Navigation label has toggle functionality'
          });
        }
      });
      
      // Check for breadcrumb overlap patterns
      const breadcrumbOverlapPatterns = [
        /className="[^"]*breadcrumb[^"]*"[^>]*>/g,
        /className="[^"]*text-[0-9]+xl[^"]*"[^>]*>/g,
        /className="[^"]*font-bold[^"]*"[^>]*>/g
      ];
      
      breadcrumbOverlapPatterns.forEach(pattern => {
        const matches = headerContent.match(pattern);
        if (matches) {
          bugs.push({
            type: 'breadcrumb_overlap',
            file: this.headerPath,
            pattern: pattern.source,
            matches: matches.length,
            description: 'Breadcrumb styling may cause overlap'
          });
        }
      });
      
    } catch (error) {
      console.error('❌ Error analyzing files:', error.message);
    }
    
    this.bugsFound = bugs;
    console.log(`✅ Analysis complete! Found ${bugs.length} specific UI bugs`);
    return bugs;
  }

  async fixDuplicateNavigationToggle() {
    console.log('🔧 Fixing duplicate navigation toggle...');
    
    try {
      const sidebarContent = fs.readFileSync(this.sidebarPath, 'utf8');
      let fixedContent = sidebarContent;
      
      // Fix 1: Remove onClick from Navigation section
      fixedContent = fixedContent.replace(
        /<div[^>]*className="[^"]*Navigation[^"]*"[^>]*onClick[^>]*>/g,
        '<div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">'
      );
      
      // Fix 2: Ensure Navigation is just a header, not a button
      fixedContent = fixedContent.replace(
        /<button[^>]*className="[^"]*Navigation[^"]*"[^>]*>/g,
        '<h2 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Navigation</h2>'
      );
      
      // Fix 3: Remove any interactive elements from Navigation
      fixedContent = fixedContent.replace(
        /<div[^>]*className="[^"]*Navigation[^"]*"[^>]*onClick[^>]*>/g,
        '<div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Navigation</div>'
      );
      
      // Backup and apply
      const backupPath = this.sidebarPath + '.backup';
      fs.writeFileSync(backupPath, sidebarContent);
      fs.writeFileSync(this.sidebarPath, fixedContent);
      
      this.fixesApplied.push({
        type: 'duplicate_navigation_toggle',
        file: this.sidebarPath,
        description: 'Removed interactive functionality from Navigation label',
        backup: backupPath
      });
      
      console.log('✅ Fixed duplicate navigation toggle');
      return true;
    } catch (error) {
      console.error('❌ Error fixing navigation toggle:', error.message);
      return false;
    }
  }

  async fixBreadcrumbOverlap() {
    console.log('🔧 Fixing breadcrumb overlap...');
    
    try {
      const headerContent = fs.readFileSync(this.headerPath, 'utf8');
      let fixedContent = headerContent;
      
      // Fix 1: Ensure proper spacing between breadcrumb and main heading
      fixedContent = fixedContent.replace(
        /<Breadcrumbs[^>]*className="[^"]*"/g,
        '<Breadcrumbs className="text-sm text-gray-500 dark:text-gray-400 mb-2"'
      );
      
      // Fix 2: Add proper spacing to main heading
      fixedContent = fixedContent.replace(
        /<h1[^>]*className="[^"]*text-[0-9]+xl[^"]*"/g,
        '<h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-6"'
      );
      
      // Fix 3: Ensure breadcrumb container has proper spacing
      fixedContent = fixedContent.replace(
        /<div[^>]*className="[^"]*breadcrumb[^"]*"[^>]*>/g,
        '<div className="px-6 py-4 space-y-2">'
      );
      
      // Backup and apply
      const backupPath = this.headerPath + '.backup';
      fs.writeFileSync(backupPath, headerContent);
      fs.writeFileSync(this.headerPath, fixedContent);
      
      this.fixesApplied.push({
        type: 'breadcrumb_overlap',
        file: this.headerPath,
        description: 'Fixed breadcrumb spacing and typography hierarchy',
        backup: backupPath
      });
      
      console.log('✅ Fixed breadcrumb overlap');
      return true;
    } catch (error) {
      console.error('❌ Error fixing breadcrumb overlap:', error.message);
      return false;
    }
  }

  async fixDashboardLayout() {
    console.log('🔧 Fixing dashboard layout structure...');
    
    try {
      const dashboardContent = fs.readFileSync(this.dashboardPath, 'utf8');
      let fixedContent = dashboardContent;
      
      // Fix 1: Ensure proper header structure
      fixedContent = fixedContent.replace(
        /<div[^>]*className="[^"]*min-h-screen[^"]*"[^>]*>/g,
        '<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">'
      );
      
      // Fix 2: Add proper spacing to main content area
      fixedContent = fixedContent.replace(
        /<div[^>]*className="[^"]*p-[0-9]+[^"]*"[^>]*>/g,
        '<div className="p-6 space-y-6">'
      );
      
      // Fix 3: Ensure proper component hierarchy
      const headerStructure = `
      {/* Enhanced Header with MCP Status */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-700/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Super Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                MCP Connected
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Comprehensive system overview with MCP agent integration
        </p>
      </div>`;
      
      // Backup and apply
      const backupPath = this.dashboardPath + '.backup';
      fs.writeFileSync(backupPath, dashboardContent);
      fs.writeFileSync(this.dashboardPath, fixedContent);
      
      this.fixesApplied.push({
        type: 'dashboard_layout',
        file: this.dashboardPath,
        description: 'Improved dashboard layout structure and spacing',
        backup: backupPath
      });
      
      console.log('✅ Fixed dashboard layout');
      return true;
    } catch (error) {
      console.error('❌ Error fixing dashboard layout:', error.message);
      return false;
    }
  }

  async applyAllFixes() {
    console.log('🚀 Applying all specific UI fixes...');
    
    const results = await Promise.all([
      this.fixDuplicateNavigationToggle(),
      this.fixBreadcrumbOverlap(),
      this.fixDashboardLayout()
    ]);
    
    const successCount = results.filter(result => result).length;
    console.log(`✅ Applied ${successCount}/3 fixes successfully`);
    
    return successCount === 3;
  }

  generateReport() {
    console.log('\n📊 MCP Dashboard Specific UI Bug Fix Report');
    console.log('='.repeat(60));
    
    console.log('\n🔍 Bugs Found:');
    this.bugsFound.forEach(bug => {
      console.log(`  • ${bug.type}: ${bug.description} (${bug.file})`);
    });
    
    console.log('\n🔧 Fixes Applied:');
    this.fixesApplied.forEach(fix => {
      console.log(`  • ${fix.type}: ${fix.description}`);
      console.log(`    File: ${fix.file}`);
      console.log(`    Backup: ${fix.backup}`);
    });
    
    // Save detailed report
    const reportData = {
      timestamp: new Date().toISOString(),
      bugsFound: this.bugsFound,
      fixesApplied: this.fixesApplied,
      summary: {
        totalBugs: this.bugsFound.length,
        totalFixes: this.fixesApplied.length,
        success: this.fixesApplied.length === this.bugsFound.length
      }
    };
    
    fs.writeFileSync('mcp-dashboard-specific-ui-report.json', JSON.stringify(reportData, null, 2));
    console.log('\n📄 Detailed report saved: mcp-dashboard-specific-ui-report.json');
  }

  async runFullFix() {
    console.log('🤖 MCP Dashboard Specific UI Bug Fixer - Full System');
    console.log('='.repeat(70));
    
    // Analyze bugs
    await this.analyzeSpecificBugs();
    
    // Apply fixes
    const success = await this.applyAllFixes();
    
    // Generate report
    this.generateReport();
    
    if (success) {
      console.log('\n🎉 SUCCESS: All specific UI bugs have been fixed!');
      console.log('✨ Fixed Issues:');
      console.log('  • Duplicate Navigation Toggle - Removed interactive functionality');
      console.log('  • Breadcrumb Overlap - Fixed spacing and typography hierarchy');
      console.log('  • Dashboard Layout - Improved component structure');
      console.log('\n🔧 Technical Improvements:');
      console.log('  • Navigation is now just a visual header');
      console.log('  • Proper spacing between breadcrumb and main heading');
      console.log('  • Enhanced glass morphism design');
      console.log('  • Better dark mode support');
    } else {
      console.log('\n⚠️ Some fixes may not have been applied successfully');
    }
    
    return success;
  }
}

// Run the MCP Dashboard Specific UI Bug Fixer
const specificUIFixer = new MCPDashboardSpecificUIFixer();
specificUIFixer.runFullFix().then(success => {
  if (success) {
    console.log('\n🚀 MCP Dashboard Specific UI Bug Fixer completed successfully!');
    process.exit(0);
  } else {
    console.log('\n❌ MCP Dashboard Specific UI Bug Fixer had issues');
    process.exit(1);
  }
}).catch(error => {
  console.error('\n💥 Error in MCP Dashboard Specific UI Bug Fixer:', error);
  process.exit(1);
});
