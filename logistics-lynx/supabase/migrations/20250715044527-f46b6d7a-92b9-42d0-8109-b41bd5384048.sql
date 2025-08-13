-- Additional Performance Optimizations - Part 2

-- 1. Add GIN indexes for JSONB columns
CREATE INDEX IF NOT EXISTS idx_ai_confidence_logs_context_gin ON public.ai_confidence_logs USING GIN(context);
CREATE INDEX IF NOT EXISTS idx_ai_confidence_logs_decision_data_gin ON public.ai_confidence_logs USING GIN(decision_data);
CREATE INDEX IF NOT EXISTS idx_ai_decisions_context_gin ON public.ai_decisions USING GIN(context);
CREATE INDEX IF NOT EXISTS idx_ai_decisions_decision_gin ON public.ai_decisions USING GIN(decision);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_result_gin ON public.autonomous_tasks USING GIN(result);
CREATE INDEX IF NOT EXISTS idx_shipments_ai_recommendations_gin ON public.shipments USING GIN(ai_recommendations);
CREATE INDEX IF NOT EXISTS idx_user_analytics_event_data_gin ON public.user_analytics USING GIN(event_data);

-- 2. Add text search indexes for autonomous agent operations
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_description_trgm ON public.autonomous_tasks USING GIN(description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_task_name_trgm ON public.autonomous_tasks USING GIN(task_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_alerts_message_trgm ON public.alerts USING GIN(message gin_trgm_ops);

-- 3. Create materialized view for autonomous agent dashboard
CREATE MATERIALIZED VIEW IF NOT EXISTS public.autonomous_agent_performance_summary AS
SELECT 
    agent_type,
    COUNT(*) as total_tasks,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_tasks,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_tasks,
    COUNT(*) FILTER (WHERE status = 'in_progress') as active_tasks,
    COUNT(*) FILTER (WHERE status = 'pending') as pending_tasks,
    AVG(EXTRACT(EPOCH FROM (completed_at - started_at))/60) as avg_duration_minutes,
    MAX(created_at) as last_task_created
FROM public.autonomous_tasks 
GROUP BY agent_type;

CREATE UNIQUE INDEX IF NOT EXISTS idx_agent_performance_summary_agent_type ON public.autonomous_agent_performance_summary(agent_type);

-- 4. Create function to refresh materialized view
CREATE OR REPLACE FUNCTION public.refresh_autonomous_agent_performance()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    REFRESH MATERIALIZED VIEW public.autonomous_agent_performance_summary;
END;
$$;

-- 5. Create optimized functions for autonomous operations
CREATE OR REPLACE FUNCTION public.get_active_autonomous_tasks(p_agent_type text DEFAULT NULL)
RETURNS TABLE(
    task_id text,
    agent_type text,
    task_name text,
    status text,
    priority integer,
    created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT t.task_id, t.agent_type, t.task_name, t.status, t.priority, t.created_at
    FROM public.autonomous_tasks t
    WHERE (p_agent_type IS NULL OR t.agent_type = p_agent_type)
    AND t.status IN ('pending', 'in_progress')
    ORDER BY t.priority DESC, t.created_at ASC;
$$;

CREATE OR REPLACE FUNCTION public.get_agent_performance_metrics(p_agent_type text)
RETURNS TABLE(
    total_tasks bigint,
    completed_tasks bigint,
    success_rate numeric,
    avg_duration_minutes numeric
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT 
        COUNT(*) as total_tasks,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_tasks,
        ROUND(
            (COUNT(*) FILTER (WHERE status = 'completed')::numeric / 
             NULLIF(COUNT(*), 0) * 100), 2
        ) as success_rate,
        ROUND(
            AVG(EXTRACT(EPOCH FROM (completed_at - started_at))/60), 2
        ) as avg_duration_minutes
    FROM public.autonomous_tasks 
    WHERE agent_type = p_agent_type;
$$;

-- 6. Update table statistics for query planner optimization
ANALYZE public.autonomous_tasks;
ANALYZE public.agent_health_checks;
ANALYZE public.agent_status_logs;
ANALYZE public.ai_confidence_logs;
ANALYZE public.ai_decisions;
ANALYZE public.task_completions;
ANALYZE public.alerts;
ANALYZE public.shipments;
ANALYZE public.drivers;
ANALYZE public.vehicles;