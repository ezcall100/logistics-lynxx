
-- 1) SECURITY: Enable RLS and add strict policies to sensitive agent tables
-- Pattern:
-- - service_role: FULL access (server-side only)
-- - super_admins: SELECT (read) access
-- - everyone else: no access by default

-- agent_decisions
ALTER TABLE public.agent_decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_decisions FORCE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Service role only access (agent_decisions)'
  ) THEN
    CREATE POLICY "Service role only access (agent_decisions)"
      ON public.agent_decisions
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Super admins can view agent decisions'
  ) THEN
    CREATE POLICY "Super admins can view agent decisions"
      ON public.agent_decisions
      FOR SELECT
      TO authenticated
      USING (is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));
  END IF;
END$$;

-- agent_events
ALTER TABLE public.agent_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_events FORCE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Service role only access (agent_events)'
  ) THEN
    CREATE POLICY "Service role only access (agent_events)"
      ON public.agent_events
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Super admins can view agent events'
  ) THEN
    CREATE POLICY "Super admins can view agent events"
      ON public.agent_events
      FOR SELECT
      TO authenticated
      USING (is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));
  END IF;
END$$;

-- agent_registry
ALTER TABLE public.agent_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_registry FORCE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Service role only access (agent_registry)'
  ) THEN
    CREATE POLICY "Service role only access (agent_registry)"
      ON public.agent_registry
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Super admins can view agent registry'
  ) THEN
    CREATE POLICY "Super admins can view agent registry"
      ON public.agent_registry
      FOR SELECT
      TO authenticated
      USING (is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));
  END IF;
END$$;

-- agent_tasks
ALTER TABLE public.agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_tasks FORCE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Service role only access (agent_tasks)'
  ) THEN
    CREATE POLICY "Service role only access (agent_tasks)"
      ON public.agent_tasks
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Super admins can view agent tasks'
  ) THEN
    CREATE POLICY "Super admins can view agent tasks"
      ON public.agent_tasks
      FOR SELECT
      TO authenticated
      USING (is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));
  END IF;
END$$;

-- 2) RELIABILITY: Create missing table seen in logs (relation "public.processed_batches" does not exist)
-- Lightweight structure with uniqueness on batch_id to prevent duplicates
CREATE TABLE IF NOT EXISTS public.processed_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source text,
  batch_id text UNIQUE,
  status text NOT NULL DEFAULT 'processed',
  details jsonb
);

-- RLS and policies for processed_batches
ALTER TABLE public.processed_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processed_batches FORCE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Service role manage processed_batches'
  ) THEN
    CREATE POLICY "Service role manage processed_batches"
      ON public.processed_batches
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE polname = 'Super admins view processed_batches'
  ) THEN
    CREATE POLICY "Super admins view processed_batches"
      ON public.processed_batches
      FOR SELECT
      TO authenticated
      USING (is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role));
  END IF;
END$$;

-- 3) PERFORMANCE: Add high-impact indexes commonly flagged by Supabase
-- These are safe IF NOT EXISTS to avoid duplicates.

-- Agent logs and events
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_created_at ON public.agent_status_logs (created_at);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_agent ON public.agent_status_logs (agent_id, agent_type);

CREATE INDEX IF NOT EXISTS idx_agent_events_created_at ON public.agent_events (created_at);
CREATE INDEX IF NOT EXISTS idx_agent_events_type ON public.agent_events (event_type);

-- Tasks
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON public.agent_tasks (status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_created_at ON public.agent_tasks (created_at);

-- API and telemetry
CREATE INDEX IF NOT EXISTS idx_api_logs_timestamp ON public.api_logs (timestamp);
CREATE INDEX IF NOT EXISTS idx_api_logs_user ON public.api_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_timestamp ON public.api_usage_logs (timestamp);
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_endpoint ON public.api_usage_logs (endpoint);

-- Alerts
CREATE INDEX IF NOT EXISTS idx_alerts_status_severity ON public.alerts (status, severity);

-- AI decisions/metrics
CREATE INDEX IF NOT EXISTS idx_ai_decisions_created_at ON public.ai_decisions (created_at);
CREATE INDEX IF NOT EXISTS idx_ai_performance_metrics_timestamp ON public.ai_performance_metrics (timestamp);

-- Processed batches
CREATE INDEX IF NOT EXISTS idx_processed_batches_created_at ON public.processed_batches (created_at);
CREATE INDEX IF NOT EXISTS idx_processed_batches_status ON public.processed_batches (status);
