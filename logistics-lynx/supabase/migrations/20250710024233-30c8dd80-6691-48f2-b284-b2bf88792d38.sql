-- Fix anonymous access issue in autonomous_agent_configs table

-- Update autonomous_agent_configs policy to explicitly target authenticated users
DROP POLICY IF EXISTS "Admins can manage agent configs" ON public.autonomous_agent_configs;
CREATE POLICY "Admins can manage agent configs" ON public.autonomous_agent_configs
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));