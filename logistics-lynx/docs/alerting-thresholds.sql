-- ==========================================
-- ALERTING THRESHOLDS - SQL-DRIVEN MONITORING
-- ==========================================
-- Use these queries to power your alerting system

-- 1. Replay failure rate (5m) > 20% → WARN, > 40% → PAGE
WITH replay_failure_rate AS (
    SELECT 
        COUNT(*) as total_replays,
        COUNT(*) FILTER (WHERE failed > 0) as failed_replays,
        ROUND(
            (COUNT(*) FILTER (WHERE failed > 0)::numeric / NULLIF(COUNT(*), 0)) * 100, 2
        ) as failure_rate_pct
    FROM public.replay_runs
    WHERE created_at >= NOW() - INTERVAL '5 minutes'
)
SELECT 
    total_replays,
    failed_replays,
    failure_rate_pct,
    CASE 
        WHEN failure_rate_pct > 40 THEN '🚨 PAGE - Critical failure rate'
        WHEN failure_rate_pct > 20 THEN '⚠️ WARN - High failure rate'
        ELSE '✅ Normal'
    END as alert_level
FROM replay_failure_rate;

-- 2. DLQ size growing 3× baseline over 10m → WARN
WITH dlq_growth AS (
    SELECT 
        company_id,
        COUNT(*) as current_size,
        LAG(COUNT(*)) OVER (PARTITION BY company_id ORDER BY time_bucket('10 minutes', created_at)) as baseline_size,
        ROUND(
            (COUNT(*)::numeric / NULLIF(LAG(COUNT(*)) OVER (PARTITION BY company_id ORDER BY time_bucket('10 minutes', created_at)), 0)), 2
        ) as growth_multiplier
    FROM public.dead_letter_queue
    WHERE created_at >= NOW() - INTERVAL '20 minutes'
    GROUP BY company_id, time_bucket('10 minutes', created_at)
)
SELECT 
    company_id,
    current_size,
    baseline_size,
    growth_multiplier,
    CASE 
        WHEN growth_multiplier > 3 THEN '⚠️ WARN - DLQ growing rapidly'
        WHEN growth_multiplier > 2 THEN '📈 Monitor - DLQ growing'
        ELSE '✅ Normal'
    END as alert_level
FROM dlq_growth
WHERE growth_multiplier > 2
ORDER BY growth_multiplier DESC;

-- 3. Outbox lag p95 > 5s for 10m → PAGE
WITH outbox_lag AS (
    SELECT 
        EXTRACT(EPOCH FROM (NOW() - inserted_at)) as lag_seconds
    FROM public.event_outbox
    WHERE processed_at IS NULL
    ORDER BY inserted_at ASC
    LIMIT 1000
),
lag_percentiles AS (
    SELECT 
        percentile_cont(0.95) WITHIN GROUP (ORDER BY lag_seconds) as p95_lag,
        AVG(lag_seconds) as avg_lag,
        COUNT(*) as pending_events
    FROM outbox_lag
)
SELECT 
    p95_lag,
    avg_lag,
    pending_events,
    CASE 
        WHEN p95_lag > 5 THEN '🚨 PAGE - Outbox lag critical'
        WHEN p95_lag > 2 THEN '⚠️ WARN - Outbox lag high'
        ELSE '✅ Normal'
    END as alert_level
FROM lag_percentiles;

-- 4. Idempotency collisions > 1% daily → INVESTIGATE
WITH idempotency_stats AS (
    SELECT 
        DATE(created_at) as date,
        COUNT(*) as total_requests,
        COUNT(*) FILTER (WHERE error_message LIKE '%duplicate%' OR error_message LIKE '%already processed%') as collision_requests,
        ROUND(
            (COUNT(*) FILTER (WHERE error_message LIKE '%duplicate%' OR error_message LIKE '%already processed%')::numeric / NULLIF(COUNT(*), 0)) * 100, 2
        ) as collision_rate_pct
    FROM public.audit_logs
    WHERE action = 'dlq_replay'
    AND created_at >= NOW() - INTERVAL '24 hours'
    GROUP BY DATE(created_at)
)
SELECT 
    date,
    total_requests,
    collision_requests,
    collision_rate_pct,
    CASE 
        WHEN collision_rate_pct > 1 THEN '🔍 INVESTIGATE - High idempotency collisions'
        WHEN collision_rate_pct > 0.5 THEN '📊 Monitor - Elevated collisions'
        ELSE '✅ Normal'
    END as alert_level
FROM idempotency_stats
ORDER BY date DESC;

-- 5. Agent success rate < 98% for 10 min → PAGE
WITH agent_success_rate AS (
    SELECT 
        COUNT(*) as total_tasks,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_tasks,
        ROUND(
            (COUNT(*) FILTER (WHERE status = 'completed')::numeric / NULLIF(COUNT(*), 0)) * 100, 2
        ) as success_rate_pct
    FROM public.agent_tasks
    WHERE updated_at >= NOW() - INTERVAL '10 minutes'
)
SELECT 
    total_tasks,
    completed_tasks,
    success_rate_pct,
    CASE 
        WHEN success_rate_pct < 98 THEN '🚨 PAGE - Agent success rate critical'
        WHEN success_rate_pct < 99 THEN '⚠️ WARN - Agent success rate low'
        ELSE '✅ Normal'
    END as alert_level
FROM agent_success_rate;

