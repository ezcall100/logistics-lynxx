
-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) NOT NULL,
  category TEXT CHECK (category IN ('ai_confidence', 'system_error', 'performance', 'security', 'maintenance')) NOT NULL,
  status TEXT CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')) DEFAULT 'active',
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  source TEXT,
  metadata JSONB DEFAULT '{}',
  acknowledged_by TEXT,
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_category ON alerts(category);
CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp DESC);

-- Enable RLS
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations for authenticated users" ON alerts
  FOR ALL USING (auth.role() = 'authenticated');

-- Enable realtime
ALTER TABLE alerts REPLICA IDENTITY FULL;
INSERT INTO supabase_realtime.subscription (id, subscription_id, entity, entity_id, claims, filters, created_at)
VALUES (
  gen_random_uuid(),
  gen_random_uuid(),
  'table',
  'public.alerts'::regclass::oid,
  '{"role": "authenticated"}',
  '[{"column": "table", "value": "alerts"}]',
  NOW()
) ON CONFLICT DO NOTHING;
