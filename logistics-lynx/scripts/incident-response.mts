#!/usr/bin/env tsx

import { supabase } from "../src/lib/supabaseClient.js";
import { release } from "./util/lockfile.js";

interface IncidentResponse {
  action: 'stop' | 'resume' | 'status';
  timestamp: string;
  success: boolean;
  message: string;
  details?: any;
}

async function emergencyStop(): Promise<IncidentResponse> {
  try {
    console.log('🚨 EMERGENCY STOP: Halting all autonomous operations...');

    // Set emergency stop flag
    const { error: flagError } = await supabase
      .from('feature_flags_v2')
      .upsert({
        key: 'autonomy.emergencyStop',
        value: 'true',
        scope: 'global',
        env: 'production',
        company_id: 'system',
        payload: { reason: 'Emergency stop activated', timestamp: new Date().toISOString() },
        reason: 'Emergency stop activated via incident response script',
        owner_name: 'system'
      });

    if (flagError) throw flagError;

    // Release lock to stop agents
    try {
      release();
      console.log('🔓 Released autonomous system lock');
    } catch (lockError) {
      console.warn('⚠️ Could not release lock:', lockError);
    }

    // Log the emergency stop
    const { error: logError } = await supabase
      .from('system_events')
      .insert({
        event_type: 'emergency_stop',
        severity: 'critical',
        message: 'Emergency stop activated via incident response script',
        metadata: {
          source: 'incident-response-script',
          timestamp: new Date().toISOString(),
          user: 'system'
        }
      });

    if (logError) console.warn('⚠️ Could not log emergency stop event:', logError);

    console.log('✅ Emergency stop activated successfully');
    console.log('🛑 All autonomous operations have been halted');
    console.log('📋 Next steps:');
    console.log('   1. Investigate the issue');
    console.log('   2. Run: npm run ops:resume to restore operations');
    console.log('   3. Monitor system health');

    return {
      action: 'stop',
      timestamp: new Date().toISOString(),
      success: true,
      message: 'Emergency stop activated successfully',
      details: {
        flagSet: true,
        lockReleased: true,
        eventLogged: !logError
      }
    };

  } catch (error) {
    console.error('❌ Failed to activate emergency stop:', error);
    return {
      action: 'stop',
      timestamp: new Date().toISOString(),
      success: false,
      message: `Failed to activate emergency stop: ${error}`,
      details: { error: error.message }
    };
  }
}

async function resume(): Promise<IncidentResponse> {
  try {
    console.log('🔄 RESUME: Restoring autonomous operations...');

    // Clear emergency stop flag
    const { error: flagError } = await supabase
      .from('feature_flags_v2')
      .upsert({
        key: 'autonomy.emergencyStop',
        value: 'false',
        scope: 'global',
        env: 'production',
        company_id: 'system',
        payload: { reason: 'Emergency stop cleared', timestamp: new Date().toISOString() },
        reason: 'Emergency stop cleared via incident response script',
        owner_name: 'system'
      });

    if (flagError) throw flagError;

    // Log the resume
    const { error: logError } = await supabase
      .from('system_events')
      .insert({
        event_type: 'emergency_resume',
        severity: 'info',
        message: 'Emergency stop cleared via incident response script',
        metadata: {
          source: 'incident-response-script',
          timestamp: new Date().toISOString(),
          user: 'system'
        }
      });

    if (logError) console.warn('⚠️ Could not log resume event:', logError);

    console.log('✅ Emergency stop cleared successfully');
    console.log('🚀 Autonomous operations can now resume');
    console.log('📋 Next steps:');
    console.log('   1. Start autonomous system: npm run start:autonomous:full');
    console.log('   2. Monitor system health: npm run ops:status');
    console.log('   3. Check for any pending issues');

    return {
      action: 'resume',
      timestamp: new Date().toISOString(),
      success: true,
      message: 'Emergency stop cleared successfully',
      details: {
        flagCleared: true,
        eventLogged: !logError
      }
    };

  } catch (error) {
    console.error('❌ Failed to clear emergency stop:', error);
    return {
      action: 'resume',
      timestamp: new Date().toISOString(),
      success: false,
      message: `Failed to clear emergency stop: ${error}`,
      details: { error: error.message }
    };
  }
}

async function status(): Promise<IncidentResponse> {
  try {
    console.log('📊 Checking emergency stop status...');

    // Check emergency stop flag
    const { data: flagData, error: flagError } = await supabase
      .from('feature_flags_v2')
      .select('value, payload')
      .eq('key', 'autonomy.emergencyStop')
      .single();

    if (flagError && flagError.code !== 'PGRST116') throw flagError;

    const isEmergencyStopActive = flagData?.value === 'true';
    const stopDetails = flagData?.payload || {};

    console.log(`🏁 Emergency Stop Status: ${isEmergencyStopActive ? '🔴 ACTIVE' : '🟢 Inactive'}`);
    
    if (isEmergencyStopActive) {
      console.log('📅 Activated:', stopDetails.timestamp || 'Unknown');
      console.log('📝 Reason:', stopDetails.reason || 'Unknown');
      console.log('💡 To resume: npm run ops:resume');
    } else {
      console.log('✅ System is ready for autonomous operations');
      console.log('💡 To start: npm run start:autonomous:full');
    }

    return {
      action: 'status',
      timestamp: new Date().toISOString(),
      success: true,
      message: `Emergency stop is ${isEmergencyStopActive ? 'ACTIVE' : 'INACTIVE'}`,
      details: {
        isActive: isEmergencyStopActive,
        stopDetails
      }
    };

  } catch (error) {
    console.error('❌ Failed to check emergency stop status:', error);
    return {
      action: 'status',
      timestamp: new Date().toISOString(),
      success: false,
      message: `Failed to check status: ${error}`,
      details: { error: error.message }
    };
  }
}

async function main(): Promise<void> {
  const action = process.argv[2] as 'stop' | 'resume' | 'status';

  if (!action || !['stop', 'resume', 'status'].includes(action)) {
    console.log('Usage: npm run ops:emergency-stop|resume|status');
    console.log('   or: tsx scripts/incident-response.mts <stop|resume|status>');
    process.exit(1);
  }

  let result: IncidentResponse;

  switch (action) {
    case 'stop':
      result = await emergencyStop();
      break;
    case 'resume':
      result = await resume();
      break;
    case 'status':
      result = await status();
      break;
    default:
      console.error('Invalid action:', action);
      process.exit(1);
  }

  // Exit with appropriate code
  if (!result.success) {
    console.error('❌ Operation failed');
    process.exit(1);
  } else {
    console.log('✅ Operation completed successfully');
    process.exit(0);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
