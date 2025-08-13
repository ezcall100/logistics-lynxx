-- Fix Security and Performance Advisor Warnings - Part 3: Advanced Optimizations
-- This migration adds search indexes and data validation

-- Add text search indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_companies_name_gin ON public.companies USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_shipments_origin_gin ON public.shipments USING gin(to_tsvector('english', origin));
CREATE INDEX IF NOT EXISTS idx_shipments_destination_gin ON public.shipments USING gin(to_tsvector('english', destination));

-- Add partial indexes for active records (better performance for common queries)
CREATE INDEX IF NOT EXISTS idx_shipments_active ON public.shipments(id) WHERE status NOT IN ('delivered', 'cancelled');
CREATE INDEX IF NOT EXISTS idx_drivers_active ON public.drivers(id) WHERE status = 'available';
CREATE INDEX IF NOT EXISTS idx_companies_active ON public.companies(id) WHERE status = 'active';

-- Add constraints to improve data integrity and security
ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_valid CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE public.companies ADD CONSTRAINT companies_email_valid CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE public.drivers ADD CONSTRAINT drivers_email_valid CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add check constraints for data validation
ALTER TABLE public.ai_confidence_logs ADD CONSTRAINT confidence_score_range CHECK (confidence_score >= 0 AND confidence_score <= 1);
ALTER TABLE public.autonomous_tasks ADD CONSTRAINT priority_range CHECK (priority >= 1 AND priority <= 10);
ALTER TABLE public.carrier_vehicles ADD CONSTRAINT mpg_positive CHECK (mpg_rating IS NULL OR mpg_rating > 0);
ALTER TABLE public.shipments ADD CONSTRAINT weight_positive CHECK (weight IS NULL OR weight > 0);
ALTER TABLE public.shipments ADD CONSTRAINT volume_positive CHECK (volume IS NULL OR volume > 0);

-- Add unique constraints where appropriate
ALTER TABLE public.autonomous_agent_configs ADD CONSTRAINT unique_agent_id UNIQUE (agent_id);
ALTER TABLE public.drivers ADD CONSTRAINT unique_license_number UNIQUE (license_number);

-- Add helpful comments for documentation
COMMENT ON INDEX idx_agent_memory_agent_id IS 'Performance: Fast lookups by agent_id';
COMMENT ON INDEX idx_autonomous_tasks_status_priority IS 'Performance: Compound index for task queue queries';
COMMENT ON INDEX idx_companies_name_gin IS 'Performance: Full-text search on company names';
COMMENT ON POLICY "Service role can manage health metrics" ON public.system_health_metrics IS 'Security: Restrict health metrics to service role only';