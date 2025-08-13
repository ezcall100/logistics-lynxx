-- Fix agent_memory table policy to allow system operations
DROP POLICY IF EXISTS "System can manage agent memory" ON public.agent_memory;

-- Allow authenticated users to insert agent memory (for system operations)
-- but only super admins can read/update/delete
CREATE POLICY "System can insert agent memory" ON public.agent_memory
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Super admins can manage agent memory" ON public.agent_memory
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'super_admin'::app_role));