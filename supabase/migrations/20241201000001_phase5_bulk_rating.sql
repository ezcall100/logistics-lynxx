-- Phase 5: Bulk Rating System Migration
-- This migration adds support for enterprise bulk rating operations

-- Create bulk rating requests table
CREATE TABLE IF NOT EXISTS bulk_rating_requests (
  id TEXT PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  total_jobs INTEGER NOT NULL,
  completed_jobs INTEGER DEFAULT 0,
  failed_jobs INTEGER DEFAULT 0,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
  status TEXT DEFAULT 'processing' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  callback_url TEXT,
  estimated_completion TIMESTAMPTZ,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bulk rating jobs table
CREATE TABLE IF NOT EXISTS bulk_rating_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bulk_request_id TEXT NOT NULL REFERENCES bulk_rating_requests(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  job_index INTEGER NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  equipment_type TEXT NOT NULL,
  pickup_date DATE NOT NULL,
  weight NUMERIC(10,2),
  hazmat BOOLEAN DEFAULT FALSE,
  temperature_controlled BOOLEAN DEFAULT FALSE,
  special_requirements TEXT[],
  rate NUMERIC(10,2),
  carrier TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  processing_started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create usage events table for rate limiting
CREATE TABLE IF NOT EXISTS usage_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  feature_key TEXT NOT NULL,
  qty INTEGER DEFAULT 1,
  occurred_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB
);

-- Create audit logs table for compliance
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_bulk_rating_requests_company_id ON bulk_rating_requests(company_id);
CREATE INDEX IF NOT EXISTS idx_bulk_rating_requests_status ON bulk_rating_requests(status);
CREATE INDEX IF NOT EXISTS idx_bulk_rating_requests_created_at ON bulk_rating_requests(created_at);

CREATE INDEX IF NOT EXISTS idx_bulk_rating_jobs_request_id ON bulk_rating_jobs(bulk_request_id);
CREATE INDEX IF NOT EXISTS idx_bulk_rating_jobs_company_id ON bulk_rating_jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_bulk_rating_jobs_status ON bulk_rating_jobs(status);

CREATE INDEX IF NOT EXISTS idx_usage_events_company_feature ON usage_events(company_id, feature_key);
CREATE INDEX IF NOT EXISTS idx_usage_events_occurred_at ON usage_events(occurred_at);

CREATE INDEX IF NOT EXISTS idx_audit_logs_company_id ON audit_logs(company_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Add RLS policies
ALTER TABLE bulk_rating_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_rating_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for bulk_rating_requests
CREATE POLICY "Users can view their company's bulk rating requests" ON bulk_rating_requests
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bulk rating requests for their company" ON bulk_rating_requests
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their company's bulk rating requests" ON bulk_rating_requests
  FOR UPDATE USING (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

-- RLS policies for bulk_rating_jobs
CREATE POLICY "Users can view their company's bulk rating jobs" ON bulk_rating_jobs
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create bulk rating jobs for their company" ON bulk_rating_jobs
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their company's bulk rating jobs" ON bulk_rating_jobs
  FOR UPDATE USING (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

-- RLS policies for usage_events
CREATE POLICY "Users can view their company's usage events" ON usage_events
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create usage events for their company" ON usage_events
  FOR INSERT WITH CHECK (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

-- RLS policies for audit_logs
CREATE POLICY "Users can view their company's audit logs" ON audit_logs
  FOR SELECT USING (
    company_id IN (
      SELECT company_id FROM user_companies 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "System can create audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- Create functions for automatic updates
CREATE OR REPLACE FUNCTION update_bulk_rating_request_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_bulk_rating_job_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_bulk_rating_requests_updated_at
  BEFORE UPDATE ON bulk_rating_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_bulk_rating_request_updated_at();

CREATE TRIGGER update_bulk_rating_jobs_updated_at
  BEFORE UPDATE ON bulk_rating_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_bulk_rating_job_updated_at();

-- Function to update bulk request completion status
CREATE OR REPLACE FUNCTION update_bulk_request_completion()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the parent bulk request when job status changes
  IF TG_OP = 'UPDATE' THEN
    UPDATE bulk_rating_requests 
    SET 
      completed_jobs = (
        SELECT COUNT(*) FROM bulk_rating_jobs 
        WHERE bulk_request_id = NEW.bulk_request_id AND status = 'completed'
      ),
      failed_jobs = (
        SELECT COUNT(*) FROM bulk_rating_jobs 
        WHERE bulk_request_id = NEW.bulk_request_id AND status = 'failed'
      ),
      status = CASE 
        WHEN (
          SELECT COUNT(*) FROM bulk_rating_jobs 
          WHERE bulk_request_id = NEW.bulk_request_id AND status IN ('pending', 'processing')
        ) = 0 THEN 'completed'
        ELSE 'processing'
      END,
      completed_at = CASE 
        WHEN (
          SELECT COUNT(*) FROM bulk_rating_jobs 
          WHERE bulk_request_id = NEW.bulk_request_id AND status IN ('pending', 'processing')
        ) = 0 THEN NOW()
        ELSE NULL
      END
    WHERE id = NEW.bulk_request_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for bulk request completion updates
CREATE TRIGGER update_bulk_request_on_job_change
  AFTER UPDATE ON bulk_rating_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_bulk_request_completion();

-- Create views for monitoring
CREATE OR REPLACE VIEW v_bulk_rating_summary AS
SELECT 
  brr.id,
  brr.company_id,
  c.name as company_name,
  brr.total_jobs,
  brr.completed_jobs,
  brr.failed_jobs,
  brr.priority,
  brr.status,
  brr.created_at,
  brr.completed_at,
  CASE 
    WHEN brr.completed_at IS NOT NULL 
    THEN EXTRACT(EPOCH FROM (brr.completed_at - brr.created_at))
    ELSE NULL 
  END as processing_time_seconds
FROM bulk_rating_requests brr
JOIN companies c ON brr.company_id = c.id;

-- Create view for usage monitoring
CREATE OR REPLACE VIEW v_usage_monthly AS
SELECT 
  company_id,
  feature_key,
  date_trunc('month', occurred_at) as month,
  sum(qty) as total
FROM usage_events
GROUP BY 1,2,3;

-- Create view for usage breach detection
CREATE OR REPLACE VIEW v_usage_breach AS
SELECT 
  u.*,
  CASE 
    WHEN u.feature_key = 'quotes/month' AND u.total > 10000 THEN true
    WHEN u.feature_key = 'bulk_rating_requests/hour' AND u.total > 100 THEN true
    ELSE false
  END as is_breach
FROM v_usage_monthly u
WHERE 
  (u.feature_key = 'quotes/month' AND u.total > 10000) OR
  (u.feature_key = 'bulk_rating_requests/hour' AND u.total > 100);

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON bulk_rating_requests TO authenticated;
GRANT SELECT, INSERT, UPDATE ON bulk_rating_jobs TO authenticated;
GRANT SELECT, INSERT ON usage_events TO authenticated;
GRANT SELECT ON audit_logs TO authenticated;

GRANT SELECT ON v_bulk_rating_summary TO authenticated;
GRANT SELECT ON v_usage_monthly TO authenticated;
GRANT SELECT ON v_usage_breach TO authenticated;

-- Insert initial usage tracking
INSERT INTO usage_events (company_id, feature_key, qty, metadata)
SELECT 
  c.id,
  'bulk_rating_requests/hour',
  0,
  '{"initialized": true}'
FROM companies c
ON CONFLICT DO NOTHING;
