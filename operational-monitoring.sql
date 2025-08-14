-- =============================================================================
-- OPERATIONAL MONITORING QUERIES
-- =============================================================================
-- 72-hour watchlist and quick health checks for autonomous system
-- Run these queries to monitor system health and compliance

-- =============================================================================
-- 1. REPLAY FAILURE RATIO (Last 24h)
-- =============================================================================

-- Check DLQ replay failure rate
SELECT 
    ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'failed')::NUMERIC / 
          GREATEST(1, COUNT(*)), 2) AS replay_fail_pct,
    COUNT(*) AS total_replays,
    COUNT(*) FILTER (WHERE status = 'failed') AS failed_replays,
    COUNT(*) FILTER (WHERE status = 'success') AS successful_replays,
    MAX(created_at) AS last_replay_time
FROM dlq_runs 
WHERE created_at > NOW() - INTERVAL '24 hours';

-- =============================================================================
-- 2. SELF-HEAL EVENTS (Last 24h)
-- =============================================================================

-- Check for auto-rollback events
SELECT 
    created_at,
    details->>'reason' AS reason,
    details->>'action' AS action,
    details->>'trace_id' AS trace_id
FROM audit_log
WHERE action = 'ci_auto_rollback' 
  AND created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- =============================================================================
-- 3. OUTBOX LAG MONITORING
-- =============================================================================

-- Check outbox freshness and lag
WITH outbox_stats AS (
    SELECT 
        EXTRACT(EPOCH FROM (NOW() - MAX(created_at))) * 1000 AS lag_ms,
        COUNT(*) AS total_events,
        COUNT(*) FILTER (WHERE status = 'pending') AS pending_events,
        COUNT(*) FILTER (WHERE status = 'processed') AS processed_events
    FROM event_outbox 
    WHERE created_at > NOW() - INTERVAL '15 minutes'
)
SELECT 
    COALESCE(lag_ms, 0)::INT AS outbox_lag_ms,
    total_events,
    pending_events,
    processed_events,
    CASE 
        WHEN lag_ms < 2000 THEN '🟢 EXCELLENT'
        WHEN lag_ms < 5000 THEN '🟡 GOOD'
        WHEN lag_ms < 10000 THEN '🟠 WARNING'
        ELSE '🔴 CRITICAL'
    END AS status
FROM outbox_stats;

-- =============================================================================
-- 4. DLQ DEPTH MONITORING
-- =============================================================================

-- Check DLQ depth and health
SELECT 
    COUNT(*) AS dlq_depth_15m,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '5 minutes') AS dlq_depth_5m,
    COUNT(*) FILTER (WHERE retry_count > 3) AS high_retry_count,
    COUNT(*) FILTER (WHERE status = 'quarantined') AS quarantined_items,
    MAX(created_at) AS oldest_item,
    MIN(created_at) AS newest_item
FROM dlq_items 
WHERE created_at > NOW() - INTERVAL '15 minutes';

-- =============================================================================
-- 5. AGENT SLO COMPLIANCE (Rolling 15m)
-- =============================================================================

-- Monitor agent success rates and performance
SELECT 
    company_id,
    COUNT(*) AS total_tasks,
    COUNT(*) FILTER (WHERE status IN ('queued', 'pending')) AS queue_depth,
    COUNT(*) FILTER (WHERE status = 'running') AS running_tasks,
    COUNT(*) FILTER (WHERE status = 'done') AS completed_tasks,
    COUNT(*) FILTER (WHERE status = 'failed') AS failed_tasks,
    COUNT(*) FILTER (WHERE status = 'quarantined') AS quarantined_tasks,
    ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'done')::NUMERIC / 
          GREATEST(1, COUNT(*) FILTER (WHERE status IN ('done', 'failed', 'quarantined'))), 2) AS success_pct,
    AVG(EXTRACT(EPOCH FROM (updated_at - created_at)) * 1000)::INT AS avg_execution_time_ms
