#!/usr/bin/env node

import { promises as fs } from 'fs';
import { execSync } from 'child_process';

console.log('🔧 Production Environment Setup');
console.log('================================');

async function checkGitHubCLI() {
  try {
    execSync('gh --version', { stdio: 'pipe' });
    console.log('✅ GitHub CLI: INSTALLED');
    return true;
  } catch (error) {
    console.log('❌ GitHub CLI: NOT INSTALLED');
    console.log('   Install from: https://cli.github.com/');
    return false;
  }
}

async function getRepositoryInfo() {
  try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    const match = remoteUrl.match(/github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?$/);
    if (match) {
      return match[1];
    }
  } catch (error) {
    console.log('⚠️  Could not determine repository from git remote');
  }
  return null;
}

async function generateSetupInstructions() {
  const repo = await getRepositoryInfo();
  const hasGitHubCLI = await checkGitHubCLI();
  
  console.log('\n📋 Setup Instructions');
  console.log('=====================');
  
  if (repo) {
    console.log(`Repository: ${repo}`);
    console.log(`GitHub URL: https://github.com/${repo}`);
  }
  
  console.log('\n🔐 Required Secrets (GitHub Actions)');
  console.log('====================================');
  console.log('1. Go to: https://github.com/' + (repo || 'YOUR_REPO') + '/settings/secrets/actions');
  console.log('2. Add these secrets:');
  console.log('   - SUPABASE_URL: Your Supabase project URL');
  console.log('   - SUPABASE_SERVICE_ROLE_KEY: Your Supabase service role key');
  
  console.log('\n🌍 Required Variables (GitHub Actions)');
  console.log('=====================================');
  console.log('1. Go to: https://github.com/' + (repo || 'YOUR_REPO') + '/settings/variables/actions');
  console.log('2. Add these variables:');
  console.log('   - READYZ_MODE = strict');
  console.log('   - PROD_HOST = Your production hostname/IP');
  
  if (hasGitHubCLI && repo) {
    console.log('\n🚀 Quick Setup Commands (if you have the values)');
    console.log('==============================================');
    console.log('# Set secrets (replace with your actual values)');
    console.log(`gh secret set SUPABASE_URL --repo ${repo} --body "YOUR_SUPABASE_URL"`);
    console.log(`gh secret set SUPABASE_SERVICE_ROLE_KEY --repo ${repo} --body "YOUR_SUPABASE_SERVICE_ROLE_KEY"`);
    console.log('');
    console.log('# Set variables');
    console.log(`gh variable set READYZ_MODE --repo ${repo} --body "strict"`);
    console.log(`gh variable set PROD_HOST --repo ${repo} --body "YOUR_PRODUCTION_HOST"`);
  }
  
  console.log('\n🎯 Optional Observability');
  console.log('========================');
  console.log('For enhanced monitoring, also add:');
  console.log('   - OTEL_EXPORTER_OTLP_ENDPOINT: Your observability backend');
  console.log('   - OTEL_SERVICE_NAME = transbot-ai-prod');
  
  console.log('\n✅ After Setup');
  console.log('==============');
  console.log('1. Run: npm run preflight:check');
  console.log('2. If all checks pass: gh workflow run deploy-prod.yml -f environment=production');
  console.log('3. Monitor deployment in GitHub Actions');
  console.log('4. Run: npm run smoke:test (after deployment)');
}

async function createEnvTemplate() {
  const envTemplate = `# Production Environment Template
# Copy this to .env.production and fill in your values

# Required
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PROD_HOST=your_production_hostname_or_ip
READYZ_MODE=strict

# Optional - Observability
OTEL_EXPORTER_OTLP_ENDPOINT=your_observability_endpoint
OTEL_SERVICE_NAME=transbot-ai-prod

# Optional - Additional
NODE_ENV=production
`;

  try {
    await fs.writeFile('.env.production.template', envTemplate);
    console.log('\n📄 Created .env.production.template');
    console.log('   Use this as a reference for your environment variables');
  } catch (error) {
    console.log('⚠️  Could not create .env.production.template');
  }
}

async function main() {
  await generateSetupInstructions();
  await createEnvTemplate();
  
  console.log('\n🎉 Setup Complete!');
  console.log('==================');
  console.log('Follow the instructions above to configure your production environment.');
  console.log('Once configured, run: npm run preflight:check');
}

main().catch(error => {
  console.error('❌ Setup error:', error);
  process.exit(1);
});
