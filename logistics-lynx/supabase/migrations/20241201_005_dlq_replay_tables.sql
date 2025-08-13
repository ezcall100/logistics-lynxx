-- ==========================================
-- DLQ REPLAY HARDENING TABLES
-- ==========================================

-- Replay runs table for idempotency
CREATE TABLE IF NOT EXISTS public.replay_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key TEXT NOT NULL,
  company_id TEXT NOT NULL,
  requested_at TIMESTAMPTZ NOT NULL,
  actor TEXT NOT NULL,
  payload_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  total_processed INTEGER DEFAULT 0,
  successful INTEGER DEFAULT 0,
  failed INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint for idempotency
  UNIQUE(idempotency_key, company_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_replay_runs_company_status 
ON public.replay_runs (company_id, status);

CREATE INDEX IF NOT EXISTS idx_replay_runs_requested_at 
ON public.replay_runs (requested_at DESC);

CREATE INDEX IF NOT EXISTS idx_replay_runs_payload_hash 
ON public.replay_runs (payload_hash) WHERE payload_hash IS NOT NULL;

-- Edge rate limits table
CREATE TABLE IF NOT EXISTS public.edge_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  requests INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL,
  window_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for rate limiting
CREATE INDEX IF NOT EXISTS idx_edge_rate_limits_key 
ON public.edge_rate_limits (key);

CREATE INDEX IF NOT EXISTS idx_edge_rate_limits_window_end 
ON public.edge_rate_limits (window_end) WHERE window_end < NOW();

-- Audit logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor TEXT NOT NULL,
  action TEXT NOT NULL,
  scope TEXT NOT NULL,
  target_count INTEGER DEFAULT 0,
  success_count INTEGER DEFAULT 0,
  failure_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for audit logs
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor 
ON public.audit_logs (actor);

CREATE INDEX IF NOT EXISTS idx_audit_logs_action 
ON public.audit_logs (action);

CREATE INDEX IF NOT EXISTS idx_audit_logs_scope 
ON public.audit_logs (scope);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at 
ON public.audit_logs (created_at DESC);

-- RLS for multi-tenant
ALTER TABLE public.replay_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edge_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for replay_runs
CREATE POLICY "Service role can manage all replay runs" ON public.replay_runs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can view their company's replay runs" ON public.replay_runs
  FOR SELECT USING (
    company_id = auth.jwt() ->> 'company_id'::text OR 
    company_id = 'all' OR
    auth.role() = 'service_role'
  );

-- RLS Policies for edge_rate_limits
CREATE POLICY "Service role can manage all rate limits" ON public.edge_rate_limits
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for audit_logs
CREATE POLICY "Service role can manage all audit logs" ON public.audit_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can view audit logs for their company" ON public.audit_logs
  FOR SELECT USING (
    scope = auth.jwt() ->> 'company_id'::text OR 
    scope = 'all' OR
    auth.role() = 'service_role'
  );

-- Cleanup function for expired rate limits
CREATE OR REPLACE FUNCTION cleanup_expired_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.edge_rate_limits 
  WHERE window_end < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql;

-- Cleanup function for old audit logs (keep 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM public.audit_logs 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- Cleanup function for old replay runs (keep 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_replay_runs()
RETURNS void AS $$
BEGIN
  DELETE FROM public.replay_runs 
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean up old data (if using pg_cron)
-- SELECT cron.schedule('cleanup-rate-limits', '0 */6 * * *', 'SELECT cleanup_expired_rate_limits();');
-- SELECT cron.schedule('cleanup-audit-logs', '0 2 * * 0', 'SELECT cleanup_old_audit_logs();');
-- SELECT cron.schedule('cleanup-replay-runs', '0 3 * * 0', 'SELECT cleanup_old_replay_runs();');
