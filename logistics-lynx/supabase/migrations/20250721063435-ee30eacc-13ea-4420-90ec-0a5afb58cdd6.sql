-- Create driver invitations table for managing driver onboarding
CREATE TABLE IF NOT EXISTS public.driver_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  driver_name TEXT,
  phone TEXT,
  license_number TEXT,
  invitation_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  driver_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on driver invitations
ALTER TABLE public.driver_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for driver invitations
CREATE POLICY "Carrier admins can manage their driver invitations" 
ON public.driver_invitations 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.carrier_id = driver_invitations.carrier_id
    AND p.role IN ('carrier_admin', 'super_admin')
  )
);

-- Create policy for drivers to view their own invitations
CREATE POLICY "Drivers can view invitations sent to them" 
ON public.driver_invitations 
FOR SELECT 
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Add driver-specific fields to profiles table for better driver management
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driver_license_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driver_license_expiry DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driver_status TEXT DEFAULT 'active' CHECK (driver_status IN ('active', 'inactive', 'suspended', 'terminated'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS vehicle_assigned TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS hire_date DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS termination_date DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS emergency_contact JSONB DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driver_performance_metrics JSONB DEFAULT '{}';

-- Create owner-operator invitations table
CREATE TABLE IF NOT EXISTS public.owner_operator_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  company_name TEXT,
  mc_number TEXT,
  dot_number TEXT,
  phone TEXT,
  invitation_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'expired')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '7 days'),
  owner_operator_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on owner-operator invitations
ALTER TABLE public.owner_operator_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for owner-operator invitations
CREATE POLICY "Carrier admins can manage their owner-operator invitations" 
ON public.owner_operator_invitations 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.carrier_id = owner_operator_invitations.carrier_id
    AND p.role IN ('carrier_admin', 'super_admin')
  )
);

-- Create policy for owner-operators to view their own invitations
CREATE POLICY "Owner-operators can view invitations sent to them" 
ON public.owner_operator_invitations 
FOR SELECT 
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create portal access logs to track when drivers/owner-operators access their portals
CREATE TABLE IF NOT EXISTS public.portal_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  portal_type TEXT NOT NULL CHECK (portal_type IN ('driver', 'owner_operator', 'carrier_admin')),
  carrier_id UUID REFERENCES public.companies(id),
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  session_duration_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on portal access logs
ALTER TABLE public.portal_access_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for portal access logs
CREATE POLICY "Users can view their own access logs" 
ON public.portal_access_logs 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Carrier admins can view their drivers' access logs" 
ON public.portal_access_logs 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() 
    AND p.carrier_id = portal_access_logs.carrier_id
    AND p.role IN ('carrier_admin', 'super_admin')
  )
);

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_driver_invitations_updated_at 
  BEFORE UPDATE ON public.driver_invitations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_owner_operator_invitations_updated_at 
  BEFORE UPDATE ON public.owner_operator_invitations 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();