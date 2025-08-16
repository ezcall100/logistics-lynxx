-- Harden access to autonomous_system_control by removing permissive policies
ALTER TABLE public.autonomous_system_control ENABLE ROW LEVEL SECURITY;

-- Drop overly-permissive policies that grant public access
DROP POLICY IF EXISTS "Service role only access" ON public.autonomous_system_control;
DROP POLICY IF EXISTS "System can manage autonomous control" ON public.autonomous_system_control;

-- Optional: ensure explicit read policy exists for super admins (SELECT only)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policy p
    JOIN pg_class c ON p.polrelid = c.oid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = 'autonomous_system_control'
      AND p.polname = 'Super admins can view autonomous system control'
  ) THEN
    CREATE POLICY "Super admins can view autonomous system control"
    ON public.autonomous_system_control
    FOR SELECT
    TO authenticated
    USING (
      is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role)
    );
  END IF;
END $$;

-- Keep existing restrictive policy "Super admins only can manage autonomous system control" in place
-- This already limits INSERT/UPDATE/DELETE/SELECT to super_admins.
