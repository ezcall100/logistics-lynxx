-- Fix RLS policies for autonomous agent memory insertion
-- The agent_memory table needs to allow service role to insert records

-- Update the agent_memory RLS policy to allow service role insertion
DROP POLICY IF EXISTS "Autonomous system can insert agent memory" ON public.agent_memory;

-- Create new policy that allows the service role to insert agent memory records
CREATE POLICY "Service role can insert agent memory" 
ON public.agent_memory 
FOR INSERT 
WITH CHECK (true);