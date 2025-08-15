#!/usr/bin/env node

/**
 * 🔍 Portal Check Script
 * Validates all 20 portals from the registry are properly configured
 */

import { PORTALS, DEPRECATED_ROUTES } from '../src/portals/registry.ts';
import fs from 'fs';
import path from 'path';

class PortalChecker {
  constructor() {
    this.results = {
      total: PORTALS.length,
      passed: 0,
      failed: 0,
      issues: []
    };
  }

  checkPortalFile(portalPath) {
    const fullPath = path.join(process.cwd(), 'src', 'pages', portalPath.replace('/', ''), 'index.tsx');
    return fs.existsSync(fullPath);
  }

  checkPortalComponent(portalPath) {
    const fullPath = path.join(process.cwd(), 'src', 'components', portalPath.replace('/', ''), 'index.tsx');
    return fs.existsSync(fullPath);
  }

  validatePortal(portal) {
    const issues = [];
    
    // Check if portal page exists
    if (!this.checkPortalFile(portal.path)) {
      issues.push(`Missing page file: src/pages${portal.path}/index.tsx`);
    }
    
    // Check if portal component exists
    if (!this.checkPortalComponent(portal.path)) {
      issues.push(`Missing component file: src/components${portal.path}/index.tsx`);
    }
    
    // Validate portal configuration
    if (!portal.title || portal.title.trim() === '') {
      issues.push('Missing or empty title');
    }
    
    if (!portal.description || portal.description.trim() === '') {
      issues.push('Missing or empty description');
    }
    
    if (!portal.roles || portal.roles.length === 0) {
      issues.push('No roles configured');
    }
    
    if (!portal.featureFlag || portal.featureFlag.trim() === '') {
      issues.push('Missing feature flag');
    }
    
    if (!portal.icon || portal.icon.trim() === '') {
      issues.push('Missing icon');
    }
    
    if (!portal.color || portal.color.trim() === '') {
      issues.push('Missing color');
    }
    
    if (!portal.features || portal.features.length === 0) {
      issues.push('No features listed');
    }
    
    return {
      portal: portal.key,
      path: portal.path,
      valid: issues.length === 0,
      issues
    };
  }

  checkDeprecatedRoutes() {
    console.log('\n🔄 Checking deprecated routes...');
    
    const deprecatedIssues = [];
    
    for (const [deprecatedPath, canonicalPath] of Object.entries(DEPRECATED_ROUTES)) {
      const canonicalPortal = PORTALS.find(p => p.path === canonicalPath);
      
      if (!canonicalPortal) {
        deprecatedIssues.push(`Deprecated route ${deprecatedPath} maps to non-existent canonical path ${canonicalPath}`);
      } else {
        console.log(`   ✅ ${deprecatedPath} → ${canonicalPath} (${canonicalPortal.title})`);
      }
    }
    
    if (deprecatedIssues.length > 0) {
      console.log('   ❌ Deprecated route issues:');
      deprecatedIssues.forEach(issue => console.log(`      - ${issue}`));
    }
    
    return deprecatedIssues.length === 0;
  }

  run() {
    console.log('🔍 Portal Configuration Check');
    console.log('============================');
    console.log(`Checking ${PORTALS.length} portals...\n`);
    
    let allValid = true;
    
    PORTALS.forEach((portal, index) => {
      const result = this.validatePortal(portal);
      
      if (result.valid) {
        console.log(`✅ ${index + 1}. ${portal.title} (${portal.path})`);
        this.results.passed++;
      } else {
        console.log(`❌ ${index + 1}. ${portal.title} (${portal.path})`);
        console.log(`   Issues:`);
        result.issues.forEach(issue => {
          console.log(`      - ${issue}`);
        });
        this.results.failed++;
        this.results.issues.push(result);
        allValid = false;
      }
    });
    
    // Check deprecated routes
    const deprecatedValid = this.checkDeprecatedRoutes();
    
    // Summary
    console.log('\n📊 Portal Check Results');
    console.log('======================');
    console.log(`Total Portals: ${this.results.total}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`🔄 Deprecated Routes: ${deprecatedValid ? '✅ Valid' : '❌ Issues'}`);
    
    if (this.results.failed > 0) {
      console.log('\n🚨 Issues Found:');
      this.results.issues.forEach(result => {
        console.log(`\n${result.portal} (${result.path}):`);
        result.issues.forEach(issue => {
          console.log(`  - ${issue}`);
        });
      });
    }
    
    const overallSuccess = allValid && deprecatedValid;
    
    if (overallSuccess) {
      console.log('\n🎉 All portals are properly configured!');
      console.log('✅ Ready for Phase-2 autonomous portal build');
    } else {
      console.log('\n⚠️  Some portal issues found. Please fix before proceeding.');
    }
    
    return overallSuccess;
  }
}

// Run the portal check
const checker = new PortalChecker();
const success = checker.run();

if (success) {
  process.exit(0);
} else {
  process.exit(1);
}
