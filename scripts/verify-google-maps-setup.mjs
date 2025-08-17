#!/usr/bin/env node

/**
 * Google Maps API Key Verification Script (Production-Ready)
 * 
 * Preflight verifier: fast, strict, actionable
 * Runs in CI before build to catch configuration issues early
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config();

const PUBLIC = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const SERVER = process.env.GOOGLE_MAPS_API_KEY || "";

const fail = (m) => { console.error("❌", m); process.exit(1); };
const ok = (m) => console.log("✅", m);
const warn = (m) => console.warn("⚠️", m);

console.log('🔍 Google Maps API Key Verification (Production-Ready)\n');

// Check if API keys are present
if (!PUBLIC) fail("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing");
if (!SERVER) fail("GOOGLE_MAPS_API_KEY is missing");

// Validate key format
const looksLikeKey = (k) => /^AIza[0-9A-Za-z\-_]{10,}$/.test(k);
if (!looksLikeKey(PUBLIC)) fail("Public key format looks invalid (check env mapping)");
if (!looksLikeKey(SERVER)) fail("Server key format looks invalid (check secret)");

// Check for placeholder values
["YOUR_KEY", "REPLACE_ME", "example", "placeholder", "AIzaSyC"].forEach(bad => {
  if (PUBLIC.includes(bad) || SERVER.includes(bad)) {
    fail(`Placeholder detected: "${bad}". Set real keys.`);
  }
});

// Warn if keys differ (allowed for security separation)
if (PUBLIC !== SERVER) {
  warn("Public and server keys differ. Allowed if you intentionally separate them.");
}

ok("Google Maps envs present & sane");

// Check if Supabase is configured for database verification
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  warn("Supabase configuration not found - skipping database verification");
} else {
  console.log('\n🔍 Verifying database configuration...');
  
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Check if Google Maps tables exist
    const { data: routesTable, error: routesError } = await supabase
      .from('routes')
      .select('count')
      .limit(1);
    
    if (routesError) {
      warn("Google Maps database tables not found");
      console.log("   Run: supabase/migrations/20250101000003_google_maps_integration.sql");
    } else {
      ok("Google Maps database tables found");
    }
    
    // Check if access control tables exist
    const { data: rolesTable, error: rolesError } = await supabase
      .from('roles')
      .select('key')
      .limit(1);
    
    if (rolesError) {
      warn("Access control database tables not found");
      console.log("   Run: npm run setup:access-control");
    } else {
      ok("Access control database tables found");
    }
    
  } catch (error) {
    warn(`Could not verify database configuration: ${error.message}`);
  }
}

// Test API key format more strictly
const apiKeyPattern = /^AIza[0-9A-Za-z-_]{35}$/;
if (!apiKeyPattern.test(PUBLIC)) {
  warn("Public API key format may be invalid");
  console.log("   Expected format: AIza followed by 35 characters");
} else {
  ok("Public API key format valid");
}

if (!apiKeyPattern.test(SERVER)) {
  warn("Server API key format may be invalid");
  console.log("   Expected format: AIza followed by 35 characters");
} else {
  ok("Server API key format valid");
}

// Security checklist
console.log('\n🔒 Security Checklist:');
console.log('1. Browser key restricted by HTTP referrers (yourdomain.com, *.yourdomain.com)');
console.log('2. Server key restricted by IP and API scopes');
console.log('3. Billing enabled in Google Cloud Console');
console.log('4. Only required APIs enabled (Maps JavaScript, Places, Directions, etc.)');
console.log('5. Quotas and budgets configured');

// Next steps
console.log('\n📋 Next Steps:');
console.log('1. Ensure Google Cloud Console has these APIs enabled:');
console.log('   - Maps JavaScript API');
console.log('   - Places API');
console.log('   - Directions API');
console.log('   - Distance Matrix API');
console.log('   - Geocoding API');
console.log('\n2. Test server-side geocoding:');
console.log(`   curl "https://maps.googleapis.com/maps/api/geocode/json?address=New%20York&key=\$GOOGLE_MAPS_API_KEY"`);
console.log('\n3. Test the integration by visiting: /maps');
console.log('\n4. Check browser console for any API errors');

console.log('\n🎉 Google Maps preflight verification complete!');
