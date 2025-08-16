-- Fix autonomous agent RLS policies
-- Drop existing policies and recreate them with proper permissions

-- Drop existing policies for autonomous_agent_configs
DROP POLICY IF EXISTS "Allow read access to agent configs" ON public.autonomous_agent_configs;
DROP POLICY IF EXISTS "Allow insert access to agent configs" ON public.autonomous_agent_configs;
DROP POLICY IF EXISTS "Allow update access to agent configs" ON public.autonomous_agent_configs;

-- Recreate policies with proper permissions
CREATE POLICY "Allow read access to agent configs" 
  ON public.autonomous_agent_configs 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow insert access to agent configs" 
  ON public.autonomous_agent_configs 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow update access to agent configs" 
  ON public.autonomous_agent_configs 
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

-- Also allow delete for cleanup operations
CREATE POLICY "Allow delete access to agent configs" 
  ON public.autonomous_agent_configs 
  FOR DELETE 
  USING (true);

-- Drop existing policies for agent_memory
DROP POLICY IF EXISTS "Allow read access to agent memory" ON public.agent_memory;
DROP POLICY IF EXISTS "Allow insert access to agent memory" ON public.agent_memory;

-- Recreate policies for agent_memory
CREATE POLICY "Allow read access to agent memory" 
  ON public.agent_memory 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow insert access to agent memory" 
  ON public.agent_memory
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow update access to agent memory" 
  ON public.agent_memory
  FOR UPDATE 
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow delete access to agent memory" 
  ON public.agent_memory
  FOR DELETE 
  USING (true);