FROM agent_tasks
WHERE updated_at >= NOW() - INTERVAL '15 minutes'
GROUP BY company_id
ORDER BY total_tasks DESC
LIMIT 10;

-- =============================================================================
-- 6. BUDGET COMPLIANCE CHECK
-- =============================================================================

-- Verify budget and rate limits are not breached
SELECT 
    'budget.agents.maxConcurrent' AS budget_type,
    value AS configured_limit,
    (SELECT COUNT(*) FROM agent_tasks WHERE status = 'running') AS current_usage,
    CASE 
        WHEN (SELECT COUNT(*) FROM agent_tasks WHERE status = 'running') <= value THEN '🟢 OK'
        ELSE '🔴 BREACHED'
    END AS status
FROM feature_flags_v2 
WHERE key = 'budget.agents.maxConcurrent' AND scope = 'global'

UNION ALL

SELECT 
    'budget.replay.maxBatch' AS budget_type,
    value AS configured_limit,
    (SELECT COUNT(*) FROM dlq_items WHERE status = 'pending' AND retry_count = 0) AS current_usage,
    CASE 
        WHEN (SELECT COUNT(*) FROM dlq_items WHERE status = 'pending' AND retry_count = 0) <= value THEN '🟢 OK'
        ELSE '🔴 BREACHED'
    END AS status
FROM feature_flags_v2 
WHERE key = 'budget.replay.maxBatch' AND scope = 'global';

-- =============================================================================
-- 7. FEATURE FLAG STATUS CHECK
-- =============================================================================

-- Monitor key feature flags
SELECT 
    key,
    value,
    scope,
    reason,
    owner_name,
    updated_at,
    CASE 
        WHEN key = 'autonomy.emergencyStop' AND value = true THEN '🔴 EMERGENCY STOP ACTIVE'
        WHEN key = 'autonomy.emergencyStop' AND value = false THEN '🟢 SYSTEM RUNNING'
        WHEN key = 'agents.autonomousEnabled' AND value = true THEN '🟢 AGENTS ENABLED'
        WHEN key = 'agents.autonomousEnabled' AND value = false THEN '🔴 AGENTS DISABLED'
        ELSE '⚪ NORMAL'
    END AS status
FROM feature_flags_v2 
WHERE key IN (
    'autonomy.emergencyStop',
    'autonomy.mode',
    'agents.autonomousEnabled',
    'obs.otelEnabled'
)
ORDER BY key;

-- =============================================================================
-- 8. PORTAL AUTONOMY STATUS
-- =============================================================================

-- Check portal autonomy flags
SELECT 
    REPLACE(key, 'portal.', '') AS portal_name,
    value AS autonomous_enabled,
    CASE 
        WHEN value = true THEN '🟢 AUTONOMOUS'
        ELSE '🔴 MANUAL'
    END AS status
FROM feature_flags_v2 
WHERE key LIKE 'portal.%.autonomous' 
  AND scope = 'global'
ORDER BY portal_name;

-- =============================================================================
-- 9. WEBSITE AUTHORITY STATUS
-- =============================================================================

-- Check website autonomy flags
SELECT 
    REPLACE(key, 'website.', '') AS website_feature,
    value AS autonomous_enabled,
    CASE 
        WHEN value = true THEN '🟢 AUTONOMOUS'
        ELSE '🔴 MANUAL'
    END AS status
FROM feature_flags_v2 
WHERE key LIKE 'website.%.autonomous' 
  AND scope = 'global'
ORDER BY website_feature;

-- =============================================================================
-- 10. AUDIT TRAIL SUMMARY (Last Hour)
-- =============================================================================

-- Monitor recent audit activity
SELECT 
    action,
    COUNT(*) AS action_count,
    COUNT(DISTINCT owner_name) AS unique_actors,
    MAX(created_at) AS last_action,
    CASE 
        WHEN action LIKE '%emergency%' THEN '🚨 CRITICAL'
        WHEN action LIKE '%rollback%' THEN '⚠️  WARNING'
        ELSE 'ℹ️  INFO'
    END AS severity
