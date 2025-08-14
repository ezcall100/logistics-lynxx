-- Fix critical security vulnerability in autonomous_system_control table
-- Remove overly permissive policy that allows any authenticated user access
DROP POLICY IF EXISTS "Allow authenticated users to manage autonomous system" ON public.autonomous_system_control;

-- Create secure policy that only allows super admins to access autonomous system control
CREATE POLICY "Super admins only can manage autonomous system control" 
ON public.autonomous_system_control 
FOR ALL 
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));