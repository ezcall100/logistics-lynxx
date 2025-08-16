-- Secure RLS for openai_agent_permissions
-- 1) Ensure RLS is enabled
ALTER TABLE public.openai_agent_permissions ENABLE ROW LEVEL SECURITY;

-- 2) Drop overly-permissive policy
DROP POLICY IF EXISTS "Service role can manage OpenAI permissions" ON public.openai_agent_permissions;

-- 3) Restrict access strictly to super admins
-- Read access
CREATE POLICY "Super admins can view OpenAI permissions"
ON public.openai_agent_permissions
FOR SELECT
TO authenticated
USING (
  is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role)
);

-- Write access (INSERT/UPDATE/DELETE)
CREATE POLICY "Super admins can modify OpenAI permissions"
ON public.openai_agent_permissions
FOR ALL
TO authenticated
USING (
  is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role)
)
WITH CHECK (
  is_authenticated_user() AND has_role(auth.uid(), 'super_admin'::app_role)
);
