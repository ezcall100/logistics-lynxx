#!/usr/bin/env node

// Emergency Stop Script for Autonomous Operating System
// This script provides immediate shutdown capability

const { createClient } = require('@supabase/supabase-js');

class EmergencyStop {
  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
  }

  async activate() {
    console.log('🚨 EMERGENCY STOP ACTIVATED');
    console.log('🛑 Halting all autonomous operations...');
    
    try {
      // Set emergency stop flag
      await this.supabase
        .from('feature_flags_v2')
        .upsert({
          key: 'autonomy.emergencyStop',
          scope: 'global',
          value: true,
          reason: 'emergency stop activated',
          owner_name: 'system'
        });

      // Disable all autonomous agents
      await this.supabase
        .from('feature_flags_v2')
        .upsert({
          key: 'agents.autonomousEnabled',
          scope: 'global',
          value: false,
          reason: 'emergency stop - disable agents',
          owner_name: 'system'
        });

      // Disable all portal autonomy
      const portalNames = [
        'super_admin', 'admin', 'tms_admin', 'onboarding', 'broker',
        'shipper', 'carrier', 'driver', 'owner_operator', 'factoring',
        'load_board', 'crm', 'financials', 'edi', 'marketplace',
        'analytics', 'autonomous', 'workers', 'rates', 'directory'
      ];

      for (const portal of portalNames) {
        await this.supabase
          .from('feature_flags_v2')
          .upsert({
            key: `portal.${portal}.autonomous`,
            scope: 'global',
            value: false,
            reason: 'emergency stop - disable portal autonomy',
            owner_name: 'system'
          });
      }

      // Disable website autonomy
      const websiteFlags = [
        'website.content.autonomous',
        'website.seo.autonomous',
        'website.images.autonomous',
        'website.structured_data.autonomous',
        'website.analytics.autonomous'
      ];

      for (const flag of websiteFlags) {
        await this.supabase
          .from('feature_flags_v2')
          .upsert({
            key: flag,
            scope: 'global',
            value: false,
            reason: 'emergency stop - disable website autonomy',
            owner_name: 'system'
          });
      }

      console.log('✅ Emergency stop completed successfully');
      console.log('🛑 All autonomous operations have been halted');
      console.log('📊 System is now in safe mode');
      
    } catch (error) {
      console.error('❌ Error during emergency stop:', error);
      throw error;
    }
  }

  async checkStatus() {
    try {
      const { data } = await this.supabase
        .from('feature_flags_v2')
        .select('key, value')
        .in('key', [
          'autonomy.emergencyStop',
          'agents.autonomousEnabled',
          'autonomy.mode'
        ]);

      console.log('📊 Emergency Stop Status:');
      data.forEach(flag => {
        const status = flag.value ? '🛑 STOPPED' : '✅ RUNNING';
        console.log(`  ${flag.key}: ${status}`);
      });

      return data;
    } catch (error) {
      console.error('❌ Error checking status:', error);
      throw error;
    }
  }

  async resume() {
    console.log('🔄 Resuming autonomous operations...');
    
    try {
      // Clear emergency stop flag
      await this.supabase
        .from('feature_flags_v2')
        .upsert({
          key: 'autonomy.emergencyStop',
          scope: 'global',
          value: false,
          reason: 'emergency stop cleared',
          owner_name: 'system'
        });

      // Re-enable autonomous agents
      await this.supabase
        .from('feature_flags_v2')
        .upsert({
          key: 'agents.autonomousEnabled',
          scope: 'global',
          value: true,
          reason: 'resume operations - enable agents',
          owner_name: 'system'
        });

      console.log('✅ Autonomous operations resumed');
      console.log('🔄 System is now running normally');
      
    } catch (error) {
      console.error('❌ Error resuming operations:', error);
      throw error;
    }
  }
}

// Command line interface
const emergencyStop = new EmergencyStop();

const command = process.argv[2];

switch (command) {
  case 'stop':
    emergencyStop.activate()
      .then(() => process.exit(0))
      .catch(error => {
        console.error('Emergency stop failed:', error);
        process.exit(1);
      });
    break;
    
  case 'status':
    emergencyStop.checkStatus()
      .then(() => process.exit(0))
      .catch(error => {
        console.error('Status check failed:', error);
        process.exit(1);
      });
    break;
    
  case 'resume':
    emergencyStop.resume()
      .then(() => process.exit(0))
      .catch(error => {
        console.error('Resume failed:', error);
        process.exit(1);
      });
    break;
    
  default:
    console.log('🚨 Emergency Stop Script');
    console.log('');
    console.log('Usage:');
    console.log('  node emergency-stop.js stop    - Activate emergency stop');
    console.log('  node emergency-stop.js status  - Check current status');
    console.log('  node emergency-stop.js resume  - Resume operations');
    console.log('');
    console.log('⚠️  WARNING: Emergency stop will halt ALL autonomous operations');
    process.exit(0);
}
