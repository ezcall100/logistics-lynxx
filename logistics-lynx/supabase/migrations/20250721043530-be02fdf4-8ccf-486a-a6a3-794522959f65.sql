-- Create carrier-driver relationship and authentication system (Fixed)

-- First, ensure we have proper carrier-driver relationships
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS carrier_id UUID REFERENCES public.companies(id);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driver_license_number TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS vehicle_assigned TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS driver_status TEXT DEFAULT 'inactive';

-- Create driver invitations table for carrier-driver assignment workflow
CREATE TABLE IF NOT EXISTS public.driver_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  carrier_id UUID NOT NULL REFERENCES public.companies(id),
  invited_by UUID NOT NULL,  -- Reference to auth.users, not profiles
  email TEXT NOT NULL,
  driver_name TEXT NOT NULL,
  invitation_token TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, accepted, expired
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  accepted_at TIMESTAMP WITH TIME ZONE,
  driver_user_id UUID  -- Reference to auth.users, not profiles
);

-- Enable RLS on driver_invitations
ALTER TABLE public.driver_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for driver_invitations
CREATE POLICY "Carrier admins can manage their driver invitations" 
ON public.driver_invitations 
FOR ALL 
USING (
  invited_by = auth.uid() OR
  carrier_id IN (
    SELECT company_id FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('carrier_admin')
  )
);

-- Create function to assign driver to carrier
CREATE OR REPLACE FUNCTION public.assign_driver_to_carrier(
  p_driver_user_id UUID,
  p_carrier_id UUID,
  p_invitation_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update the driver's profile with carrier assignment
  UPDATE public.profiles 
  SET 
    carrier_id = p_carrier_id,
    role = 'carrier_driver',
    driver_status = 'active'
  WHERE user_id = p_driver_user_id;

  -- Update the invitation status
  UPDATE public.driver_invitations 
  SET 
    status = 'accepted',
    accepted_at = now(),
    driver_user_id = p_driver_user_id
  WHERE id = p_invitation_id;

  RETURN TRUE;
END;
$$;

-- Create function to get carrier's drivers
CREATE OR REPLACE FUNCTION public.get_carrier_drivers(p_carrier_id UUID)
RETURNS TABLE(
  user_id UUID,
  name TEXT,
  email TEXT,
  driver_license_number TEXT,
  vehicle_assigned TEXT,
  driver_status TEXT,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT 
    p.user_id,
    p.name,
    p.email,
    p.driver_license_number,
    p.vehicle_assigned,
    p.driver_status,
    p.last_login,
    p.created_at
  FROM public.profiles p
  WHERE p.carrier_id = p_carrier_id 
    AND p.role = 'carrier_driver'
  ORDER BY p.created_at DESC;
$$;