-- 6. Rate limit violations > 10 in 5m → WARN
SELECT 
    COUNT(*) as rate_limit_violations,
    COUNT(DISTINCT key) as unique_keys,
    CASE 
        WHEN COUNT(*) > 10 THEN '⚠️ WARN - High rate limit violations'
        WHEN COUNT(*) > 5 THEN '📊 Monitor - Elevated violations'
        ELSE '✅ Normal'
    END as alert_level
FROM public.edge_rate_limits
WHERE window_end < NOW() - INTERVAL '5 minutes'
AND requests >= 3; -- Assuming max 3 requests per window

-- 7. Audit log gaps (missing entries) → INVESTIGATE
WITH audit_gaps AS (
    SELECT 
        action,
        COUNT(*) as entries,
        MIN(created_at) as first_entry,
        MAX(created_at) as last_entry,
        EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at))) / 3600 as hours_span
    FROM public.audit_logs
    WHERE created_at >= NOW() - INTERVAL '24 hours'
    AND action IN ('dlq_replay', 'outbox_processed', 'agent_task_completed')
    GROUP BY action
)
SELECT 
    action,
    entries,
    hours_span,
    ROUND(entries::numeric / NULLIF(hours_span, 0), 2) as entries_per_hour,
    CASE 
        WHEN entries = 0 THEN '🚨 PAGE - No audit entries'
        WHEN entries_per_hour < 1 THEN '⚠️ WARN - Low audit activity'
        ELSE '✅ Normal'
    END as alert_level
FROM audit_gaps
ORDER BY entries_per_hour ASC;

-- 8. System resource health check
WITH system_health AS (
    SELECT 
        'Active Replay Runs' as metric,
        COUNT(*) as value
    FROM public.replay_runs
    WHERE status = 'pending'
    
    UNION ALL
    
    SELECT 
        'Pending Outbox Events' as metric,
        COUNT(*) as value
    FROM public.event_outbox
    WHERE processed_at IS NULL
    
    UNION ALL
    
    SELECT 
        'Exhausted DLQ Items' as metric,
        COUNT(*) as value
    FROM public.dead_letter_queue
    WHERE retry_count >= max_retries
    
    UNION ALL
    
    SELECT 
        'Paused Companies' as metric,
        COUNT(*) as value
    FROM public.agent_controls
    WHERE agents_paused = true
)
SELECT 
    metric,
    value,
    CASE 
        WHEN metric = 'Active Replay Runs' AND value > 10 THEN '🚨 PAGE - Too many active replays'
        WHEN metric = 'Pending Outbox Events' AND value > 100 THEN '⚠️ WARN - High outbox backlog'
        WHEN metric = 'Exhausted DLQ Items' AND value > 50 THEN '⚠️ WARN - Many exhausted items'
        WHEN metric = 'Paused Companies' AND value > 5 THEN '📊 Monitor - Multiple paused companies'
        ELSE '✅ Normal'
    END as alert_level
FROM system_health
ORDER BY value DESC;

-- 9. Performance degradation detection
WITH performance_metrics AS (
    SELECT 
        'Outbox Processing Time' as metric,
        AVG(EXTRACT(EPOCH FROM (processed_at - inserted_at))) as avg_seconds,
        percentile_cont(0.95) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (processed_at - inserted_at))) as p95_seconds
    FROM public.event_outbox
    WHERE processed_at IS NOT NULL
    AND processed_at >= NOW() - INTERVAL '1 hour'
    
    UNION ALL
    
    SELECT 
        'Replay Execution Time' as metric,
        AVG(EXTRACT(EPOCH FROM (completed_at - requested_at))) as avg_seconds,
        percentile_cont(0.95) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (completed_at - requested_at))) as p95_seconds
    FROM public.replay_runs
    WHERE completed_at IS NOT NULL
    AND completed_at >= NOW() - INTERVAL '1 hour'
)
SELECT 
    metric,
    ROUND(avg_seconds, 2) as avg_seconds,
    ROUND(p95_seconds, 2) as p95_seconds,
    CASE 
        WHEN p95_seconds > 30 THEN '🚨 PAGE - Critical performance degradation'
        WHEN p95_seconds > 10 THEN '⚠️ WARN - Performance degradation'
        WHEN avg_seconds > 5 THEN '📊 Monitor - Elevated processing time'
        ELSE '✅ Normal'
    END as alert_level
FROM performance_metrics
ORDER BY p95_seconds DESC;

-- 10. Comprehensive health dashboard query
SELECT 
    'System Health Summary' as section,
    metric,
    value,
    threshold,
    CASE 
        WHEN value > threshold THEN '🚨 Critical'
        WHEN value > threshold * 0.8 THEN '⚠️ Warning'
        ELSE '✅ Healthy'
    END as status
FROM (
    VALUES 
        ('DLQ Items', (SELECT COUNT(*) FROM public.dead_letter_queue WHERE created_at >= NOW() - INTERVAL '1 hour'), 100),
        ('Pending Outbox', (SELECT COUNT(*) FROM public.event_outbox WHERE processed_at IS NULL), 50),
        ('Active Replays', (SELECT COUNT(*) FROM public.replay_runs WHERE status = 'pending'), 5),
        ('Failed Replays', (SELECT COUNT(*) FROM public.replay_runs WHERE status = 'failed' AND created_at >= NOW() - INTERVAL '1 hour'), 10)
) AS health_metrics(metric, value, threshold)
ORDER BY value DESC;
