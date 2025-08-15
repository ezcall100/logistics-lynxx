#!/usr/bin/env node
import { execSync } from 'child_process';

const PROD_HOST = process.env.PROD_HOST;

if (!PROD_HOST) {
  console.error('Missing PROD_HOST environment variable');
  process.exit(1);
}

console.log('🔍 Verifying deployment...');

try {
  // Check health endpoints
  console.log('📊 Health check...');
  const health = execSync(`curl -fsS "http://${PROD_HOST}/healthz"`, { encoding: 'utf8' });
  console.log('✅ Health:', JSON.parse(health));

  console.log('📊 Readiness check...');
  const ready = execSync(`curl -fsS "http://${PROD_HOST}/readyz"`, { encoding: 'utf8' });
  console.log('✅ Ready:', JSON.parse(ready));

  // Check portal accessibility
  console.log('🌐 Portal accessibility...');
  const portals = ['/', '/super-admin', '/broker', '/carrier', '/driver', '/shipper', '/analytics', '/autonomous'];
  
  for (const portal of portals) {
    try {
      const response = execSync(`curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}${portal}"`, { encoding: 'utf8' });
      console.log(`✅ ${portal}: ${response}`);
    } catch (error) {
      console.error(`❌ ${portal}: Failed`);
    }
  }

  // Check portal count
  console.log('🔢 Portal count verification...');
  const portalCount = execSync(`node scripts/check-portals.mjs`, { encoding: 'utf8' });
  console.log('✅ Portal count:', portalCount.trim());

  console.log('🎉 Deployment verification complete!');
} catch (error) {
  console.error('❌ Deployment verification failed:', error.message);
  process.exit(1);
}
