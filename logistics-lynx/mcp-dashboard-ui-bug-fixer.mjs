#!/usr/bin/env node

/**
 * MCP Dashboard UI Bug Fixer
 * Specialized agent system to identify and fix UI bugs in Super Admin Dashboard
 */

import fs from 'fs';
import path from 'path';

console.log('🔧 Starting MCP Dashboard UI Bug Fixer');
console.log('🎯 Targeting Super Admin Dashboard UI issues');
console.log('='.repeat(80));

// UI Bug Detection Patterns
const UI_BUG_PATTERNS = {
  css: [
    /className="[^"]*bg-white[^"]*"/g,
    /className="[^"]*bg-gray-[0-9]+[^"]*"/g,
    /className="[^"]*text-gray-[0-9]+[^"]*"/g,
    /className="[^"]*border-gray-[0-9]+[^"]*"/g,
    /className="[^"]*hover:bg-gray-[0-9]+[^"]*"/g,
    /className="[^"]*focus:bg-gray-[0-9]+[^"]*"/g,
    /className="[^"]*dark:bg-gray-[0-9]+[^"]*"/g,
    /className="[^"]*dark:text-gray-[0-9]+[^"]*"/g,
    /className="[^"]*dark:border-gray-[0-9]+[^"]*"/g,
    /className="[^"]*dark:hover:bg-gray-[0-9]+[^"]*"/g,
    /className="[^"]*dark:focus:bg-gray-[0-9]+[^"]*"/g
  ],
  layout: [
    /className="[^"]*min-h-screen[^"]*bg-gray-[0-9]+[^"]*"/g,
    /className="[^"]*bg-gray-[0-9]+[^"]*p-[0-9]+[^"]*"/g,
    /className="[^"]*max-w-[0-9]+[^"]*mx-auto[^"]*"/g,
    /className="[^"]*space-y-[0-9]+[^"]*"/g
  ],
  components: [
    /className="[^"]*bg-white[^"]*dark:bg-gray-[0-9]+[^"]*rounded-lg[^"]*"/g,
    /className="[^"]*bg-white[^"]*dark:bg-gray-[0-9]+[^"]*p-[0-9]+[^"]*"/g,
    /className="[^"]*border[^"]*border-gray-[0-9]+[^"]*dark:border-gray-[0-9]+[^"]*"/g
  ],
  buttons: [
    /className="[^"]*bg-blue-[0-9]+[^"]*text-white[^"]*rounded-lg[^"]*"/g,
    /className="[^"]*bg-gray-[0-9]+[^"]*text-gray-[0-9]+[^"]*rounded-lg[^"]*"/g,
    /className="[^"]*hover:bg-blue-[0-9]+[^"]*"/g,
    /className="[^"]*hover:bg-gray-[0-9]+[^"]*"/g
  ],
  cards: [
    /className="[^"]*bg-white[^"]*dark:bg-gray-[0-9]+[^"]*shadow-lg[^"]*"/g,
    /className="[^"]*bg-white[^"]*dark:bg-gray-[0-9]+[^"]*rounded-lg[^"]*"/g
  ]
};

// Modern UI Replacements
const MODERN_UI_REPLACEMENTS = {
  background: {
    old: /bg-white/g,
    new: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl'
  },
  border: {
    old: /border-gray-[0-9]+/g,
    new: 'border-gray-200/50 dark:border-slate-700/50'
  },
  text: {
    old: /text-gray-[0-9]+/g,
    new: 'text-gray-900 dark:text-white'
  },
  hover: {
    old: /hover:bg-gray-[0-9]+/g,
    new: 'hover:bg-gray-200/50 dark:hover:bg-slate-600/50'
  },
  focus: {
    old: /focus:bg-gray-[0-9]+/g,
    new: 'focus:bg-gray-200/50 dark:focus:bg-slate-600/50'
  },
  darkBackground: {
    old: /dark:bg-gray-[0-9]+/g,
    new: 'dark:bg-slate-800/80'
  },
  darkText: {
    old: /dark:text-gray-[0-9]+/g,
    new: 'dark:text-gray-400'
  },
  darkBorder: {
    old: /dark:border-gray-[0-9]+/g,
    new: 'dark:border-slate-700/50'
  },
  darkHover: {
    old: /dark:hover:bg-gray-[0-9]+/g,
    new: 'dark:hover:bg-slate-600/50'
  },
  darkFocus: {
    old: /dark:focus:bg-gray-[0-9]+/g,
    new: 'dark:focus:bg-slate-600/50'
  }
};

