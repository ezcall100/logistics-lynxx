-- Phase 6: Subscription Tiers & Usage Tracking
-- Add subscription tier to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS subscription_tier TEXT DEFAULT 'starter' 
CHECK (subscription_tier IN ('starter', 'pro', 'enterprise'));

-- Add subscription metadata
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS subscription_metadata JSONB DEFAULT '{}';

-- Create subscription limits table
CREATE TABLE IF NOT EXISTS subscription_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier TEXT NOT NULL UNIQUE,
  feature_key TEXT NOT NULL,
  limit_value INTEGER NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('day', 'month', 'year')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tier, feature_key, period)
);

-- Insert default limits
INSERT INTO subscription_limits (tier, feature_key, limit_value, period) VALUES
  ('starter', 'quotes', 10000, 'month'),
  ('starter', 'bulk_jobs', 100, 'day'),
  ('starter', 'directory_invites', 50, 'month'),
  ('pro', 'quotes', 50000, 'month'),
  ('pro', 'bulk_jobs', 500, 'day'),
  ('pro', 'directory_invites', 200, 'month'),
  ('enterprise', 'quotes', 999999999, 'month'),
  ('enterprise', 'bulk_jobs', 999999999, 'day'),
  ('enterprise', 'directory_invites', 999999999, 'month')
ON CONFLICT (tier, feature_key, period) DO NOTHING;

-- Create usage tracking views
CREATE OR REPLACE VIEW v_usage_monthly AS
SELECT 
  company_id,
  feature_key,
  date_trunc('month', occurred_at) as month,
  sum(qty) as total_usage
FROM usage_events 
GROUP BY 1, 2, 3;

CREATE OR REPLACE VIEW v_usage_daily AS
SELECT 
  company_id,
  feature_key,
  date_trunc('day', occurred_at) as day,
  sum(qty) as total_usage
FROM usage_events 
GROUP BY 1, 2, 3;

-- Create usage breach detection view
CREATE OR REPLACE VIEW v_usage_breaches AS
SELECT 
  c.id as company_id,
  c.name as company_name,
  c.subscription_tier,
  ue.feature_key,
  ue.total_usage,
  sl.limit_value,
  ROUND((ue.total_usage::numeric / sl.limit_value) * 100, 2) as usage_percentage,
  CASE 
    WHEN (ue.total_usage::numeric / sl.limit_value) > 1 THEN 'breach'
    WHEN (ue.total_usage::numeric / sl.limit_value) > 0.8 THEN 'warning'
    ELSE 'normal'
  END as status,
  ue.month
FROM companies c
JOIN v_usage_monthly ue ON c.id = ue.company_id
JOIN subscription_limits sl ON c.subscription_tier = sl.tier 
  AND ue.feature_key = sl.feature_key 
  AND sl.period = 'month'
WHERE ue.month = date_trunc('month', NOW());

-- Create daily usage breach detection view
CREATE OR REPLACE VIEW v_usage_breaches_daily AS
SELECT 
  c.id as company_id,
  c.name as company_name,
  c.subscription_tier,
  ue.feature_key,
  ue.total_usage,
  sl.limit_value,
  ROUND((ue.total_usage::numeric / sl.limit_value) * 100, 2) as usage_percentage,
  CASE 
    WHEN (ue.total_usage::numeric / sl.limit_value) > 1 THEN 'breach'
    WHEN (ue.total_usage::numeric / sl.limit_value) > 0.8 THEN 'warning'
    ELSE 'normal'
  END as status,
  ue.day
FROM companies c
JOIN v_usage_daily ue ON c.id = ue.company_id
JOIN subscription_limits sl ON c.subscription_tier = sl.tier 
  AND ue.feature_key = sl.feature_key 
  AND sl.period = 'day'
WHERE ue.day = date_trunc('day', NOW());

-- Create billing events table for overage tracking
CREATE TABLE IF NOT EXISTS billing_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('overage', 'upgrade', 'downgrade', 'payment', 'refund')),
  feature_key TEXT,
  quantity INTEGER,
  unit_price NUMERIC(10,2),
  total_amount NUMERIC(10,2),
  currency TEXT DEFAULT 'USD',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_events_company_feature_date 
ON usage_events (company_id, feature_key, occurred_at);

