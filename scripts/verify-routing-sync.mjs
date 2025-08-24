#!/usr/bin/env node

/**
 * Routing Sync Verification Script
 * 
 * This script verifies that all pages are properly synced with routing and navigation.
 * It checks for missing routes, navigation links, and RLS protection.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RoutingVerifier {
  constructor() {
    this.issues = [];
    this.pages = new Set();
    this.routes = new Set();
    this.navigation = new Set();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async scanPages() {
    this.log('Scanning for page components...');
    
    const pagesDir = path.join(__dirname, '../logistics-lynx/src/pages/super-admin');
    const componentsDir = path.join(__dirname, '../logistics-lynx/src/components');
    
    // Scan pages directory
    if (fs.existsSync(pagesDir)) {
      this.scanDirectory(pagesDir, this.pages, '.tsx');
    }
    
    // Scan components directory for dashboard components
    if (fs.existsSync(componentsDir)) {
      this.scanDirectory(componentsDir, this.pages, '.tsx');
    }
  }

  scanDirectory(dir, set, extension) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        this.scanDirectory(fullPath, set, extension);
      } else if (item.name.endsWith(extension)) {
        const relativePath = path.relative(path.join(__dirname, '../logistics-lynx/src'), fullPath);
        set.add(relativePath.replace(/\\/g, '/'));
      }
    }
  }

  async scanRoutes() {
    this.log('Scanning SuperAdminRoutes.tsx for defined routes...');
    
    const routesFile = path.join(__dirname, '../logistics-lynx/src/pages/super-admin/SuperAdminRoutes.tsx');
    
    if (!fs.existsSync(routesFile)) {
      this.issues.push('SuperAdminRoutes.tsx not found');
      return;
    }
    
    const content = fs.readFileSync(routesFile, 'utf8');
    
    // Extract route paths
    const routeMatches = content.match(/path="([^"]+)"/g);
    if (routeMatches) {
      routeMatches.forEach(match => {
        const path = match.replace('path="', '').replace('"', '');
        this.routes.add(path);
      });
    }
    
    // Extract component imports
    const importMatches = content.match(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g);
    if (importMatches) {
      importMatches.forEach(match => {
        const importPath = match.match(/from\s+['"]([^'"]+)['"]/)[1];
        if (importPath.startsWith('.')) {
          this.navigation.add(importPath);
        }
      });
    }
  }

  async scanNavigation() {
    this.log('Scanning AppShell.tsx for navigation items...');
    
    const appShellFile = path.join(__dirname, '../src/components/layout/AppShell.tsx');
    
    if (!fs.existsSync(appShellFile)) {
      this.issues.push('AppShell.tsx not found');
      return;
    }
    
    const content = fs.readFileSync(appShellFile, 'utf8');
    
    // Extract navigation hrefs
    const hrefMatches = content.match(/href:\s*['"]([^'"]+)['"]/g);
    if (hrefMatches) {
      hrefMatches.forEach(match => {
        const href = match.replace(/href:\s*['"]/, '').replace(/['"]/, '');
        this.navigation.add(href);
      });
    }
  }

  async checkProtectedRoutes() {
    this.log('Checking for RLS protection in routes...');
    
    const routesFile = path.join(__dirname, '../logistics-lynx/src/pages/super-admin/SuperAdminRoutes.tsx');
    const content = fs.readFileSync(routesFile, 'utf8');
    
    // Check if ProtectedRoute is imported
    if (!content.includes('import ProtectedRoute')) {
      this.issues.push('ProtectedRoute not imported in SuperAdminRoutes.tsx');
    }
    
    // Check if key routes are protected
    const keyRoutes = [
      '/super-admin/settings',
      '/super-admin/security/dashboard',
      '/super-admin/users'
    ];
    
    keyRoutes.forEach(route => {
      if (!content.includes(`<ProtectedRoute`)) {
        this.issues.push(`Route ${route} may not be protected with RLS`);
      }
    });
  }

  async generateReport() {
    this.log('\n📊 Routing Sync Report');
    this.log('=====================');
    
    this.log(`Pages found: ${this.pages.size}`);
    this.log(`Routes defined: ${this.routes.size}`);
    this.log(`Navigation items: ${this.navigation.size}`);
    
    if (this.issues.length > 0) {
      this.log('\n❌ Issues Found:');
      this.issues.forEach(issue => this.log(`  - ${issue}`, 'error'));
    } else {
      this.log('\n✅ No routing issues found!', 'success');
    }
    
    // Check for missing routes
    const expectedRoutes = [
      '/super-admin/settings',
      '/super-admin/settings/profile',
      '/super-admin/settings/system',
      '/super-admin/settings/preferences',
      '/super-admin/security/dashboard'
    ];
    
    const missingRoutes = expectedRoutes.filter(route => !this.routes.has(route));
    
    if (missingRoutes.length > 0) {
      this.log('\n⚠️ Missing Routes:');
      missingRoutes.forEach(route => this.log(`  - ${route}`, 'error'));
    }
    
    // Check for missing navigation
    const expectedNavigation = [
      '/super-admin/settings',
      '/super-admin/security/dashboard'
    ];
    
    const missingNavigation = expectedNavigation.filter(nav => !this.navigation.has(nav));
    
    if (missingNavigation.length > 0) {
      this.log('\n⚠️ Missing Navigation Items:');
      missingNavigation.forEach(nav => this.log(`  - ${nav}`, 'error'));
    }
  }

  async runVerification() {
    this.log('🔍 Starting Routing Sync Verification');
    this.log('====================================');
    
    await this.scanPages();
    await this.scanRoutes();
    await this.scanNavigation();
    await this.checkProtectedRoutes();
    await this.generateReport();
    
    if (this.issues.length > 0) {
      process.exit(1);
    }
  }
}

// Run verification if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const verifier = new RoutingVerifier();
  verifier.runVerification().catch(error => {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  });
}

export default RoutingVerifier;