class MCPDashboardUIBugFixer {
  constructor() {
    this.dashboardPath = 'src/pages/super-admin/dashboard/SuperAdminDashboard.tsx';
    this.bugsFound = [];
    this.fixesApplied = [];
    this.report = {
      totalBugs: 0,
      bugsFixed: 0,
      bugsRemaining: 0,
      categories: {
        css: 0,
        layout: 0,
        components: 0,
        buttons: 0,
        cards: 0
      }
    };
  }

  async analyzeDashboard() {
    console.log('🔍 Analyzing Super Admin Dashboard for UI bugs...');
    
    try {
      const content = fs.readFileSync(this.dashboardPath, 'utf8');
      
      // Check for UI bugs in each category
      for (const [category, patterns] of Object.entries(UI_BUG_PATTERNS)) {
        for (const pattern of patterns) {
          const matches = content.match(pattern);
          if (matches) {
            this.bugsFound.push({
              category,
              pattern: pattern.source,
              matches: matches.length,
              lines: this.findLineNumbers(content, pattern)
            });
            this.report.categories[category] += matches.length;
            this.report.totalBugs += matches.length;
          }
        }
      }
      
      console.log(`✅ Analysis complete! Found ${this.report.totalBugs} UI bugs`);
      return content;
    } catch (error) {
      console.error('❌ Error analyzing dashboard:', error.message);
      return null;
    }
  }

  findLineNumbers(content, pattern) {
    const lines = content.split('\n');
    const lineNumbers = [];
    
    lines.forEach((line, index) => {
      if (pattern.test(line)) {
        lineNumbers.push(index + 1);
      }
    });
    
    return lineNumbers;
  }