CREATE INDEX IF NOT EXISTS idx_usage_events_monthly 
ON usage_events (company_id, feature_key, date_trunc('month', occurred_at));

CREATE INDEX IF NOT EXISTS idx_billing_events_company_date 
ON billing_events (company_id, created_at);

CREATE INDEX IF NOT EXISTS idx_companies_subscription_tier 
ON companies (subscription_tier);

-- Create RLS policies for billing events
ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their company's billing events" ON billing_events
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can manage billing events" ON billing_events
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to get current usage for a company
CREATE OR REPLACE FUNCTION get_company_usage(
  p_company_id UUID,
  p_feature_key TEXT DEFAULT NULL
)
RETURNS TABLE (
  feature_key TEXT,
  current_month_usage BIGINT,
  current_day_usage BIGINT,
  monthly_limit INTEGER,
  daily_limit INTEGER,
  monthly_percentage NUMERIC(5,2),
  daily_percentage NUMERIC(5,2),
  status TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(p_feature_key, sl.feature_key) as feature_key,
    COALESCE(monthly_usage.total_usage, 0) as current_month_usage,
    COALESCE(daily_usage.total_usage, 0) as current_day_usage,
    monthly_limit.limit_value as monthly_limit,
    daily_limit.limit_value as daily_limit,
    CASE 
      WHEN monthly_limit.limit_value > 0 
      THEN ROUND((COALESCE(monthly_usage.total_usage, 0)::numeric / monthly_limit.limit_value) * 100, 2)
      ELSE 0 
    END as monthly_percentage,
    CASE 
      WHEN daily_limit.limit_value > 0 
      THEN ROUND((COALESCE(daily_usage.total_usage, 0)::numeric / daily_limit.limit_value) * 100, 2)
      ELSE 0 
    END as daily_percentage,
    CASE 
      WHEN COALESCE(monthly_usage.total_usage, 0) > monthly_limit.limit_value THEN 'breach'
      WHEN COALESCE(monthly_usage.total_usage, 0) > (monthly_limit.limit_value * 0.8) THEN 'warning'
      ELSE 'normal'
    END as status
  FROM companies c
  JOIN subscription_limits monthly_limit ON c.subscription_tier = monthly_limit.tier 
    AND monthly_limit.period = 'month'
  JOIN subscription_limits daily_limit ON c.subscription_tier = daily_limit.tier 
    AND daily_limit.feature_key = monthly_limit.feature_key 
    AND daily_limit.period = 'day'
  LEFT JOIN (
    SELECT company_id, feature_key, sum(qty) as total_usage
    FROM usage_events 
    WHERE company_id = p_company_id 
      AND occurred_at >= date_trunc('month', NOW())
      AND (p_feature_key IS NULL OR feature_key = p_feature_key)
    GROUP BY company_id, feature_key
  ) monthly_usage ON c.id = monthly_usage.company_id 
    AND monthly_limit.feature_key = monthly_usage.feature_key
  LEFT JOIN (
    SELECT company_id, feature_key, sum(qty) as total_usage
    FROM usage_events 
    WHERE company_id = p_company_id 
      AND occurred_at >= date_trunc('day', NOW())
      AND (p_feature_key IS NULL OR feature_key = p_feature_key)
    GROUP BY company_id, feature_key
  ) daily_usage ON c.id = daily_usage.company_id 
    AND daily_limit.feature_key = daily_usage.feature_key
  WHERE c.id = p_company_id
    AND (p_feature_key IS NULL OR monthly_limit.feature_key = p_feature_key);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT SELECT ON v_usage_monthly TO authenticated;
GRANT SELECT ON v_usage_daily TO authenticated;
GRANT SELECT ON v_usage_breaches TO authenticated;
GRANT SELECT ON v_usage_breaches_daily TO authenticated;
GRANT SELECT ON subscription_limits TO authenticated;
GRANT EXECUTE ON FUNCTION get_company_usage TO authenticated;

-- Service role permissions
GRANT ALL ON subscription_limits TO service_role;
GRANT ALL ON billing_events TO service_role;
GRANT ALL ON v_usage_monthly TO service_role;
GRANT ALL ON v_usage_daily TO service_role;
GRANT ALL ON v_usage_breaches TO service_role;
GRANT ALL ON v_usage_breaches_daily TO service_role;
