#!/usr/bin/env node

// Autonomous Operating Charter - Startup Script
// This script launches the 24/7 autonomous system with full authority

const AutonomousOrchestrator = require('./autonomous-orchestrator');
const { createClient } = require('@supabase/supabase-js');

class AutonomousSystem {
  constructor() {
    this.orchestrator = new AutonomousOrchestrator({
      enablePortalControl: true,
      enableWebsiteGeneration: true,
      enableDLQReplay: true,
      monitoringInterval: 30000,
      maxConcurrentAgents: 150
    });
    
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
  }

  async setupFeatureFlags() {
    console.log('🔧 Setting up autonomous feature flags...');
    
    try {
      // Global mode & kill switch
      await this.supabase
        .from('feature_flags_v2')
        .upsert([
          {
            key: 'autonomy.emergencyStop',
            scope: 'global',
            value: false,
            reason: 'enable autonomy',
            owner_name: 'system'
          },
          {
            key: 'autonomy.mode',
            scope: 'global',
            value: 'FULL',
            reason: 'full authority mode',
            owner_name: 'system'
          },
          {
            key: 'agents.autonomousEnabled',
            scope: 'global',
            value: true,
            reason: 'run agents',
            owner_name: 'system'
          },
          {
            key: 'obs.otelEnabled',
            scope: 'global',
            value: true,
            reason: 'tracing on',
            owner_name: 'system'
          }
        ]);

      // Budgets / safety rails
      await this.supabase
        .from('feature_flags_v2')
        .upsert([
          {
            key: 'budget.agents.maxConcurrent',
            scope: 'global',
            value: 150,
            reason: 'concurrency cap',
            owner_name: 'autopilot'
          },
          {
            key: 'budget.replay.maxBatch',
            scope: 'global',
            value: 50,
            reason: 'dlq cap',
            owner_name: 'dlq'
          },
          {
            key: 'budget.replay.maxPayloadMB',
            scope: 'global',
            value: 2,
            reason: 'payload cap',
            owner_name: 'dlq'
          },
          {
            key: 'rate.replay.per5m',
            scope: 'global',
            value: 3,
            reason: 'rate limit',
            owner_name: 'dlq'
          }
        ]);

      // Portal authority grants (20 canonical portals)
      const portalFlags = [
        'super_admin', 'admin', 'tms_admin', 'onboarding', 'broker',
        'shipper', 'carrier', 'driver', 'owner_operator', 'factoring',
        'load_board', 'crm', 'financials', 'edi', 'marketplace',
        'analytics', 'autonomous', 'workers', 'rates', 'directory'
      ].map(portal => ({
        key: `portal.${portal}.autonomous`,
        scope: 'global',
        value: true,
        reason: `${portal} portal control`,
        owner_name: 'agents'
      }));

      await this.supabase
        .from('feature_flags_v2')
        .upsert(portalFlags);

      // Website authority
      await this.supabase
        .from('feature_flags_v2')
        .upsert([
          {
            key: 'website.content.autonomous',
            scope: 'global',
            value: true,
            reason: 'website content generation',
            owner_name: 'agents'
          },
          {
            key: 'website.seo.autonomous',
            scope: 'global',
            value: true,
            reason: 'website SEO optimization',
            owner_name: 'agents'
          },
          {
            key: 'website.images.autonomous',
            scope: 'global',
            value: true,
            reason: 'website image generation',
            owner_name: 'agents'
          },
          {
            key: 'website.structured_data.autonomous',
            scope: 'global',
            value: true,
            reason: 'website structured data',
            owner_name: 'agents'
          },
          {
            key: 'website.analytics.autonomous',
            scope: 'global',
            value: true,
            reason: 'website analytics',
            owner_name: 'agents'
          }
        ]);

      console.log('✅ Feature flags setup complete');
      
    } catch (error) {
      console.error('❌ Error setting up feature flags:', error);
      throw error;
    }
  }

  async verifySetup() {
    console.log('🔍 Verifying autonomous system setup...');
    
    try {
      // Check key flags
      const { data: flags } = await this.supabase
        .from('feature_flags_v2')
        .select('key, value')
        .in('key', [
          'autonomy.emergencyStop',
          'autonomy.mode',
          'agents.autonomousEnabled',
          'obs.otelEnabled'
        ]);

      console.log('📊 Key flags status:');
      flags.forEach(flag => {
        console.log(`  ${flag.key}: ${flag.value}`);
      });

      // Count portal flags
      const { count: portalCount } = await this.supabase
        .from('feature_flags_v2')
        .select('*', { count: 'exact', head: true })
        .like('key', 'portal.%');

      console.log(`📊 Portal flags: ${portalCount}`);

      // Count website flags
      const { count: websiteCount } = await this.supabase
        .from('feature_flags_v2')
        .select('*', { count: 'exact', head: true })
        .like('key', 'website.%');

      console.log(`📊 Website flags: ${websiteCount}`);

      console.log('✅ Setup verification complete');
      
    } catch (error) {
      console.error('❌ Error verifying setup:', error);
      throw error;
    }
  }

  async start() {
    console.log('🚀 Starting Autonomous Operating System...');
    console.log('🎯 FULL AUTONOMOUS AUTHORITY GRANTED');
    console.log('📋 Scope: All 20 portals + 50-page website + edge functions + n8n + CI/CD');
    console.log('🛡️  Emergency Stop: One-command halt capability');
    console.log('📊 Guardrails: Iron-clad safety with real-time monitoring');
    console.log('');

    try {
      // Setup feature flags
      await this.setupFeatureFlags();
      
      // Verify setup
      await this.verifySetup();
      
      // Initialize orchestrator
      await this.orchestrator.initialize();
      
      // Start orchestrator
      await this.orchestrator.start();
      
      console.log('');
      console.log('🎉 AUTONOMOUS SYSTEM IS NOW RUNNING 24/7');
      console.log('🔄 Detect → Decide → Act → Prove loop active');
      console.log('📈 Real-time monitoring and SLO compliance active');
      console.log('🛑 Emergency stop available at any time');
      console.log('');
      console.log('📊 System Status:');
      console.log(JSON.stringify(this.orchestrator.getStatus(), null, 2));
      
    } catch (error) {
      console.error('❌ Failed to start autonomous system:', error);
      process.exit(1);
    }
  }

  async stop() {
    console.log('🛑 Stopping Autonomous Operating System...');
    
    try {
      await this.orchestrator.stop();
      console.log('✅ Autonomous system stopped');
    } catch (error) {
      console.error('❌ Error stopping system:', error);
    }
  }

  async emergencyStop() {
    console.log('🚨 EMERGENCY STOP ACTIVATED');
    
    try {
      await this.orchestrator.emergencyStop();
      console.log('✅ Emergency stop completed');
    } catch (error) {
      console.error('❌ Emergency stop error:', error);
    }
  }
}

// Handle command line arguments
const system = new AutonomousSystem();

process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT - stopping gracefully...');
  await system.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM - stopping gracefully...');
  await system.stop();
  process.exit(0);
});

// Handle emergency stop signal
process.on('SIGUSR1', async () => {
  console.log('\n🚨 Emergency stop signal received...');
  await system.emergencyStop();
  process.exit(0);
});

// Start the system
if (require.main === module) {
  system.start().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = AutonomousSystem;