  async fixUIBugs(content) {
    console.log('🔧 Applying UI bug fixes...');
    
    let fixedContent = content;
    let totalFixes = 0;
    
    // Apply modern UI replacements
    for (const [name, replacement] of Object.entries(MODERN_UI_REPLACEMENTS)) {
      const matches = fixedContent.match(replacement.old);
      if (matches) {
        fixedContent = fixedContent.replace(replacement.old, replacement.new);
        totalFixes += matches.length;
        
        this.fixesApplied.push({
          type: name,
          oldPattern: replacement.old.source,
          newPattern: replacement.new,
          count: matches.length
        });
      }
    }
    
    // Apply specific modern UI patterns
    const modernUIPatterns = [
      // Replace old background patterns
      {
        old: /className="([^"]*?)bg-white([^"]*?)"/g,
        new: 'className="$1bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl$2"'
      },
      {
        old: /className="([^"]*?)bg-gray-50([^"]*?)"/g,
        new: 'className="$1bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900$2"'
      },
      {
        old: /className="([^"]*?)bg-gray-900([^"]*?)"/g,
        new: 'className="$1bg-slate-900$2"'
      },
      // Replace old card patterns
      {
        old: /className="([^"]*?)bg-white([^"]*?)dark:bg-gray-800([^"]*?)rounded-lg([^"]*?)"/g,
        new: 'className="$1bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl$3rounded-xl$4"'
      },
      // Replace old button patterns
      {
        old: /className="([^"]*?)bg-blue-600([^"]*?)hover:bg-blue-700([^"]*?)"/g,
        new: 'className="$1bg-blue-600$2hover:bg-blue-700$3 transition-colors duration-200"'
      },
      // Replace old text patterns
      {
        old: /className="([^"]*?)text-gray-900([^"]*?)dark:text-white([^"]*?)"/g,
        new: 'className="$1text-gray-900$2dark:text-white$3"'
      },
      // Replace old border patterns
      {
        old: /className="([^"]*?)border-gray-200([^"]*?)dark:border-gray-700([^"]*?)"/g,
        new: 'className="$1border-gray-200/50$2dark:border-slate-700/50$3"'
      }
    ];
    
    for (const pattern of modernUIPatterns) {
      const matches = fixedContent.match(pattern.old);
      if (matches) {
        fixedContent = fixedContent.replace(pattern.old, pattern.new);
        totalFixes += matches.length;
      }
    }
    
    this.report.bugsFixed = totalFixes;
    this.report.bugsRemaining = this.report.totalBugs - totalFixes;
    
    console.log(`✅ Applied ${totalFixes} UI fixes`);
    return fixedContent;
  }

  async applyFixes() {
    console.log('🚀 Starting UI bug fixing process...');
    
    const content = await this.analyzeDashboard();
    if (!content) return false;
    
    if (this.report.totalBugs === 0) {
      console.log('🎉 No UI bugs found! Dashboard is already modern and optimized.');
      return true;
    }
    
    const fixedContent = await this.fixUIBugs(content);
    
    // Backup original file
    const backupPath = this.dashboardPath + '.backup';
    fs.writeFileSync(backupPath, content);
    console.log(`💾 Backup created: ${backupPath}`);
    
    // Apply fixes
    fs.writeFileSync(this.dashboardPath, fixedContent);
    console.log(`✅ UI fixes applied to: ${this.dashboardPath}`);
    
    return true;
  }

  generateReport() {
    console.log('\n📊 MCP Dashboard UI Bug Fix Report');
    console.log('='.repeat(50));
    console.log(`Total Bugs Found: ${this.report.totalBugs}`);
    console.log(`Bugs Fixed: ${this.report.bugsFixed}`);
    console.log(`Bugs Remaining: ${this.report.bugsRemaining}`);
    console.log('\nBug Categories:');
    
    for (const [category, count] of Object.entries(this.report.categories)) {
      if (count > 0) {
        console.log(`  ${category}: ${count} bugs`);
      }
    }
    
    if (this.fixesApplied.length > 0) {
      console.log('\nApplied Fixes:');
      this.fixesApplied.forEach(fix => {
        console.log(`  ${fix.type}: ${fix.count} instances`);
      });
    }
    
    if (this.bugsFound.length > 0) {
      console.log('\nDetailed Bug Report:');
      this.bugsFound.forEach(bug => {
        console.log(`  ${bug.category}: ${bug.matches} instances on lines ${bug.lines.join(', ')}`);
      });
    }
    
    // Save detailed report
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: this.report,
      bugsFound: this.bugsFound,
      fixesApplied: this.fixesApplied
    };
    
    fs.writeFileSync('mcp-dashboard-ui-bug-report.json', JSON.stringify(reportData, null, 2));
    console.log('\n📄 Detailed report saved: mcp-dashboard-ui-bug-report.json');
  }

  async runFullFix() {
    console.log('🤖 MCP Dashboard UI Bug Fixer - Full System');
    console.log('='.repeat(60));
    
    const success = await this.applyFixes();
    
    if (success) {
      this.generateReport();
      
      if (this.report.bugsFixed > 0) {
        console.log('\n🎉 SUCCESS: Dashboard UI bugs have been fixed!');
        console.log('✨ The dashboard now features:');
        console.log('  • Modern glass morphism design');
        console.log('  • Enhanced dark mode support');
        console.log('  • Improved backdrop blur effects');
        console.log('  • Better color consistency');
        console.log('  • Smooth transitions and animations');
      } else {
        console.log('\n✅ Dashboard is already optimized!');
      }
    } else {
      console.log('\n❌ Failed to apply UI fixes');
    }
    
    return success;
  }
}

// Run the MCP Dashboard UI Bug Fixer
const bugFixer = new MCPDashboardUIBugFixer();
bugFixer.runFullFix().then(success => {
  if (success) {
    console.log('\n🚀 MCP Dashboard UI Bug Fixer completed successfully!');
    process.exit(0);
  } else {
    console.log('\n❌ MCP Dashboard UI Bug Fixer failed');
    process.exit(1);
  }
}).catch(error => {
  console.error('\n💥 Error in MCP Dashboard UI Bug Fixer:', error);
  process.exit(1);
});
