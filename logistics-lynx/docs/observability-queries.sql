-- ==========================================
-- OBSERVABILITY QUERIES FOR TMS DEPLOYMENT
-- ==========================================
-- Copy these into your Exec dashboard for real-time monitoring

-- ==========================================
-- 1. OUTBOX LAG MONITORING
-- ==========================================

-- Outbox lag (seconds) - oldest unprocessed event
SELECT 
  COALESCE(EXTRACT(EPOCH FROM (NOW() - inserted_at)), 0)::int AS lag_seconds,
  COUNT(*) AS unprocessed_count
FROM event_outbox 
WHERE processed_at IS NULL
ORDER BY inserted_at ASC
LIMIT 1;

-- Outbox processing rate (events per minute)
SELECT 
  DATE_TRUNC('minute', processed_at) AS minute,
  COUNT(*) AS processed_count,
  AVG(EXTRACT(EPOCH FROM (processed_at - inserted_at)))::int AS avg_processing_time_seconds
FROM event_outbox 
WHERE processed_at >= NOW() - INTERVAL '1 hour'
  AND processed_at IS NOT NULL
GROUP BY minute
ORDER BY minute DESC;

-- Outbox by target system (n8n, realtime, slack)
SELECT 
  target_system,
  COUNT(*) AS total_events,
  COUNT(*) FILTER (WHERE processed_at IS NULL) AS unprocessed,
  COUNT(*) FILTER (WHERE processed_at IS NOT NULL) AS processed,
  ROUND(100.0 * COUNT(*) FILTER (WHERE processed_at IS NOT NULL) / NULLIF(COUNT(*), 0), 2) AS success_rate_pct
FROM event_outbox 
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY target_system
ORDER BY total_events DESC;

-- ==========================================
-- 2. DEAD LETTER QUEUE MONITORING
-- ==========================================

-- DLQ size & hot tenants (last 24 hours)
SELECT 
  company_id,
  COUNT(*) AS dlq_items,
  COUNT(*) FILTER (WHERE retry_count >= max_retries) AS exhausted_retries,
  COUNT(*) FILTER (WHERE retry_after <= NOW()) AS ready_for_retry,
  MAX(created_at) AS latest_failure
FROM dead_letter_queue
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY company_id
ORDER BY dlq_items DESC
LIMIT 10;

-- DLQ by error type
SELECT 
  error_type,
  COUNT(*) AS failure_count,
  COUNT(*) FILTER (WHERE retry_count >= max_retries) AS exhausted_count,
  AVG(retry_count)::int AS avg_retry_count,
  MAX(created_at) AS latest_occurrence
FROM dead_letter_queue
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY error_type
ORDER BY failure_count DESC;

-- DLQ retryable items (ready for retry)
SELECT 
  COUNT(*) AS ready_for_retry,
  COUNT(*) FILTER (WHERE priority = 1) AS high_priority_ready,
  MIN(retry_after) AS earliest_retry_time,
  MAX(retry_after) AS latest_retry_time
FROM dead_letter_queue
WHERE retry_after <= NOW() 
  AND retry_count < max_retries;

-- ==========================================
-- 3. AGENT PERFORMANCE MONITORING
-- ==========================================

-- Agent SLO (15-minute window)
SELECT
  ROUND(100.0 * SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)::numeric
        / NULLIF(SUM(CASE WHEN status IN ('completed', 'failed', 'quarantined') THEN 1 ELSE 0 END), 0), 2) AS success_pct,
  COUNT(*) FILTER (WHERE status = 'running') AS running_tasks,
  COUNT(*) FILTER (WHERE status IN ('queued', 'pending')) AS queue_depth,
  COUNT(*) FILTER (WHERE status = 'failed') AS failed_tasks,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at)))::int AS avg_completion_time_seconds
FROM agent_tasks
WHERE updated_at >= NOW() - INTERVAL '15 minutes';

-- Agent performance by type
SELECT 
  agent_name,
  COUNT(*) AS total_tasks,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed,
  COUNT(*) FILTER (WHERE status = 'failed') AS failed,
  ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'completed') / NULLIF(COUNT(*), 0), 2) AS success_rate_pct,
  AVG(EXTRACT(EPOCH FROM (updated_at - created_at)))::int AS avg_duration_seconds
FROM agent_tasks
WHERE created_at >= NOW() - INTERVAL '1 hour'
GROUP BY agent_name
ORDER BY total_tasks DESC;

-- Agent queue depth by company
SELECT 
  company_id,
  COUNT(*) AS queued_tasks,
  COUNT(*) FILTER (WHERE status = 'queued') AS pending,
  COUNT(*) FILTER (WHERE status = 'running') AS in_progress,
  MAX(created_at) AS oldest_task
FROM agent_tasks
WHERE status IN ('queued', 'pending', 'running')
GROUP BY company_id
ORDER BY queued_tasks DESC;

-- ==========================================
-- 4. PAUSE/DRAIN CONTROLS MONITORING
-- ==========================================

-- Companies with active controls
SELECT 
  company_id,
  agents_paused,
  agents_drain,
  pause_reason,
  pause_initiated_by,
  pause_initiated_at,
  CASE 
    WHEN agents_paused THEN 'PAUSED'
    WHEN agents_drain THEN 'DRAINING'
    ELSE 'ACTIVE'
  END AS status
FROM agent_controls
WHERE agents_paused = TRUE OR agents_drain = TRUE
ORDER BY updated_at DESC;

