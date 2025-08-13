-- ==========================================
-- FEATURE FLAGS SYSTEM
-- ==========================================
-- Enables gradual rollout and replay budget controls

-- Feature flags table for gradual rollout
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL,
  company_id UUID REFERENCES public.companies(id),
  enabled BOOLEAN DEFAULT false,
  rollout_percentage INTEGER DEFAULT 0 CHECK (rollout_percentage >= 0 AND rollout_percentage <= 100),
  conditions JSONB DEFAULT '{}',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint per company per feature
  UNIQUE(key, company_id)
);

-- Replay budget controls per tenant
CREATE TABLE IF NOT EXISTS public.replay_budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id),
  daily_limit INTEGER DEFAULT 500,
  monthly_limit INTEGER DEFAULT 10000,
  current_daily_count INTEGER DEFAULT 0,
  current_monthly_count INTEGER DEFAULT 0,
  last_reset_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(company_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_feature_flags_key 
ON public.feature_flags (key);

CREATE INDEX IF NOT EXISTS idx_feature_flags_company 
ON public.feature_flags (company_id);

CREATE INDEX IF NOT EXISTS idx_feature_flags_enabled 
ON public.feature_flags (enabled) WHERE enabled = true;

CREATE INDEX IF NOT EXISTS idx_replay_budgets_company 
ON public.replay_budgets (company_id);

-- RLS for multi-tenant
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.replay_budgets ENABLE ROW LEVEL SECURITY;

-- RLS Policies for feature_flags
CREATE POLICY "Service role can manage all feature flags" ON public.feature_flags
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can view their company's feature flags" ON public.feature_flags
  FOR SELECT USING (
    company_id = auth.jwt() ->> 'company_id'::text OR
    auth.role() = 'service_role'
  );

-- RLS Policies for replay_budgets
CREATE POLICY "Service role can manage all replay budgets" ON public.replay_budgets
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can view their company's replay budget" ON public.replay_budgets
  FOR SELECT USING (
    company_id = auth.jwt() ->> 'company_id'::text OR
    auth.role() = 'service_role'
  );

-- Function to check if feature is enabled for a company
CREATE OR REPLACE FUNCTION is_feature_enabled(feature_key TEXT, target_company_id UUID DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
  company_id UUID;
  feature_record RECORD;
BEGIN
  -- Get company ID from JWT if not provided
  IF target_company_id IS NULL THEN
    company_id := (auth.jwt() ->> 'company_id')::UUID;
  ELSE
    company_id := target_company_id;
  END IF;

  -- Check for company-specific feature flag
  SELECT * INTO feature_record
  FROM public.feature_flags
  WHERE key = feature_key AND company_id = company_id;

  -- If company-specific flag exists, use it
  IF FOUND THEN
    RETURN feature_record.enabled;
  END IF;

  -- Check for global feature flag (company_id IS NULL)
  SELECT * INTO feature_record
  FROM public.feature_flags
  WHERE key = feature_key AND company_id IS NULL;

  -- If global flag exists, use it
  IF FOUND THEN
    RETURN feature_record.enabled;
  END IF;

  -- Default to disabled if no flag found
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check replay budget
CREATE OR REPLACE FUNCTION check_replay_budget(target_company_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  budget_record RECORD;
  current_date DATE := CURRENT_DATE;
BEGIN
  -- Get or create budget record
  SELECT * INTO budget_record
  FROM public.replay_budgets
  WHERE company_id = target_company_id;

  -- Create budget record if it doesn't exist
  IF NOT FOUND THEN
    INSERT INTO public.replay_budgets (company_id, daily_limit, monthly_limit)
    VALUES (target_company_id, 500, 10000);
    
    SELECT * INTO budget_record
    FROM public.replay_budgets
    WHERE company_id = target_company_id;
  END IF;

  -- Reset counters if date changed
  IF budget_record.last_reset_date < current_date THEN
    UPDATE public.replay_budgets
    SET 
      current_daily_count = 0,
      last_reset_date = current_date
    WHERE company_id = target_company_id;
    
    budget_record.current_daily_count := 0;
  END IF;

  -- Check if within limits
  RETURN budget_record.current_daily_count < budget_record.daily_limit 
         AND budget_record.current_monthly_count < budget_record.monthly_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment replay budget
CREATE OR REPLACE FUNCTION increment_replay_budget(target_company_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.replay_budgets
  SET 
    current_daily_count = current_daily_count + 1,
    current_monthly_count = current_monthly_count + 1,
    updated_at = NOW()
  WHERE company_id = target_company_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get feature flag status
CREATE OR REPLACE FUNCTION get_feature_status(feature_key TEXT, target_company_id UUID DEFAULT NULL)
RETURNS JSONB AS $$
DECLARE
  company_id UUID;
  result JSONB;
BEGIN
  -- Get company ID from JWT if not provided
  IF target_company_id IS NULL THEN
    company_id := (auth.jwt() ->> 'company_id')::UUID;
  ELSE
    company_id := target_company_id;
  END IF;

  -- Get feature flag details
  SELECT 
    jsonb_build_object(
      'key', key,
      'enabled', enabled,
      'rollout_percentage', rollout_percentage,
      'company_id', company_id,
      'description', description
    ) INTO result
  FROM public.feature_flags
  WHERE key = feature_key AND company_id = company_id;

  -- If no company-specific flag, check global
  IF result IS NULL THEN
    SELECT 
      jsonb_build_object(
        'key', key,
        'enabled', enabled,
        'rollout_percentage', rollout_percentage,
        'company_id', NULL,
        'description', description
      ) INTO result
    FROM public.feature_flags
    WHERE key = feature_key AND company_id IS NULL;
  END IF;

  RETURN COALESCE(result, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default feature flags
INSERT INTO public.feature_flags (key, description, enabled, rollout_percentage) VALUES
  ('outbox.enabled', 'Enable event outbox processing', false, 0),
  ('outbox.dual_write', 'Enable dual-write mode (outbox + legacy)', false, 0),
  ('dlq.replay.enabled', 'Enable DLQ replay functionality', true, 100),
  ('dlq.replay.budget_control', 'Enable replay budget controls', true, 100),
  ('agent.pause_drain', 'Enable agent pause/drain controls', true, 100)
ON CONFLICT (key, company_id) DO NOTHING;

-- Create views for easy monitoring
CREATE OR REPLACE VIEW feature_flags_status AS
SELECT 
  f.key,
  f.company_id,
  c.name as company_name,
  f.enabled,
  f.rollout_percentage,
  f.description,
  f.updated_at
FROM public.feature_flags f
LEFT JOIN public.companies c ON f.company_id = c.id
ORDER BY f.key, f.company_id;

CREATE OR REPLACE VIEW replay_budgets_status AS
SELECT 
  rb.company_id,
  c.name as company_name,
  rb.daily_limit,
  rb.monthly_limit,
  rb.current_daily_count,
  rb.current_monthly_count,
  rb.last_reset_date,
  CASE 
    WHEN rb.current_daily_count >= rb.daily_limit THEN 'Daily limit exceeded'
    WHEN rb.current_monthly_count >= rb.monthly_limit THEN 'Monthly limit exceeded'
    ELSE 'Within limits'
  END as status
FROM public.replay_budgets rb
LEFT JOIN public.companies c ON rb.company_id = c.id
ORDER BY rb.current_daily_count DESC;

-- Cleanup function for old feature flags (keep 1 year)
CREATE OR REPLACE FUNCTION cleanup_old_feature_flags()
RETURNS void AS $$
BEGIN
  DELETE FROM public.feature_flags
  WHERE updated_at < NOW() - INTERVAL '1 year'
  AND enabled = false;
END;
$$ LANGUAGE plpgsql;
