#!/usr/bin/env tsx

import { supabase } from "../src/lib/supabaseClient.js";
import { isLocked, getLockPid } from "./util/lockfile.js";

interface GreenPosture {
  timestamp: string;
  overall: 'GREEN' | 'YELLOW' | 'RED';
  checks: {
    flags: {
      emergencyStop: boolean;
      autonomyMode: string;
      agentsEnabled: boolean;
      otelEnabled: boolean;
    };
    agents: {
      running: boolean;
      lockPid?: string;
    };
    database: {
      connected: boolean;
      outboxReady: number;
      dlqReady: number;
    };
    metrics: {
      successRate?: number;
      queueDepth?: number;
      runningTasks?: number;
    };
  };
  recommendations: string[];
}

async function checkFlags(): Promise<GreenPosture['checks']['flags']> {
  try {
    const { data, error } = await supabase
      .from('feature_flags_v2')
      .select('key, value')
      .in('key', [
        'autonomy.emergencyStop',
        'autonomy.mode', 
        'agents.autonomousEnabled',
        'obs.otelEnabled'
      ]);

    if (error) throw error;

    const flags = data?.reduce((acc: Record<string, string>, flag: { key: string; value: string }) => {
      acc[flag.key] = flag.value;
      return acc;
    }, {} as Record<string, string>) || {};

    return {
      emergencyStop: flags['autonomy.emergencyStop'] === 'true',
      autonomyMode: flags['autonomy.mode'] || 'UNKNOWN',
      agentsEnabled: flags['agents.autonomousEnabled'] === 'true',
      otelEnabled: flags['obs.otelEnabled'] === 'true'
    };
  } catch (error) {
    console.error('Failed to check flags:', error);
    return {
      emergencyStop: true, // Assume emergency stop if we can't check
      autonomyMode: 'UNKNOWN',
      agentsEnabled: false,
      otelEnabled: false
    };
  }
}

async function checkDatabase(): Promise<GreenPosture['checks']['database']> {
  try {
    // Check connection
    const { error: testError } = await supabase
      .from('feature_flags_v2')
      .select('key')
      .limit(1);

    if (testError) throw testError;

    // Check outbox
    const { count: outboxCount, error: outboxError } = await supabase
      .from('event_outbox')
      .select('*', { count: 'exact', head: true })
      .lte('next_attempt_at', new Date().toISOString());

    // Check DLQ
    const { count: dlqCount, error: dlqError } = await supabase
      .from('event_dlq')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'ready');

    return {
      connected: true,
      outboxReady: outboxError ? 0 : (outboxCount || 0),
      dlqReady: dlqError ? 0 : (dlqCount || 0)
    };
  } catch (error) {
    console.error('Failed to check database:', error);
    return {
      connected: false,
      outboxReady: 0,
      dlqReady: 0
    };
  }
}

async function checkMetrics(): Promise<GreenPosture['checks']['metrics']> {
  try {
    // This would check actual agent metrics - simplified for now
    return {
      successRate: 100, // Placeholder
      queueDepth: 0,    // Placeholder
      runningTasks: 0   // Placeholder
    };
  } catch (error) {
    console.error('Failed to check metrics:', error);
    return {};
  }
}

function determineOverallStatus(checks: GreenPosture['checks']): 'GREEN' | 'YELLOW' | 'RED' {
  const issues: string[] = [];

  // Critical issues (RED)
  if (checks.flags.emergencyStop) issues.push('Emergency stop active');
  if (!checks.database.connected) issues.push('Database disconnected');
  if (!checks.agents.running) issues.push('Agents not running');

  // Warning issues (YELLOW)
  if (checks.database.outboxReady > 100) issues.push('High outbox queue');
  if (checks.database.dlqReady > 10) issues.push('DLQ items pending');
  if (checks.flags.autonomyMode !== 'FULL') issues.push('Not in FULL mode');

  if (issues.length === 0) return 'GREEN';
  if (issues.some(issue => ['Emergency stop active', 'Database disconnected', 'Agents not running'].includes(issue))) {
    return 'RED';
  }
  return 'YELLOW';
}

