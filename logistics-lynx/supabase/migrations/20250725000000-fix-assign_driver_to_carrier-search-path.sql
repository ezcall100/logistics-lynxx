-- Fix assign_driver_to_carrier function to have immutable search_path
-- This resolves the security issue with mutable search_path

CREATE OR REPLACE FUNCTION public.assign_driver_to_carrier(
  p_driver_user_id UUID,
  p_carrier_id UUID,
  p_invitation_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Also fix the get_carrier_drivers function for consistency
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
SET search_path = public
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