FROM audit_log
WHERE created_at > NOW() - INTERVAL '1 hour'
GROUP BY action
ORDER BY action_count DESC;

-- =============================================================================
-- 11. SYSTEM HEALTH SUMMARY
-- =============================================================================

-- Overall system health check
WITH health_metrics AS (
    SELECT 
        -- Outbox lag
        (SELECT COALESCE(EXTRACT(EPOCH FROM (NOW() - MAX(created_at))) * 1000, 0)::INT 
         FROM event_outbox 
         WHERE created_at > NOW() - INTERVAL '15 minutes') AS outbox_lag_ms,
        
        -- DLQ depth
        (SELECT COUNT(*) 
         FROM dlq_items 
         WHERE created_at > NOW() - INTERVAL '15 minutes') AS dlq_depth,
        
        -- Agent success rate
        (SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'done')::NUMERIC / 
                      GREATEST(1, COUNT(*) FILTER (WHERE status IN ('done', 'failed', 'quarantined'))), 2)
         FROM agent_tasks 
         WHERE updated_at >= NOW() - INTERVAL '15 minutes') AS agent_success_pct,
        
        -- Emergency stop status
        (SELECT value 
         FROM feature_flags_v2 
         WHERE key = 'autonomy.emergencyStop' AND scope = 'global') AS emergency_stop_active,
        
        -- Agent autonomy status
        (SELECT value 
         FROM feature_flags_v2 
         WHERE key = 'agents.autonomousEnabled' AND scope = 'global') AS agents_enabled
)
SELECT 
    outbox_lag_ms,
    dlq_depth,
    agent_success_pct,
    emergency_stop_active,
    agents_enabled,
    CASE 
        WHEN emergency_stop_active = true THEN '🔴 EMERGENCY STOP'
        WHEN outbox_lag_ms > 5000 THEN '🟠 DEGRADED'
        WHEN dlq_depth > 20 THEN '🟠 DEGRADED'
        WHEN agent_success_pct < 98 THEN '🟠 DEGRADED'
        WHEN agents_enabled = false THEN '🔴 AGENTS DISABLED'
        ELSE '🟢 HEALTHY'
    END AS overall_status
FROM health_metrics;

-- =============================================================================
-- 12. QUICK STATUS COMMANDS
-- =============================================================================

-- Emergency stop check (one-liner)
-- SELECT value FROM feature_flags_v2 WHERE key = 'autonomy.emergencyStop' AND scope = 'global';

-- Agent status check (one-liner)
-- SELECT value FROM feature_flags_v2 WHERE key = 'agents.autonomousEnabled' AND scope = 'global';

-- Portal count check (one-liner)
-- SELECT COUNT(*) FROM feature_flags_v2 WHERE key LIKE 'portal.%.autonomous' AND scope = 'global';

-- Website authority count (one-liner)
-- SELECT COUNT(*) FROM feature_flags_v2 WHERE key LIKE 'website.%.autonomous' AND scope = 'global';

-- =============================================================================
-- MONITORING NOTES
-- =============================================================================

/*
🟢 GREEN STATUS INDICATORS:
- Outbox lag < 5s
- DLQ depth < 20 items
- Agent success rate > 98%
- Emergency stop = false
- Agents enabled = true
- No auto-rollback events
- Replay failure rate < 2%

🟠 WARNING INDICATORS:
- Outbox lag 5-10s
- DLQ depth 20-50 items
- Agent success rate 95-98%
- High retry counts
- Recent auto-rollback events

🔴 CRITICAL INDICATORS:
- Outbox lag > 10s
- DLQ depth > 50 items
- Agent success rate < 95%
- Emergency stop active
- Agents disabled
- Multiple auto-rollback events
- Replay failure rate > 5%

📊 MONITORING SCHEDULE:
- Every 30s: Health probes, SLO gates
- Every 5m: DLQ replay, cleanup
- Every hour: Guardrail scans
- Every day: TTL cleanup, backups
- Every week: DR drills, security scans
- Every month: Key rotation, cost review
*/
