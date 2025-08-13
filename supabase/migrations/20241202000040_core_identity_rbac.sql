-- Core Identity & RBAC System
-- Foundation for multi-tenant role-based access control

-- Ensure core tables exist
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan_id TEXT DEFAULT 'starter',
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'manager', 'user', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, company_id, role)
);

-- Company membership function
CREATE OR REPLACE FUNCTION public.is_company_member(_company_id UUID)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.profiles p
    WHERE p.user_id = auth.uid() AND p.company_id = _company_id
  );
$$;

-- Role check function (per-tenant)
CREATE OR REPLACE FUNCTION public.has_role(_company_id UUID, _role TEXT)
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.roles r
    WHERE r.company_id = _company_id 
    AND r.user_id = auth.uid() 
    AND r.role = _role
  );
$$;

-- Super admin check function
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN LANGUAGE SQL STABLE AS $$
  SELECT EXISTS(
    SELECT 1 FROM public.roles r
    WHERE r.user_id = auth.uid() 
    AND r.role = 'super_admin'
  );
$$;

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Company policies
CREATE POLICY "Companies are viewable by members" ON public.companies
  FOR SELECT USING (is_company_member(id));

CREATE POLICY "Companies are manageable by super admins" ON public.companies
  FOR ALL USING (is_super_admin());

-- Profile policies
CREATE POLICY "Profiles are viewable by company members" ON public.profiles
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Profiles are insertable by super admins" ON public.profiles
  FOR INSERT WITH CHECK (is_super_admin());

-- Role policies
CREATE POLICY "Roles are viewable by company members" ON public.roles
  FOR SELECT USING (is_company_member(company_id));

CREATE POLICY "Roles are manageable by company admins" ON public.roles
  FOR ALL USING (
    has_role(company_id, 'admin') OR 
    has_role(company_id, 'owner') OR 
    is_super_admin()
  );

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert default super admin company
INSERT INTO public.companies (id, name, slug, plan_id)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Trans Bot AI',
  'transbot-ai',
  'enterprise'
) ON CONFLICT (id) DO NOTHING;