function generateRecommendations(checks: GreenPosture['checks']): string[] {
  const recommendations: string[] = [];

  if (checks.flags.emergencyStop) {
    recommendations.push('🚨 EMERGENCY: Disable emergency stop flag to resume operations');
  }

  if (!checks.database.connected) {
    recommendations.push('🔌 Check database connection and credentials');
  }

  if (!checks.agents.running) {
    recommendations.push('🤖 Restart autonomous agents: npm run start:autonomous:full');
  }

  if (checks.database.outboxReady > 100) {
    recommendations.push('📦 High outbox queue - check event processing');
  }

  if (checks.database.dlqReady > 10) {
    recommendations.push('⚠️ DLQ items pending - investigate failed events');
  }

  if (checks.flags.autonomyMode !== 'FULL') {
    recommendations.push('⚙️ Set autonomy mode to FULL for full functionality');
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ System is healthy - no action required');
  }

  return recommendations;
}

async function main(): Promise<void> {
  console.log('🔍 Checking Trans Bot AI Green Posture...\n');

  try {
    // Check if autonomous system is locked (running)
    const locked = isLocked();
    const lockPid = locked ? getLockPid() : undefined;

    // Run all checks
    const [flags, database, metrics] = await Promise.all([
      checkFlags(),
      checkDatabase(),
      checkMetrics()
    ]);

    const checks: GreenPosture['checks'] = {
      flags,
      agents: {
        running: locked,
        lockPid: lockPid ?? undefined
      },
      database,
      metrics
    };

    const overall = determineOverallStatus(checks);
    const recommendations = generateRecommendations(checks);

    const posture: GreenPosture = {
      timestamp: new Date().toISOString(),
      overall,
      checks,
      recommendations
    };

    // Display results
    console.log(`📊 Overall Status: ${overall === 'GREEN' ? '🟢' : overall === 'YELLOW' ? '🟡' : '🔴'} ${overall}`);
    console.log(`⏰ Timestamp: ${posture.timestamp}\n`);

    console.log('🏁 Feature Flags:');
    console.log(`   Emergency Stop: ${flags.emergencyStop ? '🔴 ACTIVE' : '🟢 Inactive'}`);
    console.log(`   Autonomy Mode: ${flags.autonomyMode}`);
    console.log(`   Agents Enabled: ${flags.agentsEnabled ? '🟢 Yes' : '🔴 No'}`);
    console.log(`   OTEL Enabled: ${flags.otelEnabled ? '🟢 Yes' : '🔴 No'}\n`);

    console.log('🤖 Agents:');
    console.log(`   Running: ${checks.agents.running ? '🟢 Yes' : '🔴 No'}`);
    if (lockPid) console.log(`   PID: ${lockPid}\n`);

    console.log('🗄️ Database:');
    console.log(`   Connected: ${database.connected ? '🟢 Yes' : '🔴 No'}`);
    console.log(`   Outbox Ready: ${database.outboxReady}`);
    console.log(`   DLQ Ready: ${database.dlqReady}\n`);

    console.log('📈 Metrics:');
    console.log(`   Success Rate: ${metrics.successRate || 'N/A'}%`);
    console.log(`   Queue Depth: ${metrics.queueDepth || 'N/A'}`);
    console.log(`   Running Tasks: ${metrics.runningTasks || 'N/A'}\n`);

    console.log('💡 Recommendations:');
    recommendations.forEach(rec => console.log(`   ${rec}`));

    // Exit with appropriate code
    if (overall === 'RED') {
      console.log('\n❌ System is in RED state - immediate attention required');
      process.exit(1);
    } else if (overall === 'YELLOW') {
      console.log('\n⚠️ System is in YELLOW state - monitor closely');
      process.exit(0);
    } else {
      console.log('\n✅ System is GREEN - all systems operational');
      process.exit(0);
    }

  } catch (error) {
    console.error('❌ Failed to check green posture:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
