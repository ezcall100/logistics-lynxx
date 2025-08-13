-- ==========================================
-- POST-DEPLOY SQL SPOT CHECKS
-- ==========================================
-- Run these queries after deployment to verify hardening is working

-- 1. Idempotency constraints present
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(c.oid) as constraint_definition
FROM pg_constraint c
WHERE c.conrelid = 'public.replay_runs'::regclass
ORDER BY conname;

-- 2. Rate limit window moving (should show recent activity)
SELECT 
    key,
    requests,
    window_start,
    window_end,
    created_at
FROM public.edge_rate_limits
WHERE key LIKE 'replay:%' 
ORDER BY window_start DESC 
LIMIT 5;

-- 3. Audit trail entries (should show replay operations)
SELECT 
    action,
    created_at,
    scope,
    target_count,
    success_count,
    failure_count,
    metadata->>'replay_run_id' as replay_run_id
FROM public.audit_logs
WHERE action IN ('dlq_replay', 'dlq_replay_started', 'dlq_replay_completed')
ORDER BY created_at DESC 
LIMIT 10;

-- 4. Replay runs table health check
SELECT 
    status,
    COUNT(*) as count,
    AVG(total_processed) as avg_processed,
    AVG(successful) as avg_successful,
    AVG(failed) as avg_failed
FROM public.replay_runs
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY status
ORDER BY status;

-- 5. DLQ health check
SELECT 
    company_id,
    COUNT(*) as dlq_items,
    COUNT(*) FILTER (WHERE retry_count >= max_retries) as exhausted_items,
    AVG(retry_count) as avg_retry_count
FROM public.dead_letter_queue
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY company_id
ORDER BY dlq_items DESC
LIMIT 10;

-- 6. Outbox processing health
SELECT 
    COUNT(*) as total_events,
    COUNT(*) FILTER (WHERE processed_at IS NOT NULL) as processed_events,
    COUNT(*) FILTER (WHERE processed_at IS NULL) as pending_events,
    AVG(attempts) as avg_attempts,
    MAX(attempts) as max_attempts
FROM public.event_outbox
WHERE created_at >= NOW() - INTERVAL '1 hour';

-- 7. Agent controls status
SELECT 
    company_id,
    agents_paused,
    agents_drain,
    pause_reason,
    pause_initiated_at
FROM public.agent_controls
WHERE updated_at >= NOW() - INTERVAL '24 hours'
ORDER BY updated_at DESC;

-- 8. Feature flags status (if feature_flags table exists)
-- Uncomment if you have a feature_flags table
/*
SELECT 
    key,
    company_id,
    enabled,
    rollout_percentage,
    updated_at
FROM public.feature_flags
WHERE key LIKE 'outbox%' OR key LIKE 'dlq%'
ORDER BY updated_at DESC;
*/

-- 9. System health summary
WITH health_summary AS (
    SELECT 
        'DLQ Items' as metric,
        COUNT(*) as value
    FROM public.dead_letter_queue
    WHERE created_at >= NOW() - INTERVAL '1 hour'
    
    UNION ALL
    
    SELECT 
        'Pending Outbox Events' as metric,
        COUNT(*) as value
    FROM public.event_outbox
    WHERE processed_at IS NULL
    
    UNION ALL
    
    SELECT 
        'Active Replay Runs' as metric,
        COUNT(*) as value
    FROM public.replay_runs
    WHERE status = 'pending'
    
    UNION ALL
    
    SELECT 
        'Rate Limit Entries' as metric,
        COUNT(*) as value
    FROM public.edge_rate_limits
    WHERE created_at >= NOW() - INTERVAL '1 hour'
)
SELECT 
    metric,
    value,
    CASE 
        WHEN metric = 'DLQ Items' AND value > 100 THEN '⚠️ High'
        WHEN metric = 'Pending Outbox Events' AND value > 50 THEN '⚠️ High'
        WHEN metric = 'Active Replay Runs' AND value > 5 THEN '⚠️ High'
        ELSE '✅ Normal'
    END as status
FROM health_summary
ORDER BY metric;

-- 10. Performance check - slow queries
SELECT 
    schemaname,
    tablename,
    attname,
    n_distinct,
    correlation
FROM pg_stats
WHERE tablename IN ('replay_runs', 'edge_rate_limits', 'audit_logs', 'dead_letter_queue', 'event_outbox')
ORDER BY n_distinct DESC
LIMIT 20;
