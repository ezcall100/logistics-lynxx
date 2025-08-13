-- Agent System Tables and Functions
-- Autonomous task management and execution

-- Agent tasks table
CREATE TABLE IF NOT EXISTS public.agent_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  fn_name TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'quarantined')),
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  last_error TEXT,
  idempotency_key TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Agent runs table (execution history)
CREATE TABLE IF NOT EXISTS public.agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.agent_tasks(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
  result JSONB,
  error TEXT,
  duration_ms INTEGER,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Quarantine table for failed tasks
CREATE TABLE IF NOT EXISTS public.agent_quarantine (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES public.agent_tasks(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  payload JSONB NOT NULL,
  last_error TEXT,
  quarantine_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_quarantine ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Agent tasks are viewable by company members" ON public.agent_tasks
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Agent tasks are manageable by company admins" ON public.agent_tasks
  FOR ALL USING (
    has_role(company_id, 'admin') OR 
    has_role(company_id, 'owner') OR 
    is_super_admin()
  );

CREATE POLICY "Agent runs are viewable by company members" ON public.agent_runs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.agent_tasks at
      WHERE at.id = agent_runs.task_id
      AND is_company_member(at.company_id)
    )
  );

CREATE POLICY "Agent quarantine is viewable by company members" ON public.agent_quarantine
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.agent_tasks at
      WHERE at.id = agent_quarantine.task_id
      AND is_company_member(at.company_id)
    )
  );

-- Helper functions for agent management
CREATE OR REPLACE FUNCTION public.claim_agent_task()
RETURNS TABLE (
  id UUID,
  company_id UUID,
  fn_name TEXT,
  payload JSONB,
  attempts INTEGER
) LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  UPDATE public.agent_tasks
  SET 
    status = 'running',
    attempts = attempts + 1,
    started_at = now(),
    updated_at = now()
  WHERE id IN (
    SELECT at.id
    FROM public.agent_tasks at
    WHERE at.status = 'pending'
    AND at.attempts < at.max_attempts
    FOR UPDATE SKIP LOCKED
    LIMIT 1
  )
  RETURNING 
    agent_tasks.id,
    agent_tasks.company_id,
    agent_tasks.fn_name,
    agent_tasks.payload,
    agent_tasks.attempts;
END;
$$;

CREATE OR REPLACE FUNCTION public.complete_agent_task(
  _task_id UUID,
  _status TEXT,
  _result JSONB DEFAULT NULL,
  _error TEXT DEFAULT NULL
)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.agent_tasks
  SET 
    status = _status,
    completed_at = now(),
    updated_at = now()
  WHERE id = _task_id;

  INSERT INTO public.agent_runs (
    task_id,
    status,
    result,
    error,
    duration_ms,
    completed_at
  )
  SELECT 
    _task_id,
    _status,
    _result,
    _error,
    EXTRACT(EPOCH FROM (now() - started_at)) * 1000,
    now()
  FROM public.agent_tasks
  WHERE id = _task_id;

  -- If failed and max attempts reached, move to quarantine
  IF _status = 'failed' THEN
    INSERT INTO public.agent_quarantine (task_id, reason, payload, last_error)
    SELECT 
      _task_id,
      'max_attempts_exceeded',
      payload,
      _error
    FROM public.agent_tasks
    WHERE id = _task_id
    AND attempts >= max_attempts;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.retry_quarantined_task(_task_id UUID)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  -- Reset task to pending
  UPDATE public.agent_tasks
  SET 
    status = 'pending',
    attempts = 0,
    started_at = NULL,
    completed_at = NULL,
    last_error = NULL,
    updated_at = now()
  WHERE id = _task_id;

  -- Remove from quarantine
  UPDATE public.agent_quarantine
  SET 
    resolved_at = now(),
    resolved_by = auth.uid()
  WHERE task_id = _task_id;
END;
$$;

-- Triggers
CREATE TRIGGER agent_tasks_updated_at
  BEFORE UPDATE ON public.agent_tasks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status_attempts ON public.agent_tasks(status, attempts);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_company_id ON public.agent_tasks(company_id);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_idempotency ON public.agent_tasks(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_agent_runs_task_id ON public.agent_runs(task_id);
CREATE INDEX IF NOT EXISTS idx_agent_quarantine_task_id ON public.agent_quarantine(task_id);
