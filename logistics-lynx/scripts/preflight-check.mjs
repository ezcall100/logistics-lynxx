#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { promises as fs } from 'fs';
import path from 'path';

console.log('🚀 Production Preflight Check');
console.log('=============================');

const checks = {
  secrets: {},
  environment: {},
  database: {},
  system: {}
};

async function checkSecrets() {
  console.log('\n🔐 Checking Secrets...');
  
  const requiredSecrets = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  const optionalSecrets = [
    'OTEL_EXPORTER_OTLP_ENDPOINT',
    'OTEL_SERVICE_NAME'
  ];
  
  for (const secret of requiredSecrets) {
    const value = process.env[secret];
    if (value) {
      console.log(`✅ ${secret}: SET`);
      checks.secrets[secret] = true;
    } else {
      console.log(`❌ ${secret}: MISSING`);
      checks.secrets[secret] = false;
    }
  }
  
  for (const secret of optionalSecrets) {
    const value = process.env[secret];
    if (value) {
      console.log(`✅ ${secret}: SET (${value.substring(0, 20)}...)`);
      checks.secrets[secret] = true;
    } else {
      console.log(`⚠️  ${secret}: NOT SET (optional)`);
      checks.secrets[secret] = false;
    }
  }
}

async function checkEnvironment() {
  console.log('\n🌍 Checking Environment Variables...');
  
  const readyzMode = process.env.READYZ_MODE;
  if (readyzMode === 'strict') {
    console.log('✅ READYZ_MODE: strict');
    checks.environment.readyzMode = true;
  } else {
    console.log(`❌ READYZ_MODE: ${readyzMode || 'NOT SET'} (should be 'strict')`);
    checks.environment.readyzMode = false;
  }
  
  const prodHost = process.env.PROD_HOST;
  if (prodHost) {
    console.log(`✅ PROD_HOST: ${prodHost}`);
    checks.environment.prodHost = true;
  } else {
    console.log('❌ PROD_HOST: NOT SET');
    checks.environment.prodHost = false;
  }
}

async function checkDatabaseFlags() {
  console.log('\n🗄️  Checking Database Flags...');
  
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('⚠️  Database flags check: SKIPPED (no credentials)');
    checks.database.flags = 'skipped';
    return;
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });
    
    const { data, error } = await supabase
      .from('feature_flags_v2')
      .select('key, value')
      .in('key', [
        'autonomy.emergencyStop',
        'agents.autonomousEnabled',
        'portal.rates.enabled',
        'portal.quotes.enabled',
        'portal.shipments.enabled',
        'portal.directory.enabled',
        'portal.analytics.enabled'
      ]);
    
    if (error) {
      console.log(`❌ Database flags check: ERROR - ${error.message}`);
      checks.database.flags = false;
      return;
    }
    
    const flags = data.reduce((acc, flag) => {
      acc[flag.key] = flag.value;
      return acc;
    }, {});
    
    // Check critical flags
    if (flags['autonomy.emergencyStop'] === 'false') {
      console.log('✅ autonomy.emergencyStop: false');
    } else {
      console.log(`❌ autonomy.emergencyStop: ${flags['autonomy.emergencyStop']} (should be false)`);
    }
    
    if (flags['agents.autonomousEnabled'] === 'true') {
      console.log('✅ agents.autonomousEnabled: true');
    } else {
      console.log(`❌ agents.autonomousEnabled: ${flags['agents.autonomousEnabled']} (should be true)`);
    }
    
    // Check portal flags
    const portalFlags = Object.keys(flags).filter(key => key.startsWith('portal.') && key.endsWith('.enabled'));
    for (const flag of portalFlags) {
      if (flags[flag] === 'true') {
        console.log(`✅ ${flag}: true`);
      } else {
        console.log(`❌ ${flag}: ${flags[flag]} (should be true)`);
      }
    }
    
    checks.database.flags = true;
    
  } catch (error) {
    console.log(`❌ Database flags check: ERROR - ${error.message}`);
    checks.database.flags = false;
  }
}

async function checkSystemFiles() {
  console.log('\n📁 Checking System Files...');
  
  const requiredFiles = [
    'package.json',
    'package-lock.json',
    '.github/workflows/deploy-prod.yml',
    'scripts/prod-smoke-test.mjs',
    'scripts/emergency-stop.mjs',
    'scripts/health-check.mjs'
  ];
  
  for (const file of requiredFiles) {
    try {
      await fs.access(file);
      console.log(`✅ ${file}: EXISTS`);
      checks.system[file] = true;
    } catch (error) {
      console.log(`❌ ${file}: MISSING`);
      checks.system[file] = false;
    }
  }
}

async function checkBuildScript() {
  console.log('\n🔨 Checking Build Script...');
  
  try {
    const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const scripts = packageJson.scripts || {};
    
    if (scripts['build:dev']) {
      console.log('✅ build:dev script: EXISTS');
      checks.system.buildScript = true;
    } else {
      console.log('❌ build:dev script: MISSING');
      checks.system.buildScript = false;
    }
    
    if (scripts['smoke:test']) {
      console.log('✅ smoke:test script: EXISTS');
      checks.system.smokeTest = true;
    } else {
      console.log('❌ smoke:test script: MISSING');
      checks.system.smokeTest = false;
    }
    
  } catch (error) {
    console.log(`❌ Build script check: ERROR - ${error.message}`);
    checks.system.buildScript = false;
  }
}

async function generateSummary() {
  console.log('\n📊 Preflight Check Summary');
  console.log('=========================');
  
  const allChecks = [
    ...Object.values(checks.secrets),
    ...Object.values(checks.environment),
    ...Object.values(checks.database),
    ...Object.values(checks.system)
  ].filter(check => check !== 'skipped');
  
  const passed = allChecks.filter(Boolean).length;
  const total = allChecks.length;
  
  console.log(`Overall: ${passed}/${total} checks passed`);
  
  if (passed === total) {
    console.log('\n🎉 ALL CHECKS PASSED!');
    console.log('You are cleared for production deployment.');
    console.log('\nNext steps:');
    console.log('1. Run: gh workflow run deploy-prod.yml -f environment=production');
    console.log('2. Monitor the deployment in GitHub Actions');
    console.log('3. Run: npm run smoke:test (after deployment)');
    process.exit(0);
  } else {
    console.log('\n❌ SOME CHECKS FAILED');
    console.log('Please fix the issues above before deploying to production.');
    process.exit(1);
  }
}

async function runPreflightCheck() {
  await checkSecrets();
  await checkEnvironment();
  await checkDatabaseFlags();
  await checkSystemFiles();
  await checkBuildScript();
  await generateSummary();
}

runPreflightCheck().catch(error => {
  console.error('❌ Preflight check error:', error);
  process.exit(1);
});