-- Drain progress (tasks remaining for draining companies)
SELECT 
  ac.company_id,
  ac.agents_drain,
  ac.drain_completed_at,
  COUNT(at.id) AS remaining_tasks,
  COUNT(at.id) FILTER (WHERE at.status IN ('queued', 'pending')) AS queued_tasks,
  COUNT(at.id) FILTER (WHERE at.status = 'running') AS running_tasks
FROM agent_controls ac
LEFT JOIN agent_tasks at ON ac.company_id = at.company_id 
  AND at.status IN ('queued', 'pending', 'running')
WHERE ac.agents_drain = TRUE
GROUP BY ac.company_id, ac.agents_drain, ac.drain_completed_at;

-- ==========================================
-- 5. IDEMPOTENCY MONITORING
-- ==========================================

-- Idempotency hit rate (duplicate prevention)
SELECT 
  DATE_TRUNC('hour', created_at) AS hour,
  COUNT(*) AS total_events,
  COUNT(*) FILTER (WHERE idempotency_key IS NOT NULL) AS with_idempotency,
  COUNT(*) FILTER (WHERE idempotency_key IS NULL) AS without_idempotency,
  ROUND(100.0 * COUNT(*) FILTER (WHERE idempotency_key IS NOT NULL) / NULLIF(COUNT(*), 0), 2) AS idempotency_coverage_pct
FROM event_outbox
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY hour
ORDER BY hour DESC;

-- Duplicate idempotency keys (potential issues)
SELECT 
  idempotency_key,
  COUNT(*) AS duplicate_count,
  MIN(created_at) AS first_occurrence,
  MAX(created_at) AS last_occurrence,
  STRING_AGG(DISTINCT topic, ', ') AS topics
FROM event_outbox
WHERE idempotency_key IS NOT NULL
  AND created_at >= NOW() - INTERVAL '24 hours'
GROUP BY idempotency_key
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- ==========================================
-- 6. SYSTEM HEALTH DASHBOARD
-- ==========================================

-- Overall system health summary
WITH system_metrics AS (
  SELECT
    -- Outbox health
    (SELECT COUNT(*) FROM event_outbox WHERE processed_at IS NULL) AS outbox_unprocessed,
    (SELECT COALESCE(EXTRACT(EPOCH FROM (NOW() - MIN(inserted_at))), 0)::int 
     FROM event_outbox WHERE processed_at IS NULL) AS outbox_lag_seconds,
    
    -- DLQ health
    (SELECT COUNT(*) FROM dead_letter_queue WHERE retry_after <= NOW() AND retry_count < max_retries) AS dlq_ready_for_retry,
    (SELECT COUNT(*) FROM dead_letter_queue WHERE retry_count >= max_retries) AS dlq_exhausted,
    
    -- Agent health
    (SELECT COUNT(*) FROM agent_tasks WHERE status IN ('queued', 'pending')) AS agent_queue_depth,
    (SELECT COUNT(*) FROM agent_tasks WHERE status = 'running') AS agent_running,
    (SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'completed') / NULLIF(COUNT(*), 0), 2)
     FROM agent_tasks WHERE updated_at >= NOW() - INTERVAL '15 minutes') AS agent_success_rate,
    
    -- Control health
    (SELECT COUNT(*) FROM agent_controls WHERE agents_paused = TRUE) AS companies_paused,
    (SELECT COUNT(*) FROM agent_controls WHERE agents_drain = TRUE) AS companies_draining
)
SELECT 
  CASE 
    WHEN outbox_lag_seconds > 5 THEN 'CRITICAL'
    WHEN outbox_lag_seconds > 2 THEN 'WARNING'
    ELSE 'HEALTHY'
  END AS outbox_status,
  CASE 
    WHEN dlq_exhausted > 10 THEN 'CRITICAL'
    WHEN dlq_ready_for_retry > 5 THEN 'WARNING'
    ELSE 'HEALTHY'
  END AS dlq_status,
  CASE 
    WHEN agent_success_rate < 95 THEN 'CRITICAL'
    WHEN agent_success_rate < 98 THEN 'WARNING'
    ELSE 'HEALTHY'
  END AS agent_status,
  CASE 
    WHEN companies_paused > 0 OR companies_draining > 0 THEN 'ACTIVE_CONTROLS'
    ELSE 'NORMAL'
  END AS control_status,
  *
FROM system_metrics;

-- ==========================================
-- 7. ALERTING THRESHOLDS
-- ==========================================

-- Critical alerts (run every minute)
SELECT 
  'OUTBOX_LAG' AS alert_type,
  'CRITICAL' AS severity,
  'Outbox lag exceeds 5 seconds' AS message,
  outbox_lag_seconds AS value
FROM (
  SELECT COALESCE(EXTRACT(EPOCH FROM (NOW() - MIN(inserted_at))), 0)::int AS outbox_lag_seconds
  FROM event_outbox WHERE processed_at IS NULL
) lag_check
WHERE outbox_lag_seconds > 5

UNION ALL

SELECT 
  'DLQ_EXHAUSTED' AS alert_type,
  'CRITICAL' AS severity,
  'Too many exhausted DLQ items' AS message,
  exhausted_count AS value
FROM (
  SELECT COUNT(*) AS exhausted_count
  FROM dead_letter_queue WHERE retry_count >= max_retries
) dlq_check
WHERE exhausted_count > 10

UNION ALL

SELECT 
  'AGENT_FAILURE_RATE' AS alert_type,
  'CRITICAL' AS severity,
  'Agent success rate below 95%' AS message,
  success_rate AS value
FROM (
  SELECT ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'completed') / NULLIF(COUNT(*), 0), 2) AS success_rate
  FROM agent_tasks WHERE updated_at >= NOW() - INTERVAL '15 minutes'
) agent_check
WHERE success_rate < 95;
