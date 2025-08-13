-- Feature Flags & Entitlements System
-- Plan-based feature control and entitlements management

-- Feature flags table (global and company-specific)
CREATE TABLE IF NOT EXISTS public.feature_flags (
  key TEXT PRIMARY KEY,
  value_json JSONB NOT NULL DEFAULT 'false',
  description TEXT,
  scope TEXT DEFAULT 'global' CHECK (scope IN ('global', 'company')),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Organization entitlements (plan management)
CREATE TABLE IF NOT EXISTS public.org_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'trial', 'past_due', 'canceled', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(company_id)
);

-- Plan definitions
CREATE TABLE IF NOT EXISTS public.plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  features JSONB NOT NULL DEFAULT '{}',
  limits JSONB NOT NULL DEFAULT '{}',
  pricing JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default plans
INSERT INTO public.plans (id, name, description, features, limits, pricing) VALUES
('starter', 'Starter', 'Perfect for small brokers', 
 '{"rates": true, "directory": true, "basic_analytics": true}', 
 '{"users": 5, "loads_per_month": 100, "api_calls_per_day": 1000}',
 '{"monthly": 99, "yearly": 990}'),
 
('professional', 'Professional', 'For growing logistics companies',
 '{"rates": true, "directory": true, "analytics": true, "edi": true, "factoring": true, "marketplace": true}',
 '{"users": 25, "loads_per_month": 1000, "api_calls_per_day": 10000}',
 '{"monthly": 299, "yearly": 2990}'),
 
('enterprise', 'Enterprise', 'Full-featured platform for large operations',
 '{"rates": true, "directory": true, "analytics": true, "edi": true, "factoring": true, "marketplace": true, "autonomous": true, "bulk_rating": true, "sso": true}',
 '{"users": -1, "loads_per_month": -1, "api_calls_per_day": -1}',
 '{"monthly": "custom", "yearly": "custom"}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  features = EXCLUDED.features,
  limits = EXCLUDED.limits,
  pricing = EXCLUDED.pricing;

-- Enable RLS
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

-- Feature flags policies
CREATE POLICY "Feature flags are readable by authenticated users" ON public.feature_flags
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Feature flags are manageable by super admins" ON public.feature_flags
  FOR ALL USING (is_super_admin());

-- Entitlements policies
CREATE POLICY "Entitlements are viewable by company members" ON public.org_entitlements
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Entitlements are manageable by super admins" ON public.org_entitlements
  FOR ALL USING (is_super_admin());

-- Plans policies (readable by all authenticated users)
CREATE POLICY "Plans are readable by authenticated users" ON public.plans
  FOR SELECT USING (auth.role() = 'authenticated');

-- Helper functions for feature checks
CREATE OR REPLACE FUNCTION public.has_feature(_company_id UUID, _feature TEXT)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.feature_flags ff
    WHERE ff.key = _feature
    AND (
      (ff.scope = 'global' AND ff.value_json = 'true')
      OR (ff.scope = 'company' AND ff.company_id = _company_id AND ff.value_json = 'true')
    )
  );
$$;

CREATE OR REPLACE FUNCTION public.has_plan_feature(_company_id UUID, _feature TEXT)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.org_entitlements oe
    JOIN public.plans p ON p.id = oe.plan_id
    WHERE oe.company_id = _company_id
    AND oe.status IN ('active', 'trial')
    AND p.features ? _feature
    AND p.features->_feature = 'true'
  );
$$;

CREATE OR REPLACE FUNCTION public.get_company_plan(_company_id UUID)
RETURNS TEXT LANGUAGE SQL STABLE AS $$
  SELECT plan_id FROM public.org_entitlements
  WHERE company_id = _company_id AND status IN ('active', 'trial')
  LIMIT 1;
$$;

-- Triggers
CREATE TRIGGER feature_flags_updated_at
  BEFORE UPDATE ON public.feature_flags
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER org_entitlements_updated_at
  BEFORE UPDATE ON public.org_entitlements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
